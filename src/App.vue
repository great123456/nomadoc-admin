<template>
    <div id="app">
        <router-view :key="$route.fullpath"></router-view>
    </div>
</template>
<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";
</style>