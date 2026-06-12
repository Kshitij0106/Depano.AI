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
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrl: './outputs.component.css',
  imports: [CommonModule, LucideAngularModule],
  animations: [
    trigger('fadeSlideIn', [
      state('void', style({ opacity: 0, transform: 'translateY(50px)' })),
      transition(':enter', animate('0.8s ease-out')),
    ]),
    trigger('lineAnimation', [
      state('void', style({ width: '0' })),
      transition(':enter', animate('0.8s 0.3s ease-out')),
    ]),
    trigger('arrowLeftAnimation', [
      state('void', style({ opacity: 0, transform: 'translateX(-20px)' })),
      transition(':enter', animate('0.6s 0.5s ease-out')),
    ]),
    trigger('arrowRightAnimation', [
      state('void', style({ opacity: 0, transform: 'translateX(20px)' })),
      transition(':enter', animate('0.6s 0.5s ease-out')),
    ]),
    trigger('galleryFadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('0.8s 0.4s ease-out')),
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        query('.card', style({ opacity: 0, transform: 'scale(0.9)' }), {
          optional: true,
        }),
        query(
          '.card',
          stagger(
            100,
            animate(
              '0.6s ease-out',
              style({ opacity: 1, transform: 'scale(1)' }),
            ),
          ),
          { optional: true },
        ),
      ]),
    ]),
    trigger('dotsFadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', animate('0.8s 0.8s ease-out')),
    ]),
  ],
})
export class OutputsComponent implements AfterViewInit {
  @ViewChild('sectionRef') sectionRef!: ElementRef;
  @ViewChild('scrollRef') scrollRef!: ElementRef;
  @ViewChild('headerRef') headerRef!: ElementRef;

  isInView = false;
  canScrollLeft = false;
  canScrollRight = true;

  styleCategories = [
    {
      name: 'Vintage',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2Fhome.png?alt=media&token=3b9a93c2-7a3f-4c6e-ab25-fab5b3c8f27d',
      description: 'Timeless classics with nostalgic charm and retro appeal',
    },
    {
      name: 'Traditional',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2Fhome6.png?alt=media&token=c6a38eaf-07a2-46ed-a7f6-fcba9cf1a113',
      description: 'Innovative materials and avant-garde silhouettes',
    },
    {
      name: 'Boho',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2Fhome2.png?alt=media&token=6bc54c0e-ebc0-41aa-b848-9dac778eeed3',
      description:
        'Free-spirited designs with flowing fabrics and earthy tones',
    },
    {
      name: 'Ethnic',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2Fhome8.png?alt=media&token=8c158d51-105d-45c8-a7d6-969ebd5743fc',
      description:
        'Urban fashion with bold graphics and contemporary silhouettes',
    },
    {
      name: 'Streetwear',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2Fhome5.png?alt=media&token=b523fbc5-05f7-48e7-bff8-d2a26f3dc5d8',
      description: 'Clean lines and understated elegance in neutral palettes',
    },
    {
      name: 'Minimalist',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2Fhome9.png?alt=media&token=4e50e54d-8ce7-4ec2-b205-f6d2cd206b3d',
      description:
        'Traditional patterns and cultural heritage in modern interpretations',
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
          this.isInView = true;
          this.checkScrollButtons();
          observer.disconnect();
        }
      });
    }, options);
    observer.observe(this.sectionRef.nativeElement);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.sectionRef) return;
    const rect = this.sectionRef.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const progress = Math.max(
      0,
      Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)),
    );
    const y = 50 - progress * 100;
    this.headerRef.nativeElement.style.transform = `translateY(${y}px)`;
  }

  checkScrollButtons() {
    if (this.scrollRef?.nativeElement) {
      const { scrollLeft, scrollWidth, clientWidth } =
        this.scrollRef.nativeElement;
      this.canScrollLeft = scrollLeft > 0;
      this.canScrollRight = scrollLeft < scrollWidth - clientWidth - 10;
    }
  }

  scrollToDirection(direction: 'left' | 'right') {
    if (this.scrollRef?.nativeElement) {
      const cardWidth = 400;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      this.scrollRef.nativeElement.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(() => this.checkScrollButtons(), 300);
    }
  }
}
