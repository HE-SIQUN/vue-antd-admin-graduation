<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-row :gutter="24" >
    <a-col :sm="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">
      <a-card title="话题下微博详情列表" :bordered="false">
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
                            width="172"
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
<!--                        <a-list-item-meta :description="item.description">-->
<!--                          <a slot="title" :href="item.href">{{ item.title }}</a>-->
<!--                          <a-avatar slot="avatar" :src="item.avatar" />-->
<!--                        </a-list-item-meta>-->
                        <router-link to="/incident/shanghai/weiboPage">#上海市新冠肺炎疫情防控新闻发布会#</router-link>{{item.content }}
                      </a-list-item>
                    </a-list>
      </a-card>
    </a-col>
    <a-col :sm="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
      <a-card title="话题下发博人地理信息地图展示" :bordered="false" :style="{ marginBottom: '24px' }">
<!--        <p>地图实例</p>-->
        <div id="map-container" style="min-height: 500px; justify-content: center;position: relative">
        </div>
      </a-card>
      <a-card title="话题内微博情感分析" :bordered="false">
        <p>底部微博情感分析地图展示区域</p>

      </a-card>
    </a-col>
    <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">

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
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 4
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' }
      ],
    }
  },
  methods:{
    mapCreate(){
      fetch('https://gw.alipayobjects.com/os/antfincdn/xZqmXatMnc/quanguojiaotongshijianxiangyingzhishu.json')
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
    }

  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  mounted() {
    this.mapCreate()
    // this.graphCreate()
  }
}
</script>

<style scoped lang="less">
@import "../index.less";
</style>
