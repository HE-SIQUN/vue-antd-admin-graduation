<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-row :gutter="24" >
      <a-col :sm="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
        <a-card title="博文内容" :bordered="false">
          <p>上海人民</p>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">
        <a-card title="博文评论主题类型" :bordered="false">
          <p>评论类型</p>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
        <a-card title="转发地图" :bordered="false">
          <p>转发地图展示区域</p>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
        <a-card title="评论用户地图分布" :bordered="false">
          <p>此区域待定</p>
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