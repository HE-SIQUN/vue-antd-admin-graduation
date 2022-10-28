<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <a-row :gutter="24" >
      <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px' }">
        <a-card class="introduce-part" :loading="loading" title="这是个什么系统?">
          <a-list :grid="{ gutter: 24, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}" :data-source="dataArray">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card :title="item.title" :body-style="bodyStyle">
                {{item.content}}
              </a-card>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px' }">
          <a-card class="introduce-part" :loading="loading" title="他应该怎么用？">
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div class="steps-content">
            <p>
              {{ steps[current].content }}
            </p>
<!--            <p>sad</p>-->

            <img class="img-design" :src="steps[current].imgUrl" alt="" style="">
          </div>
          <div class="steps-action">
            <a-button v-if="current < steps.length - 1" type="primary" @click="next">
              下一步
            </a-button>
            <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="$message.success('就这三步，您应该学会了！！')"
            >
              完成
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
              上一步
            </a-button>
            <a-button v-if="current == steps.length - 1" style="margin-left: 8px" @click="showDrawer">
              还不是很清楚？查看详情
            </a-button>

<!--            接下来是抽屉的部分-->
            <a-drawer width="640" placement="right" :closable="false" :visible="visible" @close="onClose">
              <a-icon type="close" @click="onClose" :style="closeStyle"/>
              <p :style="[pStyle, pStyle2]">
                这里是详细介绍~
              </p>
              <p :style="pStyle">
                查看具体事件对应话题、微博内容的图文操作流程：
              </p>
              <a-row :gutter="24">
                <a-col v-for="(item,index) in imgIntroduceUrl" :key="index" :span="8">
                  <img :src="item.url" alt="" style="height: 150px;width: 250px">
                </a-col>
              </a-row>
              <a-divider />
              <p :style="[pStyle, pStyle2]">
                事件关键词地理信息模块
              </p>
              <p :style="[pStyle]">
                操作示意：
              </p>
              <a-row :gutter="48">
                <a-col :span="10" :offset="2" >
                  <img src="@/assets/show/5.jpg" alt="" style="height: 150px;width: 250px">
                </a-col>
                <a-col :span="10">
                  <img src="@/assets/show/6.jpg" alt="" style="height: 150px;width: 250px">
                </a-col>
              </a-row>
              <a-divider />
              <p :style="[pStyle, pStyle2]">
                话题地理信息模块
              </p>
              <p :style="[pStyle]">
                操作示意：
              </p>
              <a-row :gutter="48">
                <a-col :span="10" :offset="2" >
                  <img src="@/assets/show/7.jpg" alt="" style="height: 150px;width: 250px">
                </a-col>
                <a-col :span="10">
                  <img src="@/assets/show/8.jpg" alt="" style="height: 150px;width: 250px">
                </a-col>
              </a-row>
              <a-divider />
            </a-drawer>
          </div>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<script>
const dataArray = [
  {
    title: '整体介绍',
    content:'时空数据微博事件分析系统是一个建立在以微博最新的IP地址信息及时间信息的一个三级分析系统。'
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
        dataArray,
        visible: false,
        closeStyle:{
          position:'absolute',
          right:'20px'
        },
        imgIntroduceUrl:[
          {
            url:require('@/assets/show/2.jpg')
          },
          {
            url:require('@/assets/show/3.jpg')
          },
          {
            url:require('@/assets/show/4.jpg')
          }
        ],
        bodyStyle:{
          backgroundColor:'#fafafa'
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
        current: 0,
        steps: [
          {
            title: '第一步',
            content: '首先找到左侧对应的关键词，点击进入',
            imgUrl: require('../../assets/show/2.jpg')
          },
          {
            title: '第二步',
            content: '如果想查看关键词下话题详情，可以点击话题链接',
            imgUrl: require('../../assets/show/3.jpg')
          },
          {
            title: '第三步',
            content: '如果想查看关键词下话题详情，可以点击微博链接',
            imgUrl: require('../../assets/show/4.jpg')
          },
        ],
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
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
    }
  }
</script>

<style scoped lang="less">
@import "index";
.first-container{
  display: flex;
  justify-content: center;
  align-items: center;
  .-close-icon{
    position: absolute !important;
    right:20px;
  }
}
.introduce-part{
  height: 450px;
}
.steps-content {
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 69px;
  //text-align: center;
  //padding-top: 80px;
  .img-design{
    height: 200px;
  }
}

.steps-action {
  margin-top: 24px;
}
</style>
