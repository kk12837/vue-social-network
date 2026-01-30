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
import { brandMap } from '../constants/brandMap'
import { brandColors } from '../constants/brandColors'

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

const icon = computed(() => {
  if (!props.type) return null
  const raw = props.type.trim().toLowerCase()

  // allow explicit prefix like "fab:facebook" or "fas:envelope"
  if (raw.includes(':')) {
    const [prefix, name] = raw.split(':')
    return [prefix, name]
  }

  // brand mapping for common social names
  if (brandMap[raw]) {
    const mapped = brandMap[raw]
    if (Array.isArray(mapped)) return mapped
    if (typeof mapped === 'string' && mapped.includes(':')) {
      const [p, n] = mapped.split(':')
      return [p, n]
    }
    return ['fab', mapped]
  }

  // small explicit fallbacks for non-brand icons
  if (raw === 'email' || raw === 'envelope') return ['fas', 'envelope']

  // default to brand prefix with normalized name
  const normalized = raw.replace(/\s+/g, '-').replace(/^@/, '')
  return ['fab', normalized]
})

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
    case 'email':
      return `mailto:?subject=${t}&body=${d}%0A%0A${u}`
    case 'mastodon':
      return `https://mastodon.social/share?text=${t}%20${u}`
    case 'pocket':
      return `https://getpocket.com/save?url=${u}&title=${t}`
    case 'hackernews':
      return `https://news.ycombinator.com/submitlink?u=${u}&t=${t}`
    case 'messenger':
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`
    case 'tumblr':
      return `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${u}&title=${t}&caption=${d}`
    case 'skype':
      return `https://web.skype.com/share?url=${u}`
    case 'viber':
      return `viber://forward?text=${t}%20${u}`
    case 'line':
      return `https://social-plugins.line.me/lineit/share?url=${u}`
    case 'sms':
      return `sms:?&body=${t}%20${u}`
    default:
      return ''
  }
}

const shareHref = computed(() => {
  if (!props.share) return null
  const platform = props.type.trim().toLowerCase().replace(/^fab:/, '')
  const desc = props.description && props.description.trim() ? props.description : currentUrl.value
  return buildShareHref(platform, currentUrl.value, props.title, desc)
})

</script>
