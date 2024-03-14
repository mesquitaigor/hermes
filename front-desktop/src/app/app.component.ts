import { Component, HostBinding, OnInit } from '@angular/core';
import AuthService from './shared/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  @HostBinding('class.logged') authenticated = false;
  constructor(
    private authService: AuthService,
  ){}

  ngOnInit(): void{
    this.authService.auth$.subscribe((auth) => {
      this.authenticated = auth?.authenticated || false;
    })
  }
}
