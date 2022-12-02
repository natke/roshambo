import * as math from 'mathjs'
import * as ort from 'onnxruntime-web'
import { OUTCOMES } from './helpers';


export const predict = async (canvas: HTMLCanvasElement): Promise<Inference> => {
    try {

        // TODO Move session initialization into app initialization
        console.log("Creating ORT inference session")
        const session = await ort.InferenceSession.create('./_next/static/chunks/pages/model.with_pre_post_processing.onnx')

        // Get the image bytes from the canvas
        // TODO: simplify this, or add to model 
        const ctx = canvas.getContext("2d");
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height).data;
        const uint8Array = Array.prototype.slice.call(imageData)
        const numPixels = canvas.width * canvas.height

        const rgba = math.reshape(uint8Array, [uint8Array.length/4, 4]);
        const test = math.subset(rgba, math.index(math.range(0, numPixels), [0,1,2]));
        const rgb = math.reshape(test, [numPixels * 3])

        console.log ("creating input tensor")
        const inputTensor = new ort.Tensor("uint8", rgb, [canvas.height, canvas.width, 3]);    
        const feeds: Record<string, ort.Tensor> = {};
        feeds[session.inputNames[0]] = inputTensor;


        // Run inference
        console.log("Running inference")
        const outputData = await session.run(feeds);
        const output = outputData[session.outputNames[0]];

        const max = Math.max(...output.data);
        const index = output.data.indexOf(max);
        const prediction = OUTCOMES[index];

        return {
          time: 1,
          prediction: prediction,
          scores: { none: output.data[0], paper: output.data[1], rock: output.data[2], scissors: output.data[3]},
          timestamp: new Date(),
          model_update: 3,
          message: 'Prediction'
        }
    
      } catch (error) {
        console.log(error)
      }
    
}
