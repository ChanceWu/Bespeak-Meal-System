import React from 'react';
import { Table, Icon, Switch, Radio, Form } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import PayTag from './PayTag';
const FormItem = Form.Item;

const columns = [{
  title: '菜名',
  dataIndex: 'dish',
  key: 'dish',
  width: 100,
  render: text => <a href="#">{text}</a>,
}, {
  title: '商店',
  dataIndex: 'store',
  key: 'store',
  width: 150,
}, {
  title: '商店地址',
  dataIndex: 'address',
  key: 'address',
}, {
	title: '价格',
	dataIndex: 'price',
	key: 'price',
}, {
	title: '订餐状态',
	dataIndex: 'status',
	key: 'status',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <span style={{float: 'left'}}><PayTag /></span>
    </span>
  ),
}];

const data = [];
for (let i = 1; i <= 20; i++) {
  data.push({
    key: i,
    dish: '红烧肉',
    store: `川菜老字号${i}号分店`,
    address: `新农村三社 No. ${i} 号`,
    price: `${i}元`,
    status: '正在派送中...',
    description: '张飞牛肉产于四川省阆中市，是具有浓厚的四川风味的特产。张飞牛肉表面为棕红色，切开后肉质纹丝紧密，不干、不燥、不软、不硬，食之咸淡适口，宴席配餐，伴酒佐餐均宜。',
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const showHeader = true;
const scroll = { y: 240 };

class NewOrder extends React.Component {
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
      			<BreadcrumbCustom first="我的订单" />
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

export default NewOrder