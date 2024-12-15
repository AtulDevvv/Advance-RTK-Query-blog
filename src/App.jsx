import React from 'react'
import PostsList from './features/post/PostsList'
import AddPosts from './features/post/AddPosts'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import SinglePostPage from './features/post/SinglePostPage'
import EditPost from './features/post/EditPost'
import UsersList from './features/users/UsersList'
import UserPage from './features/users/UserPage'
import { Navigate } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>} >
        <Route index element={<PostsList/>} />

        <Route path='post'>
          <Route index element={<AddPosts/>}/>
          <Route path=':postId' element={<SinglePostPage />}/>
          <Route path='edit/:postId' element={<EditPost/>}/>

        </Route>
        <Route path='user'>
          <Route index element={<UsersList/>}/>
          <Route path=':userId' element={<UserPage/>}/>
        </Route>

      <Route path='*' element={<Navigate to="/" replace/>}/>
</Route>

      </Routes>
    
 
    </div>
  )
}

export default App