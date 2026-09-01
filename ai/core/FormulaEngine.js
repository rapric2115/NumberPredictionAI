/**  
 * ---------------------------------
 * Formula Engine
 * ---------------------------------
 * Responsible for calculating every formula weight
 * used by the AI and 
 * Applying the formula
 * Processing column constants
 * Generating weights
 * ---------------------------------
 */

import CONSTANTS from "../constants.js";
import Normalizer from "./Normalizer.js";


export default class FormulaEngine {
    /**
     * Calculate one Formula
     * ------------------------------
     *  Original Formula 
     * ------------------------------
     * @param {number} constant
     * @param {number} value1
     * @param {number} value2
     * @returns {number}
     */
    
    static calculate(constant, coefficient, value1, value2) {
        const sumVal = value1 + value2;
        const topTerm = coefficient * value1 * value2;

        const bottomExponent = Math.exp(constant);
        const bottomTerm = Math.pow(sumVal, bottomExponent);

        const innerFraction = topTerm / Math.pow(bottomTerm, 2);
        // const squaredFraction = Math.pow(innerFraction, 2);

        const numerator = Math.log(innerFraction) * 720;
        const denominatorExponent = Math.pow(sumVal, -1);

        const denominator = Math.pow(720, denominatorExponent);

        return (numerator / denominator); 
    }

    /** Calculate all enable constants
     * 
     * @param {number} value1
     * @param {number} value2
     * @return {Array} 
     *  
     * */
    
    static calculateAll(value1, value2) {
        return CONSTANTS
        .filter(item => item.enabled)
        .map(item => {
            const weight = this.calculate(
                item.value,
                value1,
                value2
            );

            return {
                id: item.id,
                label: item.label,
                constant: item.value,
                matches: item.matches,
                weight,
                normalizedWeight: 
                    Normalizer.weight(weight),
                normalizedConstant:
                    Normalizer.constant(item.value),
                normalizedMatches: 
                    Normalizer.matches(item.matches),
                weightedScore:
                    weight * item.matches
            };
        })
    }

   static calculateColumn(column) {

    const results = [];

    const currentValue = column.getCurrentValue();
    const previousValue = column.getPreviousValue();


    column.constants.forEach(item => {

        const weight = this.calculate(
            item.constant,
            column.formulaCoefficient,
            previousValue,
            currentValue
        );


        results.push({

            column: column.name,
            columnIndex: column.index,
            coefficient: column.formulaCoefficient,
            constant: item.constant,
            times: item.times,
            previousValue,
            currentValue,
            weight,
            normalizedWeight: 0

        });

    });



    // Normalize weights HERE
    const weights = results.map(r => r.weight);
    const minimum = Math.min(...weights);
    const maximum = Math.max(...weights);

    results.forEach(result => {

        result.normalizedWeight =
            Normalizer.minMax(
                result.weight,
                minimum,
                maximum
            );

    });

    return results;

}

    static calculateColumns(columns) {
        let results = [];
        columns.forEach(column => {
            const columnResults = this.calculateColumn( column );

            results = [
                ...results,
                ...columnResults
            ];
        });
        return results;
    }

    static cache = new Map();

}
