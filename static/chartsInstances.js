/**
 * Created by dangoodburn on 10/3/15.
 */

//////////////////////////////////////////////////////////////////
////////////////       NET WORTH CHART      //////////////////////
//////////////////////////////////////////////////////////////////


function initializeBalanceChart(balanceData, currentBalanceData) {

    var balances = new chartV2(
        div = 'balancesDiv',
        data = balanceData,
        divcol = 6,
        firstTitle = 'Net Worth',
        secondTitle = new Date().toDateString().slice(4),
        sumcol = false,
        valStartCol = 3,
        categoryEndCol = 2,
        chartHeight = '200px',
        tooltip = true
    );

    balances.hrefHTML = "#/balances/";
    balances.onclickHTML = "loadBalancesPage()";
    balances.linkHTML = "View Balance Details";

    balances.chartWrapper.setChartType('AreaChart');
    balances.chartWrapper.setContainerId(balances.chartdiv);

    balances.setMultipleOptions([
        ['lineWidth', 0.05],
        ['areaOpacity', 0.2],
        ['animation.duration', 750],
        ['tooltip.trigger', 'none'],
        ['hAxis.gridlines.count', 0],
        ['vAxis.gridlines.count', 0],
        ['chartArea.left', 0],
        ['chartArea.width', '100%'],
        ['chartArea.height', '100%'],
        ['vAxis.baselineColor', '#E1F5FE'],
        ['backgroundColor.fill', 'transparent'],
        ['focusTarget', 'datum'],
        ['crosshair.opacity', 0.3],
        ['crosshair.trigger', 'both']
    ]);

    balances.info = '\
        <div class="mdl-card__title mdl-card--expand">\
            <h2 class="mdl-card__title-text" id=todayBalance></h2>\
        </div>\
        <div class="mdl-card__supporting-text">\
            <div>ONE MONTH AGO:</div>\
            <span id=oldBalance></span>\
            </br>\
            </br>\
            <div>CHANGE:</div>\
            <span id=change></span>\
        </div>\
        ';

    GLOBALS.grid.append(balances.createCardDivHTML());

    balances.redraw = function () {

        this.dataOwnerJoin = this.dataJoin(this.dataTable);
        this.dataView = this.dataOwnerGroup(this.dataOwnerJoin);
        this.dataView = this.currencyChange(this.dataView);
        this.chartWrapper.setDataTable(this.dataView);
        GLOBALS.formatdate.format(this.dataView, 0);
        this.chartWrapper.draw();
        currentBalance.redraw();

    };

    currentBalance = new chartV2(
        div = 'currentBalanceDiv',
        data = currentBalanceData,
        divcol = 6
    );

    currentBalance.redraw = function () {

        this.dataOwnerJoin = this.dataJoin(this.dataTable);
        this.dataView = this.dataOwnerGroup(this.dataOwnerJoin);
        this.dataView = this.currencyChange(this.dataView);
        this.dataView = this.formatDateAndAmount(this.dataView);

        var todayBalance = this.dataView.getValue(1, 1);
        var oldBalance = this.dataView.getValue(0, 1);

        formatMoneyColor('#todayBalance', todayBalance);
        formatMoneyColor('#oldBalance', oldBalance);
        formatMoneyColor('#change', todayBalance - oldBalance);
    };

    google.visualization.events.removeAllListeners(currentBalance.chartWrapper);
    google.visualization.events.removeAllListeners(balances.chartWrapper);
    balances.tooltip ? balances.tooltipListener() : void(0);

    currentBalance.dataTable = currentBalance.initialDraw(currentBalance.data);
    balances.dataTable = balances.initialDraw(balances.data);
    balances.redraw();
}



//////////////////////////////////////////////////////////////////
////////////////       BUDGET CHART       ////////////////////////
//////////////////////////////////////////////////////////////////

function initializeBudgetChart(overallbudgetData) {

    var budgetChart = new chartV2(
        div = 'budgetChartDiv',
        data = overallbudgetData,
        divcol = 6,
        firstTitle = 'Budget',
        secondTitle = 'Month to Date',
        sumcol = false,
        valStartCol = 3,
        categoryEndCol = 2,
        chartHeight = '200px',
        tooltip = false
    );

    budgetChart.hrefHTML = "#/budget/";
    budgetChart.onclickHTML = "loadBudgetPage()";
    budgetChart.linkHTML = "View Budget Details";

    budgetChart.chartWrapper.setChartType('PieChart');
    budgetChart.chartWrapper.setContainerId(budgetChart.chartdiv);

    budgetChart.chartWrapper.setOptions();  // clears options
    budgetChart.setMultipleOptions([
        ['pieHole', 0.6],
        ['colors', ['#EF9A9A', '#81C784', '#81C784', '#C8E6C9', '#E8F5E9']],
        ['legend.position', 'none'],
        ['pieSliceText', 'none'],
        ['pieSliceBorderColor', 'white'],
        ['tooltip.trigger', 'none'],
        ['titleTextStyle.fontName', 'Roboto'],
        ['titleTextStyle.fontSize', '14'],
        ['chartArea.top', 15],
        ['chartArea.width', 218],
        ['chartArea.height', 218],
        ['backgroundColor.fill', 'transparent']
    ]);

    budgetChart.title = '\
            <span id=SPENT>SPENT: </span><span id=SPENTV></span>\
            <br />\
            <span id=BUDGET>BUDGET: </span><span id=BUDGETV></span>';

    budgetChart.info = '\
            <h2 id="title"></h2>\
            <div class="mdl-card__supporting-text mdl-card--expand" id=titletext></div>';

    GLOBALS.grid.append(budgetChart.createCardDivHTML());

    budgetChart.dataTable = budgetChart.initialDraw(budgetChart.data);
    $('#title').html(budgetChart.title);

    budgetChart.redraw = function () {

        this.dataOwnerJoin = this.dataJoin(this.dataTable);
        this.dataOwnerJoin = this.dataOwnerGroup(this.dataOwnerJoin);
        this.dataOwnerJoin = this.currencyChange(this.dataOwnerJoin);
        this.dataView = this.drawBudget(this.dataOwnerJoin);
        this.dataView = this.formatDateAndAmount(this.dataView);
        this.chartWrapper.setDataTable(this.dataView);

        formatMoneyColor('#SPENTV', budgetChart.dataOwnerJoin.getValue(0, 2));
        formatMoneyColor('#BUDGETV', budgetChart.dataOwnerJoin.getValue(0, 1));

        $('#chartbudgetChartDiv').fadeTo('fast', 0, function () {
            budgetChart.chartWrapper.draw();
        });
        $('#chartbudgetChartDiv').fadeTo('slow', 1);

    };

    google.visualization.events.removeAllListeners(budgetChart.chartWrapper);
    budgetChart.tooltip ? budgetChart.tooltipListener() : void(0);

    budgetChart.redraw();
}



//////////////////////////////////////////////////////////////////
////////////////       SPENDING CHART       ////////////////////////
//////////////////////////////////////////////////////////////////




function initializeSpendingChart(spendingdata) {

    var spendingChart = new chartV2(
        div = 'monthlySpendDiv',
        data = spendingdata,
        divcol = 6,
        firstTitle = 'Spending',
        secondTitle = 'Month Year',
        sumcol = false,
        valStartCol = 3,
        categoryEndCol = 2,
        chartHeight = '200px',
        tooltip = false
    );

    spendingChart.hrefHTML = "#/spending/";
    spendingChart.onclickHTML = "loadSpendingPage()";
    spendingChart.linkHTML = "View Spending Details";

    spendingChart.chartWrapper.setChartType('ColumnChart');
    spendingChart.chartWrapper.setContainerId(spendingChart.chartdiv);

    spendingChart.setMultipleOptions([
        ['vAxis.minValue', 0],
        ['vAxis.minValue', 0],
        ['dataOpacity', 1],
        ['colors', ['#81C784', '#E8F5E9', '#EF9A9A']],
        ['tooltip.trigger', 'none'],
        ['hAxis.gridlines.count', 0],
        ['vAxis.gridlines.count', 0],
        ['chartArea.left', 100],
        ['chartArea.top', 20],
        ['chartArea.width', '100%'],
        ['chartArea.height', '100%'],
        ['backgroundColor.fill', 'transparent'],
        ['vAxis.baselineColor', '#E0E0E0']
    ]);

    spendingChart.info = '\
        <div class="mdl-card__title mdl-card--expand">\
            <h2 class="mdl-card__title-text" id=selectedmonthspend></h2>\
        </div>\
        <div class="mdl-card__supporting-text">\
            <div>GOAL:</div>\
            <span id=goalSpend></span>\
            </br>\
            </br>\
            <div>REMAINING:</div>\
            <span id=remaining></span>\
        </div>';

    GLOBALS.grid.append(spendingChart.createCardDivHTML());

    spendingChart.redraw = function () {

        this.dataOwnerJoin = this.dataJoin(this.dataTable, google.visualization.arrayToDataTable([['Owner'], ['Dan'], ['Emma']]));
        this.dataView = this.dataOwnerGroup(this.dataOwnerJoin);
        this.dataView = this.currencyChange(this.dataView);
        this.chartWrapper.setDataTable(this.dataView);
        GLOBALS.formatdate.format(this.dataView, 0);
        this.chartWrapper.draw();
        initialChange();

    };

    google.visualization.events.removeAllListeners(spendingChart.chartWrapper);
    var runOnce = google.visualization.events.addListener(spendingChart.chartWrapper, 'ready', function () {
        // remove the listener so that it doesn't stack up multiple events
        google.visualization.events.removeListener(runOnce);

        google.visualization.events.addListener(spendingChart.chartWrapper.getChart(), 'onmouseover', changeNumbers);

    });

    spendingChart.tooltip ? spendingChart.tooltipListener() : void(0);

    spendingChart.dataTable = spendingChart.initialDraw(spendingChart.data);
    spendingChart.redraw();


    function changeNumbers(e) {
        changeNumbers2(e.row);
    }

    function initialChange() {
        changeNumbers2(spendingChart.dataView.getNumberOfRows() - 1);
    }

    function changeNumbers2(e) {

        spend = spendingChart.dataView.getValue(e, 1);
        goal = spendingChart.dataView.getValue(e, 2);
        overspend = spendingChart.dataView.getValue(e, 3);

        formatMoneyColor('#selectedmonthspend', spend + overspend);
        formatMoneyColor('#goalSpend', spend + goal);
        formatMoneyColor('#remaining', goal - overspend);

        $('#cardmonthlySpendDiv .secondTitle').text(spendingChart.dataView.getFormattedValue(e, 0));

    };
}



//////////////////////////////////////////////////////////////////
////////////////       STOCKS CHART       ////////////////////////
//////////////////////////////////////////////////////////////////



function initializeStockChart(stockSumData, stockPriceData, originalStockPrice) {

    var summaryStockChart = new chartV2(
        div = 'sumStockTableDiv',
        data = stockSumData,
        divcol = 6,
        firstTitle = '',
        secondTitle = '',
        sumcol = false
        //valStartCol = 4
    );

    var stockChart = new chartV2(
        div = 'stockPricesDiv2',
        data = stockPriceData,
        divcol = 6,
        firstTitle = 'Stocks',
        secondTitle = 'Performance',
        sumcol = false,
        valStartCol = 3,
        categoryEndCol = 2,
        chartHeight = '200px',
        tooltip = true
    );

    stockChart.tooltipinfo = originalStockPrice;

    stockChart.hrefHTML = "#/stocks/";
    stockChart.onclickHTML = "loadStocksPage()";
    stockChart.linkHTML = "View Stocks Details";

    stockChart.chartWrapper.setChartType('LineChart');
    stockChart.chartWrapper.setContainerId(stockChart.chartdiv);

    stockChart.setMultipleOptions([
        ['interpolateNulls', false],
        ['hAxis.gridlines.count', 0],
        ['vAxis.gridlines.count', 0],
        ['chartArea.left', 0],
        ['chartArea.top', 0],
        ['chartArea.width', '100%'],
        ['chartArea.height', '100%'],
        ['vAxis.baselineColor', '#FAFAFA'],
        ['lineWidth', .5],
        ['backgroundColor.fill', 'transparent'],
        ['tooltip.trigger', 'none'],
        ['crosshair.trigger', 'both'],
        ['focusTarget', 'datum'],
        ['crosshair.opacity', 0.3],
        ['vAxis.viewWindowMode', 'pretty']
    ]);

    stockChart.info = '\
        <div class="mdl-card__supporting-text mdl-card--expand" id=titletext>\
            TODAY\'S GAIN/LOSS:\
          </span></div>\
          <div class="mdl-card__title" style="padding-top: 0">\
            <h2 class="mdl-card__title-text" id=todayStocks></h2>\
          </div>\
          <div class="mdl-card__supporting-text" id=titletext>\
            OVERALL GAIN/LOSS:\
          </span></div>\
          <div class="mdl-card__title" style="padding-top: 0">\
            <h2 class="mdl-card__title-text" id=totalStocks></h2>\
          </div>';

    GLOBALS.grid.append(stockChart.createCardDivHTML());

    summaryStockChart.redraw = function () {

        this.dataOwnerJoin = this.dataJoin(this.dataTable);
        this.dataView = this.dataOwnerGroup(this.dataOwnerJoin);
        this.dataView = this.currencyChange(this.dataView);
        this.chartWrapper.setDataTable(this.dataView);
        GLOBALS.formatdate.format(this.dataView, 0);

        formatMoneyColor('#todayStocks', summaryStockChart.dataView.getValue(0, 1));
        formatMoneyColor('#totalStocks', summaryStockChart.dataView.getValue(0, 2));

    };

    stockChart.redraw = function () {

        this.dataOwnerJoin = this.dataJoin(this.dataTable);
        this.dataView = this.dataOwnerGroup(this.dataOwnerJoin);
        this.dataView = this.currencyChange(this.dataView);
        this.chartWrapper.setDataTable(this.dataView);
        GLOBALS.formatinddate.format(this.dataView, 0);

        for (var i = 1; i < this.dataView.getNumberOfColumns(); i++) {
            GLOBALS.format4decimals.format(this.dataView, i);
        }

        for (var i = this.dataView.getNumberOfColumns() - 1; i > 0; i--) {
            this.removeZeroColumn(this.dataView, i);
        }

        this.chartWrapper.draw();
        summaryStockChart.redraw();

    };

    google.visualization.events.removeAllListeners(summaryStockChart.chartWrapper);
    google.visualization.events.removeAllListeners(stockChart.chartWrapper);
    stockChart.tooltip ? stockChart.tooltipListener() : void(0);

    summaryStockChart.dataTable = summaryStockChart.initialDraw(summaryStockChart.data);
    stockChart.dataTable = stockChart.initialDraw(stockChart.data);
    stockChart.redraw();
}