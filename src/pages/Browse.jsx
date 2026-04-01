import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Browse.css';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { items: allItems, requests } = useAppContext();

  const categories = ['All', 'Furniture', 'Books', 'Electronics', 'Clothing', 'Other'];

  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container browse-page animate-fade-in">
      <div className="browse-header">
        <h1 className="browse-title">Browse Items</h1>
        <p className="browse-subtitle">Find items shared by your community</p>
      </div>

      <div className="filters-section card">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search for items..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filters">
          <span className="filter-label"><Filter size={18} /> Categories:</span>
          <div className="category-buttons">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="results-info">
        Showing {filteredItems.length} results
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map(item => {
            const isRequested = requests && requests.some(req => req.itemId.toString() === item.id.toString()) || item.status === 'Claimed';
            return (
            <div key={item.id} className={`card item-card ${isRequested ? 'requested-item' : ''}`}>
              {isRequested && (
                <div className="requested-overlay">
                  Requested
                </div>
              )}
              <div className="item-image-wrapper">
                <img src={item.image} alt={item.title} className="item-image" />
                <span className={`badge ${
                  item.category === 'Furniture' ? 'badge-blue' : 
                  item.category === 'Books' ? 'badge-yellow' : 
                  item.category === 'Electronics' ? 'badge-purple' : 'badge-gray'} category-badge`}>
                  {item.category}
                </span>
              </div>
              <div className="item-content">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-owner">Shared by {item.ownerName}</p>
                <Link to={`/item/${item.id}`} className="btn btn-outline request-btn">
                  View Details
                </Link>
              </div>
            </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state card">
          <Search size={48} className="empty-icon" />
          <h3>No items found</h3>
          <p>We couldn't find any items matching your search or filter criteria.</p>
          <button className="btn btn-primary mt-4" onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Browse;
