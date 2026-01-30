<template>
  <div class="share-root" ref="root">
    <button class="share-toggle" @click="toggle">
      Share
    </button>

    <div v-if="open" class="share-popover" role="dialog" aria-label="Share options" :style="popoverStyle">
      <ul class="share-list">
        <li v-for="p in platformsToShow" :key="p">
          <SocialIcon
            :type="p"
            share
            :title="title"
            :description="description"
            :url="url"
            :theme="theme"
            @click.native="onIconClick"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, inject } from 'vue'
import SocialIcon from './SocialIcon.vue'

const props = defineProps({
  platforms: { type: Array, default: () => ['twitter', 'facebook', 'linkedin', 'telegram', 'whatsapp'] },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  url: { type: String, default: '' },
  theme: { type: String, default: 'color' },
  direction: { type: String, default: 'bottom' } // top | bottom | left | right
})

const root = ref(null)
const open = ref(false)

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function onDocClick(e) {
  if (!root.value) return
  if (!root.value.contains(e.target)) close()
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

function onIconClick() {
  // close popover when a social icon (link) is clicked
  // delay slightly to allow the anchor to act
  setTimeout(close, 150)
}

const config = inject('socialIconsConfig', {})

const platformsToShow = computed(() => {
  // priority: explicit `platforms` prop (non-empty) -> plugin config -> default prop
  if (props.platforms && Array.isArray(props.platforms) && props.platforms.length) return props.platforms
  if (config && Array.isArray(config.platforms) && config.platforms.length) return config.platforms
  return props.platforms
})

const popoverStyle = computed(() => {
  const dir = (props.direction || 'bottom').toLowerCase()
  switch (dir) {
    case 'top':
      return { bottom: 'calc(100% + 8px)', left: '0', top: 'auto', right: 'auto' }
    case 'left':
      return { right: 'calc(100% + 8px)', top: '0', left: 'auto', bottom: 'auto' }
    case 'right':
      return { left: 'calc(100% + 8px)', top: '0', right: 'auto', bottom: 'auto' }
    case 'bottom':
    default:
      return { top: 'calc(100% + 8px)', left: '0', bottom: 'auto', right: 'auto' }
  }
})
</script>

<style scoped>
.share-root { position: relative; display: inline-block; }
.share-toggle { background: #1f2937; color: white; border: none; padding: 0.5rem 0.75rem; border-radius: 4px; cursor: pointer; }
.share-popover { position: absolute; top: calc(100% + 8px); left: 0; background: white; border: 1px solid rgba(0,0,0,.08); box-shadow: 0 6px 18px rgba(0,0,0,.08); padding: 0.5rem; border-radius: 6px; z-index: 50; }
.share-list { display: flex; gap: 0.5rem; list-style: none; margin: 0; padding: 0; }
.share-list li { display: inline-flex; }
.share-list a, .share-list span { display: inline-flex; align-items: center; justify-content: center; }
</style>
