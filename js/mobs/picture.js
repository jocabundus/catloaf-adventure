/**
 * This file is part of CATLOAF ADVENTURE.
 * @author Joe King
 * @copyright Joe King LLC 2020
 */
"use strict";

function Picture(x, y, drawCallback)
{
    this.x = x;
    this.y = y;
    this.draw  = drawCallback;
    this.timer = 0;
    this.intervalId = setInterval(this.go, 100, this);
    this.scope = 0;
    
    this.kill = function()
    {
        clearInterval(this.intervalId);
    }
}
Picture.prototype.go = function(self)
{
    self.timer += 1;
    self.draw(self.x, self.y, self.timer);
}
