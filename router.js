
if ('gpu' in navigator) {
  console.log('WebGPU supported');
}

function mat4Perspective(fov, aspect, near, far) {
  const f = 1.0 / Math.tan(fov / 2);
  const nf = 1 / (near - far);

  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, (2 * far * near) * nf, 0
  ]);
}

function mat4Identity() {
  return new Float32Array([
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
  ]);
}

function mat4RotateX(a) {
  const c = Math.cos(a), s = Math.sin(a);
  return new Float32Array([
    1,0,0,0,
    0,c,-s,0,
    0,s,c,0,
    0,0,0,1
  ]);
}

function mat4RotateY(a) {
  const c = Math.cos(a), s = Math.sin(a);
  return new Float32Array([
    c,0,s,0,
    0,1,0,0,
    -s,0,c,0,
    0,0,0,1
  ]);
}

function mat4Multiply(a, b) {
  const o = new Float32Array(16);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      o[i*4+j] =
        a[i*4+0]*b[0*4+j] +
        a[i*4+1]*b[1*4+j] +
        a[i*4+2]*b[2*4+j] +
        a[i*4+3]*b[3*4+j];
    }
  }

  return o;
}

const menu = `<div class="card">
        <button @click="$router.push('/')">Simulator</button>
        <button @click="$router.push('/manual')">User Manual</button>
        <button @click="$globalThis.open('https://bowo-prasetyo.github.io/quantum-1qubit/', '_blank')">1 Qubit</button>
        <button @click="$globalThis.open('https://bowo-prasetyo.github.io/quantum-2qubits/', '_blank')">2 Qubits</button>
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
        <h2>Correlation Graph</h2>
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
      
        <button @click="applyCNOT(0, 1)">
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
    
          <div class="gate" draggable="true" @dragstart="startDrag('H')">H</div>
          <div class="gate" draggable="true" @dragstart="startDrag('X')">X</div>
          <div class="gate" draggable="true" @dragstart="startDrag('Y')">Y</div>
          <div class="gate" draggable="true" @dragstart="startDrag('Z')">Z</div>
          <div class="gate" draggable="true" @dragstart="startDrag('S')">S</div>
          <div class="gate" draggable="true" @dragstart="startDrag('T')">T</div>
          <div class="gate" draggable="true" @dragstart="startDrag('CNOT')">CNOT</div>

        </div>

        <div class="card">
          <h3>Selected Qubit</h3>
        
          <button @click="selectedQubit = 0">Q0</button>
          <button @click="selectedQubit = 1">Q1</button>
          <button @click="selectedQubit = 2">Q2</button>
        
          <p>Current: Q{{ selectedQubit }}</p>
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
          @click="removeStep(index)"
          title="Click to remove"
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
      camera: {
        rotX: 0,
        rotY: 0,
        distance: 4
      },
      mouse: {
        dragging: false,
        lastX: 0,
        lastY: 0
      },
      selectedQubit: 0,
      draggingGate: null,
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
    this.requestId = 0;
    this.pending = new Map();
    this.initWebGL();

    const canvas = this.$refs.webglCanvas;

    canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    canvas.addEventListener('wheel', this.onWheel);
        
    this.renderWebGL();
    this.worker = new Worker('./worker.js');

    this.worker.onmessage = (e) => {
      const { id, re, im, measured } = e.data;
    
      if (this.pending.has(id)) {
        this.pending.get(id)({
          re,
          im,
          measured
        });
        this.pending.delete(id);
        return;
      }
    
      // fallback (non-circuit calls)
      this.stateRe = re;
      this.stateIm = im;
      this.measurement = measured || this.measurement;
    
      this.redrawAll();

      window.db.saveState(
        this.stateRe,
        this.stateIm,
        this.circuit
      );
    };

    this.redrawAll();

    try {
      const saved = await window.db.loadState();
  
      if (saved) {
  
        this.stateRe = saved.stateRe;
  
        this.stateIm = saved.stateIm;
  
        this.circuit = saved.circuit;
      }
    } catch (e) {
      console.warn("Failed to load state:", e);
    }
  },

  methods: {
    onMouseDown(e) {
      this.mouse.dragging = true;
      this.mouse.lastX = e.clientX;
      this.mouse.lastY = e.clientY;
    },
    
    onMouseUp() {
      this.mouse.dragging = false;
    },
    
    onMouseMove(e) {
      if (!this.mouse.dragging) return;
    
      const dx = e.clientX - this.mouse.lastX;
      const dy = e.clientY - this.mouse.lastY;
    
      this.mouse.lastX = e.clientX;
      this.mouse.lastY = e.clientY;
    
      this.camera.rotY += dx * 0.01;
      this.camera.rotX += dy * 0.01;
    },
    
    onWheel(e) {
      this.camera.distance += e.deltaY * 0.01;
      this.camera.distance = Math.max(2, Math.min(10, this.camera.distance));
    },
        
    removeStep(index) {
      this.circuit.splice(index, 1);
    },
        
    drawEntanglement() {
    
      const canvas =
        this.$refs.entanglementCanvas;
    
      if (!canvas) return;
    
      const ctx =
        canvas.getContext('2d');
    
      const W = canvas.width;
      const H = canvas.height;
    
      ctx.clearRect(0, 0, W, H);
    
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
    
      const nodes = [
    
        { x: 300, y: 50 },
    
        { x: 120, y: 200 },
    
        { x: 480, y: 200 }
    
      ];
    
      const edges =
        this.computeEntanglementMatrix();
    
      //
      // edges
      //
    
      for (const edge of edges) {
    
        const a = nodes[edge.q1];
        const b = nodes[edge.q2];
    
        ctx.strokeStyle =
          '#4caf50';
    
        ctx.lineWidth =
          1 + edge.strength * 10;
    
        ctx.beginPath();
    
        ctx.moveTo(a.x, a.y);
    
        ctx.lineTo(b.x, b.y);
    
        ctx.stroke();
    
        const mx =
          (a.x + b.x) / 2;
    
        const my =
          (a.y + b.y) / 2;
    
        ctx.fillStyle =
          '#ffffff';
    
        ctx.fillText(
          edge.strength.toFixed(2),
          mx,
          my
        );
      }
    
      //
      // nodes
      //
    
      for (let i = 0; i < 3; i++) {
    
        const n = nodes[i];
    
        ctx.fillStyle =
          '#2f6fed';
    
        ctx.beginPath();
    
        ctx.arc(
          n.x,
          n.y,
          20,
          0,
          Math.PI * 2
        );
    
        ctx.fill();
    
        ctx.fillStyle =
          '#ffffff';
    
        ctx.fillText(
          `Q${i}`,
          n.x - 8,
          n.y + 5
        );
      }
    },
        
    computeEntanglementMatrix() {
    
      const pairs = [
        [0, 1],
        [0, 2],
        [1, 2]
      ];
    
      const result = [];
    
      for (const [q1, q2] of pairs) {
    
        let correlation = 0;
    
        for (let basis = 0; basis < 8; basis++) {
    
          const p =
            this.stateRe[basis] ** 2 +
            this.stateIm[basis] ** 2;
    
          const b1 =
            (basis >> (2 - q1)) & 1;
    
          const b2 =
            (basis >> (2 - q2)) & 1;
    
          correlation +=
            p * (b1 === b2 ? 1 : -1);
        }
    
        result.push({
          q1,
          q2,
          strength: Math.abs(correlation)
        });
      }
    
      return result;
    },
        
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
        const p1 = project(-1, 0, 0);
        const p2 = project(1, 0, 0);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      {
        const p1 = project(0, -1, 0);
        const p2 = project(0, 1, 0);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      {
        const p1 = project(0, 0, -1);
        const p2 = project(0, 0, 1);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      //
      // labels
      //

      ctx.fillStyle = 'white';

      const north = project(0, 0, 1);
      const south = project(0, 0, -1);

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

    redrawAll() {

      this.drawProbabilities();

      this.drawDensityMatrix();

      this.drawEntanglement();

      this.drawBlochSpheres();

      this.renderWebGL();
    },

    async createGHZState() {
      await this.applyGate('H', 0);
      await this.applyCNOT(0, 1);
      await this.applyCNOT(1, 2);
    },
    
    initWebGL() {

      const canvas = this.$refs.webglCanvas;
      this.gl = canvas.getContext('webgl');

      if (!this.gl) {
        console.error('WebGL unsupported');
        return;
      }
      
      const gl = this.gl;

      this.vs = `
        attribute vec3 pos;
        attribute float pointSize;
        attribute vec3 color;
        
        uniform mat4 uModelView;
        uniform mat4 uProjection;
        
        varying vec3 vColor;
        
        void main() {
          vColor = color;

          vec4 world = uModelView * vec4(pos, 1.0);
  
          gl_Position = uProjection * world;
          gl_PointSize = pointSize / -world.z;
        }
      `;
    
      this.fs = `
        precision mediump float;
    
        varying vec3 vColor;
    
        void main() {
    
          float dx = gl_PointCoord.x - 0.5;
          float dy = gl_PointCoord.y - 0.5;
    
          if (dx*dx + dy*dy > 0.25) discard;
    
          gl_FragColor = vec4(vColor, 1.0);
        }
      `;
      
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
      );

      gl.clearColor(0, 0, 0, 1);
    
      this.program = gl.createProgram();
    
      const vert = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vert, this.vs);
      gl.compileShader(vert);
    
      const frag = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(frag, this.fs);
      gl.compileShader(frag);
    
      gl.attachShader(this.program, vert);
      gl.attachShader(this.program, frag);
      gl.linkProgram(this.program);

      this.posBuffer = gl.createBuffer();
      this.sizeBuffer = gl.createBuffer();
      this.colorBuffer = gl.createBuffer();

      this.uMV = gl.getUniformLocation(this.program, "uModelView");
      this.uP = gl.getUniformLocation(this.program, "uProjection");      

      this.posLoc = gl.getAttribLocation(this.program, "pos");
      this.sizeLoc = gl.getAttribLocation(this.program, "pointSize");
      this.colorLoc = gl.getAttribLocation(this.program, "color");

    },
    
    renderWebGL() {

      const canvas = this.$refs.webglCanvas;
      const aspect = canvas.width / canvas.height;
      
      const projection = mat4Perspective(
        Math.PI / 3,
        aspect,
        0.1,
        100
      );
      
      const rx = mat4RotateX(this.camera.rotX);
      const ry = mat4RotateY(this.camera.rotY);
      
      let view = mat4Identity();
      view[14] = -this.camera.distance; // camera pull back
      
      let rotation = mat4Multiply(ry, rx);
      let modelView = mat4Multiply(view, rotation);
      
      const gl = this.gl;
      if (!gl) return;
    
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    
      const vertices = [];
      const sizes = [];
      const colors = [];
    
      for (let i = 0; i < 8; i++) {
    
        const re = this.stateRe[i];
        const im = this.stateIm[i];
    
        const prob = re * re + im * im;
    
        // phase → color encoding
        const phase = Math.atan2(im, re);
    
        const r = 0.5 + 0.5 * Math.cos(phase);
        const g = 0.5 + 0.5 * Math.cos(phase + 2.0);
        const b = 0.5 + 0.5 * Math.cos(phase + 4.0);
    
        // basis index → cube position
        const bit0 = (i >> 2) & 1;
        const bit1 = (i >> 1) & 1;
        const bit2 = i & 1;
    
        const x = bit0 ? 1 : -1;
        const y = bit1 ? 1 : -1;
        const z = bit2 ? 1 : -1;
    
        vertices.push(x, y, z);
    
        sizes.push(5 + prob * 60);
    
        colors.push(r, g, b);
      }  
      
      gl.useProgram(this.program);

      gl.uniformMatrix4fv(this.uMV, false, modelView);
      gl.uniformMatrix4fv(this.uP, false, projection);
            
      // POSITION
      gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
      gl.enableVertexAttribArray(this.posLoc);
      gl.vertexAttribPointer(this.posLoc, 3, gl.FLOAT, false, 0, 0);
    
      // SIZE
      gl.bindBuffer(gl.ARRAY_BUFFER, this.sizeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sizes), gl.STATIC_DRAW);
    
      gl.enableVertexAttribArray(this.sizeLoc);
      gl.vertexAttribPointer(this.sizeLoc, 1, gl.FLOAT, false, 0, 0);
    
      // COLOR
      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    
      gl.enableVertexAttribArray(this.colorLoc);
      gl.vertexAttribPointer(this.colorLoc, 3, gl.FLOAT, false, 0, 0);
            
      gl.drawArrays(gl.POINTS, 0, 8);
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
            ((phase / (2 * Math.PI)) + 1) * 180;

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
      
      if (!this.circuit.length) {
        alert("Circuit is empty. Drag gates into the circuit first.");
        return;
      }
      
      for (const step of this.circuit) {

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
    },

    startDrag(gate) {
      this.draggingGate = gate;
    },

    dropGate() {
    
      if (!this.draggingGate) return;
    
      if (this.draggingGate === 'CNOT') {
    
        // default mapping using selected qubit as control
        let control = this.selectedQubit;
        let target = (control + 1) % 3;
    
        this.circuit.push({
          gate: 'CNOT',
          control,
          target
        });
    
      } else {
    
        this.circuit.push({
          gate: this.draggingGate,
          target: this.selectedQubit
        });
    
      }
    
      this.draggingGate = null;
    },
        
    async createBellState() {
      await this.applyGate('H', 0);
      await this.applyCNOT(0, 1);
    },

    applyCNOT(control = 0, target = 1) {
      return new Promise((resolve) => {
        const id = this.requestId++;
        this.pending.set(id, resolve);
        this.worker.postMessage({
          id,
          type: 'cnot',
          control,
          target,
          qubitCount: 3,
          re: this.stateRe,
          im: this.stateIm
        });
      });
    },

    applyGate(gate, targetQubit) {
      return new Promise((resolve) => {
        const id = this.requestId++;
        this.pending.set(id, resolve);
        this.worker.postMessage({
          id,
          type: 'gate',
          gate,
          targetQubit,
          qubitCount: 3,
          re: this.stateRe,
          im: this.stateIm
        });
      });
    },

    measure() {

      this.worker.postMessage({
        type: 'measure',
        qubitCount: 3,
        re: this.stateRe,
        im: this.stateIm
      });
    },

    async reset() {
      this.stateRe = new Float64Array([
        1, 0, 0, 0, 0, 0, 0, 0
      ]);

      this.stateIm = new Float64Array(8);

      this.measurement = '-';

      this.redrawAll();

      await window.db.saveState(
        this.stateRe,
        this.stateIm,
        this.circuit
      );

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
          <li>Press Measure, then repeat 1 → 2 → 3 → 4</li>
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
