import { useAddReactionMutation } from "./postSlice"


 const reactions={
    thumbsup:'👍',
    wow:"😲",
    heart:'💖',
    rocket:'🚀',
    coffee:'🍵'
}



function ReactionButtons({post}) {
const [addReaction]=useAddReactionMutation()

    

     const reactionsButton= Object.entries(reactions).map(([name,emoji])=>(
        <button key={name} type="button" onClick={()=>{
          const newValue=post.reactions[name]+1;
          addReaction({postId:post.id,reaction:{...post.reactions,[name]:newValue}})}}> {emoji} {post.reactions[name]}</button>
    ))
  return (
    <div style={{display:'flex' ,gap:'4px'}} >{reactionsButton}</div>
  )
}

export default ReactionButtons