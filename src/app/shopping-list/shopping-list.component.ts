import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/shared.model';
import { ShoppingListService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[];
 
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }
}
