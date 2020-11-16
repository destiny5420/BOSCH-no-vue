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
import '../images/home_product_02_1.png';
import '../images/home_product_02_2.png';
import '../images/bosch-mask.png';

import bodymovin from 'lottie-web';

// import global.js
import {
  onGlobalInit,
  onGlobalBinding,
  onGlobalLoadingData,
  $,
  gsap,
  ScrollTrigger,
  CSSRulePlugin,
  deviceMode,
} from '../js/global.js';
import formula from '../js/formula';

// ***** variable *****
let headTimeline;
let headTextBoschTimeline = [];
let anim_open_menu;
let anim_close_menu;
let anim_about;
let anim_about_ID = 'anim_about';
let anim_install;
let anim_install_ID = 'anim_install';
let anim_install_pic_1;
let anim_install_pic_1_ID = 'anim_install_pic_1';
let anim_install_pic_2;
let anim_install_pic_2_ID = 'anim_install_pic_2';
let anim_faq;
let anim_faq_ID = 'anim_faq';
let curProductIndex = -1;
let curProductTarget = null;
let introList = [];
let anim_intro_show_list = [];

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

// ***************** Struct Methods *****************
function onInit() {
  onGlobalInit();

  console.log('*** onLoadingData ***');
}

async function onLoadingData() {
  onGlobalLoadingData();

  console.log('*** onLoadingData ***');
}

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
  onGlobalBinding();

  $('.faq-container #btn-question').on('click', () => {
    window.location.href = './support.html';
  });

  var btnList = Array.from($('.products .btn-more'));
  introList = Array.from($('.products .intro'));
  console.log('introList: ', introList);
  btnList.forEach((element, index) => {
    element.addEventListener('mouseenter', function (mouse) {
      if (curProductTarget !== null) {
        curProductTarget.classList.remove('productHover');
        introList[curProductIndex].classList.add('unfocus');
      }

      curProductTarget = element;
      curProductIndex = index;

      introList[curProductIndex].classList.remove('unfocus');
      curProductTarget.classList.add('productHover');

      anim_intro_show_list[index].restart();
    });
  });
}

function onGSAP() {
  console.log('*** onGSAP ***');

  // Regist Plugin
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(CSSRulePlugin);

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
    // .from($('header .left .title >div'), { maxHeight: 0, duration: 1 }, '-=0.5')
    .from(
      $('header .right #svg-gray-circle-block'),
      { x: 100, opacity: 0, duration: 1.5 },
      '-=1.25',
    )
    .from($('header .right .pic-frame'), { y: 100, opacity: 0, duration: 1.5 }, '-=1')
    .from($('header #scroll-point'), { y: -100, opacity: 0, duration: 1 }, '-=1');

  var strokeLines = Array.from($('#stroke-line path'));
  strokeLines.forEach((el) => {
    headTextBoschTimeline.push(
      gsap.to(el, { duration: 3, strokeDashoffset: 0, ease: 'power1.out', paused: true }),
    );
  });

  Array.from($('.slogan-wrap #slogan .text-char')).forEach((e, index) => {
    gsap
      .timeline({
        onComplete: () => {
          onHeadAnimComplete(index);
        },
      })
      .from(e, { y: 100, duration: 1, ease: 'power3.out', delay: index * 0.03 })
      .to(e, { y: -100, duration: 0.75, ease: 'power3.in', delay: 1.5 });
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
    .fromTo('#scroll-point', { y: 0 }, { y: -40, duration: 1.5, ease: 'power2.out' })
    .fromTo('#scroll-point', { y: -40 }, { y: 0, duration: 1.5, ease: 'power2.out' });

  // top pointer
  gsap
    .timeline({ repeat: -1 })
    .fromTo('#top-point', { y: 20 }, { y: -20, duration: 1.5, ease: 'power2.out' })
    .fromTo('#top-point', { y: -20 }, { y: 20, duration: 1.5, ease: 'power2.out' });

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
        start: deviceMode === 'phone' ? '-=150 65%' : 'top 65%',
        id: anim_about_ID,
        // markers: true
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
      deviceMode === 'phone' ? '-=1' : '-=0.85',
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
      $('.about-us #more-about'),
      {
        y: -25,
        opacity: 0,
        duration: 0.75,
        ease: 'power1.out',
      },
      '-=0.1',
    );
  ScrollTrigger.getById(anim_about_ID).disable();

  anim_install = gsap
    .timeline({
      scrollTrigger: {
        trigger: $('.install-container'),
        start: '+200px 75%',
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

  console.warn('** infoImgPseudo start **');
  var infoImgPseudo01 = CSSRulePlugin.getRule('#info-group-1 .info-image-block::after');
  anim_install_pic_1 = gsap
    .timeline({
      scrollTrigger: {
        trigger: $('.info-container #info-group-1'),
        start: 'top 65%',
        id: anim_install_pic_1_ID,
      },
    })
    // .from(infoImgPseudo01, { duration: 1, cssRule: { translateX: 0 }, ease: 'power1.out' })
    .from($('#info-group-1 .info-image-block'), {
      x: -100,
      duration: 1,
      opacity: 0,
      ease: 'power1.out',
    })
    .from($('#info-group-1 #info-1'), { maxHeight: 0, duration: 1 }, '-=0.8')
    .from($('#info-group-1 #info-2'), { maxHeight: 0, duration: 1 }, '-=0.8')
    .from($('#info-group-1 #info-3'), { y: -25, opacity: 0, duration: 1 }, '-=0.8');
  ScrollTrigger.getById(anim_install_pic_1_ID).disable();

  var infoImgPseudo02 = CSSRulePlugin.getRule('#info-group-2 .info-image-block::after');
  anim_install_pic_2 = gsap
    .timeline({
      scrollTrigger: {
        trigger: $('.info-container #info-group-2 .info-image-block'),
        start: 'top 65%',
        id: anim_install_pic_2_ID,
      },
    })
    // .from(infoImgPseudo02, {
    //   delay: 0.15,
    //   duration: 1,
    //   cssRule: { translateX: 0 },
    //   ease: 'power1.out',
    // })
    .from($('#info-group-2 .info-image-block'), {
      x: -100,
      duration: 1,
      opacity: 0,
      ease: 'power1.out',
    })
    .from($('#info-group-2 #info-1'), { maxHeight: 0, duration: 1 }, '-=0.8')
    .from($('#info-group-2 #info-2'), { maxHeight: 0, duration: 1 }, '-=0.8')
    .from($('#info-group-2 #info-3'), { y: -25, opacity: 0, duration: 1 }, '-=0.8');
  ScrollTrigger.getById(anim_install_pic_2_ID).disable();
  console.warn('** infoImgPseudo finish **');

  anim_faq = gsap
    .timeline({
      scrollTrigger: {
        trigger: $('.faq-container'),
        start: '+300px 85%',
        id: anim_faq_ID,
      },
    })
    .from($('#faq-1'), { maxWidth: 0, opacity: 0, duration: 1 }, '-=0.85')
    .from($('#faq-2'), { maxWidth: 0, opacity: 0, duration: 1 }, '-=0.75')
    .from($('#faq-3'), { maxWidth: 0, opacity: 0, duration: 1 }, '-=0.75')
    .from($('#faq-4'), { maxWidth: 0, opacity: 0, duration: 1 }, '-=0.75');
  ScrollTrigger.getById(anim_faq_ID).disable();

  var intros = Array.from($('.products .intro'));
  intros.forEach((element) => {
    anim_intro_show_list.push(
      gsap.from(element, {
        opacity: 0,
        x: -100,
        duration: 0.5,
        ease: 'power1.out',
        paused: true,
      }),
    );
  });
}

function onSVGAnimation() {
  bodymovin.loadAnimation({
    container: $('#svg-gray-circle-block')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/gray_circle.json',
  });

  bodymovin.loadAnimation({
    container: $('#about-head-anim-01')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/about_head_anim_01.json',
  });

  bodymovin.loadAnimation({
    container: $('#about-head-anim-02')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/about_head_anim_02.json',
  });
}

async function onAwake() {
  console.log('*** onAwake ***');

  onInit();
  await onLoadingData();
  onEventBinding();
  onGSAP();
  onSVGAnimation();
  $('#loading-bar').fadeOut();
}

$(function () {
  onAwake();
});

// ***************** Local Methods *****************
function onHeadAnimComplete(index) {
  window.scrollTo(0, 0);

  if (index === 7) {
    headTimeline.play();
    headTextBoschTimeline.forEach((el) => {
      el.play();
    });
  }

  ScrollTrigger.getById(anim_about_ID).enable();
  ScrollTrigger.getById(anim_install_ID).enable();
  ScrollTrigger.getById(anim_install_pic_1_ID).enable();
  ScrollTrigger.getById(anim_install_pic_2_ID).enable();
  ScrollTrigger.getById(anim_faq_ID).enable();
}
