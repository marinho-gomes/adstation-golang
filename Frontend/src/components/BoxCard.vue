<template>
    <div id="box-card">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <slot></slot>
        <div class="footer">
            <slot class="footer" name="footer"></slot>
        </div>
    </div>
</template>

<style lang="sass" scoped>
$color-border: #ebeef5
.header > *
    padding: 10px
.footer > *
    font-size: 12px
    border-top: 1px solid $color-border
    margin-top: 5px
    height: 40px
    div
        float: left
        width: 24%
        text-align: center
        line-height: 40px
    div:not(:first-of-type)
        border-left: 1px solid $color-border
#box-card
    width: 98%
    border: 1px solid $color-border
    background: white
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 3px
    margin: 10px
</style>

