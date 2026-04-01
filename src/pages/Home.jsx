import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Search, Heart, Recycle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Home.css';

const Home = () => {
  const { items, requests } = useAppContext();
  const featuredItems = items ? items.slice(0, 3) : [];

  return (
    <div className="home-container animate-fade-in">
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <div className="badge badge-green hero-badge">
              <Recycle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/> 
              Community Sharing Platform
            </div>
            <h1 className="hero-title">Give your unused items a <span>second life.</span></h1>
            <p className="hero-subtitle">
              APS is a local community hub where you can share furniture, electronics, books, and more. 
              Help promote sustainability and resource sharing while connecting with neighbors.
            </p>
            <div className="hero-actions">
              <Link to="/add-item" className="btn btn-primary">
                <Share2 size={20} />
                Share an Item
              </Link>
              <Link to="/browse" className="btn btn-secondary">
                <Search size={20} />
                Browse Items
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop" alt="People sharing plants in community" className="main-hero-img" />
            <div className="hero-card-decoration">
              <Heart size={24} className="heart-icon" />
              <span>100+ items shared this week!</span>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section container">
        <div className="section-header">
          <h2 className="section-title">Recently Added Items</h2>
          <Link to="/browse" className="view-all-link">View all &rarr;</Link>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featuredItems.map(item => {
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
                <span className={`badge ${item.category === 'Furniture' ? 'badge-blue' : item.category === 'Books' ? 'badge-yellow' : 'badge-purple'} category-badge`}>
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
      </section>
    </div>
  );
};

export default Home;
