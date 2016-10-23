/******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Game_1 = __webpack_require__(1);
	var GameObject_1 = __webpack_require__(6);
	var PIXI = __webpack_require__(4);
	var canvas = document.getElementById('canvas');
	var game = new Game_1.default(canvas);
	window['camera'] = game.camera;
	var Box = (function (_super) {
	    __extends(Box, _super);
	    function Box(c, w, h, ground) {
	        if (ground === void 0) { ground = false; }
	        _super.call(this);
	        this.ground = ground;
	        var box = new PIXI.Graphics();
	        box.beginFill(c);
	        box.drawRect(0, 0, w, h);
	        box.endFill();
	        this.addChild(box);
	        this.setDraggable(true);
	    }
	    Box.prototype.update = function (delta) {
	        if (!this.ground) {
	            if (!this.draggableData.dragging) {
	                this.position.y += 1;
	            }
	            if (this.position.y > 300) {
	                this.position.y = 300;
	            }
	        }
	        return this;
	    };
	    return Box;
	}(GameObject_1.default));
	var box = new Box(0x007b90, 100, 100);
	var ground = new Box(0x997b10, 500, 10, true);
	ground.position.y = 400;
	game.stage.addChild(box);
	game.stage.addChild(ground);
	game.camera.follow(box);
	setInterval(function () {
	    game.camera.sees(ground);
	}, 100);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Screen_1 = __webpack_require__(2);
	var Renderer_1 = __webpack_require__(10);
	var Ticker_1 = __webpack_require__(11);
	var Stage_1 = __webpack_require__(13);
	var Camera_1 = __webpack_require__(5);
	var Game = (function () {
	    function Game(canvas) {
	        var _this = this;
	        this.screen = new Screen_1.default(canvas);
	        this.camera = new Camera_1.default(this.screen);
	        this.renderer = new Renderer_1.default(this.screen);
	        this.stage = new Stage_1.default(this.camera);
	        this.stage.addChild(this.camera);
	        this.ticker = new Ticker_1.default(Ticker_1.default.DEFAULTS.FPS);
	        this.ticker.on(Ticker_1.default.EVENTS.TICK, function (delta) { return _this.tick(delta); });
	    }
	    Game.prototype.tick = function (delta) {
	        this.stage.position = this.camera.position;
	        this.stage.update(delta);
	        this.renderer.draw(this.stage);
	    };
	    return Game;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Point_1 = __webpack_require__(3);
	var Screen = (function () {
	    function Screen(canvas) {
	        this.canvas = canvas;
	    }
	    Screen.prototype.resize = function (width, height) {
	        this.size = new Point_1.default(width, height).toInt();
	        this.halfSize = this.size.clone().dev(2).toInt();
	        return this;
	    };
	    return Screen;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Screen;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var PIXI = __webpack_require__(4);
	var Point = (function (_super) {
	    __extends(Point, _super);
	    function Point(x, y) {
	        _super.call(this, x, y);
	    }
	    Point.prototype.distance = function (b) {
	        return Math.sqrt(Math.pow((b.x - this.x), 2) + Math.pow((b.y - this.y), 2));
	    };
	    Point.prototype.sub = function (x, y) {
	        if (x instanceof Point) {
	            return this.sub(x.x, x.y);
	        }
	        else {
	            this.x -= x;
	            this.y -= isNaN(y) ? 0 : y;
	        }
	        return this;
	    };
	    Point.prototype.sum = function (x, y) {
	        if (x instanceof Point) {
	            return this.sum(x.x, x.y);
	        }
	        else {
	            this.x += x;
	            this.y += isNaN(y) ? 0 : y;
	        }
	        return this;
	    };
	    Point.prototype.clone = function () {
	        return new Point(this.x, this.y);
	    };
	    Point.prototype.dev = function (by) {
	        this.x /= by;
	        this.y /= by;
	        return this;
	    };
	    Point.prototype.mul = function (by) {
	        this.x *= by;
	        this.y *= by;
	        return this;
	    };
	    Point.prototype.toInt = function () {
	        this.x = this.x >> 0;
	        this.y = this.x >> 0;
	        return this;
	    };
	    Point.prototype.lerpX = function (to, mul) {
	        if (mul === void 0) { mul = 1; }
	        mul = mul < 0 ? 0 : mul;
	        mul = mul > 1 ? 1 : mul;
	        return this.x + (to - this.x) * mul;
	    };
	    Point.prototype.lerpY = function (to, mul) {
	        if (mul === void 0) { mul = 1; }
	        mul = mul < 0 ? 0 : mul;
	        mul = mul > 1 ? 1 : mul;
	        return this.y + (to - this.y) * mul;
	    };
	    Point.prototype.lerp = function (to, mul) {
	        if (mul === void 0) { mul = 1; }
	        this.lerpX(to.x, mul);
	        this.lerpY(to.y, mul);
	        return this;
	    };
	    return Point;
	}(PIXI.Point));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Point;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = PIXI;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Point_1 = __webpack_require__(3);
	var GameObject_1 = __webpack_require__(6);
	var Camera = (function (_super) {
	    __extends(Camera, _super);
	    function Camera(screen) {
	        _super.call(this);
	        this.position = new Point_1.default();
	        this.screen = screen;
	    }
	    Camera.prototype.sees = function (target) {
	        //followed object is always visible
	        if (target === this.followTarget)
	            true;
	        //translate camera position to normal canvas viewport
	        var selfPosition = this.position.clone().mul(-1);
	        var targetPosition = target.position.clone();
	        var camRelPosition = targetPosition.sub(selfPosition);
	        //if detects square collision the target is visible
	        var c1 = camRelPosition.y < this.screen.canvas.height;
	        var c2 = camRelPosition.y + target.height > 0;
	        var c3 = camRelPosition.x + target.width > 0;
	        var c4 = camRelPosition.x < this.screen.canvas.width;
	        return c1 && c2 && c3 && c4;
	    };
	    Camera.prototype.follow = function (target) {
	        this.followTarget = target;
	        return this;
	    };
	    Camera.prototype.stopFollow = function () {
	        this.followTarget = null;
	        return this;
	    };
	    Camera.prototype.update = function (delta) {
	        if (!this.followTarget)
	            return this;
	        this.position = this.followTarget.position
	            .clone().sub(this.screen.halfSize).mul(-1)
	            .sub(this.followTarget.width / 2, this.followTarget.height / 2);
	        return this;
	    };
	    return Camera;
	}(GameObject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Camera;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Container_1 = __webpack_require__(7);
	var Component_1 = __webpack_require__(8);
	var DraggableData_1 = __webpack_require__(9);
	var GameObject = (function (_super) {
	    __extends(GameObject, _super);
	    function GameObject() {
	        _super.call(this);
	        this.draggableData = new DraggableData_1.DraggableData();
	        this.components = [];
	        this.interactive = true;
	    }
	    GameObject.prototype.addComponent = function (component) {
	        component.parent = this;
	        this.components.push(Component_1.default.describe(component));
	        this.addChild(component);
	        return component;
	    };
	    GameObject.prototype.removeComponent = function (component) {
	        var index = this.components.indexOf(Component_1.default.describe(component));
	        this.components.splice(index, 1);
	        this.removeChild(component);
	        return component;
	    };
	    GameObject.prototype.update = function (delta) {
	        return this;
	    };
	    GameObject.prototype.setDraggable = function (state) {
	        if (state === void 0) { state = true; }
	        if (state && !this.draggableData.eventsOnce)
	            this.initDragEvents();
	        if (!state)
	            this.onDragEnd();
	        this.draggableData.enabled = state;
	        return this;
	    };
	    GameObject.prototype.initDragEvents = function () {
	        var _this = this;
	        this.draggableData.eventsOnce = true;
	        // events for drag start
	        this.on(GameObject.EVENTS.MOUSEDOWN, function (e) { return _this.onDragStart(e); });
	        this.on(GameObject.EVENTS.TOUCHSTART, function (e) { return _this.onDragStart(e); });
	        // events for drag end
	        this.on(GameObject.EVENTS.MOUSEUP, function () { return _this.onDragEnd(); });
	        this.on(GameObject.EVENTS.MOUSEUPOUTSIDE, function () { return _this.onDragEnd(); });
	        this.on(GameObject.EVENTS.TOUCHEND, function () { return _this.onDragEnd(); });
	        this.on(GameObject.EVENTS.TOUCHENDOUTSIDE, function () { return _this.onDragEnd(); });
	        // events for drag move
	        this.on(GameObject.EVENTS.MOUSEMOVE, function (e) { return _this.onDragMove(e); });
	        this.on(GameObject.EVENTS.TOUCHMOVE, function (e) { return _this.onDragMove(e); });
	    };
	    GameObject.prototype.onDragStart = function (event) {
	        if (!this.draggableData.enabled)
	            return;
	        this.draggableData.dragStart = this.draggableData.get(event)
	            .clone().sub(this.position.x, this.position.y);
	        this.draggableData.dragging = true;
	        if (this.draggableData.index) {
	            this.emit(GameObject.EVENTS.DRAGSTART);
	            this.dragstart();
	        }
	    };
	    GameObject.prototype.onDragMove = function (event) {
	        if (!this.draggableData.enabled)
	            return;
	        if (!this.draggableData.dragging)
	            return;
	        this.position.copy(this.draggableData.getGap(event));
	        this.emit(GameObject.EVENTS.DRAG);
	        this.drag();
	        this.draggableData.index++;
	        if (this.draggableData.index === 1) {
	            this.emit(GameObject.EVENTS.DRAGSTART);
	            this.dragstart();
	        }
	    };
	    GameObject.prototype.onDragEnd = function () {
	        if (!this.draggableData.enabled)
	            return;
	        this.draggableData.dragging = false;
	        this.emit(GameObject.EVENTS.DRAGEND);
	        this.dragend();
	        this.draggableData.index = 0;
	    };
	    //@abstract methods
	    GameObject.prototype.dragstart = function () { };
	    GameObject.prototype.drag = function () { };
	    GameObject.prototype.dragend = function () { };
	    GameObject.EVENTS = {
	        DRAGSTART: 'dragstart',
	        DRAG: 'drag',
	        DRAGEND: 'dragend',
	        MOUSEDOWN: 'mousedown',
	        TOUCHSTART: 'touchstart',
	        MOUSEUP: 'mouseup',
	        MOUSEUPOUTSIDE: 'mouseupoutside',
	        TOUCHEND: 'touchend',
	        TOUCHENDOUTSIDE: 'touchendoutside',
	        MOUSEMOVE: 'mousemove',
	        TOUCHMOVE: 'touchmove',
	        CLICK: 'click',
	        TAP: 'tap'
	    };
	    return GameObject;
	}(Container_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = GameObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var PIXI = __webpack_require__(4);
	var Point_1 = __webpack_require__(3);
	var Container = (function (_super) {
	    __extends(Container, _super);
	    function Container() {
	        _super.call(this);
	        this.position = new Point_1.default();
	    }
	    Container.prototype.each = function (iterator) {
	        for (var i = 0, len = this.children.length; i < len; i++) {
	            if (iterator(this.children[i], i) === false)
	                break;
	        }
	        return this;
	    };
	    Container.prototype.len = function () {
	        return this.children.length;
	    };
	    return Container;
	}(PIXI.Container));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Container;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Container_1 = __webpack_require__(7);
	var Component = (function (_super) {
	    __extends(Component, _super);
	    function Component(name) {
	        _super.call(this);
	        this.name = name;
	    }
	    Component.prototype.update = function (delta) {
	        return this;
	    };
	    Component.describe = function (component) {
	        var describe = {
	            name: component.name,
	            component: component
	        };
	        return describe;
	    };
	    return Component;
	}(Container_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Component;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Point_1 = __webpack_require__(3);
	var DraggableData = (function (_super) {
	    __extends(DraggableData, _super);
	    function DraggableData() {
	        _super.call(this);
	        this.enabled = false;
	        this.eventsOnce = false;
	        this.dragging = false;
	        this.index = 0;
	    }
	    DraggableData.prototype.get = function (event) {
	        return new Point_1.default(event.data.global.x, event.data.global.y);
	    };
	    DraggableData.prototype.getGap = function (event) {
	        return this.get(event).sub(this.dragStart.x, this.dragStart.y);
	    };
	    return DraggableData;
	}(Object));
	exports.DraggableData = DraggableData;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var PIXI = __webpack_require__(4);
	var Renderer = (function () {
	    function Renderer(screen) {
	        this.screen = screen;
	        this.engine = PIXI.autoDetectRenderer(this.screen.canvas.width, this.screen.canvas.height, {
	            view: this.screen.canvas,
	            antialias: true
	        });
	        this.resize(this.screen.canvas.width, this.screen.canvas.height);
	    }
	    Renderer.prototype.draw = function (stage) {
	        this.engine.render(stage);
	        return this;
	    };
	    Renderer.prototype.resize = function (width, height) {
	        this.screen.resize(width, height);
	        this.engine.resize(this.screen.size.x, this.screen.size.y);
	        return this;
	    };
	    return Renderer;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Renderer;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var EventEmitter = __webpack_require__(12);
	var Ticker = (function (_super) {
	    __extends(Ticker, _super);
	    function Ticker(fps) {
	        _super.call(this);
	        this.delta = 0;
	        this.timescale = 1;
	        this.fps = fps;
	        this.start();
	    }
	    Ticker.prototype.scale = function (by) {
	        this.timescale = by;
	        return this;
	    };
	    Ticker.prototype.start = function () {
	        var _this = this;
	        if (this.clockId)
	            return this;
	        this.delta = 0;
	        this.lastTime = Date.now();
	        this.clockId = setInterval(function () { return _this.tick(); }, this.fps);
	        this.emit(Ticker.EVENTS.START, this.lastTime);
	        return this;
	    };
	    Ticker.prototype.stop = function () {
	        if (!this.clockId)
	            return this;
	        clearInterval(this.clockId);
	        this.clockId = null;
	        this.emit(Ticker.EVENTS.STOP, this.lastTime);
	        return this;
	    };
	    Ticker.prototype.tick = function () {
	        var now = Date.now();
	        var delta = ((now - this.lastTime) / 1000) * this.timescale;
	        this.lastTime = now;
	        this.emit(Ticker.EVENTS.TICK, delta);
	    };
	    Ticker.EVENTS = {
	        TICK: 'tick',
	        START: 'start',
	        STOP: 'stop'
	    };
	    Ticker.DEFAULTS = {
	        FPS: 1000 / 60
	    };
	    return Ticker;
	}(EventEmitter));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Ticker;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;

	  if (!events) return names;

	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt]
	    , events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Container_1 = __webpack_require__(7);
	var Stage = (function (_super) {
	    __extends(Stage, _super);
	    function Stage(camera) {
	        _super.call(this);
	        this.camera = camera;
	        this.interactive = true;
	    }
	    Stage.prototype.addChild = function () {
	        var childs = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            childs[_i - 0] = arguments[_i];
	        }
	        _super.prototype.addChild.apply(this, childs);
	        return this;
	    };
	    Stage.prototype.update = function (delta) {
	        var _this = this;
	        this.each(function (child, index) {
	            //skip rendering if camera doesn't sees the child
	            child.visible = _this.camera.sees(child);
	            //update their components first
	            child.components.forEach(function (describe) {
	                describe.component.update(delta);
	            });
	            //finally update the child
	            child.update(delta);
	        });
	    };
	    return Stage;
	}(Container_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Stage;


/***/ }
/******/ ]);