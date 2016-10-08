/**
 * All editors should extend from this class
 */
JSONEditor.AbstractEditor = Class.extend({
  onChildEditorChange: function(editor) {
    this.onChange(true);// 当childEditorChange，触发当前editor的onChange
  },
  notify: function() {// 通知对应的watcher 执行回调列表
    this.jsoneditor.notifyWatchers(this.path);
  },
  change: function() {//触发paentEditor的onChildEditorChange, 若为rootEditor 在触发jsoneditor.onChange 触发parentEditor的change事件
    if(this.parent) this.parent.onChildEditorChange(this);
    else this.jsoneditor.onChange();
  },
  onChange: function(bubble) {
    this.notify();
    if(this.watch_listener) this.watch_listener();
    if(bubble) this.change();// change事件向上毛怕
  },
  register: function() {//把自身注册到 jsoneditor.editors上, 并触发onChange
    this.jsoneditor.registerEditor(this);
    this.onChange();
  },
  unregister: function() {
    if(!this.jsoneditor) return;
    this.jsoneditor.unregisterEditor(this);
  },
  getNumColumns: function() {
    return 12;
  },
  init: function(options) {// editor类的入口 new Editor(opts)时会执行int方法
    this.jsoneditor = options.jsoneditor;// 转存options.jsoneditor上的常用数据 (theme, template_engine, iconlib, translate)
    
    this.theme = this.jsoneditor.theme;
    this.template_engine = this.jsoneditor.template;
    this.iconlib = this.jsoneditor.iconlib;
    
    this.translate = this.jsoneditor.translate || JSONEditor.defaults.translate;

    this.original_schema = options.schema;
    this.schema = this.jsoneditor.expandSchema(this.original_schema);// 展开original_schema 加载$ref指向的外部schema, 并合并
    // Editor.options, options, schema.options
    this.options = $extend({}, (this.options || {}), (options.schema.options || {}), options);
    // editor: {path, formname, key, parent, link_watchers}
    if(!options.path && !this.schema.id) this.schema.id = 'root';
    this.path = options.path || 'root';
    this.formname = options.formname || this.path.replace(/\.([^.]+)/g,'[$1]'); // this.path = foo.bar -> this.forname = [foo][bar]
    if(this.jsoneditor.options.form_name_root) this.formname = this.formname.replace(/^root\[/,this.jsoneditor.options.form_name_root+'[');
    this.key = this.path.split('.').pop();
    this.parent = options.parent;
    
    this.link_watchers = [];
    
    if(options.container) this.setContainer(options.container);
  },
  setContainer: function(container) {// 保存 editor的容器div 并设置其属性节点
    this.container = container; 
    // setAttribute -> data-schemaid, data-schematype data-schemapath
    if(this.schema.id) this.container.setAttribute('data-schemaid',this.schema.id);
    if(this.schema.type && typeof this.schema.type === "string") this.container.setAttribute('data-schematype',this.schema.type);
    this.container.setAttribute('data-schemapath',this.path);
  },
  
  preBuild: function() {

  },
  build: function() {
    
  },
  postBuild: function() {
    this.setupWatchListeners();
    this.addLinks();
    this.setValue(this.getDefault(), true);
    this.updateHeaderText();
    this.register();
    this.onWatchedFieldChange();
  },
  
  setupWatchListeners: function() {//设置监听器相关的缓存 和 回调
    var self = this;
    
    // Watched fields
    this.watched = {}; // editor: {watched: {..}, watched_values: {..}, watch_listener: fn}
    if(this.schema.vars) this.schema.watch = this.schema.vars;
    this.watched_values = {}; // 缓存监听字段对应的值
    this.watch_listener = function() {
      if(self.refreshWatchedFieldValues()) {// 刷新监听字段的值，若有变更 则触发watchFieldChange的回调
        self.onWatchedFieldChange();
      }
    };
    
    this.register();
    if(this.schema.hasOwnProperty('watch')) {// 处理editor的schema.watch字段
      var path,path_parts,first,root,adjusted_path;

      for(var name in this.schema.watch) {
        if(!this.schema.watch.hasOwnProperty(name)) continue;
        path = this.schema.watch[name];

        if(Array.isArray(path)) {// watch: {'somename': ['root', 'some.path']}
          if(path.length<2) continue; // watch: {'name': ['somepath']} skip this
          // ['root', 'some.path'] -> ['root', 'some','path']
          path_parts = [path[0]].concat(path[1].split('.'));
        }
        else {// watch: {'somename': 'root.some.path'}
          path_parts = path.split('.');
          if(!self.theme.closest(self.container,'[data-schemaid="'+path_parts[0]+'"]')) path_parts.unshift('#');
        }
        first = path_parts.shift();

        if(first === '#') first = self.jsoneditor.schema.id || 'root';
        // 查找当前editor对应的上级Editor
        // Find the root node for this template variable
        root = self.theme.closest(self.container,'[data-schemaid="'+first+'"]');
        if(!root) throw "Could not find ancestor node with id "+first;

        // Keep track of the root node and path for use when rendering the template
        adjusted_path = root.getAttribute('data-schemapath') + '.' + path_parts.join('.');
        // path_parts: [upperEditorId, 'my.local.path'] adjusted_path 调整后的绝对路径
        self.jsoneditor.watch(adjusted_path,self.watch_listener);
        
        self.watched[name] = adjusted_path;// editor.watched: {name: fieldFullPath}
      }
    }
    
    // Dynamic header
    if(this.schema.headerTemplate) {// 有schema.headerTemplate则将其预编译 并缓存到editor
      this.header_template = this.jsoneditor.compileTemplate(this.schema.headerTemplate, this.template_engine);
    }
  },
  
  addLinks: function() {// 处理schema.links
    // Add links
    if(!this.no_link_holder) {
      this.link_holder = this.theme.getLinksHolder();
      this.container.appendChild(this.link_holder);// 添加占位元素
      if(this.schema.links) {
        for(var i=0; i<this.schema.links.length; i++) {
          this.addLink(this.getLink(this.schema.links[i]));
        }
      }
    }
  },
  
  
  getButton: function(text, icon, title) {
    var btnClass = 'json-editor-btn-'+icon;
    if(!this.iconlib) icon = null;
    else icon = this.iconlib.getIcon(icon);
    
    if(!icon && title) {
      text = title;
      title = null;
    }
    
    var btn = this.theme.getButton(text, icon, title);
    btn.className += ' ' + btnClass + ' ';
    return btn;
  },
  setButtonText: function(button, text, icon, title) {
    if(!this.iconlib) icon = null;
    else icon = this.iconlib.getIcon(icon);
    
    if(!icon && title) {
      text = title;
      title = null;
    }
    
    return this.theme.setButtonText(button, text, icon, title);
  },
  addLink: function(link) {
    if(this.link_holder) this.link_holder.appendChild(link);
  },
  getLink: function(data) {
    // data: {mediaType:.., download:.., href:.., rel:.., class:..}
    var holder, link;
        
    // Get mime type of the link
    var mime = data.mediaType || 'application/javascript';
    var type = mime.split('/')[0];
    
    // Template to generate the link href
    var href = this.jsoneditor.compileTemplate(data.href,this.template_engine);

    // Template to generate the link's download attribute
    var download = null;
    if(data.download) download = data.download;

    if(download && download !== true) {
      download = this.jsoneditor.compileTemplate(download, this.template_engine);
    }

    // Image links
    if(type === 'image') {
      holder = this.theme.getBlockLinkHolder();// 链接的占位元素
      link = document.createElement('a');
      link.setAttribute('target','_blank'); 
      // <div class="hoder"><a target="_blank" ..><img src=..
      var image = document.createElement('img');
      
      this.theme.createImageLink(holder,link,image);
    
      // When a watched field changes, update the url  
      this.link_watchers.push(function(vars) {
        var url = href(vars);
        link.setAttribute('href',url);//更新img.src  a.href
        link.setAttribute('title',data.rel || url);
        image.setAttribute('src',url);
      });
    }
    // Audio/Video links  //mediaType="video/mp4"
    else if(['audio','video'].indexOf(type) >=0) {
      holder = this.theme.getBlockLinkHolder();
      // <div class="holder"><a target="_blank"><video controls="controls">..
      link = this.theme.getBlockLink();
      link.setAttribute('target','_blank');
      
      var media = document.createElement(type);
      media.setAttribute('controls','controls');
      
      this.theme.createMediaLink(holder,link,media);
      
      // When a watched field changes, update the url  
      this.link_watchers.push(function(vars) {
        var url = href(vars);
        link.setAttribute('href',url); // 类似image链接
        link.textContent = data.rel || url;
        media.setAttribute('src',url);
      });
    }
    // Text links
    else {
      //文本链接 <a target="_blank">data.rel</a>
      link = holder = this.theme.getBlockLink();
      holder.setAttribute('target','_blank');
      holder.textContent = data.rel;

      // When a watched field changes, update the url
      this.link_watchers.push(function(vars) {
        var url = href(vars);
        holder.setAttribute('href',url);// 更新链接和文本
        holder.textContent = data.rel || url;
      });
    }

    if(download && link) {
      if(download === true) { // <a href=.. download>..
        link.setAttribute('download','');
      }
      else {
        this.link_watchers.push(function(vars) {
          link.setAttribute('download',download(vars)); // <a href=.. download=..
        });
      }
    }
    
    if(data.class) link.className = link.className + ' ' + data.class;

    return holder;
  },
  refreshWatchedFieldValues: function() {// 更新监听字段的值，若有变动 则返回true
    if(!this.watched_values) return;
    var watched = {};
    var changed = false;
    var self = this;
    
    // watched: {foo: editorPath, bar: ..} editorPath -> editor -> editor.getValue()
    // watched_values: {foo: foovalue, bar: barvalue}// 缓存监听字段和对应的值
    if(this.watched) {
      var val,editor;
      for(var name in this.watched) {
        if(!this.watched.hasOwnProperty(name)) continue;
        editor = self.jsoneditor.getEditor(this.watched[name]);// getEditor(path)
        val = editor? editor.getValue() : null;
        if(self.watched_values[name] !== val) changed = true;
        watched[name] = val;
      }
    }
    
    watched.self = this.getValue();// 当前editor的值是否changed
    if(this.watched_values.self !== watched.self) changed = true;
    
    this.watched_values = watched;
    
    return changed;
  },
  getWatchedFieldValues: function() {
    return this.watched_values;// {fieldName: fieldValue, ..}
  },
  updateHeaderText: function() {// 更新editor.header的文本节点 or textContent
    if(this.header) {
      // If the header has children, only update the text node's value
      if(this.header.children.length) {// this.header <div>some title<i></i></div>
        for(var i=0; i<this.header.childNodes.length; i++) {
          if(this.header.childNodes[i].nodeType===3) {// textNode
            this.header.childNodes[i].nodeValue = this.getHeaderText();
            break;
          }
        }
      }
      // Otherwise, just update the entire node
      else {// this.header <div></div>
        this.header.textContent = this.getHeaderText();
      }
    }
  },
  getHeaderText: function(title_only) {// 获取header的内容
    // this.header_text || this.schema.title || this.getTitle()
    if(this.header_text) return this.header_text;
    else if(title_only) return this.schema.title;
    else return this.getTitle();
  },
  onWatchedFieldChange: function() {
    var vars;
    if(this.header_template) {// 若监听字段发生变化 更新header  this.header_template
      vars = $extend(this.getWatchedFieldValues(),{
        key: this.key,
        i: this.key,
        i0: (this.key*1),
        i1: (this.key*1+1),
        title: this.getTitle()
      });
      var header_text = this.header_template(vars);// header模板填入数据 获得新的header
      
      if(header_text !== this.header_text) {// header与缓存的不同 则更新
        this.header_text = header_text;
        this.updateHeaderText();
        this.notify(); //通知相关 watcher  执行回调
        //this.fireChangeHeaderEvent();
      }
    }
    // 若editor包含links 并有对应的link_watchers (a.href中的插值生成的watcher)
    if(this.link_watchers.length) {// 若监听字段发生变化 更新link this.link_watchers
      vars = this.getWatchedFieldValues();
      for(var i=0; i<this.link_watchers.length; i++) {
        this.link_watchers[i](vars);// 执行link_watchers: [cb1, cb2,..]  回调列表
      }
    }
  },
  setValue: function(value) {
    this.value = value;
  },
  getValue: function() {
    return this.value;
  },
  refreshValue: function() {

  },
  getChildEditors: function() {
    return false;
  },
  destroy: function() {// 取消注册editor, 取消监听editorPath
    var self = this;
    this.unregister(this); // editors: {editorName: editor, ..}
    $each(this.watched,function(name,adjusted_path) {
      self.jsoneditor.unwatch(adjusted_path,self.watch_listener);
    });
    this.watched = null;
    this.watched_values = null;
    this.watch_listener = null;
    this.header_text = null;
    this.header_template = null;
    this.value = null;
    // editor的容器div 移除
    if(this.container && this.container.parentNode) this.container.parentNode.removeChild(this.container);
    this.container = null;
    this.jsoneditor = null;
    this.schema = null;
    this.path = null;
    this.key = null;
    this.parent = null;
  },
  getDefault: function() {// 获取editor的默认值 schema.default , schema.enum[0]
    if(this.schema["default"]) return this.schema["default"];
    if(this.schema["enum"]) return this.schema["enum"][0];
    
    var type = this.schema.type || this.schema.oneOf;
    if(type && Array.isArray(type)) type = type[0]; // 从 对象数组 or 二维数组 取type
    if(type && typeof type === "object") type = type.type;
    if(type && Array.isArray(type)) type = type[0];
    
    if(typeof type === "string") {// 各种type的默认值
      if(type === "number") return 0.0;
      if(type === "boolean") return false;
      if(type === "integer") return 0;
      if(type === "string") return "";
      if(type === "object") return {};
      if(type === "array") return [];
    }
    
    return null;
  },
  getTitle: function() {// 用 schema.title 或 editor.id作为title
    return this.schema.title || this.key;
  },
  enable: function() {
    this.disabled = false;
  },
  disable: function() {
    this.disabled = true;
  },
  isEnabled: function() {
    return !this.disabled;
  },
  isRequired: function() {// is this editor required to show
    if(typeof this.schema.required === "boolean") return this.schema.required;
    else if(this.parent && this.parent.schema && Array.isArray(this.parent.schema.required)) return this.parent.schema.required.indexOf(this.key) > -1;
    else if(this.jsoneditor.options.required_by_default) return true;
    else return false;
  },  
  getDisplayText: function(arr) {
    var disp = [];
    var used = {};
    
    // Determine how many times each attribute name is used.
    // This helps us pick the most distinct display text for the schemas.
    $each(arr,function(i,el) {
      if(el.title) {
        used[el.title] = used[el.title] || 0;
        used[el.title]++;
      }
      if(el.description) {
        used[el.description] = used[el.description] || 0;
        used[el.description]++;
      }
      if(el.format) {
        used[el.format] = used[el.format] || 0;
        used[el.format]++;
      }
      if(el.type) {
        used[el.type] = used[el.type] || 0;
        used[el.type]++;
      }
    });
    
    // Determine display text for each element of the array
    $each(arr,function(i,el)  {
      var name;
      
      // If it's a simple string
      if(typeof el === "string") name = el;
      // Object
      else if(el.title && used[el.title]<=1) name = el.title;
      else if(el.format && used[el.format]<=1) name = el.format;
      else if(el.type && used[el.type]<=1) name = el.type;
      else if(el.description && used[el.description]<=1) name = el.descripton;
      else if(el.title) name = el.title;
      else if(el.format) name = el.format;
      else if(el.type) name = el.type;
      else if(el.description) name = el.description;
      else if(JSON.stringify(el).length < 50) name = JSON.stringify(el);
      else name = "type";
      
      disp.push(name);
    });
    
    // Replace identical display text with "text 1", "text 2", etc.
    var inc = {};
    $each(disp,function(i,name) {
      inc[name] = inc[name] || 0;
      inc[name]++;
      
      if(used[name] > 1) disp[i] = name + " " + inc[name];
    });
    
    return disp;
  },
  getOption: function(key) {
    try {
      throw "getOption is deprecated";
    }
    catch(e) {
      window.console.error(e);
    }
    
    return this.options[key];
  },
  showValidationErrors: function(errors) {

  }
});
