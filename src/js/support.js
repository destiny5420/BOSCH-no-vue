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
    "<div class='list'><div class='question'><div class='tch-b list-symbol'>Q</div><div class='tch-b list-text'>{{question}}</div><div class='que-btn'>X</div></div><div class='answer'><div class='tch-b list-symbol'>A</div><div class='tch-r list-text'>{{answer}}</div></div></div>";

  for (let i = 0; i < faq_collections.common.length; i++) {
    var current_list = list_html
      .replace('{{question}}', faq_collections.common[i].question)
      .replace('{{answer}}', faq_collections.common[i].answer);
    $('#common .list-block').append(current_list);
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
