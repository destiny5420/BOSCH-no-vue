import '../style/index.scss';
import '@fortawesome/fontawesome-free/js/all.js';
import $ from 'jquery';

function onAwake() {
  console.log('*** onAwake ***');

  // register event to element
  $('#menu').on('click', function () {
    $('#menu-window').show();
  });

  $('#menu-window-close').on('click', function () {
    $('#menu-window').hide();
  });
}

console.log('this is index.js');
$(function () {
  onAwake();
});
