import * as ort from 'onnxruntime-web';
import path from 'path';
var base64js = require('base64-js')

export const predict = async (image): Promise<Inference> => {
    try {
        //Find the absolute path of the model directory
        const modelDirectory = path.join(process.cwd(), 'model');
        console.log(modelDirectory)
    
        // TODO Move session initialization into app initialization
        console.log("Creating ORT inference session")
        //const session = await ort.InferenceSession.create(modelDirectory + '/model.with_pre_post_processing.onnx')
        const session = await ort.InferenceSession.create('./_next/static/chunks/pages/model.with_pre_post_processing.onnx')
        console.log(session)

        console.log(image.current.width)
        console.log(image.current.height)
        console.log(image.current.width * image.current.height * 3)

        // Pre process the image bytes
        const uint8array = base64js.toByteArray(image.current.src.replace('data:image/png;base64,', ''))
        console.log(uint8array.length)

        const inputTensor = new ort.Tensor("uint8", uint8array, [uint8array.length]);
    
        // Run inference
        const feeds: Record<string, ort.Tensor> = {};
        feeds[session.inputNames[0]] = inputTensor;
        const outputData = await session.run(feeds);
        const output = outputData[session.outputNames[0]];
       
        console.log(output)
       
        
        return { time: 1668548621, prediction: 'rock', scores: [1, 0, 0], timestamp: 1668548621, model_update: 3, message: 'Hello' }
    
      } catch (error) {
        console.log(error)
      }
    
}
