function tablize(rows, columns) {
    document.getElementById('table').innerHTML = "";
    let str = "";

    //let table = document.createElement('table');
    str += "<table>"
    //table.setAttribute('id', 'theTable')
    for (let i = 0; i <= rows; ++i) {
        //let tr = document.createElement('tr');
        str += "<tr>"
        for (let j = 0; j <= columns; ++j) {
            //tr.appendChild(document.createElement('td'));
            //tr.cells[0].style = "font-weight: bold; width: 45px; height: 25px; text-align: center; background-color: lightgreen;";
            if (j == 0) {
                if (i == 0) {
                    //tr.cells[j].appendChild(document.createTextNode("x"));
                    str += "<td>x</td>"
                }
                else {
                    //tr.cells[j].appendChild(document.createTextNode(i));
                    str += "<td>" + i + "</td>";
                }
            }
            else if (i == 0) {
                //tr.cells[j].appendChild(document.createTextNode(j));
                str += "<td>" + j + "</td>";
            }
            else {
                //tr.cells[j].appendChild(document.createTextNode(j * i));
                str += "<td>" + (j*i) + "</td>"
            }
            //tr.cells[j].style = "width: 45px; height: 25px; text-align: center;"
        }
        str += "</tr>";
        //if (i == 0) {
            //tr.style = "font-weight: bold;  width: 45px; height: 25px; text-align: center; background-color: lightgreen;"
        //}
        //table.appendChild(tr);
    }
    str += "</table>";

    //table.style = "border: 1px dashed blue; border-collapse: collapse;";
    document.getElementById('table').innerHTML = str;
}