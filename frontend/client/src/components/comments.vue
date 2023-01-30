<template>
    <section id="section_new_post">
        <h1>Coments</h1>
        <form id="container_new_comment" @submit="sendComment()">     
            <textarea id="container_new_comment_textarea" v-model="formData.texte" type="text" placeholder="Leave a comment..." required></textarea>
            <button type="submit" id="container_new_comment_btn" >publish my comment </button>
        </form>
        <div id="container_comments" v-for="comment in comments.slice().reverse()" :key="comment.id">
            <p id="container_comments_username"> {{comment.email}}</p>
            <div id="container_comments_text_btn">
              <p id="container_comments_text"> {{comment.comment_text}} </p>
              <button   id="container_comments_btn" @click="deleteComment(comment.comment_id)">Delete</button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user'));
export default {
  name: 'Comment',
  data() {
      return {
          comments: [],
          formData :{
              id:'',
              post_id:this.$route.params.id,
              id_user: user.id,
              text:''
          },
          user : user
      }
  },
  created() {
    this.getAllComments();
    this.checkIfadmin ();
  }, 
  methods: {
      sendComment(e) {
        this.post = this.$route.params.id
        
        axios.post(`http://localhost:3001/api/posts/${this.post}/comment`,this.formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then ((res) => {
        console.log(res);
        alert("your comment was published");
        // location.reload();
        })
        console.warn(this.formData);
        e.preventDefault();  
      },
      getAllComments() {
        this.post = this.$route.params.id 
        fetch(`http://localhost:3001/api/posts/${this.post}/comments`)
        .then(res => res.json())
        .then(data => this.comments = data)
        .catch(err => console.log(err.message))
      },
      onFileSelected(event) {
        this.selectedFile = event.target.files[0]
      },
      deleteComment (commentId) {
        axios.delete(`http://localhost:3001/api/posts/comment/${commentId}`,this.formData, {
        })
        .then (() => {
        alert("your comment was deleted");
        location.reload();
        })
        commentId.preventDefault(); 
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
#container_new_comment {
    display: block;
    &_textarea {
        width: 100%;
        text-align: left;
    }
    &_btn {
        text-align: left;
    }
}
#container_comments {
    background-color: rgb(228, 228, 228);
    border-radius: 15px;
    color: rgb(39, 39, 39);
    padding: 0.5rem;
    margin: 0.5rem;
    &_username {
        font-weight: bold;
        text-align: left;
        margin: 0;
        padding-bottom: 0.5rem;
    }
    &_text_btn {
        display: flex;
        justify-content: space-between;
    }
    &_text {
        text-align: left;
        margin: 0;
    }
    &_btn {
        border-radius: 5px;
    }
}
</style>