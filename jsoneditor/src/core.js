var JSONEditor = function(element,options) {
  if (!(element instanceof Element)) {// element 需要dom元素
    throw new Error('element should be an instance of Element');
  }
  options = $extend({},JSONEditor.defaults.options,options||{});// 合并全局默认选项 和 实例化传入的选项
  this.element = element;
  this.options = options;
  this.init();
};
JSONEditor.prototype = {
  // necessary since we remove the ctor property by doing a literal assignment. Without this
  // the $isplainobject function will think that this is a plain object.
  constructor: JSONEditor,
  init: function() {
    var self = this;
    
    this.ready = false;

    var theme_class = JSONEditor.defaults.themes[this.options.theme || JSONEditor.defaults.theme];// 主题构造函数
    if(!theme_class) throw "Unknown theme " + (this.options.theme || JSONEditor.defaults.theme);
    
    this.schema = this.options.schema;// 关键数据(schema, theme, template, refs, translate) 直接存到 jsoneditor对象上
    this.theme = new theme_class();
    this.template = this.options.template;
    this.refs = this.options.refs || {};
    this.uuid = 0;
    this.__data = {};
    
    var icon_class = JSONEditor.defaults.iconlibs[this.options.iconlib || JSONEditor.defaults.iconlib];// 图标构造函数
    if(icon_class) this.iconlib = new icon_class();

    this.root_container = this.theme.getContainer();// jsoneditor对象对应的容器div
    this.element.appendChild(this.root_container);// div.jsoneditorHolder > div
    
    this.translate = this.options.translate || JSONEditor.defaults.translate;// translate 翻译错误信息中的变量插值 如: value should greater then {{0}}

    // Fetch all external refs via ajax
    this._loadExternalRefs(this.schema, function() {// 获取外部schema定义
      self._getDefinitions(self.schema); // 本地schema定义复用  schema: {definitions: {foo: fooDef, bar: barDef}}
      
      // Validator options
      var validator_options = {};
      if(self.options.custom_validators) {// 自定义验证器
        validator_options.custom_validators = self.options.custom_validators;
      }
      self.validator = new JSONEditor.Validator(self,null,validator_options);// Validator(jsoneditor, schema, options)
      
      // Create the root editor
      var editor_class = self.getEditorClass(self.schema);
      // 创建editor实例 最顶层的editor
      // jsoneditor.root = topLevelEditor
      self.root = self.createEditor(editor_class, {
        jsoneditor: self,
        schema: self.schema,
        required: true,
        container: self.root_container // root editor 的容器
      });
      
      self.root.preBuild();
      self.root.build();
      self.root.postBuild();

      // Starting data
      if(self.options.startval) self.root.setValue(self.options.startval);

      self.validation_results = self.validator.validate(self.root.getValue());
      self.root.showValidationErrors(self.validation_results);
      self.ready = true;

      // Fire ready event asynchronously
      window.requestAnimationFrame(function() {
        if(!self.ready) return;
        self.validation_results = self.validator.validate(self.root.getValue());
        self.root.showValidationErrors(self.validation_results);
        self.trigger('ready');
        self.trigger('change');
      });
    });
  },
  getValue: function() {
    if(!this.ready) throw "JSON Editor not ready yet.  Listen for 'ready' event before getting the value";

    return this.root.getValue();
  },
  setValue: function(value) {
    if(!this.ready) throw "JSON Editor not ready yet.  Listen for 'ready' event before setting the value";

    this.root.setValue(value);
    return this;
  },
  validate: function(value) {
    if(!this.ready) throw "JSON Editor not ready yet.  Listen for 'ready' event before validating";
    
    // Custom value
    if(arguments.length === 1) {
      return this.validator.validate(value);
    }
    // Current value (use cached result)
    else {
      return this.validation_results;
    }
  },
  destroy: function() {
    if(this.destroyed) return;
    if(!this.ready) return;
    
    this.schema = null;
    this.options = null;
    this.root.destroy();
    this.root = null;
    this.root_container = null;
    this.validator = null;
    this.validation_results = null;
    this.theme = null;
    this.iconlib = null;
    this.template = null;
    this.__data = null;
    this.ready = false;
    this.element.innerHTML = '';
    
    this.destroyed = true;
  },
  on: function(event, callback) {
    this.callbacks = this.callbacks || {};
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(callback);
    
    return this;
  },
  off: function(event, callback) {
    // Specific callback
    if(event && callback) {
      this.callbacks = this.callbacks || {};
      this.callbacks[event] = this.callbacks[event] || [];
      var newcallbacks = [];
      for(var i=0; i<this.callbacks[event].length; i++) {
        if(this.callbacks[event][i]===callback) continue;
        newcallbacks.push(this.callbacks[event][i]);
      }
      this.callbacks[event] = newcallbacks;
    }
    // All callbacks for a specific event
    else if(event) {
      this.callbacks = this.callbacks || {};
      this.callbacks[event] = [];
    }
    // All callbacks for all events
    else {
      this.callbacks = {};
    }
    
    return this;
  },
  trigger: function(event) {
    if(this.callbacks && this.callbacks[event] && this.callbacks[event].length) {
      for(var i=0; i<this.callbacks[event].length; i++) {
        this.callbacks[event][i]();
      }
    }
    
    return this;
  },
  setOption: function(option, value) {
    if(option === "show_errors") {
      this.options.show_errors = value;
      this.onChange();
    }
    // Only the `show_errors` option is supported for now
    else {
      throw "Option "+option+" must be set during instantiation and cannot be changed later";
    }
    
    return this;
  },
  getEditorClass: function(schema) {// 获取editor构造函数
    var classname;

    schema = this.expandSchema(schema);// 展开schema 加载schema.$ref指向的外部schema 并 合并过来

    $each(JSONEditor.defaults.resolvers,function(i,resolver) {// 遍历解析器resolver
      var tmp = resolver(schema);
      if(tmp) {
        if(JSONEditor.defaults.editors[tmp]) {// default.editors列表中有对应的 editor
          classname = tmp;
          return false;
        }
      }
    });

    if(!classname) throw "Unknown editor for schema "+JSON.stringify(schema);
    if(!JSONEditor.defaults.editors[classname]) throw "Unknown editor "+classname;

    return JSONEditor.defaults.editors[classname];
  },
  createEditor: function(editor_class, options) {
    options = $extend({},editor_class.options||{},options);
    return new editor_class(options);
  },
  onChange: function() {
    if(!this.ready) return;
    
    if(this.firing_change) return;
    this.firing_change = true;
    
    var self = this;
    
    window.requestAnimationFrame(function() {
      self.firing_change = false;
      if(!self.ready) return;

      // Validate and cache results
      self.validation_results = self.validator.validate(self.root.getValue());
      
      if(self.options.show_errors !== "never") {
        self.root.showValidationErrors(self.validation_results);
      }
      else {
        self.root.showValidationErrors([]);
      }
      
      // Fire change event
      self.trigger('change');
    });
    
    return this;
  },
  compileTemplate: function(template, name) {
    name = name || JSONEditor.defaults.template;

    var engine;

    // Specifying a preset engine
    if(typeof name === 'string') {
      if(!JSONEditor.defaults.templates[name]) throw "Unknown template engine "+name;
      engine = JSONEditor.defaults.templates[name]();

      if(!engine) throw "Template engine "+name+" missing required library.";
    }
    // Specifying a custom engine
    else {
      engine = name;
    }

    if(!engine) throw "No template engine set";
    if(!engine.compile) throw "Invalid template engine set";

    return engine.compile(template);
  },
  _data: function(el,key,value) {
    // Setting data
    if(arguments.length === 3) {
      var uuid;
      if(el.hasAttribute('data-jsoneditor-'+key)) {
        uuid = el.getAttribute('data-jsoneditor-'+key);
      }
      else {
        uuid = this.uuid++;
        el.setAttribute('data-jsoneditor-'+key,uuid);
      }

      this.__data[uuid] = value;
    }
    // Getting data
    else {
      // No data stored
      if(!el.hasAttribute('data-jsoneditor-'+key)) return null;
      
      return this.__data[el.getAttribute('data-jsoneditor-'+key)];
    }
  },
  registerEditor: function(editor) {
    this.editors = this.editors || {};
    this.editors[editor.path] = editor;
    return this;
  },
  unregisterEditor: function(editor) {
    this.editors = this.editors || {};
    this.editors[editor.path] = null;
    return this;
  },
  getEditor: function(path) {
    if(!this.editors) return;
    return this.editors[path];
  },
  watch: function(path,callback) {
    this.watchlist = this.watchlist || {};
    this.watchlist[path] = this.watchlist[path] || [];
    this.watchlist[path].push(callback);
    
    return this;
  },
  unwatch: function(path,callback) {
    if(!this.watchlist || !this.watchlist[path]) return this;
    // If removing all callbacks for a path
    if(!callback) {
      this.watchlist[path] = null;
      return this;
    }
    
    var newlist = [];
    for(var i=0; i<this.watchlist[path].length; i++) {
      if(this.watchlist[path][i] === callback) continue;
      else newlist.push(this.watchlist[path][i]);
    }
    this.watchlist[path] = newlist.length? newlist : null;
    return this;
  },
  notifyWatchers: function(path) {
    if(!this.watchlist || !this.watchlist[path]) return this;
    for(var i=0; i<this.watchlist[path].length; i++) {
      this.watchlist[path][i]();
    }
  },
  isEnabled: function() {
    return !this.root || this.root.isEnabled();
  },
  enable: function() {
    this.root.enable();
  },
  disable: function() {
    this.root.disable();
  },
  _getDefinitions: function(schema,path) {
    path = path || '#/definitions/';
    if(schema.definitions) {
      for(var i in schema.definitions) {// definitions: {foo: {type:.., schema:..}}
        if(!schema.definitions.hasOwnProperty(i)) continue;
        this.refs[path+i] = schema.definitions[i];// this.refs: { '#/definitions/foo': {type:.., schema:..}, ..}
        if(schema.definitions[i].definitions) {// 递归调用  '#/definitions/foo/definitions/subfoo'
          this._getDefinitions(schema.definitions[i],path+i+'/definitions/');
        }
      }
    }
  },
  _getExternalRefs: function(schema) {// 聚合schema中的$ref字段定义
    var refs = {}; // {url1: true, url2: true,..}
    var merge_refs = function(newrefs) {// 遍历并缓存
      for(var i in newrefs) {
        if(newrefs.hasOwnProperty(i)) {
          refs[i] = true;
        }
      }
    };
    
    if(schema.$ref && typeof schema.$ref !== "object" && schema.$ref.substr(0,1) !== "#" && !this.refs[schema.$ref]) {
      // schema.$ref为string 非本地定义, 并且尚未缓存 eg: schema: {$ref: 'http://some.web.com/api'}
      refs[schema.$ref] = true;
    }
    
    for(var i in schema) {
      if(!schema.hasOwnProperty(i)) continue;
      if(schema[i] && typeof schema[i] === "object" && Array.isArray(schema[i])) {// array
        for(var j=0; j<schema[i].length; j++) {
          if(typeof schema[i][j]==="object") {// array item is object or array , 递归调用
            merge_refs(this._getExternalRefs(schema[i][j]));
          }
        }
      }
      else if(schema[i] && typeof schema[i] === "object") {// object
        merge_refs(this._getExternalRefs(schema[i]));
      }
    }
    
    return refs;
  },
  _loadExternalRefs: function(schema, callback) {// 根据$ref字段, 加载外部schema定义, 执行回调
    var self = this;
    var refs = this._getExternalRefs(schema);// 收集schema中的refs字段
    
    var done = 0, waiting = 0, callback_fired = false;
    
    $each(refs,function(url) {
      if(self.refs[url]) return;// 若已有缓存 则不做请求
      if(!self.options.ajax) throw "Must set ajax option to true to load external ref "+url; // options.ajax = true
      self.refs[url] = 'loading'; // this.refs: {url1: 'loading' -> schemaDef}
      waiting++;

      var r = new XMLHttpRequest(); 
      r.open("GET", url, true);
      r.onreadystatechange = function () {
        if (r.readyState != 4) return; 
        // Request succeeded
        if(r.status === 200) {// xhr.readyState === 4 && xhr.status === 200 means success
          var response;
          try {
            response = JSON.parse(r.responseText);
          }
          catch(e) {
            window.console.log(e);
            throw "Failed to parse external ref "+url;
          }
          if(!response || typeof response !== "object") throw "External ref does not contain a valid schema - "+url;
          
          self.refs[url] = response;// 若加载回来的schema定义，同样包含$ref定义 则递归执行
          self._loadExternalRefs(response,function() {
            done++;
            if(done >= waiting && !callback_fired) {//全部加载完 执行回调
              callback_fired = true;
              callback();
            }
          });
        }
        // Request failed
        else {// xhr request failed
          window.console.log(r);
          throw "Failed to fetch ref via ajax- "+url;
        }
      };
      r.send();
    });
    
    if(!waiting) {
      callback();
    }
  },
  expandRefs: function(schema) {// 展开refs
    schema = $extend({},schema);//copy
    
    while (schema.$ref) {// 循环加载 schema.$ref 指向的schema定义
      var ref = schema.$ref;
      delete schema.$ref;
      
      if(!this.refs[ref]) ref = decodeURIComponent(ref);// 若无缓存
      
      schema = this.extendSchemas(schema,this.refs[ref]);// $ref加载的schema 和 其所在的对应schema 合并
    }
    return schema;
  },
  expandSchema: function(schema) {// 展开schema  schema.$ref加载的 dynSchema 和 $ref字段所在的schema合并
    var self = this;
    var extended = $extend({},schema);// copy
    var i;

    // Version 3 `type`
    if(typeof schema.type === 'object') {// 递归调用， 数组，查找对象元素做递归; 对象 直接递归
      // Array of types
      if(Array.isArray(schema.type)) {// array schema.type: ['string', 'array', {..}]
        $each(schema.type, function(key,value) {
          // Schema
          if(typeof value === 'object') {
            schema.type[key] = self.expandSchema(value); // 递归调用
          }
        });
      }
      // Schema
      else {// object schema.type: {... }
        schema.type = self.expandSchema(schema.type);
      }
    }
    // Version 3 `disallow`
    if(typeof schema.disallow === 'object') {// 同schema.type
      // Array of types
      if(Array.isArray(schema.disallow)) {
        $each(schema.disallow, function(key,value) {
          // Schema
          if(typeof value === 'object') {
            schema.disallow[key] = self.expandSchema(value);
          }
        });
      }
      // Schema
      else {
        schema.disallow = self.expandSchema(schema.disallow);
      }
    }
    // Version 4 `anyOf`
    if(schema.anyOf) {// schema.anyOf 为对象数组
      $each(schema.anyOf, function(key,value) {
        schema.anyOf[key] = self.expandSchema(value);
      });
    }
    // Version 4 `dependencies` (schema dependencies)
    if(schema.dependencies) {
      $each(schema.dependencies,function(key,value) {
        if(typeof value === "object" && !(Array.isArray(value))) {
          schema.dependencies[key] = self.expandSchema(value);
        }
      });
    }
    // Version 4 `not`
    if(schema.not) {
      schema.not = this.expandSchema(schema.not);
    }
    
    // allOf schemas should be merged into the parent
    if(schema.allOf) {
      for(i=0; i<schema.allOf.length; i++) {
        extended = this.extendSchemas(extended,this.expandSchema(schema.allOf[i]));
      }
      delete extended.allOf;
    }
    // extends schemas should be merged into parent
    if(schema["extends"]) {
      // If extends is a schema
      if(!(Array.isArray(schema["extends"]))) {
        extended = this.extendSchemas(extended,this.expandSchema(schema["extends"]));
      }
      // If extends is an array of schemas
      else {
        for(i=0; i<schema["extends"].length; i++) {
          extended = this.extendSchemas(extended,this.expandSchema(schema["extends"][i]));
        }
      }
      delete extended["extends"];
    }
    // parent should be merged into oneOf schemas
    if(schema.oneOf) {
      var tmp = $extend({},extended);
      delete tmp.oneOf;
      for(i=0; i<schema.oneOf.length; i++) {
        extended.oneOf[i] = this.extendSchemas(this.expandSchema(schema.oneOf[i]),tmp);
      }
    }
    
    return this.expandRefs(extended);
  },
  extendSchemas: function(obj1, obj2) {// 合并两个 schema
    obj1 = $extend({},obj1);// copy
    obj2 = $extend({},obj2);

    var self = this;
    var extended = {};
    $each(obj1, function(prop,val) {
      // If this key is also defined in obj2, merge them
      if(typeof obj2[prop] !== "undefined") {
        // Required and defaultProperties arrays should be unioned together
        if((prop === 'required'||prop === 'defaultProperties') && typeof val === "object" && Array.isArray(val)) {
          // o1: {required:[..], defaultProperties: [..]}, o2: {required: [..], defaultProperties:[..]}
          
          // Union arrays and unique //:: very cool~~
          extended[prop] = val.concat(obj2[prop]).reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
          }, []);
        }
        // Type should be intersected and is either an array or string
        else if(prop === 'type' && (typeof val === "string" || Array.isArray(val))) {// 处理 scheme.type合并
          // Make sure we're dealing with arrays
          if(typeof val === "string") val = [val];
          if(typeof obj2.type === "string") obj2.type = [obj2.type];

          // If type is only defined in the first schema, keep it
          if(!obj2.type || !obj2.type.length) {
            extended.type = val;
          }
          // If type is defined in both schemas, do an intersect
          else {
            extended.type = val.filter(function(n) {
              return obj2.type.indexOf(n) !== -1;
            });
          }

          // If there's only 1 type and it's a primitive, use a string instead of array
          if(extended.type.length === 1 && typeof extended.type[0] === "string") {
            extended.type = extended.type[0];
          }
          // Remove the type property if it's empty
          else if(extended.type.length === 0) {
            delete extended.type;
          }
        }
        // All other arrays should be intersected (enum, etc.)
        else if(typeof val === "object" && Array.isArray(val)){// 处理 schema.x的其他字段的合并 取交集
          extended[prop] = val.filter(function(n) {
            return obj2[prop].indexOf(n) !== -1;
          });
        }
        // Objects should be recursively merged
        else if(typeof val === "object" && val !== null) {// 对象 递归
          extended[prop] = self.extendSchemas(val,obj2[prop]);
        }
        // Otherwise, use the first value
        else {// schema1 schema2 都有定义 ，prop为原始值, 则取 schema1[prop]
          extended[prop] = val;
        }
      }
      // Otherwise, just use the one in obj1
      else {// schema2.prop无定义 则去 schema1.prop
        extended[prop] = val;
      }
    });
    // Properties in obj2 that aren't in obj1
    $each(obj2, function(prop,val) {// schema1.prop无定义 schema2.prop有定义 则取 schema2.prop
      if(typeof obj1[prop] === "undefined") {
        extended[prop] = val;
      }
    });

    return extended;
  }
};

JSONEditor.defaults = {
  themes: {},
  templates: {},
  iconlibs: {},
  editors: {},
  languages: {},
  resolvers: [],
  custom_validators: []
};
