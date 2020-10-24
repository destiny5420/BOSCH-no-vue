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

  let tmpAry = Array.from(document.querySelectorAll('.description .text-effect'));
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
