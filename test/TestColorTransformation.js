describe('color transform', function() {
    var colorUtils = require('../src/utils/color')
    var toHsv = colorUtils.toHsv
    var toColor = colorUtils.toColor
    var toColor = colorUtils.toColor
    var fromRatio = colorUtils.fromRatio

    it('should transform hsv <-> rgb correctly', function(){

        var col = toColor(fromRatio({h: 0.3066666667, s: 1, v: 1, a: 1}))

        col
            .toHexString()
            .should
            .equal('#29ff00')

    })
})