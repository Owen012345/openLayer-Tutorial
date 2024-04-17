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
        }
    ]
}]

export default menu