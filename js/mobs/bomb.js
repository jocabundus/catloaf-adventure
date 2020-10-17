/**
 * This file is part of CATLOAF ADVENTURE.
 * @author Joe King
 * @copyright Joe King LLC 2020
 * @depends sound
 * @depends map
 * @depends game
 */
"use strict";

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
            Sound.playSound(Sounds.BombTick);
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
    Sound.playSound(Sounds.Flash);
}
