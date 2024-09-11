"use client";

import { useState, useEffect } from 'react';
import { fetchItems } from '../utils/api'; 

type Item = {
  _id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
};

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // New state for loading

  useEffect(() => {
    async function fetchAndSetItems() {
      setLoading(true); // Set loading to true when starting fetch
      try {
        const fetchedItems = await fetchItems(category);
        setItems(fetchedItems.data || []); 
        setError(null); // Clear any previous errors
      } catch (err) {
        setError('Failed to fetch items');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    }
    fetchAndSetItems();
  }, [category]);

  return (
    <div className="container min-h-[100vh] h-auto w-auto mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">All Posts</h1>

      <div className="flex justify-end mr-14 text-black mb-6">
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={category || ''}
          onChange={(e) => setCategory(e.target.value || null)}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Travel">Travel</option>
          <option value="Science">Science</option>
          <option value="Food">Food</option>
          <option value="Health">Health</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
          <option value="Fitness">Fitness</option>
          <option value="Finance">Finance</option>
          <option value="Automotive">Automotive</option>
          <option value="Productivity">Productivity</option>
          <option value="Arts">Arts</option>
          <option value="Social">Social</option>
          <option value="Home">Home</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="gap-6 mx-12 my-4">
        {items.map((item) => (
          <div key={item._id} style={{ boxShadow: '0 4px 6px rgba(655, 10, 0, 0.3)' }} className="bg-white border my-4 border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{item.title}</h2>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
            <div className="flex text-gray-400 justify-between mx-4 my-2 p-4">
              <span>{item.category}</span>
              <span>{item.createdAt.split('T')[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
