

const collisionMap = [];
const canvas = document.querySelector("canvas");
// getCOntext is used to get what type of image you want ie 2d or 3d
const context = canvas.getContext("2d");

// desktop size
canvas.width = 1324
canvas.height = 676

// now we are going to add collision 
// the methos here is to create an array and store the positions where the player doesnt wants to go
// the entire collision dataset has 70 tiles width
// here we will iterate throught the loop of 70 step count

for(let i=0;i<collision.length;i+=70)
{
    let map =collision.slice(i,70+i);
    collisionMap.push(map);
}

// now rendering the collision root dataset



// now we are going to collect the red areas marked in the tilled in the array
const boundaries = [];

const offset = {
    x: -1330,
    y: -820
}
// here the row and symbol are arbitary names and the i , j are marked to store it in the array
collisionMap.forEach((row , i) =>{
    row.forEach((symbol , j) =>{
        if(symbol === 1025)
        {
            boundaries.push(
                new boundary({
                    position: {
                        x: j * boundary.width + offset.x,
                        y: i * boundary.height + offset.y
                    }
                })
            )
        }
    })
})

// creates a rectangle and inp are x-coord , y-coord , width , height;



//now thw next process is to render the map ie to add image
// the method is addImage but it does not take source as input
// so we have to create an image throgh new Image() method 
// here the constructor also doesnt takes path as due to api 
// use src

const image = new Image();
image.src = "./image/pokemon.png";

const foregroundImage = new Image();
foregroundImage.src = "./image/demoforeground.png";

const playerDownImage = new Image();
playerDownImage.src = "./image/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./image/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./image/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./image/playerRight.png";
//here draw image req 3 arguments image , x pos , y-coord;
// the image doent load as it gets loaded so we have add onLoad funtion before it.










//creating a player customized
const player = new Sprite({
    position:{
        x : canvas.width / 2 - 192 / 4,
        y : canvas.height / 2 - 68/ 4  + 48
    },
    image : playerDownImage, // pointinig to player image
    frames:{
        max:4
    },
    sprites:{
        up:playerUpImage,
        down:playerDownImage,
        left:playerLeftImage,
        right:playerRightImage
    }
})
// creating a background image customized
const background = new Sprite({
    position: {
        x: -1330,
        y: -820
    },
    image: image,// pointing to background image

});

const foreground = new Sprite({
    position: {
        x: -1330,
        y: -820
    },
    image: foregroundImage,// pointing to foreground image

});


// after this process we made the map as that of player could move ie zoom in
// this is done through tiled as export method as zoom in and use the selected 
// zoom method
// mow repositioning the character position at entrance of the house in drawimage method 



// now we have to load the player so that all the animations are like player is moving 
// but in that case the map is moved same as that of image




// now we have to create an infinite loop where the coordinates will get updated



// an object creation to store the movement specifics:
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}


const testBoundary = new boundary({
    position: {
        x: 1070,
        y: 400
    }
});


//a function more modularized for moving objects
const movables = [background , ...boundaries , foreground]
// function to see the collision
function rectangularCollision({rectangle1 , rectangle2}){
    return (
            rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.position.y<= rectangle2.position.y + rectangle2.height &&
            rectangle1.position.y + rectangle1.heigth >= rectangle2.position.y
    )
}
function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    // the below code is going to draw the collision boxes


    boundaries.forEach(boundary =>{
        boundary.draw();
        if(
            rectangularCollision({
                rectangle1 : player ,
                rectangle2 : boundary
            })
        )
        {
            console.log("colliding");
        }
    })

    player.draw();
    foreground.draw();

    // by 0,0 it goes to top left corner
    // we have to bring it to center by width/2 , height/2


    // here now the specifics how the map should move is done:

    let moving = true;
    player.moving = false;
    if (keys.w.pressed && lastKey === "w") {

        player.moving = true;

        player.image = player.sprites.up;
        for(let i = 0 ;i<boundaries.length;i++)
        {
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                rectangle1 : player,
                rectangle2 : {
                    ...boundary,
                    position : {
                        x : boundary.position.x,
                        y : boundary.position.y + 4
                    }
                }
            })
            ){
               moving = false;
               break; 
            }
        }
        if(moving){
            movables.forEach((movable) =>{
                movable.position.y+=4
            })
        }

    }
    else if (keys.a.pressed && lastKey === "a") {

        player.moving = true;

        player.image = player.sprites.left;
        for(let i = 0 ;i<boundaries.length;i++)
        {
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                rectangle1 : player,
                rectangle2 : {
                    ...boundary,
                    position : {
                        x : boundary.position.x + 4,
                        y : boundary.position.y 
                    }
                }
            })
            ){
               moving = false;
               break; 
            }
        }
        if(moving){
            movables.forEach((movable) =>{
                movable.position.x+=4
            })
        }

    }
    else if (keys.d.pressed && lastKey === "d") {

        player.moving = true;

        player.image = player.sprites.right;
        for(let i = 0 ;i<boundaries.length;i++)
        {
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                rectangle1 : player,
                rectangle2 : {
                    ...boundary,
                    position : {
                        x : boundary.position.x - 4,
                        y : boundary.position.y 
                    }
                }
            })
            ){
               moving = false;
               break; 
            }
        }

        if(moving){
            movables.forEach((movable) =>{
                movable.position.x-=4
            })
        }

    }
    else if (keys.s.pressed && lastKey === "s") {

        player.moving = true;

        player.image = player.sprites.down;
        for(let i = 0 ;i<boundaries.length;i++)
        {
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                rectangle1 : player,
                rectangle2 : {
                    ...boundary,
                    position : {
                        x : boundary.position.x ,
                        y : boundary.position.y -4 
                    }
                }
            })
            ){
               moving = false;
               break; 
            }
        }

        if(moving){
            movables.forEach((movable) =>{
                movable.position.y-=4
            })
        }

    }

}
animate();

// now we are addind the player movement through keyboard
// now we have to add a lastKey function which will allow multiple key usage in the game
let lastKey = "";
window.addEventListener("keydown", (event) => {
    // console.log(event.key);
    switch (event.key) {
        case "w":
            keys.w.pressed = true;
            lastKey = "w";
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = "a";
            break;
        case "s":
            keys.s.pressed = true;
            lastKey = "s";
            break;
        case "d":
            keys.d.pressed = true;
            lastKey = "d";
            break;

    }
    
})

// this is eventlistener for assigning the value of the keys back to false after their use
window.addEventListener("keyup", (event) => {
    // console.log(event.key);
    switch (event.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;

    }

})


