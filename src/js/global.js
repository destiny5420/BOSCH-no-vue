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
var deviceMode;

function onGlobalInit() {
  console.warn(
    '---> onGlobalInit / innerWidth: %d / window screen width: %d',
    window.innerWidth,
    window.screen.width,
  );

  // phone
  if (window.screen.width <= 375) {
    deviceMode = 'phone';
  } else if (window.screen.width >= 1920) {
    deviceMode = '>=1920';
  }
}

function onGlobalBinding() {
  console.warn('---> onGlobalBinding');

  $('#home').on('click', () => {
    window.location.href = './index.html';
  });

  settingMediaLink();
}

function onGlobalLoadingData() {
  console.warn('---> onGlobalLoadingData ***');

  // Modify bottom svg size
  var colorElement = $('.footer .bottom svg')[0];
  switch (deviceMode) {
    case 'phone':
      colorElement.setAttribute('viewBox', '0 0 1920 70');
      colorElement.setAttribute('height', '82');
      break;
    case '>=1920':
      colorElement.setAttribute('viewBox', '0 0 1920 15');
      colorElement.setAttribute('height', '17');
      break;
    default:
      // colorElement.setAttribute('viewBox', '0 0 1920 15');
      // colorElement.setAttribute('height', '17');
      break;
  }
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

export {
  onGlobalInit,
  onGlobalBinding,
  onGlobalLoadingData,
  $,
  gsap,
  ScrollTrigger,
  CSSRulePlugin,
  isDebug,
  deviceMode,
};
// export default $;
