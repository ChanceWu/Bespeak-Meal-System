import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import food_home0 from '../../style/imgs/food_home0.jpg';

class Content extends React.Component {
  static defaultProps = {
    className: 'content0',
  };

  render() {
    const props = { ...this.props };
    const isMode = props.isMode;
    delete props.isMode;
    const animType = {
      queue: isMode ? 'bottom':'right',
      one: isMode ? { y: '+=30', opacity: 0, type: 'from' }:{ x: '-=30', opacity: 0, type: 'from' },
    }
    return (
      <div
        {...props}
        className={`content-template-wrapper content-half-wrapper ${props.className}-wrapper`}
      >
        <OverPack
          className={`content-template ${props.className}`}
          location={props.id}
        >
          <TweenOne
            key="img"
            animation={animType.one}
            className={`${props.className}-img`}
            id={`${props.id}-imgWrapper`}
            resetStyleBool
          >
            <span id={`${props.id}-img`}>
              <img width="100%" src={food_home0} />
            </span>
          </TweenOne>
          <QueueAnim
            className={`${props.className}-text`}
            type={animType.queue}
            key="text"
            leaveReverse
            ease={['easeOutCubic', 'easeInCubic']}
            id={`${props.id}-textWrapper`}
          >
            <h1 key="h1" id={`${props.id}-title`}>
              张飞牛肉
            </h1>
            <p key="p" id={`${props.id}-content`}>
              张飞牛肉产于四川省阆中市，是具有浓厚的四川风味的特产。张飞牛肉表面为棕红色，切开后肉质纹丝紧密，不干、不燥、不软、不硬，食之咸淡适口，宴席配餐，伴酒佐餐均宜。
            </p>
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}


export default Content;