// fetching all the element by their id
const minDisplay= document.getElementById('showMin');
const secDisplay= document.getElementById('showSec');
const msecDisplay= document.getElementById('showMsec');
const startButton = document.getElementById('start');
const stopButton= document.getElementById('stop');
const leapButton= document.getElementById('leap');
const resetButton= document.getElementById('reset');
const showLeap= document.getElementById('showLeap');

// declaring global variable for storing time
var curTime;
var curMin,curSec,curMsec;
var resMsec=0;

//variable to store setInterval's ID
var timerID;

// boolean for handling cases
var checkStart=true;
var checkContinuity=true;
var leapCheck=false;

// array to store leap time
var timeList= new Array();


// when stopwatch is started
function startTimer(){
    // to handle multiple clicking of start
    if(checkStart){
        //setting current time
        curTime=Date.now();
        timerID=setInterval(printTime,10);
        checkStart=false;
        leapCheck=true;
    }
    
    
}

// when stopwatch is stopped
function stopTimer(){
    // adding residual time when stop is called
    resMsec=curMsec;
    
    //stopping the countdown
    clearInterval(timerID);
    //re-establishing the start
    checkStart=true;
    // to handle leap when stop is called
    leapCheck=false;
}

// to add the list in HTML
function addLeapToDOM(leap){
    //creating new DOM element
    const li= document.createElement('li');
    li.innerHTML=`${leap.Minute} m, ${leap.Second} s, ${leap.Millisecond} ms`;
    
    //appending it to ul present i HTML
    showLeap.append(li);
}

// to render the list in HTML
function renderLeap(){
    showLeap.innerHTML='';

    //iterating over all leap made
    for(let i=0;i<timeList.length;i++){
        addLeapToDOM(timeList[i]);
    }
}

// when stopwatch is reset
function resetTimer(){
    // resetting the time
    curMsec=0;
    curSec=0;
    curMin=0;
    resMsec=0; // clearing residual time
    minDisplay.innerText= '0';
    secDisplay.innerText= '0';
    msecDisplay.innerText= '0';
    
    //stopping the timer
    clearInterval(timerID);
    //re-establishing the start
    checkStart=true;
    //clearing all the leap
    timeList=[];
    // handling the leap when reset is called
    leapCheck=false;
    //updating the HTML
    renderLeap();
}

// when leap is called
function leapCount(){
    //making leap accessible to specific events
    if(leapCheck){
        //creating leap object
        let curLeap= {
            "Minute": curMin,
            "Second": (curSec%60),
            "Millisecond": (curMsec%1000)
        }
    
        //pushing the object to array
        timeList.push(curLeap);
        //updating the html
        renderLeap();
    }
}

// to display time in stopwatch
function printTime(){
    //setting the time to current time in ms
    let newTime= Date.now();
    
    //converting to required unit
    curMsec= (newTime-curTime+resMsec);
    curSec= (Math.floor((curMsec/1000)));
    curMin= Math.floor(curSec/60);
    
    //updating the display
    minDisplay.innerText= curMin;
    secDisplay.innerText= curSec%60;
    msecDisplay.innerText= curMsec%1000;


}

// adding event to the buttons
startButton.addEventListener('click',startTimer);
stopButton.addEventListener('click',stopTimer);
resetButton.addEventListener('click',resetTimer);
leapButton.addEventListener('click',leapCount);