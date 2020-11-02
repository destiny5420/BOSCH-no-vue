import '../style/about.css';

import {
  onGlobalInit,
  onGlobalBinding,
  onGlobalLoadingData,
  $,
  gsap,
  ScrollTrigger,
  deviceMode,
} from '../js/global.js';

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

function onInit() {
  onGlobalInit();

  console.log('*** onLoadingData ***');
}

async function onLoadingData() {
  onGlobalLoadingData();

  console.log('*** onLoadingData ***');
}

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
  onGlobalBinding();
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

  // // description content
  // let tmpAry = Array.from(document.querySelectorAll('.description .content-wrap .text-effect'));
  // for (let i = 0; i < tmpAry.length; i++) {
  //   animsDescription.push(
  //     gsap.timeline({ scrollTrigger: { start: '100vh top', markers: isDebug, end: '+=0' } }),
  //   );
  // }

  // tmpAry.forEach((element, index) => {
  //   let list = Array.from(element.children);
  //   list.forEach((element) => {
  //     animsDescription[index].from(
  //       element,
  //       { duration: 0.75, opacity: 0.5, y: 65, ease: 'power1.out' },
  //       '-=0.735',
  //     );
  //   });
  // });

  var startVar = deviceMode === 'phone' ? 'top 25%' : 'top 35%';

  gsap
    .timeline({ scrollTrigger: { trigger: '.description', start: startVar, markers: true } })
    .from($('.description .content-wrap'), {
      duration: 1.25,
      opacity: 0,
      y: 85,
      ease: 'power1.out',
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
  anim_open_menu = gsap
    .timeline({ paused: true })
    .to($('#menu-window'), {
      opacity: 1,
      duration: 0.75,
      ease: 'power1.out',
      onStart: () => {
        $('#menu-window')[0].style.pointerEvents = 'auto';
      },
    })
    .from(
      $('#menu-window .top'),
      {
        x: -75,
        duration: 0.85,
        ease: 'power1.out',
      },
      '-=1',
    )
    .from(
      $('#menu-window .bottom'),
      {
        x: -75,
        duration: 0.85,
        opacity: 0,
        ease: 'power1.out',
        delay: 0.25,
      },
      '-=1',
    );

  anim_close_menu = gsap
    .timeline({ paused: true })
    .to($('#menu-window'), {
      opacity: 0,
      duration: 0.75,
      ease: 'power1.in',
      onStart: () => {
        $('#menu-window')[0].style.pointerEvents = 'none';
      },
    })
    .to(
      $('#menu-window .top'),
      {
        x: 100,
        duration: 1,
        ease: 'power1.in',
      },
      '-=1',
    )
    .to(
      $('#menu-window .bottom'),
      {
        x: 100,
        duration: 1,
        ease: 'power1.in',
        delay: 0.25,
      },
      '-=1',
    );
}

async function onAwake() {
  console.log('*** onAwake ***');

  onInit();
  await onLoadingData();
  onEventBinding();
  onGSAP();
  $('#loading-bar').fadeOut();
}

$(function () {
  onAwake();
});
