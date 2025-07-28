import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fabric } from 'fabric';
import { EditService } from '../services/edit.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @ViewChild('canvasEl', { static: true })
  canvasEl!: ElementRef<HTMLCanvasElement>;

  @ViewChild('canvasContainer', { static: true })
  canvasContainer!: ElementRef<HTMLDivElement>;

  originalImageWidth = 0;
  originalImageHeight = 0;
  imageScale = 1;
  drawnPaths: fabric.Path[] = [];

  devicePixelRatio: number = window.devicePixelRatio || 1;

  canvas!: fabric.Canvas;
  image: string = '';
  maskImageUrl: string = '';
  email: string = '';
  userPrompt: string = '';

  // image =
  //   'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/1216112402.jpg?alt=media&token=e8d905b0-2417-49fe-9c23-caf8af7c3db4';

  constructor(
    private editService: EditService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeUser();
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
      console.log('Image URL from service:', this.image);
    });
    this.loadImage(this.image);
  }

  /** Initialize email and image URL */
  private initializeUser(): void {
    this.email = this.userService.getEmail() || '';
  }

  private initializeCanvas(): void {
    this.canvas = new fabric.Canvas(this.canvasEl.nativeElement, {
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

    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
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

  loadImage(imageUrl: string): void {
    this.canvas.clear();
    this.drawnPaths = [];

    fabric.Image.fromURL(
      imageUrl,
      (fabricImg) => {
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
      },
      { crossOrigin: 'anonymous' }
    );
  }

  /** Trigger mask generation and send data to backend */
  generateImage(): void {
    this.generateMask();
    this.sendToServer();
  }

  generateMask(): void {
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

    const tempCanvas = new fabric.Canvas(null, {
      width,
      height,
    });

    this.canvas.getObjects().forEach((obj) => {
      if (obj.type === 'path') {
        const clonedPath = fabric.util.object.clone(obj) as fabric.Path;
        clonedPath.set({
          fill: 'white',
          selectable: false,
        });
        tempCanvas.add(clonedPath);
      }
    });

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
      this.editService
        .sendImageData(this.email, formData)
        .subscribe((result) => {
          if (result.status === 'Success') {
            console.log('Image edited successfully:', result);
            const base64 = result.url;
            const editedImageUrl = `data:image/png;base64,${base64}`;
            this.loadImage(editedImageUrl);
          }
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
}
