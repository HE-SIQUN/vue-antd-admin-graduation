<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-row :gutter="24" >
      <a-col :sm="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">
        <a-card title="博文内容" :bordered="false">
          <p>上海市疫情防控核酸筛查专班负责人夏科家表示，对于“常态化检测点不接受核酸报告超过72小时”的说法，市防控办没有出台过此类要求，我们已要求各区开展自查，如有个别采样点擅自加码，必须坚决整改。另外需要说明一下，大家出入居住的本社区，不需要提供72小时内核酸阴性证明。但是需要规范佩戴口罩，配合测温，并主动扫出入口的“场所码”，出示“随申码”绿码。</p>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
        <a-card title="博文评论主题类型" :bordered="false">
          <p>评论类型</p>
          <div id="mountNode"></div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
        <a-card title="转发地图" :bordered="false">
          <p>转发地图展示区域</p>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
        <a-card title="评论用户地图分布(待定模块)" :bordered="false">
          <p>此区域待定</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { Pie } from '@antv/g2plot';
export default {
  name: 'TopicDetail',
  data() {
    return {
      pieData:[
          { type: '分类一', value: 27 },
          { type: '分类二', value: 25 },
          { type: '分类三', value: 18 },
          { type: '分类四', value: 15 },
          { type: '分类五', value: 10 },
          { type: '其他', value: 5 },
      ]
    }
  },
  methods:{
    mountNode(){
      console.log()
      const piePlot = new Pie('mountNode', {
        appendPadding: 10,
        data:this.pieData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
          type: 'outer',
          content: '{name} {percentage}',
        },
        interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
      });
      piePlot.render();
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  mounted() {
    this.mountNode(this.pieData)
  }
}
</script>

<style scoped lang="less">
@import "../index.less";
</style>