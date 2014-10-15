'use strict'

require('./resources/style/index.styl')

var React = require('react')
var ColorPicker = require('./src/index')
var HueSpectrum = require('./src/HueSpectrum')
var SaturationSpectrum = require('./src/SaturationSpectrum')

var colorUtils = require('./src/utils/color')

var COLOR = 'magenta'

React.renderComponent(<ColorPicker red='red'/>, document.body)

