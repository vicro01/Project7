<template>
    <!DOCTYPE>
    <section id="section_new_post">
        <form @submit="createUser">
            <h1>Inscription</h1>
                <label>Username</label>
                <input id="post_id_user" v-model="formData.username"/>
    
                <label>Email</label>
                <input id="post_id" v-model="formData.email"/>
    
                <label>Password</label>
                <input id="post_texte" v-model="formData.password" type="password">
                
                <button id="newPost-btn" type="submit">Signup</button>
                <p id="newPost_container">Have an account?
                    <router-link to='/login' >
                    <a  id="header_link"> Log in</a>
                </router-link></p>
        </form>
    </section>
    </template>
    
    <script>
    import axios from 'axios';
    export default {
      name: 'Signup',
      data() {
          return {
              formData :{
                  id:'',
                  username:'',
                  email:'',
                  password:'',
                  is_admin:''
              }
          }
      },
      methods: {
          createUser(e) {
            axios.post("http://localhost:3001/api/auth/signup/",this.formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then ((res) => {
            window.location.href = '/login';
            console.log(res);
            })
            .catch((error) => {
                        if (error.response.status === 401) {
                            this.message = "This is not an email.";
                            console.log("email is already in use");
                            alert("this email is not available, chose another address.")
                        }  
                        else if (error.response.status === 400) {
                            this.message = "This password is not strong, use maj, min, numbers.";
                            console.log("This password is not strong, use: maj, min, numbers.");
                            alert("This password is not strong, use maj, min, numbers.")
                        }  
                    });
            console.warn(this.formData)
            e.preventDefault();
          }
      }
    }
    </script>
    
    <style lang="scss">
    section {
        background-color:white;
        max-width: 650px;
        margin: 0 auto;
        height: 100%;
        color: white;
        padding: 1.5rem;
        border-radius: 15px;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    </style>