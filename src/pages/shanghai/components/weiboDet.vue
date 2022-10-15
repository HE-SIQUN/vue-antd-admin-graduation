<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-row :gutter="24" >
      <a-col :sm="24" :md="24" :xl="6" :style="{ marginBottom: '24px' }">
        <a-card title="博文内容" :bordered="false" :style="{ marginBottom: '24px',height:'238px'}">
          <p>上海市疫情防控核酸筛查专班负责人夏科家表示，对于“常态化检测点不接受核酸报告超过72小时”的说法，市防控办没有出台过此类要求，我们已要求各区开展自查，如有个别采样点擅自加码，必须坚决整改。另外需要说明一下，大家出入居住的本社区，不需要提供72小时内核酸阴性证明。但是需要规范佩戴口罩，配合测温，并主动扫出入口的“场所码”，出示“随申码”绿码。</p>
        </a-card>
        <a-card title="评论展示内容" :bordered="false" >
          <div
              v-infinite-scroll="handleInfiniteOnLoad"
              class="demo-infinite-container"
              :infinite-scroll-disabled="busy"
              :infinite-scroll-distance="10"
          >
            <a-list :data-source="data">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta :description="item.email">
                  <a slot="title" :href="item.href">{{ item.name.last }}</a>
                  <a-avatar
                      slot="avatar"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </a-list-item-meta>
                <div>Content</div>
              </a-list-item>
              <div v-if="loading && !busy" class="demo-loading-container">
                <a-spin />
              </div>
            </a-list>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="9" :style="{ marginBottom: '24px' }">
        <a-card title="博文评论主题类型" :bordered="false" style="height: 665px">
<!--          <p>评论类型</p>-->
          <div id="mountNode"></div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="9" :style="{ marginBottom: '24px' }">
        <a-card title="博文评论主题类型" :bordered="false" style="height: 665px">
          <!--          <p>评论类型</p>-->
          <div id="mountNode"></div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
        <a-card title="微博博文一级转发地图示意图" :bordered="false">
<!--          <p>转发地图展示区域</p>-->
          <div id="map123" style="min-height: 500px; justify-content: center;position: relative"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { Pie } from '@antv/g2plot';
import { Flow } from '@antv/l7plot';
import reqwest from 'reqwest';
import infiniteScroll from 'vue-infinite-scroll';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
export default {
  directives: { infiniteScroll },
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
      ],
      data: [],
      loading: false,
      busy: false,
    }
  },
  beforeMount() {
    this.fetchData(res => {
      this.data = res.results;
    });
  },
  methods:{
    mountNode(){
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
    },
    forwardMap(){
      fetch('https://gw.alipayobjects.com/os/antfincdn/SIybYh6xr1/arc.json')
          .then((response) => response.json())
          .then((data) => {
            new Flow('map123', {
              map: {
                type: 'amap',
                style: 'light',
                center: [116.3956, 39.9392],
                pitch: 0,
                zoom: 10,
              },
              source: {
                data: data,
                parser: {
                  type: 'json',
                  x: 'x1',
                  y: 'y1',
                  x1: 'x',
                  y1: 'y',
                },
              },
              autoFit: true,
              shape: 'arc',
              size: 1.5,
              color: {
                field: 'count',
                value: ['rgba(1,124,247,0.9)', 'rgba(230,129,28,0.9)'],
                scale: { type: 'quantize' },
              },
              style: {
                opacity: 0.8,
                segmentNumber: 60,
              },
              animate: {
                interval: 2,
                trailLength: 1,
                duration: 2,
              },
              radiation: {
                color: 'white',
                size: 30,
              },
              label: {
                visible: true,
                field: 'count',
                style: {
                  fill: '#000',
                  opacity: 0.8,
                  fontSize: 10,
                  stroke: '#fff',
                  strokeWidth: 2,
                  textAllowOverlap: false,
                  padding: [5, 5],
                  textOffset: [0, 35],
                },
              },
              zoom: {
                position: 'bottomright',
              },
              scale: {
                position: 'bottomright',
              },
              layerMenu: {
                position: 'topright',
              },
              legend: {
                position: 'bottomleft',
              },
            });
          });
    },
    fetchData(callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: res => {
          callback(res);
        },
      });
    },
    handleInfiniteOnLoad() {
      const data = this.data;
      this.loading = true;
      if (data.length > 14) {
        this.$message.warning('Infinite List loaded all');
        this.busy = true;
        this.loading = false;
        return;
      }
      this.fetchData(res => {
        this.data = data.concat(res.results);
        this.loading = false;
      });
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  mounted() {
    this.forwardMap()
    this.mountNode()

  }
}
</script>

<style scoped lang="less">
@import "../index.less";
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>