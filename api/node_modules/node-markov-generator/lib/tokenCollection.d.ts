export declare class TokenCollection {
    private values;
    private totalCount;
    private shouldUpdateProbabilities;
    constructor(initialValues?: string[]);
    add(value: string): void;
    getRandom(): string;
    private ensureProbabilitiesUpdated;
}
