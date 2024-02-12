<template>
  <div
    class="base-select"
    :class="{
      'base-select--open': isOptionsVisible,
    }"
  >
    <div
      class="placeholder"
      :class="{ 'placeholder--open': isOptionsVisible }"
      @click="isOptionsVisible = !isOptionsVisible"
    >
      <label
        class="placeholder-text"
        :class="{ 'placeholder-text--float-up': selectedOption }"
      >
        {{ placeholder }}
      </label>
      <span class="selected-option" v-if="selectedOption">
        {{ selectedOption }}
      </span>
      <SelectArrow
        class="dropdown-arrow"
        :class="{ 'dropdown-arrow--rotate': isOptionsVisible }"
      />
    </div>
    <div
      class="options-wrapper"
      :class="{ 'options-wrapper--open': isOptionsVisible }"
    >
      <div class="option" v-if="!options.length">Нет вариантов для выбора</div>
      <div
        class="option"
        v-for="option in options"
        :key="option.id"
        @click="toggleOptionSelect(option.title)"
      >
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type OptionItem } from "@/mocks/selectOptions";
import { ref } from "vue";
import SelectArrow from "@/components/icons/SelectArrow.vue";

interface Props {
  options: OptionItem[];
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const selectedOption = ref<unknown>(null);
const isOptionsVisible = ref(false);

const toggleOptionSelect = (option: string) => {
  selectedOption.value = option;
  isOptionsVisible.value = false;
  emit("update:modelValue", option);
};
</script>

<style scoped lang="scss">
.base-select {
  position: relative;
  width: 100%;
  min-height: 41px;
  background: $white;
  cursor: pointer;
  border: solid 1px #dadefe;
  border-radius: 12px;
  transition: border-color 0.2s ease-in;
  box-shadow: 1px 0 8px $inputShadow;
  color: $selectFontColor;

  &:hover {
    border-color: $selectHoverBorder;

    .dropdown-arrow {
      color: $selectHoverArrowColor;
    }
  }

  &--open {
    border: solid 1px transparent;
    background: $inputBorderOpen;
  }
}

.placeholder {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 16px;

  &--open {
    border-bottom: 1px solid $selectOpenBorder;
  }
}

.placeholder-text {
  position: absolute;
  cursor: pointer;
  color: $placeholderColor;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  transition:
    top 0.2s ease-in,
    left 0.2s ease-in;

  &--float-up {
    position: absolute;
    top: -3px;
    left: 10px;
  }
}

.selected-option {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.dropdown-arrow {
  position: relative;
  top: 50%;
  right: 0;
  margin-left: auto;
  color: $selectArrowColor;
  transition:
    transform 0.3s,
    color 0.3s;

  &--rotate {
    transform: rotate(180deg);
  }
}

.options-wrapper {
  overflow-x: hidden;
  max-height: 0;
  transition:
    max-height 0.4s,
    padding 0.4s;

  &--open {
    max-height: 200px;
    padding: 10px 0;
    overflow-x: scroll;
    transition:
      max-height 0.4s,
      padding 0.4s;
  }
}

.option {
  padding: 5px 11px;

  &:hover {
    background-color: $optionsBackgroundColor;
  }
}
</style>
