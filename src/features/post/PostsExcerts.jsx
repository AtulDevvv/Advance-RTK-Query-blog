import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {getPostById} from './postSlice'

function PostsExcerts({postId}) {
  // console.log(post)

  const post= useSelector((state)=>getPostById(state, postId))

  return (
    <div> 
      <div  className="post-container">
    <div className="post">
      <div className="post-title">{post.title}</div>
      <div className="post-content">{post.body}</div>
      <div><PostAuthor id={post.userId}/></div>
      <TimeAgo timestamp={post.date}/>
      <ReactionButtons post={post}/>

      <Link to={`post/${post.id}`}> view details</Link>
  
    </div>
  </div>
  </div>
  )
}

PostsExcerts=React.memo(PostsExcerts)
export default PostsExcerts