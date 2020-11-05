<template>
  <div class="container">
    <headerDiv />
    <div class="bg-color">
      <div class="middler-wrapper">
        <sideDiv />
        <mainDiv />
      </div>
    </div>
    <footerDiv />
  </div>
</template>

<script>
import headerDiv from "./header";
import sideDiv from "./side";
import mainDiv from "./main";
import footerDiv from "./footer";
export default {
  components: {
    headerDiv,
    sideDiv,
    mainDiv,
    footerDiv,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .bg-color {
    @include backgroundColor($bg-wrapper);
    width: 100%;
    .middler-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
    }
  }
}
</style>