import React from 'react';

const Card = ({ amount, img, checkoutHandler }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '16px', maxWidth: '200px' }}>
      <img src={img} alt="Product" style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }} />
      <p style={{ margin: '16px 0', fontSize: '18px', fontWeight: 'bold' }}>₹{amount}</p>
      <button onClick={() => checkoutHandler(amount)} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Buy Now
      </button>
    </div>
  );
};

export default Card;
