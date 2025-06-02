
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash, X } from 'lucide-react';
import { Select } from '@/components/ui/select';
import { categories } from '@/data/categories';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products_db') || '[]');
    setProducts(savedProducts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: currentProduct ? currentProduct.id : Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
      inStock: true,
      rating: 0,
      reviewCount: 0,
      images: [formData.image],
      prescriptionNeeded: false,
      isPopular: false,
      isFeatured: false
    };

    // Update both local state and localStorage
    const updatedProducts = currentProduct 
      ? products.map(p => p.id === currentProduct.id ? newProduct : p)
      : [...products, newProduct];

    setProducts(updatedProducts);
    
    // Update both storage locations
    localStorage.setItem('products_db', JSON.stringify(updatedProducts));
    
    // Get existing products from products.js through localStorage
    const existingProducts = JSON.parse(localStorage.getItem('products_js') || '[]');
    const updatedProductsJs = currentProduct
      ? existingProducts.map(p => p.id === currentProduct.id ? newProduct : p)
      : [...existingProducts, newProduct];
    
    // Update products.js data in localStorage
    localStorage.setItem('products_js', JSON.stringify(updatedProductsJs));
    
    // Force reload to update products display
    window.location.reload();
    
    closeModal();
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      image: product.images[0]
    });
    setIsModalOpen(true);
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products_db', JSON.stringify(updatedProducts));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      image: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={openModal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b">
                <td className="p-4">
                  <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">
                  <Button variant="ghost" onClick={() => handleEdit(product)} className="mr-2">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" className="text-red-600" onClick={() => handleDelete(product.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {currentProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <Button variant="ghost" onClick={closeModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="image">Product Image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({
                          ...prev,
                          image: reader.result
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {currentProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
