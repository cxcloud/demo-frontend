import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../core/auth/current-user.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  tabs: Array<any> = [
    {
      name: 'Personal Details',
      href: 'user',
      active: true
    },
    {
      name: 'Change Password',
      href: 'change-password'
    },
    {
      name: 'Address book',
      href: 'addressbook'
    },
    {
      name: 'My Orders',
      href: 'my-orders'
    },
    {
      name: 'Sign Out',
      href: 'signout'
    }
  ];

  user: any;

  constructor(
    private currentUserService: CurrentUserService,
    private authService: AuthService
  ) {}

  get customerNumber(): string {
    const hash = this.user.id.split('-');
    return hash[hash.length - 1];
  }

  ngOnInit() {
    if (this.currentUserService.isLoggedIn) {
      this.user = this.currentUserService.customer.getValue();
    } else {
      this.logOut();
    }
  }

  logOut() {
    this.authService.logout();
  }
}
