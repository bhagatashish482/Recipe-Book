import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';


const routes: Routes=[
    { path: '', 
    component: RecipesComponent, 
    children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipesEditComponent},
        {path: ':id', component: RecipesDetailComponent},
        {path: ':id/edit', component: RecipesEditComponent},
      ]}
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipesRoutingModule{

}