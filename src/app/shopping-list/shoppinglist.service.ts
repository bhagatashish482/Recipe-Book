import { Ingredient } from '../shared/shared.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients:Ingredient[]=[
        new Ingredient('tomato',5),
        new Ingredient('potato',2)
      ];

    getIngredients(){
        return this.ingredients.slice(); 
    }

    getIngredient(index : number){
        return this.ingredients[index]; 
    }

    addIngredients(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    
}