'use strict';

var React = require('react');
var Region = require('region');
var assign = require('object-assign');
var common = require('./utils/common');

var VALIDATE = require('./utils/validate');

module.exports = React.createClass(assign({

    displayName: 'HueSpectrum',

    getDefaultProps: function getDefaultProps() {
        return {
            height: 300,
            width: 30,
            pointerSize: 3,
            defaultColor: require('./defaultColor')
        };
    },

    getInitialState: function getInitialState() {
        return {
            h: 0
        };
    },

    componentDidUpdate: function componentDidUpdate() {
        // this.updateDragPositionIf()
    },

    componentDidMount: function componentDidMount() {
        this.updateDragPositionIf();
    },

    updateDragPositionIf: function updateDragPositionIf() {

        if (!this.props.height) {
            this.setState({});
        }
    },

    render: function render() {
        this.hsv = this.toColorValue(this.state.value || this.props.value || this.props.defaultValue || this.props.defaultColor);
        // console.log('hue:', this.hsv)

        if (this.state.h == 360 && !this.hsv.h) {
            //in order to show bottom red as well on drag
            this.hsv.h = 360;
        }

        var style = assign({}, this.props.style);

        if (this.props.height) {
            style.height = this.props.height;
        }
        if (this.props.width) {
            style.width = this.props.width;
        }

        var dragStyle = {
            height: this.props.pointerSize
        };

        var dragPos = this.getDragPosition();

        if (dragPos != null) {
            dragStyle.top = dragPos;
            dragStyle.display = 'block';
        }
        return React.createElement(
            'div',
            { className: 'cp-hue-spectrum', style: style, onMouseDown: this.onMouseDown },
            React.createElement(
                'div',
                { className: 'cp-hue-drag', style: dragStyle },
                React.createElement('div', { className: 'inner' })
            )
        );
    },

    getDragPosition: function getDragPosition(hsv) {
        hsv = hsv || this.hsv;

        if (!this.props.height && !this.isMounted()) {
            return null;
        }

        var height = this.props.height || Region.fromDOM(this.getDOMNode()).getHeight();
        var size = this.props.pointerSize;

        var pos = Math.round(hsv.h * height / 360);
        var diff = Math.round(size / 2);

        return pos - diff;
    },

    updateColor: function updateColor(point) {
        point = VALIDATE(point);

        this.hsv.h = point.y * 360 / point.height;

        if (this.hsv.h != 0) {
            this.state.h = this.hsv.h;
        }

        this.state.h = this.hsv.h != 0 ? this.hsv.h : 0;
    },

    toStringValue: require('./utils/toStringValue')
}, common));