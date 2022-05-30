const db = require('./connection');
const { User, Toy, Category, Condition } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Action Figures & Playsets' },
    { name: 'Arts & Crafts' },
    { name: 'Building & Construction' },
    { name: 'Dolls & Accessories' },
    { name: 'Educational' },
    { name: 'Games & Puzzles' },
    { name: 'Model Kits' },
    { name: 'Plush & Soft Toys' },
    { name: 'Sports and Outdoor' },
    { name: 'Technology' },
    { name: 'Vehicles & Remote Control' },
  ]);

  console.log(
    '======================== Categories seeded! ========================'
  );

  await Condition.deleteMany();

  const conditions = await Condition.insertMany([
    { name: 'New: with tags' },
    { name: 'New: w/o tags' },
    { name: 'New: Sealed Package' },
    { name: 'New: Open Box' },
    { name: 'Like New' },
    { name: 'Excellent' },
    { name: 'Good' },
    { name: 'Minor Flaws' },
  ]);

  console.log(
    '======================== Conditions seeded! ========================'
  );

  await Toy.deleteMany();

  const toys = await Toy.insertMany([
    {
      name: `Marvel Spider-Man Titan Hero 12" Action Collectible Figure`,
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'spiderman.jpg',
      category: categories[0]._id,
      condition: conditions[2]._id,
      isFree: true,
    },
    {
      name: 'Marvel Legends Series - Avengers: Infinity Saga - Thor Figure',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'thor.jpg',
      category: categories[0]._id,
      condition: conditions[4]._id,
    },
    {
      name: 'LEGO City Lunar Research Base 60350',
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'lego-city.jpg',
      category: categories[2]._id,
      condition: conditions[2]._id,
      isFree: true,
    },
    {
      name: 'Nurture Me Newborn Baby Doll & Accessories',
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'baby-doll.jpg',
      category: categories[3]._id,
      condition: conditions[4]._id,
      isFree: true,
    },
    {
      name: 'Furby Purple',
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'furby.jpg',
      category: categories[2]._id,
      condition: conditions[5]._id,
    },
    {
      name: 'Frozen 2 Bike 30cm with Training Wheels',
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'frozen-bike-training-wheels.jpg',
      category: categories[8]._id,
      condition: conditions[6]._id,
    },
    {
      name: 'Hotwheels Diecast Models',
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'hotwheels-diecast-models.jpg',
      category: categories[10]._id,
      condition: conditions[6]._id,
      isFree: true,
    },
    {
      name: 'Tales at Bedtime',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'bedtime-book.jpg',
      category: categories[4]._id,
      condition: conditions[7]._id,
    },
    {
      name: 'Spinning Top',
      description:
        'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'spinning-top.jpg',
      category: categories[0]._id,
      condition: conditions[7]._id,
    },
    {
      name: 'Set of Plastic Horses',
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'plastic-horses.jpg',
      category: categories[0]._id,
      condition: conditions[4]._id,
    },
    {
      name: 'Teddy Bear',
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'teddy-bear.jpg',
      category: categories[7]._id,
      condition: conditions[4]._id,
    },
    {
      name: 'Alphabet Blocks',
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'alphabet-blocks.jpg',
      category: categories[0]._id,
      condition: conditions[4]._id,
    },
  ]);

  console.log('======================== Toy seeded! ========================');

  await User.deleteMany();

  await User.create([
    {
      username: 'batman',
      email: 'batman@testmail.com',
      password: 'password12345',
      listings: [toys[0]._id],
    },
    {
      username: 'robin',
      email: 'robin@testmail.com',
      password: 'password12345',
      listings: [toys[4]._id],
    },
    {
      username: 'jono',
      email: 'jono@testmail.com',
      password: 'password12345',
      listings: [
        toys[2]._id,
        toys[5]._id,
        toys[1]._id,
        toys[3]._id,
        toys[6]._id,
        toys[7]._id,
      ],
    },
    {
      username: 'kevin',
      email: 'kevin@testmail.com',
      password: 'password12345',
      listings: [
        toys[6]._id,
        toys[7]._id,
        toys[8]._id,
        toys[9]._id,
        toys[10]._id,
      ],
    },
  ]);

  console.log(
    '======================== Users Seeded! ========================'
  );

  process.exit();
});
