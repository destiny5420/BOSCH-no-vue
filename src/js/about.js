import '../style/about.scss';

// import jquery
import $ from 'jquery';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ***** variable *****
let menuOpen = false;
let anim_sloganShow;
let animsDescription = [];

function onEventBinding() {
  // keydown
  $(document).on('keydown', function (e) {
    switch (e.keyCode) {
      case 65: // A
        console.log('key a');
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
      console.log(anim_sloganShow);
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
      '-=0.685',
    );
  });

  let tmpAry = Array.from(document.querySelectorAll('.description .text-effect'));
  for (let i = 0; i < tmpAry.length; i++) {
    animsDescription.push(
      gsap.timeline({ scrollTrigger: { start: '20vh top', markers: true, end: '+=0' } }),
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

  console.log(tmpAry);
  // let tmpList_0 = Array.from(tmp[0].children);
  // console.log('tmpList_0: ', tmpList_0);
  // tmpList_0.forEach((element) => {
  //   tmpAnim.from(element, { duration: 0.75, opacity: 0.5, y: 65, ease: 'power1.out' }, '-=0.72');
  // });
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
