import path from "path";
import { promises } from "fs";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");

  const jsonData = await promises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
