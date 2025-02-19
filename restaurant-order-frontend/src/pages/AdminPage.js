import { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import UserManagement from './UserManagement';
import MenuManagement from './MenuManagement';

function AdminPage() {
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Administración 🛠️
      </Typography>

      <Tabs value={tab} onChange={handleChangeTab} aria-label="tabs admin">
        <Tab label="Usuarios" />
        <Tab label="Platos" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && <UserManagement />}
        {tab === 1 && <MenuManagement />}
      </Box>
    </Container>
  );
}

export default AdminPage;
