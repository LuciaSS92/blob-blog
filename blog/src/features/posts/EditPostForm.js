import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost, deletePost } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))


    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)


    const canSave = [title, content].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title: title, body: content })).unwrap()

                setTitle('')
                setContent('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section>
            <h2 className="head-title d-flex justify-content-center">Edit post</h2>
            <div className="container-fluid d-flex justify-content-center py-3">
                <form encType="multipart/form-data" id="newPostForm" className="d-flex">
                    <div class="input-group">
                        <input
                            type="text"
                            id="postTitle"
                            name="postTitle"
                            value={title}
                            onChange={onTitleChanged}
                            className="form-control me-2 text-center"
                        />
                        <textarea
                            id="postContent"
                            name="postContent"
                            value={content}
                            onChange={onContentChanged}
                            className="form-control me-2 text-center"
                            cols={60}
                            rows={3}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                        className="btn btn-lg btn-secondary me-2"
                    >
                        💾
                    </button>
                    <button
                        type="button"
                        onClick={onDeletePostClicked}
                        className="btn btn-lg btn-secondary me-2"
                    >
                        🗑
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EditPostForm