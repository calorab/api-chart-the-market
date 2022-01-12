module.exports = data => {
    let returnsArray = []
    let sumProfits = 0
    data.forEach(element => {
        let profit = element.sellPrice - element.buyPrice
        sumProfits = profit + sumProfits
        returnsArray.push(sumProfits)
    })
    console.log("THE ARRAY: ", returnsArray)
    return returnsArray;
}