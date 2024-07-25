import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const PostPage = ({ posts, handleDelete, setPosts }) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(()=> {
        if(post) {
            setTitle(post.title);
            setBody(post.body);
        }
    }, [post])

    const handleEdit = (id) => {
        const editedDatetime = format(new Date(), "MMMM dd, yyyy pp");
        const editedPost = posts.map(post => 
            post.id === id ? 
            {...post, title, body, editedDatetime } : 
            post
        );

        setPosts(editedPost);
        setEdit(false);
    }

    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        {edit ? 
                        <input
                            className="title-input" 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                        /> : <h2>{title}</h2>}
                        <p className="postDate">
                            {post.datetime}
                            {post.editedDatetime && 
                                <span> (edited: {post.editedDatetime})</span>
                            }
                        </p>
                        {edit ? 
                        <textarea 
                            className="body-textarea"
                            name="body" 
                            id="body" 
                            rows={4}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        /> : <p className="postBody">{body}</p>}
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                        <button 
                            style={{marginLeft: "10px", backgroundColor: "grey"}} 
                            onClick={() => {
                                if(edit){
                                    handleEdit(post.id);
                                }
                                setEdit(!edit);
                            }}
                        >
                            {edit ? "Save" : "Edit"}
                        </button>
                        <button style={{marginLeft: "10px"}} onClick={() => {navigate(-1)}}>
                            cancel
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage;
