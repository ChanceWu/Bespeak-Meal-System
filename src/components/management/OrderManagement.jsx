import React from 'react';
import { Table, Icon, Switch, Radio, Form } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import ManageTag from './ManageTag';
const FormItem = Form.Item;

const columns = [{
  title: '菜名',
  dataIndex: 'dish',
  key: 'dish',
  width: 100,
  render: text => <a href="#">{text}</a>,
}, {
  title: '顾客',
  dataIndex: 'customer',
  key: 'customer',
  width: 150,
}, {
  title: '送餐地址',
  dataIndex: 'orderAddress',
  key: 'orderAddress',
}, {
	title: '价格',
	dataIndex: 'price',
	key: 'price',
}, {
  title: 'orderTime',
  dataIndex: 'orderTime',
  key: 'orderTime',
}, {
	title: '订餐状态',
	dataIndex: 'status',
	key: 'status',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <span style={{float: 'left'}}><ManageTag /></span>
    </span>
  ),
}];

const data = [];
for (let i = 1; i <= 20; i++) {
  let date = new Date();
  data.push({
    key: i,
    dish: '红烧肉',
    customer: `西科大${i}`,
    orderAddress: `西南科技大学 No. ${i} 号`,
    price: `${i}元`,
    orderTime: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(),
    status: '顾客已付款',
    description: '加点酸菜。',
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const showHeader = true;
const scroll = { y: 240 };

class OrderManagememt extends React.Component {
  	state = {
    	bordered: true,
    	pagination: true,
    	expandedRowRender,
    	showHeader: true,
    	scroll: undefined,
  	}

  	handleToggle = (prop) => {
    	return (enable) => {
      		this.setState({ [prop]: enable });
    	};
  	}

  	handleExpandChange = (enable) => {
    	this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
  	}

  	handleScollChange = (enable) => {
    	this.setState({ scroll: enable ? scroll : undefined });
  	}

  	render() {
    	const state = this.state;
    	return (
      		<div>
      			<BreadcrumbCustom first="商店管理" second="订餐管理" />
        		<div className="components-table-demo-control-bar">
          			<Form layout="inline">
            			<FormItem label="是否分页">
              				<Switch checked={state.pagination} onChange={this.handleToggle('pagination')} />
            			</FormItem>
            			<FormItem label="展示详细信息">
              				<Switch checked={!!state.expandedRowRender} onChange={this.handleExpandChange} />
            			</FormItem>
            			<FormItem label="切换模式">
              				<Switch checked={!!state.scroll} onChange={this.handleScollChange} />
            			</FormItem>
          			</Form>
        		</div>
        		<Table {...this.state} columns={columns} dataSource={data} />
      		</div>
    	);
  	}
}

export default OrderManagememt