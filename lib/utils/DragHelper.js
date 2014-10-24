'use strict'

var F      = require('functionally')
var copy   = require('copy-utils').copy
var Region = require('region')

var Helper = function(config){
    this.config = config
}

function buildRegion(target){

    return Region.from(target)
}

function emptyFn(){}

copy({

    /**
     * Should be called on a mousedown event
     *
     * @param  {Event} event
     * @return {[type]}       [description]
     */
    initDrag: function(event) {

        this.onDragInit(event)

        var onDragStart = F.once(this.onDragStart, this)

        var mouseMoveListener = (function(event){
            onDragStart(event)
            this.onDrag(event)
        }).bind(this)

        var mouseUpListener = (function(event){

            this.onDrop(event)

            window.removeEventListener('mousemove', mouseMoveListener)
            window.removeEventListener('mouseup', mouseUpListener)
        }).bind(this)

        window.addEventListener('mousemove', mouseMoveListener, false)
        window.addEventListener('mouseup', mouseUpListener)
    },

    onDragInit: function(event){

        var config = {}
        this.state = {
            config: config
        }

        var initPageCoords = this.state.initPageCoords = {
            pageX: event.pageX,
            pageY: event.pageY
        }

        if (this.config.region){
            this.state.initialRegion = buildRegion(this.config.region)
            this.state.dragRegion =
                config.dragRegion =
                    this.state.initialRegion.clone()
        }
        if (this.config.constrainTo){
            this.state.constrainTo = buildRegion(this.config.constrainTo)
        }

        this.callConfig('onDragInit', event)
    },

    /**
     * Called when the first mousemove event occurs after drag is initialized
     * @param  {Event} event
     */
    onDragStart: function(event){
        this.state.didDrag = this.state.config.didDrag = true
        this.callConfig('onDragStart', event)
    },

    /**
     * Called on all mousemove events after drag is initialized.
     *
     * @param  {Event} event
     */
    onDrag: function(event){

        var config = this.state.config
        var args   = [event, config]

        var initPageCoords = this.state.initPageCoords

        var diff = config.diff = {
            left: event.pageX - initPageCoords.pageX,
            top : event.pageY - initPageCoords.pageY
        }

        if (this.state.initialRegion){
            var dragRegion = config.dragRegion

            //set the dragRegion to initial coords
            dragRegion.set(this.state.initialRegion)

            //shift it to the new position
            dragRegion.shift(diff)

            if (this.state.constrainTo){
                //and finally constrain it if it's the case
                dragRegion.constrainTo(this.state.constrainTo)

                diff.left = dragRegion.left - this.state.initialRegion.left
                diff.top  = dragRegion.top - this.state.initialRegion.top
            }

            config.dragRegion = dragRegion
        }

        this.callConfig('onDrag', event)
    },

    /**
     * Called on the mouseup event on window
     *
     * @param  {Event} event
     */
    onDrop: function(event){
        this.callConfig('onDrop', event)

        this.state = null
    },

    callConfig: function(fnName, event){
        var config = this.state.config
        var args   = [event, config]

        var fn = this.config[fnName]

        if (fn){
            fn.apply(this, args)
        }
    }

}, Helper.prototype)

module.exports = function(event, config){

    if (config.scope){
        var skippedKeys = {
            scope      : 1,
            region     : 1,
            constrainTo: 1
        }

        Object.keys(config).forEach(function(key){
            var value = config[key]

            if (key in skippedKeys){
                return
            }

            if (typeof value == 'function'){
                config[key] = value.bind(config.scope)
            }
        })
    }
    var helper = new Helper(config)

    helper.initDrag(event)

    return helper

}