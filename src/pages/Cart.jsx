function Cart() {
  return (
    <div
      className="mt-10 h-full max-w-[80%] mx-auto 
    flex xl:flex-row flex-col px-10"
    >
      <div className="flex-1 flex-col h-full">
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
          Cart
        </div>
        <div></div>
      </div>
      <div className="flex flex-col bg-white rounded-md shadow-md px-10 py-5 w-[400px]">
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black ">
          Summary
        </div>
        <div className="flex flex-col space-y-5 mt-10">
          <div className="flex justify-between text-lg font-semibold">
            <p>Subtotal</p>
            <p>1000</p>
          </div>
          <div className="flex justify-between border-b-2 text-lg font-semibold border-slate-900">
            <p>Tax(10%)</p>
            <p>100</p>
          </div>
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
