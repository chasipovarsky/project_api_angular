use ChineseSaleDB;

// Create collections for each entity
db.createCollection('Users');
db.createCollection('Donors');
db.createCollection('Categories');
db.createCollection('Gifts');
db.createCollection('Packages');
db.createCollection('Orders');
db.createCollection('Baskets');
db.createCollection('Prizes');

// Insert sample users
db.Users.insertMany([
  {
    _id: 1,
    UserName: 'liran99',
    Password: 'SecurePass123!',
    Name: 'Liran Cohen',
    Phone: '+972-54-123-4567',
    Address: 'Herzl 15, Tel Aviv',
    Email: 'liran.cohen@gmail.com',
    Role: 'Customer'
  },
  {
    _id: 2,
    UserName: 'tal_sh',
    Password: 'TalStrong9$',
    Name: 'Tal Shalev',
    Phone: '+972-52-987-6543',
    Address: 'Ben Yehuda 24, Haifa',
    Email: 'tal.shalev@outlook.com',
    Role: 'Customer'
  },
  {
    _id: 3,
    UserName: 'yael_m',
    Password: 'YaelPass88',
    Name: 'Yael Mizrahi',
    Phone: '+972-50-765-4321',
    Address: 'Rothschild 12, Jerusalem',
    Email: 'yael.mizrahi@yahoo.com',
    Role: 'Customer'
  },
  {
    _id: 4,
    UserName: 'amir_admin',
    Password: 'Admin2026!',
    Name: 'Amir Levi',
    Phone: '+972-54-333-2211',
    Address: 'Dizingof 90, Netanya',
    Email: 'amir.levi@chinesesale.co',
    Role: 'Manager'
  },
  {
    _id: 5,
    UserName: 'noga_alt',
    Password: 'NogaSecret42',
    Name: 'Noga Altaras',
    Phone: '+972-52-345-6789',
    Address: 'Bialik 3, Beersheba',
    Email: 'noga.alt@icloud.com',
    Role: 'Customer'
  }
]);

// Insert sample donors
db.Donors.insertMany([
  {
    _id: 1,
    Name: 'Doron Gifts Ltd.',
    Email: 'contact@dorongifts.co.il',
    Phone: '+972-3-555-0123'
  },
  {
    _id: 2,
    Name: 'Shira Homeware',
    Email: 'shira@homeware.com',
    Phone: '+972-4-888-9876'
  },
  {
    _id: 3,
    Name: 'Tal Toys',
    Email: 'sales@taltoys.net',
    Phone: '+972-50-112-2334'
  },
  {
    _id: 4,
    Name: 'Eden Beauty',
    Email: 'hello@edenbeauty.com',
    Phone: '+972-9-777-3333'
  },
  {
    _id: 5,
    Name: 'Gal Gourmet',
    Email: 'orders@galgourmet.com',
    Phone: '+972-8-444-5566'
  }
]);

// Insert sample categories
db.Categories.insertMany([
  { _id: 1, Name: 'Electronics' },
  { _id: 2, Name: 'Home & Kitchen' },
  { _id: 3, Name: 'Toys & Games' },
  { _id: 4, Name: 'Beauty' },
  { _id: 5, Name: 'Food & Drink' },
  { _id: 6, Name: 'Sports' }
]);

// Insert sample gifts
db.Gifts.insertMany([
  {
    _id: 1,
    Name: 'Wireless Headphones',
    Description: 'Noise cancelling over-ear headphones with Bluetooth 5.2.',
    Image: 'headphones.jpg',
    Value: 350,
    CategoryId: 1,
    DonorId: 1,
    SumCustomers: 12
  },
  {
    _id: 2,
    Name: 'Smart Speaker',
    Description: 'Voice-controlled speaker with built-in assistant.',
    Image: 'speaker.jpg',
    Value: 260,
    CategoryId: 1,
    DonorId: 1,
    SumCustomers: 8
  },
  {
    _id: 3,
    Name: 'Ceramic Dinner Set',
    Description: '12-piece dinnerware set for six people.',
    Image: 'dinner_set.jpg',
    Value: 180,
    CategoryId: 2,
    DonorId: 2,
    SumCustomers: 6
  },
  {
    _id: 4,
    Name: 'Plush Activity Toy',
    Description: 'Soft stuffed toy with interactive lights for kids.',
    Image: 'plush_toy.jpg',
    Value: 120,
    CategoryId: 3,
    DonorId: 3,
    SumCustomers: 15
  },
  {
    _id: 5,
    Name: 'Deluxe Skincare Kit',
    Description: 'Day and night skincare set for radiant skin.',
    Image: 'skincare_kit.jpg',
    Value: 310,
    CategoryId: 4,
    DonorId: 4,
    SumCustomers: 9
  },
  {
    _id: 6,
    Name: 'Gourmet Gift Basket',
    Description: 'Artisan chocolates, nuts and premium tea.',
    Image: 'gourmet_basket.jpg',
    Value: 220,
    CategoryId: 5,
    DonorId: 5,
    SumCustomers: 11
  },
  {
    _id: 7,
    Name: 'Fitness Tracker',
    Description: 'Waterproof activity tracker with heart rate monitor.',
    Image: 'fitness_tracker.jpg',
    Value: 290,
    CategoryId: 6,
    DonorId: 1,
    SumCustomers: 7
  },
  {
    _id: 8,
    Name: 'Board Game Strategy',
    Description: 'Family board game designed for ages 8 and up.',
    Image: 'board_game.jpg',
    Value: 150,
    CategoryId: 3,
    DonorId: 3,
    SumCustomers: 10
  },
  {
    _id: 9,
    Name: 'Espresso Machine',
    Description: 'Compact espresso maker with milk frother.',
    Image: 'espresso_machine.jpg',
    Value: 460,
    CategoryId: 2,
    DonorId: 2,
    SumCustomers: 5
  },
  {
    _id: 10,
    Name: 'Luxury Candle Set',
    Description: 'Three scented candles in decorative jars.',
    Image: 'candle_set.jpg',
    Value: 95,
    CategoryId: 4,
    DonorId: 4,
    SumCustomers: 14
  }
]);

// Insert sample packages
db.Packages.insertMany([
  {
    _id: 1,
    Name: 'Starter Pack',
    Price: 120,
    Description: 'Includes one toy and one beauty item.',
    CountCard: 2
  },
  {
    _id: 2,
    Name: 'Family Bundle',
    Price: 420,
    Description: 'Dinner set plus smart speaker for the home.',
    CountCard: 2
  },
  {
    _id: 3,
    Name: 'Tech Essentials',
    Price: 610,
    Description: 'Wireless headphones and fitness tracker combo.',
    CountCard: 2
  },
  {
    _id: 4,
    Name: 'Beauty & Relax',
    Price: 395,
    Description: 'Skincare kit and luxury candle set.',
    CountCard: 2
  },
  {
    _id: 5,
    Name: 'Gourmet Surprise',
    Price: 220,
    Description: 'Gourmet basket with premium snacks.',
    CountCard: 1
  }
]);

// Insert sample orders
db.Orders.insertMany([
  {
    _id: 1,
    OrderDate: new Date('2026-03-10T10:15:00Z'),
    UserId: 1,
    GiftsId: [1, 6],
    PackagesId: [1],
    Sum: 690
  },
  {
    _id: 2,
    OrderDate: new Date('2026-03-11T14:45:00Z'),
    UserId: 2,
    GiftsId: [3, 8],
    PackagesId: [],
    Sum: 330
  },
  {
    _id: 3,
    OrderDate: new Date('2026-03-12T09:30:00Z'),
    UserId: 3,
    GiftsId: [5],
    PackagesId: [4],
    Sum: 705
  },
  {
    _id: 4,
    OrderDate: new Date('2026-03-13T18:20:00Z'),
    UserId: 1,
    GiftsId: [2, 10],
    PackagesId: [5],
    Sum: 575
  },
  {
    _id: 5,
    OrderDate: new Date('2026-03-14T12:10:00Z'),
    UserId: 5,
    GiftsId: [4, 7],
    PackagesId: [3],
    Sum: 700
  },
  {
    _id: 6,
    OrderDate: new Date('2026-03-15T15:55:00Z'),
    UserId: 2,
    GiftsId: [9],
    PackagesId: [],
    Sum: 460
  }
]);

// Insert sample baskets
db.Baskets.insertMany([
  {
    _id: 1,
    UserId: 3,
    GiftsId: [2, 4],
    PackagesId: [1],
    Sum: 500
  },
  {
    _id: 2,
    UserId: 5,
    GiftsId: [10],
    PackagesId: [5],
    Sum: 315
  },
  {
    _id: 3,
    UserId: 1,
    GiftsId: [7],
    PackagesId: [3],
    Sum: 560
  },
  {
    _id: 4,
    UserId: 2,
    GiftsId: [3, 8, 6],
    PackagesId: [],
    Sum: 580
  },
  {
    _id: 5,
    UserId: 4,
    GiftsId: [1, 5, 9],
    PackagesId: [2],
    Sum: 1080
  }
]);

// Insert sample prizes
db.Prizes.insertMany([
  { _id: 1, UserId: 1, GiftId: 4 },
  { _id: 2, UserId: 2, GiftId: 8 },
  { _id: 3, UserId: 5, GiftId: 6 },
  { _id: 4, UserId: 3, GiftId: 1 },
  { _id: 5, UserId: 1, GiftId: 10 }
]);

// Queries for MongoDB Compass

// Collection: Users
// Find customers whose email contains gmail using $regex
// db.Users.find({ Role: 'Customer', Email: { $regex: /gmail/i } });

// Collection: Gifts
// Find gifts with values greater than 150 and less than 400 in categories 1 or 2
// db.Gifts.find({ Value: { $gt: 150, $lt: 400 }, CategoryId: { $in: [1, 2] } });

// Collection: Orders
// Find orders where sum is greater than 500 or the order contains package 3
// db.Orders.find({ $or: [ { Sum: { $gt: 500 } }, { PackagesId: { $in: [3] } } ] });

// Collection: Baskets
// Find baskets for user 2 that include a package and have at least one gift
// db.Baskets.find({ $and: [ { UserId: 2 }, { PackagesId: { $exists: true, $not: { $size: 0 } } }, { GiftsId: { $exists: true, $not: { $size: 0 } } } ] });

// Collection: Prizes
// Find prizes awarded to users in the set [1, 3, 5]
// db.Prizes.find({ UserId: { $in: [1, 3, 5] } });

// Aggregation pipeline example on Orders
// db.Orders.aggregate([
//   { $match: { Sum: { $gt: 300 } } },
//   { $group: { _id: '$UserId', totalSpent: { $sum: '$Sum' }, orderCount: { $sum: 1 } } },
//   { $lookup: { from: 'Users', localField: '_id', foreignField: '_id', as: 'user' } },
//   { $unwind: '$user' },
//   { $project: { _id: 0, userId: '$_id', userName: '$user.UserName', totalSpent: 1, orderCount: 1 } }
// ]);
