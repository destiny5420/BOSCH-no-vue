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
import '../images/home_product_03_1.png';
import '../images/home_product_05_1.png';
import '../images/home_product_05_2.png';
import '../images/bosch-mask.png';
import '../images/bosch-text.svg';

import bodymovin from 'lottie-web';

// import global.js
import {
  onGlobalInit,
  onGlobalLoadingData,
  onGlobalBinding,
  onGlobalGSAP,
  globalFunction,
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

// ***************** Struct Methods *****************
function onInit() {
  onGlobalInit();

  if (deviceMode === 'phone') {
    $('.about-us .top svg circle').attr('r', 5);
  }

  console.log('*** onLoadingData ***');
}

async function onLoadingData() {
  onGlobalLoadingData();

  console.log('*** onLoadingData ***');
}

var minX = 15;
var maxX = -15;
var minY = 15;
var maxY = -15;

var productArray = [];

function onEventBinding() {
  if (deviceMode === '>=1920') {
    window.addEventListener('mousemove', (event) => {
      var modifyX = ((event.clientX - 0) / window.screen.width) * (maxX - minX) + minX;
      var modifyY = ((event.clientY - 0) / window.screen.height) * (maxY - minY) + minY;

      $('#gray_circle_mouse_offset')[0].style.transform =
        'translate(' + modifyX + 'px, ' + modifyY + 'px)';

      $('#header_img_mouse_offset')[0].style.transform =
        'translate(' + modifyX * 3 + 'px, ' + modifyY * 3 + 'px)';
      // console.log(event);
    });
  }

  // about more
  $('#more-about').on('click', function (event) {
    event.preventDefault();

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

  // product arrow event
  Array.from($('.products .intro')).forEach((element, index) => {
    // toggle arrow group
    var pageObj = $(element).find('.page');
    if (pageObj.length <= 1) {
      $(element).find('.arrow-wrap').addClass('hide-arrow-wrap');
    }

    var leftArrow = $(element).find('.left-arrow')[0];
    $(leftArrow).on('click', () => {
      productArray[index].currentTmpIndex = productArray[index].currentIndex;

      productArray[index].currentIndex > 0
        ? (productArray[index].currentIndex -= 1)
        : productArray[index].currentIndex;

      if (productArray[index].currentTmpIndex === productArray[index].currentIndex) {
        return;
      }

      checkPage(data, false);
      checkArrowElement(data);
    });

    var rightArrow = $(element).find('.right-arrow')[0];
    $(rightArrow).on('click', () => {
      productArray[index].currentTmpIndex = productArray[index].currentIndex;

      productArray[index].currentIndex < productArray[index].totalLength - 1
        ? (productArray[index].currentIndex += 1)
        : productArray[index].currentIndex;

      if (productArray[index].currentTmpIndex === productArray[index].currentIndex) {
        return;
      }

      checkPage(data, true);
      checkArrowElement(data);
    });

    var data = {
      objects: Array.from(pageObj),
      totalLength: pageObj.length,
      currentTmpIndex: 0,
      currentIndex: 0,
      leftElement: leftArrow,
      rightElement: rightArrow,
    };

    data.objects.forEach((element) => {
      element.classList.add('page-unfocus');
    });

    productArray.push(data);

    checkPage(data, true);
    checkArrowElement(data);
  });
}

function checkPage(data, isNext) {
  data.objects[data.currentTmpIndex].classList.add('page-unfocus');
  data.objects[data.currentTmpIndex].classList.remove('page-next');
  data.objects[data.currentTmpIndex].classList.remove('page-pervious');

  isNext === true
    ? data.objects[data.currentIndex].classList.add('page-next')
    : data.objects[data.currentIndex].classList.add('page-pervious');
  data.objects[data.currentIndex].classList.remove('page-unfocus');
  data.currentTmpIndex = data.currentIndex;
}

function checkArrowElement(data) {
  // left arrow
  if (data.currentIndex === 0) {
    data.leftElement.classList.add('arrow-hide');
  } else {
    data.leftElement.classList.remove('arrow-hide');
  }

  // right arrow
  if (data.currentIndex === data.totalLength - 1) {
    data.rightElement.classList.add('arrow-hide');
  } else {
    data.rightElement.classList.remove('arrow-hide');
  }
}

function onGSAP() {
  onGlobalGSAP();
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

  strokeLines.forEach((el, elIndex) => {
    headTextBoschTimeline.push(
      gsap.to(el, {
        duration: 3,
        strokeDashoffset: 0,
        ease: 'power3.inOut',
        paused: true,
        onComplete: (arg) => {
          arg === 0 ? $('#bosch-txt-body #text-mask rect').addClass('rect-move-anim') : '';
        },
        onCompleteParams: [elIndex],
      }),
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

  bodymovin.loadAnimation({
    container: $('#svg-anim-product-01')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/product_01.json',
  });

  bodymovin.loadAnimation({
    container: $('#svg-anim-product-02-1-1')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/product_02_1_1.json',
  });

  bodymovin.loadAnimation({
    container: $('#svg-anim-product-02-1-2')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/product_02_1_2.json',
  });

  bodymovin.loadAnimation({
    container: $('#svg-anim-product-03')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/product_03.json',
  });

  bodymovin.loadAnimation({
    container: $('#svg-anim-product-04')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/product_04.json',
  });

  bodymovin.loadAnimation({
    container: $('#svg-anim-product-05-1-1')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/product_05_1_1.json',
  });

  bodymovin.loadAnimation({
    container: $('#svg-anim-product-05-1-2')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/product_05_1_2.json',
  });

  bodymovin.loadAnimation({
    container: $('#svg-anim-product-05-2-1')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/product_05_2_1.json',
  });

  bodymovin.loadAnimation({
    container: $('#svg-anim-install-01')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/install.json',
  });
}

async function onAwake() {
  console.log('*** onAwake ***');

  $(window).scrollTop(0);
  globalFunction.disableWindowScrolling();

  // var template_bosch_text =
  //   "<svg><defs><mask id='mask'><image xlink:href='./images/bosch-mask.png'></image></mask></defs><g width='100%' height='100%' mask='url(#mask)'><rect id='move-black'/><g id='stroke-line'><path d='M3.59,107.16V4.2H50.1q16.41,0,25.05,7t8.64,20.23q0,8.35-3.31,13.47T69.25,53.59Q79,56.9,83.36,62.66t4.32,15.55q0,14.12-9.21,21.53t-26.79,7.42Zm22.6-61.35H48.8q12.68,0,12.67-12.09T47.79,21.77H26.19Zm0,43.78H50q7.2,0,11.09-3.6t3.89-10.22q0-13.55-15.84-13.54H26.19Z' transform='translate(-3.09 -2.11)'/><path d='M151.76,2.61q21.6,0,35.5,14.84t13.89,37.87q0,23.61-14,38.52t-36.28,14.9q-22,0-35.86-14.69T101.22,55.89q0-23.32,14.18-38.3T151.76,2.61Zm-.29,18.58q-12.39,0-19.29,9.07t-6.92,25.49q0,16.13,6.92,25.27t19.15,9.15q12.24,0,19-9.08t6.76-25.34q0-16-6.91-25.27A22.13,22.13,0,0,0,151.47,21.19Z' transform='translate(-3.09 -2.11)'/><path d='M211.81,84.12l19.87-8.5q3.16,7.92,8.64,11.45t14.11,3.53q8.64,0,13.54-3.39a10.69,10.69,0,0,0,4.89-9.28,9,9,0,0,0-3.74-7.85q-3.75-2.67-15-5.26-12.52-2.88-17.71-4.61a35,35,0,0,1-8.93-4.32q-11.08-7.2-11.09-21.6,0-14.68,9.8-23.11T253,2.76q28.08,0,39.74,21.31l-18.57,8.78q-3.75-6.62-8.5-9.28T253.13,20.9q-7,0-10.87,2.88A9.68,9.68,0,0,0,238.45,32a8.46,8.46,0,0,0,3.88,7.49q3.9,2.6,14,4.61,19.72,4,27.36,9.07,11.67,7.77,11.67,23.33t-10.52,23.9q-10.5,8.35-30.09,8.35-16.12,0-26.5-5.9T211.81,84.12Z' transform='translate(-3.09 -2.11)'/><path d='M381.58,70.58l20.59,8.35q-5.76,14.26-15.26,21.17-11.39,8.64-28.23,8.64-22.6,0-36-14.33T309.29,56q0-23.62,13.61-38.52T358.25,2.61Q378,2.61,389.79,14q6,5.91,11.23,17.42l-20.45,8.36q-3.6-9.95-8.85-14.26t-13.61-4.32q-12,0-18.36,8.93t-6.41,25.49q0,16.69,6.55,25.63t18.79,8.93q8.51,0,13.9-4.68T381.58,70.58Z' transform='translate(-3.09 -2.11)'/><path d='M419.31,107.16V4.2h23V46h39.17V4.2h23v103h-23V64.53H442.35v42.63Z' transform='translate(-3.09 -2.11)'/></g></g></svg>";
  // $('#bosch-txt-title').append(template_bosch_text);

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
  if (index === 7) {
    $(window).scrollTop(0);
    $('html').css('scroll-behavior', 'smooth');

    headTimeline.play();
    headTextBoschTimeline.forEach((el) => {
      el.play();
    });

    ScrollTrigger.getById(anim_about_ID).enable();
    ScrollTrigger.getById(anim_install_ID).enable();
    ScrollTrigger.getById(anim_install_pic_1_ID).enable();
    ScrollTrigger.getById(anim_install_pic_2_ID).enable();
    ScrollTrigger.getById(anim_faq_ID).enable();
    globalFunction.enableScrolling();
  }
}
