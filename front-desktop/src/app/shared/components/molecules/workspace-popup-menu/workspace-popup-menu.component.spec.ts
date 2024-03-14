import { ComponentFixture, TestBed } from '@angular/core/testing';
import WorkspacePopupMenuComponent from './workspace-popup-menu.component';
import WorkspacePopupMenuComponentModule from './workspace-popup-menu.component.module';

describe(WorkspacePopupMenuComponent.name, () => {
  let componet: WorkspacePopupMenuComponent;
  let fixture: ComponentFixture<WorkspacePopupMenuComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkspacePopupMenuComponentModule],
    }).compileComponents();
    fixture = TestBed.createComponent(WorkspacePopupMenuComponent);
    componet = fixture.componentInstance;
  });
  it('should be created', () => {
    expect(componet).toBeTruthy();
  })
})