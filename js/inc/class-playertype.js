/**
 * This file is part of CATLOAF ADVENTURE.
 * @author Joe King
 * @copyright Joe King LLC 2020
 */
"use strict";

/**
 * PlayerType
 * @class
 * @param {int} startX
 * @param {int} startY
 * @param {int} startLife
 * @param {int} startLives
 */
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
