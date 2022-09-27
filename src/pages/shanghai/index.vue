<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Demo',
    i18n: require('./i18n'),
    data() {
      return {
      }
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
      // desc() {
      //   return this.$t('pageDesc')
      // }
    }
  }
</script>

<style scoped lang="less">
@import "index";
</style>