import React from 'react';
import { Table, Icon, Switch, Radio, Form,message,Col,Button,Row,Tooltip } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {connect} from 'react-redux';
import PayTag from './PayTag';
import {
    getUserDishes,
} from '../../action/dishManagement';
import {
    deleteOrder,
    updateOrder,
} from '../../action/orderManagement';
const FormItem = Form.Item;

@connect(state=>({
  dishManagement: state.dishManagement,
}))
@connect(state=>({
  orderManagement: state.orderManagement,
}))

class NewOrder extends React.Component {
  	constructor(props) {
      super(props);
      this.state = {
        data: '',
        selectedKeys: [],
        isActive: false,
      }
    }

    componentDidMount(){
      this.getUserDishesList();
    }
    getUserDishesList(){
      this.props.dispatch(getUserDishes({
        userid: JSON.parse(localStorage.getItem('loginMessage')).id,
        action: 'getUserDishes',
      })).then(() => {
        console.log('this.props.getuserdishes');
        console.log(this.props.dishManagement.data);
        if(!!this.props.dishManagement.data){
          this.setState({
            data: this.props.dishManagement.data.array,
          });
        }
      });
    }
    delete() {
    
      if (!this.state.selectedKeys.length) {
        message.warning("请选择！");
        return;
      }
      this.props.dispatch(deleteOrder({
        id: this.state.selectedKeys,
        action: "deleteOrder",
      })).then(() => {
        console.log('this.props.orderManagement.data');
        console.log(this.props.orderManagement.data);
        if (this.props.orderManagement.data == 'SUCCESS!') {
          message.success('删除餐品成功!');
          
          this.getUserDishesList();
        } else {
          message.error("删除餐品失败！");
        }
      });
      this.setState({
          ...this.state,
          selectedKeys: '',
      });
    }
    makeSureOrder(record) {
      console.log('record222');
      console.log(record.status);
      if(record.status!="未处理"){
        this.props.dispatch(updateOrder({
          status:2,
          orderId:record.id,
          action: "updateOrder",
        })).then(()=>{
          if(this.props.orderManagement.data==='SUCCESS!'){
            message.success('状态修改成功！');
            this.getUserDishesList();
          }
        });
        this.setState({
          isActive: true,
        });
      }
    };

  	render() {
      const rowSelection = {
        onChange: function(selectedRowKeys, selectedRows) {
          console.log('selectedRowKeys');
          console.log(selectedRowKeys);
          this.setState({
            ...this.state,
            selectedKeys: selectedRowKeys.join(','),
          });
        }.bind(this),
      };
      const columns = [{
        title: '序号',
        dataIndex: 'num',
      },{
        title: '菜品名称',
        dataIndex: 'foodName',
      }, {
        title: '饭店名称',
        dataIndex: 'shopName',
      }, {
        title: '餐品价格',
        dataIndex: 'price',
      }, {
        title: '订餐数量',
        dataIndex: 'foodNumber',
      },{
        title: '订餐状态',
        dataIndex: 'status',
      }, {
        title: '下单时间',
        dataIndex: 'orderTime',
      }, {
        title: '操作',
        dataIndex: 'id',
        render: (text, record) => {
            return (
              <Tooltip title="确认收到">
                <Icon onClick={this.makeSureOrder.bind(this,record)} type={record.status=="未处理"? "close-circle":"check-circle"} 
          style={{fontSize:18,color:record.status=="未处理"? "#87d068":"#f56a00"}}/>
              </Tooltip>
            )
        }
    }];
      let Data = this.state.data;
      let dataSource;
      let Status = ["未处理","正在派送中","已完成"];
      if(!Data){
        dataSource = null;
      }else{
        dataSource=Data.map((item,index)=>{
          return {
            ...item,
            num:index+1,
            key:item.id,
            foodName: item.mealname,
            shopName: item.restaurant,
            price: item.price,
            foodNumber: item.num,
            status: Status[item.status-0],
            orderTime: item.time,
          }
        });
      }
      return (
        <div>
          <BreadcrumbCustom first="我的订单" />
          <Row style={{marginTop:'8px'}}>
          <Col span={2} style={{float:'right'}}>
            <Button  icon="minus-circle-o" onClick={this.delete.bind(this)}>取消订单</Button>
          </Col>
          {/*<Col span={2} style={{float:'right'}}>
            <Button  icon="plus-circle-o" onClick={this.showAddModal.bind(this)} >添加</Button>
          </Col>*/}
        </Row>
          <Table size="middle" style={{marginTop:'10px'}} rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
        </div>
      );
  	}
}

export default NewOrder