import axios from 'axios';

var API_PATH = 'http://bosch.stackergames.com';

// FAQ相關的api
const faqRequest = axios.create({
  baseURL: `${API_PATH}/js/jsons`,
});

// Link相關的api
const linkRequest = axios.create({
  baseURL: `${API_PATH}/js/jsons`,
});

export const apiFAQQuestion = () => faqRequest.get('./question.json');
export const apiLinkReference = () => linkRequest.get('./link.json');
