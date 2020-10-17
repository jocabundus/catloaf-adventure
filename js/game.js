/**
 * This file is part of CATLOAF 2600.
 * Copyright (C) 2007-2020 Joe King - All Rights Reserved
 * https://games.joeking.us/
 */
"use strict";



/**
 * @depends Input 
 */
var Game = {
    
    /**
     * @var Input 
     */
    inputHandle: null,
    /**
     * @var function(int keyCode, bool isRepeat)
     */
    main: null,
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
     * @param Input inputHandle 
     */
    init: function(inputHandle)
    {
        this.inputHandle = inputHandle;
        setInterval(this.doInput, 100, this.inputHandle);
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
