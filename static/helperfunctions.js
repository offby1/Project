
/// object that converts google.datatable into HTML table with MDL formats

var table = {};

table.MyTable = function (container) {
    this.containerElement = container;
};

table.MyTable.prototype.draw = function (data, options) {

    // Create an HTML table
    var showLineNumber = options.showLineNumber;

    var html = [];
    html.push('<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp"><thead><tr>');

    for (var col = 0; col < data.getNumberOfColumns(); col++) {

        columnheader = data.getColumnType(col) === 'number' ? '<th class="mdl-data-table__cell--numeric">' : '<th class="mdl-data-table__cell--non-numeric">';
        html.push(columnheader + this.escapeHtml(data.getColumnLabel(col)) + '</th>');
    }

    html.push('</tr></thead>');

    for (var row = 0; row < data.getNumberOfRows(); row++) {
        html.push('<tr>');

        for (var col = 0; col < data.getNumberOfColumns(); col++) {
            html.push(data.getColumnType(col) == 'number' ? '<td contenteditable="true" style="text-align:right">' : '<td contenteditable="true" style="text-align:left">');
            html.push(this.escapeHtml(data.getFormattedValue(row, col)));
            html.push('</td>');
        }
        html.push('</tr>');
    }
    html.push('</table>');

    this.containerElement.innerHTML = html.join('');
};

// function to escape HTML special characters
table.MyTable.prototype.escapeHtml = function (text) {
    if (text == null)
        return '';
    return text.replace(/&/g, '&').replace(/</g, '<')
        .replace(/>/g, '>').replace(/"/g, '"');
};




function JointButtonClick() {
// adjusts owner table to match button. Used to later join on datatables to filter data by owner

    var label1 = $('#JointButton').text();
    if (label1 === "Combined") {
        GLOBALS.owner.setValue(0, 0, '');
        GLOBALS.owner.setValue(1, 0, 'Emma');
        GLOBALS.owner.setValue(2, 0, '');
        $('#JointButton').text("Emma");
    } else if (label1 === "Emma") {
        GLOBALS.owner.setValue(0, 0, 'Dan');
        GLOBALS.owner.setValue(1, 0, '');
        GLOBALS.owner.setValue(2, 0, '');
        $('#JointButton').text("Dan");
    } else if (label1 === "Dan") {
        GLOBALS.owner.setValue(0, 0, '');
        GLOBALS.owner.setValue(1, 0, '');
        GLOBALS.owner.setValue(2, 0, 'Joint');
        $('#JointButton').text("Joint");
    } else if (label1 === "Joint") {
        GLOBALS.owner.setValue(0, 0, 'Dan');
        GLOBALS.owner.setValue(1, 0, 'Emma');
        GLOBALS.owner.setValue(2, 0, 'Joint');
        $('#JointButton').text("Combined");
    }

    redrawCharts();

}


function CurrencyButtonClick() {
    // changes currency button on click

    $('#CurrencyButton').html() === "CAD" ? $('#CurrencyButton').html("USD") : $('#CurrencyButton').html("CAD");

    redrawCharts();

}


function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

function redrawCharts() {
    GLOBALS.charts.forEach(function(value) { $("#"+value[0].chartdiv).length > 0 ? value[0].redraw() : void(0); })
}


function joint(joint) {
    if ($('#JointButton').text() === "Combined") {
        return "Combined";
    } else {
        return joint;
    }
}


function escapeHtml(div) {
    if (div == null)
        return '';
    return div.replace(/&/g, '&').replace(/</g, '<')
        .replace(/>/g, '>').replace(/"/g, '"');
};


Number.prototype.formatMoney = function(c, d, t){
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "($" : "$",
        l = n < 0 ? ")" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;

       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + l;
     };


function formatMoneyColor(div, number) {

    numberFormatted = number.formatMoney();
    $(div).text(numberFormatted);
    number >= 0 ? $(div).css("color", "#4CAF50") : $(div).css("color", "#EF5350");

}


