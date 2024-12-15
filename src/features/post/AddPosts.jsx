import React from 'react'
import { useState } from 'react'
import {  useSelector } from 'react-redux';
import { useAddNewPostMutation } from './postSlice';
import { SelectAllUsers } from '../users/userSlice';
import { useNavigate } from 'react-router-dom';

function AddPosts() {

  const [addNewPost,{
    isLoading,isError,error,isSuccess
  }]=useAddNewPostMutation()
    const[post,setPost]=useState({
        title:'',
        content:'',
    });
    const [userId,setUserId]=useState()
    
    const users=useSelector(SelectAllUsers)
    const navigate=useNavigate()

    const usersOption= users?.map((user)=>(
      <option key={user.id} value={user.id}>
        {user.name}

      </option>
    ))

const isSave= Boolean(post.title) && Boolean(post.content) && userId


   async function handleSubmit(e){
      if(isSave){
        try{
          await addNewPost({title:post.title,body:post.content,userId})
          Navigate('/')

        }
        catch(err){
          console.log('failed to save',err)

        }

      }
       

    }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={post.title}
        onChange={(e) => setPost((prev)=>({...prev, title:e.target.value}))}
          placeholder="Enter post title"
        />
      </div>
      <label htmlFor="Authname">
        <select value={userId} name="Authname" id="" onChange={(e)=>setUserId(e.target.value)}>
        {usersOption}
        </select>
      </label>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={post.content}
          onChange={(e) => setPost(prev=>({...prev,content:e.target.value}))}
          placeholder="Enter post content"
        />
      </div>
      <button className='button' type="submit" disabled={!isSave}>Add Post</button>
    </form>
  )
}

export default AddPosts