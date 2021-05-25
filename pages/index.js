import path from "path";
import { promises } from "fs";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>
          <Link href={`/products/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await promises.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
