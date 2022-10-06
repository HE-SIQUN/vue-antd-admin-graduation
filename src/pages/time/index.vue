<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <a-row :gutter="24" >
      <a-col :sm="24" :md="24" :xl="8" :style="{ marginBottom: '24px', }">
        <a-card class="introduce-part" :loading="loading" title="选择您想看的话题" bordered style="width: 270px">
          <a-cascader
              :options="options"
              :show-search="{ filter }"
              placeholder="Please select"
              @change="onChange"
              size="large"
          />
        </a-card>

      </a-col>
      <a-col :sm="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
        <a-card class="introduce-part" :loading="loading" title="时间轴在这里展示" v-if="timeline" :bordered="false">
          <a-timeline mode="alternate">
            <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
            <a-timeline-item color="green">
              Solve initial network problems 2015-09-01
            </a-timeline-item>
            <a-timeline-item>
              <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
              beatae vitae dicta sunt explicabo.
            </a-timeline-item>
            <a-timeline-item color="red">
              Network problems being solved 2015-09-01
            </a-timeline-item>
            <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
            <a-timeline-item>
              <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
              Technical testing 2015-09-01
            </a-timeline-item>
          </a-timeline>
        </a-card>

      </a-col>
    </a-row>


  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Demo',
  data() {
    return {
      timeline:false,
      options: [
        {
          value: 'zhejiang',
          label: '上海疫情',
          children: [
            {
              value: 'hangzhou',
              label: '#上海市新冠肺炎疫情防控新闻发布会#',
            },
          ],
        },
        {
          value: 'jiangsu',
          label: '俄乌冲突',
          children: [
            {
              value: 'nanjing',
              label: '#俄乌冲突对金融市场有什么影响#',
            },
          ],
        },
      ],
    }
  },
  methods: {
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions);
      this.timeline=true;
    },
    filter(inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    },
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  }
}
</script>

<style scoped lang="less">
//@import "index";
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
}
.steps-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 69px;
  //text-align: center;
  //padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
.ant-card-bordered{
  border: 5px solid #3eaf7c;
  border-radius: 20px;
}

</style>
