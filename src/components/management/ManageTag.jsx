import React from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

export default class ManageTag extends React.Component{
	state = { checked: true };
  	handleChange = (checked) => {
    	this.setState({ checked });
  	}
  	render() {
	    return (
	    	<CheckableTag color="#f00" {...this.props} checked={this.state.checked} onChange={this.handleChange} >
	    	    {this.state.checked?'未处理订单':'已处理订单'}
    	    </CheckableTag>
	    );
  	}
}