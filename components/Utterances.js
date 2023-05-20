import React, { useEffect, useRef } from 'react';

function Utterances() {
  const containerRef = useRef();

  useEffect(() => {
    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://utteranc.es/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';
    scriptElem.setAttribute('repo', 'HoSeopLee/next-vercel-test');
    scriptElem.setAttribute('issue-term', 'pathname');
    scriptElem.setAttribute('label', '✨💬✨');
    scriptElem.setAttribute('theme', 'github-dark');
    containerRef.current.appendChild(scriptElem);

    return () => {
      // Clean up the script element when the component is unmounted
      containerRef?.current?.removeChild(scriptElem);
    };
  }, []);

  return <section ref={containerRef} />;
}

export default React.memo(Utterances);
