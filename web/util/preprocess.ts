import { Tensor } from 'onnxruntime-web';
var base64js = require('base64-js')
import Jimp from 'jimp/es';
const Buffer = require('buffer/').Buffer;



//    transform = transforms.Compose([
//      transforms.Resize(256),
//      transforms.CenterCrop(224),
//      transforms.ToTensor(),
//      transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
//    ])

export const preprocess = async (image: string, width: number, height: number): Promise<Tensor> => {
    const split = image.split(',');
    const [, string] = split;

    const jimp_image_0 = await Jimp.read(Buffer.from(string, 'base64'))
    jimp_image_0.resize(256, 256)
                .crop(224).normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])

    //const jimp_image = await Jimp.read(base64js.toByteArray(string))

    const test = await jimp_image_0.getBase64Async(jimp_image_0.getMIME());

    console.log(test)
}

export function imageDataToTensor(image: string, width: number, height: number): Tensor {

  // Convert base64 image to bytes
  const uint8array = base64js.toByteArray(image.replace('data:image/png;base64,', ''))

  // 1. Get buffer data from image and create R, G, and B arrays.
  const [redArray, greenArray, blueArray] = new Array(new Array<number>(), new Array<number>(), new Array<number>());

  // 2. Loop through the image buffer and extract the R, G, and B channels
  for (let i = 0; i < uint8array.length; i += 3) {
    redArray.push(uint8array[i]);
    greenArray.push(uint8array[i+1]);
    blueArray.push(uint8array[i+2]);
    // skip data[i + 3] to filter out the alpha channel
  }

  // 3. Concatenate RGB to transpose [224, 224, 3] -> [3, 224, 224] to a number array
  const transposedData = redArray.concat(greenArray).concat(blueArray);

  // 4. convert to float32
  let i, l = transposedData.length; // length, we need this for the loop
  // create the Float32Array size 3 * 224 * 224 for these dimensions output
  const float32Data = new Float32Array(3 * width * height);
  for (i = 0; i < l; i++) {
    float32Data[i] = transposedData[i] / 255.0; // convert to float
  }
  // 5. create the tensor object from onnxruntime-web.
  const inputTensor = new Tensor("float32", float32Data, [3, width, height]);
  return inputTensor;
}

