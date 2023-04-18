<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <div style="background-color: #e1f0e7">
      <div style="padding-top: 24px;padding-left: 24px;padding-right: 24px" >
        <a-row :gutter="24" v-for="(item,index) in ImageData" :key="index" >
          <a-col style="margin-bottom: 24px" :sm="24" :md="8" :xl="8" v-for="(i,index) in item" :key="index">
            <router-link to="/shanghai">
              <a-card hoverable>
                <img
                    slot="cover"
                    alt="example"
                    :src="i.url"
                />
                <a-card-meta :title="i.title">
                  <template slot="description" style="height: 200px">
                    {{i.content}}
                  </template>
                </a-card-meta>
              </a-card>
            </router-link>
          </a-col>

        </a-row>
      </div>
      <a-pagination
          v-model="current"
          :page-size-options="pageSizeOptions"
          :total="total"
          show-size-changer
          :page-size="pageSize"
          @showSizeChange="onShowSizeChange"
          class="pagination-use"
      >
        <template slot="buildOptionText" slot-scope="props">
          <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
          <span v-if="props.value === '50'">全部</span>
        </template>
      </a-pagination>
    </div>

    <!--            接下来是抽屉的部分-->

  </div>
</template>

<script>
import axios from "axios";

const ImageData = [
  [
    {
      url: require('./../../assets/show/shanghai.jpeg'),
      title: '上海疫情',
      content: "自3/19起至5/31的74天内，上海全市共计阳性感染者647374人，平均每天感染8748人，最高峰单日全市新增27719人（4/13），浦东新区4/13单日新增15027人，为全市之最。按感染人数计算，最严重的是浦东新区，共计阳性227104人。按人口比例计算，最严重的是黄浦区，感染率为9.26%。全市平均感染率约为2.60%，即每约40人之中即有1人感染。"
    },
    {
      url: require('./../../assets/show/11.jpeg'),
      title: '俄乌冲突',
      content: "2022年2月，俄乌冲突爆发。2月21日晚，俄罗斯总统普京签署命令，承认乌克兰东部的“顿涅茨克人民共和国\"和“卢甘斯克人民共和国”。2月24日，乌克兰管理部门宣布关闭全国领空，乌克兰总统泽连斯基表示，乌克兰全境将进入战时状态。俄军开始对乌军东部部队和其他地区的军事指挥中心、机场进行炮击.同日，乌克兰宣布与俄罗斯断交。"
    },
    {
      url: require('./../../assets/show/41.jpeg'),
      title: '2022年北京冬奥会',
      content: "第24届冬季奥林匹克运动会(XXIV OlympicWinter Games)，即2022年北京冬季奥运会，是由中国举办的国际性奥林匹克赛事，于2022年2月4日开幕，2月20日闭幕。北京赛区承办所有的冰上项目和自由式滑雪大跳台，延庆赛区承办雪车、雪橇及高山滑雪项目，张家口赛区承办除雪车、雪橇、高山滑雪和自由式滑雪大跳台之外的所有雪上项目。"
    },
  ],
  [{
    url: require('./../../assets/show/31.jpeg'),
    title: '英国女王逝世',
    content: "伊丽莎白二世1926年4月出生，1952年继承王位，曾任英国女王，英联邦元首、国会最高首领，在位时间长达70年，是英国历史上在位时间最长的君主。2022年9月8日下午，英国女王伊丽莎白二世在苏格兰巴尔莫勒尔堡去世，终年96岁。伊丽莎白二世去世后，她的长子、王储查尔斯继承了王位。"
  },
    {
      url: require('./../../assets/show/21.jpeg'),
      title: '安倍晋三遇刺',
      content: "安倍晋三，日本政治家，第90代、第96-98代日本首相，是日本第1位于第二次世界大战后出生、战后最年轻且任期最长的首相。于2020年8月28日，宣布辞任首相，于9月16日正式卸任并离开首相官邸。2022年7月8日，安倍晋三在奈良县奈良市街头演讲时遭枪击，经数小时抢救后不治身亡，终年67岁。"
    },
    {
      url: require('./../../assets/show/51.jpg'),
      title: '戈尔巴乔夫去世',
      content: "当地时间2022年8月30日，俄罗斯总统事务局中央临床医院夜间发布消息，苏联最后一任领导人戈尔巴乔夫当晚因长期重病医治无效去世，终年91岁。俄罗斯总统普京对戈尔巴乔夫的去世深感哀痛,于8月31日早上给他的亲友发去唁电。葬礼结束后，戈尔巴乔夫将葬在莫斯科新圣女公墓，他的妻子赖莎也在此安息。"
    },],
  [{
    url: require('./../../assets/show/71.jpg'),
    title: '韩国首尔梨泰院踩踏事故',
    content: "当地时间2022年10月29日晚，韩国首尔梨泰院万圣节庆典活动上发生踩踏事故，事故发生时，在梨泰院的人数超10万人，踩踏事故的地点是斜坡中大约长5.7米的一段路，约18平方米的空间里约有300多人，本次事故死伤者基本处在这一空间中。截至11月1日，已有156人在这次事故中遇难，其中女性101名、男性55名，有4名中国公民不幸遇难。"
  },
    {
      url: require('./../../assets/show/81.jpg'),
      title: '猴痘',
      content: "猴痘是一种病毒性人畜共患病，发生于非洲中西部雨林中的猴类，也可感染其他动物，偶可使人类受感染。临床表现类似天花，但病情较轻。2022年猴痘疫情最先在英国当地时间2022年5月7日被发现，当地时间5月20日，欧洲确诊和疑似猴痘病例超过100例。当地时间5月29日，世卫组织发布疾病信息通报，将猴痘的全球公共卫生风险评估为中等。"
    },
    {
      url: require('./../../assets/show/61.jpeg'),
      title: '法国大选',
      content: "2022年法国总统选举共有12名候选人，包括法国现任总统、共和国前进党候选人马克龙，法国极右翼国民联盟候选人勒庞,巴黎大区议会主席、共和党候选人佩克雷丝，巴黎市现任市长、左翼社会党候选人伊达尔戈,法国极右翼“重新征服党”候选人泽穆尔等，当地时间2022年4月24日20时，法国总统大选第二轮投票结束，马克龙赢得选举，成功连任。"
    }],
]

const dataArray = [
  {
    title: '整体介绍',
    content: '时空数据微博事件分析系统是一个建立在以微博最新的IP地址信息及时间信息的一个三级分析系统。'
  },
  {
    title: '具体模块介绍',
    content: '它包含了事件下的三级分层总览、事件整体地理信息可视化、话题地理信息可视化、博文地理信息可视化、时空信息综合选择模块共五大模块'
  },
];

import {mapState} from 'vuex'

export default {
  name: 'Demo',

  data() {
    return {
      ImageData,
      testUrl: "",
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      total: 50,
      dataArray,
      visible: false,
      closeStyle: {
        position: 'absolute',
        right: '20px'
      },
      imgIntroduceUrl: [
        {
          url: require('@/assets/show/2.jpg')
        },
        {
          url: require('@/assets/show/3.jpg')
        },
        {
          url: require('@/assets/show/4.jpg')
        }
      ],
      bodyStyle: {
        backgroundColor: '#fafafa'
      },
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px',
      },
      pStyle2: {
        marginBottom: '24px',
        fontSize: '24px',
      },
      // loading: true, 有了数据以后再说
    }
  },
  methods: {
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
    },
    async requireMethod() {
      const {data} = await axios.get("./data/imgContent.json")

      this.testUrl = data.url
      console.log(this.testUrl)
      console.log(data.url)
      console.log(this.testUrl)
    }

  },
  created() {
    this.requireMethod()
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  }
}
</script>

<style scoped lang="less">
@import "index";

.first-container {
  .-close-icon {
    position: absolute !important;
    right: 20px;
  }

  .pagination-use {
    display: flex;
    justify-content: center;
    padding-bottom: 24px;
  }
}

.introduce-part {
  height: 450px;
}

.steps-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 69px;
  //text-align: center;
  //padding-top: 80px;
  .img-design {
    height: 200px;
  }
}

.steps-action {
  margin-top: 24px;
}
</style>
