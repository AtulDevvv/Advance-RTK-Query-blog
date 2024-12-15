import React from 'react'
import { useSelector } from 'react-redux'
import { SelectAllUsers } from '../users/userSlice'
import { Link } from 'react-router-dom'



function PostAuthor({id}) {

    const users=useSelector(SelectAllUsers)
    const author=users.find((user)=>user.id===id)
  return (
    <div>
        <span>by {author?
        
    <Link to={`/user/${id}`}>  author.name </Link>
        
        :'Unknown author'
        }</span>
    </div>
  )
}

export default PostAuthor