import ToastModel from '../../../../../controllers/toast/resources/ToastModel';

export default class ToastRenderItem extends ToastModel {
  ngClass = {};
  positionY = 0;
  icon = '';
  defineStyle(): void {
    if (this.type == 'success') {
      this.icon = 'success';
    } else if (this.type == 'error') {
      this.icon = 'error';
    } else if (this.type == 'warning') {
      this.icon = 'warning';
    } else if (this.type == 'info') {
      this.icon = 'info';
    }
    this.ngClass = {
      'toast-success': this.type === 'success',
      'toast-error': this.type === 'error',
      'toast-info/home/igor/Downloads/Group 19.svg': this.type === 'info',
      'toast-warning': this.type === 'warning',
    };
  }
}
