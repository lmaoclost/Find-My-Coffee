import api from './api';

const RatingService = {
  create: (store, rating) =>
    api.post('/ratings', { store: store, rating: rating }),
};

export default RatingService;
