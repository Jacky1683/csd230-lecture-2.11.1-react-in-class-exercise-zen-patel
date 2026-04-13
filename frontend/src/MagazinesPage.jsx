import { useEffect, useState } from 'react';
import api from './api/axiosConfig';
import Magazine from './Magazine';

function MagazinesPage() {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMagazines();
  }, []);

  const loadMagazines = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/magazines');
      setMagazines(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load magazines. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/magazines/${id}`);
      setMagazines((prev) => prev.filter((mag) => mag.id !== id));
    } catch (err) {
      setError('Failed to delete magazine.');
    }
  };

  const handleUpdate = async (id, updatedMagazine) => {
    try {
      const response = await api.put(`/api/magazines/${id}`, updatedMagazine);
      setMagazines((prev) =>
        prev.map((mag) => (mag.id === id ? response.data : mag))
      );
    } catch (err) {
      setError('Failed to update magazine.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-card" style={{ maxWidth: '1000px' }}>
        <p className="section-label">Inventory</p>
        <h1>Magazines</h1>
        <p className="section-subtitle">
          View, update, and manage all magazine inventory records.
        </p>

        {loading && <p>Loading magazines...</p>}
        {error && <p className="form-message error">{error}</p>}
        {!loading && magazines.length === 0 && <p>No magazines available.</p>}

        {!loading &&
          magazines.map((mag) => (
            <Magazine
              key={mag.id}
              id={mag.id}
              title={mag.title}
              price={mag.price}
              copies={mag.copies}
              orderQty={mag.orderQty}
              currentIssue={mag.currentIssue}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
      </div>
    </div>
  );
}

export default MagazinesPage;