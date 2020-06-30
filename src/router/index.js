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
    redirect: '/oms/files',
    name: 'oms',
    meta: {title: '会员管理', icon: 'order'},
    children: [
      {
        path: 'files',
        name: 'files',
        component: () => import('@/views/oms/MembershipFiles/index'),
        meta: {title: '会员档案'}
      },
      {
        path: 'files_editDetail',
        name: 'files_editDetail',
        component: () => import('@/views/oms/MembershipFiles/edit'),
        meta: {title: '编辑信息'},
        hidden:true
      },
      {
        path: 'files_viewDetail',
        name: 'files_viewDetail',
        component: () => import('@/views/oms/MembershipFiles/view'),
        meta: {title: '详细信息'},
        hidden:true
      },
      {
        path: 'files_newDetail',
        name: 'files_newDetail',
        component: () => import('@/views/oms/MembershipFiles/in'),
        meta: {title: '新增信息'},
        hidden:true
      },
      // {
      //   path: 'orderDetail',
      //   name: 'orderDetail',
      //   component: () => import('@/views/oms/order/orderDetail'),
      //   meta: {title: '详细信息'},
      //   hidden:true
      // },
      // {
      //   path: 'deliverOrderList',
      //   name: 'deliverOrderList',
      //   component: () => import('@/views/oms/order/deliverOrderList'),
      //   meta: {title: '发货列表'},
      //   hidden:true
      // },

      {
        path: 'book',
        name: 'book',
        component: () => import('@/views/oms/BookingOccupancy/index'),
        meta: {title: '预约占床'}
        // meta: {title: '预约占床', icon: 'product-brand'}
      },
      {
        path: 'book_editDetail',
        name: 'book_editDetail',
        component: () => import('@/views/oms/BookingOccupancy/edit'),
        meta: {title: '编辑信息'},
        hidden:true
      },
      {
        path: 'book_viewDetail',
        name: 'book_viewDetail',
        component: () => import('@/views/oms/BookingOccupancy/view'),
        meta: {title: '详细信息'},
        hidden:true
      },
      {
        path: 'book_newDetail',
        name: 'book_newDetail',
        component: () => import('@/views/oms/BookingOccupancy/in'),
        meta: {title: '新增信息'},
        hidden:true
      },
      {
        path: 'checkin',
        name: 'checkin',
        component: () => import('@/views/oms/CheckIn/index'),
        meta: {title: '入住登记'}
        // meta: {title: '入住登记', icon: 'product-add'}
      },
      {
        path: 'checkin_editDetail',
        name: 'checkin_editDetail',
        component: () => import('@/views/oms/CheckIn/edit'),
        meta: {title: '编辑信息'},
        hidden:true
      },
      {
        path: 'checkin_viewDetail',
        name: 'checkin_viewDetail',
        component: () => import('@/views/oms/CheckIn/view'),
        meta: {title: '详细信息'},
        hidden:true
      },
      {
        path: 'checkin_newDetail',
        name: 'checkin_newDetail',
        component: () => import('@/views/oms/CheckIn/in'),
        meta: {title: '新增信息'},
        hidden:true
      },
      // {
      //   path: 'addDetail',
      //   name: 'addDetail',
      //   component: () => import('@/views/oms/product/update'),
      //   meta: {title: '登记信息'},
      //   hidden:true,
      // },
      // {
      //   path: 'viewDetail',
      //   name: 'viewDetail',
      //   component: () => import('@/views/oms/product/index'),
      //   meta: {title: '入住详细信息'},
      //   hidden:true
      // },
      {
        path: 'withdraw',
        name: 'withdraw',
        component: () => import('@/views/oms/WithdrawalRegistration/index'),
        meta: {title: '退住登记'}
        // meta: {title: '退住登记', icon: 'product-add'}
      },
      {
        path: 'withdraw_editDetail',
        name: 'withdraw_editDetail',
        component: () => import('@/views/oms/WithdrawalRegistration/edit'),
        meta: {title: '编辑信息'},
        hidden:true
      },
      {
        path: 'withdraw_viewDetail',
        name: 'withdraw_viewDetail',
        component: () => import('@/views/oms/WithdrawalRegistration/view'),
        meta: {title: '详细信息'},
        hidden:true
      },
      {
        path: 'withdraw_newDetail',
        name: 'withdraw_newDetail',
        component: () => import('@/views/oms/WithdrawalRegistration/in'),
        meta: {title: '新增信息'},
        hidden:true
      },
      {
        path: 'change',
        name: 'change',
        component: () => import('@/views/oms/BusinessChange/index'),
        meta: {title: '业务变更'}
        // meta: {title: '业务变更', icon: 'product-brand'}
      },
      {
        path: 'change_editDetail',
        name: 'change_editDetail',
        component: () => import('@/views/oms/BusinessChange/edit'),
        meta: {title: '编辑信息'},
        hidden:true
      },
      {
        path: 'change_viewDetail',
        name: 'change_viewDetail',
        component: () => import('@/views/oms/BusinessChange/view'),
        meta: {title: '详细信息'},
        hidden:true
      },
      {
        path: 'change_newDetail',
        name: 'change_newDetail',
        component: () => import('@/views/oms/BusinessChange/in'),
        meta: {title: '新增信息'},
        hidden:true
      },

      {
        path: 'outgoing',
        name: 'outgoing',
        component: () => import('@/views/oms/OutgoingManagement/index'),
        meta: {title: '外出管理'}
        // meta: {title: '外出管理', icon: 'order-return-reason'}
      },
      {
        path: 'outgoing_editDetail',
        name: 'outgoing_editDetail',
        component: () => import('@/views/oms/OutgoingManagement/edit'),
        meta: {title: '编辑信息'},
        hidden:true
      },
      {
        path: 'outgoing_viewDetail',
        name: 'outgoing_viewDetail',
        component: () => import('@/views/oms/OutgoingManagement/view'),
        meta: {title: '详细信息'},
        hidden:true
      },
      {
        path: 'outgoing_newDetail',
        name: 'outgoing_newDetail',
        component: () => import('@/views/oms/OutgoingManagement/in'),
        meta: {title: '新增信息'},
        hidden:true
      },
      {
        path: 'death',
        name: 'death',
        component: () => import('@/views/oms/DeathRegistration/index'),
        meta: {title: '死亡登记'}
      },
      {
        path: 'death_editDetail',
        name: 'death_editDetail',
        component: () => import('@/views/oms/DeathRegistration/edit'),
        meta: {title: '编辑信息'},
        hidden:true
      },
      {
        path: 'death_viewDetail',
        name: 'death_viewDetail',
        component: () => import('@/views/oms/DeathRegistration/view'),
        meta: {title: '详细信息'},
        hidden:true
      },
      {
        path: 'death_newDetail',
        name: 'death_newDetail',
        component: () => import('@/views/oms/DeathRegistration/in'),
        meta: {title: '新增信息'},
        hidden:true
      },
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
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {title: '人事管理', icon: 'sms'},
    children: [
      {
        path: 'department',
        name: 'department',
        component: () => import('@/views/sms/DepartMentconfiguration/index'),
        meta: {title: '部门配置', icon: 'sms-flash'}
      },
      {
        path: 'department_view',
        name: 'department_view',
        component: () => import('@/views/sms/DepartMentconfiguration/view'),
        meta: {title: '详细信息'},
        hidden: true
      },
      {
        path: 'department_new',
        name: 'department_new',
        component: () => import('@/views/sms/DepartMentconfiguration/in'),
        meta: {title: '新增信息'},
        hidden: true
      },
      {
        path: 'department_edit',
        name: 'department_edit',
        component: () => import('@/views/sms/DepartMentconfiguration/edit'),
        meta: {title: '编辑信息'},
        hidden: true
      },
      {
        path: 'employee',
        name: 'employee',
        component: () => import('@/views/sms/EmployeeManagement/index'),
        meta: {title: '员工管理', icon: 'sms-flash'}
      },
      {
        path: 'employee_view',
        name: 'employee_view',
        component: () => import('@/views/sms/EmployeeManagement/view'),
        meta: {title: '详细信息'},
        hidden: true
      },
      {
        path: 'employee_new',
        name: 'employee_new',
        component: () => import('@/views/sms/EmployeeManagement/in'),
        meta: {title: '新增信息'},
        hidden: true
      },
      {
        path: 'employee_edit',
        name: 'employee_edit',
        component: () => import('@/views/sms/EmployeeManagement/edit'),
        meta: {title: '编辑信息'},
        hidden: true
      },
      {
        path: 'post',
        name: 'post',
        component: () => import('@/views/sms/PostManagement/index'),
        meta: {title: '岗位管理', icon: 'sms-flash'}
      },
      {
        path: 'post_view',
        name: 'post_view',
        component: () => import('@/views/sms/PostManagement/view'),
        meta: {title: '详细信息'},
        hidden: true
      },
      {
        path: 'post_new',
        name: 'post_new',
        component: () => import('@/views/sms/PostManagement/in'),
        meta: {title: '新增信息'},
        hidden: true
      },
      {
        path: 'post_edit',
        name: 'post_edit',
        component: () => import('@/views/sms/PostManagement/edit'),
        meta: {title: '编辑信息'},
        hidden: true
      },
      {
        path: 'team',
        name: 'team',
        component: () => import('@/views/sms/TeamManagement/index'),
        meta: {title: '团队管理', icon: 'sms-flash'}
      },
      {
        path: 'team_view',
        name: 'team_view',
        component: () => import('@/views/sms/TeamManagement/view'),
        meta: {title: '详细信息'},
        hidden: true
      },
      {
        path: 'team_new',
        name: 'team_new',
        component: () => import('@/views/sms/TeamManagement/in'),
        meta: {title: '新增信息'},
        hidden: true
      },
      {
        path: 'team_edit',
        name: 'team_edit',
        component: () => import('@/views/sms/TeamManagement/edit'),
        meta: {title: '编辑信息'},
        hidden: true
      },

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
    path: '/food',
    component: Layout,
    redirect: '/food/food_manage',
    name: 'food',
    meta: {title: '膳食管理', icon: 'product'},
    children: [
      {
        path: 'food_manage',
        name: 'food_manage',
        component: () => import('@/views/food/food/index'),
        meta: {title: '菜品管理'}
      },
      {
        path: 'food_view',
        name: 'food_view',
        component: () => import('@/views/food/food/view'),
        meta: {title: '详细信息'},
        hidden: true
      },
      {
        path: 'food_new',
        name: 'food_new',
        component: () => import('@/views/food/food/in'),
        meta: {title: '新增信息'},
        hidden: true
      },
      {
        path: 'food_edit',
        name: 'food_edit',
        component: () => import('@/views/food/food/edit'),
        meta: {title: '编辑信息'},
        hidden: true
      },
      {
        path: 'package',
        name: 'package',
        component: () => import('@/views/food/package/index'),
        meta: {title: '套餐管理'}
      },
      {
        path: 'package_view',
        name: 'package_view',
        component: () => import('@/views/food/package/view'),
        meta: {title: '详细信息'},
        hidden: true
      },
      {
        path: 'package_new',
        name: 'package_new',
        component: () => import('@/views/food/package/in'),
        meta: {title: '新增信息'},
        hidden: true
      },
      {
        path: 'package_edit',
        name: 'package_edit',
        component: () => import('@/views/food/package/edit'),
        meta: {title: '编辑信息'},
        hidden: true
      },
      {
        path: 'recipe',
        name: 'recipe',
        component: () => import('@/views/food/recipe/index'),
        meta: {title: '食谱管理'}
      },
      {
        path: 'recipe_view',
        name: 'recipe_view',
        component: () => import('@/views/food/recipe/view'),
        meta: {title: '详细信息'},
        hidden: true
      },
      {
        path: 'recipe_new',
        name: 'recipe_new',
        component: () => import('@/views/food/recipe/in'),
        meta: {title: '新增信息'},
        hidden: true
      },
      {
        path: 'recipe_edit',
        name: 'recipe_edit',
        component: () => import('@/views/food/recipe/edit'),
        meta: {title: '编辑信息'},
        hidden: true
      },
      {
        path: 'distribution',
        name: 'distribution',
        component: () => import('@/views/food/distribution/index'),
        meta: {title: '配送管理'}
      },
      {
        path: 'distribution_view',
        name: 'distribution_view',
        component: () => import('@/views/food/distribution/view'),
        meta: {title: '详细信息'},
        hidden: true
      },
      {
        path: 'distribution_new',
        name: 'distribution_new',
        component: () => import('@/views/food/distribution/in'),
        meta: {title: '新增信息'},
        hidden: true
      },
      {
        path: 'distribution_edit',
        name: 'distribution_edit',
        component: () => import('@/views/food/distribution/edit'),
        meta: {title: '编辑信息'},
        hidden: true
      },
    // {
    //   path: 'product',
    //   name: 'product',
    //   component: () => import('@/views/food/product/index'),
    //   meta: {title: '菜品管理'}
    // },
    //   {
    //     path: 'addProduct',
    //     name: 'addProduct',
    //     component: () => import('@/views/food/product/add'),
    //     meta: {title: '套餐管理'},
    //
    //   },
    //   {
    //     path: 'ProductView',
    //     name: 'ProductView',
    //     component: () => import('@/views/food/product/view'),
    //     meta: {title: '查看'},
    //     hidden: true
    //   },
    //   {
    //     path: 'updateProduct',
    //     name: 'updateProduct',
    //     component: () => import('@/views/food/product/update'),
    //     meta: {title: '编辑'},
    //     hidden: true
    //   },
    //   {
    //     path: 'productQuery',
    //     name: 'productQuery',
    //     component: () => import('@/views/food/product/query'),
    //     meta: {title: '食谱管理'}
    //   },
    //   {
    //     path: 'productPut',
    //     name: 'productPut',
    //     component: () => import('@/views/food/product/put'),
    //     meta: {title: '配送管理'}
    //   },
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
      },
    ]
  },
  {
    path: '/rs',
    component: Layout,
    redirect: '/rs/waitingCharges',
    name: 'rs',
    meta: {title: '报表管理',icon:'sms'},
    children: [
      {
        path: 'waitingCharges',
        name: 'waitingCharges',
        component: () => import('@/views/rs/waitingCharges/index'),
        meta: {title: '待收费管理'}
      },
      {
        path: 'wc_view',
        name: 'wc_view',
        component: () => import('@/views/rs/waitingCharges/view'),
        meta: {title: '详细信息'},
        hidden: true
      },
      {
        path: 'wc_new',
        name: 'wc_new',
        component: () => import('@/views/rs/waitingCharges/in'),
        meta: {title: '新增信息'},
        hidden: true
      },
      {
        path: 'wc_edit',
        name: 'wc_edit',
        component: () => import('@/views/rs/waitingCharges/edit'),
        meta: {title: '编辑信息'},
        hidden: true
      },
      {
        path: 'monthlyCharges',
        name: 'monthlyCharges',
        component: () => import('@/views/rs/monthlyCharges/index'),
        meta: {title: '月度报表管理'}
      },
      {
        path: 'mc_view',
        name: 'mc_view',
        component: () => import('@/views/rs/monthlyCharges/view'),
        meta: {title: '详细信息'},
        hidden: true
      },
      {
        path: 'mc_new',
        name: 'mc_new',
        component: () => import('@/views/rs/monthlyCharges/in'),
        meta: {title: '新增信息'},
        hidden: true
      },
      {
        path: 'mc_edit',
        name: 'mc_edit',
        component: () => import('@/views/rs/monthlyCharges/edit'),
        meta: {title: '编辑信息'},
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
