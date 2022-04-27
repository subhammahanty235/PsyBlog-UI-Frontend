import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const navigate = useNavigate()
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "",dpurl:'' });
    const handleClick = async (e) => {
        e.preventDefault();
        const responce = await fetch("http://localhost:5000/api/auth/createadmin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password ,dpurl:credentials.dpurl})
        })
        const json = await responce.json();
        console.log(json)
        if (json===true) {
            navigate('/login')
        }
        else {
            alert("Some error occured")
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const [confirmed, setconfirm] = useState(false)
    const comparePw = (e) => {
        if (e.target.value === credentials.password) {
            setconfirm(true)
        }
        else {
            setconfirm(false)
        }
    }
    return (
        <div className="container">
            <h3 className="text-center mx-3 my-5">Create a new account</h3>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="durl" className="form-label">Profile Pic Link <small>You can use your Social media dp links</small></label>
                    <input type="text" className="form-control" id="durl" name='dpurl' value={credentials.dpurl} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Create Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={8} />
                </div>

                <div className="mb-3">
                    <label htmlFor="passwordc" className="form-label">Confirm Password</label>
                    <span className={`${confirmed === true ? "dot-green" : "dot-red"}`}></span>
                    <input type="password" className="form-control" id="passwordc" name='password' onChange={comparePw} minLength={8} />
                </div>


                <button type="submit" className="btn btn-outline-primary" disabled={confirmed !== true || credentials.name.length < 5 || credentials.password.length < 8}>Create Account</button>

            </form>
        </div>

    )
}
export default Signup