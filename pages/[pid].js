import path from "path";
import { promises } from "fs";

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

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

  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await promises.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          pid: "p1",
        },
      },
      {
        params: {
          pid: "p2",
        },
      },
      {
        params: {
          pid: "p3",
        },
      },
    ],
    fallback: false,
  };
}

export default ProductDetailPage;
