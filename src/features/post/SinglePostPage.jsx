import React from 'react'
import { useSelector } from 'react-redux'
import { getPostById } from './postSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

import { Link, useParams } from 'react-router-dom'

function SinglePostPage() {
    const {postId}=useParams()

    const post=useSelector((state)=>getPostById(state,(postId)))

    if(!post){
        return (
            <section>Post not Found!</section>
        )
    }

  return (
    <div>
         <div  className="post-container">
    <div className="post">
      <div className="post-title">{post.title}</div>
      <div className="post-content">{post.body}</div>
      <div><PostAuthor id={post.userId}/></div>
      <TimeAgo timestamp={post.date}/>
      <ReactionButtons post={post}/>
      <Link to={`/post/edit/${post.id}`} >Edit Post</Link>
  
    </div>
  </div>
    </div>
  )
}

export default SinglePostPage