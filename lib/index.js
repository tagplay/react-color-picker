'use strict';

var React      = require('react')
var assign = require('object-assign')
var colorUtils = require('./utils/color')

var HueSpectrum        = React.createFactory(require('./HueSpectrum'))
var SaturationSpectrum = React.createFactory(require('./SaturationSpectrum'))

var toHsv = colorUtils.toHsv

function emptyFn(){}

var RESULT = React.createClass({

    displayName: 'ColorPicker',

    getDefaultProps: function(){
        return {
            defaultColor    : require('./defaultColor'),
            saturationWidth : 300,
            saturationHeight: 300,
            hueHeight       : null,
            hueWidth        : 30,
            hueMargin       : 10
        }
    },

    getInitialState: function(){
        return {
            value: this.props.defaultValue
        }
    },

    prepareClasses: function(classes){
        classes.push('cp')
    },

    prepareProps: function(props){

        var classes = [props.className || '']
        this.prepareClasses(classes)
        props.className = classes.join(' ')

        return props
    },

    render: function(){

        var props = this.prepareProps(assign({}, this.props))

        var hueStyle = this.props.hueStyle || {}

        hueStyle.marginLeft = this.props.hueMargin


        var value = props.value?
                        this.toColorValue(this.props.value):
                        null

        var defaultValue = !value?
                                this.toColorValue(this.state.value || props.defaultValue || props.defaultColor):
                                null

        var saturationConfig = {
            onDrag     : this.handleSaturationDrag,
            onChange   : this.handleSaturationChange,
            onMouseDown: this.handleSaturationMouseDown,
            height     : props.saturationHeight,
            width     : props.saturationWidth,
            inPicker   : true
        }

        var hueConfig = {
            onDrag     : this.handleHueDrag,
            onChange   : this.handleHueChange,
            height     : props.hueHeight || props.saturationHeight,
            width      : props.hueWidth,
            inPicker   : true,
            style      : hueStyle
        }

        if (this.state.dragHue){
            ;(value || defaultValue).h = this.state.dragHue
        }

        if (value){
            saturationConfig.value = assign({}, value)
            hueConfig.value = assign({}, value)
        } else {
            saturationConfig.defaultValue = assign({}, defaultValue)
            hueConfig.defaultValue = assign({}, defaultValue)
        }

        return React.DOM.div(
                props,
                SaturationSpectrum(saturationConfig),
                HueSpectrum(hueConfig)
            )
    },

    toColorValue: function(value){
        return typeof value == 'string'?
                    toHsv(value):
                    value
    },

    toStringValue: require('./utils/toStringValue'),

    handleChange: function(color){

        this.state.dragHue = null

        color = assign({}, color)

        var value = this.toStringValue(color)

        ;(this.props.onChange || emptyFn)(value, color)
    },

    handleSaturationChange: function(color){
        this.handleChange(color)
    },

    handleHueChange: function(color){
        this.handleChange(color)
    },

    handleHueDrag: function(hsv){
        this.handleDrag(hsv)
    },

    handleSaturationDrag: function(hsv){
        this.handleDrag(hsv)
    },

    handleDrag: function(color){

        if (!this.props.value){
            this.setState({
                value: color
            })
        }

        ;(this.props.onDrag || emptyFn)(this.toStringValue(color), color)
    },

    handleSaturationMouseDown: function(hsv){
        this.setState({
            dragHue: hsv.h
        })
    }
})

RESULT.HueSpectrum        = HueSpectrum
RESULT.SaturationSpectrum = SaturationSpectrum

module.exports = RESULT