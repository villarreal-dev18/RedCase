import { Typography } from 'antd';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={2}>Detalle del producto</Typography.Title>
      <Typography.Text>ID del producto: {id}</Typography.Text>
    </div>
  );
}