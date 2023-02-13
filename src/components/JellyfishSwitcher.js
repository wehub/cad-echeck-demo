import React from "react";
import Helmet from 'react-helmet';

export function JellyfishSwitcher() {
  if (window.location.hostname === 'dev.wepay') {
    return (
      <Helmet>
        <script type="text/javascript" src="https://cdn.wepay.com/wepay.min.js" crossOrigin="anonymous"></script>
      </Helmet>
    );
  }

  else if (window.location.hostname === 'poc-pokedex') {
    return (
      <Helmet>
        <script type="text/javascript" src="https://poc-cdn.wepay-inc.com/wepay.min.js" crossOrigin="anonymous"></script>
      </Helmet>
    );
  }

  else if (window.location.hostname === 'tst-alpha-developer') {
    return (
      <Helmet>
        <script type="text/javascript" src="https://tst-alpha-developer.wepay-inc.com/" crossOrigin="anonymous"></script>
      </Helmet>
    );
  }

  else if (window.location.hostname === 'devtest-dev') {
    return (
      <Helmet>
        <script type="text/javascript" src="https://devtest-cdn.devops.wepay-inc.com/wepay.min.js" crossOrigin="anonymous"></script>
      </Helmet>
    );
  }

  else {
    return (
      <Helmet>
        <script type="text/javascript" src="./localJellyfish.js" crossOrigin="anonymous"></script>
      </Helmet>
    );
  }
}