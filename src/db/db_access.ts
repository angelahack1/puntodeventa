import { connectToDatabase } from './mongodb';
import { Product } from '@/data/products';
import { ObjectId } from 'mongodb';

interface AggregatedProductRaw {
  _id: ObjectId; // MongoDB's default _id field
  id: ObjectId; // The projected 'id' field from aggregation, still an ObjectId before toString()
  qr: string;
  nombre: string;
  descripcion: string;
  sku: string;
  precio_inicial: number;
  image_url: string;
  estado: { estado: string }[];
  divisa: { divisa: string }[];
}

async function getProductsFromDB(): Promise<Product[]> {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection(process.env.MONGODB_PRODUCT_COLLECTION || 'Producto');

    const pipeline = [
      {
        $lookup: {
          from: 'CatalogoEstadosProducto',
          let: { estado: '$estado' },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$estado"] } } }],
          as: 'estado_producto'
        }
      },
      {
        $lookup: {
          from: 'CatalogoTiposDivisa',
          let: { divisa: '$divisa' },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$divisa"] } } }],
          as: 'tipo_divisa'
        }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          qr: 1,
          nombre: 1,
          descripcion: 1,
          sku: 1,
          precio_inicial: 1,
          image_url: 1,
          estado: "$estado_producto.nombre_estado",
          divisa: "$tipo_divisa.nombre_tipo"
        }
      }
    ];

    const aggregationResult = await collection.aggregate<AggregatedProductRaw>(pipeline).toArray();
    
    return aggregationResult.map(product => ({
      id: product.id.toString(),
      name: product.nombre,
      description: product.descripcion,
      price: product.precio_inicial,
      divisa: Array.isArray(product.divisa)
        ? (typeof product.divisa[0] === 'string'
            ? product.divisa[0]
            : (product.divisa[0]?.divisa ?? 'MXN'))
        : (typeof product.divisa === 'string'
            ? product.divisa
            : (product.divisa as any)?.divisa ?? 'MXN'),
      image_url: product.image_url,
      estado: Array.isArray(product.estado)
        ? (typeof product.estado[0] === 'string'
            ? product.estado[0]
            : (product.estado[0]?.estado ?? 'N/A'))
        : (typeof product.estado === 'string'
            ? product.estado
            : (product.estado as any)?.estado ?? 'N/A'),
    }));

  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    return []; 
  }
}

export { getProductsFromDB };