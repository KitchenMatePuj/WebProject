import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.scss']
})
export class UserComponent {
  users: any[] = [];

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }
}
