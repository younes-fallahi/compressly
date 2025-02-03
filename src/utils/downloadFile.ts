import axios from "axios";
import fs from "fs";

export const downloadFile = async (
  url: string,
  filePath: string
): Promise<void> => {
  const response = await axios.get(url, { responseType: "stream" });
  const writer = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};
