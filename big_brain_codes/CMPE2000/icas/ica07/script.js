let picNames = ["pic_1", "pic_2", "pic_3", "pic_4", "pic_5", "pic_6"];
let picFrames = [];
let currIndex = 0;
let auto = false;
let timerID = 0;

onload = () => {
    fInit();

    document.getElementById('fwd').onclick = FNext;
    document.getElementById('prev').onclick = FPrev;
    document.getElementById('play').onclick = FAuto;
}

function PicFrame(disName, imgNumber) {
    this.disName = disName;
    this.viewCount = 0;
    this.image = new Image();
    this.image.src = `./images/${picNames[imgNumber]}.jpg`;
}

function fInit() {
    for (var i = 0; i < picNames.length; i++) {
        var newPic = new PicFrame(picNames[i], i);
        picFrames.push(newPic);
    }
    showPic();
}

function showPic() {
    let captions = ["Boat", "Sunset", "Valley", "Lake", "Lakehouse", "Lily"];

    document.getElementById('currentImg').src = picFrames[currIndex].image.src;
    document.getElementById('imgCaption').innerHTML = `${captions[currIndex]}`;
}

function FNext() {
    currIndex = (currIndex + 1) % 6;
    showPic();
}

function FPrev() {
    currIndex = (currIndex - 1 + 6) % 6;
    showPic();
}

function FAuto() {
    if (auto == false) {
        timerID = setInterval(FNext, 1000);
        document.getElementById('play').src = "./icons/pause.png";
        auto = true;
    }
    else
    {
        clearInterval(timerID);
        document.getElementById('play').src = "./icons/play.png";
        auto = false;
    }
}