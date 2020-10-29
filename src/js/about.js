import '../style/about.css';

import { globalCommand, $, gsap, ScrollTrigger } from '../js/global.js';

// ***** variable *****
let isDebug = false;
let anim_open_menu;
let anim_close_menu;
let anim_sloganShow;
let animsDescription = [];
let anim_description;
let anim_proxy;

let menu = (function () {
  var menuOpen = false;

  return {
    toggleMenu: function () {
      if (menuOpen) {
        menuOpen = false;
        $('#menu-button').removeClass('show');
        anim_close_menu.restart();
      } else {
        menuOpen = true;
        $('#menu-button').addClass('show');
        anim_open_menu.restart();
      }
    },
  };
})();

function onEventBinding() {
  // keydown
  $(document).on('keydown', function (e) {
    switch (e.keyCode) {
      case 65: // A
        break;
      default:
        break;
    }
  });

  // menu button
  $('#menu-button').on('click', function (e) {
    menu.toggleMenu();
  });

  // global binging
  globalCommand();
}

function onGSAP() {
  console.log('*** onGSAP ***');

  // Regist Plugin
  gsap.registerPlugin(ScrollTrigger);

  anim_sloganShow = gsap.timeline({ delay: 1 });

  let sloganWordList = document.querySelectorAll('.slogan .text-char');
  sloganWordList.forEach((element) => {
    anim_sloganShow.from(
      element,
      { duration: 0.75, opacity: 0, y: 65, ease: 'power1.out' },
      '-=0.7',
    );
  });

  // description content
  let tmpAry = Array.from(document.querySelectorAll('.description .content-wrap .text-effect'));
  for (let i = 0; i < tmpAry.length; i++) {
    animsDescription.push(
      gsap.timeline({ scrollTrigger: { start: '100vh top', markers: isDebug, end: '+=0' } }),
    );
  }

  tmpAry.forEach((element, index) => {
    let list = Array.from(element.children);
    list.forEach((element) => {
      animsDescription[index].from(
        element,
        { duration: 0.75, opacity: 0.5, y: 65, ease: 'power1.out' },
        '-=0.735',
      );
    });
  });

  // description tip-box
  anim_description = gsap.timeline({
    scrollTrigger: {
      trigger: '.tip-box',
      start: '-650px top',
      markers: isDebug,
      end: '+=0',
    },
  });

  anim_description
    .from('.tip-box #img-head', { duration: 1.5, opacity: 0, y: 200 })
    .from('.tip-box .right', { duration: 1, opacity: 0, y: -60 }, '-=0.95');

  // proxy left
  anim_proxy = gsap.timeline({
    scrollTrigger: { trigger: '.proxy', start: '-400px top', markers: isDebug, end: '+=0' },
  });
  anim_proxy
    .from('.proxy .info .title', { duration: 1.5, opacity: 0, y: 60 })
    .from('.proxy .info .content', { duration: 1, opacity: 0, y: 60 }, '-=1');

  // menu
  anim_open_menu = gsap.timeline({ paused: true }).to($('#menu-window'), {
    opacity: 1,
    duration: 1,
    onComplete: () => {
      $('#menu-window')[0].style.pointerEvents = 'auto';
    },
  });

  anim_close_menu = gsap.timeline({ paused: true }).to($('#menu-window'), {
    opacity: 0,
    duration: 1,
    onStart: () => {
      $('#menu-window')[0].style.pointerEvents = 'none';
    },
  });
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
