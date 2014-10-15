/** @jsx React.DOM */
'use strict'

var React  = require('react')
var Region = require('region')
var copy   = require('copy-utils').copy

var fromRatio  = require('./utils/color').fromRatio
var common = require('./utils/common')

var VALIDATE = require('./utils/validate')

module.exports = React.createClass(copy(common, {

    displayName: 'SaturationSpectrum',

    getDefaultProps: function(){
        return {
            height      : 300,
            width       : 300,
            pointerSize : 7,
            defaultColor: require('./defaultColor')
        }
    },

    getInitialState: function(){
        return {
            pointerTop  : null,
            pointerLeft : null
        }
    },

    componentDidUpdate: function(){
        // this.updateDragPositionIf()
    },

    componentDidMount: function(){
        this.updateDragPositionIf()
    },

    updateDragPositionIf: function(){
        if (!this.props.height || !this.props.width){
            this.setState({})
        }
    },

    getDragPosition: function(hsv){
        hsv = hsv || this.hsv

        var width  = this.props.width
        var height = this.props.height
        var sizeDefined = width && height

        if (!sizeDefined && !this.isMounted()){
            return null
        }

        var region

        if (!sizeDefined){
            region = Region.fromDOM(this.getDOMNode())
            height = height || region.getHeight()
            width  = width  || region.getWidth()
        }

        var x = hsv.s * width
        var y = height - (hsv.v * height)
        var size  = this.props.pointerSize
        var diff  = Math.floor(size/2)

        if (this.state.locked){
            x = this.state.left
        }

        return {
            left: x - diff,
            top : y - diff
        }
    },

    prepareBackgroundColor: function(color){
        var hsv = color

        return fromRatio({
            h: hsv.h,
            s: 1,
            v: 1
        }).toRgbString()
    },

    render: function(){

        var color = this.state.value || this.props.value || this.props.defaultValue || this.props.defaultColor

        this.hsv = this.toColorValue(color)

        var style = this.props.style || {}

        if (this.props.height){
            style.height = this.props.height
        }
        if (this.props.width){
            style.width = this.props.width
        }

        style.backgroundColor = this.prepareBackgroundColor(this.hsv)

        var dragStyle = {
            width : this.props.pointerSize,
            height: this.props.pointerSize
        }

        var dragPos = this.getDragPosition()

        if (dragPos){
            dragStyle.top     = dragPos.top
            dragStyle.left    = dragPos.left
            dragStyle.display = 'block'
        }

        return (
            React.DOM.div({className: "cp-saturation-spectrum", style: style, onMouseDown: this.onMouseDown}, 
                React.DOM.div({className: "cp-saturation-white"}, 
                    React.DOM.div({className: "cp-saturation-black"})
                ), 
                React.DOM.div({className: "cp-saturation-drag", style: dragStyle}, 
                    React.DOM.div({className: "inner"})
                )
            )
        )
    },

    getSaturationForPoint: function(point){
        return point.x / point.width
    },

    getColorValueForPoint: function(point){
        return (point.height - point.y) / point.height
    },

    updateColor: function(point){
        point = VALIDATE(point)

        this.hsv.s = this.getSaturationForPoint(point)
        this.hsv.v = this.getColorValueForPoint(point)
    },

    toStringValue: require('./utils/toStringValue')
}))