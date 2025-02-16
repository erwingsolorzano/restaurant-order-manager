import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await apiClient.get('/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    }

    fetchMenu();
  }, []);

  return (
    <div>
      <h2>Menú</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuPage;