export const menusAdmin = [
    { key: '/app/dashboard/home', title: '主页', icon: 'home', },
    {
        key: '/app/management', title: '商店管理', icon: 'setting',
        sub: [
            { key: '/app/management/dishManagement', title: '餐品管理', icon: '', },
            { key: '/app/management/orderManagement', title: '订餐管理', icon: '', },
            
        ],
    },
    {
        key: '/app/table', title: '表格', icon: 'copy',
        sub: [
            { key: '/app/table/basicTable', title: '基础表格', icon: '', },
            { key: '/app/table/advancedTable', title: '高级表格', icon: '', },
            { key: '/app/table/asynchronousTable', title: '异步表格', icon: '', },
        ],
    },
    {
        key: '/app/form', title: '表单', icon: 'edit',
        sub: [
            { key: '/app/form/basicForm', title: '基础表单', icon: '', },
        ],
    },
    {
        key: '/app/chart', title: '图表', icon: 'area-chart',
        sub: [
            { key: '/app/chart/echarts', title: 'echarts', icon: '', },
            { key: '/app/chart/recharts', title: 'recharts', icon: '', },
        ],
    },
    {
        key: '/sub4', title: '页面', icon: 'switcher',
        sub: [
            { key: '/login', title: '登录', icon: '', },
            { key: '/404', title: '404', icon: '', },
            { key: '/register', title: '注册', icon: '', },
        ],
    },
    {
        key: '/app/auth', title: '权限管理', icon: 'safety',
        sub: [
            { key: '/app/auth/basic', title: '基础演示', icon: '', },
            { key: '/app/auth/routerEnter', title: '路由拦截', icon: '', },
        ],
    },
];

export const menusCustom = [
    { key: '/app/dashboard/home', title: '主页', icon: 'home', },
    {
        key: '/app/category', title: '分类', icon: 'appstore',
        sub: [
            { key: '/app/category/all', title: '全部', icon: '', },
            { key: '/app/category/meals', title: '主餐', icon: '', },
            { key: '/app/category/dessert', title: '甜点', icon: '', },
        ],
    },
    { key: '/app/shopping/shoppingCart', title: '我的购物车', icon: 'shopping-cart', },
    {
        key: '/app/order', title: '我的订单', icon: 'user',
        sub: [
            { key: '/app/order/newOrder', title: '当前订单', icon: '', },
        ],
    },
];