import { createSlice,createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const userAdaptor=createEntityAdapter()

 const initialUser=userAdaptor.getInitialState({})


const extendedApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUser:builder.query({
            query:()=> '/users',
            transformResponse:responseData=>{
                return userAdaptor.setAll(initialUser,responseData)

            },
            providesTags:(results,error,args)=[
                {type:'USER',id:'id'},
                ...results.ids.map((id)=>{type:'USER',id})
            ]
        })
    })
    
})



const { useGetUserQuery}=extendedApiSlice


const selectUserCathedData= extendedApiSlice.endpoints.getUser.select();

const selectUserData=createSelector(
    selectUserCathedData,
    userResult=>userResult.data
)

 export const {
    selectAll:SelectAllUsers,
    selectById:SelectUserById

    
}=userAdaptor.getSelectors((state)=>selectUserData(state))




// export {}=userSlice.actions
export default userSlice.reducer