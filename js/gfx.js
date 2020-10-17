/**
 * This file is part of CATLOAF 2600.
 * Copyright (C) 2007-2020 Joe King - All Rights Reserved
 * https://games.joeking.us/
 */
"use strict";

var GFX = {
    colors: [
        '#000',
        '#00a',
        '#0a0',
        '#0aa',
        '#a00',
        '#a0a',
        '#a50',
        '#aaa',
        '#555',
        '#55f',
        '#0f5',
        '#5ff',
        '#f55',
        '#f5f',
        '#ff5',
        '#fff'
    ],
    colorForeground: 0,
    colorBackground: 0,
    drawX: 0,
    drawY: 0,
    cursor: null,
    showCursor: false,
    cursorColor: 15,
    blink: false,
    cursorInterval: null,
    cursorTimeout: null,
    /**
     * Escape HTML entities 
     */
    escape: function(string)
    {
        return string
            .replace('<', '&lt;')
            .replace('>', '&gt;');
    },
    /**
     * @param int foreground
     * @param int background 
     */
    color: function(foreground, background)
    {
        if(typeof(foreground) === 'undefined') { foreground = null; }
        if(typeof(background) === 'undefined') { background = null; }
        this.colorForeground = foreground != null ? foreground : this.colorForeground;
        this.colorBackground = background != null ? background : this.colorBackground;
    },
    /**
     * @param int y
     * @param int x 
     */
    locate: function(y, x)
    {
        this.drawX = x-1;
        this.drawY = y-1;
    },
    /**
     * clear screen 
     */
    cls: function(color, background)
    {
        var color      = (typeof(color     ) !== 'undefined') ? color      : 0;
        var background = (typeof(background) !== 'undefined') ? background : 0;
        var table = document.getElementById(this.tableId);
        var cells = table.getElementsByClassName('td');
        for(var i = 0; i < cells.length; i++)
        {
            var cell = cells[i];
            if(background !== null)
            {
                cell.style.background = this.colors[background];
            }
            if(color !== null)
            {
                cell.style.color = this.colors[color];
                cell.innerHTML = " ";
            }
        }
        this.drawX = 0;
        this.drawY = 0;
        this.colorBackground = background;
    },
    /**
     * @param string string 
     */
    print: function(string, showCursor)
    {
        var n = this.drawX+this.drawY*40;
        var table = document.getElementById(this.tableId);
        var cells = table.getElementsByClassName('td');
        for(var i = 0; i < string.length; i++)
        {
            var cell = cells[n+i];
            var chr  = this.escape(string.substring(i, i+1));
            switch(chr)
            {
                case '#':
                    cell.style.color = this.colors[this.colorBackground];
                    cell.style.background = this.colors[this.colorForeground];
                    cell.innerHTML = " ";
                    break;
                default:
                    cell.style.color = this.colors[this.colorForeground];
                    cell.style.background = this.colors[this.colorBackground];
                    cell.innerHTML = chr;
                    break;
            }
        }
        showCursor = (typeof(showCursor) !== "undefined") ? showCursor : false;
        this.cursor = (typeof(cells[n+string.length]) !== "undefined") ? cells[n+string.length] : null;
        this.doCursor(showCursor);
        this.drawX += string.length;
        if(this.drawX >= 40)
        {
            this.drawX = 0;
            this.drawY += 1;
        }
    },
    printTrans: function(string, showCursor)
    {
        var n = this.drawX+this.drawY*40;
        var table = document.getElementById(this.tableId);
        var cells = table.getElementsByClassName('td');
        for(var i = 0; i < string.length; i++)
        {
            var cell = cells[n+i];
            var chr  = this.escape(string.substring(i, i+1));
            switch(chr)
            {
                case ' ':
                    continue;
                    break;
                case '#':
                    cell.style.color = this.colors[this.colorBackground];
                    cell.style.background = this.colors[this.colorForeground];
                    cell.innerHTML = " ";
                    break;
                default:
                    cell.style.color = this.colors[this.colorForeground];
                    cell.style.background = this.colors[this.colorBackground];
                    cell.innerHTML = chr;
                    break;
            }
        }
        showCursor = (typeof(showCursor) !== "undefined") ? showCursor : false;
        this.cursor = (typeof(cells[n+string.length]) !== "undefined") ? cells[n+string.length] : null;
        this.doCursor(showCursor);
        this.drawX += string.length;
        if(this.drawX >= 40)
        {
            this.drawX = 0;
            this.drawY += 1;
        }
    },
    doCursor: function(showCursor)
    {
        if(this.cursorInterval)
        {
            clearInterval(this.cursorInterval);
            this.cursorInterval = null;
        }
        if(this.cursorTimeout)
        {
            clearTimeout(this.cursorTimeout);
            this.cursorTimeout = null;
        }
        
        if(showCursor)
        {
            if(this.cursor)
            {
                this.cursor.style.color = this.colors[this.cursorColor];
                this.showCursor = false;
                this.cursorTimeout = setTimeout(function(self){
                    self.showCursor = true;
                    self.cursorInterval = setInterval(self.blinkCursor, 250, self);
                }, 3000, this);
            }
        }
    },
    /**
     * @param string text
     * @param int y
     * @param int color 
     */
    writeText: function(text, y, color, showCursor)
    {
        var l;
        var x;
        
        l = text.length;
        x = parseInt((40 - l)/2);
        
        this.color(color);
        this.locate(y, x+1);
        this.print(text, showCursor);
        this.drawY += 1;
    },
    /**
     * blinkCursor()
     */
    blinkCursor: function(self)
    {
        self.blink = !self.blink;
        if(self.cursor && self.showCursor)
        {
            self.cursor.innerHTML = self.blink ? " " : "_";
        }
    },
    /**
     * init()
     */
    init: function(tableId)
    {
        this.tableId = tableId;
    },
    
    rgbToHex: function(rgb)
    {
        var hex = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
        var matches = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
        var r = hex[matches[1] >>> 4];// + hex[fg[1] & 15];
        var g = hex[matches[2] >>> 4];// + hex[fg[2] & 15];
        var b = hex[matches[3] >>> 4];// + hex[fg[3] & 15];
        var color = "#"+r+g+b;
        return color;
    },
    
    export: function()
    {
        var code = "";
        code += "#include once \"sys.bas\"\n";
        code += "SYS_Init(640, 480, 0)\n";
        
        var reverseTable = {};
        for(var i = 0; i < this.colors.length; i++)
        {
            reverseTable[this.colors[i]] = i;
        }
        console.log(reverseTable);
        var table = document.getElementById(this.tableId);
        var cells = table.getElementsByClassName('td');
        var i = 0;
        for(var y = 1; y <= 25; y++)
        {
            for(var x = 1; x <= 40; x++)
            {
                var cell = cells[i];
                var char = cell.innerHTML;
                var fg = reverseTable[this.rgbToHex(cell.style.color)];
                var bg = reverseTable[this.rgbToHex(cell.style.background)];
                switch(char)
                {
                    case "&lt;": char = "<"; break
                    case "&gt;": char = ">"; break
                }
                code += "_LOCATE("+y+", "+x+") : ";
                code += "_COLOR("+fg+", "+bg+") : ";
                code += "_PRINT(\""+char+"\")\n";
                i += 1;
            }
        }
        code += "_COPY_SCREEN\n";
        code += "GFX_SaveBMP(\"screenshot\"+date+\"-\"+left(time, 2)+mid(time, 4, 2)+right(time, 2)+\".bmp\")\n";
        code += "_SLEEP_\n";
        code += "END\n";
        console.log(code);
    }
}
