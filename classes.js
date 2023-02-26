// creation of class so that player could move
class Sprite {
    constructor({ position, image , frames = {max:1}  , sprites}) {
        this.position = position;
        this.image = image;
        // this is done in order to add moving animation as there are four characters bundled together
        this.frames = {...frames , val:0 , elapsed:0}

        this.image.onload = () =>{
            this.width = this.image.width/this.frames.max
            this.heigth = this.image.height

        }
        this.moving = false;
        this.sprites = sprites;
    }

    draw() { // this method is used to draw the bg image which was done earlier statically
        
        context.drawImage(
            this.image,
            // the below 4 line are about cropping image
            this.frames.val * this.width, // x position of the image from where to crop
            0,
            this.image.width / this.frames.max,
            this.image.height,
            // these are the placing of the image
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        );
if(this.moving){
    if(this.frames.max > 1)
    {
        this.frames.elapsed+=1;
    }
    if(this.frames.elapsed % 10 === 0)
    {
        // we need this value till 3 as the next image when multiplied will be empty space
        if(this.frames.val < this.frames.max -1 )
        {

            this.frames.val++;
        }
        else
        {
            this.frames.val = 0;
        }
    }
}

        

    }
}

class boundary{
    static width = 66;
    static height = 66;
    constructor({position}){
        this.position = position;
        this.width = 66;
        this.height = 66;
    }
    draw()
    {
        context.fillStyle = "rgba(255,0,0,0)";
        context.fillRect(this.position.x , this.position.y , this.width , this.height);
    }
}