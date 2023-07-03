const url = 'http://localhost:3000/posts'


// GET all posts from database and image from server
getPosts()

async function getPosts() {
    try {
        const response = await fetch(url)
        const data = await response.json()

        data.forEach(posts => {
            const limitBody = posts.body.substring(0, 50)
            const fullBody = posts.body
            const postContent = document.createRange().createContextualFragment(
                `<article class="card  mb-3 shadow">                
                <div class="card-body d-flex justify-content-around" >
                <div class="polaroid card shadow text-center col-md-6">
                <img class="photo" id="photo" src="../backend/public/images/${posts.id}.jpg"/>   
                <p id="date"> ${posts.created}</p>    
                </div>
               <div class=" col-md-6 d-flex flex-column">
               <div class="d-flex flex-direction-row  justify-content-end align-self-end ">
               <button onclick="editPost(${posts.id})"class="btn btn-secondary  ">✒</button>                  
                <button onclick="deletePost(${posts.id})" class="btn btn-secondary   justify-content-end">🗑</button> 
                </div> 
                <h2 class="card-title ">${posts.title} </h2>
                <p class="card-text">${limitBody} (...)</p>  
                <button onclick="toggleRead()" class="btn" >Read more</button>               
                </div>                       
                </div>                                         
                </article>`
            )

            const postListElement = document.querySelector('#postList')
            postListElement.prepend(postContent)

            // const eventPhoto = document.getElementById("photo")
            // eventPhoto.addEventListener("click ", function () {
            //     console.log("photo")
            // })
        })
    }
    catch (error) {
        console.error('Error fetching data', error)
    }
}

// function toggleRead(text){

// }


// Opens up the form to create a new post

function openForm() {
    const toggleForm = document.getElementById('showForm')
    toggleForm.style.display = toggleForm.style.display === 'none' ? '' : 'none';
}

//POST  Send the information from the from to the server

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

    console.log(formData)

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
            await fetch(url + `/${id}`, {
                method: 'DELETE'
            })
            getPosts()
        }
        catch (error) {
            console.error('Error deleting post', error)
        }
    }
}