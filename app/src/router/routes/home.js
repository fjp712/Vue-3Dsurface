export default [{
    path:'/home',
    name:'首页',
    component:()=>import('@/view/home/index'),
    meta:{title:'首页'},
    children:[
        {
            path:'three',
            name:'threeJs实现',
            component:()=>import('@/view/home/three/index')
        }
    ]
}]

// 12.27 ...运算符支持只带有iterator接口的对象展开
