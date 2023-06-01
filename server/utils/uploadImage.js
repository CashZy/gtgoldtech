import fs from "fs";
import path from "path";
const uploadImage = async (image, location, name) => {
  const { fileUploadLocation } = useRuntimeConfig();
  return new Promise((resolve, reject) => {
    if (!image.mimetype.startsWith("image")) {
      return reject(
        createError({
          statusCode: 401,
          statusMessage: "Please upload Image Type",
        })
      );
    }
    if (image.size > 2048000) {
      return reject(
        createError({
          statusCode: 401,
          statusMessage: "File size is large",
        })
      );
    }

    let oldPath = image.filepath;
    const featuredImage = `${name ? name : image.newFilename}${
      path.parse(image.originalFilename).ext
    }`;
    let newPath = path.join(fileUploadLocation, location) + "/" + featuredImage;
    let rawData = fs.readFileSync(oldPath);

    fs.writeFile(newPath, rawData, function (err) {
      if (err) {
        return reject(
          createError({
            statusCode: 401,
            statusMessage: "file upload error",
          })
        );
      }

      resolve(featuredImage);
    });
  });
};

export default uploadImage;
