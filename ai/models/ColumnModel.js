/**
 * ============================================
 * Column Model
 * ============================================
 *
 * Represents one independent data column.
 *
 * Each column has:
 *
 * - name
 * - position
 * - history
 * - constants
 *
 * ============================================
 */


export default class ColumnModel {


    constructor({

        name,

        index,

        history,

        constants,

        formulaCoefficient

    }) {


        this.name = name;

        this.index = index;

        this.history = history;

        this.constants = constants;

        this.formulaCoefficient = formulaCoefficient;


        this.validate();

    }



    /**
     * -----------------------------------------
     * Validate column data
     * -----------------------------------------
     */


    validate(){


        if(!this.name){

            throw new Error(
                "Column name is required."
            );

        }



        if(this.index === undefined){

            throw new Error(
                "Column index is required."
            );

        }



        if(!Array.isArray(this.history)){

            throw new Error(
                `${this.name}: history must be an array.`
            );

        }



        if(!Array.isArray(this.constants)){

            throw new Error(
                `${this.name}: constants must be an array.`
            );

        }

        if (this.formulaCoefficient === undefined) {
            throw new Error(`${this.name}: formulaCoefficient is required.`)
        }


    }



    /**
     * -----------------------------------------
     * Latest value
     * -----------------------------------------
     */


    getCurrentValue(){

        return this.history.at(-1);

    }



    /**
     * -----------------------------------------
     * Previous value
     * -----------------------------------------
     */


    getPreviousValue(){

        return this.history.at(-2);

    }



    /**
     * -----------------------------------------
     * History length
     * -----------------------------------------
     */


    getSize(){

        return this.history.length;

    }



    /**
     * -----------------------------------------
     * Information
     * -----------------------------------------
     */


    describe(){


        return {


            name:this.name,


            index:this.index,


            historySize:this.history.length,


            constantsCount:
                this.constants.length,


            currentValue:
                this.getCurrentValue(),


            previousValue:
                this.getPreviousValue()


        };


    }

    /** ---------------------
     * Clone column with a different history
     * ----------------------
     * 
     * Used by TrainingDataBuilder to create 
     * temporary training windows.
     * 
     * @param {Array<number>} history
     * @returns {ColumnModel}
     */

    cloneWithHistory(history) {
        return new ColumnModel({
            name: this.name,
            index: this.index,
            history,
            constants: this.constants,
            formulaCoefficient: this.formulaCoefficient
        });
    }

    /**
     * ---------------------------
     * Sliding Windows
     * ---------------------------
     * 
     * Generate supervised Learning windows
     * Example 
     * 
     * History
     * [1,4,6,10,10,4,7]
     * 
     * windows size = 4
     * 
     * yields 
     * input: [1,4,6,10]
     * target: 10
     * 
     * input: [4,6,10,10]
     * target: 4
     * 
     */

    slidingWindows(windowSize = 4) {

    const windows = [];

    if (this.history.length <= windowSize) {
        return windows;
    }

    for (
        let i = windowSize;
        i < this.history.length;
        i++
    ) {

        const windowHistory =
            this.history.slice(
                i - windowSize,
                i
            );

        windows.push({
            history: windowHistory,
            target: this.history[i],
            targetIndex: i,
            startIndex: i - windowSize,
            endIndex: i - 1,
            column: this.cloneWithHistory(history)
        });

    }

    return windows;

}

}