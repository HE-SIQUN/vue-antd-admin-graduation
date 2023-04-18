<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-row :gutter="24" >
    <a-col :sm="24" :md="24" :xl="10" :style="{ marginBottom: '24px' }">
      <a-card title="话题下微博详情列表" :bordered="false">
                    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="dataA">
        <!--              <div slot="footer"><b>ant design vue</b> footer part</div>-->
                      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                        <template v-for="{type,text} in item.action" slot="actions">
                        <span :key="type">
                          <a-icon :type="type" style="margin-right: 8px" />
                          {{ text }}
                        </span>
                        </template>

<!--                        <img  v-else src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">-->
<!--                        <a-list-item-meta :description="item.description">-->
<!--                          <a slot="title" :href="item.href">{{ item.title }}</a>-->
<!--                          <a-avatar slot="avatar" :src="item.avatar" />-->
<!--                        </a-list-item-meta>-->
                        <router-link to="/shanghai/weibo">#上海市新冠肺炎疫情防控新闻发布会#</router-link>{{item.content }}
                      </a-list-item>
                    </a-list>
      </a-card>
    </a-col>
    <a-col :sm="24" :md="24" :xl="14" :style="{ marginBottom: '24px' }">
      <a-card title="话题下发博人签到位置地图展示" :bordered="false" :style="{ marginBottom: '24px' }">
<!--        <p>地图实例</p>-->
        <template v-slot:extra>
          <a-button type="primary" @click="onButtonClick" >
            查看具体
          </a-button>
        </template>
        <div id="map-container" style="min-height: 500px; justify-content: center;position: relative">
        </div>
      </a-card>
      <a-card title="话题内微博情感分析" :bordered="false">
<!--        <p>底部微博情感分析地图展示区域</p>-->
        <template v-slot:extra>
          <a-button type="primary" @click="onButtonClick2" >
            查看具体
          </a-button>
        </template>
        <div ref="myChartChina" :style="{ width: '10%', height: '10%' }"></div>
      </a-card>
    </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from "axios";

const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        '上海市疫情防控核酸筛查专班负责人夏科家表示，对于“常态化检测点不接受核酸报告超过72小时”的说法，市防控办没有出台过此类要求，我们已要求各区开展自查，如有个别采样点擅自加码，必须坚决整改。另外需要说明一下，大家出入居住的本社区，不需要提供72小时内核酸阴性证明。但是需要规范佩戴口罩，配合测温，并主动扫出入口的“场所码”，出示“随申码”绿码'
  })
}
import { Dot} from '@antv/l7plot'
import {mapState} from 'vuex'
// import G6 from '@antv/g6';
export default {
  name: 'TopicDetail',
  data() {
    return {
      listData,
      dataA:[],
      pagination: {
        // onChange: page => {
        //   // console.log(page)
        // },
        pageSize: 6
      },
      actions: [
        { typea: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' }
      ],
    }
  },
  methods:{
    mapCreate(){
      fetch('./data/topic_map.json')
          .then((response) => response.json())
          .then((data) => {
            new Dot('map-container', {
              map: {
                type: 'amap',
                style: 'dark',
                center: [102.447303, 37.753574],
                zoom: 2,
                pitch: 0,
              },
              source: {
                data: data,
                parser: {
                  type: 'geojson',
                },
              },
              color: '#4cfd47',
              size: 20,
              animate: true,
              state: { active: true },
              autoFit: true,
              label: {
                field: 'cityName',
                style: {
                  fill: '#fff',
                  fontSize: 12,
                  textAnchor: 'top',
                  textOffset: [0, 20],
                },
              },
              zoom: {
                position: 'bottomright',
              },
              layerMenu: {
                position: 'topright',
              },
              tooltip: {
                items: [{ field: 'cityName', alias: '名称' }],
              },
            });
          });
    },
    drawLine() {

      const myChartContainer = this.$refs.myChartChina; //绑定div容器

      const resizeMyChartContainer = function () {

        myChartContainer.style.width = 100+ "%";

        myChartContainer.style.height = window.innerHeight * 0.5 + "px";

      };

      resizeMyChartContainer();

      var myChartChina = this.$echarts.init(myChartContainer);




      function randomData() {

        return Math.round(Math.random() * 500);

      }



      // 绘制图表




      var optionMap = {

        tooltip: {

          trigger: "item",

        },



        //左侧小导航图标

        visualMap: {

          show: true,

          x: "left",

          y: "center",

          //改变地图区域颜色
          text: ['积极情绪', '消极情绪'],
          calculable: false,
          // splitList: [
          //
          //   { start: 500, end: 600 },
          //
          //   { start: 400, end: 500 },
          //
          //   { start: 300, end: 400 },
          //
          //   { start: 200, end: 300 },
          //
          //   { start: 100, end: 200 },
          //
          //   { start: 0, end: 100 },
          //
          // ],

          color: [

            '#ff3c3c',

            "#8cbcd8",

          ],

        },
        //配置属性

        series: [

          {

            name: "数据",

            type: "map",

            mapType: "china",

            roam: false,

            label: {

              normal: {

                show: true  , //省份名称

              },

              emphasis: {

                show: false,

              },

            },

            data: [

              { name: "北京", value: "100" },

              { name: "天津", value: randomData() },

              { name: "上海", value: randomData() },

              { name: "重庆", value: randomData() },

              { name: "河北", value: randomData() },

              { name: "河南", value: randomData() },

              { name: "云南", value: randomData() },

              { name: "辽宁", value: randomData() },

              { name: "黑龙江", value: randomData() },

              { name: "湖南", value: randomData() },

              { name: "安徽", value: randomData() },

              { name: "山东", value: randomData() },

              { name: "新疆", value: randomData() },

              { name: "江苏", value: randomData() },

              { name: "浙江", value: randomData() },

              { name: "江西", value: randomData() },

              { name: "湖北", value: randomData() },

              { name: "广西", value: randomData() },

              { name: "甘肃", value: randomData() },

              { name: "山西", value: randomData() },

              { name: "内蒙古", value: randomData() },

              { name: "陕西", value: randomData() },

              { name: "吉林", value: randomData() },

              { name: "福建", value: randomData() },

              { name: "贵州", value: randomData() },

              { name: "广东", value: randomData() },

              { name: "青海", value: randomData() },

              { name: "西藏", value: randomData() },

              { name: "四川", value: randomData() },

              { name: "宁夏", value: randomData() },

              { name: "海南", value: randomData() },

              { name: "台湾", value: randomData() },

              { name: "香港", value: randomData() },

              { name: "澳门", value: randomData() },

            ], //数据

          },

        ],

      };



      myChartChina.setOption(optionMap);

      window.onresize = function () {

        resizeMyChartContainer();

        myChartChina.resize();

      };

    },
    onButtonClick(){
      this.$router.push('/topicI/distribute')
    },
    onButtonClick2(){
      this.$router.push('/topicI/lean')
    },
    async getInitial(){
      const data=await axios.get('./data/huati.json')
      // console.log(data)
      // console.log(data.data)
      this.dataA=data.data
    }

  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  mounted() {
    this.mapCreate()
    this.drawLine()
    // this.graphCreate()
  },
  created() {
    this.getInitial()
  }
}
</script>

<style scoped lang="less">
@import "../index.less";
</style>
