/**
 * Created by emmaachberger on 8/29/15.
 */


var chart = function (div, data, divcol, firstTitle, secondTitle, sumcol, valStartCol, categoryEndCol, chartHeight) {

    this.filterStartDate = new Date(2014, 1, 1);
    this.divcol = divcol;
    this.firstTitle = firstTitle;
    this.secondTitle = secondTitle;
    this.valStartCol = valStartCol;
    this.categoryEndCol = categoryEndCol;
    this.chartHeight = chartHeight;
    if (typeof this.chartHeight === 'undefined') {
        this.chartHeight = '300px';
    }
    if (typeof this.valStartCol === 'undefined') {
        this.valStartCol = 3;
    }
    if (typeof this.categoryEndCol === 'undefined') {
        this.categoryEndCol = this.valStartCol - 1;
    }

    this.dashboarddiv = div;
    this.chartdiv = 'chart' + div;
    this.controldiv = 'control' + div;
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
                    colors: GLOBALS.chartcolours,
                }
            }
        }
    });

    this.dashboard = new google.visualization.Dashboard(this.dashboarddiv);
    this.dashboard.bind(this.controlWrapper, this.chartWrapper);


    this.populateDataTable = function (dateCol, ownerCol, fxRateCol, sumCols) {

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

        this.dataTable = new google.visualization.DataTable();
        this.dataTable.addColumn('date', data[0][0]);
        this.dataTable.addColumn('string', data[0][1]);
        this.dataTable.addColumn('number', data[0][2]);
        for (var i = 3; i < this.valStartCol; i++) {
            this.dataTable.addColumn('string', data[0][i]);
        }

        for (var i = this.valStartCol; i < data[0].length; i++) {
            this.dataTable.addColumn('number', data[0][i]);
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

        this.dataTable.addRows(a);

        return this.dataTable

    };

    this.dataTable = this.populateDataTable();

    this.addSumColumn = function () {

        this.dataTable.addColumn('number', 'Total');
        for (i = 0; i < data[1].length; i++) {
            var c = 0.0;
            for (j = this.valStartCol; j < data[1][i].length; j++) {
                c += data[1][i][j];
            }

            this.dataTable.setValue(i, j, c)

        }

    };

    sumcol === true ? this.addSumColumn() : void(0);

    this.dataJoin = function (owner2) {
        if (typeof owner2 === 'undefined') {
            owner2 = GLOBALS.owner;
        }
        var columns = this.dataTable.getNumberOfColumns();
        cols = [0];
        for (var i = 2; i < columns; i++) {
            cols.push(i);
        }

        this.dataOwnerJoin = new google.visualization.data.join(this.dataTable, owner2, 'inner', [
            [1, 0]
        ], cols, []);

        return this.dataOwnerJoin
    };

    this.dataOwnerGroup = function () {

        cols.splice(0, this.valStartCol - 1);

        var agg = [];
        for (i in cols) {
            agg.push({
                'column': cols[i],
                'aggregation': google.visualization.data.sum,
                'type': 'number'
            });

        }

        cols2 = [];
        for (var i = 1; i <= this.categoryEndCol; i++) {
            cols2.push(i);
        }

        this.dataView = new google.visualization.data.group(this.dataOwnerJoin, cols2, agg);

        if ($('#CurrencyButton').text() === "CAD") {
            // amounts are all imported as USD. Converts all to CAD if button is selected

            for (i = 0; i < this.dataView.getNumberOfRows(); i++) {
                var rate = this.dataView.getValue(i, 1);
                for (j = this.valStartCol - 1; j < this.dataView.getNumberOfColumns(); j++) {
                    this.dataView.setValue(i, j, this.dataView.getValue(i, j) * rate);
                }
            }
        }

        this.dataView.removeColumn(1);

        GLOBALS.formatdate.format(this.dataView, 0);
        for (i = 1; i < this.dataView.getNumberOfColumns(); i++) {
            GLOBALS.formatamount.format(this.dataView, i);
        }


        return this.dataView;
    };

    this.htmldiv = '\
        <div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--' + this.divcol + '-col">\
            <div class="firstTitle">' + this.firstTitle + '</div>\
            <div class="secondTitle">' + this.secondTitle + '</div>\
            <div id="' + this.dashboarddiv + '">\
                <div id="' + this.chartdiv + '" style="height: 250px;"></div>\
                <div id="' + this.controldiv + '" style="height: 50px;"></div>\
            </div>\
        </div>';

    this.htmlChartdiv = '\
        <div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--' + this.divcol + '-col">\
            <div class="firstTitle">' + this.firstTitle + '</div>\
            <div class="secondTitle">' + this.secondTitle + '</div>\
            <style>div.google-visualization-tooltip { padding:16px 16px 0 16px; color: ' + GLOBALS.greyfont + '}</style>\
            <div id="' + this.chartdiv + '" style="height: ' + this.chartHeight + ';"></div>\
        </div>';

    this.htmlTablediv = '\
        <div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--' + this.divcol + '-col">\
            <style>div.google-visualization-tooltip { padding:0px 0px 0 0px; color: ' + GLOBALS.greyfont + '}</style>\
            <div id="' + this.dashboarddiv + '" style="height: ' + this.chartHeight + ';"></div>\
        </div>';

    this.budgetCharthtml = '\
        <div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--' + this.divcol + '-col">\
            <div class="firstTitle">' + this.firstTitle + '</div>\
            <div class="secondTitle">' + this.secondTitle + '</div>\
            <div id="image">\
                <div id="' + this.chartdiv + '" style="height: 300px;"></div>\
                <h2 id="title"></h2>\
            </div>\
        </div>';

    this.escapeHtml = function (div) {
        if (div == null)
            return '';
        return div.replace(/&/g, '&').replace(/</g, '<')
            .replace(/>/g, '>').replace(/"/g, '"');
    };

    this.redraw = function () {

        this.dataOwnerJoin = this.dataJoin();
        this.dataView = this.dataOwnerGroup();
        this.dashboard.draw(this.dataView);

    };


    this.createEndingTable = function () {

        this.endingTableView = new google.visualization.DataView(this.dataView);

        this.endingTableView.setRows([this.endingTableView.getNumberOfRows() - 1]);

        // transpose table
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Account');
        data.addColumn('number', this.endingTableView.getFormattedValue(0, 0));
        for (i = 1; i < this.endingTableView.getNumberOfColumns(); i++) {
            data.addRow([this.endingTableView.getColumnLabel(i), this.endingTableView.getValue(0, i)]);
        }

        GLOBALS.formatamount.format(data, 1);

        var vis = new table.MyTable(document.getElementById('balancetablediv'));
        vis.draw(data, {showLineNumber: true});

    };

    this.divcol2 = 'balancetablediv';
    this.htmldiv2 = '<div class="demo-graphs mdl-cell mdl-cell--4-col" style="padding:0px 0px"><div id="balancetablediv" style="width:100%;"></div></div>';

    this.escapeHtml2 = function () {
        if (this.htmldiv2 == null)
            return '';
        return this.htmldiv2.replace(/&/g, '&').replace(/</g, '<')
            .replace(/>/g, '>').replace(/"/g, '"');
    };

    this.drawBudget = function () {

        sumind = this.dataView;

        var budget = sumind.getValue(0, 1);
        var actual = sumind.getValue(0, 2);
        var actual3 = actual > budget ? budget : actual;
        var currentday = new Date();
        var day = currentday.getDate();
        var endofmonth = new Date(currentday.getYear(), currentday.getMonth() + 1, 0);
        var days = endofmonth.getDate();

        var percent = day / days * budget;
        this.title = "<span id=SPENT>SPENT: </span><span id=SPENTV>".concat(sumind.getFormattedValue(0, 2), "</span><br /><span id=SPENT>BUDGET: </span><span id=SPENTV>", sumind.getFormattedValue(0, 1),"</span>");


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

    this.drawBudget2 = function () {

        sumind = this.dataView;

        var currentday = new Date();
        var day = currentday.getDate();
        var endofmonth = new Date(currentday.getYear(), currentday.getMonth() + 1, 0);
        var days = endofmonth.getDate();

        this.budgetTable = new google.visualization.DataTable();
        this.budgetTable.addColumn('string', 'Category');
        this.budgetTable.addColumn({
            type: 'string',
            role: 'tooltip',
            'p': {'html': true}
        });
        this.budgetTable.addColumn('number', 'Actual');
        this.budgetTable.addColumn('number', 'Actual');
        this.budgetTable.addColumn('number', 'Actual');
        this.budgetTable.addColumn('number', 'Budget');
        this.budgetTable.addColumn('number', 'Budget');

        for (var i = 0; i < sumind.getNumberOfRows(); i++) {

            category = sumind.getValue(i, 0);
            budget = Math.max(sumind.getValue(i, 1), 0.0001);
            actual = sumind.getValue(i, 2);
            actual3 = actual > budget ? budget : actual;
            percent = day / days * budget;


            //var tooltip = "Spent: ".concat(sumind.getFormattedValue(i, 2), "Budget: ", sumind.getFormattedValue(i, 1));
            var tooltip = '<div><span style="color: #757575">' + sumind.getFormattedValue(i, 0) + '</span><br />Spent: ' + sumind.getFormattedValue(i, 2) + '<br />Budget: ' + sumind.getFormattedValue(i, 1) + '</div>';

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

            this.budgetTable.addRow([category, tooltip, overspend, actual1, actual2, budget1, budget2])
        }

        return this.budgetTable;
    }


};



