function onGenerateButtonClicked() {
    var txtArea = document.getElementById("stacked-keyword");
    var value = txtArea.value;
    value = value.replace(" ", "\n");
    var ks = value.split(/\r?\n/);

    var string = "";
    var stringList = [];
    ks.forEach(keyword => {
        if ((string.length + keyword.length + 1) >= 100) {
            stringList.push(string);
            string = "";
        }

        if (string.length > 0)
            string = string + "," + keyword;
        else
            string = string + keyword;
    });

    var resultHtml = "";

    stringList.forEach(stringVal => {
        resultHtml = resultHtml + "<textarea style='width: 100%;' disabled>" + stringVal + "</textarea>"
    });

    var results = document.getElementById("results-area");
    results.innerHTML = resultHtml;
}

function onOptimizationGenerateButtonClicked() {
    var txtArea = document.getElementById("stacked-keyword");
    var value = txtArea.value;

    value = value.replaceAll(/\r?\nTrack keyword\r?\n/g, "\t");
    var splitValues = value.split(/\r?\n/);

    var resultHtml = "";

    resultHtml += "<table class='pure-table'>"
    resultHtml += 
        "<thread> <tr>" + 
            "<th>Tag</th>" + 
            "<th>Traffic (T)</th>" + 
            "<th>iPhone Difficulty (D)</th>" + 
            // "<th>iPad Difficulty (DP)</th>" +  
            "<th>iPhone Apps (A)</th>" + 
            // "<th>iPad Apps (AP)</th>" +
            "<th>T / D</th>" +   
            // "<th>T / DP</th>" +
            "<th>T / A * 1000</th>" +  
            // "<th>T / AP * 1000</th>" + 
        "</tr> </thread> <tbody>"
    splitValues.forEach(values => {
        resultHtml += "<tr>"
        var dataArr = values.split(/\t/);

        var traffic = parseFloat(dataArr[3].trim());
        var iPhoneDifficulty = parseFloat(dataArr[4].trim());
        // var iPadDifficulty = parseFloat(dataArr[5].trim());
        var iPhoneApps = parseFloat(dataArr[6].trim().replace(",",""));
        // var iPadApps = parseFloat(dataArr[7].trim().replace(",",""));

        resultHtml += "<td>" + dataArr[0].trim() + "</td>";
        resultHtml += "<td>" + traffic + "</td>";
        resultHtml += "<td>" + iPhoneDifficulty + "</td>";
        // resultHtml += "<td>" + iPadDifficulty + "</td>";
        resultHtml += "<td>" + iPhoneApps + "</td>";
        // resultHtml += "<td>" + iPadApps + "</td>";
        resultHtml += "<td>" + (traffic / iPhoneDifficulty) + "</td>";
        // resultHtml += "<td>" + (traffic / iPadDifficulty) + "</td>";
        resultHtml += "<td>" + (traffic / iPhoneApps) * 1000 + "</td>";
        // resultHtml += "<td>" + (traffic / iPadApps) * 1000 + "</td>";
        resultHtml += "</tr>"
    });

    resultHtml += "</tbody> </table>"

    var results = document.getElementById("results-area");
    results.innerHTML = resultHtml;
}
