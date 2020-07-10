import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shoppinglist.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [
    ShoppingListService,
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
