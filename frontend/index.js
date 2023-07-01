// GET all posts from database and image from server
getPosts()

async function getPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts')
        const data = await response.json()

        data.forEach(posts => {
            const limitBody = posts.body.substring(0, 50)
            const postContent = document.createRange().createContextualFragment(
                `<article class="card text-center mb-3 shadow">                
                <div class="card-body " >
                <img class="card-img-top">                   
                <h2 class="card-title">${posts.title}</h2>
                <p class="card-text">${limitBody} (...)</p>                       
                <div class="card-footer d-flex justify-content-between">     
                <p>⏱ ${posts.created}</p>          
                <button onclick="editPost(${posts.id})"class="btn btn-secondary">✒</button>
                <button onclick="deletePost(${posts.id})" class="btn btn-secondary">🗑</button>
                </div>  
                </div>
                </article>`
            )

            const postListElement = document.querySelector('#postList')
            postListElement.prepend(postContent)

        })
    }
    catch (error) {
        console.error('Error fetching data', error)
    }
}

// Opens up the form to create a new post

function openForm() {
    const toggleForm = document.getElementById('showForm')
    toggleForm.style.display = toggleForm.style.display === 'none' ? '' : 'none';
}

// Send the information from the from to the server

const newPost = document.getElementById("newPostForm")

newPost.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    const data = { title, body }

    try {
        const response = await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        newPost.reset()
        getPosts()
    }
    catch (error) {
        console.error('Error saving post to database', error)
    }
})

//EDIT post by its ID
async function editPost(id) {
    console.log(id)
}

//Delete post by its ID
async function deletePost(id) {
    const deleteConfirmation = window.confirm('Are you sure you want to delete this post?')

    if (deleteConfirmation) {
        try {
            await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE'
            })
            getPosts()
        }
        catch (error) {
            console.error('Error deleting post', error)
        }
    }
}