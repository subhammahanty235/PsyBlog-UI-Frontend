import {useState} from "react";
import postcontext from "./postcontext";

const PostState = (props)=>{
    const host = 'http://localhost:5000/api/posts';
    const initialposts = [];
    //this state is for holding all the notes
    const [posts , setPosts] = useState(initialposts);
    
    //function to get all posts
    const getPosts =async ()=>{
       const responce =await fetch(`${host}/fetchblogs`,{
           method:"GET",
           headers:{
               "Content-Type":"application/json",
           }
       })
       const allposts = await responce.json();
       console.log(allposts)
       setPosts(allposts);
    }

    //function to add a new blog in the database through frontendd
    const addPost =async (title , shortdesc , description , uploadedBy , tag)=>{
        const responce = await fetch(`${host}/addblog` ,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('psyblog_api_auth_token')
            },
            body:JSON.stringify({title , shortdesc , description , uploadedBy , tag})
        })
        const newpost =await  responce.json();
        setPosts(posts.concat(newpost))
    }

    const likepost = async(id)=>{
        const responce = await fetch(`${host}/likepost/${id}`,{
            method:"PUT" 
        })
        

    }
    const dislikePost = async(id)=>{
        const responce = await fetch(`${host}/dislikepost/${id}`,{
            method:"PUT"
        })
    }
    return(
        <>
            <postcontext.Provider value={{posts ,getPosts , addPost ,likepost ,dislikePost}}>
                {props.children}
            </postcontext.Provider>
        </>
    )
}
export default PostState