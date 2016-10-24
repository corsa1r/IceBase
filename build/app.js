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
	var GameObject_1 = __webpack_require__(11);
	var PIXI = __webpack_require__(4);
	var Point_1 = __webpack_require__(3);
	var canvas = document.getElementById('canvas');
	var game = new Game_1.default(canvas);
	var Ground = (function (_super) {
	    __extends(Ground, _super);
	    function Ground() {
	        _super.call(this);
	        this.view = new PIXI.Graphics();
	        this.view.beginFill(0x006800);
	        this.view.drawRect(0, 0, 10000, 5);
	        this.view.endFill();
	        this.addChild(this.view);
	        this.position.x = -5000;
	        this.position.y = 440;
	    }
	    return Ground;
	}(GameObject_1.default));
	var Player = (function (_super) {
	    __extends(Player, _super);
	    function Player(ground) {
	        _super.call(this);
	        this.velocity = new Point_1.default();
	        this.grounded = false;
	        this.ground = ground;
	        this.view = new PIXI.Graphics();
	        this.view.beginFill(0x686800);
	        this.view.drawRect(0, 0, 68, 150);
	        this.view.endFill();
	        this.addChild(this.view);
	    }
	    Player.prototype.update = function (delta) {
	        this.velocity.sum(0, 0.2);
	        this.position.y += this.velocity.y;
	        this.grounded = false;
	        if (this.position.y + this.height > this.ground.position.y) {
	            this.position.y = this.ground.position.y - this.height;
	            this.velocity.set(0, 0);
	            this.grounded = true;
	        }
	        if (this.states['A']) {
	            this.position.x -= 5;
	        }
	        if (this.states['D']) {
	            this.position.x += 5;
	        }
	        return this;
	    };
	    Player.prototype.key = function (event) {
	        this.states[event.name] = event.state;
	        return this;
	    };
	    Player.prototype.keydown = function (event) {
	        if (event.name === 'SPACE' && this.grounded) {
	            this.velocity.y -= 10;
	        }
	        return this;
	    };
	    return Player;
	}(GameObject_1.default));
	var ground = new Ground();
	var player = new Player(ground);
	game.stage.addChild(ground);
	game.stage.addChild(player);
	game.camera.follow(player, 0.3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Screen_1 = __webpack_require__(2);
	var Renderer_1 = __webpack_require__(5);
	var Ticker_1 = __webpack_require__(6);
	var Stage_1 = __webpack_require__(8);
	var Camera_1 = __webpack_require__(10);
	var Keyboard_1 = __webpack_require__(14);
	var Game = (function () {
	    function Game(canvas) {
	        var _this = this;
	        this.screen = new Screen_1.default(canvas);
	        this.camera = new Camera_1.default(this.screen);
	        this.renderer = new Renderer_1.default(this.screen);
	        this.stage = new Stage_1.default(this.camera);
	        this.keyboard = new Keyboard_1.default();
	        this.keyboard.broadcast(this.stage);
	        this.stage.addChild(this.camera);
	        this.ticker = new Ticker_1.default();
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
	        this.x += (to - this.x) * mul;
	        return this;
	    };
	    Point.prototype.lerpY = function (to, mul) {
	        if (mul === void 0) { mul = 1; }
	        mul = mul < 0 ? 0 : mul;
	        mul = mul > 1 ? 1 : mul;
	        this.y += (to - this.y) * mul;
	        return this;
	    };
	    Point.prototype.lerp = function (to, mul) {
	        if (mul === void 0) { mul = 1; }
	        return this.lerpX(to.x, mul).lerpY(to.y, mul);
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var EventEmitter = __webpack_require__(7);
	var Ticker = (function (_super) {
	    __extends(Ticker, _super);
	    function Ticker() {
	        _super.call(this);
	        this.delta = 0;
	        this.running = false;
	        this.start();
	        requestAnimationFrame(this.tick.bind(this));
	    }
	    Ticker.prototype.toggle = function () {
	        if (this.isRunning()) {
	            return this.stop();
	        }
	        return this.start();
	    };
	    Ticker.prototype.start = function () {
	        if (!this.running) {
	            this.running = true;
	            this.lastTime = Date.now();
	        }
	        return this;
	    };
	    Ticker.prototype.stop = function () {
	        if (this.running) {
	            this.running = false;
	        }
	        return this;
	    };
	    Ticker.prototype.isRunning = function () {
	        return this.running;
	    };
	    Ticker.prototype.tick = function () {
	        requestAnimationFrame(this.tick.bind(this));
	        if (!this.isRunning())
	            return this;
	        var now = Date.now();
	        var delta = now - this.lastTime;
	        this.lastTime = now;
	        this.emit(Ticker.EVENTS.TICK, delta);
	    };
	    Ticker.EVENTS = {
	        TICK: 'tick'
	    };
	    return Ticker;
	}(EventEmitter));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Ticker;


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Keyboard_1 = __webpack_require__(14);
	var Container_1 = __webpack_require__(9);
	var Stage = (function (_super) {
	    __extends(Stage, _super);
	    function Stage(camera) {
	        var _this = this;
	        _super.call(this);
	        this.camera = camera;
	        this.interactive = false;
	        this.on(Keyboard_1.default.EVENTS.KEY, function (event) { return _this.keyboard(event); });
	    }
	    Stage.prototype.keyboard = function (event) {
	        this.each(function (child) {
	            if (child.interactive) {
	                if (event.state)
	                    child.keydown(event);
	                if (!event.state)
	                    child.keyup(event);
	                child.key(event);
	            }
	        });
	    };
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


/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Point_1 = __webpack_require__(3);
	var GameObject_1 = __webpack_require__(11);
	var Camera = (function (_super) {
	    __extends(Camera, _super);
	    function Camera(screen) {
	        _super.call(this);
	        this.position = new Point_1.default();
	        this.followSpeed = 1;
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
	    Camera.prototype.follow = function (target, speed) {
	        if (speed === void 0) { speed = 1; }
	        this.followTarget = target;
	        this.followSpeed = speed;
	        return this;
	    };
	    Camera.prototype.stopFollow = function () {
	        this.followTarget = null;
	        return this;
	    };
	    Camera.prototype.update = function (delta) {
	        if (!this.followTarget)
	            return this;
	        var lerpTo = this.followTarget.position
	            .clone().sub(this.screen.halfSize).mul(-1)
	            .sub(this.followTarget.width >> 1, this.followTarget.height >> 1);
	        this.position.lerp(lerpTo, this.followSpeed);
	        return this;
	    };
	    return Camera;
	}(GameObject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Camera;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Container_1 = __webpack_require__(9);
	var Component_1 = __webpack_require__(12);
	var DraggableData_1 = __webpack_require__(13);
	var GameObject = (function (_super) {
	    __extends(GameObject, _super);
	    function GameObject() {
	        _super.call(this);
	        this.draggableData = new DraggableData_1.DraggableData();
	        this.states = {};
	        this.components = [];
	        this.interactive = true;
	    }
	    GameObject.prototype.addComponent = function (component) {
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
	        if (this.draggableData.index)
	            this.dragstart();
	    };
	    GameObject.prototype.onDragMove = function (event) {
	        if (!this.draggableData.enabled)
	            return;
	        if (!this.draggableData.dragging)
	            return;
	        this.position.copy(this.draggableData.getGap(event));
	        this.drag();
	        this.draggableData.index++;
	        if (this.draggableData.index === 1)
	            this.dragstart();
	    };
	    GameObject.prototype.onDragEnd = function () {
	        if (!this.draggableData.enabled)
	            return;
	        this.draggableData.dragging = false;
	        this.dragend();
	        this.draggableData.index = 0;
	    };
	    //@abstract methods
	    GameObject.prototype.dragstart = function () { return this; };
	    GameObject.prototype.drag = function () { return this; };
	    GameObject.prototype.dragend = function () { return this; };
	    GameObject.prototype.keyup = function (event) { return this; };
	    GameObject.prototype.key = function (event) { return this; };
	    GameObject.prototype.keydown = function (event) { return this; };
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Container_1 = __webpack_require__(9);
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Window_1 = __webpack_require__(15);
	var InputSwitch_1 = __webpack_require__(16);
	var Keyboard = (function (_super) {
	    __extends(Keyboard, _super);
	    function Keyboard() {
	        _super.call(this, Keyboard.KeyMap);
	        this.attachEvents(['keydown', 'keyup']);
	    }
	    Keyboard.prototype.input = function (event) {
	        var eventName = event.state ? Keyboard.EVENTS.KEYDOWN : Keyboard.EVENTS.KEYUP;
	        this.emit(eventName, event);
	        this.emit(Keyboard.EVENTS.KEY, event);
	        if (this.broadcastTo) {
	            this.broadcastTo.emit(eventName, event);
	            this.broadcastTo.emit(Keyboard.EVENTS.KEY, event);
	        }
	    };
	    Keyboard.prototype.broadcast = function (to) {
	        if (!this.broadcastTo) {
	            this.broadcastTo = to;
	        }
	    };
	    Keyboard.prototype.attachEvents = function (events) {
	        var _this = this;
	        events.forEach(function (event, index) {
	            Window_1.default.addEventListener(event, function (rawEvent) {
	                _this.proceed(rawEvent.keyCode, !index);
	            });
	        });
	    };
	    Keyboard.EVENTS = {
	        KEYUP: 'keyup',
	        KEY: 'keypress',
	        KEYDOWN: 'keydown'
	    };
	    Keyboard.KeyMap = {
	        48: '0',
	        49: '1',
	        50: '2',
	        51: '3',
	        52: '4',
	        53: '5',
	        54: '6',
	        55: '7',
	        56: '8',
	        57: '9',
	        3: 'CANCEL',
	        6: 'HELP',
	        8: 'BACK_SPACE',
	        9: 'TAB',
	        12: 'CLEAR',
	        13: 'RETURN',
	        14: 'ENTER',
	        16: 'SHIFT',
	        17: 'CONTROL',
	        91: 'COMMAND',
	        18: 'ALT',
	        19: 'PAUSE',
	        20: 'CAPS_LOCK',
	        21: 'KANA/HANGUL',
	        23: 'JUNJA',
	        24: 'FINAL',
	        25: 'HANJA/KANJI',
	        27: 'ESCAPE',
	        28: 'CONVERT',
	        29: 'NONCONVERT',
	        30: 'ACCEPT',
	        31: 'MODECHANGE',
	        32: 'SPACE',
	        33: 'PAGE_UP',
	        34: 'PAGE_DOWN',
	        35: 'END',
	        36: 'HOME',
	        37: 'LEFT',
	        38: 'UP',
	        39: 'RIGHT',
	        40: 'DOWN',
	        41: 'SELECT',
	        42: 'PRINT',
	        43: 'EXECUTE',
	        44: 'PRINTSCREEN',
	        45: 'INSERT',
	        46: 'DELETE',
	        59: 'SEMICOLON',
	        61: 'EQUALS',
	        65: 'A',
	        66: 'B',
	        67: 'C',
	        68: 'D',
	        69: 'E',
	        70: 'F',
	        71: 'G',
	        72: 'H',
	        73: 'I',
	        74: 'J',
	        75: 'K',
	        76: 'L',
	        77: 'M',
	        78: 'N',
	        79: 'O',
	        80: 'P',
	        81: 'Q',
	        82: 'R',
	        83: 'S',
	        84: 'T',
	        85: 'U',
	        86: 'V',
	        87: 'W',
	        88: 'X',
	        89: 'Y',
	        90: 'Z',
	        93: 'CONTEXT_MENU',
	        95: 'SLEEP',
	        96: 'NUMPAD0',
	        97: 'NUMPAD1',
	        98: 'NUMPAD2',
	        99: 'NUMPAD3',
	        100: 'NUMPAD4',
	        101: 'NUMPAD5',
	        102: 'NUMPAD6',
	        103: 'NUMPAD7',
	        104: 'NUMPAD8',
	        105: 'NUMPAD9',
	        106: 'MULTIPLY',
	        107: 'ADD',
	        108: 'SEPARATOR',
	        109: 'SUBTRACT',
	        110: 'DECIMAL',
	        111: 'DIVIDE',
	        112: 'F1',
	        113: 'F2',
	        114: 'F3',
	        115: 'F4',
	        116: 'F5',
	        117: 'F6',
	        118: 'F7',
	        119: 'F8',
	        120: 'F9',
	        121: 'F10',
	        122: 'F11',
	        123: 'F12',
	        124: 'F13',
	        125: 'F14',
	        126: 'F15',
	        127: 'F16',
	        128: 'F17',
	        129: 'F18',
	        130: 'F19',
	        131: 'F20',
	        132: 'F21',
	        133: 'F22',
	        134: 'F23',
	        135: 'F24',
	        144: 'NUM_LOCK',
	        145: 'SCROLL_LOCK',
	        188: 'COMMA',
	        190: 'PERIOD',
	        191: 'SLASH',
	        192: 'BACK_QUOTE',
	        219: 'OPEN_BRACKET',
	        220: 'BACK_SLASH',
	        221: 'CLOSE_BRACKET',
	        222: 'QUOTE',
	        224: 'META'
	    };
	    return Keyboard;
	}(InputSwitch_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Keyboard;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = window;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var EventEmitter = __webpack_require__(7);
	var InputSwitch = (function (_super) {
	    __extends(InputSwitch, _super);
	    function InputSwitch(map) {
	        _super.call(this);
	        this.states = {};
	        this.map = {};
	        this.map = map;
	    }
	    InputSwitch.prototype.inputSwitch = function (event) {
	        if (this.states[event.name] !== event.state || this.states[event.name] === undefined) {
	            this.states[event.name] = event.state;
	            return true;
	        }
	        return false;
	    };
	    InputSwitch.prototype.getKeyName = function (code) {
	        return this.map[code] || 'unknown';
	    };
	    InputSwitch.prototype.getKeyCode = function (name) {
	        for (var code in this.map) {
	            if (this.map[code] === name)
	                return parseInt(code, 10);
	        }
	        return -1;
	    };
	    InputSwitch.prototype.createEvent = function (which, state) {
	        var name = this.getKeyName(which);
	        var code = this.getKeyCode(name);
	        var event = {
	            name: name,
	            code: code,
	            state: state,
	            time: Date.now()
	        };
	        return event;
	    };
	    InputSwitch.prototype.proceed = function (which, state) {
	        var event = this.createEvent(which, state);
	        if (this.inputSwitch(event))
	            this.input(event);
	    };
	    InputSwitch.prototype.input = function (event) {
	    };
	    return InputSwitch;
	}(EventEmitter));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = InputSwitch;


/***/ }
/******/ ]);