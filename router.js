

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
          Minimal quantum computer simulator that demonstrates the basic behavior of 3 quantum bits (qubits).
        </p>
      </div>

<div class="card">
  <h2>System Information</h2>

  <p>Qubits: 3</p>

  <p>Hilbert Space Size: 8</p>

  <p>WebGL: Enabled</p>

  <p>WebGPU:
    {{ webgpuSupported ? 'Supported' : 'Not Supported' }}
  </p>
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
    The current mathematical state of the 3-qubit quantum system.
    Unlike a classical system that stores only one value,
    a quantum state can contain all eight basis states simultaneously:
    |000⟩, |001⟩, |010⟩, |011⟩, |100⟩, |101⟩, |110⟩ and |111⟩.
  </p>

  <p>
    <strong>Qubits</strong><br>
    A qubit is the quantum equivalent of a classical bit.
    While a classical bit can only be 0 or 1,
    a qubit may exist in a combination of both states until measured.
  </p>

  <p>
    <strong>Superposition</strong><br>
    A quantum system can occupy multiple basis states simultaneously.
    The amplitudes determine the probability of observing each state.
    Measurement collapses the superposition into one classical result.
  </p>

  <p>
    <strong>Quantum Amplitudes</strong><br>
    Each basis state has a complex-valued amplitude.
    Probabilities are calculated from the squared magnitude of these amplitudes.
    The total probability across all basis states always equals 100%.
  </p>

  <p>
    <strong>Entanglement</strong><br>
    Multiple qubits can become correlated in ways that classical systems cannot reproduce.
    Entangled qubits must be described as one combined quantum system rather than independent particles.
  </p>

  <p>
    <strong>Bell State</strong><br>
    A Bell state is a two-qubit entangled state.
    The simulator can generate:
    (|00⟩ + |11⟩) / √2
    using a Hadamard gate followed by a CNOT gate.
  </p>

  <p>
    <strong>GHZ State</strong><br>
    A Greenberger–Horne–Zeilinger (GHZ) state is a three-qubit entangled state.
    The simulator can generate:
    (|000⟩ + |111⟩) / √2
    using one Hadamard gate and two CNOT gates.
    In a GHZ state, all three qubits become strongly correlated.
  </p>

  <p>
    <strong>Identity Gate (I)</strong><br>
    Leaves the selected qubit unchanged.
    The quantum state remains exactly the same.
  </p>

  <p>
    <strong>Hadamard Gate (H)</strong><br>
    Creates superposition.
    It transforms a definite classical state into a quantum mixture of possibilities.
  </p>

  <p>
    <strong>Pauli-X Gate (X)</strong><br>
    Similar to a classical NOT gate.
    It flips |0⟩ into |1⟩ and |1⟩ into |0⟩.
  </p>

  <p>
    <strong>Pauli-Y Gate (Y)</strong><br>
    Flips the qubit while introducing a complex phase.
    It combines bit-flip and phase effects.
  </p>

  <p>
    <strong>Pauli-Z Gate (Z)</strong><br>
    Changes the quantum phase without directly changing measurement probabilities.
    This phase can affect future interference patterns.
  </p>

  <p>
    <strong>Phase Gate (S)</strong><br>
    Applies a 90-degree phase rotation.
    It is commonly used for phase manipulation and interference effects.
  </p>

  <p>
    <strong>π/8 Gate (T)</strong><br>
    Applies a 45-degree phase rotation.
    The T gate is an important component of universal quantum computation.
  </p>

  <p>
    <strong>CNOT Gate</strong><br>
    A controlled-NOT operation involving two qubits.
    The target qubit flips only when the control qubit is in state |1⟩.
    CNOT is one of the primary tools for creating entanglement.
  </p>

  <p>
    <strong>Density Matrix</strong><br>
    The density matrix provides a complete description of the quantum system.
    It contains both probability information and phase relationships between basis states.
    Pure states and mixed states can both be represented using density matrices.
  </p>

  <p>
    <strong>Reduced Density Matrix</strong><br>
    Each Bloch sphere is computed from a reduced density matrix obtained by tracing out the other qubits.
    This shows the local state of an individual qubit even when it is entangled with the rest of the system.
  </p>

  <p>
    <strong>Bloch Sphere</strong><br>
    The Bloch sphere is a geometric representation of a single qubit.
    The vector inside the sphere indicates the qubit's quantum state.
    Pure states lie on the surface, while entangled or mixed states move toward the center.
  </p>

  <p>
    <strong>Probability Visualization</strong><br>
    The probability chart displays the measurement probability of all eight basis states.
    Taller bars indicate a higher chance of observing that state during measurement.
  </p>

  <p>
    <strong>Entanglement Graph</strong><br>
    The entanglement graph visualizes correlations between qubits.
    Stronger connections indicate greater quantum correlation between pairs of qubits.
  </p>

  <p>
    <strong>WebGL Visualization</strong><br>
    The WebGL view uses GPU acceleration to render quantum-state visualizations more efficiently.
    This enables smoother animation and larger future simulations.
  </p>

  <p>
    <strong>Measurement</strong><br>
    Measuring the quantum system collapses the superposition into one of the eight basis states.
    The outcome appears according to the probability distribution of the current quantum state.
  </p>

  <p>
    <strong>Measurement Result</strong><br>
    The latest observed classical state is displayed here, such as:
    |000⟩, |001⟩, |010⟩, |011⟩, |100⟩, |101⟩, |110⟩ or |111⟩.
  </p>

</div>
    </div>
  `,

  data() {
    return {
      webgpuSupported: 'gpu' in navigator,
      stateRe: new Float64Array([
        1, 0, 0, 0, 0, 0, 0, 0
      ]),

      stateIm: new Float64Array(8),

      circuit: [],

      measurement: '-',

      worker: null

    };
  },

  computed: {
    prettyState() {

      const result = [];

      for (let i = 0; i < 8; i++) {

        result.push({
          basis: i.toString(2).padStart(3, '0'),
          re: this.stateRe[i],
          im: this.stateIm[i]
        });
      }

      return JSON.stringify(result, null, 2);
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

      if (e.data.measured !== undefined) {
        this.measurement = e.data.measured;
      }

      await window.db.saveState(
        this.stateRe,
        this.stateIm,
        this.circuit
      );

      this.redrawAll();
    };

    const saved = await window.db.loadState();

    if (saved) {

      this.stateRe = saved.stateRe;

      this.stateIm = saved.stateIm;

      this.circuit = saved.circuit;
    }

    this.redrawAll();
  },

  methods: {
    computeBlochVectors() {

  const vectors = [];

  for (let q = 0; q < 3; q++) {

    const rho =
      this.getReducedDensityMatrix(q);

    vectors.push({

      x: 2 * rho.rho01Re,

      y: -2 * rho.rho01Im,

      z: rho.rho00 - rho.rho11

    });
  }

  return vectors;
},
        
    drawSingleBlochSphere(canvas, x, y, z) {
    
      const ctx = canvas.getContext('2d');
    
      const W = canvas.width;
      const H = canvas.height;
    
      ctx.clearRect(0, 0, W, H);
    
      const cx = W / 2;
      const cy = H / 2;
    
      const radius = Math.min(W, H) * 0.35;
    
      const perspective = 0.35;
    
      function project(px, py, pz) {
        return {
          x: cx + (px + py * perspective) * radius,
          y: cy - (pz + py * perspective) * radius
        };
      }
    
      //
      // background
      //
    
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
    
      //
      // sphere outline
      //
    
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
    
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    
      //
      // equator
      //
    
      ctx.beginPath();
      ctx.ellipse(
        cx,
        cy,
        radius,
        radius * 0.35,
        0,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    
      //
      // axes
      //
    
      ctx.strokeStyle = '#555';
    
      {
        const p1 = project(-1,0,0);
        const p2 = project( 1,0,0);
    
        ctx.beginPath();
        ctx.moveTo(p1.x,p1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
      }
    
      {
        const p1 = project(0,-1,0);
        const p2 = project(0, 1,0);
    
        ctx.beginPath();
        ctx.moveTo(p1.x,p1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
      }
    
      {
        const p1 = project(0,0,-1);
        const p2 = project(0,0, 1);
    
        ctx.beginPath();
        ctx.moveTo(p1.x,p1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
      }
    
      //
      // labels
      //
    
      ctx.fillStyle = 'white';
    
      const north = project(0,0,1);
      const south = project(0,0,-1);
    
      ctx.fillText('|0⟩', north.x - 10, north.y - 10);
      ctx.fillText('|1⟩', south.x - 10, south.y + 20);
    
      //
      // bloch vector
      //
    
      const tip = project(x, y, z);
    
      ctx.strokeStyle = '#2f6fed';
      ctx.lineWidth = 4;
    
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(tip.x, tip.y);
      ctx.stroke();
    
      ctx.fillStyle = '#2f6fed';
    
      ctx.beginPath();
      ctx.arc(
        tip.x,
        tip.y,
        6,
        0,
        Math.PI * 2
      );
      ctx.fill();
    
      //
      // coordinates
      //
    
      ctx.fillStyle = '#aaa';
    
      ctx.fillText(
        `x=${x.toFixed(2)}`,
        10,
        15
      );
    
      ctx.fillText(
        `y=${y.toFixed(2)}`,
        10,
        30
      );
    
      ctx.fillText(
        `z=${z.toFixed(2)}`,
        10,
        45
      );
    },
        
    drawBlochSpheres() {

      const vectors = this.computeBlochVectors();
    
      this.drawSingleBlochSphere(
        this.$refs.bloch0,
        vectors[0].x,
        vectors[0].y,
        vectors[0].z
      );
    
      this.drawSingleBlochSphere(
        this.$refs.bloch1,
        vectors[1].x,
        vectors[1].y,
        vectors[1].z
      );
    
      this.drawSingleBlochSphere(
        this.$refs.bloch2,
        vectors[2].x,
        vectors[2].y,
        vectors[2].z
      );
    },
        
    getBlochVector(qubit) {
    
      const rho =
        this.getReducedDensityMatrix(qubit);
    
      const x =
        2 * rho.rho01Re;
    
      const y =
        -2 * rho.rho01Im;
    
      const z =
        rho.rho00 - rho.rho11;
    
      return { x, y, z };
    },
        
    getReducedDensityMatrix(qubit) {
    
      let rho00Re = 0;
      let rho11Re = 0;
    
      let rho01Re = 0;
      let rho01Im = 0;
    
      for (let i = 0; i < 8; i++) {
    
        const bitI = (i >> (2 - qubit)) & 1;
    
        for (let j = 0; j < 8; j++) {
    
          const bitJ = (j >> (2 - qubit)) & 1;
    
          //
          // Trace out all other qubits
          //
    
          let equal = true;
    
          for (let k = 0; k < 3; k++) {
    
            if (k === qubit) continue;
    
            const bi = (i >> (2 - k)) & 1;
            const bj = (j >> (2 - k)) & 1;
    
            if (bi !== bj) {
              equal = false;
              break;
            }
          }
    
          if (!equal) continue;
    
          const ar = this.stateRe[i];
          const ai = this.stateIm[i];
    
          const br = this.stateRe[j];
          const bi = -this.stateIm[j];
    
          const re =
            ar * br -
            ai * bi;
    
          const im =
            ar * bi +
            ai * br;
    
          if (bitI === 0 && bitJ === 0)
            rho00Re += re;
    
          else if (bitI === 1 && bitJ === 1)
            rho11Re += re;
    
          else if (bitI === 0 && bitJ === 1) {
    
            rho01Re += re;
            rho01Im += im;
          }
        }
      }
    
      return {
    
        rho00: rho00Re,
    
        rho11: rho11Re,
    
        rho01Re,
    
        rho01Im
    
      };
    },
        
    drawBlochSphere(canvas, qubit) {
    
      if (!canvas) return;
    
      const ctx =
        canvas.getContext('2d');
    
      const W = 220;
      const H = 220;
    
      canvas.width = W;
      canvas.height = H;
    
      ctx.clearRect(0,0,W,H);
    
      const cx = W / 2;
      const cy = H / 2;
    
      const radius = 80;
    
      ctx.fillStyle = '#000';
      ctx.fillRect(0,0,W,H);
    
      ctx.strokeStyle = '#666';
    
      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        radius,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    
      const {
        x,
        y,
        z
      } = this.getBlochVector(qubit);
    
      const px =
        cx + x * radius;
    
      const py =
        cy - z * radius;
    
      ctx.strokeStyle =
        '#2f6fed';
    
      ctx.lineWidth = 3;
    
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();
    
      ctx.fillStyle =
        '#2f6fed';
    
      ctx.beginPath();
      ctx.arc(
        px,
        py,
        6,
        0,
        Math.PI * 2
      );
      ctx.fill();
    
      ctx.fillStyle = '#fff';
    
      ctx.fillText(
        `x=${x.toFixed(2)}`,
        10,
        20
      );
    
      ctx.fillText(
        `y=${y.toFixed(2)}`,
        10,
        40
      );
    
      ctx.fillText(
        `z=${z.toFixed(2)}`,
        10,
        60
      );
    },

    redrawAll() {

      this.drawProbabilities();

      this.drawDensityMatrix();

      //this.drawEntanglement();

      this.drawBlochSpheres();

      this.renderWebGL();
    },

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
    
      const cell =
        Math.min(
          canvas.width,
          canvas.height
        ) / size;
    
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    
      for (let i = 0; i < size; i++) {
    
        for (let j = 0; j < size; j++) {
    
          const ar = this.stateRe[i];
          const ai = this.stateIm[i];
    
          const br = this.stateRe[j];
          const bi = -this.stateIm[j];
    
          const re =
            ar * br -
            ai * bi;
    
          const im =
            ar * bi +
            ai * br;
    
          const magnitude =
            Math.sqrt(
              re * re +
              im * im
            );

          const phase =
            Math.atan2(im, re);
          
          const hue =
            ((phase / (2*Math.PI)) + 1) * 180;
          
          ctx.fillStyle =
            `hsl(${hue},100%,${magnitude*50}%)`;
    
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
        } else {

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
      } else {

        this.circuit.push({
          gate: this.draggingGate,
          target: 0
        });
      }
    },

    createBellState() {

      this.applyGate('H', 0);

      setTimeout(() => {
        this.applyCNOT(0, 1);
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

      this.worker.postMessage({

        type: 'measure',

        qubitCount: 3,

        re: this.stateRe,

        im: this.stateIm

      }, [
        this.stateRe.buffer,
        this.stateIm.buffer
      ]);
    },

    async reset() {
      this.stateRe = new Float64Array([
        1, 0, 0, 0, 0, 0, 0, 0
      ]);

      this.stateIm = new Float64Array(8);

      this.measurement = '-';

      await window.db.saveState(
        this.stateRe,
        this.stateIm,
        this.circuit
      );

      this.redrawAll();

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
    quantum bits (qubits) can exist in superposition,
    can accumulate quantum phase,
    and can become entangled with one another.
  </p>

  <p>
    A 3-qubit system contains eight basis states:
  </p>

  <p>
    |000⟩, |001⟩, |010⟩, |011⟩,
    |100⟩, |101⟩, |110⟩ and |111⟩.
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
    <li>Three-qubit entanglement</li>
    <li>Bell states</li>
    <li>GHZ states</li>
    <li>CNOT operations</li>
    <li>Reduced density matrices</li>
    <li>Bloch sphere visualization</li>
    <li>Density matrix visualization</li>
    <li>Entanglement visualization</li>
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
  The measurement frequently becomes |100⟩ because
  qubit 0 was flipped from 0 to 1 while
  qubits 1 and 2 remain unchanged.
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
  Measurements randomly become either |000⟩ or |100⟩
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
  The system returns to the original |000⟩ state.
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
  Measurements become either |000⟩ or |110⟩,
  while most other basis states rarely appear.
</p>

<p>
  Qubit 0 and qubit 1 become entangled,
  while qubit 2 remains in the |0⟩ state.
</p>

<p>
  The generated Bell state is:
</p>

<p>
  (|000⟩ + |110⟩) / √2
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
  producing the |110⟩ state.
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
  Different basis states among
  |000⟩ through |111⟩
  gain or lose probability depending on
  the applied quantum operations.
</p>
      </div>

<div class="card">

  <h2>Use Case 9 — GHZ State Creation</h2>

  <p>
    This demonstrates genuine three-qubit entanglement.
  </p>

  <p><strong>Objective:</strong></p>

  <p>
    Create a GHZ state involving all three qubits.
  </p>

  <p><strong>Why This Matters:</strong></p>

  <p>
    GHZ states are among the most important
    multi-qubit quantum states.
  </p>

  <p>
    They demonstrate correlations that cannot be
    explained using classical physics.
  </p>

  <p><strong>Steps:</strong></p>

  <ol>
    <li>Press Reset</li>
    <li>Press GHZ State</li>
    <li>Observe the probability bars</li>
    <li>Press Measure several times</li>
  </ol>

  <p><strong>Expected Result:</strong></p>

  <p>
    Measurements become either |000⟩ or |111⟩.
  </p>

  <p>
    All three qubits become entangled together.
  </p>

  <p>
    The generated state is:
  </p>

  <p>
    (|000⟩ + |111⟩) / √2
  </p>

</div>

<div class="card">

  <h2>Use Case 10 — Bloch Sphere Analysis</h2>

  <p>
    This demonstrates how each individual qubit
    can be represented by a reduced density matrix
    and visualized on a Bloch sphere.
  </p>

  <p><strong>Steps:</strong></p>

  <ol>
    <li>Press Reset</li>
    <li>Apply H on Qubit 0</li>
    <li>Observe the Bloch spheres</li>
  </ol>

  <p><strong>Expected Result:</strong></p>

  <p>
    Qubit 0 moves toward the +X direction,
    indicating a superposition state.
  </p>

  <p>
    The other qubits remain near the north pole,
    corresponding to |0⟩.
  </p>

</div>

<div class="card">

  <h2>Use Case 11 — Density Matrix Visualization</h2>

  <p>
    This demonstrates the full density matrix
    of the 3-qubit quantum state.
  </p>

  <p><strong>Objective:</strong></p>

  <p>
    Observe how coherence and entanglement
    appear in matrix form.
  </p>

  <p><strong>Steps:</strong></p>

  <ol>
    <li>Press Reset</li>
    <li>Create a Bell state or GHZ state</li>
    <li>Observe the density matrix</li>
  </ol>

  <p><strong>Expected Result:</strong></p>

  <p>
    Bright diagonal entries indicate basis-state probabilities.
  </p>

  <p>
    Off-diagonal entries indicate quantum coherence
    and interference effects.
  </p>

</div>

    </div>
  `
};

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/manual',
      component: Manual
    }
  ]
});
