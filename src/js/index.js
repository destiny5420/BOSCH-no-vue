// import style
import '../style/index.css';

// // import font-awesome
// import '@fortawesome/fontawesome-free/js/all.js';

// import jquery
import $ from 'jquery';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ***** variable *****
let isDebug = false;

function onEventBinding() {
  $('#menu').on('click', function () {
    $('#menu-window').show();
  });

  $('#menu-window-close').on('click', function () {
    $('#menu-window').hide();
  });
}

function onGSAP() {
  console.log('*** onGSAP ***');

  // Regist Plugin
  gsap.registerPlugin(ScrollTrigger);

  let headerContent = gsap.timeline({
    scrollTrigger: {
      start: '0 top',
      markers: isDebug,
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
