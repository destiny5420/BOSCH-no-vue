import '../style/support.css';

// import jquery
import $ from 'jquery';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// import json data
import faq_collections from '../files/jsons/question.json';

// ***** variable *****

function onLoadingData() {
  var template_html =
    "<div class='list'><input name='toggle' type='checkbox'><div name='list-block'><div class='question'><div><div class='tch-b list-symbol'>Q</div><div class='tch-b list-text'>{{question}}</div></div><div class='que-btn'></div></div><div class='answer'><div class='tch-b list-symbol'>A</div><div class='tch-r list-text'>{{answer}}</div></div></div></div>";

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
}

function onEventBinding() {}

function onGSAP() {
  console.log('*** onGSAP ***');

  // Regist Plugin
  gsap.registerPlugin(ScrollTrigger);

  // list head animation
  let headAnim = gsap.timeline({
    delay: 1.25,
    onComplete: () => {
      console.log('finish');
    },
  });
  headAnim.from('#common', { duration: 1, opacity: 0, x: -100 });

  // list show animation
  let all_list = $('.lists-container .list');
  for (let i = 0; i < all_list.length; i++) {
    gsap
      .timeline({
        scrollTrigger: { trigger: all_list[i], start: 'bottom bottom', markers: true },
      })
      .from(all_list[i], { opacity: 0, y: 40, duration: 0.55, ease: 'power1.out' });
  }

  let all_title = $('.lists-container .title');
  for (let i = 0; i < all_title.length; i++) {
    gsap
      .timeline({
        scrollTrigger: { trigger: all_title[i], start: 'middle bottom', markers: true },
      })
      .from(all_title[i], { opacity: 0, y: 40, duration: 0.55, ease: 'power1.out' });
  }
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
