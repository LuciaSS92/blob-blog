async function getPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts')
        const data = await response.json()

        console.log(data)

        data.forEach(posts => {
            const limitBody = posts.body.substring(0, 50)
            const postContent = document.createRange().createContextualFragment(
                `<article>                   
                    <h2>${posts.title}</h2>
                    <p>${limitBody} ... <a href="">Read More</a></p>
                    <p>${posts.created}</p>
                    <button>Delete</button>
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

getPosts()