(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ColorPicker"] = factory(require("React"));
	else
		root["ColorPicker"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React      = __webpack_require__(1)
	var copy       = __webpack_require__(7).copy
	var colorUtils = __webpack_require__(5)

	var HueSpectrum        = React.createFactory(__webpack_require__(2))
	var SaturationSpectrum = React.createFactory(__webpack_require__(3))

	var toHsv = colorUtils.toHsv

	function emptyFn(){}

	var RESULT = React.createClass({

	    displayName: 'ColorPicker',

	    getDefaultProps: function(){
	        return {
	            defaultColor    : __webpack_require__(4),
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

	        var props = this.prepareProps(copy(this.props))

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
	            saturationConfig.value = copy(value)
	            hueConfig.value = copy(value)
	        } else {
	            saturationConfig.defaultValue = copy(defaultValue)
	            hueConfig.defaultValue = copy(defaultValue)
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

	    toStringValue: __webpack_require__(6),

	    handleChange: function(color){

	        this.state.dragHue = null

	        color = copy(color)

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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict'

	var React  = __webpack_require__(1)
	var Region = __webpack_require__(16)
	var copy   = __webpack_require__(7).copy

	var common = __webpack_require__(8)

	var VALIDATE = __webpack_require__(9)

	module.exports = React.createClass(copy(common, {

	    displayName: 'HueSpectrum',

	    getDefaultProps: function(){
	        return {
	            height      : 300,
	            width       : 30,
	            pointerSize : 3,
	            defaultColor: __webpack_require__(4)
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

	    render: function(){
	        this.hsv = this.toColorValue(this.state.value || this.props.value || this.props.defaultValue || this.props.defaultColor)

	        if (this.state.h == 360 && !this.hsv.h){
	            //in order to show bottom red as well on drag
	            this.hsv.h = 360
	        }

	        var style = this.props.style || {}

	        if (this.props.height){
	            style.height = this.props.height
	        }
	        if (this.props.width){
	            style.width = this.props.width
	        }

	        var dragStyle = {
	            height: this.props.pointerSize
	        }

	        var dragPos = this.getDragPosition()

	        if (dragPos != null){
	            dragStyle.top   = dragPos
	            dragStyle.display = 'block'
	        }
	        return (
	            React.DOM.div({className: "cp-hue-spectrum", style: style, onMouseDown: this.onMouseDown}, 
	                React.DOM.div({className: "cp-hue-drag", style: dragStyle}, 
	                    React.DOM.div({className: "inner"})
	                )
	            )
	        )
	    },

	    getDragPosition: function(hsv){
	        hsv = hsv || this.hsv

	        if (!this.props.height && !this.isMounted()){
	            return null
	        }

	        var height = this.props.height || Region.fromDOM(this.getDOMNode()).getHeight()
	        var size   = this.props.pointerSize

	        var pos  = Math.round(hsv.h * height / 360)
	        var diff = Math.round(size / 2)

	        return pos - diff
	    },

	    updateColor: function(point){
	        point = VALIDATE(point)

	        this.hsv.h = point.y * 360 / point.height

	        if (this.hsv.h != 0){
	            this.state.h = this.hsv.h
	        }

	        this.state.h = this.hsv.h != 0? this.hsv.h: 0
	    },

	    toStringValue: __webpack_require__(6)
	}))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict'

	var React  = __webpack_require__(1)
	var Region = __webpack_require__(16)
	var copy   = __webpack_require__(7).copy

	var fromRatio  = __webpack_require__(5).fromRatio
	var common = __webpack_require__(8)

	var VALIDATE = __webpack_require__(9)

	module.exports = React.createClass(copy(common, {

	    displayName: 'SaturationSpectrum',

	    getDefaultProps: function(){
	        return {
	            height      : 300,
	            width       : 300,
	            pointerSize : 7,
	            defaultColor: __webpack_require__(4)
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

	        if (this.props.value && this.state.mouseDown){
	            x = this.state.mouseDown.x
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

	    toStringValue: __webpack_require__(6)
	}))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = 'red'

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var tinycolor = __webpack_require__(18)

	if (typeof window != 'undefined'){
	    window.tinycolor = tinycolor
	}

	function toColor(color){
	    return tinycolor(color)
	}

	function toPure(color){
	    var h = toColor(color).toHsl().h

	    return toColor({ h: h, s: 100, l: 50, a: 1})
	}

	function fromRatio(color){
	    return tinycolor.fromRatio(color)
	}

	function toAlpha(color, alpha){
	    if (alpha > 1){
	        alpha = alpha/100
	    }

	    color   = toColor(color).toRgb()
	    color.a = alpha

	    return toColor(color)
	}

	function toHsv(color){
	    return toColor(color).toHsv()
	}

	var Color = {
	    toColor  : toColor,
	    toPure   : toPure,
	    fromRatio: fromRatio,
	    toAlpha  : toAlpha,
	    toHsv    : toHsv
	}

	if (typeof window != 'undefined'){
	    window.color = Color
	}

	module.exports = Color

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var copy    = __webpack_require__(7).copy
	var toColor = __webpack_require__(5).toColor

	module.exports = function toStringValue(color){
	    color = toColor(copy(color))

	    return color.toRgb().a == 1?
	                color.toHexString():
	                color.toRgbString()
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){

	    'use strict'

	    var HAS_OWN       = Object.prototype.hasOwnProperty,
	        STR_OBJECT    = 'object',
	        STR_UNDEFINED = 'undefined'

	    return {

	        /**
	         * Copies all properties from source to destination
	         *
	         *      copy({name: 'jon',age:5}, this);
	         *      // => this will have the 'name' and 'age' properties set to 'jon' and 5 respectively
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         *
	         * @return {Object} destination
	         */
	        copy: __webpack_require__(10),

	        /**
	         * Copies all properties from source to destination, if the property does not exist into the destination
	         *
	         *      copyIf({name: 'jon',age:5}, {age:7})
	         *      // => { name: 'jon', age: 7}
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         *
	         * @return {Object} destination
	         */
	        copyIf: __webpack_require__(11),

	        /**
	         * Copies all properties from source to a new object, with the given value. This object is returned
	         *
	         *      copyAs({name: 'jon',age:5})
	         *      // => the resulting object will have the 'name' and 'age' properties set to 1
	         *
	         * @param {Object} source
	         * @param {Object/Number/String} [value=1]
	         *
	         * @return {Object} destination
	         */
	        copyAs: function(source, value){

	            var destination = {}

	            value = value || 1

	            if (source != null && typeof source === STR_OBJECT ){

	                for (var i in source) if ( HAS_OWN.call(source, i) ) {
	                    destination[i] = value
	                }

	            }

	            return destination
	        },

	        /**
	         * Copies all properties named in the list, from source to destination
	         *
	         *      copyList({name: 'jon',age:5, year: 2006}, {}, ['name','age'])
	         *      // => {name: 'jon', age: 5}
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         * @param {Array} list the array with the names of the properties to copy
	         *
	         * @return {Object} destination
	         */
	        copyList: __webpack_require__(12),

	        /**
	         * Copies all properties named in the list, from source to destination, if the property does not exist into the destination
	         *
	         *      copyListIf({name: 'jon',age:5, year: 2006}, {age: 10}, ['name','age'])
	         *      // => {name: 'jon', age: 10}
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         * @param {Array} list the array with the names of the properties to copy
	         *
	         * @return {Object} destination
	         */
	        copyListIf: __webpack_require__(13),

	        /**
	         * Copies all properties named in the namedKeys, from source to destination
	         *
	         *      copyKeys({name: 'jon',age:5, year: 2006, date: '2010/05/12'}, {}, {name:1 ,age: true, year: 'theYear'})
	         *      // => {name: 'jon', age: 5, theYear: 2006}
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         * @param {Object} namedKeys an object with keys denoting the properties to be copied
	         *
	         * @return {Object} destination
	         */
	        copyKeys: __webpack_require__(14),

	        /**
	         * Copies all properties named in the namedKeys, from source to destination,
	         * but only if the property does not already exist in the destination object
	         *
	         *      copyKeysIf({name: 'jon',age:5, year: 2006}, {aname: 'test'}, {name:'aname' ,age: true})
	         *      // => {aname: 'test', age: 5}
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         * @param {Object} namedKeys an object with keys denoting the properties to be copied
	         *
	         * @return {Object} destination
	         */
	        copyKeysIf: __webpack_require__(15),

	        copyExceptKeys: function(source, destination, exceptKeys){
	            destination = destination || {}
	            exceptKeys  = exceptKeys  || {}

	            if (source != null && typeof source === STR_OBJECT ){

	                for (var i in source) if ( HAS_OWN.call(source, i) && !HAS_OWN.call(exceptKeys, i) ) {

	                    destination[i] = source[i]
	                }

	            }

	            return destination
	        },

	        /**
	         * Copies the named keys from source to destination.
	         * For the keys that are functions, copies the functions bound to the source
	         *
	         * @param  {Object} source      The source object
	         * @param  {Object} destination The target object
	         * @param  {Object} namedKeys   An object with the names of the keys to copy The values from the keys in this object
	         *                              need to be either numbers or booleans if you want to copy the property under the same name,
	         *                              or a string if you want to copy the property under a different name
	         * @return {Object}             Returns the destination object
	         */
	        bindCopyKeys: function(source, destination, namedKeys){
	            if (arguments.length == 2){
	                namedKeys = destination
	                destination = null
	            }

	            destination = destination || {}

	            if (
	                       source != null && typeof source    === STR_OBJECT &&
	                    namedKeys != null && typeof namedKeys === STR_OBJECT
	                ) {


	                var typeOfNamedProperty,
	                    namedPropertyValue,

	                    typeOfSourceProperty,
	                    propValue


	                for(var propName in namedKeys) if (HAS_OWN.call(namedKeys, propName)) {

	                    namedPropertyValue = namedKeys[propName]
	                    typeOfNamedProperty = typeof namedPropertyValue

	                    propValue = source[propName]
	                    typeOfSourceProperty = typeof propValue


	                    if ( typeOfSourceProperty !== STR_UNDEFINED ) {

	                        destination[
	                            typeOfNamedProperty == 'string'?
	                                            namedPropertyValue :
	                                            propName
	                            ] = typeOfSourceProperty == 'function' ?
	                                            propValue.bind(source):
	                                            propValue
	                    }
	                }
	            }

	            return destination
	        }
	    }

	}()

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var Region = __webpack_require__(16)
	var copy   = __webpack_require__(7).copy
	var DragHelper = __webpack_require__(17)
	var toHsv = __webpack_require__(5).toHsv

	function emptyFn(){}

	module.exports = {

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

	            this.state.top  = top = initialPoint.y + diff.top
	            this.state.left = left = initialPoint.x + diff.left

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
	            args.push(copy(this.hsv))
	        }

	        return args
	    },

	    getEventInfo: function(event, region){
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
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function validate(info){
	    var height  = info.height
	    var width   = info.width

	    if (info.x < 0){
	        info.x = 0
	    }

	    if (info.x >= width){
	        info.x = width
	    }

	    if (info.y < 0){
	        info.y = 0
	    }

	    if (info.y >= height){
	        info.y = height
	    }

	    return info
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var HAS_OWN       = Object.prototype.hasOwnProperty
	var STR_OBJECT    = 'object'

	/**
	 * Copies all properties from source to destination
	 *
	 *      copy({name: 'jon',age:5}, this);
	 *      // => this will have the 'name' and 'age' properties set to 'jon' and 5 respectively
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination){

	    destination = destination || {}

	    if (source != null && typeof source === STR_OBJECT ){

	        for (var i in source) if ( HAS_OWN.call(source, i) ) {
	            destination[i] = source[i]
	        }

	    }

	    return destination
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var HAS_OWN       = Object.prototype.hasOwnProperty
	var STR_OBJECT    = 'object'
	var STR_UNDEFINED = 'undefined'

	/**
	 * Copies all properties from source to destination, if the property does not exist into the destination
	 *
	 *      copyIf({name: 'jon',age:5}, {age:7})
	 *      // => { name: 'jon', age: 7}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination){
	    destination = destination || {}

	    if (source != null && typeof source === STR_OBJECT){

	        for (var i in source) if ( HAS_OWN.call(source, i) && (typeof destination[i] === STR_UNDEFINED) ) {

	            destination[i] = source[i]

	        }
	    }

	    return destination
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var STR_UNDEFINED = 'undefined'

	/**
	 * Copies all properties named in the list, from source to destination
	 *
	 *      copyList({name: 'jon',age:5, year: 2006}, {}, ['name','age'])
	 *      // => {name: 'jon', age: 5}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 * @param {Array} list the array with the names of the properties to copy
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination, list){
	    if (arguments.length < 3){
	        list = destination
	        destination = null
	    }

	    destination = destination || {}
	    list        = list || Object.keys(source)

	    var i   = 0
	    var len = list.length
	    var propName

	    for ( ; i < len; i++ ){
	        propName = list[i]

	        if ( typeof source[propName] !== STR_UNDEFINED ) {
	            destination[list[i]] = source[list[i]]
	        }
	    }

	    return destination
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var STR_UNDEFINED = 'undefined'

	/**
	 * Copies all properties named in the list, from source to destination, if the property does not exist into the destination
	 *
	 *      copyListIf({name: 'jon',age:5, year: 2006}, {age: 10}, ['name','age'])
	 *      // => {name: 'jon', age: 10}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 * @param {Array} list the array with the names of the properties to copy
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination, list){
	    if (arguments.length < 3){
	        list = destination
	        destination = null
	    }

	    destination = destination || {}
	    list        = list || Object.keys(source)

	    var i   = 0
	    var len = list.length
	    var propName

	    for ( ; i < len ; i++ ){
	        propName = list[i]
	        if (
	                (typeof source[propName]      !== STR_UNDEFINED) &&
	                (typeof destination[propName] === STR_UNDEFINED)
	            ){
	            destination[propName] = source[propName]
	        }
	    }

	    return destination
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var STR_UNDEFINED = 'undefined'
	var STR_OBJECT    = 'object'
	var HAS_OWN       = Object.prototype.hasOwnProperty

	var copyList = __webpack_require__(12)

	/**
	 * Copies all properties named in the namedKeys, from source to destination
	 *
	 *      copyKeys({name: 'jon',age:5, year: 2006, date: '2010/05/12'}, {}, {name:1 ,age: true, year: 'theYear'})
	 *      // => {name: 'jon', age: 5, theYear: 2006}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 * @param {Object} namedKeys an object with keys denoting the properties to be copied
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination, namedKeys){
	    if (arguments.length < 3 ){
	        namedKeys = destination
	        destination = null
	    }

	    destination = destination || {}

	    if (!namedKeys || Array.isArray(namedKeys)){
	        return copyList(source, destination, namedKeys)
	    }

	    if (
	           source != null && typeof source    === STR_OBJECT &&
	        namedKeys != null && typeof namedKeys === STR_OBJECT
	    ) {
	        var typeOfNamedProperty
	        var namedPropertyValue

	        for  (var propName in namedKeys) if ( HAS_OWN.call(namedKeys, propName) ) {
	            namedPropertyValue  = namedKeys[propName]
	            typeOfNamedProperty = typeof namedPropertyValue

	            if (typeof source[propName] !== STR_UNDEFINED){
	                destination[typeOfNamedProperty == 'string'? namedPropertyValue : propName] = source[propName]
	            }
	        }
	    }

	    return destination
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var STR_UNDEFINED = 'undefined'
	var STR_OBJECT    = 'object'
	var HAS_OWN       = Object.prototype.hasOwnProperty

	var copyListIf = __webpack_require__(13)

	/**
	 * Copies all properties named in the namedKeys, from source to destination,
	 * but only if the property does not already exist in the destination object
	 *
	 *      copyKeysIf({name: 'jon',age:5, year: 2006}, {aname: 'test'}, {name:'aname' ,age: true})
	 *      // => {aname: 'test', age: 5}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 * @param {Object} namedKeys an object with keys denoting the properties to be copied
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination, namedKeys){
	    if (arguments.length < 3 ){
	        namedKeys = destination
	        destination = null
	    }

	    destination = destination || {}

	    if (!namedKeys || Array.isArray(namedKeys)){
	        return copyListIf(source, destination, namedKeys)
	    }

	    if (
	               source != null && typeof source    === STR_OBJECT &&
	            namedKeys != null && typeof namedKeys === STR_OBJECT
	        ) {

	            var typeOfNamedProperty
	            var namedPropertyValue
	            var newPropertyName

	            for (var propName in namedKeys) if ( HAS_OWN.call(namedKeys, propName) ) {

	                namedPropertyValue  = namedKeys[propName]
	                typeOfNamedProperty = typeof namedPropertyValue
	                newPropertyName     = typeOfNamedProperty == 'string'? namedPropertyValue : propName

	                if (
	                        typeof      source[propName]        !== STR_UNDEFINED &&
	                        typeof destination[newPropertyName] === STR_UNDEFINED
	                    ) {
	                    destination[newPropertyName] = source[propName]
	                }

	            }
	        }

	    return destination
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn    = __webpack_require__(20)
	var copyUtils = __webpack_require__(7)
	var copyList  = copyUtils.copyList
	var F         = __webpack_require__(19)
	var isObject  = __webpack_require__(21).object

	/**
	 * @class Region
	 *
	 * # z.region
	 *
	 * The Region class is an abstraction that allows the developer to refer to rectangles on the screen,
	 * and move them around, make diffs and unions, detect intersections, compute areas, etc.
	 *
	 * ## Creating a region
	 *
	 *
	 *
	 *      var region = require('region')({
	 *          top  : 10,
	 *          left : 10,
	 *          bottom: 100,
	 *          right : 100
	 *      })
	 *      //this region is a square, 90x90, starting from (10,10) to (100,100)
	 *
	 *      var second = require('region')({ top: 10, left: 100, right: 200, bottom: 60})
	 *      var union  = region.getUnion(second)
	 *
	 *      //the "union" region is a union between "region" and "second"
	 *
	 * ## Element regions
	 *
	 * The {@link Element} class has {@link Element#getRegion} and {@link Element#setRegion} methods, so you can easily
	 * retrieve and set element size and position.
	 *
	 *      var bodyElement = Element.select('body'),
	 *          bodyRegion  = bodyElement.getRegion()
	 *
	 *      bodyRegion.setWidth(100).setHeight(200)
	 *
	 *      //this makes the body just 100px in width and 200px in height
	 *      bodyElement.setRegion(bodyRegion)
	 *
	 *      //you can even bind an element to a region
	 *
	 *      var reg = bodyElement.getRegion({bound: true})
	 *
	 *      reg.setWidth(200) //also sets the width of the bodyElement
	 *
	 */

	var classy = __webpack_require__(23)
	var EventEmitter = __webpack_require__(22).mixin

	var MAX       = Math.max,
	    MIN       = Math.min,
	    POINT_POSITIONS = {
	        cy: 'YCenter',
	        cx: 'XCenter',
	        t : 'Top',
	        tc: 'TopCenter',
	        tl: 'TopLeft',
	        tr: 'TopRight',
	        b : 'Bottom',
	        bc: 'BottomCenter',
	        bl: 'BottomLeft',
	        br: 'BottomRight',
	        l : 'Left',
	        lc: 'LeftCenter',
	        r : 'Right',
	        rc: 'RightCenter',
	        c : 'Center'
	    }

	var REGION = classy.define({

	    forceInstance: true,

	    mixins: [
	        EventEmitter
	    ],

	    statics: {
	        init: function(){
	            var exportAsNonStatic = {
	                getIntersection      : true,
	                getIntersectionArea  : true,
	                getIntersectionHeight: true,
	                getIntersectionWidth : true,
	                getUnion             : true
	            }
	            var thisProto = this.prototype
	            var newName

	            var exportHasOwn = hasOwn(exportAsNonStatic)
	            var methodName

	            for (methodName in exportAsNonStatic) if (exportHasOwn(methodName)) {
	                newName = exportAsNonStatic[methodName]
	                if (typeof newName != 'string'){
	                    newName = methodName
	                }

	                (function(proto, methodName, protoMethodName){

	                    proto[methodName] = function(region){
	                        //<debug>
	                        if (!this.$ownClass[protoMethodName]){
	                            console.warn('cannot find method ', protoMethodName,' on ', this.$ownClass)
	                        }
	                        //</debug>
	                        return this.$ownClass[protoMethodName](this, region)
	                    }

	                })(thisProto, newName, methodName)
	            }
	        },

	        /**
	         * @static
	         * Returns true if the given region is valid, false otherwise.
	         * @param  {Region} region The region to check
	         * @return {Boolean}        True, if the region is valid, false otherwise.
	         * A region is valid if
	         *  * left <= right  &&
	         *  * top  <= bottom
	         */
	        validate: function(region){

	            var isValid = true

	            if (region.right < region.left){
	                isValid = false
	                region.right = region.left
	            }

	            if (region.bottom < region.top){
	                isValid = false
	                region.bottom = region.top
	            }

	            return isValid
	        },

	        /**
	         * Returns the region corresponding to the documentElement
	         * @return {Region} The region corresponding to the documentElement. This region is the maximum region visible on the screen.
	         */
	        getDocRegion: function(){
	            return REGION.fromDOM(document.documentElement)
	        },

	        from: function(reg){
	            if (reg.__IS_REGION){
	                return reg
	            }

	            if (typeof document){
	                if (typeof HTMLElement != 'undefined' && reg instanceof HTMLElement){
	                    return REGION.fromDOM(reg)
	                }

	                if (reg.type && reg.pageX != undefined && reg.pageY != undefined){
	                    return REGION.fromEvent(reg)
	                }
	            }

	            return REGION(reg)
	        },

	        fromEvent: function(event){
	            return REGION.fromPoint({
	                x: event.pageX,
	                y: event.pageY
	            })
	        },

	        fromDOM: function(dom){
	            var rect    = dom.getBoundingClientRect()
	            var docElem = document.documentElement
	            var win     = window

	            var top  = rect.top + win.pageYOffset - docElem.clientTop
	            var left = rect.left + win.pageXOffset - docElem.clientLeft

	            return new REGION({
	                top   : rect.top,
	                left  : rect.left,
	                bottom: rect.bottom,
	                right : rect.right
	            })
	        },

	        /**
	         * @static
	         * Returns a region that is the intersection of the given two regions
	         * @param  {Region} first  The first region
	         * @param  {Region} second The second region
	         * @return {Region/Boolean}        The intersection region or false if no intersection found
	         */
	        getIntersection: function(first, second){

	            var area = this.getIntersectionArea(first, second)

	            if (area){
	                return new REGION(area)
	            }

	            return false
	        },

	        getIntersectionWidth: function(first, second){
	            var minRight  = MIN(first.right, second.right)
	            var maxLeft   = MAX(first.left,  second.left)

	            if (maxLeft < minRight){
	                return minRight  - maxLeft
	            }

	            return 0
	        },

	        getIntersectionHeight: function(first, second){
	            var maxTop    = MAX(first.top,   second.top)
	            var minBottom = MIN(first.bottom,second.bottom)

	            if (maxTop  < minBottom){
	                return minBottom - maxTop
	            }

	            return 0
	        },

	        getIntersectionArea: function(first, second){
	            var maxTop    = MAX(first.top,   second.top)
	            var minRight  = MIN(first.right, second.right)
	            var minBottom = MIN(first.bottom,second.bottom)
	            var maxLeft   = MAX(first.left,  second.left)

	            if (
	                    maxTop  < minBottom &&
	                    maxLeft < minRight
	                ){
	                return {
	                    top    : maxTop,
	                    right  : minRight,
	                    bottom : minBottom,
	                    left   : maxLeft,

	                    width  : minRight  - maxLeft,
	                    height : minBottom - maxTop
	                }
	            }

	            return false
	        },

	        /**
	         * @static
	         * Returns a region that is the union of the given two regions
	         * @param  {Region} first  The first region
	         * @param  {Region} second The second region
	         * @return {Region}        The union region. The smallest region that contains both given regions.
	         */
	        getUnion: function(first, second){
	            var top    = MIN(first.top,   second.top)
	            var right  = MAX(first.right, second.right)
	            var bottom = MAX(first.bottom,second.bottom)
	            var left   = MIN(first.left,  second.left)

	            return new REGION(top, right, bottom, left)
	        },

	        /**
	         * @static
	         * Returns a region. If the reg argument is a region, returns it, otherwise return a new region built from the reg object.
	         *
	         * @param  {Region} reg A region or an object with either top, left, bottom, right or
	         * with top, left, width, height
	         * @return {Region} A region
	         */
	        getRegion: function(reg){
	            return REGION.from(reg)
	        },

	        /**
	         * Creates a region that corresponds to a point.
	         *
	         * @param  {Object} xy The point
	         * @param  {Number} xy.x
	         * @param  {Number} xy.y
	         *
	         * @return {Region}    The new region, with top==xy.y, bottom = xy.y and left==xy.x, right==xy.x
	         */
	        fromPoint: function(xy){
	            return new REGION({
	                        top    : xy.y,
	                        bottom : xy.y,
	                        left   : xy.x,
	                        right  : xy.x
	                    })
	        }
	    },

	    /**
	     * @cfg {Boolean} emitChangeEvents If this is set to true, the region
	     * will emit 'changesize' and 'changeposition' whenever the size or the position changs
	     */
	    emitChangeEvents: false,

	    /**
	     * @cfg {Number} changeEventsBuffer If {@link #emitChangeEvents} is true, the change events will be emitted in a buffered manner,
	     * if this value is greater than 0
	     */
	    changeEventsBuffer: 0,

	    /**
	     * Returns this region, or a clone of this region
	     * @param  {Boolean} [clone] If true, this method will return a clone of this region
	     * @return {Region}       This region, or a clone of this
	     */
	    getRegion: function(clone){
	        return clone?
	                    this.clone():
	                    this
	    },

	    /**
	     * Sets the properties of this region to those of the given region
	     * @param {Region/Object} reg The region or object to use for setting properties of this region
	     * @return {Region} this
	     */
	    setRegion: function(reg){

	        if (reg instanceof REGION){
	            this.set(reg.get())
	        } else {
	            this.set(reg)
	        }

	        return this
	    },

	    /**
	     * Returns true if this region is valid, false otherwise
	     *
	     * @param  {Region} region The region to check
	     * @return {Boolean}        True, if the region is valid, false otherwise.
	     * A region is valid if
	     *  * left <= right  &&
	     *  * top  <= bottom
	     */
	    validate: function(){
	        return REGION.validate(this)
	    },

	    _before: function(){
	        if (this.emitChangeEvents){
	            return copyList(this, {}, ['left','top','bottom','right'])
	        }
	    },

	    _after: function(before){
	        if (this.emitChangeEvents){

	            if(this.top != before.top || this.left != before.left) {
	                this.emitPositionChange()
	            }

	            if(this.right != before.right || this.bottom != before.bottom) {
	                this.emitSizeChange()
	            }
	        }
	    },

	    notifyPositionChange: function(){
	        this.emit('changeposition', this)
	    },

	    emitPositionChange: function(){
	        if (this.changeEventsBuffer){
	            if (!this.emitPositionChangeBuffered){
	                this.emitPositionChangeBuffered = F.buffer(this.notifyPositionChange, changeEventsBuffer)
	            }
	            this.emitPositionChangeBuffered()
	        }

	        this.notifyPositionChange()
	    },

	    notifySizeChange: function(){
	        this.emit('changesize', this)
	    },

	    emitSizeChange: function(){
	        if (this.changeEventsBuffer){
	            if (!this.emitSizeChangeBuffered){
	                this.emitSizeChangeBuffered = F.buffer(this.notifySizeChange, changeEventsBuffer)
	            }
	            this.emitSizeChangeBuffered()
	        }

	        this.notifySizeChange()
	    },

	    /**
	     * Add the given amounts to each specified side. Example
	     *
	     *      region.add({
	     *          top: 50,    //add 50 px to the top side
	     *          bottom: -100    //substract 100 px from the bottom side
	     *      })
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @return {Region} this
	     */
	    add: function(directions){

	        var before = this._before()
	        var direction

	        for (direction in directions) if ( hasOwn(directions, direction) ) {
	            this[direction] += directions[direction]
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * The same as {@link #add}, but substracts the given values
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @return {Region} this
	     */
	    substract: function(directions){

	        var before = this._before()
	        var direction

	        for (direction in directions) if (hasOwn(directions, direction) ) {
	            this[direction] -= directions[direction]
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Retrieves the size of the region.
	     * @return {Object} An object with {width, height}, corresponding to the width and height of the region
	     */
	    getSize: function(){
	        return {
	            width  : this.getWidth(),
	            height : this.getHeight()
	        }
	    },

	    /**
	     * Move the region to the given position and keeps the region width and height.
	     *
	     * @param {Object} position An object with {top, left} properties. The values in {top,left} are used to move the region by the given amounts.
	     * @param {Number} [position.left]
	     * @param {Number} [position.top]
	     *
	     * @return {Region} this
	     */
	    setPosition: function(position){
	        var width  = this.getWidth(),
	            height = this.getHeight()

	        if (position.left){
	            position.right  = position.left + width
	        }

	        if (position.top){
	            position.bottom = position.top  + height
	        }

	        return this.set(position)
	    },

	    /**
	     * Sets both the height and the width of this region to the given size.
	     *
	     * @param {Number} size The new size for the region
	     * @return {Region} this
	     */
	    setSize: function(size){
	        if (size.height && size.width){
	            return this.set({
	                right  : this.left + size.width,
	                bottom : this.top + size.height
	            })
	        }

	        if (size.width){
	            this.setWidth(size.width)
	        }

	        if (size.height){
	            this.setHeight(size.height)
	        }

	        return this
	    },

	    get width(){
	        return this.getWidth()
	    },

	    set width(width){
	        return this.setWidth(width)
	    },

	    /**
	     * @chainable
	     *
	     * Sets the width of this region
	     * @param {Number} width The new width for this region
	     * @return {Region} this
	     */
	    setWidth: function(width){
	        return this.set({
	            right: this.left + width
	        })
	    },

	    get height(){
	        return this.getHeight()
	    },

	    set height(height){
	        return this.setHeight(height)
	    },

	    /**
	     * @chainable
	     *
	     * Sets the height of this region
	     * @param {Number} height The new height for this region
	     * @return {Region} this
	     */
	    setHeight: function(height){
	        return this.set({
	            bottom: this.top + height
	        })
	    },

	    /**
	     * Sets the given properties on this region
	     *
	     * @param {Object} directions an object containing top, left, and EITHER bottom, right OR width, height
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @param {Number} [directions.width]
	     * @param {Number} [directions.height]
	     *
	     *
	     * @return {Region} this
	     */
	    set: function(directions){
	        var before = this._before()

	        copyList(directions, this, ['left','top','bottom','right'])

	        if (directions.bottom == null && directions.height != null){
	            this.bottom = this.top + directions.height
	        }
	        if (directions.right == null && directions.width != null){
	            this.right = this.left + directions.width
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Retrieves the given property from this region. If no property is given, return an object
	     * with {left, top, right, bottom}
	     *
	     * @param {String} [dir] the property to retrieve from this region
	     * @return {Number/Object}
	     */
	    get: function(dir){
	        return dir? this[dir]:
	                    copyList(this, {}, ['left','right','top','bottom'])
	    },

	    /**
	     * Shifts this region to either top, or left or both.
	     * Shift is similar to {@link #add} by the fact that it adds the given dimensions to top/left sides, but also adds the given dimensions
	     * to bottom and right
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @return {Region} this
	     */
	    shift: function(directions){

	        var before = this._before()

	        if (directions.top){
	            this.top    += directions.top
	            this.bottom += directions.top
	        }

	        if (directions.left){
	            this.left  += directions.left
	            this.right += directions.left
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Same as {@link #shift}, but substracts the given values
	     * @chainable
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @return {Region} this
	     */
	    unshift: function(directions){

	        if (directions.top){
	            directions.top *= -1
	        }

	        if (directions.left){
	            directions.left *= -1
	        }

	        return this.shift(directions)
	    },

	    /**
	     * Compare this region and the given region. Return true if they have all the same size and position
	     * @param  {Region} region The region to compare with
	     * @return {Boolean}       True if this and region have same size and position
	     */
	    equals: function(region){
	        return this.equalsPosition(region) && this.equalsSize(region)
	    },

	    /**
	     * Returns true if this region has the same bottom,right properties as the given region
	     * @param  {Region/Object} size The region to compare against
	     * @return {Boolean}       true if this region is the same size as the given size
	     */
	    equalsSize: function(size){
	        var isInstance = size instanceof REGION

	        var s = {
	            width: size.width == null && isInstance?
	                    size.getWidth():
	                    size.width,

	            height: size.height == null && isInstance?
	                    size.getHeight():
	                    size.height
	        }
	        return this.getWidth() == s.width && this.getHeight() == s.height
	    },

	    /**
	     * Returns true if this region has the same top,left properties as the given region
	     * @param  {Region} region The region to compare against
	     * @return {Boolean}       true if this.top == region.top and this.left == region.left
	     */
	    equalsPosition: function(region){
	        return this.top == region.top && this.left == region.left
	    },

	    /**
	     * Adds the given ammount to the left side of this region
	     * @param {Number} left The ammount to add
	     * @return {Region} this
	     */
	    addLeft: function(left){
	        var before = this._before()

	        this.left = this[0] = this.left + left

	        this._after(before)

	        return this
	    },

	    /**
	     * Adds the given ammount to the top side of this region
	     * @param {Number} top The ammount to add
	     * @return {Region} this
	     */
	    addTop: function(top){
	        var before = this._before()

	        this.top = this[1] = this.top + top

	        this._after(before)

	        return this
	    },

	    /**
	     * Adds the given ammount to the bottom side of this region
	     * @param {Number} bottom The ammount to add
	     * @return {Region} this
	     */
	    addBottom: function(bottom){
	        var before = this._before()

	        this.bottom += bottom

	        this._after(before)

	        return this
	    },

	    /**
	     * Adds the given ammount to the right side of this region
	     * @param {Number} right The ammount to add
	     * @return {Region} this
	     */
	    addRight: function(right){
	        var before = this._before()

	        this.right += right

	        this._after(before)

	        return this
	    },

	    /**
	     * Minimize the top side.
	     * @return {Region} this
	     */
	    minTop: function(){
	        return this.expand({top: 1})
	    },
	    /**
	     * Minimize the bottom side.
	     * @return {Region} this
	     */
	    maxBottom: function(){
	        return this.expand({bottom: 1})
	    },
	    /**
	     * Minimize the left side.
	     * @return {Region} this
	     */
	    minLeft: function(){
	        return this.expand({left: 1})
	    },
	    /**
	     * Maximize the right side.
	     * @return {Region} this
	     */
	    maxRight: function(){
	        return this.expand({right: 1})
	    },

	    /**
	     * Expands this region to the dimensions of the given region, or the document region, if no region is expanded.
	     * But only expand the given sides (any of the four can be expanded).
	     *
	     * @param {Object} directions
	     * @param {Boolean} [directions.top]
	     * @param {Boolean} [directions.bottom]
	     * @param {Boolean} [directions.left]
	     * @param {Boolean} [directions.right]
	     *
	     * @param {Region} [region] the region to expand to, defaults to the document region
	     * @return {Region} this region
	     */
	    expand: function(directions, region){
	        var docRegion = region || REGION.getDocRegion(),
	            list      = [],
	            direction,
	            before = this._before()

	        for (direction in directions) if ( hasOwn(directions, direction) ) {
	            list.push(direction)
	        }

	        copyList(docRegion, this, list)

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Returns a clone of this region
	     * @return {Region} A new region, with the same position and dimension as this region
	     */
	    clone: function(){
	        return new REGION({
	                    top    : this.top,
	                    left   : this.left,
	                    right  : this.right,
	                    bottom : this.bottom
	                })
	    },

	    /**
	     * Returns true if this region contains the given point
	     * @param {Number/Object} x the x coordinate of the point
	     * @param {Number} [y] the y coordinate of the point
	     *
	     * @return {Boolean} true if this region constains the given point, false otherwise
	     */
	    containsPoint: function(x, y){
	        if (arguments.length == 1){
	            y = x.y
	            x = x.x
	        }

	        return this.left <= x  &&
	               x <= this.right &&
	               this.top <= y   &&
	               y <= this.bottom
	    },

	    /**
	     *
	     * @param region
	     *
	     * @return {Boolean} true if this region contains the given region, false otherwise
	     */
	    containsRegion: function(region){
	        return this.containsPoint(region.left, region.top)    &&
	               this.containsPoint(region.right, region.bottom)
	    },

	    /**
	     * Returns an object with the difference for {top, bottom} positions betwen this and the given region,
	     *
	     * See {@link #diff}
	     * @param  {Region} region The region to use for diff
	     * @return {Object}        {top,bottom}
	     */
	    diffHeight: function(region){
	        return this.diff(region, {top: true, bottom: true})
	    },

	    /**
	     * Returns an object with the difference for {left, right} positions betwen this and the given region,
	     *
	     * See {@link #diff}
	     * @param  {Region} region The region to use for diff
	     * @return {Object}        {left,right}
	     */
	    diffWidth: function(region){
	        return this.diff(region, {left: true, right: true})
	    },

	    /**
	     * Returns an object with the difference in sizes for the given directions, between this and region
	     *
	     * @param  {Region} region     The region to use for diff
	     * @param  {Object} directions An object with the directions to diff. Can have any of the following keys:
	     *  * left
	     *  * right
	     *  * top
	     *  * bottom
	     *
	     * @return {Object} and object with the same keys as the directions object, but the values being the
	     * differences between this region and the given region
	     */
	    diff: function(region, directions){
	        var result = {}
	        var dirName

	        for (dirName in directions) if ( hasOwn(directions, dirName) ) {
	            result[dirName] = this[dirName] - region[dirName]
	        }

	        return result
	    },

	    /**
	     * Returns the position, in {left,top} properties, of this region
	     *
	     * @return {Object} {left,top}
	     */
	    getPosition: function(){
	        return {
	            left: this.left,
	            top : this.top
	        }
	    },

	    /**
	     * Returns the point at the given position from this region.
	     *
	     * @param {String} position Any of:
	     *
	     *  * 'cx' - See {@link #getPointXCenter}
	     *  * 'cy' - See {@link #getPointYCenter}
	     *  * 'b'  - See {@link #getPointBottom}
	     *  * 'bc' - See {@link #getPointBottomCenter}
	     *  * 'l'  - See {@link #getPointLeft}
	     *  * 'lc' - See {@link #getPointLeftCenter}
	     *  * 't'  - See {@link #getPointTop}
	     *  * 'tc' - See {@link #getPointTopCenter}
	     *  * 'r'  - See {@link #getPointRight}
	     *  * 'rc' - See {@link #getPointRightCenter}
	     *  * 'c'  - See {@link #getPointCenter}
	     *  * 'tl' - See {@link #getPointTopLeft}
	     *  * 'bl' - See {@link #getPointBottomLeft}
	     *  * 'br' - See {@link #getPointBottomRight}
	     *  * 'tr' - See {@link #getPointTopRight}
	     *
	     * @param {Boolean} asLeftTop
	     *
	     * @return {Object} either an object with {x,y} or {left,top} if asLeftTop is true
	     */
	    getPoint: function(position, asLeftTop){

	        //<debug>
	        if (!POINT_POSITIONS[position]) {
	            console.warn('The position ', position, ' could not be found! Available options are tl, bl, tr, br, l, r, t, b.');
	        }
	        //</debug>

	        var method = 'getPoint' + POINT_POSITIONS[position],
	            result = this[method]()

	        if (asLeftTop){
	            return {
	                left : result.x,
	                top  : result.y
	            }
	        }

	        return result
	    },

	    /**
	     * Returns a point with x = null and y being the middle of the left region segment
	     * @return {Object} {x,y}
	     */
	    getPointYCenter: function(){
	        return { x: null, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * Returns a point with y = null and x being the middle of the top region segment
	     * @return {Object} {x,y}
	     */
	    getPointXCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: null }
	    },

	    /**
	     * Returns a point with x = null and y the region top position on the y axis
	     * @return {Object} {x,y}
	     */
	    getPointTop: function(){
	        return { x: null, y: this.top }
	    },

	    /**
	     * Returns a point that is the middle point of the region top segment
	     * @return {Object} {x,y}
	     */
	    getPointTopCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: this.top }
	    },

	    /**
	     * Returns a point that is the top-left point of the region
	     * @return {Object} {x,y}
	     */
	    getPointTopLeft: function(){
	        return { x: this.left, y: this.top}
	    },

	    /**
	     * Returns a point that is the top-right point of the region
	     * @return {Object} {x,y}
	     */
	    getPointTopRight: function(){
	        return { x: this.right, y: this.top}
	    },

	    /**
	     * Returns a point with x = null and y the region bottom position on the y axis
	     * @return {Object} {x,y}
	     */
	    getPointBottom: function(){
	        return { x: null, y: this.bottom }
	    },

	    /**
	     * Returns a point that is the middle point of the region bottom segment
	     * @return {Object} {x,y}
	     */
	    getPointBottomCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: this.bottom }
	    },

	    /**
	     * Returns a point that is the bottom-left point of the region
	     * @return {Object} {x,y}
	     */
	    getPointBottomLeft: function(){
	        return { x: this.left, y: this.bottom}
	    },

	    /**
	     * Returns a point that is the bottom-right point of the region
	     * @return {Object} {x,y}
	     */
	    getPointBottomRight: function(){
	        return { x: this.right, y: this.bottom}
	    },

	    /**
	     * Returns a point with y = null and x the region left position on the x axis
	     * @return {Object} {x,y}
	     */
	    getPointLeft: function(){
	        return { x: this.left, y: null }
	    },

	    /**
	     * Returns a point that is the middle point of the region left segment
	     * @return {Object} {x,y}
	     */
	    getPointLeftCenter: function(){
	        return { x: this.left, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * Returns a point with y = null and x the region right position on the x axis
	     * @return {Object} {x,y}
	     */
	    getPointRight: function(){
	        return { x: this.right, y: null }
	    },

	    /**
	     * Returns a point that is the middle point of the region right segment
	     * @return {Object} {x,y}
	     */
	    getPointRightCenter: function(){
	        return { x: this.right, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * Returns a point that is the center of the region
	     * @return {Object} {x,y}
	     */
	    getPointCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * @return {Number} returns the height of the region
	     */
	    getHeight: function(){
	        return this.bottom - this.top
	    },

	    /**
	     * @return {Number} returns the width of the region
	     */
	    getWidth: function(){
	        return this.right - this.left
	    },

	    /**
	     * @return {Number} returns the top property of the region
	     */
	    getTop: function(){
	        return this.top
	    },

	    /**
	     * @return {Number} returns the left property of the region
	     */
	    getLeft: function(){
	        return this.left
	    },

	    /**
	     * @return {Number} returns the bottom property of the region
	     */
	    getBottom: function(){
	        return this.bottom
	    },

	    /**
	     * @return {Number} returns the right property of the region
	     */
	    getRight: function(){
	        return this.right
	    },

	    /**
	     * Returns the area of the region
	     * @return {Number} the computed area
	     */
	    getArea: function(){
	        return this.getWidth() * this.getHeight()
	    },

	    constrainTo: function(contrain){
	        var intersect = this.getIntersection(contrain),
	            shift

	        if (!intersect || !intersect.equals(this)){

	            var contrainWidth  = contrain.getWidth(),
	                contrainHeight = contrain.getHeight(),

	                shift = {}

	            if (this.getWidth() > contrainWidth){
	                this.left = contrain.left
	                this.setWidth(contrainWidth)
	            }

	            if (this.getHeight() > contrainHeight){
	                this.top = contrain.top
	                this.setHeight(contrainHeight)
	            }

	            shift = {}

	            if (this.right > contrain.right){
	                shift.left = contrain.right - this.right
	            }

	            if (this.bottom > contrain.bottom){
	                shift.top = contrain.bottom - this.bottom
	            }

	            if (this.left < contrain.left){
	                shift.left = contrain.left - this.left
	            }

	            if (this.top < contrain.top){
	                shift.top = contrain.top - this.top
	            }

	            this.shift(shift)

	            return true
	        }

	        return false
	    },

	    /**
	     * @constructor
	     *
	     * Construct a new Region.
	     *
	     * Example:
	     *
	     *      var r = root.create('z.region', { top: 10, left: 20, bottom: 100, right: 200 })
	     *
	     *      //or, the same, but with numbers
	     *
	     *      r = root.create('z.region', 10, 200, 100, 20)
	     *
	     *      //or, with width and height
	     *
	     *      r = root.create('z.region', { top: 10, left: 20, width: 180, height: 90})
	     *
	     * @param {Number|Object} top The top pixel position, or an object with top, left, bottom, right properties. If an object is passed,
	     * instead of having bottom and right, it can have width and height.
	     *
	     * @param {Number} right The right pixel position
	     * @param {Number} bottom The bottom pixel position
	     * @param {Number} left The left pixel position
	     *
	     * @return {Region} this
	     */
	    init: function(top, right, bottom, left){

	        if (isObject(top)){
	            copyList(top, this, ['top','right','bottom','left'])

	            if (top.bottom == null && top.height != null){
	                this.bottom = this.top + top.height
	            }
	            if (top.right == null && top.width != null){
	                this.right = this.left + top.width
	            }

	            if (top.emitChangeEvents){
	                this.emitChangeEvents = top.emitChangeEvents
	            }
	        } else {
	            this.top    = top
	            this.right  = right
	            this.bottom = bottom
	            this.left   = left
	        }

	        this[0] = this.left
	        this[1] = this.top

	        REGION.validate(this)
	    },

	    __IS_REGION: true

	    /**
	     * @property {Number} top
	     */

	    /**
	     * @property {Number} right
	     */

	    /**
	     * @property {Number} bottom
	     */

	    /**
	     * @property {Number} left
	     */

	    /**
	     * @property {Number} [0] the top property
	     */

	    /**
	     * @property {Number} [1] the left property
	     */

	    /**
	     * @method getIntersection
	     * Returns a region that is the intersection of this region and the given region
	     * @param  {Region} region The region to intersect with
	     * @return {Region}        The intersection region
	     */

	    /**
	     * @method getUnion
	     * Returns a region that is the union of this region with the given region
	     * @param  {Region} region  The region to make union with
	     * @return {Region}        The union region. The smallest region that contains both this and the given region.
	     */

	})

	// require('./align')(REGION)

	module.exports = REGION

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var F      = __webpack_require__(19)
	var copy   = __webpack_require__(7).copy
	var Region = __webpack_require__(16)

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

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// TinyColor v1.0.0
	// https://github.com/bgrins/TinyColor
	// Brian Grinstead, MIT License

	(function() {

	var trimLeft = /^[\s,#]+/,
	    trimRight = /\s+$/,
	    tinyCounter = 0,
	    math = Math,
	    mathRound = math.round,
	    mathMin = math.min,
	    mathMax = math.max,
	    mathRandom = math.random;

	var tinycolor = function tinycolor (color, opts) {

	    color = (color) ? color : '';
	    opts = opts || { };

	    // If input is already a tinycolor, return itself
	    if (color instanceof tinycolor) {
	       return color;
	    }
	    // If we are called as a function, call using new instead
	    if (!(this instanceof tinycolor)) {
	        return new tinycolor(color, opts);
	    }

	    var rgb = inputToRGB(color);
	    this._r = rgb.r,
	    this._g = rgb.g,
	    this._b = rgb.b,
	    this._a = rgb.a,
	    this._roundA = mathRound(100*this._a) / 100,
	    this._format = opts.format || rgb.format;
	    this._gradientType = opts.gradientType;

	    // Don't let the range of [0,255] come back in [0,1].
	    // Potentially lose a little bit of precision here, but will fix issues where
	    // .5 gets interpreted as half of the total, instead of half of 1
	    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
	    if (this._r < 1) { this._r = mathRound(this._r); }
	    if (this._g < 1) { this._g = mathRound(this._g); }
	    if (this._b < 1) { this._b = mathRound(this._b); }

	    this._ok = rgb.ok;
	    this._tc_id = tinyCounter++;
	};

	tinycolor.prototype = {
	    isDark: function() {
	        return this.getBrightness() < 128;
	    },
	    isLight: function() {
	        return !this.isDark();
	    },
	    isValid: function() {
	        return this._ok;
	    },
	    getFormat: function() {
	        return this._format;
	    },
	    getAlpha: function() {
	        return this._a;
	    },
	    getBrightness: function() {
	        var rgb = this.toRgb();
	        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	    },
	    setAlpha: function(value) {
	        this._a = boundAlpha(value);
	        this._roundA = mathRound(100*this._a) / 100;
	        return this;
	    },
	    toHsv: function() {
	        var hsv = rgbToHsv(this._r, this._g, this._b);
	        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
	    },
	    toHsvString: function() {
	        var hsv = rgbToHsv(this._r, this._g, this._b);
	        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
	        return (this._a == 1) ?
	          "hsv("  + h + ", " + s + "%, " + v + "%)" :
	          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
	    },
	    toHsl: function() {
	        var hsl = rgbToHsl(this._r, this._g, this._b);
	        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
	    },
	    toHslString: function() {
	        var hsl = rgbToHsl(this._r, this._g, this._b);
	        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
	        return (this._a == 1) ?
	          "hsl("  + h + ", " + s + "%, " + l + "%)" :
	          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
	    },
	    toHex: function(allow3Char) {
	        return rgbToHex(this._r, this._g, this._b, allow3Char);
	    },
	    toHexString: function(allow3Char) {
	        return '#' + this.toHex(allow3Char);
	    },
	    toHex8: function() {
	        return rgbaToHex(this._r, this._g, this._b, this._a);
	    },
	    toHex8String: function() {
	        return '#' + this.toHex8();
	    },
	    toRgb: function() {
	        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
	    },
	    toRgbString: function() {
	        return (this._a == 1) ?
	          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
	          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
	    },
	    toPercentageRgb: function() {
	        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
	    },
	    toPercentageRgbString: function() {
	        return (this._a == 1) ?
	          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
	          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
	    },
	    toName: function() {
	        if (this._a === 0) {
	            return "transparent";
	        }

	        if (this._a < 1) {
	            return false;
	        }

	        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
	    },
	    toFilter: function(secondColor) {
	        var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
	        var secondHex8String = hex8String;
	        var gradientType = this._gradientType ? "GradientType = 1, " : "";

	        if (secondColor) {
	            var s = tinycolor(secondColor);
	            secondHex8String = s.toHex8String();
	        }

	        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
	    },
	    toString: function(format) {
	        var formatSet = !!format;
	        format = format || this._format;

	        var formattedString = false;
	        var hasAlpha = this._a < 1 && this._a >= 0;
	        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

	        if (needsAlphaFormat) {
	            // Special case for "transparent", all other non-alpha formats
	            // will return rgba when there is transparency.
	            if (format === "name" && this._a === 0) {
	                return this.toName();
	            }
	            return this.toRgbString();
	        }
	        if (format === "rgb") {
	            formattedString = this.toRgbString();
	        }
	        if (format === "prgb") {
	            formattedString = this.toPercentageRgbString();
	        }
	        if (format === "hex" || format === "hex6") {
	            formattedString = this.toHexString();
	        }
	        if (format === "hex3") {
	            formattedString = this.toHexString(true);
	        }
	        if (format === "hex8") {
	            formattedString = this.toHex8String();
	        }
	        if (format === "name") {
	            formattedString = this.toName();
	        }
	        if (format === "hsl") {
	            formattedString = this.toHslString();
	        }
	        if (format === "hsv") {
	            formattedString = this.toHsvString();
	        }

	        return formattedString || this.toHexString();
	    },

	    _applyModification: function(fn, args) {
	        var color = fn.apply(null, [this].concat([].slice.call(args)));
	        this._r = color._r;
	        this._g = color._g;
	        this._b = color._b;
	        this.setAlpha(color._a);
	        return this;
	    },
	    lighten: function() {
	        return this._applyModification(lighten, arguments);
	    },
	    brighten: function() {
	        return this._applyModification(brighten, arguments);
	    },
	    darken: function() {
	        return this._applyModification(darken, arguments);
	    },
	    desaturate: function() {
	        return this._applyModification(desaturate, arguments);
	    },
	    saturate: function() {
	        return this._applyModification(saturate, arguments);
	    },
	    greyscale: function() {
	        return this._applyModification(greyscale, arguments);
	    },
	    spin: function() {
	        return this._applyModification(spin, arguments);
	    },

	    _applyCombination: function(fn, args) {
	        return fn.apply(null, [this].concat([].slice.call(args)));
	    },
	    analogous: function() {
	        return this._applyCombination(analogous, arguments);
	    },
	    complement: function() {
	        return this._applyCombination(complement, arguments);
	    },
	    monochromatic: function() {
	        return this._applyCombination(monochromatic, arguments);
	    },
	    splitcomplement: function() {
	        return this._applyCombination(splitcomplement, arguments);
	    },
	    triad: function() {
	        return this._applyCombination(triad, arguments);
	    },
	    tetrad: function() {
	        return this._applyCombination(tetrad, arguments);
	    }
	};

	// If input is an object, force 1 into "1.0" to handle ratios properly
	// String input requires "1.0" as input, so 1 will be treated as 1
	tinycolor.fromRatio = function(color, opts) {
	    if (typeof color == "object") {
	        var newColor = {};
	        for (var i in color) {
	            if (color.hasOwnProperty(i)) {
	                if (i === "a") {
	                    newColor[i] = color[i];
	                }
	                else {
	                    newColor[i] = convertToPercentage(color[i]);
	                }
	            }
	        }
	        color = newColor;
	    }

	    return tinycolor(color, opts);
	};

	// Given a string or object, convert that input to RGB
	// Possible string inputs:
	//
	//     "red"
	//     "#f00" or "f00"
	//     "#ff0000" or "ff0000"
	//     "#ff000000" or "ff000000"
	//     "rgb 255 0 0" or "rgb (255, 0, 0)"
	//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
	//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
	//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
	//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
	//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
	//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
	//
	function inputToRGB(color) {

	    var rgb = { r: 0, g: 0, b: 0 };
	    var a = 1;
	    var ok = false;
	    var format = false;

	    if (typeof color == "string") {
	        color = stringInputToObject(color);
	    }

	    if (typeof color == "object") {
	        if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
	            rgb = rgbToRgb(color.r, color.g, color.b);
	            ok = true;
	            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
	        }
	        else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
	            color.s = convertToPercentage(color.s);
	            color.v = convertToPercentage(color.v);
	            rgb = hsvToRgb(color.h, color.s, color.v);
	            ok = true;
	            format = "hsv";
	        }
	        else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
	            color.s = convertToPercentage(color.s);
	            color.l = convertToPercentage(color.l);
	            rgb = hslToRgb(color.h, color.s, color.l);
	            ok = true;
	            format = "hsl";
	        }

	        if (color.hasOwnProperty("a")) {
	            a = color.a;
	        }
	    }

	    a = boundAlpha(a);

	    return {
	        ok: ok,
	        format: color.format || format,
	        r: mathMin(255, mathMax(rgb.r, 0)),
	        g: mathMin(255, mathMax(rgb.g, 0)),
	        b: mathMin(255, mathMax(rgb.b, 0)),
	        a: a
	    };
	}


	// Conversion Functions
	// --------------------

	// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
	// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

	// `rgbToRgb`
	// Handle bounds / percentage checking to conform to CSS color spec
	// <http://www.w3.org/TR/css3-color/>
	// *Assumes:* r, g, b in [0, 255] or [0, 1]
	// *Returns:* { r, g, b } in [0, 255]
	function rgbToRgb(r, g, b){
	    return {
	        r: bound01(r, 255) * 255,
	        g: bound01(g, 255) * 255,
	        b: bound01(b, 255) * 255
	    };
	}

	// `rgbToHsl`
	// Converts an RGB color value to HSL.
	// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
	// *Returns:* { h, s, l } in [0,1]
	function rgbToHsl(r, g, b) {

	    r = bound01(r, 255);
	    g = bound01(g, 255);
	    b = bound01(b, 255);

	    var max = mathMax(r, g, b), min = mathMin(r, g, b);
	    var h, s, l = (max + min) / 2;

	    if(max == min) {
	        h = s = 0; // achromatic
	    }
	    else {
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }

	        h /= 6;
	    }

	    return { h: h, s: s, l: l };
	}

	// `hslToRgb`
	// Converts an HSL color value to RGB.
	// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
	// *Returns:* { r, g, b } in the set [0, 255]
	function hslToRgb(h, s, l) {
	    var r, g, b;

	    h = bound01(h, 360);
	    s = bound01(s, 100);
	    l = bound01(l, 100);

	    function hue2rgb(p, q, t) {
	        if(t < 0) t += 1;
	        if(t > 1) t -= 1;
	        if(t < 1/6) return p + (q - p) * 6 * t;
	        if(t < 1/2) return q;
	        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	        return p;
	    }

	    if(s === 0) {
	        r = g = b = l; // achromatic
	    }
	    else {
	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1/3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1/3);
	    }

	    return { r: r * 255, g: g * 255, b: b * 255 };
	}

	// `rgbToHsv`
	// Converts an RGB color value to HSV
	// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
	// *Returns:* { h, s, v } in [0,1]
	function rgbToHsv(r, g, b) {

	    r = bound01(r, 255);
	    g = bound01(g, 255);
	    b = bound01(b, 255);

	    var max = mathMax(r, g, b), min = mathMin(r, g, b);
	    var h, s, v = max;

	    var d = max - min;
	    s = max === 0 ? 0 : d / max;

	    if(max == min) {
	        h = 0; // achromatic
	    }
	    else {
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }
	    return { h: h, s: s, v: v };
	}

	// `hsvToRgb`
	// Converts an HSV color value to RGB.
	// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
	// *Returns:* { r, g, b } in the set [0, 255]
	 function hsvToRgb(h, s, v) {

	    h = bound01(h, 360) * 6;
	    s = bound01(s, 100);
	    v = bound01(v, 100);

	    var i = math.floor(h),
	        f = h - i,
	        p = v * (1 - s),
	        q = v * (1 - f * s),
	        t = v * (1 - (1 - f) * s),
	        mod = i % 6,
	        r = [v, q, p, p, t, v][mod],
	        g = [t, v, v, q, p, p][mod],
	        b = [p, p, t, v, v, q][mod];

	    return { r: r * 255, g: g * 255, b: b * 255 };
	}

	// `rgbToHex`
	// Converts an RGB color to hex
	// Assumes r, g, and b are contained in the set [0, 255]
	// Returns a 3 or 6 character hex
	function rgbToHex(r, g, b, allow3Char) {

	    var hex = [
	        pad2(mathRound(r).toString(16)),
	        pad2(mathRound(g).toString(16)),
	        pad2(mathRound(b).toString(16))
	    ];

	    // Return a 3 character hex if possible
	    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
	        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
	    }

	    return hex.join("");
	}
	    // `rgbaToHex`
	    // Converts an RGBA color plus alpha transparency to hex
	    // Assumes r, g, b and a are contained in the set [0, 255]
	    // Returns an 8 character hex
	    function rgbaToHex(r, g, b, a) {

	        var hex = [
	            pad2(convertDecimalToHex(a)),
	            pad2(mathRound(r).toString(16)),
	            pad2(mathRound(g).toString(16)),
	            pad2(mathRound(b).toString(16))
	        ];

	        return hex.join("");
	    }

	// `equals`
	// Can be called with any tinycolor input
	tinycolor.equals = function (color1, color2) {
	    if (!color1 || !color2) { return false; }
	    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
	};
	tinycolor.random = function() {
	    return tinycolor.fromRatio({
	        r: mathRandom(),
	        g: mathRandom(),
	        b: mathRandom()
	    });
	};


	// Modification Functions
	// ----------------------
	// Thanks to less.js for some of the basics here
	// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

	function desaturate(color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.s -= amount / 100;
	    hsl.s = clamp01(hsl.s);
	    return tinycolor(hsl);
	}

	function saturate(color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.s += amount / 100;
	    hsl.s = clamp01(hsl.s);
	    return tinycolor(hsl);
	}

	function greyscale(color) {
	    return tinycolor(color).desaturate(100);
	}

	function lighten (color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.l += amount / 100;
	    hsl.l = clamp01(hsl.l);
	    return tinycolor(hsl);
	}

	function brighten(color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var rgb = tinycolor(color).toRgb();
	    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
	    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
	    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
	    return tinycolor(rgb);
	}

	function darken (color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.l -= amount / 100;
	    hsl.l = clamp01(hsl.l);
	    return tinycolor(hsl);
	}

	// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
	// Values outside of this range will be wrapped into this range.
	function spin(color, amount) {
	    var hsl = tinycolor(color).toHsl();
	    var hue = (mathRound(hsl.h) + amount) % 360;
	    hsl.h = hue < 0 ? 360 + hue : hue;
	    return tinycolor(hsl);
	}

	// Combination Functions
	// ---------------------
	// Thanks to jQuery xColor for some of the ideas behind these
	// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

	function complement(color) {
	    var hsl = tinycolor(color).toHsl();
	    hsl.h = (hsl.h + 180) % 360;
	    return tinycolor(hsl);
	}

	function triad(color) {
	    var hsl = tinycolor(color).toHsl();
	    var h = hsl.h;
	    return [
	        tinycolor(color),
	        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
	        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
	    ];
	}

	function tetrad(color) {
	    var hsl = tinycolor(color).toHsl();
	    var h = hsl.h;
	    return [
	        tinycolor(color),
	        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
	        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
	        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
	    ];
	}

	function splitcomplement(color) {
	    var hsl = tinycolor(color).toHsl();
	    var h = hsl.h;
	    return [
	        tinycolor(color),
	        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
	        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
	    ];
	}

	function analogous(color, results, slices) {
	    results = results || 6;
	    slices = slices || 30;

	    var hsl = tinycolor(color).toHsl();
	    var part = 360 / slices;
	    var ret = [tinycolor(color)];

	    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
	        hsl.h = (hsl.h + part) % 360;
	        ret.push(tinycolor(hsl));
	    }
	    return ret;
	}

	function monochromatic(color, results) {
	    results = results || 6;
	    var hsv = tinycolor(color).toHsv();
	    var h = hsv.h, s = hsv.s, v = hsv.v;
	    var ret = [];
	    var modification = 1 / results;

	    while (results--) {
	        ret.push(tinycolor({ h: h, s: s, v: v}));
	        v = (v + modification) % 1;
	    }

	    return ret;
	}

	// Utility Functions
	// ---------------------

	tinycolor.mix = function(color1, color2, amount) {
	    amount = (amount === 0) ? 0 : (amount || 50);

	    var rgb1 = tinycolor(color1).toRgb();
	    var rgb2 = tinycolor(color2).toRgb();

	    var p = amount / 100;
	    var w = p * 2 - 1;
	    var a = rgb2.a - rgb1.a;

	    var w1;

	    if (w * a == -1) {
	        w1 = w;
	    } else {
	        w1 = (w + a) / (1 + w * a);
	    }

	    w1 = (w1 + 1) / 2;

	    var w2 = 1 - w1;

	    var rgba = {
	        r: rgb2.r * w1 + rgb1.r * w2,
	        g: rgb2.g * w1 + rgb1.g * w2,
	        b: rgb2.b * w1 + rgb1.b * w2,
	        a: rgb2.a * p  + rgb1.a * (1 - p)
	    };

	    return tinycolor(rgba);
	};


	// Readability Functions
	// ---------------------
	// <http://www.w3.org/TR/AERT#color-contrast>

	// `readability`
	// Analyze the 2 colors and returns an object with the following properties:
	//    `brightness`: difference in brightness between the two colors
	//    `color`: difference in color/hue between the two colors
	tinycolor.readability = function(color1, color2) {
	    var c1 = tinycolor(color1);
	    var c2 = tinycolor(color2);
	    var rgb1 = c1.toRgb();
	    var rgb2 = c2.toRgb();
	    var brightnessA = c1.getBrightness();
	    var brightnessB = c2.getBrightness();
	    var colorDiff = (
	        Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) +
	        Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) +
	        Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b)
	    );

	    return {
	        brightness: Math.abs(brightnessA - brightnessB),
	        color: colorDiff
	    };
	};

	// `readable`
	// http://www.w3.org/TR/AERT#color-contrast
	// Ensure that foreground and background color combinations provide sufficient contrast.
	// *Example*
	//    tinycolor.isReadable("#000", "#111") => false
	tinycolor.isReadable = function(color1, color2) {
	    var readability = tinycolor.readability(color1, color2);
	    return readability.brightness > 125 && readability.color > 500;
	};

	// `mostReadable`
	// Given a base color and a list of possible foreground or background
	// colors for that base, returns the most readable color.
	// *Example*
	//    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
	tinycolor.mostReadable = function(baseColor, colorList) {
	    var bestColor = null;
	    var bestScore = 0;
	    var bestIsReadable = false;
	    for (var i=0; i < colorList.length; i++) {

	        // We normalize both around the "acceptable" breaking point,
	        // but rank brightness constrast higher than hue.

	        var readability = tinycolor.readability(baseColor, colorList[i]);
	        var readable = readability.brightness > 125 && readability.color > 500;
	        var score = 3 * (readability.brightness / 125) + (readability.color / 500);

	        if ((readable && ! bestIsReadable) ||
	            (readable && bestIsReadable && score > bestScore) ||
	            ((! readable) && (! bestIsReadable) && score > bestScore)) {
	            bestIsReadable = readable;
	            bestScore = score;
	            bestColor = tinycolor(colorList[i]);
	        }
	    }
	    return bestColor;
	};


	// Big List of Colors
	// ------------------
	// <http://www.w3.org/TR/css3-color/#svg-color>
	var names = tinycolor.names = {
	    aliceblue: "f0f8ff",
	    antiquewhite: "faebd7",
	    aqua: "0ff",
	    aquamarine: "7fffd4",
	    azure: "f0ffff",
	    beige: "f5f5dc",
	    bisque: "ffe4c4",
	    black: "000",
	    blanchedalmond: "ffebcd",
	    blue: "00f",
	    blueviolet: "8a2be2",
	    brown: "a52a2a",
	    burlywood: "deb887",
	    burntsienna: "ea7e5d",
	    cadetblue: "5f9ea0",
	    chartreuse: "7fff00",
	    chocolate: "d2691e",
	    coral: "ff7f50",
	    cornflowerblue: "6495ed",
	    cornsilk: "fff8dc",
	    crimson: "dc143c",
	    cyan: "0ff",
	    darkblue: "00008b",
	    darkcyan: "008b8b",
	    darkgoldenrod: "b8860b",
	    darkgray: "a9a9a9",
	    darkgreen: "006400",
	    darkgrey: "a9a9a9",
	    darkkhaki: "bdb76b",
	    darkmagenta: "8b008b",
	    darkolivegreen: "556b2f",
	    darkorange: "ff8c00",
	    darkorchid: "9932cc",
	    darkred: "8b0000",
	    darksalmon: "e9967a",
	    darkseagreen: "8fbc8f",
	    darkslateblue: "483d8b",
	    darkslategray: "2f4f4f",
	    darkslategrey: "2f4f4f",
	    darkturquoise: "00ced1",
	    darkviolet: "9400d3",
	    deeppink: "ff1493",
	    deepskyblue: "00bfff",
	    dimgray: "696969",
	    dimgrey: "696969",
	    dodgerblue: "1e90ff",
	    firebrick: "b22222",
	    floralwhite: "fffaf0",
	    forestgreen: "228b22",
	    fuchsia: "f0f",
	    gainsboro: "dcdcdc",
	    ghostwhite: "f8f8ff",
	    gold: "ffd700",
	    goldenrod: "daa520",
	    gray: "808080",
	    green: "008000",
	    greenyellow: "adff2f",
	    grey: "808080",
	    honeydew: "f0fff0",
	    hotpink: "ff69b4",
	    indianred: "cd5c5c",
	    indigo: "4b0082",
	    ivory: "fffff0",
	    khaki: "f0e68c",
	    lavender: "e6e6fa",
	    lavenderblush: "fff0f5",
	    lawngreen: "7cfc00",
	    lemonchiffon: "fffacd",
	    lightblue: "add8e6",
	    lightcoral: "f08080",
	    lightcyan: "e0ffff",
	    lightgoldenrodyellow: "fafad2",
	    lightgray: "d3d3d3",
	    lightgreen: "90ee90",
	    lightgrey: "d3d3d3",
	    lightpink: "ffb6c1",
	    lightsalmon: "ffa07a",
	    lightseagreen: "20b2aa",
	    lightskyblue: "87cefa",
	    lightslategray: "789",
	    lightslategrey: "789",
	    lightsteelblue: "b0c4de",
	    lightyellow: "ffffe0",
	    lime: "0f0",
	    limegreen: "32cd32",
	    linen: "faf0e6",
	    magenta: "f0f",
	    maroon: "800000",
	    mediumaquamarine: "66cdaa",
	    mediumblue: "0000cd",
	    mediumorchid: "ba55d3",
	    mediumpurple: "9370db",
	    mediumseagreen: "3cb371",
	    mediumslateblue: "7b68ee",
	    mediumspringgreen: "00fa9a",
	    mediumturquoise: "48d1cc",
	    mediumvioletred: "c71585",
	    midnightblue: "191970",
	    mintcream: "f5fffa",
	    mistyrose: "ffe4e1",
	    moccasin: "ffe4b5",
	    navajowhite: "ffdead",
	    navy: "000080",
	    oldlace: "fdf5e6",
	    olive: "808000",
	    olivedrab: "6b8e23",
	    orange: "ffa500",
	    orangered: "ff4500",
	    orchid: "da70d6",
	    palegoldenrod: "eee8aa",
	    palegreen: "98fb98",
	    paleturquoise: "afeeee",
	    palevioletred: "db7093",
	    papayawhip: "ffefd5",
	    peachpuff: "ffdab9",
	    peru: "cd853f",
	    pink: "ffc0cb",
	    plum: "dda0dd",
	    powderblue: "b0e0e6",
	    purple: "800080",
	    red: "f00",
	    rosybrown: "bc8f8f",
	    royalblue: "4169e1",
	    saddlebrown: "8b4513",
	    salmon: "fa8072",
	    sandybrown: "f4a460",
	    seagreen: "2e8b57",
	    seashell: "fff5ee",
	    sienna: "a0522d",
	    silver: "c0c0c0",
	    skyblue: "87ceeb",
	    slateblue: "6a5acd",
	    slategray: "708090",
	    slategrey: "708090",
	    snow: "fffafa",
	    springgreen: "00ff7f",
	    steelblue: "4682b4",
	    tan: "d2b48c",
	    teal: "008080",
	    thistle: "d8bfd8",
	    tomato: "ff6347",
	    turquoise: "40e0d0",
	    violet: "ee82ee",
	    wheat: "f5deb3",
	    white: "fff",
	    whitesmoke: "f5f5f5",
	    yellow: "ff0",
	    yellowgreen: "9acd32"
	};

	// Make it easy to access colors via `hexNames[hex]`
	var hexNames = tinycolor.hexNames = flip(names);


	// Utilities
	// ---------

	// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
	function flip(o) {
	    var flipped = { };
	    for (var i in o) {
	        if (o.hasOwnProperty(i)) {
	            flipped[o[i]] = i;
	        }
	    }
	    return flipped;
	}

	// Return a valid alpha value [0,1] with all invalid values being set to 1
	function boundAlpha(a) {
	    a = parseFloat(a);

	    if (isNaN(a) || a < 0 || a > 1) {
	        a = 1;
	    }

	    return a;
	}

	// Take input from [0, n] and return it as [0, 1]
	function bound01(n, max) {
	    if (isOnePointZero(n)) { n = "100%"; }

	    var processPercent = isPercentage(n);
	    n = mathMin(max, mathMax(0, parseFloat(n)));

	    // Automatically convert percentage into number
	    if (processPercent) {
	        n = parseInt(n * max, 10) / 100;
	    }

	    // Handle floating point rounding errors
	    if ((math.abs(n - max) < 0.000001)) {
	        return 1;
	    }

	    // Convert into [0, 1] range if it isn't already
	    return (n % max) / parseFloat(max);
	}

	// Force a number between 0 and 1
	function clamp01(val) {
	    return mathMin(1, mathMax(0, val));
	}

	// Parse a base-16 hex value into a base-10 integer
	function parseIntFromHex(val) {
	    return parseInt(val, 16);
	}

	// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
	// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
	function isOnePointZero(n) {
	    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
	}

	// Check to see if string passed in is a percentage
	function isPercentage(n) {
	    return typeof n === "string" && n.indexOf('%') != -1;
	}

	// Force a hex value to have 2 characters
	function pad2(c) {
	    return c.length == 1 ? '0' + c : '' + c;
	}

	// Replace a decimal with it's percentage value
	function convertToPercentage(n) {
	    if (n <= 1) {
	        n = (n * 100) + "%";
	    }

	    return n;
	}

	// Converts a decimal to a hex value
	function convertDecimalToHex(d) {
	    return Math.round(parseFloat(d) * 255).toString(16);
	}
	// Converts a hex value to a decimal
	function convertHexToDecimal(h) {
	    return (parseIntFromHex(h) / 255);
	}

	var matchers = (function() {

	    // <http://www.w3.org/TR/css3-values/#integers>
	    var CSS_INTEGER = "[-\\+]?\\d+%?";

	    // <http://www.w3.org/TR/css3-values/#number-value>
	    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

	    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
	    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

	    // Actual matching.
	    // Parentheses and commas are optional, but not required.
	    // Whitespace can take the place of commas or opening paren
	    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
	    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

	    return {
	        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
	        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
	        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
	        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
	        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
	        hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	        hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	        hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
	    };
	})();

	// `stringInputToObject`
	// Permissive string parsing.  Take in a number of formats, and output an object
	// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
	function stringInputToObject(color) {

	    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
	    var named = false;
	    if (names[color]) {
	        color = names[color];
	        named = true;
	    }
	    else if (color == 'transparent') {
	        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
	    }

	    // Try to match string input using regular expressions.
	    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
	    // Just return an object and let the conversion functions handle that.
	    // This way the result will be the same whether the tinycolor is initialized with string or object.
	    var match;
	    if ((match = matchers.rgb.exec(color))) {
	        return { r: match[1], g: match[2], b: match[3] };
	    }
	    if ((match = matchers.rgba.exec(color))) {
	        return { r: match[1], g: match[2], b: match[3], a: match[4] };
	    }
	    if ((match = matchers.hsl.exec(color))) {
	        return { h: match[1], s: match[2], l: match[3] };
	    }
	    if ((match = matchers.hsla.exec(color))) {
	        return { h: match[1], s: match[2], l: match[3], a: match[4] };
	    }
	    if ((match = matchers.hsv.exec(color))) {
	        return { h: match[1], s: match[2], v: match[3] };
	    }
	    if ((match = matchers.hex8.exec(color))) {
	        return {
	            a: convertHexToDecimal(match[1]),
	            r: parseIntFromHex(match[2]),
	            g: parseIntFromHex(match[3]),
	            b: parseIntFromHex(match[4]),
	            format: named ? "name" : "hex8"
	        };
	    }
	    if ((match = matchers.hex6.exec(color))) {
	        return {
	            r: parseIntFromHex(match[1]),
	            g: parseIntFromHex(match[2]),
	            b: parseIntFromHex(match[3]),
	            format: named ? "name" : "hex"
	        };
	    }
	    if ((match = matchers.hex3.exec(color))) {
	        return {
	            r: parseIntFromHex(match[1] + '' + match[1]),
	            g: parseIntFromHex(match[2] + '' + match[2]),
	            b: parseIntFromHex(match[3] + '' + match[3]),
	            format: named ? "name" : "hex"
	        };
	    }

	    return false;
	}

	// Node: Export function
	if (typeof module !== "undefined" && module.exports) {
	    module.exports = tinycolor;
	}
	// AMD/requirejs: Define the module
	else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {return tinycolor;}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	// Browser: Expose to window
	else {
	    window.tinycolor = tinycolor;
	}

	})();


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	    var setImmediate = function(fn){
	        setTimeout(fn, 0)
	    }
	    var clearImmediate = clearTimeout
	    /**
	     * Utility methods for working with functions.
	     * These methods augment the Function prototype.
	     *
	     * Using {@link #before}
	     *
	     *      function log(m){
	     *          console.log(m)
	     *      }
	     *
	     *      var doLog = function (m){
	     *          console.log('LOG ')
	     *      }.before(log)
	     *
	     *      doLog('test')
	     *      //will log
	     *      //"LOG "
	     *      //and then
	     *      //"test"
	     *
	     *
	     *
	     * Using {@link #bindArgs}:
	     *
	     *      //returns the sum of all arguments
	     *      function add(){
	     *          var sum = 0
	     *          [].from(arguments).forEach(function(n){
	     *              sum += n
	     *          })
	     *
	     *          return sum
	     *      }
	     *
	     *      var add1 = add.bindArgs(1)
	     *
	     *      add1(2, 3) == 6
	     *
	     * Using {@link #lockArgs}:
	     *
	     *      function add(){
	     *          var sum = 0
	     *          [].from(arguments).forEach(function(n){
	     *              sum += n
	     *          })
	     *
	     *          return sum
	     *      }
	     *
	     *      var add1_2   = add.lockArgs(1,2)
	     *      var add1_2_3 = add.lockArgs(1,2,3)
	     *
	     *      add1_2(3,4)  == 3 //args are locked to only be 1 and 2
	     *      add1_2_3(6)  == 6 //args are locked to only be 1, 2 and 3
	     *
	     *
	     *
	     * Using {@link #compose}:
	     *
	     *      function multiply(a,b){
	     *          return a* b
	     *      }
	     *
	     *      var multiply2 = multiply.curry()(2)
	     *
	     *      Function.compose(multiply2( add(5,6) )) == multiply2( add(5,6) )
	     *
	     *
	     * @class Function
	     */

	    var SLICE = Array.prototype.slice

	    var curry = __webpack_require__(26),

	        findFn = function(fn, target, onFound){
	            // if (typeof target.find == 'function'){
	            //     return target.find(fn)
	            // }

	            onFound = typeof onFound == 'function'?
	                        onFound:
	                        function(found, key, target){
	                            return found
	                        }

	            if (Array.isArray(target)){
	                var i   = 0
	                var len = target.length
	                var it

	                for(; i < len; i++){
	                    it = target[i]
	                    if (fn(it, i, target)){
	                        return onFound(it, i, target)
	                    }
	                }

	                return
	            }

	            if (typeof target == 'object'){
	                var keys = Object.keys(target)
	                var i = 0
	                var len = keys.length
	                var k
	                var it

	                for( ; i < len; i++){
	                    k  = keys[i]
	                    it = target[k]

	                    if (fn(it, k, target)){
	                        return onFound(it, k, target)
	                    }
	                }
	            }
	        },

	        find = curry(findFn, 2),

	        findIndex = curry(function(fn, target){
	            return findFn(fn, target, function(it, i){
	                return i
	            })
	        }),

	        bindFunctionsOf = function(obj) {
	            Object.keys(obj).forEach(function(k){
	                if (typeof obj[k] == 'function'){
	                    obj[k] = obj[k].bind(obj)
	                }
	            })

	            return obj
	        },

	        /*
	         * @param {Function...} an enumeration of functions, each consuming the result of the following function.
	         *
	         * For example: compose(c, b, a)(1,4) == c(b(a(1,4)))
	         *
	         * @return the result of the first function in the enumeration
	         */
	        compose = __webpack_require__(27),

	        chain = __webpack_require__(28),

	        once = __webpack_require__(29),

	        bindArgsArray = __webpack_require__(30),

	        bindArgs = __webpack_require__(31),

	        lockArgsArray = __webpack_require__(32),

	        lockArgs = __webpack_require__(33),

	        skipArgs = function(fn, count){
	            return function(){
	                var args = SLICE.call(arguments, count || 0)

	                return fn.apply(this, args)
	            }
	        },

	        intercept = function(interceptedFn, interceptingFn, withStopArg){

	            return function(){
	                var args    = [].from(arguments),
	                    stopArg = { stop: false }

	                if (withStopArg){
	                    args.push(stopArg)
	                }

	                var result = interceptingFn.apply(this, args)

	                if (withStopArg){
	                    if (stopArg.stop === true){
	                        return result
	                    }

	                } else {
	                    if (result === false){
	                        return result
	                    }
	                }

	                //the interception was not stopped
	                return interceptedFn.apply(this, arguments)
	            }

	        },

	        delay = function(fn, delay, scope){

	            var delayIsNumber = delay * 1 == delay

	            if (arguments.length == 2 && !delayIsNumber){
	                scope = delay
	                delay = 0
	            } else {
	                if (!delayIsNumber){
	                    delay = 0
	                }
	            }

	            return function(){
	                var self = scope || this,
	                    args = arguments

	                if (delay < 0){
	                    fn.apply(self, args)
	                    return
	                }

	                if (delay || !setImmediate){
	                    setTimeout(function(){
	                        fn.apply(self, args)
	                    }, delay)

	                } else {
	                    setImmediate(function(){
	                        fn.apply(self, args)
	                    })
	                }
	            }
	        },

	        defer = function(fn, scope){
	            return delay(fn, 0, scope)
	        },

	        buffer = function(fn, delay, scope){

	            var timeoutId = -1

	            return function(){

	                var self = scope || this,
	                    args = arguments

	                if (delay < 0){
	                    fn.apply(self, args)
	                    return
	                }

	                var withTimeout = delay || !setImmediate,
	                    clearFn = withTimeout?
	                                clearTimeout:
	                                clearImmediate,
	                    setFn   = withTimeout?
	                                setTimeout:
	                                setImmediate

	                if (timeoutId !== -1){
	                    clearFn(timeoutId)
	                }

	                timeoutId = setFn(function(){
	                    fn.apply(self, args)
	                    self = null
	                }, delay)

	            }

	        },

	        throttle = function(fn, delay, scope) {
	            var timeoutId = -1,
	                self,
	                args

	            return function () {

	                self = scope || this
	                args = arguments

	                if (timeoutId !== -1) {
	                    //the function was called once again in the delay interval
	                } else {
	                    timeoutId = setTimeout(function () {
	                        fn.apply(self, args)

	                        self = null
	                        timeoutId = -1
	                    }, delay)
	                }

	            }

	        },

	        spread = function(fn, delay, scope){

	            var timeoutId       = -1
	            var callCount       = 0
	            var executeCount    = 0
	            var nextArgs        = {}
	            var increaseCounter = true
	            var resultingFnUnbound
	            var resultingFn

	            resultingFn = resultingFnUnbound = function(){

	                var args = arguments,
	                    self = scope || this

	                if (increaseCounter){
	                    nextArgs[callCount++] = {args: args, scope: self}
	                }

	                if (timeoutId !== -1){
	                    //the function was called once again in the delay interval
	                } else {
	                    timeoutId = setTimeout(function(){
	                        fn.apply(self, args)

	                        timeoutId = -1
	                        executeCount++

	                        if (callCount !== executeCount){
	                            resultingFn = bindArgsArray(resultingFnUnbound, nextArgs[executeCount].args).bind(nextArgs[executeCount].scope)
	                            delete nextArgs[executeCount]

	                            increaseCounter = false
	                            resultingFn.apply(self)
	                            increaseCounter = true
	                        } else {
	                            nextArgs = {}
	                        }
	                    }, delay)
	                }

	            }

	            return resultingFn
	        },

	        /*
	         * @param {Array} args the array for which to create a cache key
	         * @param {Number} [cacheParamNumber] the number of args to use for the cache key. Use this to limit the args that area actually used for the cache key
	         */
	        getCacheKey = function(args, cacheParamNumber){
	            if (cacheParamNumber == null){
	                cacheParamNumber = -1
	            }

	            var i        = 0,
	                len      = Math.min(args.length, cacheParamNumber),
	                cacheKey = [],
	                it

	            for ( ; i < len; i++){
	                it = args[i]

	                if (root.check.isPlainObject(it) || Array.isArray(it)){
	                    cacheKey.push(JSON.stringify(it))
	                } else {
	                    cacheKey.push(String(it))
	                }
	            }

	            return cacheKey.join(', ')
	        },

	        /*
	         * @param {Function} fn - the function to cache results for
	         * @param {Number} skipCacheParamNumber - the index of the boolean parameter that makes this function skip the caching and
	         * actually return computed results.
	         * @param {Function|String} cacheBucketMethod - a function or the name of a method on this object which makes caching distributed across multiple buckets.
	         * If given, cached results will be searched into the cache corresponding to this bucket. If no result found, return computed result.
	         *
	         * For example this param is very useful when a function from a prototype is cached,
	         * but we want to return the same cached results only for one object that inherits that proto, not for all objects. Thus, for example for Wes.Element,
	         * we use the 'getId' cacheBucketMethod to indicate cached results for one object only.
	         * @param {Function} [cacheKeyBuilder] A function to be used to compose the cache key
	         *
	         * @return {Function} a new function, which returns results from cache, if they are available, otherwise uses the given fn to compute the results.
	         * This returned function has a 'clearCache' function attached, which clears the caching. If a parameter ( a bucket id) is  provided,
	         * only clears the cache in the specified cache bucket.
	         */
	        cache = function(fn, config){
	            config = config || {}

	            var bucketCache = {},
	                cache       = {},
	                skipCacheParamNumber = config.skipCacheIndex,
	                cacheBucketMethod    = config.cacheBucket,
	                cacheKeyBuilder      = config.cacheKey,
	                cacheArgsLength      = skipCacheParamNumber == null?
	                                            fn.length:
	                                            skipCacheParamNumber,
	                cachingFn

	            cachingFn = function(){
	                var result,
	                    skipCache = skipCacheParamNumber != null?
	                                                arguments[skipCacheParamNumber] === true:
	                                                false,
	                    args = skipCache?
	                                    SLICE.call(arguments, 0, cacheArgsLength):
	                                    SLICE.call(arguments),

	                    cacheBucketId = cacheBucketMethod != null?
	                                        typeof cacheBucketMethod == 'function'?
	                                            cacheBucketMethod():
	                                            typeof this[cacheBucketMethod] == 'function'?
	                                                this[cacheBucketMethod]():
	                                                null
	                                        :
	                                        null,


	                    cacheObject = cacheBucketId?
	                                        bucketCache[cacheBucketId]:
	                                        cache,

	                    cacheKey = (cacheKeyBuilder || getCacheKey)(args, cacheArgsLength)

	                if (cacheBucketId && !cacheObject){
	                    cacheObject = bucketCache[cacheBucketId] = {}
	                }

	                if (skipCache || cacheObject[cacheKey] == null){
	                    cacheObject[cacheKey] = result = fn.apply(this, args)
	                } else {
	                    result = cacheObject[cacheKey]
	                }

	                return result
	            }

	            /*
	             * @param {String|Object|Number} [bucketId] the bucket for which to clear the cache. If none given, clears all the cache for this function.
	             */
	            cachingFn.clearCache = function(bucketId){
	                if (bucketId){
	                    delete bucketCache[String(bucketId)]
	                } else {
	                    cache = {}
	                    bucketCache = {}
	                }
	            }

	            /*
	             *
	             * @param {Array} cacheArgs The array of objects from which to create the cache key
	             * @param {Number} [cacheParamNumber] A limit for the cache args that are actually used to compute the cache key.
	             * @param {Function} [cacheKeyBuilder] The function to be used to compute the cache key from the given cacheArgs and cacheParamNumber
	             */
	            cachingFn.getCache = function(cacheArgs, cacheParamNumber, cacheKeyBuilder){
	                return cachingFn.getBucketCache(null, cacheArgs, cacheParamNumber, cacheKeyBuilder)
	            }

	            /*
	             *
	             * @param {String} bucketId The id of the cache bucket from which to retrieve the cached value
	             * @param {Array} cacheArgs The array of objects from which to create the cache key
	             * @param {Number} [cacheParamNumber] A limit for the cache args that are actually used to compute the cache key.
	             * @param {Function} [cacheKeyBuilder] The function to be used to compute the cache key from the given cacheArgs and cacheParamNumber
	             */
	            cachingFn.getBucketCache = function(bucketId, cacheArgs, cacheParamNumber, cacheKeyBuilder){
	                var cacheObject = cache,
	                    cacheKey = (cacheKeyBuilder || getCacheKey)(cacheArgs, cacheParamNumber)

	                if (bucketId){
	                    bucketId = String(bucketId);

	                    cacheObject = bucketCache[bucketId] = bucketCache[bucketId] || {}
	                }

	                return cacheObject[cacheKey]
	            }

	            /*
	             *
	             * @param {Object} value The value to set in the cache
	             * @param {Array} cacheArgs The array of objects from which to create the cache key
	             * @param {Number} [cacheParamNumber] A limit for the cache args that are actually used to compute the cache key.
	             * @param {Function} [cacheKeyBuilder] The function to be used to compute the cache key from the given cacheArgs and cacheParamNumber
	             */
	            cachingFn.setCache = function(value, cacheArgs, cacheParamNumber, cacheKeyBuilder){
	                return cachingFn.setBucketCache(null, value, cacheArgs, cacheParamNumber, cacheKeyBuilder)
	            }

	            /*
	             *
	             * @param {String} bucketId The id of the cache bucket for which to set the cache value
	             * @param {Object} value The value to set in the cache
	             * @param {Array} cacheArgs The array of objects from which to create the cache key
	             * @param {Number} [cacheParamNumber] A limit for the cache args that are actually used to compute the cache key.
	             * @param {Function} [cacheKeyBuilder] The function to be used to compute the cache key from the given cacheArgs and cacheParamNumber
	             */
	            cachingFn.setBucketCache = function(bucketId, value, cacheArgs, cacheParamNumber, cacheKeyBuilder){

	                var cacheObject = cache,
	                    cacheKey = (cacheKeyBuilder || getCacheKey)(cacheArgs, cacheParamNumber)

	                if (bucketId){
	                    bucketId = String(bucketId)

	                    cacheObject = bucketCache[bucketId] = bucketCache[bucketId] || {};
	                }

	                return cacheObject[cacheKey] = value
	            }

	            return cachingFn
	        }

	module.exports = {

	    map: __webpack_require__(34),

	    dot: __webpack_require__(35),

	    maxArgs: __webpack_require__(36),

	    /**
	     * @method compose
	     *
	     * Example:
	     *
	     *      zippy.Function.compose(c, b, a)
	     *
	     * See {@link Function#compose}
	     */
	    compose: compose,

	    /**
	     * See {@link Function#self}
	     */
	    self: function(fn){
	        return fn
	    },

	    /**
	     * See {@link Function#buffer}
	     */
	    buffer: buffer,

	    /**
	     * See {@link Function#delay}
	     */
	    delay: delay,

	    /**
	     * See {@link Function#defer}
	     * @param {Function} fn
	     * @param {Object} scope
	     */
	    defer:defer,

	    /**
	     * See {@link Function#skipArgs}
	     * @param {Function} fn
	     * @param {Number} [count=0] how many args to skip when calling the resulting function
	     * @return {Function} The function that will call the original fn without the first count args.
	     */
	    skipArgs: skipArgs,

	    /**
	     * See {@link Function#intercept}
	     */
	    intercept: function(fn, interceptedFn, withStopArgs){
	        return intercept(interceptedFn, fn, withStopArgs)
	    },

	    /**
	     * See {@link Function#throttle}
	     */
	    throttle: throttle,

	    /**
	     * See {@link Function#spread}
	     */
	    spread: spread,

	    /**
	     * See {@link Function#chain}
	     */
	    chain: function(fn, where, mainFn){
	        return chain(where, mainFn, fn)
	    },

	    /**
	     * See {@link Function#before}
	     */
	    before: function(fn, otherFn){
	        return chain('before', otherFn, fn)
	    },

	    /**
	     * See {@link Function#after}
	     */
	    after: function(fn, otherFn){
	        return chain('after', otherFn, fn)
	    },

	    /**
	     * See {@link Function#curry}
	     */
	    curry: curry,

	    /**
	     * See {@link Function#once}
	     */
	    once: once,

	    /**
	     * See {@link Function#bindArgs}
	     */
	    bindArgs: bindArgs,

	    /**
	     * See {@link Function#bindArgsArray}
	     */
	    bindArgsArray: bindArgsArray,

	    /**
	     * See {@link Function#lockArgs}
	     */
	    lockArgs: lockArgs,

	    /**
	     * See {@link Function#lockArgsArray}
	     */
	    lockArgsArray: lockArgsArray,

	    bindFunctionsOf: bindFunctionsOf,

	    find: find,

	    findIndex: findIndex,

	    newify: __webpack_require__(37)
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var hasOwn = Object.prototype.hasOwnProperty

	function curry(fn, n){

	    if (typeof n !== 'number'){
	        n = fn.length
	    }

	    function getCurryClosure(prevArgs){

	        function curryClosure() {

	            var len  = arguments.length
	            var args = [].concat(prevArgs)

	            if (len){
	                args.push.apply(args, arguments)
	            }

	            if (args.length < n){
	                return getCurryClosure(args)
	            }

	            return fn.apply(this, args)
	        }

	        return curryClosure
	    }

	    return getCurryClosure([])
	}


	module.exports = curry(function(object, property){
	    return hasOwn.call(object, property)
	})

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25)

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var HAS_OWN = Object.prototype.hasOwnProperty

	var classy = __webpack_require__(23)
	var FunctionQueue = __webpack_require__(52)
	var withQueue     = __webpack_require__(24)

	var copyUtils = __webpack_require__(7)
	var returnFalse = function(){
	    return false
	}
	var hasOwn = function(object, propertyName){
	    return HAS_OWN.call(object, propertyName)
	}
	var isClass = function(v){
	     return !!(v && v.$superClass && v.prototype && v.extend && v.override)
	}


	/**
	 * @class EventEmitter @extends Mixin
	 *
	 * # z.eventemitter
	 *
	 * This mixin class provides an interface for registering and publishing events.
	 *
	 * It is very important to grasp a good understanding of the EventEmitter, since most framework classes have this mixin applied.
	 * Two of the EventEmitter methods make the most important part of the public API:
	 *
	 *  * on / addListener
	 *  * emit
	 *
	 * For registering events, use:
	 *
	 *      emitter.on('click', function(){ ... })
	 *
	 * For publishing events, use:
	 *
	 *      emitter.emit('click', firstParam, secondParam)
	 *
	 * ## Registering events
	 *
	 * You can use the {@link addListener} method to register to events, or it's shorter alias, {@link #on}.
	 *
	 * The {@link #on} method accepts a variation of signatures, so let's explain them:
	 *
	 *      //1. event name as a string, then the function to register;
	 *      //optionally a scope and an options object
	 *      emitter.on('click', function(){ }[ , scope [, options]])
	 *
	 *      //2. event names specified as string with whitespace;
	 *      //the function will be called both on 'start' and 'stop'
	 *      emitter.on('start stop', function(){})
	 *
	 * In the variation above, we basically have
	 *
	 *  * the event name (a string - with spaces in case you want to listen to multiple events)
	 *  * the listening function
	 *  * an optional scope for the function
	 *  * an optional options argument for the function
	 *
	 * Now, in this variation, for both the event name and the function, you can specify arrays.
	 *
	 *      emitter.on([ event_name_1, event_name_2], function(){})
	 *
	 * or
	 *     emitter.on([ event_name_1, event_name_2], [ function a(){}, function b(){}, function c(){}])
	 *
	 * This means that whenever event_name_1 is emitted, all functions (both a, b and c will be called).
	 * The same applies to event_name_2. Even more, the event names can be strings with whitespaces, so they can refer to event more events.
	 *
	 * To summarize, we have
	 *
	 *      emitter.on( stringOrArray, functionOrArray, optionalScope, options )
	 *
	 * {@link EventEmitter#on EventEmitter.on} also has a second form
	 *
	 *      var scope = { ... }
	 *      emitter.on({
	 *          scope : scope
	 *          start : function(){
	 *              //this == scope
	 *          },
	 *          click: function(){
	 *          }
	 *      })
	 *
	 * So you can register listeners using an object notation. The keys are the event names,
	 * and the values are the functions you are registering.
	 *
	 * In this object notation, some keys can be the options for the registering functions:
	 *
	 *      emitter.on({
	 *          scope: this, // the scope in which to bind the functions
	 *          start: function(){ //function to be called when the 'start' event is emitted
	 *          },
	 *          stop: function(){ //function to be called when the 'stop' event is emitted
	 *          },
	 *          buffer: 10 //an option. This will buffer the calls to the start and stop functions by 10 ms.
	 *      })
	 *
	 * Just like in the previous form, where you can have functions, you can have arrays of functions
	 *
	 *      function onClick(){}
	 *
	 *      var a  = function(){},
	 *          b  = function(){}
	 *
	 *      emitter.on({
	 *          scope: this,
	 *          click: onClick,
	 *
	 *          //a space separated key is also accepted, and refers to all the events inside the string
	 *          'start stop': [ a, b] // whenever start or stop is emitted, call all the functions in the array
	 *      })
	 *
	 * There is another form you can use for specifying functions.
	 *
	 *      emitter.on({
	 *          stop: function(){
	 *          },
	 *          start: function(){
	 *          },
	 *          idle: {
	 *              fn: function(){
	 *              },
	 *              throttle: 10,
	 *              scope: 'x'
	 *          }
	 *      })
	 *
	 * Whenever you can pass-in functions, you can also specify an object that has a *fn* property set to a function. This is especially useful
	 * when you are using the {@link EventEmitter#on} with an object,
	 * and you want for a specific function to specify a scope or options different than those of the other functions.
	 *
	 * ## Functions as strings
	 *
	 * Another way of attaching functions, supported in all forms described above, is specifying functions as strings.
	 *
	 * When the EventEmitter emits an event, and loops over the registered listeners, if it finds one that is a string, it looks for a property
	 * with that name on the scope of the listener. If that property is a function, it stores it instead of the string, and executes the function just as it normally does.
	 *
	 * NOTE: once the "string" listener is resolved to a function, the resolved function is stored, and the next time the event is triggered, the same function is used,
	 * even if the value of that property on the scope object for the listener has changed.
	 *
	 * #### Example:
	 *
	 *      var scope = {
	 *          log: function(msg){
	 *              console.log(msg)
	 *              return msg
	 *          }
	 *      }
	 *
	 *      emitter.on({
	 *          scope: scope,
	 *          sendmessage: 'log'
	 *      })
	 *
	 *      emitter.emit('sendmessage', 'hello world')
	 *      //this event will look for the "log" property, on the scope object.
	 *      //since that is a function, the function will be called, so it logs
	 *      //"hello world"
	 *
	 * Now, if we change the "log" property on the scope
	 *
	 *      scope.log = function(msg){
	 *          alert(msg)
	 *      }
	 *
	 * And emit again
	 *
	 *      emitter.emit('send message', 'this will be a log')
	 *
	 *      //since the "log" function has already been resolved
	 *      //the message is still logged to the console, and no alert wil be called.
	 *
	 *
	 * ## Emitting events
	 *
	 * Emitting events is as simple as calling the {@link #emit EventEmitter.emit} method.
	 *
	 *      emitter.emit('start', 'firstParam', 5, 'thirdParam')
	 *      //all the parameters that follow the event name are going to be passed to the registered functions
	 *
	 *      emitter.on('stop', function(a,b,c){
	 *
	 *      })
	 *
	 *      emitter.emit('stop', 5, 'test', 'me')
	 *      //the function registered as a 'stop' listener will have its arguments mapped to
	 *      // a => 5
	 *      // b => 'test'
	 *      // c => 'me'
	 *
	 * #### Example:
	 *
	 *      //Define a Computer class, which has EventEmitter mixed-in
	 *
	 *      root.define({
	 *          alias: 'computer',
	 *
	 *          mixins: [ 'z.eventemitter' ],
	 *
	 *          state: false,
	 *
	 *          init: function(name){
	 *              this.name = name
	 *          },
	 *
	 *          //the start method emits the "poweron" event
	 *          start: function(){
	 *              if (this.state){
	 *                  //the computer is already started
	 *                  return this
	 *              }
	 *
	 *              this.state = true
	 *
	 *              //emit the "poweron" event, sending the computer state as first param
	 *              //and the computer instance as second param
	 *              this.emit('poweron', this.state, this)
	 *
	 *              return this
	 *          },
	 *
	 *          //the start method emits the "poweroff" event
	 *          stop: function(){
	 *              if (!this.state){
	 *                  //the computer is already stopped
	 *                  return this
	 *              }
	 *
	 *              this.state = false
	 *
	 *              //emit the "poweroff" event, sending the computer state as first param
	 *              //and the computer instance as second param
	 *              this.emit('poweron', this.state, this)
	 *
	 *              return this
	 *          }
	 *      })
	 *
	 *
	 *      //we create an instance of the Computer class (it's alias is "computer")
	 *      var macAir = root.create('computer', 'MacBook Air')
	 *
	 *      //attach poweron and poweroff listeners
	 *      macAir.on({
	 *          poweron: function(state, comp){
	 *              console.log(comp.name + ' has been turned on')
	 *          }
	 *          poweroff: function(state, comp){
	 *              console.log(comp.name + ' has been turned off')
	 *          },
	 *          'poweron poweroff': function(state){
	 *              console.log(comp.name + ' state has changed. It is now ' + (state?'on':'off') + '.')
	 *          }
	 *      })
	 *
	 *      macAir.start()
	 *      //logs "MacBook Air has been turned on"
	 *      //and "MacBook Air state has changed. It is now on."
	 *
	 *      macAir.stop()
	 *      //logs "MacBook Air has been turned off"
	 *      //and "MacBook Air state has changed. It is now off."
	 *
	 * ## Removing listeners
	 *
	 * Removing listeners is as simple as calling {@link #removeListener EventEmitter.removeListener}, or, its shorter alias, {@link #off EventEmitter.off}
	 *
	 *      //removes all listeners to the start event, that where bound to a scope that equals to context
	 *      emitter.off('start', context)
	 *
	 *      //removes all listeners to the start event, no matter the scope
	 *      emitter.off('start')
	 *
	 *      //removes all listeners to the start and stop events found on this emitter
	 *      emitter.off('start stop') //or emitter.off(['start','stop'])
	 *
	 *      //removes all listeners from this emitter
	 *      emitter.off() //or emitter.removeListener()
	 *
	 * ## Event options
	 *
	 * There are a number of options available for binding events:
	 *
	 *  * once (Boolean)      - Binds the function only once, that is, removes it after the event is emitted.
	 *  * buffer (Number)     - Binds the function via {@link Function#buffer}
	 *  * delay (Number)      - Binds the function via {@link Function#delay}
	 *  * defer (Boolean)     - Binds the function via {@link Function#defer}
	 *  * throttle (Number)   - Binds the function via {@link Function#throttle}
	 *  * quickStop (Boolean) - Binds the function and enables this function to cancel any subsequent listeners for this event.
	 *  * selector (String)   - Selector used by the Element class.
	 *
	 * #### Example:
	 *
	 *      var animal = {
	 *          sound: 'ooo'
	 *          makeSound: function(sound){
	 *              this.emit('makesound', sound || this.sound)
	 *          }
	 *      }
	 *
	 *      //make the animal object be an EventEmitter
	 *      root.mixin(animal, 'z.eventemitter')
	 *
	 *      animal.on('makesound', function(sound){ console.log(sound)}, scope, { once: true })
	 *
	 *      animal.makeSound('meow')
	 *      //the listener is called, and "meow" is logged
	 *      //then the listener is removed, since it was attached "once"
	 *
	 *      animal.makeSound('meow')
	 *      //nothing gets logged
	 *
	 *      animal.on({
	 *          scope: 'cat',
	 *          makesound: function(sound){
	 *              console.log(this, 'sound: ', sound)
	 *          },
	 *
	 *          delay: 100
	 *      })
	 *
	 *      animal.makeSound('meow')
	 *      animal.makeSound('meow')
	 *      //since the function is delayed,
	 *      //the listener will only be called after 100ms from the last call,
	 *      //so it only logs "cat sound: meow" once, after 100ms
	 *
	 *
	 *      //you can also specify options using config.options
	 *      animal.on({
	 *          makesound: function(){
	 *          },
	 *
	 *          throttle: 50,
	 *          options: {
	 *              throttle: 100
	 *          }
	 *      })
	 *      //config.options has higher priority than any option specified directly on the config
	 *      //so the function will be throttled 100ms, not 50
	 *
	 * ## Function scope
	 *
	 * If you don't specify a scope for your attached functions, the scope will be the EventEmitter.
	 *
	 *      animal.on('makesound', function(){
	 *          //the scope is the EventEmitter
	 *          this == animal
	 *      })
	 *
	 *      //or you can pass it explicitly
	 *
	 *      animal.on('makesound', function(){
	 *          console.log(this) //logs 'test'
	 *      }, 'test')
	 *
	 *      //or using a config object
	 *      animal.on({
	 *          scope: { name: 'zippy' },
	 *          makesound: function(){},
	 *          wakeup: function(){},
	 *          die: {
	 *              fn: function(){},
	 *              once: true,
	 *              scope: "He's dead, Jim"
	 *          }
	 *      })
	 *      //the makesound and wakeup listeners will be called in the scope specifed by
	 *      //scope: {name: 'zippy'}
	 *      //but the "die" listener will have the scope equal to the given string and will only be called once
	 *
	 * ## Creating EventEmitter objects
	 *
	 * Creating event emitters is just a matter of mixing the EventEmitter into a target class or object
	 *
	 * #### Example:
	 *
	 *      root.define({
	 *          alias: 'person',
	 *
	 *          mixins: [
	 *              'z.eventemitter'
	 *          ],
	 *
	 *          init: function(config){
	 *              config = config || {}
	 *              this.name = config.name
	 *          },
	 *
	 *          setName: function(name){
	 *              var oldName = this.name
	 *
	 *              this.name = name
	 *
	 *              this.emit('namechange', this, name, oldName)
	 *
	 *              return this
	 *          }
	 *      })
	 *
	 *      var p = root.getInstance({
	 *              alias: 'person',
	 *              name : 'John'
	 *          }),
	 *          onChangeName = function(person, newName, oldName){
	 *              console.log(person,' has just changed its name, from ' + oldName + ' to ' + newName + '.')
	 *          }
	 *
	 *      p.on('changename', onChangeName)
	 *      p.setName('Michael')
	 *
	 * If you simply want to make an object become an EventEmitter, simply do
	 *
	 *      var person = {
	 *          name: 'Pat',
	 *          setName: function(name){
	 *              var oldName = this.name
	 *              this.name = name
	 *              this.emit('changename', this, name, oldName)
	 *          }
	 *      }
	 *
	 *      root.mixin(person, 'eventemitter')
	 *
	 *      person.on('changename', function(person, newName, oldName){
	 *          console.log(persona, ' has just renamed to ', newName)
	 *      });
	 *      person.setName('Richard')
	 *
	 */

	var SLICE = Array.prototype.slice
	var IS_FN = function(fn){return typeof fn == 'function'}
	var IS_FN_LIKE = function (obj) {
	        return obj ? IS_FN(obj) || IS_FN(obj.fn) || typeof obj.fn === 'string' : false
	    }

	var CLEAR_QUEUE = function (queue) {
	        queue.clear()
	    }
	var EVENT_QUEUE = new FunctionQueue({ allowFunctionsAsString: true, keepFunctionReferences: true })

	var EventEmitter = classy.defineMixin({

	    $copyIf: {

	        hasListenersFor: function(name){
	            return !!this.getListenerCountFor.apply(this, arguments)
	        },

	        getListenerCountFor: function (name) {
	            var result = 0

	            this.withQueue(name, function (queue) {
	                result = queue.getLength()
	            }, { skipEmpty: true })

	            return result
	        }
	    },

	    $override: {
	        /**
	         * @private
	         *
	         * Adds a listener in the normalized form
	         *
	         * @param {Object}   config The listener config
	         *
	         * @param {String}   config.name The event name.
	         *
	         * NOTE: this should have already been parsed, and be a non-whitespace string, the name of a single event.
	         *
	         * @param {Function} config.fn The function to bind to the event
	         * @param {Object}   [config.scope] The optional scope
	         * @param {Object}   [config.options] The optional options for the bound function.
	         *
	         * @return {EventEmitter} this
	         */
	        addNormalizedListener: function (config) {

	            this.callTarget()

	            var eventName = config.name,
	                fn        = config.fn,
	                scope     = config.scope,
	                options   = config.options

	            this.withQueue(eventName, function (queue) {
	                queue.add(fn, scope, options)
	            })

	            return this
	        }
	    },

	    $before: {

	        eventEmitter: true,

	        availableEmitterOptions: {
	            once      : 1,
	            buffer    : 1,
	            delay     : 1,
	            defer     : 1,
	            throttle  : 1,
	            quickStop : 1,
	            selector  : 1,
	            capture   : 1
	        },

	        destroy: function () {
	            this.off()
	        },

	        init: function (config) {
	            this.eventQueueState = this.eventQueueState || {}

	            if (isClass(this) || !this.initEventEmitter) {

	                if (this.listeners) {
	                    this.on(this.listeners)
	                }

	                if (config && config.listeners && config.listeners != this.listeners) {
	                    this.on(config.listeners)
	                }

	                this.initEventEmitter = true
	            }

	            return this
	        },

	        withQueue: function (eventName, fn, config) {

	            var queueStateName = 'eventQueueState',
	                checkEmpty     = config && config.checkEmpty

	            if (checkEmpty){
	                config.skipEmpty = true
	            }

	            var called = withQueue.call(this, eventName, function(queue){
	                fn.call(this, queue)

	                if (config && config.checkEmpty && !queue.getLength() ){
	                     delete this[queueStateName][eventName]
	                }

	            }, queueStateName, EVENT_QUEUE, config)

	            if (checkEmpty && !called){
	                delete this[queueStateName][eventName]
	            }


	            return this

	        },

	        //private
	        removeOneEventListener: function (eventName, fn, scope, config, queue) {
	            queue.remove(fn, scope)
	        },

	        /**
	         * @private
	         * Removes a listener in the normalized form
	         *
	         * @param {Object}   config The listener config
	         *
	         * @param {String}   config.name The event name.
	         *
	         * @param {Function} config.fn The function to look for
	         * @param {Object}   [config.scope] The optional scope
	         *
	         * @return {EventEmitter} this
	         */
	        removeNormalizedListener: function (config) {
	            var eventName = config.name,
	                fn        = config.fn,
	                scope     = config.scope

	            if (config.defaultScope) {
	                scope = null
	            }

	            if (!fn){
	                this.removeAllListenersFor(eventName)
	            } else {

	                this.withQueue(eventName, function (queue) {

	                    this.removeOneEventListener(eventName, fn, scope, config, queue)

	                }, { checkEmpty: true })
	            }

	            return this
	        },

	        /**
	         * @chainable
	         * @private
	         * Removes all listeners from the specified event.
	         *
	         * @param  {String} eventName The event for which to remove all listeners
	         * @return {EventEmitter} this EventEmitter
	         */
	        removeAllListenersFor: function (eventName) {
	            return this.withQueue(eventName, CLEAR_QUEUE, { checkEmpty: true }), this
	        },

	        /**
	         * @private
	         * Removes all attached listeners from this EventEmitter
	         *
	         * @return {EventEmitter} this
	         */
	        removeAllListeners: function () {
	            var state = this.eventQueueState,
	                event

	            //we could simply clear the queue, but some classes that have
	            //this mixed in may need to be interested for the removing of all
	            //functions for each event in particular
	            for (event in state) if (hasOwn(state, event)) {
	                this.removeAllListenersFor(event)
	            }

	            this.eventQueueState = {}

	            return this
	        },

	        getNormalizedArray: function (eventName, fnLike, scope, options) {
	            var availableOptions = this.availableEmitterOptions,
	                args = arguments,
	                result = [],
	                opts

	            if (args.length > 1 || (args.length == 1 && (typeof eventName == 'string') || Array.isArray(eventName))) {
	                //we also make the args.length == 1 check and eventName is string or array,
	                //because in the case of a getNormalizedArray call, for removing listeners,
	                //very often you will want to do: node.removeListener('click') or node.removeListener(['click','mouseup'])

	                if (Array.isArray(eventName)) {

	                    //this method has been called with an array of event names,
	                    //so simply append the result of calling this method for every item in the array
	                    eventName.forEach(function (name) {

	                        result.push.apply(result, this.getNormalizedArray(name, fnLike, scope, options))

	                    }, this)

	                    //and return that result
	                    return result
	                }

	                if (Array.isArray(fnLike)) {

	                    //this method has been called with an array of functions,
	                    //so again, simply append all results of calling this method for each function in the array
	                    fnLike.forEach(function (fn) {

	                        result.push.apply(result, this.getNormalizedArray(eventName, fn, scope, options))

	                    }, this)

	                    //and return the result
	                    return result
	                }

	                var fn

	                opts = options

	                if (IS_FN(fnLike)) {

	                    fn = fnLike

	                } else if (typeof fnLike == 'string') {

	                    fn = fnLike

	                } else if (IS_FN_LIKE(fnLike)) {

	                    fn = fnLike.fn
	                    opts = copyUtils.copy(options)

	                    copyUtils.copyKeys(fnLike, opts, availableOptions)

	                    if (fnLike.options) {
	                        copyUtils.copy(fnLike.options, opts)
	                    }

	                    if (fnLike.scope) {
	                        scope = fnLike.scope
	                    }
	                }

	                if (~eventName.indexOf(' ')) {

	                    eventName.split(' ').forEach(function (eventName) {
	                        if (eventName) {
	                            result.push({
	                                defaultScope: scope == null,
	                                name: eventName,
	                                fn: fn,
	                                options: opts,
	                                scope: scope || this
	                            })
	                        }
	                    }, this)

	                } else {

	                    result.push({
	                        defaultScope: scope == null,
	                        name: eventName,
	                        fn: fn,
	                        options: opts,
	                        scope: scope || this
	                    })

	                }


	                return result
	            }

	            var propName,
	                propValue,
	                config = eventName

	            opts = copyUtils.copyKeys(config, {}, availableOptions)

	            if (config.options) {
	                copyUtils.copy(config.options, opts)
	            }

	            for (propName in config) if (hasOwn(config, propName)) {

	                propValue = config [ propName ]

	                if (
	                    IS_FN_LIKE(propValue) ||
	                        Array.isArray(propValue) ||
	                        (typeof propValue == 'string' && !(propName in availableOptions) && propName != 'scope')
	                    ) {

	                    // if (config.options){
	                    //     opts = root.copy(opts)

	                    //     root.copy(config.options, opts)
	                    // }

	                    result.push.apply(result, this.getNormalizedArray(propName, propValue, config.scope, opts))
	                }
	            }

	            return result
	        },

	        /**
	         * Adds a listener to this EventEmitter
	         *
	         * There are a number of ways to call the addListener method, which are described above, in the documentation of the class.
	         *
	         * Here's a brief overview:
	         *
	         *      //event name and function
	         *      emitter.addListener('start', function(){})
	         *
	         *      //name, function, optional scope, and options
	         *      emitter.addListener('start', function(){}, scope, options)
	         *
	         * Whenever you can provide an event name or a function, you can also provide an array of event names or functions
	         *
	         *      //both a and b functions will be called when start is emitted, as well as when stop is emitted
	         *      emitter.on(['start', 'stop'], [function a(){}, function b(){}])
	         *
	         * You can also have an object config
	         *
	         *      var context = ...
	         *
	         *      emitter.on({
	         *          scope: context,
	         *          start: function(){
	         *          },
	         *          stop: function(){
	         *          }
	         *      })
	         *
	         * @param {String/Array/Object} name The event name to which to bind the listener, an array of event names, or an object config
	         * @param {Function/Function[]} [fn] The function or the function array that will be attached to the event.
	         * @param {Object}   scope   An optional scope for the attached function/functions
	         * @param {Object}   options An object config for the attached function/functions
	         * @return {EventEmitter} this EventEmitter
	         *
	         * @chainable
	         */
	        addListener: function (name, fn, scope, options) {

	            var args = arguments,
	                result = this

	            if (args.length == 1 && (typeof name == 'string')) {
	                throw new Error('Promise not supported yet for events.')
	                var deferred = root.create('z.deferred')

	                result = deferred.getPromise()

	                args.push(fn = function () {
	                    deferred.resolve.apply(deferred, arguments)
	                })
	            }

	            this.getNormalizedArray.apply(this, args)
	                .forEach(function(config){

	                    this.ensureEventOptions(config)
	                    this.addNormalizedListener(config)

	                }, this)

	            return result
	        },

	        /**
	         * Alias to {@link #addListener}
	         */
	        on: function () {
	            return this.addListener.apply(this, arguments)
	        },

	        /**
	         * Removes listeners from this event emitter.
	         *
	         * @param {String/String[]} [eventName] The event for which to remove the listeners. If this method is called
	         * without any parameter (so no event name given), it will remove all listeners.
	         *
	         * If it is called with an eventName, it will remove all the listeners attached for the given event.
	         *
	         * If the optional scope is given, only remove those listeners from the specified event that were attached in the given scope.
	         *
	         * @param {Object} [scope] If an eventName is provided, you can optionally specify the scope to only remove the listeners attached
	         * for this event in the given scope.
	         *
	         * @return {EventEmitter} this event emitter
	         */
	        removeListener: function () {

	            var args = arguments

	            if (!args.length) {
	                this.removeAllListeners()
	            } else {

	                this.getNormalizedArray.apply(this, args)
	                    .forEach(function(config){

	                        this.ensureEventOptions(config)
	                        this.removeNormalizedListener(config)

	                    }, this)
	            }

	            return this
	        },

	        /**
	         * Alias to {@link #removeListener}
	         */
	        off: function () {
	            return this.removeListener.apply(this, arguments)
	        },

	        /**
	         * Attaches the functions just once. After the first time the event is triggered, these functions are removed.
	         *
	         * This has the same signature with {@link #on} .
	         *
	         * @return {EventEmitter} this
	         */
	        once: function () {

	            this.getNormalizedArray.apply(this, arguments)
	                .forEach(function (config) {

	                    this.ensureEventOptions(config)

	                    config.options.once = true

	                    this.addNormalizedListener(config)
	                }, this)

	            return this

	        },

	        ensureEventOptions: function(config){
	            config.options = config.options || {}
	        },

	        /**
	         * Alias to {@link #once}
	         */
	        one: function () {
	            return this.once.apply(this, arguments)
	        },

	        /**
	        * @param {String} name
	        * @param {...Object} args The enumeration of parameters to send to the listening functions of this event.
	        * @return {Boolean} false if any of the event listeners returns the Boolean false, true otherwise
	        */
	        emit: function (name /*, args ... */) {

	            return this.emitEvent(name, SLICE.call(arguments, 1))

	        },

	        emitAppEvent: function(name /*, args ... */) {
	            var args = SLICE.call(arguments, 1)
	            var e    = this.createAppEventObject(name, args)

	            if (this.emitEvent(name, args.concat(e)) === false){
	                e.stop = true
	            }

	            return e
	        },

	        createAppEventObject: function(name, args) {
	            var e = { stop: false }

	            e.appEvent = true
	            e.type     = name
	            e.source   = this
	            e.current  = this
	            e.targets  = [this]

	            e.args = args

	            return e
	        },

	        emitEvent: function(name, args, config){
	            if (name == '*'){
	                //<debug>
	                console.log('You cannot emit the generic event')
	                //</debug>
	                return false
	            }

	            var result

	            this.lastEventName = name

	            this.withQueue(name, function (queue) {
	                if (this.mutedEvents && this.mutedEvents[name]){
	                    config = config || {}
	                    config.filter = returnFalse
	                }
	                result = queue.applyWith(this /*default scope, if none given*/, args, config)
	            })

	            this.withQueue('*', function(queue){
	                if (this.mutedEvents && this.mutedEvents[name]){
	                    config = config || {}
	                    config.filter = returnFalse
	                }

	                //if there is no listener for '*', this function will not be called
	                queue.applyWith(this, [name].concat(args), config)
	            }, { skipEmpty: true })

	            return result
	        },

	        /**
	         * Alias to {@link #emit}
	         */
	        trigger: function () {
	            return this.emit.apply(this, arguments)
	        },

	        /**
	         * Returns the name of the last event that has been emitted.
	         *
	         * @return {String} The name of the last event that has been emitted.
	         */
	        getLastEventName: function () {
	            return this.lastEventName
	        },

	        quickEmit: function (name /*, args... */) {
	            var args = SLICE.call(arguments, 1),
	                result

	            this.lastEventName = name

	            this.withQueue(name, function (queue) {
	                result = queue.applyWith(this, args, { quickStop: true })
	            })

	            return result
	        },

	        muteEvents: function(events){

	            this.mutedEvents = this.mutedEvents || {}

	            ;(events || []).forEach(function(name){
	                this.mutedEvents[name] = 1
	            }, this)

	            return this
	        },

	        unmuteEvents: function(events){
	            if (this.mutedEvents)  {

	                if (events){
	                    events.forEach(function(name){
	                        delete this.mutedEvents[name]
	                    }, this)
	                } else {
	                    delete this.mutedEvents
	                }
	            }

	            return this
	        }
	    }

	})

	var FN = function(obj){
	    return obj?
	            classy.mixin(obj, EventEmitter):
	            new EventEmitter()
	}

	FN.mixin = EventEmitter

	module.exports = FN

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*

	 This file is part of the ZippyUI Framework

	 Copyright (c) 2014 Radu Brehar <contact@zippyui.com>

	 The source code is distributed under the terms of the MIT license.
	 See https://github.com/zippyui/ZippyUI/blob/master/LICENCE

	 */
	module.exports = function(){

	    'use strict'

	    var core = __webpack_require__(49)

	    var isSubclassOf = __webpack_require__(38)

	    function isSameOrSubclassOf(subClass, superClass){
	        return isSubclassOf(subClass, superClass, { allowSame: true })
	    }

	    __webpack_require__(39)

	    var copyUtils = __webpack_require__(50)

	    return {

	        _: copyUtils.copy(copyUtils),

	        //primitives
	        BaseClass      : core.BaseClass,
	        extend         : core.extend,
	        createClass    : core.createClass,
	        overrideClass  : core.overrideClass,
	        core: core,

	        //enhanced
	        define   : __webpack_require__(40),
	        override : __webpack_require__(41),
	        getClass : __webpack_require__(42),

	        classRegistry: __webpack_require__(43),

	        defineMixin: __webpack_require__(44),
	        mixin      : __webpack_require__(51).mixin,

	        create      : __webpack_require__(45),
	        getInstance : __webpack_require__(46),

	        destroyClass   : __webpack_require__(47),
	        getParentClass : __webpack_require__(48),

	        isSubclassOf       : isSubclassOf,
	        isSameOrSubclassOf : isSameOrSubclassOf,
	        isClassLike        : isSameOrSubclassOf
	    }
	}()

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var withQueueStates = __webpack_require__(53)

	module.exports = function(name, fn, stateName, QUEUE, config){

	    var skipEmpty = !!(config && config.skipEmpty)
	    var result = false

	    withQueueStates.call(this, function(allStates, Q){
	        if (skipEmpty && !allStates[name]){
	            return
	        }

	        result = this

	        var state = allStates[name] || {}

	        // restore the queue with the state for the given name
	        Q.from(state)

	        fn.call(this, Q)

	        //save the queue state

	        state = Q.toStateObject()

	        if (state !== undefined){
	            allStates[name] = state
	        } else {
	            delete allStates[name]
	        }

	    }, stateName, QUEUE)

	    return result
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = {
	    'numeric'  : __webpack_require__(54),
	    'number'   : __webpack_require__(55),
	    'int'      : __webpack_require__(56),
	    'float'    : __webpack_require__(57),
	    'string'   : __webpack_require__(58),
	    'function' : __webpack_require__(59),
	    'object'   : __webpack_require__(60),
	    'arguments': __webpack_require__(61),
	    'boolean'  : __webpack_require__(62),
	    'date'     : __webpack_require__(63),
	    'regexp'   : __webpack_require__(64),
	    'array'    : __webpack_require__(65)
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	function curry(fn, n){

	    if (typeof n !== 'number'){
	        n = fn.length
	    }

	    function getCurryClosure(prevArgs){

	        function curryClosure() {

	            var len  = arguments.length
	            var args = [].concat(prevArgs)

	            if (len){
	                args.push.apply(args, arguments)
	            }

	            if (args.length < n){
	                return getCurryClosure(args)
	            }

	            return fn.apply(this, args)
	        }

	        return curryClosure
	    }

	    return getCurryClosure([])
	}

	module.exports = curry

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	function composeTwo(f, g) {
	    return function () {
	        return f(g.apply(this, arguments))
	    }
	}

	/*
	 * @param {Function...} an enumeration of functions, each consuming the result of the following function.
	 *
	 * For example: compose(c, b, a)(1,4) == c(b(a(1,4)))
	 *
	 * @return the result of the first function in the enumeration
	 */
	module.exports = function(){

	    var args = arguments
	    var len  = args.length
	    var i    = 0
	    var f    = args[0]

	    while (++i < len) {
	        f = composeTwo(f, args[i])
	    }

	    return f
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	function chain(where, fn, secondFn){

	    return function(){
	        if (where === 'before'){
	            secondFn.apply(this, arguments)
	        }

	        var result = fn.apply(this, arguments)

	        if (where !== 'before'){
	            secondFn.apply(this, arguments)
	        }

	        return result
	    }
	}

	module.exports = chain

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use once'

	function once(fn, scope){

	    var called
	    var result

	    return function(){
	        if (called){
	            return result
	        }

	        called = true

	        return result = fn.apply(scope || this, arguments)
	    }
	}

	module.exports = once

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var SLICE = Array.prototype.slice

	module.exports = function(fn, args){
	    return function(){
	        var thisArgs = SLICE.call(args || [])

	        if (arguments.length){
	            thisArgs.push.apply(thisArgs, arguments)
	        }

	        return fn.apply(this, thisArgs)
	    }
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var SLICE = Array.prototype.slice
	var bindArgsArray = __webpack_require__(30)

	module.exports = function(fn){
	    return bindArgsArray(fn, SLICE.call(arguments,1))
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var SLICE = Array.prototype.slice

	module.exports = function(fn, args){

	    return function(){
	        if (!Array.isArray(args)){
	            args = SLICE.call(args || [])
	        }

	        return fn.apply(this, args)
	    }
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var SLICE = Array.prototype.slice
	var lockArgsArray = __webpack_require__(32)

	module.exports = function(fn){
	    return lockArgsArray(fn, SLICE.call(arguments, 1))
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var curry = __webpack_require__(26)

	module.exports = curry(function(fn, value){
	    return value != undefined && typeof value.map?
	            value.map(fn):
	            fn(value)
	})

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var curry = __webpack_require__(26)

	module.exports = curry(function(prop, value){
	    return value != undefined? value[prop]: undefined
	})

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var SLICE = Array.prototype.slice
	var curry = __webpack_require__(26)

	module.exports = function(fn, count){
	    return function(){
	        return fn.apply(this, SLICE.call(arguments, 0, count))
	    }
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var newify = __webpack_require__(74)
	var curry  = __webpack_require__(26)

	module.exports = curry(newify)

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var getClass = __webpack_require__(42)

	module.exports = function(subClass, superClass, config){

	    'use strict'

	    subClass   = getClass(subClass)
	    superClass = getClass(superClass)

	    if (!subClass || !superClass){
	        return false
	    }

	    if (config && config.allowSame && subClass === superClass){
	        return true
	    }

	    while (subClass && subClass.$superClass != superClass){
	        subClass = subClass.$superClass
	    }

	    return !!subClass
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*

	 This file is part of the ZippyUI Framework

	 Copyright (c) 2014 Radu Brehar <contact@zippyui.com>

	 The source code is distributed under the terms of the MIT license.
	 See https://github.com/zippyui/ZippyUI/blob/master/LICENCE

	 */

	'use strict'

	var core = __webpack_require__(49)
	var copy = __webpack_require__(50).copy
	var when = [ '$before', '$after', '$override', '$copyIf' ]

	module.exports = __webpack_require__(40)({

	    alias: 'z.mixin',

	    callTarget: function(){},

	    statics: {
	        init: function(){
	            var source = this.$initialConfig || {}

	            when.forEach(function(it){
	                //copy all methods from prototype[when] to prototype
	                if (source[it]){
	                    core.copyClassConfig(this, source[it], {proto: true })
	                }

	                //copy all methods from Class[when] to Class
	                if (this[it]){
	                    core.copyClassConfig(this, this[it], { proto: false })
	                }
	            }, this)

	        },

	        /**
	         * @private
	         * @static
	         *
	         * @param  {Object} overrideConfig The config passed to the override call.
	         *
	         * Example:
	         *         root.override(alias, config) //this config will be passed to beforeOverride
	         *
	         * @return {Object} the new config to be used for overriding.
	         *
	         * beforeOverride should either return the same config, or a new config based on the one it was given.
	         *
	         * This is useful for mixins since we don't want to override the $override, $before or $after properties,
	         * but rather the properties inside those objects.
	         */
	        beforeOverride: function(overrideConfig){
	            var result = {},
	                proto  = this.prototype

	            when.forEach(function(it){
	                var config = overrideConfig[it]

	                if (config != null){
	                    copy(config, result)

	                    //also copy to the proto[it],
	                    //so new methods are found when iterating over proto[it]
	                    copy(config, proto[it])
	                }
	            })

	            return result
	        }
	    }
	})

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var getClass     = __webpack_require__(42)
	var processClass = __webpack_require__(66)

	var Registry = __webpack_require__(43)
	var core     = __webpack_require__(49)

	var ClassProcessor = __webpack_require__(67)

	function preprocessClass(classConfig, parent){
	    ClassProcessor.preprocess(classConfig)
	}

	var IDS    = 0
	var PREFIX = 'ZClass-'

	function generateAlias(){
	    return PREFIX + (IDS++)
	}


	module.exports = function(parentClass, classConfig){

	    'use strict'

	    if (arguments.length == 1){
	        classConfig = parentClass
	        parentClass = null
	    }

	    var parent = parentClass || classConfig.extend
	    var alias  = classConfig.alias    || (classConfig.alias = generateAlias())

	    parent = getClass(parent) || parent

	    //<debug>
	    if (!parent){
	        console.warn('Could not find class to extend (' + classConfig.extend + '). Extending base class.')
	    }
	    //</debug>

	    preprocessClass(classConfig, parent)

	    return core.createClass(parent, classConfig, function(Class){

	        //<debug>
	        if (Registry[alias]){
	            console.warn('A class with alias ' + alias + ' is already registered. It will be overwritten!')
	        }
	        //</debug>

	        Registry[alias] = Class

	        processClass(Class)
	    })
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var getClass = __webpack_require__(42)

	/**
	 * @method override
	 *
	 * Zpy.override allows you to override a class. This can be often used to override default values
	 *
	 * Example:
	 *      Zpy.override('z.visualcmp', {
	 *          titleHeight: 40,
	 *
	 *          getTitle: function(){
	 *              return this.callOverriden() + '!'
	 *          }
	 *      })
	 *
	 * @param  {Class/String} Class The class you want to override, or an alias of an existing class
	 * @param  {Object} classConfig The object with the overrides
	 * @return {Class} returns the class that has just beedn overriden
	 */
	module.exports = function(Class, classConfig){

	    'use strict'

	    var TheClass = getClass(Class)

	    TheClass && TheClass.override(classConfig)

	    return TheClass
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @method getClass
	 *
	 * This method can be used to get a reference to an existing class. Pass in either a class alias (a string),
	 * an instance of a class, or the class itself. It will return the class.
	 *
	 * @param  {String/Object/Class} alias The alias for the class you are looking for, an instance of a class or the class itself
	 *
	 * @return {Class}       The class or undefined if no class is found
	 */

	var REGISTRY   = __webpack_require__(43)
	var BASE_CLASS = __webpack_require__(49).BaseClass

	module.exports = function getClass(alias){
	    if (!alias){
	        return BASE_CLASS
	    }

	    if (typeof alias != 'string'){
	        //alias is probably an instance or a Class
	        alias = alias.alias || (alias.prototype? alias.prototype.alias: alias)
	    }

	    return REGISTRY[alias]

	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var define = __webpack_require__(40)
	var copyIf = __webpack_require__(50).copyIf

	module.exports = function(members){

	    'use strict'

	    return define(copyIf({ extend: 'z.mixin'}, members))
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var SLICE = Array.prototype.slice

	var getClass = __webpack_require__(42)
	var newify   = __webpack_require__(75)

	/**
	 * @method create
	 *
	 * Use Zpy.create to create instances.
	 * The first parameter you should pass in is an alias (or anything accepted by {@link #getClass}), and the rest
	 * of the parameters are passed on to the class constructor
	 * example:
	 *
	 *     Zpy.create('animal', 'dog', 'puffy')
	 *     //will look for a class with the alias == 'animal'
	 *     //and call it's constructor with the 'dog' and 'puffy' paramaters
	 *
	 *     //equivalent to
	 *     new Animal('dog','puffy')
	 *
	 * @param  {Class/String/Object} alias The class alias, or anything accepted by {@link #getClass}
	 * @return {Object} an instance of the specified class.
	 */
	module.exports = function(alias /* args... */){

	    'use strict'

	    var Class = getClass(alias)
	    var args  = SLICE.call(arguments, 1)

	    return newify(Class, args)
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var BaseClass = __webpack_require__(49).BaseClass
	var getClass  = __webpack_require__(42)

	/**
	 * @method getInstance
	 *
	 * Use this method to create instances. If a class is given, or an alias or an object with the alias set,
	 * that class is resolved, and if it found, an instance of that class is created, with the config being
	 * passed to the Class constructor (the init method)
	 *
	 * If config is an instance, that instance is simply returned
	 *
	 * @param {Object} config A string (a class alias), a config object with the alias property set
	 * or a class.
	 *
	 * @return {Zpy.BaseClass} a new instance corresponding to the class denoted by config.
	 */
	module.exports = function(config){

	    'use strict'

	    if (config instanceof BaseClass){
	        return config
	    }

	    config = typeof config == 'string'?
	                { alias: config }:
	                config || {}

	    var klass = getClass(config)

	    //<debug>
	    if (!klass){
	        console.warn('Cannot find class for ', config)
	    }
	    //</debug>

	    if (klass && klass.prototype.singleton){
	        return klass.getInstance()
	    }

	    return new klass(config)
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @method destroyClass
	 *
	 * Calls the static destroy method on the given class, and unregisters the class from the framework registry.
	 *
	 * @param  {String/Object/Class} Class a class - as expected by {@link #getClass}
	 *
	 */

	var getClass   = __webpack_require__(42)
	var core       = __webpack_require__(49)
	var BaseClass  = core.BaseClass

	module.exports = function(Class){

	    'use strict'

	    Class = getClass(Class)

	    if (Class && (Class != BaseClass)){
	        Class.destroy()
	    }
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var BaseClass = __webpack_require__(49).BaseClass
	var getClass  = __webpack_require__(42)

	/**
	 * @method getParentClass
	 *
	 * @param  {String/Object/Class} alias an argument specifying the class (as expected by {@link #getClass})
	 * @return {Class} the top parent class (all the way up in the class hierarchy), if there is one.
	 *
	 * NOTE: All framework classes inherit from BaseClass, but is not returned from this call.
	 */
	module.exports = function(alias){

	    'use strict'

	    var Class = getClass(alias)

	    if (Class && Class != BaseClass && Class.$superClass != BaseClass){
	        while (Class.$superClass && Class.$superClass != BaseClass){
	            Class = Class.$superClass
	        }

	        return Class
	    }
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){

	    'use strict'

	    var newify = __webpack_require__(75)

	    var extend = __webpack_require__(68)
	    var copy   = __webpack_require__(50).copy

	    var hasOwnProperty = Object.prototype.hasOwnProperty
	    var canDefineProperty = __webpack_require__(69)
	    var canGetOwnPropertyDescriptor = __webpack_require__(70)

	    var getOwnPropertyDescriptor = canGetOwnPropertyDescriptor? Object.getOwnPropertyDescriptor: null

	    var copyDescriptors = __webpack_require__(71)

	    var Base = function(){}

	    Base.prototype.init = function(){
	        return this
	    }

	    Base.prototype.self = function(){
	        return this
	    }

	    function prepareSingletonStatics(statics){
	        statics = statics || {}

	        statics.getInstance = function(){

	            if (!this.INSTANCE){
	                this.INSTANCE = newify(this, arguments)
	            }

	            return this.INSTANCE
	        }

	        statics.getInstanceIf = function(){
	            if (this.INSTANCE){
	                return this.INSTANCE
	            }
	        }

	        return statics
	    }

	    function createClass(Parent, config, callback){

	        if (arguments.length == 1){
	            config = Parent
	            Parent = Base
	        } else {
	            Parent = Parent || Base
	        }

	        function Class(){
	            if (!(this instanceof Class) && Class.prototype.forceInstance){
	                return newify(Class, arguments)
	            }

	            if (!this){
	                throw 'Cannot call class constructor with undefined context.'
	            }

	            if (this.singleton){
	                if (this.$ownClass.INSTANCE){
	                    throw 'Cannot re-instantiate singleton for class ' + Class
	                }

	                this.$ownClass.INSTANCE = this
	            }

	            return this.init.apply(this, arguments)
	        }

	        extend(Parent, Class)

	        copyDescriptors(Parent.prototype, Class.prototype)
	        copyDescriptors(Parent, Class)

	        //remove statics from config
	        var statics = config.statics || {}
	        var $own    = statics.$own

	        statics.$own   = null
	        config.statics = null

	        Class.$initialConfig = copyClassConfig(Class, config)

	        if (config.singleton){
	            prepareSingletonStatics(statics)
	        }

	        //copy static properties from Parent to Class
	        copyClassConfig( Class,  Parent, {
	            proto     : false,
	            skipOwn   : true,
	            skipProps : copy(Parent.$own, {
	                $own           : 1,
	                $ownClass      : 1,
	                $superClass    : 1,
	                $initialConfig : 1
	            })
	        })

	        //copy static properties from config statics to class
	        copyClassConfig( Class, statics, { proto: false })

	        //copy static own properties
	        if ($own){
	            copyClassConfig( Class, $own, { proto: false, own: true })
	        }

	        if (typeof callback != 'function') {
	            //no callback was provided, so it's safe to call the Class.init method, if one exists
	            if (Class.init){
	                Class.init()
	            }
	        } else {
	            //a callback was given, so don't call Class.init,
	            //but call the callback instead, which will take care to call Class.init
	            callback(Class)
	        }

	        return Class
	    }

	    var assignClassProperty = __webpack_require__(72)

	    function copyClassConfig(Class, config, targetConfig, resultConfig){
	        targetConfig = targetConfig || { proto: true }

	        var result       = resultConfig || {},

	            own          = !canDefineProperty && targetConfig.own,
	            configOwn    = config.$own,
	            skipOwn      = !canDefineProperty && targetConfig.skipOwn && configOwn,
	            skipProps    = targetConfig.skipProps

	        var key
	        var valueDescriptor
	        var keyResult

	        for (key in config) if (hasOwnProperty.call(config, key)) {

	            if (skipOwn && configOwn[key]){
	                //this property should not be copied -> skip to next property
	                continue
	            }

	            if (skipProps && skipProps[key]){
	                continue
	            }

	            valueDescriptor = canGetOwnPropertyDescriptor?
	                                    getOwnPropertyDescriptor(config, key):
	                                    config[key]

	            keyResult = assignClassProperty(Class, key, valueDescriptor, targetConfig)

	            if (own){
	                result[key] = 1
	            } else {
	                if (canGetOwnPropertyDescriptor){
	                    Object.defineProperty(result, key, valueDescriptor)
	                } else {
	                    result[key] = keyResult
	                }
	            }

	        }

	        if (own){
	            Class.$own = result
	        }

	        return result
	    }

	    function overrideClass(Class, config){
	        if (typeof Class.beforeOverride == 'function'){
	            config = Class.beforeOverride(config)
	        }

	        var statics = config.statics || {}
	        var $own    = statics.$own

	        statics.$own   = null
	        config.statics = null

	        if (config.singleton){
	            prepareSingletonStatics(statics)
	        }

	        copyClassConfig( Class, config, null, Class.$initialConfig)

	        copyClassConfig( Class, statics, { proto: false })

	        if ($own){
	            copyClassConfig( Class, $own, { proto: false, own: true })
	        }
	    }

	    function overrideObject(targetObject, config){
	        copyClassConfig( targetObject, config, { proto: false })
	    }

	    return {
	        canDefineProperty: canDefineProperty,
	        extend           : extend,
	        createClass      : createClass,
	        overrideClass    : overrideClass,
	        overrideObject   : overrideObject,

	        copyClassConfig  : copyClassConfig,
	        BaseClass        : Base
	    }
	}()

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/*

	 This file is part of the ZippyUI Framework

	 Copyright (c) 2014 Radu Brehar <contact@zippyui.com>

	 The source code is distributed under the terms of the MIT license.
	 See https://github.com/zippyui/ZippyUI/blob/master/LICENCE

	 */
	module.exports = __webpack_require__(7)

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/*

	 This file is part of the ZippyUI Framework

	 Copyright (c) 2014 Radu Brehar <contact@zippyui.com>

	 The source code is distributed under the terms of the MIT license.
	 See https://github.com/zippyui/ZippyUI/blob/master/LICENCE

	 */
	module.exports = function(){

	    'use strict'

	    var core = __webpack_require__(49)

	    var FN = __webpack_require__(73)
	    var bindArgs = FN.bindArgs
	    var copyIf   = __webpack_require__(50).copyIf
	    var getClass = __webpack_require__(42)

	    var HAS_OWN   = Object.prototype.hasOwnProperty
	    var hasOwn    = function(obj, name){ return HAS_OWN.call(obj, name) }
	    var emptyFn   = function(){}
	    var mixinMeta = [ '$copyIf', '$override', '$after', '$before' ]

	    function processMixins(target){
	        var mixins = target.mixins || []

	        mixins.forEach(function(m){
	            mixinFn(target, m)
	        })
	    }

	    function prepareTarget(target){
	        if (!target.addMixin){

	            var fn = function(m){
	                mixinFn(this, m)
	            }

	            if (core.canDefineProperty){
	                Object.defineProperties(target, {
	                    addMixin: {
	                        value: fn
	                    }
	                })
	            } else {
	                target.addMixin = fn
	            }
	        }
	    }

	    function targetHasMixin(target, mixinIdentifier){
	        if (target.$mixins && ~target.$mixins.indexOf(mixinIdentifier)){
	            //mixin already applied
	            return true
	        }

	        prepareTarget(target)

	        target.$mixins = target.$mixins?
	                            [].concat(target.$mixins):
	                            []

	        target.$mixins.push(mixinIdentifier)

	        return false
	    }

	    /*
	     * For each $copyIf, $override, $before, $after, as WHEN, do the following:
	     *
	     * Iterate over source[WHEN], and for each property KEY in source[WHEN], copy source[KEY]
	     * to either target[WHEN][KEY] (if the target is given)
	     * or to source[WHEN][KEY]
	     *
	     * This function is called during the mixin process in 2 cases:
	     *
	     * 1. when the source is the mixin prototype. Since all mixin methods have been copied on the prototype, where they have been
	     * enhanced so that they can use callSuper and callOverriden; now we need to copy all needed methods to mixin.$override, to mixin.$copyIf, etc
	     *
	     * 2. when the source is the mixin class. Since all mixin methods have been copied as static methods on the class (where they have
	     * been enhanced so that they can use callSuper and callOverriden) now we need to build a statics mixin target, with the keys $override, $copyIf, etc...
	     * that are objects with key/value pairs, where the values are the functions copied from the Mixin Class.
	     *
	     */
	    function copyMetaFrom(source, target){

	        mixinMeta.forEach(function(when){
	            var mixinWhen  = source[when],
	                targetWhen = mixinWhen

	            if (mixinWhen != null){

	                if (target){
	                    targetWhen = target[when] = target[when] || {}
	                }

	                for (var key in mixinWhen) if (hasOwn(mixinWhen, key)){
	                    targetWhen[key] = source[key]
	                }
	            }
	        })

	        return target

	    }

	    /**
	     * @method mixin
	     *
	     * A mixin should be an object with $override, $before and/or $after properties:
	     *
	     * Example:
	     *     var logger = {
	     *         $override: {
	     *             log: function(message){
	     *                 console.log(message)
	     *             }
	     *         }
	     *     }
	     *
	     *      function Person(name){
	     *          this.name = name
	     *      }
	     *
	     *      Person.prototype.getName = function(){ return this.name }
	     *
	     *      var p = new Person()
	     *
	     *
	     *
	     * @param  {Object} target The mixin target
	     * @param  {Object} mixin  The object to mix into target
	     * @param  {Object} [config] Optional config for mixin.
	     * @param  {Object} [config.skipProperties] An object with properties that are not going to be mixed in.
	     * @param  {Object} [config.skipStatics] An object with properties that are not going to be mixed in.
	     */
	    function mixinFn(target, mixin, config){

	        if (arguments.length == 1){
	            mixin = target
	            target = {}
	        }

	        if (!mixin){
	            return target
	        }

	        config = config || {}

	        var MixinClass      = getClass(mixin)
	        var mixinIdentifier = config.mixinIdentifier || mixin

	        if (MixinClass){

	            if (typeof mixin == 'string'){
	                mixin = { alias: mixin }
	            }

	            if (mixin == MixinClass){
	                //the mixin is the Class, so take its prototype
	                mixin = MixinClass.prototype
	            } else {
	                copyIf(MixinClass.prototype, mixin)
	            }

	            //go over all keys from mixin.$override, $after, ... and override them with
	            //values from the mixin proto
	            copyMetaFrom(mixin)

	            mixinIdentifier = mixin.alias

	        }

	        if ( target.$ownClass && !config.skipStatics) {

	            var mixinStatics = MixinClass?
	                                    //go over all keys from MixinClass.$override, $after, ... and build a new object with $override, $after ...
	                                    //that contain the corresponding static values copied from the MixinClass
	                                    copyMetaFrom(MixinClass, {}):
	                                    mixin.statics

	            if ( mixinStatics && mixinMeta.some(function(when){ return !! mixinStatics[when] }) ) {
	                config.skipWarning = true

	                var staticsMixinIdentifier = 'statics.' + mixinIdentifier

	                //The mixin class also targets the target's Class
	                mixinFn(target.$ownClass, mixinStatics, { skipStatics: true, mixinIdentifier: staticsMixinIdentifier})
	            }
	        }

	        doMixin(target, mixin, mixinIdentifier, config)

	        return target
	    }

	    function doMixin(target, mixin, mixinIdentifier, config){
	        mixinIdentifier = mixinIdentifier || mixin.alias

	        if (! targetHasMixin(target, mixinIdentifier) ) {
	            applyMixin(target, mixin, config)
	        }
	    }

	    function prepareTargetFn(target, propName, newFn){

	        var oldTarget = target[propName],
	            targetFn  = typeof oldTarget == 'function'?
	                            oldTarget:
	                            emptyFn

	        return function(){
	            var args = arguments,
	                oldCallTarget     = this.callTarget,
	                oldCallTargetWith = this.callTargetWith

	            this.callTarget = function(){
	                return targetFn.apply(this, args)
	            }
	            this.callTargetWith = function(){
	                return targetFn.apply(this, arguments)
	            }

	            var result = newFn.apply(this, args)

	            this.callTarget = oldCallTarget
	            this.callTargetWith = oldCallTargetWith

	            return result
	        }
	    }

	    function assignFunction(when, target, propName, newFn){

	        target[propName] = when?
	                                FN[when](newFn, target[propName]):
	                                prepareTargetFn(target, propName, newFn)
	    }

	    function applyWhen(when, originalWhen, target, props, config){
	        var prop,
	            value,
	            skipProps = config? config.skipProperties: null,
	            result

	        for (prop in props) if ( hasOwn(props, prop) ){

	            if (prop == 'init'){
	                result = {
	                    when  : when,
	                    props : props
	                }

	                continue
	            }

	            if (skipProps && skipProps[prop]){
	                continue
	            }

	            value = props[prop]

	            if (originalWhen == '$copyIf'){
	                if (typeof target[prop] == 'undefined'){
	                    target[prop] = value
	                }

	                continue
	            }

	            if (typeof value == 'function'){

	                if (typeof target[prop] == 'function'){

	                    assignFunction(when, target, prop, value)

	                } else {
	                    target[prop] = value
	                }

	            } else {
	                if (!when || typeof target[prop] == 'undefined'){
	                    target[prop] = value
	                }
	            }
	        }

	        return result
	    }

	    /*
	     * Applies the mixin init method on target.
	     * The initOn property on the mixin dictates when to init the mixin.
	     *
	     * Example:
	     *
	     *      root.defineMixin({
	     *          alias: 'observable',
	     *
	     *          initOn: 'configure',
	     *
	     *          $before: {
	     *              init: function(){
	     *                  ...
	     *              }
	     *          }
	     *      })
	     *
	     *      root.define({
	     *          alias : 'computer',
	     *
	     *          mixins: [{ alias: 'observable', initOn: 'showDisplay' }],
	     *
	     *          init: function(){
	     *              // init computer properties
	     *
	     *              //then configure computer
	     *              this.configure()
	     *
	     *              //then show display
	     *              this.showDisplay()
	     *          },
	     *
	     *          //before this method is actually called, call the obserable.init method
	     *          showDisplay: function(){
	     *          }
	     *      })
	     * @param  {Object} target The target object
	     * @param  {Object} mixin The mixin object
	     * @param  {Object} [initConfig] Optional mixin application config
	     */
	    function applyInit(target, mixin, initConfig){
	        if (initConfig){
	            var init         = initConfig.props.init,
	                initWhen     = initConfig.when,
	                initOnMethod = mixin.initOn || 'init'

	            assignFunction(initWhen, target, initOnMethod, init)
	        }
	    }

	    var applyBefore   = bindArgs(applyWhen, 'before', '$before')
	    var applyAfter    = bindArgs(applyWhen, 'after' , '$after')
	    var applyCopyIf   = bindArgs(applyWhen, 'copyIf', '$copyIf')
	    var applyOverride = bindArgs(applyWhen, ''      , '$override')

	    function applyMixin(target, mixin, config){

	        target.callTarget = target.callTarget || emptyFn

	        config = config || {}

	        //<debug>
	        if (!config.skipWarning && !mixin.$before && !mixin.$after && !mixin.$override && !mixin.$copyIf){
	            console.warn('No $before, $after or $override properties on the mixin ', mixin,'. This will result in nothing being mixed in.')
	        }
	        //</debug>

	        var beforeWithInit = applyBefore  (target, mixin.$before  , config)
	        var afterWithInit  = applyAfter   (target, mixin.$after   , config)

	        applyCopyIf  (target, mixin.$copyIf  , config)

	        var overrideWithInit = applyOverride(target, mixin.$override, config)

	        applyInit(target, mixin, beforeWithInit || afterWithInit || overrideWithInit)

	    }

	    return {

	        mixin : mixinFn,

	        preprocess: function(classConfig, parent){
	        },

	        process : function(Class){
	            processMixins(Class.prototype)
	            processMixins(Class)
	        }

	    }
	}()

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var classy = __webpack_require__(23)
	var copyUtils = __webpack_require__(7)
	var functionally = __webpack_require__(19)
	var sortDescFn = function( a, b){ return b - a }
	var SLICE  = Array.prototype.slice

	/**
	 * This is a wrapper around an array of functions and offers the possibility to call them all with the same params.
	 *
	 * Example 1:
	 *
	 *      var Q = require('fn-queue')
	 *      var queue = Q()
	 *
	 *      queue.add(function logger(msg){
	 *          console.log(msg)
	 *      })
	 *      queue.add(function serverLogger(msg){
	 *          //send msg to server
	 *      })
	 *
	 *      queue.execute('application has crashed')
	 *      //this call will call both logger and serverLogger, with the string param
	 *
	 * Example 2:
	 *
	 *      var fnQueue = new Q()
	 *
	 *      fnQueue.add(function(a,b){ return a + b })
	 *             .add(function(a,b){ return a * b })
	 *
	 *
	 * Functions can also be added to the queue with different modifier options:
	 *
	 * Supported options:
	 *      * {Boolean} once  - executes the function once, then removes it from the queue. Uses Function.once
	 *      * {Boolean} defer - execute the function using Function.defer
	 *      * {Number}  delay - execute the function using Function.delay
	 *      * {Number}  buffer   - execute the function using Function.buffer
	 *      * {Number}  throttle - execute the function using Function.throttle
	 *
	 * If a function is added to the queue with one of those options, it is replaced with the modified version
	 * of the function (after applying the corresponding method from Function.prototype)
	 *
	 * There are different ways of calling the function queue (executing all the functions in the queue). Here's the complete list:
	 *
	 *      queue.execute(firstArg, secondArg, ...)
	 *
	 *      queue.call(scope, firstArg, secondArg, ...)
	 *
	 *      queue.apply(scope, [ firstArg, secondArg, ...] )
	 *
	 *      queue.applyWith(scope, [firstArg, secondArg, ... ], config)
	 *      //for the available config options see FunctionQueue.applyWith
	 *
	 *
	 */


	var FnQueue = classy.define({

	    /**
	     * @cfg {Boolean} allowFunctionsAsString By default, only functions are allowed in the FunctionQueue. Nevertheless, if you configure the queue
	     * with allowFunctionsAsStrings: true, you will be able to add strings into the queue. These are resolved to functions when the FunctionQueue is called.
	     *
	     * When the FunctionQueue gets executed, it iterates over its functions. When a string is met, it takes the context object, and looks for a
	     * property with that name, and if a function is found, it gets called.
	     *
	     * Example:
	     *     var context1 = {
	     *             sum: function(a,b){
	     *                 return a + b
	     *             }
	     *         },
	     *         context2 = {
	     *             diff: function(a,b){
	     *                 return a - b
	     *             }
	     *         }
	     *
	     *
	     *      queue.add('sum', context1)
	     *      queue.add('diff')
	     *
	     *      var results = queue.applyWith(context2, [5, 2], { allResults: true })
	     *
	     *      //results is [7, 3]
	     *      //the queue looks for 'sum' first, on the scope. 'sum' had its scope bound
	     *      //to context1, so the queue checks if a function is found at context1['sum'].
	     *      //since there is a function there, it calls it
	     *
	     *      //next comes 'diff'. the queue looks for a scope, but 'diff' was not bound to a scope.
	     *      //so we use the given scope, that is, context2. Since we find a function
	     *      //at context2['diff'], it gets called.
	     *
	     */
	    allowFunctionsAsString: false,

	    /**
	     * @cfg {Boolean} keepFunctionReferences This property dictates the behavior of the queue when functions are specified as strings.
	     * When a queue is called, the "string" functions are resolved, from the context.
	     *
	     * If keepFunctionReferences is true, the resolved functions are kept in memory and are going to be called on
	     * subsequent calls to the function queue.
	     *
	     * If keepFunctionReferences is false, "string" functions are resolved each time the queue is called.
	     */
	    keepFunctionReferences: false,

	    forceInstance: true,

	    statics: {

	        fly: (function(){
	            var fly

	            return function(config){
	                fly = fly || new FnQueue(config)

	                if (config && config.state){
	                    fly.from(config.state)
	                }

	                return fly
	            }

	        })()
	    },

	    maxLength: null,

	    init: function(config){
	        copyUtils.copy(config, this)
	        this.clear()
	    },

	    /**
	     * Modifies the queue to reflect the state as provided by the stateObject
	     *
	     * @param  {Object} stateObject An object with a queue state. This object is returned by {@link #toStateObject}
	     * @return {FunctionQueue} this
	     */
	    from: function(stateObject){
	        stateObject = stateObject || {}

	        //unmodified fns
	        this._fns    = stateObject._fns    = stateObject._fns    || []

	        this.fns     = stateObject.fns     = stateObject.fns     || []
	        this.scopes  = stateObject.scopes  = stateObject.scopes  || []
	        this.options = stateObject.options = stateObject.options || []

	        this.length  = this.fns.length

	        return this
	    },

	    /**
	     * Saves the state of the queue in an object, and returns that object
	     * @param  {Object} [stateObject] Optional. The object to use for state persistence. If none given, a new object will be passed used.
	     * @return {Object} the object with the state of the queue. If obj is given, this is the object that will be returned
	     */
	    toStateObject: function(obj){

	        if (!this.getLength()){
	            return
	        }

	        obj = obj || {}

	        obj._fns    = this._fns
	        obj.fns     = this.fns
	        obj.scopes  = this.scopes
	        obj.options = this.options

	        return obj
	    },

	    /**
	     * Clears this queue by removing all functions.
	     *
	     * After the queue is cleared, its length is 0 ( getLength() == 0 ), and it {@link #isEmpty is empty}
	     *
	     * @chainable
	     * @return {FunctionQueue} this queue
	     */
	    clear: function(){
	        return this.from()
	    },

	    /**
	     * An alias to {@link #clear}
	     * @chainable
	     *
	     * @return {FunctionQueue} this queue
	     */
	    destroy: function(){
	        this.clear()

	        delete this.fns
	        delete this._fns
	        delete this.scopes
	        delete this.options

	        return this
	    },

	    /**
	     * @return {FunctionQueue} a FunctionQueue that is a clone of this queue
	     */
	    clone: function(){
	        var queue = new FnQueue()

	        queue._fns    = this._fns.slice()
	        queue.fns     = this.fns.slice()
	        queue.scopes  = this.scopes.slice()
	        queue.options = this.options.slice()

	        queue.length = queue.fns.length
	        queue.maxLength = this.maxLength

	        return queue
	    },

	    /**
	     * Returns the count of the functions that this queue stores.
	     *
	     * @return {Number}
	     */
	    getLength: function(){
	        return this.length
	    },

	    /**
	     * Returns true if getLength() is 0
	     * @return {Boolean} True if the queue is empty, false otherwise
	     */
	    isEmpty: function(){
	        return !this.getLength()
	    },

	    /**
	     * Add a function to the queue, optionally with a scope and some options.
	     *
	     * @chainable
	     *
	     * @param {Function} fn The function to add to the queue
	     * @param {Object} [scope] Optional scope in which the function will be called when this queue is called.
	     * @param {Object} [options] Options for calling the function
	     *
	     * Available options are:
	     *      * {Boolean} once  - executes the function once, then removes it from the queue.Uses Function.once
	     *      * {Boolean} defer - execute the function using Function.defer.
	     *      * {Number}  delay - execute the function using Function.delay.
	     *      * {Number}  buffer   - execute the function using Function.buffer.
	     *      * {Number}  throttle - execute the function using Function.throttle.
	     *
	     * @return {FunctionQueue} this
	     */
	    add: function(fn, scope, options){

	        return this.insert(this.length, fn, scope, options)

	    },

	    /**
	     * Insert a function in the queue at the given index.
	     *
	     * See {@link #add} for an explanation of the parameters
	     * @param {Number} index The index at which to make the insert
	     * @param {Function} fn
	     * @param {Object} [scope]
	     * @param {Object} [options]
	     *
	     * @return {FunctionQueue} this
	     */
	    insert: function(index, fn, scope, options){

	        var usePush
	        if (index >= this.length){
	            index   = this.length
	            usePush = true
	        }

	        var isFn   = typeof fn == 'function',
	            theFn  = fn,
	            _theFn = fn,
	            result

	        if (!isFn){

	            if (!this.allowFunctionsAsString || typeof fn != 'string'){
	                return this
	            }

	        } else {
	            result = this.getModifiedFunction( fn, options ),

	            theFn  = result.fn

	            if (!result.modified){
	                _theFn = undefined
	            }
	        }

	        this._dirty = true

	        if (usePush){
	            this._fns
	                .push(_theFn)

	            this.fns
	                .push(theFn)

	            this.scopes
	                .push(scope || undefined)

	            this.options
	                .push(options)
	        } else {
	            this._fns
	                .splice(index, 0, _theFn)

	            this.fns
	                .splice(index, 0, theFn)

	            this.scopes
	                .splice(index, 0, scope || undefined)

	            this.options
	                .splice(index, 0, options)
	        }

	        this.length = this.fns.length

	        if (this.maxLength != null){
	            this.adjustLength()
	        }

	        return this
	    },

	    /**
	     * @private
	     */
	    adjustLength: function(){
	        if (this.maxLength < this.length){
	            this._fns.shift()
	            this.fns.shift()
	            this.scopes.shift()
	            this.options.shift()

	            this.length = this.fns.length
	        }
	    },

	    getModifiedFunction: function(fn, options){
	        var initialFn = fn,
	            modified  = false

	        if ( options ) {

	            if ( options.buffer != null) {
	                fn = functionally.buffer( fn, options.buffer )

	                modified = true
	            }

	            if ( options.delay != null) {
	                fn = functionally.delay( fn, options.delay )

	                modified = true
	            }

	            if ( options.defer != null) {
	                fn = functionally.defer( fn )

	                modified = true
	            }

	            if ( options.throttle != null) {
	                fn = functionally.throttle( fn, options.throttle )

	                modified = true
	            }

	        }

	        return {
	            modified: modified,
	            fn: fn
	        }
	    },

	    /**
	     * @chainable
	     * Adds a given function at the beginning of the queue.
	     * See {@link #add}
	     *
	     * @param {Function} fn
	     * @param {Object}   [scope]
	     * @param {Object}   [options]
	     * @return {FunctionQueue}
	     */
	    addStart: function(fn, scope, options){
	        return this.insert(0, fn, scope, options)
	    },

	    /**
	     * Calls this queue, that is, calls all functions stored in this queue.
	     *
	     * The signature of this method is the same as that of *Function.call*
	     *
	     * Example:
	     *
	     *      var q = new require('fn-queue')()
	     *      q.add(function add(a,b){ return a + b})
	     *      q.add(function multiply(a,b){ return a * b})
	     *
	     *      q.call(null, 4, 5)
	     *      //will call add(4,5) and multiply(4,5)
	     *
	     * @param  {Object} scope The scope in which to call the functions
	     *
	     * NOTE that if the functions already had their scope bound, when were added to the queue,
	     * that scope is used.
	     *
	     * @param {...Object} args The enumerated arguments for the functions.
	     * @return {Boolean} The result of the call. If any of the functions return the boolean false, the result will be false, otherwise, true.
	     */
	    call: function(scope /*, args... */ ){
	        return this.apply( scope, SLICE.call(arguments, 1) )
	    },

	    /**
	     * Calls this queue with the enumerated given params. Similar to {@link #call}, but without the scope param.
	     *
	     * @param {...Object} args
	     * @return {Boolean}
	     */
	    execute: function(/* args ... */ ){
	        return this.apply(undefined, arguments)
	    },

	    collect: function(/* args ... */){
	        return this.applyWith(undefined, arguments, { allResults: true })
	    },

	    /**
	     * Calls apply for each function in the queue.
	     *
	     * The signature of this method is the same as that of *Function.apply*
	     *
	     * @param {Object} scope the scope in which to call the functions.
	     *
	     * NOTE that if the functions already had their scope bound, when were added to the queue,
	     * that scope is used.
	     *
	     * If you want to override the scope, use applyWith(scope, args, { forceScope: true})
	     *
	     * @param {Array} [args] the arguments to pass to the functions when they are called
	     *
	     * @return {Boolean}
	     */
	    apply: function(scope, args){
	        return this.applyWith(scope, args)
	    },

	    /**
	     *
	     * @param {Object}   scope
	     *                    The scope in which to call the functions in the queue.
	     *
	     * NOTE that if the functions already had their scope bound, when were added to the queue,
	     * that scope is used.
	     *
	     * If you want to force using this scope, use config.forceScope
	     *
	     * @param {Array}    [args] an array with the arguments to be used when calling each function in the queue
	     * @param {Object}   [config]
	     *
	     * @param {Booolean} [config.forceScope]  If this is true, the scope in which the functions will be called
	     * will be scope - the first argument of this function, if it's not null or undefined
	     *
	     * @param {Boolean}  [config.quickStop] If this is true, and a function from the queue returns false, all the other following functions will
	     * not be executed.
	     *
	     * @param {Boolean}  [config.allResults] If this is true, return an array of all the results of the functions in the queue,
	     * instead of just a boolean value
	     *
	     * @return {Boolean/Array} If any of the functions in the queue returns the boolean false, the result of this call will be false. Otherwise, true.
	     * If config.allResults is true, return an array instead, with the results of all the functions in the queue that have been executed.
	     */
	    applyWith: function(scope, args, config){

	        this._dirty = false

	        var fns     = this.fns.slice(),
	            _fns    = this._fns.slice(),
	            scopes  = this.scopes.slice(),
	            options = this.options.slice(),

	            allowStrings = this.allowFunctionsAsString,
	            keepRefs     = this.keepFunctionReferences,

	            forceScope = config && config.forceScope,
	            quickStop  = config && config.quickStop,
	            allResults = config && config.allResults,

	            filterFn   = config && config.filter,

	            itFn,
	            itOption,
	            itScope,
	            itResult,
	            itIsFn,
	            itModifiedFnResult,

	            i   = 0,
	            len = fns.length,

	            toRemoveIndexes = [],
	            result          = true,
	            results         = allResults? []: null

	        for (; i < len; i++ ) {

	            itIsFn   = true
	            itFn     = fns    [i]
	            itScope  = scopes [i]
	            itOption = options[i]

	            if ((itScope == null || forceScope) && scope != null){
	                itScope = scope
	            }

	            if (allowStrings && typeof itFn == 'string') {

	                if ( typeof itScope[itFn] == 'function' ){

	                    itModifiedFnResult = this.getModifiedFunction(itScope[itFn], itOption)

	                    if (keepRefs && !this._dirty){
	                        _fns[i] = this._fns[i] = fns[i]
	                        fns [i] = this.fns[i]  = itModifiedFnResult.fn
	                    }

	                    itFn = itModifiedFnResult.fn
	                } else {
	                    itIsFn = false
	                }
	            }

	            if (itIsFn && filterFn && !filterFn(itFn, itScope, itOption)){
	                continue
	            }

	            if (itOption && (itOption.once === true)){
	                toRemoveIndexes.push(i)
	            }

	            if (!itIsFn){
	                continue
	            }

	            itResult = itFn.apply(itScope, args)

	            if (allResults){
	                results.push(itResult)
	            }

	            if ( itResult === false ){
	                result = false

	                if ( quickStop || (itOption && itOption.quickStop) ){
	                    break
	                }
	            }

	        }

	        if (toRemoveIndexes.length){
	            this.removeAt(toRemoveIndexes)
	        }

	        return allResults?
	                    results:
	                    result
	    },

	    forEach: function(fn, scope){

	        scope = scope || this

	        var fns     = this.fns,
	            scopes  = this.scopes,
	            options = this.options,

	            itFn,
	            itScope,
	            itOption,

	            i   = 0,
	            len = fns.length

	        for (; i < len; i++ ) {

	            itFn     = fns    [i]
	            itScope  = scopes [i]
	            itOption = options[i]

	            if (fn.call(scope, itFn, itScope, itOption, i) === false){
	                break
	            }
	        }
	    },

	    /**
	     * Remove the given function from the queue, optionally taking the scope into account.
	     *
	     * @param  {Function} fn The function to remove
	     * @param  {Object} [scope] The scope in which the function was bound. If you specify the scope, and
	     * a function is found to be equal to the given fn, but the scope is not the same, it will not be removed.
	     * Otherwise, it you skip the scope, all functions in the queue that equal the given fn are removed, no matter the scope.
	     *
	     * @return {z.fnqueue} this
	     */
	    remove: function(fn, scope){
	        var fns             = this.fns,
	            _fns            = this._fns,
	            scopes          = this.scopes,
	            scopeDefined    = scope != null,
	            toRemoveIndexes = []

	        fns.forEach(function(itFn, index, allFns){
	            var _itFn       = _fns[index],
	                fnsAreEqual = (fn == itFn || fn == _itFn)

	            if ( fnsAreEqual && (!scopeDefined || scopes[index] === scope) ){
	                toRemoveIndexes.push(index)
	            }

	        })

	        if (toRemoveIndexes.length){
	            this.removeAt(toRemoveIndexes)
	        }

	        return this
	    },

	    removeAt: function(indexOrArray){

	        this._dirty = true

	        var indexes = Array.isArray(indexOrArray)?
	                      indexOrArray :
	                      [ indexOrArray ],
	            i = 0,
	            it,
	            len = indexes.length

	        indexes.sort(sortDescFn)

	        for (; i<len ; i++ ){
	            it = indexes[i]

	            this._fns
	                .splice(it, 1)

	            this.fns
	                .splice(it, 1)

	            this.options
	                .splice(it, 1)

	            this.scopes
	                .splice(it, 1)
	        }

	        this.length = this.fns.length

	        return this
	    }
	})

	//<debug>
	FnQueue.displayName = 'FunctionQueue'
	FnQueue.constructor.displayName = 'FunctionQueue'
	//</debug>

	module.exports = FnQueue


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var FunctionQueue = __webpack_require__(52)

	var Q = new FunctionQueue({
	    allowFunctionsAsString: true,
	    keepFunctionReferences: true
	})

	module.exports = function(fn, stateName, QUEUE){

	    QUEUE = QUEUE || Q

	    this[stateName] = this[stateName] || {}

	    var prevQueueState = QUEUE.toStateObject()

	    if (fn){
	        fn.call(this, this[stateName], QUEUE)
	    }

	    //restore the queue back to its original state
	    QUEUE.from(prevQueueState)

	    return this
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return !isNaN( parseFloat( value ) ) && isFinite( value )
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return typeof value === 'number' && isFinite(value)
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var number = __webpack_require__(55)

	module.exports = function(value){
	    return number(value) && (value === parseInt(value, 10))
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var number = __webpack_require__(55)

	module.exports = function(value){
	    return number(value) && (value === parseFloat(value, 10)) && !(value === parseInt(value, 10))
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return typeof value == 'string'
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(value){
	    return objectToString.apply(value) === '[object Function]'
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(value){
	    return objectToString.apply(value) === '[object Object]'
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(value){
	    return objectToString.apply(value) === '[object Arguments]' || !!value.callee
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return typeof value == 'boolean'
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(value){
	    return objectToString.apply(value) === '[object Date]'
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(value){
	    return objectToString.apply(value) === '[object RegExp]'
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return Array.isArray(value)
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var copyKeys = __webpack_require__(50).copyKeys

	function aliasMethods(config){
	    //this refers to a class
	    copyKeys(this.prototype, this.prototype, config)
	    
	    return this
	}

	var extendClass     = __webpack_require__(76)
	var overrideClass   = __webpack_require__(77)
	var unregisterClass = __webpack_require__(78)

	var ClassProcessor = __webpack_require__(67)

	module.exports = function(Class){

	    'use strict'

	    Class.extend       = extendClass
	    Class.override     = overrideClass
	    Class.aliasMethods = aliasMethods

	    if (typeof Class.destroy == 'function'){
	        var classDestroy = Class.destroy

	        Class.destroy = function(){
	            classDestroy.call(this)
	            unregisterClass.call(this)
	        }
	    } else {
	        Class.destroy = unregisterClass
	    }

	    ClassProcessor.process(Class)

	    if (Class.init){
	        Class.init()
	    }
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/*

	 This file is part of the ZippyUI Framework

	 Copyright (c) 2014 Radu Brehar <contact@zippyui.com>

	 The source code is distributed under the terms of the MIT license.
	 See https://github.com/zippyui/ZippyUI/blob/master/LICENCE

	 */
	module.exports = function(){

	    'use strict'

	    var attached = []

	    var result = {

	        attach: function(fn){
	            attached.push(fn)
	        },

	        preprocess: function(classConfig, parent){
	            attached.forEach(function(processor){
	                processor.preprocess && processor.preprocess(classConfig, parent)
	            })
	        },

	        process: function(Class){
	            attached.forEach(function(processor){
	                processor.process(Class)
	            })
	            return Class
	        }
	    }

	    result.attach(__webpack_require__(51))

	    return result
	}()

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){

	    'use strict'

	    var Class = function(){}

	    return function(parent, child){

	        Class.prototype = parent.prototype

	        //set the prototype
	        child.prototype = new Class()

	        //restore the constructor
	        child.prototype.constructor = child

	        //set-up $ownClass and $superClass both on proto and on the returned fn
	        child.prototype.$ownClass   = child
	        child.prototype.$superClass = parent
	        child.$ownClass   = child
	        child.$superClass = parent

	        return child
	    }
	}()

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = (function(){
	    var o = {}

	    try {
	        Object.defineProperty(o, 'name', {
	            value: 'x'
	        })

	        return true
	    } catch (ex) { }

	    return false

	})()

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = (function(){
	    return 'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor == 'function'
	})()

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var canGetOwnPropertyDescriptor = __webpack_require__(70)

	function copy(source, target){
	    Object.getOwnPropertyNames(source).forEach(function(name){
	        var sourceDescriptor = Object.getOwnPropertyDescriptor(source, name)

	        if (!sourceDescriptor.get && !sourceDescriptor.set){
	            //dont copy non getters/setters, since this is handled by prototype inheritance
	            return
	        }

	        Object.defineProperty(target, name, sourceDescriptor)
	    })
	}

	module.exports = canGetOwnPropertyDescriptor? copy: function(){}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var copy = __webpack_require__(50).copy
	var modifyFn = __webpack_require__(79)

	var canDefineProperty           = __webpack_require__(69)
	var canGetOwnPropertyDescriptor = __webpack_require__(70)

	var assignClassProperty = function(Class, propName, propDescriptor, config){

	    var target      = config.proto?
	                        Class.prototype:
	                        Class

	    var superClass  = Class.$superClass
	    var superTarget = superClass?
	                        config.proto?
	                            superClass.prototype:
	                            superClass
	                        :
	                        undefined

	    var own = config.own
	    var targetPropDescriptor

	    if (canGetOwnPropertyDescriptor && (propDescriptor.get === undefined || propDescriptor.set == undefined)){
	        targetPropDescriptor = Object.getOwnPropertyDescriptor(target, propName)

	        if (targetPropDescriptor && propDescriptor.get === undefined && targetPropDescriptor.get !== undefined){
	            propDescriptor.get = targetPropDescriptor.get
	        }
	        if (targetPropDescriptor && propDescriptor.set === undefined && targetPropDescriptor.set !== undefined){
	            propDescriptor.set = targetPropDescriptor.set
	        }
	    }

	    var getterOrSetter = propDescriptor.get || propDescriptor.set
	    var newPropDescriptor
	    var propValue

	    if (getterOrSetter){
	        newPropDescriptor = copy(propDescriptor)

	        if (propDescriptor.get !== undefined){
	            newPropDescriptor.get = modifyFn(propName, propDescriptor.get, superTarget, superClass, target, { getter: true })
	        }
	        if (propDescriptor.set !== undefined){
	            newPropDescriptor.set = modifyFn(propName, propDescriptor.set, superTarget, superClass, target, { setter: true })
	        }
	        propDescriptor = newPropDescriptor
	    } else {
	        propValue = propDescriptor.value

	        if (typeof propValue == 'function'){

	            propValue = modifyFn(propName, propValue, superTarget, superClass, target)
	        }
	    }

	    if (own){
	        if (canDefineProperty){
	            Object.defineProperty(target, propName, {
	                value      : propValue,
	                enumerable : false
	            })
	        } else {
	            target[propName] = propValue
	        }
	    } else {

	        if (getterOrSetter){
	            Object.defineProperty(target, propName, propDescriptor)
	        } else {
	            target[propName] = propValue
	        }
	    }

	    return propValue
	}

	module.exports = assignClassProperty

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){

	    var SLICE = Array.prototype.slice

	    function bindArgsArray(fn, args){
	        return function(){
	            var thisArgs = SLICE.call(args || [])

	            if (arguments.length){
	                thisArgs.push.apply(thisArgs, arguments)
	            }

	            return fn.apply(this, thisArgs)
	        }
	    }

	    function bindArgs(fn){
	        return bindArgsArray(fn, SLICE.call(arguments,1))
	    }

	    function chain(where, fn, secondFn){
	        var fns = [
	            where === 'before'? secondFn: fn,
	            where !== 'before'? secondFn: fn
	        ]

	        return function(){
	            if (where === 'before'){
	                secondFn.apply(this, arguments)
	            }

	            var result = fn.apply(this, arguments)

	            if (where !== 'before'){
	                secondFn.apply(this, arguments)
	            }

	            return result
	        }
	    }

	    function before(fn, otherFn){
	        return chain('before', otherFn, fn)
	    }

	    function after(fn, otherFn){
	        return chain('after', otherFn, fn)
	    }

	    return {
	        before: before,
	        after: after,
	        bindArgs: bindArgs,
	        bindArgsArray: bindArgsArray
	    }
	}()

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var getInstantiatorFunction = __webpack_require__(80)

	module.exports = function(fn, args){
		return getInstantiatorFunction(args.length)(fn, args)
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var getInstantiatorFunction = __webpack_require__(81)

	module.exports = function(fn, args){
		return getInstantiatorFunction(args.length)(fn, args)
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = function(config){

	    'use strict'

	    var define = __webpack_require__(40)

	    //this refers to a Class

	    config = config || {}
	    config.extend = config.extend || this.prototype.alias

	    return define(config)
	}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(config){

	    'use strict'

	    //this refers to a Class
	    return __webpack_require__(49).overrideClass(this, config)
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var REGISTRY = __webpack_require__(43)

	module.exports = function unregisterClass(){

	    'use strict'

	    //this refers to a Class

	    var alias = this.prototype.alias
	    REGISTRY[alias] = null

	    delete REGISTRY[alias]
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var callSuperRe     = /\bcallSuper|callSuperWith\b/
	var callOverridenRe = /\bcallOverriden|callOverridenWith\b/

	var ClassFunctionBuilder = __webpack_require__(82)
	var buildSuperFn         = ClassFunctionBuilder.buildSuperFn
	var buildOverridenFn     = ClassFunctionBuilder.buildOverridenFn

	var emptyObject = {}

	function modify(name, fn, superTarget, superClass, target, getterSetterConfig){
	    var hasCallSuper     = callSuperRe.test    (fn)
	    var hasCallOverriden = callOverridenRe.test(fn)

	    getterSetterConfig = getterSetterConfig || {}

	    if ( hasCallSuper ){
	        fn = buildSuperFn(name, fn, superTarget, superClass, getterSetterConfig)
	    }

	    if ( hasCallOverriden ){
	        fn = buildOverridenFn(name, fn, target, getterSetterConfig)
	    }

	    return fn
	}

	module.exports = modify

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){

	    'use strict';

	    var fns = {}

	    return function(len){

	        if ( ! fns [len ] ) {

	            var args = []
	            var i    = 0

	            for (; i < len; i++ ) {
	                args.push( 'a[' + i + ']')
	            }

	            fns[len] = new Function(
	                            'c',
	                            'a',
	                            'return new c(' + args.join(',') + ')'
	                        )
	        }

	        return fns[len]
	    }

	}()

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){

	    'use strict';

	    var fns = {}

	    return function(len){

	        if ( ! fns [len ] ) {

	            var args = []
	            var i    = 0

	            for (; i < len; i++ ) {
	                args.push( 'a[' + i + ']')
	            }

	            fns[len] = new Function(
	                            'c',
	                            'a',
	                            'return new c(' + args.join(',') + ')'
	                        )
	        }

	        return fns[len]
	    }

	}()

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){

	    'use strict'

	    var emptyFn = function(){}
	    var getDescriptor = Object.getOwnPropertyDescriptor

	    function buildSuperFn(name, fn, superHost, superClass, getterSetterConfig){

	        function execute(args){

	            var accessor = getterSetterConfig.getter?
	                                'get':
	                                getterSetterConfig.setter?
	                                    'set':
	                                    null
	            var descriptor = accessor?
	                                getDescriptor(superHost, name):
	                                null

	            var fn   = accessor?
	                            descriptor? descriptor[accessor]: null
	                            :
	                            superHost[name]


	            var isFn = typeof fn == 'function'

	            if (!isFn && name == 'init'){
	                //if the superClass is not from the classy registry,
	                //it means it is a simple function and we accept those as well
	                if (!superClass.$superClass){
	                    fn   = superClass
	                    isFn = true
	                }
	            }

	            if (isFn){
	                return fn.apply(this, args)
	            }
	        }

	        return function() {
	            var tmpSuper     = this.callSuper
	            var tmpSuperWith = this.callSuperWith
	            var args         = arguments

	            /*
	             * Use callSuperWith method in order to pass in different parameter values from those that have been used
	             * @param argumentsPassed
	             * @return {Mixed} the result of the super method
	             */
	            this.callSuperWith = function(){
	                return execute.call(this, arguments)
	            }

	            /*
	             * Use the callSuper method to call the super method and pass the arguments array
	             * Example usage:
	             *      setName: function(name){
	             *          this.callSuper() //you don't have to explicitly pass 'arguments', since it automagically does so :)
	             *      }
	             * @return {Mixed} the result of the super method
	             */
	            this.callSuper = function(){
	                return execute.call(this, args)
	            }

	            var ret = fn.apply(this, args)

	            this.callSuper     = tmpSuper
	            this.callSuperWith = tmpSuperWith

	            return ret
	        }
	    }

	    function buildOverridenFn(name, currentFn, host, getterSetterConfig){

	        var accessor = getterSetterConfig.getter?
	                            'get':
	                            getterSetterConfig.setter?
	                                'set':
	                                null

	        var descriptor = accessor?
	                            getDescriptor(host, name):
	                            null

	        var overridenFn = accessor?
	                            descriptor? descriptor[accessor]: null
	                            :
	                            host[name]

	        if (typeof overridenFn == 'undefined') {
	            //this check is needed for the following scenario - if a method is overriden, and it also calls
	            //to callOverriden, but has no method to override (so is the first in the override chain)

	            //in this case, currentFn calls to callOverriden, and will later be also overriden.
	            //so on the callStack, when currentFn is called in the context of another function,
	            //callOverriden will still be bound, and currentFn will call it, while it should be a no-op

	            //so in order to avoid all this scenario
	            //just make sure we have one more method in the override chain (the base overriden method)
	            //and that this method is the empty function
	            overridenFn = emptyFn
	        }

	        return function() {
	            var tmpOverriden     = this.callOverriden,
	                tmpOverridenWith = this.callOverridenWith,
	                args             = arguments

	            /*
	             * Use callOverridenWith method in order to pass in different parameter values from those that have been used
	             * @return {Mixed} the result of the overriden method
	             */
	            this.callOverridenWith = function(){
	                return overridenFn.apply(this, arguments)
	            }

	            /*
	             * Use the callOverriden method to call the overriden method and pass the arguments array
	             * Example usage:
	             *      setName: function(name){
	             *          this.callOverriden() //you don't have to explicitly pass 'arguments', since it automagically does so :)
	             *      }
	             * @return {Mixed} the result of the overriden method
	             */
	            this.callOverriden = function(){
	                return overridenFn.apply(this, args)
	            }

	            var ret = currentFn.apply(this, args)

	            this.callOverriden     = tmpOverriden
	            this.callOverridenWith = tmpOverridenWith

	            return ret
	        }
	    }

	    return {
	        buildSuperFn     : buildSuperFn,
	        buildOverridenFn : buildOverridenFn
	    }
	}()

/***/ }
/******/ ])
});
