<h1 align="center" id="title">Blog System API</h1>

<p id="description">This is a Blog System API built with Node.js Express and Sequelize. It supports user authentication CRUD operations for blog posts and real-time updates using WebSockets.</p>

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   User registration and login
*   Create read update and delete blog posts
*   Real-time updates for post creation updates and deletions
*   Error handling middleware
*   WebSocket integration with socket.io
*   JWT for secure authentication

<h2>🚀 Demo</h2>

[video demonstration](https://drive.google.com/file/d/1wGiqaw9kbF7eXFXA-nP6pq645Egvpbtt/view?usp=sharing)

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository:</p>

```
git clone https://github.com/sandundil2002/Blog_System_API.git
```

<p>2. Install dependencies:</p>

```
npm install
```

<p>3. Create a .env file in the root directory and add the following environment variables:</p>

```
DB_HOST=your_db_host
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
PORT=3000
```

<p>4. Run the database migrations:</p>

```
npx sequelize-cli db:migrate
```

<p>5. Start the server:</p>

```
npm start
```

<h2>🌐 API Endpoints </h2>

<h4>User Authentication</h4>

  * POST /auth/register - Register a new user
  * POST /auth/login - Login a user

<h4>Blog Posts</h4>

  * GET /posts - Get all posts
  * GET /posts/:id - Get a post by ID
  * POST /posts - Create a new post
  * PUT /posts/:id - Update a post by ID
  * DELETE /posts/:id - Delete a post by ID

<h2> 📄 API Documentation </h2>

  * You can view the detailed API documentation with example requests and responses <a href="https://documenter.getpostman.com/view/35384990/2sAYkLncqJ">here</a>
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Node.js
*   Express
*   Sequelize
*   MySQL
*   Socket.io
*   JWT
