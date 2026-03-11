import React, { useState } from 'react';
import { Upload, MapPin, CheckCircle, Package } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './AddItem.css';

const AddItem = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contactless, setContactless] = useState(false);
  const [image, setImage] = useState(null);
  
  const { addItem, currentUser } = useAppContext();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("You need to be logged in to share an item!");
      navigate('/auth');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addItem({
        title,
        category,
        condition,
        description,
        location,
        contactless,
        image: image || 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' // fallback mock image if none uploaded
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setTitle('');
        setCategory('');
        setCondition('');
        setDescription('');
        setLocation('');
        setContactless(false);
        setImage(null);
        navigate('/browse');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="container add-item-page animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Share an Item</h1>
        <p className="page-subtitle">Help your community by sharing something you no longer need.</p>
      </div>

      <div className="form-container">
        {isSuccess ? (
          <div className="success-message card">
            <CheckCircle size={64} className="success-icon" />
            <h2>Item Shared Successfully!</h2>
            <p>Your item is now available for the community to request.</p>
          </div>
        ) : (
          <form className="card add-item-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="section-title"><Package size={20} /> Item Details</h3>
              
              <div className="form-group">
                <label className="form-label" htmlFor="title">Item Name</label>
                <input type="text" id="title" className="form-input" placeholder="e.g. Vintage Leather Chair" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="category">Category</label>
                  <select id="category" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select a category</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="condition">Condition</label>
                  <select id="condition" className="form-select" value={condition} onChange={(e) => setCondition(e.target.value)} required>
                    <option value="">Select condition</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea id="description" className="form-textarea" placeholder="Describe the item, its history, any wear and tear..." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title"><Upload size={20} /> Upload Image</h3>
              <label className="upload-container" style={{ display: 'block', cursor: 'pointer' }}>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                {image ? (
                  <img src={image} alt="Preview" style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '8px', objectFit: 'contain' }} />
                ) : (
                  <>
                    <Upload size={32} className="upload-icon" />
                    <p>Drag and drop an image here, or click to select a file</p>
                    <div className="btn btn-outline" style={{marginTop: '1rem'}}>
                      Browse Files
                    </div>
                  </>
                )}
              </label>
            </div>

            <div className="form-section">
              <h3 className="section-title"><MapPin size={20} /> Location & Availability</h3>
              
              <div className="form-group">
                <label className="form-label" htmlFor="location">Pick-up Location</label>
                <input type="text" id="location" className="form-input" placeholder="e.g. Downtown, near Central Park" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>

              <div className="form-group form-checkbox">
                <input type="checkbox" id="contactless" checked={contactless} onChange={(e) => setContactless(e.target.checked)} />
                <label htmlFor="contactless">Contactless pickup available</label>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline">Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Share Item'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddItem;
