export const addToCart = (item) => {
    return {
        type: "ADD",
        payload: item
    }
}

export const increaseQty = (product_id, quantity) => {
    return {
        type: "INCREASE",
        payload: {
            product_id,
            quantity
        }
    }
}

export const decreaseQty = (product_id, quantity) => {
    return {
        type: "INCREASE",
        payload: {
            product_id,
            quantity
        }
    }
}