'use strict'

var React = require('react')
var copy  = require('copy-utils').copy
var colorUtils = require('./utils/color')

var SaturationSpectrum = require('./SaturationSpectrum')
var HueSpectrum = require('./HueSpectrum')

var toColor   = colorUtils.toColor
var fromRatio = colorUtils.fromRatio
var toHsv     = colorUtils.toHsv

function emptyFn(){}

module.exports = React.createClass({

    displayName: 'ColorPicker',

    getDefaultProps: function(){
        return {
            value     : require('./defaultColor'),
            autoUpdate: true
        }
    },

    getInitialState: function(){
        return {
            // value: this.props.value
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

        var props = this.prepareProps(copy(this.props))
        var value = this.toColorValue(this.state.value || this.props.value)

        return React.DOM.div(
                props,
                SaturationSpectrum({
                    value   : value,
                    onSelect: this.onSaturationSelect
                }),
                HueSpectrum({
                    value   : value,
                    onSelect: this.onHueSelect
                })
            )
    },

    toColorValue: function(value){
        return typeof value == 'string'?
                    toHsv(value):
                    value
    },

    toStringValue: function(color){
        color = toColor(color)

        return color.toRgb().a == 1?
                    color.toHexString():
                    color.toRgbString()
    },

    onSelect: function(color){

        var autoUpdate = this.props.autoUpdate

        if (autoUpdate){
            this.setState({
                value: color
            })
        }

        var value = this.toStringValue(color)

        ;(this.props.onChange || emptyFn)(value, color)
    },

    onSaturationSelect: function(color){
        this.onSelect(color)
    },

    onHueSelect: function(color){
        this.onSelect(color)
    }
})