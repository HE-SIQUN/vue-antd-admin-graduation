<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <router-link to="/topic/shanghai/weiboPage">具体内容  women</router-link>
    <a-row :gutter="24" >
    <a-col :sm="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">
      <a-card title="话题微博列表" :bordered="false">
        <p>上海人民</p>
      </a-card>
    </a-col>
    <a-col :sm="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
      <a-card title="话题发博人地理信息地图展示" :bordered="false">
        <p>地图实例</p>
      </a-card>
    </a-col>
    <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
      <a-card title="话题知识图谱" :bordered="false">
        <p>底部图谱的展示区域</p>
      </a-card>
    </a-col>
    </a-row>
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