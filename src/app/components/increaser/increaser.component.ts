import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html'
})
export class IncreaserComponent implements OnInit {

  @ViewChild('txtPercentage') txtPercentage: ElementRef;

  @Input() leyend: string = 'leyend';
  @Input() percentage: number = 50;

  @Output() updatedValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // console.log('Mostrar leyenda', this.leyend);
  }

  onChanges(newValue: number) {

    // const elemHTML: any = document.getElementsByName('percentage')[0];

    if (newValue >= 100) {
      this.percentage = 100;
    } else if (newValue <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = newValue;
    }

    // elemHTML.value = this.percentage;
    this.txtPercentage.nativeElement.value = this.percentage;
    this.updatedValue.emit(this.percentage);
  }

  changeValue( value: number) {
    if (this.percentage >= 100 && value > 0) {
      this.percentage = 100;
      return;
    }
    if (this.percentage < 0 && value < 0 ) {
      this.percentage = 0;
      return;
    }
    this.percentage += value;
    this.updatedValue.emit(this.percentage);
    this.txtPercentage.nativeElement.focus();
  }

}
