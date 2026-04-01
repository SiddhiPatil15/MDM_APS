import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// Initial mock data
const initialItems = [
  { id: 1, title: 'Vintage Leather Chair', category: 'Furniture', condition: 'Good', description: 'Beautiful vintage chair.', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600', ownerId: 'user1', ownerName: 'Alice M.', location: 'Downtown', contactless: true, status: 'Available', addedOn: new Date().toISOString() },
  { id: 2, title: 'Introduction to Algorithms', category: 'Books', condition: 'Like New', description: 'Algorithm textbook.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600', ownerId: 'user2', ownerName: 'Bob C.', location: 'Uptown', contactless: false, status: 'Available', addedOn: new Date().toISOString() },
  { id: 3, title: 'Acoustic Guitar', category: 'Music', condition: 'Good', description: 'Yamaha acoustic guitar, plays well.', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=600', ownerId: 'user3', ownerName: 'Charlie P.', location: 'Westside', contactless: true, status: 'Available', addedOn: new Date().toISOString() },
  { id: 4, title: 'Cordless Drill', category: 'Tools', condition: 'Fair', description: 'Working drill with battery and charger.', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600', ownerId: 'user4', ownerName: 'David L.', location: 'North Hills', contactless: true, status: 'Available', addedOn: new Date().toISOString() },
  { id: 5, title: 'Smart TV 43"', category: 'Electronics', condition: 'Like New', description: '4K Smart TV in perfect condition.', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600', ownerId: 'user1', ownerName: 'Alice M.', location: 'Downtown', contactless: false, status: 'Available', addedOn: new Date().toISOString() },
  { id: 6, title: 'Mountain Bicycle', category: 'Sports', condition: 'Good', description: 'Mountain bike, recently serviced.', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600', ownerId: 'user5', ownerName: 'Eve S.', location: 'Southpark', contactless: true, status: 'Available', addedOn: new Date().toISOString() },
  { id: 7, title: 'Coffee Maker', category: 'Appliances', condition: 'Good', description: 'Drip coffee maker, clean.', image: 'https://images.unsplash.com/photo-1520970014086-2208d157c9e4?auto=format&fit=crop&q=80&w=600', ownerId: 'user2', ownerName: 'Bob C.', location: 'Uptown', contactless: true, status: 'Available', addedOn: new Date().toISOString() },
  { id: 8, title: 'Set of Dumbbells', category: 'Sports', condition: 'Like New', description: 'Adjustable dumbbell set up to 20kg.', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600', ownerId: 'user6', ownerName: 'Frank T.', location: 'Eastside', contactless: false, status: 'Available', addedOn: new Date().toISOString() }
];

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aps_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const newItems = [...parsed];
          initialItems.forEach(initItem => {
            if (!newItems.find(i => i.id === initItem.id)) {
              newItems.push(initItem);
            }
          });
          return newItems;
        }
      }
    } catch (error) {
      console.error('Failed to parse aps_items from localStorage:', error);
    }
    return initialItems;
  });

  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('aps_requests');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      console.error('Failed to parse aps_requests from localStorage:', error);
    }
    return [];
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
