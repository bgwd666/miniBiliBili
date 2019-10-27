import React, { Component } from 'react'
import './addComment.scss'
import { Input, Button } from 'antd';

export default class AddComment extends Component {

  constructor(){
    super();
    this.state = {
      value: ''
    }
  }

  handleChange = (event)=>{
    this.setState({value: event.target.value});
  }

  render() {
    const { TextArea } = Input;
    const { value } = this.state;
    return (
      <div className="add-comment-cont">
        <div className="c-header flex-ad">
          <Button onClick={ this.props.closeComment } >取消</Button>
          <span>添加评论</span>
          <Button type="primary" onClick={ ()=> this.props.addComment(value) }>发表</Button>
        </div>
        <TextArea 
        rows={5} 
        className="textarea" 
        value={this.state.value} 
        onChange={this.handleChange}
        placeholder="不可发布色情, 政治, 谣言 等危害社会安全言论,违者可能要承担法律后果!"/>
      </div>
    )
  }
}

