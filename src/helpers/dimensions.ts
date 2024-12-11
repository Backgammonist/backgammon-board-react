export class Dimensions {
    private _boardWidth: number;
    private _barWidth: number;
    private _borderWidth: number;
    private _boardHeight: number;
    private _checkerStroke: number;

    constructor(barWidth = 50, borderWidth = 20) {
        this._boardWidth = 640;
        this._boardHeight = this._boardWidth * 0.75;
        this._barWidth = barWidth;
        this._borderWidth = borderWidth;
        this._checkerStroke = 1;
    }

    get boardWidth() {
        return this._boardWidth;
    }

    get boardHeight() {
        return this._boardHeight;
    }

    get pointHeight() {
        return (this._boardHeight / 2 - this._borderWidth) * 0.8;
    }

    get barWidth() {
        return this._barWidth;
    }

    get borderWidth() {
        return this._borderWidth;
    }

    get panelWidth() {
        return (this._boardWidth - this._borderWidth * 2 - this._barWidth) / 2;
    }

    get pointWidth() {
        return this.panelWidth / 6;
    }

    get checkerWidth() {
        return this.pointWidth * 0.8;
    }

    get sidebarWidth() {
        return this.pointWidth * 1.4;
    }

    get checkerStroke() {
        return this._checkerStroke;
    }

    get sidebarRationModifier() {
        return (this._boardWidth - this.sidebarWidth) / this._boardWidth
    }

    get cubeWidth() {
        return this.checkerWidth + this._checkerStroke;
    }

    get dieWidth() {
        return this.checkerWidth * 1.2 + this._checkerStroke;
    }

    get dieDotSize() {
        return this.dieWidth / 10;
    }
}
