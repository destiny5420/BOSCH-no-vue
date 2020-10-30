// import vue
// import Vue from 'vue/dist/vue';

// import font awesome
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';

// import jQuery
import $ from 'jquery';

// import polyfill
import '@babel/polyfill';

// import link json
import link_collections from '../files/jsons/link.json';
import { apiLinkReference } from './api.js';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CSSRulePlugin from 'gsap/CSSRulePlugin';

// *** Parameter ***
var isDebug = true;

function globalCommand() {
  console.log('*** onGlobalCommand ***');

  $('#home').on('click', () => {
    window.location.href = './index.html';
  });

  settingMediaLink();
}

async function settingMediaLink() {
  var data = {};

  if (isDebug) {
    data = link_collections;
  } else {
    await apiLinkReference().then((res) => {
      data = res.data;
    });
  }

  // console.log('data: ', data);

  Array.from($('.link-fb')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(data.fb, '_blank');
    });
  });

  Array.from($('.link-yt')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(data.yt, '_blank');
    });
  });

  Array.from($('.link-line')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(data.line, '_blank');
    });
  });

  Array.from($('.link-ig')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(data.ig, '_blank');
    });
  });
}

export { globalCommand, $, gsap, ScrollTrigger, CSSRulePlugin, isDebug };
// export default $;
