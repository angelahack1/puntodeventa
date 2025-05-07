import { Product } from '@/data/products';
import Image from 'next/image';


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image 
          src={product.image_url} 
          alt={product.name} 
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)} {product.divisa}</p>
        <p className="text-lg font-bold text-yellow-600">{product.estado}</p>
      </div>
    </div>
  );
} 
