import SocialIcon from './components/SocialIcon.vue'

export { SocialIcon }

export default {
  install(app) {
    app.component('SocialIcon', SocialIcon)
  }
}
