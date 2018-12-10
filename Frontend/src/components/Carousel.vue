<template>
    <div class='carousel-view'>
        <transition-group
        class='carousel'
        tag="div">
        <div
            v-for="slide in slides" 
            class='slide'
            :key="slide.id">
            <img src="https://content.adspy.com/0102a46c-5514-48e8-9ee7-78fc12a050b3.jpg">
            <div class="ad-text">
                SmartTV whatever whatever whatever
                <div class="left-content"><el-button type="info">Shop Now</el-button></div>
            </div>
        </div>
        </transition-group>
        <div class='carousel-controls'>
        <a href="javascript:" class="carousel-arrow left" @click="previous"><icon name="angle-left" scale="2.4"></icon></a>
        <a href="javascript:" class="carousel-arrow right" @click="next"><icon name="angle-right" scale="2.4"></icon></a>
        </div>
    </div>
</template>

<style>
.carousel-arrow{
    position: absolute;
    top: 45%;
    display: block;
    width: 40px;
    height: 40px;
    line-height: 42px;
    text-align: center;
    background: rgba(0,0,0,0.4);
    color: white;
    border-radius: 20px;
}
.carousel-arrow.left{
    left: 0;
}
.carousel-arrow.right{
    right: 0;
}
.carousel-arrow:hover{
    background: rgba(0,0,0,0.8);
}
.carousel-view {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  width: 24em;
  min-height: 25em;
}
.slide {
  flex: 0 0 20em;
  height: 20em;
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1em dashed #000;
  border-radius: 50%;
  transition:all 1.0s ease-in-out;
}
.slide:first-of-type {
  opacity: 0;
}
.slide:last-of-type {
  opacity: 0;
}
</style>

<script>
export default {
    data(){
        return {
            slides: [
                {
                    title: 'I am Slide A',
                    id: 1
                },
                {
                    title: 'I am Slide B',
                    id: 2
                },
                {
                    title: 'I am Slide C',
                    id: 3
                }]
        }
    },
    methods: {
        next(){
            const first = this.slides.shift()
            this.slides = this.slides.concat(first)
        },
        previous(){
            const last = this.slides.pop()
            this.slides = [last].concat(this.slides)
        }
    }
}
</script>
