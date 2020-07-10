import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';

@NgModule({
    declarations:[
        AuthComponent,
        LoadingSpinnerComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'auth', component: AuthComponent}
        ])
    ]
})
export class AuthModule{

}