import React, { useState } from 'react';
import Linktree from './components/Linktree';
import ThreeSphere from './components/ThreeSphere';
import '@fontsource/lato';

function App() {
  const [showLinktree, setShowLinktree] = useState(false);

  const handleBlobClick = () => {
    setShowLinktree(true);
  };

  return (
    <div>
      {showLinktree ? <Linktree /> : <ThreeSphere onBlobClick={handleBlobClick} />}
    </div>
  );
}

export default App;



