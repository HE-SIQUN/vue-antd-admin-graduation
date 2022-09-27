<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    具体内容  women
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'TopicDetail',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  }
}
</script>

<style scoped lang="less">
@import "../index.less";
</style>