import '../style/support.css';

import '../images/text_faq.svg';

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

  console.warn('window.innerWidth: ', window.innerWidth);

  let faqTextCnt = window.innerWidth / 250 + 2;
  console.error('faqTextCnt: ', faqTextCnt);
  let faqHtmlTemplate =
    "<svg width='199' height='61' viewBox='0 0 199 61' fill='none'><path opacity='0.8' fill-rule='evenodd' clip-rule='evenodd' d='M0.90625 55V1.53125H38.4141V12.8125H14.4375V24.418H32.9297V35.418H14.4375V55H0.90625ZM13.4375 34.418H31.9297V25.418H13.4375V11.8125H37.4141V2.53125H1.90625V54H13.4375V34.418ZM92.7815 55H78.37L75.0653 45.1914H55.6167L52.2768 55H39.3018L58.8778 1.53125H73.4977L92.7815 55ZM54.9008 44.1914H75.7836L79.0883 54H91.3578L72.7953 2.53125H59.5766L40.7328 54H51.5609L54.9008 44.1914ZM65.4125 13.4297L57.6781 36H73.0766L65.4125 13.4297ZM65.4082 16.5271L59.0779 35H71.6809L65.4082 16.5271ZM139.325 59.0977L133.313 52.5586C130.032 54.0586 126.399 54.8086 122.415 54.8086C115.337 54.8086 109.512 52.4883 104.942 47.8477C100.067 42.9023 97.6297 36.4102 97.6297 28.3711C97.6297 20.3555 100.137 13.8281 105.153 8.78906C109.841 4.07812 115.677 1.72266 122.661 1.72266C129.716 1.72266 135.563 4.04297 140.204 8.68359C145.126 13.6055 147.587 20.0742 147.587 28.0898C147.587 31.957 146.966 35.5781 145.723 38.9531C144.481 42.3047 142.712 45.1641 140.415 47.5312L145.97 53.5078L139.325 59.0977ZM141.781 47.532L147.417 53.5966L139.236 60.4789L133.061 53.7616C129.815 55.1306 126.262 55.8086 122.415 55.8086C115.095 55.8086 109.005 53.3984 104.23 48.5493C99.1413 43.3874 96.6297 36.628 96.6297 28.3711C96.6297 20.1278 99.2178 13.3347 104.444 8.08372C109.33 3.17373 115.426 0.722656 122.661 0.722656C129.959 0.722656 136.068 3.13334 140.911 7.97649C146.049 13.1146 148.587 19.8526 148.587 28.0898C148.587 32.066 147.948 35.8049 146.662 39.2985L146.661 39.3007C145.493 42.4523 143.868 45.2002 141.781 47.532ZM128.251 34.418L133.067 39.6211C133.237 39.3123 133.398 38.9958 133.551 38.6717C134.893 35.8216 135.563 32.3764 135.563 28.3359C135.563 23.7422 134.708 19.957 132.997 16.9805C130.723 12.9961 127.255 11.0039 122.591 11.0039C117.903 11.0039 114.423 12.9961 112.149 16.9805C110.485 19.9336 109.653 23.6836 109.653 28.2305C109.653 34.6758 111.259 39.4102 114.47 42.4336C116.649 44.4961 119.391 45.5273 122.696 45.5273C123.529 45.5273 124.373 45.4477 125.229 45.2884C125.601 45.2191 125.976 45.1346 126.352 45.0352L121.852 40.1133L128.251 34.418ZM124.423 44.4065L120.43 40.0401L128.318 33.019L132.815 37.8762C133.968 35.2604 134.563 32.0908 134.563 28.3359C134.563 23.86 133.729 20.2609 132.13 17.4788L132.128 17.4761C130.036 13.81 126.903 12.0039 122.591 12.0039C118.253 12.0039 115.11 13.8113 113.019 17.474C111.464 20.2344 110.653 23.8005 110.653 28.2305C110.653 34.5283 112.222 38.9439 115.155 41.7056L115.157 41.7072C117.131 43.5755 119.619 44.5273 122.696 44.5273C123.264 44.5273 123.839 44.4873 124.423 44.4065ZM196.422 53.4352L196.416 53.4415C194.914 54.9436 193.065 55.7031 190.927 55.7031C188.77 55.7031 186.909 54.9463 185.404 53.4415C183.902 51.9393 183.142 50.0903 183.142 47.9531C183.142 45.7962 183.899 43.9344 185.404 42.4296L185.41 42.4234C186.936 40.9244 188.806 40.168 190.962 40.168C193.086 40.168 194.924 40.9462 196.422 42.4711C197.916 43.9916 198.677 45.8361 198.677 47.9531C198.677 50.0702 197.916 51.9147 196.422 53.4352ZM195.709 43.1719C194.396 41.8359 192.814 41.168 190.962 41.168C189.064 41.168 187.447 41.8242 186.111 43.1367C184.798 44.4492 184.142 46.0547 184.142 47.9531C184.142 49.8281 184.798 51.4219 186.111 52.7344C187.423 54.0469 189.029 54.7031 190.927 54.7031C192.802 54.7031 194.396 54.0469 195.709 52.7344C197.021 51.3984 197.677 49.8047 197.677 47.9531C197.677 46.1016 197.021 44.5078 195.709 43.1719Z' fill='#525F6B' /></svg>";
  for (let i = 0; i < faqTextCnt; i++) {
    $('.slogan .txt-faq').append(faqHtmlTemplate);
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
          start: '-=120px 95%',
        },
      })
      .from(all_title[i], { opacity: 0, y: 100, duration: 0.75, ease: 'power1.out' });
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

  // console.log('all_list: ', all_list);

  // list click animation
  tmpAnim = gsap.timeline({ paused: true });
  tmpAnim.to($('div[name="list-block"]')[0], { duration: 0.35, opacity: 1, ease: 'power1.out' });

  Array.from($('.txt-faq svg')).forEach((e) => {
    gsap.to(e, { x: -253, duration: 3, repeat: -1, ease: 'linear' });
  });

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
