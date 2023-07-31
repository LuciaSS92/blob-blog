import { Link } from "react-router-dom"

// port to be changed with a .env
const path = "http://localhost:3001/images/"


const PostsExcerpt = ({ post }) => {
    return (
        <article className="card  mb-3 shadow">
            <div className="card-body d-flex justify-content-around" >
                <div className="polaroid card shadow text-center col-md-6">
                    <img className="photo" src={`${path}${post.id}.jpg`} alt={post.id} />
                    <p id="date"> {post.created}</p>
                </div>
                <div className=" col-md-5 d-flex flex-column">
                    <h2 className="card-title">{post.title}</h2>
                    <p className="card-text">{post.body?.substring(0, 50)}...</p>
                    <Link className="btn" to={`post/${post.id}`}>View Post 👀</Link>
                </div>
            </div>

        </article>
    )
}

export default PostsExcerpt