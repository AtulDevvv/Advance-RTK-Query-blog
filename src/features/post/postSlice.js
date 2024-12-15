import {  createSelector, nanoid ,createEntityAdapter} from "@reduxjs/toolkit";


import {sub} from 'date-fns'
import { act } from "react";

import { apiSlice } from "../../api/apiSlice";

const postsAdapter=createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
    
})

const initialState=postsAdapter.getInitialState({
})
 
export const extendedApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getPosts:builder.query({
            query:()=> '/posts',
            transformResponse:responseData=>{
                let min=1;
                const loadedPosts=responseData.map(post=>{
                    if(!post?.data) post.date= sub(new Date(), {minutes:min++}).toISOString();
                    if(!post?.reaction) post.reactions={
                        thumbsup:0,
                wow:0,
                heart:0,
                rocket:0,
                coffee:0

                    }
                    return post;
                })
                return postsAdapter.setAll(initialState,loadedPosts)
            },
            providesTags:(results,error,args)=>[
                {type:'Post',id:'LIST'},
                ...results.ids.map(id=>({type:'Post',id}))
            ]

        }),
        addNewPost:builder.mutation({
            query:initialPost=>({
                url:'/posts',
                method:'POST',
                body:{
                    ...initialPost,
                    userId:Number(initialPost.userId),
                    date:new Date().toISOString,
                    reactions:{
                        thumbsup:0,
                        wow:0,
                        heart:0,
                        rocket:0,
                        coffee:0

                    }
                }
            }),
            invalidatesTags:[
                {types:'POST', id:'LIST'}

            ]

        }),
        getPostByUSerId:builder.query({
            query:id=>{
                let min=1;
                const loadedPost=responseData.map(post=>{
                    if(!post?.date) post.date=sub(new Date(), {minutes:min++}).toISOString()
                        if(!post?.reaction) post.reactions={
                            thumbsup:0,
                            wow:0,
                            heart:0,
                            rocket:0,
                            coffee:0
                        }
                        return post;

                })
                return postsAdapter.setAll(initialState,loadedPost)
            },
            providesTags:(results,error,args)=>{
                return [
                    ...results.ids.map(id=>({type:'POST',id}))
                ]
            }
        }),
        updatePost:builder.query({
            query:initialPost=>({
                url:`/post/${initialPost.id}`,
                method:'PUT',
                body:{
                    ...initialPost,
                    date:new Date().toISOString(),

                }

            }),
            invalidatesTags:(result,error,args)=>[
                {type:'POST',id:args.id}
            ]
        }),
        addReaction:builder.mutation({
            query:({postId,reactions})=>({
                url:`/posts/${postId}`,
                method:'PATCH',
                body:{reactions}
            }),
            async onQueryStarted({postId,reactions},{dispatch,queryFulfilled}){
                const patchResult=dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts',undefined,draft=>{
                        const post=draft.entities[postId]
                        if(post) post.reactions=reactions
                    })
                )
                try{
                    await queryFulfilled

                }
                catch(error){
                    patchResult.undo();

                }
            }
        })

    })

})

 export const {
    useGetPostsQuery,
    useAddNewPostMutation,
    useGetPostByUSerIdQuery,
    useUpdatePostQuery, 
    useAddReactionMutation,


 }=extendedApiSlice

 export const selectPostResults=extendedApiSlice.endpoints.getPosts.select(); 

 const selectPostData=createSelector(
    selectPostResults,
    postsResults=>postsResults.data
 )

export const {
    selectAll:selectAllPosts,
    selectById:getPostById,
    selectIds:selectPostIds,
    
}=postsAdapter.getSelectors(state=>selectPostData(state)??initialState)





