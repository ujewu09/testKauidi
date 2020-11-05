<template>
    <div class="main-box">
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
    </div>
</template>

<style lang="scss" scoped>
.main-box{
    width: 1070px;
    border-radius: 5px;
    margin-bottom: 20px;
}
</style>