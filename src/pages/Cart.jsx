import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalQuantity,
  selectCartItems,
  selectCartTotal,
  updateItem,
  removeItem,
} from "../features/cartSlice";
import { Trash2 } from "lucide-react";

import { Divider } from "antd";
import { useEffect, useState } from "react";
function Cart() {
  const totalQuantity = useSelector(selectTotalQuantity);

  const [disabled, setDisabled] = useState(true);
  const [editingItems, setEditingItems] = useState({});
  const handleClick = (cartItem) => {
    const itemId = cartItem.id;
    const isCurrentlyEditing = editingItems[itemId];

    setEditingItems((prev) => ({
      ...prev,
      [itemId]: !isCurrentlyEditing,
    }));
  };
  const handleQuantityChange = (value, itemId) => {
    dispatch(
      updateItem({
        id: itemId,
        quantity: value,
      })
    );
  };

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = Number((useSelector(selectCartTotal) / 100).toFixed(2));
  const taxAmount = Number((cartTotal * (10 / 100)).toFixed(2));
  const totalAmount = Number((cartTotal + taxAmount).toFixed(2));
  return (
    <div
      className="mt-10 h-full max-w-[80%] md:mx-auto 
    flex xl:flex-row flex-col md:px-10 px-2 gap-10"
    >
      <div className="flex-1 flex-col h-full">
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black text-center xl:text-left">
          Cart ({totalQuantity})
        </div>

        <div className="flex flex-col w-full space-y-6 mt-10">
          {cartItems.map((cartItem) => {
            const isEditing = Boolean(editingItems[cartItem.id]);
            return (
              <div
                key={cartItem.id}
                className="w-full flex flex-col md:flex-row gap-6 items-start md:items-center bg-white shadow-sm p-4 rounded-lg"
              >
                <div className="w-full md:w-[200px] h-[200px] bg-gray-200 flex items-center justify-center rounded-lg">
                  <img
                    src={cartItem.imgUrl}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 w-full flex flex-col justify-between space-y-2">
                  <div className="flex justify-between items-center w-full text-lg font-semibold">
                    <p>{cartItem.name}</p>
                    <p>${(cartItem.price / 100).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-4 justify-between w-full">
                    <div className="w-full flex gap-4 items-center">
                      <label className="text-lg font-semibold">Quantity:</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={cartItem.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            parseInt(e.target.value) || 1,
                            cartItem.id
                          )
                        }
                        disabled={!isEditing}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                      <button
                        onClick={() => handleClick(cartItem)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        {isEditing ? "Save" : "Edit"}
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => dispatch(removeItem(cartItem.id))}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col bg-white rounded-md shadow-md px-10 py-5 md:w-[400px] w-[350px]">
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black ">
          Summary
        </div>
        <div className="flex flex-col space-y-5 mt-10">
          <div className="flex justify-between text-lg font-semibold">
            <p>Subtotal</p>
            <p>${cartTotal}</p>
          </div>
          <div className="flex justify-between text-lg font-semibold border-slate-900">
            <p>Tax(10%)</p>
            <p>${taxAmount}</p>
          </div>
          <Divider className="text-black" />
          <div className="flex justify-between text-lg font-semibold">
            <p>Total</p>
            <p>${totalAmount}</p>
          </div>
        </div>
        <button className="p-2 bg-black text-white mt-5 py-4 text-xl rounded-full hover:bg-black/65">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
