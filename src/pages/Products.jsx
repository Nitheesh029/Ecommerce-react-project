import React, { useState } from "react";
import { SlidersHorizontal, ArrowDownNarrowWide } from "lucide-react";
import { Drawer } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import { products } from "../data/products";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";
const Products = () => {
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    message.config({
      top: 300,
    });
    messageApi.open({
      type: "success",
      content: "Added to Cart!",
      duration: 1,
    });
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const sortItems = [
    {
      key: "1",
      label: "Default",
    },
    {
      key: "2",
      label: "Price low to high",
    },
    {
      key: "3",
      label: "Price high to low",
    },
    {
      key: "4",
      label: "Top Seller",
    },
  ];

  const dispatch = useDispatch();

  const handleAddToCart = (productToAdd) => {
    if (!productToAdd) return;

    dispatch(
      addItem({
        id: productToAdd.id,
        name: productToAdd.name,
        imgUrl: productToAdd.image,
        price: productToAdd.priceCents,
        quantity: 1,
        rating: productToAdd.rating.stars,
      })
    );
  };

  return (
    <div className="w-full bg-slate-50 h-full pt-10">
      <div className="w-[80%] md:max-w-7xl h-16 bg-white shadow-sm mx-auto flex items-center justify-between px-5 md:px-10 rounded-md">
        <button
          className="flex gap-3 items-center text-md hover:bg-gray-500/5 px-5 py-1 rounded-md"
          onClick={showDrawer}
        >
          <span>Filter</span>
          <SlidersHorizontal size={16} />
        </button>
        <div className="cursor-pointer flex gap-3 items-center text-md hover:bg-gray-500/5 px-5 py-1 rounded-md">
          <Dropdown
            menu={{
              items: sortItems,
              selectable: true,
              defaultSelectedKeys: ["3"],
            }}
          >
            Sort by
          </Dropdown>
        </div>

        <Drawer
          title="Filter"
          closable={true}
          onClose={onClose}
          open={open}
          placement="right"
        ></Drawer>
      </div>
      <div className="mt-10 w-[90%] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col p-4 text-center h-96"
            key={product.id}
            product={product}
          >
            <div className="w-full h-48 flex items-center justify-center mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded"
              />
            </div>

            {/* Content container with flex-grow to fill remaining space */}
            <div className="flex-grow flex flex-col justify-between min-h-0">
              <div className="flex-grow">
                <div className="w-full flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-800 text-left flex-1 mr-2 line-clamp-2 overflow-hidden">
                    {product.name}
                  </h3>
                  <div className="flex flex-col items-end">
                    <img
                      src={`src/images/ratings/rating-${
                        product.rating.stars * 10
                      }.png`}
                      alt={`${product.rating.stars} stars`}
                      className="w-16 h-3 object-contain"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      ({product.rating.count})
                    </p>
                  </div>
                </div>

                <div className="text-xl font-bold w-full text-center mb-3">
                  ${(product.priceCents / 100).toFixed(2)}
                </div>
              </div>
              {contextHolder}
              <button
                className="w-full bg-black text-white font-semibold py-2 rounded transition duration-200 hover:bg-gray-800 mt-auto"
                onClick={() => {
                  handleAddToCart(product);
                  success();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
