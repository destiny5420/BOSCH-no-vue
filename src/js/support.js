import '../style/support.css';

import '../images/support_txt_00.png';
import '../images/support_txt_01.png';
import '../images/support_pic_00.png';
import '../images/support_pic_01.png';

import { globalInit, globalCommand, $, gsap, ScrollTrigger, isDebug } from '../js/global.js';

// import json data
import faq_collections from '../files/jsons/question.json';
import { apiFAQQuestion } from './api.js';

// ***** variable *****
let anim_open_menu;
let anim_close_menu;
let tmpAnim = null;
let faqDatas = {
  originHeight: 0,
  toggle: [],
  showMaxHeight: [],
  clickAnim: [],
};

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

async function settingFAQQuestion() {
  var data = {};

  if (isDebug) {
    data = faq_collections;
  } else {
    await apiFAQQuestion().then((res) => {
      data = res.data;
    });
  }

  // setting template append result to DOM
  var template_html =
    "<div class='move-block'><div class='list'><div name='list-block'><div class='question'><div class='tch-b list-symbol'>Q</div><div class='tch-b list-text'>{{question}}</div></div><div class='answer'><div class='tch-b list-symbol'>A</div><div class='tch-r list-text'>{{answer}}</div></div><div class='que-btn'></div></div></div></div>";

  for (let i = 0; i < data.common.length; i++) {
    var current_list = template_html
      .replace('{{question}}', data.common[i].question)
      .replace('{{answer}}', data.common[i].answer);
    $('#common .block').append(current_list);
  }

  for (let i = 0; i < data.service.length; i++) {
    var current_list = template_html
      .replace('{{question}}', data.service[i].question)
      .replace('{{answer}}', data.service[i].answer);
    $('#service .block').append(current_list);
  }

  for (let i = 0; i < data.shopinfo.length; i++) {
    var current_list = template_html
      .replace('{{question}}', data.shopinfo[i].question)
      .replace('{{answer}}', data.shopinfo[i].answer);
    $('#shopinfo .block').append(current_list);
  }

  // setting originHeight
  faqDatas['originHeight'] = $('.list')[0].clientHeight;
}

async function onLoadingData() {
  console.log('*** onLoadingData ***');

  await settingFAQQuestion();

  let faqHtmlTemplate = "<img src='./images/support_txt_00.png' alt=''>";
  for (let i = 0; i < 5; i++) {
    $('.slogan .txt-question').append(faqHtmlTemplate);
  }

  let questionHtmlTemplate = "<img src='./images/support_txt_01.png' alt=''>";
  for (let i = 0; i < 10; i++) {
    $('.slogan .txt-faq').append(questionHtmlTemplate);
  }
}

function onEventBinding() {
  console.log('*** onEventBinding ***');

  let allList = $('.list');
  for (let i = 0; i < allList.length; i++) {
    // setting toggle flag
    faqDatas.toggle.push(false);

    // setting max-height for show
    faqDatas.showMaxHeight.push(allList[i].children[0].clientHeight);

    allList[i].addEventListener('click', (e) => {
      // console.log(e);

      if (faqDatas.toggle[i] === false) {
        e.target.style.transitionDuration = faqDatas.showMaxHeight[i] >= 200 ? '' : '0.35s';
        e.target.style.maxHeight = faqDatas.showMaxHeight[i] + 'px';
        e.target.children[0].children[0].classList.add('show');
        faqDatas.clickAnim[i].play();
      } else {
        e.target.style.maxHeight = faqDatas['originHeight'] + 'px';
        e.target.children[0].children[0].classList.remove('show');
        faqDatas.clickAnim[i].reverse();
      }

      faqDatas.toggle[i] = !faqDatas.toggle[i];
    });
  }

  // menu button
  $('#menu-button').on('click', function (e) {
    menu.toggleMenu();
  });

  // global binging
  globalCommand();
}

function onGSAP() {
  console.log('*** onGSAP ***');

  // Regist Plugin
  gsap.registerPlugin(ScrollTrigger);

  // list head animation
  let headAnim = gsap.timeline({
    delay: 1.25,
  });
  headAnim
    .from('#common', { duration: 1, opacity: 0, x: -100 })
    .from('#service', { duration: 1, opacity: 0, x: -100 }, '-=1')
    .from('#shopinfo', { duration: 1, opacity: 0, x: -100 }, '-=1')
    .from('#company', { duration: 1, opacity: 0, x: -100 }, '-=1');

  // list show animation
  let move_blocks = $('.lists-container .move-block');
  for (let i = 0; i < move_blocks.length; i++) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: move_blocks[i],
          toggleActions: 'restart none none none',
          start: '-=60px bottom',
        },
      })
      .from(move_blocks[i], {
        opacity: 0,
        y: 60,
        duration: 0.75,
        ease: 'power1.out',
      });

    faqDatas.clickAnim.push(
      gsap.timeline({ paused: true }).to(move_blocks[i].children[0].children[0], {
        duration: 0.45,
        opacity: 1,
        ease: 'power1.inOut',
      }),
    );
  }

  // setting list of title trigger animation
  let all_title = $('.lists-container .title');
  for (let i = 0; i < all_title.length; i++) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: all_title[i],
          toggleActions: 'restart none none none',
          start: '-=100px bottom',
        },
      })
      .from(all_title[i], { opacity: 0, y: 100, duration: 1, ease: 'power1.out' });
  }

  // setting company info trigger animation
  gsap
    .timeline({
      scrollTrigger: {
        trigger: $('#company .info'),
        toggleActions: 'restart none none none',
        start: '-=60px bottom',
      },
    })
    .from($('#company .info'), {
      delay: 0.25,
      opacity: 0,
      y: 60,
      duration: 0.75,
      ease: 'power1.out',
    });

  // list click animation
  tmpAnim = gsap.timeline({ paused: true });
  tmpAnim.to($('div[name="list-block"]')[0], { duration: 0.35, opacity: 1, ease: 'power1.out' });

  // faq horizontal scroll animation
  gsap.to($('.txt-faq'), { x: 237, duration: 5, repeat: -1, ease: 'linear' });

  gsap.to($('.txt-question'), { x: -1219, duration: 15, repeat: -1, ease: 'linear' });

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
}

async function onAwake() {
  console.log('*** onAwake ***');

  globalInit();
  await onLoadingData();
  onEventBinding();
  onGSAP();
  $('#loading-bar').fadeOut();
}

$(function () {
  onAwake();
});
