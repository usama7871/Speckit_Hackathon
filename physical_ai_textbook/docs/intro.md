---
slug: /
sidebar_position: 1
hide_table_of_contents: true
---

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

<div className="hero hero--primary" style={{borderRadius: '16px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)'}}>
  <div className="container">
    <h1 className="hero__title">Physical AI & Humanoid Robotics</h1>
    <p className="hero__subtitle">From Sim-to-Real: The Definitive Guide to Embodied Intelligence</p>
    <div>
      <a className="button button--secondary button--lg" href="/week1">Start Learning →</a>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>🤖 Embodied AI</h3>
      </div>
      <div className="card__body">
        <p>Master the <strong>Embodiment Hypothesis</strong>. Understand why intelligence needs a body to truly emerge and interact with the physical world.</p>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>🧠 VLA Models</h3>
      </div>
      <div className="card__body">
        <p>Deploy state-of-the-art <strong>Vision-Language-Action</strong> models like RT-2 and OpenVLA to give your robots common sense.</p>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="card">
      <div className="card__header">
        <h3>⚡ Real-Time Control</h3>
      </div>
      <div className="card__body">
        <p>Bridge the Sim-to-Real gap with <strong>Whole-Body Control</strong>, MPC, and reliable ROS 2 middleware architecture.</p>
      </div>
    </div>
  </div>
</div>

<br/>

## 🌌 Course Overview

This interactive textbook covers the journey from basic embodiment concepts to deploying intelligence on humanoid hardware.

### 📚 Curriculum
- **Foundations**: ROS 2, URDF, and Simulation.
- **Perception**: Sensor fusion and Computer Vision.
- **Control**: Whole-Body Control (WBC) and Model Predictive Control (MPC).
- **Learning**: Reinforcement Learning and Imitation Learning.
- **VLA**: Vision-Language-Action models.

:::tip Galactic Feature 🚀
**RAG Assistant Active**: Click the 💬 icon in the bottom right to ask questions about the course material or debug your ROS 2 nodes!
:::

