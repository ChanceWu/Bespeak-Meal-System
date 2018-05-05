import React from 'react';
import { Table, Input, Button, Icon, Popconfirm } from 'antd';
import EditableCell from './EditableCell';
import BreadcrumbCustom from '../BreadcrumbCustom';
import ManageTag from './ManageTag';

import '../../style/dishManagement.less';


class DishManagememt extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '菜名',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      ),
    }, {
      title: '价格',
      dataIndex: 'price',
    }, {
      title: '描述',
      dataIndex: 'describe',
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 1 ?
          (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
              <a href="#">Delete</a>
            </Popconfirm>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: 'Edward King 0',
        price: '32',
        describe: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        price: '32',
        describe: 'London, Park Lane no. 1',
      }],
      count: 2,
      selectedRowKeys: [], // Check here to configure the default column
    };
  }
  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      price: 32,
      describe: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { dataSource, selectedRowKeys } = this.state;
    const columns = this.columns;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()], // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };
    return (
      <div>
        <BreadcrumbCustom first="餐品管理" />
        <Button className="editable-add-btn" onClick={this.handleAdd}>添加</Button>
        <Button className="editable-add-btn" onClick={this.handleAdd}>删除</Button>
        <Table rowSelection={rowSelection} bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default DishManagememt;