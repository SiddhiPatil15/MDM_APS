import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('shared');
  const { items, requests, handleRequest, currentUser } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const mySharedItems = items.filter(item => item.ownerId === currentUser.id);

  const incomingRequests = requests.filter(req => req.ownerId === currentUser.id);

  const myRequests = requests.filter(req => req.requesterId === currentUser.id);

  return (
    <div className="container dashboard-page animate-fade-in">
      <div className="dashboard-header">
        <h1 className="page-title">My Dashboard</h1>
        <p className="page-subtitle">Manage your shared items and requests</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'shared' ? 'active' : ''}`}
          onClick={() => setActiveTab('shared')}
        >
          <Package size={18} /> My Shared Items
        </button>
        <button 
          className={`tab-btn ${activeTab === 'incoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('incoming')}
        >
          <Clock size={18} /> Incoming Requests ({incomingRequests.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'outgoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('outgoing')}
        >
          <CheckCircle size={18} /> My Requests
        </button>
      </div>

      <div className="dashboard-content card">
        {activeTab === 'shared' && (
          <div className="tab-pane">
            <h2 className="pane-title">Items I'm Sharing</h2>
            {mySharedItems.length > 0 ? (
              <div className="shared-items-list">
                {mySharedItems.map(item => (
                  <div key={item.id} className="shared-item-row border-b">
                    <img src={item.image} alt={item.title} className="small-thumb" />
                    <div className="shared-item-info">
                      <h3>{item.title}</h3>
                      <span className={`badge ${item.status === 'Available' ? 'badge-green' : 'badge-gray'}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="shared-item-stats">
                      <strong>{requests.filter(r => r.itemId === item.id).length}</strong> requests
                    </div>
                    <div className="shared-item-actions">
                      <button className="btn btn-outline btn-sm">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-msg">You haven't shared any items yet.</p>
            )}
          </div>
        )}

        {activeTab === 'incoming' && (
          <div className="tab-pane">
            <h2 className="pane-title">Requests for My Items</h2>
            {incomingRequests.length > 0 ? (
              <div className="requests-list">
                {incomingRequests.map(req => (
                  <div key={req.id} className="request-card">
                    <div className="req-header">
                      <div>
                        <span className="req-requester">{req.requesterName}</span> requested
                        <span className="req-item"> {req.itemTitle}</span>
                      </div>
                      <span className="req-date">{new Date(req.date).toLocaleDateString()}</span>
                    </div>
                    <p className="req-message">"{req.message}"</p>
                    <div className="req-actions">
                      {req.status === 'Pending' ? (
                        <>
                          <button className="btn btn-primary btn-sm" onClick={() => handleRequest(req.id, 'Accepted')}><CheckCircle size={16} /> Accept</button>
                          <button className="btn btn-outline btn-sm req-reject" onClick={() => handleRequest(req.id, 'Declined')}><XCircle size={16} /> Decline</button>
                        </>
                      ) : (
                        <span className={`badge ${req.status === 'Accepted' ? 'badge-green' : 'badge-gray'}`}>{req.status}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-msg">No incoming requests right now.</p>
            )}
          </div>
        )}

        {activeTab === 'outgoing' && (
          <div className="tab-pane">
            <h2 className="pane-title">My Item Requests</h2>
            {myRequests.length > 0 ? (
              <table className="requests-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Owner</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myRequests.map(req => (
                    <tr key={req.id}>
                      <td className="font-medium">{req.itemTitle}</td>
                      <td>{req.ownerName}</td>
                      <td>{new Date(req.date).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${req.status === 'Accepted' ? 'badge-green' : 'badge-yellow'}`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty-msg">You haven't requested any items yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
