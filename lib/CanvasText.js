"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var utils_1 = require("./utils");
var CanvasText = (function () {
    function CanvasText() {
        this.textWidth = null;
        this.textHeight = null;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }
    Object.defineProperty(CanvasText.prototype, "width", {
        get: function () { return this.canvas.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasText.prototype, "height", {
        get: function () { return this.canvas.height; },
        enumerable: true,
        configurable: true
    });
    CanvasText.prototype.drawText = function (text, ctxOptions) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = ctxOptions.font;
        this.textWidth = Math.ceil(this.ctx.measureText(text).width);
        this.textHeight = utils_1.getFontHeight(this.ctx.font);
        if (ctxOptions.alignmentMethod == "texture") {
            // We use the size * 2 here because if the item wants to left align or
            // right align, it needs to span the full right side of the canvas and
            // leave the left side empty
            this.canvas.width = THREE.Math.nextPowerOfTwo(this.textWidth * 2);
            this.canvas.height = THREE.Math.nextPowerOfTwo(this.textHeight * 2);
        }
        else {
            this.canvas.width = THREE.Math.nextPowerOfTwo(this.textWidth);
            this.canvas.height = THREE.Math.nextPowerOfTwo(this.textHeight);
        }
        this.ctx.font = ctxOptions.font;
        this.ctx.fillStyle = ctxOptions.fillStyle;
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        this.ctx.shadowColor = ctxOptions.shadowColor;
        this.ctx.shadowBlur = ctxOptions.shadowBlur;
        this.ctx.shadowOffsetX = ctxOptions.shadowOffsetX;
        this.ctx.shadowOffsetY = ctxOptions.shadowOffsetY;
        var xPos = 0;
        var yPos = 0;
        if (ctxOptions.alignmentMethod == "texture") {
            // We have to adjust the align options from the normal options used for
            // child alignemnt
            var alignX = 1 - (ctxOptions.align.x / 2 + 0.5);
            var alignY = (ctxOptions.align.y / 2 + 0.5);
            xPos = (this.canvas.width / 2) - (this.textWidth * alignX);
            yPos = (this.canvas.height / 2) - (this.textHeight * alignY);
        }
        this.ctx.fillText(text, xPos, yPos);
        return this.canvas;
    };
    return CanvasText;
}());
exports.CanvasText = CanvasText;
