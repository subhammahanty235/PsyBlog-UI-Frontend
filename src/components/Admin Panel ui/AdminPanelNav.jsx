import React from "react";
import { Link, useLocation } from "react-router-dom";
const AdminPanelNav = () => {
    const location = useLocation()
    return (<>
        <ul class="nav navbar-dark justify-content-center " style={{backgroundColor: "#e3f2fd"}}>
            <li class="nav-item">
                <Link class={`nav-link button ${location.pathname=='/adminpanel' ?'button-bold-custom':" "}`} aria-current="page" to="/adminpanel">My Account</Link>
            </li>
            <li class="nav-item">
                <Link class={`nav-link button ${location.pathname=='/adminpanel/posts' ?'button-bold-custom':" "}`} to="/adminpanel/posts">Posts</Link>
            </li>
            
        </ul>
    </>)
}
export default AdminPanelNav;