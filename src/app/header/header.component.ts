import {Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{   
    isAuthenticated = false;

    private userSub : Subscription;

    constructor(private dataStorageService : DataStorageService,
                private authService: AuthService){}
    
    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true; 
        });
    }

    onSaveData(){
        this.dataStorageService.storedRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes();
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        throw new Error("Method not implemented.");
    }
}
