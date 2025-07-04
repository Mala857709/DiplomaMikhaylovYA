import { createRoot } from 'react-dom/client';
import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);