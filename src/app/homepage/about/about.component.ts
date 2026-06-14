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
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2Fhome10.png?alt=media&token=4e612ef0-4a11-4442-9fcc-1d1399b220f5',
      alt: 'Fashion design sketch',
      className: 'w-48 h-64',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2Fhome4.png?alt=media&token=4564aa51-7d70-4713-a7b3-2cf7d70f043c',
      alt: 'Fashion color palette',
      className: 'w-40 h-48',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2Fhome7.png?alt=media&token=6d14bd4d-f776-4633-bd64-f571fbac06b1',
      alt: 'Designer workspace',
      className: 'w-56 h-40',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F204703172.png?alt=media&token=85c6aabe-560c-4fe0-b716-d2de98c4bbc3',
      alt: 'Fashion model portfolio',
      className: 'w-44 h-60',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2F1179166747.png?alt=media&token=90a0a320-3696-4eeb-b7d0-ebf6ac9c10ef',
      alt: 'Creative design process',
      className: 'w-48 h-32',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FHomePage%2Fhome1.png?alt=media&token=4eeba0a4-aab9-4de1-82dc-3542ff11f74c',
      alt: 'Fabric swatches and materials',
      className: 'w-44 h-60',
    },
  ];
}
