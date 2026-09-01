/** 
 * ==========================
 * Prediction Result
 * ==========================
 * 
 * Represent one prediction generated
 * byt the neural network
 * 
 * Responsible for:
 * 
 * * sorting probabilities
 * * best prediction
 * * top-N predictions
 * * confidence
 * * pretty printing
 * ==========================
 */

export default class PredictionResult {
    constructor(probabilities = {}, metadata = {}) {
        this.probabilities = probabilities;
        this.metadata = metadata;

        this.createdAt = new Date().toISOString();
    }

    /** Return sorted predictions  */
    sorted () {
        return Object.entries(this.probabilities)
                .sort((a, b) => b[1] - a[1])
                .map(([label, probability]) => ({
                    label,
                    probability,
                    percentage: (probability * 100).toFixed(2) + "%"
                }));
    }

    /** Best Prediction */

    bestPrediction() {
        return this.sorted()[0];
    }

    /** Top N predictions */
    top(count = 5) {
        return this.sorted().slice(0, count);
    }

    /** Top Numbers */
    topNumbers(count = 5) {
        return this.top(count).map(
            item =>
                Number(
                    item.label.replace(
                        "number_", ""
                    )
                )
        )
    }

    /** Confidence */

    confidence() {
        const best = this.bestPrediction();
        return best ? best.probability : 0;
    }

    /** Predicted number */

    number () {
        const best = this.bestPrediction();

        if(!best) {
            return null;
        }

        return Number(
            best.label.replace("number_", "")
        );
    }
    /** Describe Prediction */

    describe() {
        return {
            prediction: this.number(),
            confidence: this.confidence(),
            top5: this.top(5),
            metadata: this.metadata,
            createdAt: this.createdAt
        };
    }
}
