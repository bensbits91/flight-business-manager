export const getSumOfDiffOf2Props = (logs, prop1, prop2) => {
    return logs.reduce((prev, cur) => {
        return parseFloat((prev + cur[prop1] - cur[prop2]).toFixed(2));
    }, 0);
};

export const getSumOf1Prop = (logs, prop1) => {
    return logs.reduce((prev, cur) => {
        return parseFloat((prev + cur[prop1]).toFixed(2));
    }, 0);
};