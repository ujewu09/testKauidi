<template>
  <Input
    :value="content"
    :placeholder="placeholder"
    :type="type"
    @on-change="(e) => $emit('change', e.target.value)"
    style="width: 310px"
  />
</template>
 
<script>
export default {
  model: {
    prop: "value",
    event: "change",
  },
  //   props: ["content", "placeholder", (aa: {})],s
  props: {
    content: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    type: {type: String, default: "text"},
  },
};
</script>
 
<style scoped>
</style>