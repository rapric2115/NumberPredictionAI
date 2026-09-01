/**
 * Global AI Configuration
 * All configurable values live here.
 * Nothing should be hardcoded anywhere else.
 */

/**
 * @typedef {Object} AIConfig
 * @property {number} MAX_NUMBER
 * @property {number} MAX_WEIGHT
 * @property {number} MAX_CONSTANT
 * @property {number} MIN_CONSTANT
 * @property {number} MAX_MATCHES
 * @property {number} SEQUENCE_LENGTH
 * @property {number} TRAIN_ITERATIONS
 * @property {number} ERROR_THRESHOLD
 * @property {number[]} HIDDEN_LAYERS
 * @property {boolean} LOG_TRAINING
 */

const CONFIG = Object.freeze({

    /**
     * Highest possible number in the dataset.
     * Current range: 1–40
     */
    MAX_NUMBER: 40,

    /**
     * Largest expected value returned by calculateFormula().
     * Used for normalization.
     */
    MAX_WEIGHT: 100,

    /**
     * Constant normalization range.
     */
    MAX_CONSTANT: 0.005,

    MIN_CONSTANT: -0.001,

    /**
     * Highest number of historical matches.
     * (Currently constant 0.003 has 20)
     */
    MAX_MATCHES: 20,

    /**
     * How many previous numbers are used
     * to predict the next one.
     */
    SEQUENCE_LENGTH: 4,

    /**
     * Brain.js training
     */
    TRAIN_ITERATIONS: 5000,

    ERROR_THRESHOLD: 0.001,

    HIDDEN_LAYERS: [32, 24, 16],

    LOG_TRAINING: true

});

export default CONFIG;
