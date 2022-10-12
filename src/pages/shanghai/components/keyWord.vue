<template>
  <div>
      <a-row :gutter="24" >
        <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px'}">
          <a-card title="关键词话题博文热度列表" :bordered="false" :style="{height:'500px'}">
<!--            v-for="(item,index) in listDataForm" :key="index"-->
              <div class="list-item-keyword" v-for="(item,index) in listDataForm" :key="index">
                <router-link to="/incident/shanghai/detail" :style="{fontsize:'15px'}" >
                  <span>{{item.content}}</span>
                </router-link>
                <div class="progress-style">
                  <a-progress :percent="50" size="small" status="active" />
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
          <a-card title="话题关键词词云" :bordered="false" :style="{height:'500px'}">
            <div id="chart-cloud"></div>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
          <a-card title="话题时间热度" :bordered="false">
            <div id="line-container"></div>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">
          <a-card title="话题用户评析" :bordered="false">
            <p>card content</p>
          </a-card>
        </a-col>
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
import { Line ,WordCloud} from '@antv/g2plot';
export default {
  name: 'TopicDetail',
  data() {
    return {
      listData,
      current: 2,
      listDataForm:[
        {content:"#上海市新冠肺炎疫情防控新闻发布会#"},
        {content:"#上海疫情正处于快速上升阶段#"},
        {content:"#上海六院疫情#"},
        {content:"#上海疫情求助#"},
        {content:"#专家称上海这次疫情规模比武汉大#"},
        {content:"#上海交大疫情#"},
        {content:"#上海对因疫情致基本生活困难群众加强救助#"},
        {content:"#上海疫情防控工作发布会#"},
        {content:"#上海处于把疫情围住捞干阶段#"},
        {content:"#上海此次ktv疫情在沪密接2.3万人#"},
        {content:"#上海市新冠肺炎疫情防控新闻发布会#"},
        {content:"#上海市新冠肺炎疫情防控新闻发布会#"},
        {content:"#上海市新冠肺炎疫情防控新闻发布会#"},
        {content:"#上海市新冠肺炎疫情防控新闻发布会#"},
        {content:"#上海市新冠肺炎疫情防控新闻发布会#"},
  ],
      pageSize:0
    }
  },
  methods:{
    test(){
      fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
          .then((res) => res.json())
          .then((data) => {
            const line = new Line('line-container', {
              data,
              padding: 'auto',
              xField: 'Date',
              yField: 'scales',
              xAxis: {
                tickCount: 5,
              },
              slider: {
                start: 0.1,
                end: 0.5,
              },
            });

            line.render();
          })
    },
    cloud(){
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
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
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),

  },
  mounted() {
    this.test()
    this.cloud()
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
