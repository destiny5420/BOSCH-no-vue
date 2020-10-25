import '../style/about.css';

// import jquery
import $ from 'jquery';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ***** variable *****
let isDebug = false;
let menuOpen = false;
let anim_sloganShow;
let animsDescription = [];
let anim_description;
let anim_proxy;

function onEventBinding() {
  // keydown
  $(document).on('keydown', function (e) {
    switch (e.keyCode) {
      case 65: // A
        animsDescription.forEach((element) => element.play());
        break;
      default:
        break;
    }
  });

  // menu button
  $('#menu').on('click', function (e) {
    if (menuOpen) {
      menuOpen = false;
      $('#menu').removeClass('show');
      $('#menu-window').fadeOut(100);
    } else {
      menuOpen = true;
      $('#menu').addClass('show');
      $('#menu-window').fadeIn(100);
    }
  });
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
      { duration: 0.75, opacity: 0.5, y: 65, ease: 'power1.out' },
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
    scrollTrigger: { trigger: '.tip-box', start: '-650px top', markers: isDebug, end: '+=0' },
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
    .from('.proxy .info .content', { duration: 1, opacity: 0, y: 60 }, '-=1.25');
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
