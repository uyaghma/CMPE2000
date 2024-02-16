$(document).ready(function() {
    let picNames = ["pic_1", "pic_2", "pic_3", "pic_4", "pic_5", "pic_6"];
    let picFrames = [];
    let currIndex = 0;
    let auto = false;
    let timerID = 0;
    let slideSpeed = 3000;
    let transitionSpeed = 300;
    let transition = 'fade';

    function PicFrame(disName, imgNumber) {
        this.disName = disName;
        this.viewCount = 0;
        this.image = $("<img>", {src: `./images/${picNames[imgNumber]}.jpg`});
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
        
        if (transition === 'fade') {
            $('#currentImg').fadeOut(transitionSpeed / 2, function() {
                $(this).attr('src', picFrames[currIndex].image.attr('src')).fadeIn(transitionSpeed / 2);
            });
        }
        else if (transition === 'slide') {
            $('#currentImg').slideToggle(transitionSpeed / 2, function() {
                $(this).attr('src', picFrames[currIndex].image.attr('src')).slideToggle(transitionSpeed / 2);
            });
        }

        $('#imgCaption').html(`${captions[currIndex]}`);
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
        if (!auto) {
            timerID = setInterval(FNext, slideSpeed);
            $('#play').attr('src', "./icons/pause.png");
            auto = true;
            $('input[name=aniSpeed]').each(function(i) {
                $(this).attr('disabled', 'disabled');
            });
        }
        else
        {
            clearInterval(timerID);
            $('#play').attr('src', "./icons/play.png");
            auto = false;
            $('input[name=aniSpeed]').each(function(i) {
                $(this).attr('disabled', false);
            });
        }
    }

    $('#fwd').click(FNext);
    $('#prev').click(FPrev);
    $('#play').click(FAuto);

    $('#selectTran').change(function() {
        transition = $(this).val();
    });

    $('[name=aniSpeed]').change(function() {
        transitionSpeed = $(this).val();
    });

    fInit();
});