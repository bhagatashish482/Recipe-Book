import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expireIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({ providedIn: 'root'})
export class AuthService{

    user = new Subject<User>()
    
    constructor(private http : HttpClient){

    }

    signUp(email :string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5X2LsgC44_eTTVtXBqICISSrQCcrsEuA',   
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
        tap(resData =>{
           this.handleAunthentication(
               resData.email,
               resData.localId,
               resData.idToken,
               +resData.expireIn
           );
        })
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5X2LsgC44_eTTVtXBqICISSrQCcrsEuA',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError),
        tap(resData =>{
            this.handleAunthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expireIn
            );
         })
         );
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occured.';

           if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message){
                case 'EMAIL_NOT_FOUND':
                    {
                        errorMessage = 'Incorrect Email ID';
                        break;
                    }

                case 'INVALID_PASSWORD':
                    {
                        errorMessage = 'Incorrect Password';
                        break;
                    }
                    
            }
            return throwError(errorMessage);
        }

        private handleAunthentication(email:string, userID:string, token:string, expireIn:number){
           const expirationDate = new Date(new Date().getTime()+expireIn*1000);

           const user = new User(
             email,
             userID,
             token,
             expirationDate
           );

           this.user.next(user);
        }
    }