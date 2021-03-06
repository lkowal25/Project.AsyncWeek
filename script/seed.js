'use strict';

const {
  db,
  models: { User, Restaurant, Food, ZipCode },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', zipcode: 11758 }),
    User.create({ username: 'murphy', password: '123', zipcode: 10039 }),
    User.create({ username: 'john', password: '123', zipcode: 11510 }),
    User.create({ username: 'mary', password: '123', zipcode: 10039 }),
    User.create({ username: 'bob', password: '123', zipcode: 11234 }),
  ]);

  const restaurants = await Promise.all([
    Restaurant.create({
      name: 'baba chicken',
      zipcode: 11510,
      nationality: 'Mexican',
    }),
    Restaurant.create({
      name: 'murphy',
      zipcode: 10039,
      nationality: 'Chinese',
    }),
    Restaurant.create({
      name: 'johns pizza',
      zipcode: 10039,
      nationality: 'Cuban',
    }),
    Restaurant.create({
      name: 'angies',
      zipcode: 11234,
      nationality: 'Chinese',
    }),
    Restaurant.create({
      name: 'auntie mays',
      zipcode: 10039,
      nationality: 'Greek',
    }),
    Restaurant.create({
      name: 'johns',
      zipcode: 10039,
      nationality: 'Japanese',
    }),
    Restaurant.create({
      name: 'asian blashian',
      zipcode: 10039,
      nationality: 'Thai',
    }),
    Restaurant.create({
      name: 'moon town',
      zipcode: 10039,
      nationality: 'Thai',
    }),
    Restaurant.create({
      name: 'Turk Things',
      zipcode: 10039,
      nationality: 'Turkish',
    }),
  ]);

  const foods = await Promise.all([
    Food.create({ name: 'super yummy food', price: 22.5, meatType: 'beef' }),
    Food.create({
      name: 'kebab chicken',
      price: 10.25,
      description:
        'this is a food with the most amazing spices that you have ever seen, it will drive your taste buds wild from the moment you ingest to egrees',
    }),
  ]);
  const zipcodes = await Promise.all([
    ZipCode.create({
      radius: 5,
      units: 'mile',
      zipcode: 9992299,
      totalList: [11510, 11213, 13131, 414141, 151515, 14141],
    }),
    ZipCode.create({
      radius: 5,
      units: 'mile',
      zipcode: 9992322,
      totalList: [12321, 33333, 231312, 231231, 13231, 13231],
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
