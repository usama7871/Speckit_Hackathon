# Physical AI & Humanoid Robotics: Course Outline

## Section 1: Foundations of Embodied Intelligence
**Week 1: Introduction to Physical AI**
- What is Physical AI?
- The Embodiment Hypothesis
- Overview of Humanoid Platforms (Tesla Optimus, Figure 01, Unitree H1)
- **Lab**: Setting up the Development Environment (Ubuntu, Docker, NVIDIA Drivers)

**Week 2: Robot Operating System 2 (ROS 2) Basics**
- ROS 2 Architecture (Nodes, Topics, Services, Actions)
- DDS Middleware and QoS
- **Lab**: Creating a Custom ROS 2 Node (Python & C++)

**Week 3: Simulation Environments**
- Physics Engines (MuJoCo, Bullet, PhysX)
- Introduction to Gazebo Harmonic
- Introduction to NVIDIA Isaac Sim
- **Lab**: Simulating a Simple Manipulator in Isaac Sim

## Section 2: Perception & Control
**Week 4: Sensor Fusion & State Estimation**
- IMUs, Encoders, and joint state estimation
- Kalman Filters (EKF/UKF)
- **Lab**: Sensor Fusion for a Mobile Base

**Week 5: Computer Vision for Robotics**
- RGB-D Cameras & Point Clouds
- Object Detection (YOLO) & Segmentation (SAM)
- **Lab**: Visual Servoing in Simulation

**Week 6: Classic Control Theory**
- PID Controllers
- Inverse Kinematics (IK) & Jacobians
- **Lab**: Controlling a 7-DOF Arm with IK

**Week 7: Modern Control (MPC & WBC)**
- Model Predictive Control (MPC) basics
- Whole-Body Control (WBC) for balacing
- **Lab**: Balancing a Humanoid in Simulation

## Section 3: Learning for Robots
**Week 8: Reinforcement Learning (RL) for Control**
- MDPs, PPO, and SAC
- Sim-to-Real Transfer
- **Lab**: Training a Walking Policy with Isaac Gym / Lab

**Week 9: Imitation Learning**
- Behavior Cloning (BC)
- DAgger and Inverse RL
- **Lab**: Teleoperation and data collection

**Week 10: Vision-Language-Action (VLA) Models**
- Google RT-1, RT-2, and PaLM-E
- Foundation Models for Robotics
- **Lab**: Interacting with a VLA Model

## Section 4: Advanced Topics & Project
**Week 11: Human-Robot Interaction (HRI)**
- Safety standards
- Natural Language Interfaces
- **Lab**: Voice Control System

**Week 12: Deployment & Optimization**
- Edge Computing (Jetson Orin)
- Latency Optimization
- **Lab**: Deploying Nodes to Edge Hardware (Simulated)

**Week 13: Capstone Project Showcase**
- Integration of Perception, Control, and Learning
- Final Project formatting and presentation
