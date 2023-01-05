// ********************************************************************************************************************
import { IEquality } from "../shared/equality.interface";
// ********************************************************************************************************************
import { Colour } from "../types/colour";
// ********************************************************************************************************************
import { Vector2 } from "../types/vector2";
// ********************************************************************************************************************
import { Vector3 } from "../types/vector3";
// ********************************************************************************************************************
export class GeometryData implements IEquality<GeometryData> {

    // ****************************************************************************************************************
    // constructor
    // ****************************************************************************************************************
    constructor(public position?: Vector3, public uv?: Vector2, public normal?: Vector3, public colour?: Colour, public uv2?: Vector2) { }

    // ****************************************************************************************************************
    // function:    equals
    // ****************************************************************************************************************
    // parameters:  other - the other
    // ****************************************************************************************************************
    // returns:     whether equal
    // ****************************************************************************************************************
    public equals(other: GeometryData): boolean {

        if (other) {

            // ********************************************************************************************************
            // check position
            // ********************************************************************************************************

            var equals = (!this.position && !other.position) || (this.position && other.position && this.position.equals(other.position)) || false;

            if (equals === false) return equals;

            // ********************************************************************************************************
            // check uv
            // ********************************************************************************************************

            equals = (!this.uv && !other.uv) || (this.uv && other.uv && this.uv.equals(other.uv)) || false;

            if (equals === false) return equals;

            // ********************************************************************************************************
            // check normal
            // ********************************************************************************************************

            equals = (!this.normal && !other.normal) || (this.normal && other.normal && this.normal.equals(other.normal)) || false;

            if (equals === false) return equals;

            // ********************************************************************************************************
            // check colour
            // ********************************************************************************************************

            equals = (!this.colour && !other.colour) || (this.colour && other.colour && this.colour.equals(other.colour)) || false;

            if (equals === false) return equals;

            // ********************************************************************************************************
            // check uv2
            // ********************************************************************************************************

            equals = (!this.uv2 && !other.uv2) || (this.uv2 && other.uv2 && this.uv2.equals(other.uv2)) || false;

            return equals;
        }
        return false;
    }
}
