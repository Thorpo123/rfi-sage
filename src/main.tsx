
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Script is loading");

// Error boundary for the entire app
const renderApp = () => {
  try {
    console.log("Attempting to render app");
    
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      console.error("Root element not found");
      document.body.innerHTML = '<div style="padding: 20px; color: red;"><h1>Error: Root element not found</h1><p>Check the console for more details.</p></div>';
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
        <p>Check the console for more details.</p>
      </div>
    `;
  }
};

// Add window error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  document.body.innerHTML += `
    <div style="padding: 20px; color: red; border: 1px solid red; margin-top: 20px;">
      <h2>Runtime Error</h2>
      <p>${event.message}</p>
      <p>At: ${event.filename}:${event.lineno}:${event.colno}</p>
    </div>
  `;
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  document.body.innerHTML += `
    <div style="padding: 20px; color: red; border: 1px solid red; margin-top: 20px;">
      <h2>Unhandled Promise Rejection</h2>
      <p>${String(event.reason)}</p>
    </div>
  `;
});

// Execute with a small delay to ensure DOM is fully loaded
setTimeout(renderApp, 100);
