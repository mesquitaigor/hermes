import { ComponentFixture, TestBed } from '@angular/core/testing';
import ToastComponent from '../toast.component';
import ToastController from '../../../../controllers/toast/toast.controller';
import ToastComponentModule from '../toast.component.module';
import ToastComponentSpecHelper from './ToastComponentSpecHelper';

describe(ToastComponent.name, () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let componentHelper = new ToastComponentSpecHelper();
  let toastController: jasmine.SpyObj<ToastController>;
  beforeEach(() => {
    toastController = componentHelper.toastControllerMock.build();
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [{ provide: ToastController, useValue: toastController }],
      imports: [ToastComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentHelper.fixture = fixture;
    componentHelper.toastController = toastController;
  });

  afterAll(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a alert when controller submit a event', () => {
    componentHelper.emitToast();
    const toastDebugElement = componentHelper.getToast();
    expect(toastDebugElement).not.toBeNull();
  });

  it('should display a "success" alert when controller submit a success toast', () => {
    componentHelper.emitToast();
    const toastDebugElement =
      componentHelper.getToastByTypeClass('toast-success');
    expect(toastDebugElement).not.toBeNull();
  });
  it('should display the message of toast', () => {
    componentHelper.emitToast();
    const toastDebugElement = componentHelper.getToast();
    expect(toastDebugElement).not.toBeNull();
  });
});
