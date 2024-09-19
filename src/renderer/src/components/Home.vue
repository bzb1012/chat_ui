<template>
  <div class="home-container">
    <div class="left-side">
      我是左边
      <RouterLink to="/Contact">Go to Contact</RouterLink>
      <RouterLink to="/Chat">Go to Chat</RouterLink>
      <RouterLink to="/Login">Go to Login</RouterLink>
    </div>
    <div class="right-side">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup></script>

<style>
.home-container {
  display: flex;
}
.left-side {
  width: 100px;
  height: 100vh;
  background-color: grey;
}

.right-side {
  height: 100vh;
  flex: 1;
}
</style>
