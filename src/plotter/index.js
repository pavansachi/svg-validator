import React from 'react';
import { Component } from 'react';
import { COLORS, SHAPES } from './constants';
import {Circle, Rectangle, Polygon} from './Shape';
import validator from './validator';
import './index.css';

export default class Plotter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shapes: [],
            errors: []
        };
        this.draw = this.draw.bind(this);
    }

    draw(e) {
        const value = e.target.value;
        const inputs = value.split('\n');

        const shapes = [];
        let errors = [];

        for (let index=0; index< inputs.length; index++) {

            // determine the type
            const type = (inputs[index].charAt(0)).toLowerCase();
            const line = inputs[index];

            // supported types
            if (SHAPES.includes(type)) {
                let color = COLORS[Math.floor((Math.random() * COLORS.length) + 0)];
                let args = [];

                let input = line.substring(2, line.length);
                args = validator.getShape(type, input);

                if (type === 'c') {
                    if (!!!args) {
                        errors = [...errors, `Line ${index+1} : Circle format C <CX Coordinate> <CY Coordinate> <Radius>`]
                    }
                    else {
                        shapes.push(<Circle x={args[0]} y={args[1]} radius={args[2]} color={color} />);
                    }
                }
                else if (type === 'r') {
                    if (!!!args) {
                        errors = [...errors, `Line ${index+1} : Rectangle format R <X Coordinate> <Y Coordinate> <Width> <Height>`]
                    }
                    else {
                        shapes.push(<Rectangle x={args[0]} y={args[1]} w={args[2]} h={args[3]} color={color} />);
                    }
                }
                else if (type === 'p') {
                    if (!!!args) {
                        errors = [...errors, `Line ${index+1}  : Polygon format P <X1,Y1> <X2,Y2> <X3,Y3> ..... <Xn,Yn>`]
                    }
                    else {
                        shapes.push(<Polygon points={args[0]} color={color} />);
                    }
                }
            }
            else {
                errors = [...errors, `Line ${index+1} : unsupported type [${type}]`]  
            }
        }
        this.setState({...this.state, shapes: shapes, errors: errors });
    }

    render() {
        const shapes = this.state.shapes || [];
        const errors = this.state.errors || [];
        return (
            <div className="container">
                <div className="input">
                    <p>Command :</p>
                    <textarea rows="3" cols="30" onChange={this.draw} />
                </div>
                <div>
                    <p>Palette :</p>
                    <svg style={{ border: '1px solid black' }} width="250" height="250" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            {shapes.map((shape) => (
                                shape
                            ))}
                        </g>
                    </svg>
                </div>
                <div>
                    <p>Errors</p>
                    <ul className="error">
                        {errors.map((err) => (
                            <li>{err}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}