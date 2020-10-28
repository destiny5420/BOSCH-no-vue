// import vue
// import Vue from 'vue/dist/vue';

// import jQuery
import $ from 'jquery';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function globalCommand() {
  console.log('*** onGlobalCommand ***');

  $('#home').on('click', () => {
    window.location.href = './index.html';
  });
}

export { globalCommand, $, gsap, ScrollTrigger };
// export default $;
