
<template>
  <component
    :is="share ? 'a' : 'span'"
    :href="share ? shareHref : null"
    target="_blank"
    rel="noopener noreferrer"
    role="img"
    :aria-label="computedAriaLabel || null"
    :title="computedTitle || null"
    :style="themeStyle"
  >
    <font-awesome-icon
      v-if="icon"
      class="icon"
      :icon="icon"
      :size="size"
    />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, required: true },
  size: { type: String, default: null },
  ariaLabel: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  url: { type: String, default: '' },
  share: { type: Boolean, default: false },
  theme: { type: String, default: 'color' } // 'color' or 'blankandwhite'
})

const brandMap = {
  facebook: 'facebook-f',
  twitter: 'twitter',
  instagram: 'instagram',
  linkedin: 'linkedin-in',
  youtube: 'youtube',
  github: 'github',
  tiktok: 'tiktok',
  pinterest: 'pinterest',
  reddit: 'reddit-alien',
  snapchat: 'snapchat-ghost',
  whatsapp: 'whatsapp',
  telegram: 'telegram',
  discord: 'discord',
  medium: 'medium',
  steam: 'steam',
  twitch: 'twitch',
  dribbble: 'dribbble',
  behance: 'behance'
}

const icon = computed(() => {
  if (!props.type) return null
  const raw = props.type.trim().toLowerCase()

  // allow explicit prefix like "fab:facebook" or "fas:envelope"
  if (raw.includes(':')) {
    const [prefix, name] = raw.split(':')
    return [prefix, name]
  }

  // brand mapping for common social names
  if (brandMap[raw]) return ['fab', brandMap[raw]]

  // default to brand prefix with normalized name
  const normalized = raw.replace(/\s+/g, '-').replace(/^@/, '')
  return ['fab', normalized]
})

const brandColors = {
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  instagram: '#E4405F',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
  github: '#181717',
  tiktok: '#000000',
  pinterest: '#BD081C',
  reddit: '#FF4500',
  snapchat: '#FFFC00',
  whatsapp: '#25D366',
  telegram: '#0088CC',
  discord: '#5865F2',
  medium: '#00AB6C',
  steam: '#000000',
  twitch: '#9146FF',
  dribbble: '#EA4C89',
  behance: '#1769FF'
}

const themeStyle = computed(() => {
  const raw = props.type ? props.type.trim().toLowerCase() : ''
  const platform = raw.includes(':') ? raw.split(':')[1] : raw
  const normalized = platform.replace(/^@/, '').replace(/\s+/g, '-')

  if (props.theme === 'blankandwhite') {
    return { color: '#000' }
  }

  // 'color' theme: try to apply brand color when known
  const c = brandColors[normalized]
  if (c) return { color: c }
  return {}
})

const computedTitle = computed(() => props.title || props.ariaLabel || '')

const computedAriaLabel = computed(() => props.ariaLabel || props.title || '')

const currentUrl = computed(() => {
  if (props.url) return props.url
  if (typeof window !== 'undefined' && window.location) return window.location.href
  return ''
})

function buildShareHref(platform, url, title, description) {
  const u = encodeURIComponent(url || '')
  const t = encodeURIComponent(title || '')
  const d = encodeURIComponent(description || '')

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${t}&url=${u}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`
    case 'linkedin':
      return `https://www.linkedin.com/shareArticle?mini=true&url=${u}&title=${t}&summary=${d}`
    case 'telegram':
      return `https://t.me/share/url?url=${u}&text=${t}`
    case 'whatsapp':
      return `https://api.whatsapp.com/send?text=${t}%20${u}`
    case 'pinterest':
      return `https://pinterest.com/pin/create/button/?url=${u}&description=${d}`
    case 'reddit':
      return `https://www.reddit.com/submit?url=${u}&title=${t}`
    default:
      return ''
  }
}

const shareHref = computed(() => {
  if (!props.share) return null
  const platform = props.type.trim().toLowerCase().replace(/^fab:/, '')
  return buildShareHref(platform, currentUrl.value, props.title, props.description)
})

</script>
