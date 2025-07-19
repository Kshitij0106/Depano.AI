import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { EditService } from '../services/edit.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  @ViewChild('canvasEl', { static: true })
  canvasEl!: ElementRef<HTMLCanvasElement>;

  canvas!: fabric.Canvas;
  userImage!: fabric.Image;
  drawnPaths: fabric.Path[] = [];

  imageUrl: string = '';
  email: string = '';
  userPrompt: string = '';
  maskPreviewUrl: string = '';

  drawMode: boolean = false;

  constructor(
    private editService: EditService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeUser();
    this.initializeCanvas();
    this.loadUserImage();
  }

  /** Initialize email and image URL */
  private initializeUser(): void {
    this.email = this.userService.getEmail() || '';
    this.imageUrl = this.editService.getImageUrl();
  }

  /** Setup canvas, drawing mode, and path collection */
  private initializeCanvas(): void {
    this.drawMode = true;

    this.canvas = new fabric.Canvas(this.canvasEl.nativeElement, {
      selection: false,
      preserveObjectStacking: true
    });

    this.canvas.on('path:created', (e: any) => {
      if (e.path) {
        this.drawnPaths.push(e.path);
      }
    });

    this.canvas.isDrawingMode = this.drawMode;
    this.canvas.freeDrawingBrush.width = 10;
    this.canvas.freeDrawingBrush.color = 'rgba(255, 255, 255, 0.8)';
  }

  /** Load original image onto canvas */
  private loadUserImage(): void {
    fabric.Image.fromURL(
      this.imageUrl,
      (img) => {
        this.userImage = img;
        img.selectable = false;

        this.canvas.setWidth(img.width!);
        this.canvas.setHeight(img.height!);
        this.canvas.add(img);
      },
      { crossOrigin: 'anonymous' }
    );
  }

  /** Trigger mask generation and send data to backend */
  generateImage(): void {
    this.generateMask();
    this.sendToServer();
  }

  /** Generate binary masked image */
  private generateMask(): void {
    const { width, height } = this.userImage;

    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = width!;
    maskCanvas.height = height!;
    const ctx = maskCanvas.getContext('2d')!;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width!, height!);

    // Clone and add paths as white to mask canvas
    const pathCanvas = new fabric.StaticCanvas(null, { width, height });

    this.canvas.getObjects().forEach((obj) => {
      if (obj.type === 'path') {
        const clonedPath = fabric.util.object.clone(obj) as fabric.Path;
        clonedPath.set({
          fill: 'white',
          left: clonedPath.left ?? 0,
          top: clonedPath.top ?? 0,
          scaleX: clonedPath.scaleX ?? 1,
          scaleY: clonedPath.scaleY ?? 1,
          selectable: false,
        });
        pathCanvas.add(clonedPath);
      }
    });

    pathCanvas.renderAll();
    ctx.drawImage(pathCanvas.getElement(), 0, 0);

    // Save mask as data URL
    this.maskPreviewUrl = maskCanvas.toDataURL('image/png');
    console.log('Generated Mask URL:', this.maskPreviewUrl);
  }

  /** Send original image URL, mask blob, and prompt to server */
  async sendToServer(): Promise<void> {
    try {
      const formData = new FormData();

      const maskBlob = await (await fetch(this.maskPreviewUrl)).blob();
      console.log('Masked Image Blob URL:', URL.createObjectURL(maskBlob));

      formData.append('originalImage', this.imageUrl); // original is just a URL
      formData.append('maskedImage', maskBlob, 'mask.png');
      formData.append('prompt', this.userPrompt);

      console.log("Form Data => ", {
        originalImage: formData.get('originalImage'),
        maskedImage: formData.get('maskedImage'),
        prompt: this.userPrompt
      });

      this.editService.sendImageData(this.email, formData).subscribe({
        next: (response) => {
          console.log('Server Response:', response);
          this.loadUserImageFromURL(response.url);
        },
        error: (err) => {
          console.error('Upload Failed:', err);
          alert('Failed to send edit request.');
        }
      });
    } catch (err) {
      console.error('Error preparing data:', err);
    }
  }

  /** Load new image (response) after edit */
  private loadUserImageFromURL(url: string): void {
    this.canvas.clear();
    this.loadImage(url);
  }

  /** Re-load image from given URL to canvas */
  private loadImage(url: string): void {
    fabric.Image.fromURL(
      url,
      (img) => {
        this.userImage = img;
        img.selectable = false;

        this.canvas.setWidth(img.width!);
        this.canvas.setHeight(img.height!);
        this.canvas.add(img);
      },
      { crossOrigin: 'anonymous' }
    );
  }

  /** Remove last path drawn */
  undoLastMask(): void {
    if (this.drawnPaths.length > 0) {
      const last = this.drawnPaths.pop();
      this.canvas.remove(last!);
      this.canvas.renderAll();
    }
  }

  /** Clear everything and reset canvas */
  resetCanvas(): void {
    this.canvas.clear();
    this.drawnPaths = [];
    this.maskPreviewUrl = '';
    this.userPrompt = '';
    this.loadUserImage();
  }
}
