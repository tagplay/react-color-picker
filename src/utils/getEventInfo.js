'use strict'

module.exports = function getEventInfo(event, region){
    region = region || Region.fromDOM(this.getDOMNode())

    var x = event.clientX - region.left
    var y = event.clientY - region.top

    return {
        x: x,
        y: y,
        width  : region.getWidth(),
        height : region.getHeight()
    }
}