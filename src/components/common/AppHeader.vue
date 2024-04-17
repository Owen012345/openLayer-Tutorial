<template>
    <div class="app__header">
        <h1>Vue.js OpenLayers</h1>
        <ul>
            <li v-for="item in menu" :key="item.path">
                <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import menu from '@/router/menu';

export default {
    data() {
        return {
            menu: menu[0].children
        };
    }
}
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}
li a {
    text-decoration: none;
    color: black;
}
</style>