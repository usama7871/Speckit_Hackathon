---
sidebar_position: 4
---

# Week 3: Simulation Environments

## The Importance of Simulation

In Physical AI, training directly on hardware is dangerous, expensive, and slow. **Simulators** allow us to:
1.  Train safely (resetting after a fall costs nothing).
2.  Parallelize training (run 10,000 robots at once).
3.  Generate infinite synthetic data.

## Landscape of Physics Engines

### 1. MuJoCo (Multi-Joint dynamics with Contact)
*   **Best for**: Reinforcement Learning, research.
*   **Pros**: Extremely fast, stable contact dynamics, differentiable.
*   **Cons**: Visuals are basic.
*   **Format**: MJCF (`.xml`).

### 2. NVIDIA Isaac Sim
*   **Best for**: Photorealistic rendering, perception training, "Digital Twins".
*   **Engine**: PhysX 5 (GPU accelerated).
*   **Pros**: USD (Universal Scene Description) pipeline, incredibly realistic sensors.
*   **Cons**: Heavy hardware requirements (RTX GPU).

### 3. Gazebo (Harmonic/Ionic)
*   **Best for**: Traditional ROS 2 development.
*   **Pros**: Native ROS integration, open source.

## Lab: Introduction to Isaac Sim

We will spawn a simple robot in NVIDIA Isaac Sim and control it via Python.

### Step 1: Launch Isaac Sim
Open the Omniverse Launcher and start **Isaac Sim**.

### Step 2: Loading a USD Stage
```python
from omni.isaac.core import World
from omni.isaac.core.objects import DynamicCuboid
import numpy as np

# Initialize World
world = World()
world.scene.add_default_ground_plane()

# Add a Cube (The "Hello World" of Physics)
cube = world.scene.add(
    DynamicCuboid(
        prim_path="/World/cube",
        name="awesome_cube",
        position=np.array([0, 0, 1.0]),
        scale=np.array([0.5, 0.5, 0.5]),
        color=np.array([1.0, 0, 0]),
    )
)

world.reset()

# Simulation Loop
for i in range(500):
    world.step(render=True)
```

### URDF vs MJCF vs USD
- **URDF**: The ROS standard. Rigid trees.
- **MJCF**: MuJoCo specific. Allows flexible objects.
- **USD**: Pixar's format. The future of 3D, used by NVIDIA.
