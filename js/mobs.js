/**
 * This file is part of CATLOAF 2600.
 * Copyright (C) 2007-2020 Joe King - All Rights Reserved
 * https://games.joeking.us/
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
            Game.drawSprite(pushed.x-Game.player.gridX, pushed.y-Game.player.gridY, spriteId, Map.isMirror(pushed.x, pushed.y) ? 8 : null, Map.isFlip(pushed.x, pushed.y));
            Game.playSound(Sounds.PushWall);
        }
        this.erase(this.x, this.y);
        this.x = newX;
        this.y = newY;
    }
}


function Bomb(x, y, target, drawCallback, eraseCallback, clearCallback)
{
    this.x = x;
    this.y = y;
    this.target = target;
    this.draw   = drawCallback;
    this.erase  = eraseCallback;
    this.clear  = clearCallback;
    this.state  = this.tick;
    this.timer  = 0;
    this.intervalId = setInterval(this.go, 100, this);
    this.scope = 0;
    this.detonated = false;
    
    this.place();
    
    this.kill = function()
    {
        clearInterval(this.intervalId);
        if(!this.detonated)
        {
            this.detonate();
        }
        this.unplace();
    }
}
Bomb.prototype.place = function()
{
    var x = this.x;
    var y = this.y;
    Map.setTemp(x, y, Map.get(x, y));
    Map.set(x, y, SpriteIds.BOMB);
    Map.setPassable(x, y, false);
    Map.setPushable(x, y);
}
Bomb.prototype.unplace = function()
{
    var x = this.x;
    var y = this.y;
    Map.set(x, y, Map.getTemp(x, y));
    Map.setPassable(x, y);
    Map.setPushable(x, y, false);
}
Bomb.prototype.go = function(self)
{
    self.timer += 1;
    self.state();
    if(self.state == self.tick)
    {
        self.draw(self.x, self.y, (self.timer & 1) ? SpriteIds.BOMBLIT1 : SpriteIds.BOMBLIT2);
    }
}
Bomb.prototype.done = function()
{
    
}
Bomb.prototype.tick = function()
{
    switch(this.timer)
    {
        case 15:
        case 35:
        case 55:
            Game.playSound(Sounds.BombTick);
        break;
    }
    if(this.timer >= 75)
    {
        this.detonate();
        this.state = this.done;
    }
}
Bomb.prototype.detonate = function()
{
    this.detonated = true;
    this.unplace();
    var paths = [
        [[0, 0]],
        [[ 1, 0],[ 2, 0],[ 3, 0],[ 4, 0]],
        [[-1, 0],[-2, 0],[-3, 0],[-4, 0]],
        [[ 0, 1],[ 0, 2],[ 0, 3],[ 0, 4]],
        [[ 0,-1],[ 0,-2],[ 0,-3],[ 0,-4]]
    ];
    var playerX = Game.player.x + Game.player.gridX;
    var playerY = Game.player.y + Game.player.gridY;
    var onsprites = [];
    var offsprites = [];
    for(var i = 0; i < paths.length; i++)
    {
        var path = paths[i];
        for(var n = 0; n < path.length; n++)
        {
            var x = this.x+path[n][0];
            var y = this.y+path[n][1];
            var sprite = Map.get(x, y);
            if(MAP_TryKill(x, y, false))
            {
                if(x == playerX && y == playerY)
                {
                    Map.setTemp(x, y, SPRITE_GetDead(SpriteIds.CATLOAF));
                }
                else
                {
                    Map.setTemp(x, y, SPRITE_GetDead(sprite));
                }
            }
            else
            {
                Map.setTemp(x, y, 0);
            }
            if(this.clear(x, y))
            {
                onsprites.push( {x: x, y: y, sprite: SpriteIds.FLASH1});
                offsprites.push({x: x, y: y, sprite: SpriteIds.FLASH2});
            }
            else
            {
                break;
            }
        }
    }
    this.count = 0;
    this.interval = setInterval(function(onsprites, offsprites, self){
        var sprites = ((self.count & 3)==0) ? offsprites : onsprites;
        for(var i = 0; i < sprites.length; i++)
        {
            var sprite = sprites[i];
            var background = ((self.count & 1)==0) ? 12 : 15;
            self.draw(sprite.x, sprite.y, Map.getTemp(sprite.x, sprite.y), [0, background]);
        }
        self.count += 1;
        if(self.count >= 30)
        {
            clearInterval(self.interval);
            for(var i = 0; i < sprites.length; i++)
            {
                var sprite = sprites[i];
                if(Map.getTemp(sprite.x, sprite.y))
                {
                    SPRITE_AddBlinkSprite(sprite.x, sprite.y, Map.getTemp(sprite.x, sprite.y));
                }
                self.erase(sprite.x, sprite.y);
            }
            self.kill();
        }
    }, 60, onsprites, offsprites, this);
    Game.playSound(Sounds.Flash);
}

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
