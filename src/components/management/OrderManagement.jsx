import React from 'react';
import { Table, Icon, Switch, Radio, Form, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {connect} from 'react-redux';
import ManageTag from './ManageTag';
import {
    getOrder,
    updateOrder,
} from '../../action/orderManagement';
import {timeFormat} from '../../utils/index';
const FormItem = Form.Item;

@connect(state=>({
  orderManagement: state.orderManagement,
}))

class OrderManagememt extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  }

	componentDidMount(){
    this.getUserList();
  }
  getUserList(){
    this.props.dispatch(getOrder({
      shopid: JSON.parse(localStorage.getItem('loginMessage')).shopid,
      action: 'getOrder',
    })).then(() => {
      if(!!this.props.orderManagement.data){
        this.setState({
          data: this.props.orderManagement.data.array,
        });
      }
    });
  }
  /*点击图标修改激活状态*/
  handleUpdateIsActiveOk(record){
    // record.isActive = record.isActive-0;
    console.log(!!record.isActive);
    this.props.dispatch(updateOrder({
      isActive:record.isActive?0:1,
      orderId:record.orderid,
      action: "updateOrder",
    })).then(()=>{
      if(this.props.orderManagement.data==='SUCCESS!'){
        message.success('状态修改成功！');
        this.getUserList();
      }
    })
  }

	render() {
  	const state = this.state;
    const columns = [{
      title: '序号',
      dataIndex: 'num',
    },{
      title: '用户名',
      dataIndex: 'userName',
    }, {
      title: '用户电话',
      dataIndex: 'userTelephone',
    }, {
      title: '用户地址',
      dataIndex: 'userAddress',
    },{
      title: '餐名',
      dataIndex: 'foodName',
    }, {
      title: '数量',
      dataIndex: 'foodNumber',
    },{
      title: '状态',
      dataIndex: 'isActive',
      render:(text,record)=>(
        <div onClick={this.handleUpdateIsActiveOk.bind(this,record)} >
          <Icon type={record.isActive? "check-circle":"close-circle"} 
          style={{fontSize:18,color:record.isActive? "#87d068":"#f56a00"}}/>
          <ManageTag isActive={record.isActive} />
        </div>)
    },{
      title: '下单时间',
      dataIndex: 'orderTime',
      // render:(text)=>(timeFormat(text/1000))
    }];
    let Data = this.state.data;
    let dataSource;
    if(!Data){
      dataSource = null;
    }else{
      dataSource=Data.map((item,index)=>{
        return {
          ...item,
          num:index+1,
          key:item.orderid,
          userName: item.cname,
          userTelephone: item.phone,
          userAddress: item.address,
          foodName: item.mealname,
          foodNumber: item.number,
          isActive: item.status-0,
          orderTime: item.ortime,
        }
      });
    }
  	return (
  		<div>
  			<BreadcrumbCustom first="订餐管理" />
    		<Table size="middle" style={{marginTop:'10px'}}  columns={columns} dataSource={dataSource} />
  		</div>
  	);
	}
}

export default OrderManagememt