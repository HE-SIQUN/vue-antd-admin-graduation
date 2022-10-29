<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <a-card>
      <a-row :gutter="24" class="first-row">
        <a-col :sm="24" :md="24" :xl="6" :style="{ marginBottom: '24px', }">
            <h2>请先选择事件查看对应的热力图</h2>
        </a-col>
        <a-col :sm="24" :md="24" :xl="6" :style="{ marginBottom: '24px', }">
          <a-select
              show-search
              placeholder="请选择事件"
              option-filter-prop="children"
              style="width: 200px"
              :filter-option="filterOption"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
              defaultValue="上海疫情"
          >
            <a-select-option value="上海疫情">
              上海疫情
            </a-select-option>
            <a-select-option value="俄乌冲突">
              俄乌冲突
            </a-select-option>
            <a-select-option value="安倍晋三">
              安倍晋三
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :sm="24" :md="24" :xl="6" :style="{ marginBottom: '24px', }">
          <h2>请再选择时间查看特定时间的热力图</h2>
        </a-col>
        <a-col :sm="24" :md="24" :xl="6" :style="{ marginBottom: '24px', }">
          <div>
            <a-date-picker
                v-model="startValue"
                :disabled-date="disabledStartDate"
                show-time
                format="YYYY-MM-DD"
                placeholder="Start"
                @openChange="handleStartOpenChange"
            />
            <a-date-picker
                v-model="endValue"
                :disabled-date="disabledEndDate"
                show-time
                format="YYYY-MM-DD"
                placeholder="End"
                :open="endOpen"
                @openChange="handleEndOpenChange"
                @ok="timeChangeFn"
            />
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="24" >
        <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px', }">
          <div id="space-container-total" style="min-height: 700px"></div>
        </a-col>
      </a-row>
    </a-card>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Heatmap} from "@antv/l7plot";
import moment from "moment";
import axios from "axios";
export default {
  name: 'Demo',
  data() {
    return {
      startValue: "2022-03-01",
      endValue: "2022-03-31",
      endOpen: false,
      data:{}
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
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log('blur');
    },
    handleFocus() {
      console.log('focus');
    },
    filterOption(input, option) {
      return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    disabledStartDate(current) {
      return (current && current > moment().endOf("day")) || (current && current > moment(this.endValue).endOf("day")||(current && current < moment(this.startValue).startOf("day")))
    },
    disabledEndDate(current) {
      return (current && current > moment().endOf("day")) || (current && current < moment(this.startValue).startOf("day")||(current && current > moment(this.endValue).endOf("day")))
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    //选择时间
    async timeChangeFn(){
      const {data}=await axios.get('./data/phnomenon.json')
      console.log(data)
      console.log(this.data)
      this.data=data
      console.log(this.data)
    },
    spaceMapTotal(){
      fetch('https://gw.alipayobjects.com/os/antfincdn/OOSGL1vhp3/20200726024229.json')
          .then((response) => response.json())
          .then((data) => {
            this.data=data
            new Heatmap('space-container-total', {
              map: {
                type: 'amap',
                style: 'dark',
                center: [107.5671666579043, 36.445038892195569],
                zoom: 2.932456779444394,
                pitch: 0,
              },
              source: {
                data: this.data,
                parser: {
                  type: 'geojson',
                },
              },
              shape: 'heatmap',
              size: {
                field: 'avg',
                value: ({ avg }) => avg / 100,
              },
              legend: {
                position: 'bottomleft',
              },
            });
          });

    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  mounted() {
    this.spaceMapTotal()
  },
  beforeDestroy() {
    this.data={}
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
