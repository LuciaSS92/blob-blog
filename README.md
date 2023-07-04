# The Blob() blog
## Technical test - Blog
Simple blog with HTML, CSS, Bootstrap, javascript, Node.js, MySQL.
- It is possible to see posts data from database as well as image saved on server
- Option to create a new post, saving title and body to database and an image file to server
- Option to delete post content both from db and server
- Option to read full post by clicking on post image

### To be implemented
- Edit post form
- Responsiveness


### Database:
blob.sql can be found on base directory of the repository. 
Save SQL archive to create a new database. 

### Backend:

 ```
cd Keybook/Backend
```
Install dependencies:

```
npm i
```
Run server: 
```
npm start
nodemon
```

### Frontend
Open index.html with Live Server.
When clicking post image, full post view opens up.
When pressing X, goes back to the main page.

