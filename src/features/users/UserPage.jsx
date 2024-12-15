import React from 'react'
import {useSelector} from 'react-redux'
import {  SelectUserById } from './userSlice'
import {Link, useParams} from 'react-router-dom'
import { useGetPostByUSerIdQuery } from '../post/postSlice'

function UserPage() {
  
    const {userId}=useParams()
    
      const user=useSelector((state)=>SelectUserById(state,Number(userId)))
  
      const {data:postsForUser,isLoading,isSuccess,isError,error}=useGetPostByUSerIdQuery()

    //   const postsForUser= useSelector(state=>{
    //     const allPosts=selectAllPosts(state)
    //     return allPosts.filter((post)=>post.userId===Number(userId))
    //   })

    // BY USING CATCHING FOR UNNECCESSERY RENDREING----->>>

  

      let content;

      if(isLoading){
        content=<p>Loading...</p>

      }
      else if(isSuccess){
        const {ids, entities}=postsForUser
         content= ids.map(id=>(
          <li key={id}>
            <Link to={`/post/${id}`}>{entities[id].title}</Link>
          </li>
         ))
      }else if (isError){
        content= <p>{error}</p>
      }
  return (
    <div>
        <h1>{user.name}</h1>
        {content}
    </div>
  )
}

export default UserPage