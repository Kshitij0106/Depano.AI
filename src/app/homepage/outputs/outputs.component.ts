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

@Component({
  standalone: true,
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrl: './outputs.component.css',
  imports: [CommonModule],
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
              style({ opacity: 1, transform: 'scale(1)' })
            )
          ),
          { optional: true }
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
      name: 'Boho',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F1179166747.png?alt=media&token=90a0a320-3696-4eeb-b7d0-ebf6ac9c10ef',
      description:
        'Free-spirited designs with flowing fabrics and earthy tones',
    },
    {
      name: 'Ethnic',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F1381583102.png?alt=media&token=9f657bf5-d29e-4490-b0a2-dfb7706f652a',
      description:
        'Urban fashion with bold graphics and contemporary silhouettes',
    },
    {
      name: 'Minimalist',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F204703172.png?alt=media&token=85c6aabe-560c-4fe0-b716-d2de98c4bbc3',
      description:
        'Traditional patterns and cultural heritage in modern interpretations',
    },
    {
      name: 'Streetwear',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F136500795.png?alt=media&token=759202a0-a1c4-47c4-a6e8-4bfe786bfc24',
      description: 'Clean lines and understated elegance in neutral palettes',
    },
    {
      name: 'Traditional',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F1775046177.png?alt=media&token=d83e80b3-3598-436c-99c2-aaa165230ac0',
      description: 'Innovative materials and avant-garde silhouettes',
    },
    {
      name: 'Vintage',
      image:
        'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F860254096.png?alt=media&token=2b7819de-df63-40cc-b134-970524872a14',
      description: 'Timeless classics with nostalgic charm and retro appeal',
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
      Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
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
