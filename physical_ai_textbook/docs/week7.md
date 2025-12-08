---
sidebar_position: 8
---

# Week 7: Modern Control (MPC & WBC)

## Why PID Fail in Humanoids

PID controls each joint individually. But in a humanoid, moving the left arm shifts the Center of Mass (CoM), which might necessitate moving the right leg to maintain balance. The joints are **coupled**.

## Model Predictive Control (MPC)

MPC solves an optimization problem *at every time step*.

1.  **Look Ahead**: Predict what will happen for the next $T$ seconds if I apply inputs $U$.
2.  **Optimize**: Find the best $U$ to minimize cost (e.g., "stay upright", "use minimal energy").
3.  **Act**: Apply the first input $u_0$.
4.  **Repeat**.

### Convex MPC
For legged robots, we often simplify the robot to a single mass (Potato Model). The dynamics become linear, and the optimization becomes a **Quadratic Program (QP)**, which can be solved in milliseconds.

## Whole-Body Control (WBC)

WBC runs at high frequency (1kHz) and ensures that the tasks requested by the planner/MPC are executed while respecting physical constraints:
*   Friction cones (don't slip).
*   Joint limits.
*   Torque limits.

### Hierarchy of Tasks
WBC allows strict prioritization:
1.  **Priority 0**: Don't fall over.
2.  **Priority 1**: Track the hand trajectory.
3.  **Priority 2**: Look at the target.

If Priority 1 conflicts with Priority 0, Priority 0 wins.

## Lab: QP Solvers in Python

We can use `cvxpy` to solve a simple QP relevant to force distribution.

```python
import cvxpy as cp
import numpy as np

# Problem: Support a 10kg weight on 2 legs.
# Minimize effort (forces squared).
# Constraint: F1 + F2 = mg

F = cp.Variable(2) # Forces on [Left Leg, Right Leg]
mg = 10.0 * 9.81

# Objective: Minimize F1^2 + F2^2
cost = cp.sum_squares(F)

# Constraints
constraints = [
    cp.sum(F) == mg,  # Support the weight
    F >= 0            # Legs can only push, not pull
]

prob = cp.Problem(cp.Minimize(cost), constraints)
prob.solve()

print("Force Distribution:", F.value)
# Result should be [49.05, 49.05] (Equal distribution)
```
