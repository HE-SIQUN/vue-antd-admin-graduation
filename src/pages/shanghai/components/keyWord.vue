<template>
  <div>
      <a-row :gutter="24" >
        <a-col :sm="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
          <a-card title="关键词话题博文热度列表" :bordered="false">
            <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
<!--              <div slot="footer"><b>ant design vue</b> footer part</div>-->
              <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                <template v-for="{ type, text } in actions" slot="actions">
                <span :key="type">
                  <a-icon :type="type" style="margin-right: 8px" />
                  {{ text }}
                </span>
                </template>
                <img
                    slot="extra"
                    width="272"
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
                <a-list-item-meta :description="item.description">
                  <a slot="title" :href="item.href">{{ item.title }}</a>
                  <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
                <router-link to="/topic/shanghai/detail">
                  #俄罗斯目前已经推进到基辅#<a-progress :percent="50" size="small" status="active" />
                </router-link>
                {{ item.content }}
              </a-list-item>
            </a-list>
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
</style>