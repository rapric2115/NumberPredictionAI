import PredictionEngine from "./ai/core/PredictionEngine.js";

import FormulaEngine from "./ai/core/FormulaEngine.js";
import FeatureRegistry from "./ai/core/FeatureRegistry.js";
import SequencyProvider from "./ai/ai/providers/SequenceProvider.js";
import FeatureEngine from "./ai/core/LegacyFeatureEngine.js";

import ColumnModel from "./ai/models/ColumnModel.js";
import TrendFeatures from "./ai/core/features/TrendFeatures.js";
import TrainingDataBuilder from "./ai/core/TrainingDataBuilder.js";

import columns from "./ai/core/data/columns.js";

import PredictionInput from "./ai/core/PredictionInput.js";

// const ai = new PredictionEngine();

// await ai.train(history);

// const prediction = ai.predict({
//     value1: 37,
//     value2: 26
// });

// console.log(prediction);

const predictedNumber = document.getElementById("prediction");
const theTopFive = document.getElementById("topFive");

const result = FormulaEngine.calculateAll(37, 26);
console.table(result);

import Statistics from "./ai/utils/statistics.js";
import SequenceProvider from "./ai/ai/providers/SequenceProvider.js";
import ColumnFeatureEngine from "./ai/core/ColumnFeatureEngine.js";

const history = [

32,
30,
24,
35,
35,
39,
33,
35,
40

];

console.log(

Statistics.average(history)

);

console.log(

Statistics.variance(history)

);

console.log(

Statistics.frequency(history)

);

// FeatureRegistry.registry(
//     SequenceProvider
// )

// console.log("Here is FR: ", FeatureRegistry.names());

const results = FeatureEngine.extract({
    history: [
        32,
        30,
        24,
        35,
        35,
        39,
        33,
        35,
        40
        ],
        value1: 37,
        value2: 26
})

console.log("Results is: ", results);
console.table("Results Features: ", results.features);
console.log("Results Metadata: ", results.metadata);
console.log("Results Diagnostics: ", results.diagnostics);


const column1 = new ColumnModel({
    name:"Column 1",
    index:0,   
    history:[
        // 2,1,12,
        // 2,4,2,3,5,15,3,4,3,11,7,18,5,8,7,
        // 10,1,1,3,2,16,11,1,19,9,12,7,6,4,17,
        // 10,8,3,4,10,3,6,5,3,6,4,1,13,5,4,
        // 1,1,1,8,7,10,1,13,7,9,6,1,7,7,2,
        // 12,1,3,18,4,8,4,1,1,1,10,1,4,
        // 11,15,6,4,12,10,4,6,12,2,8,3,
        // 12,4,6,1,2,5,1,2,1,2,5,13,2,1,
        // 1,15,7,18,12,3,6,1,7,2,9,6,1,
        // 2,7,7,3,3,2,12,2,2,14,16,
        // 3,11,21,11,5,2,1,6,5,9,7,8,
        // 3,1,1,1,4,
        2,1,20,4,7,5,9,14,
        6,3,13,4,6,7,2,1,6,7,1,7,5,13,1,6,2,3,
        7,1,15,3,14,5,4,7,4,5,4,10,1,8,6,3,9,
        16,3,1,3,10,7,1,8,1,3,1,6,2,4,21,15,5,3,
        6,8,19,1,15,1,2,3,11,1,1,1,10,1,1,7,3,
        5,16,4,4,18,9,8,2,14,6,3,2,18,2,2,15,
        2,8,3,6,5,4,1,4,6,2,2,4,4,9,2,7,1,8,10,
        9,12,3,5,3,5,1,12,3,12,1,9,8,11,8,
        15,6,10,11,2,1,2,9,10,11,2,1,
        2,9,10,11,6,1,1,4,3,1,4,6,10,10,
        4,7,9,9,4,3,7,10,1,10,1,8,19,2,9,9,3,9,7
    ],
   
    constants:[
        {
            constant:0.3988,
            times:12
        },
        {
            constant:0.6166,
            times:11
        },
        {
            constant:0.2139,
            times:8
        },
        {
            constant: 0.2139,
            times: 8
        },
        {
            constant: 0.2839,
            times: 8
        },
        {
            constant: 0.4026,
            times: 8
        },
        {
            constant: 0.3108,
            times: 8
        }
    ],
    formulaCoefficient:13.54,
});

const column2 = new ColumnModel({
    name:"Column 2",
    index:1,   
    history:[
       20,10,25,15
    ],
    // constants: [
    //     0.005,
    //     0.004,
    //     0.003
    // ],
    constants:[
        {
            constant:0.1771,
            times:2
        },
        {
            constant:0.004,
            times:7
        },
        {
            constant:0.003,
            times:20
        }
    ],
    formulaCoefficient:6.87,
});

const column6 = new ColumnModel({
    name: 'Column 6',
    index: 5,
    history: [
        38,34,28,36,38,37,38,38,35,37,
        36,30,24,35,36,37,38,23,35,38,28,36,28,31,38,38,
        36,36,37,18,34,36,35,29,36,30,32,31,37,37,38,31,
        33,34,28,36,33,37,37,32,38,37,35,30,37,36,37,37,
        38,37,38,28,36,32,38,34,36,34,33,32,37,35,35,30,
        36,35,28,36,34,37,35,36,33,38,32,25,38,36,38,38,
        32,32,19,34,37,38,32,36,35,32,32,38,24,38,33,38,
        37,25,35,35,37,35,36,36,38,38,36,37,37,33,29,31,
        36,30,30,30,36,35,32,33,37,36,35,33,23,29,36,38,
        25,35,32,36,27,21,34,36,37,38,33,35,36,22,38,34,
        36,33,23,31,31,32,38,30,37,34,38,31,27,38,27,17,
        28,35,33,28,35,38,34,38,38,34,34,38,31,31,30,35,
        38,31,38,23,31,37,36,33,32,19,37,32,35,35,34,38,
        30,29,34,31,37,27,36,30,38,35,25,37,36,38,24,34,
        33,37,27,38,36,35,36,37,30,26,35,25,34,34,36,30,
        33,37,35,36,35,36,35,37,38,33,37,34,33,38,16,32,
        38,36,34,38,29,38,36,28,38,25,31,32,35,38,37,34,
        36,38,36,37,38,31,25,33,28,31,37,37,37,30,35,31,
        36,30,34,31,27,33,38,31,37,26,36,28,33,24,33,38,
        36,24,36,24,31,37,31,34,26,27,33,23,38,25,38,32,
        20,31,29,37,26,31,29,33,36,27,37,37,33,38,32,36,
        38,35,38,27,35,34,32,24,38,34,38,25,35,34,16,37,
        29,28,27,38,33,37,31,34,30,32,38,36,30,35,25,36,
        35,38,38,35,32,30,31,27,36,29,30,29,38,37,33,35,
        36,33,38,25,34,30,36,37,33,31,37,36,29,38,36,36,
        35,37,36,38,32,333,3,34,36,38,38,37,29,36,36,38,31,
        33,36,29,37,31,30,38,32,38,36,36,33,37,34,31,34,
        36,30,24,34,34,25,27,23,30,37,28,34,35,35,27,34,
        36,36,36,35,37,34,35,26,33,35,29,32,35,38,38,34,
        37,26,35,37,34,33,36,36,35,37,36,34,38,33,38,35,
        38,37,26,37,27,23,38,36,36,29,35,38,31,30,32,26,
        35,35,25,38,36,32,36,27,27,35,37,35,29,36,28,35,
        33,38,38,28,21,33,38,32,35,36,38,26,34,23,38,37,
        34,38,35,24,38,38,31,27,36,30,38,37,28,30,38,37,
        38,27,34,33,38,28,34,32,38,34,34,37,32,33,34,33,
        37,35,37,37,33,33,24,37,36,36,36,38,35,21,34,38,
        17,38,38,35,28,38,35,28,31,34,38,30,37,33,31,30,
        37,38,38,26,33,34,29,34,36,32,30,29,34,37,26,29,
        25,35,37,37,28,31,37,37,38,38,31,38,31,26,32,36,
        36,38,31,34,38,37,36.38,32,36,29,35,38,26,33,34,
        38,32,28,37,38,26,27,27,28,29,34,38,35,38,33,33,
        33,38,35,29,36,37,37,33,34,37,38,26,35,35,35,30,
        37,36,32,37,30,33,37,33,36,34,38,29,19,35,33,30,
        29,35,38,36,36,21,34,26,38,21,32,32,19,36,27,33,
        25,32,38,36,36,29,30,38,36,32,31,33,36,35,35,33,
        36,32,38,30,38,26,37,38,37,27,30,36,28,36,37,36,
        37,33,26,36,27,38,34,35,38,35,30,37,28,38,32,36,
        31,37,33,31,38,36,34,23,32,35,27,35,33,37,23,27,
        36,38,34,37,38,37,37,30,35,33,29,35,30,28,34,38,
        33,32,36,30,37,34,31,35,32,35,24,37,36,38,34,38,
        34,30,28,38,38,22,37,31,35,34,36,32,35,38,38,34
    ],
    constants: [
        {
            constant: 0.0029,
            times: 101
        },
        {
            constant: 0.0031,
            times: 82
        },
        {
            constant: 0.0033,
            times: 64
        },
        {
            constant: 0.0035,
            times: 55
        },
        {
            constant: 0.0038,
            times: 54
        },
        {
            constant: 0.0028,
            times: 46
        },
        {
            constant: 0.003,
            times: 44
        }
    ],
    formulaCoefficient:  4.3473
})




console.log(
    "Column Describe ", column1.describe()
);



const resultIt =
    FormulaEngine.calculateColumn(
        column1
    );

const trend = TrendFeatures.extract(history);
console.table("Trend Feature: ", trend);



console.table("This is the Results of the last change: ", resultIt);

const coe = 13.54;
const constants = [0.214, 0.123, 0.211];
const A = column1.history[0];
const B = column1.history[1];
const summarize = A + B;

function calculateFormula(constantsArray, coefficient, value1, value2) {
    const sumVal = value1 + value2;
    const topTerm = coefficient * value1 * value2;
    
    // We will store the final result for each constant here
    const results = [];

    // Loop through each constant in the array
    for (let i = 0; i < constantsArray.length; i++) {

        const currentConstant = constantsArray[i];
        const den = Math.pow(sumVal, Math.exp(currentConstant));
        const expDeno = Math.pow(den, 2);

        const val = topTerm / expDeno;

        const result = Math.log(val) * 720;
        const denominator = Math.pow(720, Math.pow(sumVal, -1));

        const finalResults = result / denominator;

        results.push(finalResults);
        // 1. Get the current constant and find its exponential
        // const currentConstant = constantsArray[i];
        // const bottomExponent = Math.exp(currentConstant);
        
        // // 2. Calculate the bottom term using our exponent
        // const bottomTerm = Math.pow(Math.pow(sumVal, bottomExponent), 2);

        // // 3. Solve the inner fraction and square it
        // const innerFraction = topTerm / bottomTerm;
        // const squaredFraction = Math.pow(innerFraction, 2);

        // // 4. Calculate the final numerator and denominator
        // const numerator = Math.log(squaredFraction) * 720;
        // const denominatorExponent = Math.pow(sumVal, -1); // equivalent to 1 / sumVal
        // const denominator = Math.pow(720, denominatorExponent);

        // // 5. Push the final calculation for this constant into our results array
        // results.push(numerator / denominator);
    }

    // Return the array containing all 3 calculated values
    return results;
}

const clone = column1.cloneWithHistory([
    6,10,10,4
]);

console.log(clone.describe());

const windows = column1.slidingWindows(4);
console.table(windows);

// How to call it:
const finalOutputs = calculateFormula(constants, coe, A, B);
console.log("what should be formula: ",finalOutputs);


const checkingLog = Math.log(summarize);
const checkingLog1 = Math.log10(summarize);
const checkingLog2 = Math.log2(summarize);

// console.log("log", checkingLog);
// console.log("log 10: ", checkingLog1);
// console.log("ln2: ", checkingLog2);

const trainingSet =

    TrainingDataBuilder.build(
        column1
    );


console.log(
    "Training Samples:", trainingSet.length
);


console.log(
    trainingSet[0]
);

console.log("Total Samples: ", trainingSet.length);
console.log("TrainingSet: ", trainingSet[0].describe());
console.log("The TrainingSet", trainingSet);

trainingSet.forEach((sample, index) => {
    console.log(`sample-${index - 1}`);
    console.table(sample.describe());
});

windows.forEach(window => {
    console.log(window);
})

windows.forEach(window => {
    const result = ColumnFeatureEngine.extract(
        window.column
    );
    console.log(result);
});


windows.forEach(window => {
    const result = ColumnFeatureEngine.extract(
        window.column
    );
    console.log(
        Object.keys(
            result.features
        ).length
    )
})

trainingSet.forEach( sample => {
    console.log(
        Object.keys(
            sample.output
        )[0]
    );
});

const brainDataset = trainingSet.map(sample => {
    return sample.toBrainFormat()
});

console.log(brainDataset);

const report = TrainingDataBuilder.validate(trainingSet);
console.table(report);


const engine = new PredictionEngine();

// await engine.train(columns);
console.log("COLUMN OBJECT");
console.log(column1);

console.log("COLUMN CONSTANTS");
console.log(column1.constants);

console.log(
    "Is array?",
    Array.isArray(column1.constants)
);
// const predictionInput = new PredictionInput({
//     name: column1.name,
//     index: column1.index,
//     history: column1.history,
//     constants: column1.constants,
//     formulaCoefficient:
//         column1.formulaCoefficient
// });

// const predictionColumn2 = new PredictionInput({
//     name: column2.name,
//     index: column2.index,
//     history: column2.history,
//     constants: column2.constants,
//     formulaCoefficient: 
//         column2.formulaCoefficient
// });

const predictionInput = new PredictionInput({
    name: column6.name,
    index: column6.index,
    history: column6.history,
    constants: column6.constants,
    formulaCoefficient: 
        column6.formulaCoefficient
});

console.log(
    predictionInput.describe()
);

const predictionFeatures =
    ColumnFeatureEngine.extract(
        predictionInput
    );
// const predictionFeature2 =
//     ColumnFeatureEngine.extract(
//         predictionColumn2
//     )

console.log(
    predictionFeatures
);

// const engine = new PredictionEngine();

await engine.train(column6);
// await engine.train(column2);

const prediction =
    engine.predict(predictionInput);
// const prediction2 = 
//     engine.predict(predictionColumn2);

console.log(
    prediction.describe()
);

// console.log(
//     prediction2.describe()
// )

const pred = prediction.describe().prediction;
const top5 = prediction.describe().top5;

predictedNumber.innerHTML = `<div>${pred}</div>`

theTopFive.innerHTML = `
  <ul>
    ${top5.map(item => `<li>${item.label} - ${item.percentage}</li>`).join('')}
  </ul>
`;

const predicted_num_six = document.getElementById('six');
predicted_num_six.innerText = pred;


