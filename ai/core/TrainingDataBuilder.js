/**
 * =============================
 * Training Data Builder 
 * =============================
 * 
 * Converts ColumnModels into Brain.js
 * datasets
 * 
 * Converts one ColumnModel into many 
 * supervised Learning samples
 * 
 * It DOES NOT train the AI.
 * Its only builds the dataset.
 */

import CONFIG from "../config.js";
import ColumnModel from "../models/ColumnModel.js";
import ColumnFeatureEngine from "./ColumnFeatureEngine.js";
import TrainingSample from "../models/TrainingSample.js";

export default class TrainingDataBuilder {
    /** Build dataset from one column
     * @param {ColumnModel} column
     * @return {TrainingSample[]}
     * 
     */
static build(columns) {

    if (!Array.isArray(columns)) {

       columns = [columns];

    }

    const dataset = [];

    columns.forEach(column => {

        if (!(column instanceof ColumnModel)) {

            throw new Error(
                `${column.name} is not a ColumnModel instance`
            );

        }

        const windows =
            column.slidingWindows();

        windows.forEach(window => {

            const result =
                ColumnFeatureEngine.extract(
                    window.column
                );

            dataset.push(

                new TrainingSample({

                    input: result.features,

                    output: {

                        [`number_${window.target}`]: 1

                    },

                    metadata: {

                        column: column.name,

                        target: window.target,

                        targetIndex: window.index

                    }

                })

            );

        });

    });

    return dataset;

}

    /** 
     * ----------------------------
     * Validate a training dataset
     * ----------------------------
     * 
     * @param {TrainingSample[]} trainingSet
     * @return {Object}
     */

    static validate(trainingSet) {
        const report = {
            samples: trainingSet.length,
            featureCount: 0,
            valid: true,
            nanValues: 0,
            infiniteValues: 0,
            undefinedValues: 0,
            emptyOutputs: 0
        }

        if(trainingSet.length === 0 ) {
            report.valid = false;
            return report;
        }

        // Number of features expected
        report.featureCount = Object.keys(trainingSet[0].input).length;

        trainingSet.forEach(sample => {
            // Check feature count 
            if(Object.keys(sample.input).length !== report.featureCount){
                report.valid = false;
            }

            if (Object.keys(sample.output).length === 0) {
                report.emptyOutputs++;
                report.valid = false;
            }

            //Check every feature
            Object.values(sample.input).forEach(value => {
                if(value === undefined) {
                    report.undefinedValues++;
                    report.valid = false;
                }

                if(Number.isNaN(value)) {
                    report.nanValues++;
                    report.valid = false;
                }

                if(!Number.isFinite(value)) {
                    report.infiniteValues++;
                    report.valid = false;
                }
            })

        })

        return report;
    }
}