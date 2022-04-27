import Post from "../../components/Admin Panel ui/Post";
import adminContext from "./adminContext";

const AdminState = ()=>{
    const deletePost =async(id)=>{
        const responce = await fetch(`http://localhost:5000/api/admin/deletepost/${id}`,{
            method:"PUT",

        })

    }
    return(
        <>
         <adminContext.Provider value={{deletePost}}>
              <Post/>
         </adminContext.Provider>
        </>
    )
}
export default AdminState