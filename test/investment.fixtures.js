function makeInvestmentArray () {
    return testInvestments = [
        {
            id: 1, 
            symbol: 'MSFT', 
            shares: 100, 
            buy_date: new Date().toISOString(), 
            value_at_buy_date: 9600, // 96.37 does not work - decimals??
        },
        {
            id: 2, 
            symbol: 'APPL', 
            shares: 100, 
            buy_date: new Date().toISOString(), 
            value_at_buy_date: 16300, //166.14 does not work - decimals??
        },
        {
            id: 3, 
            symbol: 'GE', 
            shares: 100, 
            buy_date: new Date().toISOString(), 
            value_at_buy_date: 4900, //49.03 does not work - decimals??
        },
    ];
}

module.exports = {makeInvestmentArray}