window.onload = function () {
    document.getElementById('makes').onchange = function () {
        UpdateMake();
    }

    let radioButtons = document.querySelectorAll('input[type=radio]');
    for (i = 0; i < radioButtons.length; i++) {
        radioButtons[i].onchange = function () {
            if (this.value < 10000) {
                UpdateModel();
            }
        }
    }

    let optionChecks = document.querySelectorAll('input[type=checkbox]');
    for (i = 0; i < optionChecks.length; i++) {
        optionChecks[i].onchange = function () {
            UpdateStatus();
        }
    }

    document.getElementById('down_paymentId').onchange = () => {
        if (parseInt(this.value)) {
            UpdateStatus("Invalid number");
        }
    }

    let make = document.querySelector('#makes');
    
    for(var i=0; i<radioButtons.length; i++) {
        var selector = 'label[for=' + radioButtons[i].id + ']';
        var label = document.querySelector(selector);
        var text = label.textContent;
        radioButtons[i].onchange = function() {
            document.getElementById('image').innerHTML = `<img src="./images/images/${make.options[make.selectedIndex].textContent}${text}.jpg">`;
            console.log(`"./images/images/${make.options[make.selectedIndex].textContent}${text}.jpg"`)
        }
    }
}

function UpdateMake() {
    let radioButtons = document.querySelectorAll('input[type=radio]');
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
    UpdateStatus();
}

function UpdateStatus() {
    let down = document.getElementById('down_paymentId').value;
    let radioButtons = document.querySelectorAll('input[type=radio]');

    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
}

function UpdateModel() {
    let optionChecks = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < optionChecks.length; i++) {
        optionChecks[i].checked = false;
    }
    UpdateStatus();
}

function Validate() {

}