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
      <social-icon type="mastodon" />
      <social-icon type="pocket" />
      <social-icon type="hackernews" />
      <social-icon type="tumblr" />
      <social-icon type="skype" />
      <social-icon type="viber" />
      <social-icon type="line" />
      <social-icon type="wechat" />
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
        <social-icon type="mastodon" share :title="shareTitle" :description="shareDescription" />
        <social-icon type="pocket" share :title="shareTitle" />
        <social-icon type="hackernews" share :title="shareTitle" />
        <social-icon type="tumblr" share :title="shareTitle" :description="shareDescription" />
        <social-icon type="line" share :title="shareTitle" />
        <social-icon type="skype" share :title="shareTitle" />
        <social-icon type="viber" share :title="shareTitle" />
        <social-icon type="sms" share :title="shareTitle" />
        <social-icon type="fas:envelope" share :title="shareTitle" />
      </div>
    </section>

    <section style="margin-top:1.5rem">
      <h2>Share popovers (examples)</h2>
      <div class="popover-examples">
        <div class="example">
          <h3>Default (bottom)</h3>
          <social-share :title="shareTitle" :description="shareDescription" :url="shareUrl" />
        </div>

        <div class="example">
          <h3>Top</h3>
          <social-share direction="top" :title="shareTitle" :description="shareDescription" :url="shareUrl" />
        </div>

        <div class="example">
          <h3>Left</h3>
          <social-share direction="left" :title="shareTitle" :description="shareDescription" :url="shareUrl" />
        </div>

        <div class="example">
          <h3>Right</h3>
          <social-share direction="right" :title="shareTitle" :description="shareDescription" :url="shareUrl" />
        </div>

        <div class="example">
          <h3>Custom platforms</h3>
          <social-share :platforms="['twitter','mastodon','pocket','hackernews','tumblr','line','email','sms']" :title="shareTitle" :description="shareDescription" :url="shareUrl" />
        </div>

        <div class="example">
          <h3>Icon-only (mono theme)</h3>
          <social-share theme="mono" :title="shareTitle" :description="shareDescription" :url="shareUrl" />
        </div>
      </div>
    </section>

    <footer class="repo-footer">
      Source code: <a href="https://github.com/kk12837/vue-social-icons" target="_blank" rel="noopener noreferrer">https://github.com/kk12837/vue-social-icons</a>
    </footer>
  </div>
</template>

<script>
import SocialIcon from '@/components/SocialIcon.vue'
import SocialShare from '@/components/SocialShare.vue'

export default {
  name: 'App',
  components: { SocialIcon, SocialShare },
  data() {
    return {
      shareTitle: 'Vue Social Network',
      shareDescription: 'Check out this Vue Social Network demo.',
      shareUrl: (typeof window !== 'undefined' && window.location) ? window.location.href : 'https://example.com'
    }
  }
}
</script>

<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin: 0; padding: 2rem; }
.icons { display: flex; gap: 1rem; align-items: center; margin-top: 1rem; }
.icons svg { vertical-align: middle; }

.popover-examples { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 0.75rem; }
.example { min-width: 180px; background: #fafafa; border: 1px solid rgba(0,0,0,.04); padding: 0.75rem; border-radius: 8px; }
.example h3 { margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 600; }

.repo-footer { margin-top: 2rem; color: #444; font-size: 0.95rem; }
.repo-footer a { color: #1f6feb; text-decoration: underline; }
</style>
