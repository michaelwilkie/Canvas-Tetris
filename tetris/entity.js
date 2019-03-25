class Entity
{
    constructor(x, y, w, h, imgsrc, framelist)
    {
        this.pos = {x: x, y: y};
        this.vel = {x: 0, y: 0};
        this.w = w;
        this.h = h;
        this.noCollide = false;
        
        // Images are used for visible entities
        if (imgsrc != null)
        {
            this.img = new Image();
            this.img.src = imgsrc;
        }
        this.frame = 0;
        this.framelist = framelist;
        this.updateframe = 0;
        this.animfinished = false;
    }
    draw()
    {
        ctx.drawImage(this.img, this.framelist[this.frame] * this.w, 0, this.w, this.h, this.pos.x * ScreenXScale, this.pos.y * ScreenYScale, this.w, this.h);
    }
    update()
    {
        this.pos.x+=this.vel.x;
        this.pos.y+=this.vel.y;
    }
    killSelf()
    {
        for (var i = 0; i < entlist.length; i++)
            if (this == entlist[i])
                entlist.splice(i, 1);
    }
    resetAnim()
    {
        this.frame = 0;
    }
}