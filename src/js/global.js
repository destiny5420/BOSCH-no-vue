import $ from 'jquery';

function globalBinding() {
  console.log('--> binding [%s] button', 'home');
  $('#home').on('click', () => {
    window.location.href = './index.html';
  });
}

export default {
  globalBinding,
};
