<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <a-card>
      <a-row :gutter="24" class="first-row">
        <a-col :sm="24" :md="24" :xl="6" :style="{ marginBottom: '24px', }">
          <h2>请先选择话题查看对应的情感分析分布</h2>
        </a-col>
        <a-col :sm="24" :md="24" :xl="6" :style="{ marginBottom: '24px', }">
          <a-cascader
              :options="options"
              :default-value="['上海疫情', '#上海疫情发布会#']"
              @change="onChange"
          />
        </a-col>
        <a-col :sm="24" :md="24" :xl="6" :style="{ marginBottom: '24px', }">
          <h2>请再选择时间查看特定时间的情感分析</h2>
        </a-col>
        <a-col :sm="24" :md="24" :xl="6" :style="{ marginBottom: '24px', }">
          <div>
            <a-date-picker
                v-model="startValue"
                :disabled-date="disabledStartDate"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Start"
                @openChange="handleStartOpenChange"
            />
            <a-date-picker
                v-model="endValue"
                :disabled-date="disabledEndDate"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="End"
                :open="endOpen"
                @openChange="handleEndOpenChange"
            />
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="24" >
        <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px', }">
          <div id="myChartChina" :style="{ width: '10%', height: '10%' }"></div>
        </a-col>
      </a-row>
    </a-card>

  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Demo',
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
      options: [
        {
          value: '上海疫情',
          label: '上海疫情',
          children: [
            {
              value: '#上海疫情发布会#',
              label: '#上海疫情发布会#',
            },
          ],
        },
        {
          value: '俄乌冲突',
          label: '俄乌冲突',
          children: [
            {
              value: '#俄乌冲突已进行到第三天#',
              label: '#俄乌冲突已进行到第三天#',
            },
          ],
        },
      ]
    }
  },
  watch: {
    startValue(val) {
      console.log('startValue', val);
    },
    endValue(val) {
      console.log('endValue', val);
    },
  },

  methods: {
    onChange(value) {
      console.log(value);
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    PhenomenonMap() {

      const myChartContainer = document.getElementById("myChartChina"); //绑定div容器

      const resizeMyChartContainer = function () {

        myChartContainer.style.width = 100+ "%";

        myChartContainer.style.height = window.innerHeight * 0.6+ "px";

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
          type:'continuous',
          show: true,
          x: "left",
          left:'25%',
          top:'70%',
          //改变地图区域颜色
          text: ['积极情绪', '消极情绪'],
          calculable: true,
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

    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  mounted() {
    this.PhenomenonMap()
  }
}
</script>

<style scoped lang="less">
.first-container{
  .first-row{
    text-align: center;
    //display: flex;
    //justify-content: center;
    //text-align: center;
  }
}
</style>
