// ********************************************************************************************************************
import { Progress } from "./progress";
// ********************************************************************************************************************
export class ProgressConsole extends Progress {

    // ****************************************************************************************************************
    // constructor
    // ****************************************************************************************************************
    constructor(step: number = 10) { super(step); }

    // ****************************************************************************************************************
    // function:    render
    // ****************************************************************************************************************
    // parameters:  percentage - the percentage
    // ****************************************************************************************************************
    //              text - the text
    // ****************************************************************************************************************
    // returns:     n/a
    // ****************************************************************************************************************
    public render(percentage: number, text: string | null): void {

        console.log(`${text} - ${percentage}% complete`);
    }
}
