import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Popularity } from 'src/app/data/popularity';

@Component({
    selector: 'app-thermometer',
    templateUrl: './thermometer.component.html',
    styleUrls: ['./thermometer.component.css'],
    standalone: false
})
export class ThermometerComponent implements OnInit, OnDestroy {
  @Input() popularity:Popularity;
  @Input() label:string = 'Popularity';
  displayedPercent:number = 0;
  private animationFrameId:number;

  constructor() { }

  ngOnInit() {
    this.animateMeter();
  }

  ngOnDestroy() {
    if(this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  get displayedPercentageString():string {
    return Math.round(this.displayedPercent) + '%';
  }

  private animateMeter() {
    const target = this.popularity.percent * 100;

    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.displayedPercent = target;
      return;
    }

    const startedAt = performance.now();
    const duration = 1100;
    const step = (now:number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      this.displayedPercent = target * easedProgress;

      if(progress < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      }
    };

    this.animationFrameId = requestAnimationFrame(step);
  }

}
