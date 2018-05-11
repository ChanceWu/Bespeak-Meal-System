import React from 'react';
import { 
  Row,
  Col,
  Table,
  Input,
  Modal,
  Button,
  Icon,
  Popconfirm,
  Form,
  message,
  Radio,
  Tooltip,
} from 'antd';
import {connect} from 'react-redux';
import EditableCell from './EditableCell';
import BreadcrumbCustom from '../BreadcrumbCustom';
import ManageTag from './ManageTag';
import {
    getDish,
    addDish,
    deleteDish,
    updateDish,
    findDish,
} from '../../action/dishManagement';

import '../../style/dishManagement.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

@connect(state => ({
    dishManagement: state.dishManagement,
}))
class DishManagememt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: 1,
      telephone: '18281579337',
      password: '123456',

      selectedKeys: [],
      visibleAdd: false,
      visibleUpdate: false,
      isMounted: false,
      addModalKey: 'addOn',
      updateModalKey: 'updateOn',
      data: '',
      id: '',
      foodName: '',
      foodPrice: '',
      foodDescription: '',
    }
  }

  componentDidMount() {
    this.getDishList();
  };
  getDishList(){
    this.props.dispatch(getDish({
      shopid: JSON.parse(localStorage.getItem('loginMessage')).shopid,
      action: 'getDishes',
    })).then(() => {
      console.log('this.props.dishManagement');
      console.log(this.props.dishManagement.data);
      if (!!this.props.dishManagement.data) {
        this.setState({
          data: this.props.dishManagement.data.array,
        });
      }
    });
  }
  
  showAddModal(e) {
    this.props.form.resetFields();
    this.setState({
      addModalKey: 'addOn',
      visibleAdd: true,
    });
  };
  handleAddOk(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      // debugger;
      if (!!errors.getFoodName || !!errors.getPrice || !!errors.getFoodDescription) {
        message.warning('请确认填写无误！');
        return;
      }
      const OrderPackage = {
        shopid: JSON.parse(localStorage.getItem('loginMessage')).shopid,
        // id: '',
        foodName: values.getFoodName,
        foodPrice: values.getPrice,
        foodDescription: values.getFoodDescription,
        action: 'addDishes',
      }
      this.props.dispatch(addDish(OrderPackage)).then(() => {
        if (this.props.dishManagement.data == "SUCCESS!") {
          message.success('餐品添加成功！');
          
          this.getDishList();
          this.setState({
            visibleAdd: false,
            addModalKey: 'addOff',
          });
        } else {
          message.error('餐品添加失败！');
        }
      });
    })
  }
  handleAddCancel() {
    this.setState({
      addModalKey: 'addOff',
      visibleAdd: false,
    });
    this.props.form.resetFields();
  }

  delete() {
    
    if (!this.state.selectedKeys.length) {
      message.warning("请选择！");
      return;
    }
    this.props.dispatch(deleteDish({
      id: this.state.selectedKeys,
      action: "deleteDishes",
    })).then(() => {
      console.log('this.props.dishManagement.data');
      console.log(this.props.dishManagement.data);
      if (this.props.dishManagement.data == 'SUCCESS!') {
        message.success('删除餐品成功!');
        
        this.getDishList();
      } else {
        message.error("删除餐品失败！");
      }
    });
    this.setState({
        ...this.state,
        selectedKeys: '',
    });
  }

  showUpdateModal(record) {
    // console.log(record);
    this.props.form.resetFields();
    this.setState({
      visibleUpdate: true,
      updateModalKey: 'updateOn',
      id: record.id,
      foodName: record.name,
      foodPrice: record.price,
      foodDescription: record.description,
    });
  };
  handleUpdateOk(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors.updateFoodName || !!errors.updatePrice || !!errors.updateFoodDescription) {
        message.warning('请确认填写无误！');
        return;
      }
      const OrderPackage = {
        id: this.state.id,
        foodPrice: values.updatePrice,
        foodDescription: values.updateFoodDescription,
        action: 'updateDishes',
      }
      this.props.dispatch(updateDish(OrderPackage)).then(() => {
        if (this.props.dishManagement.data == "SUCCESS!") {
          this.setState({
            visibleUpdate: true,
            id: '',
            foodName: '',
            foodPrice: '',
            foodDescription: '',
          });
          this.props.dispatch(getDish({
            shopid: JSON.parse(localStorage.getItem('loginMessage')).shopid,
            action: 'getDishes',
          })).then(() => {
            if (!!this.props.dishManagement.data) {
              this.setState({
                data: this.props.dishManagement.data.array,
                visibleUpdate: false,
                updateModalKey: 'updateOff',
              });
              message.success("餐品修改成功！");
            } else {
              message.error("餐品修改失败！");
            }
          });
        } else {
          message.error("餐品修改失败！");
        }
      });
    });
  }
  handleUpdateCancel() {
    this.setState({
        visibleUpdate: false,
        updateModalKey: 'updateOff',
        id: '',
    })
    this.props.form.resetFields();
  }

  render() {
    const rowSelection = {
      onChange: function(selectedRowKeys, selectedRows) {
        this.setState({
          ...this.state,
          selectedKeys: selectedRowKeys.join(','),
        });
      }.bind(this),
    };
    let {
        getFieldDecorator
    } = this.props.form;
    const formItemLayout = {
        labelCol: {
            span: 7
        },
        wrapperCol: {
            span: 12
        },
    };
    const columns = [{
        title: '序号',
        dataIndex: 'num',
    }, {
        title: '餐名',
        dataIndex: 'foodName',
    }, {
        title: '单价',
        dataIndex: 'foodPrice',
    }, {
        title: '餐品描述',
        dataIndex: 'foodDescription',
    }, {
        title: '操作',
        dataIndex: 'id',
        render: (text, record) => {
            return (
              <Tooltip title="编辑">
                <Button onClick={this.showUpdateModal.bind(this,record)} type="primary" size="small"  shape="circle" icon="edit" />
              </Tooltip>
            )
        }
    }];
    let Data = this.state.data;
    let dataSource;
    if (!Data) {
      dataSource = null;
    } else {
      dataSource = Data.map((item, index) => ({
        ...item,
        key: item.id,
        num: index + 1,
        foodName: item.name,
        foodPrice: item.price,
        foodDescription: item.description,
      }));
    }
    return (
      <div>
        <BreadcrumbCustom first="餐品管理" />
        <Row style={{marginTop:'8px'}}>
          <Col span={2} style={{float:'right'}}>
            <Button  icon="minus-circle-o" onClick={this.delete.bind(this)}>删除</Button>
          </Col>   
          <Col span={2} style={{float:'right'}}>
            <Button  icon="plus-circle-o" onClick={this.showAddModal.bind(this)} >添加</Button>
          </Col>
        </Row>
        <Table size="middle" style={{marginTop:'10px'}} rowSelection={rowSelection} columns={columns} dataSource={dataSource} />

        <Modal ref="modal" key={this.state.addModalKey} visible={this.state.visibleAdd}
            title="添加套餐" onOk={this.handleAddOk.bind(this)} onCancel={this.handleAddCancel.bind(this)}
            footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleAddCancel.bind(this)}>取消</Button>,
            <Button key="submit" type="primary" size="large"  onClick={this.handleAddOk.bind(this)}>确定</Button>,
          ]}>
            <Form >
                <FormItem {...formItemLayout} label="餐名" hasFeedback>
                    {getFieldDecorator('getFoodName',{
                        initialValue:null,
                        rules:[{
                            required:true,
                            message:'套餐名不能为空'
                        }],
                    })(<Input placeholder="" autoComplete="off" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="单价" hasFeedback>
                    {getFieldDecorator('getPrice',{
                        initialValue:this.state.foodPrice,
                        rules:[{
                            required:true,
                            message:'用户数不能为空'
                        },{
                            pattern:/^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/,
                            message:'请输入有效的费用'
                        }],
                    })(<Input placeholder="" autoComplete="off" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="餐品描述" hasFeedback>
                    {getFieldDecorator('getFoodDescription',{
                        
                    })(<TextArea autosize={{ minRows: 3, maxRows: 6 }} placeholder="" autoComplete="off" />)}
                </FormItem>
            </Form>
        </Modal>
        <Modal ref="modal1" key={this.state.updateModalKey} visible={this.state.visibleUpdate}
          title="修改套餐" onOk={this.handleUpdateOk.bind(this)} onCancel={this.handleUpdateCancel.bind(this)}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleUpdateCancel.bind(this)}>取消</Button>,
            <Button key="submit" type="primary" size="large"  onClick={this.handleUpdateOk.bind(this)}>确定</Button>,
          ]}>
            <Form >
                <FormItem {...formItemLayout} label="餐名" hasFeedback>
                    {getFieldDecorator('updateFoodName',{
                        initialValue:this.state.foodName,
                        rules:[{
                            required:true,
                            message:'套餐名不能为空'
                        }],
                    })(<Input placeholder="" autoComplete="off" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="单价" hasFeedback>
                    {getFieldDecorator('updatePrice',{
                        initialValue:this.state.foodPrice,
                        rules:[{
                            required:true,
                            message:'用户数不能为空'
                        },{
                            pattern:/^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/,
                            message:'请输入有效的费用'
                        }],
                    })(<Input placeholder="" autoComplete="off" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="餐品描述">
                    {getFieldDecorator('updateFoodDescription',{
                        initialValue:this.state.foodDescription,
                        
                    })(<TextArea autosize={{ minRows: 3, maxRows: 6 }} placeholder="" autoComplete="off" />)}
                </FormItem>
            </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(DishManagememt);