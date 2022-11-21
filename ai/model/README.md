# Roshambo model in the browser

1. Get model from Seth's original runs

2. Clone onnxruntime-extensions repo with Scott's branch (skottmckay/VisionStarter)

   Run the augmentation script to produce in model pre and post processing

   ```bash
   cd onnxruntime-extensions/tools
   add_pre_post_processing_to_model.py [-h] -t mobilenet --model_source pytorch <path>/model.onnx
   ```

   This generates `<path>/model.with_pre_post_processing.onnx`

3. Test with ONNX Runtime Python API

   ```bash
   python test_modek_with_pre_post_processing.py
   ```
