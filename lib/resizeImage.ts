// utils/resizeImage.ts
import Resizer from 'react-image-file-resizer';

export const resizeImage = (file: File, maxWidth: number, maxHeight: number, format: string = 'JPEG', quality: number = 100): Promise<string> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      format,
      quality,
      0, // rotation
      (uri) => {
        resolve(uri as string);
      },
      'base64',
      maxWidth,
      maxHeight,
    );
  });
};
