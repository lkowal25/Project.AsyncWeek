//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const Food = require('./models/Food');
const ZipCode = require('./models/ZipCode');
//associations could go here!

Restaurant.hasMany(Food, {
  as: 'menuItems',
  foreignKey: 'restaurantId',
});
Food.belongsTo(Restaurant);

Restaurant.hasMany(User, {
  as: 'customers',
  foreignKey: 'restaurantId',
});
User.belongsTo(Restaurant);

User.hasMany(Restaurant, {
  as: 'localRestaurants',
  foreignKey: 'userId',
});
Restaurant.belongsTo(User);

// ZipCode.hasMany(Restaurant, {
//   as: 'localRadius',
//   foreignKey: 'zipCodeId',
// });
// Restaurant.belongsTo(ZipCode);

module.exports = {
  db,
  models: {
    User,
    Restaurant,
    Food,
    ZipCode,
  },
};
