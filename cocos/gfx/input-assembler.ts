import { GFXBuffer } from './buffer';
import { GFXFormat } from './define';
import { GFXDevice } from './device';

export interface IGFXInputAttribute {
    binding?: number;
    name: string;
    format: GFXFormat;
    isNormalized?: boolean;
    stream?: number;
    isInstanced?: boolean;
}

export interface IGFXInputAssemblerInfo {
    attributes: IGFXInputAttribute[];
    vertexBuffers: GFXBuffer[];
    indexBuffer?: GFXBuffer;
    isIndirect?: boolean;
}

export abstract class GFXInputAssembler {

    public get vertexBuffers (): GFXBuffer[] {
        return this._vertexBuffers;
    }

    public get indexBuffer (): GFXBuffer | null {
        return this._indexBuffer;
    }

    public get attributes (): IGFXInputAttribute[] {
        return this._attributes;
    }

    public get vertexCount (): number {
        return this._vertexCount;
    }

    public set vertexCount (count: number) {
        this._vertexCount = count;
    }

    public get firstVertex (): number {
        return this._firstVertex;
    }

    public set firstVertex (first: number) {
        this._firstVertex = first;
    }

    public get indexCount (): number {
        return this._indexCount;
    }

    public set indexCount (count: number) {
        this._indexCount = count;
    }

    public get firstIndex (): number {
        return this._firstIndex;
    }

    public set firstIndex (first: number) {
        this._firstIndex = first;
    }

    public get vertexOffset (): number {
        return this._vertexOffset;
    }

    public set vertexOffset (offset: number) {
        this._vertexOffset = offset;
    }

    public get instanceCount (): number {
        return this._instanceCount;
    }

    public set instanceCount (count: number) {
        this._instanceCount = count;
    }

    public get firstInstance (): number {
        return this._firstInstance;
    }

    public set firstInstance (first: number) {
        this._firstInstance = first;
    }

    protected _device: GFXDevice;
    protected _attributes: IGFXInputAttribute[] = [];
    protected _vertexBuffers: GFXBuffer[] = [];
    protected _indexBuffer: GFXBuffer | null = null;
    protected _vertexCount: number = 0;
    protected _firstVertex: number = 0;
    protected _indexCount: number = 0;
    protected _firstIndex: number = 0;
    protected _vertexOffset: number = 0;
    protected _instanceCount: number = 0;
    protected _firstInstance: number = 0;
    protected _isIndirect: boolean = false;

    constructor (device: GFXDevice) {
        this._device = device;
    }

    public abstract initialize (info: IGFXInputAssemblerInfo): boolean;
    public abstract destroy (): void;

    public getVertexBuffer (stream: number): GFXBuffer | null {
        if (stream < this._vertexBuffers.length) {
            return this._vertexBuffers[stream];
        } else {
            return null;
        }
    }
}
