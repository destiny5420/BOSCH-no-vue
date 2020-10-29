import axios from 'axios';

// FAQ相關的api
const faqRequest = axios.create({
  baseURL: 'http://localhost:5500/docs/js/jsons',
});

// Link相關的api
const linkRequest = axios.create({
  baseURL: 'http://localhost:5500/docs/js/jsons',
});

export const apiFAQQuestion = () => faqRequest.get('./question.json');
export const apiLinkReference = () => linkRequest.get('./link.json');
