import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileEdit  , faRemove } from '@fortawesome/free-solid-svg-icons'
const Post = (props) => {
    const {post} = props;
    return(<>
    
    
        <tr>
            <th scope="row">{post.title}</th>
            <td>{post.uploaded}</td>
            <td>{post.likes}</td>
            <td> <FontAwesomeIcon icon={faFileEdit} className="opeartionbtns"/></td>
            <td><FontAwesomeIcon icon={faRemove} className="opeartionbtns"/></td>
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