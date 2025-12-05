import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.css',
  imports: [CommonModule],
  animations: [
    trigger('fadeSlideIn', [
      state('void', style({ opacity: 0, transform: 'translateY(30px)' })),
      transition(':enter', animate('0.8s ease-out')),
    ]),
    trigger('lineAnimation', [
      state('void', style({ width: 0 })),
      transition(':enter', animate('0.8s 0.3s ease-out')),
    ]),
    trigger('textFadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', animate('0.8s 0.5s ease-out')),
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        query(
          '.vision-card',
          style({ opacity: 0, transform: 'translateY(50px)' }),
          { optional: true }
        ),
        query(
          '.vision-card',
          stagger(
            100,
            animate(
              '0.8s ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ),
          { optional: true }
        ),
      ]),
    ]),
    trigger('dotsFadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('1s 1s ease-out')),
    ]),
  ],
})
export class VisionComponent {
  @ViewChild('sectionRef') sectionRef!: ElementRef;

  isInView = false;

  visionCards = [
    {
      title: 'Empower',
      statement:
        'Democratizing fashion design by making professional-grade AI tools accessible to creators worldwide.',
    },
    {
      title: 'Innovate',
      statement:
        'Pushing the boundaries of creative technology to unlock new possibilities in fashion expression.',
    },
    {
      title: 'Sustain',
      statement:
        'Building a future where technology enhances human creativity while promoting sustainable design practices.',
    },
  ];

  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '-100px',
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isInView = true;
          observer.disconnect();
        }
      });
    }, options);
    observer.observe(this.sectionRef.nativeElement);
  }
}
