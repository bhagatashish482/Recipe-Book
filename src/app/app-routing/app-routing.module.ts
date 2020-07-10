import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'


const appRoutes: Routes =[
  { path: '', redirectTo:'/recipes', pathMatch:'full'},
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipeModule'}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
