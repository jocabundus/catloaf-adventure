/**
 * This file is part of CATLOAF ADVENTURE.
 * @author Joe King
 * @copyright Joe King LLC 2020
 * @depends sound
 * @depends sprites
 * @depends map
 * @depends game
 */
"use strict";

function MirrorLoaf(x, y, target, drawCallback, eraseCallback, clearCallback)
{
    this.x = x;
    this.y = y;
    this.target = target;
    this.targetStart = {x: target.x, y: target.y };
    this.spawn  = {x: x, y: y};
    this.state  = this.mirror;
    this.draw   = drawCallback;
    this.erase  = eraseCallback;
    this.clear  = clearCallback;
    this.timer  = parseInt(Math.random()*100);
    this.intervalId = setInterval(this.go, 100, this);
    this.scope = 0;
    
    this.setTarget = function(x, y)
    {
        this.target.x = x;
        this.target.y = y;
    }
    
    this.kill = function()
    {
        this.state();
        clearInterval(this.intervalId);
    }
}
MirrorLoaf.prototype.go = function(self)
{
    self.timer += 1;
    self.state();
    self.draw(self.x, self.y, self.state, self.timer);
}
MirrorLoaf.prototype.mirror = function()
{
    var dx = this.targetStart.x - this.target.x;
    var dy = this.targetStart.y - this.target.y;
    
    var newX = this.spawn.x + dx;
    var newY = this.spawn.y - dy;
    if(this.x != newX || this.y != newY)
    {
        if(Map.isPushable(newX, newY))
        {
            var moveX = newX - this.x;
            var moveY = newY - this.y;
            var spriteId = Map.get(newX, newY);
            var pushed = Map.push(newX, newY, moveX, moveY);
            Sprites.drawSprite(pushed.x-Game.player.gridX, pushed.y-Game.player.gridY, spriteId, Map.isMirror(pushed.x, pushed.y) ? 8 : null, Map.isFlip(pushed.x, pushed.y));
            Sound.playSound(Sounds.PushWall);
        }
        this.erase(this.x, this.y);
        this.x = newX;
        this.y = newY;
    }
}
