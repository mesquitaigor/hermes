import ToastController from '../toast.controller';

describe(ToastController.name, () => {
  let service: ToastController;
  beforeEach(() => {
    service = new ToastController();
  });
  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should emit event with a success toast when success method is called', () => {
    const message = 'message';
    service.success(message);
    service.toastEvents$.subscribe((toast) => {
      expect(toast?.message).toBe(message);
      expect(toast?.['type']).toBe('success');
    });
  });
  it('should emit event with a erro toast when erro method is called', () => {
    const message = 'message';
    service.error(message);
    service.toastEvents$.subscribe((toast) => {
      expect(toast?.message).toBe(message);
      expect(toast?.['type']).toBe('error');
    });
  });
  it('should emit event with a warning toast when warning method is called', () => {
    const message = 'message';
    service.warning(message);
    service.toastEvents$.subscribe((toast) => {
      expect(toast?.message).toBe(message);
      expect(toast?.['type']).toBe('warning');
    });
  });
  it('should emit event with a info toast when info method is called', () => {
    const message = 'message';
    service.info(message);
    service.toastEvents$.subscribe((toast) => {
      expect(toast?.message).toBe(message);
      expect(toast?.['type']).toBe('info');
    });
  });
});
