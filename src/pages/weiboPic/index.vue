<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <a-card>
      <a-row :gutter="24" >
        <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px', }">
          <span class="introduce-part">转发时序图(基于三个重要转发节点时间顺序排列)</span>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="first-row">
        <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px', }">
          <h2>请先选择微博查看对应的转发传播情况</h2>
        </a-col>
        <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px', }">
          <a-cascader
              :options="options"
              :default-value="['上海疫情', '#上海疫情发布会#']"
              @change="onChange"
          />
        </a-col>
      </a-row>
      <a-row  type="flex" justify="center">
        <a-col :span="16">
          <div id="myChart" :style="{ width: '1000px', height: '1000px'}"></div>
        </a-col>
      </a-row>
    </a-card>


  </div>
</template>
<script>
import {mapState} from "vuex";



const geoGpsMap = {
  '1': [125.8154, 44.2584],
  '2': [125.8154, 44.2584],
  '3': [117.1582, 36.8701],
  '4': [117.1582, 36.8701],
  '5': [103.9526, 30.7617],
  '6': [103.9526, 30.7617],
}
const geoCoordMap = {
  "江苏": [118.8062, 31.9208],
  '黑龙江': [127.9688, 45.368],
  '内蒙古': [110.3467, 41.4899],
  "吉林": [125.8154, 44.2584],
  '北京市': [116.4551, 40.2539],
  "辽宁": [123.1238, 42.1216],
  "河北": [114.4995, 38.1006],
  "天津": [117.4219, 39.4189],
  "山西": [112.3352, 37.9413],
  "陕西": [109.1162, 34.2004],
  "甘肃": [103.5901, 36.3043],
  "宁夏": [106.3586, 38.1775],
  "青海": [101.4038, 36.8207],
  "新疆": [87.9236, 43.5883],
  "四川": [103.9526, 30.7617],
  "重庆": [108.384366, 30.439702],
  "山东": [117.1582, 36.8701],
  "河南": [113.4668, 34.6234],
  "安徽": [117.29, 32.0581],
  "湖北": [114.3896, 30.6628],
  "浙江": [119.5313, 29.8773],
  "福建": [119.4543, 25.9222],
  "江西": [116.0046, 28.6633],
  "湖南": [113.0823, 28.2568],
  "贵州": [106.6992, 26.7682],
  "云南": [102.9199, 25.4663],
  "广东": [113.12244, 23.009505],
  "广西": [108.479, 23.1152],
  "海南": [110.3893, 19.8516],
  '上海': [121.4648, 31.2891],
};

const d1 = {
  '江苏': 10041,
  '黑龙江': 4093,
  '内蒙古': 1157,
  '吉林': 4903,
  '北京市': 2667,
  '辽宁': 8331,
  '河北': 23727,
  '天津': 681,
  '山西': 5352,
  '陕西': 38,
  '甘肃': 77,
  '宁夏': 65,
  '青海': 10,
  '新疆': 193,
  '四川': 309,
  '重庆': 77,
  '山东': 21666,
  '河南': 15717,
  '安徽': 15671,
  '湖北': 3714,
  '浙江': 3141,
  '福建': 955,
  '江西': 4978,
  '湖南': 778,
  '贵州': 33,
  '云南': 149,
  '广东': 1124,
  '广西': 125,
  '海南': 7,
  '上海': 2155,

};


const d3 = {
  '江苏': 11788,
  '黑龙江': 1944,
  '内蒙古': 2954,
  '吉林': 3482,
  '北京市': 1808,
  '辽宁': 5488,
  '河北': 27035,
  '天津': 2270,
  '山西': 13623,
  '陕西': 4221,
  '甘肃': 754,
  '宁夏': 1783,
  '青海': 91,
  '新疆': 1907,
  '四川': 4905,
  '重庆': 1420,
  '山东': 39781,
  '河南': 16154,
  '安徽': 7914,
  '湖北': 6802,
  '浙江': 5812,
  '福建': 3345,
  '江西': 4996,
  '湖南': 5627,
  '贵州': 1504,
  '云南': 2725,
  '广东': 6339,
  '广西': 1009,
  '海南': 0,
  '上海': 1988,


};


const d5 = {
  '江苏': 159,
  '黑龙江': 5,
  '内蒙古': 54,
  '吉林': 10,
  '北京市': 0,
  '辽宁': 0,
  '河北': 1679,
  '天津': 1,
  '山西': 2698,
  '陕西': 1744,
  '甘肃': 362,
  '宁夏': 429,
  '青海': 122,
  '新疆': 731,
  '四川': 3925,
  '重庆': 1480,
  '山东': 79,
  '河南': 1017,
  '安徽': 208,
  '湖北': 1209,
  '浙江': 1418,
  '福建': 1237,
  '江西': 1004,
  '湖南': 1511,
  '贵州': 345,
  '云南': 1429,
  '广东': 2242,
  '广西': 2271,
  '海南': 59,
  '上海': 8,


};

const colors = [
  ["#1DE9B6", "#1DE9B6", "#FFDB5C", "#FFDB5C", "#04B9FF", "#04B9FF"],
  ["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
  ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
  ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
];
const colorIndex = 0;
export default {
  name:'topicPic',
  data(){
    return{
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
  methods:{
    mapFly(){
      const myChartcontainer = document.getElementById("myChart")
      const resizeMyChartContainer = function () {

        myChartcontainer.style.width = 88+ "%";

        myChartcontainer.style.height = window.innerHeight * 0.7 + "px";

      };

      resizeMyChartContainer();
      var myChart = this.$echarts.init(myChartcontainer)
      const year = ["一级转发点", "二级转发点", "三级转发点"];
      const mapData = [
        [],
        [],
        [],
        [],
        [],
        [],
      ];

      /*柱子Y名称*/
      const categoryData = [];
      const barData = [];

      for (const key in geoCoordMap) {
        mapData[0].push({
          "year": '一级转发点',
          "name": key,
          "value": d1[key]/100,
          "value1": d1[key]/100,
        });
        // mapData[1].push({
        //   "year": '二级转发点',
        //   "name": key,
        //   "value": d1[key]/100,
        //   "value1": d2[key]/100,
        // });
        mapData[1].push({
          "year": '青岛',
          "name": key,
          "value": d3[key]/100,
          "value1": d3[key]/100,
        });
        // mapData[3].push({
        //   "year": '青岛',
        //   "name": key,
        //   "value": d3[key]/100,
        //   "value1": d4[key]/100,
        // });
        mapData[2].push({
          "year": '成都',
          "name": key,
          "value": d5[key]/100,
          "value1": d5[key]/100,
        });
        // mapData[5].push({
        //   "year": '成都',
        //   "name": key,
        //   "value": d5[key]/100,
        //   "value1": d6[key]/100,
        // });
      }

      for (let i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber(a,b){return a.value-b.value});
        barData.push([]);
        categoryData.push([]);
        for (let j = 0; j < mapData[i].length; j++) {
          barData[i].push(mapData[i][j].value1);
          categoryData[i].push(mapData[i][j].name);
        }
      }
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      var convertToLineData = function(data, gps) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var toCoord = geoCoordMap[dataItem.name];
          // // eslint-disable-next-line no-debugger
          // debugger;
          var fromCoord = gps; //郑州
          //  var toCoord = geoGps[Math.random()*3];
          if (fromCoord && toCoord) {
            res.push([{
              coord: fromCoord,
              value: dataItem.value
            }, {
              coord: toCoord,
            }]);
          }
        }
        return res;
      };
      let optionXyMap01 = {
        timeline: {
          data: year,
          axisType: 'category',
          autoPlay: true,
          playInterval: 3000,
          left: '10%',
          right: '10%',
          bottom: '3%',
          width: '80%',
          //  height: null,
          label: {
            normal: {
              textStyle: {
                color: '#ddd'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          symbolSize: 10,
          lineStyle: {
            color: '#555'
          },
          checkpointStyle: {
            borderColor: '#777',
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: true,
            showPrevBtn: true,
            normal: {
              color: '#666',
              borderColor: '#666'
            },
            emphasis: {
              color: '#aaa',
              borderColor: '#aaa'
            }
          },

        },
        baseOption: {

          animation: true,
          animationDuration: 1000,
          animationEasing: 'cubicInOut',
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'cubicInOut',
          grid: {
            right: '1%',
            top: '15%',
            bottom: '10%',
            width: '20%'
          },
          tooltip: {
            trigger: 'axis', // hover触发器
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
              shadowStyle: {
                color: 'rgba(150,150,150,0.1)' //hover颜色
              }
            }
          },
          geo: {
            show: true,
            map: 'china',
            roam: true,
            zoom: 1,
            center: [113.83531246, 34.0267395887],
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(147, 235, 248, 1)',
                borderWidth: 1,
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: 'rgba(128, 217, 248, 1)',
                // shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10
              },
              emphasis: {
                areaColor: '#389BB7',
                borderWidth: 0
              }
            }
          },
        },
        options: []
      };
      for (var n = 0; n < year.length; n++) {

        optionXyMap01.options.push({
          backgroundColor: '#013954',
          title:


              [{
                text: '转发时序图',
                subtext: '基于三个重要的转发节点',
                left: '5%',
                top: '5%',
                textStyle: {
                  color: '#fff',
                  fontSize: 25
                }
              },
                {
                  id: 'statistic',
                  text: year[n] ,
                  left: '75%',
                  top: '8%',
                  textStyle: {
                    color: '#fff',
                    fontSize: 25
                  }
                }
              ],
          xAxis: {
            type: 'value',
            scale: true,
            position: 'top',
            min: 0,
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: '#aaa'
              }
            },
          },
          yAxis: {
            type: 'category',
            //  name: 'TOP 20',
            nameGap: 16,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#ddd'
              }
            },
            data: categoryData[n]
          },

          series: [
            //未知作用
            {
              //文字和标志
              name: 'light',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(mapData[n]),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n]
                }
              }
            },
            //地图？
            {
              type: 'map',
              map: 'china',
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#FFFFFF',
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: mapData
            },
            //地图点的动画效果
            {
              //  name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(mapData[n].sort(function(a, b) {
                return b.value - a.value;
              }).slice(0, 20)),
              symbolSize: function(val) {
                return val[2] / 10;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n],
                  shadowBlur: 10,
                  shadowColor: colors[colorIndex][n]
                }
              },
              zlevel: 1
            },
            //地图线的动画效果
            {
              type: 'lines',
              zlevel: 2,
              effect: {
                show: true,
                period: 4, //箭头指向速度，值越小速度越快
                trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 3, //图标大小
              },
              lineStyle: {
                normal: {
                  color: colors[colorIndex][n],
                  width: 0.1, //尾迹线条宽度
                  opacity: 0.5, //尾迹线条透明度
                  curveness: .3 //尾迹线条曲直度
                }
              },
              data: convertToLineData(mapData[n], geoGpsMap[n+1])
            },
            //柱状图
            {
              zlevel: 1.5,
              type: 'bar',
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n]
                }
              },
              data:barData[n]
            }
          ]
        })
      }
      console.log(optionXyMap01)
      myChart.setOption(optionXyMap01);
    },
    onChange(value) {
      console.log(value);
    },
  },
  mounted() {
    this.mapFly()
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
}
</script>
<style scoped lang="less">
.first-row{
  text-align: center;
}

.introduce-part{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: 700;
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    text-shadow: 7px 9px 3px powderblue;
    box-shadow: 0 0 30px 5px rgba(112, 168, 192, 0.1);
    filter: blur(0.2px);
    opacity: 0.7;
    color: #3eaf7c;
  }

  //.content-part{
  //  display: flex;
  //  justify-content: center;
  //  align-items: center;
  //}

</style>