
import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminState from "../../context/posts/AdminState";





const Admininfo = () => {
    const navigate = useNavigate()
    const [admindetails , setadmindtls] = useState({name:"" , email:"",joined:"",profilepic:"" ,adminaccess:""});
    const fetchdtls =async(token)=>{
        if(!token){
            navigate('/login')
        }
        const responce =await fetch("http://localhost:5000/api/auth/getadmininfo" ,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":token
            }
        })
        const ordtls = await responce.json();
        setadmindtls({name:ordtls.name , email:ordtls.email ,joined:ordtls.joinedDate ,profilepic:ordtls.profilepic ,adminaccess:ordtls.adminaccess})
    }
    
    useEffect(() => {
      
      fetchdtls(localStorage.getItem('psyblog_api_auth_token'))
      
    }, [])
    return (
        <>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-around">
                    <div id="profilepic" className=" mt-5">
                        <img src={admindetails.profilepic} alt="" className="img-fluid" />
                    </div>
                    <div className="admininfoc">
                        <div class="card" style={{ width: "20rem", height: "20rem" }}>
                            <div class="card-header">
                                Account Details
                            </div>
                            <ul class="list-group list-group-flush mx-1">
                                <li class="list-group-item">Name : {admindetails.name}</li>
                                <li class="list-group-item">email : {admindetails.email}</li>
                                <li class="list-group-item">joined :{admindetails.joined}</li>
                                <li class="list-group-item">Admin Permission :{admindetails.adminaccess === true?"YES":"NO"}</li>
                            </ul>
                        </div>
                        <button className="btn btn-sm btn-outline-success mt-3">Edit Profile</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Admininfo;