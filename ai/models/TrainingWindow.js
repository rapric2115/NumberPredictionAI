/** 
 * =========================
 * Training Windows
 * =========================
 * 
 * Represents one supervised Learning window.
 * 
 * Example:
 * 
 * History
 * -------------------------
 * [1,4,6,10,10,4,7]
 * 
 * windows SIZE = 4
 * 
 * window
 * history: [1,4,6,10]
 * 
 * target: 10
 * ==========================  
 */

export default class TrainingWindow {
    constructor({
        history,
        target,
        column,
        startIndex,
        endIndex,
        targetIndex
    }) {
        this.history = history;
        this.target = target;
        this.column = column;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.targetIndex = targetIndex;
        this.validate();
    }

    /** Validation  */
    validate(){
        if(!Array.isArray(this.history)) {
            throw new Error("TrainingWindow history must be an array.");
        }
        if(this.history.length === 0) {
            throw new Error("TrainingWindow History is empty.");
        }
        if (this.target === undefined) {
            throw new Error("TrainingWindow target is required.");
        }
        if(!this.column) {
            throw new Error("TrainingWindow colum is required.");
        }
    }

    /** Window Size */

    getWindowSize() {
        return this.history.length;
    }

    /** Last Value */
    getCurrentValue() {
        return this.history.at(-1);
    }

    /** Previous Value */
    getPreviousValue() {
        return this.history.at(-2);
    }

    /** Debug information */
    describe() {
        return {
            column: this.column.name,
            windowSize: this.getWindowSize(),
            history: this.history,
            target: this.target,
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            targetIndex: this.targetIndex
        };
    }
}
