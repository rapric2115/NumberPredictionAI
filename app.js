const content = document.getElementById("resultContainer");
const topThreeResults = document.getElementById("topResults");
const trainContainer = document.getElementById("trainingContainer");
const AIContainer = document.getElementById("newAi");
const contentAi = document.getElementById("AIContainer");

const net = new brain.NeuralNetwork();
const netPredict = new brain.recurrent.LSTMTimeStep();

const MVD = 40;

// Training data pattern 
const trainingData = [
    [34/MVD, 34/MVD, 39/MVD, 38/MVD, 39/MVD, 36/MVD, 38/MVD, 34/MVD, 40/MVD, 38/MVD, 33/MVD],
    // [34/MVD, 35/MVD, 34/MVD, 34/MVD, 39/MVD, 38/MVD, 39/MVD, 36/MVD, 38/MVD, 34/MVD, 40/MVD, 38/MVD, 33/MVD],
    // [9/MVD, 18/MVD, 19/MVD, 25/MVD, 36/MVD, 38/MVD],
    // [22/MVD, 26/MVD, 30/MVD, 36/MVD, 38/MVD, 39/MVD],
    // [1/MVD, 7/MVD, 17/MVD, 20/MVD, 23/MVD, 34/MVD],
];

console.log("training the sequence network.. (thi might take a few seconds)");

netPredict.train(trainingData, {
    iterations: 200,
    errorThresh: 0.01,
    log: true
});

console.log("training complete!");

const inputSequence = [34/MVD, 35/MVD];

// Forecast the next 3 numbers in the pattern sequence
const forecastCount = 3;
const predictions = netPredict.forecast(inputSequence, forecastCount);

console.log("Forecasted values: ", predictions);

if(trainContainer){
    trainContainer.innerHTML = `
        <h3>Input Sequence Give:</h3>
        <p>[${inputSequence.join(', ')}]</p>
        <h3>Forecasted Next ${forecastCount} steps:</h3>
        <p><strong>[${predictions.map(n => n.toFixed(3) * MVD).join(', ')}]</strong></p>
    `
}

// We pick 15 as our maximum scale factor to keep everything under 1.0
const MAX_VALUE = 15; 

net.train([
    { input: { m: 6/MAX_VALUE, s: 9/MAX_VALUE  }, output: { TwentyTwo: 1 } },
    { input: { m: 7/MAX_VALUE, s: 6/MAX_VALUE  }, output: { nine: 1 } },
    { input: { m: 2/MAX_VALUE, s: 7/MAX_VALUE  }, output: { six: 1 } },
    { input: { m: 1/MAX_VALUE, s: 2/MAX_VALUE  }, output: { seven: 1 } },
    { input: { m: 2/MAX_VALUE, s: 1/MAX_VALUE  }, output: { two: 1 } },
    { input: { m: 2/MAX_VALUE, s: 2/MAX_VALUE  }, output: { one: 1 } },
    { input: { m: 1/MAX_VALUE, s: 2/MAX_VALUE  }, output: { two: 1 } },
    { input: { m: 3/MAX_VALUE, s: 1/MAX_VALUE  }, output: { two: 1 } },
    { input: { m: 4/MAX_VALUE, s: 3/MAX_VALUE  }, output: { one: 1 } },
    { input: { m: 1/MAX_VALUE, s: 4/MAX_VALUE  }, output: { three: 1 } },
    { input: { m: 2/MAX_VALUE, s: 1/MAX_VALUE  }, output: { four: 1 } },
    { input: { m: 6/MAX_VALUE, s: 2/MAX_VALUE  }, output: { one: 1 } },
    { input: { m: 2/MAX_VALUE, s: 6/MAX_VALUE  }, output: { two: 1 } },
    { input: { m: 1/MAX_VALUE, s: 2/MAX_VALUE  }, output: { six: 1 } },
    { input: { m: 2/MAX_VALUE, s: 1/MAX_VALUE  }, output: { two: 1 } },
    { input: { m: 2/MAX_VALUE, s: 2/MAX_VALUE  }, output: { one: 1 } },
    { input: { m: 11/MAX_VALUE, s: 2/MAX_VALUE  }, output: { two: 1 } },
    { input: { m: 2/MAX_VALUE,  s: 11/MAX_VALUE }, output: { two: 1 } },
    { input: { m: 2/MAX_VALUE,  s: 2/MAX_VALUE  }, output: { eleven: 1 } }, // Fixed the duplicate conflict here
    { input: { m: 13/MAX_VALUE, s: 2/MAX_VALUE  }, output: { two: 1 } },
    { input: { m: 11/MAX_VALUE, s: 13/MAX_VALUE }, output: { two: 1 } }, 
    { input: { m: 9/MAX_VALUE,  s: 11/MAX_VALUE }, output: { thirteen: 1 } }
]);

// Normalize your test input by the same factor!
const results = net.run({ m: 1/MAX_VALUE, s: 22/MAX_VALUE });

console.log(results);

const resultsArray = Object.entries(results);
resultsArray.sort((a, b) => b[1] - a[1]);

const topThree = resultsArray.slice(0, 3);

console.log('Top Three predictions', topThree);

if (topThreeResults) {
    let htmlContent = `<h3>Top 3 Predictions: </h3> <ul>`

    topThree.forEach(([label, confidence]) => {
        const percentage = (confidence * 100).toFixed(1);
        htmlContent += `<li>${label}: ${percentage}%</li>`
    })

    htmlContent += `</ul>`
    topThreeResults.innerHTML = htmlContent;
}

// Use JSON.stringify so it displays nicely on the screen
if (content) {
    content.innerHTML = `<pre>${JSON.stringify(results, null, 2)}</pre>`;
}

// With Dinamic values and formula 

/**
 * Calculates your custom dynamic formula value
 */
function calculateFormula(constant, val1, val2) {
    const sumVal = val1 + val2;
    const topTerm = 4.3473 * val1 * val2;
    
    const bottomTermExponent = Math.exp(constant); 
    const bottomTerm = Math.pow(sumVal, bottomTermExponent);

    const innerFraction = topTerm / bottomTerm;
    const squaredFraction = Math.pow(innerFraction, 2);
    
    const numerator = Math.log(squaredFraction) * 720;

    const denominatorExponent = Math.pow(sumVal, -1); 
    const denominator = Math.pow(720, denominatorExponent);

    return numerator / denominator;
}

/**
 * NEW: Calculates your target output value dynamically
 * @param {number} constant - The current row's constant value
 * @param {number} val1 - Your user-defined value_1
 * @param {number} val2 - Your user-defined value_2
 * @returns {number} The evaluated target classification label
 */
function calculateValue(constant, val1, val2) {
    // PLACE YOUR REAL DYNAMIC VALUE MATH EQUATION HERE
    // Example placeholder formula that scales with your inputs:
    const rawResult = (constant * 100) + (val1 * 1.5) + (val2 * 0.5);
    
    // Keeping it rounded to 2 decimal places keeps the AI classifications distinct
    return Number(rawResult.toFixed(2)); 
}

/**
 * Main AI function that runs when values shift
 */
function runDynamicAI(givenValue1, givenValue2, testConstant) {
    const net = new brain.NeuralNetwork();

    // 1. This is your structural baseline template holding constants and loop weights
    const baseRows = [
        { constant: 0.005,  times: 2 },
        { constant: 0.004,  times: 7 },
        { constant: 0.003,  times: 20 }, 
        { constant: 0.002,  times: 4 },
        { constant: 0.001,  times: 2 },
        { constant: 0,      times: 2 },
        { constant: -0.001, times: 1 }
    ];

    // 2. Normalization bounds 
    // Tip: Bump FORMULA_MAX up higher if your complex log equations yield large results
    const FORMULA_MAX = 100.0; 
    const CONSTANT_SHIFT = 0.001;
    const CONSTANT_MAX = 0.01;

    const formattedTrainingData = [];

    // 3. Construct the dataset using live calculations for BOTH columns
    baseRows.forEach(row => {
        // Generate both metrics dynamically right now
        const dynamicFormulaValue = calculateFormula(row.constant, givenValue1, givenValue2);
        // const dynamicOutputValue = calculateValue(row.constant, givenValue1, givenValue2);

        // Normalize both inputs
        const normalizedConstant = (row.constant + CONSTANT_SHIFT) / CONSTANT_MAX;
        const normalizedFormula = dynamicFormulaValue / FORMULA_MAX;
        
        const trainingSample = {
            input: { c: normalizedConstant, f: normalizedFormula },
            // Assigning the dynamic target outcome text key
            // output: { [`val_${dynamicOutputValue}`]: 1 }
            output: {[`val_${dynamicFormulaValue}`]: 1}
        };

        // Duplicate the sample to respect your repetitive weight data points
        for (let i = 0; i < row.times; i++) {
            formattedTrainingData.push(trainingSample);
        }
    });

    // 4. Train the network on these brand-new dynamic numbers
    net.train(formattedTrainingData, {
        iterations: 800,
        errorThresh: 0.005,
        log: false
    });

    // 5. Test against a live scenario
    const dynamicTestFormula = calculateFormula(testConstant, givenValue1, givenValue2);
    
    const normTestConstant = (testConstant + CONSTANT_SHIFT) / CONSTANT_MAX;
    const normTestFormula = dynamicTestFormula / FORMULA_MAX;

    const results = net.run({ c: normTestConstant, f: normTestFormula });

    // 6. Sort and display the outputs
    const resultsArray = Object.entries(results);
    resultsArray.sort((a, b) => b[1] - a[1]);
    const topThree = resultsArray.slice(0, 3);

    // Render top 3 visual items
    if (contentAi) {
        let htmlContent = `<h3>Top Predictions (Inputs: ${givenValue1}, ${givenValue2}): </h3> <ul>`;
        topThree.forEach(([label, confidence]) => {
            const percentage = (confidence * 100).toFixed(1);
            const cleanValueNumber = label.replace('val_', '');
            htmlContent += `<li><strong>Value ${cleanValueNumber}</strong>: ${percentage}%</li>`;
        });
        htmlContent += `</ul>`;
        contentAi.innerHTML = htmlContent;
    }

    // Render full raw breakdown to the screen nicely formatted
    if (AIContainer) {
        const cleanDisplayObj = {};
        for (const [key, val] of Object.entries(results)) {
            cleanDisplayObj[key.replace('val_', '')] = val;
        }
        AIContainer.innerHTML = `<h4>Raw Distribution:</h4><pre>${JSON.stringify(cleanDisplayObj, null, 2)}</pre>`;
    }
}

// --- TRY IT OUT ---
// Every time your 2 values shift, run this line with the updated parameters:
// Syntax: runDynamicAI(givenValue1, givenValue2, testConstant)
runDynamicAI(37, 26, 0.003);