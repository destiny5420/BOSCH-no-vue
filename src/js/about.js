import '../style/about.css';

import {
  onGlobalInit,
  onGlobalLoadingData,
  onGlobalBinding,
  onGlobalGSAP,
  $,
  gsap,
  ScrollTrigger,
  deviceMode,
} from '../js/global.js';

// ***** variable *****
let anim_sloganShow;
let animsDescription = [];
let anim_description;
let anim_proxy;

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

  // global binging
  onGlobalBinding();

  $('html').css('scroll-behavior', 'smooth');
}

function onGSAP() {
  onGlobalGSAP();
  console.log('*** onGSAP ***');

  // Regist Plugin
  gsap.registerPlugin(ScrollTrigger);

  anim_sloganShow = gsap.timeline({ delay: 1 });

  let vectorTimeline = gsap.from($('.vector'), { opacity: 0, duration: 0.5, paused: true });

  let sloganWordList = document.querySelectorAll('.slogan .text-char');
  sloganWordList.forEach((element, index) => {
    anim_sloganShow.from(
      element,
      {
        duration: 0.75,
        opacity: 0,
        y: 65,
        ease: 'power1.out',
        onComplete: () => {
          if (index === sloganWordList.length - 1) {
            vectorTimeline.play();
          }
        },
      },
      '-=0.7',
    );
  });

  var startVar = deviceMode === 'phone' ? 'top 25%' : 'top 35%';

  gsap
    .timeline({ scrollTrigger: { trigger: '.description', start: startVar } })
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
      end: '+=0',
    },
  });

  anim_description
    .from('.tip-box #img-head', { duration: 1.5, opacity: 0, y: 200 })
    .from('.tip-box .right', { duration: 1, opacity: 0, y: -60 }, '-=0.95');

  // proxy left
  anim_proxy = gsap.timeline({
    scrollTrigger: { trigger: '.proxy', start: '-400px top', end: '+=0' },
  });
  anim_proxy
    .from('.proxy .info .title', { duration: 1.5, opacity: 0, y: 60 })
    .from('.proxy .info .content', { duration: 1, opacity: 0, y: 60 }, '-=1');

  // top pointer
  gsap
    .timeline({ repeat: -1 })
    .fromTo('#top-point', { y: 20 }, { y: -20, duration: 1.5, ease: 'power2.out' })
    .fromTo('#top-point', { y: -20 }, { y: 20, duration: 1.5, ease: 'power2.out' });
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

// function parsingUrl() {
//   console.warn('--------  parsingUrl  --------');
//   let parseUrl = new URL(location.href);
//   console.warn(parseUrl.href);
//   var tmpSearch = new URLSearchParams(parseUrl.search);
//   for (const pair of tmpSearch.entries()) {
//     console.warn(`Key: ${pair[0]} / Value: ${pair[1]}`);
//   }
// }
