webpackJsonp([1],{"+BTi":function(e,t){},"+skl":function(e,t){},"4sxP":function(e,t){},"6e2D":function(e,t){},"6vQ6":function(e,t){},Dzb6:function(e,t){},JTPK:function(e,t){},JXAU:function(e,t){},LL4n:function(e,t){},"Mv4+":function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("Yq4J"),a("+BTi");var s=a("qubY"),n=a.n(s),i=(a("hXTu"),a("y7os")),r=a.n(i),o=(a("vBcO"),a("ARSI")),l=a.n(o),c=(a("isgN"),a("tLa+")),d=a.n(c),u=(a("U/ZW"),a("+nRk")),g=a.n(u),h=(a("LL4n"),a("BrEC")),m=a.n(h),f=(a("Dzb6"),a("o6kb")),p=a.n(f),v=a("7+uW"),_={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var y=a("VU/8")({name:"App",data:function(){return{navMenuIndex:"1"}}},_,!1,function(e){a("y7Fb")},null,null).exports,b=a("/ocq"),k=a("Dd8w"),w=a.n(k),j=a("PJh5"),C=a.n(j),x={data:function(){return{adType:"todos",genderType:"todos",filterBy:"url_landing",filterText:"",ecommerceToogle:!1,technologies:[],filterByList:[{label:"URL",value:"url_landing"},{label:"Keyword (Palavra-chave)",value:"keyword"},{label:"Pagina",value:"url"}],ageSearch:32,networksOptions:[{label:"Hotmart",value:"hotmart"},{label:"Eduzz",value:"eduzz"},{label:"Monetizze",value:"monetizze"}],selectedNetworks:[],createdRange:"",seenRange:"",dateRangeOptions:{shortcuts:[{text:"Última Semana",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"Último mes",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"Últimos 3 meses",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},landingPages:[],queryTags:[],createdRangeTag:{label:"",value:""},seenRangeTag:{label:"",value:""},queryString:{createdDateRange:"",sendDateRange:"",adType:"",landingPage:"",keyword:"",networks:""}}},computed:{allTags:function(){return this.createdRangeTag.value&&this.queryTags.concat(this.createdRangeTag.value),this.createdRangeTag.value&&this.queryTags.concat(this.createdRangeTag.value),this.queryTags},allSites:function(){return this.technologies.length>0?this.selectedNetworks.concat(this.technologies):this.selectedNetworks}},methods:{stringDotter:function(e){return e.length<10?e:e.substr(0,9)+"..."},toggleEcommerce:function(){if(this.ecommerceToogle)this.technologies.push("shopify"),this.createNetworkQuery();else{var e=this.technologies.indexOf("shopify");this.technologies.splice(e,1),this.createNetworkQuery()}},delTag:function(e,t){for(var a=0;a<this.queryTags.length;a++){var s=this.queryTags[a];if(s.type==e&&s.label==t){this.queryTags.splice(a,1);break}}},closeTag:function(e,t){var a="",s=this.allTags.map(function(e){return a=e.type,e.label}).indexOf(t);this.allTags.splice(s,1),"url_landing"==a?this.deleteLandingPage(t):(this.queryString.keyword="&keyword="+this.filterText,this.searchTrigger())},addTech:function(e){this.technologies.push(e)},addTag:function(e,t){this.queryTags.push({label:e,type:t})},returnNetworkLink:function(e){switch(e){case"hotmart":return"hotmart.com.br";case"eduzz":return"eduzz.com";case"monetizze":return"monetizze.com.br";case"shopify":return"shopify.com"}},addNetwork:function(){this.selectedNetworks.push(),this.createNetworkQuery()},createNetworkQuery:function(){var e=this;e.queryString.networks="",this.allSites.forEach(function(t){e.queryString.networks+="&site="+e.returnNetworkLink(t)}),this.searchTrigger()},deleteLandingPage:function(e){this.landingPages.splice(this.landingPages.indexOf(e),1),this.createLandingQuery()},createLandingQuery:function(){var e=this;e.queryString.landingPage="",this.landingPages.forEach(function(t){e.queryString.landingPage+="&site="+t}),this.searchTrigger()},changeCreatedRange:function(){this.createdRange?this.queryString.createdDateRange="&created_start="+C()(this.createdRange[0]).format("DD-MMM-YYYY")+"&created_end="+C()(this.createdRange[1]).format("DD-MMM-YYYY"):this.queryString.createdDateRange="",this.searchTrigger()},changeSeenRange:function(){this.seenRange?this.queryString.sendDateRange="&created_start="+C()(this.seenRange[0]).format("DD-MMM-YYYY")+"&created_end="+C()(this.seenRange[1]).format("DD-MMM-YYYY"):this.queryString.sendDateRange="",this.searchTrigger()},changeAdType:function(){this.queryString.adType="&type="+this.adType,this.searchTrigger()},addFilter:function(){var e=this.filterText.replace(/(^\w+:|^)\/\//,"");this.addTag(e,this.filterBy),"keyword"==this.filterBy?(this.queryString.keyword="&keyword="+this.filterText,this.searchTrigger()):(this.landingPages.push(e),this.filterText="",this.createLandingQuery())},searchTrigger:function(){var e=this,t="";["createdDateRange","sendDateRange","adType","landingPage","keyword","networks"].forEach(function(a){e.queryString[a]&&(t+=e.queryString[a])}),this.$emit("search-trigger",t)}}},S={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"sideBar"}},[a("div",{staticClass:"bar-title"},[e._v("Filtros")]),e._v(" "),e._m(0),e._v(" "),a("div",[a("el-date-picker",{staticStyle:{width:"220px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"e","start-placeholder":"Start","end-placeholder":"End","picker-options":e.dateRangeOptions,size:"small"},on:{change:e.changeCreatedRange},model:{value:e.createdRange,callback:function(t){e.createdRange=t},expression:"createdRange"}})],1),e._v(" "),e._m(1),e._v(" "),a("div",[a("el-date-picker",{staticStyle:{width:"220px"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"e","start-placeholder":"Stand","end-placeholder":"End","picker-options":e.dateRangeOptions,size:"small"},on:{change:e.changeSeenRange},model:{value:e.seenRange,callback:function(t){e.seenRange=t},expression:"seenRange"}})],1),e._v(" "),a("div",{staticClass:"label-form"},[e._v("NETWORKS:")]),e._v(" "),a("div",[a("Select",{attrs:{size:"large",multiple:"",filterable:"",placeholder:"Select"},on:{"on-change":e.addNetwork},model:{value:e.selectedNetworks,callback:function(t){e.selectedNetworks=t},expression:"selectedNetworks"}},e._l(e.networksOptions,function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])}))],1),e._v(" "),a("div",{staticClass:"label-form"},[e._v("ECOMMERCE:")]),e._v(" "),a("div",[a("Row",[a("Col",{attrs:{span:6}},[a("i-switch",{on:{"on-change":e.toggleEcommerce},model:{value:e.ecommerceToogle,callback:function(t){e.ecommerceToogle=t},expression:"ecommerceToogle"}})],1),e._v(" "),a("Col",{staticStyle:{"font-size":"16px"},attrs:{span:18}},[e._v("Shopify")])],1)],1),e._v(" "),a("div",{staticClass:"label-form"},[e._v("FILTER BY:")]),e._v(" "),a("div",[a("Select",{attrs:{size:"large",placeholder:"Selecione"},model:{value:e.filterBy,callback:function(t){e.filterBy=t},expression:"filterBy"}},e._l(e.filterByList,function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])}))],1),e._v(" "),a("div",[a("Input",{attrs:{size:"large",placeholder:"Escreva aqui..."},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}})],1),e._v(" "),a("div",{staticStyle:{"padding-bottom":"20px","padding-top":"10px"}},[a("ButtonGroup",[a("Button",{attrs:{type:"success",size:"large"},on:{click:e.addFilter}},[a("Icon",{attrs:{type:"plus"}}),e._v(" Adicionar filtro")],1)],1)],1),e._v(" "),a("div",e._l(e.allTags,function(t,s){return a("Tag",{key:s,attrs:{name:t.label,closable:""},on:{"on-close":e.closeTag}},[e._v(e._s(t.type)+": "+e._s(e.stringDotter(t.label)))])}))])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"label-form"},[t("i",{staticClass:"fa fa-filter"}),this._v(" CREATED IN:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"label-form"},[t("i",{staticClass:"fa fa-eye"}),this._v(" SEEN IN:")])}]};var R=a("VU/8")(x,S,!1,function(e){a("UaTK")},"data-v-6fa71fca",null).exports,T={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"box-card"}},[t("div",{staticClass:"header"},[this._t("header")],2),this._v(" "),this._t("default"),this._v(" "),t("div",{staticClass:"footer"},[this._t("footer")],2)],2)},staticRenderFns:[]};var L=a("VU/8")(null,T,!1,function(e){a("JXAU")},"data-v-03f4a666",null).exports,z={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"carousel-view"},[a("transition-group",{staticClass:"carousel",attrs:{tag:"div"}},e._l(e.slides,function(t){return a("div",{key:t.id,staticClass:"slide"},[a("img",{attrs:{src:"https://content.adspy.com/0102a46c-5514-48e8-9ee7-78fc12a050b3.jpg"}}),e._v(" "),a("div",{staticClass:"ad-text"},[e._v("\n            SmartTV whatever whatever whatever\n            "),a("div",{staticClass:"left-content"},[a("el-button",{attrs:{type:"info"}},[e._v("Shop Now")])],1)])])})),e._v(" "),a("div",{staticClass:"carousel-controls"},[a("a",{staticClass:"carousel-arrow left",attrs:{href:"javascript:"},on:{click:e.previous}},[a("icon",{attrs:{name:"angle-left",scale:"2.4"}})],1),e._v(" "),a("a",{staticClass:"carousel-arrow right",attrs:{href:"javascript:"},on:{click:e.next}},[a("icon",{attrs:{name:"angle-right",scale:"2.4"}})],1)])],1)},staticRenderFns:[]};var P=a("VU/8")({data:function(){return{slides:[{title:"I am Slide A",id:1},{title:"I am Slide B",id:2},{title:"I am Slide C",id:3}]}},methods:{next:function(){var e=this.slides.shift();this.slides=this.slides.concat(e)},previous:function(){var e=this.slides.pop();this.slides=[e].concat(this.slides)}}},z,!1,function(e){a("ZHNf")},null,null).exports,A=a("QMXR"),M=a.n(A),q=(a("Mv4+"),{components:{BoxCard:L,Carousel:P,"d-player":M.a},data:function(){return{adDialogVisible:!1,options:{video:{url:"",pic:""},autoplay:!1,contextmenu:[{text:"GitHub",link:"https://github.com/MoePlayer/vue-dplayer"}]},needChange:0,loaded:!1}},props:["adinfo"],watch:{adinfo:function(){this.options.video.url=this.adinfo.MainAttachment.VideoURL,this.options.video.pic=this.adinfo.MainAttachment.ImageURL;this.loaded&&(this.$refs.player.dp.switchVideo({url:this.adinfo.MainAttachment.VideoURL}),console.log(this.$refs.player.dp))}},mounted:function(){"Video"==this.adinfo.AdType&&(this.options.video.url=this.adinfo.MainAttachment.VideoURL,this.options.video.pic=this.adinfo.MainAttachment.ImageURL,this.$refs.player.dp.switchVideo({url:this.adinfo.MainAttachment.VideoURL,thumbnail:this.adinfo.MainAttachment.VideoURL}),this.loaded=!0)},created:function(){},methods:{showAdInfo:function(e){this.$emit("showAd",e)},checkImg:function(e){return"/assets/images/not-found.jpg"==e?"https://storage.googleapis.com/marine-guard-205707.appspot.com/images/placeholder.png":e},checkGender:function(e){return e&&e.length>1?"<i class='fas fa-female'></i>|<i class='fas fa-male'></i>":"<i class='fas fa-"+e[0].toLowerCase()+"'></i>"},formatDate:function(e,t){return C()(e).locale("pt-br").format(t)}}}),B={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("box-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"listing-header"},[e.adinfo.Actor.ProfilePicture?a("img",{attrs:{src:e.checkImg(e.adinfo.Actor.ProfilePicture)}}):e._e(),e._v(" "),a("div",{staticClass:"title"},[e.adinfo?a("a",{attrs:{href:"#"}},[e._v(e._s(e.adinfo.Actor.Name))]):e._e(),e._v(" "),a("span",[e._v("Created in: "+e._s(e.formatDate(e.adinfo.CreatedOn,"MMM Do, YYYY")))]),e._v(" "),a("span",[e._v("Last seen: "+e._s(e.formatDate(e.adinfo.CreatedOn,"MMM Do, YYYY")))])]),e._v(" "),a("div",{staticClass:"links"},[a("a",{attrs:{href:e.adinfo.LinkToAd,target:"_blank"}},[a("i",{staticClass:"fa fa-external-link-alt"})]),e._v(" "),a("a",{attrs:{href:"javascript:"},on:{click:function(t){e.showAdInfo(e.adinfo.AID)}}},[a("i",{staticClass:"fa fa-info-circle"})])])])]),e._v(" "),a("div",{staticClass:"ad-main"},[a("div",{staticStyle:{"margin-bottom":"10px"}},[e._v("\n    "+e._s(e.adinfo.Text)+"\n    ")]),e._v(" "),e.adinfo.Attachments?a("div",[e.adinfo&&e.adinfo.Attachments.length>1?a("div"):a("div",{staticClass:"ad-content"},["Video"!=e.adinfo.AdType?a("div",{staticClass:"image"},[a("img",{attrs:{src:e.checkImg(e.adinfo.Attachments[0].ImageURL)}})]):e._e(),e._v("\n                \n                "+e._s(e.adinfo.AdType)+"\n                "),"Video"==e.adinfo.AdType?a("div",{staticClass:"video"},[a("d-player",{ref:"player",attrs:{options:e.options}})],1):e._e(),e._v(" "),a("div",{staticClass:"ad-text"},[a("b",[e._v(e._s(e.adinfo.Attachments[0].AttachmentTitle))]),e._v("\n                "+e._s(e.adinfo.Attachments[0].ActionLinkLinkDisplay)+"\n                    "),a("div",{staticClass:"left-box"},[a("Button",{attrs:{type:"primary"}},[e._v(e._s(e.adinfo.Attachments[0].ActionLinkTitle))])],1)])])]):e._e()]),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[e.adinfo?a("div",[e._v(e._s(e.adinfo.Snapshot.LikeNum))]):e._e(),e._v(" "),e.adinfo?a("div",[e._v(" "+e._s(e.adinfo.Snapshot.CommentsNum)+" comments")]):e._e(),e._v(" "),e.adinfo?a("div",[e._v(e._s(e.adinfo.MinAge))]):e._e(),e._v(" "),a("div",[e._v("Brazil")])])])},staticRenderFns:[]};var E=a("VU/8")(q,B,!1,function(e){a("JTPK")},"data-v-06bb5aec",null).exports,I=a("L0AD"),D=a.n(I),N=a("NYxO"),F={components:{AdCard:E,BoxCard:L,VeRing:D.a},data:function(){return{result:"",genderChartData:{columns:[],rows:[]},currentPage:0}},props:["idAd"],methods:{changePage:function(e){this.currentPage=this.currentPage+e},returnBack:function(){this.$emit("return-back")},closeLoading:function(){this.$emit("close-loading")},genderTranslate:function(e){return"Female"==e?"mulher":"homem"}},mounted:function(){var e=this;this.axios.defaults.headers.common.authorization="Bearer "+localStorage.getItem("id_token"),this.axios.get("/api/ad/"+this.idAd).then(function(t){e.result=t.data,e.$emit("close-loading"),e.result.Genders.length>1?e.genderChartData={columns:["sexo","PC"],rows:[{sexo:"mulher",PC:50},{sexo:"homem",PC:50}]}:(console.log(e.genderTranslate(e.result.Genders[0])),e.genderChartData={columns:["sexo","PC"],rows:[{sexo:e.genderTranslate(e.result.Genders[0]),PC:1}]})}).catch(function(e){bugsnagClient.notify(new Error(e))})},created:function(){this.chartData={}}},U={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Button",{staticStyle:{"margin-bottom":"10px"},attrs:{size:"large",type:"primary"},on:{click:e.returnBack}},[e._v(" < Voltar para busca")]),e._v(" "),a("Card",[a("Row",[a("Col",{attrs:{span:"12"}},[e.result?a("div",[a("ad-card",{attrs:{adinfo:e.result}})],1):e._e()]),e._v(" "),a("Col",{staticStyle:{"padding-left":"20px"},attrs:{span:"12"}},[a("Row",[a("Col",{attrs:{span:"8"}},[e._v(" "),e.currentPage-1>-1?a("Button",{attrs:{type:"info",icon:"ios-arrow-back"},on:{click:function(t){e.changePage(-1)}}},[e._v("Última")]):e._e()],1),e._v(" "),a("Col",{staticStyle:{"text-align":"center"},attrs:{span:"8"}},[e._v("Pagina "+e._s(e.currentPage+1)+" de "+e._s(e.result.Pages.length))]),e._v(" "),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"8"}},[e._v(" "),e.currentPage+1<e.result.Pages.length?a("Button",{attrs:{type:"info"},on:{click:function(t){e.changePage(1)}}},[e._v("Próxima  "),a("Icon",{attrs:{type:"ios-arrow-forward"}})],1):e._e()],1)],1),e._v(" "),a("Row",[a("Col",{staticClass:"header-info",attrs:{span:"24"}},[a("h2",[e._v("Ad URL")])])],1),e._v(" "),a("Row",[a("Col",{attrs:{span:"24"}},[a("a",{attrs:{href:e.result.LinkToAd,target:"_blank"}},[e._v(e._s(e.result.LinkToAd))])])],1),e._v(" "),a("Row",[a("Col",{staticClass:"header-info",attrs:{span:"24"}},[a("h2",[e._v("Landing Page")])])],1),e._v(" "),a("Row",[a("Col",{attrs:{span:"24"}},[e.result.Pages?a("a",{attrs:{href:e.result.Pages[e.currentPage].FinalURL,target:"_blank"}},[e._v(e._s(e.result.Pages[e.currentPage].FinalURL))]):e._e()])],1),e._v(" "),a("Row",[a("Col",{staticClass:"header-info",attrs:{span:"24"}},[a("h2",[e._v("Outgoing Links")])])],1),e._v(" "),e.result.Pages[e.currentPage].OutgoingLinks?a("Row",[a("div",{staticClass:"ivu-table-wrapper"},[a("div",{staticClass:"ivu-table ivu-table-border"},[a("table",{staticStyle:{width:"100%"},attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[a("tbody",{staticClass:"ivu-table-tbody"},e._l(e.result.Pages[e.currentPage].OutgoingLinks,function(t,s){return a("tr",{key:s,staticClass:"ivu-table-row"},[a("td",{staticStyle:{"padding-left":"10px","font-size":"14px"}},[a("a",{attrs:{href:t.URL}},[e._v(e._s(t.URL))])])])}))])])])]):e._e(),e._v(" "),e.result.Pages[e.currentPage].RedirectUrls?a("div",[a("Row",[a("Col",{staticClass:"header-info",attrs:{span:"24"}},[a("h2",[e._v("Redirection Links")])])],1),e._v(" "),a("Row",[a("Col",{attrs:{span:"24"}},[a("div",{staticClass:"ivu-table-wrapper"},[a("div",{staticClass:"ivu-table ivu-table-border"},[a("table",{staticStyle:{width:"100%"},attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[a("tbody",{staticClass:"ivu-table-tbody"},e._l(e.result.Pages[e.currentPage].RedirectUrls,function(t,s){return a("tr",{key:s,staticClass:"ivu-table-row"},[a("td",{staticStyle:{"padding-left":"10px","font-size":"14px"}},[a("a",{attrs:{href:t}},[e._v(e._s(t))])])])}))])])])])],1)],1):e._e(),e._v(" "),a("box-card",[a("div",{staticStyle:{"font-size":"18px"},attrs:{slot:"header"},slot:"header"},[a("b",[e._v("Demográfico")])]),e._v(" "),a("h3",{staticStyle:{"margin-left":"10px"}},[e._v("Sexo:")]),e._v(" "),a("ve-ring",{attrs:{data:e.genderChartData}}),e._v(" "),a("h3",{staticStyle:{"margin-left":"10px"}},[e._v("Idade:")]),e._v(" "),a("div",{staticStyle:{padding:"10px"}},[e._v("\n                            "+e._s(e.result.MinAge)+" - "+e._s(e.result.MaxAge)+"\n                        ")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var V=a("VU/8")(F,U,!1,function(e){a("4sxP")},null,null).exports,O=a("7RXn"),Y=a.n(O),$={components:{SearchBar:R,AdCard:E,AdInfo:V},data:function(){return{testDialog:!0,apiResult:[],queryString:"",pageNum:1,saveModal:!1,showContent:"main",saveSearchAs:"",lastQuery:"",loadingSpin:!1,loadingBottom:!0,sortByField:"created_desc",orderBySelected:0,adSelected:0,alertWarning:!1,noResultsWarning:!1,orderMap:[{label:"Mais novos",value:"created_desc"},{label:"Mais velhos",value:"created_asc"},{label:"Menos likes",value:"likes_asc"},{label:"Mais likes",value:"likes_desc"}]}},computed:w()({},Object(N.a)(["apiToken"]),{orderTitle:function(){}}),methods:{returnBack:function(){this.adSelected=0,this.showContent="main"},closeLoading:function(){this.loadingSpin=!1},showAd:function(e){this.loadingSpin=!0,this.adSelected=e,this.showContent="ad"},sortBy:function(e){this.orderBySelected=e,this.sortByField=this.orderMap[e].value,this.runSavedQuery()},infiniteLoad:function(){this.loadingSpin=!0,this.increaseQuery()},saveSearch:function(){this.saveSearchAs},increaseQuery:function(){var e=this;this.pageNum++,this.axios.get("/api/ads?page="+this.pageNum+this.lastQuery).then(function(t){e.apiResult=e.apiResult.concat(t.data),e.loadingSpin=!1}).catch(function(e){})},runSavedQuery:function(){var e=this.lastQuery;this.runSearchQuery(e)},runSearchQuery:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.loadingSpin=!0,this.noResultsWarning=!1,this.loadingBottom=!0;var a=this;this.lastQuery=e,this.sortByField&&(e+="&sort="+this.sortByField),this.axios.get("/api/ads?page="+t+e).then(function(e){a.apiResult=e.data,a.loadingSpin=!1,console.log(e.data),0==e.data.length&&(a.$Notice.error({title:"Nenhum resultado",desc:"Pesquisa sem resultados. Mude seus filtros. "}),a.noResultsWarning=!0,a.loadingBottom=!1,a.loadingSpin=!1)}).catch(function(e){"Error: Request failed with status code 401"==e&&(localStorage.removeItem("id_token"),location.reload()),a.loadingSpin=!1})},logout:function(){localStorage.removeItem("id_token"),this.$router.push({name:"login"})}},beforeCreate:function(){this.axios.defaults.headers.common.authorization="Bearer "+localStorage.getItem("id_token")},created:function(){this.loadingBusy=!0,"main"==this.showContent&&this.runSearchQuery("")},mounted:function(){var e=this;this.loadingBusy=!1,Y.a.isDetected()&&(this.alertWarning=!0),localStorage.getItem("novo")||(localStorage.removeItem("novo"),this.$router.push({name:"login"})),this.axios.get("/api/checkuser").then(function(t){console.log(t.data.Valid),t.data.Valid||e.logout()}).catch(function(e){})}},Q={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{height:"100%"}},[a("header",{staticClass:"topbar"},[e._m(0),e._v(" "),a("div",{staticClass:"white-navbar"},[a("div",{staticClass:"left-navbar"}),e._v(" "),a("div",{staticClass:"right-navbar"},[a("a",{staticClass:"navbar-item",attrs:{href:"javascript:"},on:{click:e.logout}},[a("Icon",{attrs:{type:"log-out"}})],1)])])]),e._v(" "),a("aside",{staticClass:"leftbar"},[a("div",{staticClass:"leftbar-content"},[a("search-bar",{on:{"search-trigger":e.runSearchQuery}})],1)]),e._v(" "),a("div",{staticClass:"page-wrapper"},["main"!=e.showContent&&e.loadingSpin?a("Spin",{attrs:{size:"large",fix:""}},[a("Icon",{staticClass:"demo-spin-icon-load",attrs:{type:"load-c",size:"18"}}),e._v(" "),a("div",[e._v("Carregando")])],1):e._e(),e._v(" "),"main"!=e.showContent?a("div",[a("ad-info",{attrs:{idAd:e.adSelected},on:{"return-back":e.returnBack,"close-loading":e.closeLoading}})],1):e._e(),e._v(" "),"main"==e.showContent?a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.infiniteLoad,expression:"infiniteLoad"}],staticClass:"content-wrapper",attrs:{"infinite-scroll-distance":"200"}},[e.loadingSpin?a("Spin",{attrs:{size:"large",fix:""}},[a("Icon",{staticClass:"demo-spin-icon-load",attrs:{type:"load-c",size:"18"}}),e._v(" "),a("div",[e._v("Carregando")])],1):e._e(),e._v(" "),a("Modal",{attrs:{title:"Salvar pesquisa","ok-text":"Salvar","cancel-text":"Cancelar"},on:{"on-ok":e.saveSearch,"on-cancel":function(t){e.saveModal=!1}},model:{value:e.saveModal,callback:function(t){e.saveModal=t},expression:"saveModal"}},[a("Form",{attrs:{"label-position":"left"}},[a("FormItem",{attrs:{label:"Salvar como"}},[a("Input",{model:{value:e.saveSearchAs,callback:function(t){e.saveSearchAs=t},expression:"saveSearchAs"}})],1)],1)],1),e._v(" "),a("Row",[a("Col",{attrs:{span:"12"}},[a("Dropdown",{on:{"on-click":e.sortBy}},[a("a",{attrs:{href:"javascript:void(0)"}},[e._v("\n                                Order by: "+e._s(e.orderMap[e.orderBySelected].label)+" "),a("Icon",{attrs:{type:"arrow-down-b"}})],1),e._v(" "),a("DropdownMenu",{attrs:{slot:"list"},slot:"list"},e._l(e.orderMap,function(t,s){return a("DropdownItem",{key:s,attrs:{selected:e.orderBySelected==s,name:s}},[e._v(e._s(t.label))])}))],1)],1)],1),e._v(" "),a("Row",e._l(Math.ceil(e.apiResult.length/3),function(t){return a("Row",{key:"ad-row-"+t,staticClass:"list-ads-rows",attrs:{span:"12"}},e._l(e.apiResult.slice(3*(t-1),3*t),function(s,n){return a("Col",{key:"ad-"+t+"-"+n,attrs:{span:"8"}},[a("ad-card",{attrs:{adinfo:s},on:{"return-back":e.returnBack,showAd:e.showAd}})],1)}))})),e._v(" "),e.loadingBottom?a("div",{staticStyle:{"padding-top":"10px","padding-bottom":"30px"}},[a("Col",{staticClass:"demo-spin-col",attrs:{span:"24"}},[a("Spin",{attrs:{fix:"",size:"large"}},[a("Icon",{staticClass:"demo-spin-icon-load",attrs:{type:"load-c",size:"18"}}),e._v(" "),a("div",[e._v("Carregando")])],1)],1)],1):e._e()],1):e._e(),e._v(" "),e.noResultsWarning?a("Alert",{attrs:{type:"warning","show-icon":""}},[e._v("\n                Não encontramos nada\n                "),a("template",{slot:"desc"},[e._v("\n                Utilize outros dados em seus filtros. Não encontramos nada em nosso banco de dados. Nos mande um email com algum site específico que você tem muito interesse em encontrar.\n            ")])],2):e._e()],1),e._v(" "),a("Modal",{attrs:{"mask-closable":!1,width:"360"},model:{value:e.alertWarning,callback:function(t){e.alertWarning=t},expression:"alertWarning"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),e._v(" "),a("span",[e._v("Adblock encontrado")])],1),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("p",[e._v("Detectamos Adblock no seu navegador")]),e._v(" "),a("p",[e._v("Adblocks normalmente causam problemas na listagem de imagens")]),e._v(" "),a("p",[e._v("Pedimos para desabilitar o Adblock para essa ferramente")])]),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"error",size:"large",long:""},on:{click:function(t){e.alertWarning=!1}}},[e._v("Fechar")])],1)])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"brand-wrapper"},[t("a",{attrs:{href:"http://app.adstation.io"}},[this._v("ADSTATION")])])}]};var W=a("VU/8")($,Q,!1,function(e){a("6e2D")},null,null).exports,H=a("mtWM"),X=a.n(H),G={data:function(){return{username:"",password:"",urlApi:"http://localhost:8070/"}},methods:{login:function(){alert("Login called");X.a.post(this.urlApi+"api/v1/authenticate",{username:this.username,password:this.password}).then(function(e){console.log(e)}).catch(function(e){console.log("Error: "+e)})}}},J={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{padding:"100px"}},[a("form",{attrs:{name:"form",method:"post",action:"http://apitest.test/api.php"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"input",attrs:{name:"username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),a("br"),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input",attrs:{name:"password",type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),a("br"),e._v(" "),a("button",{attrs:{type:"button"},on:{click:e.login}},[e._v("Logar")])])])},staticRenderFns:[]};var K=a("VU/8")(G,J,!1,function(e){a("rwZu")},null,null).exports,Z={data:function(){return{dialogFormVisible:!1,dynamicValidateForm:{domains:[{key:1,value:""}],email:"",password:""},formReset:{email:""},formLogin:{email:"",password:""},loggedUser:{username:""},loadingLogin:!1,bearerToken:"",ruleReset:{email:[{required:!0,message:"Informe seu email",trigger:"blur"},{type:"email",message:"Formato errado",trigger:"blur"}]},ruleLogin:{email:[{required:!0,message:"Informe seu email",trigger:"blur"},{type:"email",message:"Incorrect email format",trigger:"blur"}],password:[{required:!0,message:"Informe sua senha.",trigger:"blur"}]}}},computed:w()({},Object(N.a)(["apiToken"])),methods:{resetPass:function(){var e=this;if(this.formReset.email){alert(this.formReset.email),this.axios.post("auth/reset",{email:this.formReset.email}).then(function(t){console.log("Sucesso: "),console.log(t),e.dialogFormVisible=!1,e.$Message.success("E-mail para resetar enviado. Cheque seu inbox.")}).catch(function(e){console.log("Erro: "+e)})}else alert("Informe um e-mail")},submitLogin:function(){var e=this;this.loadingLogin=!0;var t=this;this.axios.post("auth/login",{email:t.formLogin.email,password:t.formLogin.password}).then(function(a){t.loggedUser=t.formLogin.email,t.loadingLogin=!1,localStorage.setItem("id_token",a.data.token),localStorage.setItem("loggedUser",t.formLogin.email),localStorage.setItem("novo","exists");var s={app_id:"eimzp1tz",user_id:a.data.id,email:a.data.email};window.Intercom("boot",s),e.$router.push({name:"main"})}).catch(function(a){console.log(a),e.$Message.error("Erro no login. Cheque seus dados."),t.loadingLogin=!1})}}},ee={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"auth-wrapper d-flex no-block justify-content-center align-items-center"},[a("div",{staticClass:"auth-box"},[a("div",{attrs:{id:"loginform"}},[e._m(0),e._v(" "),a("el-dialog",{attrs:{width:"30%",title:"Esqueceu sua senha?",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("i-form",{ref:"formReset",attrs:{model:e.formReset,rules:e.ruleReset}},[a("form-item",{attrs:{prop:"email"}},[a("i-input",{attrs:{size:"large",type:"text",placeholder:"Email"},model:{value:e.formReset.email,callback:function(t){e.$set(e.formReset,"email",t)},expression:"formReset.email"}})],1),e._v(" "),a("form-item",[a("i-button",{staticClass:"loginButton",attrs:{type:"primary"},on:{click:function(t){e.resetPass("formInline")}}},[e._v("Pedir senha")])],1)],1)],1),e._v(" "),a("Row",[a("Col",[a("i-form",{ref:"formLogin",attrs:{model:e.formLogin,rules:e.ruleLogin}},[a("form-item",{attrs:{prop:"email"}},[a("i-input",{attrs:{size:"large",type:"text",placeholder:"Email"},model:{value:e.formLogin.email,callback:function(t){e.$set(e.formLogin,"email",t)},expression:"formLogin.email"}},[a("Icon",{attrs:{slot:"prepend",type:"ios-email-outline"},slot:"prepend"})],1)],1),e._v(" "),a("form-item",{attrs:{prop:"password"}},[a("i-input",{attrs:{size:"large",type:"password",placeholder:"Senha"},model:{value:e.formLogin.password,callback:function(t){e.$set(e.formLogin,"password",t)},expression:"formLogin.password"}},[a("icon",{attrs:{slot:"prepend",type:"ios-locked-outline"},slot:"prepend"})],1)],1),e._v(" "),a("form-item",[a("i-button",{staticClass:"loginButton",attrs:{type:"primary"},on:{click:function(t){e.submitLogin("formInline")}}},[e._v("Signin")])],1),e._v(" "),a("div",{staticClass:"forgotPass"},[a("a",{attrs:{href:"javascript:"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("Esqueceu sua senha?")])])],1)],1)],1),e._v(" "),e.loadingLogin?a("Spin",{attrs:{size:"large",fix:""}},[a("Icon",{staticClass:"demo-spin-icon-load",attrs:{type:"load-c",size:"18"}}),e._v(" "),a("div",[e._v("Carregando")])],1):e._e()],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"logo"},[t("h5",{staticClass:"subtitle"},[this._v("Login AdStation")])])}]};var te=a("VU/8")(Z,ee,!1,function(e){a("iFc3")},null,null).exports,ae={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"flex-container"},[t("div",{staticClass:"thanks-content"},[t("h1",[this._v("Obrigado!")]),this._v(" "),t("span",[this._v("\n            Seja bem-vindo"),t("br"),t("br"),this._v("\n\n        Seus dados foram enviados para seu email.\n        Nos informe de qualquer problema "),t("br"),t("br"),this._v(" "),t("div",{staticClass:"grey-box"},[this._v("Caso não encontrar o email no seu Inbox, também cheque em SPAM, algumas vezes o email é enviado para SPAM por engano.")])])])])}]};var se=a("VU/8")(null,ae,!1,function(e){a("6vQ6")},null,null).exports;v.default.use(b.a);var ne=new b.a({routes:[{path:"/",name:"main",component:W,meta:{requiresAuth:!0}},{path:"/ad/:id",name:"ad",component:W,meta:{requiresAuth:!0}},{path:"/login",name:"login",component:te},{path:"/auth",name:"form",component:K},{path:"/thankyou",name:"thankyou",component:se}]}),ie=a("BTaQ"),re=a.n(ie),oe=a("Rf8U"),le=a.n(oe),ce=a("bqTm"),de=a.n(ce),ue=a("w/U7"),ge=a("LVWl"),he=a.n(ge),me=a("urW8"),fe=a.n(me),pe=a("s5DI"),ve=a.n(pe),_e=a("5+Vw"),ye=a.n(_e),be=(a("+skl"),a("tvR6"),a("tLvy"),a("RUzx")),ke=a.n(be);ve()("413da0cc0b1b4379e72bfe2ca21eaa32").use(ye()(v.default)),fe.a.use(he.a),v.default.component(p.a.name,p.a),v.default.component(m.a.name,m.a),v.default.component(g.a.name,g.a),v.default.component(d.a.name,d.a),v.default.component(l.a.name,l.a),v.default.component(r.a.name,r.a),v.default.component(n.a.name,n.a),v.default.config.productionTip=!1,v.default.use(re.a),v.default.use(le.a,X.a),v.default.use(de.a),v.default.use(ue.a),v.default.axios.defaults.baseURL="https://affserver-223918.appspot.com/",v.default.component("multiselect",ke.a),ne.beforeEach(function(e,t,a){var s=localStorage.getItem("id_token"),n=e.matched.some(function(e){return e.meta.requiresAuth});n&&!s?a("/login"):a()}),new v.default({el:"#app",router:ne,components:{App:y},template:"<App/>"})},"U/ZW":function(e,t){},UaTK:function(e,t){},Yq4J:function(e,t){},ZHNf:function(e,t){},hXTu:function(e,t){},iFc3:function(e,t){},isgN:function(e,t){},rwZu:function(e,t){},tLvy:function(e,t){},tvR6:function(e,t){},uslO:function(e,t,a){var s={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function n(e){return a(i(e))}function i(e){var t=s[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}n.keys=function(){return Object.keys(s)},n.resolve=i,e.exports=n,n.id="uslO"},vBcO:function(e,t){},y7Fb:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.4528bec7fd5e1aa45665.js.map