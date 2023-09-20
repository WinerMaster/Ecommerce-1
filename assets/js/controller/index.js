"use strict";

!(function (_ref) {
  var doc = _ref.doc,
    obj = _ref.obj,
    elem = _ref.elem,
    arry = _ref.arry,
    str = _ref.str;

  var $$ = function $$(param) {
    return new $$.i.init(param);
  };

  $$.prototype = {
    constructor: $$,
    length: 0
  };
  $$.i = $$.prototype;
  ($$.i.init = function (param) {
    var type = typeof param;
    if (type == "string") return query(param);
    else if (type == "object") return param;
  }).prototype = $$.i;

  function query(e) {
    var element = e,
      all = function all(e) {
        return convertNodeListToArray(doc.querySelectorAll(e));
      },
      one = function one(e) {
        return doc.querySelector(e);
      };

    if (all(element).length > 1) return all(element);
    else if (one(element) != null) return one(element);
  }

  function convertNodeListToArray(e) {
    var array = arry,
      push = [];
    var apply = array.prototype.push.apply;
    var slice = array.prototype.slice.call;

    if (apply != undefined) {
      push.push.apply(push, e);
      return push;
    } else return slice(e);
  }

  var types = function types(param) {
    var array = [];

    for (var type in param) {
      if (param.hasOwnProperty(type)) {
        array.push(type);
      }
    }

    return array;
  };

  arry.prototype.each = function (callback) {
    var THIS_EACH = this,
      number = 0,
      value,
      length = THIS_EACH.length;

    if (THIS_EACH === null) {
      throw new TypeError("this is null or not defined");
    }

    if ({}.toString.call(callback) !== "[object Function]") {
      throw new TypeError("Callback is not a function");
    }

    for (; number < length; number++) {
      value = THIS_EACH[number];
      callback.call(THIS_EACH, value, number, THIS_EACH);
    }
  };

  $$.request = function (url, callback, settings) {
    var xhr,
      bool = false,
      data = null,
      method = "get";

    if (settings != null) {
      (bool = settings.bool), (data = settings.data);
      method = settings.mode;
      data == null ? (data = null) : void 0;
      bool == null ? (bool = false) : void 0;
      method == null ? (method = "get") : void 0;
    }

    var options = {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0"
    };
    xhr = new XMLHttpRequest(options);
    xhr.open(method, url, bool);
    var newFunctions = {
      load: function load(callback) {
        xhr.onload = function (e) {
          var __this = this;

          var _this = {
            targ: e.target,
            resp: __this.status == 200 ? __this.response : null,
            error: __this.status == 400 ? true : false
          };
          callback.call(_this, _this.resp, _this.error);
        };
      },
      up: function up(callback) {
        xhr.upload.onprogress = function (e) {
          callback.call(this, e);
        };
      },
      ready: function ready(callback) {
        xhr.onreadystatechange = function () {
          var __this = this;

          var _this = {
            stat: __this.status,
            resp: __this.status == 200 ? __this.response : null,
            error: __this.status == 400 ? true : false
          };
          callback.call(_this, _this.stat, _this.resp, _this.error);
        };
      },
      type: xhr.responseType,
      header: setHeaders,
      resp: xhr.response
    };

    function setHeaders(param) {
      var i = 0,
        array = [];

      for (var key in param) {
        if (param.hasOwnProperty(key)) {
          array.push(key);
        }
      }

      for (; i < array.length; i++) {
        xhr.setRequestHeader(array[i], param[array[i]]);
      }
    }

    callback.call(newFunctions);
    xhr.send(data);
  };

  obj.prototype.akeys = function () {
    var array = [];

    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        array.push(key);
      }
    }

    return array;
  };

  elem.prototype.select = function (param, name) {
    var _this2 = this;

    var element,
      elements,
      keys = {},
      type = keys.toString.call(param),
      reg = new RegExp(/[\[\]]/g);

    var getElement = function getElement(e) {
      return _this2.querySelector(e);
    };

    var getElements = function getElements(e) {
      return _this2.querySelectorAll(e);
    };

    var result = type.replace(reg, "").split(" ");

    var oneOrTwo = function oneOrTwo() {
      return getElements(result[1] == "Function" ? name : param);
    };

    var length = oneOrTwo() != null ? oneOrTwo().length : 0;
    if (length >= 1) elements = oneOrTwo();
    element = getElement(result[1] == "Function" ? name : param);
    keys.elem = element;
    keys.elems = length >= 1 ? convertNodeListToArray(elements) : [];
    if (result[1] === "Function") return param.call(keys);
    else return keys;
  };

  elem.prototype.sty = function (styles) {
    if (typeof styles === "object") {
      var indice = 0,
        propertyStyle = this.style,
        property = types(styles),
        length = types(styles).length;

      for (; indice < length; indice++) {
        propertyStyle[property[indice]] = styles[property[indice]];
        if (indice === length - 1) break;
      }
    } else if (typeof styles === "string") {
      this.style = styles;
    }
  };

  elem.prototype.attr = function (param1, param2) {
    this.setAttribute(param1, param2);
  };

  str.prototype.add = function (string) {
    return this.concat(string);
  };

  window.on = elem.prototype.on = function (type, callback) {
    type = "on" + type;

    this[type] = function () {
      callback.call(this, this);
    };
  };

  window.event = elem.prototype.event = function (type, callback, bool) {
    this.addEventListener(
      type,
      function () {
        callback.call(this, this);
      },
      bool
    );
  };

  window.body = function () {
    var element = doc.querySelector("body");
    return element;
  };

  elem.prototype.add = function (add, remove) {
    this.classList.add(add);
    if (remove != null) this.classList.remove(remove);
  };

  elem.prototype.remove = function (remove, add) {
    this.classList.remove(remove);
    if (add != null) this.classList.add(add);
  };

  elem.prototype.toggle = function (toggle) {
    var _this = this;

    var classList = this.className.includes(toggle);

    if (classList) {
      _this.classList.remove(toggle);
    } else {
      _this.classList.add(toggle);
    }
  };

  arry.prototype.smap = function (callback) {
    var array = [],
      elements = convertNodeListToArray(this),
      length = elements.length;

    for (var i = 0; i < length; i++) {
      var response = callback.call(this, elements[i], i, this);
      array.push(response);
    }

    return array;
  };

  elem.prototype.child = function () {
    var container = ["children", "childNodes"];
    var element = this;
    var result;
    container.each(function (e) {
      if (element[container[e]] != null) {
        result = element[container[e]];
        return;
      }
    });
    return result;
  };

  $$.resize = function (callback) {
    var event = window.on,
      name = "resize";
    event(name, call);

    function call() {
      var options = {
        w: this.innerWidth,
        h: this.innerHeight,
        ow: this.outerWidth,
        oh: this.outerHeight
      };
      callback.call(options, options.w, options.h);
    }
  };

  $$.elem = function(name, settings) {
    var elem = doc.createElement(name);
    var style = elem.style;
    for(var keys in settings) {
      if(settings.hasOwnProperty(keys)) {
        if(style.hasOwnProperty(keys)) {
            style[keys] = settings[keys];
        } else if(keys in elem) {
          try {
            elem[keys] = settings[keys];
          } catch(e) {
            var key = settings[keys];
            elem[keys](key[0], key[1]);
          }
        }
      }
    }
    return elem;
  }

  function scrolling(callback, string) {
    this.on("scroll", function () {
      var types = string != null ? string.split(" ") : void 0;
      var options = {
        x: window.scrollX,
        y: window.scrollY,
      };
      if(string!=null){
      var direc = types[0];
      var number = types[1];
      if (options[direc] == number) callback.call(options, true);}else callback.call(options, options.x, options.y);
    });
  };

  elem.prototype.scrolling = scrolling;
  window.scrolling = scrolling;
  class Animation {
    show(items, settings) {
      if (!("IntersectionObserver" in window)) {
        return "Error";
      }

      var elements = this.getElements(items);
      var styles = this.getStyles(settings);
      var delay = settings.delay;

      for (var i = 0; i < elements.length; i++) {
        var elem = elements[i];
        elem.sty(styles);
      }

      if (delay == null) delay = 0;
      var config = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
      };
      var observer = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          var dely = delay[i] != null ? delay[i] : delay;

          if (entry.isIntersecting) {
            entry.target.sty({
              visibility: "visible",
              opacity: 1,
              transform: "translate(0,0)",
              transition: dely + "s"
            });
          }

          if (i === entries.length - 1) break;
        }
      }, config);
      setTimeout(function () {
        for (var i = 0; i < elements.length; i++) {
          observer.observe(elements[i]);
        }
      }, 1000);
    }

    getStyles(settings) {
      var direction = this.getDirection(settings);
      var stringStyles = "visibility: visible; opacity: 0;".concat(direction);
      return stringStyles;
    }

    getElements(items) {
      if (!Array.isArray(items) && typeof items === "string") {
        var getElement = function getElement(name) {
          return doc.querySelector(name);
        };

        var elements = items.split(",");
        var arrayElements = elements.smap(function (string) {
          return getElement(string);
        });
        return arrayElements;
      } else {
        return items;
      }
    }

    getDirection(_ref2) {
      var origin = _ref2.origin,
        move = _ref2.move;

      var create = function create(dir) {
        var one = dir[0] != null ? dir[0] : 0;
        var two = dir[1] != null ? dir[1] : 0;
        return "transform: translate(" + one + "px," + two + "px);";
      };

      if (origin == "right") origin = create([move]);
      else if (origin == "left") origin = create(["-" + move]);
      else if (origin == "top") origin = create([, "-" + move]);
      else if (origin == "bottom") origin = create([, move]);
      return origin;
    }
  }

  $$.anim = Animation;
  !(function (a, b) {
    if (a.$ === undefined) {
      a.$ = b;
    }
  })(window, $$);
})({
  doc: window.document,
  obj: Object,
  elem: Element || HTMLElement,
  arry: Array,
  str: String
});
