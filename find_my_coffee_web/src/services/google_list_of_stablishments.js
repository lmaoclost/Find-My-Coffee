import api from './api';

const GoogleListOfStablishmentsService = {
  index: (latitude, longitude) =>
    api.get(`/google_stores?latitude=${latitude}&longitude=${longitude}`),
};

export default GoogleListOfStablishmentsService;
