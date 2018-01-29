import * as _ from "lodash";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: "ec-pie-progress-indicator",
    templateUrl: "pie-progress-indicator.component.html",
    styleUrls: ["pie-progress-indicator.component.css"]
})
export class PieProgressIndicatorComponent implements OnChanges{

    static FULL_CIRCLE_ANGLE: number = 360;
    static HALF_PERCENTAGE: number = 0.5;
    private transform = "";

    @Input() progressPercentage: number = 0;
    @Input() progressNumerator: number = 0;
    @Input() progressDenominator: number = 0;
    @Input() isMasked: boolean = false; //not being used?
    @Input() completed: boolean = false;

    ngOnChanges(changes: SimpleChanges) {
        if (this.completed) {
            this.progressNumerator = 1;
            this.progressDenominator = 1;
            this.progressPercentage = 1;
        }
        this.computeRotation();
    }

    isLessThanHalf(): boolean {
        return this.getPercentage() < PieProgressIndicatorComponent.HALF_PERCENTAGE;
    }

    isCompleted(): boolean {
        return this.completed || this.getPercentage() >= 1;
    }

    getTransform() : string{
        return this.transform;
    }

    getPercentage(): number {
        if (this.progressPercentage) {
            return this.progressPercentage;
        }

        if (this.progressDenominator) {
            return this.progressNumerator / this.progressDenominator;
        }

        return 0;
    }

    computeRotation() {
        let degreeRotation =  Math.ceil(this.getPercentage() * PieProgressIndicatorComponent.FULL_CIRCLE_ANGLE);
        let rotationString = Math.round(degreeRotation).toString();
        this.transform = "rotate(" + rotationString + "deg)";
    }
}
