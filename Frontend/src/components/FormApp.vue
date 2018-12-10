<template>
    <div style="padding: 100px;">
        <!-- http://localhost:8070/authenticate -->
        <form name="form" method="post" action="http://apitest.test/api.php">
            <input name="username" v-model="username" class="input"><br>
            <input name="password" v-model="password" type="password" class="input"><br>
            <button type="button" @click="login">Logar</button>
        </form>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    data(){
        return {
            username: '',
            password: '',
            urlApi: 'http://localhost:8070/'
        }
    },
    methods: {
        login(){
            alert("Login called");
            let self = this;
            axios.post(self.urlApi +'api/v1/authenticate',{username: self.username, password: self.password})
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log("Error: " + err)
            })
        }
    }
}
</script>

<style lang="sass">
input
    padding: 10px
    font-size: 14px
</style>