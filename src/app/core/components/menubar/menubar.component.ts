import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],

})
export class MenubarComponent implements OnInit {

  constructor(private cookie: CookieService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  handleLogout(): void {
    this.userService.logout()
    this.router.navigate(['/login'])
  }

}
