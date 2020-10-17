/**
 * This file is part of CATLOAF ADVENTURE.
 * @author Joe King
 * @copyright Joe King LLC 2020
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

/**
 * @depends GFX
 */
var Sprites = {
    /**
     * @var GFX 
     */
    gfxHandle: null,
    /**
     * @var SpriteType 
     */
    sprites: [],
    /**
     * @param GFX gfxHandle
     */
    init: function(gfxHandle)
    {
        this.gfxHandle = gfxHandle;
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
    }
}
