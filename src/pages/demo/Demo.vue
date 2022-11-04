<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <div style="background-color: #e1f0e7">
      <div style="padding-top: 24px;padding-left: 24px;padding-right: 24px" v-for="(item,index) in 3" :key="index">
        <a-row :gutter="24" >
          <a-col :span="8">
            <router-link to="/shanghai">
              <a-card hoverable>
                <img
                    slot="cover"
                    alt="example"
                    src="./../../assets/show/shanghai.jpeg"
                />
                <a-card-meta title="上海疫情">
                  <template slot="description">
                    自3/19起至5/31的74天内，
                    上海全市共计阳性感染者647374人
                    平均每天感染8748人
                    最高峰单日全市新增27719人（4/13）
                    浦东新区4/13单日新增15027人，为全市之最
                    按感染人数计算，最严重的是浦东新区，共计阳性227104人
                    按人口比例计算，最严重的是黄浦区，感染率为9.26%
                    全市平均感染率为2.60%，即每约40人之中即有1人感染。
                  </template>
                </a-card-meta>
              </a-card>
            </router-link>
          </a-col>
          <a-col :span="8">
            <a-card hoverable>
              <img
                  slot="cover"
                  alt="example"
                  src="./../../assets/show/shanghai.jpeg"
              />
              <a-card-meta title="上海疫情">
                <template slot="description">
                  自3/19起至5/31的74天内，
                  上海全市共计阳性感染者647374人
                  平均每天感染8748人
                  最高峰单日全市新增27719人（4/13）
                  浦东新区4/13单日新增15027人，为全市之最
                  按感染人数计算，最严重的是浦东新区，共计阳性227104人
                  按人口比例计算，最严重的是黄浦区，感染率为9.26%
                  全市平均感染率为2.60%，即每约40人之中即有1人感染。
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card hoverable>
              <img
                  slot="cover"
                  alt="example"
                  src="./../../assets/show/shanghai.jpeg"
              />
              <a-card-meta title="安倍晋三">
                <template slot="description">
                  自3/19起至5/31的74天内，
                  上海全市共计阳性感染者647374人
                  平均每天感染8748人
                  最高峰单日全市新增27719人（4/13）
                  浦东新区4/13单日新增15027人，为全市之最
                  按感染人数计算，最严重的是浦东新区，共计阳性227104人
                  按人口比例计算，最严重的是黄浦区，感染率为9.26%
                  全市平均感染率为2.60%，即每约40人之中即有1人感染。
                </template>
              </a-card-meta>
            </a-card>
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
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50,
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

    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
    }
  }
</script>

<style scoped lang="less">
@import "index";
.first-container{
  .-close-icon{
    position: absolute !important;
    right:20px;
  }
  .pagination-use{
    display: flex;
    justify-content: center;
    padding:24px 0;
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
