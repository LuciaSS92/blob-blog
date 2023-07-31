import { selectAllPosts, getPostsError, getPostsStatus } from "./postsSlice"
import { useSelector } from "react-redux"
import PostsExcerpt from "./PostsExcerpt"

const PostsList = () => {

    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    let content
    if (postStatus === "loading") {
        content = <p>Loading...</p>
    } else if (postStatus === "succeeded") {
        content = posts.map(post => <PostsExcerpt key={post.id} post={post} />)
    }
    else if (postStatus === "failed") {
        content = <p>{error}</p>
    }

    return (
        <main className="container-fluid d-flex justify-content-center">
        <section id="postList">
            {content}
        </section>
        </main>
    )
}

export default PostsList