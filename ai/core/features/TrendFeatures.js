/**
 * ============================================
 * Gap Features
 * ============================================
 *
 * Calculates movement between values.
 *
 * Example:
 *
 * History:
 * [1,4,6,10]
 *
 * Gaps:
 * [3,2,4]
 *
 * Used by AI to understand movement.
 *
 * ============================================
 */


export default class GapFeatures {


    static extract(history){


        if(!Array.isArray(history)){

            throw new Error(
                "GapFeatures requires an array"
            );

        }


        if(history.length < 2){

            return {

                lastGap:0,

                averageGap:0,

                maximumGap:0,

                minimumGap:0,

                positiveMoves:0,

                negativeMoves:0,

                totalMovement:0

            };

        }



        const gaps = [];



        for(
            let i = 1;
            i < history.length;
            i++
        ){

            const gap =
                history[i] - history[i-1];


            gaps.push(gap);

        }



        const totalMovement =
            gaps.reduce(
                (sum,value)=>
                    sum + value,
                0
            );



        return {


            /**
             * Last movement
             */

            lastGap:
                gaps.at(-1),



            /**
             * Average movement
             */

            averageGap:
                totalMovement / gaps.length,



            /**
             * Biggest jump
             */

            maximumGap:
                Math.max(...gaps),



            /**
             * Biggest drop
             */

            minimumGap:
                Math.min(...gaps),



            /**
             * How many times increased
             */

            positiveMoves:
                gaps.filter(
                    value => value > 0
                ).length,



            /**
             * How many times decreased
             */

            negativeMoves:
                gaps.filter(
                    value => value < 0
                ).length,



            /**
             * Total direction
             */

            totalMovement


        };


    }


}