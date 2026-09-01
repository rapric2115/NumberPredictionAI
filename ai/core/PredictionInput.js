/**
 * ==========================
 * Prediction Input
 * ==========================
 *
 * Represents one prediction request.
 *
 * It behaves like ColumnModel so
 * ColumnFeatureEngine can process it.
 *
 * ==========================
 */


export default class PredictionInput {


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

        this.formulaCoefficient =
            formulaCoefficient;


        this.validate();

    }



    /**
     * -------------------------
     * Validation
     * -------------------------
     */

    validate(){


        if(!this.name){

            throw new Error(
                "Prediction requires a name"
            );

        }


        if(!Array.isArray(this.history)){

            throw new Error(
                "Prediction Input history must be an array"
            );

        }


        if(!Array.isArray(this.constants)){

            throw new Error(
                "PredictionInput constants must be an array"
            );

        }


        if(this.formulaCoefficient === undefined){

            throw new Error(
                "PredictionInput requires formulaCoefficient"
            );

        }

    }



    /**
     * -------------------------
     * Latest value
     * -------------------------
     */


    getCurrentValue(){

        return this.history.at(-1);

    }



    /**
     * -------------------------
     * Previous value
     * -------------------------
     */


    getPreviousValue(){

        return this.history.at(-2);

    }



    /**
     * -------------------------
     * History size
     * -------------------------
     */


    getSize(){

        return this.history.length;

    }



    /**
     * -------------------------
     * Clone history
     * -------------------------
     */


    cloneWithHistory(history){

        return new PredictionInput({

            name:this.name,

            index:this.index,

            history,

            constants:this.constants,

            formulaCoefficient:
                this.formulaCoefficient

        });

    }



    /**
     * -------------------------
     * Sliding Windows
     * -------------------------
     */


    slidingWindows(windowSize = 4){


        const windows = [];


        for(
            let i = windowSize;
            i < this.history.length;
            i++
        ){

            const input =
                this.history.slice(
                    i-windowSize,
                    i
                );


            windows.push({

                input,

                target:
                    this.history[i],

                index:i,


                column:
                    this.cloneWithHistory(
                        input
                    )

            });

        }


        return windows;

    }




    /**
     * -------------------------
     * Description
     * -------------------------
     */


    describe(){

        return {

            name:this.name,

            index:this.index,

            historySize:
                this.history.length,

            current:
                this.getCurrentValue(),

            previous:
                this.getPreviousValue(),

            constants:
                this.constants.length,

            coefficient:
                this.formulaCoefficient

        };

    }


}