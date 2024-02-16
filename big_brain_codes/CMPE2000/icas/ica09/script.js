$(document).ready(function() {
    let numArray = [];
    
    function callWithGet() {
        var data = {
            Name: $("#input-name").val(),
            Hobby: $("#input-hobby").val(),
            HowMuch: $("#slider").val()
        };

        $.ajax({
            type: "GET",
            dataType: "html",
            url: "/~demo/cmpe2000/ica_Hobby.php",
            data: data
        })

        .done(function (response) {
            $("#result").text(response);
            console.log("GET done: ", response);
        })

        .fail(function (xhr, status, error) {
            console.log("GET failed: ", status, error);
        })

        .always(function (xhr, status) {
            console.log("Always: ", status);
        });
    }

    function AjaxRequest(url, type, data, datatype, successFunction, errorFunction) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: datatype,
            success: successFunction,
            error: errorFunction
        });
    }

    function ErrorHandler(request, textStatus, errorThrown) {
        var errorMessage = "AJAX Request Failed\nStatus: " + textStatus + "\nError: " + errorThrown;
        console.log(errorMessage);
        alert(errorMessage);
    }

    $("#makeTable").click(function() {
        let rows = $("#row-slider").val();
        let cols = $("#col-slider").val();

        let data = {
            RowCount: rows,
            ColumnCount: cols
        };

        function SuccessHandler(data, textStatus) {
            $("#table").html(data);
            console.log("AJAX Success: " + textStatus);
        }

        AjaxRequest(
            "/~demo/cmpe2000/ica_Table.php",
            "POST",
            data,
            "html",
            SuccessHandler,
            ErrorHandler
        );
    });

    $("#genNum").click(function () {
        numArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 21));
        $("#target1").empty();
        $("#target1").text(numArray.join(', '));
    });

    $("#post").click(function () {
        let data = {
            Numbers: numArray
        };

        function SuccessHandler(data, textStatus) {
            $("#target2").html(data);
            console.log("AJAX Success: " + textStatus);
        }

        AjaxRequest(
            "/~demo/cmpe2000/ica_Numbers.php",
            "POST",
            data,
            "html",
            SuccessHandler,
            ErrorHandler
        );
    })

    $("input[type='range']").change(function() {
        let rows = $("#row-slider").val();
        let cols = $("#col-slider").val();
        $("#makeTable").text("Get Table (" + rows + "x" + cols + ")");
    });

    $('#callWithGet').click(callWithGet);

    $("#fail").click(function () {
        AjaxRequest(
            "/~demo/cmpe2000/ica_NumbersFail.php",
            "POST",
            data,
            "html",
            function () {},
            ErrorHandler
        );
    })
});