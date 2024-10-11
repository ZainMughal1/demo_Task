'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddOrUpdateProduct = async () => {
    try {
      if (editingProduct) {
        await axios.put(`${baseURL}/api/products/${editingProduct.id}`, { name, description, price });
      } else {
        await axios.post(`${baseURL}/api/product`, { name, description, price });
      }
      setName('');
      setDescription('');
      setPrice('');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseURL}/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Product Management</h1>

        {/* Form to Add or Edit Product */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
            />
            <input
              type="number"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Product Price"
            />
            <textarea
              className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
            ></textarea>
            <button
              onClick={handleAddOrUpdateProduct}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors sm:col-span-3"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </div>

        {/* Display the list of products */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl mb-4">Products List</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.id} className="border-b border-gray-200 pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="text-lg font-semibold text-gray-800">
                    {product.name} - ${product.price}
                  </div>
                  <div className="text-gray-600 text-sm mb-2 sm:mb-0">{product.description}</div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-400 text-white py-1 px-3 rounded-lg hover:bg-yellow-500 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
