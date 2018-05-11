import React from 'react';
import { Tag, message } from 'antd';
const { CheckableTag } = Tag;

export default class MyTag extends React.Component{
  state = {
      checked: 0,
    }
  handleChange = (checked) => {
    if(this.props.isActive == 0)
      this.setState({ checked: 0 });
    if(this.props.isActive == 1)
      this.setState({ checked: 1 });
  }
	render() {
    return (
    	<CheckableTag color="#f00" {...this.props} checked={this.state.checked} onChange={this.handleChange} >
    		{this.state.checked?'已定餐':'选中订餐'}
    	</CheckableTag>
  	);
	}
}