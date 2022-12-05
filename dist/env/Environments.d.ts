export declare enum EnvironmentName {
    AU1 = "AU1",
    CA1 = "CA1",
    EU1 = "EU1",
    JP1 = "JP1",
    NA1 = "NA1",
    UK1 = "UK1",
    custom = "custom"
}
export interface EnvironmentEndpoints {
    chat: string;
    gateway: string;
    name: string;
}
export declare function getEnvironmentEndpoints(environment: EnvironmentName): EnvironmentEndpoints;
