import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import AuthService from '../../../auth/auth.service';
import { map, skip } from 'rxjs';
import WorkspaceService from '../../../../domains/workspace/workspace.service';
import PopupController from '../../../controllers/popup/popup.controller';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit{
  readonly loggedIn$ = this.authService.auth$
    .pipe(map((auth) => auth?.authenticated));
  readonly workspaces$ = this.workspaceService.workspaces$;
  constructor(
    private readonly authService: AuthService,
    private readonly workspaceService: WorkspaceService,
    private readonly popupController: PopupController
  ){}
  ngOnInit(): void{
    if(this.authService.isAuthenticated()){
      this.workspaceService.load()
      .subscribe();
    }
    this.authService.auth$.pipe(skip(1)).subscribe(() => {
      if(this.authService.isAuthenticated()){
        this.workspaceService.load()
        .subscribe();
      }
    })
  }
  /* handleClickWorkspaceMenu(): void{
    this.popupController.create();
  } */
}
