
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star } from 'lucide-react';

const ProductTabs = ({ product }) => {
  return (
    <Tabs defaultValue="details">
      <TabsList className="w-full">
        <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
        <TabsTrigger value="ingredients" className="flex-1">Ingredients</TabsTrigger>
        <TabsTrigger value="usage" className="flex-1">How to Use</TabsTrigger>
        <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="p-4">
        <h3 className="font-semibold mb-2">Product Details</h3>
        <p className="text-gray-700">
          {product.description} This product is designed to provide effective relief and support for your health needs. Always read the label and follow the directions for use.
        </p>
        <ul className="list-disc list-inside mt-4 space-y-1 text-gray-700">
          <li>High-quality pharmaceutical grade ingredients</li>
          <li>Manufactured in FSSAI/CDSCO-approved facilities</li>
          <li>Rigorously tested for safety and efficacy</li>
          <li>Meets all regulatory standards</li>
        </ul>
      </TabsContent>
      <TabsContent value="ingredients" className="p-4">
        <h3 className="font-semibold mb-2">Ingredients</h3>
        <p className="text-gray-700 mb-4">
          All ingredients are pharmaceutical grade and sourced from trusted suppliers.
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Active Ingredient: [Placeholder for active ingredient]</li>
          <li>Inactive Ingredients: [Placeholder for inactive ingredients]</li>
        </ul>
      </TabsContent>
      <TabsContent value="usage" className="p-4">
        <h3 className="font-semibold mb-2">How to Use</h3>
        <p className="text-gray-700 mb-4">
          For optimal results, follow these usage instructions:
        </p>
        <ul className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Read all directions and warnings before use</li>
          <li>Take as directed by your healthcare provider</li>
          <li>Store in a cool, dry place away from direct sunlight</li>
          <li>Keep out of reach of children</li>
        </ul>
      </TabsContent>
      <TabsContent value="reviews" className="p-4">
        <h3 className="font-semibold mb-2">Customer Reviews</h3>
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={18} 
                className={i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">{product.rating || 0} out of 5</span>
          <span className="ml-2 text-gray-600">({product.reviewCount || 0} reviews)</span>
        </div>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => ( <Star key={i} size={14} className={i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} /> ))}
              </div>
              <span className="ml-2 font-medium">Great product!</span>
            </div>
            <p className="text-gray-700 text-sm">This product worked exactly as described. I'm very satisfied with my purchase.</p>
            <div className="mt-2 text-xs text-gray-500"><span className="font-medium">Rohan S.</span> - 2 weeks ago</div>
          </div>
          <div className="border-b pb-4">
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => ( <Star key={i} size={14} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} /> ))}
              </div>
              <span className="ml-2 font-medium">Good value</span>
            </div>
            <p className="text-gray-700 text-sm">Works well and arrived quickly. Would buy again.</p>
            <div className="mt-2 text-xs text-gray-500"><span className="font-medium">Priya K.</span> - 1 month ago</div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
