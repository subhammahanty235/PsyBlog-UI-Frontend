import React ,{useState ,useEffect}  from "react";
import { useNavigate } from "react-router-dom";
import AdminPanelNav from "./AdminPanelNav";
import Admininfo from "./Admininfo";
const AdminPanel = () => {
    const navigate = useNavigate()
    const [admindetails , setadmindtls] = useState({adminaccess:""});
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
        setadmindtls({adminaccess:ordtls.adminaccess})
        if(admindetails.adminaccess===false){
            navigate('/adminaccessdenied')
        }
    }
    
    useEffect(() => {
        
      fetchdtls(localStorage.getItem('psyblog_api_auth_token'))
    //   checkAdmin()
    })
    
    return (
        <>
       

            <AdminPanelNav />
            {/* admin info panel  */}
            <Admininfo/>
        
        </>
    )
}
export default AdminPanel