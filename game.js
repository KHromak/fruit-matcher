const draw = () => {
    
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    let imageWidth = '150';
    let imageHeight = '150';
    
    let arrayOfDoubles = [];
    let arrayOfQuestionCards = [0,0,0,0,0,0,0,0,
                                    0,0,0,0,0,0,0,0];
    
    let firstClick = null;
    let secondClick = null;

    let question = document.getElementById(0)
    let plum = document.getElementById(1)
    let pear = document.getElementById(2)
    let apple = document.getElementById(3)
    let melon = document.getElementById(4)
    let grapes = document.getElementById(5)
    let orange = document.getElementById(6)
    let pineapple = document.getElementById(7)
    let strawberry = document.getElementById(8)

    let imagesArray = [
        question,
        plum,
        pear,
        apple,
        melon,
        grapes,
        orange,
        pineapple,
        strawberry
    ];
    
    let imagePlacingArray = [
        { x: 0, y: 0,   place: 0 },
        { x: 150, y: 0, place: 1 },
        { x: 300, y: 0, place: 2 },
        { x: 450, y: 0, place: 3 },
        { x: 0, y: 150, place: 4 },
        { x: 150, y: 150, place: 5 },
        { x: 300, y: 150, place: 6 },
        { x: 450, y: 150, place: 7 },
        { x: 0, y: 300,   place: 8 },
        { x: 150, y: 300, place: 9 },
        { x: 300, y: 300, place: 10 },
        { x: 450, y: 300, place: 11 },
        { x: 0, y: 450,   place: 12 },
        { x: 150, y: 450, place: 13 },
        { x: 300, y: 450, place: 14 },
        { x: 450, y: 450, place: 15 }
    ];

    let getCursorPosition = (canvas, event) => {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        let click = findPlacingOfClick(x, y, imagePlacingArray);
        onRefreshAreaAfterTwoClicks(click);
    }

    let onRefreshAreaAfterTwoClicks = (click) => {
        if(firstClick!=null&&secondClick!=null) {
            //refreshing area func here
            firstClick = null;
            secondClick = null;
            return;
        }
        if (firstClick==null&&secondClick==null) firstClick = click;
        else if(firstClick!=null&&secondClick==null&&click!=firstClick) secondClick = click;
        console.log(firstClick)
        console.log(secondClick)
    }

    let findPlacingOfClick = (x, y, imagePlacingArray) => {
        let buffer = [];
        for (let i = 0; i < imagePlacingArray.length; i++) {
            if (x >= 0 && x < 150 && imagePlacingArray[i].x >= 0 && imagePlacingArray[i].x < 150) buffer.push(imagePlacingArray[i]);
            else if (x >= 150 && x < 300 && imagePlacingArray[i].x >= 150 && imagePlacingArray[i].x < 300) buffer.push(imagePlacingArray[i]);
            else if (x >= 300 && x < 450 && imagePlacingArray[i].x >= 300 && imagePlacingArray[i].x < 450) buffer.push(imagePlacingArray[i]);
            else if (x >= 450 && x < 600 && imagePlacingArray[i].x >= 450 && imagePlacingArray[i].x < 600) buffer.push(imagePlacingArray[i]);
        }

        for (let j = 0; j < buffer.length; j++) {
            if (y >= 0 && y < 150 && buffer[j].y >= 0 && buffer[j].y < 150) return buffer[j].place;
            else if (y >= 150 && y < 300 && buffer[j].y >= 150 && buffer[j].y < 300) return buffer[j].place;
            else if (y >= 300 && y < 450 && buffer[j].y >= 300 && buffer[j].y < 450) return buffer[j].place;
            else if (y >= 450 && y < 600 && buffer[j].y >= 450 && buffer[j].y < 600) return buffer[j].place;
        }
        
    } 

    let getRandomArbitrary = (min, max) => {
        return Math.trunc(Math.random() * (max - min) + min);
    }

    let createRandomDoublesOnArea = () => {
        let buferIds = [1,2,3,4,5,6,7,8,
                        1,2,3,4,5,6,7,8];
       
        for (let i=0;i<buferIds.length;i++){
            let id = buferIds[i];
            let randomPosition = getRandomArbitrary(0,16);
            arrayOfDoubles.splice(randomPosition, 0, id);
        }
    }

    let clicked = (e) => {
        e.preventDefault();
        getCursorPosition(canvas, e);
    }

    let drawImageOnCanvas =  (image, index) => {
        image.width = imageWidth;
        image.height = imageHeight;
        ctx.drawImage(image, 
                    imagePlacingArray[index].x, 
                    imagePlacingArray[index].y, 
                    image.width, 
                    image.height);
    }

    let drawAllImages = () => {
        for (let i=0; i<imagePlacingArray.length; i++){
            drawImageOnCanvas(imagesArray[arrayOfDoubles[i]], i);
        }
    }

    createRandomDoublesOnArea();
    drawAllImages();
    
    canvas.addEventListener("click", clicked, false); 
}
window.onload = function() {draw()}

