import React from 'react';
import './videoDetails.scss'
import {  Icon, Avatar } from 'antd';
import { withRouter } from 'react-router-dom'
import axios from 'axios';


class VideoDetails extends React.Component{

  constructor(props){
    super();
    this.state = { 
      url: null,
      id: null,
      name: null,
      text: null,
      commentList: []
    };
  }

  componentDidMount() {   
    const query = this.props.location.query
    if(!query){
      return this.props.history.push('/home')
    }
    this.getCommentList(query.id);

    this.setState({
      url: query.url,
      id: query.id,
      name: query.name,
      text: query.text
    });
  }

  getCommentList = (id)=>{
    axios.get(`/apis/api/api_open.php?a=dataList&c=comment&data_id=${ id }&page=1&lastcid=`).then(res=>{
      const data = res.data;
      console.log(data); 
      if(data && data.data){
        this.setState({
          commentList: data.data
        })
      }
    })
  }

  handleGoBack = ()=>{ 
    this.props.history.push('/home')
  }

  render () {
    return (
      <div className="videoDetails-page">
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
        <div className="comment-cont">
          <h3 className="c-title">评论</h3>
          <div className="list-cont">
            {
              this.state.commentList.map(it=>{
                return(
                  <div className="c-item flex-bt" key={ it.id }>
                    <Avatar className="h-img" src={ it.user.profile_image } />
                    <div className="flex-cl">
                      <span>{ it.user.username }</span>
                      <span>{ it.ctime }</span>
                      <span>{ it.content }</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
};
export default withRouter(VideoDetails)