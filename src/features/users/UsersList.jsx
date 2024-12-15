import React from 'react'
import {useSelector} from 'react-redux'
import { SelectAllUsers, SelectUserById } from './userSlice'
import {Link, useParams} from 'react-router-dom'
import { selectAllPosts } from '../post/postSlice'

function UsersList() {

  const users=  useSelector(SelectAllUsers)
  

  const renderUsers= users.map((user)=>(
    <div key={user.id}>
      <Link to={`/user/${user.id}`} >{user.name}</Link>
    </div>
  ))
  return (
    <div>
      <h2>Users</h2>
      <ul>{renderUsers}</ul>
      
      </div>

  )
}

export default UsersList