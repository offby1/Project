/**
 * Created by dangoodburn on 10/3/15.
 */

/**
 * Created by emmaachberger on 8/29/15.
 */


var chartV2 = function (div, data, divcol, firstTitle, secondTitle, sumcol, valStartCol, categoryEndCol, chartHeight, tooltip) {

    //this.filterStartDate = new Date(2014, 1, 1);
    this.divcol = divcol;
    this.data = data;
    this.firstTitle = firstTitle;
    this.secondTitle = secondTitle;
    this.valStartCol = valStartCol;
    this.categoryEndCol = categoryEndCol;
    this.chartHeight = chartHeight;
    this.tooltip = tooltip;
    if (typeof this.tooltip === 'undefined') {
        this.tooltip = false;
    }
    if (typeof this.chartHeight === 'undefined') {
        this.chartHeight = '300px';
    }
    if (typeof this.valStartCol === 'undefined') {
        this.valStartCol = 3;
    }
    if (typeof this.categoryEndCol === 'undefined') {
        this.categoryEndCol = this.valStartCol - 1;
    }

    this.tooltipDiv = 'tooltip' + div;
    this.dashboarddiv = div;
    this.chartdiv = 'chart' + div;
    this.controldiv = 'control' + div;
    this.cardDiv = 'card' + div;

    this.chartWrapper = new google.visualization.ChartWrapper({

        chartType: 'ColumnChart',
        containerId: this.chartdiv,

        options: {
            'title': '',
            isStacked: 'true',
            legend: {position: 'none'},
            colors: GLOBALS.chartcolours,
            focusTarget: 'category',
            bar: {groupWidth: "75%"},
            chartArea: {left: 40, top: 10, width: '95%', height: '90%'},
            animation: {startup: true, easing: 'inAndOut', duration: 750},
            hAxis: {baselineColor: GLOBALS.greyfont, textStyle: {color: GLOBALS.greyfont}},
            vAxis: {textStyle: {color: GLOBALS.greyfont}, format: 'short', viewWindowMode: 'maximized'},
            titleTextStyle: {color: GLOBALS.greyfont, bold: 'false', fontSize: 16},
            tooltip: {isHtml: true}
        }

    });

    this.controlWrapper = new google.visualization.ControlWrapper({

        controlType: 'ChartRangeFilter',
        'containerId': this.controldiv,
        'state': {
            'range': {
                start: this.filterStartDate
            }
        },

        'options': {
            'filterColumnIndex': 0,
            'ui': {
                chartType: 'ComboChart',
                chartOptions: {
                    isStacked: true,
                    chartArea: {left: 40, width: '95%', height: '100%'},
                    seriesType: 'bars',
                    lineWidth: 0,
                    vAxes: {0: {viewWindowMode: 'maximized'}},
                    colors: GLOBALS.chartcolours
                }
            }
        }
    });


    this.dashboard = new google.visualization.Dashboard(this.dashboarddiv);
    this.dashboard.bind(this.controlWrapper, this.chartWrapper);


    this.populateDataTable = function (data, dateCol, ownerCol, fxRateCol, sumCols) {

        if (typeof dateCol === 'undefined') {
            dateCol = 0;
        }
        if (typeof ownerCol === 'undefined') {
            ownerCol = 1;
        }
        if (typeof fxRateCol === 'undefined') {
            fxRateCol = 2;
        }
        if (typeof sumCols === 'undefined') {
            sumCols = true;
        }

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('date', data[0][0]);
        dataTable.addColumn('string', data[0][1]);
        dataTable.addColumn('number', data[0][2]);
        for (var i = 3; i < this.valStartCol; i++) {
            dataTable.addColumn('string', data[0][i]);
        }

        for (var i = this.valStartCol; i < data[0].length; i++) {
            dataTable.addColumn('number', data[0][i]);
        }

        var a = [];
        for (i = 0; i < data[1].length; i++) {

            var b = [];
            b.push(new Date(data[1][i][0]));
            b.push(data[1][i][1]);
            b.push(data[1][i][2]);
            for (var j = 3; j < this.valStartCol; j++) {
                b.push(data[1][i][j]);
            }
            // add last column that sums the total for the row
            for (var j = this.valStartCol; j < data[1][i].length; j++) {
                b.push(data[1][i][j]);
            }
            a.push(b);
        }

        dataTable.addRows(a);

        return dataTable

    };





    this.dataJoin = function (dataTable, owner2) {
        if (typeof owner2 === 'undefined') {
            owner2 = GLOBALS.owner;
        }
        var columns = dataTable.getNumberOfColumns();
        this.cols = [0];
        for (var i = 2; i < columns; i++) {
            this.cols.push(i);
        }

        var dataTable = new google.visualization.data.join(dataTable, owner2, 'inner', [
            [1, 0]
        ], this.cols, []);

        return dataTable
    };




    this.dataOwnerGroup = function (dataTable) {

        this.cols.splice(0, this.valStartCol - 1);

        var agg = [];
        for (i in this.cols) {
            agg.push({
                'column': this.cols[i],
                'aggregation': google.visualization.data.sum,
                'type': 'number'
            });

        }

        var cols2 = [];
        for (var i = 1; i <= this.categoryEndCol; i++) {
            cols2.push(i);
        }

        var dataView = new google.visualization.data.group(dataTable, cols2, agg);

        return dataView;

    };


    this.currencyChange = function (dataTable) {

        if ($('#CurrencyButton').text() === "CAD") {
            // amounts are all imported as USD. Converts all to CAD if button is selected

            for (var i = 0; i < dataTable.getNumberOfRows(); i++) {
                var rate = dataTable.getValue(i, 1);
                for (var j = this.valStartCol - 1; j < dataTable.getNumberOfColumns(); j++) {
                    dataTable.setValue(i, j, dataTable.getValue(i, j) * rate);
                }
            }
        }

        dataTable.removeColumn(1);

        return dataTable;
    };



    this.formatDateAndAmount = function (dataTable) {

        GLOBALS.formatdate.format(dataTable, 0);
        for (var i = 1; i < dataTable.getNumberOfColumns(); i++) {
            GLOBALS.formatamount.format(dataTable, i);
        }

        return dataTable;
    };



    this.initialDraw = function (data) {
        return this.populateDataTable(data);

    };

    this.redraw = function () {

        this.dataOwnerJoin = this.dataJoin(this.dataTable);
        this.dataView = this.dataOwnerGroup(this.dataOwnerJoin);
        this.dataView = this.currencyChange(this.dataView);
        this.dataView = this.formatDateAndAmount(this.dataView);
        this.dashboard.draw(this.dataView);

    };

    // CHANGES MULTIPLE OPTIONS IN ONE CALL

    this.setMultipleOptions = function(options) {

        var b = this.chartWrapper;
        options.forEach(function (value) {
            b.setOption(value[0],value[1]);
        });
    };


    //this.divcol2 = 'balancetablediv';
    //this.htmldiv2 = '<div class="demo-graphs mdl-cell mdl-cell--4-col" style="padding:0px 0px"><div id="balancetablediv" style="width:100%;"></div></div>';


    this.drawBudget = function (dataTable) {

        var budget = dataTable.getValue(0, 1);
        var actual = dataTable.getValue(0, 2);
        var actual3 = actual > budget ? budget : actual;
        var currentday = new Date();
        var day = currentday.getDate();
        var endofmonth = new Date(currentday.getYear(), currentday.getMonth() + 1, 0);
        var days = endofmonth.getDate();

        var percent = day / days * budget;
        //this.title = "<span id=SPENT>SPENT: </span><span id=SPENTV>".concat(dataTable.getFormattedValue(0, 2), "</span><br /><span id=SPENT>BUDGET: </span><span id=SPENTV>", dataTable.getFormattedValue(0, 1),"</span>");


        if (percent <= actual) {
            var overspend = Math.max(0, actual - budget);
            var actual1 = Math.max(0, percent - overspend);
            var actual2 = actual3 - percent;
            var budget1 = 0;
            var budget2 = budget - actual3;
        } else {
            var overspend = Math.max(0, actual - budget);
            var actual1 = actual3;
            var actual2 = 0;
            var budget1 = percent - actual3;
            var budget2 = budget - percent;
        }

        var budgetdata = google.visualization.arrayToDataTable([
            ['Type', 'Amount'],
            ['Actual', overspend],
            ['Actual', actual1],
            ['Actual', actual2],
            ['Budget', budget1],
            ['Budget', budget2]
        ]);

        return budgetdata;

    };


    /*
    this.drawBudget2 = function (dataTable) {

        var currentday = new Date();
        var day = currentday.getDate();
        var endofmonth = new Date(currentday.getYear(), currentday.getMonth() + 1, 0);
        var days = endofmonth.getDate();

        dataView = new google.visualization.DataTable();
        dataView.addColumn('string', 'Category');
        dataView.addColumn({
            type: 'string',
            role: 'tooltip',
            'p': {'html': true}
        });
        dataView.addColumn('number', 'Actual');
        dataView.addColumn('number', 'Actual');
        dataView.addColumn('number', 'Actual');
        dataView.addColumn('number', 'Budget');
        dataView.addColumn('number', 'Budget');

        for (var i = 0; i < dataTable.getNumberOfRows(); i++) {

            category = dataTable.getValue(i, 0);
            budget = Math.max(dataTable.getValue(i, 1), 0.0001);
            actual = dataTable.getValue(i, 2);
            actual3 = actual > budget ? budget : actual;
            percent = day / days * budget;


            //var tooltip = "Spent: ".concat(sumind.getFormattedValue(i, 2), "Budget: ", sumind.getFormattedValue(i, 1));
            var tooltip2 = '<div><span style="color: #757575">' + dataTable.getFormattedValue(i, 0) + '</span><br />Spent: ' + dataTable.getFormattedValue(i, 2) + '<br />Budget: ' + dataTable.getFormattedValue(i, 1) + '</div>';

            if (percent <= actual) {
                var overspend = Math.max(0, actual - budget);
                var actual1 = Math.max(0, percent - overspend);
                var actual2 = actual3 - percent;
                var budget1 = 0;
                var budget2 = budget - actual3;
            } else {
                var overspend = Math.max(0, actual - budget);
                var actual1 = actual3;
                var actual2 = 0;
                var budget1 = percent - actual3;
                var budget2 = budget - percent;
            }

            dataView.addRow([category, tooltip, overspend, actual1, actual2, budget1, budget2])
        }

        return dataView;
    };
    */

    this.addSumColumn = function (dataTable) {

        dataTable.addColumn('number', 'Total');
        for (var i = 0; i < data[1].length; i++) {
            var c = 0.0;
            for (var j = this.valStartCol; j < data[1][i].length; j++) {
                c += data[1][i][j];
            }

            dataTable.setValue(i, j, c)

        }
        return dataTable
    };


    this.createCardDivHTML = function () {
        return '\
            <div class="demo-graphs mdl-cell mdl-cell--' + this.divcol + '-col mdl-color--white mdl-shadow--2dp" style="padding:0px; border-radius: 2px;" id=' + this.cardDiv + '>\
            <div class="demo-graphs" id=test style="padding:0px">\
                <div class="firstTitle" style="padding:16px 0 0 16px">' + this.firstTitle + '</div>\
                <div class="secondTitle" style="padding:0 0 0 16px">' + this.secondTitle + '</div>\
                ' + this.info + '\
                <div class="mdl-card__actions mdl-card--border">\
                    <span>\
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="' + this.hrefHTML +'" onclick="' + this.onclickHTML + '">\
                            ' + this.linkHTML + '\
                        </a>\
                    </span>\
                    ' + this.tooltipHTML() + '\
                </div>\
            </div>\
            <div id=' + this.chartdiv + '></div>\
        </div>';
    };


    this.tooltipHTML = function() {

        if (this.tooltip) {
            return '<span id="' + this.tooltipDiv + '" style="float: right;"></span>'
        } else {
            return ''
        }

    };


    this.tooltipListener = function() {

        var chart = this;
        google.visualization.events.removeAllListeners(chart.chartWrapper);
        var runOnce = google.visualization.events.addListener(chart.chartWrapper, 'ready', (function () { runTwice(chart) }));
            // remove the listener so that it doesn't stack up multiple events

        function runTwice(chart) {

            google.visualization.events.removeListener(runOnce);

            var div = $('#' + chart.tooltipDiv);
            google.visualization.events.addListener(chart.chartWrapper.getChart(), 'onmouseover', (function (e) { displayTooltip(e, div, chart) }));
            google.visualization.events.addListener(chart.chartWrapper.getChart(), 'onmouseout', (function () { removeTooltip(div) }));
        }

    };

    function removeTooltip(div) {

        div.stop();
        div.fadeTo('fast', 0);

    };

    function displayTooltip(e, div, chart) {

        div.stop();
        div.fadeTo('fast', 1);

        if (typeof chart.tooltipinfo != 'undefined') {
            var a = (chart.dataView.getValue(e.row, e.column) * chart.tooltipinfo[1][e.column - 1] / 100).toFixed(2);
        }
        else {
            var a = chart.dataView.getValue(e.row, e.column).formatMoney();
        }

        var b = chart.dataView.getFormattedValue(e.row, 0);
        var c = chart.dataView.getColumnLabel(e.column);

        div.html('<div>' + b + '</br>' + c + ': <span style="font-weight: bold">' + a + '</span></div>');
        div.css('border-color', GLOBALS.chartcolours[e.column]);

    };

    this.removeZeroColumn = function(dataTable, i) {

        var range = dataTable.getColumnRange(i);
        if (range.max === 0 & range.min === 0) {
            dataTable.removeColumn(i);
        }

    };

    GLOBALS.charts.push([this]);

};



