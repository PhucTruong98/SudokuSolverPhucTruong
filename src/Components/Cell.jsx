import { Component } from "react";
import React from "react";
import { FormControl } from "react-bootstrap";


export default class Cell extends Component {

    constructor(props)
    {
      super(props);
      this.state = {};
    }
  
  render()
  {
      return (
        <FormControl
        className="square"
        id={this.props.id}
        type="text"
        value={this.props.value}
        onChange={(e) => this.props.onChange(e, this.props.id)}
        disabled={this.props.disabled}
        maxLength="1"
        style={this.props.style}
        >
          
        </FormControl>
      );
  }
  
  }