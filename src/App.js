
import './App.css';
import Blogs from './components/Blogs';
import Navbar from './components/Navbar';
import PostBlog from './components/PostBlog';
import PostState from './context/posts/PostState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Login from './components/Login';
import AdminPanel from './components/Admin Panel ui/AdminPanel';
import AdminPanelPosts from './components/Admin Panel ui/AdminPanelPosts';
import AddPost from './components/AddPost';
// import AdminState from './context/posts/AdminState';
import Signup from './components/Signup';
import AccessDenied from './components/Admin Panel ui/AccessDenied';
function App() {
  return (
    <>
      <PostState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/post" element={<PostBlog />} />
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup/>}/>
              <Route path="/adminpanel" element={<AdminPanel />} />
              <Route path='/adminpanel/posts' element={<AdminPanelPosts />} />
              <Route path='/adminaccessdenied' element={<AccessDenied/>}/>
              <Route path='/addpost' element={<AddPost />} />

           
          </Routes>
        </Router>
      </PostState>
    </>
  );
}

export default App;
