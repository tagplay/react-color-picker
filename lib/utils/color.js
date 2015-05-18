'use strict';

var tinycolor = require('tinycolor2');

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