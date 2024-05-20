<script setup>

</script>

<template>
    <div id="app">
        <h1>登录页面</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="username">用户名：</label>
                <input type="text" id="username" v-model="username" />
            </div>
            <div>
                <label for="password">密码：</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <button type="submit">登录</button>
        </form>
    </div>
</template>

