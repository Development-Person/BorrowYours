/*
WARNING RUNNING EITHER OF THESE SCRIPTS WILL WIPE THE DATABASE
npm run data:import
npm run data:destroy
*/
//package imports
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
//app imports
import users from './users.js';
import items from './items.js';
import categories from './categories.js';
import User from '../models/userModel.js';
import Item from '../models/itemModel.js';
import Category from '../models/itemCategoryModel.js';
import Booking from '../models/bookingModel.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await Booking.deleteMany();
    await Item.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
    await Booking.deleteMany();

    await Booking.createCollection();
    const createdCategories = await Category.insertMany(categories);
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const firstCat = createdCategories[0]._id;

    const sampleItems = items.map((item) => {
      return { ...item, user: adminUser, category: firstCat };
    });

    await Item.insertMany(sampleItems);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Booking.deleteMany();
    await Item.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
