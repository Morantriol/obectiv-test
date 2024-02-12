<template>
  <main class="main">
    <section class="container">
      <BaseSelect
        class="animals-select"
        :options="options"
        v-model="selectedOption"
        placeholder="Выберите название животного"
      />
      <Table />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { options } from "@/mocks/selectOptions";

import BaseSelect from "@/components/BaseSelect.vue";
import Table from "@/components/Table.vue";

const selectedOption = ref(null);
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animals-select {
  max-width: 350px;
  align-self: start;
}
</style>
