import React, { useContext, useEffect ,useRef, useState } from "react";
import postcontext from "../context/posts/postcontext";
import Blogcard from "./Blogcard";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart ,faHeartCirclePlus} from '@fortawesome/free-solid-svg-icons'
const Blogs = () => {
    const context = useContext(postcontext);
    const { posts, getPosts ,likepost ,dislikePost} = context;
    useEffect(() => {
        getPosts()
        console.log("started")

    }, [])
    // code to send post data to the modal
    const ref = useRef(null);
    const refclose = useRef(null);
    const [bloginfo , setBloginfo] = useState({id:"" ,title:"" , description:"" , uploadedBy:"" ,})
    const readBlog = (blog)=>{
        ref.current.click();
        setBloginfo({id:blog._id,title:blog.title , description:blog.description , uploadedBy:blog.uploadedBy })
    }
    // like and dislike logic 
    const [liked , setliked] = useState(false)
    const togglelike =()=>{
        if(liked ==false){
            likepost(bloginfo.id)
            setliked(true)
        }
        else{
            dislikePost(bloginfo.id);
            setliked(false);
        }
    }
    return (
        <>
            {/* //modal to read a specific post */}
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{bloginfo.title} -- {bloginfo.uploadedBy}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                {/* title and uploaded by text */}
                                <p className="text-center">{bloginfo.description}</p>
                                <hr />
                                <div id="likearea" className="d-flex justify-content-center align-items-center" >
                                {/* <i className="fa-solid fa-circle-heart">w</i> */}
                                   <h4><FontAwesomeIcon icon={faHeart} onClick={togglelike} className={`${liked===true ? 'liked':" "}`}/></h4> 
                                    {/* <p>Likes</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* modal ends here */}

            <div className="container">
                <h1 className="text-center mt-3">All Blogs</h1>
                <div className="container mx-3">
                    {posts.length === 0 && 'No posts to display'}
                </div>
                <div className="d-flex mt-5 flex-wrap justify-content-around">

                {
                    posts.map((post) => {
                        return <Blogcard key={post._id} readBlog={readBlog} post={post} />
                    })
                }
                </div>
            </div>
        </>
    )
}
export default Blogs