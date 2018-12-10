<template>
    <div class="auth-wrapper d-flex no-block justify-content-center align-items-center">
            <div class="auth-box">
                <div id="loginform">
                    <div class="logo">
                        <h5 class="subtitle">Login AdStation</h5>
                    </div>

                    <el-dialog width="30%" title="Esqueceu sua senha?" :visible.sync="dialogFormVisible">
                    <i-form ref="formReset" :model="formReset" :rules="ruleReset" >     
                                <form-item prop="email">
                                        <i-input size="large" type="text" v-model="formReset.email" placeholder="Email">
                                        </i-input>
                                    </form-item>
                                    <form-item>
                                        <i-button class="loginButton" type="primary" @click="resetPass('formInline')">Pedir senha</i-button>
                                    </form-item>
                                </i-form>
                    </el-dialog>
                    <!-- Form -->
                    <Row>
                        <Col>
                            <i-form ref="formLogin" :model="formLogin" :rules="ruleLogin" >     
                                <form-item prop="email">
                                        <i-input size="large" type="text" v-model="formLogin.email" placeholder="Email">
                                            <Icon type="ios-email-outline" slot="prepend"></Icon>
                                        </i-input>
                                    </form-item>
                                    <form-item prop="password">
                                        <i-input size="large" type="password" v-model="formLogin.password" placeholder="Senha">
                                            <icon type="ios-locked-outline" slot="prepend"></icon>
                                        </i-input>
                                    </form-item>
                                    <form-item>
                                        <i-button class="loginButton" type="primary" @click="submitLogin('formInline')">Signin</i-button>
                                    </form-item>
                                    <div class="forgotPass">
                                        <a href="javascript:" @click="dialogFormVisible = true">Esqueceu sua senha?</a>
                                    </div>
                                </i-form>
                        </Col>
                    </Row>
                    <Spin size="large" fix v-if="loadingLogin">
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                            <div>Carregando</div>
                        </Spin>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import {mapState, mapMutations} from 'vuex';
export default {
    data(){
        return {
            dialogFormVisible: false,
            dynamicValidateForm: {
                domains: [{
                    key: 1,
                    value: ''
                }],
                email: '',
                password: ''
            },
            formReset: {
                email: ''
            },
            formLogin: {
                    email: '',
                    password: ''
            },
            loggedUser: {username: ''},
            loadingLogin: false,
            bearerToken: '',
            ruleReset: {
                email: [
                        { required: true, message: 'Informe seu email', trigger: 'blur' },
                        { type: 'email', message: 'Formato errado', trigger: 'blur' }
                ]
            },
            ruleLogin: {
                    email: [
                        { required: true, message: 'Informe seu email', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                        /*
                        ,{validator(rule, value, callback, source, options) {
                            var errors = [];
                            // test if email address already exists in a database
                            // and add a validation error to the errors array if it does
                            callback(errors);
                        }}
                        */
                    ],
                    password: [
                        { required: true, message: 'Informe sua senha.', trigger: 'blur' }
                    ]
                }
        }
    },
    computed: {
        ...mapState(['apiToken'])
    },
    methods: {
        resetPass(){
            if(this.formReset.email){
                const self = this;
                alert(self.formReset.email);
                this.axios.post("auth/reset",
                {email: self.formReset.email}).then(body => {
                    console.log("Sucesso: ")
                    console.log(body)
                    this.dialogFormVisible = false;
                    this.$Message.success('E-mail para resetar enviado. Cheque seu inbox.');
                }).catch(err => {
                    console.log("Erro: "+err)
                })

            }else{
                alert("Informe um e-mail");
            }
        },
        submitLogin(){
            this.loadingLogin = true;
            let self = this;

            this.axios.post("auth/login",
            {email: self.formLogin.email, 
            password: self.formLogin.password})
                .then(body => {
                    self.loggedUser = self.formLogin.email;
                    self.loadingLogin = false;
                    //self.changeToken(body.data.token);
                    localStorage.setItem("id_token",body.data.token)
                    localStorage.setItem("loggedUser",self.formLogin.email)
                    localStorage.setItem('novo','exists')

                    let intercom_user = {app_id: 'eimzp1tz', user_id: body.data.id, email: body.data.email}
     
                    window.Intercom('boot', intercom_user)
                    this.$router.push({name: "main"})
                })
                .catch(err => {
                    console.log(err)
                    this.$Message.error('Erro no login. Cheque seus dados.');
                    self.loadingLogin = false;
            });
        }
    }
}
</script>

<style lang="sass" scopde>
.demo-spin-icon-load
    animation: ani-demo-spin 1s linear infinite
body
    background-color: #245bff
.logo
    text-align: center
    width: 100%
    .subtitle
        font-size: 30px
    padding-bottom: 20px
.forgotPass
    text-align: center
.loginButton
    width: 100%
    font-size: 18px
.auth-wrapper 
    .auth-box 
        background: #fff
        padding: 20px
        box-shadow: 1px 0 20px rgba(0,0,0,.08)
        max-width: 400px
        width: 90%
        margin: 10% 0
auth-wrapper 
    min-height: 100vh
    position: relative
align-items-center 
    align-items: center!important
.justify-content-center
    justify-content: center!important
.d-flex
    display: flex!important
.center-div
    width: 100%
    text-align: center
    font-size: 20px
    padding-bottom: 50px
    padding-top: 50px
.full-page
    width: 100%
    min-height: 100vh
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: center
    
body
    background: linear-gradient(141deg, #19378c 0%, #153eaf 51%, #2A61FB 75%)
.login-box
    margin: 0 auto
    width: 500px
</style>