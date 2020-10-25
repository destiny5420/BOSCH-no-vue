import '../style/support.css';

// import jquery
import $ from 'jquery';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function onAwake() {
  console.log('*** onAwake ***');

  // onEventBinding();
  // onGSAP();
  $('#loading-bar').fadeOut();
}

$(function () {
  onAwake();
});
