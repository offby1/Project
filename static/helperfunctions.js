
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
    if (label1 === "Joint") {
        GLOBALS.owner.setValue(0, 0, '');
        GLOBALS.owner.setValue(1, 0, 'Emma');
        $('#JointButton').text("Emma");
    } else if (label1 === "Emma") {
        GLOBALS.owner.setValue(0, 0, 'Dan');
        GLOBALS.owner.setValue(1, 0, '');
        $('#JointButton').text("Dan");
    } else if (label1 === "Dan") {
        GLOBALS.owner.setValue(0, 0, 'Dan');
        GLOBALS.owner.setValue(1, 0, 'Emma');
        $('#JointButton').text("Joint");
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

    $('#balancesDiv').length > 0 ? balances.redraw() : void(0);

    $('#balancetablediv').length > 0 ? balances.createEndingTable() : void(0);

    $('#monthlySpendDiv').length > 0 ? monthlySpend.redraw() : void(0);

    $('#netIncomeDiv').length > 0 ? NI.redraw() : void(0);

    $('#stocksDiv').length > 0 ? stocks.redraw() : void(0);

    $('#stockPricesDiv').length > 0 ? stockPrices.redraw() : void(0);

    $('#chartbudgetChartDiv').length > 0 ? budgetChart.redraw() : void(0);

    $('#chartindBudgetChartDiv').length > 0 ? indBudgetChart.redraw() : void(0);

    $('#NIFXDiv').length > 0 ? NIFX.redraw() : void(0);

    $('#stockTableDiv').length > 0 ? stockTable.redraw() : void(0);

    $('#currentBalanceDiv').length > 0 ? currentBalance.redraw() : void(0);
    $('#currentBalanceDiv').length > 0 ? balances2.redraw() : void(0);

    $('#sumStockTableDiv').length > 0 ? sumStock.redraw() : void(0);
    $('#sumStockTableDiv').length > 0 ? stockPrices2.redraw() : void(0);

    $('#chartbudgetChartDiv2').length > 0 ? budgetChart.redraw() : void(0);



}


function joint(joint) {
    if ($('#JointButton').text() === "Joint") {
        return "Joint";
    } else {
        return joint;
    }
}


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
