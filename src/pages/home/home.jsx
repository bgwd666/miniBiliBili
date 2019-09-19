import React from 'react';
import './home.scss'
import { Avatar , Affix , Icon , Carousel } from 'antd';
import LeftDrawer from '../../components/left-draw';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class HeaderMenu extends React.Component{
  render(){
    return(
      <Affix offsetTop={0}>
        <div className="header-menu-cont flex-ad">
          {
            this.props.menuList.map(it=>{
              return (
                <div onClick={()=>this.props.changeMenu(it)}
                className={`menu-item ${it === this.props.activeMenu ? 'active' : ''}`} key={it}>
                  {it}
                </div>
              )
            })
          }
        </div>
      </Affix>
    )
  }
}

class Home extends React.Component{

  constructor(props){
    super();
    this.state = { 
      visible: false,
      leftDrawActiveMenu: 'home',
      activeMenu: '推荐',
      userInfo: [
        {
          title: '动态',
          data: 64
        },
        {
          title: '关注',
          data: 123
        },
        {
          title: '粉丝',
          data: 2345
        }
      ],
      leftDrawMenuList: [
        {
          icon: 'home',
          title: '首页'
        },
        {
          icon: 'history',
          title: '历史记录'
        },
        {
          icon: 'download',
          title: '下载管理'
        },
        {
          icon: 'star',
          title: '我的收藏'
        },
        {
          icon: 'play-square',
          title: '稍后在看'
        },
        {
          icon: 'to-top',
          title: '投稿'
        },
        {
          icon: 'bulb',
          title: '创作中心'
        },
        {
          icon: 'fire',
          title: '热门活动'
        },
        {
          icon: 'camera',
          title: '直播中心'
        },
        {
          icon: 'credit-card',
          title: '免流量服务'
        },
        {
          icon: 'flag',
          title: '青少年模式'
        },
        {
          icon: 'container',
          title: '我的订单'
        },
        {
          icon: 'shop',
          title: '会员购中心'
        },
        {
          icon: 'customer-service',
          title: '联系客服'
        }
      ],
      menuList: ['直播','推荐','热门','追番','影视','广场'],
      bannerList:[
        'https://i0.hdslb.com/bfs/archive/b1e0f1454d13d449463baf4aaa93f68a2c4ca2fc.png@880w_440h.png',
        'https://i0.hdslb.com/bfs/sycp/creative_img/201907/ef6583060dc466abba2c2ec722ef15ba.jpg@880w_440h.jpg',
        'https://i0.hdslb.com/bfs/sycp/creative_img/201907/8a79ad577be8450c4f07cec8f6a59cef.jpg@880w_440h.jpg',
        'https://i0.hdslb.com/bfs/archive/62a5c4bd4c40ee15eb32b9c4c278e124b007045c.jpg@880w_440h.webp',
        'https://i0.hdslb.com/bfs/archive/92e663a2d83771d4e941fe89f2796d29a2a11f8c.jpg@880w_440h.webp'
      ],
      videoList: []
    };
    this.timer = null;
    this.page = 1;
  }
  
  componentDidMount(){   
    this.getVideoList();
    window.addEventListener('scroll',this.loadmore,false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll',this.loadmore,false);
  }

  loadmore = ()=>{
    const dom = this.refs.app.getBoundingClientRect();
    if(this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(()=>{
      // console.log(dom, -dom.top + 1000 , dom.height);
      if(-dom.top + 1000 > dom.height){
        this.page++
        this.getVideoList();
      }
    },200);
  }

  getVideoList = ()=>{
    axios.get(`/apis/api/api_open.php?a=list&c=data&type=41&page=${this.page}&maxtime=${this.maxtime}`).then(res=>{
      const data = res.data;
      console.log(data);
      this.maxtime = data.info.maxtime;
      const videoList = [...this.state.videoList,...data.list];
      this.setState({
        videoList
      })
    })
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  leftDrawChangeMenu = (it) => {
    if(it !== this.state.leftDrawActiveMenu){
      this.setState({
        leftDrawActiveMenu: it
      })
    }
  }

  changeMenu = (it) => {
    if(it !== this.state.activeMenu){
      this.setState({
        activeMenu: it
      })
    }
  }

  handleGoVideoDetails = (url, id, name, text) =>{
    this.props.history.push({pathname: '/videoDetails', query: { url, id, name, text} });
  }

  render () {
    return (
      <div className={`app-home-page ${this.state.visible ? 'hidden' : ''}`}  ref="app">
         <div className="home-header-cont flex-ad">
              <Avatar onClick={this.showDrawer} src="http://pic.qqtn.com/up/2017-12/2017120910404461943.jpg" />
              <div className="search-cont flex-bt">
                <Icon type="search" style={{ fontSize: '5vw', color: 'rgba(255,255,255,0.3)' }} />
              </div>
              <Icon type="download" style={{ fontSize: '5vw', color: '#fff' }}/>
              <Icon type="mail" style={{ fontSize: '5vw', color: '#fff' }}/>
              <Icon type="edit" style={{ fontSize: '5vw', color: '#fff' }}/>
         </div>
         <LeftDrawer
            bindDom=".app-home-page"
            onClose={this.onClose}
            visible={this.state.visible}
            userInfo={this.state.userInfo}
            menuList={this.state.leftDrawMenuList}
            activeMenu={this.state.leftDrawActiveMenu}
            changeMenu={this.leftDrawChangeMenu}
          />
          <HeaderMenu 
          changeMenu={this.changeMenu}
          activeMenu={this.state.activeMenu}
          menuList={this.state.menuList}/>
          <Carousel autoplay>
            {
              this.state.bannerList.map(it=>{
                return(
                  <div className="banner-item" key={it}>
                    <img className="b-img" width="93%" src={it} alt=""/>
                  </div>
                )
              })
            }
          </Carousel>
          <div className="video-item-cont">
          {
              this.state.videoList.map(it=>{
                return(
                  <div className="video-item"
                   key={ it.id } 
                   onClick={ ()=> this.handleGoVideoDetails(it.videouri, it.id, it.name, it.text) }>
                    <div className="img-cont">
                      <img className="v-img" width="100%" src={it.cdn_img} alt=""/>
                    </div>
                    <h3 className="v-title">{it.text}</h3>
                    <div className="icon-cont">
                      <span className="theme">{it.theme_name||'主区'}</span>
                      <span className="name">{it.name}</span>
                      <Icon className="more" type="more" style={{ fontSize: '3.5vw', color: '#ccc' }}/>
                    </div>
                  </div>
                )
              })
            }
          </div>
      </div>
    );
  }
}; 

export default withRouter(Home);