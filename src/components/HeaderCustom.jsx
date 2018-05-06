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
import { getAdmin } from '../action/home';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@connect(state => ({
    home: state.home,
}))

class HeaderCustom extends Component {
    state = {
        user: '',
        loginVisible: false,
        registerVisible: false,
        isLogin: false,
        isRegister: false,
        adminMessage: [],
        id: 0,
        password: '',
        telephone: '',
    }
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
    }
    componentDidMount() {
        const QueryString = queryString();
        // if (QueryString.hasOwnProperty('code')) {
        //     console.log(QueryString);
        //     const _user = JSON.parse(localStorage.getItem('user'));
        //     !_user && gitOauthToken(QueryString.code).then(res => {
        //         console.log(res);
        //         gitOauthInfo(res.access_token).then(info => {
        //             this.setState({
        //                 user: info
        //             });
        //             localStorage.setItem('user', JSON.stringify(info));
        //         });
        //     });
        //     _user && this.setState({
        //         user: _user
        //     });
        // }
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
            gitOauthToken(QueryString.code).then(res => {
                gitOauthInfo(res.access_token).then(info => {
                    this.setState({
                        user: info
                    });
                    localStorage.setItem('user', JSON.stringify(info));
                });
            });
        } else {
            this.setState({
                user: _user
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        const { auth: nextAuth = {} } = nextProps;
        const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
            console.log('nextAuth.data');
            console.log(nextAuth.data);
            if(nextAuth.data.uid == 1){
                localStorage.setItem('user', JSON.stringify(nextAuth.data));
                browserHistory.push(`/app/dashboard/home`);
                window.location.reload();
            }else{
                localStorage.setItem('user', JSON.stringify(nextAuth.data));
                browserHistory.push(`/app/dashboard/home`);
                window.location.reload();
            } 
        } 
        
    }
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
        this.setState({
            loginVisible: true,
            isLogin: true,
            registerVisible: false,
            isRegister: false,
        });
    }
    showModalRegister = () => {
        this.setState({
            loginVisible: false,
            isLogin: false,
            registerVisible: true,
            isRegister: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            loginVisible: false,
            registerVisible: false,
            isLogin: false,
            isRegister: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            loginVisible: false,
            registerVisible: false,
            isLogin: false,
            isRegister: false,
        });
    }
    logout = () => {
        localStorage.removeItem('user');
        window.location.reload();
        this.props.history.push('/app/dashboard/home')
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('login Received values of form: ', values);
                const { fetchData } = this.props;

                if (this.state.id === 1){
                    fetchData({funcName: 'admin', stateName: 'auth'});
                    message.success("管理员登录成功");
                }
                if (this.state.id === 0){
                    fetchData({funcName: 'guest', stateName: 'auth'});
                    message.success("用户登录成功");
                }
                var configLg = {
                    id: this.state.id,
                    password: values.passwordL || '',
                    telephone: values.telephoneL || '',
                }
                this.getAdmin(configLg);
            }
        });
        this.setState({
            loginVisible: false,
            isLogin: false,
        });
    }
    handleSubmitRegister = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('register Received values of form: ', values);
                const { fetchData } = this.props;
                if (values.userNameR === 'admin' && values.passwordR === 'admin'){
                    fetchData({funcName: 'admin', stateName: 'auth'});
                    message.success("管理员注册成功");
                }
                if (values.userNameR === 'guest' && values.passwordR === 'guest'){
                    fetchData({funcName: 'guest', stateName: 'auth'});
                    message.success("用户注册成功");
                }
            }
        });
        this.setState({
            registerVisible: false,
            isRegister: false,
        });
    }
    getAdmin(config){
        this.props.dispatch(getAdmin(config)).then(() => {
            console.log('header this.props');
            console.log(this.props.home.admin);
            if (!!this.props.home) {

                this.setState({
                    adminMessage: this.props.home.admin,
                    // webpageCount: this.props.home.webpageCount,
                    // year: new Date().getFullYear(),
                });
            }
        })
    }
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
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
                        <span>{this.state.user.userName}</span>
                    </Menu.Item>
                    <SubMenu title={
                        <span className="avatar">
                        {
                            this.state.user.userName?<span><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>:<span>未登录</span>
                        }
                        </span>
                    }>
                        <MenuItemGroup title="用户中心">
                            {/*<Menu.Item key="setting:1">你好 - {this.props.user.userName}</Menu.Item>*/}
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                            {
                                this.state.user.userName&&
                                <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                            }
                            {
                                !this.state.user.userName&&
                                <Menu.Item key="login"><span onClick={this.showModal}>登录</span></Menu.Item>
                            }
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>

                <Modal title="登录" footer={null} style={{maxWidth: '400px'}} visible={this.state.loginVisible} onOk={this.handleOk} onCancel={this.handleCancel} >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('telephoneL', {
                                rules: [{ required: this.state.isRegister, max: 11,pattern: /^1([3489])[0-9]{9}$/, message: '请正确输入电话号码!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('passwordL', {
                                rules: [{ required: this.state.isLogin, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="" />
                            )}
                        </FormItem>
                        <FormItem>
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
                                <a onClick={this.showModalRegister} >或 现在就去注册!</a>
                                {/*<a onClick={this.gitHub} ><Icon type="github" />(第三方登录)</a>*/}
                            </p>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="注册" footer={null} style={{maxWidth: '400px'}} visible={this.state.registerVisible} onOk={this.handleOk} onCancel={this.handleCancel} >
                    <Form onSubmit={this.handleSubmitRegister} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userNameR', {
                                rules: [{ required: this.state.isRegister, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('passwordR', {
                                rules: [{ required: this.state.isRegister, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('telephoneR', {
                                rules: [{ required: this.state.isRegister, max: 11,pattern: /^1([3489])[0-9]{9}$/, message: '请正确输入电话号码!' }],
                            })(
                                <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} type="text" placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('addressR', {
                                rules: [{ required: this.state.isRegister, message: '请输入地址!' }],
                            })(
                                <Input prefix={<Icon type="home" style={{ fontSize: 13 }} />} type="text" placeholder="需要输入详细地址" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('rememberR', {
                                    valuePropName: 'checked',
                                    initialValue: false,
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
