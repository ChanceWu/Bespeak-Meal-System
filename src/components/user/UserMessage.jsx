import React from 'react';
import { Form, Card, Row, Col, Layout, Rate, Icon } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import admin from '../../style/imgs/admin.jpg';
import '../management/message/style.less';
const FormItem = Form.Item;
const Content = Layout.Content;

class UserMessage extends React.Component {
  	state = {
  	}

  	render() {
    	const state = this.state;
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
								      		<img alt="个人照片" width="100%" height="350px" src={admin} />
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
						        		<p className="store_introduction"><strong>文化程度：</strong>
						        			本科
						        		</p>
						        		<p className="store_introduction"><strong>兴趣爱好：</strong>
						        			敲代码
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

export default UserMessage