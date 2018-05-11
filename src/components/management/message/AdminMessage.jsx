import React from 'react';
import { Form, Card, Row, Col, Layout, Rate, Icon, Modal, Input, Button, Radio, message } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import ManageTag from '../ManageTag';
import admin from '../../../style/imgs/admin.jpg';
import store from '../../../style/imgs/store.jpg';
import './style.less';
import { connect } from 'react-redux';
import { 
	getAdminMessage,
	updateAdminMessage
} from '../../../action/adminMessage';
const FormItem = Form.Item;
const Content = Layout.Content;
const RadioGroup = Radio.Group;
const {TextArea} = Input;
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
  			gender: '1',
  			telephone: '18281579337',
  			homeAddress: '西南科技大学',
  			storeName: '迪拜八星酒店',
  			storeAddress: '迪拜',
  			storeStatus: '1',
  			storeDescription: '八星皇宫酒店是奢华设计与传统文化结合的完美典范。',
  		}
  	}
  	componentDidMount(){
        this.getTheAdminMessage();
    };

    getTheAdminMessage(){
        this.props.dispatch(getAdminMessage({
            id: this.state.id,
            telephone: JSON.parse(localStorage.getItem('loginMessage')).phone,
            password: JSON.parse(localStorage.getItem('loginMessage')).password,
        })).then(() => {
            console.log('this.props.getadminMessage');
            console.log(this.props.adminMessage.adminMessage);
            if (!!this.props.adminMessage) {
                var getValue = this.props.adminMessage.adminMessage;
                this.setState({
                    name: getValue.name,
                    gender: getValue.gender,
                    homeAddress: getValue.address,
                    storeName: getValue.shopname,
                    storeAddress: getValue.shopaddress,
                    storeStatus: getValue.shopstatus,
                    storeDescription: getValue.shopdescri,
                });
            }
        });
    }
    
  	showModal(e) {
	    this.setState({
	      	visible: true,
	    });
  	};
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
                homeAddress: values.getHomeAddress,
                shopid: JSON.parse(localStorage.getItem('loginMessage')).shopid,
                storeName: values.getStoreName,
                storeStatus: this.state.storeStatus,
                storeAddress: values.getStoreAddress,
                action: "updateAdminMessage",
            }
            this.props.dispatch(updateAdminMessage(messagePackage)).then(() => {
            	console.log('this.props.updateadminMessage');
        		console.log(this.props.adminMessage);
                if (this.props.adminMessage.adminMessage == "SUCCESS!") {
                    this.getTheAdminMessage();
                    this.setState({
                        visible: false,
                    });
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
        // if (this.state.isMounted) {
            this.setState({
                ...this.state,
                gender: e.target.value,
            });
        // }
    };
    handleUpdateStoreStatusChange(e) {
        // if (this.state.isMounted) {
            this.setState({
                ...this.state,
                storeStatus: e.target.value,
            });
        // }
    };

  	render() {
    	// const state = this.state;
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
							        		<p className="store_introduction"><strong>个人住址：</strong>
							        			{this.state.homeAddress}
							        		</p>
							        	</div>
							      	</Col>
							      	<Col span={10}>
							        	<div>
							        		<p className="store_introduction"><strong>店铺：</strong>
							        			{this.state.storeName}
							        		</p>
							        		<p className="store_introduction"><strong>店铺地址：</strong>
							        			{this.state.storeAddress}
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
							        	<div><Button icon="edit" onClick={this.showModal.bind(this)} >修改信息</Button></div>
							      	</Col>
							    </Row>
				            </div>
			          	</Content>
		          	</Layout>
	          	</div>
	          	<div>
	      			<BreadcrumbCustom first="信息管理" second="商店信息" />
				  	<Layout>
					  	<Content className="content">
				            <div>
				              	<Row gutter={16}>
								    <Col xs={20} sm={20} md={16} lg={16} xl={14}>
								    	<Card className="content_pic" bodyStyle={{ padding: 0 }}>
										    <div>
									      		<img alt="商店图片" width="100%" src={store} />
										    </div>
									  	</Card>
								    </Col>
								    <Col xs={4} sm={4} md={8} lg={8} xl={10}>
								    	<div>
								      		<p className="store_name">{this.state.storeName}</p>
								      		<p className="store_tag"><Icon type="tags" />顶级、皇家、奢华、极品</p>
								      		<p className="store_introduction"><strong>饭店介绍：</strong>
								      		八星皇宫酒店是奢华设计与传统文化结合的完美典范。延绵一公里的八星皇宫酒店是典型的阿拉伯
								      		皇宫式建筑。酒店外墙展现了阿拉伯沙漠的沙质神韵，古朴质感中透出沙粒的五彩缤纷。令人称奇
								      		的114个穹顶全部由马赛克砌成，其中最大的穹顶直径达42米，表面镀银，并在顶端装饰了黄金，
								      		闪耀着阿拉伯文明独有的富丽堂皇。酒店的装修用的全部是最新材料和技术，饭店的圆顶用最新照
								      		明技术、防腐特殊材料和纯金制造，一到晚上就会自动发光，金光闪闪，永不掉色。据说，这个圆
								      		顶还是世界上最大的圆顶建筑。酒店总共用了 19 万立方英尺进口大理石。</p>
									    </div>
								    </Col>
							  	</Row>
							    <Row gutter={16}>
							      	<Col span={14}>
							        	<div>
							        		<p className="store_introduction"><strong>商店地址：</strong>
							        			{this.state.storeAddress}
							        		</p>
							        		<p className="store_introduction"><strong>联系电话：</strong>
							        			{this.state.telephone}
							        		</p>
							        	</div>
							      	</Col>
							      	<Col span={10}>
							        	<div>
							        		<p className="store_introduction"><strong>运营状态：</strong>
							        			{this.state.storeStatus==0?"已关停":"开业中"}
							        		</p>
							        		<p className="store_introduction"><strong>好评率：</strong>
							        			<Rate disabled defaultValue={5} />
							        		</p>
							        	</div>
							      	</Col>
							    </Row>
				            </div>
			          	</Content>
		          	</Layout>
	      		</div>

	          	<Modal ref="modal"
                  visible={this.state.visible}
                  title="信息修改" onOk={this.handleUpdateOk.bind(this)} onCancel={this.handleCancel.bind(this)}
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
                        <FormItem {...formItemLayout} label="个人住址" hasFeedback>
                            {getFieldDecorator('getHomeAddress',{
                                initialValue:this.state.homeAddress,
                                rules:[{
                                    required:true,
                                    message:'个人住址不能为空'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="店名" hasFeedback>
                            {getFieldDecorator('getStoreName',{
                                initialValue:this.state.storeName,
                                rules:[{
                                    required:true,
                                    message:'店名不能为空'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="商店地址" hasFeedback>
                            {getFieldDecorator('getStoreAddress',{
                                initialValue:this.state.storeAddress,
                                rules:[{
                                    required:true,
                                    message:'商店地址不能为空'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="店铺状态" hasFeedback>
                        	
	                            <RadioGroup onChange={this.handleUpdateStoreStatusChange.bind(this)}  value={this.state.storeStatus}>
	                                <Radio value='0'>已关停</Radio>
	                                <Radio value='1'>开业中</Radio>
	                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
      		</div>
    	);
  	}
}

export default Form.create()(AdminMessage);