webpackJsonp([1],{

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__webpack_require__(45);
	__vue_script__ = __webpack_require__(49);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\demo\\index.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(50);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./index.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(46);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./../../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js?id=_v-7859066c&scoped=true!./../../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./../../../../vue-demo/node_modules/vue-loader/lib/style-rewriter.js?id=_v-7859066c&scoped=true!./../../../../vue-demo/node_modules/vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(47)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nh3[_v-7859066c]{\n\tbackground-color: skyblue;\n}\n", ""]);

	// exports


/***/ },

/***/ 49:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<div class="view-demo">
	// 		<h3>this is demo page</h3>
	// 		<p>demo..{{user}}</p>
	// 	</div>
	// </template>
	//
	// <script>
	exports.default = {
		ready: function ready() {
			console.log('demo.. ready..');
		},
		data: function data() {
			return {
				user: 'sindy'
			};
		}
	};
	// </script>
	//
	// <style scoped>
	// 	h3{
	// 		background-color: skyblue;
	// 	}
	// </style>

/***/ },

/***/ 50:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"view-demo\" _v-7859066c=\"\">\n\t<h3 _v-7859066c=\"\">this is demo page</h3>\n\t<p _v-7859066c=\"\">demo..{{user}}</p>\n</div>\n";

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(52);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\special\\index.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(53);
	module.exports = __vue_script__ || {};
	if (module.exports.__esModule) module.exports = module.exports.default;
	if (__vue_template__) {
	  (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
	}
	if (false) {
	  (function () {
	    module.hot.accept();
	    var hotAPI = require("vue-hot-reload-api");
	    hotAPI.install(require("vue"), false);
	    if (!hotAPI.compatible) return;
	    var id = "./index.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },

/***/ 52:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<div class="special-page">
	// 		<vtable sort-key="title">
	// 			<pager api="querySpecial" slot="pager"></pager>
	// 		</vtable>
	// 	</div>
	// </template>
	//
	// <script>
	exports.default = {
		ready: function ready() {
			console.log('demo.. ready..');
		},
		data: function data() {
			return {
				user: 'sindy'
			};
		}
	};
	// </script>

/***/ },

/***/ 53:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"special-page\">\n\t<vtable sort-key=\"title\">\n\t\t<pager api=\"querySpecial\" slot=\"pager\"></pager>\n\t</vtable>\n</div>\n";

/***/ }

});