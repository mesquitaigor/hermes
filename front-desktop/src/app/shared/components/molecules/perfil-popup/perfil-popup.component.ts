import { Component } from '@angular/core';
import { IPopupComponent } from '@components/root/popup/IPopupComponent';
import AuthService from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'perfil-popup',
  templateUrl: './perfil-popup.component.html',
  styleUrls: ['./perfil-popup.component.scss'],
})
export default class PerfilPopupComponent implements IPopupComponent.PopupChildComponent{
  popupDefinitions: IPopupComponent.PopupChildDefinitions = {
    style: {
      width: '225px',
      height: '200px',
    },
  };
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  handleLogout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
    this.popupDefinitions.dismiss?.()
    console.log(this.popupDefinitions)
  }
}