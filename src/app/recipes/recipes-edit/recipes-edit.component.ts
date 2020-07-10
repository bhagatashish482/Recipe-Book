import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  id:number;
  edit_mode=false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.edit_mode = params['id'] !=null;
        this.initForm();
      }
    );
  }

   onCancel(){
     this.router.navigate(['../'],{relativeTo: this.route});
   }

  OnSubmit(){
    if(this.edit_mode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null ,Validators.required),
        'amount' : new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  private initForm(){

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesription = '';
    let recipeIngredient = new FormArray([]);

    if(this.edit_mode){
      const recipe = this.recipeService.getrecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDesription = recipe.description;
      
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredient.push(
            new FormGroup({
              name : new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDesription, Validators.required),
      'ingredients' : recipeIngredient
    });
  }

}
