import { Component } from '@angular/core';
import { IPopupComponent } from '../../root/popup/IPopupComponent';

@Component({
  selector: 'app-workspace-popup-menu',
  templateUrl: './workspace-popup-menu.component.html',
  styleUrls: ['./workspace-popup-menu.component.scss']
})
export default class WorkspacePopupMenuComponent implements IPopupComponent.PopupChildComponent{
  popupDefinitions: IPopupComponent.PopupChildDefinitions = {};
}