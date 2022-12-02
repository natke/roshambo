# Test in-model pre and post processing with python AP
import os
from PIL import Image
import numpy as np
import onnxruntime

im = Image.open("scissors.png").convert("RGB")
print(im.format, im.size, im.mode)
image = np.array(im)

# Load the model
session_options = onnxruntime.SessionOptions()
session = onnxruntime.InferenceSession('model.with_pre_post_processing.onnx', session_options)

# Run the model
results = session.run(["prediction"], {"image": image[...,:3]})

print(results[0])

