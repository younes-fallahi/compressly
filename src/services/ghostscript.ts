import { exec } from "child_process";
import os from "os";
import { qualityNumberToString } from "../utils/qualityToString";
import util from "util";

const execPromise = util.promisify(exec);

export async function compressPDF(
  inputPath: string,
  outputPath: string,
  quality: number
): Promise<void> {
  // ghostscript quality levels : printer (low compression) , ebook (medium compression) , screen (high compression)
  let qualityString = qualityNumberToString(quality);

  // Check platform and set Ghostscript command accordingly
  const gsCommand =
    os.platform() === "win32"
      ? `"C:\\Program Files\\gs\\gs10.04.0\\bin\\gswin64c.exe" -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${qualityString} -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`
      : `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${qualityString} -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`;

  try {
    const { stdout, stderr } = await execPromise(gsCommand);

    if (stderr) {
      console.warn(`Ghostscript warning: ${stderr}`);
    }
    console.log(`PDF compressed successfully: ${outputPath}`);
  } catch (error) {
    console.error(`Error compressing PDF: ${(error as Error).message}`);
    throw new Error("Failed to compress the PDF.");
  }
}
