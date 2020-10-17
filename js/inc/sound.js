/**
 * This file is part of CATLOAF ADVENTURE.
 * @author Joe King
 * @copyright Joe King LLC 2020
 * @requires class-sample
 */
"use strict";

var Sound = {
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
     * @param string src 
     * @return int
     */
    addSound: function(src)
    {
        var snd = new Sample(this.soundPath+src);
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
}
