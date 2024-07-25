import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const filteredPosts = posts.filter((post) => {
      if (
        post.title.toUpperCase().includes(search.toUpperCase()) ||
        post.body.toUpperCase().includes(search.toUpperCase())
      ) {
        return true;
      }
    });

    setSearchResults(filteredPosts);
    

    async function fetchPosts() {
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts`);

        if(!response.ok) {
          throw new Error("Network response was not ok")
        }
        const fetchedPosts = await response.json();
  
        setPosts(fetchedPosts);
        
      } catch (error) {
        console.error(error.message);
        setError("Error fetching posts: " + error.message)
      }
    }

    fetchPosts();
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };

    setPosts([newPost, ...posts]);
    setPostBody("");
    setPostTitle("");

    navigate("/")
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id))
    navigate("/")
  };

  return (
    <div className='App'>
      <Header title='React JS Blog' />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home posts={searchResults} />} />
        <Route
          path='/post'
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} setPosts={setPosts} />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
