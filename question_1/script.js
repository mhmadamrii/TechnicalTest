// item's quality with prices
let a = 4550
let b = 5330
let c = 8653

const itemA = (a, quantity) => {
    let totalPrice = a * quantity

    if (quantity > 13) {
        let potongan = 231 * quantity
        let mustToPay = totalPrice - potongan
        console.log(`total price: ${totalPrice}`)        
        console.log(`total potongan: ${potongan}`)
        console.log(`must to pay: ${mustToPay}`)
    } else {
        let potongan = 0
        let mustToPay = totalPrice
        console.log(`total price: ${totalPrice}`)        
        console.log(`total potongan: ${potongan}`)
        console.log(`must to pay: ${mustToPay}`)
    }
    console.log('')
}
itemA(a, 15)



const itemB = (b, quantity) => {
    let totalPrice = b * quantity

    if (quantity > 7) {
        let potongan = 0.23     // bentuk desimal dari 23%
        let mustToPay = totalPrice - potongan
        console.log(`total price ${totalPrice}`)
        console.log(`total potongan ${potongan}`)
        console.log(`must to pay: ${mustToPay}`)
    } else {
        let potongan = 0
        let mustToPay = totalPrice
        console.log(`total price: ${totalPrice}`)        
        console.log(`total potongan: ${potongan}`)
        console.log(`must to pay: ${mustToPay}`)
    }
    console.log('')
}
itemB(b, 8)



const itemC = (c, quantity) => {
    let totalPrice = c * quantity
    let potongan = 0
    let mustToPay = totalPrice

    console.log(`total price: ${totalPrice}`)
    console.log(`total potongan: ${potongan}`)
    console.log(`must to pay: ${mustToPay}`)
}
itemC(c, 2)