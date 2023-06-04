import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import './comments.css'
const Comments = (props) => {
  return (
    <Comment className='com'>
        <img className='avatar' src={props.img} />
            <Comment.Content>
                <Comment.Author as='a'>{props.firstName} {props.lastName}</Comment.Author>
                <Comment.Metadata>
                <div className='time'>{props.rating} نجوم</div>
                </Comment.Metadata>
                <Comment.Text>{props.comment}</Comment.Text>        
        </Comment.Content>
        
    </Comment> 
  )
}

export default Comments