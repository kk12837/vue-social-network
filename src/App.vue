<template>
  <div id="app">
    <h1>Vue Social Network</h1>
    <div class="icons">
      <social-icon type="facebook" />
      <social-icon type="twitter" />
      <social-icon type="instagram" />
      <social-icon type="linkedin" />
      <social-icon type="github" />
      <social-icon type="tiktok" />
      <social-icon type="youtube" />
      <social-icon type="fas:envelope" ariaLabel="Email" />
    </div>

    <section class="share">
      <h2>Share this page</h2>
      <div class="icons">
        <social-icon
          type="twitter"
          share
          :title="shareTitle"
          :description="shareDescription"
        />

        <social-icon type="facebook" share :title="shareTitle" />

        <social-icon
          type="linkedin"
          share
          :title="shareTitle"
          :description="shareDescription"
        />

        <social-icon type="telegram" share :title="shareTitle" />
        <social-icon type="whatsapp" share :title="shareTitle" />
        <social-icon type="reddit" share :title="shareTitle" />
        <social-icon type="pinterest" share :title="shareTitle" :description="shareDescription" />
      </div>
    </section>
  </div>
</template>

<script>
import SocialIcon from '@/components/SocialIcon.vue'

export default {
  name: 'App',
  components: { SocialIcon },
  data() {
    return {
      shareTitle: 'Vue Social Network',
      shareDescription: 'Check out this Vue Social Network demo.'
    }
  }
}
</script>

<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin: 0; padding: 2rem; }
.icons { display: flex; gap: 1rem; align-items: center; margin-top: 1rem; }
.icons svg { vertical-align: middle; }
</style>
