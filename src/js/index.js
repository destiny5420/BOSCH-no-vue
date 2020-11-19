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

import bodymovin from 'lottie-web';

// import global.js
import {
  onGlobalInit,
  onGlobalLoadingData,
  onGlobalBinding,
  onGlobalGSAP,
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
    container: $('#svg-anim-product-05-2-1')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/product_03.json',
  });

  bodymovin.loadAnimation({
    container: $('#svg-anim-product-05-3-1')[0],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/jsons/product_03.json',
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
  }
}
