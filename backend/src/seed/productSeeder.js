require('dotenv').config();

const connectDB=require('../config/db');
const Product=require('../models/Product');

const products=[
    {
    name: 'Raw Whole Cashews W240',
    slug: 'raw-whole-cashews-w240',
    type: 'raw',
    grade: 'W240',
    weightGrams: 500,
    price: 649,
    stock: 50,
    images: [],
    description: 'Premium whole raw cashews with a rich creamy texture.',
  },
  {
    name: 'Raw Whole Cashews W320',
    slug: 'raw-whole-cashews-w320',
    type: 'raw',
    grade: 'W320',
    weightGrams: 500,
    price: 549,
    stock: 75,
    images: [],
    description: 'Everyday premium raw cashews for snacking and cooking.',
  },
  {
    name: 'Roasted Salted Cashews',
    slug: 'roasted-salted-cashews',
    type: 'salted',
    grade: 'W320',
    weightGrams: 250,
    price: 329,
    stock: 80,
    images: [],
    description: 'Crunchy roasted cashews with balanced salt seasoning.',
  },
  {
    name: 'Masala Cashews',
    slug: 'masala-cashews',
    type: 'flavored',
    grade: 'W320',
    weightGrams: 250,
    price: 349,
    stock: 45,
    images: [],
    description: 'Spicy Indian masala cashews for a bold snack experience.',
  },
  {
    name: 'Pepper Roasted Cashews',
    slug: 'pepper-roasted-cashews',
    type: 'flavored',
    grade: 'W320',
    weightGrams: 250,
    price: 359,
    stock: 40,
    images: [],
    description: 'Roasted cashews with a warm black pepper finish.',
  },
  {
    name: 'Organic Whole Cashews',
    slug: 'organic-whole-cashews',
    type: 'organic',
    grade: 'W240',
    weightGrams: 500,
    price: 749,
    stock: 30,
    images: [],
    description: 'Organic whole cashews selected for premium quality.',
  },
  {
    name: 'Cashew Splits',
    slug: 'cashew-splits',
    type: 'raw',
    grade: 'Splits',
    weightGrams: 500,
    price: 429,
    stock: 90,
    images: [],
    description: 'Cashew splits ideal for sweets, curries, and baking.',
  },
  {
    name: 'Cashew Pieces',
    slug: 'cashew-pieces',
    type: 'raw',
    grade: 'Pieces',
    weightGrams: 500,
    price: 369,
    stock: 100,
    images: [],
    description: 'Affordable cashew pieces for cooking and garnishing.',
  },
  {
    name: 'Honey Roasted Cashews',
    slug: 'honey-roasted-cashews',
    type: 'flavored',
    grade: 'W320',
    weightGrams: 250,
    price: 379,
    stock: 55,
    images: [],
    description: 'Sweet honey roasted cashews with a crisp finish.',
  },
  {
    name: 'Premium Cashew Gift Pack',
    slug: 'premium-cashew-gift-pack',
    type: 'roasted',
    grade: 'Assorted',
    weightGrams: 750,
    price: 999,
    stock: 25,
    images: [],
    description: 'Assorted premium cashews packed for gifting.',
  },
]

const seedProducts= async()=>{
    try{
        await connectDB();
        await Product.deleteMany();
        await Product.insertMany(products);

        console.log('Product seeded successfully');
        process.exit(0);

    }catch(error){
        console.log('Product seeding failed', error.message);
        process.exit(1);
    }
}

seedProducts();