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
          <div id="space-container-total" style="min-height: 700px"></div>
        </a-col>
      </a-row>
    </a-card>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Heatmap} from "@antv/l7plot";
export default {
  name: 'Demo',
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
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
    spaceMapTotal(){
      fetch('https://gw.alipayobjects.com/os/antfincdn/OOSGL1vhp3/20200726024229.json')
          .then((response) => response.json())
          .then((data) => {
            new Heatmap('space-container-total', {
              map: {
                type: 'amap',
                style: 'dark',
                center: [107.5671666579043, 36.445038892195569],
                zoom: 2.932456779444394,
                pitch: 0,
              },
              source: {
                data: data,
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
