<template>
    <div :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive" @dragleave.prevent="setInactive"
        @drop.prevent="onDrop">
        <slot :dropZoneActive="active"></slot>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'

const emit = defineEmits(['files-dropped'])

export default {
  data() {
    return {
      active: ref(false),
      inActiveTimeout: null
    }
  },
  methods: {
    setActive() {
      this.active = true
      clearTimeout(this.inActiveTimeout)
    },
    setInactive() {
      this.inActiveTimeout = setTimeout(() => {
        this.active = false
      }, 50)
    },
    onDrop(e) {
      this.setInactive()
      emit('files-dropped', [...e.dataTransfer.files])
    },
    preventDefaults(e) {
      e.preventDefault()
    }
  },
  mounted() {
    const events = ['dragenter', 'dragover', 'dragleave', 'drop']
    events.forEach((eventName) => {
      document.body.addEventListener(eventName, this.preventDefault)
    })
  },
  unmounted() {
    const events = ['dragenter', 'dragover', 'dragleave', 'drop']
    events.forEach((eventName) => {
      document.body.removeEventListener(eventName, this.preventDefault)
    })
  }
}

</script>

<style scoped lang="scss">

.file-input{
    span{
        display: block;
        text-align: center;
    }
}
</style>