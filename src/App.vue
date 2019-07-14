<template>
  <div id="app">
    <my-header/>
    <my-form/>
    <my-footer/>
  </div>
</template>

<script>
import header from '@/components/Header.vue';
import footer from '@/components/Footer.vue';
import form from '@/components/Form.vue';

export default {
  name: 'App',
  components: {
    'my-header': header,
    'my-footer': footer,
    'my-form': form,
  },
};
</script>

<style>
</style>
