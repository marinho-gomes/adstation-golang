<template>
    <div id="sideBar">
        <div class="bar-title">Filtros</div>
        <div class="label-form"><i class="fa fa-filter"></i> CREATED IN:</div>
        <div><el-date-picker
        v-model="createdRange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="e"
        start-placeholder="Start"
        end-placeholder="End"
        :picker-options="dateRangeOptions"
        @change="changeCreatedRange"
        size="small"
        style="width: 220px"
        >
        </el-date-picker></div>
        <div class="label-form"><i class="fa fa-eye"></i> SEEN IN:</div>
        <div><el-date-picker
        v-model="seenRange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="e"
        start-placeholder="Stand"
        end-placeholder="End"
        :picker-options="dateRangeOptions"
        @change="changeSeenRange"
        size="small"
        style="width: 220px"
        >
        </el-date-picker></div>
        <!--
        <div class="label-form"><i class="fa fa-calendar-alt"></i> IDADE:</div>
        <div><el-slider v-model="ageSearch"></el-slider></div>
        -->
        <div class="label-form">NETWORKS:</div>
        <div>
            <Select size="large" v-model="selectedNetworks" multiple filterable placeholder="Select" @on-change="addNetwork">
                <Option v-for="item in networksOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        
        <div class="label-form">ECOMMERCE:</div>
        <div>
            <Row>
                <Col :span="6"><i-switch v-model="ecommerceToogle" @on-change="toggleEcommerce"></i-switch> </Col>
                <Col :span="18" style="font-size: 16px">Shopify</Col>
            </Row>
            
        </div>
        <div class="label-form">FILTER BY:</div>
        <div>
            <Select size="large" placeholder="Selecione" v-model="filterBy">
                <Option v-for="item in filterByList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div>
            <Input size="large" v-model="filterText" placeholder="Escreva aqui..."></Input>
        </div>
        <div style="padding-bottom: 20px; padding-top: 10px">
            <ButtonGroup>
                <Button type="success" size="large" @click="addFilter"><Icon type="plus"></Icon> Adicionar filtro</Button>
            </ButtonGroup>
        </div>
        <div>
            <Tag v-for="(item, index) in allTags" :key="index" :name="item.label" closable @on-close="closeTag">{{item.type}}: {{stringDotter(item.label)}}</Tag>
        </div>
        <!--
        <div class="label-form">SEXO:</div>
        <div>
            <el-radio-group v-model="genderType">
                <el-radio-button label="todos">
                    <i class="fa fa-male"></i> & <i class="fa fa-female"></i>
                    </el-radio-button>
                <el-radio-button label="imagem"><i class="fa fa-male"></i></el-radio-button>
                <el-radio-button label="video"><i class="fa fa-female"></i></el-radio-button>
            </el-radio-group>
        </div>
        -->
    </div>
</template>

<script>
import moment from 'moment';
export default {
    data(){
        return {
            adType: 'todos',
            genderType: 'todos',
            filterBy: 'url_landing',
            filterText: '',
            ecommerceToogle: false,
            technologies: [],
            filterByList: [
                {label: "URL", value: "url_landing"},
                {label: "Keyword (Palavra-chave)", value: "keyword"},
                {label: "Pagina", value: "url"},],
            ageSearch: 32,
            networksOptions: [
                { label: 'Hotmart', value: 'hotmart' },
                { label: 'Eduzz', value: 'eduzz' },
                { label: 'Monetizze', value: 'monetizze' }
            ],
            selectedNetworks: [],
            createdRange: '',
            seenRange: '',
            dateRangeOptions: {
          shortcuts: [{
            text: 'Última Semana',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Último mes',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Últimos 3 meses',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        landingPages: [],
        queryTags: [],
        createdRangeTag: {label: "", value: ""},
        seenRangeTag: {label: "", value: ""},
        queryString: {
            createdDateRange: '',
            sendDateRange: '',
            adType: '',
            landingPage: '',
            keyword: '',
            networks: '' //here it probably will have to be like
        },
        }
    },
    computed: {
        allTags(){
            if(this.createdRangeTag.value)
                this.queryTags.concat(this.createdRangeTag.value)
            if(this.createdRangeTag.value)
                this.queryTags.concat(this.createdRangeTag.value)
            return this.queryTags;
        },
        allSites(){
            if(this.technologies.length > 0)
                return this.selectedNetworks.concat(this.technologies);
            return this.selectedNetworks
        }
    },
    methods: {
        stringDotter(stringx){
            if(stringx.length < 10){
                return stringx
            }else{
                return stringx.substr(0,9)+"...";
            }
        },
        toggleEcommerce(){
            if(this.ecommerceToogle){
                this.technologies.push("shopify")
                this.createNetworkQuery();
            }else{
                let index = this.technologies.indexOf("shopify")
                this.technologies.splice(index,1)
                this.createNetworkQuery();
            }
            
        },
        delTag(type,name){
            
            for(let i=0; i<this.queryTags.length ;i++){
                let queryTag = this.queryTags[i];
                if(queryTag.type == type && queryTag.label == name){
                    this.queryTags.splice(i,1);
                    break;
                }
            }
            
        },
        closeTag (event, name) {
            let typeTag = "";
            const index = this.allTags.map((d) => {
                typeTag = d.type
                return d.label
            }).indexOf(name)

            //do some delete action for the type of tag here
            // if it is something else, whatever whatever
            this.allTags.splice(index, 1);

            //depending on the type of the tag do different actions
            //delete landing page if it's landing page
            //if keywords it just makes it empty
            if(typeTag == "url_landing"){
                this.deleteLandingPage(name)
            }else{
                this.queryString.keyword = "&keyword="+this.filterText;
                //just goes it here because in the landing page it will be called automatically
                this.searchTrigger();
            }
            
        },
        addTech(name){
            this.technologies.push(name)
        },
        addTag(name, type){
            this.queryTags.push({
                label: name,
                type: type
            })
        },
        returnNetworkLink(network){
            switch(network){
                case "hotmart":
                    return "hotmart.com.br"
                break;
                case "eduzz":
                    return "eduzz.com"
                break;
                case "monetizze":
                    return "monetizze.com.br"
                break;
                case "shopify":
                    return "shopify.com"
                break;
            }
        },
        addNetwork(){
            let selNet = this.selectedNetworks;
            selNet.push()
            this.createNetworkQuery();
        },
        createNetworkQuery(){
            let self = this;
            self.queryString.networks = "";
            this.allSites.forEach(network => {
                self.queryString.networks += "&site="+self.returnNetworkLink(network)
            })
            this.searchTrigger()
        },
        deleteLandingPage(landing){
            //find and delete landing page from the array
            this.landingPages.splice(this.landingPages.indexOf(landing),1)
            this.createLandingQuery();
        },
        createLandingQuery(){
            let self = this
            self.queryString.landingPage = "";
            this.landingPages.forEach(lpURL => {
                self.queryString.landingPage += "&site="+lpURL
            })
            this.searchTrigger();
        },
        changeCreatedRange(){
            if(!this.createdRange){
                this.queryString.createdDateRange = ""
            }else{
                this.queryString.createdDateRange = "&created_start="+moment(this.createdRange[0]).format("DD-MMM-YYYY")+"&created_end="+moment(this.createdRange[1]).format("DD-MMM-YYYY")
            }
            this.searchTrigger()
        },
        changeSeenRange(){
            if(!this.seenRange)
                this.queryString.sendDateRange = ""
            else
                this.queryString.sendDateRange = "&created_start="+moment(this.seenRange[0]).format("DD-MMM-YYYY")+"&created_end="+moment(this.seenRange[1]).format("DD-MMM-YYYY")
            this.searchTrigger()
        },
        changeAdType(){
            this.queryString.adType = "&type="+this.adType;
            this.searchTrigger()
        },
        addFilter(){
            //remove http and https so it doesn't bug everything
            let textKey = this.filterText.replace(/(^\w+:|^)\/\//, '');

            this.addTag(textKey,this.filterBy)
            if(this.filterBy == "keyword"){
                this.queryString.keyword = "&keyword="+this.filterText;
                this.searchTrigger();
            }else{
                
                this.landingPages.push(textKey);
                this.filterText = "";
                this.createLandingQuery()
            }
        },
        searchTrigger(){
            
            let self = this
            let queryObjectArr = ['createdDateRange','sendDateRange','adType','landingPage','keyword','networks']
            let finalQuery = '';
            queryObjectArr.forEach(qryName => {
                if(self.queryString[qryName])
                    finalQuery += self.queryString[qryName]
            })
            this.$emit("search-trigger",finalQuery)
        }
    }
}
</script>

<style lang="sass" scoped>
#sideBar
    margin: 10px
    height: 100%
.bar-title
    font-size: 18px
    font-weight: bold
.label-form
    font-size: 14px
    height: 28px 
    line-height: 28px
    margin-top: 16px
    font-weight: bold
.multi__tag
    background-color: rgba(64,158,255,.1)
    display: inline-block
    padding: 0 10px
    height: 32px
    line-height: 30px
    font-size: 12px
    color: #409eff
    border-radius: 4px
    box-sizing: border-box
    border: 1px solid rgba(64,158,255,.2)
    white-space: nowrap
    margin-left: 5px
    margin-bottom: 5px
</style>

