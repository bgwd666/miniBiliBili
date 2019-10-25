import React from 'react';
import './videoDetails.scss'
import {  Icon, Avatar, Row, Col, Spin, Affix } from 'antd';
import { withRouter } from 'react-router-dom'
import AddComment from './addComment'
import axios from 'axios';


class VideoDetails extends React.Component{

  constructor(props){
    super();
    this.state = { 
      url: null,
      id: null,
      name: null,
      text: null,
      commentList: [],
      loading:  false
    };
    this.timer = null;
    this.page = 1;
    this.isEnd = false;
  }

  componentDidMount() {   
    const query = this.props.location.query
    if(!query){
      return this.props.history.push('/home')
    }
    this.setState({
      url: query.url,
      id: query.id,
      name: query.name,
      text: query.text
    });
    setTimeout(()=>{
      this.getCommentList();
    },200);
    window.addEventListener('scroll',this.loadmore,false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll',this.loadmore,false);
  }

  loadmore = ()=>{
    const dom = this.refs.video.getBoundingClientRect();
    if(this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(()=>{
      if( (-dom.top + 1000 > dom.height) && !this.isEnd){
        this.page++
        this.getCommentList();
      }
    },200);
  }

  getCommentList = ()=>{
    this.setState({
      loading: true
    });
    axios.get(`/apis/api/api_open.php?a=dataList&c=comment&data_id=${ this.state.id }&page=${ this.page }`).then(res=>{
      this.setState({ loading: false });
      const data = res.data;
      if(data && data.data){
        this.setState({
          commentList: [...this.state.commentList,...data.data]
        });
      } else {
        this.isEnd = true;
      }
    })
  }

  handleGoBack = ()=>{ 
    this.props.history.push('/home')
  }

  handleLike = (it)=>{
    let  list = this.state.commentList.slice();
    list.map( item=>{
      if( item.id === it.id){
        it.like_count = it.color ? parseInt(it.like_count)-1 : parseInt(it.like_count)+1;
        it.color = it.color ? '' : '#f95984';
      }
      return ''
    });
    this.setState({
      commentList: list
    })
  }

  render () {
    return (
      <div className="videoDetails-page" ref="video">
        <div className="videoDetails-header flex-center">
          <Icon 
          onClick= {this.handleGoBack}
          className="goBackBtn" 
          type="left" 
          style={{ fontSize: '6vw', color:'#fff'}}/>
          <span className="v-title">{ this.state.name }</span>
        </div>
        <video 
        className="video" 
        autoPlay 
        src={ this.state.url } 
        controls 
        ></video>
        <p className="v-info">
        { this.state.text }
        </p>
        <Affix offsetTop={50} target={ ()=>this.refs.video }>
          <div className="loading-cont flex-center">
            <Spin spinning={this.state.loading} />
          </div>
        </Affix>
        <div className="comment-cont">
          <h3 className="c-title">评论</h3>
          <div className="list-cont">
            {
              this.state.commentList.map(it=>{
                return(
                  <div className="c-item" key={ it.id }>
                    <Row gutter={16}>
                      <Col  span={3}>
                        <Avatar className="h-img" src={ it.user.profile_image } />
                      </Col>
                      <Col  span={16}>
                        <div className="user-info">
                          <span style={{ marginBottom: '1.5vw'}}>{ it.user.username }</span>
                          <span style={{ marginBottom: '1.5vw'}}>{ it.ctime }</span>
                          <span  style={{ lineHeight: '1.3'}}>{ it.content }</span>
                        </div>
                      </Col>
                      <Col  span={5} onClick={ ()=> this.handleLike(it) }>
                        <Icon type="like" style={{ fontSize: '4vw', color: it.color || '#ccc'}}/>
                        <span style={{ marginLeft: '0.5vw'}}>{ it.like_count }</span>
                      </Col>
                    </Row> 
                  </div>
                )
              })
            }
          </div>
        </div>
        <AddComment/>
      </div>
    );
  }
};
export default withRouter(VideoDetails)