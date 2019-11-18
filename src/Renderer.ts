import { LSystem } from './LSystem';

type cursor = {
    x: number,
    y: number,
    orientation: number
}

export class TraceRenderer {

    orientation: number;
    color: string;
    instructions: string[];
    currentIndex: number;
    ctx: CanvasRenderingContext2D;
    stepLength: number;
    locX: number;
    locY: number;
    renderWindow: number;
    onComplete: any;

    rotation: number = (2*Math.PI)/4; // radians

    constructor(
        config
    ){
        // console.log("creating renderer ", config);
        this.orientation = config.orientation || 0;
        this.color = config.color || "#ff0000";
        this.instructions = config.instructions || [];
        this.currentIndex = config.currentIndex || 0;
        this.stepLength = config.stepLength || 5;
        this.ctx = config.canvasContext;
        this.locX = config.locX || 0;
        this.locY = config.locY || 0;

        this.renderWindow = config.renderWindow || 5;
        this.onComplete = config.onComplete || (() => { this.currentIndex = 0 })
    }

    forwardStrings = ['F', 'E'];
    turnLeftStrings = ['-'];
    turnRightStrings = ['+'];

    moveForward() {
        let deltaX = this.stepLength*Math.cos((this.orientation)*(this.rotation));
        let deltaY = this.stepLength*Math.sin((this.orientation)*(this.rotation));

        this.locX = this.locX + deltaX;
        this.locY = this.locY + deltaY;

        // console.log("going forward... ", this.locX, this.locY, deltaX, deltaY);
        this.ctx.lineTo(this.locX, this.locY)
    }

    turnRight() {
        this.orientation = (this.orientation+1)%(4);
        // console.log("turned right", this.orientation);
    }

    turnLeft() {
        this.orientation = (this.orientation-1)%(4);
        // console.log("turned left", this.orientation);
    }

    renderOneInstruction(instructionIdx: number) {
        // console.log("executing instruction number ", instructionIdx);
        const instructionMatcher = (instruction) => (list) =>
            list.indexOf( instruction ) > -1;
        let currentInstruction = this.instructions[instructionIdx];
        let instructionFrom = instructionMatcher(currentInstruction);

        // console.log("executing ", currentInstruction);

        if(instructionFrom(this.forwardStrings)){
            this.moveForward();
        }else if(instructionFrom(this.turnRightStrings)){
            this.turnRight();
        }else if(instructionFrom(this.turnLeftStrings)){
            this.turnLeft();
        }
    }

    saveState() : cursor {
        return {
            x: this.locX,
            y: this.locY,
            orientation: this.orientation
        }
    }

    loadState(state: cursor) {
        this.locX = state.x;
        this.locY = state.y;
        this.orientation = state.orientation;
    }

    renderOnce() {

        this.ctx.beginPath();
        this.ctx.moveTo(this.locX, this.locY);
        this.ctx.strokeStyle= this.color;

        // console.log("style ", this.ctx.strokeStyle);

        this.renderOneInstruction(this.currentIndex);
        let state = this.saveState();

        for ( 
                let ii = this.currentIndex + 1;
                ii <= this.currentIndex + this.renderWindow;
                ii++
        ){ this.renderOneInstruction(ii); }

        this.currentIndex = this.currentIndex + 1;
        this.ctx.stroke();

        this.loadState(state);

        if(this.currentIndex > this.instructions.length){
            this.onComplete();
        }
    }
}