import React, { useState  } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const [loginCred , setloginCred] = useState({email:"", password:""});
    const navigate = useNavigate()
    const onFilled=(e)=>{
        setloginCred({...loginCred ,[e.target.name]:e.target.value})
    }
    const loginclick =async(e)=>{
        e.preventDefault()
        const responce =await fetch('http://localhost:5000/api/auth/adminlogin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email: loginCred.email, password: loginCred.password})
        })
        const resp = await responce.json();
        console.log(resp)
        if(resp.success==true){
            localStorage.setItem('psyblog_api_auth_token' , resp.authtoken);
            navigate('/')
        }
    }
    return (
        <>
            <div className="container mt-5">
                <h3 className="text-center">Log in to your account</h3>
                <hr />
                <form className="mt-3">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" name="email" onChange={onFilled} value={loginCred.email} />
                            
                    </div>
                    <div class="mb-3">
                        <label for="InputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="InputPassword1" name="password" onChange={onFilled} value={loginCred.password}/>
                    </div>
                    <div className="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary mx-3" onClick={loginclick}>Log in</button>
                    <Link type="button" class="btn btn-primary" to='/signup'>Sign Up</Link>

                    </div>
                </form>
            </div>
        </>
    )
}
export default Login;