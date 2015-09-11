'use strict';

var Region     = require('region')
var assign     = require('object-assign')
var DragHelper = require('drag-helper')
var toHsv      = require('./color').toHsv

function emptyFn(){}

export default {

    toColorValue: function(value){
        if (typeof value == 'string'){
            return toHsv(value)
        }

        return {
            h: value.h,
            s: value.s,
            v: value.v,
            a: value.a
        }
    },

    onMouseDown: function(event){
        event.preventDefault()

        var region = Region.fromDOM(this.getDOMNode())
        var info   = this.getEventInfo(event, region)

        DragHelper(event, {
            scope: this,

            constrainTo: region,

            onDragStart: function(event, config){
                config.initialPoint = info

                config.minLeft = 0
                config.maxLeft = region.width

                this.handleDragStart(event)
            },
            onDrag: function(event, config){
                var info = this.getEventInfo(event, region)

                this.updateColor(info)
                this.handleDrag(event, config)
            },
            onDrop: function(event, config){
                var info = this.getEventInfo(event, region)

                this.updateColor(info)

                this.handleDrop(event, config)
            }
        })

        this.updateColor(info)
        this.handleMouseDown(event, { initialPoint: info })
    },

    handleMouseDown: function(event, config){

        ;(this.props.onMouseDown || emptyFn).apply(this, this.getColors())
        this.handleDrag(event, config)
    },

    handleUpdate: function(event, config){

        var diff = config.diff || { top: 0, left: 0 }
        var initialPoint = config.initialPoint

        if (initialPoint){

            var top
            var left

            left = initialPoint.x + diff.left
            top  = initialPoint.y + diff.top

            if (config.minLeft !== undefined) left = Math.max(left, config.minLeft)
            if (config.maxLeft !== undefined) left = Math.min(left, config.maxLeft)

            this.state.top  = top
            this.state.left = left

            this.state.mouseDown = {
                x     : left,
                y     : top,
                width : initialPoint.width,
                height: initialPoint.height
            }

        }

        if (this.props.inPicker){
            //the picker handles the values
            return
        }

        if (!this.props.value){
            this.setState({
                value: this.hsv
            })
        }
    },

    handleDragStart: function(event){
    },

    handleDrag: function(event, config){
        this.handleUpdate(event, config)
        ;(this.props.onDrag || emptyFn).apply(this, this.getColors())
    },

    handleDrop: function(event, config){
        this.handleUpdate(event, config)
        this.state.mouseDown = false
        ;(this.props.onChange || emptyFn).apply(this, this.getColors())
    },

    getColors: function(){
        var first = this.props.inPicker?
                        this.hsv:
                        this.toStringValue(this.hsv)
        var args = [first]

        if (!this.props.inPicker){
            args.push(assign({}, this.hsv))
        }

        return args
    },

    getEventInfo: function(event, region){
        region = region || Region.fromDOM(this.getDOMNode())

        var origin = event.touches ? event.touches[0] : event;

        if (origin) {
            var x = origin.clientX - region.left
            var y = origin.clientY - region.top
        }
        else {
            var x = 0
            var y = 0
        }

        return {
            x: x,
            y: y,
            width  : region.getWidth(),
            height : region.getHeight()
        }
    }
}