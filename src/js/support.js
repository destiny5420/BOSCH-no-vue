import '../style/support.css';

// import jquery
import $ from 'jquery';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// import json data
import faq_collections from '../files/jsons/question.json';

// ***** variable *****
let tmpAnim = null;
let faqDatas = {
  originHeight: 0,
  toggle: [],
  showMaxHeight: [],
  clickAnim: [],
};

function onLoadingData() {
  console.log('*** onLoadingData ***');

  // setting template append result to DOM
  var template_html =
    "<div class='list'><div name='list-block'><div class='question'><div><div class='tch-b list-symbol'>Q</div><div class='tch-b list-text'>{{question}}</div></div><div class='que-btn'></div></div><div class='answer'><div class='tch-b list-symbol'>A</div><div class='tch-r list-text'>{{answer}}</div></div></div></div>";

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
      console.log(e);

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

  // console.log('allList: ', allList);
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
    .from('#shopinfo', { duration: 1, opacity: 0, x: -100 }, '-=1');

  // list show animation
  let all_list = $('.lists-container .list');
  for (let i = 0; i < all_list.length; i++) {
    // setting trigger anim
    gsap
      .timeline({
        scrollTrigger: { trigger: all_list[i], start: 'bottom bottom' },
      })
      .from(all_list[i], { opacity: 0, y: 40, duration: 0.55, ease: 'power1.out' });

    faqDatas.clickAnim.push(
      gsap
        .timeline({ paused: true })
        .to(all_list[i].children[0], { duration: 0.45, opacity: 1, ease: 'power1.inOut' }),
    );
  }

  let all_title = $('.lists-container .title');
  for (let i = 0; i < all_title.length; i++) {
    gsap
      .timeline({
        scrollTrigger: { trigger: all_title[i], start: 'middle bottom' },
      })
      .from(all_title[i], { opacity: 0, y: 60, duration: 0.75, ease: 'power1.out' });
  }

  console.log('all_list: ', all_list);
  // list click animation
  tmpAnim = gsap.timeline({ paused: true });
  tmpAnim.to($('div[name="list-block"]')[0], { duration: 0.35, opacity: 1, ease: 'power1.out' });
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
