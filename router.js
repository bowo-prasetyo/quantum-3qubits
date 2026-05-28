if ('gpu' in navigator) {
  console.log('WebGPU supported');
}

const menu = `<div class="card">
        <button @click="$router.push('/')">Simulator</button>
        <button @click="$router.push('/manual')">User Manual</button>
        <button @click="this.$globalThis.open('https://bowo-prasetyo.github.io/quantum-1qubit/', '_blank')">1 Qubit</button>
      </div>`;

const Home = {
  template: `
    <div class="container">
      ${menu}
      
      <div class="card">
        <h1>3 Qubits Quantum Simulator</h1>

        <p>
          Minimal quantum computer simulator that demonstrates the basic behavior of 2 quantum bits (qubits).
        </p>
      </div>

      <div class="card">
        <canvas ref="canvas" width="400" height="400"></canvas>
      </div>

      <div class="card">

  <h2>Probability Visualization</h2>

  <canvas
    ref="probabilityCanvas"
    width="800"
    height="300"
  ></canvas>

</div>

      <div class="bloch-row">

  <div>
    <p>Qubit 0</p>
    <canvas ref="bloch0"></canvas>
  </div>

  <div>
    <p>Qubit 1</p>
    <canvas ref="bloch1"></canvas>
  </div>

  <div>
    <p>Qubit 2</p>
    <canvas ref="bloch2"></canvas>
  </div>

</div>

      <div class="card">
        <h2>Density Matrix</h2>
        <canvas
          ref="densityCanvas"
          width="520"
height="520"
        ></canvas>
      </div>
      
      <div class="card">
        <h2>Entanglement Graph</h2>
        <canvas
          ref="entanglementCanvas"
          width="600"
          height="250"
        ></canvas>
      </div>

      <div class="card">
        <h2>WebGL Visualization</h2>
      
        <canvas
          ref="webglCanvas"
          width="600"
          height="300"
        ></canvas>
      </div>

      <div class="card">
      
        <h3>Qubit 0</h3>
      
        <button @click="applyGate('H', 0)">H</button>
        <button @click="applyGate('X', 0)">X</button>
        <button @click="applyGate('Y', 0)">Y</button>
        <button @click="applyGate('Z', 0)">Z</button>
        <button @click="applyGate('S', 0)">S</button>
        <button @click="applyGate('T', 0)">T</button>
      
        <h3>Qubit 1</h3>
      
        <button @click="applyGate('H', 1)">H</button>
        <button @click="applyGate('X', 1)">X</button>
        <button @click="applyGate('Y', 1)">Y</button>
        <button @click="applyGate('Z', 1)">Z</button>
        <button @click="applyGate('S', 1)">S</button>
        <button @click="applyGate('T', 1)">T</button>

      <h3>Qubit 2</h3>

<button @click="applyGate('H', 2)">H</button>
<button @click="applyGate('X', 2)">X</button>
<button @click="applyGate('Y', 2)">Y</button>
<button @click="applyGate('Z', 2)">Z</button>
<button @click="applyGate('S', 2)">S</button>
<button @click="applyGate('T', 2)">T</button>
        <hr>
      
        <button @click="applyCNOT">
          CNOT
        </button>
      
        <button @click="createBellState">
          Create Bell Pair
        </button>

      <button @click="createGHZState">
  GHZ State
</button>

        <button @click="measure">
          Measure
        </button>
      
        <button @click="reset">
          Reset
        </button>
      
      </div>
      
      <div class="card">
        <h3>Quantum State</h3>

        <pre>{{ prettyState }}</pre>

        <p>Measurement: {{ measurement }}</p>
      </div>

      <div class="card">
      
        <h2>Circuit Editor</h2>
      
        <div class="gate-palette">
      
          <div
            class="gate"
            draggable="true"
            @dragstart="startDrag('H')"
          >H</div>
      
          <div
            class="gate"
            draggable="true"
            @dragstart="startDrag('X')"
          >X</div>
      
          <div
            class="gate"
            draggable="true"
            @dragstart="startDrag('CNOT')"
          >CNOT</div>
      
        </div>
      
        <div
          class="circuit-dropzone"
          @dragover.prevent
          @drop="dropGate"
        >
      
          <div
            v-for="(step, index) in circuit"
            :key="index"
            class="circuit-step"
          >
            {{ step.gate }}
          </div>
      
        </div>
      
        <button @click="runCircuit">
          Run Circuit
        </button>
      
      </div>
      
      <div class="card">
        <h2>Quantum Concepts</h2>
      
        <p>
          <strong>Quantum State</strong><br>
          The current mathematical state of the quantum system.
          In a 2-qubit system, the state may contain combinations of:
          |00⟩, |01⟩, |10⟩, and |11⟩ simultaneously.
        </p>
      
        <p>
          <strong>Superposition</strong><br>
          A quantum system can exist in multiple basis states at the same time.
          Measuring the system collapses it into one classical result.
        </p>
      
        <p>
          <strong>Entanglement</strong><br>
          Two qubits can become correlated in a way that classical systems cannot reproduce.
          Measuring one qubit can instantly determine the other.
        </p>
      
        <p>
          <strong>Bell State</strong><br>
          A famous entangled quantum state.
          The simulator can generate:
          (|00⟩ + |11⟩) / √2
          using a Hadamard gate followed by a CNOT gate.
        </p>
      
        <p>
          <strong>Identity Gate (I)</strong><br>
          Does nothing to the selected qubit.
          The quantum state remains unchanged.
        </p>
      
        <p>
          <strong>Hadamard Gate (H)</strong><br>
          Creates superposition.
          It transforms a definite classical state into a quantum mixture.
        </p>
      
        <p>
          <strong>Pauli-X Gate (X)</strong><br>
          Similar to a classical NOT gate.
          It flips |0⟩ into |1⟩ and vice versa.
        </p>
      
        <p>
          <strong>Pauli-Y Gate (Y)</strong><br>
          Rotates the qubit using complex quantum phase.
          It flips the state while introducing imaginary-number amplitudes.
        </p>
      
        <p>
          <strong>Pauli-Z Gate (Z)</strong><br>
          Changes the quantum phase without directly flipping probabilities.
          This affects interference behavior in later operations.
        </p>
      
        <p>
          <strong>Phase Gate (S)</strong><br>
          Applies a 90-degree quantum phase rotation.
          It is commonly used in interference and phase-control operations.
        </p>
      
        <p>
          <strong>π/8 Gate (T)</strong><br>
          Applies a smaller 45-degree phase rotation.
          This gate is important in universal and fault-tolerant quantum computing.
        </p>
      
        <p>
          <strong>CNOT Gate</strong><br>
          A two-qubit gate that conditionally flips the target qubit.
          It is one of the most important gates for creating entanglement.
        </p>
      
        <p>
          <strong>Probability Bars</strong><br>
          The visualization shows probabilities for:
          |00⟩, |01⟩, |10⟩, and |11⟩.
          Taller bars indicate higher measurement probability.
        </p>
      
        <p>
          <strong>Measure</strong><br>
          Observes the quantum system.
          Superposition collapses into one classical basis state.
        </p>
      
        <p>
          <strong>Measurement</strong><br>
          Shows the latest observed classical result such as:
          |00⟩, |01⟩, |10⟩, or |11⟩.
        </p>
      </div>
    </div>
  `,

  data() {
    return {
      stateRe: new Float64Array([
  1,0,0,0,0,0,0,0
]),

stateIm: new Float64Array(8),

circuit: [],

measurement: '-',

worker: null
    
    };
  },

  computed: {
    prettyState() {
      return JSON.stringify(this.state, null, 2);
    },
    probabilities() {

  const result = [];

  for (let i = 0; i < 8; i++) {

    result.push(

      this.stateRe[i] * this.stateRe[i] +

      this.stateIm[i] * this.stateIm[i]
    );
  }

  return result;
}
  },

  async mounted() {
    this.initWebGL();
    this.renderWebGL();
    this.worker = new Worker('./worker.js');

    this.worker.onmessage = async (e) => {

  this.stateRe = e.data.re;

  this.stateIm = e.data.im;

  await window.db.saveState(
    this.stateRe,
    this.stateIm,
    this.circuit
  );

  this.drawProbabilities();

  this.drawDensityMatrix();

  this.renderWebGL();
};

    const saved = await window.db.loadState();
    
    if (saved) {
    
      this.stateRe = saved.stateRe;
    
      this.stateIm = saved.stateIm;
    
      this.circuit = saved.circuit;
    }

    this.drawProbabilities();
  },

  methods: {
    async createGHZState() {

  await this.applyGate('H', 0);

  setTimeout(async () => {

    await this.applyCNOT(0, 1);

    setTimeout(async () => {

      await this.applyCNOT(1, 2);

    }, 50);

  }, 50);
},
    initWebGL() {
  
      const canvas = this.$refs.webglCanvas;
  
      this.gl = canvas.getContext('webgl');
  
      if (!this.gl) {
        console.error('WebGL unsupported');
        return;
      }
  
      const gl = this.gl;
  
      gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
      );
  
      gl.clearColor(0, 0, 0, 1);
    },
  
    renderWebGL() {
  
      const gl = this.gl;
  
      if (!gl) return;
  
      gl.clear(gl.COLOR_BUFFER_BIT);
    },
        
    drawDensityMatrix() {

      const canvas = this.$refs.densityCanvas;

      const ctx = canvas.getContext('2d');
    
      const size = 8;
      const cell = 40;
    
      ctx.clearRect(0, 0, 400, 400);
    
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
    
          const value = Math.sqrt(
            this.stateRe[i] * this.stateRe[j] +
            this.stateIm[i] * this.stateIm[j]
          );
    
          const intensity = Math.min(255, value * 255);
    
          ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
    
          ctx.fillRect(
            j * cell,
            i * cell,
            cell,
            cell
          );
        }
      }
    },
        
    async runCircuit() {

      for (const step of this.circuit) {
    
        this.currentAnimatingGate = step;
    
        if (step.gate === 'CNOT') {
    
          await this.applyCNOT(
            step.control,
            step.target
          );
        }
    
        else {
    
          await this.applyGate(
            step.gate,
            step.target
          );
        }
    
        await new Promise(r => setTimeout(r, 500));
      }
    
      this.currentAnimatingGate = null;
    },
        
    startDrag(gate) {
      this.draggingGate = gate;
    },
    
    dropGate() {
    
      if (this.draggingGate === 'CNOT') {
    
        this.circuit.push({
          gate: 'CNOT',
          control: 0,
          target: 1
        });
      }
    
      else {
    
        this.circuit.push({
          gate: this.draggingGate,
          target: 0
        });
      }
    },
        
    createBellState() {
    
      this.applyGate('H', 0);
    
      setTimeout(() => {
        this.applyCNOT();
      }, 50);
    },

    applyCNOT(control = 0, target = 1) {

  this.worker.postMessage({

    type: 'cnot',

    control,

    target,

    qubitCount: 3,

    re: this.stateRe,

    im: this.stateIm

  }, [
    this.stateRe.buffer,
    this.stateIm.buffer
  ]);
},

    applyGate(gate, targetQubit) {

  this.worker.postMessage({

    type: 'gate',

    gate,

    targetQubit,

    qubitCount: 3,

    re: this.stateRe,

    im: this.stateIm

  }, [
    this.stateRe.buffer,
    this.stateIm.buffer
  ]);
},
    
    measure() {
      const plainState = structuredClone(Vue.toRaw(this.state));
    
      this.worker.postMessage({
        type: 'measure',
        state: plainState
      });
    },
        
    async reset() {
      this.stateRe = new Float64Array([
  1,0,0,0,0,0,0,0
]);

this.stateIm = new Float64Array(8);
      
        this.measurement = '-';
      
        await window.db.saveState(
          this.stateRe,
          this.stateIm,
          this.circuit
        );
      
        this.drawProbabilities();

    },

    drawProbabilities() {
    
      const canvas = this.$refs.probabilityCanvas;
    
      const ctx = canvas.getContext('2d');
    
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    
      const labels = [
        '|000⟩',
        '|001⟩',
        '|010⟩',
        '|011⟩',
        '|100⟩',
        '|101⟩',
        '|110⟩',
        '|111⟩'
      ];
    
      const probs = this.probabilities;
    
    
      const barWidth = 60;
    
      const spacing = 15;
    
      for (let i = 0; i < 8; i++) {
    
        const x =
          20 + i * (barWidth + spacing);
    
        const height =
          probs[i] * 200;
    
        ctx.fillStyle = '#4caf50';
    
        ctx.fillRect(
          x,
          250 - height,
          barWidth,
          height
        );
    
        ctx.fillStyle = '#ffffff';
    
        ctx.fillText(
          labels[i],
          x,
          270
        );
    
        ctx.fillText(
          (probs[i] * 100).toFixed(1) + '%',
          x,
          240 - height
        );
      }
    }
  }
};

const Manual = {
  template: `
    <div class="container">
      ${menu}
      
      <div class="card">
        <h1>User Manual</h1>
      
        <p>
          This simulator demonstrates the basic behavior of a 3-qubit quantum computer.
        </p>
      
        <p>
          Unlike classical bits that can only be 0 or 1,
          quantum bits (qubits) can exist in superposition and can also become entangled.
        </p>
      
        <p>
          The simulator allows you to experiment with:
        </p>
      
        <ul>
          <li>Single-qubit gates</li>
          <li>Quantum superposition</li>
          <li>Quantum phase</li>
          <li>Measurement collapse</li>
          <li>Two-qubit entanglement</li>
          <li>Bell states</li>
          <li>CNOT operations</li>
        </ul>
      </div>
      
      <div class="card">
        <h2>Use Case 1 — Classical Bit Flip</h2>
      
        <p>
          This demonstrates how some quantum gates behave similarly
          to ordinary classical logic operations.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Understand how the Pauli-X gate flips a qubit state.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          Quantum computers still contain operations resembling classical logic,
          but implemented using quantum mathematics.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press X on Qubit 0</li>
          <li>Press Measure</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          The measurement frequently becomes |10⟩ because
          qubit 0 was flipped from 0 to 1.
        </p>
      </div>
      
      <div class="card">
        <h2>Use Case 2 — Quantum Superposition</h2>
      
        <p>
          This demonstrates one of the most important ideas in quantum computing:
          superposition.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Observe how a qubit can mathematically exist in multiple states simultaneously.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          Superposition allows quantum computers to process information
          differently from classical systems.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press H on Qubit 0</li>
          <li>Press Measure, then repeat 2 &rarr; 3</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          Measurements randomly become either |00⟩ or |10⟩
          with approximately equal probability.
        </p>
      </div>
      
      <div class="card">
        <h2>Use Case 3 — Quantum Measurement Collapse</h2>
      
        <p>
          This demonstrates how quantum measurement changes the quantum state itself.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Observe wavefunction collapse after measurement.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          In quantum mechanics, observation is not passive.
          Measuring the system forces it into one classical state.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press H on Qubit 0</li>
          <li>Press Measure</li>
          <li>Press Measure again</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          The second measurement usually matches the first because
          the quantum state already collapsed.
        </p>
      </div>
      
      <div class="card">
        <h2>Use Case 4 — Double Hadamard Reversibility</h2>
      
        <p>
          This demonstrates reversible quantum computation.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Observe how applying the same quantum gate twice
          can restore the original state.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          Most quantum operations are reversible,
          unlike many ordinary classical processes.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press H on Qubit 0</li>
          <li>Press H on Qubit 0 again</li>
          <li>Press Measure</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          The system returns to the original |00⟩ state.
        </p>
      </div>
      
      <div class="card">
        <h2>Use Case 5 — Quantum Phase Rotation</h2>
      
        <p>
          This demonstrates phase-changing quantum operations.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Observe how Z, S, and T gates modify quantum phase
          without directly changing probabilities immediately.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          Quantum phase is essential for interference,
          quantum algorithms,
          and entanglement behavior.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press H on Qubit 0</li>
          <li>Press Z, S, or T</li>
          <li>Observe probability changes after further operations</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          Some gates mainly affect quantum phase internally,
          influencing later measurements and interference.
        </p>
      </div>

      <div class="card">
  <h2>Use Case 6 — Bell State Creation</h2>

  <p>
    This demonstrates quantum entanglement.
  </p>

  <p><strong>What Is Entanglement?</strong></p>

  <p>
    Entanglement happens when two qubits become strongly connected.
    After entanglement, measuring one qubit affects the overall system
    and reveals information about the other qubit as well.
  </p>

  <p>
    In this simulator, the two qubits become linked so that
    they tend to produce matching measurement results.
  </p>

  <p><strong>Objective:</strong></p>

  <p>
    Create one of the most famous entangled quantum states:
    a Bell state.
  </p>

  <p><strong>Why This Matters:</strong></p>

  <p>
    Entanglement is one of the defining features of quantum computing
    and enables many quantum algorithms and communication protocols.
  </p>

  <p>
    Unlike ordinary classical systems,
    entangled quantum systems behave as a single combined system
    even when consisting of multiple qubits.
  </p>

  <p><strong>Steps:</strong></p>

  <ol>
    <li>Press Reset</li>
    <li>Press H on Qubit 0</li>
    <li>Press CNOT</li>
    <li>Press Measure, then repeat 1 → 2 → 3 → 4</li>
  </ol>

  <p><strong>Expected Result:</strong></p>

  <p>
    Measurements become either |00⟩ or |11⟩,
    while |01⟩ and |10⟩ rarely appear.
  </p>

  <p>
    This happens because the two qubits became entangled
    and now behave in a correlated way.
  </p>

  <p>
    The generated Bell state is:
  </p>

  <p>
    (|00⟩ + |11⟩) / √2
  </p>
</div>

      <div class="card">
        <h2>Use Case 7 — Controlled Operations</h2>
      
        <p>
          This demonstrates conditional quantum logic using the CNOT gate.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Observe how one qubit can control another qubit's behavior.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          Controlled operations are fundamental building blocks
          of quantum circuits and quantum algorithms.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press X on Qubit 0</li>
          <li>Press CNOT</li>
          <li>Press Measure</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          The target qubit flips conditionally,
          producing the |11⟩ state.
        </p>
      </div>
      
      <div class="card">
        <h2>Use Case 8 — Probability Visualization</h2>
      
        <p>
          This demonstrates how quantum probabilities are distributed
          across multiple basis states.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Learn how probability bars represent quantum amplitudes.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          Quantum systems do not store single classical values.
          Instead, they maintain probability amplitudes for many states simultaneously.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Apply various gates</li>
          <li>Observe the probability bars</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          Different basis states gain or lose probability
          depending on the applied quantum operations.
        </p>
      </div>

    </div>
  `
};

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/manual',
      component: Manual
    }
  ]
});
