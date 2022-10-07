<template>
  <div class="first-container" :style="`min-height: ${pageMinHeight}px`">
    <div class="inner-story">
      <h1>这里是新的话题关键词添加模块,</h1><br>
      <h1>但是还需要再设计一下</h1>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'DataAdd',
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  }
}
</script>

<style scoped lang="less">
.first-container{
  //justify-content: center;
  //align-items: center;
  background: @base-bg-color;

}
.inner-story{
  vertical-align: middle;
  text-align: center;
}
.introduce-part{
}


.steps-action {
  margin-top: 24px;
}
h1{
  font-size: 48px;
}
</style>
