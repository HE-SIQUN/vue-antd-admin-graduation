<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
@import "index";
</style>
