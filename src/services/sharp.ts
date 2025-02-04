import sharp from "sharp";
import fs from "fs";
import path from "path";

export const compressWithSharp = async (
  inputFile: string,
  outputFile: string,
  quality: number,
  ext: string
) => {
  try {
    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile);

    await new Promise<void>((resolve, reject) => {
      let transformer;
      if (ext === ".jpg") {
        transformer = sharp().jpeg({ quality });
      } else if (ext === ".png") {
        transformer = sharp().png({ quality });
      } else {
        return;
      }

      readStream
        .pipe(transformer)
        .pipe(writeStream)
        .on("finish", resolve)
        .on("error", reject);
    });

    readStream.close();
    writeStream.close();

    console.log(
      `image successfully compressed ${path.basename(
        inputFile
      )} => ${path.basename(outputFile)} `
    );
  } catch (error) {
    console.log(error);
  }
};
