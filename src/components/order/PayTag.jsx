import React from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

export default class PayTag extends React.Component{
	state = { checked: true };
  	handleChange = (checked) => {
    	this.setState({ checked });
  	}
  	render() {
	    return <CheckableTag color="#f00" {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
  	}
}