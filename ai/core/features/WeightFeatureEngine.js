/** 
 * ===============================
 * Weight Feature Engine
 * ===============================
 * 
 * Builds AI features from FormulaEngine
 * results.
 * It DOES NOT calculate formulas
 * its only analyze formula weights.
 * ===============================
 */

import Statistics from "../../utils/statistics.js";

export default class WeightFeatureEngine {
    static extract(formulaResults) {
        if(!Array.isArray(formulaResults)) {
            throw new Error("Weight Feature Engine requires an array.");
        };
        if(formulaResults.length === 0) {
            return {
                averageWeight: 0,
                varianceWeight:0,
                minimumWeight:0,
                maximumWeight:0,
                rangeWeight: 0,
                dominantConstant:0,
                weightAverage:0
            };
        }
        // Normalized Weights
        const weights = formulaResults.map(
            item => item.normalizedWeight
        );

        // Strongest Constant
        const dominant = formulaResults.reduce(
            (best, current) => {
                if(current.weight > best.weight) {
                    return current
                }
                return best;
            }
        );

        // Weighted Average
        const totalItems = formulaResults.reduce(
            (sum, item) => {

                return sum + item.times;

            },
            0
        );
        
        const weightedSum = formulaResults.reduce(
            (sum, item) => {

                return sum + (item.normalizedWeight * item.times);

            },
            0
        );

        const weightedAverage =
            weightedSum / totalItems;

        return {
            averageWeight: Statistics.average(weights),
            varianceWeight: Statistics.variance(weights),
            minimumWeight: Statistics.min(weights),
            maximumWeight: Statistics.max(weights),
            rangeWeight: Math.max(...weights) - Math.min(...weights),
            weightedAverage,
            dominantConstant: dominant.constant,
            dominantTimes: dominant.times
        };
    }
}
