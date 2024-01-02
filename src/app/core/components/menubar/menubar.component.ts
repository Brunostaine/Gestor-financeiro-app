import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],

})
export class MenubarComponent implements OnInit {

  constructor(private cookie: CookieService, private router: Router) { }

  ngOnInit() {
  }

  handleLogout(): void {
    this.cookie.delete('USER_INFO')
    this.router.navigate(['/login'])
  }

}
