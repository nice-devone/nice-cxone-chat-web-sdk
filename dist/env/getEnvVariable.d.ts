import { ChatSDKVariable } from './ChatSDKVariable';
declare class VariablesStorage {
    private _vars;
    set(variableName: ChatSDKVariable, value: string | undefined): void;
    get<D = undefined>(variableName: ChatSDKVariable, defaultValue?: D): string | D;
    list(): string[];
    clear(): void;
}
export declare const SDKVariableStorage: VariablesStorage;
export {};
