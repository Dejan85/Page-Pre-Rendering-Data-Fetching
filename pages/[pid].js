import React from "react";

const ProductDetailPage = () => {
  return (
    <>
      <h1>TITLE</h1>
      <p>DESCRIPTION</p>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
}

export default ProductDetailPage;
