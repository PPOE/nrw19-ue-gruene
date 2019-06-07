<template>
  <div id="app">
    <my-header/>
    <pdf-service/>
    <my-footer/>
  </div>
</template>

<script>
import header from '@/components/Header.vue';
import footer from '@/components/Footer.vue';
import pdfservice from '@/components/PDFService.vue';

export default {
  name: 'App',
  components: {
    'my-header': header,
    'my-footer': footer,
    'pdf-service': pdfservice,
  },
};
</script>

<style>
</style>
