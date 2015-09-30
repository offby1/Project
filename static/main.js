
window.GLOBALS = {
    greyfont: '#9E9E9E',
    chartcolours: ['#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#607D8B'],
    formatdate: new google.visualization.DateFormat({pattern: 'MMM yyyy'}),
    formatinddate: new google.visualization.DateFormat({pattern: 'MMM dd, yyyy'}),
    formatamount: new google.visualization.NumberFormat({
        prefix: '$',
        negativeColor: 'red',
        fractionDigits: 0,
        negativeParens: true
    }),
    formatdecimals: new google.visualization.NumberFormat({
        prefix: '$',
        negativeColor: 'red',
        negativeParens: true
    }),
    format4decimals: new google.visualization.NumberFormat({
        fractionDigits: 4,
        negativeColor: 'red',
        negativeParens: true
    }),
    owner: google.visualization.arrayToDataTable([
        ['Owner'],
        ['Dan'],
        ['Emma']
    ]),
    grid: $('.mdl-grid'),
    cache: {}

};

$(document).ready(function() {

    $('#JointButton').click(JointButtonClick);
    $('#CurrencyButton').click(CurrencyButtonClick);
    loadHomePage();


});


function loadHomePage() {

    GLOBALS.grid.empty(); /// clears all charts on current page

    $.getJSON($SCRIPT_ROOT + '/currentbalance', {}, function (data) {

        initializeCurrentBalanceTable(data.currentBalanceData);

    });


    $.getJSON($SCRIPT_ROOT + '/budget', {}, function (data) {

        initializeBudgetChart2(data.budgetData);

    });

    $.getJSON($SCRIPT_ROOT + '/sumStockTable', {}, function (data) {

        initializeSumStockTable(data.sumStockTableData);

    });
    $.getJSON($SCRIPT_ROOT + '/balances', {}, function (data) {

        initializeBalanceChart2(data.balanceData);

    });
    $.getJSON($SCRIPT_ROOT + '/sumstockPrices', {}, function (data) {

        initializeStockPrices2(data.sumstocksPricesData);

        });

    return false;
}



function loadTransactionsPage() {

    GLOBALS.grid.empty(); /// clears all charts on current page

    $.getJSON($SCRIPT_ROOT + '/transactions', {limit:20}, function (data) {

        GLOBALS.grid.append(data.transactionDiv);
        indtranstable(data.x , data.y);

        initiateButtons();

        });
        return false;

}

function loadStocksPage() {

    GLOBALS.grid.empty();

    $.getJSON($SCRIPT_ROOT + '/stocks', {}, function (data) {

        initializeStocksChart(data.stockdata);

        });

    $.getJSON($SCRIPT_ROOT + '/stockPrices', {}, function (data) {

        initializeStockPrices(data.stocksPricesData);

        });

    $.getJSON($SCRIPT_ROOT + '/stockTable', {}, function (data) {

        initializeStockTable(data.stockTableData);

    });

        return false;



}




function loadBudgetPage() {

    GLOBALS.grid.empty();

    $.getJSON($SCRIPT_ROOT + '/budget', {}, function (data) {

        initializeBudgetChart(data.budgetData);
        initializeIndBudgetChart(data.budgetData);

    });

    return false;

}


function loadBalancesPage() {

    GLOBALS.grid.empty();

    $.getJSON($SCRIPT_ROOT + '/balances', {}, function (data) {

        initializeBalanceChart(data.balanceData);

    });
    $.getJSON($SCRIPT_ROOT + '/NIFX', {}, function (data) {

        initializeNIFXChart(data.NIFXdata);

    });
    return false;

}

function loadSpendingPage() {

    GLOBALS.grid.empty();

    $.getJSON($SCRIPT_ROOT + '/spending', {}, function (data) {

        initializeMonthlySpend(data.spendingdata);

    });

    $.getJSON($SCRIPT_ROOT + '/netincome', {}, function (data) {

        initializeNetIncomeChart(data.netincomedata);

    });

    return false;

}

function loadAccrualPage() {

    GLOBALS.grid.empty();

    $.getJSON($SCRIPT_ROOT + '/accrual', {}, function (data) {

        accrualsTable(data.accrualData);

    });
    return false;

}




function initiateButtons() {
    $('#JointButton').bind('click', function () {
        if ($('#transactions_table_div').length > 0) {
            redraw();
        }
    });


    $('#PageUpButton').bind('click', function () {

        var a = $('#PageUpButton').val();
        $('#PageUpButton').val(Number(a) + 1);
        redraw();

    });

    $('#PageDownButton').bind('click', function () {

        var a = $('#PageUpButton').val();
        $('#PageUpButton').val(Number(a) - 1);
        redraw();

    });

    $('#FirstPageButton').bind('click', function () {

        $('#PageUpButton').val(Number(1));
        redraw();

    });
};

function redraw() {

    $.getJSON($SCRIPT_ROOT + '/transactionsajax', {

            a: $('#JointButton').html(),
            b: $('#PageUpButton').val(),
            limit: 20

        }, function (x) {
            indtranstable(x.x, x.y);
        });
        return false;


}



