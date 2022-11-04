<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <page-layout></page-layout>
    <router-view></router-view>
  </div>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
export default {
  components: {PageLayout}
}
</script>

<style scoped lang="less">
@import "index";
</style>
