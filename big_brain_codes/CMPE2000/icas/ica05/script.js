window.onload = function () {

    document.querySelector('#now').onclick = function () {
        const now = new Date();
        alert(now);
    };

    document.querySelector('#redirect').onclick = function () {
        window.location.href = "https://www.google.ca";
    };

    document.querySelector('#setBack').onclick = function () {
        document.body.style.background = document.querySelector('#colorPicker').value;
    };

    document.querySelector('#dimensions').onclick = function () {
        document.querySelector('#dimensions-text').value = `[${window.innerWidth}, ${window.innerHeight}]`;
    };

    document.querySelector('#secret').onclick = function () {
        this.textContent = navigator.userAgent;
    };

    document.querySelector('#prompt').onclick = function () {
        let promptVal = prompt(`Current value (${this.textContent}), Enter a new number`, "5");

        if (parseInt(promptVal)) {
            this.textContent = promptVal;
        }
        else {
            console.log(`${promptVal} is Null or NaN`);
        }
    };

    var height = 40;
    var count = 1;
    document.querySelector('#tux').onclick = function () {
        let div = document.getElementById('tuxID');
        let image = document.createElement("img");
        image.setAttribute("src", "../images/chaewon2.png");

        if (count < 6) {
            height += 20;
            image.height = height;
            div.appendChild(image);
            count++;
        }
    };

    document.querySelector('#tablize').onclick = function () {
        document.getElementById('table').innerHTML = "Make a Table:"
        let rows = document.querySelector('#rows').value;
        let columns = document.querySelector('#columns').value;

        let table = document.createElement('table');
        for (let i = 0; i <= rows; ++i) {
            let tr = document.createElement('tr');
            for (let j = 0; j <= columns; ++j) {
                tr.appendChild(document.createElement('td'));
                tr.cells[0].style = "font-weight: bold; border: 1px solid black; width: 25px; height: 25px";

                if (j == 0) {
                    if (i == 0) {
                        tr.cells[j].appendChild(document.createTextNode("x"));
                    }
                    else {
                        tr.cells[j].appendChild(document.createTextNode(i));
                    }
                }
                else if (i == 0) {
                    tr.cells[j].appendChild(document.createTextNode(j));
                    tr.cells[j].style = "font-weight: bold; border: 1px solid black; width: 25px; height: 25px";
                }
                else {
                    tr.cells[j].appendChild(document.createTextNode(j * i));
                }
                tr.cells[j].style = "border: 1px solid black; width: 25px; height: 25px"
            }
            if (i == 0) {
                tr.style = "font-weight: bold; border: 1px solid black; width: 25px; height: 25px"
            }
            table.appendChild(tr);
        }

        table.style = "border: 1px solid black; border-collapse: collapse;";
        document.getElementById('table').appendChild(table);
    }
}