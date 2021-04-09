<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <button
      class="bg-white px-3 py-2 border border-gray-500 rounded shadow"
      @click="count++"
    >
      count is: {{ count }}
    </button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0)
    return { count }
  },
})
</script>
