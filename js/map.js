/**
 * This file is part of CATLOAF 2600.
 * Copyright (C) 2007-2020 Joe King - All Rights Reserved
 * https://games.joeking.us/
 */
"use strict";

var MapCellProperties = {
    Passable  : 0x01,
    Pushable  : 0x02,
    Mirror    : 0x04,
    Flip      : 0x08,
    Killable  : 0x10,
    Diggable  : 0x20,
    ShowBuried: 0x40
};
var MobScopes = {
    Global: 1,
    Room  : 2
};
/**
 * @param int x
 * @param int y
 * @param int closed
 * @param int open 
 */
function DoorType(x, y, closed, open)
{
    open = (typeof(open) !== "undefined") ? open : 0;
    
    this.x = x;
    this.y = y;
    this.closed = {
        sprite    : closed,
        passable  : false,
        showBuried: false
    }
    this.open = {
        sprite    : open,
        passable  : true,
        showBuried: false
    }
}

function GridType(width, height, border)
{
    this.grid   = [];
    this.width  = width;
    this.height = height;
    this.border = border;
    this.reset();
}
GridType.prototype.reset = function()
{
    for(var x = 0; x < this.width; x++)
    {
        this.grid[x] = [];
        for(var y = 0; y < this.height; y++)
        {
            this.grid[x][y] = 0;
        }
    }
}
GridType.prototype.get = function(x, y)
{
    if(x < 0 || y < 0 || x >= this.width || y >= this.height)
    {
        return this.border;
    }
    else
    {
        return this.grid[x][y];
    }
}
GridType.prototype.set = function(x, y, value)
{
    if(x < 0 || y < 0 || x >= this.width || y >= this.height)
    {
        return;
    }
    else
    {
        this.grid[x][y] = value;
    }
}
GridType.prototype.setBit = function(x, y, bit)
{
    if(x < 0 || y < 0 || x >= this.width || y >= this.height)
    {
        return;
    }
    else
    {
        this.grid[x][y] = (this.grid[x][y] | bit);
    }
}
GridType.prototype.unsetBit = function(x, y, bit)
{
    if(x < 0 || y < 0 || x >= this.width || y >= this.height)
    {
        return;
    }
    else
    {
        this.grid[x][y] = ((this.grid[x][y] | bit) ^ bit);
    }
}
GridType.prototype.hasBit = function(x, y, bit)
{
    if(x < 0 || y < 0 || x >= this.width || y >= this.height)
    {
        return false;
    }
    else
    {
        return ((this.grid[x][y] & bit) > 0) ? true : false;
    }
}

var Map = {
    
    mobs: [],
    
    /**
     * @var DoorType array
     */
    doors: [],
    
    /**
     * @var int 
     */
    width: null,
    
    /**
     * @var int 
     */
    height: null,
    
    /**
     * @var GridType 
     */
    sprites: null,
    
    /**
     * @var GridType 
     */
    temp: null,
    
    /**
     * @var GridType 
     */
    tempprops: null,
    
    /**
     * @var GridType 
     */
    properties: null,
    
    updates: [],
    
    /**
     * @param int width
     * @param int height
     * @param int borderSprite 
     */
    init: function(width, height, borderSprite)
    {
        this.width  = width;
        this.height = height;
        this.properties = new GridType(width, height, 0);
        this.sprites    = new GridType(width, height, borderSprite);
        this.buried     = new GridType(width, height, 0);
        this.temp       = new GridType(width, height, borderSprite);
        this.tempprops  = new GridType(width, height, 0);
    },
    
    /**
     * @return bool 
     */
    getRoomId: function()
    {
        var roomId = parseInt(Game.player.gridX / 8) + parseInt(Game.player.gridY / 5) * 5;
        return roomId;
    },
    
    resetUpdates: function()
    {
        this.updates = [];
    },
    
    /**
     * @param int x
     * @param int y
     */
    erase: function(x, y)
    {
        var sprite = SpriteIds.EMPTYSPACE;
        if(Map.isPushable(x, y))
        {
            sprite = Map.temp.get(x, y);
        }
        Map.properties.set(x, y, 0);
        Map.setPassable(x, y);
        return Map.put(x, y, sprite);
    },
    
    /**
     * @param int x
     * @param int y
     */
    restore: function(x, y)
    {
        var player = Game.player;
        var drawX = x - player.gridX;
        var drawY = y - player.gridY;
        var spriteId = Map.sprites.get(x, y);
        var color = Map.isMirror(x, y) ? 8 : null;
        var flip = Map.isFlip(x, y);
        
        Game.drawSprite(drawX, drawY, spriteId, color, flip);
    },
    
    /**
     * @param int x
     * @param int y
     * @param int spriteId
     */
    put: function(x, y, spriteId)
    {
        var player = Game.player;
        var drawX = x - player.gridX;
        var drawY = y - player.gridY;
        
        this.sprites.set(x, y, spriteId);
        Game.drawSprite(drawX, drawY, spriteId);
        
        //this.updates.push({x: x, y: y, id: spriteId});
    },
    
    /**
     * @param int x
     * @param int y
     * @param int closed
     * @param int open
     * @return DoorType()
     */
    addDoor: function(x, y, closed, open)
    {
        var door = new DoorType(x, y, closed, open);
        this.doors.push(door);
        this.sprites.set(x, y, closed);
        return door;
    },
    
    removeDoor: function(spriteId)
    {
        for(var n = 0; n < this.doors.length; n++)
        {
            var door = this.doors[n];
            if(door.closed.sprite == spriteId)
            {
                this.doors.splice(n, 1);
                n -= 1;
            }
        }
    },
    
    /**
     * @param int spriteId
     * @param bool updateScreen
     * @return bool
     */
    hideDoor: function(spriteId, updateScreen)
    {
        updateScreen = (typeof(updateScreen) !== "undefined") ? updateScreen : true;
        var changed = false;
        var player = Game.player;
        for(var n = 0; n < this.doors.length; n++)
        {
            var door = this.doors[n];
            if(door.closed.sprite == spriteId && this.sprites.get(door.x, door.y) == door.closed.sprite)
            {
                changed = true;
                this.sprites.set(door.x, door.y, door.open.sprite);
                this.setPassable(door.x, door.y, door.open.passable);
                this.showBuried(door.x, door.y, door.open.showBuried);
                if(updateScreen) Game.drawSprite(door.x-player.gridX, door.y-player.gridY, door.open.sprite);
            }
        }
        return changed;
    },
    
    /**
     * @param int spriteId
     * @return bool
     */
    showDoor: function(spriteId)
    {
        var player = Game.player;
        var changed = false;
        for(var n = 0; n < this.doors.length; n++)
        {
            var door = this.doors[n];
            if(door.closed.sprite == spriteId && this.sprites.get(door.x, door.y) == door.open.sprite)
            {
                changed = true;
                this.sprites.set(door.x, door.y, door.closed.sprite);
                this.setPassable(door.x, door.y, door.closed.passable);
                this.showBuried(door.x, door.y, door.closed.showBuried);
                Game.drawSprite(door.x-player.gridX, door.y-player.gridY, door.closed.sprite);
            }
        }
        return changed;
    },
    
    /**
     * @param int spriteId
     */
    toggleDoor: function(spriteId)
    {
        var player = Game.player;
        for(var n = 0; n < this.doors.length; n++)
        {
            var door = this.doors[n];
            if(door.closed.sprite == spriteId)
            {
                var spriteToDraw = (this.sprites.get(door.x, door.y) == door.closed.sprite) ? door.open.sprite : door.closed.sprite;
                this.sprites.set(door.x, door.y, spriteToDraw);
                Game.drawSprite(door.x-player.gridX, door.y-player.gridY, spriteToDraw);
                if(this.sprites.get(door.x, door.y) == door.open.sprite)
                {
                    this.setPassable(door.x, door.y, door.open.passable);
                    this.showBuried(door.x, door.y, door.open.showBuried);
                }
                else
                {
                    this.setPassable(door.x, door.y, door.closed.passable);
                    this.showBuried(door.x, door.y, door.closed.showBuried);
                }
                var buried = Map.getBuried(door.x, door.y);
                if(this.showBuried(door.x, door.y) && buried)
                {
                    Game.drawSprite(door.x-player.gridX, door.y-player.gridY, buried, null, SpriteFlags.Trans);
                }
            }
        }
    },
    
    /**
     * @param int x
     * @param int y
     */
    toggleDoorAt: function(x, y)
    {
        var changed = false;
        for(var n = 0; n < this.doors.length; n++)
        {
            var door = this.doors[n];
            if(door.x == x && door.y == y)
            {
                changed = true;
                var spriteToDraw = (this.sprites.get(door.x, door.y) == door.closed.sprite) ? door.open.sprite : door.closed.sprite;
                this.sprites.set(door.x, door.y, spriteToDraw);
                if(this.sprites.get(door.x, door.y) == door.open.sprite)
                {
                    this.setPassable(door.x, door.y, door.open.passable);
                    this.showBuried(door.x, door.y, door.open.showBuried);
                }
                else
                {
                    this.setPassable(door.x, door.y, door.closed.passable);
                    this.showBuried(door.x, door.y, door.closed.showBuried);
                }
                break;
            }
        }
        return changed;
    },
    
    shiftDoor: function(spriteId, x, y)
    {
        var player = Game.player;
        var oldDoors = [];
        var newDoors = [];
        for(var n = 0; n < this.doors.length; n++)
        {
            var door = this.doors[n];
            if(door.closed.sprite == spriteId)
            {
                oldDoors.push({x: door.x, y: door.y});
                newDoors.push(door);
                this.sprites.set(door.x, door.y, SpriteIds.EMPTYSPACE);
                this.setPassable(door.x, door.y);
            }
        }
        for(var n = 0; n < newDoors.length; n++)
        {
            var door = newDoors[n];
            if(!this.isPassable(door.x+x, door.y+y))
            {
                for(var i = 0; i < oldDoors.length; i++)
                {
                    this.sprites.set(oldDoors[i].x, oldDoors[i].y, spriteId);
                    this.setPassable(oldDoors[i].x, oldDoors[i].y, false);
                }
                return false;
            }
        }
        for(var n = 0; n < newDoors.length; n++)
        {
            var door = newDoors[n];
            door.x += x;
            door.y += y;
            this.sprites.set(door.x, door.y, spriteId);
            this.setPassable(door.x, door.y, false);
            Game.drawSprite(door.x-player.gridX, door.y-player.gridY, spriteId);
        }
        for(var n = 0; n < oldDoors.length; n++)
        {
            var door = oldDoors[n];
            if(this.sprites.get(door.x, door.y) != spriteId)
            {
                Game.drawSprite(door.x-player.gridX, door.y-player.gridY, this.sprites.get(door.x, door.y));
            }
        }
        return true;
    },
    
    /**
     *  
     */
    nextRoom: function()
    {
        this.draw(); PLAYER_Update(true); PLAYER_Draw(true);
        
        this.killMobs(MobScopes.Room);
        
        var addedMirrorLoaf = false;
        
        var player = Game.player;
        for(var y = 0; y < 5; y++) {
            for(var x = 0; x < 8; x++) {
                var spriteId = this.sprites.get(x + player.gridX, y + player.gridY);
                switch(spriteId)
                {
                    case SpriteIds.SPIDER:
                        this.addRoomMob(new Spider(
                            x + player.gridX,
                            y + player.gridY,
                            player.location,
                            SPIDER_Draw,
                            Map.erase,
                            Map.isPassable
                        ));
                        break;
                    case SpriteIds.MIRROR:
                        if(addedMirrorLoaf == false)
                        {
                            var startX = player.gridX+7-player.x;
                            var startY = player.y+player.gridY;
                            this.addRoomMob(new MirrorLoaf(
                                startX,
                                startY,
                                player.location,
                                MIRRORLOAF_Draw,
                                Map.restore,
                                Map.isPassable
                            ));
                            addedMirrorLoaf = true;
                        }
                        break;
                    case SpriteIds.LOGFRAME1:
                    case SpriteIds.LOGFRAME2:
                    case SpriteIds.LOGFRAME3:
                        //this.addRoomMob(new Picture(
                        //    x + player.gridX,
                        //    y + player.gridY,
                        //    PICTURE_Draw
                        //));
                        break;
                    case SpriteIds.CAMPFIRE:
                        var mob = new Animate(
                            x + player.gridX,
                            y + player.gridY,
                            ANIMATE_Draw
                        );
                        mob.sprites = [
                            SpriteIds.CAMPFIRE,
                            SpriteIds.CAMPFIRE+1,
                            SpriteIds.CAMPFIRE+2
                        ];
                        mob.speed   = 0.1;
                        this.addRoomMob(mob);
                        break;
                     case SpriteIds.BOSS:
                        var mob = new Animate(
                            x + player.gridX,
                            y + player.gridY,
                            ANIMATE_Draw
                        );
                        mob.sprites = [
                            SpriteIds.BOSS,
                            SpriteIds.BOSS+1,
                            SpriteIds.BOSS+2,
                            SpriteIds.BOSS+1
                        ];
                        mob.speed   = 0.05;
                        this.addRoomMob(mob);
                        break;
                    case SpriteIds.BOSS+3:
                        var mob = new Animate(
                            x + player.gridX,
                            y + player.gridY,
                            ANIMATE_Draw
                        );
                        mob.sprites = [
                            SpriteIds.BOSS+3,
                            SpriteIds.BOSS+4
                        ];
                        mob.speed   = 0.5;
                        this.addRoomMob(mob);
                        break;
                    case SpriteIds.BOSS+9:
                    case SpriteIds.BOSS+10:
                    case SpriteIds.BOSS+11:
                    case SpriteIds.BOSS+12:
                        var mob = new Animate(
                            x + player.gridX,
                            y + player.gridY,
                            ANIMATE_Draw
                        );
                        mob.sprites = [
                            spriteId,
                            spriteId,
                            spriteId,
                            spriteId,
                            spriteId+4
                        ];
                        mob.speed   = 0.5;
                        this.addRoomMob(mob);
                        break;
                }
            }
        }
        
        var roomId = this.getRoomId();
        if(RoomsRevealed[roomId] == false)
        {
            RoomsRevealed[roomId] = true;
            //Game.playSound(Sounds.Reveal); // TODO -- sounds horrid! replace!!!
            Game.playSound(Sounds.Reveal2);
        }
        else
        {
            Game.playSound(Sounds.Reveal2);
        }
    },
    /**
     * @param object mob 
     * @param int scope
     */
    addMob: function(mob, scope)
    {
        mob.scope = scope;
        this.mobs.push(mob);
    },
    /**
     * @param object mob 
     */
    addGlobalMob: function(mob)
    {
        this.addMob(mob, MobScopes.Global);
    },
    /**
     * @param object mob 
     */
    addRoomMob: function(mob)
    {
        this.addMob(mob, MobScopes.Room);
    },
    draw: function()
    {
        var player = Game.player;
        
        if(player.dark == 1) {
            GFX.cls();
            return;
        }
        
        var map = Game.map;
        for(var y = 0; y < 5; y++) {
            for(var x = 0; x < 8; x++) {
                var mapX = x + player.gridX;
                var mapY = y + player.gridY;
                var spriteId = this.sprites.get(mapX, mapY);
                Game.drawSprite(x, y, spriteId);
                if(this.showBuried(mapX, mapY))
                {
                    var buried = this.getBuried(mapX, mapY);
                    if(buried)
                    {
                        Game.drawSprite(x, y, buried, null, SpriteFlags.Trans);
                    }
                }
            }
        }
    },
    /**
     * @param int scope 
     */
    killMobs: function(scope)
    {
        scope = (typeof(scope) !== "undefined") ? scope : null;
        for(var i = 0; i < this.mobs.length; i++)
        {
            var mob = this.mobs[i];
            if(mob.scope == scope || scope == null)
            {
                mob.kill();
                this.mobs.splice(i, 1);
                i -= 1;
            }
        }
    },
    /**
     * @param int x
     * @param int y
     */
    killMobAt: function(x, y)
    {
        for(var i = 0; i < this.mobs.length; i++)
        {
            var mob = this.mobs[i];
            if(mob.x == x && mob.y == y)
            {
                mob.kill();
                break;
            }
        }
    },
    /**
     * @param int x
     * @param int y
     */
    getMobAt: function(x, y)
    {
        for(var i = 0; i < this.mobs.length; i++)
        {
            var mob = this.mobs[i];
            if(mob.x == x && mob.y == y)
            {
                return mob;
            }
        }
        return null;
    },
    /**
     * @param int x
     * @param int y
     * @return int 
     */
    get: function(x, y)
    {
        return this.sprites.get(x, y);
    },
    /**
     * @param int x
     * @param int y
     * @param int sprite 
     */
    set: function(x, y, sprite)
    {
        this.sprites.set(x, y, sprite);
        //if(sprite == 0)
        //{
        //    this.setPassable(x, y);
        //}
    },
    /**
     * @param int x
     * @param int y
     * @return int 
     */
    getTemp: function(x, y)
    {
        return this.temp.get(x, y);
    },
    /**
     * @param int x
     * @param int y
     * @param int sprite 
     */
    setTemp: function(x, y, sprite)
    {
        this.temp.set(x, y, sprite);
    },
    /**
     * @param int
     * @param y
     * @return int 
     */
    getBuried: function(x, y)
    {
        return this.buried.get(x, y);        
    },
    /**
     * @param int x
     * @param int y
     * @param int sprite 
     */
    setBuried: function(x, y, sprite)
    {
        this.buried.set(x, y, sprite);
    },
    /**
     * @param int fromX
     * @param int fromY
     * @param int byX
     * @param int byY
     * @return bool
     */
    push: function(fromX, fromY, byX, byY)
    {
        var toX = fromX + byX;
        var toY = fromY + byY;
        var fromMirror = this.isMirror(fromX, fromY);
        var toMirror   = this.isMirror(toX, toY);
        var isPassable = (this.isPassable(toX, toY) || toMirror);
        if((!fromMirror && toMirror) || (fromMirror && !toMirror)) {
            toX += byX;
            toY += byY;
            isPassable = true;
            this.setFlip(fromX, fromY);
        }
        if(!isPassable) {
            toX = fromX - byX;
            toY = fromY - byY;
        }
        this.temp.set(toX, toY, this.sprites.get(toX, toY));
        this.tempprops.set(toX, toY, this.properties.get(toX, toY));
        this.sprites.set(toX, toY, this.sprites.get(fromX, fromY));
        this.sprites.set(fromX, fromY, this.temp.get(fromX, fromY));
        
        this.setPassable(toX, toY, false);
        this.setPushable(toX, toY);
        this.setFlip(toX, toY, this.isFlip(fromX, fromY));
        
        var props = this.tempprops.get(fromX, fromY);
        if(props == 0)
        {
            this.setPassable(fromX, fromY);
        }
        else
        {
            this.properties.set(fromX, fromY, props);
        }
        
        for(var i = 0; i < this.mobs.length; i++)
        {
            var mob = this.mobs[i];
            if(mob.x == fromX && mob.y == fromY)
            {
                mob.x = toX;
                mob.y = toY;
            }
        }
        
        return {x: toX, y: toY};
    },
    /**
     * @param int x
     * @param int y
     * @return bool 
     */
    isPushable: function(x, y)
    {
        return Map.properties.hasBit(x, y, MapCellProperties.Pushable);
    },
    /**
     * @param int x
     * @param int y
     * @param bool pushable
     */
    setPushable: function(x, y, pushable)
    {
        pushable = (typeof(pushable) !== "undefined") ? pushable : true;
        if(pushable) {
            Map.properties.setBit(x, y, MapCellProperties.Pushable);
        } else {
            Map.properties.unsetBit(x, y, MapCellProperties.Pushable);
        }
    },
    /**
     * @param int x
     * @param int y
     * @return bool
     */
    isMirror: function(x, y)
    {
        return Map.properties.hasBit(x, y, MapCellProperties.Mirror);
    },
    /**
     * @param int x
     * @param int y 
     */
    setMirror: function(x, y)
    {
        this.properties.setBit(x, y, MapCellProperties.Mirror);
    },
    /**
     * @param int x
     * @param int y
     * @return bool 
     */
    isFlip: function(x, y)
    {
        return Map.properties.hasBit(x, y, MapCellProperties.Flip);
    },
    /**
     * @param int x
     * @param int y 
     */
    setFlip: function(x, y, flip)
    {
        flip = (typeof(flip) !== "undefined") ? flip : true;
        if(flip) {
            Map.properties.setBit(x, y, MapCellProperties.Flip);
        } else {
            Map.properties.unsetBit(x, y, MapCellProperties.Flip);
        }
    },
    /**
     * @param int x
     * @param int y
     * @return bool 
     */
    isPassable: function(x, y)
    {
        return Map.properties.hasBit(x, y, MapCellProperties.Passable);
    },
    /**
     * @param int x
     * @param int y
     * @param bool passable
     */
    setPassable: function(x, y, passable)
    {
        passable = (typeof(passable) !== "undefined") ? passable : true;
        if(passable) {
            this.properties.setBit(x, y, MapCellProperties.Passable);
        } else {
            this.properties.unsetBit(x, y, MapCellProperties.Passable);
        }
    },
    /**
     * @param int x
     * @param int y
     * @return bool 
     */
    isKillable: function(x, y)
    {
        return Map.properties.hasBit(x, y, MapCellProperties.Killable);
    },
    /**
     * @param int x
     * @param int y
     * @param bool killable 
     */
    setKillable: function(x, y, killable)
    {
        killable = (typeof(killable) !== "undefined") ? killable : true;
        if(killable) {
            Map.properties.setBit(x, y, MapCellProperties.Killable);
        } else {
            Map.properties.unsetBit(x, y, MapCellProperties.Killable);
        }
    },
    /**
     * @param int x
     * @param int y
     * @return bool 
     */
    isDiggable: function(x, y)
    {
        return Map.properties.hasBit(x, y, MapCellProperties.Diggable);
    },
    /**
     * @param int x
     * @param int y
     * @param bool diggable 
     */
    setDiggable: function(x, y, diggable)
    {
        diggable = (typeof(diggable) !== "undefined") ? diggable : true;
        if(diggable) {
            Map.properties.setBit(x, y, MapCellProperties.Diggable);
        } else {
            Map.properties.unsetBit(x, y, MapCellProperties.Diggable);
        }
    },
    /**
     * @param int x
     * @param int y
     * @param bool buried 
     * @return bool
     */
    showBuried: function(x, y, buried)
    {
        buried = (typeof(buried) !== "undefined") ? buried : null;
        if(buried === true) {
            Map.properties.setBit(x, y, MapCellProperties.ShowBuried);
        }
        if(buried === false) {
            Map.properties.unsetBit(x, y, MapCellProperties.ShowBuried);
        }
        return Map.properties.hasBit(x, y, MapCellProperties.ShowBuried);
    }
}
