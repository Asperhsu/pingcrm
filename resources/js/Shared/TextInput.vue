<template>
  <div :class="$attrs.class">
    <label v-if="label" class="form-label" :for="id">{{ label }}:</label>
    <input :id="id" ref="input" v-bind="{ ...$attrs, class: null }" class="form-input" :class="{ error: error }" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  emits: ['update:modelValue'],
  props: {
    id: {
      type: String,
      default() {
        return `text-input-${Math.round(Math.random() * 10000)}`
      },
    },
    type: {
      type: String,
      default: 'text',
    },
    modelValue: String,
    label: String,
    error: String,
  },
  setup () {
    const input = ref(null);

    const focus = () => input.value.focus();
    const select = () => input.value.select();
    const setSelectionRange = (start, end) => setSelectionRange(start, end);

    return { input, focus, select, setSelectionRange };
  },
}
</script>
