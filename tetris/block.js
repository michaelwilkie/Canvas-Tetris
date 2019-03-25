class Block extends Entity
{
    constructor(x, y, parent)
    {
        super(x, y, 32, 32, "block.png", [0]);
        this.isPlaced = false;
        this.parent = parent;
        this.moveDownAmt = 0;
    }
    // Working around JavaScript's garbage collection scheme by removing this entity from ALL lists so it can be removed
    makeOrphan()
    {
        for (var i = 0; i < this.parent.blocklist.length; i++)
        {
            if (this.parent.blocklist[i] == this)
            {
                this.parent.removeChild(this);
                this.parent = null;
                this.killSelf();
                break;
            }
        }
    }
}