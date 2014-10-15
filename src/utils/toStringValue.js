'use strict'

var copy    = require('copy-utils').copy
var toColor = require('./color').toColor

module.exports = function toStringValue(color){
    color = toColor(copy(color))

    return color.toRgb().a == 1?
                color.toHexString():
                color.toRgbString()
}