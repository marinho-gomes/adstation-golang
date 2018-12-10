<template>
    <box-card>

        <div slot="header">
            <div class="listing-header">
                
                <img v-if="adinfo.Actor.ProfilePicture" :src="checkImg(adinfo.Actor.ProfilePicture)"/>
                <div class="title">
                    <a href="#" v-if="adinfo">{{adinfo.Actor.Name}}</a>
                    <span>Created in: {{formatDate(adinfo.CreatedOn,"MMM Do, YYYY")}}</span>
                    <span>Last seen: {{formatDate(adinfo.CreatedOn,"MMM Do, YYYY")}}</span>
                </div>
                <div class="links">
                    <a :href="adinfo.LinkToAd" target="_blank"><i class="fa fa-external-link-alt"></i></a>
                    <a href="javascript:" @click="showAdInfo(adinfo.AID)"><i class="fa fa-info-circle"></i></a>
                </div>
            </div>

        </div>
        <div class="ad-main">
        <div style="margin-bottom: 10px">
        {{adinfo.Text}}
        </div>
        <!-- check if there is attachment and then check if there is a lot of not a lot of them -->
        <div v-if="adinfo.Attachments">

            <div v-if="adinfo && adinfo.Attachments.length > 1">
                <!--
                <el-carousel height="300px" :autoplay="false" indicator-position="none" arrow="always">
                    
                    <el-carousel-item  v-for="(item, index) in adinfo.Attachments" :key="adinfo.ID+index" >
                    <div class="ad-content">
                        <div class="image" v-show="item.ImageURL">
                            <img :src="checkImg(item.ImageURL)">
                        </div>
                        <div class="ad-text">
                        <b>{{item.AttachmentTitle}}</b>
                        {{item.ActionLinkLinkDisplay}}
                            <div class="left-box">
                                <Button type="primary">{{item.ActionLinkTitle}}</Button>
                            </div>
                        </div>
                    </div>
                    </el-carousel-item>
                </el-carousel>
                -->
                </div>
                <div v-else class="ad-content">
                    <div class="image" v-if="adinfo['AdType'] != 'Video'">
                        <img :src="checkImg(adinfo.Attachments[0].ImageURL)">
                    </div>
                    
                    {{adinfo['AdType']}}
                    <div v-if="adinfo['AdType'] == 'Video'" class="video">
                        <d-player :options="options" ref="player">
                        </d-player> 
                    </div>

                    <div class="ad-text">
                    <b>{{adinfo.Attachments[0].AttachmentTitle}}</b>
                    {{adinfo.Attachments[0].ActionLinkLinkDisplay}}
                        <div class="left-box">
                            <Button type="primary">{{adinfo.Attachments[0].ActionLinkTitle}}</Button>
                        </div>
                    </div>
                </div>

        </div>
        

        </div>
        <div slot="footer">
            <div v-if="adinfo">{{adinfo.Snapshot.LikeNum}}</div>
            <div v-if="adinfo"> {{adinfo.Snapshot.CommentsNum}} comments</div>
            <div v-if="adinfo">{{adinfo.MinAge}}<!--<span v-html="checkGender(adinfo.Genders)"></span>--></div>
            <div>Brazil</div>
        </div>
    </box-card>
</template>

<script>
import BoxCard from './BoxCard';
import Carousel from './Carousel';
import moment from 'moment';

import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'


export default {
    components: {
        BoxCard, Carousel,'d-player': VueDPlayer
    },
    data(){
        return {
            adDialogVisible: false,
            options: {
                video: {
                    url: '',
                    pic: ''
                },
                autoplay: false,
                contextmenu: [
                    {
                        text: 'GitHub',
                        link: 'https://github.com/MoePlayer/vue-dplayer'
                    }
                ]
            },
            needChange: 0,
            loaded: false,
        }
    },
    props: ['adinfo'],
    watch: {
        adinfo(){
            this.options.video.url = this.adinfo.MainAttachment.VideoURL;
            this.options.video.pic = this.adinfo.MainAttachment.ImageURL;
            let self = this;
            if(this.loaded){
                this.$refs.player.dp.switchVideo({
                    url: this.adinfo.MainAttachment.VideoURL
                })
                console.log(this.$refs.player.dp);
            }
        }
    },
    mounted(){
        let adinfo = this.adinfo;
        if(adinfo.AdType == 'Video'){
            this.options.video.url = this.adinfo.MainAttachment.VideoURL;
            this.options.video.pic = this.adinfo.MainAttachment.ImageURL;
            this.$refs.player.dp.switchVideo({
                url: this.adinfo.MainAttachment.VideoURL,
                thumbnail: this.adinfo.MainAttachment.VideoURL
            });
            this.loaded = true;
        }
    },
    created(){
        /*
        if(this.adinfo.AdType == 'Video'){
            this.options.video.url = this.adinfo.MainAttachment.VideoURL;
            this.options.video.pic = this.adinfo.MainAttachment.ImageURL;
            this.loaded = true;
        }
        */
    },
    methods: {
        showAdInfo(adID){
            this.$emit('showAd',adID);
        },
        checkImg(imgUrl){
            if(imgUrl == "/assets/images/not-found.jpg"){
                return "https://storage.googleapis.com/marine-guard-205707.appspot.com/images/placeholder.png"
            }
            return imgUrl
        },
        checkGender(data){
            if(data)
                if(data.length > 1)
                    return "<i class='fas fa-female'></i>|<i class='fas fa-male'></i>"
            return "<i class='fas fa-" + data[0].toLowerCase() + "'></i>";
        },
        formatDate(date,dateFormat){
            return moment(date).locale('pt-br').format(dateFormat)
        }
    }
}
</script>


<style lang="sass" scoped>
.ad-content
  .image
    text-align: center
    img
       width: 100%
  .ad-text
    width: 100%
    margin-top: 20px
    margin-bottom: 30px
    .left-box
      float: right
      width: 200px
      text-align: right
.ad-main
    padding: 15px
    img
        display: block
        width: 90%
        margin: 0 auto
        
.listing-header
    height: 50px
    img
        display: block
        float: left
        width: 50px
    .links
        float: right
        font-size: 30px
        a
            color: black
        a:hover
            color: grey
    .title
        padding-left: 10px
        float: left
        width: 200px
        font-size: 14px
        a
            display: block
            float: left
            width: 100%
            text-decoration: none
            color: blue
            font-weight: bold
        span
            font-size: 11px
            float: left
</style>