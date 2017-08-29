/**
 * zendesk_menus - Zendesk Menu widgets
 * @version v2.0.5
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define("ui_widgets", [], factory);
  else if(typeof exports === 'object')
    exports["ui_widgets"] = factory();
  else
    root["ui_widgets"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _shims = __webpack_require__(1);

  var _shims2 = _interopRequireDefault(_shims);

  var _menu = __webpack_require__(2);

  var _menu2 = _interopRequireDefault(_menu);

  var _select_menu = __webpack_require__(12);

  var _select_menu2 = _interopRequireDefault(_select_menu);

  var _combo_select_menu = __webpack_require__(19);

  var _combo_select_menu2 = _interopRequireDefault(_combo_select_menu);

  var _search_menu = __webpack_require__(24);

  var _search_menu2 = _interopRequireDefault(_search_menu);

  var _tag_menu = __webpack_require__(25);

  var _tag_menu2 = _interopRequireDefault(_tag_menu);

  var _highlighting_renderer = __webpack_require__(22);

  var _highlighting_renderer2 = _interopRequireDefault(_highlighting_renderer);

  var _simple_menu_datasource = __webpack_require__(29);

  var _simple_menu_datasource2 = _interopRequireDefault(_simple_menu_datasource);

  var _remote_search_datasource = __webpack_require__(30);

  var _remote_search_datasource2 = _interopRequireDefault(_remote_search_datasource);

  var _filtering_datasource = __webpack_require__(20);

  var _filtering_datasource2 = _interopRequireDefault(_filtering_datasource);

  var _vertical_menu_positioner = __webpack_require__(15);

  var _vertical_menu_positioner2 = _interopRequireDefault(_vertical_menu_positioner);

  var _make_jquery_plugin = __webpack_require__(32);

  var _make_jquery_plugin2 = _interopRequireDefault(_make_jquery_plugin);

  var _label_concatenator = __webpack_require__(10);

  var _label_concatenator2 = _interopRequireDefault(_label_concatenator);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // datasources
  (0, _shims2.default)();

  //parsers


  // dom helpers


  // renders


  var ZendeskMenus = window.ZendeskMenus = {
    Menu: _menu2.default,
    SelectMenu: _select_menu2.default,
    ComboSelectMenu: _combo_select_menu2.default,
    SearchMenu: _search_menu2.default,
    TagMenu: _tag_menu2.default,
    MenuUtils: {
      VerticalMenuPositioner: _vertical_menu_positioner2.default,
      HighlightingRenderer: _highlighting_renderer2.default,
      FilteringDataSource: _filtering_datasource2.default,
      SimpleMenuDataSource: _simple_menu_datasource2.default,
      RemoteSearchDataSource: _remote_search_datasource2.default,
      LabelConcatenator: _label_concatenator2.default,
      makeJqueryPlugin: _make_jquery_plugin2.default
    }
  };

  exports.default = ZendeskMenus;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = applyShims;
  function classList() {
    if ("classList" in document.documentElement) return;

    Object.defineProperty(window.Element.prototype, "classList", {
      get: function get() {
        var self = this;
        var rspaces = /\s+/g;
        var implement;

        function classlist() {
          return self.className.trim().split(rspaces);
        }

        function update(fn) {
          return function (value) {
            var classes = classlist();
            var index = classes.indexOf(value);

            fn(classes, index, value);
            self.className = classes.join(" ");

            implement.length = classes.length;
          };
        }

        implement = {
          length: function () {
            return classlist().length;
          }(),

          add: update(function (classes, index, value) {
            ~index || classes.push(value);
          }),

          remove: update(function (classes, index) {
            ~index && classes.splice(index, 1);
          }),

          toggle: update(function (classes, index, value) {
            ~index ? classes.splice(index, 1) : classes.push(value);
          }),

          contains: function contains(value) {
            return !!~classlist().indexOf(value);
          },

          item: function item(i) {
            return classlist()[i] || null;
          }
        };

        return implement;
      }
    });
  }

  function requestAnimationFrame() {
    var lastTime = 0;

    if (window.requestAnimationFrame) return;

    window.requestAnimationFrame = function (callback, element) {
      var currTime = Date.now();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  }

  function applyShims() {
    // IE9 simulation of classList
    classList();
    requestAnimationFrame();
  }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _core_utils = __webpack_require__(3);

  var _dom_utils = __webpack_require__(4);

  var _menu_transitions = __webpack_require__(5);

  var _menu_transitions2 = _interopRequireDefault(_menu_transitions);

  var _options_mixin = __webpack_require__(7);

  var _options_mixin2 = _interopRequireDefault(_options_mixin);

  var _observable_mixin = __webpack_require__(8);

  var _observable_mixin2 = _interopRequireDefault(_observable_mixin);

  var _menu_data_parser = __webpack_require__(9);

  var _menu_data_parser2 = _interopRequireDefault(_menu_data_parser);

  var _hash_iterator = __webpack_require__(11);

  var _hash_iterator2 = _interopRequireDefault(_hash_iterator);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // EVENTS
  // --------------------------------------------------------
  //
  // Triggers the following events through
  // dom element this.domHolder:
  // --------------------------------------------------------
  // - change,         params: source, oldValue, value, userInitiated
  // - focus,          params: source
  // - blur,           params: source
  // - disableChanged, params: source
  // - show,           params: source
  // - hide,           params: source
  // - keyDown         params: source, domEvent


  // MENU MODEL
  // --------------------------------------------------------
  //
  // Item interface:
  // --------------------------------------------------------
  // - id         -> internal field
  // - label      -> from data source
  // - value      -> from data source
  // - menu       -> array holding child items
  // - role       -> internal field
  // - parentItem -> internal field
  // - parentMenu -> internal field
  // - index      -> internal field
  // - isInDom    -> internal field

  // Menu interface:
  // --------------------------------------------------------
  // - id         -> internal field
  // - parentItem -> internal field
  // - parentMenu -> internal field
  // - isInDom    -> internal field

  // Item value rules:
  // --------------------------------------------------------
  // Values explicitly defined as 'null' or 'undefined'
  // are converted to the defaultValue value which should
  // not be null itself.
  // The value can be set to null when there is no value
  // specified explicitly.
  // The value cannot be set to null from parsed data.
  // The value can only be set to null internally.
  // The value of an item with children/menu is ignored.

  var START = 1;
  var END = 2;

  var defaultOptions = {
    value: null,
    defaultValue: '', // when initializing the control, all null values are converted to this value
    defaultValueLabel: '-',
    backLinkLabel: 'Back',

    domHolderSelector: null,

    disabled: false,

    transitionMode: 'sliding', // ['direct' | 'stacking' | 'sliding']
    transitionDuration: 300,
    transitionEasing: 'easeOutQuad', // easing function, borrowed from jQuery UI

    clsRoot: 'zd-menu-root',
    clsMenuPanelRoot: 'zd-menu-panel-root',

    clsMenuPanelHolder: 'zd-menu-panel-holder',
    clsListHolder: 'zd-menu-list-holder',
    clsItem: 'zd-menu-item',
    clsBackLink: 'zd-menu-back-link',
    clsMenuLink: 'zd-menu-link',
    clsLabel: 'zd-menu-label',
    clsBaseArrow: 'zd-selectmenu-base-arrow zd-icon-arrow-down',
    clsItemArrow: 'zd-menu-item-arrow zd-icon-arrow-right',
    clsBackArrow: 'zd-menu-item-arrow zd-icon-arrow-left',
    clsMenuItemIcon: 'zd-menu-item-icon',

    clsDisabled: 'zd-state-disabled',
    clsFocused: 'zd-state-focus',
    clsHover: 'zd-state-hover',
    clsZeroState: 'zd-state-zero',
    clsItemFocused: 'zd-item-focus',
    clsItemDisabled: 'zd-item-disabled',
    clsAutofitMode: 'zd-menu-autofit-mode',

    isVisible: true,
    autofitMode: true, // usually used for drop down menus flat model structure
    keyboardCue: false,
    keyboardCueAction: 'select', // can be ['select' | 'focus'],
    enableMenuItemIcons: false,
    enableHtmlEscape: true,

    goToStartAfterReachingEnd: false,
    goToEndAfterReachingStart: false,

    zeroStateMessgae: 'No items',
    hasZeroState: false
  };

  var instances = {};

  var Menu = function (_mixin) {
    _inherits(Menu, _mixin);

    _createClass(Menu, null, [{
      key: 'registerInstance',
      value: function registerInstance(instance) {
        this.instances[instance.id] = instance;
      }
    }, {
      key: 'unregisterInstance',
      value: function unregisterInstance(instance) {
        delete this.instances[instance.id];
      }
    }, {
      key: 'count',
      value: function count() {
        var c = 0;
        for (var i in this.instances) {
          if (this.instances.hasOwnProperty(i)) {
            c++;
          }
        }
        return c;
      }
    }, {
      key: 'zombies',
      value: function zombies() {
        var instance,
            zombies = [];

        for (var i in this.instances) {
          if (!this.instances.hasOwnProperty(i)) continue;
          instance = this.instances[i];
          if (instance.dom && !document.body.contains(instance.dom)) {
            zombies.push(instance);
          }
        }

        return zombies;
      }
    }, {
      key: 'registerAsActive',
      value: function registerAsActive(menuId) {
        this.activeMenuId = menuId;
        this.onActiveMenuSet();
      }
    }, {
      key: 'unregisterAsActive',
      value: function unregisterAsActive(menuId) {
        this.activeMenuId = this.activeMenuId === menuId ? null : this.activeMenuId;
      }
    }, {
      key: 'onActiveMenuSet',
      value: function onActiveMenuSet() {
        var _this2 = this;

        if (this._observesWindowResize) return;

        this._observesWindowResize = true;
        window.addEventListener('resize', function () {
          if (!_this2.activeMenuId) return;
          var instance = _this2.instances[_this2.activeMenuId];
          if (!instance) return;

          instance.onWindowResize ? instance.onWindowResize() : instance.close();
        }, false);
      }
    }, {
      key: 'defaultOptions',
      get: function get() {
        return defaultOptions;
      }
    }, {
      key: 'instances',
      get: function get() {
        return instances;
      }
    }]);

    function Menu(options) {
      _classCallCheck(this, Menu);

      var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, options));

      _this.type = 'zdMenu';
      _this.rootItem = null;
      _this.activeItem = null;
      _this.focusedItem = null;

      _this.isFocused = false;
      _this.isInDom = false;
      _this.isDestroyed = false;
      _this.isVisible = null;
      _this.isZeroState = false;
      _this.isKeyboardCaptured = false;
      _this.isKeyboardNavigation = false; // used to disable mouse selection while keyboard navigating
      _this.navigationMode = 'mouse'; //['mouse' | 'keyboard']
      _this.inTransition = false;

      _this.lastKey = null;
      _this.lastIndex = -1;
      _this.lastActiveMenu = null;

      _this.typeToClassMap = null;
      _this.roleToClassMap = null; // stylable roles: "uiBackLink", "uiMenuLink"

      _this.highlighter = null;

      // All classes subclassing this one should have premerged their default options.
      // Option merging is done only by the last subclass
      _this.setOptions(options, _this.defaultOptions);

      _this.parser = new _menu_data_parser2.default(_this, _this.postParser);
      _this.container = _this.options.container;

      _this.roleToClassMap = _this.roleToClassMap || {};
      _this.roleToClassMap.uiBackLink = _this.roleToClassMap.uiBackLink || _this.clsBackLink;
      _this.roleToClassMap.uiMenuLink = _this.roleToClassMap.uiMenuLink || _this.clsMenuLink;
      _this.roleToClassMap.uiLabel = _this.roleToClassMap.uiLabel || _this.clsLabel;

      _this.id = (0, _core_utils.getUniqId)();
      _this.domMenuPanelId = (0, _core_utils.getUniqId)();
      _this.hasChrome = !!options.renderMenuPanel;

      _this.rootItem = { role: 'root' };
      _this.hashIds = {};
      _this.hashValues = {};
      _this.value = _this.options.value == null ? _this.defaultValue : _this.options.value;
      _this.lastValue = _this.defaultValue;

      _this.renderMenuPanel = _this.options.renderMenuPanel || _this.renderMenuPanel;
      _this.renderDisplayValue = _this.options.renderDisplayValue;
      _this.renderItemContent = _this.options.renderItemContent || _this.renderItemContent;
      _this.renderItemIcon = _this.options.renderItemIcon || _this.renderItemIcon;
      _this.renderZeroState = _this.options.renderZeroState || _this.renderZeroState;

      _this.syncWithValue = true;

      if (_this.hasChrome) {
        _this.clsRoot = _this.clsRoot + ' ' + _this.clsMenuPanelRoot;
      }

      if (_this.domHolder) {
        // compatibility with jquery
        if (typeof _this.domHolder === 'string') {
          _this.domHolderSelector = _this.domHolder;
          _this.domHolder = document.querySelector(_this.domHolderSelector);
        } else {
          _this.domHolder = _this.domHolder[0] ? _this.domHolder[0] : _this.domHolder;
        }
      }

      if (_this.domHolder || _this.domHolderSelector) {
        _this.appendTo(_this.domHolder || document.querySelector(_this.domHolderSelector));
      }
      return _this;
    }

    _createClass(Menu, [{
      key: 'domById',
      value: function domById(id) {
        return (0, _dom_utils.domById)(id, this.domHolder);
      }
    }, {
      key: 'appendTo',
      value: function appendTo(target) {
        if (this.isInDom || !target) return;

        this.domHolder = target;

        Menu.registerInstance(this);
        this.onSetup && this.onSetup();

        this.htmlBuffer = this.render();
        this.putInDom();
        this.postDomInsertionSetup();

        this.data && this.loadData(this.data);
        this.value = this.options.value != null ? this.options.value : this.defaultValue;
        this.activeItem = this.hashValues[this.value];
        this.syncViewWithValue(true);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.trigger('beforeDestroy');
        this.destroyUI();
        this.off();
        Menu.unregisterInstance(this);
        this.onDestroy();
        (0, _core_utils.cleanObject)(this);
        this.isDestroyed = true;
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.setValue(this.options.value);
      }
    }, {
      key: 'resetFull',
      value: function resetFull() {
        this.resetUI();

        this.rootItem = { role: 'root' };
        this.data = {};
        this.hashIds = {};
        this.hashValues = {};

        this.value = this.defaultValue;
        this.lastValue = this.defaultValue;
        this.activeItem = null;
        this.focusedItem = null;
      }
      // ----------------------------------------------
      //                      Model
      // ----------------------------------------------

    }, {
      key: 'loadData',
      value: function loadData(data) {
        this.onBeforeLoad && this.onBeforeLoad();
        var isFocused = this.isFocused;
        this.resetFull();

        this.data = data;
        this.parser.parse(this.data);
        this.onDataReady();

        this.lastValue = this.defaultValue;
        this.focusedItem = null;

        this.resolveAutofitMode();
        this.resolveZeroState();

        this.syncViewWithZeroState();
        this.syncViewWithMode();
        this.syncViewWithValue();

        isFocused && this.focus();
        this.onLoad && this.onLoad();
        this.trigger('dataLoaded');
      }
    }, {
      key: 'loadPartialData',
      value: function loadPartialData(menu, data) {
        this.parser.parsePartial(menu, data);
        this.syncViewWithZeroState();
        this.syncViewWithMode();

        if (this.activeMenu === menu && this.isVisible) {
          var menuDom = this.putMenuInDom(menu);
          menuDom.setAttribute('aria-expanded', 'true');
          menuDom.style.display = 'block';
          this.forceTrueScrollHeightForMenu(menuDom);
        }
      }
    }, {
      key: 'getValue',
      value: function getValue() {
        return this.value;
      }

      // source can be - ['click' | 'keyboard' | 'keyboardCue']

    }, {
      key: 'setValue',
      value: function setValue(value, source, activeItem) {
        var item = this.getItemByValue(value);

        var eventData = {
          oldValue: this.lastValue,
          value: value,
          userInitiated: source === 'click' || source === 'keyboard' || source === 'keyboardCue',
          source: source,
          record: item
        };

        if (this.onChangeRequest(eventData) === false) return false;

        if (this.itemIsDisabled(item)) return false;

        if (value == null || !item) {
          value = this.defaultValue;
        }

        this.value = value;

        if (this.lastValue !== this.value) {
          this.lastValue = this.value;
          this.activeItem = this.hashValues[this.value] || activeItem;
          this.syncWithValue && this.syncViewWithValue();
          this.onChange(eventData);
          this.trigger('change', eventData);
        }
      }
    }, {
      key: 'getDisplayValue',
      value: function getDisplayValue() {
        if (this.activeItem) {
          if (this.options.renderDisplayValue) {
            return this.options.renderDisplayValue(this.activeItem, _core_utils.escapeHtml);
          } else {
            return this.enableHtmlEscape && this.activeItem.enableHtmlEscape ? (0, _core_utils.escapeHtml)(this.activeItem.label) : this.activeItem.label;
          }
        }
        return this.defaultValueLabel;
      }
    }, {
      key: 'getParentMenu',
      value: function getParentMenu(item) {
        var parentItem = item.parentItem;
        if (parentItem == null || parentItem && parentItem.role === 'root') {
          return null;
        }
        return parentItem.parentMenu;
      }
    }, {
      key: 'getItemByValue',
      value: function getItemByValue(value) {
        return this.hashValues ? this.hashValues[value] : null;
      }
    }, {
      key: 'getItemIndex',
      value: function getItemIndex(item) {
        if (!item.parentMenu) return -1;
        for (var i = 0, menu = item.parentMenu, len = menu.length; i < len; i++) {
          if (menu[i] === item) return i;
        }
        return -1;
      }
    }, {
      key: 'getItemIterator',
      value: function getItemIterator() {
        if (!this._itemIterator) {
          this._itemIterator = new _hash_iterator2.default();
        }
        this._itemIterator.data = this.hashValues || {};
        return this._itemIterator;
      }
    }, {
      key: 'domToItem',
      value: function domToItem(dom) {
        return this.hashIds[typeof dom === 'string' ? dom : dom.id];
      }
    }, {
      key: 'itemToDom',
      value: function itemToDom(item) {
        return this.domById(item.id);
      }
    }, {
      key: 'itemHasMenu',
      value: function itemHasMenu(item) {
        return !!(item.menu && item.menu.length);
      }
    }, {
      key: 'itemIsDisabled',
      value: function itemIsDisabled(item) {
        return !!(item && item.hasOwnProperty('enabled') && item.enabled === false);
      }
    }, {
      key: 'itemIsSelectable',
      value: function itemIsSelectable(item) {
        return item != null && item.role !== 'uiLabel' && !this.itemIsDisabled(item);
      }
    }, {
      key: 'itemIsBackHelper',
      value: function itemIsBackHelper(item) {
        return item.role === 'uiBackLink';
      }
    }, {
      key: 'firstSelectableMenuItem',
      value: function firstSelectableMenuItem(menu) {
        return menu && this._getNextSelectableItem(menu, 0);
      }
    }, {
      key: 'resolveAutofitMode',
      value: function resolveAutofitMode() {
        if (this.rootItem && this.rootItem.menu) {
          var rootMenu = this.rootItem.menu;
          for (var i = 0; i < rootMenu.length; i++) {
            if (rootMenu[i].menu) {
              this.autofitMode = false;
              return;
            }
          }
        }
        this.autofitMode = true;
      }

      // ----------------------------------------------
      //                      View
      // ----------------------------------------------

    }, {
      key: 'destroyUI',
      value: function destroyUI() {
        if (this.isInDom) {
          this.dom.parentNode.removeChild(this.dom);
          this.offDom();
        }
        this.isInDom = false;
        this.domHolder = null;
        this.domRef = null;
        this.domMenuPanel = null;
      }
    }, {
      key: 'resetUI',
      value: function resetUI() {
        this.activeItem = null;
        this.focusedItem = null;
        if (this.isInDom) {
          this.blur();
          var elements = this.domMenuPanel.querySelectorAll(':not(.zd-zero-state-holder)');
          [].forEach.call(elements, function (el) {
            return el.parentNode.removeChild(el);
          });
          (0, _dom_utils.removeClass)(this.dom, this.clsHover);
        }
      }

      // -------------------- Rendering and DOM Manipulation -----------------------

    }, {
      key: 'render',
      value: function render() {
        return '<div id="' + this.id + '" class="' + this.clsRoot + '"' + (this.isVisible ? '' : ' style="display:none"') + '>' + this.renderZeroState() + this.renderMenuPanel() + '</div>';
      }
    }, {
      key: 'renderMenuPanel',
      value: function renderMenuPanel() {
        return '';
      }
    }, {
      key: 'renderZeroState',
      value: function renderZeroState() {
        if (!this.hasZeroState) return '';
        return '<div class="zd-zero-state-holder">' + this.zeroStateMessgae + '</div>';
      }
    }, {
      key: 'renderMenu',
      value: function renderMenu(menu) {
        if (!menu) {
          return '';
        }

        var html = ['<ul id="' + menu.id + '" class="' + this.clsListHolder + '" role="menu">'];

        for (var i = 0, len = menu.length; i < len; i++) {
          html[html.length] = this.renderItem(menu[i]);
        }

        html[html.length] = '</ul>';
        return html.join('');
      }
    }, {
      key: 'renderItem',
      value: function renderItem(item) {
        var arrowHtml;

        var itemClass = this.clsItem;

        if (this.typeToClassMap && item.type && this.typeToClassMap[item.type]) {
          itemClass += ' ' + this.typeToClassMap[item.type];
        }
        if (this.roleToClassMap && item.role && this.roleToClassMap[item.role]) {
          itemClass += ' ' + this.roleToClassMap[item.role];
        }
        if (this.itemIsDisabled(item)) {
          itemClass += ' ' + this.clsItemDisabled;
        }
        if (item.value != null) {
          itemClass += ' zd-leaf';
        }

        if (item.menu) {
          arrowHtml = '<span class="' + this.clsItemArrow + '"></span>';
        } else if (item.role === 'uiBackLink') {
          item.label = this.backLinkLabel;
          arrowHtml = '<span class="' + this.clsBackArrow + '"></span>';
        } else {
          arrowHtml = '';
        }

        var menuItemIconHtml = this.enableMenuItemIcons ? this.renderItemIcon(item) : '';

        return '<li id="' + item.id + '" class="' + itemClass + '" role="presentation">' + arrowHtml + menuItemIconHtml + '<a tabindex="-1" role="menuitem">' + this.renderItemContent(item, this.highlighter, _core_utils.escapeHtml) + '</a>' + '</li>';
      }
    }, {
      key: 'renderItemIcon',
      value: function renderItemIcon(item) {
        return '<span class="' + this.clsMenuItemIcon + '"></span>';
      }
    }, {
      key: 'renderItemContent',
      value: function renderItemContent(item, highlighter, escapeHtml) {
        if (highlighter) {
          return highlighter(item.label);
        } else {
          return escapeHtml && this.enableHtmlEscape && item.enableHtmlEscape ? escapeHtml(item.label) : item.label;
        }
      }
    }, {
      key: 'putInDom',
      value: function putInDom() {
        if (this.isInDom) {
          return;
        }
        if (this.domRef) {
          this.domRef.insertAdjacentHTML('beforebegin', this.htmlBuffer);
          this.domRef.parentNode.removeChild(this.domRef);
        } else {
          this.domHolder.insertAdjacentHTML('beforeend', this.htmlBuffer);
        }
        this.dom = this.domHolder.querySelector('#' + this.id);

        this.domMenuPanel = this.domHolder.querySelector('#' + this.domMenuPanelId);

        if (!this.domMenuPanel) {
          if (this.hasChrome) {
            throw new Error('The provided renderMenuPanel function does not render an element with id: ', this.domMenuPanelId);
          }
          this.domMenuPanel = this.dom;
          this.domMenuPanelId = this.id;
        }

        this.isInDom = true;
        this.syncViewWithMode();
        this.syncViewWithZeroState();
        this.syncViewWithDisabledState();
        this.htmlBuffer = '';
      }
    }, {
      key: 'putMenuInDom',
      value: function putMenuInDom(menu) {
        if (!menu) {
          return null;
        }

        var menuDom = this.domById(menu.id);

        if (menuDom) {
          menuDom.insertAdjacentHTML('beforebegin', this.renderMenu(menu));
          menuDom.parentNode.removeChild(menuDom);
          menuDom = this.domById(menu.id);
        } else {
          this.domMenuPanel.insertAdjacentHTML('beforeend', this.renderMenu(menu));
        }
        menu.isInDom = true;

        for (var i = 0, len = menu.length; i < len; i++) {
          menu[i].isInDom = true;
        }

        menuDom = this.domById(menu.id);
        menuDom.style.display = 'none';

        return menuDom;
      }
    }, {
      key: 'postDomInsertionSetup',
      value: function postDomInsertionSetup() {
        var _this3 = this;

        var docClickHandler = function docClickHandler(e) {
          return _this3.onDocumentClick(e);
        };

        this.onDom(this.domMenuPanel, 'mouseup', function (e) {
          return _this3.onRootMouseUp(e);
        }).onDom(this.domMenuPanel, 'mousemove', function (e) {
          return _this3.onRootMouseMove(e);
        }).onDom(this.domMenuPanel, 'mouseover', function (e) {
          return _this3.onRootMouseOver(e);
        }).onDom(this.domMenuPanel, 'mouseout', function (e) {
          return _this3.onRootMouseOut(e);
        }).onDom(this.dom, 'mouseenter', function (e) {
          return _this3.onRootMouseEnter(e);
        }).onDom(this.dom, 'mouseleave', function (e) {
          return _this3.onRootMouseLeave(e);
        }).onDom(this.dom, 'mousedown', function (e) {
          return _this3.onRootMouseDown(e);
        }).on('show', function () {
          return _this3.onDom(document, 'click', docClickHandler);
        }).on('hide', function () {
          return _this3.offDom(document, 'click', docClickHandler);
        });
      }
    }, {
      key: 'setMenuSizes',
      value: function setMenuSizes(refDom) {
        if (!this.dom) return;

        // position the wrapper below the base;
        refDom = refDom || this.domHolder;
        this.dom.style.width = refDom.offsetWidth + 'px';
      }
    }, {
      key: 'syncViewWithMode',
      value: function syncViewWithMode() {
        if (this.isInDom) {
          (0, _dom_utils.toggleClass)(this.dom, this.clsAutofitMode, this.autofitMode);
        }
      }
    }, {
      key: 'syncViewWithValue',
      value: function syncViewWithValue(withFocus) {
        withFocus = withFocus == null ? true : withFocus;

        if (this.isInDom && this.isVisible) {
          if (this.activeItem) {
            this.showMenu(this.activeItem.parentMenu, withFocus ? this.activeItem : null);
          } else {
            this.showMenu(this.rootItem.menu, withFocus ? this.firstSelectableMenuItem(this.rootItem.menu) : null);
          }
        }
      }

      // -------------------- General Menu Operations -----------------------

    }, {
      key: 'focus',
      value: function focus() {
        if (this.isFocused || this.disabled) {
          return;
        }

        this.isFocused = true;

        (0, _dom_utils.addClass)(this.dom, this.clsFocused);
        this.captureKeyboard();

        this.onFocus();
        this.trigger('focus');
      }
    }, {
      key: 'blur',
      value: function blur() {
        if (!this.isFocused) {
          return;
        }
        this.trigger('beforeBlur');
        this.isFocused = false;
        (0, _dom_utils.removeClass)(this.dom, this.clsFocused);
        this.releaseKeyboard();
        this.blurItem(this.focusedItem);
        this.focusedItem = null;

        this.onBlur();
        this.trigger('blur');
      }
    }, {
      key: 'disable',
      value: function disable() {
        this.setDisableState(true);
      }
    }, {
      key: 'enable',
      value: function enable() {
        this.setDisableState(false);
      }
    }, {
      key: 'setDisableState',
      value: function setDisableState(isDisabled) {
        if (isDisabled === this.disabled) return;

        this.disabled = isDisabled;
        this.syncViewWithDisabledState();
        this.onDisabledChanged();
        this.trigger('disableChanged');
      }
    }, {
      key: 'syncViewWithDisabledState',
      value: function syncViewWithDisabledState() {
        if (this.disabled) {
          this.blur();
        }
        (0, _dom_utils.toggleClass)(this.dom, this.clsDisabled, this.disabled);
      }
    }, {
      key: 'show',
      value: function show(syncWithValue, adjustMenuSize) {
        if (this.isVisible) {
          return;
        }

        syncWithValue = syncWithValue == null ? true : syncWithValue;
        adjustMenuSize = adjustMenuSize == null ? true : adjustMenuSize;

        this.isVisible = true;
        this.isKeyboardNavigation = false;
        adjustMenuSize && this.setMenuSizes();
        this.syncViewWithMode();
        this.dom.style.display = '';
        this.syncViewWithValue(syncWithValue);
        this.onShow();
        this.trigger('show');
      }
    }, {
      key: 'hide',
      value: function hide() {
        if (!this.isVisible) {
          return;
        }
        this.isVisible = false;
        this.dom.style.display = 'none';
        this.blurItem(this.focusedItem);
        this.onHide();
        this.trigger('hide');
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        this.isVisible ? this.hide() : this.show();
      }
    }, {
      key: 'showMenu',
      value: function showMenu(menu, itemToFocus, transition, navMethod) {
        var _this4 = this;

        var menuDom;
        navMethod = navMethod || 'none'; // can be ['keyboard' | 'click' | 'none']
        if (!menu || this.inTransition) return;

        itemToFocus = itemToFocus && itemToFocus.role !== 'root' ? itemToFocus : null;

        this.trigger('beforeShowMenu', { menu: menu });

        if (this.activeMenu === menu) {
          this._resizeToParentWidth(this.domById(menu.id));
          itemToFocus && this.focusItem(itemToFocus, true);
        } else {
          menuDom = this.putMenuInDom(menu);
          if (!menuDom) {
            return;
          }
          menuDom.setAttribute('aria-expanded', 'true');

          menuDom.style.display = '';
          this._resizeToParentWidth(menuDom);
          this.forceTrueScrollHeightForMenu(menuDom);

          if (navMethod === 'click') {
            this.positionItemInView(itemToFocus);
          } else if (itemToFocus) {
            this.focusItem(itemToFocus, true);
          }

          (transition || this.transitions.direct).call(this, menu, this.activeMenu, function () {
            return _this4._resizeToParentWidth(menuDom);
          });

          this.activeMenu = menu;
        }
      }

      // Necessary because Chrome does not set the width of a block inner element
      // to the client width of the parent. This happens when the scroll element
      // sizes are tweaked through CSS.

    }, {
      key: '_resizeToParentWidth',
      value: function _resizeToParentWidth(dom) {
        if (!dom || !dom.parentNode) return;
        dom.style.width = dom.parentNode.clientWidth + 'px';
      }
    }, {
      key: 'forceTrueScrollHeightForMenu',
      value: function forceTrueScrollHeightForMenu(menuDom) {
        if (!this.domMenuShim) {
          this.domMenuShim = document.createElement('div');
          this.domMenuShim.style.cssText = 'position:absolute;top:0;left:0;width:1px';
          this.domMenuPanel.insertBefore(this.domMenuShim, this.domMenuPanel.firstChild);
        }
        this.domMenuShim.style.height = menuDom.offsetHeight + 'px';
      }
    }, {
      key: 'hideMenu',
      value: function hideMenu(menu) {
        if (!menu) {
          return;
        }
        var menuDom = this.domById(menu.id);

        if (menuDom) {
          menuDom.setAttribute('aria-expanded', 'false');
          menuDom.style.display = 'none';
        }
      }
    }, {
      key: 'activateItem',
      value: function activateItem(item, source) {
        if (item == null || this.itemIsDisabled(item) || this.disabled) {
          return;
        }

        if (this.inTransition) {
          return;
        }

        this.navigationMode = source || 'mouse';

        if (this.itemHasMenu(item)) {
          this.showMenu(item.menu, this.firstSelectableMenuItem(item.menu), this.getTransition('Left'), source);
        } else if (this.itemIsBackHelper(item)) {
          this.showMenu(item.parentMenu.parentMenu, item.parentMenu.parentItem, this.getTransition('Right'), source);
        } else {
          this.setValue(item.value, source, item);
        }
      }
    }, {
      key: 'focusItem',
      value: function focusItem(item, shouldPositionToItem) {
        if (this.disabled) return;
        if (this.focusedItem) {
          this.blurItem(this.focusedItem);
        }

        if (!item) return;

        var domItem = this.domById(item.id);
        if (!domItem) return;

        this.focusedItem = item;

        (0, _dom_utils.addClass)(domItem, this.clsItemFocused);
        shouldPositionToItem && this.positionItemInView(item);
        this.trigger('itemFocused', this.focusedItem);
      }
    }, {
      key: 'blurItem',
      value: function blurItem(item) {
        if (!item) {
          return;
        }

        var domItem = this.domById(item.id);
        domItem && (0, _dom_utils.removeClass)(domItem, this.clsItemFocused);
        this.trigger('itemBlurred', item);
      }
    }, {
      key: 'resolveZeroState',
      value: function resolveZeroState() {
        var oldIsZeroState = this.isZeroState;
        this.isZeroState = !(this.rootItem.menu && this.rootItem.menu.length > 0);
        if (oldIsZeroState !== this.isZeroState) {
          this.trigger('zeroStateChanged');
        }
      }
    }, {
      key: 'syncViewWithZeroState',
      value: function syncViewWithZeroState() {
        if (this.dom) {
          (0, _dom_utils.toggleClass)(this.dom, this.clsZeroState, this.isZeroState);
        }
      }
    }, {
      key: 'positionItemInView',
      value: function positionItemInView(item) {
        if (!item) {
          return;
        }

        var domMenuPanel = this.domMenuPanel;
        var domItem = this.domById(item.id);

        if (!domItem) {
          return;
        }

        var itemOffsetTop = domItem.offsetTop;
        var scrollTop = itemOffsetTop - domMenuPanel.offsetHeight / 2 + domItem.offsetHeight / 2;
        domMenuPanel.scrollTop = scrollTop;
      }
    }, {
      key: 'getNaturalCoords',
      value: function getNaturalCoords() {
        if (!this.isInDom) return 0;

        var restrictedHeight = this.dom.offsetHeight;
        this.resetHeight();
        var coords = this.dom.getBoundingClientRect();
        this.setHeight(restrictedHeight);
        return coords;
      }
    }, {
      key: 'setHeight',
      value: function setHeight(height) {
        this.dom.style.height = height + 'px';
      }
    }, {
      key: 'resetHeight',
      value: function resetHeight() {
        this.dom.style.height = '';
        this.domMenuPanel.style.height = '';
      }
    }, {
      key: 'isEmpty',
      value: function isEmpty() {
        if (!this.rootItem || !this.rootItem.menu) return true;
        return this.rootItem.menu.length === 0;
      }
      // -------------------- Helper Functions -----------------------

    }, {
      key: '_manageNavigationMode',
      value: function _manageNavigationMode(e) {
        if (this.isKeyboardNavigation && this._lastClientX === e.clientX && this._lastClientY === e.clientY) {} else {
          this.isKeyboardNavigation = false;
        }
        this._lastClientX = e.clientX;
        this._lastClientY = e.clientY;
      }
    }, {
      key: 'resolveItemFromDom',
      value: function resolveItemFromDom(domNode) {
        var wrapper = this.domMenuPanel;

        while (domNode !== wrapper) {
          if (domNode.tagName === 'LI') {
            return this.domToItem(domNode);
          }
          domNode = domNode.parentNode;
        }
        return null;
      }
    }, {
      key: 'containsNode',
      value: function containsNode(node) {
        if (!this.isInDom || !node) return false;

        return this.dom.contains(node) || this.dom === node;
      }

      // ----------------------   Hooks   -------------------------

    }, {
      key: 'onDataReady',
      value: function onDataReady() {}
    }, {
      key: 'onChange',
      value: function onChange() {}
    }, {
      key: 'onChangeRequest',
      value: function onChangeRequest() {}
    }, {
      key: 'onFocus',
      value: function onFocus() {}
    }, {
      key: 'onBlur',
      value: function onBlur() {}
    }, {
      key: 'onShow',
      value: function onShow() {}
    }, {
      key: 'onHide',
      value: function onHide() {}
    }, {
      key: 'onDisabledChanged',
      value: function onDisabledChanged() {}
    }, {
      key: 'onDestroy',
      value: function onDestroy() {}
    }, {
      key: 'onCueMatch',
      value: function onCueMatch() {}

      // -------------------- Event Handlers -----------------------

    }, {
      key: 'onDocumentClick',
      value: function onDocumentClick(e) {
        if (!this.dom) return;

        if (!this.containsNode(e.target)) {
          this.blur();
        }
      }
    }, {
      key: 'onRootMouseEnter',
      value: function onRootMouseEnter(e) {
        (0, _dom_utils.addClass)(this.dom, this.clsHover);
      }
    }, {
      key: 'onRootMouseLeave',
      value: function onRootMouseLeave(e) {
        (0, _dom_utils.removeClass)(this.dom, this.clsHover);
      }
    }, {
      key: 'onRootMouseOver',
      value: function onRootMouseOver(e) {
        if (this.isKeyboardNavigation) {
          return;
        }

        var item = this.resolveItemFromDom(e.target);
        item && item.role !== 'uiLabel' && this.focusItem(item);
        // maybe also speculatively prerender the next menu if not rendered
      }
    }, {
      key: 'onRootMouseOut',
      value: function onRootMouseOut(e) {
        if (e.target.tagName === 'LI') {
          var item = this.domToItem(e.target);
          item && item.role !== 'uiLabel' && this.blurItem(item);
        }
        // maybe blur the currently focused item?
      }
    }, {
      key: 'onRootMouseUp',
      value: function onRootMouseUp(e) {
        var item = this.resolveItemFromDom(e.target);
        item && item.role !== 'uiLabel' && this.activateItem(item, 'click');
      }
    }, {
      key: 'onRootMouseDown',
      value: function onRootMouseDown(e) {
        var _this5 = this;

        this.menuWasJustActivated = true;
        setTimeout(function () {
          return _this5.menuWasJustActivated = false;
        }, 10);
      }
    }, {
      key: 'onRootMouseMove',
      value: function onRootMouseMove(e) {
        this._manageNavigationMode(e);
      }
    }, {
      key: 'onWindowResize',
      value: function onWindowResize() {
        this.close();
      }

      // -------------------- Menu Transitions -----------------------

      // direction can be ['Left' | 'Right']

    }, {
      key: 'getTransition',
      value: function getTransition(direction) {
        return this.transitionMode === 'direct' ? this.transitions.direct : this.transitions[this.transitionMode + direction];
      }
    }, {
      key: 'captureKeyboard',

      // -------------------- Keyboard Navigation -----------------------

      value: function captureKeyboard() {
        var _this6 = this;

        if (this.isKeyboardCaptured || this.disabled) {
          return;
        }
        this.isKeyboardCaptured = true;
        this.onDom(document, 'keydown', function (e) {
          return _this6.onKeyDown(e);
        });
        if (this.keyboardCue) {
          this.onDom(document, 'keypress', function (e) {
            return _this6.onKeyPress(e);
          });
        }
        this.trigger('keyboardCaptured');
      }
    }, {
      key: 'releaseKeyboard',
      value: function releaseKeyboard() {
        this.isKeyboardCaptured = false;
        this.offDom(document, 'keydown');
        if (this.keyboardCue) {
          this.offDom(document, 'keypress');
        }
        this.trigger('keyboardReleased');
      }
    }, {
      key: 'cueMatch',
      value: function cueMatch(menu, key, from, to) {
        menu = menu || this._getActiveMenu();
        if (!menu) return false;

        from = from || 0;
        to = to || menu.length;

        for (var i = from; i < to; i++) {
          if (menu[i].role === 'uiBackLink' || menu[i].role === 'uiLabel') continue;

          if (menu[i].label.charAt(0).toLowerCase() === key) {
            this.lastIndex = i;
            if (!this.isVisible) {
              this.show(false);
            }

            if (this.keyboardCueAction === 'focus') {
              this.focusItem(menu[i], true);
            } else {
              this.setValue(menu[i].value, 'keyboardCue');
            }
            this.onCueMatch(menu[i]);
            return true;
          }
        }
        return false;
      }
    }, {
      key: '_getActiveMenu',
      value: function _getActiveMenu() {
        return this.activeMenu || this.activeItem && this.activeItem.parentMenu || this.rootItem.menu;
      }
    }, {
      key: 'onKeyPress',
      value: function onKeyPress(e) {
        var key = String.fromCharCode(e.charCode).toLowerCase(),
            activeMenu = this._getActiveMenu();

        if (!activeMenu) return;

        if (e.charCode === 91) return;

        if (this.lastActiveMenu !== activeMenu || this.lastKey !== key) {
          this.lastIndex = -1;
        }

        this.lastActiveMenu = activeMenu;
        this.lastKey = key;

        if (this.cueMatch(activeMenu, key, this.lastIndex + 1, activeMenu.length)) return;
        if (this.cueMatch(activeMenu, key, 0, this.lastIndex + 1)) return;
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(e) {
        if (!this.activeMenu) return;

        switch (e.keyCode) {
          case _core_utils.keyCodes.HOME:
            this.moveToStart();e.preventDefault();break;
          case _core_utils.keyCodes.END:
            this.moveToEnd();e.preventDefault();break;
          case _core_utils.keyCodes.PAGE_DOWN:
            this.pgDown();e.preventDefault();break;
          case _core_utils.keyCodes.PAGE_UP:
            this.pgUp();e.preventDefault();break;
          case _core_utils.keyCodes.DOWN:
            this.moveDown();e.preventDefault();break;
          case _core_utils.keyCodes.UP:
            this.moveUp();e.preventDefault();break;
          case _core_utils.keyCodes.LEFT:
            this.moveToLeft();e.preventDefault();break;
          case _core_utils.keyCodes.ENTER:
          case _core_utils.keyCodes.NUMPAD_ENTER:
          case _core_utils.keyCodes.RIGHT:
          case _core_utils.keyCodes.TAB:
            this.activateItem(this.focusedItem, 'keyboard');e.preventDefault();break;
        }

        this.trigger('keyDown', { domEvent: e });
      }
    }, {
      key: 'getItemsPerPage',
      value: function getItemsPerPage() {
        if (!this.activeMenu) return 0;
        if (this.activeMenu.length === 0) return 0;
        var domWrapper = this.domMenuPanel;
        var domFirstItem = this.itemToDom(this.activeMenu[0]);

        return Math.floor(domWrapper.offsetHeight / domFirstItem.offsetHeight);
      }
    }, {
      key: '_moveToItem',
      value: function _moveToItem(offset, outOfRangePosition) {
        this.navigationMode = 'keyboard';
        if (!this.activeMenu) return;

        var itemToFocus = void 0;
        var isAtEnd = false;
        var isAtStart = false;
        var isEmpty = this.isEmpty();

        if (this.focusedItem) {
          var startIndex = this.getItemIndex(this.focusedItem) + offset;
          if (offset > 0) {
            itemToFocus = this._getNextSelectableItem(this.activeMenu, startIndex);

            if (!itemToFocus && !isEmpty) isAtEnd = true;
            if (!itemToFocus && outOfRangePosition === START) {
              itemToFocus = this._getNextSelectableItem(this.activeMenu, 0);
            }
          } else {
            itemToFocus = this._getPrevSelectableItem(this.activeMenu, startIndex);

            if (!itemToFocus && !isEmpty) isAtStart = true;
            if (!itemToFocus && outOfRangePosition === END) {
              itemToFocus = this._getPrevSelectableItem(this.activeMenu, this.activeMenu.length - 1);
            }
          }
        } else {
          itemToFocus = this._getNextSelectableItem(this.activeMenu, 0);
        }

        this.isKeyboardNavigation = true;

        if (isAtStart || isAtEnd) {
          this.trigger('outOfRangeNavigation', isAtStart && 'start' || isAtEnd && 'end');
        }

        if (itemToFocus) {
          this.focusItem(itemToFocus, true);
        }
      }
    }, {
      key: '_getNextSelectableItem',
      value: function _getNextSelectableItem(menu, from) {
        var item;
        from = from || 0;
        if (!menu) return;

        for (var i = from; i < menu.length; i++) {
          item = menu[i];
          if (this.itemIsSelectable(item)) return item;
        }
      }
    }, {
      key: '_getPrevSelectableItem',
      value: function _getPrevSelectableItem(menu, from) {
        var item;

        for (var i = from; i >= 0; i--) {
          item = menu[i];
          if (this.itemIsSelectable(item)) return item;
        }
      }
    }, {
      key: 'pgDown',
      value: function pgDown() {
        this._moveToItem(this.getItemsPerPage(), this.goToStartAfterReachingEnd ? START : END);
      }
    }, {
      key: 'pgUp',
      value: function pgUp() {
        this._moveToItem(-this.getItemsPerPage(), this.goToEndAfterReachingStart ? END : START);
      }
    }, {
      key: 'moveDown',
      value: function moveDown() {
        this._moveToItem(1, this.goToStartAfterReachingEnd ? START : END);
      }
    }, {
      key: 'moveUp',
      value: function moveUp() {
        this._moveToItem(-1, this.goToEndAfterReachingStart ? END : START);
      }
    }, {
      key: 'moveToStart',
      value: function moveToStart() {
        if (!this.activeMenu) {
          return;
        }
        this.isKeyboardNavigation = true;
        var itemToFocus = this._getNextSelectableItem(this.activeMenu, 0);
        itemToFocus && this.focusItem(itemToFocus, true);
      }
    }, {
      key: 'moveToEnd',
      value: function moveToEnd() {
        if (!this.activeMenu) {
          return;
        }
        this.isKeyboardNavigation = true;
        var itemToFocus = this._getPrevSelectableItem(this.activeMenu, this.activeMenu.length - 1);
        itemToFocus && this.focusItem(itemToFocus, true);
      }
    }, {
      key: 'moveToLeft',
      value: function moveToLeft() {
        if (!this.activeMenu || !this.focusedItem || !this.focusedItem.parentMenu) {
          return;
        }
        this.showMenu(this.focusedItem.parentMenu.parentMenu, this.focusedItem.parentMenu.parentItem, this.getTransition('Right'), 'keyboard');
      }
    }, {
      key: 'defaultOptions',
      get: function get() {
        return defaultOptions;
      }
    }, {
      key: 'transitions',
      get: function get() {
        return _menu_transitions2.default;
      }
    }]);

    return Menu;
  }((0, _core_utils.mixin)(_options_mixin2.default, _observable_mixin2.default));

  exports.default = Menu;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  exports.K = K;
  exports.defaults = defaults;
  exports.extend = extend;
  exports.mixin = mixin;
  exports.cleanObject = cleanObject;
  exports.escapeHtml = escapeHtml;
  exports.fmt = fmt;
  exports.escapeRegExp = escapeRegExp;
  exports.getUniqId = getUniqId;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function K() {
    return this;
  }

  function defaults(obj) {
    if (arguments.length < 2) return obj;

    for (var key, source, i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (key in source) {
        if (!source.hasOwnProperty(key)) continue;
        if (obj[key] != null) continue;
        obj[key] = source[key];
      }
    }
    return obj;
  }

  function extend(obj) {
    if (arguments.length < 2) return obj;

    for (var key, source, i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (key in source) {
        if (!source.hasOwnProperty(key)) continue;
        obj[key] = source[key];
      }
    }
    return obj;
  }

  function mixin() {
    var fn = function fn() {};
    var args = [{}].concat(Array.prototype.slice.call(arguments));
    fn.prototype = extend.apply(null, args);
    return fn;
  }

  function cleanObject(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = typeof obj[key] === 'function' ? K : null;
      }
    }
  }

  // borrowed from Handlebars

  var escapeMap = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /&(?!\w+;)|[<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeBadChar(chr) {
    return escapeMap[chr] || "&amp;";
  }

  function escapeHtml(str) {
    return possible.test(str) ? str.replace(badChars, escapeBadChar) : str;
  }

  // borrowed from Ember
  function fmt(str, formats) {
    // first, replace any ORDERED replacements.
    var idx = 0; // the current index for non-numerical replacements
    return str.replace(/%@([0-9]+)?/g, function (s, argIndex) {
      argIndex = argIndex ? parseInt(argIndex, 0) - 1 : idx++;
      s = formats[argIndex];
      return (s === null ? '(null)' : s === undefined ? '' : s).toString();
    });
  }

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|#\s]/g, "\\$&");
  }

  var IdGenerator = function () {
    function IdGenerator(idPrefix) {
      _classCallCheck(this, IdGenerator);

      this.idPrefix = idPrefix || 'zd_mn_';
      this.counter = 0;
    }

    _createClass(IdGenerator, [{
      key: "getUniqId",
      value: function getUniqId(prefix) {
        return (prefix || this.idPrefix) + this.counter++;
      }
    }]);

    return IdGenerator;
  }();

  var idGenerator = new IdGenerator();
  function getUniqId() {
    return idGenerator.getUniqId('mn_');
  }

  var userAgent = exports.userAgent = {
    ie9: navigator.userAgent.indexOf('MSIE 9.0') > -1
  };

  var keyCodes = exports.keyCodes = {
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    NUMPAD_ENTER: 108,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    RIGHT: 39,
    SPACE: 32,
    SHIFT: 16,
    TAB: 9,
    UP: 38,
    COMMA: 188,
    BACKSPACE: 8,
    DELETE: 46
  };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.domById = domById;
  exports.addClass = addClass;
  exports.removeClass = removeClass;
  exports.toggleClass = toggleClass;
  exports.positionDomIntoView = positionDomIntoView;
  exports.setOuterWidth = setOuterWidth;
  exports.setOuterHeight = setOuterHeight;
  exports.blinkElement = blinkElement;
  exports.closest = closest;

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  function domById(domId, ancestor) {
    return ancestor ? ancestor.querySelector('#' + domId) : document.getElementById(domId);
  }

  function addClass(dom, cls) {
    var _dom$classList;

    cls = Array.isArray(cls) ? cls : cls.split(/\s+/);
    (_dom$classList = dom.classList).add.apply(_dom$classList, _toConsumableArray(cls));
  }

  function removeClass(dom, cls) {
    var _dom$classList2;

    cls = Array.isArray(cls) ? cls : cls.split(/\s+/);
    (_dom$classList2 = dom.classList).remove.apply(_dom$classList2, _toConsumableArray(cls));
  }

  function toggleClass(dom, cls, condition) {
    cls = Array.isArray(cls) ? cls : cls.split(/\s+/);
    if (condition) {
      var _dom$classList3;

      (_dom$classList3 = dom.classList).add.apply(_dom$classList3, _toConsumableArray(cls));
    } else {
      var _dom$classList4;

      (_dom$classList4 = dom.classList).remove.apply(_dom$classList4, _toConsumableArray(cls));
    }
  }

  function positionDomIntoView(dom) {
    if (!dom) return;

    if (dom.scrollIntoViewIfNeeded) {
      // Why can't DOM APIs be as easy as this !!!
      dom.scrollIntoViewIfNeeded();
      return;
    }
    // Simulating ``scrollIntoViewIfNeeded`` ... sigh ...
    var rect = dom.getBoundingClientRect();
    var isTopOverlaped = document.elementFromPoint(rect.left + rect.width / 2 | 0, rect.top + 1) !== dom;
    var isBottomOverlaped = document.elementFromPoint(rect.left + rect.width / 2 | 0, rect.bottom - 2) !== dom;

    if (isTopOverlaped) {
      dom.scrollIntoView(true);
    } else if (isBottomOverlaped) {
      dom.scrollIntoView(false);
    }
  }

  function setOuterDimension(dimension, target, value) {
    // dimension = ['width' | 'height']
    var origDisplay = getComputedStyle(target).getPropertyValue('display');
    var origVisibility = target.style.visibility;

    if (origDisplay === 'none') {
      target.style.visibility = 'hidden';
      target.style.display = '';
    }

    var outerDim = target[dimension === 'width' ? 'offsetWidth' : 'offsetHeight'];
    var innerDim = parseInt(getComputedStyle(target).getPropertyValue(dimension)) || 0;

    target.style[dimension] = value + innerDim - outerDim + 'px';

    target.style.visibility = origVisibility;
    target.style.display = origDisplay;
  }

  function setOuterWidth(target, width) {
    setOuterDimension('width', target, width);
  }

  function setOuterHeight(target, height) {
    setOuterDimension('height', target, height);
  }

  function blinkElement(el) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    var c = 0;
    if (el._blinkerTimer) return;

    el._blinkerTimer = setInterval(function () {
      el.style.visibility = c % 2 ? '' : 'hidden';
      if (c === times) {
        clearInterval(el._blinkerTimer);
        delete el._blinkerTimer;
      }
      c++;
    }, interval);
  }

  function closest(el, selector) {
    var domScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

    if (el.closest) {
      var domClosest = el.closest(selector);
      return domClosest && domScope.contains(domClosest) ? domClosest : null;
    }
    var matches = el.matches || el.msMatchesSelector || el.webkitMatchesSelector || el.mozMatchesSelector;
    if (!matches) return;
    if (matches.call(el, selector)) return el;

    while ((el = el.parentNode) && el !== domScope) {
      if (matches.call(el, selector)) return el;
    }
    return null;
  }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _animation = __webpack_require__(6);

  var _animation2 = _interopRequireDefault(_animation);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = {
    direct: function direct(menuToShow, menuToHide, onComplete) {
      var domMenuToShow = this.domById(menuToShow.id);
      domMenuToShow.style.display = '';
      domMenuToShow.style.left = 0;

      if (menuToShow !== menuToHide && menuToHide) {
        this.hideMenu(menuToHide);
      }
      onComplete && onComplete();
    },
    stackingLeft: function stackingLeft(menuToShow, menuToHide, onComplete) {
      this.transitions._stacking.call(this, menuToShow, menuToHide, onComplete, 'Left');
    },
    stackingRight: function stackingRight(menuToShow, menuToHide, onComplete) {
      this.transitions._stacking.call(this, menuToShow, menuToHide, onComplete, 'Right');
    },
    _stacking: function _stacking(menuToShow, menuToHide, _onComplete, mode) {
      var _this = this;

      if (menuToShow === menuToHide || menuToHide == null) {
        return this.transitions.direct.call(this, menuToShow, menuToHide);
      }

      var menuToShowDom = this.domById(menuToShow.id);
      var menuToHideDom = this.domById(menuToHide.id);

      var minHeight = menuToHideDom.parentNode.clientHeight;
      menuToHideDom.style.minHeight = minHeight + 'px';
      menuToShowDom.style.minHeight = minHeight + 'px';

      if (mode === 'Right') {
        menuToHideDom.style.top = menuToHideDom.parentNode.scrollTop + 'px';
      } else {
        menuToShowDom.style.top = menuToShowDom.parentNode.scrollTop + 'px';
      }

      menuToShowDom.style.zIndex = mode === 'Right' ? 1 : 2;
      menuToShowDom.style.display = '';

      menuToHideDom.style.zIndex = mode === 'Right' ? 2 : 1;
      menuToHideDom.style.display = '';

      var offset = this.domMenuPanel.offsetWidth;

      this.inTransition = true;

      (0, _animation2.default)({
        element: mode === 'Right' ? menuToHideDom : menuToShowDom,
        from: mode === 'Right' ? 0 : -offset,
        to: mode === 'Right' ? -offset : 0,
        property: 'left',
        duration: this.transitionDuration,
        easing: this.transitionEasing,
        onComplete: function onComplete() {
          _this.hideMenu(menuToHide);
          _this.inTransition = false;
          _onComplete && _onComplete();
        }
      });
    },


    slidingLeft: function slidingLeft(menuToShow, menuToHide, onComplete) {
      this.transitions._sliding.call(this, menuToShow, menuToHide, onComplete, 'Left');
    },

    slidingRight: function slidingRight(menuToShow, menuToHide, onComplete) {
      this.transitions._sliding.call(this, menuToShow, menuToHide, onComplete, 'Right');
    },

    _sliding: function _sliding(menuToShow, menuToHide, _onComplete2, mode) {
      var _this2 = this;

      if (menuToShow === menuToHide || menuToHide == null) {
        return this.transitions.direct.call(this, menuToShow, menuToHide);
      }

      var fromToShow = void 0,
          toToShow = void 0,
          fromToHide = void 0,
          toToHide = void 0;
      var offset = this.domMenuPanel.offsetWidth;
      var menuToShowDom = this.domById(menuToShow.id);
      var menuToHideDom = this.domById(menuToHide.id);

      menuToShowDom.style.zIndex = mode === 'Right' ? 1 : 2;
      menuToShowDom.style.display = '';

      menuToHideDom.style.zIndex = mode === 'Right' ? 2 : 1;
      menuToHideDom.style.display = '';

      if (mode === 'Right') {
        fromToShow = -offset;
        toToShow = 0;
        fromToHide = 0;
        toToHide = offset;
      } else {
        fromToShow = offset;
        toToShow = 0;
        fromToHide = 0;
        toToHide = -offset;
      }

      this.inTransition = true;

      (0, _animation2.default)({
        animations: [{ element: menuToShowDom, from: fromToShow, to: toToShow }, { element: menuToHideDom, from: fromToHide, to: toToHide }],
        property: 'left',
        duration: this.transitionDuration,
        easing: this.transitionEasing,
        onComplete: function onComplete() {
          _this2.hideMenu(menuToHide);
          _this2.inTransition = false;
          _onComplete2 && _onComplete2();
        }
      });
    }
  };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  exports.default = animate;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  /*
  ----------------------------------------
  Simple animation library
  ----------------------------------------

  This library can animate only numeric style properties of dom elements such as
  width, height, left, top, etc. It is possible to animate multiple objects in
  sync where each object can have its own animation properties.

  Additional features:

  - Animate two or more numeric style properties on the same element by specifying
    multiple animation options for the same dom element but for different
    "property" option.

  - Schedule multiple animations for the same element in time. The options
    "startTime" and "duration" need to be specified for each animation.

  Example for the general case:
  ----------------------------------------
  let animation = animate({
    animations: [{
      element: document.getElementById('element1'),
      from: 10,
      to: 300,
      duration: 1000
    }, {
      element: document.getElementById('element2'),
      from: 10,
      to: 400
    }, {
      element: document.getElementById('element3'),
      from: 10,
      to: 500
    }],
    // element: ...          // optional - used when animating only one element for one property
    duration: 1000,          // mandatory (in ms)
    property: 'left',        // mandatory unless provided in each animation option
    unit: 'px',              // optional, default is 'px'
    easing: 'easeOutQuad',   // optional, default is 'easeOutQuad'. Also an easing function can be provided
    onComplete: function() { // optional callback on animation of all objects done
      console.log("Done");
    }
  });

  Animation starts immediately after invokation of "animate".
  The easing functions used are the same as ones used in jQuery.

  The animation can be cancelled, by calling animation.cancel();
  */

  // t: current time, b: begining value, c: change (delta) in value, d: duration

  var EASINGS = {
    easeOutQuad: function easeOutQuad(x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }
  };

  var emptyFn = function emptyFn() {};
  var timer = void 0;

  function Stepper(duration, onComplete) {
    onComplete = onComplete || emptyFn;
    var animations = [];
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;

      var curTime = timestamp - startTime;

      animations.forEach(function (callback) {
        return callback(curTime);
      });

      if (curTime < duration) {
        timer = window.requestAnimationFrame(step);
      } else {
        onComplete();
      }
    }

    return {
      onStep: function onStep(callback) {
        animations.push(callback);
      },

      start: function start() {
        timer = window.requestAnimationFrame(step);
        return {
          cancel: function cancel() {
            window.cancelAnimationFrame(timer);
          }
        };
      }
    };
  }

  var Animation = function () {
    function Animation(options, defaults) {
      var _this = this;

      _classCallCheck(this, Animation);

      defaults = defaults || options;

      this.element = options.element || defaults.element;
      this.property = options.property || defaults.property;
      this.to = options.to !== undefined ? options.to : defaults.to;
      this.from = options.from !== undefined ? options.from : defaults.from;
      this.easing = options.easing || defaults.easing;
      this.unit = options.unit ? String(options.unit) : defaults.unit;
      this.stepper = options.stepper || defaults.stepper;
      this.timeStart = options.timeStart || 0;
      this.duration = options.duration || defaults.duration - this.timeStart;

      var isFirstStep = true;

      this.stepper.onStep(function (curTime) {
        // animation hasn't started
        if (curTime < _this.timeStart) return;

        curTime -= _this.timeStart;
        // animation ended
        if (curTime > _this.duration) {
          return;
        }

        var value = void 0;
        var offset = 0;
        var from = _this.from;
        var to = _this.to;

        // set the specified "from" value and do initial setup
        if (isFirstStep) {
          isFirstStep = false;
          _this.initOnStart();
        }
        // compensate for negative values as the easing equations work only with
        // positive values
        if (_this.from < 0 || _this.to < 0) {
          offset = Math.min(_this.from, _this.to) * -1;
          from += offset;
          to += offset;
        }

        if (from > to) {
          value = Math.max(from - _this.easing(null, curTime, 0, Math.abs(to - from), _this.duration), to);
        } else {
          value = Math.min(_this.easing(null, curTime, from, Math.abs(to - from), _this.duration), to);
        }

        _this.element.style[_this.property] = value - offset + _this.unit;
      });
    }

    _createClass(Animation, [{
      key: 'initOnStart',
      value: function initOnStart() {
        this.element.style[this.property] = this.from + this.unit;
      }
    }]);

    return Animation;
  }();

  function animate(options) {
    var stepper = Stepper(options.duration, options.onComplete);

    var defaults = {
      element: options.element,
      property: options.property,
      to: options.to,
      from: options.from,
      duration: options.duration,
      timeStart: options.timeStart,
      easing: options.easing === "function" ? options.easing : EASINGS[options.easing || 'easeOutQuad'],
      unit: options.unit ? String(options.unit) : 'px',
      stepper: stepper
    };

    if (options.element) {
      new Animation(defaults);
    }

    if (options.animations) {
      options.animations.forEach(function (animOptions) {
        return new Animation(animOptions, defaults);
      });
    }

    stepper.start();
  }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _core_utils = __webpack_require__(3);

  exports.default = {
    setOptions: function setOptions(options, defaultOptions) {
      if (!this.options) {
        this.options = options || {};
        (0, _core_utils.defaults)(this, this.options);
      }
      (0, _core_utils.defaults)(this, defaultOptions);
    }
  };

/***/ }),
/* 8 */
/***/ (function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

  // Examples:
  //
  // for DOM elements:
  // this.onDom(document, 'click', e => {...}, true);
  //
  // for custom object events:
  // this.on('update', (...args) => {...});


  var ObservableMixin = {
    on: function on(event, callback) {
      this._observerRegistry = this._observerRegistry || {};
      var registry = this._observerRegistry;

      registry[event] = registry[event] || [];
      registry[event].push(callback);
      return this;
    },
    off: function off(event, callback) {
      if (!this._observerRegistry) return;

      if (event) {
        var eventRegistry = this._observerRegistry[event];
        if (!eventRegistry || eventRegistry && eventRegistry.length === 0) return;

        if (callback) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = eventRegistry[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = _slicedToArray(_step.value, 2),
                  i = _step$value[0],
                  record = _step$value[1];

              if (record === callback) {
                eventRegistry.splice(i, 1);
                break;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } else {
          this._observerRegistry[event] = null;
        }
      } else {
        this._observerRegistry = null;
      }
      return this;
    },
    onDom: function onDom(el, event, callback, phase) {
      phase = !!phase;
      this._observerDomRegistry = this._observerDomRegistry || [];

      el.addEventListener(event, callback, phase);
      this._observerDomRegistry.push([el, event, callback, phase]);
      return this;
    },
    offDom: function offDom(el, event, callback, phase) {
      if (!this._observerDomRegistry) return this;

      this._observerDomRegistry = this._observerDomRegistry.filter(function (record) {
        phase = el && event && callback ? !!phase : undefined;

        var hasMatch = record[0] === (el || record[0]) && record[1] === (event || record[1]) && record[2] === (callback || record[2]) && record[3] === (phase === undefined ? record[3] : phase);

        if (hasMatch) {
          record[0].removeEventListener(record[1], record[2], record[3]);
          return false;
        }
        return true;
      });
      return this;
    },
    trigger: function trigger(event, data) {
      var _this = this;

      this.dispatchDocumentEvent(event, data);

      if (!this._observerRegistry) return this;
      if (!this._observerRegistry[event]) return this;

      var triggerEvent = { type: event };
      this._observerRegistry[event].forEach(function (record) {
        return record.call(_this, triggerEvent, data);
      });
      if (this._observerRegistry['*']) {
        this._observerRegistry['*'].forEach(function (record) {
          return record.call(_this, triggerEvent, data);
        });
      }

      return this;
    },
    dispatchDocumentEvent: function dispatchDocumentEvent(event) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (data !== null && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
        data = { data: data };
      }
      data.eventSource = this;

      // Use IE11 compatible way of creating/dispatching custom events
      var docEvent = document.createEvent('CustomEvent');
      var detail = { event: event, data: data };

      docEvent.initCustomEvent('zd_ui_widgets', // event name
      true, // bubbles
      true, // cancelable
      detail // the event "detail" property
      );

      document.dispatchEvent(docEvent);
    }
  };

  exports.default = ObservableMixin;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _core_utils = __webpack_require__(3);

  var _label_concatenator = __webpack_require__(10);

  var _label_concatenator2 = _interopRequireDefault(_label_concatenator);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var menuModelParsers = {
    LabelConcatenator: _label_concatenator2.default
  };

  var MenuDataParser = function () {
    _createClass(MenuDataParser, null, [{
      key: 'menuModelParsers',
      get: function get() {
        return menuModelParsers;
      }
    }]);

    function MenuDataParser(targetObject, postParser, preParseFilter) {
      _classCallCheck(this, MenuDataParser);

      this.targetObject = targetObject || this;
      this.hashIds = {};
      this.hashValues = {};
      this.postParser = postParser;
      this.preParseFilter = preParseFilter || this.preParseFilter;
    }

    _createClass(MenuDataParser, [{
      key: 'reset',
      value: function reset() {
        this.hashIds = {};
        this.hashValues = {};
        this.rootItem = null;
      }

      // to be overriden if needed

    }, {
      key: 'preParseFilter',
      value: function preParseFilter(data) {
        return data;
      }
    }, {
      key: 'parse',
      value: function parse(treeData) {
        this.reset();

        treeData = this.preParseFilter(treeData);
        this.parseItem({
          role: 'root',
          children: Object.prototype.toString.call(treeData) === '[object Array]' ? treeData : [treeData]
        });
        if (this.postParser) {
          this.postParser(this.rootItem);
        }
        this.targetObject.hashIds = this.hashIds;
        this.targetObject.hashValues = this.hashValues;
        this.targetObject.rootItem = this.rootItem;
      }
    }, {
      key: 'parsePartial',
      value: function parsePartial(menu, children) {
        menu.length = 0;
        this.parseItem({ children: children }, menu.parentItem, menu);
      }
    }, {
      key: 'parseItem',
      value: function parseItem(optionItem, item, menu) {
        if (!optionItem) {
          return;
        }
        var newItem, enabled;

        if (optionItem.role === 'root') {
          this.rootItem = item = {
            role: 'root',
            id: (0, _core_utils.getUniqId)()
          };
        }

        if (!(optionItem.children && optionItem.children.length)) return;

        menu = menu || [];

        if (optionItem.role !== 'root') {
          newItem = {
            id: (0, _core_utils.getUniqId)(),
            role: 'uiBackLink',
            parentMenu: menu,
            parentItem: item,
            index: 0,
            enableHtmlEscape: true
          };
          this.hashIds[newItem.id] = newItem;
          menu[0] = newItem;

          item.role = "uiMenuLink";
        }

        item.menu = menu;
        menu.id = menu.id || item.id + '_mn';
        menu.parentItem = menu.parentItem || item;
        menu.parentMenu = menu.parentMenu || item.parentMenu;
        menu.data = menu.data || optionItem;

        var offset = menu.length;
        var childOptionItem;

        for (var i = offset, len = optionItem.children.length + offset; i < len; i++) {
          childOptionItem = optionItem.children[i - offset];
          if (!childOptionItem) {
            continue;
          }

          enabled = true;
          if (childOptionItem.hasOwnProperty('enabled')) enabled = childOptionItem.enabled !== false;

          newItem = {
            id: (0, _core_utils.getUniqId)(),
            data: childOptionItem,
            type: childOptionItem.type,
            label: childOptionItem.label,
            enabled: enabled,
            index: i,
            parentMenu: menu,
            parentItem: item,
            enableHtmlEscape: childOptionItem.enableHtmlEscape !== false
          };

          menu[i] = newItem;

          this.hashIds[newItem.id] = newItem;

          if ('id' in childOptionItem || childOptionItem.value !== undefined) {
            var value = childOptionItem.value == null ? childOptionItem.id : childOptionItem.value;
            newItem.value = value == null ? this.defaultValue : value;
            this.hashValues[newItem.value] = newItem;
          }

          childOptionItem.children && childOptionItem.children.length && this.parseItem(childOptionItem, newItem);

          if (newItem.role == null && newItem.value === undefined) {
            newItem.role = "uiLabel";
          }
        }
      }
    }]);

    return MenuDataParser;
  }();

  exports.default = MenuDataParser;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var LabelConcatenator = function () {
    function LabelConcatenator(delimiter, fieldName) {
      _classCallCheck(this, LabelConcatenator);

      this.delimiter = delimiter || ' > ';
      this.fieldName = fieldName || 'concatenatedLabel';
    }

    _createClass(LabelConcatenator, [{
      key: 'parse',
      value: function parse(rootItem) {
        this._processItem(rootItem, '');
      }
    }, {
      key: '_processItem',
      value: function _processItem(item, concatLabelPrefix) {
        var childItem;

        if (item.role === 'uiBackLink' && item.role === 'uiLabel') {
          return;
        }

        item[this.fieldName] = concatLabelPrefix + item.label;

        if (item.menu) {
          for (var i = 0, len = item.menu.length; i < len; i++) {
            childItem = item.menu[i];
            if (!childItem.label) {
              continue;
            }

            this._processItem(childItem, item.role === 'root' ? '' : concatLabelPrefix + item.label + this.delimiter);
          }
        }
      }
    }]);

    return LabelConcatenator;
  }();

  exports.default = LabelConcatenator;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var HashIterator = function () {
    function HashIterator(data) {
      _classCallCheck(this, HashIterator);

      this.data = data;
    }

    _createClass(HashIterator, [{
      key: 'forEach',
      value: function forEach(callback, context) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var data = typeof this.data === 'function' ? this.data() : this.data;
        for (var i in data) {
          if (hasOwnProperty.call(data, i)) {
            if (callback.call(context, data[i], i, data) === false) break;
          }
        }
      }
    }, {
      key: 'some',
      value: function some(callback, context) {
        var hasSome = false;
        this.forEach(function (value, key, data) {
          hasSome = callback.call(context, value, key, data);
          return !hasSome;
        });
        return hasSome;
      }
    }]);

    return HashIterator;
  }();

  exports.default = HashIterator;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _core_utils = __webpack_require__(3);

  var _dom_utils = __webpack_require__(4);

  var _options_mixin = __webpack_require__(7);

  var _options_mixin2 = _interopRequireDefault(_options_mixin);

  var _observable_mixin = __webpack_require__(8);

  var _observable_mixin2 = _interopRequireDefault(_observable_mixin);

  var _positionable_mixin = __webpack_require__(13);

  var _positionable_mixin2 = _interopRequireDefault(_positionable_mixin);

  var _css_scoping_mixin = __webpack_require__(14);

  var _css_scoping_mixin2 = _interopRequireDefault(_css_scoping_mixin);

  var _vertical_menu_positioner = __webpack_require__(15);

  var _vertical_menu_positioner2 = _interopRequireDefault(_vertical_menu_positioner);

  var _dom_position_observer = __webpack_require__(16);

  var _dom_position_observer2 = _interopRequireDefault(_dom_position_observer);

  var _css_class_state_machine = __webpack_require__(17);

  var _css_class_state_machine2 = _interopRequireDefault(_css_class_state_machine);

  var _menu = __webpack_require__(2);

  var _menu2 = _interopRequireDefault(_menu);

  var _document_clicks_monitor = __webpack_require__(18);

  var _document_clicks_monitor2 = _interopRequireDefault(_document_clicks_monitor);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var defaultOptions = {
    defaultValue: '',
    defaultValueLabel: '-',
    domHolderSelector: null,
    preferredPosition: null, // ['up' | 'down']
    disabled: false,

    clsSelectMenuScope: 'zd-selectmenu',
    clsSelectMenuRoot: 'zd-selectmenu zd-selectmenu-root',
    clsBaseButton: 'zd-selectmenu-base',
    clsBaseContent: 'zd-selectmenu-base-content',
    clsBaseArrow: 'zd-selectmenu-base-arrow zd-icon-arrow-down',

    clsDefault: 'zd-state-default',
    clsDisabled: 'zd-state-disabled',
    clsFocused: 'zd-state-focus',
    clsOpen: 'zd-state-open',
    clsHover: 'zd-state-hover',

    clsPositionUp: 'zd-state-position-up',

    keyboardCue: true,
    enableHtmlEscape: true
  };

  var SelectMenu = function (_mixin) {
    _inherits(SelectMenu, _mixin);

    function SelectMenu(options) {
      _classCallCheck(this, SelectMenu);

      var _this = _possibleConstructorReturn(this, (SelectMenu.__proto__ || Object.getPrototypeOf(SelectMenu)).call(this, options));

      _this.type = 'SelectMenu';

      _this.setOptions(options, defaultOptions);

      _this.id = (0, _core_utils.getUniqId)();
      _this.baseId = (0, _core_utils.getUniqId)();
      _this.baseContentId = (0, _core_utils.getUniqId)();

      _this.hasProxy = _this.options.proxyName || _this.options.proxyId;
      _this.proxyName = _this.options.proxyName;
      _this.proxyId = _this.options.proxyId || (0, _core_utils.getUniqId)();

      _this.dom = null;
      _this.domBase = null;
      _this.domBaseContent = null;
      _this.domProxy = null;
      _this.domMenuHolder = null;

      _this.isFocused = false;
      _this.isInDom = false;
      _this.isDestroyed = false;
      _this.isKeyboardCaptured = false;
      _this.areDomEventsSet = false;
      _this.container = _this.options.container;
      _this.value = _this.options.value == null ? _this.defaultValue : _this.options.value;

      if (_this.domHolder || _this.domHolderSelector) {
        _this.appendTo(_this.domHolder || document.querySelector(_this.domHolderSelector));
      }
      return _this;
    }

    _createClass(SelectMenu, [{
      key: 'appendTo',
      value: function appendTo(target) {
        if (this.isInDom || !target) return;

        this.domHolder = target;

        this.renderItemContentForBase = this.renderItemContentForBase || this.defaultRenderItemContentForBase;

        // serves to position the menu in the window according
        // to available space and positioning requirements
        this.verticalMenuPositioner = new _vertical_menu_positioner2.default();

        // detects change in coordinates and fires a registered callback
        this.domBasePositionObserver = new _dom_position_observer2.default();

        _menu2.default.registerInstance(this);

        this.htmlBuffer = this.render();
        this.buildDomMenuHolder();
        this.buildCssClassStateManager();
        this.putInDom();
        this.initMenu();
        this.postDomInsertionSetup();
        new _document_clicks_monitor2.default(this);
      }
    }, {
      key: 'loadData',
      value: function loadData(data) {
        if (!this.menu) {
          return;
        }
        this.menu.loadData(data);
        this.onDataReady();
      }
    }, {
      key: 'getItemByValue',
      value: function getItemByValue(value) {
        return this.menu.getItemByValue(value);
      }
    }, {
      key: 'initMenu',
      value: function initMenu() {
        var _this2 = this;

        this.options.domHolder = this.domMenuHolder;
        this.options.isVisible = false;
        this.options.keyboardCue = this.keyboardCue;
        this.options.keyboardCueAction = 'focus';
        this.options.domRef = null;
        this.options.proxyValue = null;
        this.options.proxyId = null;
        this.options.disabled = false;

        var menu = this.menu = new _menu2.default(this.options);
        menu.container = this;

        menu.onChange = function (data) {
          return _this2.onMenuChange(data);
        };
        menu.onChangeRequest = function (data) {
          return _this2.onMenuChangeRequest(data);
        };
        menu.onCueMatch = function (item) {
          return _this2.onMenuCueMatch(item);
        };

        var nativeOnKeyDown = menu.onKeyDown;

        menu.onKeyDown = function (e) {
          var eventHandlingResult = _this2.onMenuKeyDown(e);
          if (_this2.isOpen && eventHandlingResult !== false) {
            nativeOnKeyDown.call(menu, e);
          }
        };

        menu.setMenuSizes = function () {
          if (!menu.dom) return;
          menu.dom.style.width = _this2.domBase.offsetWidth + 'px';
        };

        menu.onDataReady = function () {
          _this2.value = _menu2.default.defaultOptions.defaultValue;
        };
      }
    }, {
      key: 'onMenuChange',
      value: function onMenuChange(data) {
        this.setValue(data.value, data.source);
      }
    }, {
      key: 'onMenuChangeRequest',
      value: function onMenuChangeRequest(data) {
        if (data.source === 'click' || data.source === 'keyboard') {
          this.close();
        }
        this.onChangeRequest(data);
      }
    }, {
      key: 'onMenuCueMatch',
      value: function onMenuCueMatch(item) {
        if (!this.isOpen) {
          this.open(false);
        }
      }
    }, {
      key: 'onMenuKeyDown',
      value: function onMenuKeyDown(e) {
        switch (e.keyCode) {
          case _core_utils.keyCodes.HOME:
          case _core_utils.keyCodes.END:
          case _core_utils.keyCodes.PAGE_DOWN:
          case _core_utils.keyCodes.PAGE_UP:
          case _core_utils.keyCodes.DOWN:
          case _core_utils.keyCodes.UP:
          case _core_utils.keyCodes.LEFT:
          case _core_utils.keyCodes.ENTER:
          case _core_utils.keyCodes.NUMPAD_ENTER:
          case _core_utils.keyCodes.RIGHT:
            if (!this.isOpen) {
              e.preventDefault();
              this.open();
              return false; // stops keyboard event handling by this.menu
            }
            break;
          case _core_utils.keyCodes.TAB:
            if (this.isOpen && !this.menu.focusedItem) {
              e.preventDefault();
              this.close();
              return;
            }
            break;
          case _core_utils.keyCodes.ESCAPE:
            this.close();
            break;
        }
      }
    }, {
      key: 'setValue',
      value: function setValue(value, source) {
        if (this.value === value) return;
        if (this.menu.setValue(value) === false) return;

        var oldValue = this.value;
        this.value = this.menu.value;

        this.setBaseContent();
        this.syncProxy();

        var eventData = {
          oldValue: oldValue,
          value: this.value,
          source: source,
          userInitiated: source === 'click' || source === 'keyboard' || source === 'keyboardCue'
        };
        this.onChange(eventData);
        this.trigger('change', eventData);
      }
    }, {
      key: 'buildDomMenuHolder',
      value: function buildDomMenuHolder() {
        this.domMenuHolder = document.createElement('div');
        this.domMenuHolder.className = this.clsSelectMenuScope;
        document.body.appendChild(this.domMenuHolder);
      }
    }, {
      key: 'buildCssClassStateManager',
      value: function buildCssClassStateManager() {
        var _this3 = this;

        this.clsStateManager = new _css_class_state_machine2.default({
          dom: function dom() {
            return _this3.dom;
          },
          domAux: function domAux() {
            return _this3.domMenuHolder;
          },
          clsZero: this.clsDefault,
          clsStates: [this.clsDisabled, this.clsOpen, this.clsFocused, this.clsHover]
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.trigger('beforeDestroy');
        _menu2.default.unregisterInstance(this);
        this.menu.destroy();
        this.off();
        this.destroyUI();
        this.verticalMenuPositioner = null;
        this.domBasePositionObserver.destroy();
        this.domBasePositionObserver = null;
        (0, _core_utils.cleanObject)(this);
        this.isDestroyed = true;
      }
    }, {
      key: 'destroyUI',
      value: function destroyUI() {
        if (this.isInDom) {
          this.teardownDomEvents();
          this.dom.parentNode.removeChild(this.dom);
          this.domMenuHolder.parentNode.removeChild(this.domMenuHolder);
        }
        this.isInDom = false;
        this.domHolder = null;
        this.dom = null;
        this.domBase = null;
        this.domBaseContent = null;
        this.domMenuHolder = null;
        this.domRef = null;
        this.domProxy = null;
      }
    }, {
      key: 'resetUI',
      value: function resetUI() {
        if (this.isInDom) {
          this.close();
          this.blur();
          (0, _dom_utils.removeClass)(this.dom, this.clsHover);
          this.domBaseContent.innerHTML = '';
          this.menu.resetUI();
        }
      }
    }, {
      key: 'syncViewWithValue',
      value: function syncViewWithValue() {
        this.setBaseContent();
      }

      // -------------------- Rendering and DOM Manipulation -----------------------

    }, {
      key: 'render',
      value: function render() {
        var html = '<div id="' + this.id + '" class="' + this.clsSelectMenuRoot + ' ' + this.clsDefault + '">\n         ' + (this.hasProxy ? '<input type="hidden" name="' + this.proxyName + '" id="' + this.proxyId + '">' : '') + '\n         <input class="zd-selectmenu-focus-proxy" tabindex="-1" style="position:absolute;top:0;left:0;width:1px;height:1px;" >\n         <button id="' + this.baseId + '" class="' + this.clsBaseButton + '" role="button" tabindex="0" type="button">\n          <span class="' + this.clsBaseArrow + '"></span>\n          <span id="' + this.baseContentId + '" class="' + this.clsBaseContent + '"></span>\n         </button>\n       </div>';
        return html;
      }
    }, {
      key: 'defaultRenderItemContentForBase',
      value: function defaultRenderItemContentForBase(item) {
        return this.menu.getDisplayValue();
      }
    }, {
      key: 'putInDom',
      value: function putInDom() {
        if (this.isInDom) {
          return;
        }
        if (this.domRef) {
          this.domRef.insertAdjacentHTML('beforebegin', this.htmlBuffer);
          this.domRef.parentNode.removeChild(this.domRef);
        } else {
          this.domHolder.insertAdjacentHTML('beforeend', this.htmlBuffer);
        }

        this.isInDom = true;

        this.dom = this.domHolder.querySelector('#' + this.id);
        this.domBase = this.domHolder.querySelector('#' + this.baseId);
        this.domBaseContent = this.domHolder.querySelector('#' + this.baseContentId);
        this.domProxy = this.domHolder.querySelector('#' + this.proxyId);
        this.focusProxy = this.dom.querySelector('.zd-selectmenu-focus-proxy');
      }
    }, {
      key: 'postDomInsertionSetup',
      value: function postDomInsertionSetup() {
        this.syncViewWithValue();
        this.syncProxy();
        this.disabled ? this.disable() : this.setupDomEvents();
      }
    }, {
      key: 'setupDomEvents',
      value: function setupDomEvents() {
        var _this4 = this;

        if (!this.isInDom || this.areDomEventsSet || this.disabled) {
          return;
        }

        this.onDom(this.domBase, 'click', function (e) {
          return _this4.onBaseClick(e);
        }).onDom(this.domBase, 'mousedown', function (e) {
          return _this4.onBaseMouseDown(e);
        }).onDom(this.domBase, 'focus', function (e) {
          return _this4.onBaseFocus(e);
        }).onDom(this.domBase, 'blur', function (e) {
          return _this4.onBaseBlur(e);
        }).onDom(this.dom, 'mouseenter', function (e) {
          return _this4.onRootMouseEnter(e);
        }).onDom(this.dom, 'mouseleave', function (e) {
          return _this4.onRootMouseLeave(e);
        });

        var onMouseDown = function onMouseDown(e) {
          return _this4.onDocumentMouseDown(e);
        };

        this.on('open', function () {
          return _this4.onDom(document, 'mousedown', onMouseDown, true);
        });
        this.on('close', function () {
          return _this4.offDom(document, 'mousedown', onMouseDown, true);
        });

        this.areDomEventsSet = true;
      }
    }, {
      key: 'teardownDomEvents',
      value: function teardownDomEvents() {
        if (!this.isInDom) {
          return;
        }

        this.offDom();
        this.areDomEventsSet = false;
      }
    }, {
      key: 'setBaseContent',
      value: function setBaseContent() {
        var item = this.menu.hashValues[this.value];
        var html = this.renderItemContentForBase(item || { label: this.defaultValueLabel });
        this.domBaseContent.innerHTML = html;
      }
    }, {
      key: 'syncProxy',
      value: function syncProxy() {
        this.hasProxy && (this.domProxy.value = this.value);
      }

      // -------------------- General Menu Operations -----------------------

    }, {
      key: 'focus',
      value: function focus() {
        var _this5 = this;

        if (this.isFocused) {
          return;
        }

        this.isFocused = true;
        this.clsStateManager.addState(this.clsFocused);

        setTimeout(function () {
          return _this5.isFocused && _this5.menu.captureKeyboard();
        });

        _menu2.default.registerAsActive(this.id);
        this.onFocus();
        this.trigger('focus');
      }
    }, {
      key: 'blur',
      value: function blur() {
        if (!this.isFocused) {
          return;
        }

        this.isFocused = false;
        this.clsStateManager.removeState(this.clsFocused);
        this.menu.releaseKeyboard();
        this.onBlur();
        this.trigger('blur');
      }
    }, {
      key: 'open',
      value: function open(syncWithValue) {
        var _this6 = this;

        if (this.isOpen) {
          return;
        }
        this.isOpen = true;

        this.menu.show(syncWithValue, true);
        this.clsStateManager.addState(this.clsOpen);
        this.positionMenu(this.menu, this.domBase, this.preferredPosition);
        this.isFocused && this.menu.captureKeyboard();
        this.observeDomBasePositionOnce(function () {
          return _this6.close();
        });

        this.focus();

        this.onOpen();
        this.trigger('open');
      }
    }, {
      key: 'close',
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.stopObservingDomBasePosition();
        this.setPosition('down');

        this.menu.hide();
        this.clsStateManager.removeState(this.clsOpen);
        this.onClose();
        this.trigger('close');
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        this.isOpen ? this.close() : this.open(true);
      }
    }, {
      key: 'disable',
      value: function disable() {
        this.setDisableState(true);
      }
    }, {
      key: 'enable',
      value: function enable() {
        this.setDisableState(false);
      }
    }, {
      key: 'setDisableState',
      value: function setDisableState(isDisabled) {
        this.disabled = isDisabled;
        if (!this.isInDom) {
          return;
        }

        if (this.disabled) {
          this.close();
          this.blur();
          this.teardownDomEvents();
          this.clsStateManager.addState(this.clsDisabled);
          this.domBase.disabled = true;
          if (this.hasProxy) {
            this.domProxy.disabled = true;
          }
        } else {
          this.setupDomEvents();
          this.domBase.disabled = false;
          if (this.hasProxy) {
            this.domProxy.disabled = false;
          }
          this.clsStateManager.removeState(this.clsDisabled);
        }
        this.onDisabledChanged();
        this.trigger('disableChanged');
      }
    }, {
      key: 'show',
      value: function show() {
        this.dom.style.display = '';
        this.trigger('show');
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.dom.style.display = 'none';
        this.trigger('hide');
      }
    }, {
      key: 'getDomBaseForPositioning',
      value: function getDomBaseForPositioning() {
        return this.domBase;
      }
    }, {
      key: 'containsNode',
      value: function containsNode(node) {
        if (!this.isInDom || !node) return false;

        return this.dom.contains(node) || this.dom === node || this.menu.containsNode(node);
      }

      // ----------------------   Hooks   -------------------------

    }, {
      key: 'onDataReady',
      value: function onDataReady() {}
    }, {
      key: 'onChange',
      value: function onChange() {}
    }, {
      key: 'onChangeRequest',
      value: function onChangeRequest() {}
    }, {
      key: 'onOpen',
      value: function onOpen() {}
    }, {
      key: 'onClose',
      value: function onClose() {}
    }, {
      key: 'onFocus',
      value: function onFocus() {}
    }, {
      key: 'onBlur',
      value: function onBlur() {}
    }, {
      key: 'onDisabledChanged',
      value: function onDisabledChanged() {}
    }, {
      key: 'onDestroy',
      value: function onDestroy() {}

      // -------------------- Event Handlers -----------------------

    }, {
      key: 'onDocumentMouseDown',
      value: function onDocumentMouseDown(e) {
        var _this7 = this;

        if (!this.isInDom || !e.target) return;

        if (this.containsNode(e.target)) {
          setTimeout(function () {
            return _this7.domBase.focus();
          });
        } else {
          this.blur();
          this.close();
        }
      }
    }, {
      key: 'onBaseClick',
      value: function onBaseClick(e) {}
    }, {
      key: 'onBaseMouseDown',
      value: function onBaseMouseDown(e) {
        var _this8 = this;

        (0, _dom_utils.positionDomIntoView)(this.domBase);
        this.menu.syncViewWithValue();
        this.toggle();
        setTimeout(function () {
          return _this8.domBase.focus();
        });
      }
    }, {
      key: 'onBaseFocus',
      value: function onBaseFocus(e) {
        // If focus is coming from a contenteditable element (e.relatedTarget) then
        // move the focus to a text input element first to make the contenteditable
        // truly lose focus and then move it back to the domBase (a button). This is
        // done because if the contenteditable loses focus to a button element, the
        // first keydown after this puts the focus back into the contenteditable.
        // This browser behavior is convenient for creating buttons controlling the
        // contenteditable but it interferes with the keyboard menu navigation of
        // the select menu gets focus from a contenteditable as it has a button as
        // its base element.
        if (e.relatedTarget && e.relatedTarget.contentEditable === 'true') {
          this.focusProxy.focus();
          this.domBase.focus();
        }
        this.focus();
      }
    }, {
      key: 'onBaseBlur',
      value: function onBaseBlur() {
        !this.isOpen && this.blur();
      }
    }, {
      key: 'onRootMouseEnter',
      value: function onRootMouseEnter(e) {
        this.clsStateManager.addState(this.clsHover);
      }
    }, {
      key: 'onRootMouseLeave',
      value: function onRootMouseLeave(e) {
        this.clsStateManager.removeState(this.clsHover);
      }
    }]);

    return SelectMenu;
  }((0, _core_utils.mixin)(_options_mixin2.default, _observable_mixin2.default, _positionable_mixin2.default, _css_scoping_mixin2.default));

  exports.default = SelectMenu;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _dom_utils = __webpack_require__(4);

  exports.default = {
    // required
    getDomBaseForPositioning: function getDomBaseForPositioning() {},

    dom: null,
    position: null,
    clsPositionUp: null,
    verticalMenuPositioner: null,
    domBasePositionObserver: null,

    setPosition: function setPosition(position) {
      this.position = position;
      this.updatePositionCssClass();
    },
    updatePositionCssClass: function updatePositionCssClass() {
      var isUp = this.position === 'up';
      (0, _dom_utils.toggleClass)(this.dom, this.clsPositionUp, isUp);
      (0, _dom_utils.toggleClass)(this.domMenuHolder, this.clsPositionUp, isUp);
    },
    positionMenu: function positionMenu(menu, domRef, preferredPosition) {
      var position = this.verticalMenuPositioner.positionMenu(menu, domRef, preferredPosition);
      this.setPosition(position);
    },
    observeDomBasePositionOnce: function observeDomBasePositionOnce(onChange) {
      this.domBasePositionObserver.observeOnce(this.getDomBaseForPositioning(), onChange);
    },
    observeDomBasePosition: function observeDomBasePosition(onChange) {
      this.domBasePositionObserver.observe(this.getDomBaseForPositioning(), onChange);
    },
    stopObservingDomBasePosition: function stopObservingDomBasePosition() {
      this.domBasePositionObserver.stopObserving();
    }
  };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _dom_utils = __webpack_require__(4);

  exports.default = {
    addScopeClass: function addScopeClass(cls) {
      (0, _dom_utils.addClass)(this.domHolder, cls);
      (0, _dom_utils.addClass)(this.dom, cls);
    },
    removeScopeClass: function removeScopeClass(cls) {
      (0, _dom_utils.removeClass)(this.domHolder, cls);
      (0, _dom_utils.removeClass)(this.dom, cls);
    },
    toggleScopeClass: function toggleScopeClass(cls, mod) {
      (0, _dom_utils.toggleClass)(this.domHolder, cls, mod);
      (0, _dom_utils.toggleClass)(this.dom, cls, mod);
    }
  };

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _dom_utils = __webpack_require__(4);

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function visitSiblings(node, visitor) {
    var curNode = node;
    while (curNode = curNode.nextSibling) {
      visitor(curNode);
    }curNode = node;
    while (curNode = curNode.previousSibling) {
      visitor(curNode);
    }
  }

  var VerticalMenuPositioner = function () {
    function VerticalMenuPositioner() {
      _classCallCheck(this, VerticalMenuPositioner);
    }

    _createClass(VerticalMenuPositioner, [{
      key: 'positionMenu',


      // domRef can be aither a dom element or an object with top, bottom, left, right properties.
      value: function positionMenu(menu, domRef, preferredPosition) {
        var availableSpaceAbove = void 0,
            availableSpaceBelow = void 0;

        if (domRef.getBoundingClientRect) {
          availableSpaceAbove = this.getAvailableSpaceAbove(domRef);
          availableSpaceBelow = this.getAvailableSpaceBelow(domRef);
        } else {
          availableSpaceAbove = domRef.top;
          availableSpaceBelow = window.innerHeight - domRef.bottom;
        }

        var position = preferredPosition || this.determinePosition(menu, availableSpaceAbove, availableSpaceBelow);
        var availableSpace = position === 'down' ? availableSpaceBelow : availableSpaceAbove;

        this.adjustMenuSize(menu, availableSpace);
        this.adjustMenuWidth(menu);
        this.positionMenuDom(menu.dom, domRef, position);
        return position;
      }
    }, {
      key: 'getAvailableSpaceAbove',
      value: function getAvailableSpaceAbove(dom) {
        return dom.getBoundingClientRect().top;
      }
    }, {
      key: 'getAvailableSpaceBelow',
      value: function getAvailableSpaceBelow(dom) {
        return window.innerHeight - dom.getBoundingClientRect().bottom;
      }
    }, {
      key: 'adjustMenuSize',
      value: function adjustMenuSize(menu, availableSpace) {
        if (menu.domMenuPanel) {
          menu.domMenuPanel.style.height = '';
        }
        var offset = 0;
        var naturalMenuHeight = menu.getNaturalCoords().height;
        if (naturalMenuHeight > availableSpace) {
          menu.setHeight(availableSpace);
          visitSiblings(menu.domMenuPanel, function (sibling) {
            return offset += sibling.offsetHeight;
          });
          (0, _dom_utils.setOuterHeight)(menu.domMenuPanel, menu.dom.clientHeight - offset);
        } else {
          menu.resetHeight();
        }
      }
    }, {
      key: 'adjustMenuWidth',
      value: function adjustMenuWidth(menu) {
        if (!menu.activeMenu) return;
        menu._resizeToParentWidth();
      }
    }, {
      key: 'determinePosition',
      value: function determinePosition(menu, availableSpaceAbove, availableSpaceBelow) {
        var naturalMenuHeight = menu.getNaturalCoords().height;

        if (naturalMenuHeight <= availableSpaceBelow) {
          return 'down';
        } else if (naturalMenuHeight <= availableSpaceAbove) {
          return 'up';
        } else {
          return availableSpaceBelow > availableSpaceAbove ? 'down' : 'up';
        }
      }
    }, {
      key: 'positionMenuDom',
      value: function positionMenuDom(domMenu, domRef, position) {
        var coords = domRef.getBoundingClientRect ? domRef.getBoundingClientRect() : domRef;

        var offsetTop = document.body.scrollTop || document.documentElement.scrollTop;
        var offsetLeft = document.body.scrollLeft || document.documentElement.scrollLeft;

        var domRefLeft = Math.round(coords.left) + offsetLeft;
        var domRefBottom = Math.round(coords.bottom) + offsetTop;

        domMenu.style.left = domRefLeft + 'px';

        if (position === 'down') {
          domMenu.style.top = domRefBottom + 'px';
          domMenu.style.bottom = '';
        } else {
          domMenu.style.top = '';
          domMenu.style.bottom = window.innerHeight - domRefBottom + coords.bottom - coords.top + 'px';
        }
      }
    }]);

    return VerticalMenuPositioner;
  }();

  exports.default = VerticalMenuPositioner;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var MONITOR_INTERVAL = 100;

  var DomPositionObserver = function () {
    function DomPositionObserver() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { monitoringInterval: MONITOR_INTERVAL };

      _classCallCheck(this, DomPositionObserver);

      this._monitoringTimer = null;
      this.monitoringInterval = options.monitoringInterval;
      this.dom = options.dom;
      this.onChange = options.onChange;
    }

    _createClass(DomPositionObserver, [{
      key: "observeOnce",
      value: function observeOnce(dom, onChange) {
        return this.observe(dom, onChange, true);
      }
    }, {
      key: "observe",
      value: function observe(dom, onChange, isOnce) {
        var _this = this;

        this.dom = this.dom || dom;
        this.onChange = onChange || this.onChange;

        if (!this.dom) {
          this.stopObserving();
          return;
        }

        this.refClientRect = this.dom.getBoundingClientRect();

        clearTimeout(this._monitoringTimer);

        this._monitoringTimer = setTimeout(function () {
          if (_this._isChanged()) {
            onChange();
            if (isOnce) {
              _this.stopObserving();
              return;
            }
          }
          _this.observe(dom, onChange, isOnce);
        }, MONITOR_INTERVAL);
      }
    }, {
      key: "_isChanged",
      value: function _isChanged() {
        var refCoords = this.refClientRect;
        var coords = this.dom.getBoundingClientRect();

        return refCoords.top !== coords.top || refCoords.left !== coords.left || refCoords.right !== coords.right || refCoords.bottom !== coords.bottom;
      }
    }, {
      key: "stopObserving",
      value: function stopObserving() {
        clearTimeout(this._monitoringTimer);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.stopObserving();
        this.dom = null;
        this.onChange = null;
        this.refClientRect = null;
      }
    }]);

    return DomPositionObserver;
  }();

  exports.default = DomPositionObserver;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var CssClsStateMachine = function () {
    function CssClsStateMachine(options) {
      _classCallCheck(this, CssClsStateMachine);

      this.dom = options.dom;
      this.domAux = options.domAux;
      this.clsZero = options.clsZero;
      this.state = 0;
      this.bitMap = {};
      this.setup(options.clsStates);
    }

    _createClass(CssClsStateMachine, [{
      key: 'setup',
      value: function setup(states) {
        this.bitMap = {};
        for (var i = 0, bitMask = 1; i < states.length; i++, bitMask *= 2) {
          this.bitMap[states[i]] = bitMask;
        }
      }
    }, {
      key: 'addState',
      value: function addState(state) {
        if (!this.bitMap.hasOwnProperty(state)) {
          return;
        }
        this.state = this.state | this.bitMap[state];
        this.dom().classList.add(state);
        this.domAux() && this.domAux().classList.add(state);
        this.postStateChange();
      }
    }, {
      key: 'removeState',
      value: function removeState(state) {
        if (!this.bitMap.hasOwnProperty(state)) {
          return;
        }
        this.state = this.state & ~this.bitMap[state];
        this.dom().classList.remove(state);
        this.domAux() && this.domAux().classList.remove(state);
        this.postStateChange();
      }
    }, {
      key: 'postStateChange',
      value: function postStateChange() {
        this.dom().classList[this.state === 0 ? 'add' : 'remove'](this.clsZero);
        this.domAux() && this.domAux().classList[this.state === 0 ? 'add' : 'remove'](this.clsZero);
      }
    }]);

    return CssClsStateMachine;
  }();

  exports.default = CssClsStateMachine;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  // The purpose of this is to setup document level events
  // only when the target widget is active i.e. open.

  var DocumentClicksMonitor = function () {
    function DocumentClicksMonitor(context) {
      var _this = this;

      _classCallCheck(this, DocumentClicksMonitor);

      this.context = context;
      context.on('open', function () {
        return _this.monitorGlobalClicks();
      });
      context.on('close', function () {
        return _this.releaseGlobalClicksMonitor();
      });
      context.on('beforeDestroy', function () {
        return _this.onContextDestroy();
      });
    }

    _createClass(DocumentClicksMonitor, [{
      key: 'monitorGlobalClicks',
      value: function monitorGlobalClicks() {
        var _this2 = this;

        if (this.eventListener) return;

        this.eventListener = function (e) {
          return _this2.context.onDocumentMouseDown(e);
        };
        document.addEventListener('mousedown', this.eventListener, true);
      }
    }, {
      key: 'releaseGlobalClicksMonitor',
      value: function releaseGlobalClicksMonitor() {
        if (this.eventListener) {
          document.removeEventListener('mousedown', this.eventListener, true);
          this.eventListener = null;
        }
      }
    }, {
      key: 'onContextDestroy',
      value: function onContextDestroy() {
        this.releaseGlobalClicksMonitor();
        this.context = null;
      }
    }]);

    return DocumentClicksMonitor;
  }();

  exports.default = DocumentClicksMonitor;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _core_utils = __webpack_require__(3);

  var _dom_utils = __webpack_require__(4);

  var _options_mixin = __webpack_require__(7);

  var _options_mixin2 = _interopRequireDefault(_options_mixin);

  var _observable_mixin = __webpack_require__(8);

  var _observable_mixin2 = _interopRequireDefault(_observable_mixin);

  var _positionable_mixin = __webpack_require__(13);

  var _positionable_mixin2 = _interopRequireDefault(_positionable_mixin);

  var _css_scoping_mixin = __webpack_require__(14);

  var _css_scoping_mixin2 = _interopRequireDefault(_css_scoping_mixin);

  var _vertical_menu_positioner = __webpack_require__(15);

  var _vertical_menu_positioner2 = _interopRequireDefault(_vertical_menu_positioner);

  var _dom_position_observer = __webpack_require__(16);

  var _dom_position_observer2 = _interopRequireDefault(_dom_position_observer);

  var _filtering_datasource = __webpack_require__(20);

  var _filtering_datasource2 = _interopRequireDefault(_filtering_datasource);

  var _label_concatenator = __webpack_require__(10);

  var _label_concatenator2 = _interopRequireDefault(_label_concatenator);

  var _highlighting_renderer = __webpack_require__(22);

  var _highlighting_renderer2 = _interopRequireDefault(_highlighting_renderer);

  var _css_class_state_machine = __webpack_require__(17);

  var _css_class_state_machine2 = _interopRequireDefault(_css_class_state_machine);

  var _menu = __webpack_require__(2);

  var _menu2 = _interopRequireDefault(_menu);

  var _combo_select_menu_states = __webpack_require__(23);

  var _combo_select_menu_states2 = _interopRequireDefault(_combo_select_menu_states);

  var _document_clicks_monitor = __webpack_require__(18);

  var _document_clicks_monitor2 = _interopRequireDefault(_document_clicks_monitor);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var defaultOptions = {
    defaultValue: '',
    defaultValueLabel: '-',
    domHolderSelector: null,
    preferredPosition: null,
    filteredField: 'label',

    disabled: false,

    clsSelectMenuScope: 'zd-combo-selectmenu',
    clsSelectMenuRoot: 'zd-combo-selectmenu zd-combo-selectmenu-root',

    clsDefault: 'zd-state-default',
    clsDisabled: 'zd-state-disabled',
    clsFocused: 'zd-state-focus',
    clsOpen: 'zd-state-open',
    clsHover: 'zd-state-hover',

    clsPositionUp: 'zd-state-position-up',

    clsBaseButton: 'zd-selectmenu-base',
    clsBaseContent: 'zd-selectmenu-base-content',
    clsBaseArrow: 'zd-selectmenu-base-arrow zd-icon-arrow-down',

    clsSearch: 'zd-searchmenu-base',

    clsHighlight: 'zd-highlight',
    maxSearchResults: Infinity,

    keyboardCue: false,
    enableHtmlEscape: true,
    searchPlaceholder: ''
  };

  var SOURCE_IN_MAP = {
    'select:click': 1,
    'select:keyboard': 1,
    'select:keyboardCue': 1,
    'search:click': 1,
    'search:keyboard': 1,
    'search:keyboardCue': 1
  };

  var ComboSelectMenu = function (_mixin) {
    _inherits(ComboSelectMenu, _mixin);

    function ComboSelectMenu(options) {
      _classCallCheck(this, ComboSelectMenu);

      var _this = _possibleConstructorReturn(this, (ComboSelectMenu.__proto__ || Object.getPrototypeOf(ComboSelectMenu)).call(this, options));

      _this.type = 'ComboSelectMenu';

      _this.id = (0, _core_utils.getUniqId)();
      _this.baseId = (0, _core_utils.getUniqId)();
      _this.baseContentId = (0, _core_utils.getUniqId)();
      _this.searchId = (0, _core_utils.getUniqId)();

      _this.dom = null;
      _this.domBase = null;
      _this.domBaseContent = null;
      _this.domSearch = null;
      _this.domMenuHolder = null;
      _this.domProxy = null;

      _this.isKeyboardCaptured = false;
      _this.areDomEventsSet = false;
      _this.isComposingInput = false;

      _this.isOpen = false;
      _this.isFocused = false;
      _this.isInDom = false;
      _this.isDestroyed = false;
      _this.state = null; // ['display' | 'displaySearch' | 'fullSearch']

      _this.selectMenu = null;
      _this.searchMenu = null;

      _this.typeToClassMapBase = null;
      _this.typeToClassMapSearch = null;
      _this.typeToClassMapSelect = null;

      // serves to position the menu in the window according
      // to available space and positioning requirements
      _this.verticalMenuPositioner = new _vertical_menu_positioner2.default();

      // detects change in coordinates and fires a registered callback
      _this.domBasePositionObserver = new _dom_position_observer2.default();
      _this.keepOpen = false;

      _this.setOptions(options, defaultOptions);

      _this.hasProxy = _this.options.proxyName || _this.options.proxyId;
      _this.proxyName = _this.options.proxyName;
      _this.proxyId = _this.options.proxyId || (0, _core_utils.getUniqId)();
      _this.container = _this.options.container;
      _this.value = _this.options.value == null ? _this.defaultValue : _this.options.value;

      if (_this.domHolder || _this.domHolderSelector) {
        if (!_this.domHolder && _this.domHolderSelector) {
          _this.domHolder = document.querySelector(_this.domHolderSelector);
        }
        _this.appendTo(_this.domHolder);
      }
      return _this;
    }

    _createClass(ComboSelectMenu, [{
      key: 'appendTo',
      value: function appendTo(target) {
        var _this2 = this;

        if (this.isInDom || !target) return;

        this.domHolder = target;
        _menu2.default.registerInstance(this);

        this.renderItemContentForBase = this.renderItemContentForBase || this.defaultRenderItemContentForBase;

        this.filteringDataSource = this.filteringDataSource || new _filtering_datasource2.default(this.maxSearchResults, this.filteredField);
        this.modelParser = this.modelParser || new _label_concatenator2.default();

        this.htmlBuffer = this.render();
        this.buildDomMenuHolder();
        this.buildCssClassStateManager();
        this.putInDom();

        this.initSelectMenu();

        this.searchDataSource = this.filteringDataSource;

        var highlightRenderer = new _highlighting_renderer2.default();

        this.highlighter = function (str) {
          var filterWord = _this2.searchDataSource.filterWord || '';

          if (filterWord === '') {
            return _this2.enableHtmlEscape ? (0, _core_utils.escapeHtml)(str) : str;
          }

          return highlightRenderer.render(str, _this2.searchDataSource.filterWord, _this2.clsHighlight);
        };

        this.initSearchMenu();
        this.postDomInsertionSetup();
        this.setState('display');
        new _document_clicks_monitor2.default(this);
      }
    }, {
      key: 'buildDomMenuHolder',
      value: function buildDomMenuHolder() {
        this.domMenuHolder = document.createElement('div');
        this.domMenuHolder.className = this.clsSelectMenuScope;
        document.body.appendChild(this.domMenuHolder);
      }
    }, {
      key: 'buildCssClassStateManager',
      value: function buildCssClassStateManager() {
        var _this3 = this;

        this.clsStateManager = new _css_class_state_machine2.default({
          dom: function dom() {
            return _this3.dom;
          },
          domAux: function domAux() {
            return _this3.domMenuHolder;
          },
          clsZero: this.clsDefault,
          clsStates: [this.clsDisabled, this.clsOpen, this.clsFocused, this.clsHover]
        });
      }
    }, {
      key: '_prepareOptions',
      value: function _prepareOptions() {
        this.options.domHolder = this.domMenuHolder;
        this.options.isVisible = false;
        this.options.domRef = null;
        this.options.proxyValue = null;
        this.options.proxyId = null;
        this.options.disabled = false;
      }
    }, {
      key: 'initSelectMenu',
      value: function initSelectMenu() {
        var _this4 = this;

        this._prepareOptions();

        if (this.renderItemContentForSelect) {
          this.options.renderItemContent = this.renderItemContentForSelect;
        }
        this.options.typeToClassMap = this.typeToClassMapSelect;

        this.options.postParser = function (rootItem) {
          return _this4.modelParser.parse(rootItem);
        };

        var selectMenu = this.selectMenu = new _menu2.default(this.options);
        selectMenu.container = this;

        delete this.options.renderItemContent;
        delete this.options.typeToClassMap;
        delete this.options.postParser;

        selectMenu.onChange = function (data) {
          return _this4.setValue(data.value, 'select:' + (data.source == null ? '' : data.source));
        };

        selectMenu.onChangeRequest = function (data) {
          if (data.source === 'click' || data.source === 'keyboard') {
            selectMenu.hide();
            _this4.setState('display');
          }
        };

        selectMenu.setMenuSizes = function () {
          this.dom && (this.dom.style.width = this.container.domBase.offsetWidth + 'px');
        };

        selectMenu.onDataReady = function () {
          _this4.value = _menu2.default.defaultOptions.defaultValue;
        };

        selectMenu.onShow = function () {
          return _this4.onMenuShow(selectMenu, _this4.domBase);
        };
      }
    }, {
      key: 'initSearchMenu',
      value: function initSearchMenu() {
        var _this5 = this;

        this._prepareOptions();

        if (this.renderItemContentForSearch) {
          this.options.renderItemContent = this.renderItemContentForSearch;
        }

        this.options.typeToClassMap = this.typeToClassMapSearch;
        this.options.data = [];

        var searchMenu = this.searchMenu = new _menu2.default(this.options);
        searchMenu.container = this;

        delete this.options.renderItemContent;
        delete this.options.typeToClassMap;

        searchMenu.highlighter = this.highlighter;

        var origRenderItemContent = searchMenu.renderItemContent;
        searchMenu.renderItemContent = function (item, highlighter, escapeHtml) {
          return origRenderItemContent(item.data.sourceItem, highlighter, escapeHtml);
        };

        searchMenu.onChangeRequest = function (data) {
          if (data.source === 'click' || data.source === 'keyboard') {
            _this5.setState('display');
            _this5.setValue(data.value, 'search:' + (data.source == null ? '' : data.source));
          }
        };

        this.searchDataSource.onDataReady = function (data) {
          searchMenu.loadData(data);
          _this5.setState(data.length ? 'fullSearch' : 'displaySearch');
        };

        searchMenu.setMenuSizes = function () {
          this.dom && (this.dom.style.width = this.container.domBase.offsetWidth + 'px');
        };

        searchMenu.onShow = function () {
          return _this5.onMenuShow(searchMenu, _this5.domSearch);
        };
      }
    }, {
      key: 'loadData',
      value: function loadData(data) {
        this.selectMenu.loadData(data);
        this.onDataReady();
      }
    }, {
      key: 'loadPartialData',
      value: function loadPartialData(menu, data) {
        this.selectMenu.loadPartialData(menu, data);
      }
    }, {
      key: 'getItemByValue',
      value: function getItemByValue(value) {
        return this.selectMenu.getItemByValue(value);
      }
    }, {
      key: 'onMenuShow',
      value: function onMenuShow(menu, base) {
        var _this6 = this;

        setTimeout(function () {
          return _this6.domSearch && _this6.domSearch.focus();
        });
      }
    }, {
      key: 'setValue',
      value: function setValue(value, source) {
        if (value == null) {
          value = _menu2.default.defaultOptions.defaultValue;
        }

        if (this.value === value) return;

        var oldValue = this.value;

        var eventData = {
          oldValue: oldValue,
          value: this.value,
          source: source,
          userInitiated: SOURCE_IN_MAP.hasOwnProperty(source)
        };

        if (this.onBeforeChange(eventData) === false) return;

        if (this.selectMenu.setValue(value) === false) return;

        this.value = this.selectMenu.value;

        if (!this.keepOpen) {
          this.setState('display');
        }

        this.syncDomBaseContentWithValue();
        this.syncProxy();

        this.onChange(eventData);
        this.trigger('change', eventData);
      }
    }, {
      key: 'syncDomBaseContentWithValue',
      value: function syncDomBaseContentWithValue() {
        var item = this.selectMenu.hashValues[this.value];
        var typeClass;

        if (item && item.type && this.typeToClassMapBase && this.typeToClassMapBase[item.type]) {
          typeClass = this.typeToClassMapBase[item.type];
        }

        if (this.lastBaseTypeClass) {
          (0, _dom_utils.removeClass)(this.domBase, this.lastBaseTypeClass);
        }

        if (typeClass) {
          (0, _dom_utils.addClass)(this.domBase, this.typeToClassMapBase[item.type]);
        }

        this.lastBaseTypeClass = typeClass;

        var html = this.renderItemContentForBase(item || { label: this.defaultValueLabel });
        this.domBaseContent.innerHTML = html;
      }
    }, {
      key: 'syncProxy',
      value: function syncProxy() {
        this.hasProxy && (this.domProxy.value = this.value);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.trigger('beforeDestroy');
        this.selectMenu.destroy();
        this.searchMenu.destroy();
        this.off();
        _menu2.default.unregisterInstance(this);
        this.destroyUI();
        this.domBasePositionObserver.destroy();
        this.domBasePositionObserver = null;
        (0, _core_utils.cleanObject)(this);
        this.isDestroyed = true;
      }
    }, {
      key: 'destroyUI',
      value: function destroyUI() {
        if (this.isInDom) {
          this.teardownDomEvents();
          this.dom.parentNode.removeChild(this.dom);
          this.domMenuHolder.parentNode.removeChild(this.domMenuHolder);
        }
        this.isInDom = false;
        this.domHolder = null;

        this.dom = null;
        this.domBase = null;
        this.domBaseContent = null;
        this.domSearch = null;
        this.domRef = null;
        this.domProxy = null;
      }
    }, {
      key: 'resetUI',
      value: function resetUI() {
        if (this.isInDom) {
          this.blur();
          (0, _dom_utils.removeClass)(this.dom, this.clsHover);

          this.selectMenu.resetUI();
          this.searchMenu.resetUI();
        }
      }

      // -------------------- Rendering and DOM Manipulation -----------------------

    }, {
      key: 'postDomInsertionSetup',
      value: function postDomInsertionSetup() {
        this.syncDomBaseContentWithValue();
        this.syncProxy();
        this.disabled ? this.disable() : this.setupDomEvents();
      }
    }, {
      key: 'setupDomEvents',
      value: function setupDomEvents() {
        var _this7 = this;

        if (!this.isInDom || this.areDomEventsSet) {
          return;
        }

        var onSearchInput = function onSearchInput(e) {
          return _this7.onSearchInput(e);
        };

        this.onDom(this.domBase, 'click', function (e) {
          return _this7.onBaseClick(e);
        }).onDom(this.domBase, 'mousedown', function (e) {
          return _this7.onBaseMouseDown(e);
        }).onDom(this.domBase, 'focus', function (e) {
          return _this7.onBaseFocus(e);
        }).onDom(this.domBase, 'blur', function (e) {
          return _this7.onBaseBlur(e);
        }).onDom(this.domSearch, 'focus', function (e) {
          return _this7.onSearchFocus(e);
        }).onDom(this.domSearch, 'click', function (e) {
          return _this7.onSearchClick(e);
        }).onDom(this.domSearch, 'input', onSearchInput).onDom(this.domSearch, 'compositionstart', function (e) {
          return _this7.onCompositionStart(e);
        }).onDom(this.domSearch, 'compositionend', function (e) {
          _this7.onCompositionEnd(e);onSearchInput(e);
        }).onDom(this.dom, 'mouseenter', function (e) {
          return _this7.onRootMouseEnter(e);
        }).onDom(this.dom, 'mouseleave', function (e) {
          return _this7.onRootMouseLeave(e);
        });

        if (_core_utils.userAgent.ie9) {
          this.onDom(this.domSearch, 'keyup', onSearchInput).onDom(this.domSearch, 'cut', onSearchInput);
        }

        var onMouseDown = function onMouseDown(e) {
          return _this7.onDocumentMouseDown(e);
        };

        this.on('open', function () {
          return _this7.onDom(document, 'mousedown', onMouseDown);
        });
        this.on('close', function () {
          return _this7.offDom(document, 'mousedown', onMouseDown);
        });

        this.areDomEventsSet = true;
      }
    }, {
      key: 'teardownDomEvents',
      value: function teardownDomEvents() {
        if (!this.isInDom) {
          return;
        }

        this.offDom();
        this.releaseKeyboard();
        this.areDomEventsSet = false;
      }
    }, {
      key: 'render',
      value: function render() {
        var html = '<div id="' + this.id + '" class="' + this.clsSelectMenuRoot + ' ' + this.clsDefault + '">\n                 ' + (this.hasProxy ? '<input type="hidden" name="' + this.proxyName + '" id="' + this.proxyId + '">' : '') + '\n                 <button id="' + this.baseId + '" class="' + this.clsBaseButton + '" role="button" tabindex="0" type="button">\n                   <span class="' + this.clsBaseArrow + '"></span>\n                   <span id="' + this.baseContentId + '" class="' + this.clsBaseContent + '"></span>\n                 </button>\n                 <input id="' + this.searchId + '" class="' + this.clsSearch + '" tabindex="0" placeholder="' + (0, _core_utils.escapeHtml)(this.searchPlaceholder) + '">\n               </div>';
        return html;
      }
    }, {
      key: 'defaultRenderItemContentForBase',
      value: function defaultRenderItemContentForBase(item) {
        return this.enableHtmlEscape && item.enableHtmlEscape ? (0, _core_utils.escapeHtml)(item.label) : item.label;
      }
    }, {
      key: 'putInDom',
      value: function putInDom() {
        if (this.isInDom) {
          return;
        }
        if (this.domRef) {
          this.domRef.insertAdjacentHTML('beforebegin', this.htmlBuffer);
          this.domRef.parentNode.removeChild(this.domRef);
        } else {
          this.domHolder.insertAdjacentHTML('beforeend', this.htmlBuffer);
        }
        this.isInDom = true;

        this.dom = this.domHolder.querySelector('#' + this.id);
        this.domBase = this.domHolder.querySelector('#' + this.baseId);
        this.domBaseContent = this.domHolder.querySelector('#' + this.baseContentId);
        this.domSearch = this.domHolder.querySelector('#' + this.searchId);
        this.domProxy = this.domHolder.querySelector('#' + this.proxyId);
      }

      // --------------------       STATES      -----------------------

    }, {
      key: 'setState',
      value: function setState(state) {
        if (this.state === state) {
          return;
        }
        this.oldState = this.state;
        this.state = state;

        this.states[state].enter.call(this);
        this.onStateChange();
      }
    }, {
      key: 'commonKeyDown',
      value: function commonKeyDown(e) {
        if (e.keyCode === _core_utils.keyCodes.ESCAPE) {
          this.setState('display');
          return false;
        }

        return true;
      }

      // -------------------- Common public methods -----------------------

    }, {
      key: 'focus',
      value: function focus() {
        if (this.isFocused) {
          return;
        }

        this.isFocused = true;
        this.clsStateManager.addState(this.clsFocused);

        this.captureKeyboard();

        _menu2.default.registerAsActive(this.id);
        this.onFocus();
        this.trigger('focus');
      }
    }, {
      key: 'blur',
      value: function blur() {
        if (!this.isFocused) {
          return;
        }

        this.isFocused = false;
        this.clsStateManager.removeState(this.clsFocused);

        this.releaseKeyboard();

        this.selectMenu.blur();
        this.searchMenu.blur();
        this.domBase.blur();

        this.onBlur();
        this.trigger('blur');
      }
    }, {
      key: 'open',
      value: function open() {
        this.setState('displaySearch');
      }
    }, {
      key: 'close',
      value: function close() {
        this.setState('display');
      }
    }, {
      key: 'disable',
      value: function disable() {
        this.setDisableState(true);
      }
    }, {
      key: 'enable',
      value: function enable() {
        this.setDisableState(false);
      }
    }, {
      key: 'setDisableState',
      value: function setDisableState(isDisabled) {
        this.disabled = isDisabled;

        if (this.disabled) {
          this.blur();
          this.close();
          this.teardownDomEvents();
          this.clsStateManager.addState(this.clsDisabled);
          this.domBase.disabled = true;
          this.domSearch.disabled = true;
          if (this.hasProxy) {
            this.domProxy.disabled = true;
          }
        } else {
          this.setupDomEvents();
          this.domBase.disabled = false;
          this.domSearch.disabled = false;
          if (this.hasProxy) {
            this.domProxy.disabled = false;
          }
          this.clsStateManager.removeState(this.clsDisabled);
        }

        this.onDisabledChanged();
        this.trigger('disableChanged');
      }
    }, {
      key: 'show',
      value: function show() {
        this.dom.style.display = '';
        this.trigger('show');
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.dom.style.display = 'none';
        this.trigger('hide');
      }
    }, {
      key: 'getDomBaseForPositioning',
      value: function getDomBaseForPositioning() {
        return this.domSearch;
      }
    }, {
      key: 'captureKeyboard',
      value: function captureKeyboard() {
        var _this8 = this;

        if (this.isKeyboardCaptured) {
          return;
        }
        this.isKeyboardCaptured = true;
        this.onDom(document, 'keypress', function (e) {
          return _this8.onKeyPress(e);
        }).onDom(document, 'keydown', function (e) {
          return _this8.onKeyDown(e);
        });
      }
    }, {
      key: 'releaseKeyboard',
      value: function releaseKeyboard() {
        this.isKeyboardCaptured = false;
        this.offDom(document, 'keypress').offDom(document, 'keydown');
      }
    }, {
      key: 'containsNode',
      value: function containsNode(node) {
        if (!this.isInDom || !node) return false;

        return this.dom.contains(node) || this.dom === node || this.searchMenu.containsNode(node) || this.selectMenu.containsNode(node);
      }
    }, {
      key: 'positionSelectMenu',
      value: function positionSelectMenu(refDom, position) {
        this.positionMenu(this.selectMenu, refDom || this.domSearch, position || this.preferredPosition);
      }
    }, {
      key: 'positionSearchMenu',
      value: function positionSearchMenu(refDom, position) {
        this.positionMenu(this.searchMenu, refDom || this.domSearch, position || this.preferredPosition);
      }
      // ----------------------   Hooks   -------------------------

    }, {
      key: 'onBeforeChange',
      value: function onBeforeChange() {}
    }, {
      key: 'onChange',
      value: function onChange() {}
    }, {
      key: 'onFocus',
      value: function onFocus() {}
    }, {
      key: 'onBlur',
      value: function onBlur() {}
    }, {
      key: 'onDataReady',
      value: function onDataReady() {}
    }, {
      key: 'onDisabledChanged',
      value: function onDisabledChanged() {}
    }, {
      key: 'onDestroy',
      value: function onDestroy() {}
    }, {
      key: 'onStateChange',
      value: function onStateChange() {}

      // -------------------- Event Handlers -----------------------

    }, {
      key: 'onKeyPress',
      value: function onKeyPress(e) {
        this.lastKeyPressed = e.which;
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(e) {
        if (this.commonKeyDown(e)) {
          this.states[this.state].keyDown.call(this, e);
        }
      }
    }, {
      key: 'onDocumentMouseDown',
      value: function onDocumentMouseDown(e) {
        var _this9 = this;

        if (!this.isInDom || !e.target) {
          return;
        }

        if (this.containsNode(e.target)) {
          setTimeout(function () {
            return _this9.domSearch && _this9.domSearch.focus();
          });
        } else {
          this.blur();
          this.close();
          // IE and Edge require this as hiding a focused element such as domSearch
          // messes up with the focus logic. Explicitly blurring domSearch though
          // doesn't solve the problem.
          e.target.focus();
        }
      }
    }, {
      key: 'onBaseClick',
      value: function onBaseClick(e) {}
    }, {
      key: 'onBaseMouseDown',
      value: function onBaseMouseDown() {
        (0, _dom_utils.positionDomIntoView)(this.domBase);
        this.focus();
        this.selectMenu.syncViewWithValue();
        this.open();
      }
    }, {
      key: 'onBaseFocus',
      value: function onBaseFocus() {
        this.focus();
      }
    }, {
      key: 'onBaseBlur',
      value: function onBaseBlur() {
        this.blur();
      }
    }, {
      key: 'onSearchFocus',
      value: function onSearchFocus() {
        this.focus();
      }
    }, {
      key: 'onCompositionStart',
      value: function onCompositionStart() {
        this.isComposingInput = true;
      }
    }, {
      key: 'onCompositionEnd',
      value: function onCompositionEnd() {
        this.isComposingInput = false;
      }
    }, {
      key: 'onSearchInput',
      value: function onSearchInput(e) {
        this.setState('fullSearch');

        if (this.isComposingInput) return;

        this.searchDataSource.filter(this.selectMenu, this.domSearch.value);
        this.positionSearchMenu(this.domSearch, this.preferredPosition);
      }
    }, {
      key: 'onSearchClick',
      value: function onSearchClick() {
        this.close();
      }
    }, {
      key: 'onRootMouseEnter',
      value: function onRootMouseEnter(e) {
        this.clsStateManager.addState(this.clsHover);
      }
    }, {
      key: 'onRootMouseLeave',
      value: function onRootMouseLeave(e) {
        this.clsStateManager.removeState(this.clsHover);
      }
    }, {
      key: 'states',
      get: function get() {
        return _combo_select_menu_states2.default;
      }
    }]);

    return ComboSelectMenu;
  }((0, _core_utils.mixin)(_options_mixin2.default, _observable_mixin2.default, _positionable_mixin2.default, _css_scoping_mixin2.default));

  exports.default = ComboSelectMenu;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _core_utils = __webpack_require__(3);

  var _hash_iterator = __webpack_require__(11);

  var _hash_iterator2 = _interopRequireDefault(_hash_iterator);

  var _array_iterator = __webpack_require__(21);

  var _array_iterator2 = _interopRequireDefault(_array_iterator);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function isInvalidItem(item, filteredField) {
    return item.role === 'uiBackLink' || item.role === 'uiLabel' || item.role === 'root' || item[filteredField] == null || item.value == null;
  }

  var FilteringDataSource = function () {
    _createClass(FilteringDataSource, null, [{
      key: 'buildFilter',
      value: function buildFilter(condition) {
        var filter = function filter(filterer, source, data) {
          var filterRe = filterer.getWordRegExp(),
              filteredField = filterer.filteredField,
              valueHash = Object.create(null);

          var iterator;

          if (source.hashIds) {
            iterator = new _hash_iterator2.default(function () {
              return source.hashIds;
            });
          } else if (Array.isArray(source.data)) {
            iterator = new _array_iterator2.default(function () {
              return source.data;
            });
          }
          if (!iterator) return data;

          iterator.forEach(function (item) {
            if (data.length >= filterer.maxRecords) {
              return false; // break the loop
            }

            if ('enabled' in item && item.enabled === false) return;

            if (isInvalidItem(item, filteredField)) return;

            // making sure we do not include items with same value e.g. group items
            // have same value but purticipate in the menu 2 times
            if (valueHash[item.value] === 1) return;
            valueHash[item.value] = 1;

            if (condition && condition(item, filterer, source, data) !== true) return;

            if (filterRe.test(item[filteredField])) {
              var newItem = data[data.length] = {
                value: item.value,
                label: item.label,
                type: item.type,
                sourceItem: item
              };
              newItem[filteredField] = item[filteredField];
            }
          });

          return data;
        };

        return filter;
      }
    }]);

    function FilteringDataSource(maxRecords, filteredField, filterQueue) {
      _classCallCheck(this, FilteringDataSource);

      this.reset();
      this.maxRecords = maxRecords || Infinity;
      this.filteredField = filteredField || 'label';
      this.filterQueue = (typeof filterQueue === 'function' ? [filterQueue] : filterQueue) || [this.constructor.buildFilter()];
    }

    _createClass(FilteringDataSource, [{
      key: 'loadData',
      value: function loadData(data) {
        this.data = data;
        this.onDataReady(data);
      }
    }, {
      key: 'filter',
      value: function filter(source, filterWord) {
        var _this = this;

        if (filterWord == null || filterWord === '') {
          this.filterWord = '';
          this.loadData([]);
          return;
        }

        if (filterWord === this.filterWord) return;
        this.filterWord = filterWord;

        if (!this.filterWord) {
          return;
        }
        var data = [];

        this.filterQueue.forEach(function (filter) {
          return filter(_this, source, data);
        });

        this.loadData(data);
      }
    }, {
      key: 'onDataReady',
      value: function onDataReady() {}
    }, {
      key: 'getWordRegExp',
      value: function getWordRegExp() {
        return this.getRegExp(this.filterWord);
      }
    }, {
      key: 'getRegExp',
      value: function getRegExp(word) {
        return new RegExp((0, _core_utils.escapeRegExp)(word), 'i');
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.resetFilter();
        this.data = [];
      }
    }, {
      key: 'resetFilter',
      value: function resetFilter() {
        this.filterWord = '';
      }
    }]);

    return FilteringDataSource;
  }();

  exports.default = FilteringDataSource;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var ArrayIterator = function () {
    function ArrayIterator(data) {
      _classCallCheck(this, ArrayIterator);

      this.data = data;
    }

    _createClass(ArrayIterator, [{
      key: 'forEach',
      value: function forEach(callback, context) {
        var data = typeof this.data === 'function' ? this.data() : this.data;
        for (var i = 0, len = data.length; i < len; i++) {
          if (callback.call(context, data[i], i, data) === false) break;
        }
      }
    }]);

    return ArrayIterator;
  }();

  exports.default = ArrayIterator;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _core_utils = __webpack_require__(3);

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var HighlightingRenderer = function () {
    function HighlightingRenderer() {
      _classCallCheck(this, HighlightingRenderer);

      this.reHighlightWord = null;
      this.lastWord = null;
    }

    _createClass(HighlightingRenderer, [{
      key: 'render',
      value: function render(str, highlightWord, clsHighlight) {
        var _this = this;

        highlightWord = highlightWord || '';

        if (this.lastWord !== highlightWord) {
          this.reHighlightWord = new RegExp('(' + (0, _core_utils.escapeRegExp)(highlightWord) + ')', 'ig');
        }

        if (!this.reHighlightWord.test(str)) {
          return str;
        }

        return str.split(this.reHighlightWord).map(function (word) {
          if (_this.reHighlightWord.test(word)) {
            return '<span class="' + clsHighlight + '">' + (0, _core_utils.escapeHtml)(word) + '</span>';
          } else {
            return (0, _core_utils.escapeHtml)(word);
          }
        }).join('');
      }
    }]);

    return HighlightingRenderer;
  }();

  exports.default = HighlightingRenderer;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _core_utils = __webpack_require__(3);

  var _dom_utils = __webpack_require__(4);

  exports.default = {
    display: {
      enter: function enter() {
        this.isOpen = false;
        (0, _dom_utils.addClass)(this.dom, this.clsSelectMenuRoot);
        this.clsStateManager.removeState(this.clsOpen);
        this.stopObservingDomBasePosition();
        this.setPosition('down');

        this.searchMenu.hide();
        this.domSearch.value = '';
        this.domSearch.style.display = 'none';
        this.searchDataSource.reset();

        this.domBase.style.visibility = '';
        if (this.isFocused) {
          this.domBase.focus();
        }
        this.selectMenu.hide();
        this.trigger('close');
      },
      keyDown: function keyDown(e) {
        var _this = this;

        var key = String.fromCharCode(e.keyCode);

        // This covers the case when the user opens the widget
        // using a keyboard stroke that is reflected in the search box.
        // The widget uses the input event on the search box to track
        // for searched keywords.
        if (!this.isOpen && (key >= '0' && key <= '9' || key >= 'A' && key <= 'z') && e.keyCode !== 91) {
          // 91 - 'Command' key
          // For keydown events the keyCode is restricted only to ASCII and it
          // does not reflect the real character entered. That is why we are
          // waiting for the keypress event to fire so that we know what was the
          // character that was entered. We use to log it in this.lastKeyPressed.

          this.setState('fullSearch');

          setTimeout(function () {
            _this.domSearch.value = String.fromCharCode(_this.lastKeyPressed);
            _this.searchDataSource.filter(_this.selectMenu, _this.domSearch.value);
            _this.positionSearchMenu(_this.domSearch, _this.preferredPosition);
          });

          return false;
        }

        switch (e.keyCode) {
          case _core_utils.keyCodes.HOME:
          case _core_utils.keyCodes.END:
          case _core_utils.keyCodes.PAGE_DOWN:
          case _core_utils.keyCodes.PAGE_UP:
          case _core_utils.keyCodes.DOWN:
          case _core_utils.keyCodes.UP:
          case _core_utils.keyCodes.LEFT:
          case _core_utils.keyCodes.ENTER:
          case _core_utils.keyCodes.NUMPAD_ENTER:
          case _core_utils.keyCodes.RIGHT:
            if (!this.isVisible) {
              this.setState('displaySearch');
              e.preventDefault();
            }
            return;
          case _core_utils.keyCodes.TAB:
            return;
        }
        this.selectMenu.onKeyDown(e);
      }
    },

    displaySearch: {
      enter: function enter() {
        var _this2 = this;

        var wasOpen = this.isOpen;
        this.isOpen = true;
        (0, _dom_utils.addClass)(this.dom, this.clsSelectMenuRoot);
        this.clsStateManager.addState(this.clsOpen);
        this.stopObservingDomBasePosition();
        this.searchMenu.hide();
        if (this.oldState !== 'fullSearch') {
          this.domSearch.value = '';
        }
        this.domSearch.style.display = '';
        setTimeout(function () {
          return _this2.domSearch.focus();
        });
        this.domBase.style.visibility = 'hidden';

        this.selectMenu.show();
        if (!this.keepOpen) {
          this.observeDomBasePositionOnce(function () {
            return _this2.close();
          });
        }
        this.positionSelectMenu(this.domSearch, this.preferredPosition);

        !wasOpen && this.trigger('open');
      },
      keyDown: function keyDown(e) {
        var isLeftRight = e.keyCode === _core_utils.keyCodes.LEFT || e.keyCode === _core_utils.keyCodes.RIGHT;
        if (isLeftRight && this.domSearch.value.length > 0) {
          return;
        }
        if (this.keepOpen && e.keyCode === _core_utils.keyCodes.TAB) {
          return;
        }
        this.selectMenu.onKeyDown(e);
      }
    },

    fullSearch: {
      enter: function enter() {
        var _this3 = this;

        var wasOpen = this.isOpen;
        this.isOpen = true;
        (0, _dom_utils.addClass)(this.dom, this.clsSelectMenuRoot);
        this.clsStateManager.addState(this.clsOpen);
        this.stopObservingDomBasePosition();
        this.searchMenu.dom.style.visibility = 'hidden';
        this.domBase.style.visibility = 'hidden';
        this.searchMenu.show();
        this.domSearch.style.display = '';
        this.domSearch.focus();

        this.selectMenu.hide();

        setTimeout(function () {
          if (!_this3.keepOpen) {
            _this3.observeDomBasePositionOnce(function () {
              return _this3.close();
            });
          }
          _this3.positionMenu(_this3.searchMenu, _this3.domSearch, _this3.preferredPosition);
          _this3.searchMenu.dom.style.visibility = '';
        });

        !wasOpen && this.trigger('open');
      },
      keyDown: function keyDown(e) {
        if (e.keyCode === _core_utils.keyCodes.LEFT || e.keyCode === _core_utils.keyCodes.RIGHT) {
          return;
        }
        if (this.keepOpen && e.keyCode === _core_utils.keyCodes.TAB) {
          return;
        }
        this.searchMenu.onKeyDown(e);
      }
    }
  };

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _core_utils = __webpack_require__(3);

  var _dom_utils = __webpack_require__(4);

  var _options_mixin = __webpack_require__(7);

  var _options_mixin2 = _interopRequireDefault(_options_mixin);

  var _observable_mixin = __webpack_require__(8);

  var _observable_mixin2 = _interopRequireDefault(_observable_mixin);

  var _positionable_mixin = __webpack_require__(13);

  var _positionable_mixin2 = _interopRequireDefault(_positionable_mixin);

  var _css_scoping_mixin = __webpack_require__(14);

  var _css_scoping_mixin2 = _interopRequireDefault(_css_scoping_mixin);

  var _vertical_menu_positioner = __webpack_require__(15);

  var _vertical_menu_positioner2 = _interopRequireDefault(_vertical_menu_positioner);

  var _dom_position_observer = __webpack_require__(16);

  var _dom_position_observer2 = _interopRequireDefault(_dom_position_observer);

  var _highlighting_renderer = __webpack_require__(22);

  var _highlighting_renderer2 = _interopRequireDefault(_highlighting_renderer);

  var _css_class_state_machine = __webpack_require__(17);

  var _css_class_state_machine2 = _interopRequireDefault(_css_class_state_machine);

  var _filtering_datasource = __webpack_require__(20);

  var _filtering_datasource2 = _interopRequireDefault(_filtering_datasource);

  var _menu = __webpack_require__(2);

  var _menu2 = _interopRequireDefault(_menu);

  var _document_clicks_monitor = __webpack_require__(18);

  var _document_clicks_monitor2 = _interopRequireDefault(_document_clicks_monitor);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var defaultOptions = {
    domHolderSelector: null,
    preferredPosition: null, // ['up' | 'down']

    disabled: false,

    clsSearchMenuScope: 'zd-searchmenu',
    clsSearchMenuRoot: 'zd-searchmenu zd-searchmenu-root',
    clsBaseInput: 'zd-searchmenu-base',

    clsDefault: 'zd-state-default',
    clsDisabled: 'zd-state-disabled',
    clsFocused: 'zd-state-focus',
    clsOpen: 'zd-state-open',
    clsHover: 'zd-state-hover',
    clsSearch: 'zd-state-search',

    clsPositionUp: 'zd-state-position-up',

    clsHighlight: 'zd-highlight',

    keyboardCue: false,
    maxSearchResults: 10,
    enableHtmlEscape: true,
    searchField: 'label',
    openOnFocus: false,
    basePlaceholder: '',
    selectFirstOnOpen: false
  };

  var SearchMenu = function (_mixin) {
    _inherits(SearchMenu, _mixin);

    function SearchMenu(options) {
      _classCallCheck(this, SearchMenu);

      var _this = _possibleConstructorReturn(this, (SearchMenu.__proto__ || Object.getPrototypeOf(SearchMenu)).call(this, options));

      _this.setOptions(options, defaultOptions);

      _this.type = 'SearchMenu';

      _this.id = (0, _core_utils.getUniqId)();
      _this.baseId = (0, _core_utils.getUniqId)();

      _this.dom = null;
      _this.domBase = null;

      _this.isFocused = false;
      _this.isInDom = false;
      _this.isDestroyed = false;

      _this.isKeyboardCaptured = false;
      _this.areDomEventsSet = false;
      _this.isComposingInput = false;

      _this.filterWord = '';
      _this.value = _this.value || '';

      _this.typeToClassMapBase = null;
      _this.typeToClassMapMenu = null;

      _this.container = _this.options.container;

      if (_this.domHolder || _this.domHolderSelector) {
        _this.appendTo(_this.domHolder || document.querySelector(_this.domHolderSelector));
      }
      return _this;
    }

    _createClass(SearchMenu, [{
      key: 'appendTo',
      value: function appendTo(target) {
        var _this2 = this;

        if (this.isInDom || !target) return;

        this.domHolder = target;

        _menu2.default.registerInstance(this);

        this.setupHighlighter();

        this.renderItemContentForBase = this.renderItemContentForBase || this.renderItemContentForBaseDefault;
        this.getMenuPositionRefDom = this.options.getMenuPositionRefDom || this.getMenuPositionRefDom;

        this.setupDataSources();

        if (Array.isArray(this.data)) {
          this.data = this._normalizeData(this.data);
          delete this.options.data;
          this.loadData(this.data);
        }

        // serves to position the menu in the window according
        // to available space and positioning requirements
        this.verticalMenuPositioner = new _vertical_menu_positioner2.default();

        // detects change in coordinates and fires a registered callback
        this.domBasePositionObserver = new _dom_position_observer2.default();

        this.htmlBuffer = this.render();
        this.buildDomMenuHolder();
        this.buildCssClassStateManager();
        this.putInDom();
        this.initMenu();
        this.postDomInsertionSetup();

        this.setState('display');
        new _document_clicks_monitor2.default(this);

        if (this.selectFirstOnOpen) {
          var selectFirst = function selectFirst(e, data) {
            setTimeout(function () {
              var firstItem = _this2.menu.activeMenu[0];
              firstItem && _this2.menu.focusItem(firstItem);
            }, 10);
          };
          this.on('open', selectFirst).on('load', selectFirst);
        }
      }
    }, {
      key: 'buildDomMenuHolder',
      value: function buildDomMenuHolder() {
        this.domMenuHolder = document.createElement('div');
        this.domMenuHolder.className = this.clsSearchMenuScope;
        document.body.appendChild(this.domMenuHolder);
      }
    }, {
      key: 'buildCssClassStateManager',
      value: function buildCssClassStateManager() {
        var _this3 = this;

        this.clsStateManager = new _css_class_state_machine2.default({
          dom: function dom() {
            return _this3.dom;
          },
          domAux: function domAux() {
            return _this3.domMenuHolder;
          },
          clsZero: this.clsDefault,
          clsStates: [this.clsDisabled, this.clsOpen, this.clsFocused, this.clsHover]
        });
      }
    }, {
      key: 'loadData',
      value: function loadData(data) {
        if (!this.menu) {
          return;
        }
        this.menu.loadData(data);
        this.onDataLoaded(data);
        this.trigger('load');
      }
    }, {
      key: 'onDataLoaded',
      value: function onDataLoaded(data) {
        this.clearMenuSelection();
        if (this.openOnFocus) return;
        data.length ? this.open() : this.close();
      }
    }, {
      key: 'clearMenuSelection',
      value: function clearMenuSelection() {
        this.menu.focusItem(null);
        this.menu.focusedItem = null;
      }
    }, {
      key: 'setupHighlighter',
      value: function setupHighlighter() {
        var _this4 = this;

        var highlightRenderer = new _highlighting_renderer2.default();

        this.highlighter = function (str) {
          var filterWord = _this4.searchDataSource.filterWord || '';

          if (filterWord === '') {
            return _this4.enableHtmlEscape ? (0, _core_utils.escapeHtml)(str) : str;
          }

          return highlightRenderer.render(str, _this4.searchDataSource.filterWord, _this4.clsHighlight);
        };
      }
    }, {
      key: 'setupDataSources',
      value: function setupDataSources() {
        var _this5 = this;

        this.searchDataSource = this.searchDataSource || new _filtering_datasource2.default(this.maxSearchResults, this.searchField);

        this.searchDataSource.onDataReady = function (data) {
          return _this5.loadData(data || []);
        };

        if (this.searchDataSource.on) {
          this.searchDataSource.on('beforeFetch', function () {
            return _this5.syncViewWithSearchState('beforeFetch');
          });
          this.searchDataSource.on('fetch', function () {
            return _this5.syncViewWithSearchState('fetch');
          });
        }
      }
    }, {
      key: 'syncViewWithSearchState',
      value: function syncViewWithSearchState(context) {
        if (!this.dom) return;
        if (context === 'beforeFetch') {
          (0, _dom_utils.addClass)(this.dom, this.clsSearch);
        } else if (context === 'fetch') {
          (0, _dom_utils.removeClass)(this.dom, this.clsSearch);
        }
      }
    }, {
      key: 'initMenu',
      value: function initMenu() {
        var _this6 = this;

        this.options.domHolder = this.domMenuHolder;
        this.options.isVisible = false;
        this.options.domRef = null;
        this.options.proxyValue = null;
        this.options.proxyId = null;
        this.options.disabled = false;
        this.options.container = this;

        if (this.renderItemContentForMenu) {
          this.options.renderItemContent = this.renderItemContentForMenu;
        }

        var menu = this.menu = new _menu2.default(this.options);

        delete this.options.renderItemContent;

        menu.container = this;
        menu.highlighter = this.highlighter;
        menu.onChange = function (data) {
          return _this6.onMenuChange(data);
        };
        menu.onChangeRequest = function (data) {
          return _this6.onMenuChangeRequest(data);
        };

        var nativeOnKeyDown = menu.onKeyDown;

        menu.onKeyDown = function (e) {
          if (_this6.onMenuKeyDown(e) === false) return;
          if (_this6.isOpen) {
            nativeOnKeyDown.call(menu, e);
          }
        };

        menu.setMenuSizes = function () {
          if (!this.dom) return;
          this.dom.style.width = this.container.getMenuPositionRefDom().offsetWidth + 'px';
        };

        var onMenuShow = function onMenuShow() {
          return _this6.onMenuShow();
        };
        menu.on('dataLoaded', onMenuShow);
        menu.on('show', onMenuShow);
      }
    }, {
      key: 'onMenuShow',
      value: function onMenuShow() {
        if (!this.menu.isVisible) return;
        this.positionMenu(this.menu, this.getMenuPositionRefDom(), this.preferredPosition);
      }
    }, {
      key: 'onMenuChange',
      value: function onMenuChange(data) {
        if (data.source === 'init') {
          return;
        }
        this.setValue(data.value, data.source);
      }
    }, {
      key: 'onMenuChangeRequest',
      value: function onMenuChangeRequest(data) {
        if (data.source === 'click' || data.source === 'keyboard' || data.source === 'keyboardCue') {
          this.setState('display');
        }
      }
    }, {
      key: 'onMenuKeyDown',
      value: function onMenuKeyDown(e) {
        if (e.keyCode === _core_utils.keyCodes.ESCAPE) {
          this.setState('display');
        }
        if (e.keyCode === _core_utils.keyCodes.LEFT || e.keyCode === _core_utils.keyCodes.RIGHT) return false;

        var focusedItem = this.menu.focusedItem;
        var hasValidFocusedItem = focusedItem && this.menu.hashValues[focusedItem.value];

        if (e.keyCode === _core_utils.keyCodes.TAB && this.isOpen && !hasValidFocusedItem) {
          if (this.onBeforeTabbingAway() !== false) {
            var value = this.getBaseContent();
            if (value && value.length > 0) {
              this.setValue(value, "keyboard");
            }
          }
          this.blur();
          return false;
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.trigger('beforeDestroy');
        this.menu.destroy();
        _menu2.default.unregisterInstance(this);
        this.off();
        this.destroyUI();
        this.verticalMenuPositioner = null;
        this.domBasePositionObserver.destroy();
        this.domBasePositionObserver = null;
        (0, _core_utils.cleanObject)(this);
        this.isDestroyed = true;
        this.lastSelectedMenuItem = null;
      }
    }, {
      key: 'destroyUI',
      value: function destroyUI() {
        if (this.isInDom) {
          this.teardownDomEvents();
          this.dom.parentNode.removeChild(this.dom);
          this.domMenuHolder.parentNode.removeChild(this.domMenuHolder);
        }
        this.isInDom = false;
        this.domHolder = null;
        this.domRef = null;
      }
    }, {
      key: 'resetUI',
      value: function resetUI() {
        if (this.isInDom) {
          this.close();
          this.blur();
          (0, _dom_utils.removeClass)(this.dom, this.clsHover);

          this.setBaseContent('');
          this.menu.resetUI();
        }
      }
    }, {
      key: '_normalizeData',
      value: function _normalizeData(data) {
        var newData = [];

        for (var i = 0, len = data.length; i < len; i++) {
          if (data[i] == null) continue;
          if (_typeof(data[i]) === 'object') {
            newData.push(data[i]);
          } else {
            newData.push({ value: data[i], label: data[i] });
          }
        }

        return newData;
      }

      // -------------------- Rendering and DOM Manipulation -----------------------

    }, {
      key: 'render',
      value: function render() {
        var html = '<div id="' + this.id + '" class="' + this.clsSearchMenuRoot + ' ' + this.clsDefault + '">\n        <input id="' + this.baseId + '" class="' + this.clsBaseInput + '"\n          tabindex="0" placeholder="' + (0, _core_utils.escapeHtml)(this.basePlaceholder) + '">\n        <span class="icon"></span>\n      </div>';
        return html;
      }
    }, {
      key: 'renderItemContentForBaseDefault',
      value: function renderItemContentForBaseDefault(value) {
        return value;
      }
    }, {
      key: 'putInDom',
      value: function putInDom() {
        if (this.isInDom) {
          return;
        }
        if (this.domRef) {
          this.domRef.insertAdjacentHTML('beforebegin', this.htmlBuffer);
          this.domRef.parentNode.removeChild(this.domRef);
        } else {
          this.domHolder.insertAdjacentHTML('beforeend', this.htmlBuffer);
        }
        this.isInDom = true;

        this.dom = this.domHolder.querySelector('#' + this.id);
        this.domBase = this.domHolder.querySelector('#' + this.baseId);
      }
    }, {
      key: 'postDomInsertionSetup',
      value: function postDomInsertionSetup() {
        this.disabled ? this.disable() : this.setupDomEvents();
      }
    }, {
      key: 'setupDomEvents',
      value: function setupDomEvents() {
        var _this7 = this;

        if (!this.isInDom || this.areDomEventsSet) {
          return;
        }

        var onBaseInput = function onBaseInput(e) {
          return _this7.onBaseInput(e);
        };

        this.onDom(this.domBase, 'focus', function (e) {
          return _this7.onBaseFocus(e);
        }).onDom(this.domBase, 'blur', function (e) {
          return _this7.onBaseBlur(e);
        }).onDom(this.domBase, 'input', onBaseInput).onDom(this.domBase, 'compositionstart', function (e) {
          return _this7.onCompositionStart(e);
        }).onDom(this.domBase, 'compositionend', function (e) {
          _this7.onCompositionEnd(e);onBaseInput(e);
        }).onDom(this.dom, 'mouseenter', function (e) {
          return _this7.onRootMouseEnter(e);
        }).onDom(this.dom, 'mouseleave', function (e) {
          return _this7.onRootMouseLeave(e);
        });

        if (_core_utils.userAgent.ie9) {
          this.onDom(this.domBase, 'keyup', onBaseInput).onDom(this.domBase, 'cut', onBaseInput);
        }

        var onMouseDown = function onMouseDown(e) {
          return _this7.onDocumentMouseDown(e);
        };

        this.on('open', function () {
          return _this7.onDom(document, 'mousedown', onMouseDown);
        });
        this.on('close', function () {
          return _this7.offDom(document, 'mousedown', onMouseDown);
        });

        this.areDomEventsSet = true;
      }
    }, {
      key: 'teardownDomEvents',
      value: function teardownDomEvents() {
        if (!this.isInDom) {
          return;
        }

        this.offDom();
        this.areDomEventsSet = false;
      }
    }, {
      key: 'getBaseContent',
      value: function getBaseContent() {
        return this.domBase.value;
      }
    }, {
      key: 'setBaseContent',
      value: function setBaseContent(content) {
        this.domBase.value = content;
      }
    }, {
      key: 'syncViewWithValue',
      value: function syncViewWithValue() {
        this.setBaseContent(this.renderItemContentForBase(this.value, this.lastSelectedMenuItem));
      }

      // -------------------- General Menu Operations -----------------------

    }, {
      key: 'setValue',
      value: function setValue(value, source) {
        if (this.value === value) {
          return;
        }

        var lastSelectedMenuItem = this.menu.activeItem || this.menu.hashValues[value];

        var eventData = {
          oldValue: this.value,
          value: value,
          source: source,
          userInitiated: source === 'click' || source === 'keyboard' || source === 'keyboardCue',
          menuItem: lastSelectedMenuItem
        };

        if (this.onBeforeChange(eventData) === false) {
          return;
        }

        this.value = value;
        this.lastSelectedMenuItem = lastSelectedMenuItem;

        this.syncViewWithValue();

        this.setState('display');

        this.onChange(eventData);
        this.trigger('change', eventData);
      }
    }, {
      key: 'setState',
      value: function setState(state, source) {
        if (this.state === state) return;
        this.state = state;

        switch (this.state) {
          case 'search':
            this.menu.captureKeyboard();
            break;
          case 'display':
            this.searchDataSource.resetFilter();
            this.syncViewWithValue();
            if (this.openOnFocus) {
              this.loadData([]);
              break;
            }
            this.menu.releaseKeyboard();
            this.searchDataSource.resetFilter();
            this.close();
            break;
          case 'displayUnconditional':
            this.searchDataSource.resetFilter();
            this.syncViewWithValue();
            this.menu.releaseKeyboard();
            this.close();
        }

        this.onStateChange();
      }
    }, {
      key: 'focus',
      value: function focus() {
        (0, _dom_utils.positionDomIntoView)(this.domBase);
        if (this.isFocused) {
          return;
        }

        this.isFocused = true;
        this.setState('search');
        this.setBaseContent('');
        this.clsStateManager.addState(this.clsFocused);
        if (this.openOnFocus) this.open();
        this.domBase.focus();

        _menu2.default.registerAsActive(this.id);
        this.onFocus();
        this.trigger('focus');
      }
    }, {
      key: 'blur',
      value: function blur() {
        if (!this.isFocused) {
          return;
        }

        this.onBeforeBlur(this.domBase.value);
        this.trigger('beforeBlur');

        this.isFocused = false;
        this.searchDataSource && this.searchDataSource.abort && this.searchDataSource.abort();
        this.setState('displayUnconditional');
        this.clsStateManager.removeState(this.clsFocused);

        this.onBlur();
        this.trigger('blur');
      }
    }, {
      key: 'open',
      value: function open() {
        var _this8 = this;

        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        this.menu.show(false);
        this.domBase.focus();
        this.focus();
        this.clsStateManager.addState(this.clsOpen);
        this.positionMenu(this.menu, this.getMenuPositionRefDom(), this.preferredPosition);

        if (this.openOnFocus) {
          this.observeDomBasePosition(function () {
            _this8.menu.show();
            _this8.positionMenu(_this8.menu, _this8.getMenuPositionRefDom(), _this8.preferredPosition);
          });
        } else {
          this.observeDomBasePositionOnce(function () {
            return _this8.close();
          });
        }

        this.onOpen();
        this.trigger('open');
      }
    }, {
      key: 'close',
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.stopObservingDomBasePosition();
        this.setPosition('down');
        this.menu.hide();
        this.loadData([]);
        this.clsStateManager.removeState(this.clsOpen);
        this.onClose();
        this.trigger('close');
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        this.isOpen ? this.close() : this.open();
      }
    }, {
      key: 'disable',
      value: function disable() {
        this.setDisableState(true);
      }
    }, {
      key: 'enable',
      value: function enable() {
        this.setDisableState(false);
      }
    }, {
      key: 'setDisableState',
      value: function setDisableState(isDisabled) {
        this.disabled = isDisabled;

        if (this.disabled) {
          this.blur();
          this.close();
          this.teardownDomEvents();
          this.clsStateManager.addState(this.clsDisabled);
          this.domBase.disabled = true;
        } else {
          this.setupDomEvents();
          this.domBase.disabled = false;
          this.clsStateManager.removeState(this.clsDisabled);
        }
        this.onDisabledChanged();
        this.trigger('disableChanged');
      }
    }, {
      key: 'show',
      value: function show() {
        this.dom.style.display = '';
        this.trigger('show');
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.dom.style.display = 'none';
        this.trigger('hide');
      }
    }, {
      key: 'getMenuPositionRefDom',
      value: function getMenuPositionRefDom() {
        return this.domBase;
      }
    }, {
      key: 'getDomBaseForPositioning',
      value: function getDomBaseForPositioning() {
        return this.domBase;
      }
    }, {
      key: 'getItemByValue',
      value: function getItemByValue(value) {
        return this.menu.getItemByValue(value);
      }
    }, {
      key: 'containsNode',
      value: function containsNode(node) {
        if (!this.isInDom || !node) return false;

        return this.dom.contains(node) || this.dom === node || this.menu.containsNode(node);
      }
      // ----------------------   Hooks   -------------------------

    }, {
      key: 'onBeforeChange',
      value: function onBeforeChange() {}
    }, {
      key: 'onChange',
      value: function onChange() {}
    }, {
      key: 'onFocus',
      value: function onFocus() {}
    }, {
      key: 'onBeforeBlur',
      value: function onBeforeBlur() {}
    }, {
      key: 'onBlur',
      value: function onBlur() {}
    }, {
      key: 'onOpen',
      value: function onOpen() {}
    }, {
      key: 'onClose',
      value: function onClose() {}
    }, {
      key: 'onDataReady',
      value: function onDataReady() {}
    }, {
      key: 'onDisabledChanged',
      value: function onDisabledChanged() {}
    }, {
      key: 'onDestroy',
      value: function onDestroy() {}
    }, {
      key: 'onBeforeTabbingAway',
      value: function onBeforeTabbingAway() {}

      // -------------------- Event Handlers -----------------------

    }, {
      key: 'onStateChange',
      value: function onStateChange() {}
    }, {
      key: 'onDocumentMouseDown',
      value: function onDocumentMouseDown(e) {
        var _this9 = this;

        if (this.containsNode(e.target)) return;

        setTimeout(function () {
          if (!_this9.domBase) return;
          if (document.activeElement === _this9.domBase) return;
          _this9.blur();
          _this9.close();
        });
      }
    }, {
      key: 'onCompositionStart',
      value: function onCompositionStart() {
        this.isComposingInput = true;
      }
    }, {
      key: 'onCompositionEnd',
      value: function onCompositionEnd() {
        this.isComposingInput = false;
      }
    }, {
      key: 'onBaseInput',
      value: function onBaseInput(e) {
        if (this.state === 'display') {
          this.setState('search');
        }

        if (this.isComposingInput) return;

        this.searchDataSource.filter(this, this.domBase.value);
        this.trigger('input', e);
      }
    }, {
      key: 'onBaseFocus',
      value: function onBaseFocus() {
        this.focus();
      }
    }, {
      key: 'onBaseBlur',
      value: function onBaseBlur(e) {
        !this.isOpen && this.blur();
      }
    }, {
      key: 'onRootMouseEnter',
      value: function onRootMouseEnter(e) {
        this.clsStateManager.addState(this.clsHover);
      }
    }, {
      key: 'onRootMouseLeave',
      value: function onRootMouseLeave(e) {
        this.clsStateManager.removeState(this.clsHover);
      }
    }, {
      key: 'onWindowResize',
      value: function onWindowResize() {
        if (this.openOnFocus) {
          this.positionMenu(this.menu, this.getMenuPositionRefDom(), this.preferredPosition);
        } else {
          this.close();
        }
      }
    }]);

    return SearchMenu;
  }((0, _core_utils.mixin)(_options_mixin2.default, _observable_mixin2.default, _positionable_mixin2.default, _css_scoping_mixin2.default));

  exports.default = SearchMenu;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _core_utils = __webpack_require__(3);

  var _dom_utils = __webpack_require__(4);

  var _menu = __webpack_require__(2);

  var _menu2 = _interopRequireDefault(_menu);

  var _simple_tag_editor = __webpack_require__(26);

  var _simple_tag_editor2 = _interopRequireDefault(_simple_tag_editor);

  var _search_tag_editor = __webpack_require__(27);

  var _search_tag_editor2 = _interopRequireDefault(_search_tag_editor);

  var _combo_select_tag_editor = __webpack_require__(28);

  var _combo_select_tag_editor2 = _interopRequireDefault(_combo_select_tag_editor);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var defaultOptions = (0, _core_utils.extend)({}, _menu2.default.defaultOptions, {
    clsRoot: 'zd-tag-menu-root',
    clsItem: 'zd-tag-item',
    initialTagCount: Infinity,
    useUniqueValues: false,
    ignoreCase: false,
    enableEditing: true,
    hiddenTagsTemplate: '%@ more...',
    validateEditorValue: function validateEditorValue() {
      return true;
    },
    enterValueOnEditorBlur: false,
    getContentForClipboard: function getContentForClipboard(item) {
      return item.label;
    }
  });

  var TagMenu = function (_Menu) {
    _inherits(TagMenu, _Menu);

    function TagMenu() {
      _classCallCheck(this, TagMenu);

      return _possibleConstructorReturn(this, (TagMenu.__proto__ || Object.getPrototypeOf(TagMenu)).apply(this, arguments));
    }

    _createClass(TagMenu, [{
      key: 'onBeforeLoad',
      value: function onBeforeLoad() {
        if (!this.editor) return;
        this.editor.dom.parentNode.removeChild(this.editor.dom);
        this.editor.close && this.editor.close();
      }
    }, {
      key: 'onLoad',
      value: function onLoad() {
        if (!this.editor) {
          this.createEditor();
          return;
        }

        var domEditorHolder = this.dom.querySelector(".zd-tag-editor-holder");
        domEditorHolder.innerHTML = '';
        domEditorHolder.appendChild(this.editor.dom);

        if (this.isFocused) {
          this.editor.domBase && this.editor.domBase.focus();
          this.editor.open && this.editor.open();
        }
      }
    }, {
      key: 'onSetup',
      value: function onSetup(options) {
        var _this2 = this;

        this.type = 'zdTagMenu';
        this.shouldShortenTags = true;
        this.editorFactory = this.options.editorFactory;

        if (!this.editorFactory) {
          if (this.options.searchEditorOptions) {
            this.editorFactory = this.searchEditorFactory;
          } else if (this.options.comboSelectEditorOptions) {
            this.editorFactory = this.comboSelectEditorFactory;
          } else {
            this.editorFactory = this.simpleEditorFactory;
          }
        }
        this.on('zeroStateChanged', function () {
          return _this2.onZeroStateChanged();
        });
        this.on('outOfRangeNavigation', function (e, data) {
          return _this2.onOutOfRangeNavigation(e, data);
        });

        if (this.options.comboSelectEditorOptions) {
          this.clsRoot += ' zd-multiselect';
        }
      }
    }, {
      key: 'onOutOfRangeNavigation',
      value: function onOutOfRangeNavigation(e, data) {
        this.clearFocusedItem();
        this.focusEditor();
      }
    }, {
      key: 'onZeroStateChanged',
      value: function onZeroStateChanged() {
        if (this.editor) {
          this.editor.resolvePlaceholder();
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.releaseKeyboard();
        this.editor && this.editor.destroy();
        _get(TagMenu.prototype.__proto__ || Object.getPrototypeOf(TagMenu.prototype), 'destroy', this).call(this);
      }
    }, {
      key: 'syncViewWithValue',
      value: function syncViewWithValue(withFocus) {
        if (this.isInDom && this.isVisible) {
          this.showMenu(this.rootItem.menu, null);
        }
      }
    }, {
      key: 'postParser',
      value: function postParser(rootItem) {
        var menu;
        if (!rootItem.menu) {
          menu = [];
          menu.id = (0, _core_utils.getUniqId)();
          menu.isInDom = false;
          menu.parentItem = rootItem;
          rootItem.menu = menu;
        }
      }
    }, {
      key: 'getTags',
      value: function getTags() {
        return this.getValues().map(function (value) {
          return value.label;
        });
      }
    }, {
      key: 'getValues',
      value: function getValues() {
        return [].concat(this.rootItem.menu);
      }
    }, {
      key: 'setValues',
      value: function setValues(values) {
        values = [].concat(values || []);
        var item = void 0,
            i = void 0,
            len = values.length;

        for (i = 0; i < len; i++) {
          item = values[i];
          if (item == null) continue;

          if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
            item = { value: String(item) };
            values[i] = item;
          }

          if (item.label == null) {
            if (this.editor && this.editor.hasValue(item.value)) {
              item.label = this.editor.getItemByValue(item.value).label;
            } else {
              item.label = item.value;
            }
          }
        }

        this.loadData(values);
      }
    }, {
      key: 'renderMenu',
      value: function renderMenu(menu) {
        if (!menu) {
          return '';
        }

        var html = ['<ul id="' + menu.id + '" class="' + this.clsListHolder + '" role="menu">'];
        var len = this.shouldShortenTags ? Math.min(menu.length, this.initialTagCount) : menu.length;

        for (var i = 0; i < len; i++) {
          html.push(this.renderItem(menu[i]));
        }

        if (this.shouldShortenTags && menu.length - this.initialTagCount > 0) {
          html.push(this.renderTagShortener(menu.length - this.initialTagCount));
        }

        html.push('</ul>');

        if (this.enableEditing) {
          html.push(this.renderTagEditor());
        }
        return html.join('');
      }
    }, {
      key: 'renderItem',
      value: function renderItem(item) {
        var arrowHtml = void 0;
        var itemClass = this.clsItem;

        if (this.typeToClassMap && item.type && this.typeToClassMap[item.type]) {
          itemClass += ' ' + this.typeToClassMap[item.type];
        }
        if (this.roleToClassMap && item.role && this.roleToClassMap[item.role]) {
          itemClass += ' ' + this.roleToClassMap[item.role];
        }
        if (this.itemIsDisabled(item)) {
          itemClass += ' ' + this.clsItemDisabled;
        }

        if (item.menu) {
          arrowHtml = '<span class="' + this.clsItemArrow + '"></span>';
        } else if (item.role === 'uiBackLink') {
          item.label = this.backLinkLabel;
          arrowHtml = '<span class="' + this.clsBackArrow + '"></span>';
        } else {
          arrowHtml = '';
        }

        var menuItemIconHtml = this.enableMenuItemIcons ? this.renderItemIcon(item) : '';

        return '<li id="' + item.id + '" class="' + itemClass + '" role="presentation">' + (arrowHtml + menuItemIconHtml) + '\n              <a tabindex="-1" role="menuitem">' + this.renderItemContent(item, this.highlighter, _core_utils.escapeHtml) + '</a>\n              <span class="zd-tag-close">\n                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">\n                  <path stroke="currentColor" d="M4 10l6-6M4 4l6 6" stroke-linecap="round"/>\n                </svg>\n              </span>\n            </li>';
      }
    }, {
      key: 'renderTagShortener',
      value: function renderTagShortener(hiddenTagsCount) {
        var hiddenTagsLabel;
        if (typeof this.hiddenTagsTemplate === 'function') {
          hiddenTagsLabel = this.hiddenTagsTemplate(hiddenTagsCount);
        } else {
          hiddenTagsLabel = (0, _core_utils.fmt)(this.hiddenTagsTemplate, [hiddenTagsCount]);
        }
        return '<li class="zd-tag-shortener"><a>' + hiddenTagsLabel + '</a></li>';
      }
    }, {
      key: 'renderTagEditor',
      value: function renderTagEditor(hiddenTagsCount) {
        return '<div class="zd-tag-editor-holder"><button class="zd-menu-focus-shim"></button></div>';
      }
    }, {
      key: 'postDomInsertionSetup',
      value: function postDomInsertionSetup() {
        var _this3 = this;

        var docClickHandler = function docClickHandler(e) {
          return _this3.onDocumentClick(e);
        };

        var onDomClick = function onDomClick(e) {
          if ((0, _dom_utils.closest)(e.target, '.zd-tag-close', _this3.dom)) {
            _this3.onTagCloseClick(e);
          }
        };

        this.onDom(this.domMenuPanel, 'click', function (e) {
          return _this3.onRootClick(e);
        }).onDom(this.dom, 'mouseenter', function (e) {
          return _this3.onRootMouseEnter(e);
        }).onDom(this.dom, 'mouseleave', function (e) {
          return _this3.onRootMouseLeave(e);
        }).onDom(this.dom, 'click', onDomClick).onDom(this.dom, 'keydown', function (e) {
          return _this3.onKeyDownForCopy(e);
        }).onDom(this.dom, 'mousedown', function (e) {
          return _this3.onRootMouseDown(e);
        }).on('focus', function () {
          return _this3.onDom(document, 'click', docClickHandler);
        }).on('blur', function () {
          return _this3.offDom(document, 'click', docClickHandler);
        });
      }
    }, {
      key: 'focus',
      value: function focus() {
        if (this.isFocused || this.disabled) {
          return;
        }
        _get(TagMenu.prototype.__proto__ || Object.getPrototypeOf(TagMenu.prototype), 'focus', this).call(this);
        this.expandItems();
        this.createEditor();
        this.activateEditor();
      }
    }, {
      key: 'blur',
      value: function blur() {
        if (!this.isFocused) return;
        _get(TagMenu.prototype.__proto__ || Object.getPrototypeOf(TagMenu.prototype), 'blur', this).call(this);
        this.clearEditor({ reason: 'blur' });
        this.releaseEditorKeyboard();
        this.releaseKeyboard();
      }
    }, {
      key: 'expandItems',
      value: function expandItems() {
        if (this.shouldShortenTags && this.activeMenu && this.activeMenu.length > this.initialTagCount) {
          var tagShortener = this.dom.querySelector('.zd-tag-shortener');
          tagShortener && (tagShortener.style.display = 'none');
          this.addItemsToDom(this.activeMenu.slice(this.initialTagCount));
        }
        this.shouldShortenTags = false;
      }
    }, {
      key: 'addItem',
      value: function addItem(value, label, options, skipUniqueueCheck) {
        if (!skipUniqueueCheck && this.useUniqueValues && this.getMatchingValues(value).length > 0) return false;

        options = options || {};
        var hasOwnProperty = Object.prototype.hasOwnProperty;

        var data = {
          value: value,
          label: label || value,
          enabled: hasOwnProperty.call(options, 'enabled') ? options.enabled : true,
          context: options.context
        };

        if (this.activeMenu) {
          var newItem = {
            data: data,
            enabled: data.enabled,
            label: data.label,
            value: data.value,
            isInDom: true,
            parentItem: this.activeMenu.parentItem,
            parentMenu: this.activeMenu,
            type: options.type,
            id: (0, _core_utils.getUniqId)(),
            enableHtmlEscape: hasOwnProperty.call(options, 'enableHtmlEscape') ? options.enableHtmlEscape : true
          };

          this.activeMenu.push(newItem);
          this.hashValues[newItem.value] = newItem;
          this.hashIds[newItem.id] = newItem;

          this.resolveZeroState();
          this.syncViewWithZeroState();
          this.addItemToDom(newItem);
          this.trigger('tagsChanged', { mode: 'add', tag: newItem });
          return true;
        }
      }
    }, {
      key: 'addHtmlToDomForItems',
      value: function addHtmlToDomForItems(items, html) {
        if (items[0].parentMenu.length === items.length) {
          (0, _dom_utils.domById)(items[0].parentMenu.id).insertAdjacentHTML('afterbegin', html);
        } else {
          var domItems = this.dom.querySelectorAll('.' + this.clsItem);
          if (domItems.length) {
            domItems[domItems.length - 1].insertAdjacentHTML('afterend', html);
          }
        }
      }
    }, {
      key: 'addItemToDom',
      value: function addItemToDom(item) {
        this.addHtmlToDomForItems([item], this.renderItem(item));
      }
    }, {
      key: 'addItemsToDom',
      value: function addItemsToDom(items) {
        var _this4 = this;

        var html = items.map(function (item) {
          return _this4.renderItem(item);
        }).join('');
        this.addHtmlToDomForItems(items, html);
      }
    }, {
      key: 'removeItem',
      value: function removeItem(item) {
        this.removeItemFromModel(item);
        this.removeItemFromDom(item);
        this.resolveZeroState();
        this.syncViewWithZeroState();
        this.trigger('tagsChanged', { mode: 'remove', tag: item });
      }
    }, {
      key: 'removeItemFromModel',
      value: function removeItemFromModel(item) {
        var itemToDelete,
            id = item.id,
            indexToDelete;

        if (!this.activeMenu) return;

        this.activeMenu.some(function (item, index) {
          itemToDelete = item;
          indexToDelete = index;
          return item.id === id;
        });

        if (!itemToDelete) return;
        // remove item from current menu
        this.activeMenu.splice(indexToDelete, 1);

        delete this.hashValues[itemToDelete.value];
        delete this.hashIds[itemToDelete.id];
        return itemToDelete;
      }
    }, {
      key: 'removeItemFromDom',
      value: function removeItemFromDom(item) {
        var domToDelete = (0, _dom_utils.domById)(item.id);
        domToDelete && domToDelete.parentNode.removeChild(domToDelete);
      }
    }, {
      key: 'onTagCloseClick',
      value: function onTagCloseClick(e) {
        var domItem = (0, _dom_utils.closest)(e.target, '.' + this.clsItem, this.dom);

        if (domItem) {
          var item = this.domToItem(domItem);
          item && this.removeItem(item);
        }
        // needed in order to keep focus
        e.stopPropagation();
      }
    }, {
      key: 'focusLastItem',
      value: function focusLastItem() {
        var itemToFocus = this._getPrevSelectableItem(this.activeMenu, this.activeMenu.length - 1);
        itemToFocus && this.focusItem(itemToFocus);
      }
    }, {
      key: 'removeFocusedItem',
      value: function removeFocusedItem() {
        var menu = this.focusedItem.parentMenu;
        var index = this.getItemIndex(this.focusedItem);
        var itemToFocus = this._getNextSelectableItem(menu, index + 1) || this._getPrevSelectableItem(menu, index - 1);

        this.removeItem(this.focusedItem);

        if (itemToFocus !== this.focusedItem) {
          this.focusItem(itemToFocus);
        }
        if (itemToFocus == null) {
          this.focusedItem = null;
        }
      }
    }, {
      key: 'addItemFromEditor',
      value: function addItemFromEditor(value, context) {
        var _this5 = this;

        if (value.length === 0) return;
        context = context || {};

        if (!this.validateEditorValue(value, context, this.getItemIterator())) return;

        if (this.useUniqueValues) {
          var matchingItems = this.getMatchingValues(value);
          matchingItems.forEach(function (item) {
            return (0, _dom_utils.blinkElement)(_this5.itemToDom(item));
          });

          if (matchingItems.length > 0) {
            this.trigger('preventedTagAdd', { value: value, context: context, reason: 'not_unique_value' });
            return;
          }
        }

        this.addItem(value, context.label || value, { context: context }, true);
        this.clearEditor({ reason: 'addItemFromEditor' });
      }
    }, {
      key: 'getMatchingValues',
      value: function getMatchingValues(value) {
        var items = [],
            lowerCaseValue = String(value).toLowerCase();

        if (!this.useUniqueValues) return items;

        if (this.ignoreCase) {
          this.getItemIterator().forEach(function (menuItem, menuItemValue) {
            if (lowerCaseValue === String(menuItemValue).toLowerCase()) {
              items.push(menuItem);
            }
          });
        } else {
          var item = this.hashValues[value];
          item && items.push(item);
        }
        return items;
      }
    }, {
      key: 'clearFocusedItem',
      value: function clearFocusedItem() {
        if (this.focusedItem) {
          this.blurItem(this.focusedItem);
          this.focusedItem = null;
        }
      }
    }, {
      key: 'onKeyDownForCopy',
      value: function onKeyDownForCopy(e) {
        if (e.keyCode === 67 && (e.metaKey || e.ctrlKey)) {
          if (!this.focusedItem) return;
          var prevActiveElement = document.activeElement;
          var input = document.createElement('input');
          input.style.cssText = "position:absolute;top:-700px;left:10px;";
          input.value = this.getContentForClipboard(this.focusedItem);
          document.body.appendChild(input);
          input.select();

          setTimeout(function () {
            prevActiveElement.focus();
            document.body.removeChild(input);
          }, 10);
        }
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(e) {
        if (!this.activeMenu) return;
        if (!this.isFocused) {
          this.blur();
          return;
        }
        // Necessary for handling copy/paste and shortcuts
        if (e.ctrlKey || e.altKey || e.metaKey) {
          this.trigger('keyDown', { domEvent: e });
          return;
        }

        switch (e.keyCode) {
          case _core_utils.keyCodes.DELETE:
          case _core_utils.keyCodes.BACKSPACE:
            this.focusedItem && this.removeFocusedItem();break;

          case _core_utils.keyCodes.HOME:
            this.moveToStart();e.preventDefault();break;
          case _core_utils.keyCodes.END:
            this.moveToEnd();e.preventDefault();break;

          case _core_utils.keyCodes.PAGE_DOWN:
          case _core_utils.keyCodes.PAGE_UP:
            e.preventDefault();break;

          case _core_utils.keyCodes.DOWN:
          case _core_utils.keyCodes.RIGHT:
            this.moveDown();e.preventDefault();break;

          case _core_utils.keyCodes.UP:
          case _core_utils.keyCodes.LEFT:
            this.focusedItem ? this.moveUp() : this.focusLastItem(), e.preventDefault();break;

          case _core_utils.keyCodes.ENTER:
          case _core_utils.keyCodes.NUMPAD_ENTER:
          case _core_utils.keyCodes.SPACE:
          case _core_utils.keyCodes.COMMA:
            e.preventDefault();break;

          default:
            this.clearFocusedItem();
            this.releaseKeyboard();
            this.captureEditorKeyboard();
        }

        this.trigger('keyDown', { domEvent: e });
      }
    }, {
      key: 'onRootClick',
      value: function onRootClick(e) {
        var item = this.resolveItemFromDom(e.target);
        if (this.isFocused && item && item.role !== 'uiLabel' && this.itemIsSelectable(item)) {
          this.focusItem(item);
          this.releaseEditorKeyboard();
          this.captureKeyboard();
          return;
        }
        this.focus();
        this.expandItems();
        this.activateEditor();
      }

      // Editor related
      // --------------------------------------------------

    }, {
      key: 'createEditor',
      value: function createEditor() {
        var _this6 = this;

        if (this.editor) return;

        var domHolder = this.dom.querySelector(".zd-tag-editor-holder");
        domHolder.innerHTML = '';
        this.editor = this.editorFactory(domHolder, this);
        this.editor.on('leftExit', function () {
          return _this6.onEditorLeftExit();
        }).on('tagEntered', function (e, data) {
          return _this6.onEditorTagEntered(data);
        }).on('regularInput', function () {
          return _this6.onEditorRegularInput();
        }).on('focus', function () {
          return _this6.onEditorFocus();
        }).on('blur', function () {
          return _this6.onEditorBlur();
        });

        if (this.enterValueOnEditorBlur) {
          this.editor.on('beforeBlur', function () {
            return _this6.onEditorBeforeBlur();
          });
        }

        this.editor.onBeforeKeyDown = function () {
          if (this.container && !this.container.isFocused) {
            this.container.blur();
            return true;
          }
        };

        this.onEditorCreated && this.onEditorCreated(this.editor);
      }
    }, {
      key: 'simpleEditorFactory',
      value: function simpleEditorFactory(domHolder, container) {
        var editorOptions = (0, _core_utils.extend)({}, this.options.simpleEditor || {}, {
          domHolder: domHolder,
          container: container || this
        });
        return new _simple_tag_editor2.default(editorOptions);
      }
    }, {
      key: 'searchEditorFactory',
      value: function searchEditorFactory(domHolder, container) {
        var options = this.options.searchEditorOptions;
        options.domHolder = domHolder;
        options.container = container || this;

        return new _search_tag_editor2.default(options);
      }
    }, {
      key: 'comboSelectEditorFactory',
      value: function comboSelectEditorFactory(domHolder, container) {
        var options = this.options.comboSelectEditorOptions;
        options.domHolder = domHolder;
        options.container = container || this;

        return new _combo_select_tag_editor2.default(options);
      }
    }, {
      key: 'onEditorFocus',
      value: function onEditorFocus() {
        this.focus();
      }
    }, {
      key: 'onEditorBlur',
      value: function onEditorBlur() {
        this.blur();
      }
    }, {
      key: 'onEditorBeforeBlur',
      value: function onEditorBeforeBlur() {
        var _this7 = this;

        var editorValue = this.getEditorValue().trim();
        if (!editorValue) return;
        setTimeout(function () {
          return !_this7.isFocused && _this7.addItemFromEditor(editorValue);
        }, 200);
      }
    }, {
      key: 'onEditorLeftExit',
      value: function onEditorLeftExit() {
        if (this.activeMenu.length === 0) return;
        this.focusLastItem();
        this.releaseEditorKeyboard();
        this.captureKeyboard();
      }
    }, {
      key: 'onEditorRegularInput',
      value: function onEditorRegularInput() {
        this.clearFocusedItem();
      }
    }, {
      key: 'onEditorTagEntered',
      value: function onEditorTagEntered(data) {
        this.addItemFromEditor(data.value, data.context);
        // TODO: this needs abstraction
        if (this.editor.domBase) {
          this.editor.domBase.focus();
        }
      }
    }, {
      key: 'onDocumentClick',
      value: function onDocumentClick(e) {
        if (!this.dom) return;

        if (!this.containsNode(e.target)) {
          this.blur();
        }
      }
    }, {
      key: 'containsNode',
      value: function containsNode(node) {
        return _get(TagMenu.prototype.__proto__ || Object.getPrototypeOf(TagMenu.prototype), 'containsNode', this).call(this, node) || this.editor.containsNode(node);
      }
    }, {
      key: 'captureEditorKeyboard',
      value: function captureEditorKeyboard() {
        if (this.disabled) return;
        this.releaseKeyboard();
        this.editor && this.editor.captureKeyboard();
      }
    }, {
      key: 'releaseEditorKeyboard',
      value: function releaseEditorKeyboard() {
        this.editor && this.editor.releaseKeyboard();
      }
    }, {
      key: 'clearEditor',
      value: function clearEditor(modifiers) {
        this.editor && this.editor.clearEditor(modifiers);
      }
    }, {
      key: 'getEditorValue',
      value: function getEditorValue() {
        return this.editor ? this.editor.getEditorValue() : '';
      }
    }, {
      key: 'focusEditor',
      value: function focusEditor() {
        if (this.disabled) return;
        this.captureEditorKeyboard();
        this.editor && this.editor.focus();
      }
    }, {
      key: 'activateEditor',
      value: function activateEditor() {
        if (this.disabled) return;
        this.captureEditorKeyboard();
        this.editor && this.editor.activate();
      }
    }, {
      key: 'defaultOptions',
      get: function get() {
        return defaultOptions;
      }
    }]);

    return TagMenu;
  }(_menu2.default);

  exports.default = TagMenu;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _core_utils = __webpack_require__(3);

  var _options_mixin = __webpack_require__(7);

  var _options_mixin2 = _interopRequireDefault(_options_mixin);

  var _observable_mixin = __webpack_require__(8);

  var _observable_mixin2 = _interopRequireDefault(_observable_mixin);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var defaultOptions = {
    basePlaceholder: '',
    baseZeroStatePlaceholder: '',
    delimiters: [' ', ',']
  };

  var SimpleTagEditor = function (_mixin) {
    _inherits(SimpleTagEditor, _mixin);

    function SimpleTagEditor(options) {
      _classCallCheck(this, SimpleTagEditor);

      var _this = _possibleConstructorReturn(this, (SimpleTagEditor.__proto__ || Object.getPrototypeOf(SimpleTagEditor)).call(this, options));

      _this.id = (0, _core_utils.getUniqId)();
      _this.domHolder = options.domHolder || document.querySelector(options.domHolderSelector);
      _this.setOptions(options, defaultOptions);
      _this.initUI();
      return _this;
    }

    _createClass(SimpleTagEditor, [{
      key: 'clearEditor',
      value: function clearEditor() {
        this.dom.value = '';
      }
    }, {
      key: 'getEditorValue',
      value: function getEditorValue() {
        return this.dom.value.trim();
      }
    }, {
      key: 'setEditorValue',
      value: function setEditorValue(value) {
        this.dom.value = value;
      }
    }, {
      key: 'activate',
      value: function activate() {
        this.focus();
      }
    }, {
      key: 'render',
      value: function render() {
        return '<input id="' + this.id + '" class="zd-tag-editor" type="text">';
      }
    }, {
      key: 'initUI',
      value: function initUI() {
        var _this2 = this;

        this.domHolder.insertAdjacentHTML('beforeend', this.render());
        this.dom = this.domHolder.querySelector('#' + this.id);

        var onInput = function onInput(e) {
          return _this2.onInput(e);
        };

        this.onDom(this.dom, 'focusin', function (e) {
          return _this2.onDomFocus(e);
        }).onDom(this.dom, 'focusout', function (e) {
          return _this2.onDomBlur(e);
        }).onDom(this.dom, 'paste', function (e) {
          return _this2.onPaste(e);
        }).onDom(this.dom, 'input', onInput);

        if (_core_utils.userAgent.ie9) {
          this.onDom(this.dom, 'keyup', onInput).onDom(this.dom, 'cut', onInput);
        }

        this.resolvePlaceholder();
      }
    }, {
      key: 'hasValue',
      value: function hasValue(value) {
        return false;
      }
    }, {
      key: 'getItemByValue',
      value: function getItemByValue(value) {
        return null;
      }
    }, {
      key: 'onDomFocus',
      value: function onDomFocus(e) {
        this.focus(e);
      }
    }, {
      key: 'onDomBlur',
      value: function onDomBlur(e) {
        if (this.container.menuWasJustActivated) return;
        if (e.relatedTarget && this.container.containsNode(e.relatedTarget)) return;
        this.blur(e);
      }
    }, {
      key: 'resolvePlaceholder',
      value: function resolvePlaceholder() {
        var isZeroState = this.container.isZeroState;
        var placeholder = isZeroState ? this.baseZeroStatePlaceholder : this.basePlaceholder;
        this.dom.setAttribute('placeholder', placeholder);
      }
    }, {
      key: 'focus',
      value: function focus(e) {
        this.isFocused = true;
        if (document.activeElement !== this.dom) {
          this.dom.focus();
        }
        this.captureKeyboard();
        this.trigger('focus');
      }
    }, {
      key: 'blur',
      value: function blur(e) {
        this.trigger('beforeBlur');
        this.isFocused = false;
        if (this.container.isZeroState) return;
        this.trigger('blur');
      }
    }, {
      key: 'captureKeyboard',
      value: function captureKeyboard() {
        var _this3 = this;

        if (this.isKeyboardCaptured) {
          return;
        }
        this.isKeyboardCaptured = true;
        this.onDom(document, 'keydown', function (e) {
          return _this3.onKeyDown(e);
        }).onDom(document, 'keypress', function (e) {
          return _this3.onKeyPress(e);
        });
      }
    }, {
      key: 'releaseKeyboard',
      value: function releaseKeyboard() {
        this.isKeyboardCaptured = false;
        this.offDom(document, 'keydown').offDom(document, 'keypress');
      }
    }, {
      key: 'containsNode',
      value: function containsNode(node) {
        if (!this.isInDom || !node) return false;

        return this.dom.contains(node) || this.dom === node;
      }
    }, {
      key: 'onKeyPress',
      value: function onKeyPress(e) {
        if (this.delimiters.indexOf(String.fromCharCode(e.which)) > -1) {
          e.preventDefault();
          this.trigger('tagEntered', { value: this.getEditorValue() });
        }
      }
    }, {
      key: 'onPaste',
      value: function onPaste(e) {
        var _this4 = this;

        var re = new RegExp(this.delimiters.map(function (d) {
          return '\\' + d;
        }).join('|'), "gi");

        setTimeout(function () {
          var parts = _this4.getEditorValue().split(re);
          if (parts.length > 1) {
            parts.filter(function (part) {
              return Boolean(part);
            }).forEach(function (part) {
              return _this4.trigger('tagEntered', { value: part.trim() });
            });
            _this4.clearEditor();
          }
        });
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(e) {
        if (this.onBeforeKeyDown && this.onBeforeKeyDown(e)) return;

        switch (e.keyCode) {
          case _core_utils.keyCodes.LEFT:
          case _core_utils.keyCodes.BACKSPACE:
            this.getEditorValue().length === 0 && this.trigger('leftExit');break;
          case _core_utils.keyCodes.ESCAPE:
            this.clearEditor();break;
          case _core_utils.keyCodes.ENTER:
          case _core_utils.keyCodes.NUMPAD_ENTER:
            e.preventDefault();
            this.trigger('tagEntered', { value: this.getEditorValue() });
            break;
          case _core_utils.keyCodes.TAB:
            if (this.getEditorValue().length) {
              e.preventDefault();
              this.trigger('tagEntered', { value: this.getEditorValue() });
            }
            break;
        }

        this.trigger('keyDown', { domEvent: e });
      }
    }, {
      key: 'onInput',
      value: function onInput(e) {
        var code = e.keyCode;

        // these checks are necessary because of IE9. It has a buggy oninput event
        // and the system uses onkeyup to compensate. Here all relevant
        // non-alphanumeric input coming from onkeyup is filtered out.

        if (code === _core_utils.keyCodes.BACKSPACE || code === _core_utils.keyCodes.DELETE || code === _core_utils.keyCodes.LEFT || code === _core_utils.keyCodes.RIGHT || code === _core_utils.keyCodes.UP || code === _core_utils.keyCodes.DOWN || code === _core_utils.keyCodes.PAGE_DOWN || code === _core_utils.keyCodes.PAGE_UP) return;

        this.trigger('regularInput', e);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.releaseKeyboard();
        this.off();
        this.offDom();
        this.dom.parentNode.removeChild(this.dom);
      }
    }]);

    return SimpleTagEditor;
  }((0, _core_utils.mixin)(_observable_mixin2.default, _options_mixin2.default));

  exports.default = SimpleTagEditor;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _core_utils = __webpack_require__(3);

  var _search_menu = __webpack_require__(24);

  var _search_menu2 = _interopRequireDefault(_search_menu);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var defaultOptions = {
    baseZeroStatePlaceholder: '',
    basePlaceholder: '',
    delimiters: [' ', ',']
  };

  var SearchTagEditor = function (_SearchMenu) {
    _inherits(SearchTagEditor, _SearchMenu);

    function SearchTagEditor() {
      _classCallCheck(this, SearchTagEditor);

      return _possibleConstructorReturn(this, (SearchTagEditor.__proto__ || Object.getPrototypeOf(SearchTagEditor)).apply(this, arguments));
    }

    _createClass(SearchTagEditor, [{
      key: 'appendTo',
      value: function appendTo(target) {
        var _this2 = this;

        _get(SearchTagEditor.prototype.__proto__ || Object.getPrototypeOf(SearchTagEditor.prototype), 'appendTo', this).call(this, target);

        this.onDom(this.domBase, 'paste', function (e) {
          return _this2.onPaste(e);
        });
        this.setOptions(this.options, defaultOptions);
        this.resolvePlaceholder();
        this.container.on('tagsChanged', function (e, data) {
          return _this2.onTagsChanged(e, data);
        });
      }
    }, {
      key: 'resolvePlaceholder',
      value: function resolvePlaceholder() {
        var isZeroState = this.container.isZeroState;
        var placeholder = isZeroState ? this.baseZeroStatePlaceholder : this.basePlaceholder;
        this.domBase.setAttribute('placeholder', placeholder);
      }
    }, {
      key: 'clearEditor',
      value: function clearEditor() {
        this.domBase.value = '';
        !this.openOnFocus && this.close();
      }
    }, {
      key: 'getEditorValue',
      value: function getEditorValue() {
        return this.domBase.value;
      }
    }, {
      key: 'getEditorContext',
      value: function getEditorContext() {
        return this.menu.activeItem;
      }
    }, {
      key: 'setEditorValue',
      value: function setEditorValue(value) {
        return this.setValue(value);
      }
    }, {
      key: 'activate',
      value: function activate() {
        this.focus();
      }
    }, {
      key: 'hasValue',
      value: function hasValue(value) {
        return this.getItemByValue(value);
      }
    }, {
      key: 'getItemByValue',
      value: function getItemByValue(value) {
        return this.menu.getItemByValue(value);
      }
    }, {
      key: 'onBeforeChange',
      value: function onBeforeChange(e) {
        var _this3 = this;

        setTimeout(function () {
          _this3.trigger('tagEntered', {
            value: e.value,
            context: e.menuItem
          });
        });
        return false;
      }
    }, {
      key: 'getMenuPositionRefDom',
      value: function getMenuPositionRefDom() {
        return this.container.dom;
      }
    }, {
      key: 'captureKeyboard',
      value: function captureKeyboard() {
        var _this4 = this;

        if (this.isKeyboardCaptured) {
          return;
        }
        this.isKeyboardCaptured = true;
        this.onDom(document, 'keydown', function (e) {
          return _this4.onKeyDown(e);
        });
        this.onDom(document, 'keypress', function (e) {
          return _this4.onKeyPress(e);
        });
      }
    }, {
      key: 'releaseKeyboard',
      value: function releaseKeyboard() {
        this.isKeyboardCaptured = false;
        this.offDom(document, 'keydown');
        this.offDom(document, 'keypress');
      }
    }, {
      key: 'onTagsChanged',
      value: function onTagsChanged() {
        if (this.isOpen) {
          this.positionMenu(this.menu, this.getMenuPositionRefDom(), this.preferredPosition);
        }
      }
    }, {
      key: 'onBaseBlur',
      value: function onBaseBlur(e) {
        if (this.container.menuWasJustActivated) return;
        if (e.relatedTarget && this.container.containsNode(e.relatedTarget)) return;
        _get(SearchTagEditor.prototype.__proto__ || Object.getPrototypeOf(SearchTagEditor.prototype), 'onBaseBlur', this).call(this, e);
      }
    }, {
      key: 'onKeyPress',
      value: function onKeyPress(e) {
        if (this.delimiters.indexOf(String.fromCharCode(e.which)) > -1) {
          e.preventDefault();
          this.trigger('tagEntered', { value: this.getEditorValue() });
        }
      }
    }, {
      key: 'onPaste',
      value: function onPaste(e) {
        var _this5 = this;

        var re = new RegExp(this.delimiters.map(function (d) {
          return '\\' + d;
        }).join('|'), "gi");
        setTimeout(function () {
          var value = _this5.getEditorValue();
          var parts = value.split(re);
          if (parts.length > 1) {
            parts.filter(function (part) {
              return Boolean(part);
            }).forEach(function (part) {
              return _this5.trigger('tagEntered', { value: part.trim() });
            });
            _this5.domBase.prop('value', '');
          }
        });
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(e) {
        if (this.onBeforeKeyDown && this.onBeforeKeyDown(e)) return;

        switch (e.keyCode) {
          case _core_utils.keyCodes.LEFT:
          case _core_utils.keyCodes.BACKSPACE:
            this.getEditorValue().length === 0 && this.trigger('leftExit');break;
          case _core_utils.keyCodes.ENTER:
          case _core_utils.keyCodes.NUMPAD_ENTER:
            e.preventDefault();
            this._tryToTriggerTagEntered();
            break;
          case _core_utils.keyCodes.TAB:
            if (this.getEditorValue().length) {
              e.preventDefault();
              this._tryToTriggerTagEntered();
            }
            break;
          case _core_utils.keyCodes.ESCAPE:
            this.clearEditor();break;
        }
      }
    }, {
      key: '_tryToTriggerTagEntered',
      value: function _tryToTriggerTagEntered() {
        if (this.isOpen && this.menu.focusedItem) return;
        this.trigger('tagEntered', { value: this.getEditorValue() });
      }
    }, {
      key: 'onBaseInput',
      value: function onBaseInput(e) {
        _get(SearchTagEditor.prototype.__proto__ || Object.getPrototypeOf(SearchTagEditor.prototype), 'onBaseInput', this).call(this, e);
        var code = e.keyCode;

        // these checks are necessary because of IE9. It has a buggy oninput event
        // and the system uses onkeyup to compensate. Here all relevant
        // non-alphanumeric input coming from onkeyup is filtered out.

        if (code === _core_utils.keyCodes.BACKSPACE || code === _core_utils.keyCodes.DELETE || code === _core_utils.keyCodes.LEFT || code === _core_utils.keyCodes.RIGHT || code === _core_utils.keyCodes.UP || code === _core_utils.keyCodes.DOWN || code === _core_utils.keyCodes.PAGE_DOWN || code === _core_utils.keyCodes.PAGE_UP) return;

        this.trigger('regularInput', e);
      }
    }, {
      key: 'onDocumentMouseDown',
      value: function onDocumentMouseDown(e) {
        if (this.container.containsNode(e.target)) return;
        _get(SearchTagEditor.prototype.__proto__ || Object.getPrototypeOf(SearchTagEditor.prototype), 'onDocumentMouseDown', this).call(this, e);
      }
    }]);

    return SearchTagEditor;
  }(_search_menu2.default);

  exports.default = SearchTagEditor;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _core_utils = __webpack_require__(3);

  var _combo_select_menu = __webpack_require__(19);

  var _combo_select_menu2 = _interopRequireDefault(_combo_select_menu);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var defaultOptions = {
    searchZeroStatePlaceholder: '',
    searchPlaceholder: '',
    clsSelectMenuScope: 'zd-combo-selectmenu zd-editor-mode',
    hasCheckboxes: false,
    keepOpen: true
  };

  function renderItemContentWithCheckboxes(item, highlighter, escapeHtml) {
    var html = void 0;
    var label = item.label;
    if (item.data && item.data.sourceItem && item.data.sourceItem.concatenatedLabel) {
      label = item.data.sourceItem.concatenatedLabel;
    }
    if (highlighter) {
      html = highlighter(label);
    } else {
      html = escapeHtml && this.enableHtmlEscape && item.enableHtmlEscape ? escapeHtml(label) : label;
    }
    if (item.value == null) {
      return html;
    }

    var checked = this.container.container.hashValues[item.value] ? 'checked' : '';
    var disabled = item.enabled ? '' : 'disabled';

    return '<input type="checkbox" data-item-value="' + item.value + '" tabindex="-1" ' + checked + ' ' + disabled + '>' + html;
  }

  function onChangeRequestWithCheckbox(data) {
    var value = data.value;
    var container = this.container.container;
    if (value && container.hashValues[value]) {
      var menuItem = container.getItemByValue(data.value);
      container.removeItem(menuItem);
    } else {
      container.addItemFromEditor(value, data.record);
    }
    return false;
  }

  var ComboSelectTagEditor = function (_ComboSelectMenu) {
    _inherits(ComboSelectTagEditor, _ComboSelectMenu);

    function ComboSelectTagEditor() {
      _classCallCheck(this, ComboSelectTagEditor);

      return _possibleConstructorReturn(this, (ComboSelectTagEditor.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor)).apply(this, arguments));
    }

    _createClass(ComboSelectTagEditor, [{
      key: 'appendTo',
      value: function appendTo(target) {
        var _this2 = this;

        this.setOptions(this.options, defaultOptions);
        this.filteredField = 'concatenatedLabel';
        this.keepOpen = this.options.keepOpen;
        _get(ComboSelectTagEditor.prototype.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor.prototype), 'appendTo', this).call(this, target);
        this.resolvePlaceholder();
        this.container.on('tagsChanged', function (e, data) {
          return _this2.onTagsChanged(e, data);
        });
        this.onDom(this.domSearch, 'blur', function (e) {
          return _this2.onSearchBlur(e);
        });
        this.container.on('dataLoaded', function (e) {
          return _this2.onContainerDataLoaded(e);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var html = '<div id="' + this.id + '" class="' + this.clsSelectMenuRoot + ' ' + this.clsDefault + '">\n                 ' + (this.hasProxy ? '<input type="hidden" name="' + this.proxyName + '" id="' + this.proxyId + '">' : '') + '\n                 <button id="' + this.baseId + '" class="' + this.clsBaseButton + '" role="button" tabindex="0" type="button">\n                   ' + (0, _core_utils.escapeHtml)(this.searchPlaceholder) + '\n                   <span class="' + this.clsBaseArrow + '"></span>\n                   <span id="' + this.baseContentId + '" class="' + this.clsBaseContent + '"></span>\n                 </button>\n                 <input id="' + this.searchId + '" class="' + this.clsSearch + '" tabindex="0" placeholder="' + (0, _core_utils.escapeHtml)(this.searchPlaceholder) + '">\n               </div>';
        return html;
      }
    }, {
      key: '_initMenu',
      value: function _initMenu(menu) {
        var container = this.container;
        menu.syncWithValue = false;
        if (this.hasCheckboxes) {
          menu.onChangeRequest = onChangeRequestWithCheckbox;
          menu.renderItemContent = renderItemContentWithCheckboxes;
        } else {
          menu.onChangeRequest = function () {};
        }
        menu._resizeToParentWidth = function (dom) {
          this.dom.style.width = container.dom.clientWidth + 'px';
        };
      }
    }, {
      key: 'initSelectMenu',
      value: function initSelectMenu() {
        var _this3 = this;

        this.options.clsRoot = 'zd-menu-root zd-menu-edit-mode';
        this.options.clsRoot += this.hasCheckboxes ? ' zd-menu-with-checkboxes' : '';
        _get(ComboSelectTagEditor.prototype.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor.prototype), 'initSelectMenu', this).call(this);
        this._initMenu(this.selectMenu);
        this.selectMenu.onShow = function () {
          setTimeout(function () {
            return _this3.positionSelectMenu();
          }, 10);
        };
      }
    }, {
      key: 'initSearchMenu',
      value: function initSearchMenu() {
        var _this4 = this;

        var container = this.container;
        this.options.clsRoot = 'zd-menu-root zd-menu-edit-mode';
        this.options.clsRoot += this.hasCheckboxes ? ' zd-menu-with-checkboxes' : '';
        _get(ComboSelectTagEditor.prototype.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor.prototype), 'initSearchMenu', this).call(this);
        this._initMenu(this.searchMenu);
        this.searchMenu.searchField = this.filteredField;
        this.searchMenu.onShow = function () {
          setTimeout(function () {
            return _this4.positionSearchMenu();
          }, 10);
        };
      }
    }, {
      key: 'resolvePlaceholder',
      value: function resolvePlaceholder() {
        var isZeroState = this.container.isZeroState;
        var placeholder = isZeroState ? this.searchZeroStatePlaceholder : this.searchPlaceholder;
        this.domSearch.setAttribute('placeholder', placeholder);
      }
    }, {
      key: 'clearEditor',
      value: function clearEditor(modifiers) {
        var _this5 = this;

        if (modifiers && modifiers.reason === 'blur') {
          this.close();
        } else if (modifiers && modifiers.reason !== 'addItemFromEditor') {
          setTimeout(function () {
            return _this5.open();
          });
        }
      }
    }, {
      key: 'activate',
      value: function activate() {
        this.focus();
        this.open();
      }
    }, {
      key: 'open',
      value: function open() {
        var _this6 = this;

        _get(ComboSelectTagEditor.prototype.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor.prototype), 'open', this).call(this);

        if (this.keepOpen) {
          this.observeDomBasePosition(function () {
            return _this6.positionActiveMenu();
          });
        }
      }
    }, {
      key: 'close',
      value: function close() {
        _get(ComboSelectTagEditor.prototype.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor.prototype), 'close', this).call(this);
        this.stopObservingDomBasePosition();
      }
    }, {
      key: 'getEditorValue',
      value: function getEditorValue() {
        return this.value;
      }
    }, {
      key: 'setEditorValue',
      value: function setEditorValue(value) {
        return this.setValue(value);
      }
    }, {
      key: 'positionSelectMenu',
      value: function positionSelectMenu(domRef, position) {
        var containerCoords = this.container.dom.getBoundingClientRect();
        var ref = {
          left: containerCoords.left,
          right: containerCoords.right,
          top: this.domSearch.getBoundingClientRect().top,
          bottom: containerCoords.bottom
        };
        return _get(ComboSelectTagEditor.prototype.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor.prototype), 'positionSelectMenu', this).call(this, ref, position || this.preferredPosition);
      }
    }, {
      key: 'positionSearchMenu',
      value: function positionSearchMenu(domRef, position) {
        var containerCoords = this.container.dom.getBoundingClientRect();
        var ref = {
          left: containerCoords.left,
          right: containerCoords.right,
          top: this.domSearch.getBoundingClientRect().top,
          bottom: containerCoords.bottom
        };
        return _get(ComboSelectTagEditor.prototype.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor.prototype), 'positionSearchMenu', this).call(this, ref, position || this.preferredPosition);
      }
    }, {
      key: 'positionActiveMenu',
      value: function positionActiveMenu() {
        if (this.searchMenu.isVisible) {
          this.positionSearchMenu();
        }
        if (this.selectMenu.isVisible) {
          this.positionSelectMenu();
        }
      }
    }, {
      key: 'hasValue',
      value: function hasValue(value) {
        return this.getItemByValue(value);
      }
    }, {
      key: 'getItemByValue',
      value: function getItemByValue(value) {
        return this.selectMenu.getItemByValue(value);
      }
    }, {
      key: 'onChange',
      value: function onChange(eventData) {
        if (!eventData.userInitiated) return;
        this.trigger('tagEntered', { value: this.value });
      }
    }, {
      key: 'onContainerDataLoaded',
      value: function onContainerDataLoaded() {
        var forEach = [].forEach;
        var valuesHash = Object.create(null);

        this.container.getValues().forEach(function (item) {
          return valuesHash[item.value] = true;
        });

        forEach.call(this.searchMenu.dom.querySelectorAll('input[type="checkbox"]'), function (input) {
          input.checked = !!valuesHash[input.getAttribute('data-item-value')];
        });

        forEach.call(this.selectMenu.dom.querySelectorAll('input[type="checkbox"]'), function (input) {
          input.checked = !!valuesHash[input.getAttribute('data-item-value')];
        });
      }
    }, {
      key: 'onTagsChanged',
      value: function onTagsChanged(e, data) {
        var _this7 = this;

        if (this.container.isEmpty()) {
          this.container.releaseKeyboard();
          this.captureKeyboard();
        }
        this.positionActiveMenu();
        if (this.hasCheckboxes) {
          // to prevent racing between setting the checkbox from a click directly
          // on a checkbox use timeout
          setTimeout(function () {
            var checkbox1 = _this7.searchMenu.dom.querySelector('input[data-item-value="' + data.tag.value + '"]');
            var checkbox2 = _this7.selectMenu.dom.querySelector('input[data-item-value="' + data.tag.value + '"]');

            if (data.mode === 'add') {
              checkbox1 && (checkbox1.checked = true);
              checkbox2 && (checkbox2.checked = true);
            } else if (data.mode === 'remove') {
              checkbox1 && (checkbox1.checked = false);
              checkbox2 && (checkbox2.checked = false);
            }
          });
        }
      }
    }, {
      key: 'onSearchBlur',
      value: function onSearchBlur(e) {
        if (this.container.menuWasJustActivated) return;
        if (e.relatedTarget && this.container.containsNode(e.relatedTarget)) return;
        this.blur();
        this.close();
      }

      // override on base blur to do nothing

    }, {
      key: 'onBaseBlur',
      value: function onBaseBlur() {}
    }, {
      key: 'onBaseMouseDown',
      value: function onBaseMouseDown() {}
    }, {
      key: 'onSearchClick',
      value: function onSearchClick() {}
    }, {
      key: 'commonKeyDown',
      value: function commonKeyDown() {
        return true;
      }
    }, {
      key: 'onFocus',
      value: function onFocus() {
        _get(ComboSelectTagEditor.prototype.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor.prototype), 'onFocus', this).call(this);
        this.open();
      }
    }, {
      key: 'onBaseFocus',
      value: function onBaseFocus() {
        this.container.focus();
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(e) {
        if (this.onBeforeKeyDown && this.onBeforeKeyDown(e)) return;

        switch (e.keyCode) {
          case _core_utils.keyCodes.RIGHT:
            var focusedItem = this.selectMenu.focusedItem || this.searchMenu.focusedItem;
            if (focusedItem && focusedItem.value != null) {
              return;
            }
            break;
          case _core_utils.keyCodes.LEFT:
            if (this.domSearch.value.length === 0 && this.selectMenu.isVisible && this.selectMenu.activeMenu && this.selectMenu.activeMenu.parentItem === this.selectMenu.rootItem) {
              this.trigger('leftExit');
            }
            break;
          case _core_utils.keyCodes.BACKSPACE:
            if (this.domSearch.value.length === 0) {
              this.trigger('leftExit');
            }
            break;
          case _core_utils.keyCodes.ESCAPE:
            this.domSearch.value = '';
            this.close();
            return;
          case _core_utils.keyCodes.TAB:
            if (!this.isOpen) {
              this.blur();
            }
        }

        _get(ComboSelectTagEditor.prototype.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor.prototype), 'onKeyDown', this).call(this, e);
      }
    }, {
      key: 'onDocumentMouseDown',
      value: function onDocumentMouseDown(e) {
        var _this8 = this;

        if (!this.isInDom || !e.target) {
          return;
        }

        if (this.containsNode(e.target) || this.container.containsNode(e.target)) {
          setTimeout(function () {
            return _this8.domSearch && _this8.domSearch.focus();
          });
        } else {
          this.blur();
          this.close();
          // IE and Edge require this as hiding a focused element such as domSearch
          // messes up with the focus logic. Explicitly blurring domSearch though
          // doesn't solve the problem.
          e.target.focus();
        }
      }
    }, {
      key: 'onWindowResize',
      value: function onWindowResize() {
        if (this.keepOpen) {
          this.positionActiveMenu();
        } else {
          this.close();
        }
      }
    }, {
      key: 'onSearchInput',
      value: function onSearchInput(e) {
        _get(ComboSelectTagEditor.prototype.__proto__ || Object.getPrototypeOf(ComboSelectTagEditor.prototype), 'onSearchInput', this).call(this, e);
        this.trigger('regularInput', e);
      }
    }]);

    return ComboSelectTagEditor;
  }(_combo_select_menu2.default);

  exports.default = ComboSelectTagEditor;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var SimpleMenuDataSource = function () {
    function SimpleMenuDataSource(options) {
      _classCallCheck(this, SimpleMenuDataSource);

      this.options = options || {};
      this.parser = this.options.parser;
      this.maxRecords = this.options.maxRecords || Infinity;
    }

    _createClass(SimpleMenuDataSource, [{
      key: "loadData",
      value: function loadData(data) {
        if (this.parser) {
          data = this.parser.parse(data);
        }
        if (data && data.length > this.maxRecords) {
          data = data.slice(0, this.maxRecords);
        }
        this.onDataReady(data);
      }
    }, {
      key: "onDataReady",
      value: function onDataReady(data) {}
    }]);

    return SimpleMenuDataSource;
  }();

  exports.default = SimpleMenuDataSource;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _core_utils = __webpack_require__(3);

  var _observable_mixin = __webpack_require__(8);

  var _observable_mixin2 = _interopRequireDefault(_observable_mixin);

  var _json_transport = __webpack_require__(31);

  var _json_transport2 = _interopRequireDefault(_json_transport);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var RemoteSearchDataSource = function (_mixin) {
    _inherits(RemoteSearchDataSource, _mixin);

    function RemoteSearchDataSource(maxRecords, url) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, RemoteSearchDataSource);

      var _this = _possibleConstructorReturn(this, (RemoteSearchDataSource.__proto__ || Object.getPrototypeOf(RemoteSearchDataSource)).call(this, maxRecords, url, options));

      _this.filterWord = '';
      _this.data = [];
      _this.url = url;
      _this.maxRecords = maxRecords || 100;
      _this.cache = {};
      _this.xhr = null;
      _this.parse = options.parse || _this.parse;
      _this.dataFilter = options.dataFilter || _this.dataFilter;
      _this.httpMethod = options.httpMethod || 'GET';
      _this.transport = options.transport || _this.constructor.defaultTransport;
      _this.performCaching = options.performCaching || false;
      return _this;
    }

    _createClass(RemoteSearchDataSource, [{
      key: 'onDataReady',
      value: function onDataReady() {}
    }, {
      key: 'dataFilter',
      value: function dataFilter(data) {
        return data;
      }
    }, {
      key: 'loadData',
      value: function loadData(json, word) {
        var data = this.dataFilter(json);
        if (word && this.performCaching) {
          this.cache[word] = json;
        }
        this.data = this.parse(data);
        this.onDataReady(this.data);
      }
    }, {
      key: 'filter',
      value: function filter(source, filterWord) {
        if (filterWord == null || filterWord === '') {
          this.resetFilter();
          this.abort();
          this.loadData();
          return;
        }

        filterWord += '';
        if (filterWord === this.filterWord) {
          return;
        }
        this.filterWord = filterWord;

        if (!this.filterWord) {
          return;
        }

        this.fetch(this.filterWord);
      }
    }, {
      key: 'fetch',
      value: function fetch(word) {
        this.abort();

        if (this.performCaching && this.cache.hasOwnProperty(word)) {
          this.trigger('fetch', {
            term: word,
            data: this.cache[word],
            cached: true,
            status: 'success'
          });
          this.loadData(this.cache[word]);
          return;
        }

        this.trigger('beforeFetch', { term: word });

        this.xhr = this.transport.ajax({
          type: this.httpMethod,
          url: (0, _core_utils.fmt)(this.url, [encodeURIComponent(this.filterWord), this.maxRecords]),
          context: this,
          success: function success(data) {
            this.trigger('fetch', {
              term: word,
              data: data,
              cached: false,
              status: 'success'
            });
            this.loadData(data, word);
          },
          error: function error(xhr) {
            this.loadData();
            this.trigger('fetch', {
              term: word,
              cached: false,
              status: 'error'
            });
          }
        });
      }
    }, {
      key: 'abort',
      value: function abort() {
        this.xhr && this.xhr.abort();
      }
    }, {
      key: 'parse',
      value: function parse() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        return data.slice(0, this.maxRecords);
      }
    }, {
      key: 'resetFilter',
      value: function resetFilter() {
        this.filterWord = '';
      }
    }, {
      key: 'invalidateCache',
      value: function invalidateCache() {
        this.cache = {};
      }
    }], [{
      key: 'defaultTransport',
      get: function get() {
        return this.transport || _json_transport2.default;
      },
      set: function set(value) {
        this.transport = value;
      }
    }]);

    return RemoteSearchDataSource;
  }((0, _core_utils.mixin)(_observable_mixin2.default));

  exports.default = RemoteSearchDataSource;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  var emptyFn = function emptyFn() {};

  function ajax(options) {
    var _options$success = options.success,
        success = _options$success === undefined ? emptyFn : _options$success,
        _options$error = options.error,
        error = _options$error === undefined ? emptyFn : _options$error,
        _options$always = options.always,
        always = _options$always === undefined ? emptyFn : _options$always,
        context = options.context,
        _options$type = options.type,
        type = _options$type === undefined ? 'GET' : _options$type,
        _options$headers = options.headers,
        headers = _options$headers === undefined ? [] : _options$headers;


    headers.push(['Accept', 'application/json, text/javascript, */*;'], ['X-Requested-With', 'XMLHttpRequest']);

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      var data = void 0;
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          error.call(context, xhr);
          always.call(context, xhr);
          return;
        }

        try {
          data = JSON.parse(xhr.responseText);
        } catch (e) {
          error.call(context, xhr);
          always.call(context, xhr);
          return;
        }
        success.call(context, data);
        always.call(context, xhr, data);
      }
    };

    xhr.open(type, options.url, true);
    headers.forEach(function (pair) {
      return xhr.setRequestHeader.apply(xhr, _toConsumableArray(pair));
    });
    xhr.send();

    return xhr;
  }

  exports.default = { ajax: ajax };

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = makePlugin;

  var _core_utils = __webpack_require__(3);

  var $ = window.$;

  function buildMenuFromSelect(el, constructor, options, pluginName) {
    options.data = options.data ? [].concat(options.data) : [];

    var instance,
        selOption,
        cfgOptionsFromDom = $(el).data();

    // Resolve value
    options.value = el.value || options.value;

    // Resolve disabled
    options.disabled = el.hasAttribute('disabled') || options.disabled;

    // Add the menu data
    for (var i = 0, len = el.options.length; i < len; i++) {
      selOption = el.options[i];

      options.data[options.data.length] = {
        value: selOption.value,
        label: selOption.text,
        enabled: !selOption.disabled
      };
    }

    // Inject the element's class name
    if (el.className) {
      if (pluginName === 'zdSelectMenu') {
        if (options.clsSelectMenuRoot) {
          options.clsSelectMenuRoot += " " + el.className;
        } else {
          options.clsSelectMenuRoot = 'zd-selectmenu zd-selectmenu-root ' + el.className;
        }
      } else if (pluginName === 'zdComboSelectMenu') {
        if (options.clsSelectMenuRoot) {
          options.clsSelectMenuRoot += " " + el.className;
        } else {
          options.clsSelectMenuRoot = 'zd-combo-selectmenu zd-combo-selectmenu-root ' + el.className;
        }
      } else if (pluginName === 'zdMenu') {
        options.clsRoot = 'zd-menu-root ' + el.className;
      } else if (pluginName === 'zdTagMenu') {
        options.clsRoot = 'zd-tag-menu-root ' + el.className;
      }
    }

    // Add hidden input data
    options.proxyName = el.name || null;
    options.proxyId = el.id || null;

    // Add configuration options from the dom data attributes
    var cfgValue;
    for (var cfgName in cfgOptionsFromDom) {
      if (!cfgOptionsFromDom.hasOwnProperty(cfgName)) continue;
      cfgValue = $.trim(cfgOptionsFromDom[cfgName]);

      if (cfgValue === 'true') {
        cfgOptionsFromDom[cfgName] = true;
      } else if (cfgValue === 'false') {
        cfgOptionsFromDom[cfgName] = false;
      } else if (!isNaN(cfgValue)) {
        cfgOptionsFromDom[cfgName] = Number(cfgValue);
      }
    }

    (0, _core_utils.extend)(options, cfgOptionsFromDom);

    // Indicate the widget is to be insert by dom replacement of the element
    options.domRef = el;

    // Create the widget
    instance = new constructor(options);

    $(instance.dom).data(pluginName, instance);
    return instance;
  }

  function defaultBuilder(el, constructor, options, pluginName) {
    options.domHolder = el;
    var instance = new constructor(options);

    instance.on('destroy', function () {
      $(el).data(pluginName, null);
    });

    $(el).data(pluginName, instance);
    return instance;
  }

  function makePlugin(pluginName, constructor) {
    $.fn[pluginName] = function (options) {
      var instanceDoms;
      if (this.length === 0) return this;

      options = options == null ? {} : options;

      // Request either method invocation or collecting of property values.
      if (typeof options === 'string') {
        var args = arguments;
        var result;
        var calledAsGetter = false;

        this.each(function (index, el) {
          var instance = $(el).data(pluginName);
          if (!instance) return;

          if (typeof instance[options] === 'function') {
            // method invocation
            instance[options].apply(instance, [].slice.call(args, 1));
          } else if (args.length > 1) {
            // property setter
            instance[options] = args[1];
          } else if (args.length === 1) {
            // property getter
            result = instance[options];
            calledAsGetter = true;
            return false; // exit the loop to get the value of the first element
          }
        });

        return calledAsGetter ? result : this;

        // Request instantiation
      } else if (Object.prototype.toString.call(options) === "[object Object]") {
        instanceDoms = this.map(function (index, el) {
          if ($(el).data(pluginName)) return;

          var newOptions = (0, _core_utils.extend)({}, options); // clone options
          var isMenu = pluginName === "zdSelectMenu" || pluginName === "zdComboSelectMenu" || pluginName === "zdMenu" || pluginName === "zdTagMenu";

          if (!(newOptions.domHolder && newOptions.domHolderSelector)) {
            newOptions.domHolder = document.body;
          }

          if (el.tagName === "SELECT" && isMenu) {
            return buildMenuFromSelect(el, constructor, newOptions, pluginName).dom;
          } else {
            return defaultBuilder(el, constructor, newOptions, pluginName).dom;
          }
        });

        [].slice.call(instanceDoms).filter(Boolean);
      }

      return instanceDoms.length === 0 ? this : $(instanceDoms);
    };
  }

/***/ })
/******/ ])
});
;