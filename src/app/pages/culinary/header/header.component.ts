import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  login: string
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.login = this.userService.getUser().login
  }
}
