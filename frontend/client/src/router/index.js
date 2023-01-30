import { createRouter, createWebHashHistory } from 'vue-router'
import Post from '../views/Post.vue'
import NewPost from '../views/NewPost.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import OnePost from '../views/OnePost.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Post',
    component: Post
  },
  {
    path: '/newpost/',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup/',
    name: 'Signup',
    component: Signup
  },

  {
    path: '/profile/',
    name: 'Profile',
    component: Profile
  },

  {
    path: '/:id/',
    name: 'OnePost',
    component: OnePost,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router