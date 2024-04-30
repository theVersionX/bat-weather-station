import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-radio-btns',
  templateUrl: './custom-radio-btns.component.html',
  styleUrls: ['./custom-radio-btns.component.less'],
  standalone: true,
  imports: [CommonModule]
})
export class CustomRadioBtnsComponent implements OnInit {

  @Input() title: string = "";
  @Input() list: string[] = [];
  @Input() currentSelected: string = "";
  @Output() selectedEvent = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
    if (this.currentSelected == "") {
      this.currentSelected = this.list[0];
    }
    this.selectItem(this.currentSelected);
  }

  selectItem(value: string) {
    this.currentSelected = value;
    this.selectedEvent.emit(value);
  }
}
