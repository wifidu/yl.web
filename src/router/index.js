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
    }, {
      path: 'initiativeRefund',
      name: 'initiativeRefund',
      component: () => import('@/views/fmg/initiativeRefund'),
      meta: {title: '主动退款'}
     }, {
      path: 'organizationMG',
      name: 'organizationMG',
      component: () => import('@/views/fmg/organizationMG'),
      meta: {title: '机构账号管理'}
    }, {
      path: 'depositMG',
      name: 'depositMG',
      component: () => import('@/views/fmg/depositMG'),
      meta: {title: '押金管理'}
    }, {
      path: 'billingMessage',
      name: 'billingMessage',
      component: () => import('@/views/fmg/compoments/billingMessage'),
      meta: {title: '账单信息'},
      hidden: true
    }]
  },
  {
    path: '/dailymg',
    component: Layout,
    redirect: '/dailymg/visiting',
    name: 'dailymg',
    meta: {title: '日常管理', icon: 'table'},
    children: [{
      path: 'accident',
      name: 'accident',
      component: () => import('@/views/dailymg/accident'),
      meta: {title: '事故登记'},
    }, {
      path: 'visiting',
      name: 'visiting',
      component: () => import('@/views/dailymg/visiting'),
      meta: {title: '来访登记'}
    }, {
      path: 'visitorRegistation',
      name: 'visitorRegistation',
      component: () => import('@/views/dailymg/compoments/visitorRegistation'),
      meta: {title: '访客登记'},
      hidden: true
    }, {
      path: 'accidentEdit',
      name: 'accidentEdit',
      component: () => import('@/views/dailymg/compoments/accidentEditor'),
      meta: {title: '事故编辑'},
      hidden: true
    }, {
      path: 'accidentShow',
      name: 'accidentShow',
      component: () => import('@/views/dailymg/accidentShow'),
      meta: {title: '事故编辑'},
      hidden: true
    }, {
      path: 'consulting',
      name: 'consulting',
      component: () => import('@/views/dailymg/consulting'),
      meta: {title: '咨询登记'},
    }, {
      path: 'consultRegistation',
      name: 'consultRegistation',
      component: () => import('@/views/dailymg/compoments/consultRegistation'),
      meta: {title: '咨询登记'},
      hidden: true
    }, {
      path: 'consultEdit',
      name: 'consultEdit',
      component: () => import('@/views/dailymg/consultEdit'),
      meta: {title: '咨询编辑'},
      hidden: true
    }, {
      path: 'consultShow',
      name: 'consultShow',
      component: () => import('@/views/dailymg/consultShow'),
      meta: {title: '咨询详情'},
      hidden: true
    }]
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
        path: 'number',
        name: 'number',
        component: () => import('@/views/drug/dcp/number'),
        meta: {title: '药品数量校正'},
        hidden: true
      },
      {
        path: 'remaining',
        name: 'remaining',
        component: () => import('@/views/drug/dcp/remaining'),
        meta: {title: '药品预警设置'},
        hidden: true
      },
      {
        path: 'addcp',
        name: 'addcp',
        component: () => import('@/views/drug/dcp/addcp'),
        meta: {title: '添加缴存'},
        hidden: true
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
      },
      {
        path: 'medicineSet',
        name: 'medicineSet',
        component: () => import('@/views/drug/medicineSet/index'),
        meta: {title: '用药设置'},
      },
      {
        path: 'addMedicine',
        name: 'addMedicine',
        component: () => import('@/views/drug/medicineSet/components/addMedicine'),
        meta: {title: '添加'},
        hidden: true
      },
      {
        path: 'showmedicine',
        name: 'showmedicine',
        component: () => import('@/views/drug/medicineSet/showmedicine'),
        meta: {title: '查看'},
        hidden: true
      },
      {
        path: 'updatemedicine',
        name: 'updatemedicine',
        component: () => import('@/views/drug/medicineSet/updatemedicine'),
        meta: {title: '编辑'},
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
