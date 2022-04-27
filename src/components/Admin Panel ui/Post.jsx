import React ,{useContext} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileEdit  , faRemove } from '@fortawesome/free-solid-svg-icons'
import postcontext from "../../context/posts/postcontext";
const Post = (props) => {
    const {post ,updatePost} = props;
    const context = useContext(postcontext)
    const {deletePost} = context;
    return(<>
    
    

        <tr>
            <th scope="row">{post.title}</th>
            <td>{post.uploaded}</td>
            <td>{post.likes}</td>
            <td> <FontAwesomeIcon icon={faFileEdit} className="opeartionbtns" onClick={()=>{updatePost(post)}}/></td>
            <td><FontAwesomeIcon icon={faRemove} className="opeartionbtns" onClick={()=>{deletePost(post._id)}}/></td>
        </tr>
    
        {/* <ul class="nav justify-content-around">
            <li class="nav-item">
               
                <p>{post.title}</p>
            </li>
            <li class="nav-item">
               
                <p>{post.uploaded}</p>
            </li>
            <li class="nav-item">
                
                <p>{post.likes}</p>
            </li>
            <li class="nav-item">
                <FontAwesomeIcon icon={faFileEdit}/>
            </li>
            <li class="nav-item">
                <FontAwesomeIcon icon={faDeleteLeft}/>
            </li>
        </ul> */}
    
    </>)
}
export default Post;