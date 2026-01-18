import { useState } from "react"
import "./Payment.css"

function Payment({ totalAmount, onPaymentSuccess }) {
const [method, setMethod] = useState("")
const handlePayment = () => {
    if (!method) {
    alert("Please select a payment method")
    return
    }
    alert("✅ Payment Successful")
    onPaymentSuccess()
}
return (
    <div className="payment-container">
    <h2>💳 Payment – FILMHUB</h2>
    <h3>Total Amount: ₹{totalAmount}</h3>

    <div className="payment-options">
        <label>
        <input
            type="radio"
            name="payment"
            onChange={() => setMethod("UPI")}
        />
        UPI (QR Code)
        </label>
        <label>
        <input
            type="radio"
            name="payment"
            onChange={() => setMethod("NETBANKING")}
        />
        Net Banking
        </label>
    </div>
    {method === "UPI" && (
        <div className="upi-box">
        <p>Scan QR to Pay</p>
        <img src="/upi-qr.png" alt="UPI QR" />
        <p>UPI ID: filmhub@upi</p>
        </div>
    )}
    {method === "NETBANKING" && (
        <div className="netbanking-box">
        <select>
            <option>Select Bank</option>
            <option>SBI</option>
            <option>HDFC</option>
            <option>ICICI</option>
            <option>Axis</option>
        </select>
        </div>
    )}
    <button className="pay-btn" onClick={handlePayment}>
        Pay Now
    </button>
    </div>
)
}

export default Payment
