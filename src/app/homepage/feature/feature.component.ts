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
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-feature',
  standalone: true,
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css',
  imports: [CommonModule],
  animations: [
    trigger('fadeSlideIn', [
      state('hidden', style({ opacity: 0, transform: 'translateY(30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('0.8s ease-out')),
    ]),
    trigger('lineAnimation', [
      state('hidden', style({ width: 0 })),
      state('visible', style({ width: '6rem' })),
      transition('hidden => visible', animate('0.8s 0.3s ease-out')),
    ]),
    trigger('featuresAnimation', [
      state('hidden', style({})),
      state('visible', style({})),
      transition('hidden => visible', [
        query(
          '.feature-card',
          style({ opacity: 0, transform: 'translateY(50px)' }),
          { optional: true }
        ),
        query(
          '.feature-card',
          stagger(
            100,
            animate(
              '0.6s ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ),
          { optional: true }
        ),
      ]),
    ]),
    trigger('fadeIn', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('1s 0.8s ease-out')),
    ]),
  ],
})
export class FeatureComponent implements AfterViewInit {
  @ViewChild('sectionRef') sectionRef!: ElementRef;

  isVisible = false;

  features = [
    {
      icon: 'book-open',
      title: 'Smart Sketching',
      description:
        'Transform rough concepts into detailed fashion illustrations with AI-powered sketch enhancement and style refinement tools.',
    },
    {
      icon: 'scissors',
      title: 'Pattern Generation',
      description:
        'Create complex patterns and technical flats instantly. Our AI understands garment construction and fit for perfect results.',
    },
    {
      icon: 'shirt',
      title: 'Style Curation',
      description:
        'Generate complete look books and seasonal collections with intelligent color matching and trend forecasting capabilities.',
    },
    {
      icon: 'users',
      title: 'Virtual Fitting',
      description:
        'Visualize designs on diverse body types and sizes with realistic fabric draping and movement simulation technology.',
    },
  ];

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '-100px',
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.disconnect();
        }
      });
    }, options);
    observer.observe(this.sectionRef.nativeElement);
  }
}
