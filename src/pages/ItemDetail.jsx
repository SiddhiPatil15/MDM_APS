import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, User, Calendar, ShieldCheck, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './ItemDetail.css';

const ItemDetail = () => {
  const { id } = useParams();
  const [requestSent, setRequestSent] = useState(false);
  const { items, requestItem, currentUser } = useAppContext();

  const item = items.find(i => i.id.toString() === id);

  if (!item) {
    return <div className="container" style={{paddingTop: '2rem'}}><h2>Item not found</h2></div>;
  }

  const handleRequest = () => {
    if (!currentUser) {
      alert("Please login to request items");
      return;
    }
    const success = requestItem(item.id, "I would like to request this item please!");
    if (success) setRequestSent(true);
  };

  return (
    <div className="container item-detail-page animate-fade-in">
      <Link to="/browse" className="back-link">&larr; Back to Browse</Link>
      
      <div className="item-detail-content card">
        <div className="item-detail-image-sec">
          <img src={item.image} alt={item.title} className="detail-image" />
          <div className={`badge ${
            item.category === 'Furniture' ? 'badge-blue' : 
            item.category === 'Books' ? 'badge-yellow' : 
            item.category === 'Electronics' ? 'badge-purple' : 'badge-gray'} detail-category-badge`}>
            {item.category}
          </div>
        </div>

        <div className="item-detail-info">
          <div className="detail-header">
            <h1 className="detail-title">{item.title}</h1>
            <span className="badge badge-green">Condition: {item.condition}</span>
          </div>
          
          <div className="detail-meta">
            <span className="meta-item"><Calendar size={16} /> Added {item.addedOn}</span>
            <span className="meta-item"><MapPin size={16} /> {item.location}</span>
          </div>

          <div className="detail-description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          {item.contactless && (
            <div className="contactless-banner">
              <ShieldCheck size={20} className="banner-icon" />
              <span>Contactless pickup available for this item</span>
            </div>
          )}

          <div className="owner-card">
            <div className="owner-avatar">
              <User size={24} />
            </div>
            <div className="owner-info">
              <span className="owner-name">{item.ownerName}</span>
              <span className="owner-stats">★ 4.8 • Member since 2022 • 14 items shared</span>
            </div>
            <button className="btn btn-outline owner-msg-btn">
              <MessageSquare size={16} /> Contact
            </button>
          </div>

          <div className="detail-actions">
            {requestSent ? (
              <div className="request-success">
                <ShieldCheck size={20} /> Request Sent Successfully! The owner will review it soon.
              </div>
            ) : (
              <button className="btn btn-primary full-width-btn" onClick={handleRequest}>
                Request This Item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
