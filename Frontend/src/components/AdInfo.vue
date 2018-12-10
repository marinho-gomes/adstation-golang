<template>
<div>
    <Button @click="returnBack" size="large" type="primary" style="margin-bottom: 10px"> < Voltar para busca</Button>
    <Card>
        <Row>
            <Col span="12">
                <div v-if="result">
                    <ad-card :adinfo="result"></ad-card>
                </div>
            </Col>
            <!-- start of the second column of the whole information box -->
            <Col span="12" style="padding-left: 20px">
                <Row>
                    <Col span="8">&nbsp;<Button type="info" icon="ios-arrow-back" v-if="(currentPage-1) > -1" @click="changePage(-1)">Última</Button></Col>
                    <Col span="8" style="text-align: center">Pagina {{currentPage+1}} de {{result.Pages.length}}</Col>
                    <Col span="8" style="text-align: right">&nbsp;<Button type="info" v-if="(currentPage+1) < result.Pages.length" @click="changePage(1)">Próxima &nbsp;<Icon type="ios-arrow-forward"></Icon></Button></Col>
                </Row>
                <Row>
                    <Col span="24" class="header-info"><h2>Ad URL</h2></Col>
                </Row>
                <Row>
                    <Col span="24"><a :href="result.LinkToAd" target="_blank">{{result.LinkToAd}}</a></Col>
                </Row>
                <Row>
                    <Col span="24" class="header-info"><h2>Landing Page</h2></Col>
                </Row>
                <Row>
                    <Col span="24"><a v-if="result.Pages" :href="result.Pages[currentPage].FinalURL" target="_blank">{{result.Pages[currentPage].FinalURL}}</a></Col>
                </Row>
                <!--
                <Row>
                    <Col span="24"><h2>Screenshot</h2></Col>
                </Row>
                <Row v-if="result.Pages.ScreenFileName">
                    <Col span="24">
                        <div class="screenPlaceholder">
                            <img :src="result.Pages.ScreenFileName" width="500px"/>
                        </div>
                    </Col>
                </Row>
                -->
                <Row>
                    <Col span="24" class="header-info"><h2>Outgoing Links</h2></Col>
                </Row>
                <Row v-if="result.Pages[currentPage].OutgoingLinks">
                    <div class="ivu-table-wrapper">
                        <div class="ivu-table ivu-table-border">
                            <table cellspacing="0" cellpadding="0" border="0" style="width: 100%">
                                <tbody class="ivu-table-tbody">
                                    <tr class="ivu-table-row" v-for="(link, index) in result.Pages[currentPage].OutgoingLinks" :key="index">
                                        <td style="padding-left: 10px; font-size: 14px"><a :href="link.URL">{{link.URL}}</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Row>
                <div v-if="result.Pages[currentPage].RedirectUrls">
                <Row>
                    <Col span="24" class="header-info"><h2>Redirection Links</h2></Col>
                </Row>
                <Row >
                    <Col span="24">
                        <div class="ivu-table-wrapper">
                            <div class="ivu-table ivu-table-border">
                                <table cellspacing="0" cellpadding="0" border="0" style="width: 100%">
                                    <tbody class="ivu-table-tbody">
                                        <tr class="ivu-table-row" v-for="(link, index) in result.Pages[currentPage].RedirectUrls" :key="index">
                                            <td style="padding-left: 10px; font-size: 14px"><a :href="link">{{link}}</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                </Row>
                </div>
                <box-card>
                        <div slot="header" style="font-size: 18px">
                            <b>Demográfico</b>
                        </div>
                        <h3 style="margin-left: 10px">Sexo:</h3>
                        <ve-ring :data="genderChartData"></ve-ring>
                        <h3 style="margin-left: 10px">Idade:</h3>
                        <div style="padding: 10px">
                            {{result.MinAge}} - {{result.MaxAge}}
                        </div>
                        
                    </box-card>
            <!-- end of second column - general content -->
            </Col>
        </Row>
    </Card>
</div>
    
</template>

<script>
import BoxCard from './BoxCard';
import VeRing from 'v-charts/lib/ring.common'
import AdCard from './AdCard';
import {mapState} from 'vuex';
export default {
    components: {
        AdCard, BoxCard, VeRing
    },
    data(){
        return {
            result: '',
            genderChartData: {columns: [], rows: []},
            currentPage: 0
        }
    },
    props: ['idAd'],
    methods:{
        changePage(value){
            this.currentPage = this.currentPage+value; 
        },
        returnBack(){
            this.$emit('return-back');
        },
        closeLoading(){
            this.$emit('close-loading');
        },
        genderTranslate(gender){
            if(gender == "Female")
                return "mulher"
            else
                return "homem"
        }
    },
    mounted(){
        let self = this;

        //change the header for the right authorization
        this.axios.defaults.headers.common['authorization'] = "Bearer "+localStorage.getItem("id_token");

        //get the infomration about the ad from the api
        this.axios.get('/api/ad/'+this.idAd).then(result => {
            self.result = result.data;
            self.$emit('close-loading');

            if(self.result.Genders.length > 1){
                self.genderChartData = {
                    columns: ['sexo', 'PC'],
                    rows: [
                        { 'sexo': 'mulher', 'PC': 50 },
                        { 'sexo': 'homem', 'PC': 50 },
                    ]
                }
            }else{
                console.log(self.genderTranslate(self.result.Genders[0]))
                self.genderChartData = {
                    columns: ['sexo', 'PC'],
                    rows: [
                        { 'sexo': self.genderTranslate(self.result.Genders[0]), 'PC': 1 }
                    ]
                }
            }

            
        }).catch(error => {
            bugsnagClient.notify(new Error(error))
        });

    },
    created(){
        this.chartData = {
            
        }
    }
}
</script>

<style>
.screenPlaceholder{
    width: 80%;
    height: 200px;
    border: 1px solid #000;
    overflow: auto;
}
.header-info{
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>
