

function initializeNetIncomeChart(netincomedata) {

    NI = new chart(
        div = 'netIncomeDiv',
        data = netincomedata,
        divcol = 12,
        firstTitle = 'Net Income',
        secondTitle = 'By Month'
    );

    NI.chartWrapper.setOption('dataOpacity', 0.8);
    NI.chartWrapper.setOption('colors', [GLOBALS.chartcolours[3]]);
    NI.controlWrapper.setOption('ui.chartOptions.colors', [GLOBALS.chartcolours[3]]);

    GLOBALS.grid.append(NI.escapeHtml(NI.htmldiv));
    NI.redraw();

}


function initializeMonthlySpend3(spendingdata) {

    monthlySpend = new chart(
        div = 'monthlySpendDiv',
        data = spendingdata,
        divcol = 12,
        firstTitle = 'Spending',
        secondTitle = 'Monthly Expenses'
    );

    monthlySpend.chartWrapper.setOption('vAxis.minValue', 0);
    monthlySpend.chartWrapper.setOption('vAxis.minValue', 0);
    monthlySpend.chartWrapper.setOption('dataOpacity', 0.8);
    monthlySpend.chartWrapper.setOption('colors', [GLOBALS.chartcolours[3]]);
    monthlySpend.controlWrapper.setOption('ui.chartOptions.colors', [GLOBALS.chartcolours[3]]);

    GLOBALS.grid.append(monthlySpend.escapeHtml(monthlySpend.htmldiv));
    monthlySpend.redraw();

}


function initializeBalanceChart(balanceData) {

    balances = new chart(
        div = 'balancesDiv',
        data = balanceData,
        divcol = 8,
        firstTitle = 'Balances',
        secondTitle = 'Accounts Over Time',
        sumcol = true,
        valStartCol = 3,
        categoryEndCol = 2,
        chartHeight = '378px'
    );

    balances.chartWrapper.setChartType('ComboChart');
    balances.chartWrapper.setOption('seriesType', 'area');
    balances.chartWrapper.setOption('lineWidth', 0);
    balances.chartWrapper.setOption('areaOpacity', 0.5);
    balances.chartWrapper.setOption('series.5.type', 'line');
    balances.controlWrapper.setOption('ui.chartOptions.seriesType', 'area');
    balances.controlWrapper.setOption('ui.chartOptions.series.5.type', 'line');

    GLOBALS.grid.append('<div class="demo-graphs mdl-cell mdl-cell--4-col" style="padding:0px 0px"><div id="balancetablediv" style="width:100%; height:378px;"></div></div>');

    GLOBALS.grid.append(balances.escapeHtml(balances.htmldiv));
    balances.redraw();
    balances.createEndingTable();

}


function initializeStocksChart(stocksData) {

    stocks = new chart(
        div = 'stocksDiv',
        data = stocksData,
        divcol = 12,
        firstTitle = 'Stock Gain/Loss',
        secondTitle = 'Cumulative Investments Over Time',
        sumcol = true
    );

    stocks.chartWrapper.setChartType('ComboChart');
    stocks.chartWrapper.setOption('seriesType', 'area');
    stocks.chartWrapper.setOption('lineWidth', 0);
    stocks.chartWrapper.setOption('areaOpacity', 0.5);
    stocks.chartWrapper.setOption('series.10.type', 'line');
    stocks.controlWrapper.setOption('ui.chartOptions.seriesType', 'area');
    stocks.controlWrapper.setOption('ui.chartOptions.series.5.type', 'line');
    stocks.controlWrapper.setState({range: {start: new Date(2015, 5, 1)}});

    GLOBALS.grid.append(stocks.escapeHtml(stocks.htmldiv));
    stocks.redraw();

}


function initializeStockPrices(stockPriceData) {

    stockPrices = new chart(
        div = 'stockPricesDiv',
        data = stockPriceData,
        divcol = 12,
        firstTitle = 'Stock Prices',
        secondTitle = 'Over Time',
        sumcol = false
    );

    stockPrices.chartWrapper.setChartType('LineChart');
    stockPrices.chartWrapper.setOption('interpolateNulls', false);
    stockPrices.controlWrapper.setState({range: {start: new Date(2015, 5, 1)}});
    stockPrices.controlWrapper.setOption('ui.chartOptions.seriesType', 'line');
    stockPrices.controlWrapper.setOption('ui.chartOptions.lineWidth', 1);

    GLOBALS.grid.append(stockPrices.escapeHtml(stockPrices.htmldiv));
    stockPrices.redraw();

}


function initializeBudgetChart3(budgetData) {

    budgetChart = new chart(
        div = 'budgetChartDiv',
        data = budgetData,
        divcol = 4,
        firstTitle = 'Budget',
        secondTitle = 'Month to Date',
        sumcol = false,
        valStartCol = 4,
        categoryEndCol = 2,
        budgetSummary = '<h2 id="title"></h2>'
    );

    budgetChart.redraw = function () {

        this.dataOwnerJoin = this.dataJoin();
        this.dataView = this.dataOwnerGroup();
        this.dataView = budgetChart.drawBudget();
        this.chartWrapper.setDataTable(this.dataView);

        $('#chartbudgetChartDiv').fadeTo('fast', 0, function () {
            budgetChart.chartWrapper.draw();
            $('#title').html(budgetChart.title);
        });

        $('#chartbudgetChartDiv').fadeTo('slow', 1);

    }


    budgetChart.chartWrapper.setOptions();
    budgetChart.chartWrapper.setChartType('PieChart');

    budgetChart.chartWrapper.setOption('pieHole', 0.5);
    //budgetChart.chartWrapper.setOption('colors', ['#EF5350', GLOBALS.chartcolours[3], GLOBALS.chartcolours[3], '#C8E6C9', '#E8F5E9']);
    budgetChart.chartWrapper.setOption('colors', ['#EF9A9A', '#81C784', '#81C784', '#C8E6C9', '#E8F5E9']);
    budgetChart.chartWrapper.setOption('legend.position', 'none');
    budgetChart.chartWrapper.setOption('pieSliceText', 'none');
    budgetChart.chartWrapper.setOption('pieSliceBorderColor', 'white');
    budgetChart.chartWrapper.setOption('tooltip.trigger', 'none');
    budgetChart.chartWrapper.setOption('titleTextStyle.color', '#9E9E9E');
    budgetChart.chartWrapper.setOption('titleTextStyle.fontName', 'Roboto');
    budgetChart.chartWrapper.setOption('titleTextStyle.fontSize', '14');
    budgetChart.chartWrapper.setOption('chartArea.width', '100%');
    budgetChart.chartWrapper.setOption('chartArea.height', '90%');

    GLOBALS.grid.append(budgetChart.escapeHtml(budgetChart.budgetCharthtml));
    budgetChart.redraw();

}


function initializeIndBudgetChart(budgetData) {

    indBudgetChart = new chart(
        div = 'indBudgetChartDiv',
        data = budgetData,
        divcol = 8,
        firstTitle = 'Budget',
        secondTitle = 'Month to Date',
        sumcol = false,
        valStartCol = 4
    );

    indBudgetChart.redraw = function () {

        this.dataOwnerJoin = this.dataJoin();
        this.dataView = this.dataOwnerGroup();
        this.dataView.removeColumn(0);
        this.dataView = this.drawBudget2();
        this.chartWrapper.setDataTable(this.dataView);
        this.chartWrapper.draw();

    };

    indBudgetChart.chartWrapper.setChartType('BarChart');
    indBudgetChart.chartWrapper.setOption('isStacked', 'percent');
    indBudgetChart.chartWrapper.setOption('chartArea.left', 150);
    indBudgetChart.chartWrapper.setOption('chartArea.width', '70%');
    indBudgetChart.chartWrapper.setOption('chartArea.height', '95%');
    indBudgetChart.chartWrapper.setOption('colors', ['#EF5350', GLOBALS.chartcolours[3], GLOBALS.chartcolours[3], '#C8E6C9', '#E8F5E9']);
    indBudgetChart.chartWrapper.setOption('hAxis.gridlines.count', 0);
    indBudgetChart.chartWrapper.setOption('hAxis.viewWindow.min', 0);

    GLOBALS.grid.append(indBudgetChart.escapeHtml(indBudgetChart.htmlChartdiv));

    indBudgetChart.redraw();


}


function initializeStockTable(stockTableData) {

    stockTable = new chart(
        div = 'stockTableDiv',
        data = stockTableData,
        divcol = 12,
        firstTitle = 'Stock Summary',
        secondTitle = 'Performance',
        sumcol = false,
        valStartCol = 4
    );

    GLOBALS.grid.append('<div class="demo-graphs mdl-cell mdl-cell--12-col" style="padding:0px 0px"><div id="stockTableDiv" style="width:100%; "></div></div>');

    var stockTable2 = new table.MyTable(document.getElementById('stockTableDiv'));

    stockTable.redraw = function () {

        stockTable.dataOwnerJoin = stockTable.dataJoin();
        stockTable.dataView = stockTable.dataOwnerGroup();
        stockTable.dataView.removeColumns(0, 1);
        GLOBALS.format4decimals.format(stockTable.dataView, 1);
        GLOBALS.formatdecimals.format(stockTable.dataView, 2);
        GLOBALS.formatdecimals.format(stockTable.dataView, 3);
        GLOBALS.formatdecimals.format(stockTable.dataView, 4);
        stockTable2.draw(stockTable.dataView, {showLineNumber: true});

    };

    stockTable.redraw()

}


function initializeNIFXChart(NIFXdata) {

    NIFX = new chart(
        div = 'NIFXDiv',
        data = NIFXdata,
        divcol = 12,
        firstTitle = 'NIFX',
        secondTitle = 'Month to Date',
        sumcol = false
    );


    NIFX.redraw = function () {

        this.dataView = manipulateNIFXData(this.dataTable);
        this.dashboard.draw(this.dataView);

    };

    NIFX.chartWrapper.setOption('vAxes.0.viewWindow.max', 10000);
    NIFX.chartWrapper.setOption('vAxes.0.viewWindow.min', 0);
    NIFX.chartWrapper.setOption('vAxes.1.viewWindow.max', 10000);
    NIFX.chartWrapper.setOption('vAxes.1.viewWindow.min', 0);
    NIFX.chartWrapper.setOption('vAxes.1.gridlines.count', 0);
    NIFX.chartWrapper.setOption('series.3.type', 'area');
    NIFX.chartWrapper.setOption('series.3.targetAxisIndex', 1);
    NIFX.chartWrapper.setOption('series.4.type', 'area');
    NIFX.chartWrapper.setOption('series.4.targetAxisIndex', 1);
    NIFX.chartWrapper.setOption('series.5.type', 'area');
    NIFX.chartWrapper.setOption('series.5.targetAxisIndex', 1);

    GLOBALS.grid.append(NIFX.escapeHtml(NIFX.htmldiv));

    NIFX.redraw();

    google.visualization.events.addListener(NIFX.controlWrapper, 'statechange', function (e) {
        if (e.inProgress == false) {
            NIFX.redraw();
        }
    });

}


function manipulateNIFXData(data) {

    var columns = data.getNumberOfColumns();
    var cols = [0];

    for (var i = 2; i < columns; i++) {
        cols.push(i);
    }

    var combined = new google.visualization.data.join(data, GLOBALS.owner, 'inner', [
        [1, 0]
    ], cols, []);

    cols.splice(0, 1);

    var agg = [];
    for (i in cols) {
        agg.push({
            'column': cols[i],
            'aggregation': google.visualization.data.sum,
            'type': 'number'
        });

    }

    var NIFX_data_by_owner = new google.visualization.data.group(
        combined, [1], agg);


    if ($('#CurrencyButton').text() === "CAD") {
        // amounts are all imported as USD. Converts all to CAD if button is selected
        NIFX_data_by_owner.removeColumns(1, 3);

    } else {
        NIFX_data_by_owner.removeColumns(4, 3);
    }

    var choose = NIFX.controlWrapper.getState().range.start;

    NIFX_data_by_owner.addColumn('number', 'Total FX Gain/Loss');
    NIFX_data_by_owner.addColumn('number', 'Total Investments');
    NIFX_data_by_owner.addColumn('number', 'Total Income');

    for (i = 1; i < NIFX_data_by_owner.getNumberOfRows(); i++) {

        if (NIFX_data_by_owner.getValue(i, 0) < choose) {

            for (j = 1; j < 4; j++) {
                NIFX_data_by_owner.setValue(i, j + 3, 0);
            }
        }

        else {
            for (j = 1; j < 4; j++) {

                var currow = NIFX_data_by_owner.getValue(i, j);
                var prevrow = NIFX_data_by_owner.getValue(i - 1, j + 3);

                NIFX_data_by_owner.setValue(i, j + 3, currow + prevrow);
            }
        }
    }

    var view = new google.visualization.DataView(NIFX_data_by_owner);
    var b = NIFX_data_by_owner.getFilteredRows([{column: 0, minValue: choose, maxValue: null}]);
    view.setRows(b);

    var c = [];
    var d = [];
    var minx = [];
    var maxx = [];
    for (var i = 1; i < view.getNumberOfRows(); i++) {
        var e = 0;
        var f = 0;
        for (var j = 1; j <= 3; j++) {
            e += Math.min(0, view.getValue(i, j));
            f += Math.max(0, view.getValue(i, j));

        }
        c.push(e);
        d.push(f);

    }

    var a = getMinOfArray(c);
    var b = getMaxOfArray(d);

    minx = [];
    maxx = [];
    for (i = Math.ceil(view.getNumberOfColumns() / 2); i < view.getNumberOfColumns(); i++) {
        c[i] = view.getColumnRange(i);
        minx.push(c[i].min);
        maxx.push(c[i].max);

    }
    var c = getMinOfArray(minx);
    var d = getMaxOfArray(maxx);

    var e = (b / (b - a));
    c = -(d / e) * (1 - e);

    NIFX.chartWrapper.setOption('vAxes.0.viewWindow.min', a);
    NIFX.chartWrapper.setOption('vAxes.0.viewWindow.max', b);
    NIFX.chartWrapper.setOption('vAxes.1.viewWindow.min', c);
    NIFX.chartWrapper.setOption('vAxes.1.viewWindow.max', d);

    GLOBALS.formatdate.format(NIFX_data_by_owner, 0);
    for (i = 1; i < NIFX_data_by_owner.getNumberOfColumns(); i++) {
        GLOBALS.formatamount.format(NIFX_data_by_owner, i);
    }

    return NIFX_data_by_owner;
}


function indtranstable(x, y) {

    var transdata = new google.visualization.DataTable();

    transdata.addColumn('date', 'Date');
    for (i = 1; i < y.length; i++) {

        var datatype = typeof(x[0][i]) === 'number' ? 'number' : 'string';
        transdata.addColumn(datatype, y[i]);
    }
    var a = [];
    for (i = 0; i < x.length; i++) {

        var b = [];
        b.push(new Date(x[i][0]));
        for (j = 1; j < x[i].length; j++) {
            b.push(x[i][j]);
        }
        a.push(b);
    }

    transdata.addRows(a);
    for (i = 0; i < transdata.getNumberOfColumns(); i++) {
        if (transdata.getColumnType(i) === 'number') {
            GLOBALS.formatdecimals.format(transdata, i);
        }
    }

    var view = new google.visualization.DataView(transdata);
    view.hideColumns([6, 7, 8]); // hides account type, currency and FX rate

    var visind = new table.MyTable(document.getElementById('transactions_table_div'));

    visind.draw(view, {showLineNumber: true});


}


function accrualsTable(data) {

    accruals = new chart(
        div = 'accrualsDiv',
        data = data,
        divcol = 12,
        firstTitle = 'Accruals',
        secondTitle = 'All Time',
        sumcol = false
    );

    GLOBALS.grid.append('<div class="demo-graphs mdl-cell mdl-cell--12-col" style="padding:0px 0px"><div id="stockTableDiv" style="width:100%; "></div></div>');
    var accrual = new table.MyTable(document.getElementById(accruals.div));

    accruals.redraw = function () {

        accruals.dataOwnerJoin = accruals.dataJoin();
        accruals.dataView = accruals.dataOwnerGroup();
        //stockTable.dataView.removeColumns(0,1);
        //GLOBALS.format4decimals.format(stockTable.dataView, 1);
        //GLOBALS.formatdecimals.format(stockTable.dataView, 2);
        //GLOBALS.formatdecimals.format(stockTable.dataView, 3);
        //GLOBALS.formatdecimals.format(stockTable.dataView, 4);
        accrual.draw(accruals.dataView, {showLineNumber: true});

    };

    accruals.redraw()
}


/**
 * Created by dangoodburn on 10/3/15.
 */

function initializeCurrentBalanceTable5(data) {

    currentBalance = new chartV2(
        div = 'currentBalanceDiv',
        data = data,
        divcol = 6,
        firstTitle = 'Balance',
        secondTitle = "Compared to one month prior",
        sumcol = false
    );

    var todayBalance = 0;
    var oldBalance = 0;
    var change = 0;
    var d = new Date();

    var formattedDate = d.toDateString().slice(4);

    currentBalance.htmldiv = '\
    <div class="demo-graphs mdl-cell mdl-cell--6-col mdl-color--white mdl-shadow--2dp" style="padding:0px; border-radius: 2px;" id=' + 'currentBalanceDiv' + '>\
    <div class="demo-graphs" id=test style="padding:0px">\
        <div class="firstTitle" style="padding:16px 0 0 16px">\
            Net Worth\
          </div>\
          \<div class="secondTitle" style="padding:0 0 0 16px">' + formattedDate + '\
          </div>\
          <div class="mdl-card__title mdl-card--expand">\
            <h2 class="mdl-card__title-text" id=todayBalance>' + todayBalance + '</h2>\
          </div>\
          <div class="mdl-card__supporting-text">\
            <div>ONE MONTH AGO:</div><span id=oldBalance>' + oldBalance + '</span></br></br><div>CHANGE:</div><span id=change>' + change + '\
          </span></div>\
          <div class="mdl-card__actions mdl-card--border">\
              <span>\
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="#/balances/" onclick="loadBalancesPage()">\
                  View Balance Details\
                </a>\
              </span>\
              <span id="accountBalance" style="float: right;">\
              </span>\
          </div>\
        </div>\
        <div id="chartbalancesDiv2"</div>\
    </div>';


    GLOBALS.grid.append(currentBalance.htmldiv);

    currentBalance.redraw = function () {

        currentBalance.dataOwnerJoin = currentBalance.dataJoin();
        currentBalance.dataView = currentBalance.dataOwnerGroup();
        var todayBalance = currentBalance.dataView.getFormattedValue(1, 1);
        var oldBalance = currentBalance.dataView.getFormattedValue(0, 1);
        var todayBalanceNF = currentBalance.dataView.getValue(1, 1);
        var oldBalanceNF = currentBalance.dataView.getValue(0, 1);

        var changeNF = todayBalanceNF - oldBalanceNF;

        change = changeNF.formatMoney();

        $('#todayBalance').text(todayBalance);
        $('#todayBalance').css("color", "#4CAF50");
        $('#oldBalance').text(oldBalance);
        $('#oldBalance').css("color", "#4CAF50");
        $('#change').text(change);

        changeNF >= 0 ? $('#change').css("color", "#4CAF50") : $('#change').css("color", "#EF5350");


    };

    currentBalance.redraw()
}

function initializeBalanceChart5(balanceData) {

    balances2 = new chart(
        div = 'balancesDiv2',
        data = balanceData,
        divcol = 6,
        firstTitle = 'Balances',
        secondTitle = 'Accounts Over Time',
        sumcol = false,
        valStartCol = 3,
        categoryEndCol = 2,
        chartHeight = '200px'
    );

    balances2.chartWrapper.setChartType('AreaChart');
    balances2.chartWrapper.setOption('lineWidth', 0.05);
    balances2.chartWrapper.setOption('areaOpacity', 0.2);
    balances2.chartWrapper.setOption('animation.duration', 750);
    balances2.chartWrapper.setOption('tooltip.trigger', 'none');
    balances2.chartWrapper.setOption('hAxis.gridlines.count', 0);
    balances2.chartWrapper.setOption('vAxis.gridlines.count', 0);
    balances2.chartWrapper.setOption('chartArea.left', 0);
    balances2.chartWrapper.setOption('chartArea.width', '100%');
    balances2.chartWrapper.setOption('chartArea.height', '100%');
    balances2.chartWrapper.setOption('vAxis.baselineColor', '#E1F5FE');
    balances2.chartWrapper.setOption('backgroundColor.fill', 'transparent');
    balances2.chartWrapper.setOption('focusTarget', 'datum');
    balances2.chartWrapper.setOption('crosshair.opacity', 0.3);
    balances2.chartWrapper.setOption('crosshair.trigger', 'both');
    //balances2.chartWrapper.setOption('tooltip.ignoreBounds',true);

    balances2.redraw = function () {

        this.dataOwnerJoin = this.dataJoin();
        this.dataView = this.dataOwnerGroup();
        GLOBALS.formatdate.format(this.dataView, 0);
        this.chartWrapper.setDataTable(this.dataView);
        this.chartWrapper.draw();


    };

    //$('#currentBalanceDiv').append('<div id="chartbalancesDiv2"</div>');

    google.visualization.events.removeAllListeners(balances2.chartWrapper);
    var runOnce = google.visualization.events.addListener(balances2.chartWrapper, 'ready', function () {
        // remove the listener so that it doesn't stack up multiple events
        google.visualization.events.removeListener(runOnce);

        google.visualization.events.addListener(balances2.chartWrapper.getChart(), 'onmouseover', displayBalance);
        google.visualization.events.addListener(balances2.chartWrapper.getChart(), 'onmouseout', removeBalance);

    });

    balances2.redraw();
    google.visualization.events.removeAllListeners(balances2.chartWrapper);

}

function removeBalance5() {

    $('#accountBalance').html('');
    //$('#accountBalance').css('background-color','white');
    $('#accountBalance').css('border-width', '0');

}

function displayBalance5(e) {

    var a = balances2.dataView.getFormattedValue(e.row, e.column);
    var b = balances2.dataView.getFormattedValue(e.row, 0);
    var c = balances2.dataView.getColumnLabel(e.column);

    d = '<div>' + b + '</br>' + c + ': <span style="font-weight: bold">' + a + '</span></div>';
    $('#accountBalance').html(d);
    //$('#accountBalance').css('background-color','#FAFAFA');
    $('#accountBalance').css('border-color', GLOBALS.chartcolours[e.column]);
    $('#accountBalance').css('border-width', '2px');
    //alert($(".google-visualization-tooltip").prop('style'));
    //$('#accountBalance').attr('style', function(i,s) { return s + 'background-color: green !important;' });

}


function initializeSumStockTable2(data) {

    sumStock = new chart(
        div = 'sumStockTableDiv',
        data = data,
        divcol = 6,
        firstTitle = 'Stocks',
        secondTitle = "",
        sumcol = false
    );

    GLOBALS.grid.append('<div class="demo-graphs mdl-cell mdl-cell--6-col" style="padding:0px 0px"><div id="sumStockTableDiv" style="width:100%; "></div></div>');
    var sumStockTable = new table.MyTable(document.getElementById('sumStockTableDiv'));

    sumStock.redraw = function () {

        sumStock.dataOwnerJoin = sumStock.dataJoin();
        sumStock.dataView = sumStock.dataOwnerGroup();
        GLOBALS.formatinddate.format(sumStock.dataView, 0);
        sumStockTable.draw(sumStock.dataView, {showLineNumber: true});

    };

    sumStock.redraw();
    //google.visualization.events.removeAllListeners(sumStock.chartWrapper);
}

function initializeSumStockTable(data) {

    sumStock = new chart(
        div = 'sumStockTableDiv',
        data = data,
        divcol = 6,
        firstTitle = 'Stocks',
        secondTitle = "",
        sumcol = false
    );
    google.visualization.events.removeAllListeners(sumStock.chartWrapper);
    var todayStocks = 0;
    var totalStocks = 0;


    sumStock.htmldiv = '\
    <div class="demo-graphs mdl-cell mdl-cell--6-col mdl-color--white mdl-shadow--2dp" style="padding:0px" id=' + 'sumStockTableDiv' + '>\
    <div class="demo-graphs" id=test style="padding:0px">\
        <div class="firstTitle" style="padding:16px 0 0 16px">\
            Stocks\
          </div>\
          <div class="secondTitle" style="padding:0 0 0 16px">' + 'Performance' + '\
          </div>\
          <div class="mdl-card__supporting-text mdl-card--expand" id=titletext>\
            TODAY\'S GAIN/LOSS:\
          </span></div>\
          <div class="mdl-card__title" style="padding-top: 0">\
            <h2 class="mdl-card__title-text" id=todayStocks>' + todayStocks + '</h2>\
          </div>\
          \<div class="mdl-card__supporting-text" id=titletext>\
            OVERALL GAIN/LOSS:\
          </span></div>\
          <div class="mdl-card__title" style="padding-top: 0">\
            <h2 class="mdl-card__title-text" id=totalStocks>' + totalStocks + '</h2>\
          </div>\
          <div class="mdl-card__actions mdl-card--border">\
            <span>\
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="#/stocks/" onclick="loadStocksPage()">\
              View Stock Details\
            </a>\
            </span>\
              <span id="stockdetails" style="float: right;">\
              </span>\
          </div>\
        </div>\
        <div id="chartstockPricesDiv2"></div>\
    </div>';


    GLOBALS.grid.append(sumStock.htmldiv);

    sumStock.redraw = function () {

        sumStock.dataOwnerJoin = sumStock.dataJoin();
        sumStock.dataView = sumStock.dataOwnerGroup();
        var todayStocks = sumStock.dataView.getFormattedValue(0, 1);
        var todayStocksNF = sumStock.dataView.getValue(0, 1);
        var totalStocks = sumStock.dataView.getFormattedValue(0, 2);
        var totalStocksNF = sumStock.dataView.getValue(0, 2);

        $('#todayStocks').text(todayStocks);
        todayStocksNF >= 0 ? $('#todayStocks').css("color", "#4CAF50") : $('#todayStocks').css("color", "#EF5350");
        $('#totalStocks').text(totalStocks);
        totalStocksNF >= 0 ? $('#totalStocks').css("color", "#4CAF50") : $('#totalStocks').css("color", "#EF5350");


    };

    sumStock.redraw();

}




function initializeStockPrices2(stockPriceData, originalStockPrice) {

    stockPrices2 = new chart(
        div = 'stockPricesDiv2',
        data = stockPriceData,
        divcol = 6,
        firstTitle = 'Stock Prices',
        secondTitle = '',
        sumcol = false
    );
    google.visualization.events.removeAllListeners(stockPrices2.chartWrapper);
    stockPrices2.originalStockPrice = originalStockPrice;

    stockPrices2.chartWrapper.setChartType('LineChart');
    stockPrices2.chartWrapper.setOption('interpolateNulls', false);
    stockPrices2.chartWrapper.setOption('hAxis.gridlines.count', 0);
    stockPrices2.chartWrapper.setOption('vAxis.gridlines.count', 0);
    stockPrices2.chartWrapper.setOption('chartArea.left', 0);
    stockPrices2.chartWrapper.setOption('chartArea.top', 0);
    stockPrices2.chartWrapper.setOption('chartArea.width', '100%');
    stockPrices2.chartWrapper.setOption('chartArea.height', 247);
    stockPrices2.chartWrapper.setOption('vAxis.baselineColor', '#FAFAFA');
    stockPrices2.chartWrapper.setOption('lineWidth', .5);
    stockPrices2.chartWrapper.setOption('backgroundColor.fill', 'transparent');
    stockPrices2.chartWrapper.setOption('tooltip.trigger', 'none');
    stockPrices2.chartWrapper.setOption('crosshair.trigger', 'both');
    stockPrices2.chartWrapper.setOption('focusTarget', 'datum');
    stockPrices2.chartWrapper.setOption('crosshair.opacity', 0.3);
    stockPrices2.chartWrapper.setOption('vAxis.viewWindowMode', 'pretty');
    //vAxis: {textStyle: {color: GLOBALS.greyfont}, format: 'short', viewWindowMode: 'maximized'},
    //stockPrices2.chartWrapper.setOption('vAxis.viewWindow.min', 60);
    //stockPrices2.chartWrapper.setOption('vAxis.viewWindow.max', 120);

    stockPrices2.redraw = function () {

        this.dataOwnerJoin = this.dataJoin();
        this.dataView = this.dataOwnerGroup();
        GLOBALS.formatinddate.format(this.dataView, 0);
        for (var i = 1; i < this.dataView.getNumberOfColumns(); i++) {
            GLOBALS.format4decimals.format(this.dataView, i);
        }

        this.chartWrapper.setDataTable(this.dataView);

        for (var i = this.dataView.getNumberOfColumns() - 1; i > 0; i--) {

            var range = this.dataView.getColumnRange(i);
            if (range.max === 0 & range.min === 0) {
                this.dataView.removeColumn(i);
            }
        }

        this.chartWrapper.draw();


    };

    google.visualization.events.removeAllListeners(stockPrices2.chartWrapper);
    var runOnce = google.visualization.events.addListener(stockPrices2.chartWrapper, 'ready', function () {
        // remove the listener so that it doesn't stack up multiple events
        google.visualization.events.removeListener(runOnce);

        google.visualization.events.addListener(stockPrices2.chartWrapper.getChart(), 'onmouseover', displayStockDetails);
        google.visualization.events.addListener(stockPrices2.chartWrapper.getChart(), 'onmouseout', removeStockDetails);

    });

    stockPrices2.redraw();
    google.visualization.events.removeAllListeners(stockPrices2.chartWrapper);



function removeStockDetails() {

    $('#stockdetails').html('');
    //$('#accountBalance').css('background-color','white');
    $('#stockdetails').css('border-width', '0');

}

function displayStockDetails(e) {

    console.log(stockPrices2.originalStockPrice[1]);
    console.log(e.column);
    var a = (stockPrices2.dataView.getValue(e.row, e.column) * stockPrices2.originalStockPrice[1][e.column - 1] / 100).toFixed(2);
    var b = stockPrices2.dataView.getFormattedValue(e.row, 0);
    var c = stockPrices2.dataView.getColumnLabel(e.column);
    d = '<div>' + b + '</br>' + c + ': <span style="font-weight: bold">' + a + '</span></div>';
    $('#stockdetails').html(d);
    $('#stockdetails').css('border-color',GLOBALS.chartcolours[e.column]);
    $('#stockdetails').css('border-width', '2px');


}



}


function initializeBudgetChart2(budgetData) {

    budgetChart = new chart(
        div = 'budgetChartDiv',
        data = budgetData,
        divcol = 6,
        firstTitle = 'Budget',
        secondTitle = '',
        sumcol = false,
        valStartCol = 3,
        categoryEndCol = 2,
        budgetSummary = '<h2 id="title"></h2>'
    );

    initializeSumBudget(budgetChart);
    budgetChart.redraw = function () {

        this.dataOwnerJoin = this.dataJoin();
        this.dataView = this.dataOwnerGroup();
        this.dataView = budgetChart.drawBudget();
        this.chartWrapper.setDataTable(this.dataView);

        $('#chartbudgetChartDiv2').fadeTo('fast', 0, function () {
            budgetChart.chartWrapper.draw();
            $('#title').html(budgetChart.title);
        });

        $('#chartbudgetChartDiv2').fadeTo('slow', 1);

    }


    budgetChart.chartWrapper.setOptions();
    budgetChart.chartWrapper.setChartType('PieChart');

    budgetChart.chartWrapper.setOption('pieHole', 0.6);
    budgetChart.chartWrapper.setOption('colors', ['#EF9A9A', '#81C784', '#81C784', '#C8E6C9', '#E8F5E9']);
    budgetChart.chartWrapper.setOption('legend.position', 'none');
    budgetChart.chartWrapper.setOption('pieSliceText', 'none');
    budgetChart.chartWrapper.setOption('pieSliceBorderColor', 'white');
    budgetChart.chartWrapper.setOption('tooltip.trigger', 'none');
    budgetChart.chartWrapper.setOption('titleTextStyle.color', '#9E9E9E');
    budgetChart.chartWrapper.setOption('titleTextStyle.fontName', 'Roboto');
    budgetChart.chartWrapper.setOption('titleTextStyle.fontSize', '14');
    budgetChart.chartWrapper.setOption('chartArea.top', 15);
    budgetChart.chartWrapper.setOption('chartArea.width', 218);
    budgetChart.chartWrapper.setOption('chartArea.height', 218);
    budgetChart.chartWrapper.setOption('backgroundColor.fill', 'transparent');

    //GLOBALS.grid.append(budgetChart.escapeHtml(budgetChart.budgetCharthtml));
    $('#sumBudgetDiv').append('<div id=chartbudgetChartDiv2></div>');
    budgetChart.chartWrapper.setDataTable(this.dataView);
    budgetChart.chartWrapper.setContainerId('chartbudgetChartDiv2');
    budgetChart.redraw();
    google.visualization.events.removeAllListeners(budgetChart.chartWrapper);


}

function initializeSumBudget(budgetChart) {


    budgetChart.htmldiv = '\
    <div class="demo-graphs mdl-cell mdl-cell--6-col mdl-color--white mdl-shadow--2dp" style="padding:0px" id=' + 'sumBudgetDiv' + '>\
    <div class="demo-graphs" id=test style="padding:0px">\
        <div class="firstTitle" style="padding:16px 0 0 16px">\
            Budget\
          </div>\
          <div class="secondTitle" style="padding:0 0 0 16px">' + 'Month to Date' + '\
          </div>\
          <h2 id="title"></h2>\
          <div class="mdl-card__supporting-text mdl-card--expand" id=titletext>\
            </div>\
          <div class="mdl-card__actions mdl-card--border">\
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="#/budget/" onclick="loadBudgetPage()">\
              View Budget Details\
            </a>\
          </div>\
        </div>\
    </div>';


    GLOBALS.grid.append(budgetChart.htmldiv);


}


function initializeMonthlySpend2(spendingdata) {

    monthlySpend = new chart(
        div = 'monthlySpendDiv',
        data = spendingdata,
        divcol = 6,
        firstTitle = 'Spending',
        secondTitle = 'Monthly Expenses'
    );

    monthlySpend.htmldiv2 = '\
    <div class="demo-graphs mdl-cell mdl-cell--6-col mdl-color--white mdl-shadow--2dp" style="padding:0px; border-radius: 2px;" id=' + 'currentSpendingDiv' + '></div>';


    monthlySpend.htmldiv = '\
    <div class="demo-graphs mdl-cell mdl-cell--6-col mdl-color--white mdl-shadow--2dp" style="padding:0px; border-radius: 2px;" id=' + 'currentSpendingDiv' + '>\
        <div class="demo-graphs" id=test style="padding:0px">\
            <div class="firstTitle" style="padding:16px 0 0 16px">\
                Spending\
              </div>\
              <div class="secondTitle" id="secondDate" style="padding:0 0 0 16px">' + '' + '\
              </div>\
              <div class="mdl-card__title mdl-card--expand">\
                <h2 class="mdl-card__title-text" id=selectedmonthspend>' + 0 + '</h2>\
              </div>\
              <div class="mdl-card__supporting-text">\
                <div>GOAL:</div><span id=goalSpend>' + 0 + '</span></br></br><div>REMAINING:</div><span id=remaining>' + 0 + '\
              </span></div>\
              <div class="mdl-card__actions mdl-card--border">\
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="#/spending/" onclick="loadSpendingPage()">\
                  View Spending Details\
                </a>\
              </div>\
            </div>\
        <div id="chartspendingDiv2"</div>\
    </div>';

    monthlySpend.chartWrapper.setContainerId('chartspendingDiv2');

    GLOBALS.grid.append(monthlySpend.htmldiv);

    monthlySpend.chartWrapper.setChartType('ColumnChart');
    monthlySpend.chartWrapper.setOption('vAxis.minValue', 0);
    monthlySpend.chartWrapper.setOption('vAxis.minValue', 0);
    monthlySpend.chartWrapper.setOption('dataOpacity', 1);
    monthlySpend.chartWrapper.setOption('colors', ['#81C784', '#E8F5E9', '#EF9A9A']);
    monthlySpend.chartWrapper.setOption('tooltip.trigger', 'none');
    monthlySpend.chartWrapper.setOption('hAxis.gridlines.count', 0);
    monthlySpend.chartWrapper.setOption('vAxis.gridlines.count', 0);
    monthlySpend.chartWrapper.setOption('chartArea.left', 100);
    monthlySpend.chartWrapper.setOption('chartArea.top', 20);
    monthlySpend.chartWrapper.setOption('chartArea.width', '100%');
    monthlySpend.chartWrapper.setOption('chartArea.height', '100%');
    monthlySpend.chartWrapper.setOption('backgroundColor.fill', 'transparent');
    monthlySpend.chartWrapper.setOption('vAxis.baselineColor', '#E0E0E0');


    monthlySpend.redraw = function () {

        this.dataOwnerJoin = this.dataJoin(google.visualization.arrayToDataTable([
            ['Owner'],
            ['Dan'],
            ['Emma']
        ]));
        this.dataView = this.dataOwnerGroup();

        this.chartWrapper.setDataTable(this.dataView);


        google.visualization.events.removeAllListeners(monthlySpend.chartWrapper);
        var runOnce = google.visualization.events.addListener(monthlySpend.chartWrapper, 'ready', function () {
            // remove the listener so that it doesn't stack up multiple events
            google.visualization.events.removeListener(runOnce);

            google.visualization.events.addListener(monthlySpend.chartWrapper.getChart(), 'onmouseover', changeNumbers);


        });

        this.chartWrapper.draw();
        initialChange();
    };

    //$('#currentSpendingDiv').append('<div id="chartspendingDiv2"</div>');


    monthlySpend.redraw();


    function changeNumbers(e) {

        changeNumbers2(e.row);
    }

    function initialChange() {

        changeNumbers2(monthlySpend.dataView.getNumberOfRows() - 1);
    }

    function changeNumbers2(e) {
        spend = monthlySpend.dataView.getValue(e, 1);
        goal = monthlySpend.dataView.getValue(e, 2);
        overspend = monthlySpend.dataView.getValue(e, 3);
        totalspend = spend + overspend;
        revisedGoal = spend + goal;
        $('#selectedmonthspend').text(totalspend.formatMoney());
        $('#selectedmonthspend').css("color", "#4CAF50");
        $('#goalSpend').text(revisedGoal.formatMoney());
        $('#goalSpend').css("color", "#4CAF50");

        value = revisedGoal - totalspend;
        formattedValue = value.formatMoney();
        $('#remaining').text(formattedValue);
        value >= 0 ? $('#remaining').css("color", "#4CAF50") : $('#remaining').css("color", "#EF5350");
        GLOBALS.formatdate.format(monthlySpend.dataView, 0);
        $('#secondDate').text(monthlySpend.dataView.getFormattedValue(e, 0));

    };

}