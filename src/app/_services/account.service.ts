import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, UserAuth, ApiResponse, QueryResultResponse } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<UserAuth>;
    public user: Observable<UserAuth>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('accountInfo')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): UserAuth {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<ApiResponse<UserAuth>>(`${environment.apiUrl}/login`, { email, password })
            .pipe(map(resp => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('accountInfo', JSON.stringify(resp.body));
                this.userSubject.next(resp.body);
                return resp;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('accountInfo');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/accounts`, user);
    }

    getAll() {
        return this.http.get<ApiResponse<QueryResultResponse<User>>>(`${environment.apiUrl}/accounts`)
            .pipe(map(resp => {
                return resp.body.result;
            }));
    }

    getUsersByName(filterName: string) {
        return this.http.get<ApiResponse<QueryResultResponse<User>>>(`${environment.apiUrl}/accounts`, { params: {
            name: filterName
        }})
            .pipe(map(resp => {
                return resp.body.result;
            }));
    }

}