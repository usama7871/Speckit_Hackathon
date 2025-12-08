---
sidebar_position: 11
---

# Week 10: Vision-Language-Action (VLA) Models

## Foundation Models for Robots

Just as LLMs (Large Language Models) "solved" text, VLAs aim to solve robotic control by pre-training on massive datasets of robot trajectories and internet video.

### Evolution
1.  **RT-1 (Robotics Transformer 1)**: Tokenizes images and outputs tokenized actions. 97% success rate on seen tasks.
2.  **RT-2**: Co-fine-tunes a VLM (PaLI-X) on robot data. Exhibits **emergent reasoning**.
3.  **OpenVLA**: Open-source alternative based on Llama/Prismatic.

## Lab: Interacting with OpenVLA

We will load a quantized version of a VLA model and query it for actions.

### Step 1: Install Dependencies
```bash
pip install torch transformers accelerate
```

### Step 2: Inference Script
```python
from transformers import AutoModelForVision2Seq, AutoProcessor
from PIL import Image

# Load Model
model_id = "openvla/openvla-7b"
processor = AutoProcessor.from_pretrained(model_id, trust_remote_code=True)
model = AutoModelForVision2Seq.from_pretrained(
    model_id, 
    attn_implementation="flash_attention_2",
    torch_dtype=torch.float16, 
    low_cpu_mem_usage=True, 
    trust_remote_code=True
).to("cuda:0")

# Input
image = Image.open("robot_view.jpg")
prompt = "In: What action should I take to pick up the apple? Out:"

# Predict Action
inputs = processor(prompt, image).to("cuda:0", dtype=torch.float16)
action = model.predict_action(**inputs, unnorm_key="bridge_orig")

print(f"Predicted End-Effector Delta: {action}")
```
