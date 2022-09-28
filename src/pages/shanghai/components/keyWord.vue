<template>
  <div>
      <a-row :gutter="24" >
        <a-col :sm="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
          <a-card title="关键词话题博文热度列表" :bordered="false">
<!--            v-for="(item,index) in listDataForm" :key="index"-->
              <div class="list-item-keyword" >
                <router-link to="/topic/shanghai/detail" :style="{fontsize:'15px'}" >
                  #上海市新冠肺炎疫情防控新闻发布会#
                </router-link>
                <a-progress :percent="50" size="small" status="active" />
              </div>
            <div class="list-item-keyword" >
              <router-link to="/topic/shanghai/detail" :style="{fontsize:'15px'}" >
                #上海处于把疫情围住捞干阶段#
              </router-link>
              <a-progress :percent="50" size="small" status="active" />
            </div>
            <div class="list-item-keyword" >
              <router-link to="/topic/shanghai/detail" :style="{fontsize:'15px'}" >
                #上海疫情正处于快速上升阶段#
              </router-link>
              <a-progress :percent="50" size="small" status="active" />
            </div>
            <div class="list-item-keyword" >
              <router-link to="/topic/shanghai/detail" :style="{fontsize:'15px'}" >
                #上海六院疫情#
              </router-link>
              <a-progress :percent="50" size="small" status="active" />
            </div>
            <div class="list-item-keyword" >
              <router-link to="/topic/shanghai/detail" :style="{fontsize:'15px'}" >
                #上海疫情求助#
              </router-link>
              <a-progress :percent="50" size="small" status="active" />
            </div>


          </a-card>
        </a-col>
        <a-col :sm="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">
          <a-card title="话题关键词词云" :bordered="false">
            <p>右侧第一部分</p>
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
import { Line } from '@antv/g2plot';
export default {
  name: 'TopicDetail',
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 3
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' }
      ],
      listDataForm:[
        "#上海市新冠肺炎疫情防控新闻发布会#",
        "#上海疫情正处于快速上升阶段#",
        "#上海六院疫情#",
        "#上海疫情求助#",
        "#专家称上海这次疫情规模比武汉大#",
        "#上海交大疫情#",
        "#上海对因疫情致基本生活困难群众加强救助#",
        "#上海疫情防控工作发布会#",
        "#上海处于把疫情围住捞干阶段#",
        "#上海此次ktv疫情在沪密接2.3万人#",
  ]
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
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),

  },
  mounted() {
    this.test()
  }
}
</script>

<style scoped lang="less">
@import "../index.less";
.list-item-keyword{
  display: flex;
  justify-content: space-between;
}
</style>