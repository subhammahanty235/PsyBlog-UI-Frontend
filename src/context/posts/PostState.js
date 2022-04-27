import {useState} from "react";
import postcontext from "./postcontext";

const PostState = (props)=>{
    const host = 'http://localhost:5000/api/posts';
    const initialposts = [];
    //this state is for holding all the notes
    const [posts , setPosts] = useState(initialposts);
    const [userdetsils ,setud] = useState([]);
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
        return responce.json();
        

    }
    const dislikePost = async(id)=>{
        const responce = await fetch(`${host}/dislikepost/${id}`,{
            method:"PUT"
        })
    }
    const getuser = async()=>{
        const responce = await fetch('http://localhost:5000/api/auth/getadmininfo',{
            method:'POST',
            headers:{
                "auth-token":localStorage.getItem('psyblog_api_auth_token')
            }
        })
        const res = await responce.json();
        setud(res);
    }
    const deletePost =async(id)=>{
        const responce = await fetch(`http://localhost:5000/api/admin/deletepost/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('psyblog_api_auth_token')
            }

        })
        const result = responce.json();
        const newposts = posts.filter((post)=>{return post._id !== id});
        setPosts(newposts);

    }

    const editPost = async (id, title,shortdesc, description, tag) => {
        // API Call 
        const response = await fetch(`http://localhost:5000/api/admin/updatepost/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('psyblog_api_auth_token')
          },
          body: JSON.stringify({title,shortdesc, description, tag})
        });
        const json = await response.json(); 
    
         let newposts = JSON.parse(JSON.stringify(posts))
        // Logic to edit in client
        for (let index = 0; index < newposts.length; index++) {
          const element = newposts[index];
          if (element._id === id) {
            newposts[index].title = title;
            newposts[index].shortdesc = shortdesc;
            newposts[index].description = description;
            newposts[index].tag = tag; 
            break; 
          }
        }  
        setPosts(newposts);
      }
    return(
        <>
            <postcontext.Provider value={{posts ,getPosts , addPost ,likepost ,dislikePost ,getuser ,userdetsils ,deletePost ,editPost}}>
                {props.children}
            </postcontext.Provider>
        </>
    )
}

export default PostState