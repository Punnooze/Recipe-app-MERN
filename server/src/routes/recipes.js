import express from 'express';
import mongoose from 'mongoose';
import { RecipeModel } from '../models/recipeSchema.js';
import { userModel } from '../models/userSchema.js';

const router = express.Router();
// router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const response = await RecipeModel.find({}); //return all docs
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  const recipe = new RecipeModel(req.body); // instance of recipe
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put('/', async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get('/savedRecipes/ids', async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userID);
    return res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get('/savedRecipes', async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    return res.json({ savedRecipes: savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

export { router as recipeRouter };
