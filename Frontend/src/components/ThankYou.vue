<template>
    <div class="flex-container">
        <div class="thanks-content">
            <h1>Obrigado!</h1>
            <span>
                Seja bem-vindo<br><br>

            Seus dados foram enviados para seu email.
            Nos informe de qualquer problema <br><br>

            <div class="grey-box">Caso não encontrar o email no seu Inbox, também cheque em SPAM, algumas vezes o email é enviado para SPAM por engano.</div>
            </span>
            
        </div>
    </div>
    <!-- -->
</template>

<style>
.flex-container {
    background: blue;
    height: 100%;
    padding: 0;
    margin: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}
.thanks-content{
    width: 700px;
    background: white;
    padding: 50px;
}
.thanks-content h1{
    font-size: 40px;
}
.thanks-content span{
    font-size: 20px;
}
</style>
