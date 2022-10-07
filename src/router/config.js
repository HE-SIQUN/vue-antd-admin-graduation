import TabsView from '@/layouts/tabs/TabsView'
// import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'demo',
          name: '首页介绍',
          meta: {
            icon: 'file-ppt',
            page:{
              closable: false
            }
          },
          component: () => import('@/pages/demo/Demo')
        },

        //  远期规划是做成动态路由
        {
          path: 'topic',
          name: '话题关键词',
          meta: {
            icon: 'form',
          },
          component: PageView,
          children: [
            {
              path: 'shanghai',
              name: '上海疫情',
              component: () => import('@/pages/shanghai'),
              meta: {
                page: {
                  breadcrumb: ['首页', 'Dashboard', '自定义']
                }
              },
              children:[
                {
                  path: '/topic/shanghai',
                  name: '上海疫情',
                  component: () => import('@/pages/shanghai/components/keyWord'),
                  meta: {
                    invisible: true,
                    page: {
                      title: '“上海疫情”关键词详情',
                      breadcrumb: ['首页', '话题关键词', '上海疫情'],
                      closable: true
                    }
                  }
                },
                {
                  path:'detail',
                  name:'话题详情',
                  component: () => import('@/pages/shanghai/components/topicDet'),
                  meta: {
                    invisible: true,
                  },
                },
                {
                  path:'weiboPage',
                  name:'微博详情',
                  component: () => import('@/pages/shanghai/components/weiboDet'),
                  meta: {
                    invisible: true,
                  },
                }
              ]
            },
            {
              path: 'russia',
              name: '俄乌冲突',
              component: () => import('@/pages/shanghai'),
              meta: {
                page: {
                  title: '“俄乌冲突”关键词详情',
                  breadcrumb: ['首页', '话题关键词', '俄乌冲突'],
                }
              },
              children:[
                {
                  path: '/topic/shanghai',
                  name: '上海疫情',
                  component: () => import('@/pages/shanghai/components/keyWord'),
                  meta: {
                    invisible: true,
                    page: {
                      title: '“上海疫情”详情',
                      breadcrumb: ['首页', '话题关键词', '上海疫情'],
                      closable: true
                    }
                  }
                },
                {
                  path:'detail',
                  name:'话题详情',
                  component: () => import('@/pages/shanghai/components/topicDet'),
                  meta: {
                    invisible: true,
                  },
                },
                {
                  path:'weiboPage',
                  name:'微博详情',
                  component: () => import('@/pages/shanghai/components/weiboDet'),
                  meta: {
                    invisible: true,
                  },
                }
              ]
            },
            {
              path: 'anbei',
              name: '安倍晋三',
              component: () => import('@/pages/shanghai'),
              meta: {
                page: {
                  title: '“安倍晋三”关键词详情',
                  breadcrumb: ['首页', '话题关键词', '安倍晋三'],
                }
              },
              children:[
                {
                  path: '/topic/shanghai',
                  name: '上海疫情',
                  component: () => import('@/pages/shanghai/components/keyWord'),
                  meta: {
                    invisible: true,
                    page: {
                      title: '“上海疫情”详情',
                      breadcrumb: ['首页', '话题关键词', '上海疫情'],
                      closable: true
                    }
                  }
                },
                {
                  path:'detail',
                  name:'话题详情',
                  component: () => import('@/pages/shanghai/components/topicDet'),
                  meta: {
                    invisible: true,
                  },
                },
                {
                  path:'weiboPage',
                  name:'微博详情',
                  component: () => import('@/pages/shanghai/components/weiboDet'),
                  meta: {
                    invisible: true,
                  },
                }
              ]
            }
          ]
        },
        {
          path: 'parent1',
          name: '时间选择模块',
          meta: {
            icon: 'dashboard',
          },
          component: PageView,
          children: [
            {
              path: 'demo1',
              name: '时间相关信息',
              component: () => import('@/pages/time/index'),
            }
          ]
        },
        {
          path: 'parent2',
          name: '地理位置选择模块',
          meta: {
            icon: 'form'
          },
          component: PageView,
          children: [
            {
              path: 'demo2',
              name: '地理位置相关信息',
              component: () => import('@/pages/loaction/index'),
            }
          ]
        },
        {
          path: 'parent3',
          name: '添加新的关键词',
          meta: {
            icon: 'form'
          },
          component: PageView,
          children: [
            {
              path: 'demo2',
              name: '数据添加页',
              component: () => import('@/pages/add/index'),
            }
          ]
        },
        // {
        //   path: 'exception',
        //   name: '异常页',
        //   meta: {
        //     icon: 'warning',
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: '404',
        //       name: 'Exp404',
        //       component: () => import('@/pages/exception/404')
        //     },
        //     {
        //       path: '403',
        //       name: 'Exp403',
        //       component: () => import('@/pages/exception/403')
        //     },
        //     {
        //       path: '500',
        //       name: 'Exp500',
        //       component: () => import('@/pages/exception/500')
        //     }
        //   ]
        // },
        {
          name: '验权页面',
          path: 'auth/demo',
          meta: {
            icon: 'file-ppt',
            authority: {
              permission: 'form',
              role: 'manager'
            },
            component: () => import('@/pages/demo/Demo')
          }
        }
      ]
    }
  ]
}

export default options
