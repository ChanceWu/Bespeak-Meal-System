import React from 'react';
import { Form, Card, Row, Col, Layout, Rate, Icon, Radio,message,Button,Input,Modal } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import user from '../../style/imgs/user.jpg';
import '../management/message/style.less';
import { connect } from 'react-redux';
import { 
	getAdminMessage,
	updateUserMessage
} from '../../action/adminMessage';
const FormItem = Form.Item;
const Content = Layout.Content;
const RadioGroup = Radio.Group;
@connect(state => ({
	userMessage: state.adminMessage,
}))

class UserMessage extends React.Component {
  	constructor(props){
  		super(props);
  		this.state = {
			visible: false,
  			name: '金木研',
  			id: 0,
  			gender: '1',
  			telephone: '18281579337',
  			address: '西南科技大学',
  			password: '',
  			rest: '',
  		}
  	}

  	componentDidMount(){
        this.getTheAdminMessage();
    }
    getTheAdminMessage(){
        this.props.dispatch(getAdminMessage({
            id: this.state.id,
            telephone: JSON.parse(localStorage.getItem('loginMessage')).phone,
            password: JSON.parse(localStorage.getItem('loginMessage')).password,
        })).then(() => {
            console.log('this.props.getuserMessage');
            console.log(this.props.userMessage.adminMessage);
            if (!!this.props.userMessage) {
                var getValue = this.props.userMessage.adminMessage;
                this.setState({
                    name: getValue.name,
                    gender: getValue.gender,
                    telephone: getValue.phone,
                    address: getValue.address,
                    password: getValue.password,
                    rest: getValue.balance,
                });
            }
        });
    }
    showModal(e) {
	    this.setState({
	      	visible: true,
	    });
  	}
  	handleUpdateOk(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
        	console.log('values');
        	console.log(values);
            if (!!errors) {
                message.warning('请确认填写无误！');
                return;
            }
            const messagePackage = {
                userid: JSON.parse(localStorage.getItem('loginMessage')).id,
                name: values.getName,
                gender: this.state.gender,
                address: values.getAddress,
                password: values.getPassword,
                action: "updateUserMessage",
            }
            this.props.dispatch(updateUserMessage(messagePackage)).then(() => {
            	console.log('this.props.updateUserMessage');
        		console.log(this.props.userMessage);
                if (this.props.userMessage.adminMessage == "SUCCESS!") {
                    this.getTheAdminMessage();
                    this.setState({
                        visible: false,
                    });
                    message.success("信息修改成功！");
                } else {
                    message.error("信息修改失败！");
                }
            });
            
        });
  	};
  	handleCancel() {
	    this.setState({
	      	visible: false,
	    }); 
  	};
  	handleUpdateGenderChange(e) {
        this.setState({
            ...this.state,
            gender: e.target.value,
        });
    };

  	render() {
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
      			<BreadcrumbCustom first="个人信息" />
			  	<Layout>
				  	<Content className="content">
			            <div>
			              	<Row gutter={16}>
							    <Col xs={20} sm={20} md={16} lg={16} xl={14}>
							    	<Card className="content_pic" bodyStyle={{ padding: 0 }}>
									    <div>
								      		<img alt="个人照片" width="100%" height="350px" src={user} />
									    </div>
								  	</Card>
							    </Col>
							    <Col xs={4} sm={4} md={8} lg={8} xl={10}>
							    	<div>
							      		<p className="store_name">{this.state.name}</p>
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
						        			{this.state.gender==0?"女":"男"}
						        		</p>
						        		<p className="store_introduction"><strong>年龄：</strong>
						        			19
						        		</p>
						        		<p className="store_introduction"><strong>联系电话：</strong>
						        			{this.state.telephone}
						        		</p>
						        		<p className="store_introduction"><strong>账上余额：</strong>
						        			{this.state.rest}
						        		</p>
						        	</div>
						      	</Col>
						      	<Col span={10}>
						        	<div>
						        		<p className="store_introduction"><strong>家庭住址：</strong>
						        			{this.state.address}
						        		</p>
						        		<p className="store_introduction"><strong>文化程度：</strong>
						        			本科
						        		</p>
						        		<p className="store_introduction"><strong>兴趣爱好：</strong>
						        			敲代码
						        		</p>
						        	</div>
						        	<div><Button icon="edit" onClick={this.showModal.bind(this)} >修改信息</Button></div>
						      	</Col>
						    </Row>
			            </div>
		          	</Content>
	          	</Layout>

	          	<Modal ref="modal"
                  visible={this.state.visible}
                  title="个人信息修改" onOk={this.handleUpdateOk.bind(this)} onCancel={this.handleCancel.bind(this)}
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
                            <RadioGroup onChange={this.handleUpdateGenderChange.bind(this)}  value={this.state.gender}>
                                <Radio value='0'>女</Radio>
                                <Radio value='1'>男</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem {...formItemLayout} label="家庭住址" hasFeedback>
                            {getFieldDecorator('getAddress',{
                                initialValue:this.state.address,
                                rules:[{
                                    required:true,
                                    message:'家庭住址不能为空'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码" hasFeedback>
                            {getFieldDecorator('getPassword',{
                                initialValue:this.state.password,
                                rules:[{
                                    required:false,
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                    </Form>
                </Modal>
      		</div>
    	);
  	}
}

export default Form.create()(UserMessage)