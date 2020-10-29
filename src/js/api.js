import axios from 'axios';

// FAQ相關的api
const faqRequest = axios.create({
  baseURL: 'https://destion5420.github.io/BOSCH-no-vue/js/jsons',
});

// Link相關的api
const linkRequest = axios.create({
  baseURL: 'https://destion5420.github.io/BOSCH-no-vue/js/jsons',
});

export const apiFAQQuestion = () => faqRequest.get('./question.json');
export const apiLinkReference = () => linkRequest.get('./link.json');
