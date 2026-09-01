const test = require('node:test');
const assert = require('node:assert/strict');

const { trainModel, predictNextNumber } = require('./index');

test('predictNextNumber estimates the next value in a sequence', async () => {
  const { model, sequenceLimit } = await trainModel({ sequenceLimit: 20, epochs: 250 });

  const prediction = predictNextNumber(model, sequenceLimit, 10);

  model.dispose();

  assert.ok(prediction > 10.2, `expected prediction > 10.2, got ${prediction}`);
  assert.ok(prediction < 11.8, `expected prediction < 11.8, got ${prediction}`);
});
