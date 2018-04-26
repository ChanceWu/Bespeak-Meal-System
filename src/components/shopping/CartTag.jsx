import React from 'react';
import { Tag, message } from 'antd';
const { CheckableTag } = Tag;

export default class MyTag extends React.Component{
	state = { checked: true };
  	handleChange = (checked) => {
    	this.setState({ checked });
    	if(!checked){
    		message.info("已经清除该订单");
    	}
  	}
  	render() {
	    return (
	    	<CheckableTag color="#f00" {...this.props} checked={this.state.checked} onChange={this.handleChange} >
	    		清除订单
	    	</CheckableTag>
    	);
  	}
}