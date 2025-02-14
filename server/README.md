# Social Media

<aside>
💡

MERN Stack (Banao Technologies)

</aside>

## API Design
**API Server live (base_url)** - https://banao-api-assignment.onrender.com

**API Collection (Postman)** - https://drive.google.com/file/d/1hYs3A9nSnFzVqf8MvjL8B1pj-eGuoSni/view?usp=sharing

`import the downloaded file in Postman or any other API platform.`

`Change the base_url variable in the collection enviroment to API server (link + "/api").`


### Dependencies

node, express, mongoose, dotenv, cors, jsonwebtoken, bcrypt, express-validator, cookie-parser,  @supabase/supabase-js, multer, helmet, express-mongo-sanitize

### Database Schema

**User Document**

| Field  | Type |
| --- | --- |
| _id | ObjectId |
| username | String |
| email | String |
| password | String |
| createdAt | Date |
| updatedAt | Date |

**UserProfile Document**

| Field | Type |
| --- | --- |
| _id | ObjectId |
| user | ObjectId |
| posts | Array[postId] |
| likedPosts | Array[postId] |
| savedPosts | Array[postId] |
| createdAt | Date |
| updatedAt | Date |

**Post Document**

| Field | Type |
| --- | --- |
| _id | ObjectId |
| user | ObjectId |
| content | String |
| image | String |
| tags | Array[String] |
| likes | Array[userId] |
| commentsCount | Number |
| createdAt | Date |
| updatedAt | Date |

**Comment**

| Field | Type |
| --- | --- |
| _id | ObjectId |
| post | ObjectId |
| user | ObjectId |
| content | String |
| createdAt | Date |
| updatedAt | Date |

### Endpoints

**Auth - `/api/auth`**

| Endpoint | Method | Description |
| --- | --- | --- |
| `/signup` | POST | Create a new user and generate a jwt token |
| `/login` | POST | Login a user and generate a jwt token |
| `/logout` | POST | Logouts the users & removes the refresh token |
| `/forgot-password` | POST | Verify user and send password reset token |
| `/refresh-token` | POST | Generates a new access token |
| `/reset-password` | POST | Reset the user’s password |

**User - `/api/user`**

| Endpoint | Method | Description |
| --- | --- | --- |
| `/:id` | GET | Get the user |
| `/me` | GET, PUT, DELETE | Get, Update, and Delete the authenticated user |
| `/:id/profile` | GET | Get, Update and Delete user profile details |
| `/profile` | GET | Get profile details for the authenticated user |
| `/posts` | GET | Get posts of the user |
| `/posts/liked` | GET | Get liked posts |
| `/posts/saved` | GET | Get saved posts |

**Post - `/api/posts`** 

| Endpoint | Method | Description |
| --- | --- | --- |
| `/` | GET, POST | Create a new post or Get all posts by query. |
| `/:id` | GET, PUT, DELETE | Get, Update, and Delete a post |
| `/:id/like` | PUT | Like a post |
| `/:id/unlike` | PUT | Unlike a post |
| `/:id/likes` | GET | Get the users who liked the post |
| `/:id/comments` | GET, POST | Get all comments for the post or Add a new comment for the post |
| `/:id/save` | PUT | Save the post |
| `/:id/unsave` | PUT | UnSave the post |

**Comment - `/comments`** 

| Endpoint | Method | Description |
| --- | --- | --- |
| `/:id` | GET, PUT, DELETE | Get , update or delete the comment |

**Middleware**

| Name | Description |
| --- | --- |
| `authenticate` | Verifies json web token and authenticate users to protected routes |
| `errorHandler` | Global error handler for the app |

