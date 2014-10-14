'use strict'

var React  = require('react')
var Region = require('region')
var copy   = require('copy-utils').copy

var DragHelper = require('./utils/DragHelper')

var colorUtils = require('./utils/color')

var toColor   = colorUtils.toColor
var toPure    = colorUtils.toPure
var fromRatio = colorUtils.fromRatio
var toAlpha   = colorUtils.toAlpha
var toHsv     = colorUtils.toHsv

var VALIDATE = require('./utils/validate')

function emptyFn(){
}

module.exports = React.createClass({

    displayName: 'SaturationSpectrum',

    colorUtils: colorUtils,

    getDefaultProps: function(){
        return {
            height     : 300,
            width      : 300,
            pointerSize: 7,
            precision  : 10
        }
    },

    getInitialState: function(){
        return {
            //the current hue - will be locked when dragging starts
            hue: null,
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

        return {
            left: x - diff,
            top : y - diff
        }
    },

    prepareBackgroundColor: function(color){
        var hsv = this.toColorValue(color)

        return colorUtils.fromRatio({
            h: hsv.h,
            s: 1,
            v: 1
        }).toRgbString()
    },

    toColorValue: function(value){
        return typeof value == 'string'?
                    toHsv(value):
                    value
    },

    render: function(){
        this.hsv = this.toColorValue(this.props.value)

        if (this.state.locked){
            this.hsv.h = this.state.hue
        }

        var style = this.props.style || {}

        style = copy({
                    height: this.props.height,
                    width: this.props.width
                }, style)

        style.backgroundColor = this.prepareBackgroundColor(this.props.value)

        var dragStyle = {
            width : this.props.pointerSize,
            height: this.props.pointerSize
        }

        // var dragPos = this.state.locked?
        //                     {top: this.state.pointerTop, left: this.state.pointerLeft}:
        var dragPos = this.getDragPosition()

        if (dragPos){
            dragStyle.top = dragPos.top
            dragStyle.left = dragPos.left
            dragStyle.display = 'block'
        }

        return (
            <div className='cp-saturation-spectrum' style={style} onMouseDown={this.handleMouseDown}>
                <div className='cp-saturation-white'>
                    <div className='cp-saturation-black' />
                </div>
                <div className="cp-saturation-drag" style={dragStyle}>
                    <div className="inner" />
                </div>
            </div>
        )
    },

    handleMouseDown: function(event){
        event.preventDefault()

        var region = Region.fromDOM(this.getDOMNode())
        var info   = this.getEventInfo(event, region)

        var initialPos = {x: info.x, y: info.y}

        this.setState({
            locked     : true,
            hue        : this.hsv.h,
            pointerLeft: info.x,
            pointerTop : info.y
        })

        DragHelper(event, {
            scope: this,
            onDragStart: function(event){
                ;(this.props.onDragStart || emptyFn)(event)
            },
            onDrag: function(event, config){
                console.log(config)
                info.x = initialPos.x + config.diff.left
                info.y = initialPos.y + config.diff.top
                this.updateSaturation(info)
            },
            onDrop: function(){
                this.setState({
                    locked: false
                })
                ;(this.props.onDrop || emptyFn)(event)
            }
        })

        this.updateSaturation(info)
    },

    getSaturationForPoint: function(point){
        return parseFloat(point.x / point.width)
    },

    getColorValueForPoint: function(point){
        var height = point.height

        return parseFloat((height - point.y) / height)
    },

    updateSaturation: function(point){
        point = VALIDATE(point)

        this.hsv.s = this.getSaturationForPoint(point)
        this.hsv.v = this.getColorValueForPoint(point)

        ;(this.props.onSelect || emptyFn)(this.hsv)
    },

    getEventInfo: require('./utils/getEventInfo')
})