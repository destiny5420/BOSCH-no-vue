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
let headTimeline;
let anim_open_menu;
let anim_close_menu;
let anim_about;
let anim_about_ID = 'anim_about';
let anim_install;
let anim_install_ID = 'anim_install';

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
  // menu button
  $('#menu-button').on('click', function (e) {
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
    .to($('.slogan-wrap'), {
      opacity: 0,
      duration: 1,
      onComplete: () => ($('.slogan-wrap')[0].style.pointerEvents = 'none'),
    })
    .from(
      $('header #content .sub-title'),
      {
        y: -50,
        opacity: 0,
        duration: 1,
      },
      '-=0.5',
    )
    .from($('header .left .title >div'), { maxHeight: 0, duration: 1 }, '-=0.5')
    .from($('header .right .bg'), { x: 100, opacity: 0, duration: 1.5 }, '-=1.25')
    .from($('header .right img'), { y: 100, opacity: 0, duration: 1.5 }, '-=1')
    .from($('header #scroll-point'), { y: -100, opacity: 0, duration: 1 }, '-=1');

  Array.from($('.slogan-wrap #slogan .text-char')).forEach((e, index) => {
    gsap
      .timeline({
        onComplete: () => {
          onHeadAnimComplete(index);
        },
      })
      .from(e, { y: 100, duration: 1, ease: 'power1.out', delay: index * 0.015 })
      .to(e, { y: -100, duration: 1, ease: 'power1.in', delay: 1 });
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

  // top pointer
  gsap
    .timeline({ repeat: -1 })
    .from('#top-point', { delay: 0.5, y: 20, opacity: 0, duration: 0.75, ease: 'linear' })
    .to('#top-point', { y: -12, opacity: 0, duration: 0.75, ease: 'power1.out' });

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

  // about animation
  anim_about = gsap
    .timeline({
      scrollTrigger: {
        trigger: $('.about-us .bottom'),
        start: 'top 65%',
        markers: true,
        id: anim_about_ID,
      },
    })
    .from($('.about-us .bottom #head'), { x: -100, opacity: 0, duration: 1, ease: 'power1.out' })
    .from(
      $('.about-us .bottom #description'),
      { x: 100, opacity: 0, duration: 1, ease: 'power1.out' },
      '-=0.75',
    )
    .from(
      $('.about-us .bottom #content .title'),
      {
        y: -100,

        duration: 1,
        ease: 'power1.out',
      },
      '-=0.85',
    )
    .from(
      $('.about-us .bottom #content .sub-title'),
      {
        y: -100,
        duration: 1,
        ease: 'power1.out',
      },
      '-=0.9',
    )
    .from(
      $('.about-us #txt-1'),
      {
        y: -100,
        opacity: 0,
        duration: 0.75,
        ease: 'power1.out',
      },
      '-=0.65',
    )
    .from(
      $('.about-us #txt-2'),
      {
        y: -100,
        opacity: 0,
        duration: 0.75,
        ease: 'power1.out',
      },
      '-=0.72',
    )
    .from(
      $('.about-us #txt-3'),
      {
        y: -100,
        opacity: 0,
        duration: 0.75,
        ease: 'power1.out',
      },
      '-=0.72',
    )
    .from(
      $('.about-us #more-about'),
      {
        y: -100,
        opacity: 0,
        duration: 0.75,
        ease: 'power1.out',
      },
      '-=0.72',
    );

  ScrollTrigger.getById(anim_about_ID).disable();

  anim_install = gsap
    .timeline({
      scrollTrigger: {
        trigger: $('.install-container'),
        start: '+200px 75%',
        markers: true,
        id: anim_install_ID,
      },
    })
    .from($('.install-container #install-title-1'), {
      maxHeight: 0,
      duration: 0.9,
      ease: 'linear',
    })
    .from(
      $('.install-container #install-title-2'),
      { maxHeight: 0, duration: 0.9, ease: 'linear' },
      '-=0.8',
    )
    .from(
      $('.install-container #install-title-3'),
      { maxHeight: 0, opacity: 0, duration: 0.75, ease: 'linear' },
      '-=.85',
    );

  ScrollTrigger.getById(anim_install_ID).disable();
}

function onHeadAnimComplete(index) {
  window.scrollTo(0, 0);
  index === 7 ? headTimeline.play() : null;

  ScrollTrigger.getById(anim_about_ID).enable();
  ScrollTrigger.getById(anim_install_ID).enable();
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
