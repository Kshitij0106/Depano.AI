import { Injectable } from '@angular/core';
import heic2any from 'heic2any';

@Injectable({
  providedIn: 'root',
})
export class ImageValidationService {
  private readonly uploadAllowedTypes = [
    'image/jpeg',
    'image/png',
    'image/heic',
    'image/heif',
  ];
  private readonly finalAllowedTypes = ['image/jpeg', 'image/png'];

  private readonly maxFileSizeMB = 6;
  private readonly maxDimensions = 2048;
  private readonly minDimensions = 256;

  constructor() {}

  public async convertHeicToJpeg(file: File): Promise<File> {
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.9,
    });

    const jpegBlob = Array.isArray(convertedBlob)
      ? convertedBlob[0]
      : convertedBlob;

    return new File([jpegBlob], this.replaceExtension(file.name, '.jpg'), {
      type: 'image/jpeg',
    });
  }

  public preValidateImage(file: File): void {
    if (!this.uploadAllowedTypes.includes(file.type)) {
      throw new Error(
        'Unsupported image format. Please upload a JPG, JPEG, PNG, or HEIC image.',
      );
    }

    const fileSizeMB = file.size / (1024 * 1024);

    if (fileSizeMB > this.maxFileSizeMB) {
      throw new Error(
        `Image size exceeds the ${this.maxFileSizeMB}MB limit. Please upload a smaller image.`,
      );
    }
  }

  public async postValidateFile(file: File): Promise<void> {
    if (!this.finalAllowedTypes.includes(file.type)) {
      throw new Error(
        'Unsupported image format. Please upload a JPG, JPEG, PNG image.',
      );
    }

    await this.validateImageDimensions(file);
  }

  private replaceExtension(fileName: string, extension: string): string {
    const index = fileName.lastIndexOf('.');

    if (index === -1) {
      return fileName + extension;
    }

    return fileName.substring(0, index) + extension;
  }

  private validateImageDimensions(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      const objectUrl = URL.createObjectURL(file);

      image.onload = () => {
        try {
          const width = image.width;
          const height = image.height;

          if (width > this.maxDimensions || height > this.maxDimensions) {
            reject(
              new Error(
                `Image dimensions exceed the maximum allowed size of ${this.maxDimensions}x${this.maxDimensions}px.`,
              ),
            );

            return;
          }

          if (width < this.minDimensions || height < this.minDimensions) {
            reject(
              new Error(
                `Image dimensions are too small. Minimum required size is ${this.minDimensions}x${this.minDimensions}px.`,
              ),
            );

            return;
          }

          resolve();
        } finally {
          URL.revokeObjectURL(objectUrl);
        }
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);

        reject(
          new Error(
            'Unable to read the image. Please upload a valid image file.',
          ),
        );
      };

      image.src = objectUrl;
    });
  }
}
