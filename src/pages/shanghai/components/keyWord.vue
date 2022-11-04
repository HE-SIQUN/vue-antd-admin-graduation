<template>
  <div>
      <a-row :gutter="24">
        <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px'}">
          <a-card title="事假中话题博文热度列表" :bordered="false" :style="{height:'500px'}">
<!--            v-for="(item,index) in listDataForm" :key="index"-->
              <div class="list-item-keyword" v-for="(item,index) in listDataForm" :key="index">
                <router-link to="shanghai/detail" :style="{fontsize:'15px'}" >
                  <span>{{item.content}}</span>
                </router-link>
                <div class="progress-style">
                  <a-progress  :percent="item.percent" size="small" status="active" v-slot:format="percent">{{percent*66500}}</a-progress>
                </div>
              </div>
            <!--分页区域-->
            <div :style="{float:'right',paddingTop:'24px'}">
              <a-pagination v-model="current" :total="listDataForm.length" show-less-items @change="changePage"/>
            </div>
          </a-card>
        </a-col>
<!--        右边-->
        <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px'}">
          <a-card title="事件词云" :bordered="false" :style="{height:'500px'}">
            <div id="chart-cloud"></div>
          </a-card>
        </a-col>
      </a-row>
    <a-row :gutter="24" >
      <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px' }">
        <a-card title="事件热度趋势" :bordered="false" >
          <div id="line-container"  style="min-height: 550px"></div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px'}">
        <a-card title="事件分布热度" :bordered="false" >
          <template v-slot:extra>
            <a-button type="primary" @click="onButtonClick" >
              查看具体
            </a-button>
          </template>

          <div id="space-container" style="min-height: 550px">
          </div>
        </a-card>

      </a-col>
<!--      <a-col :sm="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">-->
<!--        <a-card title="话题用户评析" :bordered="false">-->
<!--          <p>card content</p>-->
<!--        </a-card>-->
<!--      </a-col>-->
    </a-row>
  </div>
</template>

<script>
const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}
import {mapState} from 'vuex'
import { Area ,WordCloud} from '@antv/g2plot';
import { Heatmap } from '@antv/l7plot';
export default {
  name: 'TopicDetail',
  data() {
    return {
      listData,
      current: 1,
      listDataForm:[
        {content:"#上海市新冠肺炎疫情防控新闻发布会#",percent:100},
        {content:"#上海疫情正处于快速上升阶段#",percent:95},
        {content:"#上海六院疫情#",percent:80},
        {content:"#上海疫情求助#",percent:75},
        {content:"#专家称上海这次疫情规模比武汉大#",percent:74},
        {content:"#上海交大疫情#",percent:72},
        {content:"#上海对因疫情致基本生活困难群众加强救助#",percent:68},
        {content:"#上海疫情防控工作发布会#",percent: 65},
        {content:"#上海处于把疫情围住捞干阶段#",percent: 63},
        {content:"#上海此次ktv疫情在沪密接2.3万人#",percent: 50},
        {content:"#上海闵行3名干部因疫情防控不力被处理#",percent: 47},
        {content:"#上海通报兰溪路148号疫情相关情况#",percent: 45},
        {content:"#上海瑞金医院医生取消休假迎战疫情#",percent: 42},
        {content:"#上海个人隐瞒疫情将列入征信黑名单#",percent: 40},
        {content:"#梁万年解读上海疫情防控难点#",percent: 35},
  ],
      pageSize:0
    }
  },
  methods:{
    test(){
      fetch('./data/test.json')
          .then((res) => res.json())
          .then((data) => {
            const area = new Area('line-container', {
              data,
              xField: 'date',
              yField: 'value',
              seriesField: 'country',
              slider: {
                start: 0.1,
                end: 0.9,
              },
            });
            area.render();
          });
    },
    cloud(){
      fetch('./data/cloud.json')
          .then((res) => res.json())
          .then((data) => {
            const wordCloud = new WordCloud('chart-cloud', {
              data,
              wordField: 'name',
              weightField: 'value',
              colorField: 'value',
              imageMask: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
              wordStyle: {
                fontFamily: 'Verdana',
                fontSize: [8, 32],
              },
            });

            wordCloud.render();
          })
    },
    changePage(page){
      console.log(page)
      // if(page===1){
      //
      // }
    },
    spaceMap(){
      fetch('https://gw.alipayobjects.com/os/antfincdn/OOSGL1vhp3/20200726024229.json')
          .then((response) => response.json())
          .then((data) => {
            new Heatmap('space-container', {
              map: {
                type: 'amap',
                style: 'light',
                center: [107.5671666579043, 36.445038892195569],
                zoom: 2.932456779444394,
                pitch: 0,
              },
              source: {
                data: data,
                parser: {
                  type: 'geojson',
                },
              },
              shape: 'heatmap',
              size: {
                field: 'avg',
                value: ({ avg }) => avg / 100,
              },
              legend: {
                position: 'bottomleft',
              },
            });
          });
    },
    onButtonClick(){
      this.$router.push('/keyword/hotIPage')
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),

  },
  mounted() {
    this.test()
    this.cloud()
    this.spaceMap()
  }
}
</script>

<style scoped lang="less">
@import "../index.less";
.list-item-keyword{
  display: flex;
  justify-content: space-between;
}
.progress-style{
  width: 200px;
}
</style>
