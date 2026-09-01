/**
 * Constant Definitions
 *
 * Each constant represents one formula configuration.
 * The AI will calculate one weight for every constant.
 */

/**
 * @typedef {Object} ConstantDefinition
 * @property {number} id
 * @property {number} value
 * @property {number} matches
 * @property {boolean} enabled
 * @property {string} label
 */

const CONSTANTS = Object.freeze([

    {
        id: 1,
        value: 0.005,
        matches: 2,
        enabled: true,
        label: "C005"
    },

    {
        id: 2,
        value: 0.004,
        matches: 7,
        enabled: true,
        label: "C004"
    },

    {
        id: 3,
        value: 0.003,
        matches: 20,
        enabled: true,
        label: "C003"
    },

    {
        id: 4,
        value: 0.002,
        matches: 4,
        enabled: true,
        label: "C002"
    },

    {
        id: 5,
        value: 0.001,
        matches: 2,
        enabled: true,
        label: "C001"
    },

    {
        id: 6,
        value: 0.000,
        matches: 2,
        enabled: true,
        label: "C000"
    },

    {
        id: 7,
        value: -0.001,
        matches: 1,
        enabled: true,
        label: "CM001"
    }

]);

export default CONSTANTS;