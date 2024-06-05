import Restaurant from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="content">
      <div id="restaurants" class="restaurants">
      </div>
    </div>
      `;
  },

  async afterRender() {
    const restaurants = await Restaurant.homeRestaurant();
    const restaurantContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
