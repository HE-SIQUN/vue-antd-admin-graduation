import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
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
          name: '演示页',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/demo/Demo')
        },
        // {
        //   path: 'parent1',
        //   name: '父级路由1',
        //   meta: {
        //     icon: 'dashboard',
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: 'demo1',
        //       name: '演示页面1',
        //       component: () => import('@/pages/demo'),
        //     }
        //   ]
        // },
        {
          path: 'parent2',
          name: '父级路由2',
          meta: {
            icon: 'form'
          },
          component: PageView,
          children: [
            {
              path: 'demo2',
              name: '演示页面2',
              component: () => import('@/pages/demo/Demo'),
            }
          ]
        },
        //  远期规划是做成动态路由
        {
          path: 'topic',
          name: '话题关键词',
          meta: {
            icon: 'form'
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
                      title: '关键词详情',
                      breadcrumb: ['首页', '话题关键词', '上海疫情']
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
                }
              ]
            }
          ]
        },
        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
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
