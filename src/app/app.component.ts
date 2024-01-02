import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from './core/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'app-gestor-financeiro';
  constructor(private primengConfig: PrimeNGConfig, public userService: UserService) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
