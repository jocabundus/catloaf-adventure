/**
 * This file is part of CATLOAF ADVENTURE.
 * @author Joe King
 * @copyright Joe King LLC 2020
 * @requires input
 * @requires gfx
 * @requires sound
 * @requires sprites
 * @requires playertype
 * @requires map
 * @requires mobs
 * @requires data
 */
"use strict";

const Constants = {
    StartLife : 100,
    StartLives: 5
}

const SpriteIds = {
    EMPTYSPACE      : 0,
    CATLOAF         : 1,
    CATLOAFDEAD     : 2,
    CATLOAFDARK     : 3,
    CATLOAFDEADDARK : 4,
    MEATLOAF        : 5,
    BRICKWALL       : 6,
    DOORGOLD        : 7,
    DOORSILVER      : 8,
    DOORSTONE       : 9,
    KEYGOLD         : 10,
    KEYSILVER       : 11,
    KEYSTONE        : 12,
    TRAP            : 13,
    BRICKWALLPSH    : 14,
    FENCE           : 15,
    TREE            : 16,
    PUSHSTOP        : 17,
    VILLAGER        : 18,
    VILLAGERHAPPY   : 19,
    VILLAGERDEAD    : 20,
    CHICKEN         : 21,
    CHICKENDEAD     : 22,
    CHICKENEGG      : 23,
    SPIDER          : 24,
    SPIDER2         : 25,
    SPIDERDEAD      : 26,
    SPIDERWEB       : 27,
    SPIDERWEBDEAD   : 28,
    CAVEWALL        : 29,
    SWORD           : 30,
    SWORDBROKEN     : 31,
    BOMB            : 32,
    BOMBLIT1        : 33,
    BOMBLIT2        : 34,
    FLASH1          : 35,
    FLASH2          : 36,
    CATLOAFRIGHT    : 37,
    CATLOAFLEFT     : 38,
    GOLD            : 39,
    GOLDBAR         : 40,
    TREASURECHEST   : 41,
    OPENCHEST1      : 42,
    OPENCHEST2      : 43,
    OPENCHEST       : 44,
    CAPTIVE         : 45,
    CAPTIVEDEAD     : 46,
    CAPTIVERESCUED  : 47,
    RUNE            : 48,
    CAVESOUND       : 49,
    LIGHTLEFT       : 50,
    LIGHTRIGHT      : 51,
    LIGHTCENTER     : 52,
    LIGHTLEFT2      : 53,
    LIGHTRIGHT2     : 54,
    LIGHTCENTER2    : 55,
    LIGHTCENTER3    : 56,
    RING            : 57,
    BLACKSMITH      : 58,
    ANVIL           : 59,
    VILLAGER2       : 60,
    VILLAGER3       : 61,
    WALL1           : 62,
    WALL2           : 63,
    WALL3           : 64,
    PUSH1           : 65,
    PUSH2           : 66,
    PUSH3           : 67,
    BEAMGUN         : 68,
    BEAMGUNACTIVATED: 69,
    BEAMTRIGGER     : 70,
    BEAMTRAPON      : 71,
    BEAMTRAPOFF     : 72,
    BEAM            : 73,
    MOSSYWALL       : 74,
    CATLOAFDEADFLASH: 75,
    LOG             : 76,
    MIRRORLOAF      : 77,
    MIRROR          : 78,
    ICEWALL         : 79,
    ICEPUSHWALL     : 80,
    LAVAWALL        : 81,
    LAVAPUSHWALL    : 82,
    DARKWALL        : 83,
    LOGWALL         : 84,
    LOGWINDOW       : 85,
    LOGFRAME1       : 86,
    LOGFRAME2       : 87,
    LOGFRAME3       : 88,
    DEADTREE        : 89,
    SIR1            : 90,
    SIR2            : 91,
    SIR3            : 92,
    NORTHCAVESIGN   : 93,
    SOUTHCAVESIGN   : 94,
    FORESTSIGN      : 95,
    LIBRARY         : 96,
    SHOVEL          : 97,
    SHOVELBROKEN    : 98,
    LIGHTDIRT       : 99,
    MEDIUMDIRT      : 100,
    HEAVYDIRT       : 101,
    RUBY            : 102,
    AMETHYST        : 103,
    TOPAZ           : 104,
    SAPPHIRE        : 105,
    EMERALD         : 106,
    STONEWALL       : 107,
    STONEWALL2      : 108,
    STONEWALLSIGN   : 109,
    GRAVEYARDFENCE  : 110,
    GRAVESTONE      : 111,
    BLOCKEDBOTTOM   : 112,
    BLOCKEDTOP      : 113,
    BLOCKEDRIGHT    : 114,
    BLOCKEDLEFT     : 115,
    SWORDREPAIR     : 116,
    SHOVELREPAIR    : 117,
    DIRTBUMP        : 118,
    LIBRARYLAMP     : 119,
    BEHINDPICTURE   : 120,
    PICTURESWITCHON : 121,
    PICTURESWITCHOFF: 122,
    TENTLEFT        : 123,
    TENTRIGHT       : 124,
    CAMPFIRE        : 125,
    SOLVEWALL1      : 128,
    SOLVEWALL2      : 129,
    SOLVEWALL3      : 130,
    NORTHCAVEDOOR   : 131,
    VERTICALDOOR    : 132,
    HORIZONTALDOOR  : 133,
    VERTICALTOUCH   : 134,
    HORIZONTALTOUCH : 135,
    LOGRIGHT        : 136,
    LOGLEFT         : 137,
    CRANKSLOT       : 138,
    CRANKUP         : 139,
    CRANKDOWN       : 140,
    CRANKTRY        : 141,
    CATLOAFCRANKUP  : 142,
    CATLOAFCRANKDOWN: 143,
    CATLOAFCRANKTRY : 144,
    BOULDER         : 145,
    BRONZEKEY       : 146,
    BRONZEDOOR      : 147,
    GATEKEY         : 148,
    GATEDOOR        : 149,
    BOSS            : 150,
    STATUE          : 167,
    TIMEDOOR        : 168,
    TIMEDOORTRIGGER : 169,
    TIMEDOORDISABLE : 170,
    ENCHANTEDSWORD  : 171,
    SWORDHP         : 1000,
    SHOVELHP        : 1001,
}

const Weapons = {
    None : 0,
    Erase: 1,
    Sword: 2
}

const GameStates = {
    NoChange   : 0,
    Next       : 1,
    Previous   : 2,
    Reset      : 3,
    MainMenu   : 4,
    Intro      : 5,
    Init       : 6,
    PlayGame   : 7,
    InInventory: 8,
    InHelp     : 9,
    InAbout    : 10,
    EndGame    : 11,
    Dead       : 12,
    GameOver   : 13,
    QuitYesNo  : 14,
    Rescued    : 15,
    Treasure   : 16,
    Blacksmith : 17,
    ConfirmBuy : 18,
    ViewItem   : 19,
    Crank      : 20
}

const GameVars = {
    PUSHBOULDERX       : 0,
    PUSHBOULDERY       : 1,
    PUSHBOULDERSTARTX  : 2,
    PUSHBOULDERSTARTY  : 3,
    PUSHBOULDERPUSHED  : 4,
    PUSHBOULDERCOMPLETE: 5,
    RESETX             : 6,
    RESETY             : 7,
    RESETENABLED       : 8,
    CAPTIVES           : 9,
    BEAMGUNX           : 10,
    BEAMGUNY           : 11,
    SOLVEDWALL1        : 12,
    SOLVEDWALL2        : 13,
    SOLVEDWALL3        : 14
}

var Sounds = {}             // filled out later in DATA_LoadSounds()
var RoomsRevealed = [];     // also filled out later in DATA_LoadSounds()

function DRAW_MainMenu()
{
    GFX.cls();
        
    GFX.color(15);
    GFX.print("+--------------------------------------+");
    GFX.print("|     <                          >     |");
    GFX.print("|    /  ## ### ### #  ### ### ##  \\    |");
    GFX.print("|    )  #  # #  #  #  # # # # #   (    |");
    GFX.print("|    )  #  ###  #  #  # # ### ##  (    |");
    GFX.print("|    \\  ## # #  #  ## ### # # #   /    |");
    GFX.print("|     <                          >     |");
    GFX.print("+===+-- A  D  V  E  N  T  U  R E --+===+");
    
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    
    GFX.print("+===+------------------------------+===+");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("|   |                              |   |");
    GFX.print("----------------------------------------");
    Sprites.drawSpriteXY( 8, 11, SpriteIds.CATLOAFRIGHT);
    Sprites.drawSpriteXY(13, 12, SpriteIds.SWORD);
    Sprites.drawSpriteXY(29, 11, SpriteIds.CATLOAFLEFT);
    Sprites.drawSpriteXY(24, 12, SpriteIds.SWORD, null, SpriteFlags.Flip);
    Sprites.drawSpriteXY(18, 11, SpriteIds.CHICKEN);
    //GFX.writeText("  Catloaf Adventure", 4, 14);
    GFX.writeText("Copyright (C) 2020", 18, 9);
    GFX.writeText("(H)How to Play   (A)About Game", 21, 7);
    GFX.writeText("press space to begin", 23, 14);
}

function STATE_MainMenu() {}
STATE_MainMenu.prototype.go = function(keyCode, isRepeat, initialize)
{
    if(initialize)
    {
        this.nextState = GameStates.NoChange;
        this.wait = false;
        Sound.playSound(Sounds.Title);
    }
    
    if(initialize)
    {
        DRAW_MainMenu();
    }
    
    if(this.wait)
    {
        return GameStates.NoChange;
    }
    if(this.nextState == GameStates.NoChange)
    {
        if(keyCode == KeyCodes.space)
        {
            Sprites.drawSpriteXY(18, 11, SpriteIds.CHICKENDEAD);
            Sound.playSound(Sounds.Flash);
            var delay = FLASH(0, null, 2);
            setTimeout(function(){
                //Sound.playSound(Sounds.Enter);
                GFX.cls();
            }, delay+250);
            setTimeout(function(self){
                self.nextState = GameStates.Next;
                self.wait = false;
            }, delay+500, this);
            this.wait = true
        }
        if(keyCode == KeyCodes.H)
        {
            return GameStates.InHelp;
        }
        if(keyCode == KeyCodes.A)
        {
            return GameStates.InAbout;
        }
    }
    
    return this.nextState;
}

function PLAYER_Draw_Crank()
{
    var player = Game.player;
    var catloafSprite = (player.selectedItem == SpriteIds.CRANKUP) ? SpriteIds.CATLOAFCRANKUP : SpriteIds.CATLOAFCRANKDOWN;
    if(player.selectedItem == SpriteIds.CRANKTRY)
    {
        catloafSprite = SpriteIds.CATLOAFCRANKTRY;
    }
    Sprites.drawSprite(player.x, player.y, catloafSprite, null, (player.faceLeft ? SpriteFlags.Flip : 0));
    if(player.weapon == Weapons.Sword && player.selectedItem > 0)
    {
        var selected = player.selectedItem;
        Sprites.drawSprite(player.x+(player.faceRight ? 1 : -1), player.y, selected, null, (player.faceLeft ? SpriteFlags.Flip : 0) | SpriteFlags.AnchorLeft);
    }
}

function PLAYER_Draw(force)
{
    var player = Game.player;
    
    force = (typeof(force) !== 'undefined') ? force : false;
    
    // Erase the player's old position if he moved
    if(player.hasMoved) {
        var mapX = (player.oldX + player.gridX);
        var mapY = (player.oldY + player.gridY);
        Sprites.drawSprite(player.oldX, player.oldY, Map.get(mapX, mapY));
        if(player.weapon != Weapons.None && player.selectedItem > 0)
        {
            Sprites.drawSprite(player.oldX+(player.faceRight ? 1 : -1), player.oldY, Map.get(mapX+(player.faceRight ? 1 : -1), mapY));
        }
    }
    
    if(player.hasMoved || force) {
        // Draw the player
        if(player.dark == 0) {
            if(player.life > 0) {
                if(player.weapon == Weapons.None || player.weapon == Weapons.Erase) {
                    Sprites.drawSprite(player.x, player.y, SpriteIds.CATLOAF);
                } else {
                    Sprites.drawSprite(player.x, player.y, player.faceRight ? SpriteIds.CATLOAFRIGHT : SpriteIds.CATLOAFLEFT);
                }
            } else {
                Sprites.drawSprite(player.x, player.y, SpriteIds.CATLOAFDEAD);
            }
        } else {
            if(player.life > 0) {
                Sprites.drawSprite(player.x, player.y, SpriteIds.CATLOAFDARK);
            } else {
                Sprites.drawSprite(player.x, player.y, SpriteIds.CATLOAFDEAD);
            }
        }
        if(player.weapon == Weapons.Sword && player.selectedItem > 0)
        {
            var selected = player.selectedItem;
            var offset = (selected == SpriteIds.BOMB) ? 0 : 1;
            Sprites.drawSprite(player.x+(player.faceRight ? 1 : -1), player.y, selected, null, (player.faceLeft ? SpriteFlags.Flip : 0) | SpriteFlags.AnchorBottom | SpriteFlags.AnchorLeft);
        }
        if(player.weapon == Weapons.Erase)
        {
            var mapX = (player.x + player.gridX);
            var mapY = (player.y + player.gridY);
            Sprites.drawSprite(player.x+(player.faceRight ? 1 : -1), player.y, Map.get(mapX+(player.faceRight ? 1 : -1), mapY));
        }
    }
}

function STATE_Intro() {}
STATE_Intro.prototype.go = function(keyCode, isRepeat, initialize)
{
    if(initialize)
    {
        this.step = 0;
        this.timeouts = [];
    }
    
    switch(this.step)
    {
        case 0:
            GFX.cls();
            
            Sprites.drawSpriteXY(18, 6, SpriteIds.VILLAGER);
            GFX.writeText("STRESSED VILLAGER", 3, 14);
            Sound.playSound(Sounds.Meatloaf);
            
            setTimeout(function(self){ if(self.step < 2) self.step = 2; }, 1500, this);
            
            this.step += 1
            return GameStates.NoChange;
            break;
       case 1:
            // wait for timeout or keypress
            break;
       case 2:
            Sprites.drawSpriteXY(18, 6, SpriteIds.VILLAGER+1);
            GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText("CATLOAF!", 14, 15, true);
            Sound.playSound(Sounds.Meatloaf);
            this.step += 1
            return GameStates.NoChange;
            break;
       case 3:
            // wait for keypress
            break;
       case 4:
            Sprites.drawSpriteXY(18, 6, SpriteIds.VILLAGER+1);
            GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText("Please help us!", 14, 15, true);
            Sound.playSound(Sounds.Meatloaf);
            this.step += 1
            return GameStates.NoChange;
            break;
       case 5:
            // wait for keypress
            break;
       case 6:
            Sprites.drawSpriteXY(18, 6, SpriteIds.VILLAGER+2);
            GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText("Spiders have attacked our village.", 14, 15, true);
            Sound.playSound(Sounds.Meatloaf);
            this.step += 1
            return GameStates.NoChange;
            break;
       case 7:
            // wait for keypress
            break;
       case 8:
            Sprites.drawSpriteXY(18, 6, SpriteIds.VILLAGER+1);
            GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText("People are missing!", 14, 15, true);
            Sound.playSound(Sounds.Meatloaf);
            this.step += 1
            return GameStates.NoChange;
            break;
       case 9:
            // wait for keypress
            break;
        case 10:
            Sprites.drawSpriteXY(18, 6, SpriteIds.VILLAGER+2, null, SpriteFlags.Flip);
            GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText("We fear the worst.", 14, 15, true);
            Sound.playSound(Sounds.Meatloaf);
            this.step += 1
            return GameStates.NoChange;
            break;
       case 11:
            // wait for keypress
            break;
       case 12:
            Sprites.drawSpriteXY(18, 6, SpriteIds.VILLAGER+1);
            GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText("You may be our only hope.", 14, 15, true);
            Sound.playSound(Sounds.Meatloaf);
            this.step += 1
            return GameStates.NoChange;
            break;
       case 13:
            // wait for keypress
            break;
       case 14:
            GFX.cls();
            Sound.playSound(Sounds.Meatloaf);
            this.timeouts.push(setTimeout(function(){
                    Sound.playSound(Sounds.Enter);
                }, 1000));
            this.timeouts.push(setTimeout(function(){
                GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText("Entering the village...", 10, 15);
            }, 2000));
            this.timeouts.push(setTimeout(function(){
                GFX.cls();
            }, 5500));
            this.timeouts.push(setTimeout(function(self){
                self.step += 1;
            }, 6000, this));
            this.step += 1;
            return GameStates.NoChange;
            break;
        case 15:
            // wait for timeout
            if(keyCode && !isRepeat) {
                for(var i = 0; i < this.timeouts.length; i++) {
                    clearTimeout(this.timeouts[i]);
                }
                this.step += 1;
            }
            return GameStates.NoChange;
            break;
        case 16:
            this.step = 0;
            return GameStates.Next;
            break;
    }
    if(keyCode && !isRepeat)
    {
        this.step += 1;
    }
    return GameStates.NoChange;
}

function STATE_Rescued() {}
STATE_Rescued.prototype.go = function(keyCode, isRepeat, initialize)
{
    var self = STATE_Rescued;
    if(initialize)
    {
        this.step = 0;
    }
    
    switch(this.step)
    {
        case 0:
            GFX.cls();
            
            Sprites.drawSpriteXY(18, 6, SpriteIds.CAPTIVE);
            GFX.writeText("RESCUED VILLAGER", 3, 14);
            Sound.playSound(Sounds.Title);
            
            //setTimeout(function(self){ if(this.step < 2) this.step = 2; }, 1500, self);
            
            this.step += 1
            return GameStates.NoChange;
            break;
       case 1:
            // wait for timeout or keypress
            break;
       case 2:
            Sprites.drawSpriteXY(18, 6, SpriteIds.CAPTIVERESCUED);
            var responses = [
                "CATLOAF SAVES!",
                "THANK YOU CATLOAF!",
                "WE ARE MEOWS FOR LIFE!"
            ];
            var response = responses[parseInt(Math.random()*responses.length)];
            GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText(response, 14, 15, true);
            Sound.playSound(Sounds.Bonus);
            Sound.playSound(Sounds.Start);
            this.step += 1
            return GameStates.NoChange;
            break;
        case 3:
            // wait for timeout or keypress
            break;
        case 4:
            var captives = Game.getVar(GameVars.CAPTIVES);
            GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText("Remaining: "+captives.toString(), 14, 15, true);
            Sound.playSound(Sounds.Meatloaf);
            this.step += 1;
            return GameStates.NoChange;
            break;
        case 5:
            // wait for keypress
            break;
        case 6:
            this.step = 0;
            Sound.playSound(Sounds.Meatloaf);
            return GameStates.Previous;
            break;
    }
    if(keyCode && !isRepeat)
    {
        this.step += 1;
    }
    return GameStates.NoChange;
}

function STATE_TreasureChest() {}
STATE_TreasureChest.prototype.go = function(keyCode, isRepeat, initialize)
{
    if(initialize)
    {
        this.step = 0;
    }
    
    var buried = Map.getBuried(Game.getTargetX(), Game.getTargetY());
    var names = {};
    names[SpriteIds.GOLDBAR] = "100 GOLD!";
    names[SpriteIds.CRANKUP] = "CRANK!";
    names[SpriteIds.GATEKEY] = "GATE KEY!";
    names[SpriteIds.ENCHANTEDSWORD] = "ENCHANTED SWORD!";
    
    switch(this.step)
    {
        case 0:
            GFX.cls();
            
            Sprites.drawSpriteXY(18, 8, SpriteIds.TREASURECHEST);
            GFX.writeText("TREASURE CHEST", 3, 14);
            Sound.playSound(Sounds.Meatloaf);
            
            setTimeout(function(self){ if(self.step < 2) self.step = 2; }, 2000, this);
            
            this.step += 1;
            return GameStates.NoChange;
            break;
       case 1:
            // wait for timeout or keypress
            break;
       case 2:
            Sprites.drawSpriteXY(18, 4, SpriteIds.OPENCHEST1);
            Sprites.drawSpriteXY(18, 9, SpriteIds.OPENCHEST2);
            Sprites.drawSpriteXY(18, 6, buried, null, SpriteFlags.Trans);
            if(typeof(names[buried]) !== "undefined")
            {
                GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText(names[buried], 15, 15, true);
            }
            Sound.playSound(Sounds.Bonus);
            Sound.playSound(Sounds.Start);
            setTimeout(function(self){ if(self.step < 4) self.step = 4; }, 5000, this);
            this.step += 1
            return GameStates.NoChange;
            break;
       case 3:
            // wait for keypress
            break;
       case 4:
            if(buried == SpriteIds.GOLDBAR)
            {
                this.count = Game.player.getItemQty(SpriteIds.GOLD);
                this.stopCount = this.count+100;
                GFX.writeText("   "+this.count+" PCS   ", 15, 15, true);
                this.interval = setInterval(function(self)
                {
                    self.count += 1;
                    GFX.writeText("   "+self.count+" PCS   ", 15, 15, true);
                    Sound.playSound(Sounds.Point);
                    if(self.count >= self.stopCount)
                    {
                        clearInterval(self.interval);
                        Sound.playSound(Sounds.Bonus);
                        Sound.playSound(Sounds.Title);
                        setTimeout(function(self){ if(self.step < 6) self.step = 6; }, 5000, self);
                    }
                },30,this);
            }
            else
            {
                GFX.writeText("Added to inventory!", 15, 15, true);
                Game.player.addItem(buried);
            }
            Sound.playSound(Sounds.Meatloaf);
            this.step += 1
            return GameStates.NoChange;
            break;
        case 5:
            // wait for keypress
            if((this.count < this.stopCount) && keyCode && !isRepeat)
            {
                clearInterval(this.interval);
                var gold = Game.player.getItemQty(SpriteIds.GOLD)+100;
                GFX.writeText("   "+gold+" PCS   ", 15, 15, true);
                Sound.playSound(Sounds.Bonus);
                Sound.playSound(Sounds.Title);
                this.step += 1;
                return GameStates.NoChange;
            }
            break;
        case 6:
            this.step = 0;
            Game.player.addItem(SpriteIds.GOLD, 100);
            Sound.playSound(Sounds.Meatloaf);
            return GameStates.Previous;
            break;
    }
    if(keyCode && !isRepeat)
    {
        this.step += 1;
    }
    return GameStates.NoChange;
}

function MAIN(keyCode, isRepeat)
{
    var self = MAIN;
    
    if(typeof(self.instances) === "undefined")
    {
        self.sequence = [
            GameStates.MainMenu,
            GameStates.Intro,
            GameStates.Init,
            GameStates.PlayGame,
            GameStates.EndGame,
            GameStates.GameOver
        ];
        
        self.functions = {};
        self.functions[GameStates.MainMenu   ] = STATE_MainMenu;
        self.functions[GameStates.Intro      ] = STATE_Intro;
        self.functions[GameStates.Init       ] = STATE_InitGame;
        self.functions[GameStates.PlayGame   ] = STATE_PlayGame;
        self.functions[GameStates.InInventory] = STATE_ShowInventory;
        self.functions[GameStates.InHelp     ] = STATE_ShowHelp;
        self.functions[GameStates.InAbout    ] = STATE_ShowAbout;
        self.functions[GameStates.QuitYesNo  ] = STATE_QuitYesNo;
        self.functions[GameStates.EndGame    ] = STATE_EndGame;
        self.functions[GameStates.Dead       ] = STATE_Dead;
        self.functions[GameStates.GameOver   ] = STATE_GameOver;
        self.functions[GameStates.Rescued    ] = STATE_Rescued;
        self.functions[GameStates.Treasure   ] = STATE_TreasureChest;
        self.functions[GameStates.Blacksmith ] = STATE_Blacksmith;
        self.functions[GameStates.ConfirmBuy ] = STATE_ConfirmPurchase;
        self.functions[GameStates.ViewItem   ] = STATE_ViewItem;
        self.functions[GameStates.Crank      ] = STATE_Crank;
        
        self.instances = [];
        
        self.stateChanged = true;
        self.waitForKeyboardRelease = true;
        
        self.stack = [];
        self.sp = 0;
        self.stack[self.sp] = Game.state;
    }
    
    if(self.waitForKeyboardRelease)
    {
        if(keyCode && !isRepeat)
        {
            self.waitForKeyboardRelease = false;
        }
        else
        {
            keyCode = 0;
        }
    }
    
    var initialize = self.stateChanged;
    var nextState = Game.state;
    
    if(typeof(self.instances[Game.state]) === "undefined")
    {
        var state = self.functions[Game.state];
        self.instances[Game.state] = new state();
    }
    
    var instance = self.instances[Game.state];
    nextState    = instance.go(keyCode, isRepeat, initialize);
    
    switch(nextState)
    {
        case GameStates.NoChange:
            nextState = Game.state;
            break;
        case GameStates.Next:
            for(var i = 0; i < self.sequence.length; i++)
            {
                if(self.sequence[i] == Game.state)
                {
                    nextState = self.sequence[i+1];
                    self.stack[self.sp] = nextState;
                    break;
                }
            }
            break;
        case GameStates.Previous:
            self.sp -= 1;
            break;
        case GameStates.Reset:
            nextState = self.sequence[0];
            self.sp = 0;
            self.stack[self.sp] = nextState;
            break;
        default:
            if(nextState != Game.state)
            {
                self.sp += 1;
                self.stack[self.sp] = nextState;
            }
            break;
    }
    if(nextState != Game.state)
    {
        self.stateChanged = true;
        self.waitForKeyboardRelease = true;
    }
    else
    {
        self.stateChanged = false;
    }
    Game.state = self.stack[self.sp];
}

function STATE_InitGame() {}
STATE_InitGame.prototype.go = function(keyCode)
{
    DATA_LoadMap();
    Sound.playSound(Sounds.Respawn);
    Game.startTimer();
    return GameStates.Next;
}

function STATE_Crank() {}
STATE_Crank.prototype.go = function(keyCode, isRepeat, initialize)
{
    var crankDown = false;
    var crankUp   = false;
    if(keyCode == KeyCodes.down  || keyCode == KeyCodes.K     ) { crankDown = true; }
    if(keyCode == KeyCodes.up    || keyCode == KeyCodes.I     ) { crankUp   = true; }
    if(keyCode == KeyCodes.S || keyCode == KeyCodes.ESC)
    {
        PLAYER_PutItemAway();
        return GameStates.Previous;
    }
    
    var player = Game.player;
    if(crankDown)
    {
        if(Map.shiftDoor(SpriteIds.LOGRIGHT,  1,  0))
        {
            Sound.playSound(Sounds.PushWall);
            player.selectedItem = (player.selectedItem == SpriteIds.CRANKUP) ? SpriteIds.CRANKDOWN : SpriteIds.CRANKUP;
        }
        else
        {
            Sound.playSound(Sounds.Ignite);
            player.selectedItem = (player.selectedItem == SpriteIds.CRANKUP) ? SpriteIds.CRANKTRY : SpriteIds.CRANKUP;
        }
    }
    if(crankUp)
    {
        if(Map.shiftDoor(SpriteIds.LOGRIGHT, -1,  0))
        {
            Sound.playSound(Sounds.PushWall);
            player.selectedItem = (player.selectedItem == SpriteIds.CRANKUP) ? SpriteIds.CRANKDOWN : SpriteIds.CRANKUP;
        }
        else
        {
            Sound.playSound(Sounds.Ignite);
            player.selectedItem = (player.selectedItem == SpriteIds.CRANKUP) ? SpriteIds.CRANKTRY : SpriteIds.CRANKUP;
        }
    }
    
    PLAYER_Draw_Crank();
    
    return GameStates.NoChange;
}

function STATE_PlayGame() {}
STATE_PlayGame.prototype.go = function(keyCode, isRepeat, initialize)
{
    var player = Game.player;
    
    if(initialize)
    {
        Map.draw();
        PLAYER_Draw(true);
        this.holdTimer = 0;
    }
    
    PLAYER_Draw();
    player.hasMoved = false;
    
    var nextState = null;
    
    if(keyCode == KeyCodes.right || keyCode == KeyCodes.L     ) { nextState = PLAYER_Move( 1,  0); }
    if(keyCode == KeyCodes.left  || keyCode == KeyCodes.J     ) { nextState = PLAYER_Move(-1,  0); }
    if(keyCode == KeyCodes.down  || keyCode == KeyCodes.K     ) { nextState = PLAYER_Move( 0,  1); }
    if(keyCode == KeyCodes.up    || keyCode == KeyCodes.I     ) { nextState = PLAYER_Move( 0, -1); }
    if(keyCode == KeyCodes.space || keyCode == KeyCodes.tab   ) { nextState = GameStates.InInventory; }
    if(keyCode == KeyCodes.H                                  ) { nextState = GameStates.InHelp; }
    if(keyCode == KeyCodes.Q     || keyCode == KeyCodes.escape) { nextState = GameStates.QuitYesNo; }
    if(keyCode == KeyCodes.F1 && !isRepeat)
    {
        GFX.export();
    }
    if(keyCode == KeyCodes.S && !isRepeat)
    {
        if(player.weapon == Weapons.None)
        {
            var mapX = (player.x + player.gridX) + (player.faceRight ? 1 : -1);
            var mapY = (player.y + player.gridY)
            if(Map.isPassable(mapX, mapY) || Map.isKillable(mapX, mapY))
            {
                player.weapon = Weapons.Sword;
                PLAYER_Draw(true);
                Sound.playSound(Sounds.Respawn);
                if(Map.isKillable(mapX, mapY))
                {
                    PLAYER_Move(0, 0); // this is where MAP_TryKill() is called
                }
            }
            else
            {
                mapX = (player.x + player.gridX) + (player.faceRight ? -1 : 1);
                if(Map.isPassable(mapX, mapY))
                {
                    player.x += (player.faceRight ? -1 : 1);
                    player.weapon = Weapons.Sword;
                    PLAYER_Draw(true);
                    Sound.playSound(Sounds.Respawn);
                }
                else
                {
                    Sound.playSound(Sounds.Blocked);
                }
            }
        }
        else
        {
            switch(player.selectedItem)
            {
                case SpriteIds.BOMB:
                break;
                case SpriteIds.MEDIUMDIRT:
                case SpriteIds.HEAVYDIRT:
                    var mapX = (player.x + player.gridX) + (player.faceRight ? 1 : -1);
                    var mapY = (player.y + player.gridY)
                    Map.set(mapX, mapY, player.selectedItem);
                    PLAYER_PutItemAway();
                    MAP_Draw(mapX, mapY, player.selectedItem);
                    player.selectedItem = SpriteIds.SHOVEL;  // TODO -- check for broken shovel?
                    Sound.playSound(Sounds.Respawn);
                break;
                default:
                    PLAYER_PutItemAway();
                    Sound.playSound(Sounds.Respawn);
                break;
            }
            this.holdTimer = 1;
        }
    }
    else if(keyCode == KeyCodes.S && isRepeat)
    {
        this.holdTimer += 1;
        if(this.holdTimer == 10 && player.selectedItem == SpriteIds.BOMB)
        {
            var mapX = (player.x + player.gridX) + (player.faceRight ? 1 : -1);
            var mapY = (player.y + player.gridY)
            var bomb = new Bomb(
                mapX,
                mapY,
                player.location,
                MAP_Draw,
                Map.restore,
                Map.isPassable
            );
            Map.addGlobalMob(bomb);
            PLAYER_PutItemAway();
            player.addItem(SpriteIds.BOMB, -1);
            Sound.playSound(Sounds.Ignite);
        }
    }
    else if(Game.getKeyUp() == KeyCodes.S && this.holdTimer)
    {
        if(player.weapon != Weapons.None && player.selectedItem == SpriteIds.BOMB)
        {
            PLAYER_PutItemAway();
            Sound.playSound(Sounds.Respawn);
        }
        this.holdTimer = 0;
    }
    
    PLAYER_Draw();
    
    if(player.life <= 0)
    {
        nextState = GameStates.Dead;
        Sound.playSound(Sounds.Flash);
    }
    
    return (nextState === null) ? GameStates.NoChange : nextState;
}

function PLAYER_PutItemAway()
{
    var player = Game.player;
    if(player.selectedItem > 0)
    {
        player.weapon = Weapons.Erase;
        PLAYER_Draw(true);
    }
    player.weapon = Weapons.None;
}

function GFX_ColorText(string, y)
{
    var strings = string.split("\n");
    for(var i = 0; i < strings.length; i++)
    {
        var string = strings[i];
        var separator = string.indexOf(":");
        if(separator >= 0)
        {
            var color = parseInt(string.substr(0, separator));
            string = string.substr(separator+1, string.length-separator);
        }
        else
        {
            var color = 15;
        }
        GFX.writeText(string, y+i, color);
    }
}

function STATE_Dead() {}
STATE_Dead.prototype.go = function(keyCode, isRepeat, initialize)
{
    var player = Game.player;
    
    if(initialize)
    {
        STATE_Dead.step = 0;
        STATE_Dead.nextState = GameStates.NoChange;
        Map.killMobs();
        PLAYER_Draw(true);
    }
    
    switch(STATE_Dead.step)
    {
        case 0:
            player.lives -= 1;
            STATE_Dead.step += 1;
            return GameStates.NoChange;
            break;
        case 1:
            
            var delay = 300;
            var interval = 33;
            
            setTimeout(function(){
                // give the player a chance to see the map
                // again if in the dark
                if(Game.player.dark == 1)
                {
                    Game.player.dark = 0
                    Map.draw();
                    PLAYER_Draw(true);
                    Game.player.dark = 1
                }
            }, delay);
            
            delay = Game.flash ? (FLASH(300) + 500) : 1500;
            setTimeout(function(self){ self.step += 1 }, delay, STATE_Dead);
            STATE_Dead.step += 1;
            return GameStates.NoChange;
            break;
        case 2:
            // wait for timeout to increment STATE_Dead.step
            return GameStates.NoChange;
            break;
        case 3:
            GFX.color(null, 4);
            GFX.writeText("[    YOU GOT PWNED!!!    ]", 4, 15);
            Sound.playSound(Sounds.Meatloaf);
            setTimeout(function(self){ self.step += 1 }, 300, STATE_Dead);
            STATE_Dead.step += 1;
            return GameStates.NoChange;
            break;
        case 4:
            // wait for timeout
            return GameStates.NoChange;
            break;
        case 5:
            // wait for keypress
            break;
        case 6:
            GFX.color(null, 1);
            GFX.writeText("[        LIVES: " + player.lives.toString() + "        ]", 4, 15);
            GFX.color(null, 0);
            Sound.playSound(Sounds.Meatloaf);
            setTimeout(function(self){ self.step += 1 }, 300, STATE_Dead);
            STATE_Dead.step += 1;
            return GameStates.NoChange;
            break;
        case 7:
            // wait for timeout
            return GameStates.NoChange;
            break;
        case 8:
            // wait for keypress
            break;
        case 9:
            if(player.lives <= 0)
            {
                GFX.cls();
                Sound.playSound(Sounds.Meatloaf);
                setTimeout(function(self){
                    self.nextState = GameStates.GameOver;
                }, 1000, STATE_Dead);
                STATE_Dead.step += 1;
                return GameStates.NoChange;
            }
            else
            {
                Sound.playSound(Sounds.Respawn);
                PLAYER_Respawn();
                return GameStates.PlayGame;
            }
            break;
        case 10:
            // wait for timeout
            return STATE_Dead.nextState;
            break;
    }
    if(keyCode && !isRepeat)
    {
        STATE_Dead.step += 1;
    }
    return STATE_Dead.nextState;
}

/**
 * @param int sprite
 * @param int mapX
 * @param int mapY
 */
function PLAYER_Touch(spriteId, mapX, mapY)
{
    var nextState = GameStates.NoChange;
    var player = Game.player;
    if(spriteId == SpriteIds.EMPTYSPACE)
    {
        return;
    }
    switch(spriteId)
    {
        case SpriteIds.TRAP:
            player.life = 0;
            break;
        case SpriteIds.SPIDER:
            player.life = 0;
            break;
        case SpriteIds.CAVESOUND:
            Sound.playSound(Sounds.EnterCave);
            break;
        case SpriteIds.GOLD:
            player.addItem(spriteId, 10);
            Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
            Sound.playSound(Sounds.PickupKey);
            break;
        case SpriteIds.TREASURECHEST:
            nextState = GameStates.Treasure;
            Map.set(mapX, mapY, SpriteIds.OPENCHEST);
            Game.setTargetXY(mapX, mapY);
            break;
        case SpriteIds.BLACKSMITH:
            nextState = GameStates.Blacksmith;
            break;
        case SpriteIds.NORTHCAVESIGN:
            nextState = GameStates.ViewItem;
            Game.itemToView = {
                id: SpriteIds.NORTHCAVESIGN,
                name: "15:SIGN READS",
                description: "7:Northern Caverns"
            };
            Sound.playSound(Sounds.Mystery);
            break;
        case SpriteIds.SOUTHCAVESIGN:
            nextState = GameStates.ViewItem;
            Game.itemToView = {
                id: SpriteIds.SOUTHCAVESIGN,
                name: "15:SIGN READS",
                description: "7:Southern Caverns"
            };
            Sound.playSound(Sounds.Mystery);
            break;
        case SpriteIds.FORESTSIGN:
            nextState = GameStates.ViewItem;
            Game.itemToView = {
                id: SpriteIds.FORESTSIGN,
                name: "15:SIGN READS",
                description: "7:Haunted Forest"
            };
            Sound.playSound(Sounds.Mystery);
            break;
        case SpriteIds.STONEWALLSIGN:
            nextState = GameStates.ViewItem;
            Game.itemToView = {
                id: SpriteIds.STONEWALLSIGN,
                name: "15:SIGN READS",
                description: "7:Graveyard"
            };
            Sound.playSound(Sounds.Mystery);
            break;
        case SpriteIds.LOGFRAME1:
            nextState = GameStates.ViewItem;
            Game.itemToView = {
                id: SpriteIds.SIR1,
                name: "15:Sir Fry Dinbutter",
                description: "7:1825 - 1843\n\n11:DIED OF GLUTTONY"
            };
            Sound.playSound(Sounds.Mystery);
            break;
        case SpriteIds.LOGFRAME2:
            nextState = GameStates.ViewItem;
            Game.itemToView = {
                id: SpriteIds.SIR2,
                name: "15:Sir Han Gryloaf",
                description: "7:1811 - 1837\n\n11:DIED HUNGRY AND ANGRY"
            };
            Sound.playSound(Sounds.Mystery);
            break;
        case SpriteIds.LOGFRAME3:
            nextState = GameStates.ViewItem;
            Game.itemToView = {
                id: SpriteIds.SIR3,
                name: "15:Sir Oat Reagan",
                description: "7:1799 - 1821\n\n11:DIED OF DYSENTERY"
            };
            Sound.playSound(Sounds.Mystery);
            break;
        case SpriteIds.LIBRARY:
            nextState = GameStates.ViewItem;
            //var title = "15:Sir Fry's Journal";
            //var desc = "7:I experienced the most exquisite  \n";
            //desc +=    "7:fried butter with samon the other \n";
            //desc +=    "7:day. Oh joy! Delicious it was!    \n";
            //desc +=    "7:This is one for the books.        \n";
            //desc +=    "7:\n";
            //desc +=    "7:I shall add it to the recipe list.";
            //var title = "15:Chart of Birthstone Years";
            ////var desc = "7:0 - Amethyst      5 - Ruby      \n";
            //desc +=    "7:1 - Topaz         6 - Emerald   \n";
            //desc +=    "7:2 - Sapphire      7 - Aquamarine\n";
            //desc +=    "7:3 - Moonstone     8 - Bloodstone\n";
            //desc +=    "7:4 - Turquoise     9 - Onyx      \n";
            //desc +=    "\n";
            //desc +=    "9:Repeats every 10 years"; // 5, 1, 9
            var title = "15:Sir Fry's Journal";
            var desc = "7:A strange presense hovers over the\n";
            desc +=    "7:town. I often feel scared,        \n";
            desc +=    "7:especially at night. I feel like  \n";
            desc +=    "7:something awful is watching me    \n";
            desc +=    "7:from the woods, the pitch black   \n";
            desc +=    "7:darkness between the trees.       ";
            //var title = "15:Sir Fry's Journal";
            //var desc = "7:I don't feel safe. At any moment, \n";
            //desc +=    "7:that presence can leap beyond the \n";
            //desc +=    "7:woods and encroach into my house, \n";
            //desc +=    "7:and possibly into my room as I lay\n";
            //desc +=    "7:asleep. I must secure my home!    \n";
            //var title = "15:Sir Fry's Journal";
            //var desc = "7:It's not enough to hide away in my\n";
            //desc +=    "7:house as the months go by. I must \n";
            //desc +=    "7:confront my fear. I will head out \n";
            //desc +=    "7:and find the source of this evil, \n";
            //desc +=    "7:and stab at the heart of it with  \n";
            //desc +=    "7:my sword!                         \n";
            Game.itemToView = {
                id: SpriteIds.LIBRARY,
                name: title,
                description: desc
            };
            Sound.playSound(Sounds.Mystery);
            break;
        case SpriteIds.BEAMTRAPON:
            if(Map.showDoor(SpriteIds.LOG))
            {
                Sound.playSound(Sounds.LightSwitch);
            }
            break;
        case SpriteIds.BEAMTRAPOFF:
            if(Map.hideDoor(SpriteIds.LOG))
            {
                Sound.playSound(Sounds.LightSwitch);
            }
            break;
        case SpriteIds.BEAMTRIGGER:
            var gunX  = Game.getVar(GameVars.BEAMGUNX);
            var beamY = Game.getVar(GameVars.BEAMGUNY);
            var onsprites = [];
            var offsprites = [];
            onsprites.push({x: gunX-player.gridX, y: beamY-player.gridY, sprite: SpriteIds.BEAMGUNACTIVATED});
            offsprites.push({x: gunX-player.gridX, y: beamY-player.gridY, sprite: SpriteIds.BEAMGUN});
            for(var beamX = gunX-1; beamX > gunX-9; beamX--)
            {
                if(Map.get(beamX, beamY) == SpriteIds.BOMB)
                {
                    Map.killMobAt(beamX, beamY);
                    onsprites.push({x: beamX-player.gridX, y: beamY-player.gridY, sprite: SpriteIds.BEAM});
                    offsprites.push({x: beamX-player.gridX, y: beamY-player.gridY, sprite: SpriteIds.EMPTYSPACE});
                }
                else if(Map.isPassable(beamX, beamY))
                {
                    if(beamX == mapX && beamY == mapY)
                    {
                        player.life = 0;
                        Game.flash = false;
                        Map.hideDoor(SpriteIds.LOG, false);
                        //player.weapon = Weapons.None;
                        onsprites.push({x: beamX-player.gridX, y: beamY-player.gridY, sprite: SpriteIds.CATLOAFDEADFLASH});
                        offsprites.push({x: beamX-player.gridX, y: beamY-player.gridY, sprite: SpriteIds.CATLOAFDEAD});
                        break;
                    }
                    if(player.weapon == Weapons.Sword && player.selectedItem == SpriteIds.SWORD)
                    {
                        var swordX = mapX + (player.faceRight ? 1 : -1);
                        if(beamX == swordX && beamY == mapY)
                        {
                            player.setItemQty(SpriteIds.SWORDHP, 0);
                            Sound.playSound(Sounds.Meatloaf);
                            break;
                        }
                    }
                    onsprites.push({x: beamX-player.gridX, y: beamY-player.gridY, sprite: SpriteIds.BEAM});
                    offsprites.push({x: beamX-player.gridX, y: beamY-player.gridY, sprite: SpriteIds.EMPTYSPACE});
                }
                else
                {
                    break;
                }
            }
            if(player.life > 0)
            {
                Sound.playSound(Sounds.Flash);
            }
            for(var i = 0; i < onsprites.length; i++)
            {
                var sprite = onsprites[i];
                Sprites.drawSprite(sprite.x, sprite.y, sprite.sprite);
            }
            var self = PLAYER_Move;
            self.intervalCount = 0;
            self.intervalId = setInterval(function(onsprites, offsprites, self)
            {
                var sprites = (self.intervalCount & 1) ? offsprites : onsprites;
                for(var i = 0; i < sprites.length; i++)
                {
                    var sprite = sprites[i];
                    Sprites.drawSprite(sprite.x, sprite.y, sprite.sprite);
                }
                self.intervalCount += 1;
                if(self.intervalCount >= 30)
                {
                    clearInterval(self.intervalId);
                }
            }, 40, onsprites, offsprites, self);
            break;
        case SpriteIds.KEYGOLD:
            player.addItem(spriteId);
            Sound.playSound(Sounds.PickupKey);
            Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
            break;
        case SpriteIds.KEYSILVER:
            player.addItem(spriteId);
            Sound.playSound(Sounds.PickupKey);
            break;
        case SpriteIds.BRONZEKEY:
            player.addItem(spriteId);
            Sound.playSound(Sounds.PickupKey);
            Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
            break;
        case SpriteIds.GATEKEY:
            player.addItem(spriteId);
            Sound.playSound(Sounds.PickupKey);
            Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
            break;
        case SpriteIds.KEYSTONE:
            player.addItem(spriteId);
            Sound.playSound(Sounds.PickupKey);
            break;
        case SpriteIds.DOORGOLD:
            if(player.hasItem(SpriteIds.KEYGOLD)) {
                Map.setPassable(mapX, mapY);
                Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
                Sound.playSound(Sounds.Unlock);
            } else {
                Sound.playSound(Sounds.DoorBlocked);
            }
            break;
        case SpriteIds.DOORSILVER:
            if(player.hasItem(SpriteIds.KEYSILVER)) {
                Map.setPassable(mapX, mapY);
                Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
                Sound.playSound(Sounds.Unlock);
            } else {
                Sound.playSound(Sounds.DoorBlocked);
            }
            break;
        case SpriteIds.BRONZEDOOR:
            if(player.hasItem(SpriteIds.BRONZEKEY)) {
                Map.setPassable(mapX, mapY);
                Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
                Sound.playSound(Sounds.Unlock);
            } else {
                Sound.playSound(Sounds.DoorBlocked);
            }
            break;
        case SpriteIds.GATEDOOR:
            if(player.hasItem(SpriteIds.GATEKEY)) {
                Map.setPassable(mapX, mapY);
                Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
                Sound.playSound(Sounds.Unlock);
            } else {
                Sound.playSound(Sounds.DoorBlocked);
            }
            break;
        case SpriteIds.DOORSTONE:
            if(player.hasItem(SpriteIds.KEYSTONE)) {
                Map.setPassable(mapX, mapY);
                Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
                Sound.playSound(Sounds.Unlock);
            } else {
                Sound.playSound(Sounds.DoorBlocked);
            }
            break;
        //case SpriteIds.CHICKEN:
        //    if(Map.isPassable(pushX, pushY))
        //    {
        //        Map.set(pushX, pushY, spriteId);
        //        Sprites.drawSprite(drawPushX, drawPushY, spriteId);
        //        Sound.playSound(Sounds.Chirp);
        //    }
        //    else
        //    {
        //        Map.set(lastX, lastY, spriteId);
        //        Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
        //        Sprites.drawSprite(drawLastX, drawLastY, spriteId);
        //        Sprites.drawSprite(drawMapX, drawMapY, SpriteIds.CATLOAF);
        //        Sound.playSound(Sounds.Chirp);
        //    }
        //    break;
        case SpriteIds.PUSHSTOP:
            break;
        case SpriteIds.LIGHTLEFT:
        case SpriteIds.LIGHTRIGHT:
        case SpriteIds.LIGHTCENTER:
        case SpriteIds.LIGHTLEFT2:
        case SpriteIds.LIGHTRIGHT2:
        case SpriteIds.LIGHTCENTER2:
        case SpriteIds.LIGHTCENTER3:
            break;
        case SpriteIds.RUBY:
        case SpriteIds.AMETHYST:
        case SpriteIds.TOPAZ:
        case SpriteIds.SAPPHIRE:
        case SpriteIds.EMERALD:
            if(Map.isDiggable(mapX, mapY) && player.selectedItem == SpriteIds.SHOVEL)
            {
                player.selectedItem = Map.getBuried(mapX, mapY);
                Map.setBuried(mapX, mapY, 0);
                PLAYER_Draw(true);
            }
            player.addItem(spriteId);
            Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
            Sound.playSound(Sounds.Bonus);
            break;
        case SpriteIds.ENDLEVEL:
            nextState = GameStates.Next;
            break;
        case SpriteIds.LIGHTOFF:
            player.dark = 1
            GFX.cls();
            Sound.playSound(Sounds.LightSwitch);
            break;
        case SpriteIds.LIGHTON:
            player.dark = 0;
            break;
        case SpriteIds.CAPTIVE:
            nextState = GameStates.Rescued;
            Map.set(mapX, mapY, SpriteIds.EMPTYSPACE);
            Map.setPassable(mapX, mapY);
            Game.setVar(GameVars.CAPTIVES, Game.getVar(GameVars.CAPTIVES) - 1);
            break;
        case SpriteIds.PICTURESWITCHOFF:
            Map.set(mapX, mapY, SpriteIds.PICTURESWITCHON);
            MAP_Draw(mapX, mapY, SpriteIds.PICTURESWITCHON);
            Map.toggleDoor(SpriteIds.LOGFRAME1);
            Map.toggleDoor(SpriteIds.LOGFRAME2);
            Map.toggleDoor(SpriteIds.LOGFRAME3);
            Sound.playSound(Sounds.LightSwitch);
            break;
        case SpriteIds.PICTURESWITCHON:
            Map.set(mapX, mapY, SpriteIds.PICTURESWITCHOFF);
            MAP_Draw(mapX, mapY, SpriteIds.PICTURESWITCHOFF);
            Map.toggleDoor(SpriteIds.LOGFRAME1);
            Map.toggleDoor(SpriteIds.LOGFRAME2);
            Map.toggleDoor(SpriteIds.LOGFRAME3);
            Sound.playSound(Sounds.LightSwitch);
            break;
        case SpriteIds.BEHINDPICTURE:
            var buried = Map.getBuried(mapX, mapY);
            if(buried)
            {
                Map.set(mapX, mapY, buried);
                PLAYER_Touch(buried, mapX, mapY);
                buried = Map.get(mapX, mapY);
                Map.setBuried(mapX, mapY, buried);
                Map.set(mapX, mapY, spriteId);
                MAP_Draw(mapX, mapY, spriteId);
                if(buried)
                {
                    MAP_Draw(mapX, mapY, buried, null, SpriteFlags.Trans);
                }
            }
            break;
        case SpriteIds.VERTICALTOUCH:
            Map.showDoor(SpriteIds.VERTICALDOOR);
            Map.hideDoor(SpriteIds.HORIZONTALDOOR);
            break;
        case SpriteIds.HORIZONTALTOUCH:
            Map.showDoor(SpriteIds.HORIZONTALDOOR);
            Map.hideDoor(SpriteIds.VERTICALDOOR);
            break;
        case SpriteIds.TIMEDOORTRIGGER:
            if(Map.showDoor(SpriteIds.TIMEDOOR))
            {
                Sound.playSound(Sounds.Unlock);
                var data = {
                    count: 0,
                    intervalId: 0
                };
                data.intervalId = setInterval(function(data){
                    data.count += 1;
                    Sound.playSound(Sounds.Chop);
                    if(data.count >= 10)
                    {
                        clearInterval(data.intervalId);
                        Map.hideDoor(SpriteIds.TIMEDOOR);
                        Sound.playSound(Sounds.Unlock);
                    }
                }, 1000, data);
            }
            break;
        case SpriteIds.TIMEDOORDISABLE:
            Map.removeDoor(SpriteIds.TIMEDOOR);
            break;
        default:
            if(!Map.isPassable(mapX, mapY))
            {
                Sound.playSound(Sounds.Blocked);
            }
            break;
    }
    return nextState;
}

/**
 * @param int x
 * @param int y 
 */
function PLAYER_Move(x, y)
{
    PLAYER_Update();
    
    var nextState = null;
    
    var player = Game.player;
    
    var lastX = (player.x + player.gridX);
    var lastY = (player.y + player.gridY);
    var drawLastX = player.x;
    var drawLastY = player.y;
    
    var map = Game.map;
    
    var checks = [];
    checks.push([0, 0]);
    
    if(player.weapon != Weapons.None)
    {
        if(player.faceRight)
        {
            checks.push([ 1, 0]);
        }
        else
        {
            checks.push([-1, 0]);
        }
    }
    else
    {
        if(x != 0)
        {
            player.faceRight = (x == 1) ? true : false;
            player.faceLeft  = !player.faceRight;
        }
    }
    
    var clearToMove = Map.isPassable((player.x + player.gridX + x), (player.y + player.gridY + y));
    for(var i = 0; i < checks.length; i++)
    {
        var check = checks[i];
        
        var mapX      = (player.x + player.gridX + x) + check[0];
        var mapY      = (player.y + player.gridY + y) + check[1];
        var drawMapX  = (player.x + x) + check[0];
        var drawMapY  = (player.y + y) + check[1];
        var pushX     = mapX + x;
        var pushY     = mapY + y;
        var drawPushX = drawMapX + x;
        var drawPushY = drawMapY + y;
        
        var spriteId = Map.get(mapX, mapY);
        if(spriteId != SpriteIds.EMPTYSPACE)
        {
            var changeSpriteTo = 0;
            if(i == 0)
            {
                if(Map.isPushable(mapX, mapY))
                {
                    if(Map.get(pushX, pushY) == SpriteIds.PUSHSTOP)
                    {
                        clearToMove = false;
                        Sound.playSound(Sounds.Blocked);
                        spriteId = SpriteIds.EMPTYSPACE; // don't check again
                    }
                    else
                    {
                        var mob = Map.getMobAt(pushX, pushY);
                        if(mob !== null)
                        {
                            if(Map.isPassable(pushX+x, pushY+y))
                            {
                                mob.unplace();
                                mob.x += x;
                                mob.y += y;
                                mob.place();
                            }
                            else
                            {
                                MAP_TryKill(pushX, pushY);
                            }
                        }
                        switch(spriteId)
                        {
                            case SpriteIds.PUSH1:
                                if(Map.get(pushX, pushY) == SpriteIds.SOLVEWALL1)
                                {
                                    Game.setVar(GameVars.SOLVEDWALL1, true);
                                    Sound.playSound(Sounds.Meatloaf);
                                    if(Game.getVar(GameVars.SOLVEDWALL2) && Game.getVar(GameVars.SOLVEDWALL3))
                                    {
                                        Map.hideDoor(SpriteIds.NORTHCAVEDOOR);
                                        Sound.playSound(Sounds.Bonus);
                                    }
                                }
                                break;
                            case SpriteIds.PUSH2:
                                if(Map.get(pushX, pushY) == SpriteIds.SOLVEWALL2)
                                {
                                    Game.setVar(GameVars.SOLVEDWALL2, true);
                                    Sound.playSound(Sounds.Meatloaf);
                                    if(Game.getVar(GameVars.SOLVEDWALL1) && Game.getVar(GameVars.SOLVEDWALL3))
                                    {
                                        Map.hideDoor(SpriteIds.NORTHCAVEDOOR);
                                        Sound.playSound(Sounds.Bonus);
                                    }
                                }
                                break;
                            case SpriteIds.PUSH3:
                                if(Map.get(pushX, pushY) == SpriteIds.SOLVEWALL3)
                                {
                                    Game.setVar(GameVars.SOLVEDWALL3, true);
                                    Sound.playSound(Sounds.Meatloaf);
                                    if(Game.getVar(GameVars.SOLVEDWALL1) && Game.getVar(GameVars.SOLVEDWALL2))
                                    {
                                        Map.hideDoor(SpriteIds.NORTHCAVEDOOR);
                                        Sound.playSound(Sounds.Bonus);
                                    }
                                }
                                break;
                        }
                        clearToMove = true;
                        var pushed = Map.push(mapX, mapY, x, y);
                        drawPushX = (pushed.x - player.gridX);
                        drawPushY = (pushed.y - player.gridY);
                        Sprites.drawSprite(drawPushX, drawPushY, spriteId, Map.isMirror(pushed.x, pushed.y) ? 8 : null, Map.isFlip(pushed.x, pushed.y) ? SpriteFlags.Flip : null);
                        Sound.playSound(Sounds.PushWall);
                        changeSpriteTo = -1;
                        spriteId = Map.get(mapX, mapY);
                    }
                }
            }
        }
        if(spriteId != SpriteIds.EMPTYSPACE)
        {
            var changeSpriteTo = 0;
            if(i == 0)
            {
                nextState = PLAYER_Touch(spriteId, mapX, mapY);
                clearToMove = Map.isPassable(mapX, mapY);
            }
            else // if (i != 0)
            {
                var tookAction = false;
                switch(player.selectedItem)
                {
                    case SpriteIds.SWORD:
                        if(MAP_TryKill(mapX, mapY))
                        {
                            if(spriteId != SpriteIds.SPIDERWEB)
                            {
                                Game.player.addItem(SpriteIds.SWORDHP, -1);
                            }
                            tookAction = true;
                        }
                        break;
                    case SpriteIds.SWORDBROKEN:
                        if(spriteId == SpriteIds.SPIDERWEB)
                        {
                            MAP_TryKill(mapX, mapY);
                            tookAction = true;
                        }
                        break;
                    case SpriteIds.SHOVEL:
                        if((x == 1 && player.faceRight) || (x == -1 && player.faceLeft))
                        {
                            if(MAP_TryDig(mapX, mapY))
                            {
                                Game.player.addItem(SpriteIds.SHOVELHP, -1);
                                tookAction = true;
                                changeSpriteTo = -1;
                                //player.swapItem(SpriteIds.SHOVEL, SpriteIds.MEDIUMDIRT);
                                //PLAYER_PutItemAway();
                            }
                        }
                        break;
                    case SpriteIds.GOLD:
                        if(spriteId == SpriteIds.VILLAGER)
                        {
                            Map.put(mapX, mapY, SpriteIds.VILLAGERHAPPY);
                            Sound.playSound(Sounds.Bonus);
                            PLAYER_PutItemAway();
                            tookAction = true;
                        }
                    case SpriteIds.CRANKUP:
                        if(spriteId == SpriteIds.LOGLEFT)
                        {
                            nextState = GameStates.Crank;
                        }
                        break;
                    default:
                        switch(spriteId)
                        {
                            case SpriteIds.BEHINDPICTURE:
                                Map.setBuried(mapX, mapY, player.selectedItem);
                                Map.showBuried(mapX, mapY, true);
                                MAP_Draw(mapX, mapY, spriteId);
                                player.selectedItem = 0;
                                tookAction = true;
                            break;
                        }
                        break;
                }
                if(!tookAction)
                {
                    if(Map.isPassable(mapX, mapY))
                    {
                        spriteId = SpriteIds.EMPTYSPACE;
                    }
                    switch(spriteId)
                    {
                        case SpriteIds.EMPTYSPACE:
                        case SpriteIds.PUSHSTOP:
                            changeSpriteTo = -1;
                            break;
                        default:
                            if(clearToMove && x == 0) // put weapon away if moving up/down and only weapon blocks path
                            {
                                mapX = (player.x + player.gridX + x) + (player.faceRight ? -1 : 1);
                                if(Map.isPassable(mapX, mapY))
                                {
                                    player.x += (player.faceRight ? -1 : 1);
                                }
                                else
                                {
                                    player.weapon = Weapons.Erase;
                                    PLAYER_Draw(true);
                                    player.weapon = Weapons.None;
                                    Sound.playSound(Sounds.Respawn);
                                }
                            }
                            else
                            {
                                clearToMove = false;
                                Sound.playSound(Sounds.Blocked);
                            }
                            changeSpriteTo = -1;
                            break;
                    }
                }
            }
            //if(clearToMove && changeSpriteTo != -1)
            //{
            //    Map.set(mapX, mapY, changeSpriteTo);
            //}
        }
        else
        {
            Sound.playSound(Sounds.Move);
        }
    }
    
    if(clearToMove)
    {
        player.x += x;
        player.y += y;
        player.hasMoved = true;
        player.location.x = player.x + player.gridX;
        player.location.y = player.y + player.gridY;
    }
    
    var newRoom = false;
    
    if(player.x > 7) { player.x = 0; player.gridX += 8; newRoom = true; }
    if(player.x < 0) { player.x = 7; player.gridX -= 8; newRoom = true; }
    if(player.y > 4) { player.y = 0; player.gridY += 5; newRoom = true; }
    if(player.y < 0) { player.y = 4; player.gridY -= 5; newRoom = true; }
    
    if(player.hasItem(SpriteIds.SWORD) && player.getItemQty(SpriteIds.SWORDHP) <= 0)
    {
        player.swapItem(SpriteIds.SWORD, SpriteIds.SWORDBROKEN);
        Sound.playSound(Sounds.Meatloaf);
    }
    if(player.hasItem(SpriteIds.SHOVEL) && player.getItemQty(SpriteIds.SHOVELHP) <= 0)
    {
        player.swapItem(SpriteIds.SHOVEL, SpriteIds.SHOVELBROKEN);
        Sound.playSound(Sounds.Meatloaf);
    }
    
    if(newRoom)
    {
        Map.nextRoom();
    }
    
    return (nextState ? nextState : GameStates.NoChange);
}

function PLAYER_Update(setRespawn)
{
    var player = Game.player;
    
    player.oldX = player.x
    player.oldY = player.y
    
    setRespawn = (typeof(setRespawn) !== 'undefined') ? setRespawn : false;
    if(setRespawn)
    {
        player.spawnX = player.x;
        player.spawnY = player.y;
        player.spawnDark = player.dark;
    }
    
    if(player.selectedItem == 0)
    {
        PLAYER_PutItemAway();
    }
}

function PLAYER_Respawn()
{
    var player = Game.player;
    player.x = player.spawnX;
    player.y = player.spawnY;
    player.dark = player.spawnDark;
    player.oldX = player.x;
    player.oldY = player.y;
    player.life = 100;
    player.hasMoved = false;
    Game.flash = true;
}

function PLAYER_ToRandomDoor(spriteId)
{
    var doors = [];
    for(var n = 0; n < Game.doors.length; n++)
    {
        var door = Game.doors[n];
        if(door.spriteId == spriteId)
        {
            doors.push(door);
        }
    }
    var randomDoor = parseInt(Math.random()*doors.length);
    var player = Game.player;
    var doorX = doors[randomDoor].x;
    var doorY = doors[randomDoor].y;
    player.x = (doorX % 8);
    player.y = (doorY % 5);
    player.gridX = parseInt(doorX / 8) * 8;
    player.gridY = parseInt(doorY / 5) * 5;
    Map.nextRoom();
}

function PLAYER_AddItem(item, qty)
{
    var player = Game.player;
    if(qty > 0)
    {
        player.highlightItem = item.id;
    }
    switch(item.id)
    {
        case SpriteIds.SWORDREPAIR:
            player.swapItem(SpriteIds.SWORDBROKEN, SpriteIds.SWORD);
            player.setItemQty(SpriteIds.SWORDHP, 9);
            player.highlightItem = SpriteIds.SWORD;
            return false;
        case SpriteIds.SHOVELREPAIR:
            player.swapItem(SpriteIds.SHOVELBROKEN, SpriteIds.SHOVEL);
            player.setItemQty(SpriteIds.SHOVELHP, 9);
            player.highlightItem = SpriteIds.SHOVEL;
            return false;
        break;
    }
    if(item.qty <= 0)
    {
        if(item.id != SpriteIds.GOLD && item.id != SpriteIds.SWORDHP)
        {
            player.removeItem(item.id);
            if(player.selectedItem == 0)
            {
                player.selectedItem = player.getItems()[0].id;
            }
            return false;
        }
    }
    return true; // keep item
}

function SPRITE_IsEmpty(spriteId)
{
    var emptySprites = [
        SpriteIds.EMPTYSPACE,
        SpriteIds.PUSHSTOP,
        SpriteIds.BEAMTRIGGER,
        SpriteIds.LIGHTCENTER,
        SpriteIds.SPIDER
    ];
    for(var i = 0; i < emptySprites.length; i++)
    {
        if(spriteId === emptySprites[i])
        {
            return true;
        }
    }
    return false;
}

function SPRITE_GetDead(spriteId)
{
    var spritesToDead = {};
    spritesToDead[SpriteIds.CHICKEN  ] = SpriteIds.CHICKENDEAD;
    spritesToDead[SpriteIds.VILLAGER ] = SpriteIds.VILLAGERDEAD;
    spritesToDead[SpriteIds.CAPTIVE  ] = SpriteIds.CAPTIVEDEAD;
    spritesToDead[SpriteIds.SPIDER   ] = SpriteIds.SPIDERDEAD;
    spritesToDead[SpriteIds.SPIDERWEB] = SpriteIds.SPIDERWEBDEAD;
    spritesToDead[SpriteIds.CATLOAF  ] = SpriteIds.CATLOAFDEAD;
    
    if(typeof(spritesToDead[spriteId]) !== "undefined")
    {
        spriteId = spritesToDead[spriteId];
    }
    
    return spriteId;
}

function SPRITE_AddBlinkSprite(x, y, spriteId, repeat)
{
    spriteId = SPRITE_GetDead(spriteId);
    
    if(spriteId == SpriteIds.SPIDERWEBDEAD)
    {
        repeat = 9;
    }
    
    repeat = (typeof(repeat) === "undefined") ? 28 : repeat;
    var data = {
        intervalId: null,
        count     : 0,
        repeat    : repeat,
        x         : x-Game.player.gridX,
        y         : y-Game.player.gridY,
        mapX      : x,
        mapY      : y,
        spriteId  : spriteId,
        roomId    : Map.getRoomId()
    };
    data.intervalId = setInterval(function(data) {
        var inRoom = (Map.getRoomId() == data.roomId);
        if(inRoom) {
            if((data.count & 3) == 0) {
                Sprites.drawSprite(data.x, data.y, data.spriteId);
            } else if((data.count & 3) == 2) {
                Sprites.drawSprite(data.x, data.y, data.spriteId);
            } else {
                Sprites.drawSprite(data.x, data.y, Map.get(data.mapX, data.mapY));
                PLAYER_Draw(true);
            }
        }
        data.count += 1;
        if(data.count >= data.repeat) {
            clearInterval(data.intervalId);
            if(inRoom) {
                Sprites.drawSprite(data.x, data.y, Map.get(data.mapX, data.mapY));
                PLAYER_Draw(true);
            }
        }
    }, 75, data);
}

/**
 * @param int x
 * @param int y
 * @param function() state 
 * @param int timer
 */
function SPIDER_Draw(x, y, state, timer)
{
    Map.set(x, y, SpriteIds.SPIDER);
    
    var player = Game.player;
    var drawX = x - player.gridX;
    var drawY = y - player.gridY;
    
    switch(state)
    {
        case Spider.prototype.still:
            timer = parseInt(timer / 10);
            Sprites.drawSprite(drawX, drawY, (timer & 1) ? SpriteIds.SPIDER2 : SpriteIds.SPIDER);
        break;
        case Spider.prototype.walk:
            timer = parseInt(timer / 2);
            Sprites.drawSprite(drawX, drawY, (timer & 1) ? SpriteIds.SPIDER2 : SpriteIds.SPIDER);
        break;
    }
}

function MIRRORLOAF_Draw(x, y, state, timer)
{
    var player = Game.player;
    var drawX = x - player.gridX;
    var drawY = y - player.gridY;
    Sprites.drawSprite(drawX, drawY, SpriteIds.MIRRORLOAF);
}

function BOMB_Draw(x, y, state, timer)
{
    var player = Game.player;
    var drawX = x - player.gridX;
    var drawY = y - player.gridY;
    Sprites.drawSprite(drawX, drawY, (timer & 1) ? SpriteIds.BOMBLIT1 : SpriteIds.BOMBLIT2);
}

function PICTURE_Draw(x, y, timer)
{
    var sprite = Map.get(x, y);
    MAP_Draw(x, y, sprite);
    
    var player = Game.player;
    var drawX = x - player.gridX;
    var drawY = y - player.gridY;
    Sprites.drawSpriteXY(drawX*5+1-5, drawY*5+1, SpriteIds.TOPAZ, null, SpriteFlags.Trans);
}

function ANIMATE_Draw(x, y, timer, sprite)
{
    MAP_Draw(x, y, sprite);
}

function MAP_Draw(mapX, mapY, sprite, color, flags)
{
    var player = Game.player;
    var drawX = mapX - player.gridX;
    var drawY = mapY - player.gridY;
    Sprites.drawSprite(drawX, drawY, sprite, color, flags);
    if(Map.showBuried(mapX, mapY))
    {
        var buried = Map.getBuried(mapX, mapY);
        if(buried)
        {
            Sprites.drawSprite(drawX, drawY, buried, null, SpriteFlags.Trans);
        }
    }
}

function MAP_TryKill(mapX, mapY, addBlinkSprite)
{
    addBlinkSprite = (typeof(addBlinkSprite) !== "undefined") ? addBlinkSprite : true;
    if(Map.isKillable(mapX, mapY))
    {
        var sprite = Map.get(mapX, mapY);
        Map.killMobAt(mapX, mapY);
        Map.erase(mapX, mapY);
        if(sprite == SpriteIds.CAPTIVE)
        {
            Game.setVar(GameVars.CAPTIVES, Game.getVar(GameVars.CAPTIVES) - 1);
        }
        if(sprite != SpriteIds.SPIDERWEB)
        {
            Sound.playSound(Sounds.Flash);
        }
        else
        {
            Sound.playSound(Sounds.Chop);
        }
        if(addBlinkSprite)
        {
            SPRITE_AddBlinkSprite(mapX, mapY, sprite);
        }
        return true;
    }
    if(mapX == (Game.player.x + Game.player.gridX) && mapY == (Game.player.y + Game.player.gridY))
    {
        Game.player.life = 0;
        //Map.set(Game.player.x + Game.player.gridX, Game.player.y + Game.player.gridY, SpriteIds.CATLOAF);
        return true;
    }
    return false;
}

function MAP_TryDig(mapX, mapY)
{
    var player = Game.player;
    if(Map.isDiggable(mapX, mapY))
    {
        var sprite = Map.get(mapX, mapY);
        var buried = Map.getBuried(mapX, mapY);
        switch(sprite)
        {
            case SpriteIds.MEDIUMDIRT:
                if(buried)
                {
                    Map.set(mapX, mapY, buried);
                }
                else
                {
                    Map.set(mapX, mapY, SpriteIds.LIGHTDIRT);
                }
                MAP_Draw(mapX, mapY, Map.get(mapX, mapY));
                Sound.playSound(Sounds.Chop);
                return true;
            break;
            case SpriteIds.HEAVYDIRT:
                Map.set(mapX, mapY, SpriteIds.MEDIUMDIRT);
                MAP_Draw(mapX, mapY, SpriteIds.MEDIUMDIRT);
                Sound.playSound(Sounds.Chop);
                return true;
            break;
            case SpriteIds.LIGHTDIRT:
            default:
                return false;
            break;
        }
    }
    return false;
}

function STATE_ShowHelp() {}
STATE_ShowHelp.prototype.go = function(keyCode, isRepeat, initialize)
{
    if(initialize)
    {
        GFX.cls();
        
        GFX.writeText("Use arrow keys or (I,J,K,L) to move", 1, 15);
        GFX.writeText("Press SPACE (or TAB) to view inventory", 3, 15);
        
        GFX.writeText("Basic Obstacles:", 5, 15);
        
        Sprites.drawSpriteXY(2, 5, SpriteIds.TRAP);
        GFX.color(15, 0);
        GFX.locate(7, 8); GFX.print("TRAP - Avoid these at all cost!");
        
        Sprites.drawSpriteXY(2, 10, SpriteIds.DOORGOLD);
        Sprites.drawSpriteXY(36, 10, SpriteIds.KEYGOLD);
        GFX.color(15, 0);
        GFX.locate(12, 8); GFX.print("GOLD DOOR   - Opens with key");
        
        Sprites.drawSpriteXY(2, 16, SpriteIds.DOORSILVER);
        Sprites.drawSpriteXY(36, 16, SpriteIds.KEYSILVER);
        GFX.color(15, 0);
        GFX.locate(18, 8); GFX.print("SILVER DOOR - Opens with key");
        
        Sprites.drawSpriteXY(2, 21, SpriteIds.LIGHTOFF);
        GFX.color(15, 0);
        GFX.locate(23, 8); GFX.print("LIGHTSWITCH - Turns off lights");
        
        Sound.playSound(Sounds.Notice);
    }
    
    if(keyCode != 0)
    {
        Sound.playSound(Sounds.Notice);
        return GameStates.Previous;
    }
    
    return GameStates.NoChange;
}

function INVENTORY_DrawMiniSelectionBox(x, y, qty, selected, color)
{
    selected = (selected == true || selected == 1);
    if(selected)
    {
        GFX.color((typeof(color) !== "undefined") ? color : 14, 0);
        GFX.locate(y+0, x); GFX.printTrans(" -->|<-- ");
        GFX.locate(y+1, x); GFX.printTrans("\\       /");
        GFX.locate(y+2, x); GFX.printTrans(">       <");
        GFX.locate(y+3, x); GFX.printTrans("/       \\");
        GFX.locate(y+4, x); GFX.printTrans(" ------- ");
    }
    else
    {
        GFX.color((typeof(color) !== "undefined") ? color : 9, 0);
        GFX.locate(y+0, x); GFX.printTrans(" ------- ");
        GFX.locate(y+1, x); GFX.printTrans("\\       /");
        GFX.locate(y+2, x); GFX.printTrans(")       (");
        GFX.locate(y+3, x); GFX.printTrans("/       \\");
        GFX.locate(y+4, x); GFX.printTrans(" ------- ");
    }
}

function INVENTORY_DrawSelectionBox(x, y, qty, selected, color)
{
    selected = (selected == true || selected == 1);
    if(selected)
    {
        GFX.color((typeof(color) !== "undefined") ? color : 14, 0);
        GFX.locate(y+0, x); GFX.printTrans(" -->|<-- ");
        GFX.locate(y+1, x); GFX.printTrans("(       )");
        GFX.locate(y+2, x); GFX.printTrans("\\       /");
        GFX.locate(y+3, x); GFX.printTrans(">       <");
        GFX.locate(y+4, x); GFX.printTrans("/       \\");
        GFX.locate(y+5, x); GFX.printTrans("(       )");
        GFX.locate(y+6, x); GFX.printTrans(" ------- ");
    }
    else
    {
        GFX.color((typeof(color) !== "undefined") ? color : 9, 0);
        GFX.color(color);
        GFX.locate(y+0, x); GFX.printTrans(" ------- ");
        GFX.locate(y+1, x); GFX.printTrans("(       )");
        GFX.locate(y+2, x); GFX.printTrans("\\       /");
        GFX.locate(y+3, x); GFX.printTrans(")       (");
        GFX.locate(y+4, x); GFX.printTrans("/       \\");
        GFX.locate(y+5, x); GFX.printTrans("(       )");
        GFX.locate(y+6, x); GFX.printTrans(" ------- ");
    }
    var qtyString = (qty !== false) ? qty.toString() : " ";
    if(qty === false || qty < 10)
    {
        GFX.locate(y+6, x+3); GFX.color(15, 0);
        GFX.print("<"+qtyString+">");
    }
    else
    {
        GFX.locate(y+6, x+3); GFX.color(15, 0);
        GFX.print("<X>");
    }
}

function INVENTORY_DrawItemBox(x, y, qty, selected, color)
{
    selected = (selected == true || selected == 1);
    if(selected)
    {
        GFX.color((typeof(color) !== "undefined") ? color : 14, 0);
        GFX.locate(y+0, x); GFX.printTrans(" )\"\"\"\"\"( ");
        GFX.locate(y+1, x); GFX.printTrans("(       )");
        GFX.locate(y+2, x); GFX.printTrans("\\       /");
        GFX.locate(y+3, x); GFX.printTrans(")       (");
        GFX.locate(y+4, x); GFX.printTrans("/       \\");
        GFX.locate(y+5, x); GFX.printTrans("(       )");
        GFX.locate(y+6, x); GFX.printTrans(" )_____( ");
    }
    else
    {
        GFX.color((typeof(color) !== "undefined") ? color : 9, 0);
        GFX.color(color);
        GFX.locate(y+0, x); GFX.printTrans(" ------- ");
        GFX.locate(y+1, x); GFX.printTrans("(       )");
        GFX.locate(y+2, x); GFX.printTrans("\\       /");
        GFX.locate(y+3, x); GFX.printTrans(")       (");
        GFX.locate(y+4, x); GFX.printTrans("/       \\");
        GFX.locate(y+5, x); GFX.printTrans("(       )");
        GFX.locate(y+6, x); GFX.printTrans(" ------- ");
    }
}

function STATE_ShowInventory() {}
STATE_ShowInventory.prototype.go = function(keyCode, isRepeat, initialize)
{
    var player = Game.player;
    var selected = player.selectedItem;
    
    var swordHp  = player.getItemQty(SpriteIds.SWORDHP);
    var shovelHp = player.getItemQty(SpriteIds.SHOVELHP);
    
    var itemNames = [];
    itemNames[SpriteIds.EMPTYSPACE    ] = "Empty";
    itemNames[SpriteIds.SWORD         ] = "Sword";
    itemNames[SpriteIds.SWORDBROKEN   ] = "Broken Sword";
    itemNames[SpriteIds.SHOVEL        ] = "Shovel";
    itemNames[SpriteIds.SHOVELBROKEN  ] = "Broken Shovel";
    itemNames[SpriteIds.GOLD          ] = "Gold";
    itemNames[SpriteIds.KEYGOLD       ] = "Gold Key";
    itemNames[SpriteIds.KEYSILVER     ] = "Silver Key";
    itemNames[SpriteIds.KEYSTONE      ] = "Stone Key";
    itemNames[SpriteIds.BOMB          ] = "Bomb";
    itemNames[SpriteIds.RUNE          ] = "Rune";
    itemNames[SpriteIds.RUBY          ] = "Ruby Gem";
    itemNames[SpriteIds.AMETHYST      ] = "Amethyst Gem";
    itemNames[SpriteIds.TOPAZ         ] = "Topaz Gem";
    itemNames[SpriteIds.SAPPHIRE      ] = "Sapphire Gem";
    itemNames[SpriteIds.EMERALD       ] = "Emerald Gem";
    itemNames[SpriteIds.CRANKUP       ] = "Crank";
    itemNames[SpriteIds.BRONZEKEY     ] = "Bronze Key";
    itemNames[SpriteIds.GATEKEY       ] = "Gate Key";
    itemNames[SpriteIds.ENCHANTEDSWORD] = "Enchanted Sword";
    
    var swordString = "";
    var swordColor = (swordHp > 6) ? 10 : (swordHp > 3 ? 14 : 12);
    for(var i = 0; i <   swordHp; i++) swordString += "#";
    for(var i = 0; i < 9-swordHp; i++) swordString += "_";
    swordString = "[-"+swordString+"-]";
    
    var shovelString = "";
    var shovelColor = (shovelHp > 6) ? 10 : (shovelHp > 3 ? 14 : 12);
    for(var i = 0; i <   shovelHp; i++) shovelString += "#";
    for(var i = 0; i < 9-shovelHp; i++) shovelString += "_";
    shovelString = "[-"+shovelString+"-]";
    
    var itemNotes = [];
    itemNotes[SpriteIds.SWORD         ] = swordColor.toString()+":"+swordString;
    itemNotes[SpriteIds.SWORDBROKEN   ] = "12:NEEDS REPAIR";
    itemNotes[SpriteIds.SHOVEL        ] = shovelColor.toString()+":"+shovelString;
    itemNotes[SpriteIds.SHOVELBROKEN  ] = "12:NEEDS REPAIR";
    itemNotes[SpriteIds.RUNE          ] = "12:Unidentified";
    itemNotes[SpriteIds.GOLD          ] = "14:"+player.getItemQty(SpriteIds.GOLD).toString()+" pcs";
    //itemNotes[SpriteIds.RUBY        ] = "12:Unidentified Engraving";
    //itemNotes[SpriteIds.RUBY        ] = "10:Engraving Reads \"1801\"";
    itemNotes[SpriteIds.RUBY          ] = "10:Engraved 1801";
    itemNotes[SpriteIds.ENCHANTEDSWORD] = "11:Unbreakable";
    
    var items = player.getItems();
    if(items.length < 8)
    {
        for(var i = items.length; i < 8; i++)
        {
            items.push({id: SpriteIds.EMPTYSPACE, qty: false});
        }
    }
    if(initialize)
    {
        GFX.cls();
        
        GFX.writeText("INVENTORY", 3, 15);
        
        this.nextState = GameStates.NoChange;
        this.selectedIndex = -1;
        this.intervalId = null;
        this.timeoutId = null;
        
        for(var i = 0; i < 8; i++)
        {
            var item = items[i];
            if(item.id == selected)
            {
                this.selectedIndex = i;
            }
        }
        if(this.selectedIndex == -1)
        {
            this.selectedIndex = 0;
        }
        
        var x = 0;
        var y = 6;
        for(var i = 0; i < 8; i++)
        {
            var item = items[i];
            var sx = (i & 3) * 9 + 3;
            var sy = parseInt(i / 4) * 8 + 5;
            INVENTORY_DrawSelectionBox(sx, sy, item ? item.qty : false, (i == this.selectedIndex));
            
            Sprites.drawSpriteXY(x*9+5, y, item.id);
            
            x += 1;
            if(x >= 4)
            {
                x = 0;
                y += 8;
            }
        }
        this.refresh = true;
        Sound.playSound(Sounds.Select);
    }
    
    GFX.locate(24, 4);
    GFX.color(15); GFX.print("TIME " + Game.getTimeString());
    
    var lastSelectedIndex = this.selectedIndex;
    var madeSelection = false;
    if(keyCode && !isRepeat)
    {
        if(keyCode == KeyCodes.escape || keyCode == KeyCodes.tab)
        {
            if(this.intervalId !== null) clearInterval(this.intervalId);
            if(this.timeoutId  !== null) clearTimeout(this.timeoutId);
            this.intervalId = null;
            this.timeoutId  = null;
            var item = items[this.selectedIndex];
            if(item.id != SpriteIds.EMPTYSPACE)
            {
                player.selectedItem = item.id;
            }
            Sound.playSound(Sounds.Notice);
            return GameStates.Previous;
        }
        if(keyCode == KeyCodes.space)
        {
            var item = items[this.selectedIndex];
            Game.player.highlightItem = item.id;
            this.timeoutId = setTimeout(function(self){
                self.nextState = GameStates.Previous;
            }, 500, this);
            Sound.playSound(Sounds.Bonus);
        }
        if(keyCode == KeyCodes.right) { if((this.selectedIndex & 3) < 3) { this.selectedIndex += 1; this.refresh = true; Sound.playSound(Sounds.Select); } else { Sound.playSound(Sounds.Notice); } }
        if(keyCode == KeyCodes.left ) { if((this.selectedIndex & 3) > 0) { this.selectedIndex -= 1; this.refresh = true; Sound.playSound(Sounds.Select); } else { Sound.playSound(Sounds.Notice); } }
        if(keyCode == KeyCodes.down ) { if(this.selectedIndex <  4) { this.selectedIndex += 4; this.refresh = true; Sound.playSound(Sounds.Select); } else { Sound.playSound(Sounds.Notice); } }
        if(keyCode == KeyCodes.up   ) { if(this.selectedIndex >= 4) { this.selectedIndex -= 4; this.refresh = true; Sound.playSound(Sounds.Select); } else { Sound.playSound(Sounds.Notice); } }
    }
    
    if(Game.player.highlightItem)
    {
        for(var i = 0; i < 8; i++)
        {
            var item = items[i];
            if(item.id == Game.player.highlightItem)
            {
                var data = {
                    x    : (i & 3) * 9 + 3,
                    y    : parseInt(i / 4) * 8 + 5,
                    qty  : item ? item.qty : false,
                    color: 15
                };
                if(this.intervalId !== null) clearInterval(this.intervalId);
                if(this.timeoutId  !== null) clearTimeout(this.timeoutId);
                this.intervalId = setInterval(function(data){
                    data.color = (data.color == 9) ? 15 : 9;
                    INVENTORY_DrawSelectionBox(data.x, data.y, data.qty, (Game.player.selectedItem == i), data.color);
                }, 100, data);
                this.timeoutId = setTimeout(function(self){
                    clearInterval(self.intervalId);
                    self.intervalId = null;
                    self.timeoutId  = null;
                }, 900, this);
                INVENTORY_DrawSelectionBox(data.x, data.y, data.qty, (Game.player.selectedItem == i), data.color);
                Game.player.highlightItem = 0;
                break;
            }
        }
    }
    
    if(this.refresh)
    {
        if(lastSelectedIndex != this.selectedIndex)
        {
            var item = items[lastSelectedIndex];
            var x = (lastSelectedIndex & 3) * 9 + 3;
            var y = parseInt(lastSelectedIndex / 4) * 8 + 5;
            INVENTORY_DrawSelectionBox(x, y, item ? item.qty : false, false);
        }
        
        var item = items[this.selectedIndex];
        x = (this.selectedIndex & 3) * 9 + 3;
        y = parseInt(this.selectedIndex / 4) * 8 + 5;
        INVENTORY_DrawSelectionBox(x, y, item ? item.qty : false, true);
        
        if(typeof(itemNames[item.id]) !== "undefined")
        {
            GFX.writeText("    ( "+itemNames[item.id].toUpperCase()+" )    ", 21, 15);
        }
        else
        {
            GFX.writeText("    ( "+itemNames[SpriteIds.EMPTYSPACE].toUpperCase()+" )    ", 21, 15);
        }
        
        if(typeof(itemNotes[item.id]) !== "undefined")
        {
            var note = itemNotes[item.id];
            var separator = note.indexOf(":");
            if(separator >= 0)
            {
                var color = parseInt(note.substr(0, separator));
                note = note.substr(separator+1, note.length-separator);
            }
            GFX.writeText("    "+note.toUpperCase()+"    ", 23, color);
        }
        else
        {
            GFX.writeText("                    ", 23, 0);
        }
        
        this.refresh = false;
    }
    
    return this.nextState;
}

function STATE_ViewItem() {}
STATE_ViewItem.prototype.go = function(keyCode, isRepeat, initialize)
{
    var item = Game.itemToView;
    
    if(initialize)
    {
        this.nextState  = GameStates.NoChange;
        this.refresh    = true;
        
        GFX.cls();
       
        INVENTORY_DrawItemBox(16, 6, 1, true);
        Sprites.drawSpriteXY(18, 7, item.id);
        GFX_ColorText(item.name, 15);
        GFX_ColorText(item.description, 17);
    }
    
    if(keyCode && !isRepeat)
    {
        if(keyCode == KeyCodes.escape || keyCode == KeyCodes.space)
        {
            Sound.playSound(Sounds.Notice);
            return GameStates.Previous;
        }
    }
    
    if(this.refresh)
    {
        this.refresh = false;
    }
    
    return this.nextState;
}

function STATE_ConfirmPurchase() {}
STATE_ConfirmPurchase.prototype.go = function(keyCode, isRepeat, initialize)
{
    if(this.returnToPrevious)
    {
        this.returnToPrevious = false;
        return GameStates.Previous;
    }
    
    var item = Game.itemToBuy;
    
    var choices = {
        No : 0,
        Yes: 1
    }
    
    if(initialize)
    {
        this.nextState  = GameStates.NoChange;
        this.choice     = choices.No;
        this.refresh    = true;
        this.intervalId = null;
        this.timeoutId  = null;
        
        GFX.cls();
        GFX.writeText("BUY "+item.name+"?", 3, 15);
        GFX.writeText("PRICE "+item.price.toString()+" GOLD", 20, 14);
        
        GFX.color(14);
        GFX.locate(22, 3); GFX.print("YOUR");
        GFX.locate(23, 3); GFX.print("GOLD:");
        GFX.locate(23, 9);
        GFX.print(Game.player.getItemQty(SpriteIds.GOLD).toString()+" PCS");
        
        INVENTORY_DrawSelectionBox(16, 6, 1, true);
        Sprites.drawSpriteXY(18, 7, item.id);
    }
    
    if(keyCode && !isRepeat)
    {
        if(keyCode == KeyCodes.escape)
        {
            Sound.playSound(Sounds.Notice);
            return GameStates.Previous;
        }
        if(keyCode == KeyCodes.right)
        {
            this.choice = choices.No;
            this.refresh = true;
            Sound.playSound(Sounds.Select);
        }
        if(keyCode == KeyCodes.left)
        {
            this.choice = choices.Yes;
            this.refresh = true;
            Sound.playSound(Sounds.Select);
        }
        if(keyCode == KeyCodes.space)
        {
            if(this.intervalId !== null) clearInterval(this.intervalId);
            if(this.timeoutId  !== null) clearTimeout(this.timeoutId);
            var data = {
                x    : (this.choice == choices.Yes) ? 9 : 23,
                y    : 14,
                qty  : false,
                colorOn : 15,
                colorOff: 8,
                color: 0
            };
            data.color = data.colorOn;
            this.intervalId = setInterval(function(data){
                data.color = (data.color == data.colorOff) ? data.colorOn : data.colorOff;
                INVENTORY_DrawMiniSelectionBox(data.x, data.y, data.qty, true, data.color);
            }, 100, data);
            if(this.choice == choices.Yes)
            {
                Game.player.addItem(item.id);
                Game.player.addItem(SpriteIds.GOLD, -item.price);
                Game.blacksmith.addItem(item.id, -1);
                this.timeoutId = setTimeout(function(self){
                    clearInterval(self.intervalId);
                    self.intervalId = null;
                    self.timeoutId  = null;
                    self.nextState = GameStates.InInventory;
                }, 500, this);
                Sound.playSound(Sounds.Bonus);
            }
            else
            {
                this.timeoutId = setTimeout(function(self){
                    clearInterval(self.intervalId);
                    self.intervalId = null;
                    self.timeoutId  = null;
                    self.nextState = GameStates.Previous;
                }, 500, this);
                Sound.playSound(Sounds.Notice);
            }
            INVENTORY_DrawMiniSelectionBox(data.x, data.y, data.qty, true, data.color);
            
        }
    }
    
    if(this.refresh)
    {
        GFX.color(15, 0);
        INVENTORY_DrawMiniSelectionBox( 9, 14, false, (this.choice == choices.Yes), (this.choice == choices.Yes) ? 10 : 7);
        INVENTORY_DrawMiniSelectionBox(23, 14, false, (this.choice == choices.No ), (this.choice == choices.No ) ? 12 : 7);
        
        GFX.color((this.choice == choices.Yes) ? 15 : 7);
        GFX.color(null, (this.choice == choices.Yes) ? 10 : 8);
        GFX.locate(16, 10); GFX.print(" ````` ");
        GFX.color(null, (this.choice == choices.Yes) ?  2 : 8);
        GFX.locate(16, 11); GFX.print(" YES ");
        
        GFX.color((this.choice == choices.No ) ? 15 : 7);
        GFX.color(null, (this.choice == choices.No ) ? 12 : 8);
        GFX.locate(16, 24); GFX.print(" ````` ");
        GFX.color(null, (this.choice == choices.No ) ?  4 : 8);
        GFX.locate(16, 25); GFX.print(" NO! ");
        
        this.refresh = false;
    }
    
    if(this.nextState == GameStates.InInventory)
    {
        this.returnToPrevious = true;
    }
    
    return this.nextState;
}

function STATE_Blacksmith() {}
STATE_Blacksmith.prototype.go = function(keyCode, isRepeat, initialize)
{
    if(this.returnToPrevious)
    {
        this.returnToPrevious = false;
        return GameStates.Previous;
    }
    
    var player = Game.player;
    var selected = SpriteIds.SWORDREPAIR;
    
    var itemNotes = [];
    
    var items = [];
    var swordhp = player.getItemQty(SpriteIds.SWORDHP);
    var shovelhp = player.getItemQty(SpriteIds.SHOVELHP);
    if(swordhp < 9)
    {
        var hpToPrice = {
            8: 10,
            7: 10,
            6: 20,
            5: 20,
            4: 20,
            3: 30,
            2: 30,
            1: 30,
            0: 40
        };
        items.push({ id: SpriteIds.SWORDREPAIR, qty: 1, price: hpToPrice[swordhp], name: "Sword Repair"});
    }
    else
    {
        items.push({ id: SpriteIds.SWORDREPAIR, qty: 0, price: 0, name: "Sword Repair"});
        selected = SpriteIds.BOMB;
    }
    if(shovelhp < 9)
    {
        var hpToPrice = {
            8: 10,
            7: 10,
            6: 20,
            5: 20,
            4: 20,
            3: 30,
            2: 30,
            1: 30,
            0: 40
        };
        items.push({ id: SpriteIds.SHOVELREPAIR, qty: 1, price: hpToPrice[shovelhp], name: "Shovel Repair"});
    }
    var blacksmithItems = Game.blacksmith.getItems();
    for(var i = 0; i < blacksmithItems.length; i++)
    {
        items.push(blacksmithItems[i]);
    }
    while(items.length < 4)
    {
        items.push({ id: SpriteIds.EMPTYSPACE, qty:99, price:   0, name: "Empty"});
    }
    
    var gold = player.getItemQty(SpriteIds.GOLD);
    for(var i = 0; i < items.length; i++)
    {
        var item = items[i];
        var price = item.price;
        var canBuy = (gold >= price) ? true: false;
        if(item.qty > 0)
        {
            itemNotes[item.id] = (canBuy ? "10" : "12")+": Price "+price.toString()+" Gold";
        }
        else
        {
            itemNotes[item.id] = "12:Out Of Stock";
        }
    }
    
    if(swordhp == 9)
    {
        itemNotes[SpriteIds.SWORDREPAIR] = "12:Unavailable";
    }
    if(shovelhp == 9)
    {
        itemNotes[SpriteIds.SHOVELREPAIR] = "12:Unavailable";
    }
    
    if(initialize)
    {
        GFX.cls();
        
        GFX.writeText("BLACKSMITH", 3, 15);
        
        Game.itemToBuy = null;
        this.selectedIndex = 0;
        this.nextState = GameStates.NoChange;
        this.noticeOverride = "";
        this.intervalId = null;
        this.timeoutId  = null;
        
        var x = 0;
        var y = 10;
        for(var i = 0; i < 4; i++)
        {
            var item = (typeof(items[i]) !== "undefined") ? items[i] : null;
            if(item && item.id == selected)
            {
                this.selectedIndex = i;
            }
            var sx = (i & 3) * 9 + 3;
            var sy = parseInt(i / 4) * 8 + 9;
            INVENTORY_DrawSelectionBox(sx, sy, item ? item.qty : false, (i == this.selectedIndex));
            
            if(item)
            {
                Sprites.drawSpriteXY(x*9+5, y, item.id, (item.qty > 0) ? null : 8);
            }
            
            x += 1;
            if(x >= 4)
            {
                x = 0;
                y += 8;
            }
        }
        
        Sprites.drawSpriteXY(4, 3, SpriteIds.BLACKSMITH);
        this.refresh = true;
        Sound.playSound(Sounds.Bonus);
    }
    
    var lastSelectedIndex = this.selectedIndex;
    if(keyCode && !isRepeat)
    {
        if(keyCode == KeyCodes.space)
        {
            var item = items[this.selectedIndex];
            if(player.getItemQty(SpriteIds.GOLD) >= item.price && item.id != SpriteIds.EMPTYSPACE)
            {
                Game.itemToBuy = item;
                var data = {
                    x    : (this.selectedIndex & 3) * 9 + 3,
                    y    : parseInt(this.selectedIndex / 4) * 8 + 9,
                    qty  : item ? item.qty : false,
                    color: 9
                };
                if(this.intervalId !== null) clearInterval(this.intervalId);
                if(this.timeoutId  !== null) clearTimeout(this.timeoutId);
                this.intervalId = setInterval(function(data){
                    data.color = (data.color == 9) ? 15 : 9;
                    INVENTORY_DrawSelectionBox(data.x, data.y, data.qty, true, data.color);
                }, 100, data);
                this.timeoutId = setTimeout(function(self){
                    clearInterval(self.intervalId);
                    self.intervalId = null;
                    self.timeoutId  = null;
                    self.nextState = GameStates.ConfirmBuy;
                }, 600, this);
                INVENTORY_DrawSelectionBox(data.x, data.y, data.qty, true, data.color);
                Sound.playSound(Sounds.Select);
            }
            else
            {
                Sound.playSound(Sounds.Notice);
                if(this.intervalId !== null) clearInterval(this.intervalId);
                if(this.timeoutId  !== null) clearTimeout(this.timeoutId);
                this.intervalId = setInterval(function(self){
                    if(self.noticeOverride.length)
                    {
                        self.noticeOverride = (self.noticeOverride == "          " ? "12:NOT ENOUGH" : "          ");
                        self.refresh = true;
                    }
                }, 300, this);
                this.timeoutId = setTimeout(function(self){
                    self.noticeOverride = "";
                    self.refresh = true;
                    clearInterval(self.intervalId);
                    self.intervalId = null;
                    self.timeoutId  = null;
                }, 2100, this);
                this.noticeOverride = "          ";
                this.refresh = true;
            }
        }
        if(keyCode == KeyCodes.escape || keyCode == KeyCodes.tab)
        {
            Sound.playSound(Sounds.Select);
            return GameStates.PlayGame;
        }
        if(keyCode == KeyCodes.right) { if((this.selectedIndex & 3) < 3) { this.selectedIndex += 1; this.refresh = true; this.noticeOverride = ""; Sound.playSound(Sounds.Select); } else { Sound.playSound(Sounds.Notice); } }
        if(keyCode == KeyCodes.left ) { if((this.selectedIndex & 3) > 0) { this.selectedIndex -= 1; this.refresh = true; this.noticeOverride = ""; Sound.playSound(Sounds.Select); } else { Sound.playSound(Sounds.Notice); }  }
        if(keyCode == KeyCodes.down ) { Sound.playSound(Sounds.Notice); }
        if(keyCode == KeyCodes.up   ) { Sound.playSound(Sounds.Notice); }
    }
    
    GFX.color(9);
    GFX.writeText("Welcome, traveler!", 5);
    GFX.locate(6, 12); GFX.print("Would you like to");
    GFX.locate(7, 12); GFX.print("purchase any items?");
    
    GFX.color(14);
    GFX.locate(22, 3); GFX.print("YOUR");
    GFX.locate(23, 3); GFX.print("GOLD:");
    GFX.locate(23, 9);
    GFX.print(player.getItemQty(SpriteIds.GOLD).toString()+" PCS");
    
    if(this.refresh)
    {
        var item = items[lastSelectedIndex];
        var x = (lastSelectedIndex & 3) * 9 + 3;
        var y = parseInt(lastSelectedIndex / 4) * 8 + 9;
        INVENTORY_DrawSelectionBox(x, y, item ? item.qty : false, false);
        
        var item = items[this.selectedIndex];
        x = (this.selectedIndex & 3) * 9 + 3;
        y = parseInt(this.selectedIndex / 4) * 8 + 9;
        INVENTORY_DrawSelectionBox(x, y, item ? item.qty : false, true);
        
        GFX.writeText("    ( "+item.name.toUpperCase()+" )    ", 18, 15);
        
        var note = "";
        if(this.noticeOverride.length)
        {
            note = this.noticeOverride;
        }
        else
        {
            if(typeof(itemNotes[item.id]) !== "undefined" && item.id != SpriteIds.EMPTYSPACE)
            {
                note = itemNotes[item.id];
            }
            else
            {
                note = "          ";
            }
        }
        var separator = note.indexOf(":");
        if(separator >= 0)
        {
            var color = parseInt(note.substr(0, separator));
            note = note.substr(separator+1, note.length-separator);
        }
        GFX.writeText("    "+note.toUpperCase()+"    ", 20, color);
        
        this.refresh = false;
    }
    
    if(this.nextState == GameStates.ConfirmBuy)
    {
        this.returnToPrevious = true;
    }
    
    return this.nextState;
}

function STATE_ShowAbout() {}
STATE_ShowAbout.prototype.go = function(keyCode, isRepeat, initialize)
{
    if(initialize)
    {
        GFX.cls();
        GFX.writeText("CATLOAF 2600", 3, 14);
        GFX.writeText("Created by Joe King", 7, 15);
        GFX.writeText("Copyright (C) 2007-2020 Joe King", 11, 15);
        GFX.writeText("All Rights Reserved", 13, 15);
        GFX.writeText("https://games.joeking.us", 15, 15);
        GFX.writeText("SPECIAL THANKS", 19, 9);
        GFX.writeText("ChipTone (SFB Games)", 21, 7);
        GFX.writeText("FFmpeg  (ffmpeg.org)", 23, 7);
        Sound.playSound(Sounds.Notice);
    }
    
    if(keyCode != 0)
    {
        Sound.playSound(Sounds.Notice);
        return GameStates.Previous;
    }
    
    return GameStates.NoChange;
}

function STATE_QuitYesNo() {}
STATE_QuitYesNo.prototype.go = function(keyCode, isRepeat, initialize)
{
    var self = STATE_QuitYesNo;
    if(initialize)
    {
        self.nextState = GameStates.NoChange;
    }
    
    if(initialize)
    {
        GFX.color(null, 1);
        GFX.writeText("[    QUIT GAME? (Y/N)    ]", 4, 15);
        GFX.color(null, 0);
        
        Sound.playSound(Sounds.Notice);
    }
    
    if(self.nextState == GameStates.NoChange)
    {
        if(keyCode == KeyCodes.Y)
        {
            setTimeout(function(self){
                self.nextState = GameStates.GameOver;
            }, 1500, self);
            GFX.cls();
            Sound.playSound(Sounds.Flash);
        }
        if(keyCode == KeyCodes.N) {
            Sound.playSound(Sounds.Notice);
            self.nextState = GameStates.Previous;
        }
    }
    
    return self.nextState;
}

function STATE_EndGame() {}
STATE_EndGame.prototype.go = function(keyCode, isRepeat, initialize)
{
    if(initialize)
    {
        this.monologue = [];
        this.printMonologue = true;
        this.step = -4;
    }
    
    if(initialize)
    {
        Game.stopTimer();
        //Game.player.addItem(Inventory.endToken);
        
        var delay = FLASH(0, null, 25);
        setTimeout(function(self){
            if(self.step < -2) {
                self.step = -2;
            }
        }, delay+2000, this);
        setTimeout(function(){
            Sound.playSound(Sounds.Flash);
        }, parseInt(delay / 3));
        setTimeout(function(){
            Sound.playSound(Sounds.Flash);
        }, parseInt(delay / 3)*2);
        setTimeout(function(self){
            Sound.playSound(Sounds.Flash);
            GFX.cls();
            self.step = -3;
        }, parseInt(delay / 3)*3, this);
        Sound.playSound(Sounds.Flash);
    }
    
    var player = Game.player;
    var numItems = 0; //(player.inv.goldenDove + player.inv.supremeEye + player.inv.crystalSnake);
    var monologues = {
        begin: [
            "CATLOAF!",
            "You have survived my labyrinth...",
            "...which takes much skill."
        ],
        tooLong: [
            "But you have taken too much time.",
            "Complete my labyrinth...",
            "...in less than 5 minutes.",
            "Only then can prove your l33tness."
        ],
        notAllItems: [
            "You are good...",
            "...but not good enough!",
            "There are 3 special items within."
        ],
        noItems: [
            "You have none!",
            "You must find them...",
            "...to prove your l33tness."
        ],
        someItems: [
            "You only have "+numItems.toString()+".",
            "You must find the rest...",
            "...to prove your l33tness."
        ],
        allItems: [
            "Good job.",
            "And you found all the special items.",
            "All under five minutes.",
            "Most excellent.",
            "I am not worthy of you.",
            "",
            "What's the matter?",
            "Were you expecting a fight...",
            "...or an epic boss battle?",
            "MWAHAHAHA!!!",
            "Think again!"
        ]
    };
    
    if(initialize)
    {
        var m = [];
        m = m.concat(monologues.begin);
        if(Game.seconds >= 300)
        {
            m = m.concat(monologues.tooLong);
        }
        else
        {
            if(numItems < 3)
            {
                m = m.concat(monologues.notAllItems);
                m = m.concat((numItems == 0) ? monologues.noItems : monologues.someItems);
            }
            else
            {
                m = m.concat(monologues.allItems);
            }
        }
        this.monologue = m;
    }
    
    var text = "";
    if(this.step >= 0)
    {
        text = this.monologue[this.step];
    }
    switch(this.step)
    {
        case -7:
            GFX.cls();
            setTimeout(function(self){
                if(self.step < -3) {
                    self.step += 1;
                }
            }, 1000, this);
            this.step += 1;
            return GameStates.NoChange;
            break;
        case -6:
            // wait for timeout or keypress
            break;
        case -5:
            return GameStates.Next;
            break;
        case -4:
            return GameStates.NoChange;
            break;
        case -3:
            // wait for timeout or keypress
            break;
        case -2:
            GFX.cls();
            Sprites.drawSpriteXY(18, 6, SpriteIds.MEATLOAF);
            GFX.writeText("MASTER  MEATLOAF", 3, 4);
            Sound.playSound(Sounds.Meatloaf);
            setTimeout(function(self){
                if(self.step < 0) {
                    Sound.playSound(Sounds.Meatloaf);
                    self.step += 1;
                }
            }, 1500, this);
            this.step += 1;
            break;
        case -1:
            // wait for timeout or keypress
            break;
        default:
            if(this.printMonologue)
            {
                GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText(text, 14, 15, true);
                this.printMonologue = false;
            }
            break;
    }
    if(keyCode && !isRepeat)
    {
        Sound.playSound(Sounds.Meatloaf);
        this.printMonologue = true;
        this.step += 1;
        if(this.step >= this.monologue.length)
        {
            this.step = -7;
        }
    }
    return GameStates.NoChange;
}

function STATE_GameOver() {}
STATE_GameOver.prototype.go = function(keyCode, isRepeat, initialize)
{
    if(initialize)
    {
        this.step = 0;
    }
    
    var player = Game.player;
    var showCompleted = false;
    
    switch(this.step)
    {
        case 0:
            Game.stopTimer();
            GFX.cls();
            GFX.writeText("GAME  OVER", 8, 12);
            GFX.writeText(Game.getTimeString(), 15, 15);
            Sound.playSound(Sounds.GameOver);
            this.step += 1;
            break;
        case 1:
            setTimeout(function(self){ self.step += 1; }, 300, this);
            this.step += 1;
            return GameStates.NoChange;
            break;
        case 2:
            // wait for timeout
            return GameStates.NoChange;
            break;
        case 3:
            if(keyCode && !isRepeat)
            {
                GFX.cls();
                Sound.stopSound(Sounds.GameOver);
                Sound.playSound(Sounds.Meatloaf);
                setTimeout(function(self){ self.step += 1 }, 1000, this);
                this.step += 1;
            }
            return GameStates.NoChange;
            break;
        case 4:
            // wait for timeout
            return GameStates.NoChange;
            break;
        case 5:
            //if(player.hasItem(Inventory.endToken))
            //{
            //    showCompleted = true;
            //    this.step += 1;
            //}
            //else
            //{
                this.step = 0;
                return GameStates.Reset;
            //}
            break;
        case 6:
            if(keyCode != 0)
            {
                GFX.cls();
                Sound.playSound(Sounds.Meatloaf);
                setTimeout(function(self){ self.step += 1 }, 1000, this);
                this.step += 1;
            }
            return GameStates.NoChange;
            break;
         case 7:
            // wait for timeout
            return GameStates.NoChange;
            break;
         case 8:
            this.step = 0;
            return GameStates.Reset;
            break;
    }
    
    if(showCompleted)
    {
        var itemsFound = 0; //(player.inv.goldenDove + player.inv.supremeEye + player.inv.crystalSnake);
        if(itemsFound == 3)
        {
            GFX.cls();
            GFX.writeText("CONGRATULATIONS!", 4, 15);
            GFX.writeText("You found all the secret items", 6, 15);
            
            Sprites.drawSprite(18, 7, GOLDENDOVE);
            Sprites.drawSprite(18, 12, SUPREMEEYE);
            Sprites.drawSprite(18, 17, CRYSTALSNAKE);
            
            if(Game.seconds >= 300)
            {
                GFX.writeText("Now find them all in under 5 minutes!", 23, 15);
                Sound.playSound(Sounds.Forgot);
            }
            else
            {
                GFX.writeText("Thanks for playing!", 23, 15);
                Sound.playSound(Sounds.Start);
            }
        }
        else
        {
            GFX.cls();
            GFX.writeText("You forgot something", 4, 15);
            
            //if(player.inv.goldenDove == 0)
            //{
            //    Sprites.drawSpriteXY(18, 7, SpriteIds.GOLDENDOVE);
            //    GFX.color(14); GFX.locate(9, 3); GFX.print("Golden Dove");
            //}
            //if(player.inv.supremeEye == 0)
            //{
            //    Sprites.drawSpriteXY(18, 12, SpriteIds.SUPREMEEYE);
            //    GFX.color(9); GFX.locate(14, 3); GFX.print("Supreme Eye");
            //}
            //if(player.inv.crystalSnake == 0)
            //{
            //    Sprites.drawSpriteXY(18, 17, SpriteIds.CRYSTALSNAKE);
            //    GFX.color(10); GFX.locate(19, 3); GFX.print("Crystal Snake");
            //}
            
            if(itemsFound == 2)
            {
                GFX.writeText("Find this item next time", 23, 15);
            }
            else
            {
                GFX.writeText("Find these items next time", 23, 15);
            }
            Sound.playSound(Sounds.Forgot);
        }
    }
    
    return GameStates.NoChange;
}

function FLASH(delay, interval, repeat)
{
    delay    = (typeof(delay   ) == "undefined") ? 500 : ((delay === null   ) ? 500 : delay   );
    interval = (typeof(interval) == "undefined") ?  33 : ((interval === null) ?  33 : interval);
    repeat   = (typeof(repeat  ) == "undefined") ?   8 : ((repeat === null  ) ?   8 : repeat  );
    
    for(var i = 0; i < repeat; i++)
    {
        setTimeout(function(){ GFX.cls(null, 15) }, delay); delay += interval;
        setTimeout(function(){ GFX.cls(null,  4) }, delay); delay += interval;
        setTimeout(function(){ GFX.cls(null, 15) }, delay); delay += interval;
        setTimeout(function(){ GFX.cls(null,  0) }, delay); delay += interval*2;
    }
    return (delay - interval*2);
}

function SYSTEM_Init()
{
    GFX.init('gfxtable');
    Input.init('gamewindow');
    Game.init(Input);
    Sprites.init(GFX)
    DATA_LoadSprites();
}

function DATA_LoadSprites()
{
    var r = 0;
    var n = 0;
    while(typeof(data.sprites[r]) !== 'undefined')
    {
        var sprite = new SpriteType();
        for(var y = 0; y < 5; y++)
        {
            var row = data.sprites[r]; r += 1;
            sprite.rows[y] = new SpriteRow();
            sprite.rows[y].data       = row[0];
            sprite.rows[y].color      = row[1];
            sprite.rows[y].background = row[2];
        }
        Sprites.sprites[n] = sprite; n += 1;
    }
}

function DATA_LoadSounds()
{
    Sound.setSoundPath("sound/");
    Sounds.Blocked     = Sound.addSound("blocked.mp3");
    Sounds.DoorBlocked = Sound.addSound("blocked2.mp3");
    Sounds.PushWall    = Sound.addSound("push.mp3");
    Sounds.PickupKey   = Sound.addSound("key.mp3");
    Sounds.GameOver    = Sound.addSound("gameover.mp3");
    Sounds.Flash       = Sound.addSound("flash.mp3");
    Sounds.Reveal      = Sound.addSound("reveal.mp3");
    Sounds.Reveal2     = Sound.addSound("reveal2.mp3");
    Sounds.Unlock      = Sound.addSound("unlock.mp3");
    Sounds.Bonus       = Sound.addSound("bonus.mp3");
    Sounds.LightSwitch = Sound.addSound("switch0.mp3");
    Sounds.BombTick    = Sound.addSound("bombtick.wav");
    Sounds.Ignite      = Sound.addSound("switch1.mp3");
    Sounds.Notice      = Sound.addSound("notice.mp3");
    Sounds.Forgot      = Sound.addSound("forgot.mp3");
    Sounds.Meatloaf    = Sound.addSound("meatloaf.mp3");
    Sounds.Respawn     = Sound.addSound("respawn.mp3");
    Sounds.Move        = Sound.addSound("move.mp3");
    Sounds.Title       = Sound.addSound("title.mp3");
    Sounds.Chirp       = Sound.addSound("chirp.wav");
    Sounds.Chop        = Sound.addSound("chop.wav");
    Sounds.Select      = Sound.addSound("select.wav");
    Sounds.EnterCave   = Sound.addSound("enter3.wav");
    Sounds.Point       = Sound.addSound("point.wav");
    Sounds.Mystery     = Sound.addSound("mystery.wav");
    
    Sounds.Start       = Sound.addSound("start.mp3");
    Sounds.Enter       = Sound.addSound("enter.mp3");
}

function DATA_LoadMap()
{
    var translate = {
        " ": SpriteIds.EMPTYSPACE,
        "@": SpriteIds.CATLOAF,
        "#": SpriteIds.CAVEWALL,
        "%": SpriteIds.MOSSYWALL,
        "D": SpriteIds.DOORGOLD,
        "d": SpriteIds.DOORSILVER,
        "K": SpriteIds.KEYGOLD,
        "e": SpriteIds.NORTHCAVEDOOR,
        "T": SpriteIds.TRAP,
        "P": SpriteIds.BRICKWALL,
        "F": SpriteIds.FENCE,
        "t": SpriteIds.TREE,
        "L": SpriteIds.LOG,
        "Q": SpriteIds.BEAMTRAPON,
        "q": SpriteIds.BEAMTRAPOFF,
        "l": SpriteIds.LOGWALL,
        "h": SpriteIds.LOGWALL+1,
        "m": SpriteIds.LOGWALL+2,
        "n": SpriteIds.LOGWALL+3,
        "o": SpriteIds.LOGWALL+4,
        "X": SpriteIds.PUSHSTOP,
        "x": SpriteIds.BRICKWALLPSH,
        "M": SpriteIds.MIRROR,
        "?": SpriteIds.RANDOMTELEPORT,
        "k": SpriteIds.CHICKEN,
        "V": SpriteIds.VILLAGER,
        "v": SpriteIds.VILLAGER2,
        "U": SpriteIds.VILLAGER3,
        "C": SpriteIds.CAPTIVE,
        "S": SpriteIds.SPIDER,
        "W": SpriteIds.SPIDERWEB,
        "~": SpriteIds.WATER,
        "g": SpriteIds.CHICKENEGG,
        "G": SpriteIds.TREASURECHEST,
        "H": SpriteIds.TREASURECHEST,
        "a": SpriteIds.CAVESOUND,
        ">": SpriteIds.LIGHTLEFT,
        "<": SpriteIds.LIGHTRIGHT,
        ".": SpriteIds.LIGHTCENTER,
        "}": SpriteIds.LIGHTLEFT2,
        "{": SpriteIds.LIGHTRIGHT2,
        "&": SpriteIds.LIGHTCENTER2,
        "*": SpriteIds.LIGHTCENTER3,
        //"o": SpriteIds.RING,
        "$": SpriteIds.GOLD,
        "B": SpriteIds.BLACKSMITH,
        "b": SpriteIds.ANVIL,
        "1": SpriteIds.WALL1,
        "2": SpriteIds.WALL2,
        "3": SpriteIds.WALL3,
        "4": SpriteIds.PUSH1,
        "5": SpriteIds.PUSH2,
        "6": SpriteIds.PUSH3,
        "R": SpriteIds.BEAMGUN,
        "r": SpriteIds.BEAMTRIGGER,
        "I": SpriteIds.ICEWALL,
        "J": SpriteIds.ICEPUSHWALL,
        "i": SpriteIds.LAVAWALL,
        "j": SpriteIds.LAVAPUSHWALL,
        "Y": SpriteIds.DEADTREE,
        "7": SpriteIds.NORTHCAVESIGN,
        "8": SpriteIds.SIGNSOUTHCAVE,
        "9": SpriteIds.FORESTSIGN,
        "E": SpriteIds.LIBRARY,
        "'": SpriteIds.LIGHTDIRT,
        ",": SpriteIds.MEDIUMDIRT,
        //"+": SpriteIds.HEAVYDIRT,
        //"-": SpriteIds.RUBY,
        //"_": SpriteIds.AMETHYST,
        //"=": SpriteIds.TOPAZ,
        "u": SpriteIds.PICTURESWITCHOFF,
        "!": SpriteIds.STONEWALL,
        "~": SpriteIds.STONEWALL2,
        "0": SpriteIds.STONEWALLSIGN,
        "z": SpriteIds.GRAVEYARDFENCE,
        "Z": SpriteIds.GRAVESTONE,
        "^": SpriteIds.SHOVELREPAIR+1,
        "N": SpriteIds.LIBRARYLAMP,
        "[": SpriteIds.TENTLEFT,
        "]": SpriteIds.TENTRIGHT,
        "f": SpriteIds.CAMPFIRE,
        //"|": SpriteIds.VERTICALDOOR,
        //"=": SpriteIds.HORIZONTALDOOR,
        //"+": SpriteIds.VERTICALTOUCH,
        //"-": SpriteIds.HORIZONTALTOUCH,
        ")": SpriteIds.LOGRIGHT,
        "(": SpriteIds.LOGLEFT,
        "a": SpriteIds.BOULDER,
        "w": SpriteIds.BRONZEKEY,
        "y": SpriteIds.BRONZEDOOR,
        "+": SpriteIds.TREASURECHEST,
        "-": SpriteIds.TREASURECHEST,
        "=": SpriteIds.GATEDOOR,
        "`": SpriteIds.BOSS,
        "?": SpriteIds.BOSS+3,
        ":": SpriteIds.BOSS+5,
        ";": SpriteIds.BOSS+6,
        "\"": SpriteIds.BOSS+7,
        "/": SpriteIds.BOSS+8,
        "H": SpriteIds.BOSS+9, // H used for crank chest
        "c": SpriteIds.BOSS+10,
        "g": SpriteIds.BOSS+11,
        "O": SpriteIds.BOSS+12,
        "|": SpriteIds.STATUE,
        "s": SpriteIds.TIMEDOOR,
        "p": SpriteIds.TIMEDOORTRIGGER,
        "A": SpriteIds.TIMEDOORDISABLE,
        //"*": SpriteIds.SAVEPOINT,
    };
    
    var doors = "BZz?Le=)y";
    var skipMap = "@";
    var passable = "}*&{>*<^TK$-+Qqw+pA";
    var pushable = "xJj456a|";
    var killable = "kVvUCW";
    var diggable = "',";
    var undergrass = "_";
    var mirror = "M";
    
    passable = passable.concat(diggable);
    passable = passable.concat(undergrass);
    
    Map.init(64, 60, SpriteIds.CAVEWALL);
    var numRooms = parseInt(Map.width/8)*parseInt(Map.height/5);
    for(var i = 0; i < numRooms; i++)
    {
        RoomsRevealed[i] = false;
    }
    
    var captives = 0;
    for(var y = 0; y < Map.height; y++) {
        var row = data.map[y];
        for(var x = 0; x < Map.width; x++) {
            var s = row.substring(x, x+1);
            var spriteId = translate[s];
            if(doors.indexOf(s) >= 0)
            {
                if(spriteId == SpriteIds.LOG)
                {
                    Map.addDoor(x, y, spriteId, SpriteIds.LIGHTCENTER);
                    spriteId = SpriteIds.LIGHTCENTER;
                }
                else
                {
                    Map.addDoor(x, y, spriteId);
                }
            }
            if(pushable.indexOf(s) >= 0)
            {
                Map.setPushable(x, y);
            }
            if(killable.indexOf(s) >= 0)
            {
                Map.setKillable(x, y);
            }
            if(diggable.indexOf(s) >= 0)
            {
                Map.setDiggable(x, y);
            }
            if(mirror.indexOf(s) >= 0)
            {
                Map.setMirror(x, y);
            }
            if(undergrass.indexOf(s) >= 0)
            {
                Map.setBuried(x, y, spriteId);
                Map.setDiggable(x, y);
                spriteId = SpriteIds.HEAVYDIRT;
            }
            if(skipMap.indexOf(s) >= 0)
            {
                Map.set(x, y, SpriteIds.EMPTYSPACE);
                Map.setPassable(x, y);
            }
            else
            {
                Map.set(x, y, spriteId);
                if(SPRITE_IsEmpty(spriteId) || passable.indexOf(s) >= 0)
                {
                    Map.setPassable(x, y);
                }
                else
                {
                    Map.setPassable(x, y, false);
                }
            }
            switch(spriteId)
            {
                case SpriteIds.CATLOAF:
                    var startX = (x % 8);
                    var startY = (y % 5);
                    Game.initPlayer(startX, startY, Constants.StartLife, Constants.StartLives);
                    Game.player.addItem(SpriteIds.SWORD);
                    Game.player.addItem(SpriteIds.SWORDHP, 7, true);
                    Game.player.addItem(SpriteIds.SHOVEL);
                    Game.player.addItem(SpriteIds.SHOVELHP, 9, true);
                    Game.player.addItem(SpriteIds.GOLD, 30);
                    Game.player.addItem(SpriteIds.KEYGOLD);
                    Game.player.addItem(SpriteIds.BOMB, 3);
                    Game.player.addItem(SpriteIds.CRANKUP, 1);
                    Game.player.addItem(SpriteIds.KEYSILVER);
                    Game.player.addItem(SpriteIds.ENCHANTEDSWORD);
                    Game.player.addItemCallback = PLAYER_AddItem;
                    Game.player.selectedItem = SpriteIds.SWORD;
                    Game.player.gridX = parseInt(x / 8) * 8;
                    Game.player.gridY = parseInt(y / 5) * 5;
                    
                    RoomsRevealed[Map.getRoomId()] = true;
                    break;
                case SpriteIds.PUSHBOULDER:
                    Game.setVar(GameVars.PUSHBOULDERX, x);
                    Game.setVar(GameVars.PUSHBOULDERY, y);
                    Game.setVar(GameVars.PUSHBOULDERSTARTX, x);
                    Game.setVar(GameVars.PUSHBOULDERSTARTY, y);
                    Game.setVar(GameVars.PUSHBOULDERPUSHED, false);
                    Game.setVar(GameVars.PUSHBOULDERCOMPLETE, false);
                    break;
                case SpriteIds.BEAMGUN:
                    Game.setVar(GameVars.BEAMGUNX, x);
                    Game.setVar(GameVars.BEAMGUNY, y);
                    break;
                case SpriteIds.RESETDISABLED:
                    Game.setVar(GameVars.RESETX, x);
                    Game.setVar(GameVars.RESETY, y);
                    Game.setVar(GameVars.RESETENABLED, false);
                    break;
                case SpriteIds.CAPTIVE:
                    captives += 1;
                    break;
                case SpriteIds.BLACKSMITH:
                    Game.blacksmith = new PlayerType(x, y, 100, 1);
                    Game.blacksmith.addItem(SpriteIds.BOMB      , 3, false, {price:  30, name: "Bomb"});
                    Game.blacksmith.addItem(SpriteIds.KEYSILVER , 1, false, {price: 100, name: "Silver Key"});
                    Game.blacksmith.addItem(SpriteIds.SHOVEL    , 1, false, {price: 500, name: "Shovel"});
                    break;
                case SpriteIds.LOGFRAME1:
                case SpriteIds.LOGFRAME2:
                case SpriteIds.LOGFRAME3:
                    var door = Map.addDoor(x, y, spriteId, SpriteIds.BEHINDPICTURE);
                    Map.setBuried(x, y, SpriteIds.TOPAZ);
                    door.open.passable = false;
                    door.open.showBuried = true;
                    Map.addDoor(x-1, y, spriteId, SpriteIds.LOGWALL);
                    Map.toggleDoorAt(x-1, y);
                    break;
                case SpriteIds.TIMEDOOR:
                    Map.addDoor(x, y, spriteId, SpriteIds.EMPTYSPACE);
                    Map.toggleDoorAt(x, y);
                    break;
            }
            switch(s)
            {
                case "G":
                    Map.setBuried(x, y, SpriteIds.GOLDBAR);
                    break;
                case "H":
                    Map.setBuried(x, y, SpriteIds.CRANKUP);
                    break;
                case "+":
                    Map.setBuried(x, y, SpriteIds.GATEKEY);
                    break;
                case "-":
                    Map.setBuried(x, y, SpriteIds.ENCHANTEDSWORD);
                    break;
            }
        }
    }
    Game.setVar(GameVars.CAPTIVES, captives);
    
    for(var y = 0; y < Map.height; y++) {
        for(var x = 0; x < Map.width; x++) {
            var spriteId = Map.get(x, y);
            switch(spriteId)
            {
                case SpriteIds.WALL1:
                    Map.set(x+1, y, SpriteIds.SOLVEWALL1);
                    break;
                case SpriteIds.WALL2:
                    Map.set(x+1, y, SpriteIds.SOLVEWALL2);
                    break;
                case SpriteIds.WALL3:
                    Map.set(x+1, y, SpriteIds.SOLVEWALL3);
                    break;
                case SpriteIds.VERTICALDOOR:
                case SpriteIds.HORIZONTALDOOR:
                    Map.toggleDoorAt(x, y);
                    break;
            }
        }
    }
    //for(var y = 0; y < Map.height; y += 1) {
    //    for(var x = 7; x < Map.width-9; x += 8) {
    //        if(Map.get(x, y) == SpriteIds.EMPTYSPACE && Map.isPassable(x+0, y) && !Map.isPassable(x+1, y))
    //        {
    //            Map.set(x, y, SpriteIds.BLOCKEDRIGHT);
    //        }
    //        if(Map.get(x+1, y) == SpriteIds.EMPTYSPACE && Map.isPassable(x+1, y) && !Map.isPassable(x+0, y))
    //        {
    //            Map.set(x+1, y, SpriteIds.BLOCKEDLEFT);
    //        }
    //    }
    //}
    //for(var y = 4; y < Map.height-6; y += 5) {
    //    for(var x = 0; x < Map.width; x += 1) {
    //        if(Map.get(x, y) == SpriteIds.EMPTYSPACE && Map.isPassable(x, y+0) && !Map.isPassable(x, y+1))
    //        {
    //            Map.set(x, y, SpriteIds.BLOCKEDBOTTOM);
    //        }
    //        if(Map.get(x, y+1) == SpriteIds.EMPTYSPACE && Map.isPassable(x, y+1) && !Map.isPassable(x, y+0))
    //        {
    //            Map.set(x, y+1, SpriteIds.BLOCKEDTOP);
    //        }
    //    }
    //}
}

function TEXT_Repeat(ch, count)
{
    var string = "";
    for(var i = 0; i < count; i++)
    {
        string += ch;
    }
    return string;
}

function BuildTable()
{
    var table = document.getElementById("gfxtable");
    for(var y = 0; y < 25; y++) {
        var tr = document.createElement("DIV");
        tr.classList.add("tr");
        for(var x = 0; x < 40; x++) {
            var td = document.createElement("DIV");
            td.classList.add("td");
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

var loadingInterval = null;
var SoundsAreLoaded = false;
function loading()
{
    var numLoaded = 0;
    for(var i = 0; i < Sound.sounds.length; i++)
    {
        var sound = Sound.sounds[i];
        if(sound.loaded)
        {
            numLoaded += 1;
        }
    }
    var percent = parseInt((numLoaded / Sound.sounds.length)*100).toString()+"%";
    GFX.locate(14, 1); GFX.print(TEXT_Repeat(" ", 40)); GFX.writeText("Loading..."+percent, 12, 15);
    
    if(numLoaded == Sound.sounds.length)
    {
        clearInterval(loadingInterval);
        SoundsAreLoaded   = true;
        Game.unpause();
    }
}

function init()
{
    SYSTEM_Init();
    BuildTable();
    Game.state = GameStates.MainMenu;
    Game.setMain(MAIN);
    Game.pause();
    DRAW_MainMenu();
    
    Input.addButtonKey("moveUp"   , KeyCodes.up    );
    Input.addButtonKey("moveLeft" , KeyCodes.left  );
    Input.addButtonKey("moveDown" , KeyCodes.down  );
    Input.addButtonKey("moveRight", KeyCodes.right );
    Input.addButtonKey("inv"      , KeyCodes.space );
    Input.addButtonKey("help"     , KeyCodes.H     );
    Input.addButtonKey("yes"      , KeyCodes.Y     );
    Input.addButtonKey("no"       , KeyCodes.N     );
    Input.addButtonKey("escape"   , KeyCodes.escape);
    
    document.getElementById("play").addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById("overlay").classList.add("hidden");
        document.getElementById("play-container").classList.add("hidden");
        if(!SoundsAreLoaded)
        {
            GFX.cls();
            loadingInterval = setInterval(loading, 100);
            DATA_LoadSounds();
        }
        else
        {
            Game.unpause();
        }
    });
    window.addEventListener("blur", function(event){
        event.preventDefault();
        document.getElementById("overlay").classList.remove("hidden");
        document.getElementById("play-container").classList.remove("hidden");
        Game.pause();
    });
}

if(document.readyState !== "loading")
{
    init();
}
else
{
    document.addEventListener("DOMContentLoaded", function(event){
        init();
    });
}
