import React, { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Spinner, Typography } from "neetoui";
import { append, isNotNil } from "ramda";

import Carousel from "./Carousel";
import { IMAGE_URLS } from "./constants";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchProduct = async () => {
    const response = await productsApi.show();
    setProduct(response);
  };

  useEffect(() => {
    try {
      fetchProduct();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { name, description, mrp, offerPrice, imageUrl, imageUrls } = product;
  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(1);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-start">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2" style="h1" weight="semibold">
          {name}
        </Typography>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel alt={name} imageUrls={append(imageUrl, imageUrls)} />
            ) : (
              <Carousel alt={name} className="w-48" imageUrls={IMAGE_URLS} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: ${mrp}</Typography>
          <Typography weight="semibold">Offer price: ${offerPrice}</Typography>
          <Typography className="text-green-600" weight="semibold">
            {discountPercentage}% off
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Product;
