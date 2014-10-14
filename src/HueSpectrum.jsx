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

function emptyFn(){
}

var VALIDATE = require('./utils/validate')

module.exports = React.createClass({

    displayName: 'HueSpectrum',

    colorUtils: colorUtils,

    getDefaultProps: function(){
        return {
            height     : 300,
            width      : 30,
            pointerSize: 3,
            value      : require('./defaultColor')
        }
    },

    getInitialState: function(){
        return {
            h: 0
        }
    },

    componentDidUpdate: function(){
        // this.updateDragPositionIf()
    },

    componentDidMount: function(){
        this.updateDragPositionIf()
    },

    updateDragPositionIf: function(){

        if (!this.props.height){
            this.setState({})
        }
    },

    toColorValue: function(value){

        value = typeof value == 'string'?
                    toHsv(value):
                    value

        return value
    },

    render: function(){
        this.hsv = this.toColorValue(this.props.value)

        if (this.state.h == 360 && !this.hsv.h){
            //in order to show bottom red as well on drag
            this.hsv.h = 360
        }

        var style = this.props.style || {}

        style = copy({height: this.props.height, width: this.props.width }, style)

        var dragStyle = {
            height: this.props.pointerSize
        }

        var dragPos = this.getDragPosition()

        if (dragPos != null){
            dragStyle.top   = dragPos
            dragStyle.display = 'block'
        }
        return (
            <div className='cp-hue-spectrum' style={style} onMouseDown={this.handleMouseDown}>
                <div className="cp-hue-drag" style={dragStyle}>
                    <div className="inner" />
                </div>
            </div>
        )
    },

    handleMouseDown: function(event){
        event.preventDefault()

        var region = Region.fromDOM(this.getDOMNode())

        DragHelper(event, {
            scope: this,
            onDrag: function(event){
                this.updateHue(this.getEventInfo(event, region))
            }
        })

        this.updateHue(this.getEventInfo(event, region))
    },

    getDragPosition: function(hsv){
        hsv = hsv || this.hsv

        if (!this.props.height && !this.isMounted()){
            return null
        }

        var height = this.props.height || Region.fromDOM(this.getDOMNode()).getHeight()
        var size   = this.props.pointerSize

        var pos  = Math.round(Math.round(hsv.h) * height / 360)
        var diff = Math.round(size / 2)

        return pos - diff

    },


    updateHue: function(point){
        point = VALIDATE(point)

        var height = point.height

        this.hsv.h = Math.round(point.y * 360 / height)

        if (this.hsv.h != 0){
            this.state.h = this.hsv.h
        }

        this.state.h = this.hsv.h != 0? this.hsv.h: 0

        ;(this.props.onSelect || emptyFn)(this.hsv)
    },

    getEventInfo: require('./utils/getEventInfo')
})