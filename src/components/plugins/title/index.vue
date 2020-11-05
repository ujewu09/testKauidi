<template>
    <div class="unify-title">
        {{title}}
      </div>
</template>


<script>
export default {
    props: ['title'],
    data() {
        return {}
    }
}
</script>

<style lang="scss">
.unify-title{
   @include border($b_color);
   line-height: 1;
   padding-left: 5px;
   box-sizing: border-box;
   font-size: 16px;
   color: #000;
   height: 16px;
}
</style>