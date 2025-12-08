---
sidebar_position: 5
---

# Week 4: Perception & State Estimation

## The Problem of Uncertainty

Robots do not experience the world directly; they only experience noisy sensor data. **State Estimation** is the art of recovering the "true" state (position, velocity, orientation) from these noisy measurements.

### Sensors
*   **IMU (Inertial Measurement Unit)**: Accelerometer + Gyroscope. High rate (1000Hz), but drills over time.
*   **Encoders**: Measures joint angles. Precise but doesn't tell you where the robot base is in the world.
*   **LiDAR/Vision**: Absolute positioning, but slow (10-60Hz) and computationally heavy.

## The Kalman Filter

The **Kalman Filter (KF)** is the standard algorithm for fusing data.

1.  **Prediction Step**: Use the system model (e.g., "I commanded the motor to move forward") to predict the new state.
2.  **Update Step**: Use the sensor measurement to correct the prediction.

For non-linear systems (like robots), we use the **Extended Kalman Filter (EKF)**.

## Lab: Sensor Fusion with Python

We will fuse a noisy position sensor with a noisy velocity sensor.

```python
import numpy as np
import matplotlib.pyplot as plt

# 1D Kalman Filter Implementation
def kalman_update(mean, var, measurement, meas_var):
    """Update Gaussian with new measurement"""
    measured_mean = measurement
    measured_var = meas_var
    
    new_mean = (var * measured_mean + measured_var * mean) / (var + measured_var)
    new_var = (var * measured_var) / (var + measured_var)
    return new_mean, new_var

def kalman_predict(mean, var, motion, motion_var):
    """Predict next step based on movement"""
    return mean + motion, var + motion_var

# Simulation
true_pos = 0.0
est_pos = 0.0
est_var = 1.0

positions = []

for i in range(10):
    # Move
    true_pos += 1.0
    est_pos, est_var = kalman_predict(est_pos, est_var, 1.0, 0.1)
    
    # Measure (Noisy)
    measurement = true_pos + np.random.normal(0, 0.5)
    est_pos, est_var = kalman_update(est_pos, est_var, measurement, 0.1)
    
    positions.append(est_pos)

print("Estimated Positions:", positions)
```

:::info Modern Approaches
While KFs are standard, modern "Learning-based State Estimation" uses Recurrent Neural Networks (RNNs) or Transformers to estimate state directly from raw history, handling complex non-linearities better than EKFs.
:::
