/**
 * ===========================
 * Prediction Engine
 * ===========================
 * Responsible for:
 * 
 * * Building Brain.js datasets
 * * Training
 * * Prediction
 * * Save / load model
 * 
 * ===========================
 */
// import brain from 'brain.js';
import TrainingDataBuilder from './TrainingDataBuilder.js';
import ColumnFeatureEngine from './ColumnFeatureEngine.js';
import PredictionResult from './PredictionResult.js';


export default class PredictionEngine {
    constructor(config = {}) {
        this.network = new brain.NeuralNetwork({
            hiddenLayers:
                config.hiddenLayers || [32,24,16],
            activation: config.activation || "relu"
        });
        this.isTrained = false;

    }

    /**
     * ----------------------------
     * Train the Neural Network
     * ----------------------------
     * 
     * @param {ColumnModel{}} columns
     */
    async train(columns) {
        console.log("Preparing training dataset...");
        const trainingSet = TrainingDataBuilder.build(columns);
        const report = TrainingDataBuilder.validate(trainingSet);
        console.table("This is the report: ", report);
       if (!report.valid) {

            console.log("Training Set:");
            console.log(trainingSet);
            console.table(trainingSet[0].input);

            trainingSet.forEach((sample, index) => {
                console.log(`sample ${index}`);
                console.log(index, Object.keys(sample.input).length);
                Object.entries(sample.input).forEach(([key, value]) => {
                    if(
                        value === undefined ||
                        Number.isNaN(value) ||
                        !Number.isFinite(value)
                    ) {
                        console.log(key, value);
                    }
                })
            })

            throw new Error("Training dataset is invalid");

        }
        const dataset = trainingSet.map(sample => {
            return sample.toBrainFormat()
        });

        console.log(`Training samples:  ${dataset.length}`);
        this.network.train(dataset, {
            iterations: 5000,
            learningRate: 0.01,
            errorThresh: 0.02,
            log: details => console.log(details),
            logPeriod: 100
        });
        this.isTrained = true;
        console.log("Training complete.");
    }

    /**
     * --------------------------
     *  Predict 
     * --------------------------
     * 
     * Converts PredictionInput into
     * features and runs Brain.js.
     * 
     * @param (PredictionInput) input
     * @return (PredictionResult)
     * 
     */

    predict(input) {
        if(!this.isTrained) {
            throw new Error("Model must be trained before prediction.")
        }

        /** Create features */
        const featureResult = ColumnFeatureEngine.extract(input);
        /** Brein Prediction */

        const output = this.network.run(featureResult.features);

        /** Resturn formatted result */

        return new PredictionResult(
            output, 
            {
                column: input.name,
                index: input.index,
                featureCount: Object.keys(
                    featureResult.features
                ).length
            }
        )
    }


}

