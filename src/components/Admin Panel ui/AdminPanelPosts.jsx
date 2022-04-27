import React, { useState, useEffect ,useRef, useContext } from "react";
import AdminPanelNav from "./AdminPanelNav";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import AdminState from "../../context/posts/AdminState";
import postcontext from "../../context/posts/postcontext";
const AdminPanelPosts = () => {
    const navigate = useNavigate()
    const postsall = []
    const [posts, setposts] = useState(postsall)
    const fetchposts = async (token) => {
        const responce = await fetch('http://localhost:5000/api/admin/adminposts', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        })
        const data = await responce.json()
        setposts(data);

    }
    useEffect(() => {
        fetchposts(localStorage.getItem('psyblog_api_auth_token'))
        if (!localStorage.getItem('psyblog_api_auth_token')) navigate('/login')
    }, [])

    // update blog logic
    const ref = useRef(null)
    const refClose = useRef(null)
    const context = useContext(postcontext);
    const {editPost} = context;
    const [post, setpost] = useState({id: "", etitle: "",eshortdesc:"", edescription: "", etag: ""})
    const updatePost = (currentpost) => {
        ref.current.click();
        setpost({id: currentpost._id, etitle: currentpost.title,eshortdesc:currentpost.shortdesc, edescription: currentpost.description, etag:currentpost.tag})
    }

    const handleClick = (e)=>{ 
        editPost(post.id, post.etitle,post.eshortdesc, post.edescription, post.etag)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setpost({...post, [e.target.name]: e.target.value})
    }
    return (<>



        <AdminPanelNav />
        {/* edit modal */}
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit post</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="my-3">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={post.etitle}  onChange={onChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="eshortdesc" className="form-label">Short Description</label>
                                <input type="text" className="form-control" id="eshortdesc" name="eshortdesc" value={post.eshortdesc}  onChange={onChange} maxLength={20} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" value={post.edescription} onChange={onChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={post.etag} onChange={onChange} />
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClick} type="button" className="btn btn-primary">Update post</button>
                    </div>
                </div>
            </div>
        </div>

        {/*Posts Table  */}

        <div className="container">
            <h4 className="text-center mx-5">My Posts</h4>

            <div className="mx-4 psts">
                <table class="table border tableforposts">
                    <thead>
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Title</th>
                            <th scope="col">uploaded</th>
                            <th scope="col">Likes</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            posts.map((post) => {
                                return <Post key={post._id} post={post} updatePost={updatePost}/>
                            })
                        }

                    </tbody>
                </table>
                {/* {
                    posts.map((post) => {
                        return <Post key={post._id} post={post} />
                    })
                } */}
                {posts.length === 0 && <p className="text-center">No posts to display</p>}
            </div>
        </div>

    </>)
}
export default AdminPanelPosts