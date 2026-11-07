// Background worker for gates and measurement, so the page stays responsive.
// All the maths is in engine.js; this file only passes messages.
//
// Request:  { id, type: 'gate' | 'cnot' | 'measure', re, im, qubitCount,
//             gate, targetQubit,   // for 'gate'
//             control, target }    // for 'cnot'
// Response: { id, re, im, measured }   (measured is a ket label, only for 'measure')
//
// Loaded as a module worker: new Worker('./worker.js', { type: 'module' })

import { applyGate, applyCNOT, measure } from './engine.js';

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

  let result;

  if (type === 'gate') {
    result = applyGate(re, im, gate, targetQubit, qubitCount);
  } else if (type === 'cnot') {
    result = applyCNOT(re, im, control, target, qubitCount);
  } else if (type === 'measure') {
    const m = measure(re, im, qubitCount);
    result = { re: m.re, im: m.im, measured: m.label };
  } else {
    return;
  }

  // Transfer the buffers instead of copying them
  self.postMessage({
    id,
    re: result.re,
    im: result.im,
    measured: result.measured
  }, [
    result.re.buffer,
    result.im.buffer
  ]);
};
