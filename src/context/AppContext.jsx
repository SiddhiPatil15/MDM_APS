import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// Initial mock data
const initialItems = [
  { id: 1, title: 'Vintage Leather Chair', category: 'Furniture', condition: 'Good', description: 'Beautiful vintage chair.', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600', ownerId: 'user1', ownerName: 'Alice M.', location: 'Downtown', contactless: true, status: 'Available', addedOn: new Date().toISOString() },
  { id: 2, title: 'Introduction to Algorithms', category: 'Books', condition: 'Like New', description: 'Algorithm textbook.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600', ownerId: 'user2', ownerName: 'Bob C.', location: 'Uptown', contactless: false, status: 'Available', addedOn: new Date().toISOString() },
];

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  // Load from local storage or use initial data
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('aps_items');
    return saved ? JSON.parse(saved) : initialItems;
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('aps_requests');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('aps_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('aps_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    const user = localStorage.getItem('aps_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const login = (email, password) => {
    // Mock login
    const user = { id: 'user_' + Date.now(), name: email.split('@')[0], email };
    setCurrentUser(user);
    localStorage.setItem('aps_user', JSON.stringify(user));
    return true;
  };

  const signup = (name, email, password) => {
    // Mock signup
    const user = { id: 'user_' + Date.now(), name, email };
    setCurrentUser(user);
    localStorage.setItem('aps_user', JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('aps_user');
  };

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      status: 'Available',
      addedOn: new Date().toISOString()
    };
    setItems([newItem, ...items]);
  };

  const requestItem = (itemId, message) => {
    if (!currentUser) return false;
    const item = items.find(i => i.id.toString() === itemId.toString());
    if (!item) return false;

    const newRequest = {
      id: Date.now().toString(),
      itemId: item.id.toString(),
      itemTitle: item.title,
      ownerId: item.ownerId,
      ownerName: item.ownerName,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      message,
      status: 'Pending',
      date: new Date().toISOString()
    };
    setRequests([newRequest, ...requests]);
    return true;
  };

  const handleRequest = (requestId, action) => {
    // action is 'Accepted' or 'Declined'
    setRequests(requests.map(req => 
      req.id.toString() === requestId.toString() ? { ...req, status: action } : req
    ));

    if (action === 'Accepted') {
      const req = requests.find(r => r.id.toString() === requestId.toString());
      if (req) {
        setItems(items.map(item => 
          item.id.toString() === req.itemId.toString() ? { ...item, status: 'Claimed' } : item
        ));
      }
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      login,
      signup,
      logout,
      items,
      addItem,
      requests,
      requestItem,
      handleRequest
    }}>
      {children}
    </AppContext.Provider>
  );
};
