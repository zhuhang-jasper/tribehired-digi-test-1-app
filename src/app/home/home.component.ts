import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, UserAuth } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: UserAuth;
    users: User[] = null;
    filterName: string = '';
    loading = false;

    constructor(
        private accountService: AccountService
    ) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    onSearch() {
        this.loading = true;
        this.accountService.getUsersByName(this.filterName)
            .pipe(first())
            .subscribe({
                next: (users) => {
                    this.users = users
                    this.loading = false;
                },
                error: error => {
                    this.loading = false;
                }
            });
    }
}