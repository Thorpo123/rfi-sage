
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary for the entire app
const renderApp = () => {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      console.error("Root element not found");
      return;
    }
    
    const root = createRoot(rootElement);
    root.render(<App />);
    
    console.log("App successfully rendered");
  } catch (error) {
    console.error("Failed to render app:", error);
    // Display a visible error on the page
    document.body.innerHTML = `
      <div style="padding: 20px; color: red;">
        <h1>Error Loading Application</h1>
        <pre>${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
};

renderApp();
