# Discussion Forum Project
## Overview
This project is a discussion forum where users can create accounts, post discussions, comment on discussions, and interact with other users' posts. The backend is built using Express.js and MongoDB.

## Features
- User authentication (signup and login)
- User management (update, delete, search, follow, unfollow)
- Post discussions with text and images
- Interact with posts (comment, like, view)
- Search discussions by hashtags or text
- Manage comments (like, reply, delete)
- View count for posts

- ## Prerequisites
- Node.js
- MongoDB

- ### Installation
1. Clone the repository:
   ```sh
   git clone "repo-link"
2. Navigate to the project directory:
   cd discussion-platform
3. Install dependencies:
   npm install
4. Set up environment variables. Create a .env file in the root directory with the following variables:
   MONGO_URI=your_mongodb_connection_string
   PORT=your_port_number
   
- ## Running the Project
  npm start

- ### API DOCUMENTATION
  ## User Routes
  -Register a new user.
  -POST /api/user/register.
  -Login user.
  -POST /api/user/login.
  -Update user information.
  -PATCH /api/user/update/:id.
  -Delete user.
  -DELETE /api/user/delete/:id.
  -Get list of all users.
  -GET /api/user/getusers.
  -Search user by name.
  -GET /api/user/search/:name.
  -Follow a user.
  -POST /api/user/follow/:id.
  -Unfollow a user.
  -POST /api/user/unfollow/:id.
## Discussion Routes
  -Create a new discussion.
  -POST /api/discussion/create.
  -Update a discussion.
  -PATCH /api/discussion/update/:discussionId.
  -Delete a discussion.
  -DELETE /api/discussion/delete/:discussionId.
  -Get discussions by hashtags.
  -GET /api/discussion/tags/:tags.
  -Get discussions by text.
  -GET /api/discussion/text/:text.
  -Comment on a discussion.
  -POST /api/discussion/comment/:discussionId.
  -Like a discussion.
  -POST /api/discussion/likes/:discussionId.
  -Like a comment.
  -POST /api/discussion/like-comment/:discussionId/:commentId.
  -Get post views count.
  -GET /api/discussion/postviews/:discussionId.
  -Reply to a comment.
  -POST /api/discussion/reply/:discussionId/:commentId.
  -Like a reply.
  -POST /api/discussion/like-reply/:discussionId/:commentId/:replyId.


