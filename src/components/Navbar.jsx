import React, { useState, useEffect } from "react";
import { Link ,useLocation} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'
import AddPost from "./AddPost";
const Navbar = () => {
    const location = useLocation()
    const [details, setdetails] = useState({ username: "", email: "" ,adminaccess:"" })
    //function to get user details after login

    const getdetails = async (token) => {
        const responce = await fetch('http://localhost:5000/api/auth/getadmininfo', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'auth-token': token
            }
        })
        const data =await responce.json();
        localStorage.setItem('psyblog_user_name' , data.name)
        setdetails({ username: data.name, email: data.email ,adminaccess:data.adminaccess })
    }
    const [tokenF , setTokenf] = useState(false)
    const settk = ()=>{
        if(!localStorage.getItem('psyblog_api_auth_token'))setTokenf(false);
        else setTokenf(true);
    }
    useEffect(() => {
        settk()
        getdetails(localStorage.getItem('psyblog_api_auth_token'))
        console.log(details.username)
    },)
    const logout = ()=>{
        localStorage.removeItem('psyblog_api_auth_token')
        localStorage.removeItem('psyblog_user_name')
        window.location.reload(false)
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">PsyBlog</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="/">Link</a>
                            </li> */}


                        </ul>
                        <Link to="/login" className={`btn btn-sm btn-outline-success ${tokenF ===false ? "d-block" : "d-none"}`}>LOG IN</Link>
                        {/* dropdown for user details and logout  */}
                        
                        <li className={`nav-item d-flex flex-wrap align-items-center  ${tokenF === false ? "d-none" : "d-block"} `}>
                            <h5 className={`text-center mx-3 ${details.adminaccess===true? "adminname" : "text-white"}`}><Link to='/adminpanel' className={`${details.adminaccess=== true ?" ":"d-none"}`}><FontAwesomeIcon icon={faUserCircle} className={`mx-2`}/></Link>{details.username}</h5>
                            <Link to={'/addpost'}  className={`btn btn-sm btn-outline-success ${details.adminaccess=== true ?"d-block":"d-none"} ${location.pathname === '/addpost'?'d-none':'d-block'}`}>Add Post</Link>
                            <button className="btn btn-sm btn-outline-danger mx-2" onClick={logout}>Log out</button>
                        
                        </li>
                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;