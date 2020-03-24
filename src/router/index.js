import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [

  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {
    path: '/mmg',
    component: Layout,
    redirect: '/mmg/fixedAsset',
    name: 'mmg',
    meta: {title: '物资管理', icon: 'product'},
    children: [{
      path: 'fixedAsset',
      name: 'fixedAsset',
      component: () => import('@/views/mmg/asset/index'),
      meta: {title: '固定资产'}
    },
      {
        path: 'addAsset',
        name: 'addAsset',
        component: () => import('@/views/mmg/asset/add'),
        meta: {title: '添加'},
        hidden: true
      },
      {
        path: 'ViewAsset',
        name: 'ViewAsset',
        component: () => import('@/views/mmg/asset/view'),
        meta: {title: '查看'},
        hidden: true
      },
      {
        path: 'updateAsset',
        name: 'updateAsset',
        component: () => import('@/views/mmg/asset/update'),
        meta: {title: '编辑'},
        hidden: true
      },
      {
        path: 'QueryAsset',
        name: 'QueryAsset',
        component: () => import('@/views/mmg/asset/query'),
        meta: {title: '物资查询'}
      },
      {
        path: 'putAsset',
        name: 'putAsset',
        component: () => import('@/views/mmg/asset/put'),
        meta: {title: '物资入库'}
      },
      {
        path: 'outAsset',
        name: 'outAsset',
        component: () => import('@/views/mmg/asset/out'),
        meta: {title: '物资出库'}
      },
      {
        path: 'inventoryManagement',
        name: 'inventoryManagement',
        component: () => import('@/views/mmg/inventory_log/inventory_management'),
        meta: {title: '盘点管理'}
      },
      {
        path: 'warehouseLog',
        name: 'warehouseLog',
        component: () => import('@/views/mmg/inventory_log/warehouse_log'),
        meta: {title: '仓库日志'},
      }
    ]
  },
  {
    path: '/fmg',
    component: Layout,
    redirect: '/fmg/collection',
    name: 'drug',
    meta: {title: '财务管理', icon: 'sms-coupon'},
    children: [{
      path: 'collection',
      name: 'collection',
      component: () => import('@/views/fmg/collection'),
      meta: {title: '收款管理'}
    }, {
      path: 'refund',
      name: 'refund',
      component: () => import('@/views/fmg/refund'),
      meta: {title: '退款管理'}
    }, {
      path: 'accountMG',
      name: 'accountMG',
      component: () => import('@/views/fmg/accountMG'),
      meta: {title: '账户管理'}
    }, {
      path: 'accountMS',
      name: 'accountMS',
      component: () => import('@/views/fmg/accountMS'),
      meta: {title: '账户信息'},
      hidden: true
    }]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '物资管理（备份）', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '固定资产'}
    },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: '添加'},
        hidden: true
      },
      {
        path: 'ProductView',
        name: 'ProductView',
        component: () => import('@/views/pms/product/view'),
        meta: {title: '查看'},
        hidden: true
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '编辑'},
        hidden: true
      },
      {
        path: 'productQuery',
        name: 'productQuery',
        component: () => import('@/views/pms/product/query'),
        meta: {title: '物资查询'}
      },
      {
        path: 'productPut',
        name: 'productPut',
        component: () => import('@/views/pms/product/put'),
        meta: {title: '物资入库'}
      },
      {
        path: 'productOut',
        name: 'productOut',
        component: () => import('@/views/pms/product/out'),
        meta: {title: '物资出库'}
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {title: '盘点管理'}
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {title: '仓库日志'},
      }
    ]
  },
  {
    path: '/drug',
    component: Layout,
    redirect: '/drug/drugMessage',
    name: 'drug',
    meta: {title: '药品管理', icon: 'form'},
    children: [{
        path: 'drugMessage',
        name: 'drugMessage',
        component: () => import('@/views/drug/dm/index'),
        meta: {title: '药品信息'},
      },
      {
        path: 'drugCapturePut',
        name: 'drugCapturePut',
        component: () => import('@/views/drug/dcp/index'),
        meta: {title: '药品缴存'},
      },
      {
        path: 'AddDrug',
        name: 'AddDrug',
        component: () => import('@/views/drug/dm/Add'),
        meta: {title: '新增药品信息'},
        hidden: true
      },
      {
        path: 'UpdateDrug',
        name: 'UpdateDrug',
        component: () => import('@/views/drug/dm/Update'),
        meta: {title: '编辑药品信息'},
        hidden: true
      },
      {
        path: 'ViewDrug',
        name: 'ViewDrug',
        component: () => import('@/views/drug/dm/View'),
        meta: {title: '查看药品信息'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

