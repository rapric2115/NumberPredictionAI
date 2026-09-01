/**
 * ----------------------------------------------------
 * Normalizer
 * ----------------------------------------------------
 * Responsible for converting values to normalized
 * ranges that are easier for the AI to learn.
 * ----------------------------------------------------
 */

import CONFIG from "../config.js";

export default class Normalizer {

    /**
     * Normalize a number between 0 and MAX_NUMBER
     * Example:
     * 20 -> 0.5
     * 40 -> 1
     */
    static number(value) {

        return value / CONFIG.MAX_NUMBER;

    }

    /**
     * Normalize formula weight
     */
    static weight(value) {

        return value / CONFIG.MAX_WEIGHT;

    }

    /**
     * Normalize constant value
     * Example:
     * -0.001 -> 0
     * 0.005 -> 1
     */
    static constant(value) {

        const range =
            CONFIG.MAX_CONSTANT -
            CONFIG.MIN_CONSTANT;

        return (
            value -
            CONFIG.MIN_CONSTANT
        ) / range;

    }

    /**
     * Normalize match count
     * Example:
     * 20 -> 1
     * 10 -> 0.5
     */
    static matches(value) {

        return value / CONFIG.MAX_MATCHES;

    }

    /**
     * Generic min/max normalization
     */
    static minMax(value, min, max) {

        if (max === min) {
            return 0;
        }

        return (value - min) / (max - min);

    }

    /**
     * Clamp value between 0 and 1
     */
    static clamp(value) {

        if (value < 0) return 0;

        if (value > 1) return 1;

        return value;

    }

    /**
     * Round to N decimals
     */
    static round(value, decimals = 6) {

        return Number(
            value.toFixed(decimals)
        );

    }

    /**
     * Normalize an array of numbers
     */
    static array(values, method = "number") {

        return values.map(value => {

            if (typeof this[method] === "function") {
                return this[method](value);
            }

            return value;

        });

    }

    static dividedByMax(value, max) {
        if (max === 0) {
            return 0;
        }
        return value / max;
    }

    static clamp01 (value) {
        return Math.max(0, Math.min(1, value));
    }

}