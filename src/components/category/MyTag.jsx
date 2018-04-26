import React from 'react';
import { Tag, message } from 'antd';
const { CheckableTag } = Tag;

export default class MyTag extends React.Component{
	state = { checked: false };
  	handleChange = (checked) => {
    	this.setState({ checked });
    	if(checked){
    		message.info('订单已经加入我的购物车，请前往确认订单吧！');
    	}
  	}
  	render() {
	    return (
	    	<CheckableTag color="#f00" {...this.props} checked={this.state.checked} onChange={this.handleChange} >
	    		选中订餐
	    	</CheckableTag>
    	);
  	}
}