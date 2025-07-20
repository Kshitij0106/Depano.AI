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
    this.canvas.freeDrawingBrush.width = 15;
    this.canvas.freeDrawingBrush.color = 'rgba(255, 255, 255, 0.8)';
  }

  /** Load original image onto canvas */
  private loadUserImage(): void {
    // this.imageUrl = "https://cdn.shopify.com/s/files/1/0682/3755/8034/files/1_e25df779-5e6b-430d-8670-8feef1cc0a01.webp?v=1737267876";
    fabric.Image.fromURL(
      this.imageUrl,
      (img) => {
        this.userImage = img;
        img.selectable = false;

        this.canvas.setWidth(img.width!);
        this.canvas.setHeight(img.height!);
        this.canvas.add(img);

        const maxHeight = window.innerHeight * 0.65;
        const scaleRatio = img.height! > maxHeight ? maxHeight / img.height! : 1;

        this.canvas.setZoom(scaleRatio);
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
  }

  /** Send original image URL, mask blob, and prompt to server */
async sendToServer(): Promise<void> {
  try {
    const formData = await this.editService.prepareEditFormData(
      this.imageUrl,
      this.maskPreviewUrl,
      this.userPrompt
    );

    this.editService.sendImageData(this.email, formData).subscribe({
      next: (response) => {
        console.log('Server Response:', response);
        const editedImageUrl = this.editService.convertByteArrayToDataUrl(response.url);
        this.loadUserImageFromURL(editedImageUrl);
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

        const maxHeight = window.innerHeight * 0.65; // 65vh
        const scaleRatio = img.height! > maxHeight ? maxHeight / img.height! : 1;

        this.canvas.setZoom(scaleRatio);
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
