import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent implements OnInit, OnDestroy {
  @Input() originalImage: File | null = null;
  @Input() generatedImage: string = '';
  @Output() startOver = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();

  originalPreview: string = '';

  ngOnInit(): void {
    if (this.originalImage) {
      this.originalPreview = URL.createObjectURL(this.originalImage);
    }
  }

  ngOnDestroy(): void {
    if (this.originalPreview) {
      URL.revokeObjectURL(this.originalPreview);
    }
  }

  handleStartOver(): void {
    console.log('Start Over clicked in ResultComponent');
    this.startOver.emit();
  }

  handleDownload(): void {
    this.download.emit();
  }

  handleShare(): void {
    this.share.emit();
  }
}
