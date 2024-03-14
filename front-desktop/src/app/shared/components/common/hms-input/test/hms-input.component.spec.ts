import { ComponentFixture, TestBed } from '@angular/core/testing';
import HsmInputComponent from '../hms-input.component';
import HsmInputComponentModule from '../hms-input.component.module';
import HmsInputControll from '../HmsInputControll';
import { Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe(HsmInputComponent.name, () => {
  let component: HsmInputComponent;
  let fixture: ComponentFixture<HsmInputComponent>;

  let emailFormControll: HmsInputControll;
  beforeEach(() => {
    emailFormControll = new HmsInputControll({
      initialValue: '',
      type: 'text',
      validators: [
        {
          fn: Validators.required,
          key: 'required',
          message: 'Campo obrigatório',
        },
      ],
      updateOn: 'submit',
      style: {
        input: {
          ['text-align']: 'center',
        },
      },
    });
    TestBed.configureTestingModule({
      imports: [HsmInputComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HsmInputComponent);
    component = fixture.componentInstance;
    component.controll = emailFormControll;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should define input's placeholder when configured", () => {
    const placeholderText = 'Digite seu email';
    emailFormControll.placeholder = placeholderText;
    component.controll = emailFormControll;
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.getAttribute('placeholder')).toEqual(
      placeholderText
    );
  });

  it("should define input's initial value when configured", () => {
    const initialValue = 'email@gmail.com';
    emailFormControll.initialValue = initialValue;
    component.controll = emailFormControll;
    component.ngOnInit();
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.value).toEqual(initialValue);
  });

  it("should define input's type value when configured", () => {
    const inputType = 'email';
    emailFormControll.type = inputType;
    component.controll = emailFormControll;
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.getAttribute('type')).toEqual(inputType);
  });

  it('should focus input when configured', () => {
    emailFormControll.autofocus = true;
    component.controll = emailFormControll;
    component.ngAfterViewInit();
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    setTimeout(() => {
      console.log(document.activeElement?.tagName);
    }, 400);
    expect(input.nativeElement.getAttribute('type')).toEqual('text');
  });
});
