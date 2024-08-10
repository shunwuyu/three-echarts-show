import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.css';

createApp(App).mount('#app');

(function(doc, win){
    const fn = () => {
        const docEl = doc.documentElement,
        clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener('resize', fn);
    doc.addEventListener('DOMContentLoaded', fn);
})(document, window);