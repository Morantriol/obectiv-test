<template>
  <div class="select">
    <span v-if="label">
      {{ label }}
    </span>
    <div class="wrapper">
      <select class="native" :disabled="disabled">
        <option value="" disabled selected hidden>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.title"
        >
          {{ option.title }}
        </option>
      </select>
      <div class="custom" aria-hidden="true">
        <div class="custom-trigger">{{ placeholder }}</div>
        <div class="custom-options" v-for="option in options" :key="option.id">
          {{ option.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OptionItem } from "@/mocks/selectOptions";

interface Props {
  options: OptionItem[];
  placeholder: string;
  disabled?: boolean;
  label?: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
.native,
.custom {
  position: relative;
  width: 20rem;
  height: 3rem;
}

.custom {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}

@media (hover: hover) {
  .custom {
    display: block;
  }

  .native:focus + .custom {
    display: none;
  }
}

.native:focus,
.custom.isActive .custom-trigger {
  outline: none;
  box-shadow:
    white 0 0 0 0.2rem,
    #ff821f 0 0 0 0.4rem;
}

.select {
  position: relative;
}

.wrapper {
  position: relative;
}

.native,
.custom-trigger {
  font-size: 1.6rem;
  background-color: #fff;
  border: 1px solid #6f6f6f;
  border-radius: 0.4rem;
}

.native {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("../../src/assets/svg/arrowSelect.svg");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 0.8rem;
  padding: 0.8rem;
}

.custom-trigger {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0.8rem 0.8rem;
  cursor: pointer;
}
</style>
