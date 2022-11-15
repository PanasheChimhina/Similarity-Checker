module.exports = class checkSimilarity {

    calculateSimilarity(source, target) {
        if ((source == null) || (target == null)) return 0;
        if ((source.length == 0) || (target.length == 0)) return 0;
        if (source == target) return '100%';

        let stepsToSame = this.levenshteinDistance(source, target);

        return ((1 - (stepsToSame / Math.max(source.length, target.length))) * 100).toFixed(0).toString().concat('%')

    }

    levenshteinDistance(str1, str2) {
        const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i += 1) {
            track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j += 1) {
            track[j][0] = j;
        }
        for (let j = 1; j <= str2.length; j += 1) {
            for (let i = 1; i <= str1.length; i += 1) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1, // deletion
                    track[j - 1][i] + 1, // insertion
                    track[j - 1][i - 1] + indicator, // substitution
                );
            }
        }
        return track[str2.length][str1.length];
    };

    decimalAdjust(type, value, exp) {
        type = String(type);
        if (!["round", "floor", "ceil"].includes(type)) {
            throw new TypeError(
                "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'."
            );
        }
        exp = Number(exp);
        value = Number(value);
        if (exp % 1 !== 0 || Number.isNaN(value)) {
            return NaN;
        } else if (exp === 0) {
            return Math[type](value);
        }
        const [magnitude, exponent = 0] = value.toString().split("e");
        const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
        // Shift back
        const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
        return Number(`${newMagnitude}e${+newExponent + exp}`);
    }


}