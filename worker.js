const SQRT2 = Math.sqrt(2);

function measureState(re, im, qubitCount) {

  const probs = [];

  let total = 0;

  for (let i = 0; i < re.length; i++) {

    const p =
      re[i] * re[i] +
      im[i] * im[i];

    probs.push(p);

    total += p;
  }

  const r = Math.random();

  let cumulative = 0;
  let measuredIndex = 0;

  for (let i = 0; i < probs.length; i++) {

    cumulative += probs[i] / total;

    if (r <= cumulative) {

      measuredIndex = i;

      break;
    }
  }

  const collapsedRe =
    new Float64Array(re.length);

  const collapsedIm =
    new Float64Array(im.length);

  collapsedRe[measuredIndex] = 1;

  return {

    re: collapsedRe,

    im: collapsedIm,

    measured: '|' +
      measuredIndex
      .toString(2)
      .padStart(qubitCount, '0') +
      '⟩'
  };
}

function applySingleQubitGate(
  re,
  im,
  matrix,
  targetQubit,
  qubitCount
) {

  const size = 1 << qubitCount;
  const bit = qubitCount - 1 - targetQubit;

  const outRe = new Float64Array(size);
  const outIm = new Float64Array(size);

  for (let i = 0; i < size; i++) {

    if (((i >> bit) & 1) === 0) {

      const j = i | (1 << bit);

      const ar = re[i];
      const ai = im[i];

      const br = re[j];
      const bi = im[j];

      const m00 = matrix[0][0];
      const m01 = matrix[0][1];
      const m10 = matrix[1][0];
      const m11 = matrix[1][1];

      outRe[i] =
        m00.re * ar - m00.im * ai +
        m01.re * br - m01.im * bi;

      outIm[i] =
        m00.re * ai + m00.im * ar +
        m01.re * bi + m01.im * br;

      outRe[j] =
        m10.re * ar - m10.im * ai +
        m11.re * br - m11.im * bi;

      outIm[j] =
        m10.re * ai + m10.im * ar +
        m11.re * bi + m11.im * br;
    }
  }

  return {
    re: outRe,
    im: outIm
  };
}

function applyCNOT(
  re,
  im,
  control,
  target,
  qubitCount
) {

  const size = 1 << qubitCount;

  const outRe = new Float64Array(re);
  const outIm = new Float64Array(im);

  const controlBit = qubitCount - 1 - control;
  const targetBit = qubitCount - 1 - target;

  for (let i = 0; i < size; i++) {

    if (((i >> controlBit) & 1) === 1) {

      const j = i ^ (1 << targetBit);

      if (i < j) {

        const tr = outRe[i];
        const ti = outIm[i];

        outRe[i] = outRe[j];
        outIm[i] = outIm[j];

        outRe[j] = tr;
        outIm[j] = ti;
      }
    }
  }

  return {
    re: outRe,
    im: outIm
  };
}

const gates = {

  I: [
    [{
      re: 1,
      im: 0
    }, {
      re: 0,
      im: 0
    }],
    [{
      re: 0,
      im: 0
    }, {
      re: 1,
      im: 0
    }]
  ],

  X: [
    [{
      re: 0,
      im: 0
    }, {
      re: 1,
      im: 0
    }],
    [{
      re: 1,
      im: 0
    }, {
      re: 0,
      im: 0
    }]
  ],

  Y: [
    [{
      re: 0,
      im: 0
    }, {
      re: 0,
      im: -1
    }],
    [{
      re: 0,
      im: 1
    }, {
      re: 0,
      im: 0
    }]
  ],

  Z: [
    [{
      re: 1,
      im: 0
    }, {
      re: 0,
      im: 0
    }],
    [{
      re: 0,
      im: 0
    }, {
      re: -1,
      im: 0
    }]
  ],

  H: [
    [{
      re: 1 / SQRT2,
      im: 0
    }, {
      re: 1 / SQRT2,
      im: 0
    }],
    [{
      re: 1 / SQRT2,
      im: 0
    }, {
      re: -1 / SQRT2,
      im: 0
    }]
  ],

  S: [
    [{
      re: 1,
      im: 0
    }, {
      re: 0,
      im: 0
    }],
    [{
      re: 0,
      im: 0
    }, {
      re: 0,
      im: 1
    }]
  ],

  T: [
    [{
      re: 1,
      im: 0
    }, {
      re: 0,
      im: 0
    }],
    [{
      re: 0,
      im: 0
    }, {
      re: Math.cos(Math.PI / 4),
      im: Math.sin(Math.PI / 4)
    }]
  ]
};

self.onmessage = (e) => {

  const {
    id,
    type,
    gate,
    targetQubit,
    control,
    target,
    re,
    im,
    qubitCount
  } = e.data;

  if (type === 'measure') {

    const result = measureState(
      re,
      im,
      qubitCount
    );

    self.postMessage({
      id,
      re: result.re,
      im: result.im,
      measured: result.measured
    }, [
      result.re.buffer,
      result.im.buffer
    ]);
  }

  if (type === 'gate') {

    const result = applySingleQubitGate(
      id,
      re,
      im,
      gates[gate],
      targetQubit,
      qubitCount
    );

    self.postMessage(result, [
      result.re.buffer,
      result.im.buffer
    ]);
  }

  if (type === 'cnot') {

    const result = applyCNOT(
      id,
      re,
      im,
      control,
      target,
      qubitCount
    );

    self.postMessage(result, [
      result.re.buffer,
      result.im.buffer
    ]);
  }
};
