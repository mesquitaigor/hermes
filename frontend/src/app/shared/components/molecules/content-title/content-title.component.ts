import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'content-title',
  templateUrl: './content-title.component.html',
  styleUrls: ['./content-title.component.scss'],
})
export default class ContentTitleComponent {
  @Output() back = new EventEmitter<void>();

  handleBack(): void {
    this.back.emit();
  }
}
