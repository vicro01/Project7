<template>
  <!DOCTYPE>
    <section>
      <h1 id="h1_post">Welcome {{user}} !</h1>
      {{ '' }}
      <div id="post-global" v-for="post in posts.slice().reverse() || []" :key="post.post_id">
        
            
            <h2 id="post-global-title">{{ post.post_title}}</h2>
            <p id="post-global-text"> {{ post.post_text}} </p>
            <img v-if="post.post_img != undefined" :src="post.post_img" alt="image" id="post-global-img"/>
        <router-link :to="{ name:'OnePost', params: {id: post.post_id }}">
            <button id="post-global-btn">See more</button>
        </router-link>
      </div>
    </section>
  </template>
  
  <script>
  let user = JSON.parse(localStorage.getItem('user'));
  export default {
    name: 'Posts',
    data() {
      return {
        posts: [],
        user : user.email 
      }
    },
    mounted() {
      fetch(`http://localhost:3001/api/posts/`)
      .then(res => res.json())
      .then(data => this.posts = data)
      .then(data => console.log(data))
      .catch(err => console.log(err.message))
    }
  }
  </script>
  
  <style lang="scss">
  #post-global { 
    background-color: #183E76;
    color: rgb(228, 33, 33);
    border-radius: 15px;
    
    margin: 0.5rem 0;
    &-title { 
      text-decoration: underline;
      padding: 1rem;
    }
    &-text { 
      padding: 1rem;
    }
    &-img { 
      width: 100%;
    }
    &-btn {  
          margin: 1rem;
    }
  }
  #h1_post { 
      color: black;
    }
  </style>