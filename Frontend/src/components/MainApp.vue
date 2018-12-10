<template>
    <div style="height: 100%">
        <header class="topbar">
			<div class="brand-wrapper"><a href="http://app.adstation.io">ADSTATION</a></div>
			<div class="white-navbar">
				<div class="left-navbar">
					<!-- put any content of the left area here -->
				</div>
				<div class="right-navbar">
                    <!--
                        VERY IMPORTANTE AREA
                    <a href="javascript:" class="navbar-item"><Icon type="ios-gear"/></a>
					<a href="javascript:" class="navbar-item"><Icon type="help-circled" /></a>
                    -->
                    <a href="javascript:" class="navbar-item" @click="logout"><Icon type="log-out"/></a>
				</div>
			</div>
		</header>
        <aside class="leftbar">
			<div class="leftbar-content">
                <search-bar @search-trigger="runSearchQuery"></search-bar>
            </div>
		</aside>
		<div class="page-wrapper">
            <Spin v-if="showContent != 'main' && loadingSpin" size="large" fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Carregando</div>
            </Spin>
            <div v-if="showContent != 'main'">
                <ad-info @return-back="returnBack" @close-loading="closeLoading" :idAd="adSelected"></ad-info>
            </div>
			<div v-if="showContent == 'main'" class="content-wrapper" v-infinite-scroll="infiniteLoad" infinite-scroll-distance="200">
                <Spin size="large" fix v-if="loadingSpin">
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Carregando</div>
                </Spin>
                <Modal
                    v-model="saveModal"
                    title="Salvar pesquisa"
                    ok-text="Salvar"
                    cancel-text="Cancelar"
                    @on-ok="saveSearch"
                    @on-cancel="saveModal = false"
                    >
                    <Form label-position="left">
                        <FormItem label="Salvar como">
                            <Input v-model="saveSearchAs"></Input>
                        </FormItem>
                    </Form>
                    
                </Modal>
                <Row>
                    <Col span="12">
                        <Dropdown @on-click="sortBy">
                            <a href="javascript:void(0)">
                                Order by: {{orderMap[orderBySelected].label}} <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem :selected="orderBySelected == index" v-for="(orderInf, index) in orderMap" :key="index" :name="index">{{orderInf.label}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
                
                <Row>
                    <Row span="12" class="list-ads-rows" v-for="i in Math.ceil(apiResult.length / 3)" :key="'ad-row-'+i">
                        <Col span="8" v-for="(result, index) in apiResult.slice((i - 1) * 3, i * 3)" :key="'ad-'+i+'-'+index">
                            <ad-card @return-back="returnBack" @showAd="showAd" :adinfo="result"></ad-card>
                        </Col>
                    </Row>
                </Row>
                
                <!-- Ola -->
                <div style="padding-top: 10px; padding-bottom: 30px" v-if="loadingBottom">
                    <Col class="demo-spin-col" span="24">
                        <Spin fix size="large">
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                            <div>Carregando</div>
                        </Spin>
                    </Col>
                </div>

			</div>
            <Alert type="warning" show-icon v-if="noResultsWarning">
                Não encontramos nada
                <template slot="desc">
                Utilize outros dados em seus filtros. Não encontramos nada em nosso banco de dados. Nos mande um email com algum site específico que você tem muito interesse em encontrar.
            </template>
            </Alert>
            
		</div>
        <Modal :mask-closable="false" v-model="alertWarning" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>Adblock encontrado</span>
            </p>
            <div style="text-align:center">
                <p>Detectamos Adblock no seu navegador</p>
                <p>Adblocks normalmente causam problemas na listagem de imagens</p>
                <p>Pedimos para desabilitar o Adblock para essa ferramente</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="alertWarning = false">Fechar</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import SearchBar from './SearchBar';
import AdCard from './AdCard';
import AdInfo from './AdInfo';
import { mapMutations, mapState } from 'vuex';
import adBlocker from 'just-detect-adblock'

export default {
    components: {
        SearchBar, AdCard, AdInfo
    },
    data(){
        return {
            testDialog: true, //delete this after test -- just for layout purposes
            apiResult: [],
            queryString: '',
            pageNum: 1,
            saveModal: false,
            showContent: 'main', //main or ad
            saveSearchAs: '',
            lastQuery: '',
            loadingSpin: false,
            loadingBottom: true,
            sortByField: 'created_desc',
            orderBySelected: 0,
            adSelected: 0,
            alertWarning: false,
            noResultsWarning: false,
            orderMap: [
                {label: "Mais novos", value: "created_desc"},
                {label: "Mais velhos", value: "created_asc"},
                {label: "Menos likes", value: "likes_asc"},
                {label: "Mais likes", value: "likes_desc"}
            ]
        }
    },
    computed:{
        ...mapState(['apiToken']),
        orderTitle(){
            return 
        }
    },
    methods: {
        returnBack(){
            this.adSelected = 0;
            this.showContent = 'main';
        },
        closeLoading(){
            this.loadingSpin = false;
        },
        showAd(id){
            this.loadingSpin = true;
            this.adSelected = id;
            this.showContent = 'ad';
        },
        sortBy(sortType){
            this.orderBySelected = sortType;
            this.sortByField = this.orderMap[sortType].value;
            this.runSavedQuery();
        },
        infiniteLoad(){
            this.loadingSpin = true;
            this.increaseQuery()
        },
        saveSearch(){
            this.saveSearchAs;
            //save the search into the database
        },
        increaseQuery(){
            let self = this
            this.pageNum++;
            this.axios.get('/api/ads?page='+this.pageNum+this.lastQuery).then(response => {
                self.apiResult = self.apiResult.concat(response.data)
                self.loadingSpin = false
            }).catch(error => {
                //console.log(error)
            })
        },
        runSavedQuery(){
            let data = this.lastQuery;
            this.runSearchQuery(data);
        },
        runSearchQuery(data,page=1){
            
            this.loadingSpin = true;
            this.noResultsWarning = false;
            this.loadingBottom = true;
            
            let self = this;
            this.lastQuery = data;
            if(this.sortByField){
                   data += "&sort="+this.sortByField;
            }
            //save the last query from data
            
            this.axios.get('/api/ads?page='+page+data).then(response => {
                self.apiResult = response.data
                self.loadingSpin = false;
                console.log(response.data);
                if(response.data.length == 0){
                    self.$Notice.error({
                        title: 'Nenhum resultado',
                        desc: 'Pesquisa sem resultados. Mude seus filtros. '
                    });
                    self.noResultsWarning = true;
                    self.loadingBottom = false;
                    self.loadingSpin = false;
                }
            }).catch(error => {
                if(error == "Error: Request failed with status code 401"){
                    localStorage.removeItem("id_token");
                    location.reload();
                }
                //missing or malformed jwt
                //invalid or expired jwt

                self.loadingSpin = false;

                //bugsnagClient.notify(new Error(error))
            })
        },
        logout(){
            localStorage.removeItem("id_token");
            this.$router.push({name: "login"})
        }
    },
    beforeCreate(){
        this.axios.defaults.headers.common['authorization'] = "Bearer "+localStorage.getItem("id_token");
    },
    created(){
        this.loadingBusy = true;
        if(this.showContent == 'main'){
            this.runSearchQuery('');
        }
    },
    mounted(){
        let self = this;

        this.loadingBusy = false;

        if(adBlocker.isDetected()){
            this.alertWarning = true;
        }
        
        if(!localStorage.getItem('novo')){
            localStorage.removeItem('novo');
            this.$router.push({name: "login"})
        }

        this.axios.get('/api/checkuser').then(response => {
            console.log(response.data.Valid);
            if(!response.data.Valid){
                self.logout();
            }
        }).catch(error => {
            //console.log(error)
        })

    }
}
</script>

<style>
.ad-info-modal{
    width: 100%;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
.demo-spin-col{
        display: inline-block;
        width: 100%;
        height: 100px;
        position: relative;
}
.navbar-item{
    position: relative;
    display: block;
    padding: 15px;
    padding-bottom: 10px;
    padding-right: 40px;
    font-size: 30px;
    width: 50px;
}
    .leftbar{
		z-index: 40; 
		position: fixed;
		overflow: auto;
		top: 0;
		left: 0;
		height: 100%;
		width: 280px;
		background: #245bff;
		padding-top: 70px;
		color: white;
	}
	.leftbar-content{
		padding: 20px;
	}
	.topbar{
		z-index: 50;
		position: fixed;
		width: 100%;
		height: 70px;
		background: white;
		box-shadow: 1px 0 7px rgba(0,0,0,.05);
	}
	.topbar .brand-wrapper{
		display: flex;
		align-items: center;
    	justify-content: center;
		font-family: 'Fira Sans', sans-serif;
		font-weight: 900;
		color: white;
		font-size: 20px;
		float: left;
		width: 280px;
		background: #245bff;
		height: 100%
	}
    .brand-wrapper a{
        color: white;
        
    }
	.white-navbar .left-navbar{
		float: left;
		width: 75%;
	}
	.white-navbar .right-navbar{
		float: right;
		width: 20%;
	}
    .right-navbar a{
        float: right;
    }
	.page-wrapper{
		position: relative;
		background: #eef5f9;
		height: 100%;
		margin-left: 280px;
		padding-left: 10px;
		padding-top: 80px;
		overflow: auto;
		max-height: 100%;
	}
	.page-wrapper .content-wrapper{
		font-family: 'Nunito Sans';
        font-size: 14px;
        width: 100%;
	}
    .content-wrapper .row{
        width: 100%;
    }
  .list-ads-rows #box-card{
      margin-right: 20px;
  }
</style>