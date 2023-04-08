export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const numberApproximation = (value: number) => {
    if (value <= -1000) {
        const approximate = value.toFixed(0);
        return numberWithSpaces(Number(approximate))
    } else if (value < 0) {
        return value.toFixed(2)
    } else if (value < 0.09 && value > 0) {
        return value.toFixed(5)
    } else if (value >= 1000) {
        const approximate = value.toFixed(0);
        return numberWithSpaces(Number(approximate))
    } else return value.toFixed(2)
};

export const numberLook = (value: number) => {
    if (value < 0) {
        return "red"
    } else if (value > 0) {
        return "#33CC33"
    } else return "white"
};

export const amountLook = (value: number) => {
    const approximate = value.toFixed(0);
    if (value >= 1000) {
        return numberWithSpaces(Number(approximate))
    } else return value
};

export const marketCapLook = (marketCap: number) => {
    return marketCap >= 1000000000 ? `${(marketCap / 1000000000).toFixed(2)} B` : `${(marketCap / 1000000).toFixed(2)} M`
};
