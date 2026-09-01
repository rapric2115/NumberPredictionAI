/** 
 * =============================
 * Column Feature Engine 
 * =============================
 * 
 * Responsible for converting on ColumnModel 
 * into a complete feature object
 * 
 * It DOES NOT calculate statistics itself
 * It orchestrates the specialized engines.
 * 
 * ============================= 
 */

import Statistics from "../utils/statistics.js";
import FormulaEngine from "./FormulaEngine.js";
import GapFeatures from "./GapFeatures.js";
import WeightFeatureEngine from "./features/WeightFeatureEngine.js";

export default class ColumnFeatureEngine {
    /** Extract all feature from one column */
    static extract(column) {
        const history = column.history;

        // -----------------------------
        // Formula 
        // -----------------------------
        const formulaResults = FormulaEngine.calculateColumn(column);
        const weights = formulaResults.map(item => item.weight);
        const normalizedWeights = formulaResults.map(x => x.normalizedWeight);

        const weightFeature = WeightFeatureEngine.extract(formulaResults);

        // ------------------------
        // Statistics
        // ------------------------
        const average = Statistics.average(history);
        const variance = Statistics.variance(history);
        const minimum = Statistics.min(history);
        const maximum = Statistics.max(history);

        //---------------------
        // Formula Statistics
        // --------------------

        const formulaAverage = Statistics.average(normalizedWeights);
        const formulaVariance = Statistics.variance(weights);
        const formulaMinimum = Statistics.min(weights);
        const formulaMaximum = Statistics.max(weights);

        // -----------------------
        // Frequency
        // -----------------------

        const frequency = Statistics.frequency(history);
        const gapFeatures = GapFeatures.extract(history);

        // -----------------------
        // Build Feature Object
        // -----------------------

        const features = {
            // --------------------
            // Identity
            // --------------------

            columnIndex: column.index,
            // Current Values
            current: column.getCurrentValue(),
            previous: column.getPreviousValue(),
            // History Statistics
            average,
            variance,
            minimum,
            maximum,
            // Formula Statistics
            formulaAverage,
            formulaVariance,
            formulaMinimum,
            formulaMaximum,
            ...gapFeatures,
            ...weightFeature
        };

        // Dynamic Frequency Features
        Object.entries(frequency).forEach(([number, count]) => {
            features[`frequency_${number}`] = count;
        });

        // for (let number = 1; number <= 40; number++ ) {
        //     features[`frequency_${number}`] = frequency[number] || 0;
        // }

        // Dynamic Formula Features

        formulaResults.forEach( result => {
            const key = `constant_${result.constant}`;
            
            features[`constant_${result.constant}_raw`] = result.weight;
            features[`constant_${result.constant_normalized}`] = result.normalizedWeight;
        });

        return {
            features,
            metadata: {
                column: column.name,
            samples:
                column.getSize()
            },

            diagnostics: {
                formulaResults,
                frequency
            }
        };
    }
}
