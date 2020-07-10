import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth/auth.service';
import { take, exhaustMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService : AuthService) { }

  storedRecipes(){
    const recipe = this.recipeService.getRecipe();
    this.http.put('https://recipe-9d820.firebaseio.com/recipes.json',recipe)
    .subscribe(response=>{
      console.log(response);
    });
  }

  fetchRecipes(){
    /*this.authService.user.pipe(take(1)), exhaustMap(user =>{
      
    });
    /*map(recipes => {
      return recipes.map(recipe=>{
        return{
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients :[]
        };
      });
    }),
    tap(recipes =>{
      this.recipeService.setRecipe(recipes);
    })*/
    
    
    this.http.get<Recipe[]>('https://recipe-9d820.firebaseio.com/recipes.json').subscribe(recipe=>{
      console.log(recipe);
      this.recipeService.setRecipe(recipe);
      
    });
  }
}
