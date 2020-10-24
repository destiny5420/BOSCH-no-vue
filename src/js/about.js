import '../style/about.scss';

// import jquery
import $ from 'jquery';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ***** variable *****
let menuOpen = false;
let anim_sloganShow;

function onEventBinding() {
  $('#menu').on('click', function (e) {
    if (menuOpen) {
      menuOpen = false;
      $('#menu').removeClass('show');
      $('#menu-window').fadeOut(100);
      console.log(anim_sloganShow);
    } else {
      menuOpen = true;
      $('#menu').addClass('show');
      $('#menu-window').fadeIn(100);
    }
  });

  $('#menu-window-close').on('click', function () {});
}

function onGSAP() {
  console.log('*** onGSAP ***');

  // Regist Plugin
  gsap.registerPlugin(ScrollTrigger);

  anim_sloganShow = gsap.timeline({ delay: 1 });

  let tmp = document.querySelectorAll('.slogan .text-char');
  tmp.forEach((element) => {
    anim_sloganShow.from(
      element,
      { duration: 0.75, opacity: 0.5, y: 60, ease: 'power2.out' },
      '-=0.65',
    );
  });

  // console.log('tmp: ', tmp);
  // sloganShow.from('.slogan .text-1', { duration: 0.75, opacity: 0.5, y: 30 });
  // sloganShow.from('.slogan .text-2', { duration: 0.75, opacity: 0.5, y: 30 }, '-=0.25');
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
