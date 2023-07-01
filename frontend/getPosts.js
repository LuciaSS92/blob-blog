async function getPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts')
        const data = await response.json()

        console.log(data)

        data.forEach(posts => {
            const limitBody = posts.body.substring(0, 50)
            const postContent = document.createRange().createContextualFragment(
                `
                <div class="card  text-center mb-3 shadow" >
                <img class="card-img-top">
                <article class="card-body " >                   
                    <h2 class="card-title">${posts.title}</h2>
                    <p class="card-text">${limitBody} ... <a href="">Read More</a></p>                       
                <div class="card-footer d-flex justify-content-between">     
                <p>⏱ ${posts.created}</p>          
                <button class="btn btn-secondary">🗑✒</button>
                </div>  
                </article>
                </div>`
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