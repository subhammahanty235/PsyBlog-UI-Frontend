import React from "react";


const Blogcard = (props) => {
    const {post ,readBlog} = props;
    return (
        <>
            <div class="card mb-4 " style={{width: "18rem" }}>
                
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title text-center mb-0">{post.title}</h5>
                        <hr />
                        <p className="card-text">{post.shortdesc}</p>
                        {/* <p class="card-text">{post.description}</p> */}
                        <button class="btn btn-primary " onClick={()=>{readBlog(post)}} >Read</button>
                    </div>
            </div>
        </>
    )
}

export default Blogcard;