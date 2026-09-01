// ============================================
// AI Prediction Engine
// Brain.js + Formula Weight + Sequence Learning
// ============================================


// -----------------------------
// Configuration
// -----------------------------

const MAX_NUMBER = 40;


// -----------------------------
// Your Formula
// -----------------------------

function calculateFormula(constant, val1, val2) {

    const sumVal = val1 + val2;

    const topTerm =
        4.3473 * val1 * val2;


    const bottomTermExponent =
        Math.exp(constant);


    const bottomTerm =
        Math.pow(
            sumVal,
            bottomTermExponent
        );


    const innerFraction =
        topTerm / bottomTerm;


    const squaredFraction =
        Math.pow(
            innerFraction,
            2
        );


    const numerator =
        Math.log (
            squaredFraction
        ) * 720;


    const denominatorExponent =
        Math.pow(
            sumVal,
            -1
        );


    const denominator =
        Math.pow(
            720,
            denominatorExponent
        );


    return numerator / denominator;
}



// ============================================
// Feature Generator
// ============================================

function createFeatures(
    sequence,
    constant,
    value1,
    value2
){

    const frequency = {};


    sequence.forEach(number=>{

        frequency[number] =
            (frequency[number] || 0) + 1;

    });



    const weight =
        calculateFormula(
            constant,
            value1,
            value2
        );



    return {


        // Last numbers pattern

        last1:
            sequence.at(-1) / MAX_NUMBER,

        last2:
            sequence.at(-2) / MAX_NUMBER,

        last3:
            sequence.at(-3) / MAX_NUMBER,

        last4:
            sequence.at(-4) / MAX_NUMBER,



        // Dynamic values

        value1:
            value1 / MAX_NUMBER,


        value2:
            value2 / MAX_NUMBER,



        // Constant

        constant:
            constant / 0.01,



        // Formula weight

        weight:
            weight / 100,



        // Frequency signals

        freq35:
            (frequency[35] || 0) / 10,


        freq39:
            (frequency[39] || 0) / 10,


        freq40:
            (frequency[40] || 0) / 10

    };

}



// ============================================
// Dataset Generator
// ============================================


function createTrainingData(
    history,
    constant,
    value1,
    value2
){

    const dataset=[];



    for(
        let i=4;
        i<history.length;
        i++
    ){

        const previousNumbers =
            history.slice(
                i-4,
                i
            );


        const nextNumber =
            history[i];



        dataset.push({

            input:
                createFeatures(
                    previousNumbers,
                    constant,
                    value1,
                    value2
                ),


            output:{

                ["number_"+nextNumber]:1

            }

        });


    }



    return dataset;

}




// ============================================
// Brain.js Model
// ============================================


class PredictionAI {


    constructor(){

        this.net =
            new brain.NeuralNetwork({

                hiddenLayers:[
                    20,
                    15
                ]

            });

    }

    train(
        history,
        constant,
        value1,
        value2
    ){
        const trainingData =
            createTrainingData(
                history,
                constant,
                value1,
                value2
            );

        console.log(
            "Training samples:",
            trainingData.length
        );

        this.net.train(
            trainingData,
            {

                iterations:2000,

                errorThresh:0.005,

                log:true

            }
        );

        console.log(
            "Training completed"
        );

    }





    predict(
        history,
        constant,
        value1,
        value2
    ){
        const features =
            createFeatures(
                history.slice(-4),
                constant,
                value1,
                value2
            );

        const result =
            this.net.run(features);

        return Object.entries(result)
            .sort(
                (a,b)=>
                    b[1]-a[1]
            )
            .map(item=>({
                number:
                    Number(
                        item[0]
                            .replace(
                                "number_",
                                ""
                            )
                    ),

                confidence:
                    (
                        item[1]*100
                    ).toFixed(2)
            }));

    }

}



// ============================================
// TEST
// ============================================


// Your real data

const history=[

// 32,
// 30,
// 24,
// 35,
// 35,
// 39,
// 33,
// 35,
// 40,
// 32,
// 35,
// 39,
// 28,
// 39,
// 40,
// 39,
// 29,
// 39

35,
24,
37,
36,
38,
34,
38,
34,
30,
28,
38,
38,
22,
37,
31,
35,
34,
36,
32,
35,
38,
38,
34

];


// These change every time
const constant = 0.003;

const CONSTANTS = [
    {
        id: 1,
        constant: 0.005,
        matches: 2
    },{
        id: 2,
        constant: 0.006,
        matches: 5
    }
]
// have an array of constants no just only one.


const value1 =
35;


const value2 =
24;




const ai =
new PredictionAI();



// Train

ai.train(

    history,

    constant,

    value1,

    value2

);



// Predict

const prediction =
ai.predict(

    history,

    constant,

    value1,

    value2

);



console.log(
    "Prediction:",
    prediction.slice(0,10)
);