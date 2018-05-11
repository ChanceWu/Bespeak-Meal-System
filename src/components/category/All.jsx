import React from 'react';
import { Row, Col, Card, Collapse,Form,message,Modal,Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import MyTag from './MyTag';
import PhotoSwipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import { connect } from 'react-redux';
import { 
    getAllDishes,
    insertDish,
} from '../../action/dishManagement';
import food_home0 from '../../style/imgs/food_home0.jpg';
import food_home1 from '../../style/imgs/food_home1.jpg';
import food_home2 from '../../style/imgs/food_home2.jpg';
import food_home3 from '../../style/imgs/food_home3.jpg';
const FormItem = Form.Item;
@connect(state => ({
    dishManagement: state.dishManagement,
}))

class All extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gallery: null,
            data: '',
            isActive: '0',
            visible: false,
            v: '',
        }
    }
    componentDidMount() {
        this.getAllDishesMessage();
    }
    getAllDishesMessage(){
        this.props.dispatch(getAllDishes({
            action: "getAllDishes",
        })).then(() => {
            console.log('this.props.getalldishesMessage');
            console.log(this.props.dishManagement.data);
            if (!!this.props.dishManagement) {
                var getValue = this.props.dishManagement.data;
                this.setState({
                    data: getValue.array,
                });
            }
        });
    }
    showModal(e){
        console.log('e');
        console.log(e);
        this.setState({
            visible: true,
            v: e,
        });
    }
    handleOk(){
        this.insertTheDish(this.state.v);
        this.setState({ visible: false });
    }
    handleCancel(){
        this.setState({ visible: false,v: '',isActive: '0' });
    }
    insertTheDish(record){
        console.log('insertDish.record');
        console.log(record);
        this.props.dispatch(insertDish({
            userid: JSON.parse(localStorage.getItem('loginMessage')).id,
            dishid: record,
            num: 1,
            action: "insertDish",
        })).then(() => {
            console.log('this.props.insertdish');
            console.log(this.props.dishManagement.data);
            if (this.props.dishManagement.data == 'SUCCESS!') {
                message.success('订餐成功!');
                this.setState({isActive: '1'});
                this.getAllDishesMessage();
            } else {
                message.error("订餐失败！");
                this.setState({isActive: '0'});
            }
        })
        this.setState({ v: '', });
    }
    componentWillUnmount = () => {
        this.closeGallery();
    }
    openGallery = (item) => {
        const items = [
            {
                src: item,
                w: 0,
                h: 0,
            }
        ];
        const pswpElement = this.pswpElement;
        const options = {index: 0};
        this.gallery = new PhotoSwipe( pswpElement, PhotoswipeUIDefault, items, options);
        this.gallery.listen('gettingData', (index, item) => {
            const _this = this;
            if (item.w < 1 || item.h < 1) { // unknown size
                var img = new Image();
                img.onload = function() { // will get size after load
                    item.w = this.width; // set image width
                    item.h = this.height; // set image height
                    _this.gallery.invalidateCurrItems(); // reinit Items
                    _this.gallery.updateSize(true); // reinit Items
                };
                img.src = item.src; // let's download image
            }
        });
        this.gallery.init();
    }
    closeGallery = () => {
        if (!this.gallery) return;
        this.gallery.close();
    }
    render() {
        let Data = this.state.data;
        let dataSource;
        let imgsTag;
        const Panel = Collapse.Panel;
        const customPanelStyle = {
            background: '#fff',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };
        let imgs = [food_home0,food_home1,food_home2,food_home3,food_home0,food_home1];
        if(!Data){
            dataSource = null;
        }else{
            dataSource = Data.map((item,index) =>({
                key: item.id,
                foodName: item.name,
                foodPrice: item.price,
                foodDescription: item.description,
                shopname: item.shopname,
                img: imgs[index],
                isActive: '0',
            }));

            imgsTag = dataSource.map(v2 => (
                <Col key={v2.key} className="gutter-row" md={4}>
                    <div className="gutter-box">
                        <Card bordered={false} bodyStyle={{ padding: 0, height: 300 }}>
                            <div>
                                <img onClick={() => this.openGallery(v2)} alt="商店图片" width="100%" height="240px" src={v2.img} />
                                <div style={{position: 'absolute',bottom: 60,right:0,paddingRight:5,paddingLeft:5,fontSize: '30px',color: '#f00',backgroundColor: '#ccc',opacity: 0.7,borderRadius:5}}>￥{v2.foodPrice}</div>
                            </div>
                            <div className="pa-m">
                                <h3>{v2.foodName}<span onClick={this.showModal.bind(this,v2.key)} style={{float: 'right'}}><MyTag isActive={v2.isActive} /></span></h3>
                                <small>{v2.shopname}</small>
                            </div>
                        </Card>
                        <Collapse bordered={false} >
                            <Panel header="了解详细信息" style={customPanelStyle}>
                                <p>{v2.foodDescription}</p>
                            </Panel>
                        </Collapse>
                    </div>
                </Col>
            ));
            console.log('imgsTag');
            console.log(imgsTag);
        }
        console.log('dataSource');
        console.log(dataSource);
        
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="分类" second="全部" />
                <Row gutter={10}>
                    {imgsTag}
                </Row>
                <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true" ref={(div) => {this.pswpElement = div;} }>

                    <div className="pswp__bg" />

                    <div className="pswp__scroll-wrap">

                        <div className="pswp__container">
                            <div className="pswp__item" />
                            <div className="pswp__item" />
                            <div className="pswp__item" />
                        </div>

                        <div className="pswp__ui pswp__ui--hidden">

                            <div className="pswp__top-bar">

                                <div className="pswp__counter" />

                                <button className="pswp__button pswp__button--close" title="Close (Esc)" />

                                <button className="pswp__button pswp__button--share" title="Share" />

                                <button className="pswp__button pswp__button--fs" title="Toggle fullscreen" />

                                <button className="pswp__button pswp__button--zoom" title="Zoom in/out" />

                                <div className="pswp__preloader">
                                    <div className="pswp__preloader__icn">
                                        <div className="pswp__preloader__cut">
                                            <div className="pswp__preloader__donut" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                                <div className="pswp__share-tooltip" />
                            </div>

                            <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />

                            <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />

                            <div className="pswp__caption">
                                <div className="pswp__caption__center" />
                            </div>

                        </div>

                    </div>

                </div>
                <Modal visible={this.state.visible} title="确认订单" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                  footer={[
                    <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消订单</Button>,
                    <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this)}>
                      确认订单
                    </Button>,
                  ]}>
                  <p>是否确认此订单？</p>
                </Modal>
                <style>{`
                    .ant-card-body img {
                        cursor: pointer;
                    }
                `}</style>
            </div>
        )
    }
}

export default All;