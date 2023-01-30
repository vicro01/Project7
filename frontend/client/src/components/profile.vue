<template>
  <!DOCTYPE>
  <section id="section_new_post">
          <h1>My Profile</h1>
              <!-- <label>Username</label>
              <p id="post_id_user" > {{user.username}} </p> -->
  
              <label>Email</label>
              <p id="post_id_user" > {{user.email}} </p>
  
              <label v-if="admin">admin</label>
              <p id="post_id_user" > {{user.is_admin}} </p>
  
              <button @click="deleteUser()" id="delete-btn" type="submit">Delete my profile</button>
  </section>
  </template>
  
  <script>
  import axios from 'axios';
  let user = JSON.parse(localStorage.getItem('user'));
  export default {
    name: 'Posts',
    data() {
      return {
        posts: [],
        user : user
      }
    },
    methods : {
        deleteUser() {
            const userId = user.id;
            console.log(user);
            console.log(userId);
            console.log(user.id);
            console.log(`http://localhost:3001/api/auth/${user.id}`)
            axios.delete(`http://localhost:3001/api/auth/${user.id}`,
            {
                headers: {
                'Content-Type': 'application/json',
              }
            })
          .then(localStorage.removeItem('user'))
          .then(location.href = "/login")
          .catch(err => console.log(err.message))   
        },
        checkIfadmin () {
              let user = JSON.parse(localStorage.getItem('user'));
              if (user.is_admin !== '') {
                  this.admin = true;
                  console.log("admin");
              }
          }
    }
  }
  </script>
  
  <style lang="scss">
  form {
      display: flex;
      flex-direction: column;
  }
  #post_id_user {
    padding: 0.5rem;
  }
  // responsive
  @media screen and (max-width: 730px) {
      section, #section_new_post {
          margin: 0 1rem 0.5rem 1rem;
      }
  }
  </style>