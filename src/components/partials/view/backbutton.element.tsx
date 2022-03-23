import { Button } from 'react-bootstrap';
import { To, useNavigate } from "react-router-dom";

function BackButton() {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1 as To, { replace: true });
  }

  return (
    <div className="d-grid gap-2">
      <Button onClick={() => goBack()} className="mb-2">🠔 Go back</Button>
    </div>
  )
}

export default BackButton;