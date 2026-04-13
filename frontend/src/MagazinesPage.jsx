import { useEffect, useMemo, useState } from 'react';
import api from './api/axiosConfig';
import Magazine from './Magazine';

function MagazinesPage() {
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredMagazines = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return magazines;

    return magazines.filter((mag) =>
      mag.title?.toLowerCase().includes(term)
    );
  }, [magazines, searchTerm]);

  return (
    <div className="form-page">
      <div className="form-card" style={{ maxWidth: '1000px' }}>
        <p className="section-label">Inventory</p>
        <h1>Magazines</h1>
        <p className="section-subtitle">
          View, search, and manage all magazine inventory records.
        </p>

        <div className="search-bar-wrap">
          <input
            type="text"
            className="search-input"
            placeholder="Search magazines by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <p>Loading magazines...</p>}
        {error && <p className="form-message error">{error}</p>}
        {!loading && filteredMagazines.length === 0 && <p>No matching magazines found.</p>}

        {!loading &&
          filteredMagazines.map((mag) => (
            <Magazine
              key={mag.id}
              id={mag.id}
              title={mag.title}
              price={mag.price}
              copies={mag.copies}
              orderQty={mag.orderQty}
              currentIssue={mag.currentIssue}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
}

export default MagazinesPage;