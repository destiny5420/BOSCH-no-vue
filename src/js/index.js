import '../style/index.scss';
import '@fortawesome/fontawesome-free/js/all.js';
import $ from 'jquery';

console.log('this is index.js');
$(function () {
  $('#menu').on('click', function () {
    console.log('menu be click!');
    $('#menu-window').show();
  });
});
