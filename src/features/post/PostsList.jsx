import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectPostIds } from './postSlice'
import { getPostStatus } from './postSlice'
import { getPostsError } from './postSlice'
import { useGetPostsQuery } from './postSlice'
import PostsExcerts from './PostsExcerts'


const {
  data:Posts,
  isSuccess,
  isLoading,
  isError,
  error,
}=useGetPostsQuery()


function PostsList() {
  const dispatch=useDispatch()

  const orderPostIds=useSelector(selectPostIds)
  const postStatus=useSelector(getPostStatus)
  const postError=useSelector(getPostsError)


 
let content=''
 if(isLoading){
  content='Loading...'
 }
 else if(isSuccess){
// Listen🦻 the thing below we were doing this before entityAdaptor Now we are doing this already in the initail state of initialising the EntityADaptor in PostSlice.js file 👇.

  // const orderedPosts=posts.slice().sort((a,b)=>b.date.localeCompare(a.date))
  // content= orderedPosts.map((post,index)=><PostsExcerts key={post.id} post={post}/>)

  // After employing EntityAdaptor this part of code looks like 👇

   content= orderPostIds.map((postId)=><PostsExcerts key={postId} postId={postId}/>)



 }
 else if(postStatus==='failed'){
  content=<p>{postError}</p>
 }




    

    

    
  return (
    <div>
      <h2>PostsList</h2>
       {content}
    </div>
  )
}

export default PostsList