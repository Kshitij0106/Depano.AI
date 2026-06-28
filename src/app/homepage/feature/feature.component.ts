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
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-feature',
  standalone: true,
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css',
  imports: [CommonModule, LucideAngularModule],
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
          { optional: true },
        ),
        query(
          '.feature-card',
          stagger(
            100,
            animate(
              '0.6s ease-out',
              style({ opacity: 1, transform: 'translateY(0)' }),
            ),
          ),
          { optional: true },
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
      icon: 'BookOpen',
      title: 'Innovative Outfit Generation',
      description:
        'Create unique, never-seen-before outfits in seconds with Depano AI’s user-friendly interface. Depano AI blends creativity with precision to bring your boldest fashion ideas to life instantly.',
    },
    {
      icon: 'Scissors',
      title: 'Real-Time Editing',
      description:
        'Refine and customize designs effortlessly with intuitive prompt-based editing tool. Make quick adjustments to styles, colors, and details until your vision is perfectly realized.',
    },
    {
      icon: 'Shirt',
      title: 'Sketch to Reality',
      description:
        'Turn rough sketches into stunning, photorealistic outfits. The AI enhances your concepts with accurate textures, proportions, and design detailing.',
    },
    {
      icon: 'Users',
      title: 'Virtual Try-On (Beta-phase)',
      description:
        'Visualize any outfit on models of your choice. Experience realistic fitting with advanced fabric draping across body types.',
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
