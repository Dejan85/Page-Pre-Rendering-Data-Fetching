import path from "path";
import { promises } from "fs";

async function getData() {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await promises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((item) => item.id);
  const params = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: params,
    fallback: true,
    // fallback: "blocking",
  };
}

export default ProductDetailPage;
