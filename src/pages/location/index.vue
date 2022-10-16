<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <a-row :gutter="24" >
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
        <a-card title="请选择时间和位置" bordered style="width: 250px">
          <a-cascader
              :options="options"
              :display-render="displayRender"
              expand-trigger="hover"
              placeholder="Please select"
              @change="onChange"
              style="margin-bottom: 20px"
          />
          <a-button type="primary" v-if="button" @click="onButtonClick">
           跳转到
          </a-button>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }" v-if="table">
        <a-table :columns="columns" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
          <span slot="tags" slot-scope="tags">
      <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
          <span slot="action" slot-scope="text, record">
      <a>Invite 一 {{ record.name }}</a>
      <a-divider type="vertical" />
      <a>Delete</a>
      <a-divider type="vertical" />
      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
    </span>
        </a-table>
      </a-col>

    </a-row>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
import {mapState} from 'vuex'
export default {
  name: 'DataAdd',
  data() {
    return {
      button:false,
      data,
      columns,
      table:false,
      options: [
        {
          value: '2022-07',
          label: '2022-07',
          children: [
            {
              value: 'shanghai',
              label: '江苏',
              children:[
                {
                  value: 'hangzhou',
                  label: '上海疫情',
                  children:[
                    {
                      value: 'hangzhou',
                      label: '#上海疫情防控发布会#',
                    }
                  ]
                }

              ]
            },
          ],
        },
        {
          value: '2022-08',
          label: '2022-08',
          children: [
            {
              value: 'xinjiang',
              label: '新疆',
              children:[
                {
                  value: 'hangzhou',
                  label: '俄乌冲突',
                  children:[
                    {
                      value: 'nanjing',
                      label: '#俄乌冲突对金融市场有什么影响#',
                    }

                  ]
                }

              ]
            },
          ],
        },
      ],
    }
  },
  methods: {
    onChange(value) {
      console.log(value);
      this.table=true;
      this.button=true;
    },
    displayRender({ labels }) {
      return labels[labels.length - 1];
    },
    onButtonClick(){
      this.$router.push('/incident/shanghai/detail')
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  }
}
</script>

<style scoped lang="less">
.first-container{
  display: flex;
  justify-content: center;
  align-items: center;
  background: @base-bg-color;
}
.introduce-part{
}
.ant-card-bordered{
  border: 5px solid #3eaf7c;
  border-radius: 20px;
}

</style>
