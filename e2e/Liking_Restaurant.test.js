const assert = require('assert');

// eslint-disable-next-line no-undef
Feature('Liking Restaurant');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/#/like');
});

// eslint-disable-next-line no-undef
Scenario('showing empty liked restaurants', ({ I }) => {
  I.wait(10);
  I.seeElement('#restaurants');
  I.see('Tidak ada restaurant yang ditampilkan', '.restaurant-item__not__found');
});

// eslint-disable-next-line no-undef
Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant yang ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__title a');
  // eslint-disable-next-line no-undef
  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

// eslint-disable-next-line no-undef
Scenario('Unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant yang ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.wait(3);

  I.seeElement('.restaurant__title a');

  I.wait(3);
  // eslint-disable-next-line no-undef
  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.click('.restaurant__title a');
  I.wait(3);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');

  const FavoriteRestaurantIsEmpty = await I.grabTextFrom('.restaurant-item__not__found');
  assert.strictEqual('Tidak ada restaurant yang ditampilkan', FavoriteRestaurantIsEmpty);
});
