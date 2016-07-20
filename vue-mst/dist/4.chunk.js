webpackJsonp([4],{

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(117);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\special\\types\\index.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(131);
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

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(96);

	var _api = __webpack_require__(98);

	var _Tab = __webpack_require__(118);

	var _Tab2 = _interopRequireDefault(_Tab);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		name: 'SpecialView',
		ready: function ready() {
			console.log('demo.. ready..');
		},
		data: function data() {
			return {
				user: 'sindy',
				delModalShown: false,
				delRow: {},
				editRow: {},
				cols: [{ text: 'ID', name: 'id', sortable: true, order: 1 }, { text: '标题', name: 'title', sortable: true, order: 1 }, { text: '修改时间', name: 'mdate', sortable: true, order: 1 }, { text: '启用', name: 'open' }, { text: '操作', name: 'operation' }],
				alert: {
					type: 'success',
					show: true
				}
			};
		},

		events: {
			showDelModal: function showDelModal(row) {
				this.delRow = row;
				this.delModalShown = true;
			}
		},
		methods: {
			delSpecial: function delSpecial() {
				var _this = this;

				//注意 v-ref:delModal -> this.$refs.delmodal 会被转换为小写
				this.$refs.delmodal.close();
				_api.Special.remove({ sid: this.delRow.id }).then(function (res) {
					debugger;
					_this.updateTips('success', '删除成功: ' + _this.delRow.title);
					_this.tableEditing.$broadcast('reload');
				});
			},
			toggleAlert: function toggleAlert() {
				console.warn('in fn: toggleAlert');
				this.alert.show = !this.alert.show;
			},
			changeAlertType: function changeAlertType(t) {
				console.warn('in fn: changeAlertType');
				this.alert.type = t;
			}
		},
		vuex: {
			actions: {
				updateTips: _actions.updateTips
			}
		},
		components: {
			TabTypes: _Tab2.default
		}
	};

	// </script>
	// <template>
	// 	<div class="special-types-view">
	//
	// 		<h2>默认tab</h2>
	// 		<tab type="tabs">
	// 			<tab-pane header="在线专题">
	// 				<h2>在线专题</h2>
	//
	// 				<table is="vtable" sort-key="title" :columns="cols">
	// 					<tfoot is="pager" api="querySpecial" slot="pager"  v-ref:pager></tfoot>
	// 				</table>
	//
	// 			</tab-pane>
	// 			<tab-pane header="待办专题">
	// 				<h2>待办专题</h2>
	//
	// 				<table is="vtable" sort-key="title" :columns="cols">
	// 					<tfoot is="pager" api="querySpecial" slot="pager"  v-ref:pager></tfoot>
	// 				</table>
	// 			</tab-pane>
	// 		</tab>
	//
	// 		<alert :type="alert.type" dismissable :show.sync="alert.show" width="50%">
	// 			<strong>提示：</strong> 测试通过下拉列表控制alert组件的状态
	// 		</alert>
	//
	// 		<h2>定制tab</h2>
	// 		<tab-types type="pills" @alert-toggle="toggleAlert" @alert-type="changeAlertType">
	// 			<tab-pane header="HTML">
	// 				<h3>HTML</h3>
	// 				<p>hello HTML</p>
	// 			</tab-pane>
	// 			<tab-pane header="JS">
	// 				<h3>JS</h3>
	// 				<p>hello JS</p>
	// 			</tab-pane>
	// 			<tab-pane header="PHP">
	// 				<h3>PHP</h3>
	// 				<p>hello PHP</p>
	// 			</tab-pane>
	// 		</tab-types>
	//
	//
	// 		<modal title="删除确认"  effect="fade"  :show.sync="delModalShown" :onconfirm="delSpecial"  v-ref:delmodal>
	// 			<div class="modal-body" slot="modal-body">
	// 				<p>确定删除专题 <strong class="text-danger">{{delRow.title}}</strong> 吗?</p>
	// 			</div>
	// 		</modal>
	//
	//
	//
	// 	</div>
	// </template>
	//
	// <script>

/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(119);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\special\\types\\Tab.vue: named exports in *.vue files are ignored.");
	}
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
	    var id = "./Tab.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _public = __webpack_require__(2);

	var _Tab = __webpack_require__(120);

	var _Tab2 = _interopRequireDefault(_Tab);

	var _TabNav = __webpack_require__(128);

	var _TabNav2 = _interopRequireDefault(_TabNav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _public.createSubComponent)(_Tab2.default, {
		name: 'TabNavSpecialTypes',
		components: {
			TabNav: _TabNav2.default
		}
	});

	// </script>
	// <script>

/***/ },

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _keys = __webpack_require__(80);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __vue_script__, __vue_template__;
	__vue_script__ = __webpack_require__(129);
	if (__vue_script__ && __vue_script__.__esModule && (0, _keys2.default)(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\special\\types\\TabNav.vue: named exports in *.vue files are ignored.");
	}
	__vue_template__ = __webpack_require__(130);
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
	    var id = "./TabNav.vue";
	    if (!module.hot.data) {
	      hotAPI.createRecord(id, module.exports);
	    } else {
	      hotAPI.update(id, module.exports, __vue_template__);
	    }
	  })();
	}

/***/ },

/***/ 129:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<li :class="{active: tabNav.active}" @click="setActive(tabNav)">
	// 		<a>
	// 			<strong>{{tabNav.header}}</strong><i class="glyphicon glyphicon-heart"></i>haahhawqw
	// 			<dropdown v-if="tabNav.index===2" btn-text="下拉列表" :links="dropList" :onselect="selectItem"></dropdown>
	// 		</a>
	// 	</li>
	// </template>
	//
	// <script>
	exports.default = {
		name: 'TabNavSpecialTypes',
		props: {
			tabNav: Object,
			require: true
		},
		created: function created() {
			if (this.tabNav.index === 2) {
				this.dropList = [{ text: 'warning' }, { text: 'info' }, { text: 'danger' }, { text: 'toggle' }, { text: 'toggle too', disabled: true }, { text: '' }, { text: 'to home', url: '/index' }];
				this.selectItem = function (link, index, $event) {
					console.warn(link, index, $event.target.textContent);
					var text = $event.target.textContent;
					switch (text = text.toLowerCase()) {
						case 'warning':
						case 'info':
						case 'danger':
							this.$dispatch('alert-type', text);
							break;
						case 'toggle':
							this.$dispatch('alert-toggle');
							break;
						default:
					}
				};
			}
		},

		methods: {
			setActive: function setActive(tabNav) {
				this.$dispatch('activate', tabNav); // tab activate, nav 捕获事件并处理
				this.$dispatch('setActiveIndex', tabNav.index); //tabpane activate ,通过计算属性 关联activeIndex和tabpane.active
			}
		}
	};
	// </script>

/***/ },

/***/ 130:
/***/ function(module, exports) {

	module.exports = "\n<li :class=\"{active: tabNav.active}\" @click=\"setActive(tabNav)\">\n\t<a>\n\t\t<strong>{{tabNav.header}}</strong><i class=\"glyphicon glyphicon-heart\"></i>haahhawqw \n\t\t<dropdown v-if=\"tabNav.index===2\" btn-text=\"下拉列表\" :links=\"dropList\" :onselect=\"selectItem\"></dropdown>\n\t</a>\n</li>\n";

/***/ },

/***/ 131:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"special-types-view\">\n\t\n\t<h2>默认tab</h2>\n\t<tab type=\"tabs\">\n\t\t<tab-pane header=\"在线专题\">\n\t\t\t<h2>在线专题</h2>\n\t\t\t\n\t\t\t<table is=\"vtable\" sort-key=\"title\" :columns=\"cols\">\n\t\t\t\t<tfoot is=\"pager\" api=\"querySpecial\" slot=\"pager\"  v-ref:pager></tfoot>\n\t\t\t</table>\n\t\n\t\t</tab-pane>\n\t\t<tab-pane header=\"待办专题\">\n\t\t\t<h2>待办专题</h2>\n\t\t\t\n\t\t\t<table is=\"vtable\" sort-key=\"title\" :columns=\"cols\">\n\t\t\t\t<tfoot is=\"pager\" api=\"querySpecial\" slot=\"pager\"  v-ref:pager></tfoot>\n\t\t\t</table>\n\t\t</tab-pane>\n\t</tab>\n\n\t<alert :type=\"alert.type\" dismissable :show.sync=\"alert.show\" width=\"50%\">\n\t\t<strong>提示：</strong> 测试通过下拉列表控制alert组件的状态\n\t</alert>\n\n\t<h2>定制tab</h2>\n\t<tab-types type=\"pills\" @alert-toggle=\"toggleAlert\" @alert-type=\"changeAlertType\">\n\t\t<tab-pane header=\"HTML\">\n\t\t\t<h3>HTML</h3>\n\t\t\t<p>hello HTML</p>\n\t\t</tab-pane>\n\t\t<tab-pane header=\"JS\">\n\t\t\t<h3>JS</h3>\n\t\t\t<p>hello JS</p>\n\t\t</tab-pane>\n\t\t<tab-pane header=\"PHP\">\n\t\t\t<h3>PHP</h3>\n\t\t\t<p>hello PHP</p>\n\t\t</tab-pane>\n\t</tab-types>\n\t\n\n\t<modal title=\"删除确认\"  effect=\"fade\"  :show.sync=\"delModalShown\" :onconfirm=\"delSpecial\"  v-ref:delmodal>\n\t\t<div class=\"modal-body\" slot=\"modal-body\">\n\t\t\t<p>确定删除专题 <strong class=\"text-danger\">{{delRow.title}}</strong> 吗?</p>\n\t\t</div>\n\t</modal>\n\n\t\n\n</div>\n";

/***/ }

});