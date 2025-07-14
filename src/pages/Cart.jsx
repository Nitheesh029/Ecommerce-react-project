import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalQuantity,
  selectCartItems,
  updateItem,
  removeItem,
} from "../features/cartSlice";
import { Trash2 } from "lucide-react";

import { Divider } from "antd";
import { useEffect, useState } from "react";
import { Button, InputNumber } from "antd";
function Cart() {
  const totalQuantity = useSelector(selectTotalQuantity);
  useEffect(() => {}, []);
  const [disabled, setDisabled] = useState(true);
  const toggle = () => {
    setDisabled(!disabled);
  };

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
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
          {cartItems.map((cartItem) => (
            <div className="w-full flex flex-col md:flex-row gap-6 items-start md:items-center bg-white shadow-sm p-4 rounded-lg">
              <div
                className="w-full md:w-[200px] h-[200px] bg-gray-200 flex items-center justify-center rounded-lg"
                key={cartItem.id}
              >
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
                    <InputNumber
                      min={1}
                      max={10}
                      value={cartItem.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateItem({
                            id: cartItem.id,
                            quantity: e.target.value,
                          })
                        )
                      }
                      disabled={disabled}
                    />
                    <Button onClick={toggle} type="primary" size="small">
                      {disabled ? "Edit" : "Save"}
                    </Button>
                  </div>
                  <div>
                    <Button
                      danger
                      type="text"
                      onClick={() => dispatch(removeItem(cartItem.id))}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col bg-white rounded-md shadow-md px-10 py-5 md:w-[400px] w-[350px]">
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black ">
          Summary
        </div>
        <div className="flex flex-col space-y-5 mt-10">
          <div className="flex justify-between text-lg font-semibold">
            <p>Subtotal</p>
            <p>1000</p>
          </div>
          <div className="flex justify-between text-lg font-semibold border-slate-900">
            <p>Tax(10%)</p>
            <p>100</p>
          </div>
          <Divider className="text-black" />
          <div className="flex justify-between text-lg font-semibold">
            <p>Total</p>
            <p>1100</p>
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
