import React, { useContext, useState } from "react";
import postcontext from "../context/posts/postcontext";
const PostBlog = () => {
    const context = useContext(postcontext);
    const { addPost } = context;
    const username = localStorage.getItem('username')
    const [post, setpost] = useState({ title: "", shortdesc: "", description: "", tag: "" })
    const submitPost = () => {
        addPost(post.title, post.shortdesc, post.description, username, post.tag);
        setpost({ title: "", shortdesc: "", description: "", tag: "" });
    }
    const onInputFilled = (e) => {
        setpost({ ...post, [e.target.name]: e.target.value })
    }
    return (
        <div className="container">
            <form onSubmit={submitPost}>
                <div className="mb-3">
                    <label htmlFor="inputtitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="inputtitle" name="title" value={post.title} onChange={onInputFilled} />

                </div>
                <div className="mb-3">
                    <label htmlFor="inputshortdesc" className="form-label">Short Desciption</label>
                    <input type="text" className="form-control" id="inputshortdesc" name="shortdesc" value={post.shortdesc} onChange={onInputFilled} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputblog" className="form-label">Blog</label>
                    <textarea className="form-control" id="inputblog" style={{ height: "15rem" }} name="description" value={post.description} onChange={onInputFilled}></textarea>
                
                {/* <TextareaAutosize
                    cacheMeasurements
                    onHeightChange={(height) => console.log(height)}
                    className="form-control" id="inputblog"  name="description" value={post.description} onChange={onInputFilled}
                /> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputtag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="inputtag" name="tag" value={post.tag} onChange={onInputFilled} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default PostBlog;