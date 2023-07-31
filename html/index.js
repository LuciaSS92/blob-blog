const url = 'http://localhost:3001/posts'

// GET all posts from database and images from server
drawPosts()

async function drawPosts() {
    try {
        const response = await fetch(url)
        const data = await response.json()

        //Post card for each post gathered 
        data.forEach(posts => {
            const limitBody = posts.body.substring(0, 50)
            const postContent = document.createRange().createContextualFragment(
                `<article class="card  mb-3 shadow">                
                <div class="card-body d-flex justify-content-around" >
                <div class="polaroid card shadow text-center col-md-6">
                <a href="post.html">
                <img class="photo" id="photo" src="../backend/public/images/${posts.id}.jpg"/>  </a> 
                <p id="date"> ${posts.created}</p>    
                </div>
                <div class=" col-md-6 d-flex flex-column">
                <div class=" justify-content-end align-self-end ">                                
                <button onclick="deletePost(${posts.id})" class="btn btn-secondary   justify-content-end">🗑</button> 
                </div>                
                <h2 class="card-title ">${posts.title} </h2>
                <p class="card-text">${limitBody} (...)</p>              
                </div>                       
                </div>                  
                </article>`
            )

            //Turn image into link to see full post, by saving current id
            postContent.querySelector("#photo").addEventListener('click', () => {
                localStorage.setItem('postId', posts.id);
                window.location.href = "post.html";
            });

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

//POST  Send the information from the form to the server
const newPost = document.getElementById("newPostForm")

newPost.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const file = document.getElementById("uploadFile").files[0]

    const formData = new FormData()
    formData.append("title", title)
    formData.append("body", body)
    formData.append("file", file)

    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",

            },
            body: formData
        })

        newPost.reset()
        drawPosts()
    }
    catch (error) {
        console.error('Error saving post to database', error)
    }
})

//Delete post by id
async function deletePost(id) {
    const deleteConfirmation = window.confirm('Are you sure you want to delete this post?')

    if (deleteConfirmation) {
        try {
            await fetch(url + `/${id}`, {
                method: 'DELETE'
            })
            drawPosts()
        }
        catch (error) {
            console.error('Error deleting post', error)
        }
    }
}