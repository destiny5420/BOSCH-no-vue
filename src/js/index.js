// import style
import '../style/index.css';

// import vue
// import Vue from 'vue/dist/vue';

// import jquery
import $ from 'jquery';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ***** variable *****
let isDebug = false;

function onEventBinding() {
  $('#menu').on('click', function () {
    $('#menu-window').fadeIn(100);
  });

  $('#menu-window-close').on('click', function () {
    $('#menu-window').fadeOut(100);
  });
}

function onGSAP() {
  console.log('*** onGSAP ***');

  // Regist Plugin
  gsap.registerPlugin(ScrollTrigger);

  let headerContent = gsap.timeline({
    scrollTrigger: {
      start: '5vh top',
      markers: false,
    },
  });

  headerContent.to('header p', {
    x: 0,
    opacity: 1,
    duration: 1,
  });

  let buttons = gsap.timeline({
    scrollTrigger: {
      trigger: '.button-container',
      start: 'top center',
      markers: isDebug,
    },
  });
  buttons
    .from('#btn-about', { x: 100, opacity: 0, duration: 1 })
    .from(
      '#btn-install',
      {
        x: -100,
        opacity: 0,
        duration: 1,
      },
      '-=0.75',
    )
    .from(
      '#btn-issue',
      {
        x: 100,
        opacity: 0,
        duration: 1,
      },
      '-=0.75',
    )
    .from(
      '#btn-contact',
      {
        x: -100,
        opacity: 0,
        duration: 1,
      },
      '-=0.75',
    );
}

function onAwake() {
  console.log('*** onAwake ***');

  onEventBinding();
  onGSAP();
  $('#loading-bar').fadeOut();
}

$(function () {
  onAwake();
});
