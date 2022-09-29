<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-row :gutter="24" >
    <a-col :sm="24" :md="24" :xl="8" :style="{ marginBottom: '24px' }">
      <a-card title="话题下微博详情列表" :bordered="false">
                    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
        <!--              <div slot="footer"><b>ant design vue</b> footer part</div>-->
                      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                        <template v-for="{ type, text } in actions" slot="actions">
                        <span :key="type">
                          <a-icon :type="type" style="margin-right: 8px" />
                          {{ text }}
                        </span>
                        </template>
                        <img
                            slot="extra"
                            width="172"
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
<!--                        <a-list-item-meta :description="item.description">-->
<!--                          <a slot="title" :href="item.href">{{ item.title }}</a>-->
<!--                          <a-avatar slot="avatar" :src="item.avatar" />-->
<!--                        </a-list-item-meta>-->
                        <router-link to="/topic/shanghai/weiboPage">#上海市新冠肺炎疫情防控新闻发布会#</router-link>{{ item.content }}
                      </a-list-item>
                    </a-list>
      </a-card>
    </a-col>
    <a-col :sm="24" :md="24" :xl="16" :style="{ marginBottom: '24px' }">
      <a-card title="话题下发博人地理信息地图展示" :bordered="false">
<!--        <p>地图实例</p>-->
        <div id="map-container" style="min-height: 500px; justify-content: center;position: relative">
        </div>
      </a-card>
    </a-col>
    <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
      <a-card title="话题内知识图谱" :bordered="false">
        <p>底部图谱的展示区域</p>
        <div id="graph-container" style="min-height: 600px; justify-content: center;position: relative"></div>
      </a-card>
    </a-col>
    </a-row>
  </div>
</template>

<script>
const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        '上海市疫情防控核酸筛查专班负责人夏科家表示，对于“常态化检测点不接受核酸报告超过72小时”的说法，市防控办没有出台过此类要求，我们已要求各区开展自查，如有个别采样点擅自加码，必须坚决整改。另外需要说明一下，大家出入居住的本社区，不需要提供72小时内核酸阴性证明。但是需要规范佩戴口罩，配合测温，并主动扫出入口的“场所码”，出示“随申码”绿码'
  })
}
import { Dot} from '@antv/l7plot'
import {mapState} from 'vuex'
import G6 from '@antv/g6';
import insertCss from 'insert-css';
export default {
  name: 'TopicDetail',
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 3
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' }
      ],
    }
  },
  methods:{
    mapCreate(){
      fetch('https://gw.alipayobjects.com/os/antfincdn/xZqmXatMnc/quanguojiaotongshijianxiangyingzhishu.json')
          .then((response) => response.json())
          .then((data) => {
            new Dot('map-container', {
              map: {
                type: 'amap',
                style: 'dark',
                center: [102.447303, 37.753574],
                zoom: 2,
                pitch: 0,
              },
              source: {
                data: data,
                parser: {
                  type: 'geojson',
                },
              },
              color: '#4cfd47',
              size: 20,
              animate: true,
              state: { active: true },
              autoFit: true,
              label: {
                field: 'cityName',
                style: {
                  fill: '#fff',
                  fontSize: 12,
                  textAnchor: 'top',
                  textOffset: [0, 20],
                },
              },
              zoom: {
                position: 'bottomright',
              },
              layerMenu: {
                position: 'topright',
              },
              tooltip: {
                items: [{ field: 'cityName', alias: '名称' }],
              },
            });
          });
    },
    graphCreate(){
      insertCss(`
    .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);

      /**
       * 该示例演示 Fruchterman 布局算法的聚类效果，以及点击交互进行聚类的聚合和扩散效果
       * by 十吾
       */
      const descriptionDiv = document.createElement('div');
      descriptionDiv.innerHTML = 'Reading data & Doing layout......';
      const container = document.getElementById('graph-container');
      container.appendChild(descriptionDiv);
      const width = container.scrollWidth;
      const height = container.scrollHeight - 30;

      const colors = ['#f5222d', '#faad14', '#a0d911', '#13c2c2', '#1890ff', '#b37feb', '#eb2f96'];
      const beginColor = '#5b8c00'; // green
      const endColor = '#ff4d4f'; // red

      fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
          .then((res) => res.json())
          .then((data) => {
            const nodes = data.nodes;
            const edges = data.edges;

            const nodeMap = new Map();
            const clusterMap = new Map();
            let cidx = 0;
            nodes.forEach(function (n) {
              nodeMap.set(n.id, n);
              let region = n.region.split(' ');
              if (n.region === 'East Asia') region = n.region;
              else region = region[region.length - 1];

              if (clusterMap.get(region) === undefined) {
                clusterMap.set(region, cidx);
                cidx++;
              }
              const clusterId = clusterMap.get(region);
              const color = colors[clusterId % colors.length];
              n.style = {
                color,
                fill: color,
                stroke: '#666',
                lineWidth: 0.6,
              };
              n.cluster = clusterId;
              n.importValue = 0;
              n.exportValue = 0;
            });
            // map the value of
            edges.forEach(function (e) {
              if (e.value === '') e.value = 0;
              const v = parseFloat(e.value);
              nodeMap.get(e.source).exportValue += v;
              nodeMap.get(e.target).importValue += v;
            });
            mapValueToProp(nodes, 'exportValue', 'size', [2, 12]);
            const graph = new G6.Graph({
              container: 'container',
              width,
              height,
              layout: {
                type: 'fruchterman',
                maxIteration: 8000,
                gravity: 10,
                clustering: true,
                clusterGravity: 30,
                workerEnabled: true,
              },
              fitView: true,
              linkCenter: true,
              defaultNode: {
                type: 'circle',
                size: 5,
              },
              defaultEdge: {
                type: 'quadratic',
              },
              modes: {
                default: [
                  'drag-node',
                  'drag-canvas',
                  {
                    type: 'tooltip',
                    formatText: function formatText(model) {
                      let name = '';
                      let countries = '';
                      if (model.name) name = model.name + '<br/>';
                      if (model.countries) countries = '<br/>Number of Countries: ' + model.countries;
                      const text = `${name} Export Value: ${model.exportValue}(1000USD)<br/>Region: ${model.region}<br/>Cluster: ${model.cluster} ${countries}`;
                      return text;
                    },

                    shouldUpdate: function shouldUpdate() {
                      return true;
                    },
                  },
                ],
              },
            });

            graph.on('afterlayout', function () {
              descriptionDiv.innerHTML = 'Done!';
            });

            graph.data(data);
            graph.render();

            const edgeItems = graph.getEdges();
            edgeItems.forEach(function (e) {
              const lineWidth = 0.4;
              const strokeOpacity = 0.2;
              let stroke = 'l(0) 0:' + beginColor + ' 1:' + endColor;
              const sourceModel = e.getSource().getModel();
              const targetModel = e.getTarget().getModel();
              if (sourceModel.x > targetModel.x) {
                stroke = 'l(0) 0:' + endColor + ' 1:' + beginColor;
              }
              e.update({
                style: {
                  lineWidth,
                  strokeOpacity,
                  stroke,
                },
              });
            });
            graph.paint();

            graph.on('node:click', function (e) {
              const targetItem = e.item;
              const model = targetItem.getModel();
              const graphEdges = graph.getEdges();
              const graphNodes = graph.getNodes();
              // click on the cluster node
              if (model.id.substr(0, 7) === 'cluster') {
                graphNodes.forEach(function (gn) {
                  const gnModel = gn.getModel();
                  // show the common nodes
                  if (gnModel.cluster === model.cluster && gnModel.id.substr(0, 7) !== 'cluster') {
                    gn.show();
                  }
                  // remove the cluster nodes
                  if (gnModel.id === model.id) graph.removeItem(gn);
                });

                graphEdges.forEach(function (ge) {
                  const sourceModel = ge.get('sourceNode').getModel();
                  const targetModel = ge.get('targetNode').getModel();
                  // show the common edges
                  if (
                      (sourceModel.cluster === model.cluster && sourceModel.id.substr(0, 7) !== 'cluster') ||
                      (targetModel.cluster === model.cluster && targetModel.id.substr(0, 7) !== 'cluster')
                  ) {
                    ge.show();
                    // add the edges to other cluster nodes
                    if (!ge.get('sourceNode').get('visible') && sourceModel.cluster !== model.cluster) {
                      let c1 = beginColor,
                          c2 = endColor;
                      if (model.x > targetModel.x) {
                        c1 = endColor;
                        c2 = beginColor;
                      }
                      graph.addItem('edge', {
                        source: 'cluster' + sourceModel.cluster,
                        target: targetModel.id,
                        id: 'cluster-edge-' + ge.id,
                        style: {
                          stroke: 'l(0) 0:' + c1 + ' 1:' + c2,
                          lineWidth: 0.4,
                          strokeOpacity: 0.2,
                        },
                      });
                    } else if (
                        ge.get('targetNode').get('visible') &&
                        targetModel.cluster !== model.cluster
                    ) {
                      let _c = beginColor,
                          _c2 = endColor;
                      if (sourceModel.x > model.x) {
                        _c = endColor;
                        _c2 = beginColor;
                      }
                      graph.addItem('edge', {
                        source: sourceModel.id,
                        target: 'cluster' + targetModel.id,
                        id: 'cluster-edge-' + ge.id,
                        style: {
                          stroke: 'l(0) 0:' + _c + ' 1:' + _c2,
                          lineWidth: 0.4,
                          strokeOpacity: 0.2,
                        },
                      });
                    }
                    // hide the edges to the common nodes in other clusters
                    if (!ge.get('sourceNode').get('visible') || !ge.get('targetNode').get('visible')) {
                      ge.hide();
                    }
                  }
                  // remove the cluster edges
                  if (sourceModel.id === model.id || targetModel.id === model.id) {
                    graph.removeItem(ge);
                  }
                });
              } else {
                // click on the common node, cllapse them
                // calculate the cluster center
                const center = {
                  x: 0,
                  y: 0,
                  count: 0,
                  exportValue: 0,
                };
                nodes.forEach(function (n) {
                  if (n.cluster === model.cluster) {
                    center.x += n.x;
                    center.y += n.y;
                    center.count++;
                    center.exportValue += n.exportValue;
                  }
                });
                center.x /= center.count;
                center.y /= center.count;
                // add cluster node on the center
                const size = center.count * 1;
                const clusterNodeId = 'cluster' + model.cluster;
                const color = colors[model.cluster % colors.length];
                const regionStrs = model.region.split(' ');
                let region = regionStrs[regionStrs.length - 1];
                if (model.region === 'East Asia') region = model.region;
                let labelPosition = 'center';
                if (region.length > size) labelPosition = 'left';
                graph.addItem('node', {
                  x: center.x,
                  y: center.y,
                  id: clusterNodeId,
                  cluster: model.cluster,
                  region,
                  countries: center.count,
                  exportValue: center.exportValue,
                  style: {
                    color,
                    fill: color,
                    stroke: '#666',
                    lineWidth: 0.6,
                  },
                  size,
                  label: region,
                  labelCfg: {
                    style: {
                      fontSize: 8.5,
                    },
                    position: labelPosition,
                  },
                });

                // add edges about the cluster
                graphEdges.forEach(function (ge) {
                  const sourceModel = ge.get('sourceNode').getModel();
                  const targetModel = ge.get('targetNode').getModel();
                  if (!ge.get('sourceNode').get('visible') || !ge.get('targetNode').get('visible')) return;
                  if (sourceModel.cluster === model.cluster && targetModel.cluster !== model.cluster) {
                    let c1 = beginColor,
                        c2 = endColor;
                    if (center.x > targetModel.x) {
                      c1 = endColor;
                      c2 = beginColor;
                    }
                    graph.addItem('edge', {
                      source: clusterNodeId,
                      target: targetModel.id,
                      id: 'cluster-edge-' + ge.id,
                      style: {
                        stroke: 'l(0) 0:' + c1 + ' 1:' + c2,
                        lineWidth: 0.4,
                        strokeOpacity: 0.2,
                      },
                    });
                  } else if (
                      targetModel.cluster === model.cluster &&
                      sourceModel.cluster !== model.cluster
                  ) {
                    let _c3 = beginColor,
                        _c4 = endColor;
                    if (sourceModel.x > center.x) {
                      _c3 = endColor;
                      _c4 = beginColor;
                    }
                    graph.addItem('edge', {
                      source: sourceModel.id,
                      target: clusterNodeId,
                      id: 'cluster-edge-' + ge.id,
                      style: {
                        stroke: 'l(0) 0:' + _c3 + ' 1:' + _c4,
                        lineWidth: 0.4,
                        strokeOpacity: 0.2,
                      },
                    });
                  }
                });

                // hide the common nodes in the cluster
                graphNodes.forEach(function (gn) {
                  if (
                      gn.getModel().cluster === model.cluster &&
                      gn.getModel().id.substr(0, 7) !== 'cluster'
                  )
                    gn.hide();
                });
                // hide the common edges about cluster
                graphEdges.forEach(function (ge) {
                  if (!ge.get('sourceNode').get('visible') || !ge.get('targetNode').get('visible'))
                    ge.hide();
                });
              }
            });
            if (typeof window !== 'undefined')
              window.onresize = () => {
                if (!graph || graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                graph.changeSize(container.scrollWidth, container.scrollHeight);
              };
          });

      function mapValueToProp(items, valueName, propName, range) {
        const valueRange = [9999999999, -9999999999];
        items.forEach(function (n) {
          if (n[valueName] > valueRange[1]) valueRange[1] = n[valueName];
          if (n[valueName] < valueRange[0]) valueRange[0] = n[valueName];
        });
        const valueLength = valueRange[1] - valueRange[0];
        const rLength = range[1] - range[0];
        const propNameStrs = propName.split('.');
        if (propNameStrs[0] === 'style' && propNameStrs.length > 1) {
          items.forEach(function (n) {
            if (n.style === undefined) n.style = {};
            n.style[propNameStrs[1]] =
                (rLength * (n[valueName] - valueRange[0])) / valueLength + range[0];
          });
        } else {
          items.forEach(function (n) {
            n[propNameStrs[0]] = (rLength * (n[valueName] - valueRange[0])) / valueLength + range[0];
          });
        }
      }
    }

  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  },
  mounted() {
    this.mapCreate()
    this.graphCreate()
  }
}
</script>

<style scoped lang="less">
@import "../index.less";
</style>