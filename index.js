const tf = require('@tensorflow/tfjs');

function buildTrainingData(sequenceLimit = 20) {
  const inputs = [];
  const outputs = [];

  for (let i = 1; i < sequenceLimit; i += 1) {
    inputs.push([i / sequenceLimit]);
    outputs.push([(i + 1) / sequenceLimit]);
  }

  return { inputs, outputs };
}

async function trainModel(options = {}) {
  const sequenceLimit = options.sequenceLimit ?? 20;
  const epochs = options.epochs ?? 250;

  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 8,
    inputShape: [1],
    activation: 'relu',
    kernelInitializer: tf.initializers.glorotUniform({ seed: 42 })
  }));
  model.add(tf.layers.dense({
    units: 1,
    kernelInitializer: tf.initializers.glorotUniform({ seed: 43 })
  }));

  model.compile({ optimizer: tf.train.adam(0.05), loss: 'meanSquaredError' });

  const { inputs, outputs } = buildTrainingData(sequenceLimit);
  const xs = tf.tensor2d(inputs);
  const ys = tf.tensor2d(outputs);

  await model.fit(xs, ys, { epochs, verbose: 0, shuffle: false });

  xs.dispose();
  ys.dispose();

  return { model, sequenceLimit };
}

function predictNextNumber(model, sequenceLimit, currentNumber) {
  const input = tf.tensor2d([[currentNumber / sequenceLimit]]);
  const predictionTensor = model.predict(input);
  const normalizedValue = predictionTensor.dataSync()[0];

  input.dispose();
  predictionTensor.dispose();

  return normalizedValue * sequenceLimit;
}

async function runDemo() {
  const { model, sequenceLimit } = await trainModel();
  const inputNumber = 10;
  const prediction = predictNextNumber(model, sequenceLimit, inputNumber);

  console.log(`Input number: ${inputNumber}`);
  console.log(`Predicted next number: ${prediction.toFixed(2)}`);

  model.dispose();
}

if (require.main === module) {
  runDemo().catch((error) => {
    console.error('Failed to run model:', error);
    process.exitCode = 1;
  });
}

module.exports = {
  buildTrainingData,
  trainModel,
  predictNextNumber
};
