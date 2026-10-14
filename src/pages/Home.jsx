import { Typography, Button } from 'antd';

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={2}>Inicio</Typography.Title>
      <Button type="primary">Ver catálogo</Button>
    </div>
  );
}