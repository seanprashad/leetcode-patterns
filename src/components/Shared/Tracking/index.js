import ReactGA from 'react-ga4';

const initGA = (trackingID, options) => {
  ReactGA.initialize([
    {
      trackingId: trackingID,
      gaOptions: { ...options },
    },
  ]);
};

const Event = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export { initGA, Event };
