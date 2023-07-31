import { useState } from "react"
import { useDispatch } from "react-redux"
import { addNewPost } from "./postsSlice"
import { useNavigate } from "react-router-dom"

const AddPostForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [file, setFile] = useState(null)
    const [addRequestStatus, setAddRequestStatus] = useState("idle")

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onFileChanged = e => setFile(e.target.files[0])

    const canSave = [title, content, file].every(Boolean) && addRequestStatus === "idle"

    const onSavePostClicked = () => {
        if (canSave) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', content);
            formData.append('file', file);
            try {
                setAddRequestStatus("pending")
                dispatch(addNewPost(formData)).unwrap()

                setTitle("")
                setContent("")
                setFile(null)
                navigate("/")
                navigate(0)
            } catch (err) {
                console.error("Failed to save the post", err)
            } finally {
                setAddRequestStatus("idle")
            }
        }
    }

    return (
        <section>
           <h2 className="head-title d-flex justify-content-center">Add new  post</h2>
            <div className="container-fluid d-flex justify-content-center py-3">
                <form encType="multipart/form-data" id="newPostForm" className="d-flex">
                    <div class="input-group">
                        <input
                            type="text"
                            name="postTitle"
                            value={title}
                            onChange={onTitleChanged}
                            placeholder="Title"
                            className="form-control me-2 text-center"
                        />
                        <textarea
                            type="text"
                            name="postContent"
                            value={content}
                            onChange={onContentChanged}
                            placeholder="Share your thoughts..."
                            className="form-control me-2 text-center"
                        />
                        <input
                            id="uploadFile"
                            name="file"                            
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            class="form-control me-2 text-center"
                            onChange={onFileChanged}
                            required />
                    </div>
                    <button
                        type="button"
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                        className="btn btn-lg btn-secondary"
                    >💾</button>
                </form>
            </div>
        </section>
    )

}

export default AddPostForm