import React from 'react';
import { Component } from 'react';

class Circle extends Component {

    render() {
        const { x, y, radius, color } = this.props;
        return (
            <circle cx={x} cy={y} r={radius} fill={color}/>
        )
    }
}

class Rectangle extends Component {

    render() {
        const { x, y, w, h, color } = this.props;
        return (
            <rect x={x} y={y} width={w} height={h} fill={color} />
        )
    }
}

class Polygon extends Component {

    render() {
        const { points, color } = this.props;
        return (
            <polygon points={points} fill={color} />
        )
    }
}

export { Rectangle, Circle, Polygon };