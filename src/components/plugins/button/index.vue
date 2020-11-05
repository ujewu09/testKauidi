<template>
  <div class="button-custom">
    <i-button type="error" >{{ value }}</i-button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: () => {
        return "";
      },
    },
 
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.button-custom {
  .ivu-btn {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    padding: 0;
    > span {
      vertical-align: initial;
    }
  }
  .ivu-btn-error {
    @include backgroundColor($_color);
    color: #000;
    border: none;
    width: 100%;
    &:hover {
      @include hover($h_color1);
    }
  }
}
</style>