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
  var list_html =
    "<div class='list'><input name='toggle' type='checkbox'><div name='list-block'><div class='question'><div><div class='tch-b list-symbol'>Q</div><div class='tch-b list-text'>{{question}}</div></div><div class='que-btn'></div></div><div class='answer'><div class='tch-b list-symbol'>A</div><div class='tch-r list-text'>{{answer}}</div></div></div></div>";

  for (let i = 0; i < faq_collections.common.length; i++) {
    var current_list = list_html
      .replace('{{question}}', faq_collections.common[i].question)
      .replace('{{answer}}', faq_collections.common[i].answer);
    $('#common .block').append(current_list);
  }
}

function onAwake() {
  console.log('*** onAwake ***');

  onLoadingData();
  // onEventBinding();
  // onGSAP();
  $('#loading-bar').fadeOut();
}

$(function () {
  onAwake();
});
