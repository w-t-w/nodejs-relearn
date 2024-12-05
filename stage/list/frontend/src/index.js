const {createRoot} = require('react-dom/client');

const App = require('./App');

const root = createRoot(document.getElementById('react-app'));

root.render(<App />);

