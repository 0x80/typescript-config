<script setup>
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <footer class="custom-footer">
        <p class="message">Released under the MIT License.</p>
        <p class="copyright">Copyright &copy; Thijs Koerselman</p>
      </footer>
    </template>
  </Layout>
</template>

<style scoped>
.custom-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 26px 32px;
  text-align: center;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.custom-footer p {
  margin: 0;
  line-height: 24px;
}
</style>
