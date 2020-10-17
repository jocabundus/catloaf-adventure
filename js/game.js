/**
 * This file is part of CATLOAF 2600.
 * Copyright (C) 2007-2020 Joe King - All Rights Reserved
 * https://games.joeking.us/
 */
"use strict";

const SpriteFlags = {
    AnchorLeft  : 0x01,
    AnchorRight : 0x02,
    AnchorTop   : 0x04,
    AnchorBottom: 0x08,
    Flip        : 0x10,
    Trans       : 0x20
}
function SpriteRow()
{
    this.data = '     ';
    this.color = 0;
    this.background = 0;
}
function SpriteType()
{
    this.rows = [];
}
function PlayerType(startX, startY, startLife, startLives)
{
    this.startX = startX;
    this.startY = startY;
    this.startLife  = startLife;
    this.startLives = startLives;
    
    this.init();
}
PlayerType.prototype.init = function()
{
    this.x      = this.startX;
    this.y      = this.startY;
    this.oldX   = this.startX;
    this.oldY   = this.startY;
    this.spawnX = this.startX;
    this.spawnY = this.startY;
    this.gridX  = 0;
    this.gridY  = 0;
    this.life   = this.startLife;
    this.lives  = this.startLives;
    this.dark   = 0;
    this.spawnDark = 0;
    this.hasMoved  = false;
    this.weapon    = 0;
    this.faceLeft  = false;
    this.faceRight = true;
    this.location  = { x: this.startX, y: this.startY };
    this.inventory = [];
    this.selectedItem = 0;
    this.highlightItem = 0;
    this.addItemCallback = null;
}
/**
 * @param int id
 * @return bool 
 */
PlayerType.prototype.hasItem = function(id)
{
    return (this.getItem(id) !== null);
}
/**
 * @param int id 
 * @param int qty
 * @param bool hidden
 */
PlayerType.prototype.addItem = function(id, qty, hidden, other)
{
    qty    = (typeof(qty   ) !== "undefined") ? qty    : 1;
    hidden = (typeof(hidden) !== "undefined") ? hidden : false;
    var addItem = true;
    var hasItem = this.hasItem(id);
    if(hasItem)
    {
        var item = this.getItem(id);
    }
    else
    {
        var item = {id: id, qty: qty, hidden: hidden};
        if(typeof(other) !== "undefined")
        {
            for(var i in other)
            {
                item[i] = other[i];
            }
        }
    }
    if(this.addItemCallback !== null)
    {
        addItem = this.addItemCallback(item, qty);
    }
    if(addItem)
    {
        if(hasItem)
        {
            item.qty += qty;
            if(typeof(other) !== "undefined")
            {
                for(var i in other)
                {
                    item[i] = other[i];
                }
            }
        }
        else
        {
            this.inventory.push(item);
        }
    }
}
/**
 * @param int id 
 */
PlayerType.prototype.removeItem = function(id)
{
    for(var i = 0; i < this.inventory.length; i++)
    {
        var item = this.inventory[i];
        if(item.id == id)
        {
            this.inventory.splice(i, 1);
            if(this.selectedItem == id)
            {
                this.selectedItem = 0;
            }
            return;
        }
    }
}
/**
 * @param int find
 * @param int replace 
 */
PlayerType.prototype.swapItem = function(findId, replaceId)
{
    for(var i = 0; i < this.inventory.length; i++)
    {
        var item = this.inventory[i];
        if(item.id == findId)
        {
            this.inventory[i] = {id: replaceId, qty: 1, hidden: false};
            if(this.selectedItem == findId)
            {
                this.selectedItem = replaceId;
            }
            break;
        }
    }
}
/**
 * @param int id
 * @return int 
 */
PlayerType.prototype.getItemQty = function(id)
{
    var item = this.getItem(id);
    return (item !== null) ? item.qty : 0;
}
/**
 * @param int id
 * @param int qty 
 * @param bool hidden
 */
PlayerType.prototype.setItemQty = function(id, qty, hidden)
{
    hidden = (typeof(hidden) !== "undefined") ? hidden : false;
    if(this.hasItem(id))
    {
        var item = this.getItem(id);
        item.qty = qty;
    }
    else
    {
        var item = {id: id, qty: qty, hidden: hidden};
        this.inventory.push(item);
    }
}
/**
 * @param int id
 * @return int 
 */
PlayerType.prototype.getItem = function(id)
{
    for(var i = 0; i < this.inventory.length; i++)
    {
        var item = this.inventory[i];
        if(item.id == id)
        {
            return this.inventory[i];
        }
    }
    return null;
}
/**
 * @return array 
 */
PlayerType.prototype.getItems = function()
{
    var items = [];
    for(var i = 0; i < this.inventory.length; i++)
    {
        var item = this.inventory[i];
        if(item.id > 0 && !item.hidden)
        {
            items.push(item);
        }
    }
    return items;
}

/**
 * @depends GFX
 * @depends Input 
 */
var Game = {
    /**
     * @var GFX 
     */
    gfxHandle: null,
    /**
     * @var Input 
     */
    inputHandle: null,
    /**
     * @var array 
     */
    sounds: [],
    /**
     * @var string 
     */
    soundPath: '',
    /**
     * @var bool 
     */
    canPlaySound: false,
    /**
     * @var function(int keyCode, bool isRepeat)
     */
    main: null,
    /**
     * @var SpriteType 
     */
    sprites: [],
    /**
     * @var PlayerType 
     */
    player: null,
    /**
     * @var int 
     */
    itemToBuy: null,
    /**
     * @var Object
     */
    target: {x: 0, y: 0},
    /**
     * @var float 
     */
    seconds: 0,
    /**
     * @var int
     */
    timer: null,
    /**
     * @var array 
     */
    vars: [],
    /**
     * @var int 
     */
    state: null,
    /**
     * @var bool 
     */
    paused: false,
    /**
     * @var bool 
     */
    flash: true,
    /**
     * @param GFX gfxHandle
     * @param Input inputHandle 
     */
    init: function(gfxHandle, inputHandle)
    {
        this.gfxHandle = gfxHandle;
        this.inputHandle = inputHandle;
        setInterval(this.doInput, 100, this.inputHandle);
    },
    /**
     * @param string src 
     * @return int
     */
    addSound: function(src)
    {
        var snd = new Sound(this.soundPath+src);
        this.sounds.push(snd);
        return this.sounds.length-1;
    },
    /**
     * @param int id 
     */
    playSound: function(id)
    {
        if(Game.canPlaySound && typeof(this.sounds[id]) !== 'undefined')
        {
            this.sounds[id].play();
        }
    },
    /**
     * @param int id
     */
    stopSound: function(id)
    {
        if(typeof(this.sounds[id]) !== 'undefined')
        {
            this.sounds[id].stop();
        }
    },
    /**
     * @param string path 
     */
    setSoundPath: function(path)
    {
        this.soundPath = path;
    },
    /**
     * @param function(int keyCode, bool isRepeat)
     */
    setMain: function(callback)
    {
        this.main = callback;
    },
    /**
     * @param int startX
     * @param int startY
     * @param int startLife
     * @param int startLives
     */
    initPlayer: function(startX, startY, startLife, startLives)
    {
        this.player = new PlayerType(startX, startY, startLife, startLives);
    },
    /**
     * @param Input inputHandle
     */
    doInput: function(inputHandle)
    {
        var keyCode  = inputHandle.getKeyPressed();
        var isRepeat = inputHandle.keyRepeated();
        
        if(!Game.paused)
        {
            if(Game.main)
            {
                Game.main(keyCode, isRepeat);
            }
        }
    },
    /**
     * @return int 
     */
    getKeyUp: function()
    {
        return this.inputHandle.getKeyUp();
    },
    /**
     * @param int x
     * @param int y
     * @param int spriteId
     * @param int color
     * @param int flags
     */
    drawSprite: function(x, y, spriteId, color, flags)
    {
        this.drawSpriteXY(x*5+1, y*5+1, spriteId, color, flags);
    },
    /**
     * @param int x
     * @param int y
     * @param int spriteId
     * @param int color
     * @param int flags
     */
    drawSpriteXY: function(x, y, spriteId, color, flags)
    {
        if(Array.isArray(color))
        {
            var background = color[1];
            color = color[0];
        }
        else
        {
            var background = null;
            color   = (typeof(color  ) !== "undefined") ? color   : null;
        }
        flags = (typeof(flags) !== "undefined") ? parseInt(flags) : 0;
        
        var sprite = this.sprites[spriteId];
        if(typeof(sprite) === "undefined")
        {
            console.log("undefined sprite: "+spriteId);
            var xx = parseInt((x-1)/5);
            var yy = parseInt((y-1)/5);
            console.log(xx+", "+yy);
            console.log((xx+this.player.gridX)+", "+(yy+this.player.gridY));
        }
        var rows   = sprite.rows;
        if(flags & SpriteFlags.AnchorLeft)
        {
            rows = this.anchorLeft(rows);
        }
        if(flags & SpriteFlags.AnchorRight)
        {
            rows = this.anchorRight(rows);
        }
        if(flags & SpriteFlags.AnchorBottom)
        {
            rows = this.anchorBottom(rows);
        }
        if(flags & SpriteFlags.Flip)
        {
            rows = this.flipRows(rows);
        }
        if(x >= 0 && x < 40 && y >= 0 && y < 25)
        {
            if(flags & SpriteFlags.Trans)
            {
                for(var r = 0; r < 5; r++)
                {
                    var row = rows[r];
                    this.gfxHandle.locate(y, x);
                    this.gfxHandle.color(color === null ? row.color : color, background === null ? row.background : background);
                    this.gfxHandle.printTrans(row.data);
                    y += 1;
                }
            }
            else
            {
                for(var r = 0; r < 5; r++)
                {
                    var row = rows[r];
                    this.gfxHandle.locate(y, x);
                    this.gfxHandle.color(color === null ? row.color : color, background === null ? row.background : background);
                    this.gfxHandle.print(row.data);
                    y += 1;
                }
            }
        }
    },
    /**
     * @param array rows
     */
    flipRows: function(rows)
    {
        var temp = [];
        for(var i = 0; i < rows.length; i++)
        {
            temp[i] = new SpriteRow();
            temp[i].data       = this.reverse(rows[i].data);
            temp[i].color      = rows[i].color;
            temp[i].background = rows[i].background;
        }
        return temp;
    },
    /**
     * @param string string 
     */
    reverse: function(string)
    {
        var reversed = "";
        for(var i = 0; i < string.length; i++)
        {
            var chr = string.substr(string.length-i-1, 1);
            var replace = chr;
            switch(chr) {
                case "<" : replace =  ">"; break;
                case ">" : replace =  "<"; break;
                case "/" : replace = "\\"; break;
                case "\\": replace =  "/"; break;
                case "(" : replace =  ")"; break;
                case ")" : replace =  "("; break;
                case "[" : replace =  "]"; break;
                case "]" : replace =  "["; break;
            }
            reversed += replace;
        }
        return reversed;
    },
    /**
     * @param array rows
     */
    anchorLeft: function(rows)
    {
        var temp = [];
        for(var i = 0; i < rows.length; i++)
        {
            temp[i] = new SpriteRow();
            temp[i].data       = rows[i].data;
            temp[i].color      = rows[i].color;
            temp[i].background = rows[i].background;
        }
        
        do
        {
            var shift = true;
            for(var i = 0; i < temp.length; i++)
            {
                var row = temp[i].data;
                if(row.substr(0, 1) != " ")
                {
                    shift = false;
                    break;
                }
            }
            if(shift)
            {
                for(var i = 0; i < temp.length; i++)
                {
                    var row = temp[i].data;
                    var string = "";
                    for(var n = 1; n < row.length; n++)
                    {
                        string += row.substr(n, 1);
                    }
                    string += row.substr(0, 1);
                    temp[i].data = string;
                }
            }
        } while(shift);
        
        return temp;
    },
    /**
     * @param array rows
     */
    anchorRight: function(rows)
    {
        var temp = [];
        for(var i = 0; i < rows.length; i++)
        {
            temp[i] = new SpriteRow();
            temp[i].data       = rows[i].data;
            temp[i].color      = rows[i].color;
            temp[i].background = rows[i].background;
        }
        
        do
        {
            var shift = true;
            for(var i = 0; i < temp.length; i++)
            {
                var row = temp[i].data;
                if(row.substr(row.length-1, 1) != " ")
                {
                    shift = false;
                    break;
                }
            }
            if(shift)
            {
                for(var i = 0; i < temp.length; i++)
                {
                    var row = temp[i].data;
                    var string = "";
                    for(var n = 0; n < row.length-1; n++)
                    {
                        string += row.substr(n, 1);
                    }
                    string = row.substr(row.length-1, 1)+string;
                    temp[i].data = string;
                }
            }
        } while(shift);
        
        return temp;
    },
    /**
     * @param array rows
     */
    anchorBottom: function(rows)
    {
        var temp = [];
        for(var i = 0; i < rows.length; i++)
        {
            temp[i] = new SpriteRow();
            temp[i].data       = rows[i].data;
            temp[i].color      = rows[i].color;
            temp[i].background = rows[i].background;
        }
        
        do
        {
            var shift = false;
            for(var i = temp.length-1; i >= 0; i--)
            {
                var row = temp[i].data;
                if(row == "     ")
                {
                    shift = true;
                }
                else
                {
                    break;
                }
            }
            if(shift)
            {
                var last = temp[temp.length-1];
                for(var i = temp.length-1; i >= 1; i--)
                {
                    temp[i] = temp[i-1];
                }
                temp[0] = last;
            }
        } while(shift);
        
        return temp;
    },
    startTimer: function()
    {
        this.seconds = 0;
        this.timer = setInterval(this.countSecond, 10);
    },
    stopTimer: function()
    {
        clearInterval(this.timer);
    },
    countSecond: function()
    {
        if(!Game.paused)
        {
            Game.seconds += 0.01;
        }
    },
    /**
     * @return string
     */
    getTimeString: function()
    {
        var seconds = parseInt(this.seconds);
        var minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        
        return (minutes.toString() + ":" + (seconds < 10 ? "0" : "") + seconds.toString());
    },
    pause: function()
    {
        this.inputHandle.pause();
        this.paused = true;
        this.canPlaySound = false;
    },
    unpause: function()
    {
        this.inputHandle.unpause();
        this.paused = false;
        this.canPlaySound = true;
    },
    /**
     * @param int id
     * @param mixed value
     */
    setVar: function(id, value)
    {
        this.vars[id] = value;
    },
    /**
     * @param int id
     * @return mixed
     */
    getVar: function(id)
    {
        return (typeof(this.vars[id]) !== "undefined") ? this.vars[id] : null;
    },
    /**
     * @param int x
     * @param int y
     */
    setTargetXY: function(x, y)
    {
        this.target.x = x;
        this.target.y = y;
    },
    getTargetX: function()
    {
        return this.target.x;
    },
    getTargetY: function()
    {
        return this.target.y;
    }
}
