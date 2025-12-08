---
sidebar_position: 6
---

# Week 5: Computer Vision for Robotics

## From Pixels to Semantics

State Estimation gives us the robot's body state. **Computer Vision** gives us the state of the world around it.

### Key Modalities
*   **RGB**: Color information. Great for semantics ("That is a door").
*   **Depth (D)**: Geometry information. Great for obstacle avoidance.
*   **Point Clouds**: 3D representation of the world.

## RGB-D Pipelines

The standard "classic" pipeline:
1.  Receive Depth Image.
2.  Project pixels to 3D points using camera intrinsics.
3.  Filter noise (Voxel Grid Downsampling).
4.  Fit planes to find the floor.
5.  Cluster remaining points to find objects.

## Transformers in Vision (ViT)

Convolutional Neural Networks (CNNs) are being replaced by **Vision Transformers (ViT)**. ViTs maintain a global context of the image, which is crucial for understanding spatial relationships.

## Lab: Object Detection with YOLOv8

We will use the **Ultralytics YOLO** library to detect objects relevant to humanoids (cups, bottles, chairs).

### Step 1: Install
```bash
pip install ultralytics opencv-python
```

### Step 2: Real-time Detection
```python
from ultralytics import YOLO
import cv2

# Load a pretrained model (YOLOv8n is 'nano' - fast!)
model = YOLO('yolov8n.pt')

# Open Webcamera
cap = cv2.VideoCapture(0)

while cap.isOpened():
    success, frame = cap.read()
    if success:
        # Run inference
        results = model(frame)
        
        # Visualize
        annotated_frame = results[0].plot()
        
        cv2.imshow("YOLOv8 Inference", annotated_frame)
        
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
    else:
        break

cap.release()
cv2.destroyAllWindows()
```

### Segment Anything Model (SAM)
For grasping, bounding boxes aren't enough. We need **Segmentation Masks**. The **Segment Anything Model (SAM)** allows us to prompt the model with a point ("click on the bottle") and get a pixel-perfect mask for grasping.
