$(document).ready(function () {
    const selections = ["All", "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles"];

    for (var i = 0; i < selections.length; i++) {
        let options = document.createElement('option');
        options.value = selections[i];
        options.textContent = selections[i];
        $('#medium').append(options);
    }
    
    $('#invoke').click(function () {
        let baseURL = "https://collectionapi.metmuseum.org/public/collection/v1/search?";
        let search = $('#search-bar').val();
        let medium = $('#medium').val();
        let hasImage = $('#images').prop('checked');

        if (search !== "") {
            let query = "q=" + encodeURIComponent(search);

            if(hasImage) {
                query += "&hasImages=true";
            }

            if(medium !== "All") {
                query += "&medium=" + encodeURIComponent(medium);
            }

            let url = baseURL + query;

            console.log(url);

            $.ajax({
                url: url,
                method: 'GET',
                data: {"format": "json"},
                dataType: 'json',
                success: function(data) {
                    console.log("API Response:", data);
                    $('#container2').html("Status <br> Request for: <br>" + url + "<br>Issued, Please wait... <br> Met returned: " + data.total + " records");

                    PopulateObjects(data.objectIDs);
                },
                error: function (error) {
                    console.error("API Request failed:", error);
                    ErrorHandler();
                }
            });
        }
        else {
            console.log("Search empty.")
        }
    });

    function ErrorHandler() {
        $('#container2').html("Status <br> API Request failed. Please try again.");
    }

    function PopulateObjects(num) {
        let select = $('#status');
        select.empty();

        for (var i = 1; i <= num.length - 1; i++) {
            select.append("<option value='" + num[i] + "'>" + num[i] + "</option>");
        }

        select.show();
        select.attr('size', num.length);

        select.change(function () {
            let selection = $(this).val();
            console.log(selection);
            $('#status-div').attr('height', 851);
            $('#container3').empty();
            getObjects(selection);
        })
    }

    function getObjects(objectID) {
        let objectDeets = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectID;

        console.log("Object Details URL: " + objectDeets);

        $.ajax({
            url: objectDeets,
            method: 'GET',
            data: {"format": "json"},
            dataType: 'json',
            success: function (data) {
                console.log("Object Details Response: ", data);
                PopulateDeets(data);
            },
            error: function (error) {
                console.error("API Request failed:", error);
                ErrorHandler();
            }
        });
    }

    function PopulateDeets(objectDeets) {
        let department = document.createElement('p');
        let title = document.createElement('p');
        let objectname = document.createElement('p');
        let objectdate = document.createElement('p');
        let period = document.createElement('p');

        department.textContent = "Department: " + objectDeets.department;
        title.textContent = "Title: " + objectDeets.title;
        objectname.textContent = "objectName: " + objectDeets.objectName;
        objectdate.textContent = "objectDate: " + objectDeets.objectDate;
        period.textContent = "period: " + objectDeets.period;
        $('#container3').append(department);
        $('#container3').append(title);
        $('#container3').append(objectname);
        $('#container3').append(objectdate);
        $('#container3').append(period);

        if(objectDeets.objectURL) {
            let link = document.createElement('a');
            link.href = objectDeets.objectURL;
            link.textContent = "View Content"
            $('#container3').append(link);
        }
        
        if (objectDeets.primaryImageSmall) {
            let div = document.createElement('div');
            let image = document.createElement('img');
            image.src = objectDeets.primaryImageSmall;
            div.append(image)
            $('#container3').append(div);
        }
    }
});