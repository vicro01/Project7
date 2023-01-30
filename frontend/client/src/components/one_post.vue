<template>
  <!DOCTYPE>
    <section id="section_new_post">
      <h1></h1>
      <div id="one-post-global" >
            <h2 id="one-post-global-title" >{{ this.post.post_title }}</h2>
            <div id="one-post-global-text" >{{ this.post.post_text}}</div> 
            <img :src="post.post_img" alt="image" id="post-global-img"/>
            <p id="one-post-global-text-username"> {{this.post.post_id}} </p>
            <button v-if="admin || this.post.post_id == user.id" @click="deleteOnePost()" id="btn_new_post" class="btn_delete" type="submit"> Delete </button> 
            
            <!-- //v-if="is_admin" -->
      </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios';
  let user = JSON.parse(localStorage.getItem('user'));
  export default {
    name: 'Posts',
    props: ['id'],
    data() {
      return {
        post: [],
        user: user
      }
    },
    created() {
      this.checkIfadmin ();
      this.getOnePost();
    }, 
    methods: {
        getOnePost (){  
          this.post = this.$route.params.id
          axios.get(`http://localhost:3001/api/posts/${this.post}`,
          {
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${this.$token}`
            }
          })
          .then(res=> {
            console.log(res, 'hey');
            this.post = res.data[0];
            }
          )
        },
        deleteOnePost(){ 
          this.post = this.$route.params.id
          console.log(this.post)
          axios.delete(`http://localhost:3001/api/posts/${this.post}`)
          // .then(location.href = "/")
          .then(console.log("test"))
          .catch(err => console.log(err.message))
        },
        checkIfadmin () {
          let user = JSON.parse(localStorage.getItem('user'));
          if (user.is_admin !== '') {
              this.admin = true;
          }
        }
      }
  }
  </script>
  
  <style lang="scss">
  #one-post-global { 
    background-color: #169705;
    color: white;
    &-title { 
      text-decoration: underline;
      margin-bottom: 0.5rem;
    }
    &-text { 
      margin-bottom: 0.5rem;
      &-username { 
        margin: 0.2rem;
      }
    }
    &-comment {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 1rem;
      &-answer { 
      width: 100%;
      }
      &-button, &-answer {  
        margin: 0.5rem 0;
      }
    } 
  }
  #one-post-global-text-username {
    text-align: right;
  }
  .btn_delete { 
    justify-content: end;
  }
  </style>