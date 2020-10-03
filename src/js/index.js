// import style
import '../style/index.css';

// import font-awesome
import '@fortawesome/fontawesome-free/js/all.js';

// import jquery
import $ from 'jquery';

// import scroll-magic
import ScrollMagic from 'ScrollMagic';
import 'ScrollMagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function onInitScrollMagic() {
  console.log('*** onInitScrollMagic ***');
  let controller = new ScrollMagic.Controller({});

  new ScrollMagic.Scene({
    triggerElement: '#btn-about',
    duration: 100,
    offset: -100,
  })
    .addIndicators({
      name: 'about BOSCH',
    })
    .addTo(controller);
}

function onGSAP() {
  console.log('*** onGSAP ***');

  // Regist Plugin
  gsap.registerPlugin(ScrollTrigger);

  let headerContent = gsap.timeline({
    scrollTrigger: {
      start: '0 top',
      markers: true,
    },
  });

  headerContent.from('header p', {
    x: 100,
    duration: 1,
    opacity: 0,
  });

  let buttons = gsap.timeline({
    scrollTrigger: {
      trigger: '.button-container',
      start: 'top center',
      markers: true,
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

  // register event to element
  $('#menu').on('click', function () {
    $('#menu-window').show();
  });

  $('#menu-window-close').on('click', function () {
    $('#menu-window').hide();
  });

  // onInitScrollMagic();
  onGSAP();
}

$(function () {
  onAwake();
});
