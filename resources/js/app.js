import { createApp, h } from 'vue';
import { createInertiaApp, Link, Head } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import route from './route.js';

InertiaProgress.init();

createInertiaApp({
    title: title => {
      let appName = process.env.MIX_APP_NAME;
      return appName ? `${title} - ${appName}` : title;
    },
    resolve: name => require(`./Pages/${name}`),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });
        app.config.globalProperties.route = route;
        app.use(plugin);
        app.component('inertia-link', Link);
        app.component('inertia-head', Head);
        app.mount(el);
    },
})
