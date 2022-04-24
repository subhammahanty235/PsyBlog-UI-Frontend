import React, { useEffect ,useState } from "react";
import { useNavigate } from "react-router-dom";
import postcontext from "../context/posts/postcontext";
import { useContext } from "react";

const AddPost = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('psyblog_api_auth_token')) navigate('/login')
    }, [])
    const context = useContext(postcontext)
    const {addPost} = context;

    const username = localStorage.getItem('psyblog_user_name');
    const [blog ,setblog] = useState({title:"" , shortdesc:"",description:"",tag:"", description:""})
    const onfilled = (e)=>{
        setblog({...blog , [e.target.name]:e.target.value})
    }
    const submitblog = (e)=>{
        e.preventDefault()
        addPost(blog.title ,blog.shortdesc , blog.description,username,blog.tag)
        
        setblog({title:"" , shortdesc:"",description:"",tag:" ", description:""})
        
    }
    return (<>
        <div className="container">
            <form onSubmit={submitblog}>
                <div class="mb-3">
                    <label for="Inputtitle" class="form-label">Title</label>
                    <input type="text" class="form-control" id="Inputtitle" name="title" value={blog.title} onChange={onfilled} aria-describedby="titleHelp" minLength={8}/>
                        <div id="titleHelp" class="form-text">title must be atleast 8 characters</div>
                </div>
                <div class="mb-3">
                    <label for="Inputshortdesc" class="form-label">Short Description</label>
                    <input type="text" class="form-control" id="Inputshortdesc" name="shortdesc" value={blog.shortdesc} onChange={onfilled} aria-describedby="shortdescHelp" maxLength={20}/>
                        <div id="shortdescHelp" class="form-text">Short description must be maximum 20charcters long</div>
                </div>
                <div class="mb-3">
                    <label for="Inputtag" class="form-label">Tag related to your Post</label>
                    <input type="text" class="form-control" value={blog.tag} onChange={onfilled} id="Inputtag" name="tag" />
                        {/* <div id="tagHelp" class="form-text">Short description must be maximum 20charcters long</div> */}
                </div>
                <div class="mb-3">
                    <label for="Inputblog" class="form-label">Blog</label>
                    <textarea class="form-control" placeholder="Blog" id="inputblog" value={blog.description} onChange={onfilled} name="description" style={{height: "200px"}}></textarea>
                        {/* <div id="tagHelp" class="form-text">Short description must be maximum 20charcters long</div> */}
                </div>
                <button type="submit" class="btn btn-primary">Post</button>
            </form>
        </div>
    </>)
}
export default AddPost;