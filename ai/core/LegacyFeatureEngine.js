/**
 * ----------------------------
 * Feature Engine
 * ----------------------------
 * Responsible for converting row input into
 * machine learning features.
 * ---------------------------
 */

import CONFIG from "../config.js";
import FormulaEngine from "./FormulaEngine.js";
import Statistics from "../utils/statistics.js";
import Normalizer from "./Normalizer.js";

export default class FeatureEngine {

    /**
     * Main entry point.
     *
     * @param {Object} input
     * @returns {Object}
     */

    static extract(input) {

        const startTime = performance.now();

        //-----------------------------------
        // Validate
        //-----------------------------------

        const validation =
            this.validate(input);

        if (!validation.valid) {

            throw new Error(

                validation.errors.join("\n")

            );

        }

        //-----------------------------------
        // Build Features
        //-----------------------------------

        const builders = [

            this.sequenceFeatures,

            this.statisticsFeatures,

            this.formulaFeatures,

            this.gapFeatures

        ];

        const features = {};

        builders.forEach(builder => {

            Object.assign(

                features,

                builder.call(this, input)

            );

        });

        //-----------------------------------
        // Metadata
        //-----------------------------------

        const metadata = this.metadata(

            input,

            features

        );

        //-----------------------------------
        // Diagnostics
        //-----------------------------------

        const diagnostics = this.diagnostics(

            startTime,

            features

        );

        //-----------------------------------

        return {

            features,

            metadata,

            diagnostics

        };

    }

    /**
     * ------------------------------------
     * Validation
     * ------------------------------------
     */

    static validate(input) {

        const errors = [];

        if (!input.history) {

            errors.push(

                "History is required."

            );

        }

        else if (

            input.history.length <

            CONFIG.SEQUENCE_LENGTH

        ) {

            errors.push(

                `History must contain at least ${CONFIG.SEQUENCE_LENGTH} numbers.`

            );

        }

        if (

            input.value1 === undefined ||

            input.value1 === null

        ) {

            errors.push(

                "value1 is required."

            );

        }

        if (

            input.value2 === undefined ||

            input.value2 === null

        ) {

            errors.push(

                "value2 is required."

            );

        }

        return {

            valid:

                errors.length === 0,

            errors

        };

    }

    /**
     * ------------------------------------
     * Sequence Features
     * ------------------------------------
     */

    static sequenceFeatures(input) {

        const history =
            input.history;

        const sequence =
            history.slice(

                -CONFIG.SEQUENCE_LENGTH

            );

        const features = {};

        sequence

            .reverse()

            .forEach((number, index) => {

                features[

                    `seq_${index + 1}`

                ] =

                    Normalizer.number(

                        number

                    );

            });

        features.sequence_length =
            sequence.length;

        features.sequence_sum =
            Statistics.sum(sequence);

        features.sequence_average =
            Statistics.average(sequence);

        features.sequence_min =
            Statistics.min(sequence);

        features.sequence_max =
            Statistics.max(sequence);

        features.sequence_range =
            Statistics.range(sequence);

        features.value1 =
            Normalizer.number(

                input.value1

            );

        features.value2 =
            Normalizer.number(

                input.value2

            );

        return features;

    }

    /**
     * ------------------------------------
     * Statistics Features
     * ------------------------------------
     */

    static statisticsFeatures(input) {

        const history =
            input.history;

        return {

            average:

                Statistics.average(history),

            median:

                Statistics.median(history),

            variance:

                Statistics.variance(history),

            stdDeviation:

                Statistics.stdDeviation(history),

            minimum:

                Statistics.min(history),

            maximum:

                Statistics.max(history),

            range:

                Statistics.range(history),

            oddCount:

                Statistics.odd(history),

            evenCount:

                Statistics.even(history),

            repeats:

                Statistics.repeats(history)

        };

    }

    /**
     * ------------------------------------
     * Formula Features
     * ------------------------------------
     */

    static formulaFeatures(input) {

        const formulas =

            FormulaEngine.calculateAll(

                input.value1,

                input.value2

            );

        const features = {};

        formulas.forEach(item => {

            features[

                `weight_${item.id}`

            ] =

                item.normalizedWeight;

            features[

                `match_${item.id}`

            ] =

                item.normalizedMatches;

            features[

                `score_${item.id}`

            ] =

                item.weightedScore;

        });

        return features;

    }

    /**
     * ------------------------------------
     * Metadata
     * ------------------------------------
     */

    static metadata(

        input,

        features

    ) {

        return {

            historyLength:

                input.history.length,

            sequenceLength:

                CONFIG.SEQUENCE_LENGTH,

            featureCount:

                Object.keys(features).length,

            generatedAt:

                new Date().toISOString()

        };

    }

    /**
     * ------------------------------------
     * Diagnostics
     * ------------------------------------
     */

    static diagnostics(

        startTime,

        features

    ) {

        return {

            executionTime:

                (

                    performance.now() -

                    startTime

                ).toFixed(2) +

                " ms",

            totalFeatures:

                Object.keys(features).length

        };

    }

    /** Gap Feature */

    static gapFeatures(input) {
        const history = input.history;
        const gaps = [];

        for (let i = 1; i < history.length; i++) {
            gaps.push(
                history[i] - history[i - 1]
            );
        }

        const features = {};
        /** Raw gaps (newest first) */
        [...gaps]
            .reverse()
            .forEach((gap, index) => {
                features[`gap_${index + 1}`] = gap;
            });

        // --------------
        // Statistics
        // --------------

        features.gap_average = Statistics.average(gaps);
        features.gap_median = Statistics.median(gaps);
        features.gap_variance = Statistics.variance(gaps);
        features.gap_stdDeviation = Statistics.stdDeviation(gaps);
        features.gap_min = Statistics.min(gaps);
        features.gap_max = Statistics.max(gaps);
        features.gap_range = Statistics.range(gaps);

        // ---------------
        // Counts
        // ---------------

        const positive = gaps.filter( g => g > 0).length;
        const negative = gaps.filter( g => g < 0).length;
        const zero = gaps.filter( g => g === 0).length;

        features.positive_gap_count = positive;
        features.negative_gap_count = negative;
        features.zero_gap_count = zero;

        // ----------------
        // Ratios
        // ----------------

        const total = gaps.length;

        features.positive_gap_ratio = positive / total;
        features.negative_gap_ratio = negative / total;
        features.zero_gap_ratio = zero / total;

        // -------------
        // Extremes
        // -------------

        features.largest_rise = Math.max(...gaps);
        features.largest_drop = Math.min(...gaps);

        return features;
    }

}