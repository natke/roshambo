# Test in-model pre and post processing with python AP
import os
import numpy as np
import onnxruntime
import onnxruntime_extensions

input_image_path = os.path.join("paper.png")
input_bytes = np.fromfile(input_image_path, dtype=np.uint8)

# Load the model
session_options = onnxruntime.SessionOptions()
session_options.register_custom_ops_library(onnxruntime_extensions.get_library_path())
session = onnxruntime.InferenceSession('model.with_pre_post_processing.onnx', session_options)

# Run the model
results = session.run(["prediction"], {"image": input_bytes})

print(results[0])

