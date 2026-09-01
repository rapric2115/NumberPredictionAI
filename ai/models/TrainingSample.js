/** 
 * ============================
 * Training Sample 
 * ============================
 * 
 * Represent ONE supervised learning sample.
 * 
 * Brain.js expects:
 * {
 *      input:{...}
 *      output: {...} 
 * }
 * 
 * ============================
 */

export default class TrainingSample {
    constructor({
        input, 
        output,
        metadata = {}
    }) {
        this.input = input;
        this.output = output;
        this.metadata = metadata;
        this.validate();
    }

    validate() {
        if(!this.input) {
            throw new Error("Training input is required.");
        }
        if(typeof this.input !== "object") {
            throw new Error("TrainingSample: input is required.")
        }
        if(typeof this.output !== "object") {
            throw new Error("TrainingSample: ouptu is required");
        }
    }

    /** Convert to Brain JS Format */
    toBrainFormat() {
        return {
            input: this.input,
            output: this.output
        }
    }

    /**
     * -----------------
     * Describe
     * -----------------
     */

    describe () {
        return {
            inputFeatures:
                Object.keys(this.input).length,
            output: this.output,
            metadata: this.metadata
        }
    }
}
