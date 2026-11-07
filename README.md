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
- Correlation graph of measured-bit agreement between qubit pairs
- 3D WebGL basis-state visualization

### Application Features

- Vue 3 CDN architecture
- Vue Router multi-page navigation
- Web Worker quantum computation
- IndexedDB persistence
- Client-side architecture
- GitHub Pages compatible
- Quantum circuit editor (tap or drag gates; works with mouse, touch and keyboard)
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
| CNOT | Controlled-NOT Gate | Flips the target qubit when the control qubit is \|1⟩ |

The **CNOT** button always uses qubit 0 as control and qubit 1 as target.
In the Circuit Editor, a CNOT step uses the selected qubit as control and the next qubit as target (q0→q1, q1→q2, q2→q0).

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

starting from |000⟩ (press **Reset** first), using:

1. Hadamard gate on qubit 0
2. CNOT gate (control qubit 0, target qubit 1)

The **Create Bell Pair** button runs both steps. It does not reset first.

Bell states demonstrate two-qubit entanglement.

Measurements always give one of:

```text
|000⟩
|110⟩
```

while the other six basis states never appear.

---

## GHZ States

The simulator can generate a three-qubit GHZ state:

```text
(|000⟩ + |111⟩) / √2
```

starting from |000⟩ (press **Reset** first), using:

1. Hadamard gate on qubit 0
2. CNOT gate (control qubit 0, target qubit 1)
3. CNOT gate (control qubit 1, target qubit 2)

The **GHZ State** button runs all three steps. It does not reset first.

The GHZ state entangles all three qubits simultaneously.

Measurements always give one of:

```text
|000⟩
|111⟩
```

---

## Density Matrix Support

The simulator computes and displays the complete density matrix of the quantum system.

In the display, each square's area shows the size of an entry compared with the largest entry, its colour shows the phase, and the diagonal shows the measurement probabilities.

The density matrix provides:

- Probability information
- Phase relationships
- Quantum coherence
- Entanglement information

The full 3-qubit state in this simulator is always pure, so its density matrix is ρ = |ψ⟩⟨ψ|.
Mixed states appear only in the reduced single-qubit states described below.

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

Pure states lie on the sphere surface, while mixed states lie inside it.

Because the full 3-qubit state is always pure here, a qubit whose Bloch vector is shorter than 1 is entangled with the other qubits.
This makes the Bloch spheres the simulator's indicator of entanglement.
For example, after **Create Bell Pair** the vectors of qubits 0 and 1 shrink to the centre, while qubit 2 stays at |0⟩.

---

## Correlation Graph

The correlation graph shows, for each pair of qubits, how reliably their measured bits agree or disagree.

Each edge shows |⟨ZᵢZⱼ⟩|, computed from the probabilities of the eight basis states:

- **1.00**: the two bits are always equal, or always opposite
- **0.00**: knowing one bit tells you nothing about the other

The graph measures correlation in the computational (0/1) basis only. **It is not a measure of entanglement.**
For example, after **Reset** the state |000⟩ shows 1.00 on every edge, because every bit is always 0, yet nothing is entangled.
After **Create Bell Pair**, the Q0–Q1 edge stays at 1.00 while the edges to Q2 drop to 0.00.

To see entanglement, use the Bloch spheres.

---

## WebGL Visualization

The WebGL view places the eight basis states at the corners of a 3D cube.

- Point size shows each state's probability
- Colour shows the phase of its amplitude, using the same colours as the density matrix
- Drag with the mouse or one finger to rotate the cube; use the mouse wheel or a two-finger pinch to zoom

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

### Library Versions

Vue and Vue Router are loaded from the jsDelivr CDN at exact, pinned versions:

| Library | Version |
|---|---|
| Vue | 3.5.44 |
| Vue Router | 4.6.4 |

Each script tag in `index.html` also carries a Subresource Integrity (`integrity`) hash, so the browser only runs the exact file that was tested.

To upgrade a library:

1. Change the version number in its URL in `index.html`
2. Compute the new hash:

   ```bash
   curl -sL <script-url> | openssl dgst -sha384 -binary | base64
   ```

3. Replace the `integrity` value with `sha384-` followed by that hash
4. Test the simulator and the User Manual before publishing

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
├── router.js          # Vue pages and visualizations
├── engine.js          # Simulation maths: pure functions, any number of qubits
├── worker.js          # Background worker: runs engine.js gates and measurement
├── db.js
├── styles.css
├── tests/
│   └── engine.test.js # Unit tests for engine.js
├── package.json       # Only configures the tests; the app has no build step
├── docs/
└── README.md
```

---

## Running Tests

The simulation engine has unit tests that use Node's built-in test runner, so there is nothing to install. With Node.js 20 or newer:

```bash
npm test
```

The tests cover:

- gate matrices and identities
- CNOT on every pair of qubits
- Bell and GHZ states
- normalization
- measurement statistics
- density matrices, reduced states, Bloch vectors and correlations

GitHub Actions runs them on every pull request.

---

## Architecture

All the simulation maths lives in `engine.js`, a set of pure functions with no dependency on the page. Both the main thread and the worker use it, and it is covered by unit tests.

### Main Thread

Responsible for:

- Vue UI rendering
- Probability charts
- Density matrix rendering
- Bloch sphere rendering
- Correlation graph rendering
- WebGL visualization
- Density matrix, reduced density matrix, Bloch vector and correlation computation (using `engine.js`)
- Running Bell, GHZ and circuit sequences, one worker step at a time
- IndexedDB persistence
- User interaction

### Web Worker

Responsible for:

- Single-qubit gate operations on the state vector
- CNOT computation
- Measurement and collapse

The worker is a module worker that imports `engine.js`.

The main thread sends the current state with each request and receives the new state back.
Gates and measurements run in the background, and the main thread computes what is displayed from the returned state.

---

## Persistence

The simulator automatically stores the latest quantum state and the Circuit Editor's steps using IndexedDB.

After refreshing the browser, both are restored automatically.

---

## Educational Use Cases

The included User Manual demonstrates:

1. Classical bit flip
2. Quantum superposition
3. Quantum measurement collapse
4. Double Hadamard reversibility
5. Quantum phase rotation
6. Bell state creation
7. Controlled operations
8. Probability visualization
9. GHZ state creation
10. Bloch sphere analysis
11. Density matrix visualization
12. Correlation graph analysis
13. Entanglement and mixed states
14. WebGL quantum state visualization
15. Quantum phase visualization
16. 3D camera exploration
17. Circuit editor
18. Session persistence

---

## Product Direction

The plan is to merge the 1-, 2- and 3-qubit simulators into one guided Quantum Lab. See:

- [Product vision](docs/VISION.md)
- [Merge plan](docs/MERGE_PLAN.md)

Both are proposals for review.

---

## Future Improvements

Possible future enhancements:

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
