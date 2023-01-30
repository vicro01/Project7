<template>
    <a href="#"><img src="../assets/logo.png" id="main_logo_login" alt="Logo groupomania"/></a>
    <section id="section_new_post">
        <form >
                <label>Email</label>
                <input v-model="formData.email"/>
    
                <label>password</label>
                <input v-model="formData.password" type="password"/>
    
                <!-- <router-link to='/' > -->
                    <button id="newPost-btn" type="button" @click="login">Connect</button>
                <!-- </router-link> -->
                <div class="error-message">{{message}}</div>
                <router-link to='/signup' id="newPost_container">
                    <a  id="header_link">Dont't have a profile?</a>
                </router-link>
        </form>
    </section>
    </template>
    
    <script>
    import axios from 'axios';
    export default {
      name: 'Login',
      data() {
          return {
              formData :{       
                  email:'',
                  password:'',
              },
              message:"",
          };
      },
      methods: {
          login(e) {
            axios.post("http://localhost:3001/api/auth/login/",this.formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then ((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            window.location.href = '/';
            console.log(res);
            })
            .catch((error) => {
                    console.log(error)
                    if (error.response.status === 404) {
                        this.message = "User not found.";
                    }
                    if (error.response.status === 401) {
                        this.message = "Email or password is invalid.";
                    }
                    if (error.response.status === 500) {
                        this.message = "Server error.";
                    }
                });
            console.warn(this.formData)
            e.preventDefault();
          }
      }
    }
    </script>
    
    <style lang="scss">
    #newPost_container {
        text-align: left;
    }
    #newPost-btn {
        margin: 0.5rem;
    }
    #header_link {
        text-align: left;
        color: white;
    }
    #main_logo_login {
        max-width: 40%;
        max-height: 400px;
    }
    </style>
    