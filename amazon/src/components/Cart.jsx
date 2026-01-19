import {useEffect, useState} from "react";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        setCartItems(Object.values(cart));
    };

    const updateQuantity = (id, change) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        if (!cart[id]) return;
        const newQty = cart[id].quantity + change;
        if (newQty > 10) {
            alert("Maximum quantity allowed is 10");
            return;
        }
        if (newQty <= 0)
            delete cart[id];
        else
            cart[id].quantity = newQty;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    };

    const grandTotal = cartItems.reduce((total, item) => total +item.price * item.quantity, 0);

    return(
        <div className="container my-4">
            <h2 className="mb-4">Your Cart</h2>
            {cartItems.length === 0 && (
                <p className="text-muted">Your cart is empty</p>
            )}

            {cartItems.map(item => (
                <div key={item.id} className="d-flex align-items-center border p-3 mb-3">
                    <img src={item.thumbnail} alt={item.title} style={{width: "100px", height:"100px", objectFit:"contain"}} />
                    <div className="ms-3 flex-grow-1">
                        <h5>{item.title}</h5>
                        <p>₹ {item.price}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span className="mx-3">{item.quantity}</span>
                        <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)} disabled={item.quantity >= 10}>+</button>
                    </div>
                    <div className="ms-4 fw-bold">
                        ₹ {item.price * item.quantity}
                    </div>    
                </div>
            ))}

            {cartItems.length > 0 && (
                <div className="text-end mt-4">
                    <h4>Grand Total: ₹ {grandTotal}</h4>
                    <button className="btn btn-success mt-2">Checkout</button>
                </div>
            )}
        </div>
    )

}

export default Cart;