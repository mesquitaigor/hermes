import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import PopupController from '../../../controllers/popup/popup.controller';
import PerfilPopupComponent from '../../molecules/perfil-popup/perfil-popup.component';
import PopupModel from '../../../controllers/popup/resources/PopupModel';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements AfterViewInit{
  @ViewChild('perfilButton') perfilButtonElement?: ElementRef
  popup?: PopupModel<unknown, unknown>
  constructor(
    private popupController: PopupController
  ){}

  ngAfterViewInit(): void{
    if(this.perfilButtonElement){
      this.popup = this.popupController.create(PerfilPopupComponent)
        .setParent(this.perfilButtonElement)
        .position({
          right: '0',
          top: 'calc(100% + 20px)',
        })
        .enterAnimation((element) => {
          const nativeElement: HTMLElement = element.nativeElement
          nativeElement.animate([
            {transform: 'translateY(-100px)'},
            {transform: 'translateY(0)'},
          ], {
            duration: 300,
            easing: 'ease-in-out',
          })
          
        })
      this.popup.fix()
    }
  }

  handlePerfilClick(): void{
    if(this.popup && !this.popup.openned){
      this.popup.present()
    }else if(this.popup){
      this.popup.dismiss()
    }
  }
}
