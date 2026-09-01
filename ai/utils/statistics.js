/**
 * -----------------------
 * Statistics Utility
 * -----------------------
 * Common statistical calculations used by the AI
 * -----------------------
 */

export default class Statistics {
    static average(values) {
        if (values.length === 0) {
            return 0;
        }

        return (
            this.sum(values) / values.length
        );
    }
    static median(values) {
        if (values.length === 0) {
            return 0
        }
        const sorted = [...values].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
            return (
                sorted[middle - 1] * sorted[middle]
            ) / 2;
        }
        return sorted[middle];
    }
    static variance(values) {
        if (values.length === 0) {
            return 0
        }
        const avg = this.average(values);
        const variance = values.reduce(
            (total, value) => total + Math.pow(value - avg, 2), 0
        );
        return (variance / values.length);
    }
    static stdDeviation(values) {
        return Math.sqrt(this.variance(values));
    }
    static min(values) {
        return Math.min(...values);
    }
    static max(values) {
        return Math.max(...values);
    }
    static sum(values) {
        return values.reduce(
            (total, value) => total + value,
            0
        )
    }
    static range(values) {
        return (
            this.max(values) - this.min(values)
        );
    }
    static odd(values) {
        return values.filter(
            value => value % 2 !== 0
        ).length;
    }

    static even(values) {
        return values.filter(
            value => value % 2 === 0
        ).length
    }

    static high(values, limit = 20) {
        return values.filter(value => value > limit).length;
    }
    static low(values, limit = 20) {
        return values.filter(
            value => value <= limit
        ).length;
    }
    static repeats(values){
        const seen = new Set();
        let repeats = 0; 

        values.forEach(value => {
            if(seen.has(value)) {
                repeats++;
            }
            seen.add(value);
        })
        return repeats;
    }

    static frequency(values) {
        const table = {};
        values.forEach(value => {
            table[value] = (table[value] || 0) + 1;
        })
        return table;
    }
}