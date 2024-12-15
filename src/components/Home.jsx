import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {increseCount } from '../features/post/postSlice.js'

function Home() {
  console.log("hii")

  const dispatch=useDispatch()
let countValue= useSelector(state=>state.posts.count)
 function increaseCountValue() {
  console.log("Dispatching action");
  // console.log(increaseCount); // Check if this is defined
  dispatch(increseCount(10));
}

  return (
    <div style={{backgroundColor:'purple', width:'100%',display:'flex',justifyContent:'space-between' ,alignItems:"center",paddingLeft:'10px'}}>
        <h1>Atuls blog</h1>
        <nav>
            <ul style={{display:"flex",gap:'30px',color:"white"}}>
                <li><Link to="/">Home</Link></li>
                <li><Link to='post'>Post</Link></li>
                <li><Link to='user'>User</Link></li>
                <h2 style={{marginRight:'20px'}} onClick={increaseCountValue}>{countValue}</h2>

            </ul>
        </nav>
    </div>
  )
}

export default Home