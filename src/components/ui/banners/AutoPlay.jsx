/**
 * Created by hao.cheng on 2017/4/26.
 */
import React from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import food_home0 from '../../../style/imgs/food_home0.jpg';
import food_home1 from '../../../style/imgs/food_home1.jpg';
import food_home2 from '../../../style/imgs/food_home2.jpg';
import food_home3 from '../../../style/imgs/food_home3.jpg';
import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement;
class AutoPlay extends React.Component {
    render(){
        return (
            <BannerAnim prefixCls="banner-user" autoPlay>
                <Element
                    prefixCls="banner-user-elem"
                    key="0"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: 'url('+food_home0+')',
                            backgroundSize: 'cover',
                            backroundPosition: 'center',
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        美食节— —特产篇
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                    >
                        2018.4.1--2018.4.15
                    </TweenOne>
                </Element>
                <Element
                    prefixCls="banner-user-elem"
                    key="1"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: 'url('+food_home1+')',
                            backgroundSize: 'cover',
                            backroundPosition: 'center',
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        口水鸡
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                    >
                        四川-香辣
                    </TweenOne>
                </Element>
                <Element
                    prefixCls="banner-user-elem"
                    key="2"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: 'url('+food_home2+')',
                            backgroundSize: 'cover',
                            backroundPosition: 'center',
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        美食节— —甜点篇
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                    >
                        香草布丁
                    </TweenOne>
                </Element>
                <Element
                    prefixCls="banner-user-elem"
                    key="3"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: 'url('+food_home3+')',
                            backgroundSize: 'cover',
                            backroundPosition: 'center',
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        蛋糕点心
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                    >
                        买一送一
                    </TweenOne>
                </Element>
            </BannerAnim>);
    }
}

export default AutoPlay;