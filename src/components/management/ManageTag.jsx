import React from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

export default class ManageTag extends React.Component{
	state = { checked: this.props.isActive==0?true:false };
  	handleChange = (checked) => {
    	this.setState({ checked });
  	}
  	render() {
      let Status = ["未处理订单","已处理订单","已完成"];
	    return (
	    	<CheckableTag color="#f00" {...this.props} checked={this.state.checked} onChange={this.handleChange} >
	    	    {Status[this.props.isActive]}
    	    </CheckableTag>
	    );
  	}
}