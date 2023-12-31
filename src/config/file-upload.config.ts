import { diskStorage } from 'multer';
import { extname } from 'path';

export const fileUploadConfig = (destination: string) => {
  return {
    storage: diskStorage({
      destination,
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  };
};
