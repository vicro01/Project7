<template>
  <Login v-if="!connected"/>

  <Header v-if="connected"/>
  <Profile v-if="connected"/>
</template>

<script>
import Login from '../components/login.vue'
import Header from '../components/header.vue'
import Profile from '../components/profile.vue'
export default {
  name: 'Post',
  components: {
    Login,
    Header,
    Profile
  },
  data () {
    return {
      connected: true
    };
  },
  created() {
    this.checkIfConnected();
  },
  methods: {
    checkIfConnected () {
      if (localStorage.user !== undefined){
        this.connected = true;
        console.log("connected");
      }
      else if(localStorage.user == undefined) {
        this.connected = false;
        console.log("user not connected");
      }
    }
  }
}
</script>