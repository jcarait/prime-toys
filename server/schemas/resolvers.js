const { AuthenticationError } = require('apollo-server-express');
const { User, Toy, Category, Condition } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const user = await User.findById(context.user._id).populate({
        path: 'listings',
        populate: { path: 'category', Model: Category },
        // populate: { path: 'condition', Model: Condition },
      });

      return user;
    },
    categories: async () => {
      return await Category.find();
    },
    toy: async (parent, args) => {
      console.log(args);
      return await Toy.findById(args);
    },
    toys: async () => {
      return await Toy.find().populate('category condition');
    },
    conditions: async () => {
      return await Condition.find();
    },
  },
  Mutation: {
    addUser: async (parent, { input }) => {
      const user = await User.create({ ...input });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user found with this username');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // add toys resolver
    addToy: async (parent, { input }, context) => {
      if (context.user) {
        const toy = await Toy.create({ ...input });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { listings: toy } }
        );
        return toy;
      }
    },
    //update toys by id, dont think it necessary to update category
    updateToy: async (parent, { _id, name, description, image }) => {
      return await Toy.findByIdAndUpdate(
        _id,
        { name, description, image },
        { new: true }
      );
    },
    // remove toy based on id
    removeToy: async (parent, { _id }) => {
      return Toy.findOneAndDelete({ _id: _id });
    },
  },
};

module.exports = resolvers;
