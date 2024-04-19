const menu = [{
    path: '/', 
    redirect: '/map_render',
    children: [ 
        {
            path: 'map_render', 
            name: 'mapRender', 
            component: () => import('@/views/MapRender.vue'),
        },
        {
            path: 'map_marker',
            name: 'mapMarker', 
            component: () => import('@/views/MapMarker.vue'),
        },
        {
            path: 'map_Eric',
            name: 'mapEric',
            component: () => import('@/views/MapEric.vue'),
        }
    ]
}]

export default menu