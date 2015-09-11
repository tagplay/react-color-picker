(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ColorPicker"] = factory(require("React"));
	else
		root["ColorPicker"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var assign = __webpack_require__(2);
	var colorUtils = __webpack_require__(3);

	var HueSpectrum = __webpack_require__(5);
	var SaturationSpectrum = __webpack_require__(27);

	var toHsv = colorUtils.toHsv;

	function emptyFn() {}

	var RESULT = React.createClass({

	    displayName: 'ColorPicker',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            defaultColor: __webpack_require__(25),
	            saturationWidth: 300,
	            saturationHeight: 300,
	            hueHeight: null,
	            hueWidth: 30,
	            hueMargin: 10
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            value: this.props.defaultValue
	        };
	    },

	    prepareClassName: function prepareClassName(props) {
	        var className = props.className || '';

	        className += ' cp';

	        return className;
	    },

	    prepareProps: function prepareProps(props) {

	        props.className = this.prepareClassName(props);

	        return props;
	    },

	    render: function render() {

	        var props = this.prepareProps(assign({}, this.props));
	        var hueStyle = this.props.hueStyle || {};

	        hueStyle.marginLeft = this.props.hueMargin;

	        var value = props.value ? this.toColorValue(this.props.value) : null;

	        var defaultValue = !value ? this.toColorValue(this.state.value || props.defaultValue || props.defaultColor) : null;

	        var saturationConfig = {
	            onDrag: this.handleSaturationDrag,
	            onChange: this.handleSaturationChange,
	            onMouseDown: this.handleSaturationMouseDown,
	            height: props.saturationHeight,
	            width: props.saturationWidth,
	            inPicker: true
	        };

	        var hueConfig = {
	            onDrag: this.handleHueDrag,
	            onChange: this.handleHueChange,
	            height: props.hueHeight || props.saturationHeight,
	            width: props.hueWidth,
	            inPicker: true,
	            style: hueStyle
	        };

	        if (this.state.dragHue) {
	            ;(value || defaultValue).h = this.state.dragHue;
	        }

	        //both value and defaultValue are objects like: {h,s,v}
	        if (value) {
	            saturationConfig.value = assign({}, value);
	            hueConfig.value = assign({}, value);
	        } else {
	            saturationConfig.defaultValue = assign({}, defaultValue);
	            hueConfig.defaultValue = assign({}, defaultValue);
	        }

	        return React.createElement(
	            'div',
	            props,
	            React.createElement(SaturationSpectrum, saturationConfig),
	            React.createElement(HueSpectrum, hueConfig)
	        );
	    },

	    toColorValue: function toColorValue(value) {
	        return typeof value == 'string' ? toHsv(value) : value;
	    },

	    toStringValue: __webpack_require__(26),

	    handleChange: function handleChange(color) {

	        this.state.dragHue = null;

	        color = assign({}, color);

	        var value = this.toStringValue(color);(this.props.onChange || emptyFn)(value, color);
	    },

	    handleSaturationChange: function handleSaturationChange(color) {
	        this.handleChange(color);
	    },

	    handleHueChange: function handleHueChange(color) {
	        this.handleChange(color);
	    },

	    handleHueDrag: function handleHueDrag(hsv) {
	        this.handleDrag(hsv);
	    },

	    handleSaturationDrag: function handleSaturationDrag(hsv) {
	        this.handleDrag(hsv);
	    },

	    handleDrag: function handleDrag(color) {

	        if (!this.props.value) {
	            this.setState({
	                value: color
	            });
	        }

	        ;(this.props.onDrag || emptyFn)(this.toStringValue(color), color);
	    },

	    handleSaturationMouseDown: function handleSaturationMouseDown(hsv) {
	        this.setState({
	            dragHue: hsv.h
	        });
	    }
	});

	RESULT.HueSpectrum = HueSpectrum;
	RESULT.SaturationSpectrum = SaturationSpectrum;

	module.exports = RESULT;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var tinycolor = __webpack_require__(4);

	if (typeof window != 'undefined') {
	    window.tinycolor = tinycolor;
	}

	function toColor(color) {
	    return tinycolor(color);
	}

	function toPure(color) {
	    var h = toColor(color).toHsl().h;

	    return toColor({ h: h, s: 100, l: 50, a: 1 });
	}

	function fromRatio(color) {
	    return tinycolor.fromRatio(color);
	}

	function toAlpha(color, alpha) {
	    if (alpha > 1) {
	        alpha = alpha / 100;
	    }

	    color = toColor(color).toRgb();
	    color.a = alpha;

	    return toColor(color);
	}

	function toHsv(color) {
	    return toColor(color).toHsv();
	}

	var Color = {
	    toColor: toColor,
	    toPure: toPure,
	    fromRatio: fromRatio,
	    toAlpha: toAlpha,
	    toHsv: toHsv
	};

	if (typeof window != 'undefined') {
	    window.color = Color;
	}

	module.exports = Color;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// TinyColor v1.1.2
	// https://github.com/bgrins/TinyColor
	// Brian Grinstead, MIT License

	"use strict";

	(function () {

	    var trimLeft = /^[\s,#]+/,
	        trimRight = /\s+$/,
	        tinyCounter = 0,
	        math = Math,
	        mathRound = math.round,
	        mathMin = math.min,
	        mathMax = math.max,
	        mathRandom = math.random;

	    function tinycolor(color, opts) {

	        color = color ? color : '';
	        opts = opts || {};

	        // If input is already a tinycolor, return itself
	        if (color instanceof tinycolor) {
	            return color;
	        }
	        // If we are called as a function, call using new instead
	        if (!(this instanceof tinycolor)) {
	            return new tinycolor(color, opts);
	        }

	        var rgb = inputToRGB(color);
	        this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
	        this._gradientType = opts.gradientType;

	        // Don't let the range of [0,255] come back in [0,1].
	        // Potentially lose a little bit of precision here, but will fix issues where
	        // .5 gets interpreted as half of the total, instead of half of 1
	        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
	        if (this._r < 1) {
	            this._r = mathRound(this._r);
	        }
	        if (this._g < 1) {
	            this._g = mathRound(this._g);
	        }
	        if (this._b < 1) {
	            this._b = mathRound(this._b);
	        }

	        this._ok = rgb.ok;
	        this._tc_id = tinyCounter++;
	    }

	    tinycolor.prototype = {
	        isDark: function isDark() {
	            return this.getBrightness() < 128;
	        },
	        isLight: function isLight() {
	            return !this.isDark();
	        },
	        isValid: function isValid() {
	            return this._ok;
	        },
	        getOriginalInput: function getOriginalInput() {
	            return this._originalInput;
	        },
	        getFormat: function getFormat() {
	            return this._format;
	        },
	        getAlpha: function getAlpha() {
	            return this._a;
	        },
	        getBrightness: function getBrightness() {
	            //http://www.w3.org/TR/AERT#color-contrast
	            var rgb = this.toRgb();
	            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	        },
	        getLuminance: function getLuminance() {
	            //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
	            var rgb = this.toRgb();
	            var RsRGB, GsRGB, BsRGB, R, G, B;
	            RsRGB = rgb.r / 255;
	            GsRGB = rgb.g / 255;
	            BsRGB = rgb.b / 255;

	            if (RsRGB <= 0.03928) {
	                R = RsRGB / 12.92;
	            } else {
	                R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
	            }
	            if (GsRGB <= 0.03928) {
	                G = GsRGB / 12.92;
	            } else {
	                G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
	            }
	            if (BsRGB <= 0.03928) {
	                B = BsRGB / 12.92;
	            } else {
	                B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
	            }
	            return 0.2126 * R + 0.7152 * G + 0.0722 * B;
	        },
	        setAlpha: function setAlpha(value) {
	            this._a = boundAlpha(value);
	            this._roundA = mathRound(100 * this._a) / 100;
	            return this;
	        },
	        toHsv: function toHsv() {
	            var hsv = rgbToHsv(this._r, this._g, this._b);
	            return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
	        },
	        toHsvString: function toHsvString() {
	            var hsv = rgbToHsv(this._r, this._g, this._b);
	            var h = mathRound(hsv.h * 360),
	                s = mathRound(hsv.s * 100),
	                v = mathRound(hsv.v * 100);
	            return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
	        },
	        toHsl: function toHsl() {
	            var hsl = rgbToHsl(this._r, this._g, this._b);
	            return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
	        },
	        toHslString: function toHslString() {
	            var hsl = rgbToHsl(this._r, this._g, this._b);
	            var h = mathRound(hsl.h * 360),
	                s = mathRound(hsl.s * 100),
	                l = mathRound(hsl.l * 100);
	            return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
	        },
	        toHex: function toHex(allow3Char) {
	            return rgbToHex(this._r, this._g, this._b, allow3Char);
	        },
	        toHexString: function toHexString(allow3Char) {
	            return '#' + this.toHex(allow3Char);
	        },
	        toHex8: function toHex8() {
	            return rgbaToHex(this._r, this._g, this._b, this._a);
	        },
	        toHex8String: function toHex8String() {
	            return '#' + this.toHex8();
	        },
	        toRgb: function toRgb() {
	            return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
	        },
	        toRgbString: function toRgbString() {
	            return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
	        },
	        toPercentageRgb: function toPercentageRgb() {
	            return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
	        },
	        toPercentageRgbString: function toPercentageRgbString() {
	            return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
	        },
	        toName: function toName() {
	            if (this._a === 0) {
	                return "transparent";
	            }

	            if (this._a < 1) {
	                return false;
	            }

	            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
	        },
	        toFilter: function toFilter(secondColor) {
	            var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
	            var secondHex8String = hex8String;
	            var gradientType = this._gradientType ? "GradientType = 1, " : "";

	            if (secondColor) {
	                var s = tinycolor(secondColor);
	                secondHex8String = s.toHex8String();
	            }

	            return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
	        },
	        toString: function toString(format) {
	            var formatSet = !!format;
	            format = format || this._format;

	            var formattedString = false;
	            var hasAlpha = this._a < 1 && this._a >= 0;
	            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

	            if (needsAlphaFormat) {
	                // Special case for "transparent", all other non-alpha formats
	                // will return rgba when there is transparency.
	                if (format === "name" && this._a === 0) {
	                    return this.toName();
	                }
	                return this.toRgbString();
	            }
	            if (format === "rgb") {
	                formattedString = this.toRgbString();
	            }
	            if (format === "prgb") {
	                formattedString = this.toPercentageRgbString();
	            }
	            if (format === "hex" || format === "hex6") {
	                formattedString = this.toHexString();
	            }
	            if (format === "hex3") {
	                formattedString = this.toHexString(true);
	            }
	            if (format === "hex8") {
	                formattedString = this.toHex8String();
	            }
	            if (format === "name") {
	                formattedString = this.toName();
	            }
	            if (format === "hsl") {
	                formattedString = this.toHslString();
	            }
	            if (format === "hsv") {
	                formattedString = this.toHsvString();
	            }

	            return formattedString || this.toHexString();
	        },

	        _applyModification: function _applyModification(fn, args) {
	            var color = fn.apply(null, [this].concat([].slice.call(args)));
	            this._r = color._r;
	            this._g = color._g;
	            this._b = color._b;
	            this.setAlpha(color._a);
	            return this;
	        },
	        lighten: function lighten() {
	            return this._applyModification(_lighten, arguments);
	        },
	        brighten: function brighten() {
	            return this._applyModification(_brighten, arguments);
	        },
	        darken: function darken() {
	            return this._applyModification(_darken, arguments);
	        },
	        desaturate: function desaturate() {
	            return this._applyModification(_desaturate, arguments);
	        },
	        saturate: function saturate() {
	            return this._applyModification(_saturate, arguments);
	        },
	        greyscale: function greyscale() {
	            return this._applyModification(_greyscale, arguments);
	        },
	        spin: function spin() {
	            return this._applyModification(_spin, arguments);
	        },

	        _applyCombination: function _applyCombination(fn, args) {
	            return fn.apply(null, [this].concat([].slice.call(args)));
	        },
	        analogous: function analogous() {
	            return this._applyCombination(_analogous, arguments);
	        },
	        complement: function complement() {
	            return this._applyCombination(_complement, arguments);
	        },
	        monochromatic: function monochromatic() {
	            return this._applyCombination(_monochromatic, arguments);
	        },
	        splitcomplement: function splitcomplement() {
	            return this._applyCombination(_splitcomplement, arguments);
	        },
	        triad: function triad() {
	            return this._applyCombination(_triad, arguments);
	        },
	        tetrad: function tetrad() {
	            return this._applyCombination(_tetrad, arguments);
	        }
	    };

	    // If input is an object, force 1 into "1.0" to handle ratios properly
	    // String input requires "1.0" as input, so 1 will be treated as 1
	    tinycolor.fromRatio = function (color, opts) {
	        if (typeof color == "object") {
	            var newColor = {};
	            for (var i in color) {
	                if (color.hasOwnProperty(i)) {
	                    if (i === "a") {
	                        newColor[i] = color[i];
	                    } else {
	                        newColor[i] = convertToPercentage(color[i]);
	                    }
	                }
	            }
	            color = newColor;
	        }

	        return tinycolor(color, opts);
	    };

	    // Given a string or object, convert that input to RGB
	    // Possible string inputs:
	    //
	    //     "red"
	    //     "#f00" or "f00"
	    //     "#ff0000" or "ff0000"
	    //     "#ff000000" or "ff000000"
	    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
	    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
	    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
	    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
	    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
	    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
	    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
	    //
	    function inputToRGB(color) {

	        var rgb = { r: 0, g: 0, b: 0 };
	        var a = 1;
	        var ok = false;
	        var format = false;

	        if (typeof color == "string") {
	            color = stringInputToObject(color);
	        }

	        if (typeof color == "object") {
	            if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
	                rgb = rgbToRgb(color.r, color.g, color.b);
	                ok = true;
	                format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
	            } else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
	                color.s = convertToPercentage(color.s);
	                color.v = convertToPercentage(color.v);
	                rgb = hsvToRgb(color.h, color.s, color.v);
	                ok = true;
	                format = "hsv";
	            } else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
	                color.s = convertToPercentage(color.s);
	                color.l = convertToPercentage(color.l);
	                rgb = hslToRgb(color.h, color.s, color.l);
	                ok = true;
	                format = "hsl";
	            }

	            if (color.hasOwnProperty("a")) {
	                a = color.a;
	            }
	        }

	        a = boundAlpha(a);

	        return {
	            ok: ok,
	            format: color.format || format,
	            r: mathMin(255, mathMax(rgb.r, 0)),
	            g: mathMin(255, mathMax(rgb.g, 0)),
	            b: mathMin(255, mathMax(rgb.b, 0)),
	            a: a
	        };
	    }

	    // Conversion Functions
	    // --------------------

	    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
	    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

	    // `rgbToRgb`
	    // Handle bounds / percentage checking to conform to CSS color spec
	    // <http://www.w3.org/TR/css3-color/>
	    // *Assumes:* r, g, b in [0, 255] or [0, 1]
	    // *Returns:* { r, g, b } in [0, 255]
	    function rgbToRgb(r, g, b) {
	        return {
	            r: bound01(r, 255) * 255,
	            g: bound01(g, 255) * 255,
	            b: bound01(b, 255) * 255
	        };
	    }

	    // `rgbToHsl`
	    // Converts an RGB color value to HSL.
	    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
	    // *Returns:* { h, s, l } in [0,1]
	    function rgbToHsl(r, g, b) {

	        r = bound01(r, 255);
	        g = bound01(g, 255);
	        b = bound01(b, 255);

	        var max = mathMax(r, g, b),
	            min = mathMin(r, g, b);
	        var h,
	            s,
	            l = (max + min) / 2;

	        if (max == min) {
	            h = s = 0; // achromatic
	        } else {
	                var d = max - min;
	                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	                switch (max) {
	                    case r:
	                        h = (g - b) / d + (g < b ? 6 : 0);break;
	                    case g:
	                        h = (b - r) / d + 2;break;
	                    case b:
	                        h = (r - g) / d + 4;break;
	                }

	                h /= 6;
	            }

	        return { h: h, s: s, l: l };
	    }

	    // `hslToRgb`
	    // Converts an HSL color value to RGB.
	    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
	    // *Returns:* { r, g, b } in the set [0, 255]
	    function hslToRgb(h, s, l) {
	        var r, g, b;

	        h = bound01(h, 360);
	        s = bound01(s, 100);
	        l = bound01(l, 100);

	        function hue2rgb(p, q, t) {
	            if (t < 0) t += 1;
	            if (t > 1) t -= 1;
	            if (t < 1 / 6) return p + (q - p) * 6 * t;
	            if (t < 1 / 2) return q;
	            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	            return p;
	        }

	        if (s === 0) {
	            r = g = b = l; // achromatic
	        } else {
	                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	                var p = 2 * l - q;
	                r = hue2rgb(p, q, h + 1 / 3);
	                g = hue2rgb(p, q, h);
	                b = hue2rgb(p, q, h - 1 / 3);
	            }

	        return { r: r * 255, g: g * 255, b: b * 255 };
	    }

	    // `rgbToHsv`
	    // Converts an RGB color value to HSV
	    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
	    // *Returns:* { h, s, v } in [0,1]
	    function rgbToHsv(r, g, b) {

	        r = bound01(r, 255);
	        g = bound01(g, 255);
	        b = bound01(b, 255);

	        var max = mathMax(r, g, b),
	            min = mathMin(r, g, b);
	        var h,
	            s,
	            v = max;

	        var d = max - min;
	        s = max === 0 ? 0 : d / max;

	        if (max == min) {
	            h = 0; // achromatic
	        } else {
	                switch (max) {
	                    case r:
	                        h = (g - b) / d + (g < b ? 6 : 0);break;
	                    case g:
	                        h = (b - r) / d + 2;break;
	                    case b:
	                        h = (r - g) / d + 4;break;
	                }
	                h /= 6;
	            }
	        return { h: h, s: s, v: v };
	    }

	    // `hsvToRgb`
	    // Converts an HSV color value to RGB.
	    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
	    // *Returns:* { r, g, b } in the set [0, 255]
	    function hsvToRgb(h, s, v) {

	        h = bound01(h, 360) * 6;
	        s = bound01(s, 100);
	        v = bound01(v, 100);

	        var i = math.floor(h),
	            f = h - i,
	            p = v * (1 - s),
	            q = v * (1 - f * s),
	            t = v * (1 - (1 - f) * s),
	            mod = i % 6,
	            r = [v, q, p, p, t, v][mod],
	            g = [t, v, v, q, p, p][mod],
	            b = [p, p, t, v, v, q][mod];

	        return { r: r * 255, g: g * 255, b: b * 255 };
	    }

	    // `rgbToHex`
	    // Converts an RGB color to hex
	    // Assumes r, g, and b are contained in the set [0, 255]
	    // Returns a 3 or 6 character hex
	    function rgbToHex(r, g, b, allow3Char) {

	        var hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

	        // Return a 3 character hex if possible
	        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
	            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
	        }

	        return hex.join("");
	    }
	    // `rgbaToHex`
	    // Converts an RGBA color plus alpha transparency to hex
	    // Assumes r, g, b and a are contained in the set [0, 255]
	    // Returns an 8 character hex
	    function rgbaToHex(r, g, b, a) {

	        var hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

	        return hex.join("");
	    }

	    // `equals`
	    // Can be called with any tinycolor input
	    tinycolor.equals = function (color1, color2) {
	        if (!color1 || !color2) {
	            return false;
	        }
	        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
	    };
	    tinycolor.random = function () {
	        return tinycolor.fromRatio({
	            r: mathRandom(),
	            g: mathRandom(),
	            b: mathRandom()
	        });
	    };

	    // Modification Functions
	    // ----------------------
	    // Thanks to less.js for some of the basics here
	    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

	    function _desaturate(color, amount) {
	        amount = amount === 0 ? 0 : amount || 10;
	        var hsl = tinycolor(color).toHsl();
	        hsl.s -= amount / 100;
	        hsl.s = clamp01(hsl.s);
	        return tinycolor(hsl);
	    }

	    function _saturate(color, amount) {
	        amount = amount === 0 ? 0 : amount || 10;
	        var hsl = tinycolor(color).toHsl();
	        hsl.s += amount / 100;
	        hsl.s = clamp01(hsl.s);
	        return tinycolor(hsl);
	    }

	    function _greyscale(color) {
	        return tinycolor(color).desaturate(100);
	    }

	    function _lighten(color, amount) {
	        amount = amount === 0 ? 0 : amount || 10;
	        var hsl = tinycolor(color).toHsl();
	        hsl.l += amount / 100;
	        hsl.l = clamp01(hsl.l);
	        return tinycolor(hsl);
	    }

	    function _brighten(color, amount) {
	        amount = amount === 0 ? 0 : amount || 10;
	        var rgb = tinycolor(color).toRgb();
	        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
	        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
	        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
	        return tinycolor(rgb);
	    }

	    function _darken(color, amount) {
	        amount = amount === 0 ? 0 : amount || 10;
	        var hsl = tinycolor(color).toHsl();
	        hsl.l -= amount / 100;
	        hsl.l = clamp01(hsl.l);
	        return tinycolor(hsl);
	    }

	    // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
	    // Values outside of this range will be wrapped into this range.
	    function _spin(color, amount) {
	        var hsl = tinycolor(color).toHsl();
	        var hue = (mathRound(hsl.h) + amount) % 360;
	        hsl.h = hue < 0 ? 360 + hue : hue;
	        return tinycolor(hsl);
	    }

	    // Combination Functions
	    // ---------------------
	    // Thanks to jQuery xColor for some of the ideas behind these
	    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

	    function _complement(color) {
	        var hsl = tinycolor(color).toHsl();
	        hsl.h = (hsl.h + 180) % 360;
	        return tinycolor(hsl);
	    }

	    function _triad(color) {
	        var hsl = tinycolor(color).toHsl();
	        var h = hsl.h;
	        return [tinycolor(color), tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })];
	    }

	    function _tetrad(color) {
	        var hsl = tinycolor(color).toHsl();
	        var h = hsl.h;
	        return [tinycolor(color), tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })];
	    }

	    function _splitcomplement(color) {
	        var hsl = tinycolor(color).toHsl();
	        var h = hsl.h;
	        return [tinycolor(color), tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }), tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })];
	    }

	    function _analogous(color, results, slices) {
	        results = results || 6;
	        slices = slices || 30;

	        var hsl = tinycolor(color).toHsl();
	        var part = 360 / slices;
	        var ret = [tinycolor(color)];

	        for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
	            hsl.h = (hsl.h + part) % 360;
	            ret.push(tinycolor(hsl));
	        }
	        return ret;
	    }

	    function _monochromatic(color, results) {
	        results = results || 6;
	        var hsv = tinycolor(color).toHsv();
	        var h = hsv.h,
	            s = hsv.s,
	            v = hsv.v;
	        var ret = [];
	        var modification = 1 / results;

	        while (results--) {
	            ret.push(tinycolor({ h: h, s: s, v: v }));
	            v = (v + modification) % 1;
	        }

	        return ret;
	    }

	    // Utility Functions
	    // ---------------------

	    tinycolor.mix = function (color1, color2, amount) {
	        amount = amount === 0 ? 0 : amount || 50;

	        var rgb1 = tinycolor(color1).toRgb();
	        var rgb2 = tinycolor(color2).toRgb();

	        var p = amount / 100;
	        var w = p * 2 - 1;
	        var a = rgb2.a - rgb1.a;

	        var w1;

	        if (w * a == -1) {
	            w1 = w;
	        } else {
	            w1 = (w + a) / (1 + w * a);
	        }

	        w1 = (w1 + 1) / 2;

	        var w2 = 1 - w1;

	        var rgba = {
	            r: rgb2.r * w1 + rgb1.r * w2,
	            g: rgb2.g * w1 + rgb1.g * w2,
	            b: rgb2.b * w1 + rgb1.b * w2,
	            a: rgb2.a * p + rgb1.a * (1 - p)
	        };

	        return tinycolor(rgba);
	    };

	    // Readability Functions
	    // ---------------------
	    // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

	    // `contrast`
	    // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
	    tinycolor.readability = function (color1, color2) {
	        var c1 = tinycolor(color1);
	        var c2 = tinycolor(color2);
	        return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
	    };

	    // `isReadable`
	    // Ensure that foreground and background color combinations meet WCAG2 guidelines.
	    // The third argument is an optional Object.
	    //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
	    //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
	    // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

	    // *Example*
	    //    tinycolor.isReadable("#000", "#111") => false
	    //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false

	    tinycolor.isReadable = function (color1, color2, wcag2) {
	        var readability = tinycolor.readability(color1, color2);
	        var wcag2Parms, out;

	        out = false;

	        wcag2Parms = validateWCAG2Parms(wcag2);
	        switch (wcag2Parms.level + wcag2Parms.size) {
	            case "AAsmall":
	            case "AAAlarge":
	                out = readability >= 4.5;
	                break;
	            case "AAlarge":
	                out = readability >= 3;
	                break;
	            case "AAAsmall":
	                out = readability >= 7;
	                break;
	        }
	        return out;
	    };

	    // `mostReadable`
	    // Given a base color and a list of possible foreground or background
	    // colors for that base, returns the most readable color.
	    // Optionally returns Black or White if the most readable color is unreadable.
	    // *Example*
	    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
	    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
	    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
	    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"

	    tinycolor.mostReadable = function (baseColor, colorList, args) {
	        var bestColor = null;
	        var bestScore = 0;
	        var readability;
	        var includeFallbackColors, level, size;
	        args = args || {};
	        includeFallbackColors = args.includeFallbackColors;
	        level = args.level;
	        size = args.size;

	        for (var i = 0; i < colorList.length; i++) {
	            readability = tinycolor.readability(baseColor, colorList[i]);
	            if (readability > bestScore) {
	                bestScore = readability;
	                bestColor = tinycolor(colorList[i]);
	            }
	        }

	        if (tinycolor.isReadable(baseColor, bestColor, { "level": level, "size": size }) || !includeFallbackColors) {
	            return bestColor;
	        } else {
	            args.includeFallbackColors = false;
	            return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
	        }
	    };

	    // Big List of Colors
	    // ------------------
	    // <http://www.w3.org/TR/css3-color/#svg-color>
	    var names = tinycolor.names = {
	        aliceblue: "f0f8ff",
	        antiquewhite: "faebd7",
	        aqua: "0ff",
	        aquamarine: "7fffd4",
	        azure: "f0ffff",
	        beige: "f5f5dc",
	        bisque: "ffe4c4",
	        black: "000",
	        blanchedalmond: "ffebcd",
	        blue: "00f",
	        blueviolet: "8a2be2",
	        brown: "a52a2a",
	        burlywood: "deb887",
	        burntsienna: "ea7e5d",
	        cadetblue: "5f9ea0",
	        chartreuse: "7fff00",
	        chocolate: "d2691e",
	        coral: "ff7f50",
	        cornflowerblue: "6495ed",
	        cornsilk: "fff8dc",
	        crimson: "dc143c",
	        cyan: "0ff",
	        darkblue: "00008b",
	        darkcyan: "008b8b",
	        darkgoldenrod: "b8860b",
	        darkgray: "a9a9a9",
	        darkgreen: "006400",
	        darkgrey: "a9a9a9",
	        darkkhaki: "bdb76b",
	        darkmagenta: "8b008b",
	        darkolivegreen: "556b2f",
	        darkorange: "ff8c00",
	        darkorchid: "9932cc",
	        darkred: "8b0000",
	        darksalmon: "e9967a",
	        darkseagreen: "8fbc8f",
	        darkslateblue: "483d8b",
	        darkslategray: "2f4f4f",
	        darkslategrey: "2f4f4f",
	        darkturquoise: "00ced1",
	        darkviolet: "9400d3",
	        deeppink: "ff1493",
	        deepskyblue: "00bfff",
	        dimgray: "696969",
	        dimgrey: "696969",
	        dodgerblue: "1e90ff",
	        firebrick: "b22222",
	        floralwhite: "fffaf0",
	        forestgreen: "228b22",
	        fuchsia: "f0f",
	        gainsboro: "dcdcdc",
	        ghostwhite: "f8f8ff",
	        gold: "ffd700",
	        goldenrod: "daa520",
	        gray: "808080",
	        green: "008000",
	        greenyellow: "adff2f",
	        grey: "808080",
	        honeydew: "f0fff0",
	        hotpink: "ff69b4",
	        indianred: "cd5c5c",
	        indigo: "4b0082",
	        ivory: "fffff0",
	        khaki: "f0e68c",
	        lavender: "e6e6fa",
	        lavenderblush: "fff0f5",
	        lawngreen: "7cfc00",
	        lemonchiffon: "fffacd",
	        lightblue: "add8e6",
	        lightcoral: "f08080",
	        lightcyan: "e0ffff",
	        lightgoldenrodyellow: "fafad2",
	        lightgray: "d3d3d3",
	        lightgreen: "90ee90",
	        lightgrey: "d3d3d3",
	        lightpink: "ffb6c1",
	        lightsalmon: "ffa07a",
	        lightseagreen: "20b2aa",
	        lightskyblue: "87cefa",
	        lightslategray: "789",
	        lightslategrey: "789",
	        lightsteelblue: "b0c4de",
	        lightyellow: "ffffe0",
	        lime: "0f0",
	        limegreen: "32cd32",
	        linen: "faf0e6",
	        magenta: "f0f",
	        maroon: "800000",
	        mediumaquamarine: "66cdaa",
	        mediumblue: "0000cd",
	        mediumorchid: "ba55d3",
	        mediumpurple: "9370db",
	        mediumseagreen: "3cb371",
	        mediumslateblue: "7b68ee",
	        mediumspringgreen: "00fa9a",
	        mediumturquoise: "48d1cc",
	        mediumvioletred: "c71585",
	        midnightblue: "191970",
	        mintcream: "f5fffa",
	        mistyrose: "ffe4e1",
	        moccasin: "ffe4b5",
	        navajowhite: "ffdead",
	        navy: "000080",
	        oldlace: "fdf5e6",
	        olive: "808000",
	        olivedrab: "6b8e23",
	        orange: "ffa500",
	        orangered: "ff4500",
	        orchid: "da70d6",
	        palegoldenrod: "eee8aa",
	        palegreen: "98fb98",
	        paleturquoise: "afeeee",
	        palevioletred: "db7093",
	        papayawhip: "ffefd5",
	        peachpuff: "ffdab9",
	        peru: "cd853f",
	        pink: "ffc0cb",
	        plum: "dda0dd",
	        powderblue: "b0e0e6",
	        purple: "800080",
	        rebeccapurple: "663399",
	        red: "f00",
	        rosybrown: "bc8f8f",
	        royalblue: "4169e1",
	        saddlebrown: "8b4513",
	        salmon: "fa8072",
	        sandybrown: "f4a460",
	        seagreen: "2e8b57",
	        seashell: "fff5ee",
	        sienna: "a0522d",
	        silver: "c0c0c0",
	        skyblue: "87ceeb",
	        slateblue: "6a5acd",
	        slategray: "708090",
	        slategrey: "708090",
	        snow: "fffafa",
	        springgreen: "00ff7f",
	        steelblue: "4682b4",
	        tan: "d2b48c",
	        teal: "008080",
	        thistle: "d8bfd8",
	        tomato: "ff6347",
	        turquoise: "40e0d0",
	        violet: "ee82ee",
	        wheat: "f5deb3",
	        white: "fff",
	        whitesmoke: "f5f5f5",
	        yellow: "ff0",
	        yellowgreen: "9acd32"
	    };

	    // Make it easy to access colors via `hexNames[hex]`
	    var hexNames = tinycolor.hexNames = flip(names);

	    // Utilities
	    // ---------

	    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
	    function flip(o) {
	        var flipped = {};
	        for (var i in o) {
	            if (o.hasOwnProperty(i)) {
	                flipped[o[i]] = i;
	            }
	        }
	        return flipped;
	    }

	    // Return a valid alpha value [0,1] with all invalid values being set to 1
	    function boundAlpha(a) {
	        a = parseFloat(a);

	        if (isNaN(a) || a < 0 || a > 1) {
	            a = 1;
	        }

	        return a;
	    }

	    // Take input from [0, n] and return it as [0, 1]
	    function bound01(n, max) {
	        if (isOnePointZero(n)) {
	            n = "100%";
	        }

	        var processPercent = isPercentage(n);
	        n = mathMin(max, mathMax(0, parseFloat(n)));

	        // Automatically convert percentage into number
	        if (processPercent) {
	            n = parseInt(n * max, 10) / 100;
	        }

	        // Handle floating point rounding errors
	        if (math.abs(n - max) < 0.000001) {
	            return 1;
	        }

	        // Convert into [0, 1] range if it isn't already
	        return n % max / parseFloat(max);
	    }

	    // Force a number between 0 and 1
	    function clamp01(val) {
	        return mathMin(1, mathMax(0, val));
	    }

	    // Parse a base-16 hex value into a base-10 integer
	    function parseIntFromHex(val) {
	        return parseInt(val, 16);
	    }

	    // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
	    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
	    function isOnePointZero(n) {
	        return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
	    }

	    // Check to see if string passed in is a percentage
	    function isPercentage(n) {
	        return typeof n === "string" && n.indexOf('%') != -1;
	    }

	    // Force a hex value to have 2 characters
	    function pad2(c) {
	        return c.length == 1 ? '0' + c : '' + c;
	    }

	    // Replace a decimal with it's percentage value
	    function convertToPercentage(n) {
	        if (n <= 1) {
	            n = n * 100 + "%";
	        }

	        return n;
	    }

	    // Converts a decimal to a hex value
	    function convertDecimalToHex(d) {
	        return Math.round(parseFloat(d) * 255).toString(16);
	    }
	    // Converts a hex value to a decimal
	    function convertHexToDecimal(h) {
	        return parseIntFromHex(h) / 255;
	    }

	    var matchers = (function () {

	        // <http://www.w3.org/TR/css3-values/#integers>
	        var CSS_INTEGER = "[-\\+]?\\d+%?";

	        // <http://www.w3.org/TR/css3-values/#number-value>
	        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

	        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
	        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

	        // Actual matching.
	        // Parentheses and commas are optional, but not required.
	        // Whitespace can take the place of commas or opening paren
	        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
	        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

	        return {
	            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
	            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
	            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
	            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
	            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
	            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
	            hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	            hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	            hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
	        };
	    })();

	    // `stringInputToObject`
	    // Permissive string parsing.  Take in a number of formats, and output an object
	    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
	    function stringInputToObject(color) {

	        color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
	        var named = false;
	        if (names[color]) {
	            color = names[color];
	            named = true;
	        } else if (color == 'transparent') {
	            return { r: 0, g: 0, b: 0, a: 0, format: "name" };
	        }

	        // Try to match string input using regular expressions.
	        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
	        // Just return an object and let the conversion functions handle that.
	        // This way the result will be the same whether the tinycolor is initialized with string or object.
	        var match;
	        if (match = matchers.rgb.exec(color)) {
	            return { r: match[1], g: match[2], b: match[3] };
	        }
	        if (match = matchers.rgba.exec(color)) {
	            return { r: match[1], g: match[2], b: match[3], a: match[4] };
	        }
	        if (match = matchers.hsl.exec(color)) {
	            return { h: match[1], s: match[2], l: match[3] };
	        }
	        if (match = matchers.hsla.exec(color)) {
	            return { h: match[1], s: match[2], l: match[3], a: match[4] };
	        }
	        if (match = matchers.hsv.exec(color)) {
	            return { h: match[1], s: match[2], v: match[3] };
	        }
	        if (match = matchers.hsva.exec(color)) {
	            return { h: match[1], s: match[2], v: match[3], a: match[4] };
	        }
	        if (match = matchers.hex8.exec(color)) {
	            return {
	                a: convertHexToDecimal(match[1]),
	                r: parseIntFromHex(match[2]),
	                g: parseIntFromHex(match[3]),
	                b: parseIntFromHex(match[4]),
	                format: named ? "name" : "hex8"
	            };
	        }
	        if (match = matchers.hex6.exec(color)) {
	            return {
	                r: parseIntFromHex(match[1]),
	                g: parseIntFromHex(match[2]),
	                b: parseIntFromHex(match[3]),
	                format: named ? "name" : "hex"
	            };
	        }
	        if (match = matchers.hex3.exec(color)) {
	            return {
	                r: parseIntFromHex(match[1] + '' + match[1]),
	                g: parseIntFromHex(match[2] + '' + match[2]),
	                b: parseIntFromHex(match[3] + '' + match[3]),
	                format: named ? "name" : "hex"
	            };
	        }

	        return false;
	    }

	    function validateWCAG2Parms(parms) {
	        // return valid WCAG2 parms for isReadable.
	        // If input parms are invalid, return {"level":"AA", "size":"small"}
	        var level, size;
	        parms = parms || { "level": "AA", "size": "small" };
	        level = (parms.level || "AA").toUpperCase();
	        size = (parms.size || "small").toLowerCase();
	        if (level !== "AA" && level !== "AAA") {
	            level = "AA";
	        }
	        if (size !== "small" && size !== "large") {
	            size = "small";
	        }
	        return { "level": level, "size": size };
	    }
	    // Node: Export function
	    if (typeof module !== "undefined" && module.exports) {
	        module.exports = tinycolor;
	    }
	    // AMD/requirejs: Define the module
	    else if (true) {
	            !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	                return tinycolor;
	            }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	        }
	        // Browser: Expose to window
	        else {
	                window.tinycolor = tinycolor;
	            }
	})();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Region = __webpack_require__(6);
	var assign = __webpack_require__(2);
	var common = __webpack_require__(15);

	var VALIDATE = __webpack_require__(24);

	module.exports = React.createClass(assign({

	    displayName: 'HueSpectrum',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            height: 300,
	            width: 30,
	            pointerSize: 3,
	            defaultColor: __webpack_require__(25)
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            h: 0
	        };
	    },

	    componentDidUpdate: function componentDidUpdate() {
	        // this.updateDragPositionIf()
	    },

	    componentDidMount: function componentDidMount() {
	        this.updateDragPositionIf();
	    },

	    updateDragPositionIf: function updateDragPositionIf() {

	        if (!this.props.height) {
	            this.setState({});
	        }
	    },

	    render: function render() {
	        this.hsv = this.toColorValue(this.state.value || this.props.value || this.props.defaultValue || this.props.defaultColor);
	        // console.log('hue:', this.hsv)

	        if (this.state.h == 360 && !this.hsv.h) {
	            //in order to show bottom red as well on drag
	            this.hsv.h = 360;
	        }

	        var style = assign({}, this.props.style);

	        if (this.props.height) {
	            style.height = this.props.height;
	        }
	        if (this.props.width) {
	            style.width = this.props.width;
	        }

	        var dragStyle = {
	            height: this.props.pointerSize
	        };

	        var dragPos = this.getDragPosition();

	        if (dragPos != null) {
	            dragStyle.top = dragPos;
	            dragStyle.display = 'block';
	        }
	        return React.createElement(
	            'div',
	            { className: 'cp-hue-spectrum', style: style, onMouseDown: this.onMouseDown },
	            React.createElement(
	                'div',
	                { className: 'cp-hue-drag', style: dragStyle },
	                React.createElement('div', { className: 'inner' })
	            )
	        );
	    },

	    getDragPosition: function getDragPosition(hsv) {
	        hsv = hsv || this.hsv;

	        if (!this.props.height && !this.isMounted()) {
	            return null;
	        }

	        var height = this.props.height || Region.fromDOM(this.getDOMNode()).getHeight();
	        var size = this.props.pointerSize;

	        var pos = Math.round(hsv.h * height / 360);
	        var diff = Math.round(size / 2);

	        return pos - diff;
	    },

	    updateColor: function updateColor(point) {
	        point = VALIDATE(point);

	        this.hsv.h = point.y * 360 / point.height;

	        if (this.hsv.h != 0) {
	            this.state.h = this.hsv.h;
	        }

	        this.state.h = this.hsv.h != 0 ? this.hsv.h : 0;
	    },

	    toStringValue: __webpack_require__(26)
	}, common));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(7);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn = __webpack_require__(8);
	var newify = __webpack_require__(9);

	var assign = __webpack_require__(2);
	var EventEmitter = __webpack_require__(11).EventEmitter;

	var inherits = __webpack_require__(12);
	var VALIDATE = __webpack_require__(13);

	var objectToString = Object.prototype.toString;

	var isObject = function isObject(value) {
	    return objectToString.apply(value) === '[object Object]';
	};

	function copyList(source, target, list) {
	    if (source) {
	        list.forEach(function (key) {
	            if (hasOwn(source, key)) {
	                target[key] = source[key];
	            }
	        });
	    }

	    return target;
	}

	/**
	 * @class Region
	 *
	 * The Region is an abstraction that allows the developer to refer to rectangles on the screen,
	 * and move them around, make diffs and unions, detect intersections, compute areas, etc.
	 *
	 * ## Creating a region
	 *      var region = require('region')({
	 *          top  : 10,
	 *          left : 10,
	 *          bottom: 100,
	 *          right : 100
	 *      })
	 *      //this region is a square, 90x90, starting from (10,10) to (100,100)
	 *
	 *      var second = require('region')({ top: 10, left: 100, right: 200, bottom: 60})
	 *      var union  = region.getUnion(second)
	 *
	 *      //the "union" region is a union between "region" and "second"
	 */

	var POINT_POSITIONS = {
	    cy: 'YCenter',
	    cx: 'XCenter',
	    t: 'Top',
	    tc: 'TopCenter',
	    tl: 'TopLeft',
	    tr: 'TopRight',
	    b: 'Bottom',
	    bc: 'BottomCenter',
	    bl: 'BottomLeft',
	    br: 'BottomRight',
	    l: 'Left',
	    lc: 'LeftCenter',
	    r: 'Right',
	    rc: 'RightCenter',
	    c: 'Center'
	};

	/**
	 * @constructor
	 *
	 * Construct a new Region.
	 *
	 * Example:
	 *
	 *      var r = new Region({ top: 10, left: 20, bottom: 100, right: 200 })
	 *
	 *      //or, the same, but with numbers (can be used with new or without)
	 *
	 *      r = Region(10, 200, 100, 20)
	 *
	 *      //or, with width and height
	 *
	 *      r = Region({ top: 10, left: 20, width: 180, height: 90})
	 *
	 * @param {Number|Object} top The top pixel position, or an object with top, left, bottom, right properties. If an object is passed,
	 * instead of having bottom and right, it can have width and height.
	 *
	 * @param {Number} right The right pixel position
	 * @param {Number} bottom The bottom pixel position
	 * @param {Number} left The left pixel position
	 *
	 * @return {Region} this
	 */
	var REGION = function REGION(top, right, bottom, left) {

	    if (!(this instanceof REGION)) {
	        return newify(REGION, arguments);
	    }

	    EventEmitter.call(this);

	    if (isObject(top)) {
	        copyList(top, this, ['top', 'right', 'bottom', 'left']);

	        if (top.bottom == null && top.height != null) {
	            this.bottom = this.top + top.height;
	        }
	        if (top.right == null && top.width != null) {
	            this.right = this.left + top.width;
	        }

	        if (top.emitChangeEvents) {
	            this.emitChangeEvents = top.emitChangeEvents;
	        }
	    } else {
	        this.top = top;
	        this.right = right;
	        this.bottom = bottom;
	        this.left = left;
	    }

	    this[0] = this.left;
	    this[1] = this.top;

	    VALIDATE(this);
	};

	inherits(REGION, EventEmitter);

	assign(REGION.prototype, {

	    /**
	     * @cfg {Boolean} emitChangeEvents If this is set to true, the region
	     * will emit 'changesize' and 'changeposition' whenever the size or the position changs
	     */
	    emitChangeEvents: false,

	    /**
	     * Returns this region, or a clone of this region
	     * @param  {Boolean} [clone] If true, this method will return a clone of this region
	     * @return {Region}       This region, or a clone of this
	     */
	    getRegion: function getRegion(clone) {
	        return clone ? this.clone() : this;
	    },

	    /**
	     * Sets the properties of this region to those of the given region
	     * @param {Region/Object} reg The region or object to use for setting properties of this region
	     * @return {Region} this
	     */
	    setRegion: function setRegion(reg) {

	        if (reg instanceof REGION) {
	            this.set(reg.get());
	        } else {
	            this.set(reg);
	        }

	        return this;
	    },

	    /**
	     * Returns true if this region is valid, false otherwise
	     *
	     * @param  {Region} region The region to check
	     * @return {Boolean}        True, if the region is valid, false otherwise.
	     * A region is valid if
	     *  * left <= right  &&
	     *  * top  <= bottom
	     */
	    validate: function validate() {
	        return REGION.validate(this);
	    },

	    _before: function _before() {
	        if (this.emitChangeEvents) {
	            return copyList(this, {}, ['left', 'top', 'bottom', 'right']);
	        }
	    },

	    _after: function _after(before) {
	        if (this.emitChangeEvents) {

	            if (this.top != before.top || this.left != before.left) {
	                this.emitPositionChange();
	            }

	            if (this.right != before.right || this.bottom != before.bottom) {
	                this.emitSizeChange();
	            }
	        }
	    },

	    notifyPositionChange: function notifyPositionChange() {
	        this.emit('changeposition', this);
	    },

	    emitPositionChange: function emitPositionChange() {
	        this.notifyPositionChange();
	    },

	    notifySizeChange: function notifySizeChange() {
	        this.emit('changesize', this);
	    },

	    emitSizeChange: function emitSizeChange() {
	        this.notifySizeChange();
	    },

	    /**
	     * Add the given amounts to each specified side. Example
	     *
	     *      region.add({
	     *          top: 50,    //add 50 px to the top side
	     *          bottom: -100    //substract 100 px from the bottom side
	     *      })
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @return {Region} this
	     */
	    add: function add(directions) {

	        var before = this._before();
	        var direction;

	        for (direction in directions) if (hasOwn(directions, direction)) {
	            this[direction] += directions[direction];
	        }

	        this[0] = this.left;
	        this[1] = this.top;

	        this._after(before);

	        return this;
	    },

	    /**
	     * The same as {@link #add}, but substracts the given values
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @return {Region} this
	     */
	    substract: function substract(directions) {

	        var before = this._before();
	        var direction;

	        for (direction in directions) if (hasOwn(directions, direction)) {
	            this[direction] -= directions[direction];
	        }

	        this[0] = this.left;
	        this[1] = this.top;

	        this._after(before);

	        return this;
	    },

	    /**
	     * Retrieves the size of the region.
	     * @return {Object} An object with {width, height}, corresponding to the width and height of the region
	     */
	    getSize: function getSize() {
	        return {
	            width: this.width,
	            height: this.height
	        };
	    },

	    /**
	     * Move the region to the given position and keeps the region width and height.
	     *
	     * @param {Object} position An object with {top, left} properties. The values in {top,left} are used to move the region by the given amounts.
	     * @param {Number} [position.left]
	     * @param {Number} [position.top]
	     *
	     * @return {Region} this
	     */
	    setPosition: function setPosition(position) {
	        var width = this.width;
	        var height = this.height;

	        if (position.left != undefined) {
	            position.right = position.left + width;
	        }

	        if (position.top != undefined) {
	            position.bottom = position.top + height;
	        }

	        return this.set(position);
	    },

	    /**
	     * Sets both the height and the width of this region to the given size.
	     *
	     * @param {Number} size The new size for the region
	     * @return {Region} this
	     */
	    setSize: function setSize(size) {
	        if (size.height != undefined && size.width != undefined) {
	            return this.set({
	                right: this.left + size.width,
	                bottom: this.top + size.height
	            });
	        }

	        if (size.width != undefined) {
	            this.setWidth(size.width);
	        }

	        if (size.height != undefined) {
	            this.setHeight(size.height);
	        }

	        return this;
	    },

	    /**
	     * @chainable
	     *
	     * Sets the width of this region
	     * @param {Number} width The new width for this region
	     * @return {Region} this
	     */
	    setWidth: function setWidth(width) {
	        return this.set({
	            right: this.left + width
	        });
	    },

	    /**
	     * @chainable
	     *
	     * Sets the height of this region
	     * @param {Number} height The new height for this region
	     * @return {Region} this
	     */
	    setHeight: function setHeight(height) {
	        return this.set({
	            bottom: this.top + height
	        });
	    },

	    /**
	     * Sets the given properties on this region
	     *
	     * @param {Object} directions an object containing top, left, and EITHER bottom, right OR width, height
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @param {Number} [directions.width]
	     * @param {Number} [directions.height]
	     *
	     *
	     * @return {Region} this
	     */
	    set: function set(directions) {
	        var before = this._before();

	        copyList(directions, this, ['left', 'top', 'bottom', 'right']);

	        if (directions.bottom == null && directions.height != null) {
	            this.bottom = this.top + directions.height;
	        }
	        if (directions.right == null && directions.width != null) {
	            this.right = this.left + directions.width;
	        }

	        this[0] = this.left;
	        this[1] = this.top;

	        this._after(before);

	        return this;
	    },

	    /**
	     * Retrieves the given property from this region. If no property is given, return an object
	     * with {left, top, right, bottom}
	     *
	     * @param {String} [dir] the property to retrieve from this region
	     * @return {Number/Object}
	     */
	    get: function get(dir) {
	        return dir ? this[dir] : copyList(this, {}, ['left', 'right', 'top', 'bottom']);
	    },

	    /**
	     * Shifts this region to either top, or left or both.
	     * Shift is similar to {@link #add} by the fact that it adds the given dimensions to top/left sides, but also adds the given dimensions
	     * to bottom and right
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @return {Region} this
	     */
	    shift: function shift(directions) {

	        var before = this._before();

	        if (directions.top) {
	            this.top += directions.top;
	            this.bottom += directions.top;
	        }

	        if (directions.left) {
	            this.left += directions.left;
	            this.right += directions.left;
	        }

	        this[0] = this.left;
	        this[1] = this.top;

	        this._after(before);

	        return this;
	    },

	    /**
	     * Same as {@link #shift}, but substracts the given values
	     * @chainable
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @return {Region} this
	     */
	    unshift: function unshift(directions) {

	        if (directions.top) {
	            directions.top *= -1;
	        }

	        if (directions.left) {
	            directions.left *= -1;
	        }

	        return this.shift(directions);
	    },

	    /**
	     * Compare this region and the given region. Return true if they have all the same size and position
	     * @param  {Region} region The region to compare with
	     * @return {Boolean}       True if this and region have same size and position
	     */
	    equals: function equals(region) {
	        return this.equalsPosition(region) && this.equalsSize(region);
	    },

	    /**
	     * Returns true if this region has the same bottom,right properties as the given region
	     * @param  {Region/Object} size The region to compare against
	     * @return {Boolean}       true if this region is the same size as the given size
	     */
	    equalsSize: function equalsSize(size) {
	        var isInstance = size instanceof REGION;

	        var s = {
	            width: size.width == null && isInstance ? size.getWidth() : size.width,

	            height: size.height == null && isInstance ? size.getHeight() : size.height
	        };
	        return this.getWidth() == s.width && this.getHeight() == s.height;
	    },

	    /**
	     * Returns true if this region has the same top,left properties as the given region
	     * @param  {Region} region The region to compare against
	     * @return {Boolean}       true if this.top == region.top and this.left == region.left
	     */
	    equalsPosition: function equalsPosition(region) {
	        return this.top == region.top && this.left == region.left;
	    },

	    /**
	     * Adds the given ammount to the left side of this region
	     * @param {Number} left The ammount to add
	     * @return {Region} this
	     */
	    addLeft: function addLeft(left) {
	        var before = this._before();

	        this.left = this[0] = this.left + left;

	        this._after(before);

	        return this;
	    },

	    /**
	     * Adds the given ammount to the top side of this region
	     * @param {Number} top The ammount to add
	     * @return {Region} this
	     */
	    addTop: function addTop(top) {
	        var before = this._before();

	        this.top = this[1] = this.top + top;

	        this._after(before);

	        return this;
	    },

	    /**
	     * Adds the given ammount to the bottom side of this region
	     * @param {Number} bottom The ammount to add
	     * @return {Region} this
	     */
	    addBottom: function addBottom(bottom) {
	        var before = this._before();

	        this.bottom += bottom;

	        this._after(before);

	        return this;
	    },

	    /**
	     * Adds the given ammount to the right side of this region
	     * @param {Number} right The ammount to add
	     * @return {Region} this
	     */
	    addRight: function addRight(right) {
	        var before = this._before();

	        this.right += right;

	        this._after(before);

	        return this;
	    },

	    /**
	     * Minimize the top side.
	     * @return {Region} this
	     */
	    minTop: function minTop() {
	        return this.expand({ top: 1 });
	    },
	    /**
	     * Minimize the bottom side.
	     * @return {Region} this
	     */
	    maxBottom: function maxBottom() {
	        return this.expand({ bottom: 1 });
	    },
	    /**
	     * Minimize the left side.
	     * @return {Region} this
	     */
	    minLeft: function minLeft() {
	        return this.expand({ left: 1 });
	    },
	    /**
	     * Maximize the right side.
	     * @return {Region} this
	     */
	    maxRight: function maxRight() {
	        return this.expand({ right: 1 });
	    },

	    /**
	     * Expands this region to the dimensions of the given region, or the document region, if no region is expanded.
	     * But only expand the given sides (any of the four can be expanded).
	     *
	     * @param {Object} directions
	     * @param {Boolean} [directions.top]
	     * @param {Boolean} [directions.bottom]
	     * @param {Boolean} [directions.left]
	     * @param {Boolean} [directions.right]
	     *
	     * @param {Region} [region] the region to expand to, defaults to the document region
	     * @return {Region} this region
	     */
	    expand: function expand(directions, region) {
	        var docRegion = region || REGION.getDocRegion();
	        var list = [];
	        var direction;
	        var before = this._before();

	        for (direction in directions) if (hasOwn(directions, direction)) {
	            list.push(direction);
	        }

	        copyList(docRegion, this, list);

	        this[0] = this.left;
	        this[1] = this.top;

	        this._after(before);

	        return this;
	    },

	    /**
	     * Returns a clone of this region
	     * @return {Region} A new region, with the same position and dimension as this region
	     */
	    clone: function clone() {
	        return new REGION({
	            top: this.top,
	            left: this.left,
	            right: this.right,
	            bottom: this.bottom
	        });
	    },

	    /**
	     * Returns true if this region contains the given point
	     * @param {Number/Object} x the x coordinate of the point
	     * @param {Number} [y] the y coordinate of the point
	     *
	     * @return {Boolean} true if this region constains the given point, false otherwise
	     */
	    containsPoint: function containsPoint(x, y) {
	        if (arguments.length == 1) {
	            y = x.y;
	            x = x.x;
	        }

	        return this.left <= x && x <= this.right && this.top <= y && y <= this.bottom;
	    },

	    /**
	     *
	     * @param region
	     *
	     * @return {Boolean} true if this region contains the given region, false otherwise
	     */
	    containsRegion: function containsRegion(region) {
	        return this.containsPoint(region.left, region.top) && this.containsPoint(region.right, region.bottom);
	    },

	    /**
	     * Returns an object with the difference for {top, bottom} positions betwen this and the given region,
	     *
	     * See {@link #diff}
	     * @param  {Region} region The region to use for diff
	     * @return {Object}        {top,bottom}
	     */
	    diffHeight: function diffHeight(region) {
	        return this.diff(region, { top: true, bottom: true });
	    },

	    /**
	     * Returns an object with the difference for {left, right} positions betwen this and the given region,
	     *
	     * See {@link #diff}
	     * @param  {Region} region The region to use for diff
	     * @return {Object}        {left,right}
	     */
	    diffWidth: function diffWidth(region) {
	        return this.diff(region, { left: true, right: true });
	    },

	    /**
	     * Returns an object with the difference in sizes for the given directions, between this and region
	     *
	     * @param  {Region} region     The region to use for diff
	     * @param  {Object} directions An object with the directions to diff. Can have any of the following keys:
	     *  * left
	     *  * right
	     *  * top
	     *  * bottom
	     *
	     * @return {Object} and object with the same keys as the directions object, but the values being the
	     * differences between this region and the given region
	     */
	    diff: function diff(region, directions) {
	        var result = {};
	        var dirName;

	        for (dirName in directions) if (hasOwn(directions, dirName)) {
	            result[dirName] = this[dirName] - region[dirName];
	        }

	        return result;
	    },

	    /**
	     * Returns the position, in {left,top} properties, of this region
	     *
	     * @return {Object} {left,top}
	     */
	    getPosition: function getPosition() {
	        return {
	            left: this.left,
	            top: this.top
	        };
	    },

	    /**
	     * Returns the point at the given position from this region.
	     *
	     * @param {String} position Any of:
	     *
	     *  * 'cx' - See {@link #getPointXCenter}
	     *  * 'cy' - See {@link #getPointYCenter}
	     *  * 'b'  - See {@link #getPointBottom}
	     *  * 'bc' - See {@link #getPointBottomCenter}
	     *  * 'l'  - See {@link #getPointLeft}F
	     *  * 'lc' - See {@link #getPointLeftCenter}
	     *  * 't'  - See {@link #getPointTop}
	     *  * 'tc' - See {@link #getPointTopCenter}
	     *  * 'r'  - See {@link #getPointRight}
	     *  * 'rc' - See {@link #getPointRightCenter}
	     *  * 'c'  - See {@link #getPointCenter}
	     *  * 'tl' - See {@link #getPointTopLeft}
	     *  * 'bl' - See {@link #getPointBottomLeft}
	     *  * 'br' - See {@link #getPointBottomRight}
	     *  * 'tr' - See {@link #getPointTopRight}
	     *
	     * @param {Boolean} asLeftTop
	     *
	     * @return {Object} either an object with {x,y} or {left,top} if asLeftTop is true
	     */
	    getPoint: function getPoint(position, asLeftTop) {

	        //<debug>
	        if (!POINT_POSITIONS[position]) {
	            console.warn('The position ', position, ' could not be found! Available options are tl, bl, tr, br, l, r, t, b.');
	        }
	        //</debug>

	        var method = 'getPoint' + POINT_POSITIONS[position],
	            result = this[method]();

	        if (asLeftTop) {
	            return {
	                left: result.x,
	                top: result.y
	            };
	        }

	        return result;
	    },

	    /**
	     * Returns a point with x = null and y being the middle of the left region segment
	     * @return {Object} {x,y}
	     */
	    getPointYCenter: function getPointYCenter() {
	        return { x: null, y: this.top + this.getHeight() / 2 };
	    },

	    /**
	     * Returns a point with y = null and x being the middle of the top region segment
	     * @return {Object} {x,y}
	     */
	    getPointXCenter: function getPointXCenter() {
	        return { x: this.left + this.getWidth() / 2, y: null };
	    },

	    /**
	     * Returns a point with x = null and y the region top position on the y axis
	     * @return {Object} {x,y}
	     */
	    getPointTop: function getPointTop() {
	        return { x: null, y: this.top };
	    },

	    /**
	     * Returns a point that is the middle point of the region top segment
	     * @return {Object} {x,y}
	     */
	    getPointTopCenter: function getPointTopCenter() {
	        return { x: this.left + this.getWidth() / 2, y: this.top };
	    },

	    /**
	     * Returns a point that is the top-left point of the region
	     * @return {Object} {x,y}
	     */
	    getPointTopLeft: function getPointTopLeft() {
	        return { x: this.left, y: this.top };
	    },

	    /**
	     * Returns a point that is the top-right point of the region
	     * @return {Object} {x,y}
	     */
	    getPointTopRight: function getPointTopRight() {
	        return { x: this.right, y: this.top };
	    },

	    /**
	     * Returns a point with x = null and y the region bottom position on the y axis
	     * @return {Object} {x,y}
	     */
	    getPointBottom: function getPointBottom() {
	        return { x: null, y: this.bottom };
	    },

	    /**
	     * Returns a point that is the middle point of the region bottom segment
	     * @return {Object} {x,y}
	     */
	    getPointBottomCenter: function getPointBottomCenter() {
	        return { x: this.left + this.getWidth() / 2, y: this.bottom };
	    },

	    /**
	     * Returns a point that is the bottom-left point of the region
	     * @return {Object} {x,y}
	     */
	    getPointBottomLeft: function getPointBottomLeft() {
	        return { x: this.left, y: this.bottom };
	    },

	    /**
	     * Returns a point that is the bottom-right point of the region
	     * @return {Object} {x,y}
	     */
	    getPointBottomRight: function getPointBottomRight() {
	        return { x: this.right, y: this.bottom };
	    },

	    /**
	     * Returns a point with y = null and x the region left position on the x axis
	     * @return {Object} {x,y}
	     */
	    getPointLeft: function getPointLeft() {
	        return { x: this.left, y: null };
	    },

	    /**
	     * Returns a point that is the middle point of the region left segment
	     * @return {Object} {x,y}
	     */
	    getPointLeftCenter: function getPointLeftCenter() {
	        return { x: this.left, y: this.top + this.getHeight() / 2 };
	    },

	    /**
	     * Returns a point with y = null and x the region right position on the x axis
	     * @return {Object} {x,y}
	     */
	    getPointRight: function getPointRight() {
	        return { x: this.right, y: null };
	    },

	    /**
	     * Returns a point that is the middle point of the region right segment
	     * @return {Object} {x,y}
	     */
	    getPointRightCenter: function getPointRightCenter() {
	        return { x: this.right, y: this.top + this.getHeight() / 2 };
	    },

	    /**
	     * Returns a point that is the center of the region
	     * @return {Object} {x,y}
	     */
	    getPointCenter: function getPointCenter() {
	        return { x: this.left + this.getWidth() / 2, y: this.top + this.getHeight() / 2 };
	    },

	    /**
	     * @return {Number} returns the height of the region
	     */
	    getHeight: function getHeight() {
	        return this.bottom - this.top;
	    },

	    /**
	     * @return {Number} returns the width of the region
	     */
	    getWidth: function getWidth() {
	        return this.right - this.left;
	    },

	    /**
	     * @return {Number} returns the top property of the region
	     */
	    getTop: function getTop() {
	        return this.top;
	    },

	    /**
	     * @return {Number} returns the left property of the region
	     */
	    getLeft: function getLeft() {
	        return this.left;
	    },

	    /**
	     * @return {Number} returns the bottom property of the region
	     */
	    getBottom: function getBottom() {
	        return this.bottom;
	    },

	    /**
	     * @return {Number} returns the right property of the region
	     */
	    getRight: function getRight() {
	        return this.right;
	    },

	    /**
	     * Returns the area of the region
	     * @return {Number} the computed area
	     */
	    getArea: function getArea() {
	        return this.getWidth() * this.getHeight();
	    },

	    constrainTo: function constrainTo(contrain) {
	        var intersect = this.getIntersection(contrain);
	        var shift;

	        if (!intersect || !intersect.equals(this)) {

	            var contrainWidth = contrain.getWidth(),
	                contrainHeight = contrain.getHeight();

	            if (this.getWidth() > contrainWidth) {
	                this.left = contrain.left;
	                this.setWidth(contrainWidth);
	            }

	            if (this.getHeight() > contrainHeight) {
	                this.top = contrain.top;
	                this.setHeight(contrainHeight);
	            }

	            shift = {};

	            if (this.right > contrain.right) {
	                shift.left = contrain.right - this.right;
	            }

	            if (this.bottom > contrain.bottom) {
	                shift.top = contrain.bottom - this.bottom;
	            }

	            if (this.left < contrain.left) {
	                shift.left = contrain.left - this.left;
	            }

	            if (this.top < contrain.top) {
	                shift.top = contrain.top - this.top;
	            }

	            this.shift(shift);

	            return true;
	        }

	        return false;
	    },

	    __IS_REGION: true

	    /**
	     * @property {Number} top
	     */

	    /**
	     * @property {Number} right
	     */

	    /**
	     * @property {Number} bottom
	     */

	    /**
	     * @property {Number} left
	     */

	    /**
	     * @property {Number} [0] the top property
	     */

	    /**
	     * @property {Number} [1] the left property
	     */

	    /**
	     * @method getIntersection
	     * Returns a region that is the intersection of this region and the given region
	     * @param  {Region} region The region to intersect with
	     * @return {Region}        The intersection region
	     */

	    /**
	     * @method getUnion
	     * Returns a region that is the union of this region with the given region
	     * @param  {Region} region  The region to make union with
	     * @return {Region}        The union region. The smallest region that contains both this and the given region.
	     */

	});

	Object.defineProperties(REGION.prototype, {
	    width: {
	        get: function get() {
	            return this.getWidth();
	        },
	        set: function set(width) {
	            return this.setWidth(width);
	        }
	    },
	    height: {
	        get: function get() {
	            return this.getHeight();
	        },
	        set: function set(height) {
	            return this.setHeight(height);
	        }
	    }
	});

	__webpack_require__(14)(REGION);

	module.exports = REGION;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;

	function curry(fn, n) {

	    if (typeof n !== 'number') {
	        n = fn.length;
	    }

	    function getCurryClosure(prevArgs) {

	        function curryClosure() {

	            var len = arguments.length;
	            var args = [].concat(prevArgs);

	            if (len) {
	                args.push.apply(args, arguments);
	            }

	            if (args.length < n) {
	                return getCurryClosure(args);
	            }

	            return fn.apply(this, args);
	        }

	        return curryClosure;
	    }

	    return getCurryClosure([]);
	}

	module.exports = curry(function (object, property) {
	    return hasOwn.call(object, property);
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getInstantiatorFunction = __webpack_require__(10);

	module.exports = function (fn, args) {
		return getInstantiatorFunction(args.length)(fn, args);
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = (function () {

	    'use strict';

	    var fns = {};

	    return function (len) {

	        if (!fns[len]) {

	            var args = [];
	            var i = 0;

	            for (; i < len; i++) {
	                args.push('a[' + i + ']');
	            }

	            fns[len] = new Function('c', 'a', 'return new c(' + args.join(',') + ')');
	        }

	        return fns[len];
	    };
	})();

/***/ },
/* 11 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++) args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++) args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type]) ret = 0;else if (isFunction(emitter._events[type])) ret = 1;else ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	            value: ctor,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        }
	    });
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @static
	 * Returns true if the given region is valid, false otherwise.
	 * @param  {Region} region The region to check
	 * @return {Boolean}        True, if the region is valid, false otherwise.
	 * A region is valid if
	 *  * left <= right  &&
	 *  * top  <= bottom
	 */
	module.exports = function validate(region) {

	    var isValid = true;

	    if (region.right < region.left) {
	        isValid = false;
	        region.right = region.left;
	    }

	    if (region.bottom < region.top) {
	        isValid = false;
	        region.bottom = region.top;
	    }

	    return isValid;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn = __webpack_require__(8);
	var VALIDATE = __webpack_require__(13);

	module.exports = function (REGION) {

	    var MAX = Math.max;
	    var MIN = Math.min;

	    var statics = {
	        init: function init() {
	            var exportAsNonStatic = {
	                getIntersection: true,
	                getIntersectionArea: true,
	                getIntersectionHeight: true,
	                getIntersectionWidth: true,
	                getUnion: true
	            };
	            var thisProto = REGION.prototype;
	            var newName;

	            var exportHasOwn = hasOwn(exportAsNonStatic);
	            var methodName;

	            for (methodName in exportAsNonStatic) if (exportHasOwn(methodName)) {
	                newName = exportAsNonStatic[methodName];
	                if (typeof newName != 'string') {
	                    newName = methodName;
	                }

	                ;(function (proto, methodName, protoMethodName) {

	                    proto[methodName] = function (region) {
	                        //<debug>
	                        if (!REGION[protoMethodName]) {
	                            console.warn('cannot find method ', protoMethodName, ' on ', REGION);
	                        }
	                        //</debug>
	                        return REGION[protoMethodName](this, region);
	                    };
	                })(thisProto, newName, methodName);
	            }
	        },

	        validate: VALIDATE,

	        /**
	         * Returns the region corresponding to the documentElement
	         * @return {Region} The region corresponding to the documentElement. This region is the maximum region visible on the screen.
	         */
	        getDocRegion: function getDocRegion() {
	            return REGION.fromDOM(document.documentElement);
	        },

	        from: function from(reg) {
	            if (reg.__IS_REGION) {
	                return reg;
	            }

	            if (typeof document != 'undefined') {
	                if (typeof HTMLElement != 'undefined' && reg instanceof HTMLElement) {
	                    return REGION.fromDOM(reg);
	                }

	                if (reg.type && typeof reg.pageX !== 'undefined' && typeof reg.pageY !== 'undefined') {
	                    return REGION.fromEvent(reg);
	                }
	            }

	            return REGION(reg);
	        },

	        fromEvent: function fromEvent(event) {
	            return REGION.fromPoint({
	                x: event.pageX,
	                y: event.pageY
	            });
	        },

	        fromDOM: function fromDOM(dom) {
	            var rect = dom.getBoundingClientRect();
	            // var docElem = document.documentElement
	            // var win     = window

	            // var top  = rect.top + win.pageYOffset - docElem.clientTop
	            // var left = rect.left + win.pageXOffset - docElem.clientLeft

	            return new REGION({
	                top: rect.top,
	                left: rect.left,
	                bottom: rect.bottom,
	                right: rect.right
	            });
	        },

	        /**
	         * @static
	         * Returns a region that is the intersection of the given two regions
	         * @param  {Region} first  The first region
	         * @param  {Region} second The second region
	         * @return {Region/Boolean}        The intersection region or false if no intersection found
	         */
	        getIntersection: function getIntersection(first, second) {

	            var area = this.getIntersectionArea(first, second);

	            if (area) {
	                return new REGION(area);
	            }

	            return false;
	        },

	        getIntersectionWidth: function getIntersectionWidth(first, second) {
	            var minRight = MIN(first.right, second.right);
	            var maxLeft = MAX(first.left, second.left);

	            if (maxLeft < minRight) {
	                return minRight - maxLeft;
	            }

	            return 0;
	        },

	        getIntersectionHeight: function getIntersectionHeight(first, second) {
	            var maxTop = MAX(first.top, second.top);
	            var minBottom = MIN(first.bottom, second.bottom);

	            if (maxTop < minBottom) {
	                return minBottom - maxTop;
	            }

	            return 0;
	        },

	        getIntersectionArea: function getIntersectionArea(first, second) {
	            var maxTop = MAX(first.top, second.top);
	            var minRight = MIN(first.right, second.right);
	            var minBottom = MIN(first.bottom, second.bottom);
	            var maxLeft = MAX(first.left, second.left);

	            if (maxTop < minBottom && maxLeft < minRight) {
	                return {
	                    top: maxTop,
	                    right: minRight,
	                    bottom: minBottom,
	                    left: maxLeft,

	                    width: minRight - maxLeft,
	                    height: minBottom - maxTop
	                };
	            }

	            return false;
	        },

	        /**
	         * @static
	         * Returns a region that is the union of the given two regions
	         * @param  {Region} first  The first region
	         * @param  {Region} second The second region
	         * @return {Region}        The union region. The smallest region that contains both given regions.
	         */
	        getUnion: function getUnion(first, second) {
	            var top = MIN(first.top, second.top);
	            var right = MAX(first.right, second.right);
	            var bottom = MAX(first.bottom, second.bottom);
	            var left = MIN(first.left, second.left);

	            return new REGION(top, right, bottom, left);
	        },

	        /**
	         * @static
	         * Returns a region. If the reg argument is a region, returns it, otherwise return a new region built from the reg object.
	         *
	         * @param  {Region} reg A region or an object with either top, left, bottom, right or
	         * with top, left, width, height
	         * @return {Region} A region
	         */
	        getRegion: function getRegion(reg) {
	            return REGION.from(reg);
	        },

	        /**
	         * Creates a region that corresponds to a point.
	         *
	         * @param  {Object} xy The point
	         * @param  {Number} xy.x
	         * @param  {Number} xy.y
	         *
	         * @return {Region}    The new region, with top==xy.y, bottom = xy.y and left==xy.x, right==xy.x
	         */
	        fromPoint: function fromPoint(xy) {
	            return new REGION({
	                top: xy.y,
	                bottom: xy.y,
	                left: xy.x,
	                right: xy.x
	            });
	        }
	    };

	    Object.keys(statics).forEach(function (key) {
	        REGION[key] = statics[key];
	    });

	    REGION.init();
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var Region = __webpack_require__(6);
	var assign = __webpack_require__(2);
	var DragHelper = __webpack_require__(16);
	var toHsv = __webpack_require__(3).toHsv;

	function emptyFn() {}

	exports['default'] = {

	    toColorValue: function toColorValue(value) {
	        if (typeof value == 'string') {
	            return toHsv(value);
	        }

	        return {
	            h: value.h,
	            s: value.s,
	            v: value.v,
	            a: value.a
	        };
	    },

	    onMouseDown: function onMouseDown(event) {
	        event.preventDefault();

	        var region = Region.fromDOM(this.getDOMNode());
	        var info = this.getEventInfo(event, region);

	        DragHelper(event, {
	            scope: this,

	            constrainTo: region,

	            onDragStart: function onDragStart(event, config) {
	                config.initialPoint = info;

	                config.minLeft = 0;
	                config.maxLeft = region.width;

	                this.handleDragStart(event);
	            },
	            onDrag: function onDrag(event, config) {
	                var info = this.getEventInfo(event, region);

	                config.minLeft = 0;
	                config.maxLeft = region.width;

	                this.updateColor(info);
	                this.handleDrag(event, config);
	            },
	            onDrop: function onDrop(event, config) {
	                var info = this.getEventInfo(event, region);

	                this.updateColor(info);

	                this.handleDrop(event, config);
	            }
	        });

	        this.updateColor(info);
	        this.handleMouseDown(event, { initialPoint: info });
	    },

	    handleMouseDown: function handleMouseDown(event, config) {

	        ;(this.props.onMouseDown || emptyFn).apply(this, this.getColors());
	        this.handleDrag(event, config);
	    },

	    handleUpdate: function handleUpdate(event, config) {

	        var diff = config.diff || { top: 0, left: 0 };
	        var initialPoint = config.initialPoint;

	        if (initialPoint) {

	            var top;
	            var left;

	            left = initialPoint.x + diff.left;
	            top = initialPoint.y + diff.top;

	            if (config.minLeft) left = Math.max(left, config.minLeft);
	            if (config.maxLeft) left = Math.min(left, config.maxLeft);

	            this.state.top = top;
	            this.state.left = left;

	            this.state.mouseDown = {
	                x: left,
	                y: top,
	                width: initialPoint.width,
	                height: initialPoint.height
	            };
	        }

	        if (this.props.inPicker) {
	            //the picker handles the values
	            return;
	        }

	        if (!this.props.value) {
	            this.setState({
	                value: this.hsv
	            });
	        }
	    },

	    handleDragStart: function handleDragStart(event) {},

	    handleDrag: function handleDrag(event, config) {
	        this.handleUpdate(event, config);(this.props.onDrag || emptyFn).apply(this, this.getColors());
	    },

	    handleDrop: function handleDrop(event, config) {
	        this.handleUpdate(event, config);
	        this.state.mouseDown = false;(this.props.onChange || emptyFn).apply(this, this.getColors());
	    },

	    getColors: function getColors() {
	        var first = this.props.inPicker ? this.hsv : this.toStringValue(this.hsv);
	        var args = [first];

	        if (!this.props.inPicker) {
	            args.push(assign({}, this.hsv));
	        }

	        return args;
	    },

	    getEventInfo: function getEventInfo(event, region) {
	        region = region || Region.fromDOM(this.getDOMNode());

	        var origin = event.touches ? event.touches[0] : event;

	        if (origin) {
	            var x = origin.clientX - region.left;
	            var y = origin.clientY - region.top;
	        } else {
	            var x = 0;
	            var y = 0;
	        }

	        return {
	            x: x,
	            y: y,
	            width: region.getWidth(),
	            height: region.getHeight()
	        };
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(2);
	var Region = __webpack_require__(17);
	var hasTouch = __webpack_require__(22);
	var once = __webpack_require__(23);

	var Helper = function Helper(config) {
	    this.config = config;
	};

	var EVENTS = {
	    move: hasTouch ? 'touchmove' : 'mousemove',
	    up: hasTouch ? 'touchend' : 'mouseup'
	};

	function emptyFn() {}

	function getPageCoords(event) {
	    var firstTouch;

	    var pageX = event.pageX;
	    var pageY = event.pageY;

	    if (hasTouch && event.touches && (firstTouch = event.touches[0])) {
	        pageX = firstTouch.pageX;
	        pageY = firstTouch.pageY;
	    }

	    return {
	        pageX: pageX,
	        pageY: pageY
	    };
	}

	assign(Helper.prototype, {

	    /**
	     * Should be called on a mousedown event
	     *
	     * @param  {Event} event
	     * @return {[type]}       [description]
	     */
	    initDrag: function initDrag(event) {

	        this.onDragInit(event);

	        var onDragStart = once(this.onDragStart, this);
	        var target = hasTouch ? event.target : window;

	        var mouseMoveListener = (function (event) {
	            onDragStart(event);
	            this.onDrag(event);
	        }).bind(this);

	        var mouseUpListener = (function (event) {

	            this.onDrop(event);

	            target.removeEventListener(EVENTS.move, mouseMoveListener);
	            target.removeEventListener(EVENTS.up, mouseUpListener);
	        }).bind(this);

	        target.addEventListener(EVENTS.move, mouseMoveListener, false);
	        target.addEventListener(EVENTS.up, mouseUpListener);
	    },

	    onDragInit: function onDragInit(event) {

	        var config = {
	            diff: {
	                left: 0,
	                top: 0
	            }
	        };
	        this.state = {
	            config: config
	        };

	        if (this.config.region) {
	            this.state.initialRegion = Region.from(this.config.region);
	            this.state.dragRegion = config.dragRegion = this.state.initialRegion.clone();
	        }
	        if (this.config.constrainTo) {
	            this.state.constrainTo = Region.from(this.config.constrainTo);
	        }

	        this.callConfig('onDragInit', event);
	    },

	    /**
	     * Called when the first mousemove event occurs after drag is initialized
	     * @param  {Event} event
	     */
	    onDragStart: function onDragStart(event) {
	        this.state.initPageCoords = getPageCoords(event);

	        this.state.didDrag = this.state.config.didDrag = true;
	        this.callConfig('onDragStart', event);
	    },

	    /**
	     * Called on all mousemove events after drag is initialized.
	     *
	     * @param  {Event} event
	     */
	    onDrag: function onDrag(event) {

	        var config = this.state.config;

	        var initPageCoords = this.state.initPageCoords;
	        var eventCoords = getPageCoords(event);

	        var diff = config.diff = {
	            left: eventCoords.pageX - initPageCoords.pageX,
	            top: eventCoords.pageY - initPageCoords.pageY
	        };

	        if (this.state.initialRegion) {
	            var dragRegion = config.dragRegion;

	            //set the dragRegion to initial coords
	            dragRegion.set(this.state.initialRegion);

	            //shift it to the new position
	            dragRegion.shift(diff);

	            if (this.state.constrainTo) {
	                //and finally constrain it if it's the case
	                dragRegion.constrainTo(this.state.constrainTo);

	                diff.left = dragRegion.left - this.state.initialRegion.left;
	                diff.top = dragRegion.top - this.state.initialRegion.top;
	            }

	            config.dragRegion = dragRegion;
	        }

	        this.callConfig('onDrag', event);
	    },

	    /**
	     * Called on the mouseup event on window
	     *
	     * @param  {Event} event
	     */
	    onDrop: function onDrop(event) {
	        this.callConfig('onDrop', event);

	        this.state = null;
	    },

	    callConfig: function callConfig(fnName, event) {
	        var config = this.state.config;
	        var args = [event, config];

	        var fn = this.config[fnName];

	        if (fn) {
	            fn.apply(this, args);
	        }
	    }

	});

	module.exports = function (event, config) {

	    if (config.scope) {
	        var skippedKeys = {
	            scope: 1,
	            region: 1,
	            constrainTo: 1
	        };

	        Object.keys(config).forEach(function (key) {
	            var value = config[key];

	            if (key in skippedKeys) {
	                return;
	            }

	            if (typeof value == 'function') {
	                config[key] = value.bind(config.scope);
	            }
	        });
	    }
	    var helper = new Helper(config);

	    helper.initDrag(event);

	    return helper;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Region = __webpack_require__(6);

	__webpack_require__(18);
	__webpack_require__(19);

	var COMPUTE_ALIGN_REGION = __webpack_require__(20);

	/**
	 * region-align module exposes methods for aligning {@link Element} and {@link Region} instances
	 *
	 * The #alignTo method aligns this to the target element/region using the specified positions. See #alignTo for a graphical example.
	 *
	 *
	 *      var div = Element.select('div.first')
	 *
	 *      div.alignTo(Element.select('body') , 'br-br')
	 *
	 *      //aligns the div to be in the bottom-right corner of the body
	 *
	 * Other useful methods
	 *
	 *  * {@link #alignRegions} - aligns a given source region to a target region
	 *  * {@link #COMPUTE_ALIGN_REGION} - given a source region and a target region, and alignment positions, returns a clone of the source region, but aligned to satisfy the given alignments
	 */

	/**
	 * Aligns sourceRegion to targetRegion. It modifies the sourceRegion in order to perform the correct alignment.
	 * See #COMPUTE_ALIGN_REGION for details and examples.
	 *
	 * This method calls #COMPUTE_ALIGN_REGION passing to it all its arguments. The #COMPUTE_ALIGN_REGION method returns a region that is properly aligned.
	 * If this returned region position/size differs from sourceRegion, then the sourceRegion is modified to be an exact copy of the aligned region.
	 *
	 * @inheritdoc #COMPUTE_ALIGN_REGION
	 * @return {String} the position used for alignment
	 */
	Region.alignRegions = function (sourceRegion, targetRegion, positions, config) {

	    var result = COMPUTE_ALIGN_REGION(sourceRegion, targetRegion, positions, config);
	    var alignedRegion = result.region;

	    if (!alignedRegion.equals(sourceRegion)) {
	        sourceRegion.setRegion(alignedRegion);
	    }

	    return result.position;
	};

	/**
	 *
	 * The #alignTo method aligns this to the given target region, using the specified alignment position(s).
	 * You can also specify a constrain for the alignment.
	 *
	 * Example
	 *
	 *      BIG
	 *      ________________________
	 *      |  _______              |
	 *      | |       |             |
	 *      | |   A   |             |
	 *      | |       |      _____  |
	 *      | |_______|     |     | |
	 *      |               |  B  | |
	 *      |               |     | |
	 *      |_______________|_____|_|
	 *
	 * Assume the *BIG* outside rectangle is our constrain region, and you want to align the *A* rectangle
	 * to the *B* rectangle. Ideally, you'll want their tops to be aligned, and *A* to be placed at the right side of *B*
	 *
	 *
	 *      //so we would align them using
	 *
	 *      A.alignTo(B, 'tl-tr', { constrain: BIG })
	 *
	 * But this would result in
	 *
	 *       BIG
	 *      ________________________
	 *      |                       |
	 *      |                       |
	 *      |                       |
	 *      |                _____ _|_____
	 *      |               |     | .     |
	 *      |               |  B  | . A   |
	 *      |               |     | .     |
	 *      |_______________|_____|_._____|
	 *
	 *
	 * Which is not what we want. So we specify an array of options to try
	 *
	 *      A.alignTo(B, ['tl-tr', 'tr-tl'], { constrain: BIG })
	 *
	 * So by this we mean: try to align A(top,left) with B(top,right) and stick to the BIG constrain. If this is not possible,
	 * try the next option: align A(top,right) with B(top,left)
	 *
	 * So this is what we end up with
	 *
	 *      BIG
	 *      ________________________
	 *      |                       |
	 *      |                       |
	 *      |                       |
	 *      |        _______ _____  |
	 *      |       |       |     | |
	 *      |       |   A   |  B  | |
	 *      |       |       |     | |
	 *      |_______|_______|_____|_|
	 *
	 *
	 * Which is a lot better!
	 *
	 * @param {Element/Region} target The target to which to align this alignable.
	 *
	 * @param {String[]/String} positions The positions for the alignment.
	 *
	 * Example:
	 *
	 *      'br-tl'
	 *      ['br-tl','br-tr','cx-tc']
	 *
	 * This method will try to align using the first position. But if there is a constrain region, that position might not satisfy the constrain.
	 * If this is the case, the next positions will be tried. If one of them satifies the constrain, it will be used for aligning and it will be returned from this method.
	 *
	 * If no position matches the contrain, the one with the largest intersection of the source region with the constrain will be used, and this alignable will be resized to fit the constrain region.
	 *
	 * @param {Object} config A config object with other configuration for this method
	 *
	 * @param {Array[]/Object[]/Object} config.offset The offset to use for aligning. If more that one offset is specified, then offset at a given index is used with the position at the same index.
	 *
	 * An offset can have the following form:
	 *
	 *      [left_offset, top_offset]
	 *      {left: left_offset, top: top_offset}
	 *      {x: left_offset, y: top_offset}
	 *
	 * You can pass one offset or an array of offsets. In case you pass just one offset,
	 * it cannot have the array form, so you cannot call
	 *
	 *      this.alignTo(target, positions, [10, 20])
	 *
	 * If you do, it will not be considered. Instead, please use
	 *
	 *      this.alignTo(target, positions, {x: 10, y: 20})
	 *
	 * Or
	 *
	 *      this.alignTo(target, positions, [[10, 20]] )
	 *
	 * @param {Boolean/Element/Region} config.constrain If boolean, target will be constrained to the document region, otherwise,
	 * getRegion will be called on this argument to determine the region we need to constrain to.
	 *
	 * @param {Boolean/Object} config.sync Either boolean or an object with {width, height}. If it is boolean,
	 * both width and height will be synced. If directions are specified, will only sync the direction which is specified as true
	 *
	 * @return {String}
	 *
	 */
	Region.prototype.alignTo = function (target, positions, config) {

	    config = config || {};

	    var sourceRegion = this;
	    var targetRegion = Region.from(target);

	    var result = COMPUTE_ALIGN_REGION(sourceRegion, targetRegion, positions, config);
	    var resultRegion = result.region;

	    if (!resultRegion.equalsSize(sourceRegion)) {
	        this.setSize(resultRegion.getSize());
	    }
	    if (!resultRegion.equalsPosition(sourceRegion)) {
	        this.setPosition(resultRegion.getPosition(), { absolute: !!config.absolute });
	    }

	    return result.position;
	};

	module.exports = Region;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Region = __webpack_require__(6);

	/**
	 * @static
	 * Aligns the source region to the target region, so as to correspond to the given alignment.
	 *
	 * NOTE that this method makes changes on the sourceRegion in order for it to be aligned as specified.
	 *
	 * @param {Region} sourceRegion
	 * @param {Region} targetRegion
	 *
	 * @param {String} align A string with 2 valid align positions, eg: 'tr-bl'.
	 * For valid positions, see {@link Region#getPoint}
	 *
	 * Having 2 regions, we need to be able to align them as we wish:
	 *
	 * for example, if we have
	 *
	 *       source    target
	 *       ________________
	 *       ____
	 *      |    |     ________
	 *      |____|    |        |
	 *                |        |
	 *                |________|
	 *
	 * and we align 't-t', we get:
	 *
	 *       source    target
	 *       _________________
	 *
	 *       ____      ________
	 *      |    |    |        |
	 *      |____|    |        |
	 *                |________|
	 *
	 *  In this case, the source was moved down to be aligned to the top of the target
	 *
	 *
	 * and if we align 'tc-tc' we get
	 *
	 *       source     target
	 *       __________________
	 *
	 *                 ________
	 *                | |    | |
	 *                | |____| |
	 *                |________|
	 *
	 *  Since the source was moved to have the top-center point to be the same with target top-center
	 *
	 *
	 *
	 * @return {RegionClass} The Region class
	 */
	Region.align = function (sourceRegion, targetRegion, align) {

	    targetRegion = Region.from(targetRegion);

	    align = (align || 'c-c').split('-');

	    //<debug>
	    if (align.length != 2) {
	        console.warn('Incorrect region alignment! The align parameter need to be in the form \'br-c\', that is, a - separated string!', align);
	    }
	    //</debug>

	    return Region.alignToPoint(sourceRegion, targetRegion.getPoint(align[1]), align[0]);
	};

	/**
	 * Modifies the given region to be aligned to the point, as specified by anchor
	 *
	 * @param {Region} region The region to align to the point
	 * @param {Object} point The point to be used as a reference
	 * @param {Number} point.x
	 * @param {Number} point.y
	 * @param {String} anchor The position where to anchor the region to the point. See {@link #getPoint} for available options/
	 *
	 * @return {Region} the given region
	 */
	Region.alignToPoint = function (region, point, anchor) {

	    region = Region.from(region);

	    var sourcePoint = region.getPoint(anchor);
	    var count = 0;
	    var shiftObj = {};

	    if (sourcePoint.x != null && point.x != null) {

	        count++;
	        shiftObj.left = point.x - sourcePoint.x;
	    }

	    if (sourcePoint.y != null && point.y != null) {
	        count++;
	        shiftObj.top = point.y - sourcePoint.y;
	    }

	    if (count) {

	        region.shift(shiftObj);
	    }

	    return region;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Region = __webpack_require__(6);

	/**
	 *
	 * Aligns this region to the given region
	 * @param {Region} region
	 * @param {String} alignPositions For available positions, see {@link #getPoint}
	 *
	 *     eg: 'tr-bl'
	 *
	 * @return this
	 */
	Region.prototype.alignToRegion = function (region, alignPositions) {
	  Region.align(this, region, alignPositions);

	  return this;
	};

	/**
	 * Aligns this region to the given point, in the anchor position
	 * @param {Object} point eg: {x: 20, y: 600}
	 * @param {Number} point.x
	 * @param {Number} point.y
	 *
	 * @param {String} anchor For available positions, see {@link #getPoint}
	 *
	 *     eg: 'bl'
	 *
	 * @return this
	 */
	Region.prototype.alignToPoint = function (point, anchor) {
	  Region.alignToPoint(this, point, anchor);

	  return this;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ALIGN_TO_NORMALIZED = __webpack_require__(21);

	var Region = __webpack_require__(6);

	/**
	 * @localdoc Given source and target regions, and the given alignments required, returns a region that is the resulting allignment.
	 * Does not modify the sourceRegion.
	 *
	 * Example
	 *
	 *      var sourceRegion = zippy.getInstance({
	 *          alias  : 'z.region',
	 *          top    : 10,
	 *          left   : 10,
	 *          bottom : 40,
	 *          right  : 100
	 *      })
	 *
	 *      var targetRegion = zippy.getInstance({
	 *          alias  : 'z.region',
	 *          top    : 10,
	 *          left   : 10,
	 *          bottom : 40,
	 *          right  : 100
	 *      })
	 *      //has top-left at (10,10)
	 *      //and bottom-right at (40, 100)
	 *
	 *      var alignRegion = alignable.COMPUTE_ALIGN_REGION(sourceRegion, targetRegion, 'tl-br')
	 *
	 *      //alignRegion will be a clone of sourceRegion, but will have the
	 *      //top-left corner aligned with bottom-right of targetRegion
	 *
	 *      alignRegion.get() // => { top: 40, left: 100, bottom: 70, right: 190 }
	 *
	 * @param  {Region} sourceRegion The source region to align to targetRegion
	 * @param  {Region} targetRegion The target region to which to align the sourceRegion
	 * @param  {String/String[]} positions    A string ( delimited by "-" characters ) or an array of strings with the position to try, in the order of their priority.
	 * See Region#getPoint for a list of available positions. They can be combined in any way.
	 * @param  {Object} config      A config object with other configuration for the alignment
	 * @param  {Object/Object[]} config.offset      Optional offsets. Either an object or an array with a different offset for each position
	 * @param  {Element/Region/Boolean} config.constrain  The constrain to region or element. If the boolean true, Region.getDocRegion() will be used
	 * @param  {Object/Boolean} config.sync   A boolean object that indicates whether to sync sourceRegion and targetRegion sizes (width/height or both). Can be
	 *
	 *  * true - in order to sync both width and height
	 *  * { width: true }  - to only sync width
	 *  * { height: true } - to only sync height
	 *  * { size: true }   - to sync both width and height
	 *
	 * @return {Object} an object with the following keys:
	 *
	 *  * position - the position where the alignment was made. One of the given positions
	 *  * region   - the region where the alignment is in place
	 *  * positionChanged - boolean value indicating if the position of the returned region is different from the position of sourceRegion
	 *  * widthChanged    - boolean value indicating if the width of the returned region is different from the width of sourceRegion
	 *  * heightChanged   - boolean value indicating if the height of the returned region is different from the height of sourceRegion
	 */
	function COMPUTE_ALIGN_REGION(sourceRegion, targetRegion, positions, config) {
	    sourceRegion = Region.from(sourceRegion);

	    var sourceClone = sourceRegion.clone();
	    var position = ALIGN_TO_NORMALIZED(sourceClone, targetRegion, positions, config);

	    return {
	        position: position,
	        region: sourceClone,
	        widthChanged: sourceClone.getWidth() != sourceRegion.getWidth(),
	        heightChanged: sourceClone.getHeight() != sourceRegion.getHeight(),
	        positionChanged: sourceClone.equalsPosition(sourceRegion)
	    };
	}

	module.exports = COMPUTE_ALIGN_REGION;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Region = __webpack_require__(6);

	/**
	 *
	 * This method is trying to align the sourceRegion to the targetRegion, given the alignment positions
	 * and the offsets. It only modifies the sourceRegion
	 *
	 * This is all well and easy, but if there is a constrainTo region, the algorithm has to take it into account.
	 * In this case, it works as follows.
	 *
	 *  * start with the first alignment position. Aligns the region, adds the offset and then check for the constraint.
	 *  * if the constraint condition is ok, return the position.
	 *  * otherwise, remember the intersection area, if the regions are intersecting.
	 *  * then go to the next specified align position, and so on, computing the maximum intersection area.
	 *
	 * If no alignment fits the constrainRegion, the sourceRegion will be resized to match it,
	 * using the position with the maximum intersection area.
	 *
	 * Since we have computed the index of the position with the max intersection area, take that position,
	 * and align the sourceRegion accordingly. Then resize the sourceRegion to the intersection, and reposition
	 * it again, since resizing it might have destroyed the alignment.
	 *
	 * Return the position.
	 *
	 * @param {Region} sourceRegion
	 * @param {Region} targetRegion
	 * @param {String[]} positions
	 * @param {Object} config
	 * @param {Array} config.offset
	 * @param {Region} config.constrain
	 * @param {Boolean/Object} config.sync
	 *
	 * @return {String/Undefined} the chosen position for the alignment, or undefined if no position found
	 */
	function ALIGN_TO_NORMALIZED(sourceRegion, targetRegion, positions, config) {

	    targetRegion = Region.from(targetRegion);

	    config = config || {};

	    var constrainTo = config.constrain,
	        syncOption = config.sync,
	        offsets = config.offset || [],
	        syncWidth = false,
	        syncHeight = false,
	        sourceClone = sourceRegion.clone();

	    /*
	     * Prepare the method arguments: positions, offsets, constrain and sync options
	     */
	    if (!Array.isArray(positions)) {
	        positions = positions ? [positions] : [];
	    }

	    if (!Array.isArray(offsets)) {
	        offsets = offsets ? [offsets] : [];
	    }

	    if (constrainTo) {
	        constrainTo = constrainTo === true ? Region.getDocRegion() : constrainTo.getRegion();
	    }

	    if (syncOption) {

	        if (syncOption.size) {
	            syncWidth = true;
	            syncHeight = true;
	        } else {
	            syncWidth = syncOption === true ? true : syncOption.width || false;

	            syncHeight = syncOption === true ? true : syncOption.height || false;
	        }
	    }

	    if (syncWidth) {
	        sourceClone.setWidth(targetRegion.getWidth());
	    }
	    if (syncHeight) {
	        sourceClone.setHeight(targetRegion.getHeight());
	    }

	    var offset,
	        i = 0,
	        len = positions.length,
	        pos,
	        intersection,
	        itArea,
	        maxArea = -1,
	        maxAreaIndex = -1;

	    for (; i < len; i++) {
	        pos = positions[i];
	        offset = offsets[i];

	        sourceClone.alignToRegion(targetRegion, pos);

	        if (offset) {
	            if (!Array.isArray(offset)) {
	                offset = offsets[i] = [offset.x || offset.left, offset.y || offset.top];
	            }

	            sourceClone.shift({
	                left: offset[0],
	                top: offset[1]
	            });
	        }

	        //the source region is already aligned in the correct position

	        if (constrainTo) {
	            //if we have a constrain region, test for the constrain
	            intersection = sourceClone.getIntersection(constrainTo);

	            if (intersection && intersection.equals(sourceClone)) {
	                //constrain respected, so return (the aligned position)

	                sourceRegion.set(sourceClone);
	                return pos;
	            } else {

	                //the constrain was not respected, so continue trying
	                if (intersection && (itArea = intersection.getArea()) > maxArea) {
	                    maxArea = itArea;
	                    maxAreaIndex = i;
	                }
	            }
	        } else {
	            sourceRegion.set(sourceClone);
	            return pos;
	        }
	    }

	    //no alignment respected the constraints
	    if (~maxAreaIndex) {
	        pos = positions[maxAreaIndex];
	        offset = offsets[maxAreaIndex];

	        sourceClone.alignToRegion(targetRegion, pos);

	        if (offset) {
	            sourceClone.shift({
	                left: offset[0],
	                top: offset[1]
	            });
	        }

	        //we are sure an intersection exists, because of the way the maxAreaIndex was computed
	        intersection = sourceClone.getIntersection(constrainTo);

	        sourceClone.setRegion(intersection);
	        sourceClone.alignToRegion(targetRegion, pos);

	        if (offset) {
	            sourceClone.shift({
	                left: offset[0],
	                top: offset[1]
	            });
	        }

	        sourceRegion.set(sourceClone);

	        return pos;
	    }
	}

	module.exports = ALIGN_TO_NORMALIZED;

/***/ },
/* 22 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	module.exports = 'ontouchstart' in global || global.DocumentTouch && document instanceof DocumentTouch;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	'use once';

	module.exports = function once(fn, scope) {

	    var called;
	    var result;

	    return function () {
	        if (called) {
	            return result;
	        }

	        called = true;

	        return result = fn.apply(scope || this, arguments);
	    };
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function validate(info) {
	    var height = info.height;
	    var width = info.width;

	    if (info.x < 0) {
	        info.x = 0;
	    }

	    if (info.x >= width) {
	        info.x = width;
	    }

	    if (info.y < 0) {
	        info.y = 0;
	    }

	    if (info.y >= height) {
	        info.y = height;
	    }

	    return info;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	module.exports = 'red';

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(2);
	var toColor = __webpack_require__(3).toColor;

	module.exports = function toStringValue(color) {
	    color = toColor(assign({}, color));

	    return color.toRgb().a == 1 ? color.toHexString() : color.toRgbString();
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var React = __webpack_require__(1);
	var Region = __webpack_require__(6);
	var assign = __webpack_require__(2);
	var fromRatio = __webpack_require__(3).fromRatio;
	var common = __webpack_require__(15);

	var VALIDATE = __webpack_require__(24);

	exports['default'] = React.createClass(assign({

	    displayName: 'SaturationSpectrum',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            height: 300,
	            width: 300,
	            pointerSize: 7,
	            defaultColor: __webpack_require__(25)
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            pointerTop: null,
	            pointerLeft: null
	        };
	    },

	    componentDidUpdate: function componentDidUpdate() {
	        // this.updateDragPositionIf()
	    },

	    componentDidMount: function componentDidMount() {
	        this.updateDragPositionIf();
	    },

	    updateDragPositionIf: function updateDragPositionIf() {
	        if (!this.props.height || !this.props.width) {
	            this.setState({});
	        }
	    },

	    getDragPosition: function getDragPosition(hsv) {
	        hsv = hsv || this.hsv;

	        var width = this.props.width;
	        var height = this.props.height;
	        var sizeDefined = width && height;

	        if (!sizeDefined && !this.isMounted()) {
	            return null;
	        }

	        var region;

	        if (!sizeDefined) {
	            region = Region.fromDOM(this.getDOMNode());
	            height = height || region.getHeight();
	            width = width || region.getWidth();
	        }

	        var x = hsv.s * width;
	        var y = height - hsv.v * height;
	        var size = this.props.pointerSize;
	        var diff = Math.floor(size / 2);

	        if (this.props.value && this.state.mouseDown) {
	            x = this.state.mouseDown.x;
	        }

	        return {
	            left: x - diff,
	            top: y - diff
	        };
	    },

	    prepareBackgroundColor: function prepareBackgroundColor(color) {
	        var hsv = color;

	        var col = fromRatio({
	            h: hsv.h % 360 / 360,
	            s: 1,
	            v: 1
	        });

	        return col.toRgbString();
	    },

	    prepareProps: function prepareProps(thisProps, state) {
	        var props = assign({}, thisProps);

	        var color = state.value || props.value || props.defaultValue || props.defaultColor;

	        props.color = color;

	        this.hsv = this.toColorValue(color);

	        props.style = this.prepareStyle(props);
	        props.className = this.prepareClassName(props);

	        return props;
	    },

	    prepareClassName: function prepareClassName(props) {
	        var className = props.className || '';

	        className += ' cp-saturation-spectrum';

	        return className;
	    },

	    prepareStyle: function prepareStyle(props) {
	        var style = props.style || {};

	        if (props.height) {
	            style.height = props.height;
	        }
	        if (props.width) {
	            style.width = props.width;
	        }

	        style.backgroundColor = this.prepareBackgroundColor(this.hsv);

	        return style;
	    },

	    render: function render() {

	        var props = this.p = this.prepareProps(this.props, this.state);

	        var dragStyle = {
	            width: this.props.pointerSize,
	            height: this.props.pointerSize
	        };

	        var dragPos = this.getDragPosition();

	        if (dragPos) {
	            dragStyle.top = dragPos.top;
	            dragStyle.left = dragPos.left;
	            dragStyle.display = 'block';
	        }

	        return React.createElement(
	            'div',
	            { className: props.className, style: props.style, onMouseDown: this.onMouseDown },
	            React.createElement(
	                'div',
	                { className: 'cp-saturation-white' },
	                React.createElement('div', { className: 'cp-saturation-black' })
	            ),
	            React.createElement(
	                'div',
	                { className: 'cp-saturation-drag', style: dragStyle },
	                React.createElement('div', { className: 'inner' })
	            )
	        );
	    },

	    getSaturationForPoint: function getSaturationForPoint(point) {
	        return point.x / point.width;
	    },

	    getColorValueForPoint: function getColorValueForPoint(point) {
	        return (point.height - point.y) / point.height;
	    },

	    updateColor: function updateColor(point) {
	        point = VALIDATE(point);

	        this.hsv.s = this.getSaturationForPoint(point);
	        this.hsv.v = this.getColorValueForPoint(point);
	    },

	    toStringValue: __webpack_require__(26)
	}, common));
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;