<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <a-row :gutter="24" >
      <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px' }">
        <a-card class="introduce-part" :loading="loading" title="这是个什么系统">
          <h3 class="-inner-content">时空大数据分析系统是一个建立在以微博最新的IP地址信息及时间信息的一个三级话题系统。</h3>
          <h3 class="-inner-content">它包含了以关键词为第一级，关键词话题为第二级，同时最后以话题下微博为第三级的三级话题分析系统</h3>
          <h3 class="-inner-content">其中，包含了利用地理信息展现转发路径等形式的展示，从多角度，多层次展现地理信息下话题与人物之间的关系</h3>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="12" :style="{ marginBottom: '24px' }">
        <a-card class="introduce-part" :loading="loading" title="他应该怎么用？">
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div class="steps-content">
            {{ steps[current].content }}
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
                这里是详细介绍~（包括新关键词添加以及如何使用时间模块与地理位置模块）
              </p>
              <p :style="pStyle">
                查看具体对应话题、微博内容的图文操作流程：
                xxxx 还有对应的图
              </p>
              <a-row>
                <a-col :span="12">
                  <description-item title="Full Name" content="Lily" />
                </a-col>
                <a-col :span="12">
                  <description-item title="Account" content="AntDesign@example.com" />
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <description-item title="City" content="HangZhou" />
                </a-col>
                <a-col :span="12">
                  <description-item title="Country" content="China🇨🇳" />
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <description-item title="Birthday" content="February 2,1900" />
                </a-col>
                <a-col :span="12">
                  <description-item title="Website" content="-" />
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <description-item
                      title="Message"
                      content="Make things as simple as possible but no simpler."
                  />
                </a-col>
              </a-row>
              <a-divider />
              <p :style="pStyle">
                新关键词添加模块
              </p>
              接下来是图文教学（目前用文字占位）
              <a-row>
                <a-col :span="12">
                  <description-item title="Position" content="Programmer" />
                </a-col>
                <a-col :span="12">
                  <description-item title="Responsibilities" content="Coding" />
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <description-item title="Department" content="XTech" />
                </a-col>
<!--                <a-col :span="12">-->
<!--                  <description-item title="Supervisor">-->
<!--                    <a slot="content">Lin</a>-->
<!--                  </description-item>-->
<!--                </a-col>-->
              </a-row>
              <a-row>
                <a-col :span="24">
                  <description-item
                      title="Skills"
                      content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                  />
                </a-col>
              </a-row>
              <a-divider />
              <p :style="pStyle">
                地理与时间操作模块
              </p>
              <a-row>
                <a-col :span="12">
                  <description-item title="Email" content="ant-design-vue@example.com" />
                </a-col>
                <a-col :span="12">
                  <description-item title="Phone Number" content="+86 181 0000 0000" />
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <description-item title="Github">
                    <a slot="content" href="https://github.com/vueComponent/ant-design-vue">
                      这里是怎么操作时间与空间信息部分
                    </a>
                  </description-item>
                </a-col>
              </a-row>
            </a-drawer>
          </div>
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
        visible: false,
        closeStyle:{
          position:'absolute',
          right:'20px'
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
        },
        // loading: true, 有了数据以后再说
        current: 0,
        steps: [
          {
            title: '第一步',
            content: '首先找到左侧对应的关键词，点击进入',
          },
          {
            title: '第二步',
            content: '如果想查看关键词下话题详情，可以点击话题链接',
          },
          {
            title: '第三步',
            content: '如果想查看关键词下话题详情，可以点击微博链接',
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
</style>
