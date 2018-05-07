import React from 'react';
import { Form, Card, Row, Col, Layout, Rate, Icon, Modal, Input, Button, Radio, message } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import ManageTag from '../ManageTag';
import admin from '../../../style/imgs/admin.jpg';
import './style.less';
import { connect } from 'react-redux';
import { 
	getAdminMessage,
	updateAdminMessage
} from '../../../action/adminMessage';
const FormItem = Form.Item;
const Content = Layout.Content;
const RadioGroup = Radio.Group;
@connect(state => ({
	adminMessage: state.adminMessage,
}))

class AdminMessage extends React.Component {
  	constructor(props){
  		super(props);
  		this.state = {
  			visible: false,
  			name: '金木研',
  			id: 1,
  			gender: 0,
  			telephone: '18281579337',
  			password: '123456',
  			homeAddress: '西南科技大学',
  			rest: 200,
  		}
  	}
  	componentDidMount(){
      	this.props.dispatch(getAdminMessage({
            id: this.state.id,
            telephone: this.state.telephone,
            password: this.state.password,
        })).then(() => {
        	console.log('this.props.getadminMessage');
        	console.log(this.props.adminMessage);
            // if (!!this.props.adminMessage) {
            //     this.setState({
            //         packagetotal: this.props.systemadminretrieval.total,
            //         data: this.props.systemadminretrieval.data,
            //         le: this.props.systemadminretrieval.data.length,
            //     });
            // }
        });
    };

  	showModal(e) {
	    this.setState({
	      	visible: true,
	      	// rows:this.state.informationnum,
	      	// foot:this.state.yejiao,
	    });
  	};
  	handleUpdateOk(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors.getName || !!errors.getGender || !!errors.getTelephone || !!errors.getPassword ||
                !!errors.getHomeAddress || !!errors.getRest) {
                message.warning('请确认填写无误！');
                return;
            }
            const messagePackage = {
                id: this.state.id,
                name: values.getName,
                gender: values.getGender,
                telephone: values.getTelephone,
                password: values.getPassword,
                homeAddress: values.getHomeAddress,
                rest: values.getRest,
            }
            this.props.dispatch(updateAdminMessage(messagePackage)).then(() => {
            	console.log('this.props.updateadminMessage');
        		console.log(this.props.adminMessage);
                /*if (this.props.systemadminretrieval.code == "SUCCESS") {
                    this.setState({
                        visible: true,
                        id: '',
                        name: '',
                        gender: '',
                        telephone: '',
                        password: '',
                        homeAddress: '',
                        rest: '',
                    });
                    this.props.dispatch(getAdminMessage(toQuery({
                        rows: rows,
                        page: this.state.cur,
                        enable: '',
                        tryout: '',
                    }))).then(() => {
                        if (!!this.props.systemadminretrieval.code && this.props.systemadminretrieval.code != "SUCCESS") {
                            var code = this.props.systemadminretrieval.code;
                            var warning = '';
                            message.error('信息修改失败！' + code);
                        } else if (!!this.props.systemadminretrieval) {
                            if (this.state.isMounted) {
                                this.setState({
                                    packagetotal: this.props.systemadminretrieval.total,
                                    data: this.props.systemadminretrieval.data,
                                    le: this.props.systemadminretrieval.data.length,
                                    visible1: false,
                                    updateModalKey: 'updateOff',
                                });
                                message.success("信息修改成功！");
                            }
                        } else {
                            message.error("信息修改失败！");
                        }
                    });
                } else {
                    message.error("信息修改失败！");
                }*/
            });
            
        });
  	};
  	handleCancel() {
	    this.setState({
	      	visible: false,
	    }); 
  	};
  	handleUpdateGenderChange(e) {
        // if (this.state.isMounted) {
            this.setState({
                ...this.state,
                gender: e.target.value,
            });
        // }
    };

  	render() {
    	const state = this.state;
    	let { getFieldDecorator } = this.props.form;
    	const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 12
            },
        };
    	return (
      		<div>
      			<BreadcrumbCustom first="信息管理" second="店主信息" />
			  	<Layout>
				  	<Content className="content">
			            <div>
			              	<Row gutter={16}>
							    <Col xs={20} sm={20} md={16} lg={16} xl={14}>
							    	<Card className="content_pic" bodyStyle={{ padding: 0 }}>
									    <div>
								      		<img alt="商店图片" width="100%" height="350px" src={admin} />
									    </div>
								  	</Card>
							    </Col>
							    <Col xs={4} sm={4} md={8} lg={8} xl={10}>
							    	<div>
							      		<p className="store_name">金木研</p>
							      		<p className="store_tag"><Icon type="tags" />sss级喰种、独眼</p>
							      		<p className="store_introduction"><strong>个人介绍：</strong>
							      		金木研，漫画《东京食尸鬼》及其衍生作品中的主角，原本是一个普通的大学生，被卷入“钢筋掉落事件”之
							      		后，经由嘉纳之手被改造成混有一半人类血统的半喰种，是高槻泉与有马贵将一手造就的第二任的独眼之王
							      		。在旧多二福的设计下，吞噬所有的oggai后暴走化身为“龙”。</p>
								    </div>
							    </Col>
						  	</Row>
						    <Row gutter={16}>
						      	<Col span={14}>
						        	<div>
						        		<p className="store_introduction"><strong>花名：</strong>
						        			眼罩喰种、独眼王
						        		</p>
						        		<p className="store_introduction"><strong>性别：</strong>
						        			男
						        		</p>
						        		<p className="store_introduction"><strong>年龄：</strong>
						        			19
						        		</p>
						        		<p className="store_introduction"><strong>联系电话：</strong>
						        			123456789
						        		</p>
						        		<p className="store_introduction"><strong>个人住址：</strong>
						        			东六宿舍楼
						        		</p>
						        	</div>
						      	</Col>
						      	<Col span={10}>
						        	<div>
						        		<p className="store_introduction"><strong>店铺：</strong>
						        			迪拜八星酒店
						        		</p>
						        		<p className="store_introduction"><strong>店铺地址：</strong>
						        			迪拜八星酒店
						        		</p>
						        		<p className="store_introduction"><strong>账上余额：</strong>
						        			￥3000.00
						        		</p>
						        		<p className="store_introduction"><strong>文化程度：</strong>
						        			本科
						        		</p>
						        		<p className="store_introduction"><strong>兴趣爱好：</strong>
						        			敲代码
						        		</p>
						        	</div>
						        	<div><Button icon="edit" onClick={this.showModal.bind(this)} >编辑</Button></div>
						      	</Col>
						    </Row>
			            </div>
		          	</Content>
	          	</Layout>

	          	<Modal ref="modal"
                  visible={this.state.visible}
                  title="店主信息修改" onOk={this.handleUpdateOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                  footer={[
                    <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
                    <Button key="submit" type="primary" size="large"  onClick={this.handleUpdateOk.bind(this)}>确定 </Button>,
                  ]}>
                  	<Form >
                        <FormItem {...formItemLayout} label="姓名" hasFeedback>
                            {getFieldDecorator('getName',{
                                initialValue:this.state.name,
                                rules:[{
                                    required:true,
                                    message:'姓名不能为空'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="性别" hasFeedback>
                        	{getFieldDecorator('getGender',{
                        		initialValue:this.state.gender,
                        	})
                            (<div>
	                            <RadioGroup onChange={this.handleUpdateGenderChange.bind(this)}  value={this.state.gender}>
	                                <Radio value={0}>男</Radio>
	                                <Radio value={1}>女</Radio>
	                            </RadioGroup>
	                        </div>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="联系电话" hasFeedback>
                            {getFieldDecorator('getTelephone',{
                                initialValue:this.state.telephone,
                                rules:[{
                                    required:true,
                                    message:'联系电话不能为空'
                                },{
                                    pattern:/^\d+$/,
                                    message:'请输入有效的联系电话'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="登录密码" hasFeedback>
                            {getFieldDecorator('getPassword',{
                                initialValue:this.state.password,
                                rules:[{
                                    required:true,
                                    message:'登录密码不能为空'
                                },{
                                    pattern:/^\d+$/,
                                    message:'请输入有效的登录密码'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="个人住址" hasFeedback>
                            {getFieldDecorator('getHomeAddress',{
                                initialValue:this.state.homeAddress,
                                rules:[{
                                    required:true,
                                    message:'个人住址不能为空'
                                },{
                                    pattern:/^\d+$/,
                                    message:'请输入有效的个人住址'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="账上余额" hasFeedback>
                            {getFieldDecorator('getRest',{
                                initialValue:this.state.rest,
                                rules:[{
                                    required:true,
                                    message:'账上余额不能为空'
                                },{
                                    pattern:/^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/,
                                    message:'请输入有效的账上余额'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                    </Form>
                </Modal>
      		</div>
    	);
  	}
}

export default Form.create()(AdminMessage);