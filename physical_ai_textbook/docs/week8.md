---
sidebar_position: 9
---

# Week 8: Reinforcement Learning for Control

## The RL Paradigm in Robotics

Reinforcement Learning (RL) has revolutionized legged locomotion. Instead of hand-tuning PID gains for every joint, we define a **Reward Function** and let the robot learn how to walk via trial and error in simulation.

### Key Algorithms
1.  **PPO (Proximal Policy Optimization)**: The workhorse of on-policy RL. Stable and relatively easy to tune.
2.  **SAC (Soft Actor-Critic)**: Off-policy, sample efficient, good for manipulation.

### Sim-to-Real Gap
A policy trained in simulation often fails in the real world due to:
*   Inaccurate physics modeling (friction, mass distribution).
*   Sensor noise.
*   Latency.

**Solution**: Domain Randomization. We vary mass, friction, and delays during training so the policy becomes robust.

## Lab: Training a Walking Policy

We will use **Isaac Lab** (formerly Orbit) on top of Isaac Sim.

### Step 1: Install Isaac Lab
*Follow the official NVIDIA documentation for your specific GPU setup.*

### Step 2: Define the Task (Python)
```python
# Pseudo-code for a Humanoid Task
class HumanoidWalkTask(ManagerBasedRleEnv):
    def __init__(self, cfg):
        # Define observation space (joint pos, vel, base lin_vel)
        # Define action space (joint position targets)
        pass

    def _get_rewards(self):
        # Reward forward velocity
        lin_vel_reward = torch.sum(self.base_lin_vel[:, :2] * self.commands[:, :2], dim=1)
        # Penalize energetic cost
        torque_penalty = torch.sum(torch.square(self.dof_torques), dim=1)
        return lin_vel_reward - 0.01 * torque_penalty
```

### Step 3: Train
```bash
./isaaclab.sh -p scripts/rsl_rl/train.py --task Humanoid-v1 --headless
```
