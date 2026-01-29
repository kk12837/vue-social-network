# vue-social-icons

Vue social icons and sharing component

Install

```bash
npm install vue-social-icons
# or for local/dev testing
# npm install ../path/to/vue-social-network-1.0.0.tgz
```

Usage

Global plugin:

```js
import { createApp } from 'vue'
import App from './App.vue'
import VueSocialIcons from 'vue-social-icons'

const app = createApp(App)
app.use(VueSocialIcons)
app.mount('#app')
```

Named import:

```js
import { SocialIcon } from 'vue-social-icons'
// register locally
export default { components: { SocialIcon } }
```

Props (high level)

- `type` (String, required): social platform (e.g. `twitter`, `facebook`, `linkedin`, or explicit `fab:facebook`)
- `size` (String): FontAwesome size token
- `theme` (String): `color` (default) or `blankandwhite`
- `share` (Boolean): when true, component becomes an anchor linking to the platform share URL
- `title`, `description`: used to populate share messages

Notes

- `vue` and `@fortawesome/vue-fontawesome` are peer dependencies — install them in your project.
- Build is done with Vite library mode. See `vite.config.lib.js`.