import { Component, OnInit, Input } from '@angular/core';
import { Popularity } from 'src/app/data/popularity';

@Component({
    selector: 'app-thermometer',
    templateUrl: './thermometer.component.html',
    styleUrls: ['./thermometer.component.css'],
    standalone: false
})
export class ThermometerComponent implements OnInit {
  @Input() popularity:Popularity;
  @Input() label:string = 'Popularity';

  constructor() { }

  ngOnInit() {
  }

  get popularityLabel():string {
    const score = this.popularity?.percent * 100;

    if (score >= 85) return 'Peak';
    if (score >= 65) return 'Strong';
    if (score >= 40) return 'Rising';
    return 'Low';
  }

}
