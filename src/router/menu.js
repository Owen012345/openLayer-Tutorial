const menu = [{
    path: '/', 
    redirect: '/map_render',
    children: [ 
    {
        path: 'map_render', 
        name: 'mapRender', 
        component: () => import('@/views/MapRender.vue'),
    },
    ]
}]

export default menu