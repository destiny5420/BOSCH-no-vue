import '../style/support.css';

// import jquery
import $ from 'jquery';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// import json data
import faq_collections from '../files/jsons/question.json';

// ***** variable *****
let marker = false;
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

function onLoadingData() {
  console.log('*** onLoadingData ***');

  // setting template append result to DOM
  var template_html =
    "<div class='move-block'><div class='list'><div name='list-block'><div class='question'><div><div class='tch-b list-symbol'>Q</div><div class='tch-b list-text'>{{question}}</div></div><div class='que-btn'></div></div><div class='answer'><div class='tch-b list-symbol'>A</div><div class='tch-r list-text'>{{answer}}</div></div></div></div></div>";

  for (let i = 0; i < faq_collections.common.length; i++) {
    var current_list = template_html
      .replace('{{question}}', faq_collections.common[i].question)
      .replace('{{answer}}', faq_collections.common[i].answer);
    $('#common .block').append(current_list);
  }

  for (let i = 0; i < faq_collections.service.length; i++) {
    var current_list = template_html
      .replace('{{question}}', faq_collections.service[i].question)
      .replace('{{answer}}', faq_collections.service[i].answer);
    $('#service .block').append(current_list);
  }

  for (let i = 0; i < faq_collections.shopinfo.length; i++) {
    var current_list = template_html
      .replace('{{question}}', faq_collections.shopinfo[i].question)
      .replace('{{answer}}', faq_collections.shopinfo[i].answer);
    $('#shopinfo .block').append(current_list);
  }

  // setting originHeight
  faqDatas['originHeight'] = $('.list')[0].clientHeight;
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
  $('#menu').on('click', function (e) {
    menu.toggleMenu();
  });
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
          start: 'bottom bottom',
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
        scrollTrigger: { trigger: all_title[i], start: 'bottom 95%', markers: marker },
      })
      .from(all_title[i], { opacity: 0, y: 100, duration: 0.75, ease: 'power1.out' });
  }

  // setting company info trigger animation
  gsap
    .timeline({
      scrollTrigger: { trigger: $('#company .info'), start: 'middle bottom' },
    })
    .from($('#company .info'), { opacity: 0, y: 60, duration: 0.75, ease: 'power1.out' });

  // console.log('all_list: ', all_list);

  // list click animation
  tmpAnim = gsap.timeline({ paused: true });
  tmpAnim.to($('div[name="list-block"]')[0], { duration: 0.35, opacity: 1, ease: 'power1.out' });

  // scroll pointer
  gsap
    .timeline({ repeat: -1 })
    .from('#scroll-point', { delay: 0.5, y: 20, opacity: 0, duration: 0.75, ease: 'linear' })
    .to('#scroll-point', { y: -12, opacity: 0, duration: 0.75, ease: 'power1.out' });
}

function onAwake() {
  console.log('*** onAwake ***');

  onLoadingData();
  onEventBinding();
  onGSAP();
  $('#loading-bar').fadeOut();
}

$(function () {
  onAwake();
});
