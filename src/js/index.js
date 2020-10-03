import '../style/index.scss';
import '@fortawesome/fontawesome-free/js/all.js';
import $ from 'jquery';
import ScrollMagic from 'ScrollMagic';
import 'ScrollMagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

function onInitScrollMagic() {
  console.log('*** onInitScrollMagic ***');
  let controller = new ScrollMagic.Controller({});

  new ScrollMagic.Scene({
    triggerElement: '#btn-about',
    duration: 400,
  })
    // .setVelocity('#btn-about', { opacity: 0 }, { duration: 400 })
    .addIndicators()
    .addTo(controller);
}

function onAwake() {
  console.log('*** onAwake ***');

  // register event to element
  $('#menu').on('click', function () {
    $('#menu-window').show();
  });

  $('#menu-window-close').on('click', function () {
    $('#menu-window').hide();
  });

  onInitScrollMagic();
}

$(function () {
  onAwake();
});
