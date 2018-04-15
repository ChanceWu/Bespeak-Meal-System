/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
import enquire from 'enquire.js';
import ScrollAnim from 'rc-scroll-anim';
import AutoPlay from '../ui/banners/AutoPlay';
import b1 from '../../style/imgs/b1.jpg';

import Content1 from './Content1';
import Content2 from './Content2';
import '../../style/less/antMotion_style.less';

const scrollScreen = ScrollAnim.scrollScreen;

// let isMobile;
// enquireScreen((b) => {
//   isMobile = b;
// });

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isMode: false,
          show: false,
        };
    }
    componentDidMount() {
        // 适配手机屏幕;
        // enquire.register('screen and (max-width: 900px)',{
        //     match(e){
        //         isMobile = true;
        //     },
        //     unmatch(e){
        //         isMobile = false;
        //     }
        // });
        // this.setState({ isMobile: isMobile });
        this.enquireScreen((isMode) => {
          this.setState({ isMode });
        });
        // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
        // if (location.port) {
          // 样式 build 时间在 200-300ms 之间;
          setTimeout(() => {
            this.setState({
              show: true,
            });
          }, 500);
        // }
    }
    enquireScreen = (cb) => {
        enquire.register('screen and (max-width: 767px)',{
            match: () => {
                cb && cb(true);
            },
            unmatch: () => {
                cb && cb();
            }
        });
    }
    render() {
        return (
            <div className="gutter-example button-demo">
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            { this.state.show &&
                                <Card bordered={false}>
                                    <AutoPlay />
                                    <Content1 id="content_2_0" key="content_2_0" isMode={this.state.isMode}/>
                                    <Content2 id="content_3_0" key="content_3_0" isMode={this.state.isMode}/>
                                </Card>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
