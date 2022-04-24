import React, { useState, useEffect } from "react";
import AdminPanelNav from "./AdminPanelNav";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
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
        if(!localStorage.getItem('psyblog_api_auth_token')) navigate('/login')
    }, [])

    return (<>
        <AdminPanelNav />
        <div className="container">
            <h4 className="text-center mx-5">My Posts</h4>
            {posts.length === 0 && 'No notes to display'}
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
                        return <Post key={post._id} post={post} />
                    })
                }
                       
                    </tbody>
                </table>
                {/* {
                    posts.map((post) => {
                        return <Post key={post._id} post={post} />
                    })
                } */}
            </div>
        </div>
    </>)
}
export default AdminPanelPosts