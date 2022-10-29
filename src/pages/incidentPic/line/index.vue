<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <a-card class="inner-container">
      <a-row :gutter="24" class="first-row">
        <a-col :sm="24" :md="24" :xl="24">
          <h1 class="title">事件热度走势({{title}})</h1>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="second-row">
        <a-col :sm="24" :md="24" :xl="12">
          <h2>请选择相关事件的热度趋势</h2>
        </a-col>
        <a-col :sm="24" :md="24" :xl="12">
          <a-cascader
              :options="options"
              :default-value="['上海疫情']"
              @change="onChange"
          />
        </a-col>
      </a-row>
      <a-row :gutter="24" class="third-row">
        <a-col :sm="24" :md="24" :xl="24">
          <div id="line-container" :style="{minHeight:'500px'}"></div>
        </a-col>
      </a-row>
    </a-card>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Area} from "@antv/g2plot";
import axios from "axios";
export default {
  name: 'Demo',
  data() {
    return {
      title:'上海疫情',
      chart:null,
      data:{},
      options: [
        {
          value: '上海疫情',
          label: '上海疫情',
        },
        {
          value: '俄乌冲突',
          label: '俄乌冲突',
        },
      ],
    }
  },
  watch: {
    data(){
      this.$nextTick(()=>{
        this.changeCharts()
      })
    }
  },

  methods: {
    changeCharts(){
      this.chart.changeData(this.data)
    },
    Line(){
      fetch('./data/test.json')
          .then((res) => res.json())
          .then((data) => {
            this.chart = new Area('line-container', {
              data:data,
              xField: 'date',
              yField: 'value',
              seriesField: 'country',
              slider: {
                start: 0.1,
                end: 0.9,
              },
            });
            this.chart.render();
          });
    },
    async onChange(value) {
      this.title=value.toString()
      if(this.title==="上海疫情"){
        const {data}=await axios.get('./data/test.json')
        this.data=data
      }else{
        const {data}=await axios.get('./data/line.json')
        this.data=data
      }


    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  mounted() {
    this.Line()
  }
}
</script>

<style scoped lang="less">
.first-container{
  position: relative;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  .inner-container{
    margin-top: 60px;
    text-align: center;
    min-height: 500px;
    //min-width: 10rem;
    .title{
      font-size: 30px;
      letter-spacing: 3px;
      font-weight: 700;
      color:#3eaf7c;
      margin: 0 0 20px 0;
    }
  }
}
</style>
