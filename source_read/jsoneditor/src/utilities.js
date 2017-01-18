/**
 * Taken from jQuery 2.1.3
 *
 * @param obj
 * @returns {boolean}
 */
var $isplainobject = function( obj ) {// 普通对象字面量 {foo: fooval} or new Object()
  // Not plain objects:
  // - Any object or value whose internal [[Class]] property is not "[object Object]"
  // - DOM nodes
  // - window
  if (typeof obj !== "object" || obj.nodeType || (obj !== null && obj === obj.window)) {// window.window
    return false;
  }
  // Object.constructor.prototype: { isPrototypeOf:.. }
  if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
    return false;
  }

  // If the function hasn't returned already, we're confident that
  // |obj| is a plain object, created by {} or constructed with new Object
  return true;
};

var $extend = function(destination) {// 深拷贝
  var source, i,property;
  for(i=1; i<arguments.length; i++) {
    source = arguments[i];
    for (property in source) {
      if(!source.hasOwnProperty(property)) continue;
      if(source[property] && $isplainobject(source[property])) {
        if(!destination.hasOwnProperty(property)) destination[property] = {};
        $extend(destination[property], source[property]);
      }
      else {
        destination[property] = source[property];
      }
    }
  }
  return destination;
};

var $each = function(obj,callback) {// typeof [] === 'object'
  if(!obj || typeof obj !== "object") return;
  var i;
  if(Array.isArray(obj) || (typeof obj.length === 'number' && obj.length > 0 && (obj.length - 1) in obj)) {
    for(i=0; i<obj.length; i++) {// array
      if(callback(i,obj[i])===false) return; // can break the loop
    }
  }
  else {// object
    if (Object.keys) {
      var keys = Object.keys(obj);
      for(i=0; i<keys.length; i++) {
        if(callback(keys[i],obj[keys[i]])===false) return;
      }
    }
    else {// not support ES5
      for(i in obj) {
        if(!obj.hasOwnProperty(i)) continue;
        if(callback(i,obj[i])===false) return;
      }
    }
  }
};

var $trigger = function(el,event) {// 触发自定义的HTMLEvent
  var e = document.createEvent('HTMLEvents');
  e.initEvent(event, true, true);
  el.dispatchEvent(e);
};
var $triggerc = function(el,event) {// 触发自定义事件
  var e = new CustomEvent(event,{
    bubbles: true,
    cancelable: true
  });

  el.dispatchEvent(e);
};
