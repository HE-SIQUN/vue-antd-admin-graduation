<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    hhhh
    <router-view></router-view>
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
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}
  import {mapState} from 'vuex'
  export default {
    name: 'Demo',
    i18n: require('./i18n'),
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
        ]
      }
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
      // desc() {
      //   return this.$t('pageDesc')
      // }
    }
  }
</script>

<style scoped lang="less">
@import "index";
</style>
