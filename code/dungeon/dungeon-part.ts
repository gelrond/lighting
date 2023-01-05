// ********************************************************************************************************************
import { Mesh } from "three";
// ********************************************************************************************************************
import { Bounds2 } from "../types/bounds2";
// ********************************************************************************************************************
import { Vector2 } from "../types/vector2";
// ********************************************************************************************************************
export enum PartType { ROOM, CORRIDOR }
// ********************************************************************************************************************
export abstract class DungeonPart {

    // ****************************************************************************************************************
    // bounds - the bounds
    // ****************************************************************************************************************
    public get bounds(): Bounds2 { return this.getBounds(); }

    // ****************************************************************************************************************
    // sizeX - the size x
    // ****************************************************************************************************************
    public readonly sizeX: number = this.getSizeX();

    // ****************************************************************************************************************
    // sizeY - the size y
    // ****************************************************************************************************************
    public readonly sizeY: number = this.getSizeY();

    // ****************************************************************************************************************
    // constructor
    // ****************************************************************************************************************
    constructor(public position: Vector2 = new Vector2()) { }


    // ****************************************************************************************************************
    // function:    getBounds
    // ****************************************************************************************************************
    // parameters:  n/a
    // ****************************************************************************************************************
    // returns:     the bounds
    // ****************************************************************************************************************
    private getBounds(): Bounds2 {

        const hx = this.sizeX * 0.5;

        const hy = this.sizeY * 0.5;

        const min = new Vector2(this.position.x - hx, this.position.y - hy);

        const max = new Vector2(this.position.x + hx, this.position.y + hy);

        return new Bounds2(min, max);
    }

    // ****************************************************************************************************************
    // function:    getSizeX
    // ****************************************************************************************************************
    // parameters:  n/a
    // ****************************************************************************************************************
    // returns:     the size x
    // ****************************************************************************************************************
    protected abstract getSizeX(): number;

    // ****************************************************************************************************************
    // function:    getSizeY
    // ****************************************************************************************************************
    // parameters:  n/a
    // ****************************************************************************************************************
    // returns:     the size Y
    // ****************************************************************************************************************
    protected abstract getSizeY(): number;

    // ****************************************************************************************************************
    // function:    getType
    // ****************************************************************************************************************
    // parameters:  n/a
    // ****************************************************************************************************************
    // returns:     the type
    // ****************************************************************************************************************
    public abstract getType(): PartType;
}
