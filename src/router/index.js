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
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '会员管理', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: '会员档案'}
        //meta: {title: '会员档案', icon: 'product-list'}
      },
      {
        path: 'in',
        name: 'in',
        component: () => import('@/views/oms/order/in'),
        meta: {title: '新增会员'},
        hidden:true
        //meta: {title: '新建文件', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '详细信息'},
        hidden:true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden:true
      },

      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '预约占床'}
        // meta: {title: '预约占床', icon: 'product-brand'}
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/oms/product/add'),
        meta: {title: '入住登记'}
        // meta: {title: '入住登记', icon: 'product-add'}
      },
      {
        path: 'addDetail',
        name: 'addDetail',
        component: () => import('@/views/oms/product/update'),
        meta: {title: '登记信息'},
        hidden:true,
      },
      {
        path: 'viewDetail',
        name: 'viewDetail',
        component: () => import('@/views/oms/product/index'),
        meta: {title: '入住详细信息'},
        hidden:true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: '退住登记'}
        // meta: {title: '退住登记', icon: 'product-add'}
      },
      {
        path: 'out',
        name: 'out',
        component: () => import('@/views/oms/order/change'),
        meta: {title: '业务变更'}
        // meta: {title: '业务变更', icon: 'product-brand'}
      },
      {
        path: 'death',
        name: 'death',
        component: () => import('@/views/oms/order/death'),
        meta: {title: '死亡登记'}
        // meta: {title: '死亡登记', icon: 'order-return-reason'}
      },
      {
        path: 'deathDetail',
        name: 'deathDetail',
        component: () => import('@/views/oms/order/deathDetail'),
        meta: {title: '死亡登记详情'},
        hidden:true

      },
      {
        path: 'changeDetail',
        name: 'changeDetail',
        component: () => import('@/views/oms/order/changeDetail'),
        meta: {title: '业务变更详情'},
        hidden:true

      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: {title: '外出管理'}
        // meta: {title: '外出管理', icon: 'order-return-reason'}
      },
      {
        path: 'listLogin',
        name: 'listLogin',
        component: () => import('@/views/oms/apply/login'),
        meta: {title: '外出管理详情'},
        hidden:true
        // meta: {title: '外出管理', icon: 'order-return-reason'}
      },
      {
        path: 'returnDetail',
        name: 'returnDetail',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '退住详情'},
        hidden:true
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {title: '预约信息'},
        hidden:true
      }
    ]
  },
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
        component: () => import('@/views/mmg/matrial/query'),
        meta: {title: '物资查询'}
      },
      {
        path: 'addMaterial',
        name: 'addMaterial',
        component: () => import('@/views/mmg/matrial/add'),
        meta: {title: '新增物资'},
        hidden: true
      },
      {
        path: 'updateMaterial',
        name: 'updateMaterial',
        component: () => import('@/views/mmg/matrial/update'),
        meta: {title: '编辑资产'},
        hidden: true
      },
      {
        path: 'viewMaterial',
        name: 'viewMaterial',
        component: () => import('@/views/mmg/matrial/view'),
        meta: {title: '资产详情'},
        hidden: true
      },
      {
        path: 'putAsset',
        name: 'putAsset',
        component: () => import('@/views/mmg/matrial/put'),
        meta: {title: '物资入库'}
      },
      {
        path: 'outAsset',
        name: 'outAsset',
        component: () => import('@/views/mmg/matrial/out'),
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
    name: 'fmg',
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
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {title: '人事管理', icon: 'sms'},
    children: [
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '部门配置', icon: 'sms-flash'}
      },
      {
        path: 'flashDetail',
        name: 'flashDetail',
        component: () => import('@/views/sms/flash/indexDetail'),
        meta: {title: '部门配置详情'},
        hidden: true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '岗位管理', icon: 'sms-coupon'}
      },
      {
        path: 'couponDetail',
        name: 'couponDetail',
        component: () => import('@/views/sms/coupon/indexDetail'),
        meta: {title: '岗位管理详情'},
        hidden: true
      },
      // {
      //   path: 'brand',
      //   name: 'homeBrand',
      //   component: () => import('@/views/sms/brand/index'),
      //   meta: {title: '权限分配', icon: 'product-brand'}
      // },
      // {
      //   path: 'brandDetail',
      //   name: 'brandDetail',
      //   component: () => import('@/views/sms/brand/indexDetail'),
      //   meta: {title: '权限分配详情'},
      //   hidden: true
      // },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '员工管理', icon: 'sms-new'}
      },
      {
        path: 'newDetail',
        name: 'newDetail',
        component: () => import('@/views/sms/new/indexDetail'),
        meta: {title: '员工管理详情'},
        hidden: true
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '团队管理', icon: 'sms-subject'}
      },
      {
        path: 'subjectDetail',
        name: 'subjectDetail',
        component: () => import('@/views/sms/subject/indexDetail'),
        meta: {title: '团队管理详情'},
        hidden: true
      },
      // {
      //   path: 'flashSession',
      //   name: 'flashSession',
      //   component: () => import('@/views/sms/flash/sessionList'),
      //   meta: {title: '岗位/职级管理'},
      //   hidden:true
      // },
      // {
      //   path: 'selectSession',
      //   name: 'selectSession',
      //   component: () => import('@/views/sms/flash/selectSessionList'),
      //   meta: {title: '权限分配'},
      //   hidden:true
      // },
      // {
      //   path: 'flashProductRelation',
      //   name: 'flashProductRelation',
      //   component: () => import('@/views/sms/flash/productRelationList'),
      //   meta: {title: '员工管理'},
      //   hidden:true
      // },

      // {
      //   path: 'updateCoupon',
      //   name: 'updateCoupon',
      //   component: () => import('@/views/sms/coupon/update'),
      //   meta: {title: '员工管理'},
      //   hidden:true
      // },
      // {
      //   path: 'couponHistory',
      //   name: 'couponHistory',
      //   component: () => import('@/views/sms/coupon/history'),
      //   meta: {title: '优惠券领取详情'},
      //   hidden:true
      // },

      // {
      //   path: 'hot',
      //   name: 'homeHot',
      //   component: () => import('@/views/sms/hot/index'),
      //   meta: {title: '岗位/职级管理', icon: 'sms-hot'}
      // },

      // {
      //   path: 'advertise',
      //   name: 'homeAdvertise',
      //   component: () => import('@/views/sms/advertise/index'),
      //   meta: {title: '广告列表', icon: 'sms-ad'}
      // },
      // {
      //   path: 'addAdvertise',
      //   name: 'addHomeAdvertise',
      //   component: () => import('@/views/sms/advertise/add'),
      //   meta: {title: '添加广告'},
      //   hidden:true
      // },
      // {
      //   path: 'updateAdvertise',
      //   name: 'updateHomeAdvertise',
      //   component: () => import('@/views/sms/advertise/update'),
      //   meta: {title: '编辑广告'},
      //   hidden:true
      // }
    ]
  },
  {
    path: '/food',
    component: Layout,
    redirect: '/food/product',
    name: 'food',
    meta: {title: '膳食管理', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/food/product/index'),
      meta: {title: '菜品管理'}
    },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/food/product/add'),
        meta: {title: '套餐管理'},

      },
      {
        path: 'ProductView',
        name: 'ProductView',
        component: () => import('@/views/food/product/view'),
        meta: {title: '查看'},
        hidden: true
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/food/product/update'),
        meta: {title: '编辑'},
        hidden: true
      },
      {
        path: 'productQuery',
        name: 'productQuery',
        component: () => import('@/views/food/product/query'),
        meta: {title: '食谱管理'}
      },
      {
        path: 'productPut',
        name: 'productPut',
        component: () => import('@/views/food/product/put'),
        meta: {title: '配送管理'}
      },
      {
        path: 'productOut',
        name: 'productOut',
        component: () => import('@/views/food/product/out'),
        meta: {title: '物资出库'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/food/product/index'),
        meta: {title: '盘点管理'},
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/food/product/update'),
        meta: {title: '仓库日志'},
        hidden: true
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
