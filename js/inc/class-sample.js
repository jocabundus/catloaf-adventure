/**
 * This file is part of CATLOAF ADVENTURE.
 * @author Joe King
 * @copyright Joe King LLC 2020
 */
"use strict";

/**
 * @class
 * @param string src
 */
function Sample(src)
{
    this.sample = new Audio();
    this.sample.src = src;
    this.sample.preload = "auto";
    this.sample.controls = "none";
    
    this.loaded = false;
    
    var self = this;
    this.sample.addEventListener("canplaythrough", function(event){
        self.loaded = true;
    });
    
    this.play = function()
    {
        this.sample.currentTime = 0;
        this.sample.play();
    }
    this.stop = function()
    {
        this.sample.pause();
    }
}
