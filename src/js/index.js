// import style
import '../style/index.css';

// import image
import '../images/home_logo.png';
import '../images/home_img_01.png';
import '../images/home_img_02.png';
import '../images/home_img_03.png';
import '../images/home_img_04.png';
import '../images/home_img_05.png';
import '../images/home_txt_00.png';
import '../images/home_txt_01.png';

// import global.js
import { globalCommand, $, gsap, ScrollTrigger } from '../js/global.js';
import formula from '../js/formula';

// ***** variable *****
let isDebug = false;
let headTimeline;

let menu = (function () {
  var menuOpen = false;

  return {
    toggleMenu: function () {
      if (menuOpen) {
        menuOpen = false;
        $('#menu').removeClass('show');
        $('#menu-window').fadeOut(100);
      } else {
        menuOpen = true;
        $('#menu').addClass('show');
        $('#menu-window').fadeIn(100);
      }
    },
  };
})();

function onEventBinding() {
  // menu button
  $('#menu').on('click', function (e) {
    menu.toggleMenu();
  });

  // about more
  $('#more-about').on('click', function (e) {
    console.log('be clicked!!');
    window.location.href = './about.html';
  });

  // global binging
  globalCommand();

  $('.faq-container #btn-question').on('click', () => {
    window.location.href = './support.html';
  });
}

function onGSAP() {
  console.log('*** onGSAP ***');

  // Regist Plugin
  gsap.registerPlugin(ScrollTrigger);

  headTimeline = gsap
    .timeline({ defaults: { ease: 'power1.out' }, paused: true })
    .from($('header #content .sub-title'), {
      y: -50,
      opacity: 0,
      duration: 1,
    })
    .from($('header .left .title >div'), { maxHeight: 0, duration: 1 }, '-=0.5')
    .from($('header .right .bg'), { x: 100, opacity: 0, duration: 1.5 }, '-=1.25')
    .from($('header .right img'), { y: 100, opacity: 0, duration: 1.5 }, '-=1');

  Array.from($('header #slogan .text-char')).forEach((e, index) => {
    gsap
      .timeline({
        onComplete: () => (index === 7 ? headTimeline.play() : null),
      })
      .from(e, { y: 100, duration: 1, ease: 'linear', delay: index * 0.035 })
      .to(e, { y: -100, duration: 0.75, ease: 'linear', delay: 1.25 });
  });

  var imgList = Array.from($('.faq-container #faq-blocks-bg >div'));
  imgList.forEach((element, index) => {
    var duationTime = formula.getRandomInt(10, 55);
    // console.log('duationTime: ', duationTime);
    gsap.to(element, {
      duration: duationTime,
      x: index % 2 === 0 ? 1218 : -1220,
      repeat: -1,
      ease: 'linear',
    });
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
