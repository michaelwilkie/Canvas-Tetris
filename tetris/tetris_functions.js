var ScreenXScale = 32;
var ScreenYScale = 32;

var scorebrd = null;

var entlist = [];
var current_powerups = 0;
var gameoptions =
{
    time: 0,
    max_powerups: 1 ,
    board_width : 15,
    board_height: 18
};
var nextupdate = gameoptions.time + 50;
var nextkey = gameoptions.time + 5;

function getRandomNumber(lower, upper)
{
    return Math.floor((Math.random() * (upper - lower)) + lower);
}
function drawRectangle(x, y, h, w)
{
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#FF0000";
	drawLine(x    , y    , x    , y + w);     //    1--------2   1 x    , y
	drawLine(x    , y    , x + h, y    );     //    |        |   2 x    , y + w
	drawLine(x + h, y    , x + h, y + w);     //    |        |   3 x + h, y
	drawLine(x    , y + w, x + h, y + w);     //    3--------4   4 x + h, y + w

}
function drawLine(srcx, srcy, destx, desty)
{
	ctx.beginPath();
	ctx.moveTo(srcx,srcy);
	ctx.lineTo(destx, desty);
	ctx.stroke();
}
class ScoreBoard
{
    constructor()
    {
        this.score = 0;
    }
    display()
    {
        var score = this.score;
       
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
 
        ctx.fillText(score, canvas.width/2 - ctx.measureText(score).width/2, 50);
        
        drawRectangle(0, 0, gameoptions.board_width * ScreenXScale, gameoptions.board_height * ScreenYScale);        
    }
}


var BlockEnum = 
{
    Ltype: "L",
    Rtype: "r",
    Ttype: "T",
    Stype: "S",
    Ztype: "Z",
    Itype: "I",
    Btype: "O"
}

var RotationAmt =
{
    x1: 0,
    x2: 1,
    x3: 2,
    x4: 3
}
var SideEnum = {
    UP   : 0,
    DOWN : 1,
    RIGHT: 2,
    LEFT : 3,
    ERROR: 4
}
var SideString = [
    "up",
    "down",
    "right",
    "left",
    "error"
];
function getScoreBoard()
{
    return scorebrd;
}
function allImagesLoaded()
{
    for (var i = 0; i < entlist.length; i++)
        if (entlist[i].img != null)
            if (!entlist[i].img.complete)
                return false;
    return true;
}
// checkSide(a,b) :  return what side entity A is to entity B
//
//   +-----+ 
//   |     |   +---+
//   |  a  |   | b |
//   |     |   +---+
//   +-----+ 
//
// In this illustration, a is to the left of b
// so, in this case, the function wil return SideEnum.LEFT
//
function checkSide(a, b)
{
    if (!(a instanceof Entity))
        return SideEnum.ERROR;
    if (!(b instanceof Entity))
        return SideEnum.ERROR;
    
    if (a.pos.x + a.w > b.pos.x + b.w && a.pos.x > b.pos.x + b.w) return SideEnum.LEFT ;
    if (b.pos.x + b.w > a.pos.x + a.w && b.pos.x > a.pos.x + a.w) return SideEnum.RIGHT;
    if (a.pos.y + a.h > b.pos.y + b.h && a.pos.y > b.pos.y + b.h) return SideEnum.DOWN ;
    if (b.pos.y + b.h > a.pos.y + a.h && b.pos.y > a.pos.y + a.h) return SideEnum.UP   ;
    
    return SideEnum.ERROR;
}
function checkCollision(a, b)
{
    if (!(a instanceof Entity))
        return false;
    if (!(b instanceof Entity))
        return false;

    return a.pos.x == b.pos.x && a.pos.y == b.pos.y && b.isPlaced;        
}
function getRandomShapeType()
{
    switch(getRandomNumber(0, 7))
    {
        case 0: { return BlockEnum.Rtype ;}
        case 1: { return BlockEnum.Ltype ;}
        case 2: { return BlockEnum.Stype ;}
        case 3: { return BlockEnum.Ztype ;}
        case 4: { return BlockEnum.Ttype ;}
        case 5: { return BlockEnum.Itype ;}
        case 6: { return BlockEnum.Btype ;}
        default:{ return BlockEnum.error ;}
    }
}
function createShape(type, x, y)
{
    var ret = new Shape(type, x, y);
    entlist.push(ret);
    return ret;
}
Array.prototype.removeIf = function(callback) {
    var i = this.length;
    while (i--) {
        if (callback(this[i])) {
            this.splice(i, 1);
        }
    }
};
function rowFull(arr)
{
    var sum = 0;
    for (var i = 0; i < arr.length; i++)
    {
        sum += arr[i];
    }
    return sum >= gameoptions.board_width;
}
function checkLineCompleted()
{
    var checklist = [];
    var ylist = [];
    for (var i = 0; i < gameoptions.board_height; i++)
    {
        var templist = [];
        for (var j = 0; j < gameoptions.board_width; j++)
            templist.push(0);
        checklist.push(templist);
    }

    for (var i = 0; i < entlist.length; i++)
        if (!(entlist[i] instanceof Shape))
        {
            var x = Math.floor(entlist[i].pos.x);
            var y = Math.floor(entlist[i].pos.y);
            checklist[y][x]++;
        }

    for (var i = checklist.length - 1; i >= 0; i--)    
        if (rowFull(checklist[i]))
        {
            ylist.push(i);
            for (var j = 0; j < entlist.length; j++)            
                if (!(entlist[j] instanceof Shape))
                    if (entlist[j].pos.y == i)
                    {
                        entlist[j].makeOrphan();
                        j--;
                    }
        }
    ylist.sort();
    ylist.reverse();
    for (var yi = 0; yi < ylist.length; yi++)
    {
        console.log(ylist.length + " " + yi);
        var yindex = ylist[yi];
        for (var b = 0; b < entlist.length; b++)
        {
            var block = entlist[b];
            if (!(block instanceof Shape))
            {
                if (block.pos.y < yindex)
                {
                    block.moveDownAmt++;                    
                }
            }
        }  
    }
    for (var i = 0; i < entlist.length; i++)
    {
        var block = entlist[i];
        if (!(block instanceof Shape))
        {
            for (var j = 0; j < block.moveDownAmt; j++)
            {
                block.pos.y++;
            }
            block.moveDownAmt = 0;
        }
    }

}
var bOnce = false; // for key presses affecting how blocks fall down
var selectedShape;
var nextShape;
$(document).ready(function () 
{
    var canvas = $("#myCanvas")[0];
    var ctx = $("#myCanvas")[0].getContext("2d");
    var Fps = 60;
    
    scorebrd = new ScoreBoard();
    //nextShape = createShape(getRandomShapeType());
    selectedShape = createShape(getRandomShapeType(), Math.floor(gameoptions.board_width/2), 2);
    //selectedShape.initializeShape(Math.floor(gameoptions.board_width/2), 2);
    var game = setInterval(function ()
    {
        ctx.clearRect(0,0,cw,cw);

        if (!imagesLoaded)
            imagesLoaded = allImagesLoaded();
        else
        {
            if (gameoptions.time > nextkey)
            {
                if (isEPressed) selectedShape.rotateRight();                
                if (isQPressed) selectedShape.rotateLeft();
                if (isDownArrowPressed)
                    if (selectedShape.lowestBlock.pos.y + 1 < gameoptions.board_height)
                    {
                        var collided = false;
                        for (var j = 0; j < selectedShape.blocklist.length; j++)
                            selectedShape.blocklist[j].pos.y++;
                        
                        for (var i = 0; i < entlist.length; i++)
                            for (var j = 0; j < selectedShape.blocklist.length; j++)
                                if (checkCollision(selectedShape.blocklist[j], entlist[i]))
                                    collided = true;
                                
                        if (collided)
                            for (var j = 0; j < selectedShape.blocklist.length; j++)
                                selectedShape.blocklist[j].pos.y--;
                    }
                
                if (isLeftArrowPressed)
                {
                    var collided = false;
                    if (selectedShape.lowestBlock.pos.x > 0 && selectedShape.middleBlock.pos.x > 0 && selectedShape.otherBlock1.pos.x > 0 && selectedShape.otherBlock2.pos.x > 0)
                    {
                        for (var j = 0; j < selectedShape.blocklist.length; j++)
                            selectedShape.blocklist[j].pos.x--;

                        for (var i = 0; i < entlist.length; i++)
                            for (var j = 0; j < selectedShape.blocklist.length; j++)
                                if (checkCollision(selectedShape.blocklist[j], entlist[i]))
                                    collided = true;

                        if (collided)
                            for (var j = 0; j < selectedShape.blocklist.length; j++)
                                selectedShape.blocklist[j].pos.x++;
                    }
                }
                if (isRightArrowPressed)
                {
                    var max = gameoptions.board_width - 1;
                    var collided = false;
                    if (selectedShape.lowestBlock.pos.x < max && selectedShape.middleBlock.pos.x < max && selectedShape.otherBlock1.pos.x < max && selectedShape.otherBlock2.pos.x < max)
                    {
                        for (var j = 0; j < selectedShape.blocklist.length; j++)
                            selectedShape.blocklist[j].pos.x++;
                        
                        for (var i = 0; i < entlist.length; i++)
                            for (var j = 0; j < selectedShape.blocklist.length; j++)
                               if (checkCollision(selectedShape.blocklist[j], entlist[i]))
                                   collided = true;
                        
                        if (collided)
                            for (var j = 0; j < selectedShape.blocklist.length; j++)
                                selectedShape.blocklist[j].pos.x--;                    
                    }
                }
                
                if (isRightArrowPressed || isDownArrowPressed || isLeftArrowPressed || isUpArrowPressed || isEPressed || isQPressed)
                {
                    nextkey = gameoptions.time + 5;
                    if (!bOnce)
                    {
                        nextupdate = gameoptions.time + 50;
                        bOnce = true;
                    }
                }
            }
            
            for (var i = 0; i < entlist.length; i++)
            {                
                entlist[i].draw();                
                if (gameoptions.time > nextupdate)    
                {                    
                    entlist[i].update();
                }   
            }
            if (selectedShape.allBlocksPlaced)
            {
                //selectedShape = nextShape;
                //selectedShape.initializeShape(Math.floor(gameoptions.board_width/2), 2);
                selectedShape = createShape(getRandomShapeType(), Math.floor(gameoptions.board_width/2), 2);
                //nextShape = createShape(getRandomShapeType());
                checkLineCompleted();
            }
            scorebrd.display();
            if (gameoptions.time > nextupdate)
            {                
                nextupdate = gameoptions.time + 50;
                bOnce = false;
            }
        
            gameoptions.time++;
        }
    }, 1000 / Fps);
});
 
var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
} 

var canvas = document.getElementById('myCanvas'),
            cw = canvas.width,
            ch = canvas.height,
            ctx = canvas.getContext('2d'),
            fps = 60,
            bX = 30,
            bY = 30,
            mX = 10,
            mY = 20;
var imagesLoaded = false;
 
var isLeftArrowPressed  = false; var prevLeftArrow  = false;
var isRightArrowPressed = false; var prevRightArrow = false;
var isUpArrowPressed    = false; var prevUpArrow    = false;
var isDownArrowPressed  = false; var prevDownArrow  = false;

var isQPressed = false;
var isEPressed = false;
 
window.onkeydown = function(e)
{
    var key = e.keyCode ? e.keyCode : e.which;
    switch(key)
    {
        case 37: { isLeftArrowPressed  = true; break; }
        case 38: { isUpArrowPressed    = true; break; }
        case 39: { isRightArrowPressed = true; break; }
        case 40: { isDownArrowPressed  = true; break; }
        case 69: { selectedShape.rotateRight();/*isEPressed          = true;*/ break; }
        case 81: { selectedShape.rotateLeft ();/*isQPressed          = true;*/ break; }        
    }
}
 
window.onkeyup = function(e)
{
    var key = e.keyCode ? e.keyCode : e.which;
    switch(key)
    {
        case 37: { isLeftArrowPressed  = false; break; }
        case 38: { isUpArrowPressed    = false; break; }
        case 39: { isRightArrowPressed = false; break; }
        case 40: { isDownArrowPressed  = false; break; }
        case 69: { isEPressed          = false; break; }
        case 81: { isQPressed          = false; break; }
    }
}