'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var Region = require('region');
var assign = require('object-assign');
var fromRatio = require('./utils/color').fromRatio;
var common = require('./utils/common');

var VALIDATE = require('./utils/validate');

exports['default'] = React.createClass(assign({

    displayName: 'SaturationSpectrum',

    getDefaultProps: function getDefaultProps() {
        return {
            height: 300,
            width: 300,
            pointerSize: 7,
            defaultColor: require('./defaultColor')
        };
    },

    getInitialState: function getInitialState() {
        return {
            pointerTop: null,
            pointerLeft: null
        };
    },

    componentDidUpdate: function componentDidUpdate() {},

    componentDidMount: function componentDidMount() {
        this.updateDragPositionIf();
    },

    updateDragPositionIf: function updateDragPositionIf() {
        if (!this.props.height || !this.props.width) {
            this.setState({});
        }
    },

    getDragPosition: function getDragPosition(hsv) {
        hsv = hsv || this.hsv;

        var width = this.props.width;
        var height = this.props.height;
        var sizeDefined = width && height;

        if (!sizeDefined && !this.isMounted()) {
            return null;
        }

        var region;

        if (!sizeDefined) {
            region = Region.fromDOM(this.getDOMNode());
            height = height || region.getHeight();
            width = width || region.getWidth();
        }

        var x = hsv.s * width;
        var y = height - hsv.v * height;
        var size = this.props.pointerSize;
        var diff = Math.floor(size / 2);

        if (this.props.value && this.state.mouseDown) {
            x = this.state.mouseDown.x;
        }

        return {
            left: x - diff,
            top: y - diff
        };
    },

    prepareBackgroundColor: function prepareBackgroundColor(color) {
        var hsv = color;

        var col = fromRatio({
            h: hsv.h % 360 / 360,
            s: 1,
            v: 1
        });

        return col.toRgbString();
    },

    prepareProps: function prepareProps(thisProps, state) {
        var props = assign({}, thisProps);

        var color = state.value || props.value || props.defaultValue || props.defaultColor;

        props.color = color;

        this.hsv = this.toColorValue(color);

        props.style = this.prepareStyle(props);
        props.className = this.prepareClassName(props);

        return props;
    },

    prepareClassName: function prepareClassName(props) {
        var className = props.className || '';

        className += ' cp-saturation-spectrum';

        return className;
    },

    prepareStyle: function prepareStyle(props) {
        var style = props.style || {};

        if (props.height) {
            style.height = props.height;
        }
        if (props.width) {
            style.width = props.width;
        }

        style.backgroundColor = this.prepareBackgroundColor(this.hsv);

        return style;
    },

    render: function render() {

        var props = this.p = this.prepareProps(this.props, this.state);

        var dragStyle = {
            width: this.props.pointerSize,
            height: this.props.pointerSize
        };

        var dragPos = this.getDragPosition();

        if (dragPos) {
            dragStyle.top = dragPos.top;
            dragStyle.left = dragPos.left;
            dragStyle.display = 'block';
        }

        return React.createElement(
            'div',
            { className: props.className, style: props.style, onMouseDown: this.onMouseDown },
            React.createElement(
                'div',
                { className: 'cp-saturation-white' },
                React.createElement('div', { className: 'cp-saturation-black' })
            ),
            React.createElement(
                'div',
                { className: 'cp-saturation-drag', style: dragStyle },
                React.createElement('div', { className: 'inner' })
            )
        );
    },

    getSaturationForPoint: function getSaturationForPoint(point) {
        return point.x / point.width;
    },

    getColorValueForPoint: function getColorValueForPoint(point) {
        return (point.height - point.y) / point.height;
    },

    updateColor: function updateColor(point) {
        point = VALIDATE(point);

        this.hsv.s = this.getSaturationForPoint(point);
        this.hsv.v = this.getColorValueForPoint(point);
    },

    toStringValue: require('./utils/toStringValue')
}, common));
module.exports = exports['default'];

// this.updateDragPositionIf()