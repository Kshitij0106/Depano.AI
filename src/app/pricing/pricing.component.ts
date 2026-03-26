import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LucideAngularModule } from 'lucide-angular';

export interface PricingPlan {
  name: string;
  icon: string;
  price: string;
  period: string;
  images: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LucideAngularModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent {
  @Input() isLoggedIn: boolean = false;

  @Output() selectPlan = new EventEmitter<{
    name: string;
    price: string;
    images: string;
    icon: string;
  }>();

  @Output() navigateHome = new EventEmitter<void>();
  @Output() navigateDashboard = new EventEmitter<void>();

  plans: PricingPlan[] = [
    {
      name: 'Starter Plan',
      icon: '🧵',
      price: '₹790',
      period: 'month',
      images: '100 Credits',
      description:
        'Perfect for students and independent designers exploring new ideas and experimenting with styles.',
      features: [
        'Access to all image generation & editing features',
        'Fast processing using Gemini Imagine & SDXL',
        'Ideal for light usage',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Designer Plan',
      icon: '👗',
      price: '₹1,490',
      period: 'month',
      images: '200 Credits',
      description:
        'Best for freelance designers and growing teams who need more creative bandwidth.',
      features: [
        'All Starter features',
        'Priority image generation',
        'Ideal for regular usage',
      ],
      cta: 'Choose Plan',
      popular: true,
    },
    {
      name: 'Studio Plan',
      icon: '🏢',
      price: '₹2,090',
      period: 'month',
      images: '300 Credits',
      description:
        'Designed for fashion houses and power users who need scale and efficiency.',
      features: [
        'All Designer features',
        'Dedicated support',
        'Best value per image',
        'Ideal for heavy usage',
      ],
      cta: 'Subscribe Now',
      popular: false,
    },
  ];

  onSelect(plan: PricingPlan) {
    this.selectPlan.emit({
      name: plan.name,
      price: plan.price,
      images: plan.images,
      icon: plan.icon,
    });
  }

  onHome() {
    this.navigateHome.emit();
  }

  onDashboard() {
    this.navigateDashboard.emit();
  }
}
