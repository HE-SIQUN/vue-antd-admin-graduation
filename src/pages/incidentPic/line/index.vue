<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <a-card class="inner-container">
      <a-row :gutter="24" class="first-row">
        <a-col :sm="24" :md="24" :xl="24">
          <div class="title">事件热度走势({{title}})</div>
          <div id="line-container" :style="{minHeight:'500px'}"></div>
        </a-col>
      </a-row>
    </a-card>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Line} from "@antv/g2plot";
export default {
  name: 'Demo',
  data() {
    return {
      title:'上海疫情'
    }
  },
  watch: {

  },

  methods: {
    Line(){
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
    margin-top: 100px;
    text-align: center;
    min-height: 500px;
    //min-width: 10rem;
    .title{
      font-size: 20px;
      margin: 0 0 20px 0;
    }
  }
}
</style>
