<template>
    <!DOCTYPE>
    <section id="section_new_post">
        <form >
            <h1 id="h1_new_post">What do you want to say?</h1>
                <label>Title</label>
                <input id="post_titre" v-model="formData.titre" required="required"/>
    
                <label>Text</label>
                <textarea id="post_texte" v-model="formData.texte" required="required"></textarea>
                <input type="file" @change="onFileSelected" >
                <button id="newPost-btn" type="submit" @click="createPost">Publish</button>
        </form>
    </section>
    </template>
    
    <script>
    import axios from 'axios';
    let user = JSON.parse(localStorage.getItem('user'));
    export default {
      name: 'NewPost',
      data() {
          return {
              formData :{
                  post_id:'',
                  id_user: user.id,
                  title:'',
                  text:'',
                  media:''
              }
          }
      },
      methods: {
          onFileSelected(event) {
            this.file = event.target.files[0];
            var reader = new FileReader();
            reader.onloadend = () => {
                // console.log('RESULT', reader.result)
                this.formData.media = reader.result;
            }
            reader.readAsDataURL(this.file);
          },
          createPost(e) {
            console.log()
            axios.post("http://localhost:3001/api/posts/", this.formData,  {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            })
            .then (() => {
            alert("Your post is published");
            // window.location.href="/";
            })
            e.preventDefault();  
        }
      }
    }
    </script>
    
    <style lang="scss">
    #section_new_post {
        max-width: 650px;
        background-color: #183E76;
        margin: 1rem auto;
        height: 100%;
        color: white;
        padding: 1.5rem;
        border-radius: 15px;
    }
    #h1_new_post {
        color: white;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    </style>