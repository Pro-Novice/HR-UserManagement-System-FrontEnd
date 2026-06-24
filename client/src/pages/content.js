import Banner from '../components/banner';
import Pricing from '../components/pricing';
const Content = () => {
  return (
    <div className="content-container">
      <Banner />
      <main className="content">
        <h1>Welcome to My App</h1>
        <p>This is the content area.</p>
      </main>
      <Pricing />
    </div>
  );
};

export default Content;