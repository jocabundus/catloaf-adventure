/**
 * This file is part of CATLOAF ADVENTURE.
 * @author Joe King
 * @copyright Joe King LLC 2020
 * @depends map
 * @depends game
 */
"use strict";

/**
 * @param int x
 * @param int y
 * @param {int x, int y} target
 * @param function(x, y, state) drawCallback
 * @param function(x, y) eraseCallback
 * @param function(x, y) clearCallback
 */
function Spider(x, y, target, drawCallback, eraseCallback, clearCallback)
{
    this.x = x;
    this.y = y;
    this.target = target;
    this.state  = this.still;
    this.draw   = drawCallback;
    this.erase  = eraseCallback;
    this.clear  = clearCallback;
    this.timer  = parseInt(Math.random()*100);
    this.intervalId = setInterval(this.go, 100, this);
    this.scope = 0;
    
    this.place();
    
    this.setTarget = function(x, y)
    {
        this.target.x = x;
        this.target.y = y;
    }
    
    this.kill = function()
    {
        clearInterval(this.intervalId);
        this.unplace();
    }
}
Spider.prototype.place = function()
{
    Map.setPassable(this.x, this.y, false);
    Map.setKillable(this.x, this.y);
}
Spider.prototype.unplace = function()
{
    Map.setPassable(this.x, this.y);
    Map.setKillable(this.x, this.y, false);
}
Spider.prototype.go = function(self)
{
    self.timer += 1;
    self.state();
    if(self.x == (Game.player.x + Game.player.gridX) && (self.y == Game.player.y + Game.player.gridY))
    {
        Game.player.life = 0;
    }
    self.draw(self.x, self.y, self.state, self.timer);
}
Spider.prototype.still = function()
{
    if(this.target.y == this.y && Math.abs(this.target.x - this.x) <= 4)
    {
        var angle  = parseInt(Math.random()*4)*90;
        this.vx = angle ==  0 ?  1 : (angle == 180 ? -1 : 0);
        this.vy = angle == 90 ? -1 : (angle == 270 ?  1 : 0);
        this.steps = parseInt(Math.random()*2)+2;
        this.state = this.walk;
        return
    }
    var rnd = parseInt(Math.random()*100);
    if(rnd == 0)
    {
        var angle  = parseInt(Math.random()*4)*90;
        this.vx = angle ==  0 ?  1 : (angle == 180 ? -1 : 0);
        this.vy = angle == 90 ? -1 : (angle == 270 ?  1 : 0);
        this.steps = parseInt(Math.random()*3)+1;
        this.state = this.walk;
    }
}
Spider.prototype.walk = function()
{
    if((this.timer % 3) == 0)
    {
        var moveToX = (this.x + this.vx);
        var moveToY = (this.y + this.vy);
        if(this.clear(moveToX, moveToY))
        {
            this.erase(this.x, this.y);
            this.unplace();
            this.x += this.vx;
            this.y += this.vy;
            this.place();
            this.steps -= 1;
        }
        else
        {
            this.steps = 0;
        }
        if(this.steps == 0)
        {
            this.state = this.still;
        }
    }
}
Spider.prototype.movingToTarget = function()
{
    
}
