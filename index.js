/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = typeof Promise === 'function' ? Promise : __webpack_require__(42);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(20);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var v;

	if (max === 0) {
		s = 0;
	} else {
		s = (delta / max * 1000) / 10;
	}

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	v = ((max / 255) * 1000) / 10;

	return [h, s, v];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (obj, cb) {
	var ret = {};
	var keys = Object.keys(obj);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var res = cb(key, obj[key], obj);
		ret[res[0]] = res[1];
	}

	return ret;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1)
var polyfills = __webpack_require__(45)
var legacy = __webpack_require__(47)
var queue = []

var util = __webpack_require__(2)

function noop () {}

var debug = noop
if (util.debuglog)
  debug = util.debuglog('gfs4')
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util.format.apply(util, arguments)
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
    console.error(m)
  }

if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
  process.on('exit', function() {
    debug(queue)
    __webpack_require__(9).equal(queue.length, 0)
  })
}

module.exports = patch(__webpack_require__(8))
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
  module.exports = patch(fs)
}

// Always patch fs.close/closeSync, because we want to
// retry() whenever a close happens *anywhere* in the program.
// This is essential when multiple graceful-fs instances are
// in play at the same time.
module.exports.close =
fs.close = (function (fs$close) { return function (fd, cb) {
  return fs$close.call(fs, fd, function (err) {
    if (!err)
      retry()

    if (typeof cb === 'function')
      cb.apply(this, arguments)
  })
}})(fs.close)

module.exports.closeSync =
fs.closeSync = (function (fs$closeSync) { return function (fd) {
  // Note that graceful-fs also retries when fs.closeSync() fails.
  // Looks like a bug to me, although it's probably a harmless one.
  var rval = fs$closeSync.apply(fs, arguments)
  retry()
  return rval
}})(fs.closeSync)

function patch (fs) {
  // Everything that references the open() function needs to be in here
  polyfills(fs)
  fs.gracefulify = patch
  fs.FileReadStream = ReadStream;  // Legacy name.
  fs.FileWriteStream = WriteStream;  // Legacy name.
  fs.createReadStream = createReadStream
  fs.createWriteStream = createWriteStream
  var fs$readFile = fs.readFile
  fs.readFile = readFile
  function readFile (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$readFile(path, options, cb)

    function go$readFile (path, options, cb) {
      return fs$readFile(path, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$writeFile = fs.writeFile
  fs.writeFile = writeFile
  function writeFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path, data, options, cb) {
      return fs$writeFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$appendFile = fs.appendFile
  if (fs$appendFile)
    fs.appendFile = appendFile
  function appendFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path, data, options, cb) {
      return fs$appendFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$readdir = fs.readdir
  fs.readdir = readdir
  function readdir (path, options, cb) {
    var args = [path]
    if (typeof options !== 'function') {
      args.push(options)
    } else {
      cb = options
    }
    args.push(go$readdir$cb)

    return go$readdir(args)

    function go$readdir$cb (err, files) {
      if (files && files.sort)
        files.sort()

      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
        enqueue([go$readdir, [args]])
      else {
        if (typeof cb === 'function')
          cb.apply(this, arguments)
        retry()
      }
    }
  }

  function go$readdir (args) {
    return fs$readdir.apply(fs, args)
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams = legacy(fs)
    ReadStream = legStreams.ReadStream
    WriteStream = legStreams.WriteStream
  }

  var fs$ReadStream = fs.ReadStream
  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
  ReadStream.prototype.open = ReadStream$open

  var fs$WriteStream = fs.WriteStream
  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
  WriteStream.prototype.open = WriteStream$open

  fs.ReadStream = ReadStream
  fs.WriteStream = WriteStream

  function ReadStream (path, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy()

        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
        that.read()
      }
    })
  }

  function WriteStream (path, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        that.destroy()
        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
      }
    })
  }

  function createReadStream (path, options) {
    return new ReadStream(path, options)
  }

  function createWriteStream (path, options) {
    return new WriteStream(path, options)
  }

  var fs$open = fs.open
  fs.open = open
  function open (path, flags, mode, cb) {
    if (typeof mode === 'function')
      cb = mode, mode = null

    return go$open(path, flags, mode, cb)

    function go$open (path, flags, mode, cb) {
      return fs$open(path, flags, mode, function (err, fd) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  return fs
}

function enqueue (elem) {
  debug('ENQUEUE', elem[0].name, elem[1])
  queue.push(elem)
}

function retry () {
  var elem = queue.shift()
  if (elem) {
    debug('RETRY', elem[0].name, elem[1])
    elem[0].apply(null, elem[1])
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(1)

module.exports = clone(fs)

function clone (obj) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: obj.__proto__ }
  else
    var copy = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var processFn = function (fn, P, opts) {
	return function () {
		var that = this;
		var args = new Array(arguments.length);

		for (var i = 0; i < arguments.length; i++) {
			args[i] = arguments[i];
		}

		return new P(function (resolve, reject) {
			args.push(function (err, result) {
				if (err) {
					reject(err);
				} else if (opts.multiArgs) {
					var results = new Array(arguments.length - 1);

					for (var i = 1; i < arguments.length; i++) {
						results[i - 1] = arguments[i];
					}

					resolve(results);
				} else {
					resolve(result);
				}
			});

			fn.apply(that, args);
		});
	};
};

var pify = module.exports = function (obj, P, opts) {
	if (typeof P !== 'function') {
		opts = P;
		P = Promise;
	}

	opts = opts || {};
	opts.exclude = opts.exclude || [/.+Sync$/];

	var filter = function (key) {
		var match = function (pattern) {
			return typeof pattern === 'string' ? key === pattern : pattern.test(key);
		};

		return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
	};

	var ret = typeof obj === 'function' ? function () {
		if (opts.excludeMain) {
			return obj.apply(this, arguments);
		}

		return processFn(obj, P, opts).apply(this, arguments);
	} : {};

	return Object.keys(obj).reduce(function (ret, key) {
		var x = obj[key];

		ret[key] = typeof x === 'function' && filter(key) ? processFn(x, P, opts) : x;

		return ret;
	}, ret);
};

pify.all = pify;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = normalize

var fixer = __webpack_require__(56)
normalize.fixer = fixer

var makeWarning = __webpack_require__(69)

var fieldsToFix = ['name','version','description','repository','modules','scripts'
                  ,'files','bin','man','bugs','keywords','readme','homepage','license']
var otherThingsToFix = ['dependencies','people', 'typos']

var thingsToFix = fieldsToFix.map(function(fieldName) {
  return ucFirst(fieldName) + "Field"
})
// two ways to do this in CoffeeScript on only one line, sub-70 chars:
// thingsToFix = fieldsToFix.map (name) -> ucFirst(name) + "Field"
// thingsToFix = (ucFirst(name) + "Field" for name in fieldsToFix)
thingsToFix = thingsToFix.concat(otherThingsToFix)

function normalize (data, warn, strict) {
  if(warn === true) warn = null, strict = true
  if(!strict) strict = false
  if(!warn || data.private) warn = function(msg) { /* noop */ }

  if (data.scripts &&
      data.scripts.install === "node-gyp rebuild" &&
      !data.scripts.preinstall) {
    data.gypfile = true
  }
  fixer.warn = function() { warn(makeWarning.apply(null, arguments)) }
  thingsToFix.forEach(function(thingName) {
    fixer["fix" + ucFirst(thingName)](data, strict)
  })
  data._id = data.name + "@" + data.version
}

function ucFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var gitHosts = module.exports = {
  github: {
    // First two are insecure and generally shouldn't be used any more, but
    // they are still supported.
    'protocols': [ 'git', 'http', 'git+ssh', 'git+https', 'ssh', 'https' ],
    'domain': 'github.com',
    'treepath': 'tree',
    'filetemplate': 'https://{auth@}raw.githubusercontent.com/{user}/{project}/{committish}/{path}',
    'bugstemplate': 'https://{domain}/{user}/{project}/issues',
    'gittemplate': 'git://{auth@}{domain}/{user}/{project}.git{#committish}',
    'tarballtemplate': 'https://{domain}/{user}/{project}/archive/{committish}.tar.gz'
  },
  bitbucket: {
    'protocols': [ 'git+ssh', 'git+https', 'ssh', 'https' ],
    'domain': 'bitbucket.org',
    'treepath': 'src',
    'tarballtemplate': 'https://{domain}/{user}/{project}/get/{committish}.tar.gz'
  },
  gitlab: {
    'protocols': [ 'git+ssh', 'git+https', 'ssh', 'https' ],
    'domain': 'gitlab.com',
    'treepath': 'tree',
    'docstemplate': 'https://{domain}/{user}/{project}{/tree/committish}#README',
    'bugstemplate': 'https://{domain}/{user}/{project}/issues',
    'tarballtemplate': 'https://{domain}/{user}/{project}/repository/archive.tar.gz?ref={committish}'
  },
  gist: {
    'protocols': [ 'git', 'git+ssh', 'git+https', 'ssh', 'https' ],
    'domain': 'gist.github.com',
    'pathmatch': /^[/](?:([^/]+)[/])?([a-z0-9]+)(?:[.]git)?$/,
    'filetemplate': 'https://gist.githubusercontent.com/{user}/{project}/raw{/committish}/{path}',
    'bugstemplate': 'https://{domain}/{project}',
    'gittemplate': 'git://{domain}/{project}.git{#committish}',
    'sshtemplate': 'git@{domain}:/{project}.git{#committish}',
    'sshurltemplate': 'git+ssh://git@{domain}/{project}.git{#committish}',
    'browsetemplate': 'https://{domain}/{project}{/committish}',
    'docstemplate': 'https://{domain}/{project}{/committish}',
    'httpstemplate': 'git+https://{domain}/{project}.git{#committish}',
    'shortcuttemplate': '{type}:{project}{#committish}',
    'pathtemplate': '{project}{#committish}',
    'tarballtemplate': 'https://{domain}/{user}/{project}/archive/{committish}.tar.gz'
  }
}

var gitHostDefaults = {
  'sshtemplate': 'git@{domain}:{user}/{project}.git{#committish}',
  'sshurltemplate': 'git+ssh://git@{domain}/{user}/{project}.git{#committish}',
  'browsetemplate': 'https://{domain}/{user}/{project}{/tree/committish}',
  'docstemplate': 'https://{domain}/{user}/{project}{/tree/committish}#readme',
  'httpstemplate': 'git+https://{auth@}{domain}/{user}/{project}.git{#committish}',
  'filetemplate': 'https://{domain}/{user}/{project}/raw/{committish}/{path}',
  'shortcuttemplate': '{type}:{user}/{project}{#committish}',
  'pathtemplate': '{user}/{project}{#committish}',
  'pathmatch': /^[/]([^/]+)[/]([^/]+?)(?:[.]git|[/])?$/
}

Object.keys(gitHosts).forEach(function (name) {
  Object.keys(gitHostDefaults).forEach(function (key) {
    if (gitHosts[name][key]) return
    gitHosts[name][key] = gitHostDefaults[key]
  })
  gitHosts[name].protocols_re = RegExp('^(' +
    gitHosts[name].protocols.map(function (protocol) {
      return protocol.replace(/([\\+*{}()[\]$^|])/g, '\\$1')
    }).join('|') + '):$')
})


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_co__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_co___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_co__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_meow__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_meow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_meow__);
throw new Error("Cannot find module \"./lib/migrator\"");








const cli = __WEBPACK_IMPORTED_MODULE_4_meow___default.a(`
  Usage
      $ app_migrator <input>

  Options
    -p, --path      Path to the app to be migrated
    -d, --dry-run   Log output without actually migrating

  Examples
    $ app_migrator migrate --path /path/to/my/app/directory/
`);

async function init() {
  const cmd = cli.input[0];
  if (cmd !== 'migrate')
    throw new Error(`${cmd} not implemented yet`);
  const appDir = __WEBPACK_IMPORTED_MODULE_1_path___default.a.resolve(__dirname, cli.flags.path);
  const stats = __WEBPACK_IMPORTED_MODULE_0_fs___default.a.statSync(appDir);
  if (!stats.isDirectory())
    throw new Error(`
      Please provide the path to a v1 app directory
    `);
  await __WEBPACK_IMPORTED_MODULE_5__lib_migrator___default.a.migrate(appDir, cli.flags.dryRun);
  console.log(__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.bold.green('Migrated successfully!'));
}

init();

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "/"))

/***/ }),
/* 15 */
/***/ (function(module, exports) {


/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1)

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise(obj){
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const escapeStringRegexp = __webpack_require__(17);
const ansiStyles = __webpack_require__(18);
const supportsColor = __webpack_require__(22);

const template = __webpack_require__(25);

const isSimpleWindowsTerm = process.platform === 'win32' && !(process.env.TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	obj.level = options.level === undefined ? supportsColor.level : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling chalk.constructor()
	// by itself will have a `this` of a previously constructed chalk object.
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], key);
		}
	};
}

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype.
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = argsLen !== 0 && String(arguments[0]);

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	const args = [].slice.call(arguments, 2);

	if (!Array.isArray(strings)) {
		return strings.toString();
	}

	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(args[i - 1].toString().replace(/[{}]/g, '\\$&'));
		parts.push(strings.raw[i]);
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = supportsColor;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
const colorConvert = __webpack_require__(19);

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	Object.keys(styles).forEach(groupName => {
		const group = styles[groupName];

		Object.keys(group).forEach(styleName => {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];
		});

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	});

	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {};
	styles.color.ansi256 = {};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {};
	styles.bgColor.ansi256 = {};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (const key of Object.keys(colorConvert)) {
		if (typeof colorConvert[key] !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(5);
var route = __webpack_require__(21);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(5);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

// https://jsperf.com/object-keys-vs-for-in-with-closure/3
var models = Object.keys(conversions);

function buildGraph() {
	var graph = {};

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(23);
const hasFlag = __webpack_require__(24);

const env = process.env;

const support = level => {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
};

let supportLevel = (() => {
	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false')) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		return 1;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return 0;
	}

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors.
		const osRelease = os.release().split('.');
		if (
			Number(process.version.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if ('TRAVIS' in env || env.CI === 'Travis' || 'CIRCLECI' in env) {
			return 1;
		}

		return 0;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Hyper':
				return 3;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/^(screen|xterm)-256(?:color)?/.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return 0;
	}

	return 0;
})();

if ('FORCE_COLOR' in env) {
	supportLevel = parseInt(env.FORCE_COLOR, 10) === 0 ? 0 : (supportLevel || 1);
}

module.exports = process && support(supportLevel);


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (flag, argv) {
	argv = argv || process.argv;

	var terminatorPos = argv.indexOf('--');
	var prefix = /^-{1,2}/.test(flag) ? '' : '--';
	var pos = argv.indexOf(prefix + flag);

	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function data(parent) {
	return {
		styles: [],
		parent,
		contents: []
	};
}

const zeroBound = n => n < 0 ? 0 : n;
const lastIndex = a => zeroBound(a.length - 1);

const last = a => a[lastIndex(a)];

const takeWhileReverse = (array, predicate, start) => {
	const out = [];

	for (let i = start; i >= 0 && i <= start; i--) {
		if (predicate(array[i])) {
			out.unshift(array[i]);
		} else {
			break;
		}
	}

	return out;
};

/**
 * Checks if the character at position i in string is a normal character a.k.a a non control character.
 * */
const isNormalCharacter = (string, i) => {
	const char = string[i];
	const backslash = '\\';

	if (!(char === backslash || char === '{' || char === '}')) {
		return true;
	}

	const n = i === 0 ? 0 : takeWhileReverse(string, x => x === '\\', zeroBound(i - 1)).length;

	return n % 2 === 1;
};

const collectStyles = data => data ? collectStyles(data.parent).concat(data.styles) : ['reset'];

/**
 * Computes the style for a given data based on it's style and the style of it's parent. Also accounts for !style styles
 * which remove a style from the list if present.
 * */
const sumStyles = data => {
	const negateRegex = /^~.+/;
	let out = [];

	for (const style of collectStyles(data)) {
		if (negateRegex.test(style)) {
			const exclude = style.slice(1);
			out = out.filter(x => x !== exclude);
		} else {
			out.push(style);
		}
	}

	return out;
};

/**
 * Takes a string and parses it into a tree of data objects which inherit styles from their parent.
 * */
function parse(string) {
	const root = data(null);
	let pushingStyle = false;

	let current = root;

	for (let i = 0; i < string.length; i++) {
		const char = string[i];

		const addNormalCharacter = () => {
			const lastChunk = last(current.contents);

			if (typeof lastChunk === 'string') {
				current.contents[lastIndex(current.contents)] = lastChunk + char;
			} else {
				current.contents.push(char);
			}
		};

		if (pushingStyle) {
			if (' \t'.indexOf(char) > -1) {
				pushingStyle = false;
			} else if (char === '\n') {
				pushingStyle = false;
				addNormalCharacter();
			} else if (char === '.') {
				current.styles.push('');
			} else {
				current.styles[lastIndex(current.styles)] = (last(current.styles) || '') + char;
			}
		} else if (isNormalCharacter(string, i)) {
			addNormalCharacter();
		} else if (char === '{') {
			pushingStyle = true;
			const nCurrent = data(current);
			current.contents.push(nCurrent);
			current = nCurrent;
		} else if (char === '}') {
			current = current.parent;
		}
	}

	if (current !== root) {
		throw new Error('literal template has an unclosed block');
	}

	return root;
}

/**
 * Takes a tree of data objects and flattens it to a list of data objects with the inherited and negations styles
 * accounted for.
 * */
function flatten(data) {
	let flat = [];

	for (const content of data.contents) {
		if (typeof content === 'string') {
			flat.push({
				styles: sumStyles(data),
				content
			});
		} else {
			flat = flat.concat(flatten(content));
		}
	}

	return flat;
}

function assertStyle(chalk, style) {
	if (!chalk[style]) {
		throw new Error(`invalid Chalk style: ${style}`);
	}
}

/**
 * Checks if a given style is valid and parses style functions.
 * */
function parseStyle(chalk, style) {
	const fnMatch = style.match(/^\s*(\w+)\s*\(\s*([^)]*)\s*\)\s*/);
	if (!fnMatch) {
		assertStyle(chalk, style);
		return chalk[style];
	}

	const name = fnMatch[1].trim();
	const args = fnMatch[2].split(/,/g).map(s => s.trim());

	assertStyle(chalk, name);

	return chalk[name].apply(chalk, args);
}

/**
 * Performs the actual styling of the string, essentially lifted from cli.js.
 * */
function style(chalk, flat) {
	return flat.map(data => {
		const fn = data.styles.reduce(parseStyle, chalk);
		return fn(data.content.replace(/\n$/, ''));
	}).join('');
}

module.exports = (chalk, string) => style(chalk, flatten(parse(string)));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename, module) {
var path = __webpack_require__(0);
var minimist = __webpack_require__(27);
var objectAssign = __webpack_require__(28);
var camelcaseKeys = __webpack_require__(29);
var decamelize = __webpack_require__(31);
var mapObj = __webpack_require__(6);
var trimNewlines = __webpack_require__(32);
var redent = __webpack_require__(33);
var readPkgUp = __webpack_require__(39);
var loudRejection = __webpack_require__(72);
var normalizePackageData = __webpack_require__(11);

// get the uncached parent
delete __webpack_require__.c[__filename];
var parentDir = path.dirname(module.parent.filename);

module.exports = function (opts, minimistOpts) {
	loudRejection();

	if (Array.isArray(opts) || typeof opts === 'string') {
		opts = {help: opts};
	}

	opts = objectAssign({
		pkg: readPkgUp.sync({
			cwd: parentDir,
			normalize: false
		}).pkg,
		argv: process.argv.slice(2)
	}, opts);

	minimistOpts = objectAssign({}, minimistOpts);

	minimistOpts.default = mapObj(minimistOpts.default || {}, function (key, value) {
		return [decamelize(key, '-'), value];
	});

	if (Array.isArray(opts.help)) {
		opts.help = opts.help.join('\n');
	}

	var pkg = typeof opts.pkg === 'string' ? !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()) : opts.pkg;
	var argv = minimist(opts.argv, minimistOpts);
	var help = redent(trimNewlines(opts.help || ''), 2);

	normalizePackageData(pkg);

	process.title = pkg.bin ? Object.keys(pkg.bin)[0] : pkg.name;

	var description = opts.description;
	if (!description && description !== false) {
		description = pkg.description;
	}

	help = (description ? '\n  ' + description + '\n' : '') + (help ? '\n' + help : '\n');

	var showHelp = function (code) {
		console.log(help);
		process.exit(code || 0);
	};

	if (argv.version && opts.version !== false) {
		console.log(typeof opts.version === 'string' ? opts.version : pkg.version);
		process.exit();
	}

	if (argv.help && opts.help !== false) {
		showHelp();
	}

	var _ = argv._;
	delete argv._;

	return {
		input: _,
		flags: camelcaseKeys(argv),
		pkg: pkg,
		help: help,
		showHelp: showHelp
	};
};

/* WEBPACK VAR INJECTION */}.call(exports, "/index.js", __webpack_require__(4)(module)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (args, opts) {
    if (!opts) opts = {};
    
    var flags = { bools : {}, strings : {}, unknownFn: null };

    if (typeof opts['unknown'] === 'function') {
        flags.unknownFn = opts['unknown'];
    }

    if (typeof opts['boolean'] === 'boolean' && opts['boolean']) {
      flags.allBools = true;
    } else {
      [].concat(opts['boolean']).filter(Boolean).forEach(function (key) {
          flags.bools[key] = true;
      });
    }
    
    var aliases = {};
    Object.keys(opts.alias || {}).forEach(function (key) {
        aliases[key] = [].concat(opts.alias[key]);
        aliases[key].forEach(function (x) {
            aliases[x] = [key].concat(aliases[key].filter(function (y) {
                return x !== y;
            }));
        });
    });

    [].concat(opts.string).filter(Boolean).forEach(function (key) {
        flags.strings[key] = true;
        if (aliases[key]) {
            flags.strings[aliases[key]] = true;
        }
     });

    var defaults = opts['default'] || {};
    
    var argv = { _ : [] };
    Object.keys(flags.bools).forEach(function (key) {
        setArg(key, defaults[key] === undefined ? false : defaults[key]);
    });
    
    var notFlags = [];

    if (args.indexOf('--') !== -1) {
        notFlags = args.slice(args.indexOf('--')+1);
        args = args.slice(0, args.indexOf('--'));
    }

    function argDefined(key, arg) {
        return (flags.allBools && /^--[^=]+$/.test(arg)) ||
            flags.strings[key] || flags.bools[key] || aliases[key];
    }

    function setArg (key, val, arg) {
        if (arg && flags.unknownFn && !argDefined(key, arg)) {
            if (flags.unknownFn(arg) === false) return;
        }

        var value = !flags.strings[key] && isNumber(val)
            ? Number(val) : val
        ;
        setKey(argv, key.split('.'), value);
        
        (aliases[key] || []).forEach(function (x) {
            setKey(argv, x.split('.'), value);
        });
    }

    function setKey (obj, keys, value) {
        var o = obj;
        keys.slice(0,-1).forEach(function (key) {
            if (o[key] === undefined) o[key] = {};
            o = o[key];
        });

        var key = keys[keys.length - 1];
        if (o[key] === undefined || flags.bools[key] || typeof o[key] === 'boolean') {
            o[key] = value;
        }
        else if (Array.isArray(o[key])) {
            o[key].push(value);
        }
        else {
            o[key] = [ o[key], value ];
        }
    }
    
    function aliasIsBoolean(key) {
      return aliases[key].some(function (x) {
          return flags.bools[x];
      });
    }

    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        
        if (/^--.+=/.test(arg)) {
            // Using [\s\S] instead of . because js doesn't support the
            // 'dotall' regex modifier. See:
            // http://stackoverflow.com/a/1068308/13216
            var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
            var key = m[1];
            var value = m[2];
            if (flags.bools[key]) {
                value = value !== 'false';
            }
            setArg(key, value, arg);
        }
        else if (/^--no-.+/.test(arg)) {
            var key = arg.match(/^--no-(.+)/)[1];
            setArg(key, false, arg);
        }
        else if (/^--.+/.test(arg)) {
            var key = arg.match(/^--(.+)/)[1];
            var next = args[i + 1];
            if (next !== undefined && !/^-/.test(next)
            && !flags.bools[key]
            && !flags.allBools
            && (aliases[key] ? !aliasIsBoolean(key) : true)) {
                setArg(key, next, arg);
                i++;
            }
            else if (/^(true|false)$/.test(next)) {
                setArg(key, next === 'true', arg);
                i++;
            }
            else {
                setArg(key, flags.strings[key] ? '' : true, arg);
            }
        }
        else if (/^-[^-]+/.test(arg)) {
            var letters = arg.slice(1,-1).split('');
            
            var broken = false;
            for (var j = 0; j < letters.length; j++) {
                var next = arg.slice(j+2);
                
                if (next === '-') {
                    setArg(letters[j], next, arg)
                    continue;
                }
                
                if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
                    setArg(letters[j], next.split('=')[1], arg);
                    broken = true;
                    break;
                }
                
                if (/[A-Za-z]/.test(letters[j])
                && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                    setArg(letters[j], next, arg);
                    broken = true;
                    break;
                }
                
                if (letters[j+1] && letters[j+1].match(/\W/)) {
                    setArg(letters[j], arg.slice(j+2), arg);
                    broken = true;
                    break;
                }
                else {
                    setArg(letters[j], flags.strings[letters[j]] ? '' : true, arg);
                }
            }
            
            var key = arg.slice(-1)[0];
            if (!broken && key !== '-') {
                if (args[i+1] && !/^(-|--)[^-]/.test(args[i+1])
                && !flags.bools[key]
                && (aliases[key] ? !aliasIsBoolean(key) : true)) {
                    setArg(key, args[i+1], arg);
                    i++;
                }
                else if (args[i+1] && /true|false/.test(args[i+1])) {
                    setArg(key, args[i+1] === 'true', arg);
                    i++;
                }
                else {
                    setArg(key, flags.strings[key] ? '' : true, arg);
                }
            }
        }
        else {
            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
                argv._.push(
                    flags.strings['_'] || !isNumber(arg) ? arg : Number(arg)
                );
            }
            if (opts.stopEarly) {
                argv._.push.apply(argv._, args.slice(i + 1));
                break;
            }
        }
    }
    
    Object.keys(defaults).forEach(function (key) {
        if (!hasKey(argv, key.split('.'))) {
            setKey(argv, key.split('.'), defaults[key]);
            
            (aliases[key] || []).forEach(function (x) {
                setKey(argv, x.split('.'), defaults[key]);
            });
        }
    });
    
    if (opts['--']) {
        argv['--'] = new Array();
        notFlags.forEach(function(key) {
            argv['--'].push(key);
        });
    }
    else {
        notFlags.forEach(function(key) {
            argv._.push(key);
        });
    }

    return argv;
};

function hasKey (obj, keys) {
    var o = obj;
    keys.slice(0,-1).forEach(function (key) {
        o = (o[key] || {});
    });

    var key = keys[keys.length - 1];
    return key in o;
}

function isNumber (x) {
    if (typeof x === 'number') return true;
    if (/^0x[0-9a-f]+$/i.test(x)) return true;
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
}



/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mapObj = __webpack_require__(6);
var camelCase = __webpack_require__(30);

module.exports = function (input, options) {
	options = options || {};
	var exclude = options.exclude || [];
	return mapObj(input, function (key, val) {
		key = exclude.indexOf(key) === -1 ? camelCase(key) : key;
		return [key, val];
	});
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function preserveCamelCase(str) {
	var isLastCharLower = false;

	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);

		if (isLastCharLower && (/[a-zA-Z]/).test(c) && c.toUpperCase() === c) {
			str = str.substr(0, i) + '-' + str.substr(i);
			isLastCharLower = false;
			i++;
		} else {
			isLastCharLower = (c.toLowerCase() === c);
		}
	}

	return str;
}

module.exports = function () {
	var str = [].map.call(arguments, function (str) {
		return str.trim();
	}).filter(function (str) {
		return str.length;
	}).join('-');

	if (!str.length) {
		return '';
	}

	if (str.length === 1) {
		return str;
	}

	if (!(/[_.\- ]+/).test(str)) {
		if (str === str.toUpperCase()) {
			return str.toLowerCase();
		}

		if (str[0] !== str[0].toLowerCase()) {
			return str[0].toLowerCase() + str.slice(1);
		}

		return str;
	}

	str = preserveCamelCase(str);

	return str
	.replace(/^[_.\- ]+/, '')
	.toLowerCase()
	.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
		return p1.toUpperCase();
	});
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str, sep) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	sep = typeof sep === 'undefined' ? '_' : sep;

	return str
		.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
		.toLowerCase();
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fn = module.exports = function (x) {
	return fn.end(fn.start(x));
};

fn.start = function (x) {
	return x.replace(/^[\r\n]+/, '');
};

fn.end = function (x) {
	return x.replace(/[\r\n]+$/, '');
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var stripIndent = __webpack_require__(34);
var indentString = __webpack_require__(35);

module.exports = function (str, count, indent) {
	return indentString(stripIndent(str), indent || ' ', count || 0);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	var match = str.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return str;
	}

	var indent = Math.min.apply(Math, match.map(function (el) {
		return el.length;
	}));

	var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');

	return indent > 0 ? str.replace(re, '') : str;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var repeating = __webpack_require__(36);

module.exports = function (str, indent, count) {
	if (typeof str !== 'string' || typeof indent !== 'string') {
		throw new TypeError('`string` and `indent` should be strings');
	}

	if (count != null && typeof count !== 'number') {
		throw new TypeError('`count` should be a number');
	}

	if (count === 0) {
		return str;
	}

	indent = count > 1 ? repeating(indent, count) : indent;

	return str.replace(/^(?!\s*$)/mg, indent);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isFinite = __webpack_require__(37);

module.exports = function (str, n) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected `input` to be a string');
	}

	if (n < 0 || !isFinite(n)) {
		throw new TypeError('Expected `count` to be a positive finite number');
	}

	var ret = '';

	do {
		if (n & 1) {
			ret += str;
		}

		str += str;
	} while ((n >>= 1));

	return ret;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var numberIsNan = __webpack_require__(38);

module.exports = Number.isFinite || function (val) {
	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Number.isNaN || function (x) {
	return x !== x;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var findUp = __webpack_require__(40);
var readPkg = __webpack_require__(43);

module.exports = function (opts) {
	return findUp('package.json', opts).then(function (fp) {
		if (!fp) {
			return {};
		}

		return readPkg(fp, opts).then(function (pkg) {
			return {
				pkg: pkg,
				path: fp
			};
		});
	});
};

module.exports.sync = function (opts) {
	var fp = findUp.sync('package.json', opts);

	if (!fp) {
		return {};
	}

	return {
		pkg: readPkg.sync(fp, opts),
		path: fp
	};
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path = __webpack_require__(0);
var pathExists = __webpack_require__(41);
var Promise = __webpack_require__(3);

function splitPath(x) {
	return path.resolve(x || '').split(path.sep);
}

function join(parts, filename) {
	return path.resolve(parts.join(path.sep) + path.sep, filename);
}

module.exports = function (filename, opts) {
	opts = opts || {};

	var parts = splitPath(opts.cwd);

	return new Promise(function (resolve) {
		(function find() {
			var fp = join(parts, filename);

			pathExists(fp).then(function (exists) {
				if (exists) {
					resolve(fp);
				} else if (parts.pop()) {
					find();
				} else {
					resolve(null);
				}
			});
		})();
	});
};

module.exports.sync = function (filename, opts) {
	opts = opts || {};

	var parts = splitPath(opts.cwd);
	var len = parts.length;

	while (len--) {
		var fp = join(parts, filename);

		if (pathExists.sync(fp)) {
			return fp;
		}

		parts.pop();
	}

	return null;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fs = __webpack_require__(1);
var Promise = __webpack_require__(3);

module.exports = function (fp) {
	var fn = typeof fs.access === 'function' ? fs.access : fs.stat;

	return new Promise(function (resolve) {
		fn(fp, function (err) {
			resolve(!err);
		});
	});
};

module.exports.sync = function (fp) {
	var fn = typeof fs.accessSync === 'function' ? fs.accessSync : fs.statSync;

	try {
		fn(fp);
		return true;
	} catch (err) {
		return false;
	}
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PENDING = 'pending';
var SETTLED = 'settled';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
var NOOP = function () {};
var isNode = typeof global !== 'undefined' && typeof global.process !== 'undefined' && typeof global.process.emit === 'function';

var asyncSetTimer = typeof setImmediate === 'undefined' ? setTimeout : setImmediate;
var asyncQueue = [];
var asyncTimer;

function asyncFlush() {
	// run promise callbacks
	for (var i = 0; i < asyncQueue.length; i++) {
		asyncQueue[i][0](asyncQueue[i][1]);
	}

	// reset async asyncQueue
	asyncQueue = [];
	asyncTimer = false;
}

function asyncCall(callback, arg) {
	asyncQueue.push([callback, arg]);

	if (!asyncTimer) {
		asyncTimer = true;
		asyncSetTimer(asyncFlush, 0);
	}
}

function invokeResolver(resolver, promise) {
	function resolvePromise(value) {
		resolve(promise, value);
	}

	function rejectPromise(reason) {
		reject(promise, reason);
	}

	try {
		resolver(resolvePromise, rejectPromise);
	} catch (e) {
		rejectPromise(e);
	}
}

function invokeCallback(subscriber) {
	var owner = subscriber.owner;
	var settled = owner._state;
	var value = owner._data;
	var callback = subscriber[settled];
	var promise = subscriber.then;

	if (typeof callback === 'function') {
		settled = FULFILLED;
		try {
			value = callback(value);
		} catch (e) {
			reject(promise, e);
		}
	}

	if (!handleThenable(promise, value)) {
		if (settled === FULFILLED) {
			resolve(promise, value);
		}

		if (settled === REJECTED) {
			reject(promise, value);
		}
	}
}

function handleThenable(promise, value) {
	var resolved;

	try {
		if (promise === value) {
			throw new TypeError('A promises callback cannot return that same promise.');
		}

		if (value && (typeof value === 'function' || typeof value === 'object')) {
			// then should be retrieved only once
			var then = value.then;

			if (typeof then === 'function') {
				then.call(value, function (val) {
					if (!resolved) {
						resolved = true;

						if (value === val) {
							fulfill(promise, val);
						} else {
							resolve(promise, val);
						}
					}
				}, function (reason) {
					if (!resolved) {
						resolved = true;

						reject(promise, reason);
					}
				});

				return true;
			}
		}
	} catch (e) {
		if (!resolved) {
			reject(promise, e);
		}

		return true;
	}

	return false;
}

function resolve(promise, value) {
	if (promise === value || !handleThenable(promise, value)) {
		fulfill(promise, value);
	}
}

function fulfill(promise, value) {
	if (promise._state === PENDING) {
		promise._state = SETTLED;
		promise._data = value;

		asyncCall(publishFulfillment, promise);
	}
}

function reject(promise, reason) {
	if (promise._state === PENDING) {
		promise._state = SETTLED;
		promise._data = reason;

		asyncCall(publishRejection, promise);
	}
}

function publish(promise) {
	promise._then = promise._then.forEach(invokeCallback);
}

function publishFulfillment(promise) {
	promise._state = FULFILLED;
	publish(promise);
}

function publishRejection(promise) {
	promise._state = REJECTED;
	publish(promise);
	if (!promise._handled && isNode) {
		global.process.emit('unhandledRejection', promise._data, promise);
	}
}

function notifyRejectionHandled(promise) {
	global.process.emit('rejectionHandled', promise);
}

/**
 * @class
 */
function Promise(resolver) {
	if (typeof resolver !== 'function') {
		throw new TypeError('Promise resolver ' + resolver + ' is not a function');
	}

	if (this instanceof Promise === false) {
		throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
	}

	this._then = [];

	invokeResolver(resolver, this);
}

Promise.prototype = {
	constructor: Promise,

	_state: PENDING,
	_then: null,
	_data: undefined,
	_handled: false,

	then: function (onFulfillment, onRejection) {
		var subscriber = {
			owner: this,
			then: new this.constructor(NOOP),
			fulfilled: onFulfillment,
			rejected: onRejection
		};

		if ((onRejection || onFulfillment) && !this._handled) {
			this._handled = true;
			if (this._state === REJECTED && isNode) {
				asyncCall(notifyRejectionHandled, this);
			}
		}

		if (this._state === FULFILLED || this._state === REJECTED) {
			// already resolved, call callback async
			asyncCall(invokeCallback, subscriber);
		} else {
			// subscribe
			this._then.push(subscriber);
		}

		return subscriber.then;
	},

	catch: function (onRejection) {
		return this.then(null, onRejection);
	}
};

Promise.all = function (promises) {
	if (!Array.isArray(promises)) {
		throw new TypeError('You must pass an array to Promise.all().');
	}

	return new Promise(function (resolve, reject) {
		var results = [];
		var remaining = 0;

		function resolver(index) {
			remaining++;
			return function (value) {
				results[index] = value;
				if (!--remaining) {
					resolve(results);
				}
			};
		}

		for (var i = 0, promise; i < promises.length; i++) {
			promise = promises[i];

			if (promise && typeof promise.then === 'function') {
				promise.then(resolver(i), reject);
			} else {
				results[i] = promise;
			}
		}

		if (!remaining) {
			resolve(results);
		}
	});
};

Promise.race = function (promises) {
	if (!Array.isArray(promises)) {
		throw new TypeError('You must pass an array to Promise.race().');
	}

	return new Promise(function (resolve, reject) {
		for (var i = 0, promise; i < promises.length; i++) {
			promise = promises[i];

			if (promise && typeof promise.then === 'function') {
				promise.then(resolve, reject);
			} else {
				resolve(promise);
			}
		}
	});
};

Promise.resolve = function (value) {
	if (value && typeof value === 'object' && value.constructor === Promise) {
		return value;
	}

	return new Promise(function (resolve) {
		resolve(value);
	});
};

Promise.reject = function (reason) {
	return new Promise(function (resolve, reject) {
		reject(reason);
	});
};

module.exports = Promise;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path = __webpack_require__(0);
var loadJsonFile = __webpack_require__(44);
var normalizePackageData = __webpack_require__(11);
var pathType = __webpack_require__(71);

module.exports = function (fp, opts) {
	if (typeof fp !== 'string') {
		opts = fp;
		fp = '.';
	}

	opts = opts || {};

	return pathType.dir(fp)
		.then(function (isDir) {
			if (isDir) {
				fp = path.join(fp, 'package.json');
			}

			return loadJsonFile(fp);
		})
		.then(function (x) {
			if (opts.normalize !== false) {
				normalizePackageData(x);
			}

			return x;
		});
};

module.exports.sync = function (fp, opts) {
	if (typeof fp !== 'string') {
		opts = fp;
		fp = '.';
	}

	opts = opts || {};
	fp = pathType.dirSync(fp) ? path.join(fp, 'package.json') : fp;

	var x = loadJsonFile.sync(fp);

	if (opts.normalize !== false) {
		normalizePackageData(x);
	}

	return x;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path = __webpack_require__(0);
var fs = __webpack_require__(7);
var stripBom = __webpack_require__(49);
var parseJson = __webpack_require__(51);
var Promise = __webpack_require__(3);
var pify = __webpack_require__(10);

function parse(x, fp) {
	return parseJson(stripBom(x), path.relative(process.cwd(), fp));
}

module.exports = function (fp) {
	return pify(fs.readFile, Promise)(fp, 'utf8').then(function (data) {
		return parse(data, fp);
	});
};

module.exports.sync = function (fp) {
	return parse(fs.readFileSync(fp, 'utf8'), fp);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(8)
var constants = __webpack_require__(46)

var origCwd = process.cwd
var cwd = null

var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process)
  return cwd
}
try {
  process.cwd()
} catch (er) {}

var chdir = process.chdir
process.chdir = function(d) {
  cwd = null
  chdir.call(process, d)
}

module.exports = patch

function patch (fs) {
  // (re-)implement some things that are known busted or missing.

  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs)
  }

  // lutimes implementation, or no-op
  if (!fs.lutimes) {
    patchLutimes(fs)
  }

  // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.

  fs.chown = chownFix(fs.chown)
  fs.fchown = chownFix(fs.fchown)
  fs.lchown = chownFix(fs.lchown)

  fs.chmod = chmodFix(fs.chmod)
  fs.fchmod = chmodFix(fs.fchmod)
  fs.lchmod = chmodFix(fs.lchmod)

  fs.chownSync = chownFixSync(fs.chownSync)
  fs.fchownSync = chownFixSync(fs.fchownSync)
  fs.lchownSync = chownFixSync(fs.lchownSync)

  fs.chmodSync = chmodFixSync(fs.chmodSync)
  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

  fs.stat = statFix(fs.stat)
  fs.fstat = statFix(fs.fstat)
  fs.lstat = statFix(fs.lstat)

  fs.statSync = statFixSync(fs.statSync)
  fs.fstatSync = statFixSync(fs.fstatSync)
  fs.lstatSync = statFixSync(fs.lstatSync)

  // if lchmod/lchown do not exist, then make them no-ops
  if (!fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchmodSync = function () {}
  }
  if (!fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchownSync = function () {}
  }

  // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.

  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.
  if (platform === "win32") {
    fs.rename = (function (fs$rename) { return function (from, to, cb) {
      var start = Date.now()
      var backoff = 0;
      fs$rename(from, to, function CB (er) {
        if (er
            && (er.code === "EACCES" || er.code === "EPERM")
            && Date.now() - start < 60000) {
          setTimeout(function() {
            fs.stat(to, function (stater, st) {
              if (stater && stater.code === "ENOENT")
                fs$rename(from, to, CB);
              else
                cb(er)
            })
          }, backoff)
          if (backoff < 100)
            backoff += 10;
          return;
        }
        if (cb) cb(er)
      })
    }})(fs.rename)
  }

  // if read() returns EAGAIN, then just try it again.
  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
    var callback
    if (callback_ && typeof callback_ === 'function') {
      var eagCounter = 0
      callback = function (er, _, __) {
        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
        }
        callback_.apply(this, arguments)
      }
    }
    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
  }})(fs.read)

  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
    var eagCounter = 0
    while (true) {
      try {
        return fs$readSync.call(fs, fd, buffer, offset, length, position)
      } catch (er) {
        if (er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          continue
        }
        throw er
      }
    }
  }})(fs.readSync)
}

function patchLchmod (fs) {
  fs.lchmod = function (path, mode, callback) {
    fs.open( path
           , constants.O_WRONLY | constants.O_SYMLINK
           , mode
           , function (err, fd) {
      if (err) {
        if (callback) callback(err)
        return
      }
      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      fs.fchmod(fd, mode, function (err) {
        fs.close(fd, function(err2) {
          if (callback) callback(err || err2)
        })
      })
    })
  }

  fs.lchmodSync = function (path, mode) {
    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

    // prefer to return the chmod error, if one occurs,
    // but still try to close, and report closing errors if they occur.
    var threw = true
    var ret
    try {
      ret = fs.fchmodSync(fd, mode)
      threw = false
    } finally {
      if (threw) {
        try {
          fs.closeSync(fd)
        } catch (er) {}
      } else {
        fs.closeSync(fd)
      }
    }
    return ret
  }
}

function patchLutimes (fs) {
  if (constants.hasOwnProperty("O_SYMLINK")) {
    fs.lutimes = function (path, at, mt, cb) {
      fs.open(path, constants.O_SYMLINK, function (er, fd) {
        if (er) {
          if (cb) cb(er)
          return
        }
        fs.futimes(fd, at, mt, function (er) {
          fs.close(fd, function (er2) {
            if (cb) cb(er || er2)
          })
        })
      })
    }

    fs.lutimesSync = function (path, at, mt) {
      var fd = fs.openSync(path, constants.O_SYMLINK)
      var ret
      var threw = true
      try {
        ret = fs.futimesSync(fd, at, mt)
        threw = false
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd)
          } catch (er) {}
        } else {
          fs.closeSync(fd)
        }
      }
      return ret
    }

  } else {
    fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
    fs.lutimesSync = function () {}
  }
}

function chmodFix (orig) {
  if (!orig) return orig
  return function (target, mode, cb) {
    return orig.call(fs, target, mode, function (er) {
      if (chownErOk(er)) er = null
      if (cb) cb.apply(this, arguments)
    })
  }
}

function chmodFixSync (orig) {
  if (!orig) return orig
  return function (target, mode) {
    try {
      return orig.call(fs, target, mode)
    } catch (er) {
      if (!chownErOk(er)) throw er
    }
  }
}


function chownFix (orig) {
  if (!orig) return orig
  return function (target, uid, gid, cb) {
    return orig.call(fs, target, uid, gid, function (er) {
      if (chownErOk(er)) er = null
      if (cb) cb.apply(this, arguments)
    })
  }
}

function chownFixSync (orig) {
  if (!orig) return orig
  return function (target, uid, gid) {
    try {
      return orig.call(fs, target, uid, gid)
    } catch (er) {
      if (!chownErOk(er)) throw er
    }
  }
}


function statFix (orig) {
  if (!orig) return orig
  // Older versions of Node erroneously returned signed integers for
  // uid + gid.
  return function (target, cb) {
    return orig.call(fs, target, function (er, stats) {
      if (!stats) return cb.apply(this, arguments)
      if (stats.uid < 0) stats.uid += 0x100000000
      if (stats.gid < 0) stats.gid += 0x100000000
      if (cb) cb.apply(this, arguments)
    })
  }
}

function statFixSync (orig) {
  if (!orig) return orig
  // Older versions of Node erroneously returned signed integers for
  // uid + gid.
  return function (target) {
    var stats = orig.call(fs, target)
    if (stats.uid < 0) stats.uid += 0x100000000
    if (stats.gid < 0) stats.gid += 0x100000000
    return stats;
  }
}

// ENOSYS means that the fs doesn't support the op. Just ignore
// that, because it doesn't matter.
//
// if there's no getuid, or if getuid() is something other
// than 0, and the error is EINVAL or EPERM, then just ignore
// it.
//
// This specific case is a silent failure in cp, install, tar,
// and most other unix tools that manage permissions.
//
// When running as root, or if other types of errors are
// encountered, then it's strict.
function chownErOk (er) {
  if (!er)
    return true

  if (er.code === "ENOSYS")
    return true

  var nonroot = !process.getuid || process.getuid() !== 0
  if (nonroot) {
    if (er.code === "EINVAL" || er.code === "EPERM")
      return true
  }

  return false
}


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(48).Stream

module.exports = legacy

function legacy (fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  }

  function ReadStream (path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

    Stream.call(this);

    var self = this;

    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;

    this.flags = 'r';
    this.mode = 438; /*=0666*/
    this.bufferSize = 64 * 1024;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function() {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);
      self._read();
    })
  }

  function WriteStream (path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

    Stream.call(this);

    this.path = path;
    this.fd = null;
    this.writable = true;

    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438; /*=0666*/
    this.bytesWritten = 0;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }
}


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isUtf8 = __webpack_require__(50);

module.exports = function (x) {
	// Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
	// conversion translates it to FEFF (UTF-16 BOM)
	if (typeof x === 'string' && x.charCodeAt(0) === 0xFEFF) {
		return x.slice(1);
	}

	if (Buffer.isBuffer(x) && isUtf8(x) &&
		x[0] === 0xEF && x[1] === 0xBB && x[2] === 0xBF) {
		return x.slice(3);
	}

	return x;
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {


exports = module.exports = function(bytes)
{
    var i = 0;
    while(i < bytes.length)
    {
        if(     (// ASCII
                    bytes[i] == 0x09 ||
                    bytes[i] == 0x0A ||
                    bytes[i] == 0x0D ||
                    (0x20 <= bytes[i] && bytes[i] <= 0x7E)
                )
          ) {
              i += 1;
              continue;
          }

        if(     (// non-overlong 2-byte
                    (0xC2 <= bytes[i] && bytes[i] <= 0xDF) &&
                    (0x80 <= bytes[i+1] && bytes[i+1] <= 0xBF)
                )
          ) {
              i += 2;
              continue;
          }

        if(     (// excluding overlongs
                    bytes[i] == 0xE0 &&
                    (0xA0 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                    (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF)
                ) ||
                (// straight 3-byte
                 ((0xE1 <= bytes[i] && bytes[i] <= 0xEC) ||
                  bytes[i] == 0xEE ||
                  bytes[i] == 0xEF) &&
                 (0x80 <= bytes[i + 1] && bytes[i+1] <= 0xBF) &&
                 (0x80 <= bytes[i+2] && bytes[i+2] <= 0xBF)
                ) ||
                (// excluding surrogates
                 bytes[i] == 0xED &&
                 (0x80 <= bytes[i+1] && bytes[i+1] <= 0x9F) &&
                 (0x80 <= bytes[i+2] && bytes[i+2] <= 0xBF)
                )
          ) {
              i += 3;
              continue;
          }

        if(     (// planes 1-3
                    bytes[i] == 0xF0 &&
                    (0x90 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                    (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                    (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
                ) ||
                (// planes 4-15
                 (0xF1 <= bytes[i] && bytes[i] <= 0xF3) &&
                 (0x80 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                 (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                 (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
                ) ||
                (// plane 16
                 bytes[i] == 0xF4 &&
                 (0x80 <= bytes[i + 1] && bytes[i + 1] <= 0x8F) &&
                 (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                 (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
                )
          ) {
              i += 4;
              continue;
          }

        return false;
    }

    return true;
}


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorEx = __webpack_require__(52);
var fallback = __webpack_require__(54);

var JSONError = errorEx('JSONError', {
	fileName: errorEx.append('in %s')
});

module.exports = function (x, reviver, filename) {
	if (typeof reviver === 'string') {
		filename = reviver;
		reviver = null;
	}

	try {
		try {
			return JSON.parse(x, reviver);
		} catch (err) {
			fallback.parse(x, {
				mode: 'json',
				reviver: reviver
			});

			throw err;
		}
	} catch (err) {
		var jsonErr = new JSONError(err);

		if (filename) {
			jsonErr.fileName = filename;
		}

		throw jsonErr;
	}
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(2);
var isArrayish = __webpack_require__(53);

var errorEx = function errorEx(name, properties) {
	if (!name || name.constructor !== String) {
		properties = name || {};
		name = Error.name;
	}

	var errorExError = function ErrorEXError(message) {
		if (!this) {
			return new ErrorEXError(message);
		}

		message = message instanceof Error
			? message.message
			: (message || this.message);

		Error.call(this, message);
		Error.captureStackTrace(this, errorExError);

		this.name = name;

		Object.defineProperty(this, 'message', {
			configurable: true,
			enumerable: false,
			get: function () {
				var newMessage = message.split(/\r?\n/g);

				for (var key in properties) {
					if (!properties.hasOwnProperty(key)) {
						continue;
					}

					var modifier = properties[key];

					if ('message' in modifier) {
						newMessage = modifier.message(this[key], newMessage) || newMessage;
						if (!isArrayish(newMessage)) {
							newMessage = [newMessage];
						}
					}
				}

				return newMessage.join('\n');
			},
			set: function (v) {
				message = v;
			}
		});

		var stackDescriptor = Object.getOwnPropertyDescriptor(this, 'stack');
		var stackGetter = stackDescriptor.get;
		var stackValue = stackDescriptor.value;
		delete stackDescriptor.value;
		delete stackDescriptor.writable;

		stackDescriptor.get = function () {
			var stack = (stackGetter)
				? stackGetter.call(this).split(/\r?\n+/g)
				: stackValue.split(/\r?\n+/g);

			// starting in Node 7, the stack builder caches the message.
			// just replace it.
			stack[0] = this.name + ': ' + this.message;

			var lineCount = 1;
			for (var key in properties) {
				if (!properties.hasOwnProperty(key)) {
					continue;
				}

				var modifier = properties[key];

				if ('line' in modifier) {
					var line = modifier.line(this[key]);
					if (line) {
						stack.splice(lineCount++, 0, '    ' + line);
					}
				}

				if ('stack' in modifier) {
					modifier.stack(this[key], stack);
				}
			}

			return stack.join('\n');
		};

		Object.defineProperty(this, 'stack', stackDescriptor);
	};

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(errorExError.prototype, Error.prototype);
		Object.setPrototypeOf(errorExError, Error);
	} else {
		util.inherits(errorExError, Error);
	}

	return errorExError;
};

errorEx.append = function (str, def) {
	return {
		message: function (v, message) {
			v = v || def;

			if (v) {
				message[0] += ' ' + str.replace('%s', v.toString());
			}

			return message;
		}
	};
};

errorEx.line = function (str, def) {
	return {
		line: function (v) {
			v = v || def;

			if (v) {
				return str.replace('%s', v.toString());
			}

			return null;
		}
	};
};

module.exports = errorEx;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isArrayish(obj) {
	if (!obj) {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && obj.splice instanceof Function);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Author: Alex Kocharin <alex@kocharin.ru>
 * GIT: https://github.com/rlidwka/jju
 * License: WTFPL, grab your copy here: http://www.wtfpl.net/txt/copying/
 */

// RTFM: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf

var Uni = __webpack_require__(55)

function isHexDigit(x) {
  return (x >= '0' && x <= '9')
      || (x >= 'A' && x <= 'F')
      || (x >= 'a' && x <= 'f')
}

function isOctDigit(x) {
  return x >= '0' && x <= '7'
}

function isDecDigit(x) {
  return x >= '0' && x <= '9'
}

var unescapeMap = {
  '\'': '\'',
  '"' : '"',
  '\\': '\\',
  'b' : '\b',
  'f' : '\f',
  'n' : '\n',
  'r' : '\r',
  't' : '\t',
  'v' : '\v',
  '/' : '/',
}

function formatError(input, msg, position, lineno, column, json5) {
  var result = msg + ' at ' + (lineno + 1) + ':' + (column + 1)
    , tmppos = position - column - 1
    , srcline = ''
    , underline = ''

  var isLineTerminator = json5 ? Uni.isLineTerminator : Uni.isLineTerminatorJSON

  // output no more than 70 characters before the wrong ones
  if (tmppos < position - 70) {
    tmppos = position - 70
  }

  while (1) {
    var chr = input[++tmppos]

    if (isLineTerminator(chr) || tmppos === input.length) {
      if (position >= tmppos) {
        // ending line error, so show it after the last char
        underline += '^'
      }
      break
    }
    srcline += chr

    if (position === tmppos) {
      underline += '^'
    } else if (position > tmppos) {
      underline += input[tmppos] === '\t' ? '\t' : ' '
    }

    // output no more than 78 characters on the string
    if (srcline.length > 78) break
  }

  return result + '\n' + srcline + '\n' + underline
}

function parse(input, options) {
  // parse as a standard JSON mode
  var json5 = !(options.mode === 'json' || options.legacy)
  var isLineTerminator = json5 ? Uni.isLineTerminator : Uni.isLineTerminatorJSON
  var isWhiteSpace = json5 ? Uni.isWhiteSpace : Uni.isWhiteSpaceJSON

  var length = input.length
    , lineno = 0
    , linestart = 0
    , position = 0
    , stack = []

  var tokenStart = function() {}
  var tokenEnd = function(v) {return v}

  /* tokenize({
       raw: '...',
       type: 'whitespace'|'comment'|'key'|'literal'|'separator'|'newline',
       value: 'number'|'string'|'whatever',
       path: [...],
     })
  */
  if (options._tokenize) {
    ;(function() {
      var start = null
      tokenStart = function() {
        if (start !== null) throw Error('internal error, token overlap')
        start = position
      }

      tokenEnd = function(v, type) {
        if (start != position) {
          var hash = {
            raw: input.substr(start, position-start),
            type: type,
            stack: stack.slice(0),
          }
          if (v !== undefined) hash.value = v
          options._tokenize.call(null, hash)
        }
        start = null
        return v
      }
    })()
  }

  function fail(msg) {
    var column = position - linestart

    if (!msg) {
      if (position < length) {
        var token = '\'' +
          JSON
            .stringify(input[position])
            .replace(/^"|"$/g, '')
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"')
          + '\''

        if (!msg) msg = 'Unexpected token ' + token
      } else {
        if (!msg) msg = 'Unexpected end of input'
      }
    }

    var error = SyntaxError(formatError(input, msg, position, lineno, column, json5))
    error.row = lineno + 1
    error.column = column + 1
    throw error
  }

  function newline(chr) {
    // account for <cr><lf>
    if (chr === '\r' && input[position] === '\n') position++
    linestart = position
    lineno++
  }

  function parseGeneric() {
    var result

    while (position < length) {
      tokenStart()
      var chr = input[position++]

      if (chr === '"' || (chr === '\'' && json5)) {
        return tokenEnd(parseString(chr), 'literal')

      } else if (chr === '{') {
        tokenEnd(undefined, 'separator')
        return parseObject()

      } else if (chr === '[') {
        tokenEnd(undefined, 'separator')
        return parseArray()

      } else if (chr === '-'
             ||  chr === '.'
             ||  isDecDigit(chr)
                 //           + number       Infinity          NaN
             ||  (json5 && (chr === '+' || chr === 'I' || chr === 'N'))
      ) {
        return tokenEnd(parseNumber(), 'literal')

      } else if (chr === 'n') {
        parseKeyword('null')
        return tokenEnd(null, 'literal')

      } else if (chr === 't') {
        parseKeyword('true')
        return tokenEnd(true, 'literal')

      } else if (chr === 'f') {
        parseKeyword('false')
        return tokenEnd(false, 'literal')

      } else {
        position--
        return tokenEnd(undefined)
      }
    }
  }

  function parseKey() {
    var result

    while (position < length) {
      tokenStart()
      var chr = input[position++]

      if (chr === '"' || (chr === '\'' && json5)) {
        return tokenEnd(parseString(chr), 'key')

      } else if (chr === '{') {
        tokenEnd(undefined, 'separator')
        return parseObject()

      } else if (chr === '[') {
        tokenEnd(undefined, 'separator')
        return parseArray()

      } else if (chr === '.'
             ||  isDecDigit(chr)
      ) {
        return tokenEnd(parseNumber(true), 'key')

      } else if (json5
             &&  Uni.isIdentifierStart(chr) || (chr === '\\' && input[position] === 'u')) {
        // unicode char or a unicode sequence
        var rollback = position - 1
        var result = parseIdentifier()

        if (result === undefined) {
          position = rollback
          return tokenEnd(undefined)
        } else {
          return tokenEnd(result, 'key')
        }

      } else {
        position--
        return tokenEnd(undefined)
      }
    }
  }

  function skipWhiteSpace() {
    tokenStart()
    while (position < length) {
      var chr = input[position++]

      if (isLineTerminator(chr)) {
        position--
        tokenEnd(undefined, 'whitespace')
        tokenStart()
        position++
        newline(chr)
        tokenEnd(undefined, 'newline')
        tokenStart()

      } else if (isWhiteSpace(chr)) {
        // nothing

      } else if (chr === '/'
             && json5
             && (input[position] === '/' || input[position] === '*')
      ) {
        position--
        tokenEnd(undefined, 'whitespace')
        tokenStart()
        position++
        skipComment(input[position++] === '*')
        tokenEnd(undefined, 'comment')
        tokenStart()

      } else {
        position--
        break
      }
    }
    return tokenEnd(undefined, 'whitespace')
  }

  function skipComment(multi) {
    while (position < length) {
      var chr = input[position++]

      if (isLineTerminator(chr)) {
        // LineTerminator is an end of singleline comment
        if (!multi) {
          // let parent function deal with newline
          position--
          return
        }

        newline(chr)

      } else if (chr === '*' && multi) {
        // end of multiline comment
        if (input[position] === '/') {
          position++
          return
        }

      } else {
        // nothing
      }
    }

    if (multi) {
      fail('Unclosed multiline comment')
    }
  }

  function parseKeyword(keyword) {
    // keyword[0] is not checked because it should've checked earlier
    var _pos = position
    var len = keyword.length
    for (var i=1; i<len; i++) {
      if (position >= length || keyword[i] != input[position]) {
        position = _pos-1
        fail()
      }
      position++
    }
  }

  function parseObject() {
    var result = options.null_prototype ? Object.create(null) : {}
      , empty_object = {}
      , is_non_empty = false

    while (position < length) {
      skipWhiteSpace()
      var item1 = parseKey()
      skipWhiteSpace()
      tokenStart()
      var chr = input[position++]
      tokenEnd(undefined, 'separator')

      if (chr === '}' && item1 === undefined) {
        if (!json5 && is_non_empty) {
          position--
          fail('Trailing comma in object')
        }
        return result

      } else if (chr === ':' && item1 !== undefined) {
        skipWhiteSpace()
        stack.push(item1)
        var item2 = parseGeneric()
        stack.pop()

        if (item2 === undefined) fail('No value found for key ' + item1)
        if (typeof(item1) !== 'string') {
          if (!json5 || typeof(item1) !== 'number') {
            fail('Wrong key type: ' + item1)
          }
        }

        if ((item1 in empty_object || empty_object[item1] != null) && options.reserved_keys !== 'replace') {
          if (options.reserved_keys === 'throw') {
            fail('Reserved key: ' + item1)
          } else {
            // silently ignore it
          }
        } else {
          if (typeof(options.reviver) === 'function') {
            item2 = options.reviver.call(null, item1, item2)
          }

          if (item2 !== undefined) {
            is_non_empty = true
            Object.defineProperty(result, item1, {
              value: item2,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          }
        }

        skipWhiteSpace()

        tokenStart()
        var chr = input[position++]
        tokenEnd(undefined, 'separator')

        if (chr === ',') {
          continue

        } else if (chr === '}') {
          return result

        } else {
          fail()
        }

      } else {
        position--
        fail()
      }
    }

    fail()
  }

  function parseArray() {
    var result = []

    while (position < length) {
      skipWhiteSpace()
      stack.push(result.length)
      var item = parseGeneric()
      stack.pop()
      skipWhiteSpace()
      tokenStart()
      var chr = input[position++]
      tokenEnd(undefined, 'separator')

      if (item !== undefined) {
        if (typeof(options.reviver) === 'function') {
          item = options.reviver.call(null, String(result.length), item)
        }
        if (item === undefined) {
          result.length++
          item = true // hack for check below, not included into result
        } else {
          result.push(item)
        }
      }

      if (chr === ',') {
        if (item === undefined) {
          fail('Elisions are not supported')
        }

      } else if (chr === ']') {
        if (!json5 && item === undefined && result.length) {
          position--
          fail('Trailing comma in array')
        }
        return result

      } else {
        position--
        fail()
      }
    }
  }

  function parseNumber() {
    // rewind because we don't know first char
    position--

    var start = position
      , chr = input[position++]
      , t

    var to_num = function(is_octal) {
      var str = input.substr(start, position - start)

      if (is_octal) {
        var result = parseInt(str.replace(/^0o?/, ''), 8)
      } else {
        var result = Number(str)
      }

      if (Number.isNaN(result)) {
        position--
        fail('Bad numeric literal - "' + input.substr(start, position - start + 1) + '"')
      } else if (!json5 && !str.match(/^-?(0|[1-9][0-9]*)(\.[0-9]+)?(e[+-]?[0-9]+)?$/i)) {
        // additional restrictions imposed by json
        position--
        fail('Non-json numeric literal - "' + input.substr(start, position - start + 1) + '"')
      } else {
        return result
      }
    }

    // ex: -5982475.249875e+29384
    //     ^ skipping this
    if (chr === '-' || (chr === '+' && json5)) chr = input[position++]

    if (chr === 'N' && json5) {
      parseKeyword('NaN')
      return NaN
    }

    if (chr === 'I' && json5) {
      parseKeyword('Infinity')

      // returning +inf or -inf
      return to_num()
    }

    if (chr >= '1' && chr <= '9') {
      // ex: -5982475.249875e+29384
      //        ^^^ skipping these
      while (position < length && isDecDigit(input[position])) position++
      chr = input[position++]
    }

    // special case for leading zero: 0.123456
    if (chr === '0') {
      chr = input[position++]

      //             new syntax, "0o777"           old syntax, "0777"
      var is_octal = chr === 'o' || chr === 'O' || isOctDigit(chr)
      var is_hex = chr === 'x' || chr === 'X'

      if (json5 && (is_octal || is_hex)) {
        while (position < length
           &&  (is_hex ? isHexDigit : isOctDigit)( input[position] )
        ) position++

        var sign = 1
        if (input[start] === '-') {
          sign = -1
          start++
        } else if (input[start] === '+') {
          start++
        }

        return sign * to_num(is_octal)
      }
    }

    if (chr === '.') {
      // ex: -5982475.249875e+29384
      //                ^^^ skipping these
      while (position < length && isDecDigit(input[position])) position++
      chr = input[position++]
    }

    if (chr === 'e' || chr === 'E') {
      chr = input[position++]
      if (chr === '-' || chr === '+') position++
      // ex: -5982475.249875e+29384
      //                       ^^^ skipping these
      while (position < length && isDecDigit(input[position])) position++
      chr = input[position++]
    }

    // we have char in the buffer, so count for it
    position--
    return to_num()
  }

  function parseIdentifier() {
    // rewind because we don't know first char
    position--

    var result = ''

    while (position < length) {
      var chr = input[position++]

      if (chr === '\\'
      &&  input[position] === 'u'
      &&  isHexDigit(input[position+1])
      &&  isHexDigit(input[position+2])
      &&  isHexDigit(input[position+3])
      &&  isHexDigit(input[position+4])
      ) {
        // UnicodeEscapeSequence
        chr = String.fromCharCode(parseInt(input.substr(position+1, 4), 16))
        position += 5
      }

      if (result.length) {
        // identifier started
        if (Uni.isIdentifierPart(chr)) {
          result += chr
        } else {
          position--
          return result
        }

      } else {
        if (Uni.isIdentifierStart(chr)) {
          result += chr
        } else {
          return undefined
        }
      }
    }

    fail()
  }

  function parseString(endChar) {
    // 7.8.4 of ES262 spec
    var result = ''

    while (position < length) {
      var chr = input[position++]

      if (chr === endChar) {
        return result

      } else if (chr === '\\') {
        if (position >= length) fail()
        chr = input[position++]

        if (unescapeMap[chr] && (json5 || (chr != 'v' && chr != "'"))) {
          result += unescapeMap[chr]

        } else if (json5 && isLineTerminator(chr)) {
          // line continuation
          newline(chr)

        } else if (chr === 'u' || (chr === 'x' && json5)) {
          // unicode/character escape sequence
          var off = chr === 'u' ? 4 : 2

          // validation for \uXXXX
          for (var i=0; i<off; i++) {
            if (position >= length) fail()
            if (!isHexDigit(input[position])) fail('Bad escape sequence')
            position++
          }

          result += String.fromCharCode(parseInt(input.substr(position-off, off), 16))
        } else if (json5 && isOctDigit(chr)) {
          if (chr < '4' && isOctDigit(input[position]) && isOctDigit(input[position+1])) {
            // three-digit octal
            var digits = 3
          } else if (isOctDigit(input[position])) {
            // two-digit octal
            var digits = 2
          } else {
            var digits = 1
          }
          position += digits - 1
          result += String.fromCharCode(parseInt(input.substr(position-digits, digits), 8))
          /*if (!isOctDigit(input[position])) {
            // \0 is allowed still
            result += '\0'
          } else {
            fail('Octal literals are not supported')
          }*/

        } else if (json5) {
          // \X -> x
          result += chr

        } else {
          position--
          fail()
        }

      } else if (isLineTerminator(chr)) {
        fail()

      } else {
        if (!json5 && chr.charCodeAt(0) < 32) {
          position--
          fail('Unexpected control character')
        }

        // SourceCharacter but not one of " or \ or LineTerminator
        result += chr
      }
    }

    fail()
  }

  skipWhiteSpace()
  var return_value = parseGeneric()
  if (return_value !== undefined || position < length) {
    skipWhiteSpace()

    if (position >= length) {
      if (typeof(options.reviver) === 'function') {
        return_value = options.reviver.call(null, '', return_value)
      }
      return return_value
    } else {
      fail()
    }

  } else {
    if (position) {
      fail('No data, only a whitespace')
    } else {
      fail('No data, empty input')
    }
  }
}

/*
 * parse(text, options)
 * or
 * parse(text, reviver)
 *
 * where:
 * text - string
 * options - object
 * reviver - function
 */
module.exports.parse = function parseJSON(input, options) {
  // support legacy functions
  if (typeof(options) === 'function') {
    options = {
      reviver: options
    }
  }

  if (input === undefined) {
    // parse(stringify(x)) should be equal x
    // with JSON functions it is not 'cause of undefined
    // so we're fixing it
    return undefined
  }

  // JSON.parse compat
  if (typeof(input) !== 'string') input = String(input)
  if (options == null) options = {}
  if (options.reserved_keys == null) options.reserved_keys = 'ignore'

  if (options.reserved_keys === 'throw' || options.reserved_keys === 'ignore') {
    if (options.null_prototype == null) {
      options.null_prototype = true
    }
  }

  try {
    return parse(input, options)
  } catch(err) {
    // jju is a recursive parser, so JSON.parse("{{{{{{{") could blow up the stack
    //
    // this catch is used to skip all those internal calls
    if (err instanceof SyntaxError && err.row != null && err.column != null) {
      var old_err = err
      err = SyntaxError(old_err.message)
      err.column = old_err.column
      err.row = old_err.row
    }
    throw err
  }
}

module.exports.tokenize = function tokenizeJSON(input, options) {
  if (options == null) options = {}

  options._tokenize = function(smth) {
    if (options._addstack) smth.stack.unshift.apply(smth.stack, options._addstack)
    tokens.push(smth)
  }

  var tokens = []
  tokens.data = module.exports.parse(input, options)
  return tokens
}



/***/ }),
/* 55 */
/***/ (function(module, exports) {


// This is autogenerated with esprima tools, see:
// https://github.com/ariya/esprima/blob/master/esprima.js
//
// PS: oh God, I hate Unicode

// ECMAScript 5.1/Unicode v6.3.0 NonAsciiIdentifierStart:

var Uni = module.exports

module.exports.isWhiteSpace = function isWhiteSpace(x) {
  // section 7.2, table 2
  return x === '\u0020'
      || x === '\u00A0'
      || x === '\uFEFF' // <-- this is not a Unicode WS, only a JS one
      || (x >= '\u0009' && x <= '\u000D') // 9 A B C D

      // + whitespace characters from unicode, category Zs
      || x === '\u1680'
      || x === '\u180E'
      || (x >= '\u2000' && x <= '\u200A') // 0 1 2 3 4 5 6 7 8 9 A
      || x === '\u2028'
      || x === '\u2029'
      || x === '\u202F'
      || x === '\u205F'
      || x === '\u3000'
}

module.exports.isWhiteSpaceJSON = function isWhiteSpaceJSON(x) {
  return x === '\u0020'
      || x === '\u0009'
      || x === '\u000A'
      || x === '\u000D'
}

module.exports.isLineTerminator = function isLineTerminator(x) {
  // ok, here is the part when JSON is wrong
  // section 7.3, table 3
  return x === '\u000A'
      || x === '\u000D'
      || x === '\u2028'
      || x === '\u2029'
}

module.exports.isLineTerminatorJSON = function isLineTerminatorJSON(x) {
  return x === '\u000A'
      || x === '\u000D'
}

module.exports.isIdentifierStart = function isIdentifierStart(x) {
  return x === '$'
      || x === '_'
      || (x >= 'A' && x <= 'Z')
      || (x >= 'a' && x <= 'z')
      || (x >= '\u0080' && Uni.NonAsciiIdentifierStart.test(x))
}

module.exports.isIdentifierPart = function isIdentifierPart(x) {
  return x === '$'
      || x === '_'
      || (x >= 'A' && x <= 'Z')
      || (x >= 'a' && x <= 'z')
      || (x >= '0' && x <= '9') // <-- addition to Start
      || (x >= '\u0080' && Uni.NonAsciiIdentifierPart.test(x))
}

module.exports.NonAsciiIdentifierStart = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/

// ECMAScript 5.1/Unicode v6.3.0 NonAsciiIdentifierPart:

module.exports.NonAsciiIdentifierPart = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var semver = __webpack_require__(57)
var validateLicense = __webpack_require__(58);
var hostedGitInfo = __webpack_require__(63)
var isBuiltinModule = __webpack_require__(65)
var depTypes = ["dependencies","devDependencies","optionalDependencies"]
var extractDescription = __webpack_require__(67)
var url = __webpack_require__(12)
var typos = __webpack_require__(68)

var fixer = module.exports = {
  // default warning function
  warn: function() {},

  fixRepositoryField: function(data) {
    if (data.repositories) {
      this.warn("repositories");
      data.repository = data.repositories[0]
    }
    if (!data.repository) return this.warn("missingRepository")
    if (typeof data.repository === "string") {
      data.repository = {
        type: "git",
        url: data.repository
      }
    }
    var r = data.repository.url || ""
    if (r) {
      var hosted = hostedGitInfo.fromUrl(r)
      if (hosted) {
        r = data.repository.url
          = hosted.getDefaultRepresentation() == "shortcut" ? hosted.https() : hosted.toString()
      }
    }

    if (r.match(/github.com\/[^\/]+\/[^\/]+\.git\.git$/)) {
      this.warn("brokenGitUrl", r)
    }
  }

, fixTypos: function(data) {
    Object.keys(typos.topLevel).forEach(function (d) {
      if (data.hasOwnProperty(d)) {
        this.warn("typo", d, typos.topLevel[d])
      }
    }, this)
  }

, fixScriptsField: function(data) {
    if (!data.scripts) return
    if (typeof data.scripts !== "object") {
      this.warn("nonObjectScripts")
      delete data.scripts
      return
    }
    Object.keys(data.scripts).forEach(function (k) {
      if (typeof data.scripts[k] !== "string") {
        this.warn("nonStringScript")
        delete data.scripts[k]
      } else if (typos.script[k] && !data.scripts[typos.script[k]]) {
        this.warn("typo", k, typos.script[k], "scripts")
      }
    }, this)
  }

, fixFilesField: function(data) {
    var files = data.files
    if (files && !Array.isArray(files)) {
      this.warn("nonArrayFiles")
      delete data.files
    } else if (data.files) {
      data.files = data.files.filter(function(file) {
        if (!file || typeof file !== "string") {
          this.warn("invalidFilename", file)
          return false
        } else {
          return true
        }
      }, this)
    }
  }

, fixBinField: function(data) {
    if (!data.bin) return;
    if (typeof data.bin === "string") {
      var b = {}
      var match
      if (match = data.name.match(/^@[^/]+[/](.*)$/)) {
        b[match[1]] = data.bin
      } else {
        b[data.name] = data.bin
      }
      data.bin = b
    }
  }

, fixManField: function(data) {
    if (!data.man) return;
    if (typeof data.man === "string") {
      data.man = [ data.man ]
    }
  }
, fixBundleDependenciesField: function(data) {
    var bdd = "bundledDependencies"
    var bd = "bundleDependencies"
    if (data[bdd] && !data[bd]) {
      data[bd] = data[bdd]
      delete data[bdd]
    }
    if (data[bd] && !Array.isArray(data[bd])) {
      this.warn("nonArrayBundleDependencies")
      delete data[bd]
    } else if (data[bd]) {
      data[bd] = data[bd].filter(function(bd) {
        if (!bd || typeof bd !== 'string') {
          this.warn("nonStringBundleDependency", bd)
          return false
        } else {
          if (!data.dependencies) {
            data.dependencies = {}
          }
          if (!data.dependencies.hasOwnProperty(bd)) {
            this.warn("nonDependencyBundleDependency", bd)
            data.dependencies[bd] = "*"
          }
          return true
        }
      }, this)
    }
  }

, fixDependencies: function(data, strict) {
    var loose = !strict
    objectifyDeps(data, this.warn)
    addOptionalDepsToDeps(data, this.warn)
    this.fixBundleDependenciesField(data)

    ;['dependencies','devDependencies'].forEach(function(deps) {
      if (!(deps in data)) return
      if (!data[deps] || typeof data[deps] !== "object") {
        this.warn("nonObjectDependencies", deps)
        delete data[deps]
        return
      }
      Object.keys(data[deps]).forEach(function (d) {
        var r = data[deps][d]
        if (typeof r !== 'string') {
          this.warn("nonStringDependency", d, JSON.stringify(r))
          delete data[deps][d]
        }
        var hosted = hostedGitInfo.fromUrl(data[deps][d])
        if (hosted) data[deps][d] = hosted.toString()
      }, this)
    }, this)
  }

, fixModulesField: function (data) {
    if (data.modules) {
      this.warn("deprecatedModules")
      delete data.modules
    }
  }

, fixKeywordsField: function (data) {
    if (typeof data.keywords === "string") {
      data.keywords = data.keywords.split(/,\s+/)
    }
    if (data.keywords && !Array.isArray(data.keywords)) {
      delete data.keywords
      this.warn("nonArrayKeywords")
    } else if (data.keywords) {
      data.keywords = data.keywords.filter(function(kw) {
        if (typeof kw !== "string" || !kw) {
          this.warn("nonStringKeyword");
          return false
        } else {
          return true
        }
      }, this)
    }
  }

, fixVersionField: function(data, strict) {
    // allow "loose" semver 1.0 versions in non-strict mode
    // enforce strict semver 2.0 compliance in strict mode
    var loose = !strict
    if (!data.version) {
      data.version = ""
      return true
    }
    if (!semver.valid(data.version, loose)) {
      throw new Error('Invalid version: "'+ data.version + '"')
    }
    data.version = semver.clean(data.version, loose)
    return true
  }

, fixPeople: function(data) {
    modifyPeople(data, unParsePerson)
    modifyPeople(data, parsePerson)
  }

, fixNameField: function(data, options) {
    if (typeof options === "boolean") options = {strict: options}
    else if (typeof options === "undefined") options = {}
    var strict = options.strict
    if (!data.name && !strict) {
      data.name = ""
      return
    }
    if (typeof data.name !== "string") {
      throw new Error("name field must be a string.")
    }
    if (!strict)
      data.name = data.name.trim()
    ensureValidName(data.name, strict, options.allowLegacyCase)
    if (isBuiltinModule(data.name))
      this.warn("conflictingName", data.name)
  }


, fixDescriptionField: function (data) {
    if (data.description && typeof data.description !== 'string') {
      this.warn("nonStringDescription")
      delete data.description
    }
    if (data.readme && !data.description)
      data.description = extractDescription(data.readme)
      if(data.description === undefined) delete data.description;
    if (!data.description) this.warn("missingDescription")
  }

, fixReadmeField: function (data) {
    if (!data.readme) {
      this.warn("missingReadme")
      data.readme = "ERROR: No README data found!"
    }
  }

, fixBugsField: function(data) {
    if (!data.bugs && data.repository && data.repository.url) {
      var hosted = hostedGitInfo.fromUrl(data.repository.url)
      if(hosted && hosted.bugs()) {
        data.bugs = {url: hosted.bugs()}
      }
    }
    else if(data.bugs) {
      var emailRe = /^.+@.*\..+$/
      if(typeof data.bugs == "string") {
        if(emailRe.test(data.bugs))
          data.bugs = {email:data.bugs}
        else if(url.parse(data.bugs).protocol)
          data.bugs = {url: data.bugs}
        else
          this.warn("nonEmailUrlBugsString")
      }
      else {
        bugsTypos(data.bugs, this.warn)
        var oldBugs = data.bugs
        data.bugs = {}
        if(oldBugs.url) {
          if(typeof(oldBugs.url) == "string" && url.parse(oldBugs.url).protocol)
            data.bugs.url = oldBugs.url
          else
            this.warn("nonUrlBugsUrlField")
        }
        if(oldBugs.email) {
          if(typeof(oldBugs.email) == "string" && emailRe.test(oldBugs.email))
            data.bugs.email = oldBugs.email
          else
            this.warn("nonEmailBugsEmailField")
        }
      }
      if(!data.bugs.email && !data.bugs.url) {
        delete data.bugs
        this.warn("emptyNormalizedBugs")
      }
    }
  }

, fixHomepageField: function(data) {
    if (!data.homepage && data.repository && data.repository.url) {
      var hosted = hostedGitInfo.fromUrl(data.repository.url)
      if (hosted && hosted.docs()) data.homepage = hosted.docs()
    }
    if (!data.homepage) return

    if(typeof data.homepage !== "string") {
      this.warn("nonUrlHomepage")
      return delete data.homepage
    }
    if(!url.parse(data.homepage).protocol) {
      this.warn("missingProtocolHomepage")
      data.homepage = "http://" + data.homepage
    }
  }

, fixLicenseField: function(data) {
    if (!data.license) {
      return this.warn("missingLicense")
    } else{
      if (
        typeof(data.license) !== 'string' ||
        data.license.length < 1
      ) {
        this.warn("invalidLicense")
      } else {
        if (!validateLicense(data.license).validForNewPackages)
          this.warn("invalidLicense")
      }
    }
  }
}

function isValidScopedPackageName(spec) {
  if (spec.charAt(0) !== '@') return false

  var rest = spec.slice(1).split('/')
  if (rest.length !== 2) return false

  return rest[0] && rest[1] &&
    rest[0] === encodeURIComponent(rest[0]) &&
    rest[1] === encodeURIComponent(rest[1])
}

function isCorrectlyEncodedName(spec) {
  return !spec.match(/[\/@\s\+%:]/) &&
    spec === encodeURIComponent(spec)
}

function ensureValidName (name, strict, allowLegacyCase) {
  if (name.charAt(0) === "." ||
      !(isValidScopedPackageName(name) || isCorrectlyEncodedName(name)) ||
      (strict && (!allowLegacyCase) && name !== name.toLowerCase()) ||
      name.toLowerCase() === "node_modules" ||
      name.toLowerCase() === "favicon.ico") {
        throw new Error("Invalid name: " + JSON.stringify(name))
  }
}

function modifyPeople (data, fn) {
  if (data.author) data.author = fn(data.author)
  ;["maintainers", "contributors"].forEach(function (set) {
    if (!Array.isArray(data[set])) return;
    data[set] = data[set].map(fn)
  })
  return data
}

function unParsePerson (person) {
  if (typeof person === "string") return person
  var name = person.name || ""
  var u = person.url || person.web
  var url = u ? (" ("+u+")") : ""
  var e = person.email || person.mail
  var email = e ? (" <"+e+">") : ""
  return name+email+url
}

function parsePerson (person) {
  if (typeof person !== "string") return person
  var name = person.match(/^([^\(<]+)/)
  var url = person.match(/\(([^\)]+)\)/)
  var email = person.match(/<([^>]+)>/)
  var obj = {}
  if (name && name[0].trim()) obj.name = name[0].trim()
  if (email) obj.email = email[1];
  if (url) obj.url = url[1];
  return obj
}

function addOptionalDepsToDeps (data, warn) {
  var o = data.optionalDependencies
  if (!o) return;
  var d = data.dependencies || {}
  Object.keys(o).forEach(function (k) {
    d[k] = o[k]
  })
  data.dependencies = d
}

function depObjectify (deps, type, warn) {
  if (!deps) return {}
  if (typeof deps === "string") {
    deps = deps.trim().split(/[\n\r\s\t ,]+/)
  }
  if (!Array.isArray(deps)) return deps
  warn("deprecatedArrayDependencies", type)
  var o = {}
  deps.filter(function (d) {
    return typeof d === "string"
  }).forEach(function(d) {
    d = d.trim().split(/(:?[@\s><=])/)
    var dn = d.shift()
    var dv = d.join("")
    dv = dv.trim()
    dv = dv.replace(/^@/, "")
    o[dn] = dv
  })
  return o
}

function objectifyDeps (data, warn) {
  depTypes.forEach(function (type) {
    if (!data[type]) return;
    data[type] = depObjectify(data[type], type, warn)
  })
}

function bugsTypos(bugs, warn) {
  if (!bugs) return
  Object.keys(bugs).forEach(function (k) {
    if (typos.bugs[k]) {
      warn("typo", k, typos.bugs[k], "bugs")
      bugs[typos.bugs[k]] = bugs[k]
      delete bugs[k]
    }
  })
}


/***/ }),
/* 57 */
/***/ (function(module, exports) {

exports = module.exports = SemVer;

// The debug function is excluded entirely from the minified version.
/* nomin */ var debug;
/* nomin */ if (typeof process === 'object' &&
    /* nomin */ process.env &&
    /* nomin */ process.env.NODE_DEBUG &&
    /* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
  /* nomin */ debug = function() {
    /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
    /* nomin */ args.unshift('SEMVER');
    /* nomin */ console.log.apply(console, args);
    /* nomin */ };
/* nomin */ else
  /* nomin */ debug = function() {};

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var R = 0;

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')';

var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')';

var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';


// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?';

src[FULL] = '^' + FULLPLAIN + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?';

var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';

var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?';

var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?';

var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';

var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++;
src[LONECARET] = '(?:\\^)';

var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';

var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';


// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$';

var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i]);
  if (!re[i])
    re[i] = new RegExp(src[i]);
}

exports.parse = parse;
function parse(version, loose) {
  if (version instanceof SemVer)
    return version;

  if (typeof version !== 'string')
    return null;

  if (version.length > MAX_LENGTH)
    return null;

  var r = loose ? re[LOOSE] : re[FULL];
  if (!r.test(version))
    return null;

  try {
    return new SemVer(version, loose);
  } catch (er) {
    return null;
  }
}

exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}


exports.clean = clean;
function clean(version, loose) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, loose) {
  if (version instanceof SemVer) {
    if (version.loose === loose)
      return version;
    else
      version = version.version;
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version);
  }

  if (version.length > MAX_LENGTH)
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')

  if (!(this instanceof SemVer))
    return new SemVer(version, loose);

  debug('SemVer', version, loose);
  this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

  if (!m)
    throw new TypeError('Invalid Version: ' + version);

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
    throw new TypeError('Invalid major version')

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
    throw new TypeError('Invalid minor version')

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
    throw new TypeError('Invalid patch version')

  // numberify any prerelease numeric ids
  if (!m[4])
    this.prerelease = [];
  else
    this.prerelease = m[4].split('.').map(function(id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER)
          return num;
      }
      return id;
    });

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function() {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length)
    this.version += '-' + this.prerelease.join('.');
  return this.version;
};

SemVer.prototype.toString = function() {
  return this.version;
};

SemVer.prototype.compare = function(other) {
  debug('SemVer.compare', this.version, this.loose, other);
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length)
    return -1;
  else if (!this.prerelease.length && other.prerelease.length)
    return 1;
  else if (!this.prerelease.length && !other.prerelease.length)
    return 0;

  var i = 0;
  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    debug('prerelease compare', i, a, b);
    if (a === undefined && b === undefined)
      return 0;
    else if (b === undefined)
      return 1;
    else if (a === undefined)
      return -1;
    else if (a === b)
      continue;
    else
      return compareIdentifiers(a, b);
  } while (++i);
};

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function(release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc('pre', identifier);
      break;
    case 'preminor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc('pre', identifier);
      break;
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0;
      this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0)
        this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
        this.major++;
      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0)
        this.minor++;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0)
        this.patch++;
      this.prerelease = [];
      break;
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0)
        this.prerelease = [0];
      else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) // didn't increment anything
          this.prerelease.push(0);
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1]))
            this.prerelease = [identifier, 0];
        } else
          this.prerelease = [identifier, 0];
      }
      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }
  this.format();
  this.raw = this.version;
  return this;
};

exports.inc = inc;
function inc(version, release, loose, identifier) {
  if (typeof(loose) === 'string') {
    identifier = loose;
    loose = undefined;
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
}

exports.diff = diff;
function diff(version1, version2) {
  if (eq(version1, version2)) {
    return null;
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    if (v1.prerelease.length || v2.prerelease.length) {
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return 'pre'+key;
          }
        }
      }
      return 'prerelease';
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return key;
        }
      }
    }
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return (anum && !bnum) ? -1 :
         (bnum && !anum) ? 1 :
         a < b ? -1 :
         a > b ? 1 :
         0;
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.major = major;
function major(a, loose) {
  return new SemVer(a, loose).major;
}

exports.minor = minor;
function minor(a, loose) {
  return new SemVer(a, loose).minor;
}

exports.patch = patch;
function patch(a, loose) {
  return new SemVer(a, loose).patch;
}

exports.compare = compare;
function compare(a, b, loose) {
  return new SemVer(a, loose).compare(b);
}

exports.compareLoose = compareLoose;
function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;
function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;
function sort(list, loose) {
  return list.sort(function(a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;
function rsort(list, loose) {
  return list.sort(function(a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;
function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;
function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;
function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;
function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;
function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;
function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;
function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
    case '===':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a === b;
      break;
    case '!==':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a !== b;
      break;
    case '': case '=': case '==': ret = eq(a, b, loose); break;
    case '!=': ret = neq(a, b, loose); break;
    case '>': ret = gt(a, b, loose); break;
    case '>=': ret = gte(a, b, loose); break;
    case '<': ret = lt(a, b, loose); break;
    case '<=': ret = lte(a, b, loose); break;
    default: throw new TypeError('Invalid operator: ' + op);
  }
  return ret;
}

exports.Comparator = Comparator;
function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
    if (comp.loose === loose)
      return comp;
    else
      comp = comp.value;
  }

  if (!(this instanceof Comparator))
    return new Comparator(comp, loose);

  debug('comparator', comp, loose);
  this.loose = loose;
  this.parse(comp);

  if (this.semver === ANY)
    this.value = '';
  else
    this.value = this.operator + this.semver.version;

  debug('comp', this);
}

var ANY = {};
Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m)
    throw new TypeError('Invalid comparator: ' + comp);

  this.operator = m[1];
  if (this.operator === '=')
    this.operator = '';

  // if it literally is just '>' or '' then allow anything.
  if (!m[2])
    this.semver = ANY;
  else
    this.semver = new SemVer(m[2], this.loose);
};

Comparator.prototype.toString = function() {
  return this.value;
};

Comparator.prototype.test = function(version) {
  debug('Comparator.test', version, this.loose);

  if (this.semver === ANY)
    return true;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  return cmp(version, this.operator, this.semver, this.loose);
};


exports.Range = Range;
function Range(range, loose) {
  if ((range instanceof Range) && range.loose === loose)
    return range;

  if (!(this instanceof Range))
    return new Range(range, loose);

  this.loose = loose;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function() {
  return this.range;
};

Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();
  debug('range', range, loose);
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range);
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[COMPARATORTRIM]);

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });

  return set;
};

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
    return comp.map(function(c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, loose) {
  debug('comp', comp);
  comp = replaceCarets(comp, loose);
  debug('caret', comp);
  comp = replaceTildes(comp, loose);
  debug('tildes', comp);
  comp = replaceXRanges(comp, loose);
  debug('xrange', comp);
  comp = replaceStars(comp, loose);
  debug('stars', comp);
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceTilde(comp, loose);
  }).join(' ');
}

function replaceTilde(comp, loose) {
  var r = loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p))
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    else if (pr) {
      debug('replaceTilde pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      ret = '>=' + M + '.' + m + '.' + p + pr +
            ' <' + M + '.' + (+m + 1) + '.0';
    } else
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0';

    debug('tilde return', ret);
    return ret;
  });
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceCaret(comp, loose);
  }).join(' ');
}

function replaceCaret(comp, loose) {
  debug('caret', comp, loose);
  var r = loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p)) {
      if (M === '0')
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      else
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
    } else if (pr) {
      debug('replaceCaret pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + (+M + 1) + '.0.0';
    } else {
      debug('no pr');
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0';
    }

    debug('caret return', ret);
    return ret;
  });
}

function replaceXRanges(comp, loose) {
  debug('replaceXRanges', comp, loose);
  return comp.split(/\s+/).map(function(comp) {
    return replaceXRange(comp, loose);
  }).join(' ');
}

function replaceXRange(comp, loose) {
  comp = comp.trim();
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX)
      gtlt = '';

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // replace X with 0
      if (xm)
        m = 0;
      if (xp)
        p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>=';
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else if (xp) {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';
        if (xm)
          M = +M + 1;
        else
          m = +m + 1;
      }

      ret = gtlt + M + '.' + m + '.' + p;
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    }

    debug('xRange return', ret);

    return ret;
  });
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, loose) {
  debug('replaceStars', comp, loose);
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '');
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace($0,
                       from, fM, fm, fp, fpr, fb,
                       to, tM, tm, tp, tpr, tb) {

  if (isX(fM))
    from = '';
  else if (isX(fm))
    from = '>=' + fM + '.0.0';
  else if (isX(fp))
    from = '>=' + fM + '.' + fm + '.0';
  else
    from = '>=' + from;

  if (isX(tM))
    to = '';
  else if (isX(tm))
    to = '<' + (+tM + 1) + '.0.0';
  else if (isX(tp))
    to = '<' + tM + '.' + (+tm + 1) + '.0';
  else if (tpr)
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  else
    to = '<=' + to;

  return (from + ' ' + to).trim();
}


// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
  if (!version)
    return false;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version))
      return true;
  }
  return false;
};

function testSet(set, version) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version))
      return false;
  }

  if (version.prerelease.length) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (var i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === ANY)
        continue;

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch)
          return true;
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false;
  }

  return true;
}

exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, loose) {
  return versions.filter(function(version) {
    return satisfies(version, range, loose);
  }).sort(function(a, b) {
    return rcompare(a, b, loose);
  })[0] || null;
}

exports.minSatisfying = minSatisfying;
function minSatisfying(versions, range, loose) {
  return versions.filter(function(version) {
    return satisfies(version, range, loose);
  }).sort(function(a, b) {
    return compare(a, b, loose);
  })[0] || null;
}

exports.validRange = validRange;
function validRange(range, loose) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, loose).range || '*';
  } catch (er) {
    return null;
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}

exports.outside = outside;
function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose);
  range = new Range(range, loose);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, loose)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function(comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, loose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, loose)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}

exports.prerelease = prerelease;
function prerelease(version, loose) {
  var parsed = parse(version, loose);
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
}


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(59);
var correct = __webpack_require__(61);

var genericWarning = (
  'license should be ' +
  'a valid SPDX license expression (without "LicenseRef"), ' +
  '"UNLICENSED", or ' +
  '"SEE LICENSE IN <filename>"'
);

var fileReferenceRE = /^SEE LICEN[CS]E IN (.+)$/;

function startsWith(prefix, string) {
  return string.slice(0, prefix.length) === prefix;
}

function usesLicenseRef(ast) {
  if (ast.hasOwnProperty('license')) {
    var license = ast.license;
    return (
      startsWith('LicenseRef', license) ||
      startsWith('DocumentRef', license)
    );
  } else {
    return (
      usesLicenseRef(ast.left) ||
      usesLicenseRef(ast.right)
    );
  }
}

module.exports = function(argument) {
  var ast;

  try {
    ast = parse(argument);
  } catch (e) {
    var match
    if (
      argument === 'UNLICENSED' ||
      argument === 'UNLICENCED'
    ) {
      return {
        validForOldPackages: true,
        validForNewPackages: true,
        unlicensed: true
      };
    } else if (match = fileReferenceRE.exec(argument)) {
      return {
        validForOldPackages: true,
        validForNewPackages: true,
        inFile: match[1]
      };
    } else {
      var result = {
        validForOldPackages: false,
        validForNewPackages: false,
        warnings: [genericWarning]
      };
      var corrected = correct(argument);
      if (corrected) {
        result.warnings.push(
          'license is similar to the valid expression "' + corrected + '"'
        );
      }
      return result;
    }
  }

  if (usesLicenseRef(ast)) {
    return {
      validForNewPackages: false,
      validForOldPackages: false,
      spdx: true,
      warnings: [genericWarning]
    };
  } else {
    return {
      validForNewPackages: true,
      validForOldPackages: true,
      spdx: true
    };
  }
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(60).parser

module.exports = function (argument) {
  return parser.parse(argument)
}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var spdxparse = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,6],$V2=[1,7],$V3=[1,4],$V4=[1,9],$V5=[1,10],$V6=[5,14,15,17],$V7=[5,12,14,15,17];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"start":3,"expression":4,"EOS":5,"simpleExpression":6,"LICENSE":7,"PLUS":8,"LICENSEREF":9,"DOCUMENTREF":10,"COLON":11,"WITH":12,"EXCEPTION":13,"AND":14,"OR":15,"OPEN":16,"CLOSE":17,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOS",7:"LICENSE",8:"PLUS",9:"LICENSEREF",10:"DOCUMENTREF",11:"COLON",12:"WITH",13:"EXCEPTION",14:"AND",15:"OR",16:"OPEN",17:"CLOSE"},
productions_: [0,[3,2],[6,1],[6,2],[6,1],[6,3],[4,1],[4,3],[4,3],[4,3],[4,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return this.$ = $$[$0-1]
break;
case 2: case 4: case 5:
this.$ = {license: yytext}
break;
case 3:
this.$ = {license: $$[$0-1], plus: true}
break;
case 6:
this.$ = $$[$0]
break;
case 7:
this.$ = {exception: $$[$0]}
this.$.license = $$[$0-2].license
if ($$[$0-2].hasOwnProperty('plus')) {
  this.$.plus = $$[$0-2].plus
}
break;
case 8:
this.$ = {conjunction: 'and', left: $$[$0-2], right: $$[$0]}
break;
case 9:
this.$ = {conjunction: 'or', left: $$[$0-2], right: $$[$0]}
break;
case 10:
this.$ = $$[$0-1]
break;
}
},
table: [{3:1,4:2,6:3,7:$V0,9:$V1,10:$V2,16:$V3},{1:[3]},{5:[1,8],14:$V4,15:$V5},o($V6,[2,6],{12:[1,11]}),{4:12,6:3,7:$V0,9:$V1,10:$V2,16:$V3},o($V7,[2,2],{8:[1,13]}),o($V7,[2,4]),{11:[1,14]},{1:[2,1]},{4:15,6:3,7:$V0,9:$V1,10:$V2,16:$V3},{4:16,6:3,7:$V0,9:$V1,10:$V2,16:$V3},{13:[1,17]},{14:$V4,15:$V5,17:[1,18]},o($V7,[2,3]),{9:[1,19]},o($V6,[2,8]),o([5,15,17],[2,9],{14:$V4}),o($V6,[2,7]),o($V6,[2,10]),o($V7,[2,5])],
defaultActions: {8:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 5
break;
case 1:/* skip whitespace */
break;
case 2:return 8
break;
case 3:return 16
break;
case 4:return 17
break;
case 5:return 11
break;
case 6:return 10
break;
case 7:return 9
break;
case 8:return 14
break;
case 9:return 15
break;
case 10:return 12
break;
case 11:return 7
break;
case 12:return 7
break;
case 13:return 7
break;
case 14:return 7
break;
case 15:return 7
break;
case 16:return 7
break;
case 17:return 7
break;
case 18:return 7
break;
case 19:return 7
break;
case 20:return 7
break;
case 21:return 7
break;
case 22:return 7
break;
case 23:return 7
break;
case 24:return 13
break;
case 25:return 13
break;
case 26:return 13
break;
case 27:return 13
break;
case 28:return 13
break;
case 29:return 13
break;
case 30:return 13
break;
case 31:return 13
break;
case 32:return 7
break;
case 33:return 13
break;
case 34:return 7
break;
case 35:return 13
break;
case 36:return 7
break;
case 37:return 13
break;
case 38:return 13
break;
case 39:return 7
break;
case 40:return 13
break;
case 41:return 13
break;
case 42:return 13
break;
case 43:return 13
break;
case 44:return 13
break;
case 45:return 7
break;
case 46:return 13
break;
case 47:return 7
break;
case 48:return 7
break;
case 49:return 7
break;
case 50:return 7
break;
case 51:return 7
break;
case 52:return 7
break;
case 53:return 7
break;
case 54:return 7
break;
case 55:return 7
break;
case 56:return 7
break;
case 57:return 7
break;
case 58:return 7
break;
case 59:return 7
break;
case 60:return 7
break;
case 61:return 7
break;
case 62:return 7
break;
case 63:return 13
break;
case 64:return 7
break;
case 65:return 7
break;
case 66:return 13
break;
case 67:return 7
break;
case 68:return 7
break;
case 69:return 7
break;
case 70:return 7
break;
case 71:return 7
break;
case 72:return 7
break;
case 73:return 13
break;
case 74:return 7
break;
case 75:return 13
break;
case 76:return 7
break;
case 77:return 7
break;
case 78:return 7
break;
case 79:return 7
break;
case 80:return 7
break;
case 81:return 7
break;
case 82:return 7
break;
case 83:return 7
break;
case 84:return 7
break;
case 85:return 7
break;
case 86:return 7
break;
case 87:return 7
break;
case 88:return 7
break;
case 89:return 7
break;
case 90:return 7
break;
case 91:return 7
break;
case 92:return 7
break;
case 93:return 7
break;
case 94:return 7
break;
case 95:return 7
break;
case 96:return 7
break;
case 97:return 7
break;
case 98:return 7
break;
case 99:return 7
break;
case 100:return 7
break;
case 101:return 7
break;
case 102:return 7
break;
case 103:return 7
break;
case 104:return 7
break;
case 105:return 7
break;
case 106:return 7
break;
case 107:return 7
break;
case 108:return 7
break;
case 109:return 7
break;
case 110:return 7
break;
case 111:return 7
break;
case 112:return 7
break;
case 113:return 7
break;
case 114:return 7
break;
case 115:return 7
break;
case 116:return 7
break;
case 117:return 7
break;
case 118:return 7
break;
case 119:return 7
break;
case 120:return 7
break;
case 121:return 7
break;
case 122:return 7
break;
case 123:return 7
break;
case 124:return 7
break;
case 125:return 7
break;
case 126:return 7
break;
case 127:return 7
break;
case 128:return 7
break;
case 129:return 7
break;
case 130:return 7
break;
case 131:return 7
break;
case 132:return 7
break;
case 133:return 7
break;
case 134:return 7
break;
case 135:return 7
break;
case 136:return 7
break;
case 137:return 7
break;
case 138:return 7
break;
case 139:return 7
break;
case 140:return 7
break;
case 141:return 7
break;
case 142:return 7
break;
case 143:return 7
break;
case 144:return 7
break;
case 145:return 7
break;
case 146:return 7
break;
case 147:return 7
break;
case 148:return 7
break;
case 149:return 7
break;
case 150:return 7
break;
case 151:return 7
break;
case 152:return 7
break;
case 153:return 7
break;
case 154:return 7
break;
case 155:return 7
break;
case 156:return 7
break;
case 157:return 7
break;
case 158:return 7
break;
case 159:return 7
break;
case 160:return 7
break;
case 161:return 7
break;
case 162:return 7
break;
case 163:return 7
break;
case 164:return 7
break;
case 165:return 7
break;
case 166:return 7
break;
case 167:return 7
break;
case 168:return 7
break;
case 169:return 7
break;
case 170:return 7
break;
case 171:return 7
break;
case 172:return 7
break;
case 173:return 7
break;
case 174:return 7
break;
case 175:return 7
break;
case 176:return 7
break;
case 177:return 7
break;
case 178:return 7
break;
case 179:return 7
break;
case 180:return 7
break;
case 181:return 7
break;
case 182:return 7
break;
case 183:return 7
break;
case 184:return 7
break;
case 185:return 7
break;
case 186:return 7
break;
case 187:return 7
break;
case 188:return 7
break;
case 189:return 7
break;
case 190:return 7
break;
case 191:return 7
break;
case 192:return 7
break;
case 193:return 7
break;
case 194:return 7
break;
case 195:return 7
break;
case 196:return 7
break;
case 197:return 7
break;
case 198:return 7
break;
case 199:return 7
break;
case 200:return 7
break;
case 201:return 7
break;
case 202:return 7
break;
case 203:return 7
break;
case 204:return 7
break;
case 205:return 7
break;
case 206:return 7
break;
case 207:return 7
break;
case 208:return 7
break;
case 209:return 7
break;
case 210:return 7
break;
case 211:return 7
break;
case 212:return 7
break;
case 213:return 7
break;
case 214:return 7
break;
case 215:return 7
break;
case 216:return 7
break;
case 217:return 7
break;
case 218:return 7
break;
case 219:return 7
break;
case 220:return 7
break;
case 221:return 7
break;
case 222:return 7
break;
case 223:return 7
break;
case 224:return 7
break;
case 225:return 7
break;
case 226:return 7
break;
case 227:return 7
break;
case 228:return 7
break;
case 229:return 7
break;
case 230:return 7
break;
case 231:return 7
break;
case 232:return 7
break;
case 233:return 7
break;
case 234:return 7
break;
case 235:return 7
break;
case 236:return 7
break;
case 237:return 7
break;
case 238:return 7
break;
case 239:return 7
break;
case 240:return 7
break;
case 241:return 7
break;
case 242:return 7
break;
case 243:return 7
break;
case 244:return 7
break;
case 245:return 7
break;
case 246:return 7
break;
case 247:return 7
break;
case 248:return 7
break;
case 249:return 7
break;
case 250:return 7
break;
case 251:return 7
break;
case 252:return 7
break;
case 253:return 7
break;
case 254:return 7
break;
case 255:return 7
break;
case 256:return 7
break;
case 257:return 7
break;
case 258:return 7
break;
case 259:return 7
break;
case 260:return 7
break;
case 261:return 7
break;
case 262:return 7
break;
case 263:return 7
break;
case 264:return 7
break;
case 265:return 7
break;
case 266:return 7
break;
case 267:return 7
break;
case 268:return 7
break;
case 269:return 7
break;
case 270:return 7
break;
case 271:return 7
break;
case 272:return 7
break;
case 273:return 7
break;
case 274:return 7
break;
case 275:return 7
break;
case 276:return 7
break;
case 277:return 7
break;
case 278:return 7
break;
case 279:return 7
break;
case 280:return 7
break;
case 281:return 7
break;
case 282:return 7
break;
case 283:return 7
break;
case 284:return 7
break;
case 285:return 7
break;
case 286:return 7
break;
case 287:return 7
break;
case 288:return 7
break;
case 289:return 7
break;
case 290:return 7
break;
case 291:return 7
break;
case 292:return 7
break;
case 293:return 7
break;
case 294:return 7
break;
case 295:return 7
break;
case 296:return 7
break;
case 297:return 7
break;
case 298:return 7
break;
case 299:return 7
break;
case 300:return 7
break;
case 301:return 7
break;
case 302:return 7
break;
case 303:return 7
break;
case 304:return 7
break;
case 305:return 7
break;
case 306:return 7
break;
case 307:return 7
break;
case 308:return 7
break;
case 309:return 7
break;
case 310:return 7
break;
case 311:return 7
break;
case 312:return 7
break;
case 313:return 7
break;
case 314:return 7
break;
case 315:return 7
break;
case 316:return 7
break;
case 317:return 7
break;
case 318:return 7
break;
case 319:return 7
break;
case 320:return 7
break;
case 321:return 7
break;
case 322:return 7
break;
case 323:return 7
break;
case 324:return 7
break;
case 325:return 7
break;
case 326:return 7
break;
case 327:return 7
break;
case 328:return 7
break;
case 329:return 7
break;
case 330:return 7
break;
case 331:return 7
break;
case 332:return 7
break;
case 333:return 7
break;
case 334:return 7
break;
case 335:return 7
break;
case 336:return 7
break;
case 337:return 7
break;
case 338:return 7
break;
case 339:return 7
break;
case 340:return 7
break;
case 341:return 7
break;
case 342:return 7
break;
case 343:return 7
break;
case 344:return 7
break;
case 345:return 7
break;
case 346:return 7
break;
case 347:return 7
break;
case 348:return 7
break;
case 349:return 7
break;
case 350:return 7
break;
case 351:return 7
break;
case 352:return 7
break;
case 353:return 7
break;
case 354:return 7
break;
case 355:return 7
break;
case 356:return 7
break;
case 357:return 7
break;
case 358:return 7
break;
case 359:return 7
break;
case 360:return 7
break;
case 361:return 7
break;
case 362:return 7
break;
case 363:return 7
break;
case 364:return 7
break;
}
},
rules: [/^(?:$)/,/^(?:\s+)/,/^(?:\+)/,/^(?:\()/,/^(?:\))/,/^(?::)/,/^(?:DocumentRef-([0-9A-Za-z-+.]+))/,/^(?:LicenseRef-([0-9A-Za-z-+.]+))/,/^(?:AND)/,/^(?:OR)/,/^(?:WITH)/,/^(?:BSD-3-Clause-No-Nuclear-License-2014)/,/^(?:BSD-3-Clause-No-Nuclear-Warranty)/,/^(?:GPL-2\.0-with-classpath-exception)/,/^(?:GPL-3\.0-with-autoconf-exception)/,/^(?:GPL-2\.0-with-autoconf-exception)/,/^(?:BSD-3-Clause-No-Nuclear-License)/,/^(?:MPL-2\.0-no-copyleft-exception)/,/^(?:GPL-2\.0-with-bison-exception)/,/^(?:GPL-2\.0-with-font-exception)/,/^(?:GPL-2\.0-with-GCC-exception)/,/^(?:CNRI-Python-GPL-Compatible)/,/^(?:GPL-3\.0-with-GCC-exception)/,/^(?:BSD-3-Clause-Attribution)/,/^(?:Classpath-exception-2\.0)/,/^(?:WxWindows-exception-3\.1)/,/^(?:freertos-exception-2\.0)/,/^(?:Autoconf-exception-3\.0)/,/^(?:i2p-gpl-java-exception)/,/^(?:gnu-javamail-exception)/,/^(?:Nokia-Qt-exception-1\.1)/,/^(?:Autoconf-exception-2\.0)/,/^(?:BSD-2-Clause-FreeBSD)/,/^(?:u-boot-exception-2\.0)/,/^(?:zlib-acknowledgement)/,/^(?:Bison-exception-2\.2)/,/^(?:BSD-2-Clause-NetBSD)/,/^(?:CLISP-exception-2\.0)/,/^(?:eCos-exception-2\.0)/,/^(?:BSD-3-Clause-Clear)/,/^(?:Font-exception-2\.0)/,/^(?:FLTK-exception-2\.0)/,/^(?:GCC-exception-2\.0)/,/^(?:Qwt-exception-1\.0)/,/^(?:Libtool-exception)/,/^(?:BSD-3-Clause-LBNL)/,/^(?:GCC-exception-3\.1)/,/^(?:Artistic-1\.0-Perl)/,/^(?:Artistic-1\.0-cl8)/,/^(?:CC-BY-NC-SA-2\.5)/,/^(?:MIT-advertising)/,/^(?:BSD-Source-Code)/,/^(?:CC-BY-NC-SA-4\.0)/,/^(?:LiLiQ-Rplus-1\.1)/,/^(?:CC-BY-NC-SA-3\.0)/,/^(?:BSD-4-Clause-UC)/,/^(?:CC-BY-NC-SA-2\.0)/,/^(?:CC-BY-NC-SA-1\.0)/,/^(?:CC-BY-NC-ND-4\.0)/,/^(?:CC-BY-NC-ND-3\.0)/,/^(?:CC-BY-NC-ND-2\.5)/,/^(?:CC-BY-NC-ND-2\.0)/,/^(?:CC-BY-NC-ND-1\.0)/,/^(?:LZMA-exception)/,/^(?:BitTorrent-1\.1)/,/^(?:CrystalStacker)/,/^(?:FLTK-exception)/,/^(?:SugarCRM-1\.1\.3)/,/^(?:BSD-Protection)/,/^(?:BitTorrent-1\.0)/,/^(?:HaskellReport)/,/^(?:Interbase-1\.0)/,/^(?:StandardML-NJ)/,/^(?:mif-exception)/,/^(?:Frameworx-1\.0)/,/^(?:389-exception)/,/^(?:CC-BY-NC-2\.0)/,/^(?:CC-BY-NC-2\.5)/,/^(?:CC-BY-NC-3\.0)/,/^(?:CC-BY-NC-4\.0)/,/^(?:W3C-19980720)/,/^(?:CC-BY-SA-1\.0)/,/^(?:CC-BY-SA-2\.0)/,/^(?:CC-BY-SA-2\.5)/,/^(?:CC-BY-ND-2\.0)/,/^(?:CC-BY-SA-4\.0)/,/^(?:CC-BY-SA-3\.0)/,/^(?:Artistic-1\.0)/,/^(?:Artistic-2\.0)/,/^(?:CC-BY-ND-2\.5)/,/^(?:CC-BY-ND-3\.0)/,/^(?:CC-BY-ND-4\.0)/,/^(?:CC-BY-ND-1\.0)/,/^(?:BSD-4-Clause)/,/^(?:BSD-3-Clause)/,/^(?:BSD-2-Clause)/,/^(?:CC-BY-NC-1\.0)/,/^(?:bzip2-1\.0\.6)/,/^(?:Unicode-TOU)/,/^(?:CNRI-Jython)/,/^(?:ImageMagick)/,/^(?:Adobe-Glyph)/,/^(?:CUA-OPL-1\.0)/,/^(?:OLDAP-2\.2\.2)/,/^(?:LiLiQ-R-1\.1)/,/^(?:bzip2-1\.0\.5)/,/^(?:LiLiQ-P-1\.1)/,/^(?:OLDAP-2\.0\.1)/,/^(?:OLDAP-2\.2\.1)/,/^(?:CNRI-Python)/,/^(?:XFree86-1\.1)/,/^(?:OSET-PL-2\.1)/,/^(?:Apache-2\.0)/,/^(?:Watcom-1\.0)/,/^(?:PostgreSQL)/,/^(?:Python-2\.0)/,/^(?:RHeCos-1\.1)/,/^(?:EUDatagrid)/,/^(?:Spencer-99)/,/^(?:Intel-ACPI)/,/^(?:CECILL-1\.0)/,/^(?:CECILL-1\.1)/,/^(?:JasPer-2\.0)/,/^(?:CECILL-2\.0)/,/^(?:CECILL-2\.1)/,/^(?:gSOAP-1\.3b)/,/^(?:Spencer-94)/,/^(?:Apache-1\.1)/,/^(?:Spencer-86)/,/^(?:Apache-1\.0)/,/^(?:ClArtistic)/,/^(?:TORQUE-1\.1)/,/^(?:CATOSL-1\.1)/,/^(?:Adobe-2006)/,/^(?:Zimbra-1\.4)/,/^(?:Zimbra-1\.3)/,/^(?:Condor-1\.1)/,/^(?:CC-BY-3\.0)/,/^(?:CC-BY-2\.5)/,/^(?:OLDAP-2\.4)/,/^(?:SGI-B-1\.1)/,/^(?:SISSL-1\.2)/,/^(?:SGI-B-1\.0)/,/^(?:OLDAP-2\.3)/,/^(?:CC-BY-4\.0)/,/^(?:Crossword)/,/^(?:SimPL-2\.0)/,/^(?:OLDAP-2\.2)/,/^(?:OLDAP-2\.1)/,/^(?:ErlPL-1\.1)/,/^(?:LPPL-1\.3a)/,/^(?:LPPL-1\.3c)/,/^(?:OLDAP-2\.0)/,/^(?:Leptonica)/,/^(?:CPOL-1\.02)/,/^(?:OLDAP-1\.4)/,/^(?:OLDAP-1\.3)/,/^(?:CC-BY-2\.0)/,/^(?:Unlicense)/,/^(?:OLDAP-2\.8)/,/^(?:OLDAP-1\.2)/,/^(?:MakeIndex)/,/^(?:OLDAP-2\.7)/,/^(?:OLDAP-1\.1)/,/^(?:Sleepycat)/,/^(?:D-FSL-1\.0)/,/^(?:CC-BY-1\.0)/,/^(?:OLDAP-2\.6)/,/^(?:WXwindows)/,/^(?:NPOSL-3\.0)/,/^(?:FreeImage)/,/^(?:SGI-B-2\.0)/,/^(?:OLDAP-2\.5)/,/^(?:Beerware)/,/^(?:Newsletr)/,/^(?:NBPL-1\.0)/,/^(?:NASA-1\.3)/,/^(?:NLOD-1\.0)/,/^(?:AGPL-1\.0)/,/^(?:OCLC-2\.0)/,/^(?:ODbL-1\.0)/,/^(?:PDDL-1\.0)/,/^(?:Motosoto)/,/^(?:Afmparse)/,/^(?:ANTLR-PD)/,/^(?:LPL-1\.02)/,/^(?:Abstyles)/,/^(?:eCos-2\.0)/,/^(?:APSL-1\.0)/,/^(?:LPPL-1\.2)/,/^(?:LPPL-1\.1)/,/^(?:LPPL-1\.0)/,/^(?:APSL-1\.1)/,/^(?:APSL-2\.0)/,/^(?:Info-ZIP)/,/^(?:Zend-2\.0)/,/^(?:IBM-pibs)/,/^(?:LGPL-2\.0)/,/^(?:LGPL-3\.0)/,/^(?:LGPL-2\.1)/,/^(?:GFDL-1\.3)/,/^(?:PHP-3\.01)/,/^(?:GFDL-1\.2)/,/^(?:GFDL-1\.1)/,/^(?:AGPL-3\.0)/,/^(?:Giftware)/,/^(?:EUPL-1\.1)/,/^(?:RPSL-1\.0)/,/^(?:EUPL-1\.0)/,/^(?:MIT-enna)/,/^(?:CECILL-B)/,/^(?:diffmark)/,/^(?:CECILL-C)/,/^(?:CDDL-1\.0)/,/^(?:Sendmail)/,/^(?:CDDL-1\.1)/,/^(?:CPAL-1\.0)/,/^(?:APSL-1\.2)/,/^(?:NPL-1\.1)/,/^(?:AFL-1\.2)/,/^(?:Caldera)/,/^(?:AFL-2\.0)/,/^(?:FSFULLR)/,/^(?:AFL-2\.1)/,/^(?:VSL-1\.0)/,/^(?:VOSTROM)/,/^(?:UPL-1\.0)/,/^(?:Dotseqn)/,/^(?:CPL-1\.0)/,/^(?:dvipdfm)/,/^(?:EPL-1\.0)/,/^(?:OCCT-PL)/,/^(?:ECL-1\.0)/,/^(?:Latex2e)/,/^(?:ECL-2\.0)/,/^(?:GPL-1\.0)/,/^(?:GPL-2\.0)/,/^(?:GPL-3\.0)/,/^(?:AFL-3\.0)/,/^(?:LAL-1\.2)/,/^(?:LAL-1\.3)/,/^(?:EFL-1\.0)/,/^(?:EFL-2\.0)/,/^(?:gnuplot)/,/^(?:Aladdin)/,/^(?:LPL-1\.0)/,/^(?:libtiff)/,/^(?:Entessa)/,/^(?:AMDPLPA)/,/^(?:IPL-1\.0)/,/^(?:OPL-1\.0)/,/^(?:OSL-1\.0)/,/^(?:OSL-1\.1)/,/^(?:OSL-2\.0)/,/^(?:OSL-2\.1)/,/^(?:OSL-3\.0)/,/^(?:OpenSSL)/,/^(?:ZPL-2\.1)/,/^(?:PHP-3\.0)/,/^(?:ZPL-2\.0)/,/^(?:ZPL-1\.1)/,/^(?:CC0-1\.0)/,/^(?:SPL-1\.0)/,/^(?:psutils)/,/^(?:MPL-1\.0)/,/^(?:QPL-1\.0)/,/^(?:MPL-1\.1)/,/^(?:MPL-2\.0)/,/^(?:APL-1\.0)/,/^(?:RPL-1\.1)/,/^(?:RPL-1\.5)/,/^(?:MIT-CMU)/,/^(?:Multics)/,/^(?:Eurosym)/,/^(?:BSL-1\.0)/,/^(?:MIT-feh)/,/^(?:Saxpath)/,/^(?:Borceux)/,/^(?:OFL-1\.1)/,/^(?:OFL-1\.0)/,/^(?:AFL-1\.1)/,/^(?:YPL-1\.1)/,/^(?:YPL-1\.0)/,/^(?:NPL-1\.0)/,/^(?:iMatix)/,/^(?:mpich2)/,/^(?:APAFML)/,/^(?:Bahyph)/,/^(?:RSA-MD)/,/^(?:psfrag)/,/^(?:Plexus)/,/^(?:eGenix)/,/^(?:Glulxe)/,/^(?:SAX-PD)/,/^(?:Imlib2)/,/^(?:Wsuipa)/,/^(?:LGPLLR)/,/^(?:Libpng)/,/^(?:xinetd)/,/^(?:MITNFA)/,/^(?:NetCDF)/,/^(?:Naumen)/,/^(?:SMPPL)/,/^(?:Nunit)/,/^(?:FSFUL)/,/^(?:GL2PS)/,/^(?:SMLNJ)/,/^(?:Rdisc)/,/^(?:Noweb)/,/^(?:Nokia)/,/^(?:SISSL)/,/^(?:Qhull)/,/^(?:Intel)/,/^(?:Glide)/,/^(?:Xerox)/,/^(?:AMPAS)/,/^(?:WTFPL)/,/^(?:MS-PL)/,/^(?:XSkat)/,/^(?:MS-RL)/,/^(?:MirOS)/,/^(?:RSCPL)/,/^(?:TMate)/,/^(?:OGTSL)/,/^(?:FSFAP)/,/^(?:NCSA)/,/^(?:Zlib)/,/^(?:SCEA)/,/^(?:SNIA)/,/^(?:NGPL)/,/^(?:NOSL)/,/^(?:ADSL)/,/^(?:MTLL)/,/^(?:NLPL)/,/^(?:Ruby)/,/^(?:JSON)/,/^(?:Barr)/,/^(?:0BSD)/,/^(?:Xnet)/,/^(?:Cube)/,/^(?:curl)/,/^(?:DSDP)/,/^(?:Fair)/,/^(?:HPND)/,/^(?:TOSL)/,/^(?:IJG)/,/^(?:SWL)/,/^(?:Vim)/,/^(?:FTL)/,/^(?:ICU)/,/^(?:OML)/,/^(?:NRL)/,/^(?:DOC)/,/^(?:TCL)/,/^(?:W3C)/,/^(?:NTP)/,/^(?:IPA)/,/^(?:ISC)/,/^(?:X11)/,/^(?:AAL)/,/^(?:AML)/,/^(?:xpp)/,/^(?:Zed)/,/^(?:MIT)/,/^(?:Mup)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = spdxparse;
exports.Parser = spdxparse.Parser;
exports.parse = function () { return spdxparse.parse.apply(spdxparse, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = __webpack_require__(1).readFileSync(__webpack_require__(0).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var licenseIDs = __webpack_require__(62);

function valid(string) {
  return licenseIDs.indexOf(string) > -1;
}

// Common transpositions of license identifier acronyms
var transpositions = [
  ['APGL', 'AGPL'],
  ['Gpl', 'GPL'],
  ['GLP', 'GPL'],
  ['APL', 'Apache'],
  ['ISD', 'ISC'],
  ['GLP', 'GPL'],
  ['IST', 'ISC'],
  ['Claude', 'Clause'],
  [' or later', '+'],
  [' International', ''],
  ['GNU', 'GPL'],
  ['GUN', 'GPL'],
  ['+', ''],
  ['GNU GPL', 'GPL'],
  ['GNU/GPL', 'GPL'],
  ['GNU GLP', 'GPL'],
  ['GNU General Public License', 'GPL'],
  ['Gnu public license', 'GPL'],
  ['GNU Public License', 'GPL'],
  ['GNU GENERAL PUBLIC LICENSE', 'GPL'],
  ['MTI', 'MIT'],
  ['Mozilla Public License', 'MPL'],
  ['WTH', 'WTF'],
  ['-License', '']
];

var TRANSPOSED = 0;
var CORRECT = 1;

// Simple corrections to nearly valid identifiers.
var transforms = [
  // e.g. 'mit'
  function(argument) {
    return argument.toUpperCase();
  },
  // e.g. 'MIT '
  function(argument) {
    return argument.trim();
  },
  // e.g. 'M.I.T.'
  function(argument) {
    return argument.replace(/\./g, '');
  },
  // e.g. 'Apache- 2.0'
  function(argument) {
    return argument.replace(/\s+/g, '');
  },
  // e.g. 'CC BY 4.0''
  function(argument) {
    return argument.replace(/\s+/g, '-');
  },
  // e.g. 'LGPLv2.1'
  function(argument) {
    return argument.replace('v', '-');
  },
  // e.g. 'Apache 2.0'
  function(argument) {
    return argument.replace(/,?\s*(\d)/, '-$1');
  },
  // e.g. 'GPL 2'
  function(argument) {
    return argument.replace(/,?\s*(\d)/, '-$1.0');
  },
  // e.g. 'Apache Version 2.0'
  function(argument) {
    return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, '-$2');
  },
  // e.g. 'Apache Version 2'
  function(argument) {
    return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, '-$2.0');
  },
  // e.g. 'ZLIB'
  function(argument) {
    return argument[0].toUpperCase() + argument.slice(1);
  },
  // e.g. 'MPL/2.0'
  function(argument) {
    return argument.replace('/', '-');
  },
  // e.g. 'Apache 2'
  function(argument) {
    return argument
      .replace(/\s*V\s*(\d)/, '-$1')
      .replace(/(\d)$/, '$1.0');
  },
  // e.g. 'GPL-2.0-'
  function(argument) {
    return argument.slice(0, argument.length - 1);
  },
  // e.g. 'GPL2'
  function(argument) {
    return argument.replace(/(\d)$/, '-$1.0');
  },
  // e.g. 'BSD 3'
  function(argument) {
    return argument.replace(/(-| )?(\d)$/, '-$2-Clause');
  },
  // e.g. 'BSD clause 3'
  function(argument) {
    return argument.replace(/(-| )clause(-| )(\d)/, '-$3-Clause');
  },
  // e.g. 'BY-NC-4.0'
  function(argument) {
    return 'CC-' + argument;
  },
  // e.g. 'BY-NC'
  function(argument) {
    return 'CC-' + argument + '-4.0';
  },
  // e.g. 'Attribution-NonCommercial'
  function(argument) {
    return argument
      .replace('Attribution', 'BY')
      .replace('NonCommercial', 'NC')
      .replace('NoDerivatives', 'ND')
      .replace(/ (\d)/, '-$1')
      .replace(/ ?International/, '');
  },
  // e.g. 'Attribution-NonCommercial'
  function(argument) {
    return 'CC-' +
      argument
      .replace('Attribution', 'BY')
      .replace('NonCommercial', 'NC')
      .replace('NoDerivatives', 'ND')
      .replace(/ (\d)/, '-$1')
      .replace(/ ?International/, '') +
      '-4.0';
  }
];

// If all else fails, guess that strings containing certain substrings
// meant to identify certain licenses.
var lastResorts = [
  ['UNLI', 'Unlicense'],
  ['WTF', 'WTFPL'],
  ['2 CLAUSE', 'BSD-2-Clause'],
  ['2-CLAUSE', 'BSD-2-Clause'],
  ['3 CLAUSE', 'BSD-3-Clause'],
  ['3-CLAUSE', 'BSD-3-Clause'],
  ['AFFERO', 'AGPL-3.0'],
  ['AGPL', 'AGPL-3.0'],
  ['APACHE', 'Apache-2.0'],
  ['ARTISTIC', 'Artistic-2.0'],
  ['Affero', 'AGPL-3.0'],
  ['BEER', 'Beerware'],
  ['BOOST', 'BSL-1.0'],
  ['BSD', 'BSD-2-Clause'],
  ['ECLIPSE', 'EPL-1.0'],
  ['FUCK', 'WTFPL'],
  ['GNU', 'GPL-3.0'],
  ['LGPL', 'LGPL-3.0'],
  ['GPL', 'GPL-3.0'],
  ['MIT', 'MIT'],
  ['MPL', 'MPL-2.0'],
  ['X11', 'X11'],
  ['ZLIB', 'Zlib']
];

var SUBSTRING = 0;
var IDENTIFIER = 1;

var validTransformation = function(identifier) {
  for (var i = 0; i < transforms.length; i++) {
    var transformed = transforms[i](identifier);
    if (transformed !== identifier && valid(transformed)) {
      return transformed;
    }
  }
  return null;
};

var validLastResort = function(identifier) {
  var upperCased = identifier.toUpperCase();
  for (var i = 0; i < lastResorts.length; i++) {
    var lastResort = lastResorts[i];
    if (upperCased.indexOf(lastResort[SUBSTRING]) > -1) {
      return lastResort[IDENTIFIER];
    }
  }
  return null;
};

var anyCorrection = function(identifier, check) {
  for (var i = 0; i < transpositions.length; i++) {
    var transposition = transpositions[i];
    var transposed = transposition[TRANSPOSED];
    if (identifier.indexOf(transposed) > -1) {
      var corrected = identifier.replace(
        transposed,
        transposition[CORRECT]
      );
      var checked = check(corrected);
      if (checked !== null) {
        return checked;
      }
    }
  }
  return null;
};

module.exports = function(identifier) {
  identifier = identifier.replace(/\+$/, '');
  if (valid(identifier)) {
    return identifier;
  }
  var transformed = validTransformation(identifier);
  if (transformed !== null) {
    return transformed;
  }
  transformed = anyCorrection(identifier, function(argument) {
    if (valid(argument)) {
      return argument;
    }
    return validTransformation(argument);
  });
  if (transformed !== null) {
    return transformed;
  }
  transformed = validLastResort(identifier);
  if (transformed !== null) {
    return transformed;
  }
  transformed = anyCorrection(identifier, validLastResort);
  if (transformed !== null) {
    return transformed;
  }
  return null;
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = [
	"Glide",
	"Abstyles",
	"AFL-1.1",
	"AFL-1.2",
	"AFL-2.0",
	"AFL-2.1",
	"AFL-3.0",
	"AMPAS",
	"APL-1.0",
	"Adobe-Glyph",
	"APAFML",
	"Adobe-2006",
	"AGPL-1.0",
	"Afmparse",
	"Aladdin",
	"ADSL",
	"AMDPLPA",
	"ANTLR-PD",
	"Apache-1.0",
	"Apache-1.1",
	"Apache-2.0",
	"AML",
	"APSL-1.0",
	"APSL-1.1",
	"APSL-1.2",
	"APSL-2.0",
	"Artistic-1.0",
	"Artistic-1.0-Perl",
	"Artistic-1.0-cl8",
	"Artistic-2.0",
	"AAL",
	"Bahyph",
	"Barr",
	"Beerware",
	"BitTorrent-1.0",
	"BitTorrent-1.1",
	"BSL-1.0",
	"Borceux",
	"BSD-2-Clause",
	"BSD-2-Clause-FreeBSD",
	"BSD-2-Clause-NetBSD",
	"BSD-3-Clause",
	"BSD-3-Clause-Clear",
	"BSD-4-Clause",
	"BSD-Protection",
	"BSD-Source-Code",
	"BSD-3-Clause-Attribution",
	"0BSD",
	"BSD-4-Clause-UC",
	"bzip2-1.0.5",
	"bzip2-1.0.6",
	"Caldera",
	"CECILL-1.0",
	"CECILL-1.1",
	"CECILL-2.0",
	"CECILL-2.1",
	"CECILL-B",
	"CECILL-C",
	"ClArtistic",
	"MIT-CMU",
	"CNRI-Jython",
	"CNRI-Python",
	"CNRI-Python-GPL-Compatible",
	"CPOL-1.02",
	"CDDL-1.0",
	"CDDL-1.1",
	"CPAL-1.0",
	"CPL-1.0",
	"CATOSL-1.1",
	"Condor-1.1",
	"CC-BY-1.0",
	"CC-BY-2.0",
	"CC-BY-2.5",
	"CC-BY-3.0",
	"CC-BY-4.0",
	"CC-BY-ND-1.0",
	"CC-BY-ND-2.0",
	"CC-BY-ND-2.5",
	"CC-BY-ND-3.0",
	"CC-BY-ND-4.0",
	"CC-BY-NC-1.0",
	"CC-BY-NC-2.0",
	"CC-BY-NC-2.5",
	"CC-BY-NC-3.0",
	"CC-BY-NC-4.0",
	"CC-BY-NC-ND-1.0",
	"CC-BY-NC-ND-2.0",
	"CC-BY-NC-ND-2.5",
	"CC-BY-NC-ND-3.0",
	"CC-BY-NC-ND-4.0",
	"CC-BY-NC-SA-1.0",
	"CC-BY-NC-SA-2.0",
	"CC-BY-NC-SA-2.5",
	"CC-BY-NC-SA-3.0",
	"CC-BY-NC-SA-4.0",
	"CC-BY-SA-1.0",
	"CC-BY-SA-2.0",
	"CC-BY-SA-2.5",
	"CC-BY-SA-3.0",
	"CC-BY-SA-4.0",
	"CC0-1.0",
	"Crossword",
	"CrystalStacker",
	"CUA-OPL-1.0",
	"Cube",
	"curl",
	"D-FSL-1.0",
	"diffmark",
	"WTFPL",
	"DOC",
	"Dotseqn",
	"DSDP",
	"dvipdfm",
	"EPL-1.0",
	"ECL-1.0",
	"ECL-2.0",
	"eGenix",
	"EFL-1.0",
	"EFL-2.0",
	"MIT-advertising",
	"MIT-enna",
	"Entessa",
	"ErlPL-1.1",
	"EUDatagrid",
	"EUPL-1.0",
	"EUPL-1.1",
	"Eurosym",
	"Fair",
	"MIT-feh",
	"Frameworx-1.0",
	"FreeImage",
	"FTL",
	"FSFAP",
	"FSFUL",
	"FSFULLR",
	"Giftware",
	"GL2PS",
	"Glulxe",
	"AGPL-3.0",
	"GFDL-1.1",
	"GFDL-1.2",
	"GFDL-1.3",
	"GPL-1.0",
	"GPL-2.0",
	"GPL-3.0",
	"LGPL-2.1",
	"LGPL-3.0",
	"LGPL-2.0",
	"gnuplot",
	"gSOAP-1.3b",
	"HaskellReport",
	"HPND",
	"IBM-pibs",
	"IPL-1.0",
	"ICU",
	"ImageMagick",
	"iMatix",
	"Imlib2",
	"IJG",
	"Info-ZIP",
	"Intel-ACPI",
	"Intel",
	"Interbase-1.0",
	"IPA",
	"ISC",
	"JasPer-2.0",
	"JSON",
	"LPPL-1.0",
	"LPPL-1.1",
	"LPPL-1.2",
	"LPPL-1.3a",
	"LPPL-1.3c",
	"Latex2e",
	"BSD-3-Clause-LBNL",
	"Leptonica",
	"LGPLLR",
	"Libpng",
	"libtiff",
	"LAL-1.2",
	"LAL-1.3",
	"LiLiQ-P-1.1",
	"LiLiQ-Rplus-1.1",
	"LiLiQ-R-1.1",
	"LPL-1.02",
	"LPL-1.0",
	"MakeIndex",
	"MTLL",
	"MS-PL",
	"MS-RL",
	"MirOS",
	"MITNFA",
	"MIT",
	"Motosoto",
	"MPL-1.0",
	"MPL-1.1",
	"MPL-2.0",
	"MPL-2.0-no-copyleft-exception",
	"mpich2",
	"Multics",
	"Mup",
	"NASA-1.3",
	"Naumen",
	"NBPL-1.0",
	"NetCDF",
	"NGPL",
	"NOSL",
	"NPL-1.0",
	"NPL-1.1",
	"Newsletr",
	"NLPL",
	"Nokia",
	"NPOSL-3.0",
	"NLOD-1.0",
	"Noweb",
	"NRL",
	"NTP",
	"Nunit",
	"OCLC-2.0",
	"ODbL-1.0",
	"PDDL-1.0",
	"OCCT-PL",
	"OGTSL",
	"OLDAP-2.2.2",
	"OLDAP-1.1",
	"OLDAP-1.2",
	"OLDAP-1.3",
	"OLDAP-1.4",
	"OLDAP-2.0",
	"OLDAP-2.0.1",
	"OLDAP-2.1",
	"OLDAP-2.2",
	"OLDAP-2.2.1",
	"OLDAP-2.3",
	"OLDAP-2.4",
	"OLDAP-2.5",
	"OLDAP-2.6",
	"OLDAP-2.7",
	"OLDAP-2.8",
	"OML",
	"OPL-1.0",
	"OSL-1.0",
	"OSL-1.1",
	"OSL-2.0",
	"OSL-2.1",
	"OSL-3.0",
	"OpenSSL",
	"OSET-PL-2.1",
	"PHP-3.0",
	"PHP-3.01",
	"Plexus",
	"PostgreSQL",
	"psfrag",
	"psutils",
	"Python-2.0",
	"QPL-1.0",
	"Qhull",
	"Rdisc",
	"RPSL-1.0",
	"RPL-1.1",
	"RPL-1.5",
	"RHeCos-1.1",
	"RSCPL",
	"RSA-MD",
	"Ruby",
	"SAX-PD",
	"Saxpath",
	"SCEA",
	"SWL",
	"SMPPL",
	"Sendmail",
	"SGI-B-1.0",
	"SGI-B-1.1",
	"SGI-B-2.0",
	"OFL-1.0",
	"OFL-1.1",
	"SimPL-2.0",
	"Sleepycat",
	"SNIA",
	"Spencer-86",
	"Spencer-94",
	"Spencer-99",
	"SMLNJ",
	"SugarCRM-1.1.3",
	"SISSL",
	"SISSL-1.2",
	"SPL-1.0",
	"Watcom-1.0",
	"TCL",
	"Unlicense",
	"TMate",
	"TORQUE-1.1",
	"TOSL",
	"Unicode-TOU",
	"UPL-1.0",
	"NCSA",
	"Vim",
	"VOSTROM",
	"VSL-1.0",
	"W3C-19980720",
	"W3C",
	"Wsuipa",
	"Xnet",
	"X11",
	"Xerox",
	"XFree86-1.1",
	"xinetd",
	"xpp",
	"XSkat",
	"YPL-1.0",
	"YPL-1.1",
	"Zed",
	"Zend-2.0",
	"Zimbra-1.3",
	"Zimbra-1.4",
	"Zlib",
	"zlib-acknowledgement",
	"ZPL-1.1",
	"ZPL-2.0",
	"ZPL-2.1",
	"BSD-3-Clause-No-Nuclear-License",
	"BSD-3-Clause-No-Nuclear-Warranty",
	"BSD-3-Clause-No-Nuclear-License-2014",
	"eCos-2.0",
	"GPL-2.0-with-autoconf-exception",
	"GPL-2.0-with-bison-exception",
	"GPL-2.0-with-classpath-exception",
	"GPL-2.0-with-font-exception",
	"GPL-2.0-with-GCC-exception",
	"GPL-3.0-with-autoconf-exception",
	"GPL-3.0-with-GCC-exception",
	"StandardML-NJ",
	"WXwindows"
];

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var url = __webpack_require__(12)
var gitHosts = __webpack_require__(13)
var GitHost = module.exports = __webpack_require__(64)

var protocolToRepresentationMap = {
  'git+ssh': 'sshurl',
  'git+https': 'https',
  'ssh': 'sshurl',
  'git': 'git'
}

function protocolToRepresentation (protocol) {
  if (protocol.substr(-1) === ':') protocol = protocol.slice(0, -1)
  return protocolToRepresentationMap[protocol] || protocol
}

var authProtocols = {
  'git:': true,
  'https:': true,
  'git+https:': true,
  'http:': true,
  'git+http:': true
}

module.exports.fromUrl = function (giturl, opts) {
  if (giturl == null || giturl === '') return
  var url = fixupUnqualifiedGist(
    isGitHubShorthand(giturl) ? 'github:' + giturl : giturl
  )
  var parsed = parseGitUrl(url)
  var shortcutMatch = url.match(new RegExp('^([^:]+):(?:(?:[^@:]+(?:[^@]+)?@)?([^/]*))[/](.+?)(?:[.]git)?($|#)'))
  var matches = Object.keys(gitHosts).map(function (gitHostName) {
    try {
      var gitHostInfo = gitHosts[gitHostName]
      var auth = null
      if (parsed.auth && authProtocols[parsed.protocol]) {
        auth = decodeURIComponent(parsed.auth)
      }
      var committish = parsed.hash ? decodeURIComponent(parsed.hash.substr(1)) : null
      var user = null
      var project = null
      var defaultRepresentation = null
      if (shortcutMatch && shortcutMatch[1] === gitHostName) {
        user = shortcutMatch[2] && decodeURIComponent(shortcutMatch[2])
        project = decodeURIComponent(shortcutMatch[3])
        defaultRepresentation = 'shortcut'
      } else {
        if (parsed.host !== gitHostInfo.domain) return
        if (!gitHostInfo.protocols_re.test(parsed.protocol)) return
        if (!parsed.path) return
        var pathmatch = gitHostInfo.pathmatch
        var matched = parsed.path.match(pathmatch)
        if (!matched) return
        if (matched[1] != null) user = decodeURIComponent(matched[1].replace(/^:/, ''))
        if (matched[2] != null) project = decodeURIComponent(matched[2])
        defaultRepresentation = protocolToRepresentation(parsed.protocol)
      }
      return new GitHost(gitHostName, user, auth, project, committish, defaultRepresentation, opts)
    } catch (ex) {
      if (!(ex instanceof URIError)) throw ex
    }
  }).filter(function (gitHostInfo) { return gitHostInfo })
  if (matches.length !== 1) return
  return matches[0]
}

function isGitHubShorthand (arg) {
  // Note: This does not fully test the git ref format.
  // See https://www.kernel.org/pub/software/scm/git/docs/git-check-ref-format.html
  //
  // The only way to do this properly would be to shell out to
  // git-check-ref-format, and as this is a fast sync function,
  // we don't want to do that.  Just let git fail if it turns
  // out that the commit-ish is invalid.
  // GH usernames cannot start with . or -
  return /^[^:@%/\s.-][^:@%/\s]*[/][^:@\s/%]+(?:#.*)?$/.test(arg)
}

function fixupUnqualifiedGist (giturl) {
  // necessary for round-tripping gists
  var parsed = url.parse(giturl)
  if (parsed.protocol === 'gist:' && parsed.host && !parsed.path) {
    return parsed.protocol + '/' + parsed.host
  } else {
    return giturl
  }
}

function parseGitUrl (giturl) {
  if (typeof giturl !== 'string') giturl = '' + giturl
  var matched = giturl.match(/^([^@]+)@([^:/]+):[/]?((?:[^/]+[/])?[^/]+?)(?:[.]git)?(#.*)?$/)
  if (!matched) return url.parse(giturl)
  return {
    protocol: 'git+ssh:',
    slashes: true,
    auth: matched[1],
    host: matched[2],
    port: null,
    hostname: matched[2],
    hash: matched[4],
    search: null,
    query: null,
    pathname: '/' + matched[3],
    path: '/' + matched[3],
    href: 'git+ssh://' + matched[1] + '@' + matched[2] +
          '/' + matched[3] + (matched[4] || '')
  }
}


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var gitHosts = __webpack_require__(13)
var extend = Object.assign || __webpack_require__(2)._extend

var GitHost = module.exports = function (type, user, auth, project, committish, defaultRepresentation, opts) {
  var gitHostInfo = this
  gitHostInfo.type = type
  Object.keys(gitHosts[type]).forEach(function (key) {
    gitHostInfo[key] = gitHosts[type][key]
  })
  gitHostInfo.user = user
  gitHostInfo.auth = auth
  gitHostInfo.project = project
  gitHostInfo.committish = committish
  gitHostInfo.default = defaultRepresentation
  gitHostInfo.opts = opts || {}
}
GitHost.prototype = {}

GitHost.prototype.hash = function () {
  return this.committish ? '#' + this.committish : ''
}

GitHost.prototype._fill = function (template, opts) {
  if (!template) return
  var vars = extend({}, opts)
  opts = extend(extend({}, this.opts), opts)
  var self = this
  Object.keys(this).forEach(function (key) {
    if (self[key] != null && vars[key] == null) vars[key] = self[key]
  })
  var rawAuth = vars.auth
  var rawComittish = vars.committish
  Object.keys(vars).forEach(function (key) {
    vars[key] = encodeURIComponent(vars[key])
  })
  vars['auth@'] = rawAuth ? rawAuth + '@' : ''
  if (opts.noCommittish) {
    vars['#committish'] = ''
    vars['/tree/committish'] = ''
    vars['/comittish'] = ''
    vars.comittish = ''
  } else {
    vars['#committish'] = rawComittish ? '#' + rawComittish : ''
    vars['/tree/committish'] = vars.committish
                            ? '/' + vars.treepath + '/' + vars.committish
                            : ''
    vars['/committish'] = vars.committish ? '/' + vars.committish : ''
    vars.committish = vars.committish || 'master'
  }
  var res = template
  Object.keys(vars).forEach(function (key) {
    res = res.replace(new RegExp('[{]' + key + '[}]', 'g'), vars[key])
  })
  if (opts.noGitPlus) {
    return res.replace(/^git[+]/, '')
  } else {
    return res
  }
}

GitHost.prototype.ssh = function (opts) {
  return this._fill(this.sshtemplate, opts)
}

GitHost.prototype.sshurl = function (opts) {
  return this._fill(this.sshurltemplate, opts)
}

GitHost.prototype.browse = function (opts) {
  return this._fill(this.browsetemplate, opts)
}

GitHost.prototype.docs = function (opts) {
  return this._fill(this.docstemplate, opts)
}

GitHost.prototype.bugs = function (opts) {
  return this._fill(this.bugstemplate, opts)
}

GitHost.prototype.https = function (opts) {
  return this._fill(this.httpstemplate, opts)
}

GitHost.prototype.git = function (opts) {
  return this._fill(this.gittemplate, opts)
}

GitHost.prototype.shortcut = function (opts) {
  return this._fill(this.shortcuttemplate, opts)
}

GitHost.prototype.path = function (opts) {
  return this._fill(this.pathtemplate, opts)
}

GitHost.prototype.tarball = function (opts) {
  return this._fill(this.tarballtemplate, opts)
}

GitHost.prototype.file = function (P, opts) {
  return this._fill(this.filetemplate, extend({
    path: P.replace(/^[/]+/g, '')
  }, opts))
}

GitHost.prototype.getDefaultRepresentation = function () {
  return this.default
}

GitHost.prototype.toString = function (opts) {
  return (this[this.default] || this.sshurl).call(this, opts)
}


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var builtinModules = __webpack_require__(66);

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return builtinModules.indexOf(str) !== -1;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var blacklist = [
	'freelist',
	'sys'
];

module.exports = Object.keys(process.binding('natives')).filter(function (el) {
	return !/^_|^internal|\//.test(el) && blacklist.indexOf(el) === -1;
}).sort();


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = extractDescription

// Extracts description from contents of a readme file in markdown format
function extractDescription (d) {
  if (!d) return;
  if (d === "ERROR: No README data found!") return;
  // the first block of text before the first heading
  // that isn't the first line heading
  d = d.trim().split('\n')
  for (var s = 0; d[s] && d[s].trim().match(/^(#|$)/); s ++);
  var l = d.length
  for (var e = s + 1; e < l && d[e].trim(); e ++);
  return d.slice(s, e).join(' ').trim()
}


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = {
	"topLevel": {
		"dependancies": "dependencies",
		"dependecies": "dependencies",
		"depdenencies": "dependencies",
		"devEependencies": "devDependencies",
		"depends": "dependencies",
		"dev-dependencies": "devDependencies",
		"devDependences": "devDependencies",
		"devDepenencies": "devDependencies",
		"devdependencies": "devDependencies",
		"repostitory": "repository",
		"repo": "repository",
		"prefereGlobal": "preferGlobal",
		"hompage": "homepage",
		"hampage": "homepage",
		"autohr": "author",
		"autor": "author",
		"contributers": "contributors",
		"publicationConfig": "publishConfig",
		"script": "scripts"
	},
	"bugs": {
		"web": "url",
		"name": "url"
	},
	"script": {
		"server": "start",
		"tests": "test"
	}
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(2)
var messages = __webpack_require__(70)

module.exports = function() {
  var args = Array.prototype.slice.call(arguments, 0)
  var warningName = args.shift()
  if (warningName == "typo") {
    return makeTypoWarning.apply(null,args)
  }
  else {
    var msgTemplate = messages[warningName] ? messages[warningName] : warningName + ": '%s'"
    args.unshift(msgTemplate)
    return util.format.apply(null, args)
  }
}

function makeTypoWarning (providedName, probableName, field) {
  if (field) {
    providedName = field + "['" + providedName + "']"
    probableName = field + "['" + probableName + "']"
  }
  return util.format(messages.typo, providedName, probableName)
}


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = {
	"repositories": "'repositories' (plural) Not supported. Please pick one as the 'repository' field",
	"missingRepository": "No repository field.",
	"brokenGitUrl": "Probably broken git url: %s",
	"nonObjectScripts": "scripts must be an object",
	"nonStringScript": "script values must be string commands",
	"nonArrayFiles": "Invalid 'files' member",
	"invalidFilename": "Invalid filename in 'files' list: %s",
	"nonArrayBundleDependencies": "Invalid 'bundleDependencies' list. Must be array of package names",
	"nonStringBundleDependency": "Invalid bundleDependencies member: %s",
	"nonDependencyBundleDependency": "Non-dependency in bundleDependencies: %s",
	"nonObjectDependencies": "%s field must be an object",
	"nonStringDependency": "Invalid dependency: %s %s",
	"deprecatedArrayDependencies": "specifying %s as array is deprecated",
	"deprecatedModules": "modules field is deprecated",
	"nonArrayKeywords": "keywords should be an array of strings",
	"nonStringKeyword": "keywords should be an array of strings",
	"conflictingName": "%s is also the name of a node core module.",
	"nonStringDescription": "'description' field should be a string",
	"missingDescription": "No description",
	"missingReadme": "No README data",
	"missingLicense": "No license field.",
	"nonEmailUrlBugsString": "Bug string field must be url, email, or {email,url}",
	"nonUrlBugsUrlField": "bugs.url field must be a string url. Deleted.",
	"nonEmailBugsEmailField": "bugs.email field must be a string email. Deleted.",
	"emptyNormalizedBugs": "Normalized value of bugs field is an empty object. Deleted.",
	"nonUrlHomepage": "homepage field must be a string url. Deleted.",
	"invalidLicense": "license should be a valid SPDX license expression",
	"missingProtocolHomepage": "homepage field must start with a protocol.",
	"typo": "%s should probably be %s."
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fs = __webpack_require__(7);
var Promise = __webpack_require__(3);
var pify = __webpack_require__(10);

function type(fn, fn2, fp) {
	if (typeof fp !== 'string') {
		return Promise.reject(new TypeError('Expected a string'));
	}

	return pify(fs[fn], Promise)(fp).then(function (stats) {
		return stats[fn2]();
	});
}

function typeSync(fn, fn2, fp) {
	if (typeof fp !== 'string') {
		throw new TypeError('Expected a string');
	}

	return fs[fn](fp)[fn2]();
}

exports.file = type.bind(null, 'stat', 'isFile');
exports.dir = type.bind(null, 'stat', 'isDirectory');
exports.symlink = type.bind(null, 'lstat', 'isSymbolicLink');
exports.fileSync = typeSync.bind(null, 'statSync', 'isFile');
exports.dirSync = typeSync.bind(null, 'statSync', 'isDirectory');
exports.symlinkSync = typeSync.bind(null, 'lstatSync', 'isSymbolicLink');


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(2);
var onExit = __webpack_require__(73);
var currentlyUnhandled = __webpack_require__(76);

var installed = false;

module.exports = function (log) {
	if (installed) {
		return;
	}

	installed = true;

	log = log || console.error;

	var listUnhandled = currentlyUnhandled();

	onExit(function () {
		var unhandledRejections = listUnhandled();

		if (unhandledRejections.length > 0) {
			unhandledRejections.forEach(function (x) {
				var err = x.reason;

				if (!(err instanceof Error)) {
					err = new Error('Promise rejected with value: ' + util.inspect(err));
				}

				log(err.stack);
			});

			process.exitCode = 1;
		}
	});
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
var assert = __webpack_require__(9)
var signals = __webpack_require__(74)

var EE = __webpack_require__(75)
/* istanbul ignore if */
if (typeof EE !== 'function') {
  EE = EE.EventEmitter
}

var emitter
if (process.__signal_exit_emitter__) {
  emitter = process.__signal_exit_emitter__
} else {
  emitter = process.__signal_exit_emitter__ = new EE()
  emitter.count = 0
  emitter.emitted = {}
}

// Because this emitter is a global, we have to check to see if a
// previous version of this library failed to enable infinite listeners.
// I know what you're about to say.  But literally everything about
// signal-exit is a compromise with evil.  Get used to it.
if (!emitter.infinite) {
  emitter.setMaxListeners(Infinity)
  emitter.infinite = true
}

module.exports = function (cb, opts) {
  assert.equal(typeof cb, 'function', 'a callback must be provided for exit handler')

  if (loaded === false) {
    load()
  }

  var ev = 'exit'
  if (opts && opts.alwaysLast) {
    ev = 'afterexit'
  }

  var remove = function () {
    emitter.removeListener(ev, cb)
    if (emitter.listeners('exit').length === 0 &&
        emitter.listeners('afterexit').length === 0) {
      unload()
    }
  }
  emitter.on(ev, cb)

  return remove
}

module.exports.unload = unload
function unload () {
  if (!loaded) {
    return
  }
  loaded = false

  signals.forEach(function (sig) {
    try {
      process.removeListener(sig, sigListeners[sig])
    } catch (er) {}
  })
  process.emit = originalProcessEmit
  process.reallyExit = originalProcessReallyExit
  emitter.count -= 1
}

function emit (event, code, signal) {
  if (emitter.emitted[event]) {
    return
  }
  emitter.emitted[event] = true
  emitter.emit(event, code, signal)
}

// { <signal>: <listener fn>, ... }
var sigListeners = {}
signals.forEach(function (sig) {
  sigListeners[sig] = function listener () {
    // If there are no other listeners, an exit is coming!
    // Simplest way: remove us and then re-send the signal.
    // We know that this will kill the process, so we can
    // safely emit now.
    var listeners = process.listeners(sig)
    if (listeners.length === emitter.count) {
      unload()
      emit('exit', null, sig)
      /* istanbul ignore next */
      emit('afterexit', null, sig)
      /* istanbul ignore next */
      process.kill(process.pid, sig)
    }
  }
})

module.exports.signals = function () {
  return signals
}

module.exports.load = load

var loaded = false

function load () {
  if (loaded) {
    return
  }
  loaded = true

  // This is the number of onSignalExit's that are in play.
  // It's important so that we can count the correct number of
  // listeners on signals, and don't wait for the other one to
  // handle it instead of us.
  emitter.count += 1

  signals = signals.filter(function (sig) {
    try {
      process.on(sig, sigListeners[sig])
      return true
    } catch (er) {
      return false
    }
  })

  process.emit = processEmit
  process.reallyExit = processReallyExit
}

var originalProcessReallyExit = process.reallyExit
function processReallyExit (code) {
  process.exitCode = code || 0
  emit('exit', process.exitCode, null)
  /* istanbul ignore next */
  emit('afterexit', process.exitCode, null)
  /* istanbul ignore next */
  originalProcessReallyExit.call(process, process.exitCode)
}

var originalProcessEmit = process.emit
function processEmit (ev, arg) {
  if (ev === 'exit') {
    if (arg !== undefined) {
      process.exitCode = arg
    }
    var ret = originalProcessEmit.apply(this, arguments)
    emit('exit', process.exitCode, null)
    /* istanbul ignore next */
    emit('afterexit', process.exitCode, null)
    return ret
  } else {
    return originalProcessEmit.apply(this, arguments)
  }
}


/***/ }),
/* 74 */
/***/ (function(module, exports) {

// This is not the set of all possible signals.
//
// It IS, however, the set of all signals that trigger
// an exit on either Linux or BSD systems.  Linux is a
// superset of the signal names supported on BSD, and
// the unknown signals just fail to register, so we can
// catch that easily enough.
//
// Don't bother with SIGKILL.  It's uncatchable, which
// means that we can't fire any callbacks anyway.
//
// If a user does happen to register a handler on a non-
// fatal signal like SIGWINCH or something, and then
// exit, it'll end up firing `process.emit('exit')`, so
// the handler will be fired anyway.
//
// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
// artificially, inherently leave the process in a
// state from which it is not safe to try and enter JS
// listeners.
module.exports = [
  'SIGABRT',
  'SIGALRM',
  'SIGHUP',
  'SIGINT',
  'SIGTERM'
]

if (process.platform !== 'win32') {
  module.exports.push(
    'SIGVTALRM',
    'SIGXCPU',
    'SIGXFSZ',
    'SIGUSR2',
    'SIGTRAP',
    'SIGSYS',
    'SIGQUIT',
    'SIGIOT'
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  )
}

if (process.platform === 'linux') {
  module.exports.push(
    'SIGIO',
    'SIGPOLL',
    'SIGPWR',
    'SIGSTKFLT',
    'SIGUNUSED'
  )
}


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core = __webpack_require__(77);

module.exports = function (p) {
	p = p || process;
	var c = core();

	p.on('unhandledRejection', c.onUnhandledRejection);
	p.on('rejectionHandled', c.onRejectionHandled);

	return c.currentlyUnhandled;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var arrayFindIndex = __webpack_require__(78);

module.exports = function () {
	var unhandledRejections = [];

	function onUnhandledRejection(reason, promise) {
		unhandledRejections.push({reason: reason, promise: promise});
	}

	function onRejectionHandled(promise) {
		var index = arrayFindIndex(unhandledRejections, function (x) {
			return x.promise === promise;
		});

		unhandledRejections.splice(index, 1);
	}

	function currentlyUnhandled() {
		return unhandledRejections.map(function (entry) {
			return {
				reason: entry.reason,
				promise: entry.promise
			};
		});
	}

	return {
		onUnhandledRejection: onUnhandledRejection,
		onRejectionHandled: onRejectionHandled,
		currentlyUnhandled: currentlyUnhandled
	};
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (arr, predicate, ctx) {
	if (typeof Array.prototype.findIndex === 'function') {
		return arr.findIndex(predicate, ctx);
	}

	if (typeof predicate !== 'function') {
		throw new TypeError('predicate must be a function');
	}

	var list = Object(arr);
	var len = list.length;

	if (len === 0) {
		return -1;
	}

	for (var i = 0; i < len; i++) {
		if (predicate.call(ctx, list[i], i, list)) {
			return i;
		}
	}

	return -1;
};


/***/ }),
/* 79 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 79;

/***/ })
/******/ ]);