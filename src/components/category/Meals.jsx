import React from 'react';
import { Row, Col, Card, Collapse } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import MyTag from './MyTag';
import PhotoSwipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

class Meals extends React.Component {
    state = {
        gallery: null
    };
    componentDidMount() {
    }
    componentWillUnmount = () => {
        this.closeGallery();
    };
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
    };
    closeGallery = () => {
        if (!this.gallery) return;
        this.gallery.close();
    };
    render() {
        const imgs = [
            [
                'http://img.hb.aicdn.com/8e16efec78ac4a3684fc8999d18e3661af40fd4510a25-DDvQON_fw',
                'http://img.hb.aicdn.com/61dfa024c8040e6a5bcb03d42928fbcb0c87c1a54e731-yc4lvV_fw',
                'http://img.hb.aicdn.com/6783b4d7811ad7fb87b1446c5488b91179f7608118289-hpEyP3_fw',
                'http://img.hb.aicdn.com/7be61ba6bdb20a73be63edc387b16eec72d0bbb51c7ef-XafA07_fw',
                'http://img.hb.aicdn.com/bd3ba3f907fe098b911947e0020615b50fc340ed2df72-WsuHuM_fw'
            ],
            [
                'http://img.hb.aicdn.com/71471aaac95eade66400a390863b37c76d9addcd14982-0H6sak_fw',
                'http://img.hb.aicdn.com/cb16c68c4d3b7a08b5e91cd351f6b723634ca3fc27d4d-m1JD8z_fw',
                'http://img.hb.aicdn.com/e3559b6e8d7237857382050e5659a64cc0b7d696a2869-stcRXA_fw',
                'http://img.hb.aicdn.com/4ea229436fcf2077502953907a6afb16d3c5cd611b8e2-0dVIeH_fw',
                'http://img.hb.aicdn.com/98c786f4314736f95a42bf927bf65a82d305a532c6258-njI6id_fw'
            ]
        ];
        const Panel = Collapse.Panel;
        const text = `
          张飞牛肉产于四川省阆中市，是具有浓厚的四川风味的特产。张飞牛肉表面为棕红色，切开后肉质纹丝紧密，不干、不燥、不软、不硬，食之咸淡适口，宴席配餐，伴酒佐餐均宜。
        `;

        const customPanelStyle = {
            background: '#fff',
             borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };
        const imgsTag = imgs.map(v1 => (
            v1.map(v2 => (
                <div className="gutter-box">
                    <Card bordered={false} bodyStyle={{ padding: 0, height: 300 }}>
                        <div>
                            <img onClick={() => this.openGallery(v2)} alt="example" width="100%" height="240px" src={v2} />
                            <div style={{position: 'absolute',bottom: 60,right:0,paddingRight:5,paddingLeft:5,fontSize: '30px',color: '#f00',backgroundColor: '#ccc',opacity: 0.7,borderRadius:5}}>￥32.5元</div>
                        </div>
                        <div className="pa-m">
                            <h3>餐名<span style={{float: 'right'}}><MyTag /></span></h3>
                            <small>商家名</small>
                        </div>
                    </Card>
                    <Collapse bordered={false} >
                        <Panel header="了解详细信息" style={customPanelStyle}>
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </div>
            ))
        ));
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="分类" second="主餐" />
                <Row gutter={10}>
                    <Col className="gutter-row" md={4}>
                        {imgsTag[0]}
                    </Col>
                    <Col className="gutter-row" md={4}>
                        {imgsTag[1]}
                    </Col>
                    <Col className="gutter-row" md={4}>
                        {imgsTag[0]}
                    </Col>
                    <Col className="gutter-row" md={4}>
                        {imgsTag[1]}
                    </Col>
                    <Col className="gutter-row" md={4}>
                        {imgsTag[0]}
                    </Col>
                    <Col className="gutter-row" md={4}>
                        {imgsTag[1]}
                    </Col>
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
                <style>{`
                    .ant-card-body img {
                        cursor: pointer;
                    }
                `}</style>
            </div>
        )
    }
}

export default Meals;