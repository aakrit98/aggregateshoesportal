import React from "react";

const CheckoutPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-medium">Product 1</p>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet
              </p>
            </div>
            <p className="font-medium">$200</p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Product 2</p>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet
              </p>
            </div>
            <p className="font-medium">$120</p>
          </div>
        </div>
        <div className="flex justify-between text-lg font-bold mb-4">
          <p>Total</p>
          <p>$320</p>
        </div>
        <form className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="cardHolder"
            >
              Card Holder
            </label>
            <input
              id="cardHolder"
              type="text"
              placeholder="Card Holder"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="expirationDate"
              >
                Expiration Date
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM"
                  className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="YY"
                  className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cvc">
                CVC
              </label>
              <input
                id="cvc"
                type="text"
                placeholder="CVC"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              placeholder="Card Number"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
