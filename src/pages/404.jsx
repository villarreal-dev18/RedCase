import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="La página que buscas no existe."
      extra={
        <Link to="/">
          <Button type="primary">Volver al inicio</Button>
        </Link>
      }
    />
  );
}