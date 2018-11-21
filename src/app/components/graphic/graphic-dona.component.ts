import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphic-dona',
  templateUrl: './graphic-dona.component.html',
  styles: []
})
export class GraphicDonaComponent implements OnInit {

  @Input() data: number[] = [350, 450, 100];
  @Input() labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() chartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
