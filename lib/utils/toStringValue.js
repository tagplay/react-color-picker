'use strict';

var assign = require('object-assign');
var toColor = require('./color').toColor;

module.exports = function toStringValue(color) {
    color = toColor(assign({}, color));

    return color.toRgb().a == 1 ? color.toHexString() : color.toRgbString();
};