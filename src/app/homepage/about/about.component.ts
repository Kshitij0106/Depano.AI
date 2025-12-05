import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface MockupImage {
  src: string;
  alt: string;
  className: string;
}

@Component({
  standalone: true,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  imports: [CommonModule],
})
export class AboutComponent {
  mockupImages: MockupImage[] = [
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F1179166747.png?alt=media&token=90a0a320-3696-4eeb-b7d0-ebf6ac9c10ef',
      alt: 'Fashion design sketch',
      className: 'w-48 h-64',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F1381583102.png?alt=media&token=9f657bf5-d29e-4490-b0a2-dfb7706f652a',
      alt: 'Fashion color palette',
      className: 'w-40 h-48',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F204703172.png?alt=media&token=85c6aabe-560c-4fe0-b716-d2de98c4bbc3',
      alt: 'Designer workspace',
      className: 'w-56 h-40',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F136500795.png?alt=media&token=759202a0-a1c4-47c4-a6e8-4bfe786bfc24',
      alt: 'Fashion model portfolio',
      className: 'w-44 h-60',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F1775046177.png?alt=media&token=d83e80b3-3598-436c-99c2-aaa165230ac0',
      alt: 'Creative design process',
      className: 'w-48 h-32',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F860254096.png?alt=media&token=2b7819de-df63-40cc-b134-970524872a14',
      alt: 'Fabric swatches and materials',
      className: 'w-44 h-60',
    },
  ];
}
