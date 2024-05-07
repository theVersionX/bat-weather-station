import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-slider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-slider.component.html',
  styleUrl: './custom-slider.component.less'
})
export class CustomSliderComponent {
  @Input() value: number = 10;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Output() changedEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onValueChange(): void {
    this.changedEvent.emit(this.value);
  }
}
