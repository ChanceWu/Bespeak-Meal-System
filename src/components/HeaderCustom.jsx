/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout, Badge, Popover,Button,message, Modal,Form,  Input, Checkbox, Radio } from 'antd';
import screenfull from 'screenfull';
import { gitOauthToken, gitOauthInfo } from '../axios';
import { queryString } from '../utils';
import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link,hashHistory,browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';
import {
    getAdmin,
    registerUser,
    registerAdmin,
} from '../action/home';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TextArea} = Input;

@connect(state => ({
    home: state.home,
}))

class HeaderCustom extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            userName: '',
            loginVisible: false,
            registerUserVisible: false,
            registerAdminVisible: false,
            isLogin: false,
            isRegisterUser: false,
            isRegisterAdmin: false,
            adminMessage: [],
            id: 0,
            password: '',
            telephone: '',
            gender: '0',
        }
    }
    
    // componentWillMount() {
    //     const { receiveData } = this.props;
    //     receiveData(null, 'auth');
    // }
    componentDidMount() {
        // const QueryString = queryString();
        // const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        // if (!_user && QueryString.hasOwnProperty('code')) {
        //     gitOauthToken(QueryString.code).then(res => {
        //         gitOauthInfo(res.access_token).then(info => {
        //             this.setState({
        //                 user: info
        //             });
        //             localStorage.setItem('user', JSON.stringify(info));
        //         });
        //     });
        // } else {
        //     this.setState({
        //         user: _user
        //     });
        // }
        if (localStorage.getItem('loginMessage')) {
            this.setState({
                userName: JSON.parse(localStorage.getItem('loginMessage')).name,
            });
        }
        console.log('localStorage.getItem("user")');
        console.log(localStorage.getItem('user'));
        console.log('localStorage.getItem("loginMessage")');
        console.log(localStorage.getItem('loginMessage'));
    }
    // componentWillReceiveProps(nextProps) {
    //     const { auth: nextAuth = {} } = nextProps;
    //     const { history } = this.props;
    //     if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
    //         console.log('nextAuth.data');
    //         console.log(nextAuth.data);
    //         if(nextAuth.data.uid == 1){
    //             localStorage.setItem('user', JSON.stringify(nextAuth.data));
    //             browserHistory.push(`/`);
    //             window.location.reload();
    //         }else{
    //             localStorage.setItem('user', JSON.stringify(nextAuth.data));
    //             browserHistory.push(`/`);
    //             window.location.reload();
    //         } 
    //     } 
        
    // }
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
    }
    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    }
    showModal = () => {
        this.props.form.resetFields();
        this.setState({
            loginVisible: true,
            isLogin: true,
            registerUserVisible: false,
            registerAdminVisible: false,
            isRegisterUser: false,
            isRegisterAdmin: false,
        });
    }
    showModalRegisterUser = () => {
        this.props.form.resetFields();
        this.setState({
            loginVisible: false,
            isLogin: false,
            registerUserVisible: true,
            registerAdminVisible: false,
            isRegisterUser: true,
            isRegisterAdmin: false,
        });
    }
    showModalRegisterAdmin = () => {
        this.props.form.resetFields();
        this.setState({
            loginVisible: false,
            isLogin: false,
            registerUserVisible: false,
            registerAdminVisible: true,
            isRegisterUser: false,
            isRegisterAdmin: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            loginVisible: false,
            registerUserVisible: false,
            registerAdminVisible: false,
            isLogin: false,
            isRegisterUser: false,
            isRegisterAdmin: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            loginVisible: false,
            registerUserVisible: false,
            registerAdminVisible: false,
            isLogin: false,
            isRegisterUser: false,
            isRegisterAdmin: false,
        });
    }
    logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('loginMessage');
        window.location.reload();
        this.props.history.push('/')
    }
    popoverHide = () => {
        this.setState({
            loginVisible: false,
        });
    }
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                var configLg = {
                    id: this.state.id,
                    telephone: values.telephoneL || '',
                    password: values.passwordL || '',
                }
                this.getAdmin(configLg);
            }
        });
        this.setState({
            loginVisible: false,
            isLogin: false,
        });
    }
    handleSubmitRegisterUser = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            console.log('values');
            console.log(values);
            if (!!errors) {
                message.warning('请确认填写无误！');
                return;
            }
            const userPackage = {
                name: values.getNameRegisterUser,
                gender: this.state.gender,
                phone: values.getTelephoneRegisterUser,
                password: values.getPasswordRegisterUser,
                address: values.getAddressRegisterUser,
                action: "registerUser",
            }
            this.props.dispatch(registerUser(userPackage)).then(() => {
                console.log('this.props.registeruser');
                console.log(this.props.home);
                if (this.props.home.data == "SUCCESS!") {
                    message.success("用户注册成功");
                } else {
                    message.error("用户注册失败！");
                }
            });
        });
        this.setState({
            registerUserVisible: false,
            isRegisterUser: false,
        });
        // window.location.reload();
    }
    handleSubmitRegisterAdmin = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            console.log('values');
            console.log(values);
            if (!!errors) {
                message.warning('请确认填写无误！');
                return;
            }
            const adminPackage = {
                userName: values.getNameRegisterAdmin,
                gender: this.state.gender,
                phone: values.getTelephoneRegisterAdmin,
                password: values.getPasswordRegisterAdmin,
                homeAddress: values.getHomeAddressRegisterAdmin,
                storeName: values.getStoreNameRegisterAdmin,
                storeAddress: values.getStoreAddressRegisterAdmin,
                storeDescription: values.getStoreDescriptionRegisterAdmin,
                action: "registerAdmin",
            }
            this.props.dispatch(registerAdmin(adminPackage)).then(() => {
                console.log('this.props.registeradmin');
                console.log(this.props.home);
                if (this.props.home.data == "SUCCESS!") {
                    message.success("商家注册成功！");
                } else {
                    message.error("商家注册失败！");
                }
            });
        });
        this.setState({
            registerAdminVisible: false,
            isRegisterAdmin: false,
        });
        // window.location.reload();
    }
    onGenderSelect = (e) => {
        this.setState({
            gender: e.target.value,
        });
    }
    getAdmin(config){
        this.props.dispatch(getAdmin(config)).then(() => {
            console.log('header this.props');
            console.log(this.props.home.data);
            if (!!this.props.home) {
                if (this.props.home.data.role == 1){
                    message.success("管理员登录成功");
                    browserHistory.push(`/`);
                    window.location.reload();
                } else if (this.props.home.data.role == 0){
                    message.success("用户登录成功");
                    browserHistory.push(`/`);
                    window.location.reload();
                } else {
                    message.error("用户登录失败");
                }
                this.setState({
                    adminMessage: this.props.home.data,
                });
                localStorage.setItem('loginMessage', JSON.stringify(this.props.home.data));
                
            }
        })
    }
    onChangeSelect = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            id: e.target.value,
        });
    }
    render() {
        const { responsive, path } = this.props;
        console.log('this.state');
        console.log(this.state);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 16
            },
        };
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide} />} trigger="click" placement="bottomLeft" visible={this.state.loginVisible} onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="trigger custom-trigger" />
                        </Popover>
                    ) : (
                        <Icon
                            className="trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <Menu mode="horizontal" style={{ lineHeight: '64px', float: 'right' }} onClick={this.menuClick} >
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <Menu.Item key="name" >
                        <span>{this.state.userName}</span>
                    </Menu.Item>
                    <SubMenu title={
                        <span className="avatar">
                        {
                            this.state.userName?<span><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>:<span>未登录</span>
                        }
                        </span>
                    }>
                        <MenuItemGroup title="用户中心">
                            {/*<Menu.Item key="setting:2">个人信息</Menu.Item>*/}
                            {
                                this.state.userName&&
                                <Menu.Item key="logout" onClick={this.logout}><span>退出登录</span></Menu.Item>
                            }
                            {
                                !this.state.userName&&
                                <Menu.Item key="login" onClick={this.showModal}><span>登录</span></Menu.Item>
                            }
                        </MenuItemGroup>
                        {/*<MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>*/}
                    </SubMenu>
                </Menu>

                <Modal title="登录" footer={null} style={{maxWidth: '400px'}} visible={this.state.loginVisible} onOk={this.handleOk} onCancel={this.handleCancel} >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="联系电话" hasFeedback>
                            {getFieldDecorator('telephoneL', {
                                rules: [{ required: this.state.isLogin, max: 11, message: '请正确输入电话号码!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="登录密码" hasFeedback>
                            {getFieldDecorator('passwordL', {
                                rules: [{ required: this.state.isLogin, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="身份" hasFeedback>
                                <RadioGroup onChange={this.onChangeSelect} value={this.state.id}>
                                    <Radio value={0}>顾客</Radio>
                                    <Radio value={1}>商户</Radio>
                                </RadioGroup>
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('rememberL', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a onClick={this.showModalRegisterUser} >用户注册!</a>
                                <a onClick={this.showModalRegisterAdmin}  style={{float: 'right'}}>商家注册!</a>
                            </p>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="用户注册" footer={null} style={{maxWidth: '400px'}} visible={this.state.registerUserVisible} onOk={this.handleOk} onCancel={this.handleCancel} >
                    <Form onSubmit={this.handleSubmitRegisterUser} >
                        <FormItem {...formItemLayout} label="姓名" hasFeedback>
                            {getFieldDecorator('getNameRegisterUser', {
                                rules: [{
                                    required: this.state.isRegisterUser,
                                    message: '请输入用户名!'
                                }],
                            })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="性别" hasFeedback>
                            <RadioGroup onChange={this.onGenderSelect} value={this.state.gender}>
                                <Radio value={'0'}>女</Radio>
                                <Radio value={'1'}>男</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem {...formItemLayout} label="电话" hasFeedback>
                            {getFieldDecorator('getTelephoneRegisterUser', {
                                rules: [{
                                    required: this.state.isRegisterUser,
                                    max: 11,
                                    message: '请正确输入电话号码!' 
                                 }],
                            })(
                                <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} type="text" placeholder="" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="设置密码" hasFeedback>
                            {getFieldDecorator('getPasswordRegisterUser', {
                                rules: [{
                                    required: this.state.isRegisterUser,
                                    message: '请输入密码!'
                                }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="地址" hasFeedback>
                            {getFieldDecorator('getAddressRegisterUser', {
                                rules: [{
                                    required: this.state.isRegisterUser,
                                    message: '请输入地址!'
                                }],
                            })(
                                <Input prefix={<Icon type="home" style={{ fontSize: 13 }} />} type="text" placeholder="需要输入详细地址" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('rememberRegisterUser', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>同意协议</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>查看协议</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                注册
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="商家注册" ref="modal" footer={null} style={{maxWidth: '400px'}}
                    visible={this.state.registerAdminVisible}
                 onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <Form onSubmit={this.handleSubmitRegisterAdmin} >
                        <FormItem {...formItemLayout} label="姓名" hasFeedback>
                            {getFieldDecorator('getNameRegisterAdmin', {
                                rules: [{
                                    required: this.state.isRegisterAdmin,
                                    message: '请输入用户名!'
                                }],
                            })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="性别" hasFeedback>
                            <RadioGroup onChange={this.onGenderSelect.bind(this)} value={this.state.gender}>
                                <Radio value={'0'}>女</Radio>
                                <Radio value={'1'}>男</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem {...formItemLayout} label="联系电话" hasFeedback>
                            {getFieldDecorator('getTelephoneRegisterAdmin', {
                                rules: [{
                                    required: this.state.isRegisterAdmin,
                                    max: 11,
                                    message: '请正确输入电话号码!'
                                }],
                            })(<Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} type="text" placeholder="" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="设置密码" hasFeedback>
                            {getFieldDecorator('getPasswordRegisterAdmin', {
                                rules: [{
                                    required: this.state.isRegisterAdmin,
                                    message: '请输入密码!'
                                }],
                            })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="个人住址" hasFeedback>
                            {getFieldDecorator('getHomeAddressRegisterAdmin',{
                                rules:[{
                                    required:this.state.isRegisterAdmin,
                                    message:'个人住址不能为空'
                                }],
                            })(<Input prefix={<Icon type="home" style={{ fontSize: 13 }} />} placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="店名" hasFeedback>
                            {getFieldDecorator('getStoreNameRegisterAdmin',{
                                rules:[{
                                    required:this.state.isRegisterAdmin,
                                    message:'店名不能为空'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="商店地址" hasFeedback>
                            {getFieldDecorator('getStoreAddressRegisterAdmin',{
                                rules:[{
                                    required: this.state.isRegisterAdmin,
                                    message: '商店地址不能为空'
                                }],
                            })(<Input placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="商店描述" hasFeedback>
                            {getFieldDecorator('getStoreDescriptionRegisterAdmin',{
                                
                            })(<TextArea autosize={{ minRows: 3, maxRows: 6 }} placeholder="" autoComplete="off" />)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('rememberRegisterAdmin', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>同意协议</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>查看协议</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                注册
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const { responsive = {data: {}} } = state.httpData;
    const { auth } = state.httpData;
    return {responsive,auth};
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(HeaderCustom)));
