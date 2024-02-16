$(document).ready(function () {    
    alert("Thank you for all your help this semester!");

    function ajaxRequest(url, method, data, successCallback, failCallback) {
        $.ajax({
            url: url,
            method: method,
            data: data,
            dataType: 'json',
            success: successCallback,
            error: failCallback
        });
    }

    $('#get-all').click(function () {
        var data = {
            action: 'getall',
            tagId: 'all'
        };
        ajaxRequest('/~demo/cmpe2000/lab03_webservice.php', 'POST', data, showAllTags, ajaxFail);
    });

    $('#add-tag').click(function () {
        var desc = $('#tag-name').val();
        var min = $('#min-value').val();
        var max = $('#max-value').val();

        if (desc === '' || min === '' || max === '') {
            statusUpdate('Please fill in all fields.');
            return;
        }

        var data = {
            action: 'add',
            tagDesc: desc,
            tagMin: min,
            tagMax: max
        };

        ajaxRequest('/~demo/cmpe2000/lab03_webservice.php', 'POST', data, addStatus, ajaxFail);
    });

    $('#get-live').click(function () {
        var filter = $('#filter-tag').val();

        if (filter === '') {
            statusUpdate('Please enter a filter text.');
            return;
        }

        var data = {
            action: 'live',
            tagDescription: filter
        };

        ajaxRequest('/~demo/cmpe2000/lab03_webservice.php', 'POST', data, showLive, ajaxFail);
    });

    $('#filter').click(function () {
        var filterText = $('#filter-tag').val();

        if (filterText === '') {
            statusUpdate('Please enter a filter text.');
            return;
        }

        var data = {
            action: 'filter',
            tagDesc: filterText
        };

        ajaxRequest('/~demo/cmpe2000/lab03_webservice.php', 'POST', data, popSelector, ajaxFail);
    });

    $('#historical').on('click', function () {
        var selection = $('#history').val();

        if (!selection) {
            statusUpdate('Please select a tag.');
            return;
        }

        var data = {
            action: 'historical',
            tagId: selection
        };

        ajaxRequest('/~demo/cmpe2000/lab03_webservice.php', 'POST', data, showHistory, ajaxFail);
    });

    $('#live-check').change(function () {
        if ($(this).prop('checked')) {
            liveUpdateInterval = setInterval(function () {
                var filter = $('#filter-tag').val();
        
                if (filter === '') {
                    statusUpdate('Please enter a filter text.');
                }
        
                var data = {
                    action: 'live',
                    tagDesc: filter
                };
        
                ajaxRequest('/~demo/cmpe2000/lab03_webservice.php', 'POST', data, showLive, ajaxFail);}, 500);
            $('#liveGraphContainer').show(1000);
        } else {
            clearInterval(liveUpdateInterval);
            $('#liveGraphContainer').hide();
        }
    });

    function showAllTags(responseData, status) {
        $('#histTable').fadeOut(1000);
        $('#tagLiveTable').fadeOut(1000);
        setTimeout(function() {
            $('#tagTable').fadeIn(1000);
        }, 1000)

        $('#tagTable').find('tbody').empty();

        var tagArray = responseData.data;
        var table = $('#tagTable').find('tbody');

        for (var i = 0; i < tagArray.length; i++) {
            var tag = tagArray[i];
            var row = document.createElement('tr');

            for (var prop in tag) {
                if (tag.hasOwnProperty(prop)) {
                    var cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(tag[prop]));
                    row.appendChild(cell);
                }
            }

            table.append(row);
        }

        statusUpdate(responseData);
    }

    function showLive(responseData, status) {
        $('#tagTable').fadeOut(1000);
        $('#histTable').fadeOut(1000);
        setTimeout(function() {
            $('#tagLiveTable').fadeIn(1000);
        }, 1000)

        $('#tagLiveTable').find('tbody').empty();

        var liveArray = responseData.data;

        for (var i = 0; i < liveArray.length; i++) {
            var liveTag = liveArray[i];
            var row = document.createElement('tr');

            var idCell = document.createElement('td');
            idCell.appendChild(document.createTextNode(liveTag.tagId));
            row.appendChild(idCell);

            var descCell = document.createElement('td');
            descCell.appendChild(document.createTextNode(liveTag.tagDescription));
            row.appendChild(descCell);

            var minCell = document.createElement('td');
            minCell.appendChild(document.createTextNode(liveTag.tagMin));
            row.appendChild(minCell);

            var maxCell = document.createElement('td');
            maxCell.appendChild(document.createTextNode(liveTag.tagMax));
            row.appendChild(maxCell);

            var valueCell = document.createElement('td');
            valueCell.appendChild(document.createTextNode(parseFloat(liveTag.value).toFixed(2)));
            row.appendChild(valueCell);

            var gaugeCell = document.createElement('td');
            var gaugeMeter = createGauge(liveTag.tagMin, liveTag.tagMax, liveTag.value);
            gaugeCell.appendChild(gaugeMeter);
            row.appendChild(gaugeCell);

            $('#tagLiveTable').find('tbody').append(row);
        }

        histogram(responseData);

        statusUpdate(responseData);
    }

    function popSelector(responseData, status) {
        $('#history').empty();

        var results = responseData.data;

        for (var i = 0; i < results.length; i++) {
            var option = document.createElement('option');
            option.value = results[i].tagId;
            option.text = results[i].tagDescription;

            $('#history').append(option);
        }

        statusUpdate(responseData);
    }

    function showHistory(responseData, status) {
        $('#tagTable').fadeOut(1000);
        $('#tagLiveTable').fadeOut(1000);
        $('#histTable').find('tbody').empty();
        setTimeout(function() {
            $('#histTable').show(1000);
        }, 1000);

        var histData = responseData.data;

        for (var i = 0; i < histData.length; i++) {
            var histTag = histData[i];
            var row = document.createElement('tr');

            var minCell = document.createElement('td');
            minCell.appendChild(document.createTextNode(histTag.tagMin));
            row.appendChild(minCell);

            var maxCell = document.createElement('td');
            maxCell.appendChild(document.createTextNode(histTag.tagMax));
            row.appendChild(maxCell);

            var valCell = document.createElement('td');
            valCell.appendChild(document.createTextNode(parseFloat(histTag.value).toFixed(2)));
            row.appendChild(valCell);

            var timeCell = document.createElement('td');
            timeCell.appendChild(document.createTextNode(histTag.timeStamp));
            row.appendChild(timeCell);

            var gaugeCell = document.createElement('td');
            var gaugeMeter = createGauge(histTag.tagMin, histTag.tagMax, histTag.value);
            gaugeCell.appendChild(gaugeMeter);
            row.appendChild(gaugeCell);

            $('#histTable').find('tbody').append(row);
        }

        statusUpdate(responseData);
    }

    function createGauge(min, max, value) {
        var meter = document.createElement('meter');
        meter.min = min;
        meter.max = max;
        meter.value = value;

        if (value < min || value > max) {
            meter.classList.add('out-of-range');
        }

        return meter;
    }

    function histogram(responseData)
    {
        var x = []; //to store x values
        var y = []; //to store y values
        
        //get data
        for(i = 0; i < responseData.data.length; i++)
        {
            y[i] = Number.parseFloat(responseData.data[i].value); //get y values from the value param
            x[i] = responseData.data[i].tagDescription; //grab the tagId
        }

        new Chart("liveGraph", { //create a new chart in the canvas called 'liveGraph'
            type: 'bar', //type bar
            data: {
                labels: x, //set the labels to be x values
                datasets: [{
                    data: y, //set the dataset to be the y values
                    backgroundColor: 'green', //set the bar color to green
                }]
            },
        
            options: {
                legend: {
                    display: false, //don't display legends
                },
                title: {
                    display: true, //display title
                    text: "Live Graph Values" //set title
                }
            }
        });
    }    

    function addStatus(responseData, status) {
        statusUpdate('Add Tag Status: ' + responseData.status);
    }

    function ajaxFail(error) {
        statusUpdate('Ajax Request Failed: ' + error.statusText);
    }

    function statusUpdate(responseData) {
        $('#status').text('Response status: ' + responseData.status);
    }
})