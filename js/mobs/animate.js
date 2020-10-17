/**
 * This file is part of CATLOAF ADVENTURE.
 * @author Joe King
 * @copyright Joe King LLC 2020
 */
"use strict";

function Animate(x, y, drawCallback)
{
    this.x = x;
    this.y = y;
    this.draw  = drawCallback;
    this.timer = 0;
    this.intervalId = setInterval(this.go, 100, this);
    this.scope = 0;
    this.sprites = [];
    this.speed = 1;
    
    this.kill = function()
    {
        clearInterval(this.intervalId);
    }
}
Animate.prototype.go = function(self)
{
    self.timer += 1*self.speed;
    if(self.timer >= self.sprites.length)
    {
        self.timer = 0;
    }
    var sprite = self.sprites[parseInt(self.timer)];
    self.draw(self.x, self.y, self.timer, sprite);
}
