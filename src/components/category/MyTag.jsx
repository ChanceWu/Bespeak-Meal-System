import React from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

export default class MyTag extends React.Component{
	state = { checked: false };
  	handleChange = (checked) => {
    	this.setState({ checked });
  	}
  	render() {
	    return <CheckableTag color="#f00" {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
  	}
}