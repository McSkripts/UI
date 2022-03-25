import { Puff } from 'react-loading-icons';

function loadingElement(args? : {className?: string, size?: number}) {
  const loadingSize = args?.size || 2;

  return (
    <div className={`${args?.className} text-center`}>
      <Puff stroke="#000" height={`${loadingSize}rem`} width={`${loadingSize}rem`} /><br />
      Loading . . .
    </div>
  );
}

export default loadingElement; 