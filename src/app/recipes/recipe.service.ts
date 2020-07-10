import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/shared.model';
import { Subject } from 'rxjs';

export class RecipeService{

    recipesChanged = new Subject<Recipe[]>();
    recipeSelected =new EventEmitter<Recipe>();

    private recipes : Recipe[]= [
        new Recipe('reccipe', 
        'desccription',
         'https://thestayathomechef.com/wp-content/uploads/2018/02/Best-Brownies-1-small.jpg',
         [
             new Ingredient('braed',2),
             new Ingredient('milk',1)
         ])
      ];

    setRecipe(recipes : Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }  

    getRecipe(){
        return this.recipes.slice();
    }

    getrecipe(index: number){
        return this.recipes[index];
    }

    addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index : number, newRecipe : Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index : number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}