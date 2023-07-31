import { useSelector } from "react-redux"
import { selectPostById } from "./postsSlice"

import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

// port to be changed with a .env
const path = "http://localhost:3001/images/"

const SinglePostPage = () => {

    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        )
    }

    return (
        <main className="container-fluid d-flex justify-content-center">
            <section id="postList">
                <article className="card  mb-3 shadow">
                    <div className="card-body d-flex justify-content-around" >
                        <div className="polaroid card shadow text-center col-md-6">
                            <img className="photo" src={`${path}${post.id}.jpg`} alt={post.id} />
                            <p id="date"> {post.created}</p>
                        </div>
                        <div className=" col-md-5 d-flex flex-column ">
                            <h2 className="card-title">{post.title}</h2>
                            <p className="card-text">{post.body}</p>
                            <Link className="btn" to={`/post/edit/${post.id}`}>Edit Post 🎨</Link>
                        </div>
                    </div>
                </article>
            </section>
        </main>


    )
}
export default SinglePostPage