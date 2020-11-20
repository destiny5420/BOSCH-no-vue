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
    '---> onGlobalInit / innerWidth: %d / window screen width: %d / isMobile: %s',
    window.innerWidth,
    window.screen.width,
    isMobile(),
  );

  // phone
  if (window.screen.width <= 375) {
    deviceMode = 'phone';
  } else if (window.screen.width >= 1920) {
    deviceMode = '>=1920';
  }
}

function isMobile() {
  var check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
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
