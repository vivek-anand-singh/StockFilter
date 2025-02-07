import ScreenerForm from './components/ScreenerForm';

export default function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Stock Screener</h1>
      <ScreenerForm />
    </div>
  );
}