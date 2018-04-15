import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import food_home1 from '../../style/imgs/food_home1.jpg';

class Content extends React.Component {

  static defaultProps = {
    className: 'content1',
  };

  render() {
    const props = { ...this.props };
    const isMode = props.isMode;
    delete props.isMode;
    const animType = {
      queue: isMode ? 'bottom' : 'left',
      one: isMode ? { y: '+=30', opacity: 0, type: 'from' } : { x: '+=30', opacity: 0, type: 'from' },
    };
    return (
      <div
        {...props}
        className={`content-template-wrapper content-half-wrapper ${props.className}-wrapper`}
      >
        <OverPack
          className={`content-template ${props.className}`}
          location={props.id}
        >
          <QueueAnim
            type={animType.queue}
            className={`${props.className}-text`}
            key="text"
            leaveReverse
            ease={['easeOutCubic', 'easeInCubic']}
            id={`${props.id}-textWrapper`}
          >
            <h1 key="h1" id={`${props.id}-title`}>
              口水鸡
            </h1>
            <p key="p" id={`${props.id}-content`}>
              口水鸡是中国四川传统特色菜肴，属于川菜系中的凉菜，佐料丰富，集麻辣鲜香嫩爽于一身。 在烹制时，煮鸡用的汤料很有讲究，需要恰到好处，这样可以最大限度地保存鸡的可溶性蛋白，增加鸡肉的鲜美程度，又能具备其特有的香型和滋味。
            </p>
          </QueueAnim>
          <TweenOne
            key="img"
            animation={animType.one}
            className={`${props.className}-img`}
            id={`${props.id}-imgWrapper`}
            resetStyleBool
          >
            <span id={`${props.id}-img`}>
              <img width="100%" src={food_home1} />
            </span>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Content;