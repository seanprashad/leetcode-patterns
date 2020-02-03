import ReactGA from 'react-ga';

const initGA = (trackingID, options) => {
  ReactGA.initialize(trackingID, { ...options });
};

const PageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

const Event = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export { initGA, PageView, Event };
