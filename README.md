# 3-Qubit Quantum Simulator

An educational quantum computer simulator that runs entirely inside the browser.

The application demonstrates the behavior of a 3-qubit quantum system using modern web technologies without requiring any backend server.

Users can explore quantum gates, superposition, phase, entanglement, density matrices, Bloch spheres, and measurement collapse through interactive visualizations.

The simulator is fully client-side and deployable on GitHub Pages.

---

## Live Demo

- Demo: https://bowo-prasetyo.github.io/quantum-3qubits/
- Repository: https://github.com/bowo-prasetyo/quantum-3qubits/

---

## Features

### Quantum Simulation

- 3-qubit quantum state simulation
- Complex-valued quantum amplitudes
- Single-qubit gates
- Controlled-NOT (CNOT) operations
- Bell state generation
- GHZ state generation
- Quantum superposition
- Quantum phase manipulation
- Quantum entanglement
- Quantum measurement
- Measurement collapse
- State normalization

### Visualization

- Quantum state display
- Probability distribution chart
- Density matrix visualization
- Reduced density matrix computation
- Bloch sphere visualization
- Entanglement graph visualization
- WebGL accelerated visualization

### Application Features

- Vue 3 CDN architecture
- Vue Router multi-page navigation
- Web Worker quantum computation
- IndexedDB persistence
- Client-side architecture
- GitHub Pages compatible
- Educational user manual
- Quantum concepts reference
- Automatic state restoration

---

## Supported Quantum Gates

### Single-Qubit Gates

| Gate | Name | Description |
|------|------|-------------|
| I | Identity Gate | Leaves the qubit unchanged |
| H | Hadamard Gate | Creates superposition |
| X | Pauli-X Gate | Quantum NOT gate |
| Y | Pauli-Y Gate | Bit flip with phase rotation |
| Z | Pauli-Z Gate | Phase flip |
| S | Phase Gate | 90° phase rotation |
| T | π/8 Gate | 45° phase rotation |

### Multi-Qubit Gates

| Gate | Name | Description |
|------|------|-------------|
| CNOT | Controlled-NOT Gate | Conditionally flips the target qubit |

---

## Quantum State Representation

The simulator represents a 3-qubit quantum system as:

```text
|ψ⟩ =
α|000⟩ + β|001⟩ + γ|010⟩ + δ|011⟩ +
ε|100⟩ + ζ|101⟩ + η|110⟩ + θ|111⟩
```

Where:

- α through θ are complex probability amplitudes
- The system may occupy all basis states simultaneously
- The total probability always equals 1

Normalization rule:

```text
|α|² + |β|² + |γ|² + |δ|² +
|ε|² + |ζ|² + |η|² + |θ|² = 1
```

---

## Basis States

A 3-qubit system contains eight computational basis states:

```text
|000⟩
|001⟩
|010⟩
|011⟩
|100⟩
|101⟩
|110⟩
|111⟩
```

---

## Probability Visualization

The simulator displays measurement probabilities for all basis states.

The probability chart shows:

```text
|000⟩
|001⟩
|010⟩
|011⟩
|100⟩
|101⟩
|110⟩
|111⟩
```

Taller bars indicate higher measurement probability.

This helps visualize:

- Superposition
- Quantum interference
- Entanglement
- Gate effects
- Measurement collapse

---

## Bell States

The simulator can generate Bell states such as:

```text
(|000⟩ + |110⟩) / √2
```

using:

1. Hadamard gate on Qubit 0
2. CNOT gate

Bell states demonstrate two-qubit entanglement.

Typical measurements become:

```text
|000⟩
|110⟩
```

while other basis states rarely appear.

---

## GHZ States

The simulator can generate a three-qubit GHZ state:

```text
(|000⟩ + |111⟩) / √2
```

using:

1. Hadamard gate
2. CNOT gate
3. CNOT gate

The GHZ state entangles all three qubits simultaneously.

Typical measurements become:

```text
|000⟩
|111⟩
```

---

## Density Matrix Support

The simulator computes the complete density matrix of the quantum system.

The density matrix provides:

- Probability information
- Phase relationships
- Quantum coherence
- Entanglement information

Both pure-state and mixed-state representations can be expressed using density matrices.

---

## Reduced Density Matrices

For each qubit, a reduced density matrix is computed by tracing out the remaining qubits.

This allows the simulator to display the local state of each individual qubit even when the system is entangled.

---

## Bloch Sphere Visualization

Each qubit is visualized on a Bloch sphere.

The Bloch vector indicates:

- State orientation
- Degree of purity
- Superposition
- Entanglement effects

Pure states lie on the sphere surface, while mixed or entangled states move toward the center.

---

## Entanglement Graph

The simulator visualizes quantum correlations between qubits.

The graph helps illustrate:

- Pairwise entanglement
- Correlation strength
- Multi-qubit interactions

Stronger connections indicate stronger quantum correlations.

---

## WebGL Visualization

GPU-accelerated WebGL rendering is used for advanced visualizations.

Benefits include:

- Smoother rendering
- Better scalability
- Future support for larger simulations

---

## Quantum Concepts Demonstrated

The simulator demonstrates:

- Qubits
- Superposition
- Quantum amplitudes
- Complex numbers
- Quantum phase
- Interference
- Entanglement
- Bell states
- GHZ states
- Density matrices
- Reduced density matrices
- Bloch spheres
- Controlled operations
- Measurement collapse
- Probability distributions
- Reversible computation

---

## Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript ES Modules
- Vue 3
- Vue Router

### Browser APIs

- Web Workers
- HTML Canvas
- WebGL
- IndexedDB

### Deployment

- GitHub Pages

---

## Project Structure

```text
quantum-3qubits/
├── index.html
├── app.js
├── router.js
├── worker.js
├── db.js
├── styles.css
└── README.md
```

---

## Architecture

### Main Thread

Responsible for:

- Vue UI rendering
- Probability charts
- Density matrix rendering
- Bloch sphere rendering
- Entanglement graph rendering
- WebGL visualization
- IndexedDB persistence
- User interaction

### Web Worker

Responsible for:

- Quantum gate operations
- State-vector evolution
- Matrix-vector multiplication
- CNOT computation
- Bell state generation
- GHZ state generation
- Density matrix computation
- Reduced density matrix computation
- Measurement and collapse

This separation keeps the user interface responsive while quantum calculations run in the background.

---

## Persistence

The simulator automatically stores the latest quantum state using IndexedDB.

After refreshing the browser, the previous state is restored automatically.

---

## Educational Use Cases

The included User Manual demonstrates:

1. Classical bit flipping
2. Quantum superposition
3. Measurement collapse
4. Reversible computation
5. Quantum phase manipulation
6. Bell state creation
7. Controlled operations
8. Probability visualization
9. GHZ state creation
10. Bloch sphere analysis
11. Density matrix visualization
12. Entanglement visualization

---

## Future Improvements

Possible future enhancements:

- Quantum circuit editor
- Drag-and-drop gates
- Animated gate transitions
- Quantum Fourier Transform
- Grover's algorithm
- Shor's algorithm demonstrations
- WebGPU acceleration
- WASM math backend
- Noise simulation
- Decoherence simulation
- Quantum error correction examples
- Larger qubit systems

---

## License

MIT License

---

## Assisted By

[ChatGPT](https://chatgpt.com/)
