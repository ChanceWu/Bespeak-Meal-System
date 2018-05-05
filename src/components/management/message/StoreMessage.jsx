import React from 'react';
import { Form, Card, Row, Col, Layout, Rate, Icon } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import ManageTag from '../ManageTag';
import store from '../../../style/imgs/store.jpg';
import './style.less';
const FormItem = Form.Item;
const Content = Layout.Content;

class StoreMessage extends React.Component {
  	state = {
  	}

  	render() {
    	const state = this.state;
    	return (
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
							      		<p className="store_name">迪拜八星酒店</p>
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
						        			西南科技大学新区小铁门
						        		</p>
						        		<p className="store_introduction"><strong>联系电话：</strong>
						        			123456789
						        		</p>
						        	</div>
						      	</Col>
						      	<Col span={10}>
						        	<div>
						        		<p className="store_introduction"><strong>运营状态：</strong>
						        			开业中
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
    	);
  	}
}

export default StoreMessage