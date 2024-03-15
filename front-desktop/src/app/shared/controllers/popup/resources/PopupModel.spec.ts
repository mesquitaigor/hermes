import { BehaviorSubject, skip } from 'rxjs';
import PopupModel from './PopupModel';
import { IPopupController } from './IPopupController';
import TestComponentGenericComponent from '../../../../test/test-component-generic.component';

describe(PopupModel.name, () => {
  let behavior: BehaviorSubject<
    IPopupController.PopupBehaviorNext | undefined
  >
  let model: PopupModel<{input: string}, {output: () => undefined}>
  beforeEach(() => {
    behavior = new BehaviorSubject<
      IPopupController.PopupBehaviorNext | undefined
    >(undefined)
    model = new PopupModel(behavior)
  })
  it('should create', () => {
    expect(model).toBeTruthy()
  })
  it('should set component', () => {
    model.setComponent(TestComponentGenericComponent)
    expect(model.component).toBe(TestComponentGenericComponent)
  })
  it('should set entersAnimation', (done) => {
    const animationFn = jasmine.createSpy('enterAnimation').and.callFake((element: unknown): void => {element})
    model.setPopupBoxElement({nativeElement: document.createElement('div')})
    model.enterAnimation(animationFn)
    behavior.pipe(skip(1)).subscribe((next => {
      next?.popup?.displayEnterAnimation()
      expect(animationFn).toHaveBeenCalled()
      
      done()
    }))
    model.present()
  })
  it('should set output', () => {
    model.output({output: () => undefined})
    expect(model.childOutputList).toEqual({output: jasmine.any(Function)})
  })
  it('should set input', () => {
    model.input({input: 'input'})
    expect(model.childInputList?.input).toEqual('input')
  })
  it('should fire event on emit present event', (done) => {
    behavior.pipe(skip(1)).subscribe((next => {
      expect(next?.action).toBe('present')
      done()
    }))
    model.present()
  })
  it('should fire event on emit fix event', (done) => {
    behavior.pipe(skip(1)).subscribe((next => {
      expect(next?.action).toBe('fix')
      done()
    }))
    model.fix()
  })
  it('should fire event on emit dismiss event', (done) => {
    behavior.pipe(skip(1)).subscribe((next => {
      expect(next?.action).toBe('dismiss')
      done()
    }))
    model.dismiss()
  })
  it('should pass popup on emit event on observable', (done) => {
    behavior.pipe(skip(1)).subscribe((next => {
      expect(next?.popup).toBe(model)
      done()
    }))
    model.present()
  })
})