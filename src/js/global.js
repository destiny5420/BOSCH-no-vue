// import vue
// import Vue from 'vue/dist/vue';

// import font awesome
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';

// import jQuery
import $ from 'jquery';

// import link json
import link_collections from '../files/jsons/link.json';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function globalCommand() {
  console.log('*** onGlobalCommand ***');

  $('#home').on('click', () => {
    window.location.href = './index.html';
  });

  Array.from($('.link-fb')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(link_collections.fb, '_blank');
    });
  });

  Array.from($('.link-yt')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(link_collections.yt, '_blank');
    });
  });

  Array.from($('.link-line')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(link_collections.line, '_blank');
    });
  });

  Array.from($('.link-ig')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(link_collections.ig, '_blank');
    });
  });
}

export { globalCommand, $, gsap, ScrollTrigger };
// export default $;
