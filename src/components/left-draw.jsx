import React from 'react';
import './left-draw.scss';
import { Icon } from 'antd';
import { Drawer } from 'antd';

export default class LeftDrawer extends React.Component{
  render(){
    return(
      <Drawer
        title="波哥无敌686"
        placement="left"
        closable={false}
        getContainer={this.props.bindDom || 'body'}
        width="70%"
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <div className="draw-vip flex-bt">
          <div className="left-cont">
            <div className="my-vip-more">
              <span className="vip">我的大会员</span>
              <span className="more">了解更多权益</span>
            </div>
            <span className="tip">开通大会员畅看番剧国创</span>
          </div>
          <Icon type="right" style={{ fontSize: '5vw', color: '#ccc' }}/>
        </div>
        <div className="user-info flex-ad">
          {
            this.props.userInfo.map(it=>{
              return (
                <div className="info-item flex-cl" key={it.title}>
                  <span className="data">{it.data}</span>
                  <span className="title">{it.title}</span>
                </div>
              )
            })
          }
        </div>
        <div className="menu-cont">
          {
            this.props.menuList.map(it=>{
              return (
                <div 
                onClick = {()=> this.props.changeMenu(it.icon)}
                className={`menu-item ${it.icon === this.props.activeMenu ? 'active' : ''}`} 
                key={it.title}>
                  <Icon type={it.icon} style={{ fontSize: '5vw', color: it.icon === this.props.activeMenu ? '#f95984':'#999' }}/>
                  <span className="title">{it.title}</span>
                </div>
              )
            })
          }
        </div>
        <div className="bottom-menu flex-ad">
          <div>
            <Icon type="setting" style={{ fontSize: '5vw', color: '#999' }}/>
            <span className="b-m">设置</span>
          </div>
          <div>
            <Icon type="skin" style={{ fontSize: '5vw', color: '#999' }}/>
            <span className="b-m">主题</span>
          </div>
          <div>
            <Icon type="star" style={{ fontSize: '5vw', color: '#999' }}/>
            <span className="b-m">夜间</span>
          </div>
        </div>
      </Drawer>
    )
  }
}