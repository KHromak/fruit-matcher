const draw = () => {
    
    const canvas = document.getElementById('gameCanvas');
    const moves = document.getElementById('movesCount');
    const ctx = canvas.getContext('2d');
    let count = 0;
    
    let imageWidth = 150;
    let imageHeight = 150;
    let isMatch = false;
    
    let arrayOfDoubles = [];
    let arrayOfWinIDs = [];
    let arrayOfQuestionCards = [0,0,0,0,0,0,0,0,
                                    0,0,0,0,0,0,0,0];

    let firstClick = null;
    let secondClick = null;

    let question = document.getElementById(0);
    let plum = document.getElementById(1);
    let pear = document.getElementById(2);
    let apple = document.getElementById(3);
    let melon = document.getElementById(4);
    let grapes = document.getElementById(5);
    let orange = document.getElementById(6);
    let pineapple = document.getElementById(7);
    let strawberry = document.getElementById(8);

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

    let checkPlaceByCoorditnates = (i, x, array, min, max) => {
        if (
            x >= min && x < max &&
            array[i].x >= min && array[i].x < max
            ) return true;
    }

    let findPlacingOfClick = (x, y, imagePlacingArray) => {
        let buffer = [];
        for (let i = 0; i < imagePlacingArray.length; i++) {
                 if (checkPlaceByCoorditnates(i, x, imagePlacingArray, 0, 150)) buffer.push(imagePlacingArray[i]);

            else if (checkPlaceByCoorditnates(i, x, imagePlacingArray, 150, 300)) buffer.push(imagePlacingArray[i]);

            else if (checkPlaceByCoorditnates(i, x, imagePlacingArray, 300, 450)) buffer.push(imagePlacingArray[i]);

            else if (checkPlaceByCoorditnates(i, x, imagePlacingArray, 450, 600)) buffer.push(imagePlacingArray[i]);
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

    let getCursorPosition = (canvas, event) => {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        let click = findPlacingOfClick(x, y, imagePlacingArray);
        onClickHandler(click);
        onMovesCounter();
    }

    let onMovesCounter = () => {
        moves.innerHTML = ++count;
    }

    let onClickHandler = (click) => {
        
        if(firstClick!=null&&secondClick!=null) {
            if(isMatch) {
                arrayOfWinIDs.push(arrayOfDoubles[firstClick]);
                arrayOfWinIDs.push(arrayOfDoubles[secondClick]);
            } else {
                drawQuestion(firstClick);
                drawQuestion(secondClick);
            }
            firstClick = null;
            secondClick = null;
            isMatch = false;
        }
        if (firstClick==null&&secondClick==null) {
            if(!isFruitInWinArray(click)){
                firstClick = click;
                drawFruit(firstClick);
            }
        }
        else if(firstClick!=null&&secondClick==null&&click!=firstClick){
            if(!isFruitInWinArray(click)) {
                secondClick = click;
                drawFruit(secondClick);
                checkMatch();
                checkEndGame();
            }
            
        } 
    }

    let isFruitInWinArray = (click) => {
        if (arrayOfWinIDs.length == 0){
            return false
        } else {
            for (let i=0; i<arrayOfWinIDs.length; i++){
                if(arrayOfWinIDs[i] == arrayOfDoubles[click]){
                    return true;
                }
            }
        }

    }

    let checkEndGame = () => {
        if(arrayOfWinIDs.length == 14) {
            drawWinScreen(count);
        }
    }

    let drawWinScreen = (count) => {
        var grd = ctx.createLinearGradient(0, 0, 600, 600);
        grd.addColorStop(0, "green");
        grd.addColorStop(1, "cyan");
        ctx.fillStyle = grd;
        ctx.fillRect(0,0,600,600);
        ctx.font="30px Georgia";
        ctx.textAlign="center"; 
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000000";
        if(count>0&&count<=17) {
            ctx.fillText(`Wow you won the highscore!!`, 300, 300);
            ctx.fillText(`You level is ADVANCED. Moves: ${count+1}`, 300, 350);
        } else if (count>17&&count<=35) {
            ctx.fillText(`Chill! Your level is MEDIUM.`, 300, 300);
            ctx.fillText(`Your moves is: ${count+1}`, 300, 350);
        }
        if(count>35) {
            ctx.fillText(`Not bad! Your level is BEGINNER!`, 300, 300);
            ctx.fillText(`Your moves is: ${count+1}`, 300, 350);
        }
    }

    let checkMatch = () => {
        if (arrayOfDoubles[firstClick] == arrayOfDoubles[secondClick]) {
            isMatch = true;
        }
    }

    let drawQuestion = (id) => {
        clearPlaceOnCanvas(imagePlacingArray, id);
        drawImageOnCanvas(imagesArray[0], id);
    }

    let drawFruit = (id) => {
        clearPlaceOnCanvas(imagePlacingArray, id);
        drawImageOnCanvas(imagesArray[arrayOfDoubles[id]], id)
    }

    let drawImageOnCanvas = (image, index) => {
        image.width = imageWidth;
        image.height = imageHeight;
        ctx.drawImage(image, 
                    imagePlacingArray[index].x, 
                    imagePlacingArray[index].y, 
                    image.width, 
                    image.height);
    }

    let clearPlaceOnCanvas = (imagePlacingArray, id) => {
        for(let i=0; i<imagePlacingArray.length; i++){
            if(imagePlacingArray[i].place == id) {
                ctx.clearRect(imagePlacingArray[i].x, 
                    imagePlacingArray[i].y, imageWidth, imageHeight);
            }
            
        }
        
    }

    let drawAllImages = () => {
        for (let i=0; i<imagePlacingArray.length; i++){
            drawImageOnCanvas(imagesArray[arrayOfQuestionCards[i]], i);
        }
    }

    createRandomDoublesOnArea();
    drawAllImages();
    
    canvas.addEventListener("click", clicked, false); 
}
window.onload = function() {draw()}

