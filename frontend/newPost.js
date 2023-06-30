function openForm() {
    const toggleForm = document.getElementById('showForm')
    toggleForm.style.display = toggleForm.style.display === 'none' ? '' : 'none';
}

// function closeForm(){
//     setTimeout(() =>    {
//         (document.getElementById('showForm').style.display = 'none');
//     },(1000)
// )}

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
        location.reload();
    }
    catch (error) {
        console.error('Error sending data to db', error)
    }
})

