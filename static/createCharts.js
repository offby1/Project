/**
 * Created by emmaachberger on 8/29/15.
 */


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


function initializeMonthlySpend(spendingdata) {

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


function initializeBudgetChart(budgetData) {

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
        stockTable.dataView.removeColumns(0,1);
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
    view.hideColumns([6,7,8]); // hides account type, currency and FX rate

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


function initializeCurrentBalanceTable(data) {

    currentBalance = new chart(
        div = 'currentBalanceDiv',
        data = data,
        divcol = 4,
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
    <div class="demo-graphs mdl-cell mdl-cell--4-col mdl-color--white mdl-shadow--2dp" style="padding:0px" id=' + 'currentBalanceDiv' + '>\
    <div class="demo-graphs" id=test style="padding:0px">\
        <div class="firstTitle" style="padding:16px 0 0 16px">\
            Net Worth\
          </div>\
          \<div class="secondTitle" style="padding:0 0 0 16px">'+ formattedDate + '\
          </div>\
          <div class="mdl-card__title mdl-card--expand">\
            <h2 class="mdl-card__title-text" id=todayBalance>' + todayBalance + '</h2>\
          </div>\
          <div class="mdl-card__supporting-text">\
            <div>ONE MONTH AGO:</div></br><span id=oldBalance>' + oldBalance + '</span></br></br><div>CHANGE:</div></br><span id=change>'+ change +'\
          </span></div>\
          <div class="mdl-card__actions mdl-card--border">\
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="#/balances/" onclick="loadBalancesPage()">\
              View Balance Details\
            </a>\
          </div>\
        </div>\
    </div>';



    GLOBALS.grid.append(currentBalance.htmldiv);

    currentBalance.redraw = function () {

        currentBalance.dataOwnerJoin = currentBalance.dataJoin();
        currentBalance.dataView = currentBalance.dataOwnerGroup();
        var todayBalance = currentBalance.dataView.getFormattedValue(1,1);
        var oldBalance = currentBalance.dataView.getFormattedValue(0,1);
        var todayBalanceNF = currentBalance.dataView.getValue(1,1);
        var oldBalanceNF = currentBalance.dataView.getValue(0,1);

        var changeNF = todayBalanceNF - oldBalanceNF;

        change = changeNF.formatMoney();

        $('#todayBalance').text(todayBalance);
        $('#todayBalance').css("color","#4CAF50");
        $('#oldBalance').text(oldBalance);
        $('#oldBalance').css("color","#4CAF50");
        $('#change').text(change);

        changeNF >= 0 ? $('#change').css("color","#4CAF50") : $('#change').css("color","#EF5350");


    };

    currentBalance.redraw()
}

function initializeBalanceChart2(balanceData) {

    balances2 = new chart(
        div = 'balancesDiv2',
        data = balanceData,
        divcol = 4,
        firstTitle = 'Balances',
        secondTitle = 'Accounts Over Time',
        sumcol = true,
        valStartCol = 3,
        categoryEndCol = 2,
        chartHeight = '378px'
    );

    balances2.chartWrapper.setChartType('AreaChart');
    balances2.chartWrapper.setOption('seriesType', 'area');
    balances2.chartWrapper.setOption('lineWidth', 0);
    //balances2.chartWrapper.setOption('lineDashStyle', [1,10000000]);
    balances2.chartWrapper.setOption('areaOpacity', 0.2);
    balances2.chartWrapper.setOption('series.5.type', 'line');
    balances2.chartWrapper.setOption('animation.duration', 750);
    balances2.chartWrapper.setOption('tooltip.trigger', 'none');
    balances2.chartWrapper.setOption('hAxis.gridlines.count', 0);
    balances2.chartWrapper.setOption('vAxis.gridlines.count', 0);
    balances2.chartWrapper.setOption('chartArea.left', 0);
    balances2.chartWrapper.setOption('chartArea.width', '100%');
    balances2.chartWrapper.setOption('chartArea.height', 311);
    balances2.chartWrapper.setOption('vAxis.baselineColor','#FAFAFA');

    balances2.redraw = function() {

        this.dataOwnerJoin = this.dataJoin();
        this.dataView = this.dataOwnerGroup();
        this.chartWrapper.setDataTable(this.dataView);
        this.chartWrapper.draw();



    };

    $('#currentBalanceDiv').append('<div id="chartbalancesDiv2"</div>');

    balances2.redraw();


}




function initializeSumStockTable2(data) {

    sumStock = new chart(
        div = 'sumStockTableDiv',
        data = data,
        divcol = 4,
        firstTitle = 'Stocks',
        secondTitle = "",
        sumcol = false

    );

    GLOBALS.grid.append('<div class="demo-graphs mdl-cell mdl-cell--4-col" style="padding:0px 0px"><div id="sumStockTableDiv" style="width:100%; "></div></div>');
    var sumStockTable = new table.MyTable(document.getElementById('sumStockTableDiv'));

    sumStock.redraw = function () {

        sumStock.dataOwnerJoin = sumStock.dataJoin();
        sumStock.dataView = sumStock.dataOwnerGroup();
        GLOBALS.formatinddate.format(sumStock.dataView, 0);
        sumStockTable.draw(sumStock.dataView, {showLineNumber: true});

    };

    sumStock.redraw()
}

function initializeSumStockTable(data) {

    sumStock = new chart(
        div = 'sumStockTableDiv',
        data = data,
        divcol = 4,
        firstTitle = 'Stocks',
        secondTitle = "",
        sumcol = false

    );

    var todayStocks = 0;
    var totalStocks = 0;



    sumStock.htmldiv = '\
    <div class="demo-graphs mdl-cell mdl-cell--4-col mdl-color--white mdl-shadow--2dp" style="padding:0px" id=' + 'sumStockTableDiv' + '>\
    <div class="demo-graphs" id=test style="padding:0px">\
        <div class="firstTitle" style="padding:16px 0 0 16px">\
            Stocks\
          </div>\
          <div class="secondTitle" style="padding:0 0 0 16px">'+ 'Performance' + '\
          </div>\
          <div class="mdl-card__supporting-text mdl-card--expand" id=titletext>\
            TODAY\'S GAIN/LOSS:\
          </span></div>\
          <div class="mdl-card__title">\
            <h2 class="mdl-card__title-text" id=todayStocks>' + todayStocks + '</h2>\
          </div>\
          \<div class="mdl-card__supporting-text" id=titletext>\
            OVERALL GAIN/LOSS:\
          </span></div>\
          <div class="mdl-card__title">\
            <h2 class="mdl-card__title-text" id=totalStocks>' + totalStocks + '</h2>\
          </div>\
          <div class="mdl-card__actions mdl-card--border">\
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="#/stocks/" onclick="loadStocksPage()">\
              View Stock Details\
            </a>\
          </div>\
        </div>\
    </div>';



    GLOBALS.grid.append(sumStock.htmldiv);

    sumStock.redraw = function () {

        sumStock.dataOwnerJoin = sumStock.dataJoin();
        sumStock.dataView = sumStock.dataOwnerGroup();
        var todayStocks = sumStock.dataView.getFormattedValue(0,1);
        var todayStocksNF = sumStock.dataView.getValue(0,1);
        var totalStocks = sumStock.dataView.getFormattedValue(0,2);
        var totalStocksNF = sumStock.dataView.getValue(0,2);

        $('#todayStocks').text(todayStocks);
        todayStocksNF >= 0 ? $('#todayStocks').css("color","#4CAF50") : $('#todayStocks').css("color","#EF5350");
        $('#totalStocks').text(totalStocks);
        totalStocksNF >= 0 ? $('#totalStocks').css("color","#4CAF50") : $('#totalStocks').css("color","#EF5350");


    };

    sumStock.redraw()
}


function initializeStockPrices2(stockPriceData) {

    stockPrices2 = new chart(
        div = 'stockPricesDiv2',
        data = stockPriceData,
        divcol = 4,
        firstTitle = 'Stock Prices',
        secondTitle = 'Over Time',
        sumcol = false
    );

    stockPrices2.chartWrapper.setChartType('LineChart');
    stockPrices2.chartWrapper.setOption('interpolateNulls', false);
    stockPrices2.chartWrapper.setOption('hAxis.gridlines.count', 0);
    stockPrices2.chartWrapper.setOption('vAxis.gridlines.count', 0);
    stockPrices2.chartWrapper.setOption('chartArea.left', 0);
    stockPrices2.chartWrapper.setOption('chartArea.top', 40);
    stockPrices2.chartWrapper.setOption('chartArea.width', '100%');
    stockPrices2.chartWrapper.setOption('chartArea.height', 271);
    stockPrices2.chartWrapper.setOption('vAxis.baselineColor','#FAFAFA');
    stockPrices2.chartWrapper.setOption('lineWidth',.5);
    //stockPrices2.chartWrapper.setOption('vAxis.viewWindow.min', 60);
    //stockPrices2.chartWrapper.setOption('vAxis.viewWindow.max', 120);

    stockPrices2.redraw = function() {

        this.dataOwnerJoin = this.dataJoin();
        this.dataView = this.dataOwnerGroup();
        this.chartWrapper.setDataTable(this.dataView);

        for (var i = this.dataView.getNumberOfColumns() - 1; i>0; i--) {

            var range = this.dataView.getColumnRange(i);
            if (range.max === 0 & range.min === 0) {
                this.dataView.removeColumn(i);
            }
        }

        this.chartWrapper.draw();



    };

    $('#sumStockTableDiv').append('<div id="chartstockPricesDiv2"></div>');

    stockPrices2.redraw();

}




function initializeBudgetChart2(budgetData) {

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
    budgetChart.chartWrapper.setOption('chartArea.top', 37);
    budgetChart.chartWrapper.setOption('chartArea.width', '85%');
    budgetChart.chartWrapper.setOption('chartArea.height', '80%');

    //GLOBALS.grid.append(budgetChart.escapeHtml(budgetChart.budgetCharthtml));
    $('#sumBudgetDiv').append('<div id=chartbudgetChartDiv2></div>');
    budgetChart.chartWrapper.setDataTable(this.dataView);
    budgetChart.chartWrapper.setContainerId('chartbudgetChartDiv2');
    budgetChart.redraw();

}

function initializeSumBudget(budgetChart) {


    budgetChart.htmldiv = '\
    <div class="demo-graphs mdl-cell mdl-cell--4-col mdl-color--white mdl-shadow--2dp" style="padding:0px" id=' + 'sumBudgetDiv' + '>\
    <div class="demo-graphs" id=test style="padding:0px">\
        <div class="firstTitle" style="padding:16px 0 0 16px">\
            Budget\
          </div>\
          <div class="secondTitle" style="padding:0 0 0 16px">'+ 'Month to Date' + '\
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
