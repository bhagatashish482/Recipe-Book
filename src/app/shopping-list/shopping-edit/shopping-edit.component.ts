import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/shared.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{

  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editItemIndex : number;
  editedItem : Ingredient;

  constructor(private slService: ShoppingListService) { }
  /*ngOnDestroy(): void {
    this.subscription.unsubscribe();
    throw new Error("Method not implemented.");
  }*/

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index : number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
    });
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredients(newIngredient);

    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear(this.slForm);
  }

  onClear(form: NgForm){
    form.reset();
    this.editMode = false;
  }
}
