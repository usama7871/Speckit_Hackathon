---
sidebar_position: 10
---

# Week 9: Imitation Learning

## The Limits of Reinforcement Learning

RL is powerful but requires a perfect reward function. What if we can't define the reward? For example, "set the table elegantly"?

**Imitation Learning (IL)** bypasses the reward function problem by learning directly from expert demonstrations.

## Behavior Cloning (BC)

BC treats the problem as Supervised Learning.
*   **Input**: State ($s$).
*   **Label**: Expert Action ($a^*$).
*   **Loss**: $|| \pi(s) - a^* ||^2$.

### The Distribution Shift Problem
The error in BC compounds. If the robot drifts slightly off the expert's path, it enters a state it has never seen, makes a mistake, drifts further, and crashes. This is $O(T^2)$ error accumulation.

## DAgger (Dataset Aggregation)

To fix distribution shift, we interact with the expert *during training*.
1.  Train initial policy $\pi_0$.
2.  Run $\pi_0$ to collect data.
3.  Ask Expert to label the states visited by $\pi_0$.
4.  Retrain.

## Lab: Teleoperation Data Collection

We will simulate a teleoperation rig where we record human actions to train a policy.

```python
import numpy as np
import pickle

class DataRecorder:
    def __init__(self):
        self.observations = []
        self.actions = []
        
    def record(self, obs, action):
        self.observations.append(obs)
        self.actions.append(action)
        
    def save(self, filename="demo.pkl"):
        data = {
            "obs": np.array(self.observations),
            "act": np.array(self.actions)
        }
        with open(filename, 'wb') as f:
            pickle.dump(data, f)
            
# Mock Teleop Loop
recorder = DataRecorder()
for t in range(100):
    # In reality, obtain these from joystick and robot
    obs = np.random.randn(10) 
    action = np.random.randn(6) # 6DOF arm
    
    recorder.record(obs, action)
    
recorder.save()
print("Demonstration Saved.")
```
