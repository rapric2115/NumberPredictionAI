/** 
 * ==============================
 * Gap Feature
 * ==============================
 * 
 * Calculates distance changes
 * between numbers in a column
 *  */

export default class gapFeatures {
    static extract (history) {
        if(history.length < 2) {
            return {
                lastGap: 0,
                averageGap: 0,
                maximumGap: 0,
                minimumGap: 0
            };
        }

        const gaps = [];

        for(let i = 1; i < history.length; i ++) {
            gaps.push(history[i] - history[i - 1]);
        }

        return {
            // last gap
            lastGap: gaps.at(-1),
            // Average movement
            averageGap: 
                gaps.reduce(
                    (a,b) => a+b, 0
                ) / gaps.length,

            maximumGap: 
                Math.max(...gaps),
            minimumGap:
                Math.min(...gaps),
            positiveMove:
                gaps.filter(
                    g => g > 0 
                ).length,
            negativeMove: 
                gaps.filter(
                    g => g < 0 
                ).length
        };
    }
}
