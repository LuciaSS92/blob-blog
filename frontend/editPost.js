const url = 'http://localhost:3000/posts'

//GET post by id
drawPost()

async function drawPost() {
    const postId = localStorage.getItem('postId');
    const path = "../backend/public/images/"

    try {
        const response = await fetch(url + `/${postId}`)
        const data = await response.json()

        const titleField = document.querySelector(".card-title")
        titleField.innerHTML = data.title

        const bodyField = document.querySelector(".card-text")
        bodyField.innerHTML = data.body

        const dateField = document.querySelector("#date")
        dateField.innerHTML = data.created

        const photoField = document.querySelector(".photo")
        photoField.src = path + `${data.id}.jpg`
    }
    catch (error) {
        console.error('Error fetching data', error)
    }
}


//PUT save changes to post
// TODO: Pending to add form to update fields
const save = document.getElementById("save-button")

save.addEventListener("submit", async (event) => {
    event.preventDefault()

    const postId = localStorage.getItem('postId');
    const newTitle = document.getElementById('title-input').value
    const newBody = document.getElementById('body-input').value

    const data = { newTitle, newBody }

    try {
        const response = await fetch(url + `${postId}`,
            {
                method: "PUT",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

    }
    catch (error) {
        console.error('Error deleting post', error)
    }
})

//Cancel button
function cancel() {
    window.location.href = "index.html";
}