<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  //声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6,
em,
i {
  font-weight: 100;
  font-style: normal;
}
ul,
ol,
li {
  list-style-type: none;
}
a {
  color: #666;
  text-decoration: none;
  outline: 0;
}
a:hover {
  text-decoration: none;
}
.ivu-tabs,
.ivu-table-wrapper {
  overflow: initial;
}
.ivu-tabs-nav {
  .ivu-tabs-tab:hover {
    @include color($_color);
  }
  .ivu-tabs-tab-active {
    @include color($_color);
  }
  .ivu-tabs-ink-bar {
    @include backgroundColor($_color);
  }
}
.ivu-select-visible {
  .ivu-select-selection {
    @include borderColor($_color);
  }
}
.ivu-input:hover,
.ivu-input:focus {
  @include hoverBorder($_color);
}
.ivu-select-selection-focused,
.ivu-select-selection:hover {
  @include hoverBorder($_color);
}
.ivu-select-item-selected,
.ivu-select-item-selected:hover {
  @include color($_color);
}
.ivu-btn-primary {
  @include backgroundColor($_color);
  @include borderColor($_color);
  &:hover {
    @include backgroundColor($_color);
    @include borderColor($_color);
  }
}
.ivu-checkbox-checked .ivu-checkbox-inner {
  @include backgroundColor($_color);
  @include borderColor($_color);
}
.ivu-radio-checked:hover .ivu-radio-inner{
  @include borderColor($_color);
}
.ivu-radio-checked {
  .ivu-radio-inner {
    @include borderColor($_color);
    &::after {
      @include backgroundColor($_color);
    }
  }
}
.ivu-page-item:hover {
   @include borderColor($_color);
}
.ivu-page-item:hover a{
    @include color($_color);
}

.ivu-page-item-active {
  @include borderColor($_color);
}
.ivu-page-item-active a, .ivu-page-item-active:hover a{
  @include color($_color);
}
.ivu-page-next:hover, .ivu-page-prev:hover {
   @include borderColor($_color);
}
.ivu-page-next:hover a, .ivu-page-prev:hover a {
  @include color($_color);
}
 .page-ive {
    margin: 20px auto;
    width: 400px;
    display: flex;
    justify-content: center;
  }
#app {
}
</style>
