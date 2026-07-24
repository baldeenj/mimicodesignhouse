---
title: "Atom Loss: A Bottleneck in Quantum Computing"
tag: Quantum Computing
date: 2025-10-31
heroImage: /uploads/hero-atom-loss-quantum-computing.jpg
summary: "Neutral-atom quantum computers are one of the most promising near-term architectures — but atom loss, when qubits physically disappear from the system mid-computation, remains a key obstacle to scaling. Here's what's being done about it."
---

## Introduction

Until recently, quantum computers have faced a significant obstacle known as 'atom loss', which has limited their advancement and ability to operate for long durations. At the heart of these systems are quantum bits, or qubits, which represent information in a quantum state, allowing them to be in the state 0, 1, or both simultaneously, thanks to superposition. Qubits are formed from subatomic particles and engineered through precise manipulation and measurement of quantum mechanical properties.

Historically, this atom loss phenomenon restricted quantum computers to performing computations for only a few milliseconds. Even the most sophisticated machines struggled to operate beyond a few seconds. However, recent breakthroughs by Sandia National Laboratories and Harvard University researchers have changed this landscape dramatically. At Harvard, researchers have built a quantum computer that could sustain operations for over two hours [1], a substantial improvement over previous limitation. This advancement has led scientists to believe they are on the verge of enabling quantum computers to run continuously, potentially without time constraints.

## What causes atom loss?

Atom loss presents a significant challenge in quantum computing, as it results in the loss of the fundamental unit of information – the qubit – along with any data it contains. During quantum computations, qubits may be lost from the system due to factors such as noise and temperature fluctuations. This phenomenon can lead to information degradation and eventual system failure. To maintain qubit stability and prevent atom loss, a stringent set of physical, environmental, and engineering conditions must be satisfied.

### Environmental fluctuations

Maintaining the integrity of qubits in a quantum computing system is heavily dependent on shielding them from various environmental disturbances. Qubits are highly sensitive to noise, electromagnetic fields, and stray particles, any of which can interfere with their quantum coherence. Quantum coherence describes the ability of a qubit to remain in a stable superposition state over time; the duration of this coherence directly affects how long a qubit can function without experiencing errors.

One fundamental requirement for preserving quantum coherence is the maintenance of cryogenic environments. Qubits must be kept at temperatures near absolute zero, which is essential for eliminating thermal noise and fostering the quantum behaviour necessary for reliable operations. Even slight fluctuations in temperature or the presence of external electromagnetic influences can cause the delicate quantum state of a qubit to degrade or flip unpredictably, leading to information loss and system errors [2].

These stringent environmental controls are critical for ensuring that qubits remain stable and effective throughout quantum computations, highlighting the importance of addressing environmental fluctuations as a key challenge in quantum computing.

### Trap imperfections

Neutral atom processors have become a prominent platform for achieving large-scale, fault-tolerant quantum computing [3]. This approach enables qubits to be encoded in states that possess exceptionally long coherence times, often extending up to tens of seconds. The extended coherence time is crucial for maintaining quantum information over prolonged computations, which is essential for complex and reliable quantum operations.

The operation of neutral atom processors relies on the use of optical tweezer arrays. These arrays are dynamically configured, allowing qubits to be trapped in arbitrary geometries and enabling the system to scale to tens of thousands of qubits. The flexibility in configuration and scalability makes neutral atom processors especially suited for advancing quantum computing technology beyond previous limitations.

Despite these advantages, neutral atom processors are not immune to challenges. Atom loss remains a significant issue, arising from several sources. Heating within the system can cause atoms to escape their traps, while collisions with background gas particles further contribute to atom loss. Additionally, during the excitation of an atom from one quantum state to another, such as the transition to a Rydberg state, anti-trapping can occur, leading to the loss of qubits from the processor array.

### Readout errors

During the process of reading out quantum information, qubits may be displaced from their positions within the two-dimensional arrays. This readout operation, which involves imaging the qubits to determine their quantum state, can inadvertently lead to the loss of qubits from the processor array. Such atom loss poses a risk to the integrity and continuity of quantum computations.

To address this challenge, neutral atom processor arrays are typically designed with additional qubits that act as a buffer. These extra qubits ensure that, even when some atoms are lost during readout or other operations, enough qubits remain available for the system to continue performing calculations reliably.

Another approach to mitigating atom loss during readout is to slow down the imaging process. By reducing the speed of readout operations, the likelihood of displacing qubits can be minimized, thereby decreasing the rate at which atoms are lost from the array. However, this strategy comes with a trade-off: slowing down readout operations leads to reduced overall system efficiency, as calculations take longer to complete [4]. As a result, there is an inherent balance between maintaining qubit integrity and preserving the speed and efficiency of quantum computations.

### Imperfect isolation

Maintaining perfect isolation of qubits from their environment is an immense challenge, primarily because it demands highly sophisticated and costly shielding methods. In practice, it is virtually impossible to completely shield quantum systems from external influences. As a result, stray electromagnetic signals, fluctuations in temperature, and mechanical vibrations can penetrate these defences and interact with quantum systems. Such interactions are detrimental, as they can disrupt the delicate balance required for quantum operations and ultimately lead to atom loss within the processor array [5]. These environmental disturbances compromise the stability and coherence of qubits, posing a significant obstacle to the reliability and scalability of quantum computers.

## Recent solutions and research

Multiple research teams are developing ways to reduce atom loss by detecting and correcting missing atoms in quantum systems, improving calculation reliability.

Researchers at Sandia National Laboratories, in collaboration with the University of New Mexico, have published a study demonstrating, for the first time, that qubit leakage errors in neutral atom platforms can be detected without compromising or altering computational outcomes [6]. The team achieved this by utilising the alternating states of entanglement and disentanglement among atoms within the system. In experiments where the atoms were disentangled, results showed substantial deviations compared to those observed during entanglement. This approach enabled the detection of the presence of adjacent atoms without direct observation, thereby preserving the integrity of the information contained within each atom.

Ancilla qubits are essential in quantum error correction and algorithms [7]. These extra qubits help with measurement and gate implementation, yet they do not store information from the main quantum state. By weakly entangling ancilla qubits with the physical qubits, it becomes possible for them to identify errors without disturbing the actual quantum data. Thanks to non-demolition measurements, errors can be detected while keeping the physical qubit's state intact.

A group of physicists from Harvard University have recently created the first quantum computer capable of continuous operation without needing to restart [1]. By inventing a technique to replenish qubits in optical tweezer arrays as they exit the system, the researchers managed to keep the computer running for more than two hours. Their setup contains 3,000 qubits and can inject up to 300,000 atoms each second into the array, compensating for any lost qubits. This approach enables the system to maintain quantum information, even as atoms are lost and replaced. According to the Harvard team, this innovation could pave the way for quantum systems that can function indefinitely.

## Conclusion

It was previously believed that atom loss could seriously hinder the progress of quantum computing. Atom loss and qubit leakage were serious errors that could render calculations unreliable. With the advancements introduced by the researchers at Sandia National Laboratories, the University of New Mexico and Harvard University, and a host of other teams around the world, the revolutionary advancements quantum computers could introduce in scientific research, medicine and finance are becoming closer than ever. It was believed that a reliable quantum computer running indefinitely was a decade or more away. With these new advancements in mitigating atom loss, quantum computers running indefinitely and producing reliable results are only a few years away.
</content>
