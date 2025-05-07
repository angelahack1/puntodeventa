import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { initializeProducts } from "@/db/db_access";


export default async function Home() {
  await initializeProducts(); // Fetch products before rendering
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
