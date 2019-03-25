class Shape
{
    constructor(type, x, y)
    {        
        this.blocklist = [];
        
        this.shapeType = type;
        
        this.initializeShape(x, y);
        
        this.blocklist.push(this.lowestBlock);
        this.blocklist.push(this.middleBlock);
        this.blocklist.push(this.otherBlock1);
        this.blocklist.push(this.otherBlock2);
        
        this.allBlocksPlaced = false;
        
        for (var i = 0; i < this.blocklist.length; i++)
            entlist.push(this.blocklist[i]);
        
        this.rotation = RotationAmt.x1;
    }
    initializeShape(x, y)
    {
        switch(this.shapeType)
        {
            case BlockEnum.Rtype: 
            {
                this.lowestBlock = new Block(x + 1, y + 1, this);
                this.middleBlock = new Block(x    , y    , this);
                this.otherBlock1 = new Block(x - 1, y    , this);
                this.otherBlock2 = new Block(x + 1, y    , this);
                break;
            }
            case BlockEnum.Ltype: 
            {
                this.lowestBlock = new Block(x - 1, y + 1, this);
                this.middleBlock = new Block(x    , y    , this);
                this.otherBlock1 = new Block(x - 1, y    , this);
                this.otherBlock2 = new Block(x + 1, y    , this);
                break;
            }
            case BlockEnum.Ttype: 
            {
                this.lowestBlock = new Block(x    , y + 1, this);
                this.middleBlock = new Block(x    , y    , this);
                this.otherBlock1 = new Block(x - 1, y    , this);
                this.otherBlock2 = new Block(x + 1, y    , this);
                break;
            }
            case BlockEnum.Stype: 
            {
                this.lowestBlock = new Block(x + 1, y + 1, this);
                this.middleBlock = new Block(x    , y    , this);
                this.otherBlock1 = new Block(x    , y + 1, this);
                this.otherBlock2 = new Block(x - 1, y    , this);
                break;
            }
            case BlockEnum.Ztype: 
            {
                this.lowestBlock = new Block(x - 1, y + 1, this);
                this.middleBlock = new Block(x    , y    , this);
                this.otherBlock1 = new Block(x    , y + 1, this);
                this.otherBlock2 = new Block(x + 1, y    , this);
                break;
            }
            case BlockEnum.Itype: 
            {
                this.lowestBlock = new Block(x    , y + 1, this);
                this.middleBlock = new Block(x    , y    , this);
                this.otherBlock1 = new Block(x    , y - 1, this);
                this.otherBlock2 = new Block(x    , y - 2, this);
                break;
            }
            case BlockEnum.Btype:
            {
                this.lowestBlock = new Block(x    , y + 1, this);
                this.middleBlock = new Block(x    , y    , this);
                this.otherBlock1 = new Block(x + 1, y    , this);
                this.otherBlock2 = new Block(x + 1, y + 1, this);
            }
            default:
            {
                
            }
        }
    }
    removeChild(child)
    {
        if (this.middleBlock == child) this.middleBlock = null;
        if (this.lowestBlock == child) this.lowestBlock = null;
        if (this.otherBlock1 == child) this.otherBlock1 = null;
        if (this.otherBlock2 == child) this.otherBlock2 = null;
        
        for (var i = 0; i < this.blocklist.length; i++)
            if (this.blocklist[i] == child)            
                this.blocklist.splice(i, 1);
    }
    rotateRight()
    {
        switch(this.shapeType)
        {
            case BlockEnum.Rtype:
            {
                switch(this.rotation)
                {
                    case RotationAmt.x1: 
                    {  
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //                    _
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //   ______          | |
                        this.otherBlock1.pos.y = this.middleBlock.pos.y + 1; //  |____  |   -->  _| |
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //       |_|       |___|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x    ; //
                        this.rotation = RotationAmt.x2;
                        break;
                    }
                    case RotationAmt.x2:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y    ; //      _         _
                        this.lowestBlock.pos.x = this.middleBlock.pos.x + 1; //     | |       | |____ 
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //    _| |  -->  |______|
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //   |___|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x - 1; //
                        this.rotation = RotationAmt.x3;
                        break;
                    }
                    case RotationAmt.x3:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //     
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //     _            ___
                        this.otherBlock1.pos.y = this.middleBlock.pos.y - 1; //    | |____      |  _|
                        this.otherBlock1.pos.x = this.middleBlock.pos.x    ; //    |______| --> | |
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //                 |_|
                        this.otherBlock2.pos.x = this.middleBlock.pos.x + 1; //
                        this.rotation = RotationAmt.x4;
                        break;
                    }
                    case RotationAmt.x4:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //     
                        this.lowestBlock.pos.x = this.middleBlock.pos.x + 1; //     ___
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //    |  _|        ______ 
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //    | |    -->  |____  |
                        this.otherBlock2.pos.y = this.middleBlock.pos.y    ; //    |_|              |_|
                        this.otherBlock2.pos.x = this.middleBlock.pos.x + 1; // 
                        this.rotation = RotationAmt.x1;
                        break;
                    }
                }
                break;
            }
            case BlockEnum.Ltype: 
            {
                switch(this.rotation)
                {
                    case RotationAmt.x1: 
                    {  
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //     
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //               ___
                        this.otherBlock1.pos.y = this.middleBlock.pos.y - 1; //  ______      |_  |
                        this.otherBlock1.pos.x = this.middleBlock.pos.x    ; // | _____| -->   | |
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; // |_|            |_|
                        this.otherBlock2.pos.x = this.middleBlock.pos.x - 1; //
                        this.rotation = RotationAmt.x2;
                        break;
                    }
                    case RotationAmt.x2:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y    ; //  ___              _
                        this.lowestBlock.pos.x = this.middleBlock.pos.x + 1; // |_  |        ____| | 
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //   | |  -->  |______|
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //   |_|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x + 1; //
                        this.rotation = RotationAmt.x3;  
                        break;
                    }
                    case RotationAmt.x3:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //       _        _
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //  ____| |      | |
                        this.otherBlock1.pos.y = this.middleBlock.pos.y + 1; // |______|  --> | |_
                        this.otherBlock1.pos.x = this.middleBlock.pos.x + 1; //               |___|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x    ; //
                        this.rotation = RotationAmt.x4;
                        break;
                    }
                    case RotationAmt.x4:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //     
                        this.lowestBlock.pos.x = this.middleBlock.pos.x - 1; //  _
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; // | |         ______ 
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; // | |_  -->  |  ____|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y    ; // |___|      |_|
                        this.otherBlock2.pos.x = this.middleBlock.pos.x + 1; // 
                        this.rotation = RotationAmt.x1;
                        break;
                    }
                }
                break;
            }
            case BlockEnum.Ttype: 
            {
                switch(this.rotation)
                {
                    case RotationAmt.x1: 
                    {  
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //                   _
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //   _____         _| |
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //  |_   _|  -->  |_  |
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //    |_|           |_|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x    ; //
                        this.rotation = RotationAmt.x2;
                        break;
                    }
                    case RotationAmt.x2:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y    ; //      _          _
                        this.lowestBlock.pos.x = this.middleBlock.pos.x + 1; //    _| |       _| |_ 
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //   |_  | -->  |_____|
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //     |_|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x    ; //
                        this.rotation = RotationAmt.x3;
                        break;
                    }
                    case RotationAmt.x3:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //     
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //       _         _
                        this.otherBlock1.pos.y = this.middleBlock.pos.y - 1; //     _| |_      | |_
                        this.otherBlock1.pos.x = this.middleBlock.pos.x    ; //    |_____| --> |  _|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y    ; //                |_|
                        this.otherBlock2.pos.x = this.middleBlock.pos.x + 1; //
                        this.rotation = RotationAmt.x4;
                        break;
                    }
                    case RotationAmt.x4:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //     
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //     _
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //    | |_         _____ 
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //    |  _|  -->  |_   _|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y    ; //    |_|           |_|  
                        this.otherBlock2.pos.x = this.middleBlock.pos.x + 1; // 
                        this.rotation = RotationAmt.x1;
                        break;
                    }
                }
                break;
            }
            case BlockEnum.Ztype: 
            {
                switch(this.rotation)
                {
                    case RotationAmt.x1: 
                    {  
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //                 _
                        this.lowestBlock.pos.x = this.middleBlock.pos.x + 1; //     ___        | |_
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //   _|  _|  -->  |_  |
                        this.otherBlock1.pos.x = this.middleBlock.pos.x + 1; //  |___|           |_|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x    ; //
                        this.rotation = RotationAmt.x2;
                        break;
                    }
                    case RotationAmt.x2:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //    _         
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //   | |_         ___ 
                        this.otherBlock1.pos.y = this.middleBlock.pos.y + 1; //   |_  | -->  _|  _|
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //     |_|     |___|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y    ; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x + 1; //
                        this.rotation = RotationAmt.x3;
                        break;
                    }
                    case RotationAmt.x3:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //                 _
                        this.lowestBlock.pos.x = this.middleBlock.pos.x + 1; //     ___        | |_
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //   _|  _|  -->  |_  |
                        this.otherBlock1.pos.x = this.middleBlock.pos.x + 1; //  |___|           |_|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x    ; //
                        this.rotation = RotationAmt.x4;
                        break;
                    }
                    case RotationAmt.x4:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //    _         
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //   | |_         ___ 
                        this.otherBlock1.pos.y = this.middleBlock.pos.y + 1; //   |_  | -->  _|  _|
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //     |_|     |___|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y    ; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x + 1; //
                        this.rotation = RotationAmt.x1;
                        break;
                    }
                }
                break;
            }
            case BlockEnum.Stype: 
            {
                switch(this.rotation)
                {
                    case RotationAmt.x1: 
                    {  
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //                  _
                        this.lowestBlock.pos.x = this.middleBlock.pos.x - 1; //   ___          _| |
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //  |_  |_  -->  |  _|
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //    |___|      |_|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x    ; //
                        this.rotation = RotationAmt.x2;
                        break;
                    }
                    case RotationAmt.x2:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //      _         
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //    _| |      ___ 
                        this.otherBlock1.pos.y = this.middleBlock.pos.y + 1; //   |  _| --> |_  |_
                        this.otherBlock1.pos.x = this.middleBlock.pos.x + 1; //   |_|         |___|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y    ; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x - 1; //
                        this.rotation = RotationAmt.x3;
                        break;
                    }
                    case RotationAmt.x3:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //                  _
                        this.lowestBlock.pos.x = this.middleBlock.pos.x - 1; //   ___          _| |
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //  |_  |_  -->  |  _|
                        this.otherBlock1.pos.x = this.middleBlock.pos.x - 1; //    |___|      |_|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 1; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x    ; //
                        this.rotation = RotationAmt.x4;
                        break;
                    }
                    case RotationAmt.x4:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //      _         
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //    _| |      ___ 
                        this.otherBlock1.pos.y = this.middleBlock.pos.y + 1; //   |  _| --> |_  |_
                        this.otherBlock1.pos.x = this.middleBlock.pos.x + 1; //   |_|         |___|
                        this.otherBlock2.pos.y = this.middleBlock.pos.y    ; //
                        this.otherBlock2.pos.x = this.middleBlock.pos.x - 1; //
                        this.rotation = RotationAmt.x1;
                        break;
                    }
                }
                break;
            }
            case BlockEnum.Itype: 
            {
                switch(this.rotation)
                {
                    case RotationAmt.x1: 
                    {  
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //                _  
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //  ______       | |  
                        this.otherBlock1.pos.y = this.middleBlock.pos.y - 1; // |______| -->  | |  
                        this.otherBlock1.pos.x = this.middleBlock.pos.x    ; //               | |
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 2; //               |_|
                        this.otherBlock2.pos.x = this.middleBlock.pos.x    ; //
                        this.rotation = RotationAmt.x2;
                        break;
                    }
                    case RotationAmt.x2:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y    ; //    _         
                        this.lowestBlock.pos.x = this.middleBlock.pos.x + 2; //   | |      ______ 
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //   | | --> |______|
                        this.otherBlock1.pos.x = this.middleBlock.pos.x + 1; //   | |       
                        this.otherBlock2.pos.y = this.middleBlock.pos.y    ; //   |_|
                        this.otherBlock2.pos.x = this.middleBlock.pos.x - 1; //
                        this.rotation = RotationAmt.x3;
                        break;
                    }
                    case RotationAmt.x3:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y + 1; //                _  
                        this.lowestBlock.pos.x = this.middleBlock.pos.x    ; //  ______       | |  
                        this.otherBlock1.pos.y = this.middleBlock.pos.y - 1; // |______| -->  | |  
                        this.otherBlock1.pos.x = this.middleBlock.pos.x    ; //               | |
                        this.otherBlock2.pos.y = this.middleBlock.pos.y - 2; //               |_|
                        this.otherBlock2.pos.x = this.middleBlock.pos.x    ; //
                        this.rotation = RotationAmt.x4;
                        break;
                    }
                    case RotationAmt.x4:
                    {
                        this.lowestBlock.pos.y = this.middleBlock.pos.y    ; //    _         
                        this.lowestBlock.pos.x = this.middleBlock.pos.x + 2; //   | |      ______ 
                        this.otherBlock1.pos.y = this.middleBlock.pos.y    ; //   | | --> |______|
                        this.otherBlock1.pos.x = this.middleBlock.pos.x + 1; //   | |       
                        this.otherBlock2.pos.y = this.middleBlock.pos.y    ; //   |_|
                        this.otherBlock2.pos.x = this.middleBlock.pos.x - 1; //
                        this.rotation = RotationAmt.x1;
                        break;
                    }
                }
                break;
            }
            default:
            {
                
            }
        }
    }
    rotateLeft()
    {
        this.rotateRight();
        this.rotateRight();
        this.rotateRight();
    }
    draw()
    {
        for (var i = 0; i < this.blocklist.length; i++)
        {
            this.blocklist[i].draw();
        }
    }
    update()
    {
        if (this.blocklist.length == 0)
            this.killSelf();
        if (!this.allBlocksPlaced)
        {
            var collided = false;
            for (var i = 0; i < this.blocklist.length; i++)
            {
                if (!this.blocklist[i].isPlaced)
                {
                    if (this.blocklist[i].pos.y + 1 < gameoptions.board_height)
                        this.blocklist[i].pos.y++;
                    else
                    {
                        this.setAllBlocksPlaced();
                        break;
                    }
                    
                    for (var j = 0; j < entlist.length; j++)
                    {
                        if (this.blocklist[i] != entlist[j])
                        {
                            if (checkCollision(this.blocklist[i], entlist[j]))
                            {
                                collided = true;                                
                                break;
                            }
                        }
                    }
                }
            }
            if (collided)
                for (var i = 0; i < this.blocklist.length; i++)
                {
                    this.blocklist[i].pos.y--;
                    this.setAllBlocksPlaced();
                }
        }
        
    }
    setAllBlocksPlaced()
    {
        this.allBlocksPlaced = true;
        for (var i = 0; i < this.blocklist.length; i++)
        {
            this.blocklist[i].isPlaced = true;
        }
    }
    killSelf()
    {        
        for (var i = 0; i < entlist.length; i++)
        {
            for (var j = 0; j < this.blocklist.length; j++)
            {
                if (this.blocklist[j] == entlist[i])
                {
                    this.blocklist.splice(j, 1);
                    entlist.splice(i, 1);
                }
            }
        }
        for (var i = 0; i < entlist.length; i++)
        {
            if (this == entlist[i])
            {
                entlist.splice(i, 1);
            }
        }
    }
}