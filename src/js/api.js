import axios from 'axios';

// FAQ相關的api
const faqRequest = axios.create({
  baseURL: 'http://localhost:5500/docs/files/json',
});

export const apiFAQQuestion = () => faqRequest.get('/question.json');
