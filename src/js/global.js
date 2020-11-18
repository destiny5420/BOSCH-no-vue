// import vue
// import Vue from 'vue/dist/vue';

// import font awesome
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';

// import jQuery
import $ from 'jquery';

// import polyfill
import '@babel/polyfill';

// import link json
import link_collections from '../files/jsons/link.json';
import { apiLinkReference } from './api.js';

// import gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CSSRulePlugin from 'gsap/CSSRulePlugin';

// *** Parameter ***
let anim_open_menu;
let anim_close_menu;
var isDebug = true;
var deviceMode;
var mainBlocks = [];
var menuBlockConfigure = {
  mainBlockOriginHeightList: [],
  mainBlockOpenHeightList: [],
  mainBlockOffsetValue: [],
  subBlockOriginHeightList: [],
  subBlockOpenHeightList: [],
};

var globalFunction = {
  disableWindowScrolling: function () {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  },
  enableScrolling: function () {
    window.onscroll = function () {};
  },
};

var menu = (function () {
  var menuOpen = false;

  return {
    toggleMenu: function () {
      if (menuOpen) {
        menuOpen = false;

        globalFunction.enableScrolling();
        $('#menu-button').removeClass('show');
        anim_close_menu.restart();
      } else {
        menuOpen = true;

        if (menuBlockConfigure.mainBlockOpenHeightList.length === 0) {
          Array.from($('#menu-window .menu-block')).forEach((e) => {
            const reduceFun = (accumulator, currentValue) => {
              return accumulator + currentValue.clientHeight;
            };
            var childrenList = Array.from(e.children);
            childrenList.shift(); // because the first element is trigger, exclusive it.
            let resultValue = childrenList.reduce(reduceFun, 0);

            menuBlockConfigure.mainBlockOpenHeightList.push(resultValue);
          });
        }
        globalFunction.disableWindowScrolling();
        $('#menu-button').addClass('show');
        anim_open_menu.restart();
      }
    },
  };
})();

function onGlobalInit() {
  console.warn(
    '---> onGlobalInit / innerWidth: %d / window screen width: %d',
    window.innerWidth,
    window.screen.width,
  );

  // phone
  if (window.screen.width <= 375) {
    deviceMode = 'phone';
  } else if (window.screen.width >= 1920) {
    deviceMode = '>=1920';
  }
}

function onGlobalLoadingData() {
  console.warn('---> onGlobalLoadingData ***');

  // Modify bottom svg size
  var colorElement = $('.footer .bottom svg')[0];
  switch (deviceMode) {
    case 'phone':
      colorElement.setAttribute('viewBox', '0 0 1920 70');
      colorElement.setAttribute('height', '82');
      break;
    case '>=1920':
      colorElement.setAttribute('viewBox', '0 0 1920 15');
      colorElement.setAttribute('height', '17');
      break;
    default:
      // colorElement.setAttribute('viewBox', '0 0 1920 15');
      // colorElement.setAttribute('height', '17');
      break;
  }
}

function onGlobalBinding() {
  console.warn('---> onGlobalBinding');

  $('#home').on('click', () => {
    window.location.href = './index.html';
  });

  settingMediaLink();

  // menu button
  $('#menu-button').on('click', function (e) {
    menu.toggleMenu();
  });

  // menu options
  mainBlocks = Array.from($('#menu-window .menu-block'));
  mainBlocks.forEach((element, mainIndex) => {
    menuBlockConfigure.mainBlockOriginHeightList.push(element.clientHeight);
    menuBlockConfigure.mainBlockOffsetValue.push([]);

    // setting main-block trigger event.
    element.getElementsByClassName('trigger')[0].addEventListener('click', () => {
      element.style.transitionDuration = '0.35s';

      if (
        element.style.maxHeight ===
        menuBlockConfigure.mainBlockOpenHeightList[mainIndex] + 'px'
      ) {
        element.style.maxHeight = menuBlockConfigure.mainBlockOriginHeightList[mainIndex] + 'px';
        element.getElementsByClassName('btn-symbol')[0].classList.remove('show');
      } else {
        element.style.maxHeight = menuBlockConfigure.mainBlockOpenHeightList[mainIndex] + 'px';
        element.style.maxHeight = 'auto';
        element.getElementsByClassName('btn-symbol')[0].classList.add('show');
      }
    });

    // setting sub-block trigger event.
    Array.from(element.querySelectorAll('.option-layout')).forEach((subElement, subIndex) => {
      menuBlockConfigure.mainBlockOffsetValue[mainIndex].push(0);

      var originHeight = subElement.getElementsByClassName('option')[0].clientHeight;

      var childrenArray = Array.from(subElement.children);
      childrenArray.shift(); // because the first element is trigger, exclusive it.
      var openHeight = childrenArray.reduce((before, current) => {
        return before + current.clientHeight;
      }, 0);

      subElement.style.maxHeight = originHeight + 'px';

      var trigger = subElement.getElementsByClassName('trigger')[0];

      trigger.addEventListener('mouseenter', () => {
        subElement.classList.add('hover');
        subElement.style.maxHeight = openHeight + 'px';

        if (
          deviceMode === 'phone' &&
          menuBlockConfigure.mainBlockOffsetValue[mainIndex][subIndex] === 0
        ) {
          menuBlockConfigure.mainBlockOffsetValue[mainIndex][subIndex] = openHeight - originHeight;
          updateMenuBlockMaxHeight(mainIndex, subIndex, true);
        }
      });

      trigger.addEventListener('mouseleave', () => {
        subElement.classList.remove('hover');

        // subElement.style.maxHeight = originHeight + 'px';
        // if (menuBlockConfigure.mainBlockOffsetValue[mainIndex][subIndex] !== 0) {
        //   menuBlockConfigure.mainBlockOffsetValue[mainIndex][subIndex] = 0;
        //   updateMenuBlockMaxHeight(mainIndex, subIndex, false);
        // }
      });
    });
  });

  // top-point
  $('#top-point').on('click', (element) => {
    console.log('hit top-point!');
    window.scrollTo(0, 0);
  });
}

function updateMenuBlockMaxHeight(mainIndex, subIndex, plus) {
  plus === true
    ? (menuBlockConfigure.mainBlockOpenHeightList[mainIndex] +=
        menuBlockConfigure.mainBlockOffsetValue[mainIndex][subIndex])
    : (menuBlockConfigure.mainBlockOpenHeightList[mainIndex] -=
        menuBlockConfigure.mainBlockOffsetValue[mainIndex][subIndex]);

  mainBlocks[mainIndex].style.maxHeight =
    menuBlockConfigure.mainBlockOpenHeightList[mainIndex] + 'px';
}

function onGlobalGSAP() {
  console.warn('---> onGlobalGSAP');

  // menu
  anim_open_menu = gsap
    .timeline({ paused: true })
    .to($('#menu-window'), {
      opacity: 1,
      duration: 0.75,
      ease: 'power1.out',
      onStart: () => {
        $('#menu-window')[0].style.pointerEvents = 'auto';
      },
    })
    .from(
      $('#menu-window .top'),
      {
        x: -75,
        duration: 0.85,
        ease: 'power1.out',
      },
      '-=1',
    )
    .from(
      $('#menu-window .bottom'),
      {
        x: -75,
        duration: 0.85,
        opacity: 0,
        ease: 'power1.out',
        delay: 0.25,
      },
      '-=1',
    );

  anim_close_menu = gsap
    .timeline({ paused: true })
    .to($('#menu-window'), {
      opacity: 0,
      duration: 0.75,
      ease: 'power1.in',
      onStart: () => {
        $('#menu-window')[0].style.pointerEvents = 'none';
      },
    })
    .to(
      $('#menu-window .top'),
      {
        x: 100,
        duration: 1,
        ease: 'power1.in',
      },
      '-=1',
    )
    .to(
      $('#menu-window .bottom'),
      {
        x: 100,
        duration: 1,
        ease: 'power1.in',
        delay: 0.25,
      },
      '-=1',
    );
}

async function settingMediaLink() {
  var data = {};

  if (isDebug) {
    data = link_collections;
  } else {
    await apiLinkReference().then((res) => {
      data = res.data;
    });
  }

  // console.log('data: ', data);

  Array.from($('.link-fb')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(data.fb, '_blank');
    });
  });

  Array.from($('.link-yt')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(data.yt, '_blank');
    });
  });

  Array.from($('.link-line')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(data.line, '_blank');
    });
  });

  Array.from($('.link-ig')).forEach((el) => {
    el.addEventListener('click', () => {
      window.open(data.ig, '_blank');
    });
  });
}

export {
  onGlobalInit,
  onGlobalLoadingData,
  onGlobalBinding,
  onGlobalGSAP,
  globalFunction,
  $,
  gsap,
  ScrollTrigger,
  CSSRulePlugin,
  isDebug,
  deviceMode,
};
// export default $;
