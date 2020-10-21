import api from './api';

const StoreService = {
  show: (google_place_id) => api.get(`/stores/${google_place_id}`),
  index: (latitude, longitude) =>
    api.get('/stores', {
      params: { latitude: latitude, longitude: longitude },
    }),
};
export default StoreService;
