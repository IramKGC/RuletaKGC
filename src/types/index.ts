// src/types/index.ts

export interface Sector {
    label: string | number;
}

export interface SpinWheelOptions {
    canvasSelector: string;
    sectors: Sector[];
    friction?: number;
}

export interface EventEmitter {
    on(eventName: string, callback: Function): void;
    emit(eventName: string, ...args: any[]): void;
}