import React, { Component } from 'react'
import './addComment.scss'
import { Input, Button } from 'antd';

export default class AddComment extends Component {
  render() {
    const { TextArea } = Input;

    return (
      <div className="add-comment-cont">
        <div className="c-header flex-ad">
          <Button>取消</Button>
          <span>添加评论</span>
          <Button type="primary">发表</Button>
        </div>
        <TextArea rows={5} className="textarea" placeholder="不可发布色情, 政治, 谣言 等危害社会安全言论,违者可能要承担法律后果!"/>
      </div>
    )
  }
}

