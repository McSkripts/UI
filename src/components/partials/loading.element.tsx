import { Puff } from 'react-loading-icons';

function loadingElement() {
  return (
    <div className="text-center">
      <Puff stroke="#000" height="2rem" width="2rem" /><br />
      Loading . . .
    </div>
  );
}

export default loadingElement; 