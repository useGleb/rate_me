import * as path from 'path';
import * as sharp from 'sharp';

export const imageSaveAsThumbnail = async (image: Express.Multer.File) => {
  // const originalName = path.parse(image.originalname).name;
  const filename = Date.now() + '-' + image.size + '-thumbnail' + '.webp';
  const filePath = 'public/';

  await sharp(image.buffer)
    .resize(400)
    .webp({ effort: 1 })
    .toFile(path.join(filePath, filename));
  return filePath + filename;
};
