import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Canvas, FabricImage, PencilBrush, Path } from 'fabric';
import { EditService } from '../services/edit.service';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  imports: [HeaderComponent, FormsModule, CommonModule],
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('canvasEl', { static: true })
  canvasEl!: ElementRef<HTMLCanvasElement>;

  @ViewChild('canvasContainer', { static: true })
  canvasContainer!: ElementRef<HTMLDivElement>;

  originalImageWidth = 0;
  originalImageHeight = 0;
  imageScale = 1;
  drawnPaths: Path[] = [];

  devicePixelRatio: number = window.devicePixelRatio || 1;

  canvas!: Canvas;

  image: string = '';
  maskImageUrl: string = '';
  userPrompt: string = '';

  result: string = '';
  error: boolean = false;

  constructor(
    private editService: EditService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeCanvas();
    this.getImage();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.resizeCanvas();
  }

  private getImage() {
    this.editService.imageUrl.subscribe((image) => {
      this.image = image;
    });
    this.result = 'success';
    this.loadImage(this.image);
  }

  private initializeCanvas(): void {
    this.canvas = new Canvas(this.canvasEl.nativeElement, {
      backgroundColor: 'white',
      selection: false,
      preserveObjectStacking: true,
    });

    this.canvas.on('path:created', (e: any) => {
      if (e.path) {
        this.drawnPaths.push(e.path);
      }
    });

    this.resizeCanvas();

    this.canvas.freeDrawingBrush = new PencilBrush(this.canvas);
    this.canvas.freeDrawingBrush.color = 'white';
    this.canvas.freeDrawingBrush.width = 8 / this.devicePixelRatio;
    this.canvas.isDrawingMode = true;
  }

  private resizeCanvas(): void {
    const canvasElement = this.canvasEl.nativeElement;

    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const width = (55 * vh) / 100; // 55vh in pixels
    const height = (65 * vh) / 100; // 65vh in pixels

    // Set internal canvas size (device pixel ratio scaled)
    canvasElement.width = width * this.devicePixelRatio;
    canvasElement.height = height * this.devicePixelRatio;

    // Set CSS display size
    canvasElement.style.width = `${width}px`;
    canvasElement.style.height = `${height}px`;

    // Update Fabric canvas size and zoom
    this.canvas.setDimensions({ width, height });
    this.canvas.setZoom(1);
    this.canvas.renderAll();
  }

  async loadImage(imageUrl: string): Promise<void> {
    this.canvas.clear();
    this.drawnPaths = [];

    try {
      const fabricImg = await FabricImage.fromURL(imageUrl, {
        crossOrigin: 'anonymous',
      });

      this.originalImageWidth = fabricImg.width || 0;
      this.originalImageHeight = fabricImg.height || 0;

      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();

      const scaleX = canvasWidth / (fabricImg.width || 1);
      const scaleY = canvasHeight / (fabricImg.height || 1);
      this.imageScale = Math.max(scaleX, scaleY);

      const offsetX =
        (canvasWidth - (fabricImg.width || 0) * this.imageScale) / 2;
      const offsetY =
        (canvasHeight - (fabricImg.height || 0) * this.imageScale) / 2;

      fabricImg.set({
        scaleX: this.imageScale,
        scaleY: this.imageScale,
        left: offsetX,
        top: offsetY,
        selectable: false,
        evented: false,
      });

      this.canvas.add(fabricImg);
      this.canvas.renderAll();
    } catch (err) {
      console.error('Error loading image:', err);
    }
  }

  /** Trigger mask generation and send data to backend */
  async generateImage() {
    await this.generateMask();
    this.sendToServer();
  }

  async generateMask(): Promise<void> {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const width = (55 * vh) / 100;
    const height = (65 * vh) / 100;

    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = width * this.devicePixelRatio;
    maskCanvas.height = height * this.devicePixelRatio;

    const ctx = maskCanvas.getContext('2d')!;
    ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    // Create an offscreen HTMLCanvasElement
    const htmlCanvas = document.createElement('canvas');
    htmlCanvas.width = width;
    htmlCanvas.height = height;

    // Create Fabric Canvas with it
    const tempCanvas = new Canvas(htmlCanvas, {
      width,
      height,
    });

    await Promise.all(
      this.canvas.getObjects().map(async (obj) => {
        if (obj.type === 'path') {
          const cloned = await (obj as Path).clone();
          cloned.set({ fill: 'white', selectable: false, evented: false });
          tempCanvas.add(cloned);
        }
      })
    );

    tempCanvas.renderAll();
    ctx.drawImage(tempCanvas.getElement(), 0, 0, width, height);

    this.maskImageUrl = maskCanvas.toDataURL('image/png');
  }

  /** Send original image URL, mask blob, and prompt to server */
  async sendToServer(): Promise<void> {
    try {
      const formData = await this.editService.prepareEditFormData(
        this.image,
        this.maskImageUrl,
        this.userPrompt
      );
      this.editService.editImage(formData).subscribe({
        next: (result) => {
          if (result.status === 'Success') {
            this.image = result.url;
            this.result = 'success';
            this.error = false;
            const base64 = result.url;
            const editedImageUrl = `data:image/png;base64,${base64}`;
            this.loadImage(editedImageUrl);
            this.image = editedImageUrl;
            this.userService.updateUserDetails();
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error = true;
          if (
            err.error?.status === 'SERVICE_UNAVAILABLE' ||
            err.error?.status === 'INTERNAL_SERVER_ERROR'
          ) {
            this.result = 'networkIssue';
          } else if (err.error?.status === 'PAYMENT_REQUIRED') {
            this.result = 'creditIssue';
          }
        },
      });
    } catch (err) {
      console.error('Error preparing data:', err);
    }
  }

  undoLastMask(): void {
    if (this.drawnPaths.length > 0) {
      const last = this.drawnPaths.pop();
      this.canvas.remove(last!);
      this.canvas.renderAll();
    }
  }

  resetCanvas(): void {
    this.canvas.clear();
    this.drawnPaths = [];
    this.maskImageUrl = '';
    this.userPrompt = '';
    this.loadImage(this.image);
  }

  ngOnDestroy(): void {
    if (this.canvas) {
      this.canvas.dispose();
    }
  }
}
