<template>
    <!DOCTYPE>
    <!-- header -->
        <div id="container_header">
            <header>
                <div id="header_logo">
                    <a href="#"><img src="../assets/logo.png" id="main_logo" alt="Logo groupomania" /></a>
                </div>
                <nav id="nav_header">
                    <img  v-if="admin" src="../assets/logo.png" id="logo_admin" class="header_navbar_menu" alt="Logo administrateur" />
                    <!-- v-if="$user.is_admin == 'Y'" -->
                    <router-link to='/'>
                        <a class="header_navbar_menu">Home</a>
                    </router-link>
                    <router-link to='/NewPost'>
                        <a class="header_navbar_menu">New Post</a>
                    </router-link>
                    <router-link to='/profile'>
                        <a class="header_navbar_menu">Profile</a>
                    </router-link>
                    <router-link to='/login'>
                        <a class="header_navbar_menu" @click = disconnect()>Log out</a>   
                    </router-link>
                </nav>
            </header>
        </div>
    </template>
    
    <script>
    
    export default {
        name: 'Header',
        created () {
            this.checkIfadmin();
        },
        methods: {
            disconnect () {
                localStorage.removeItem('user');
                location.href = "/login";
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
    header {
        max-width: 650px;
        margin: 0 auto;
        padding: 0 10rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.01px solid rgb(126, 125, 125);
    }
    .header_navbar_menu {
        padding: 5px;
        vertical-align: middle;
    }
    #nav_header {
        margin-top: auto;
        margin-bottom: auto;
        a {
            color: black;
        }
    }
    #main_logo {
        width: 200px;
        height:50px;
        object-fit: cover;
    }
    #logo_admin {
        width: 40px;
    }
    // responsive
    @media screen and (max-width: 1048px) {
    header {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 0 0.5rem 0;
        display: block;
        justify-content: space-between;
        }
    }
    </style>