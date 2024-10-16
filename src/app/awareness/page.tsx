'use client'
import { Link } from 'react-router-dom';

const Page: React.FC = () => {
  return (
    <div>
      <a href="/awareness/guidance">
        <button>Go to Guidance Page</button>
      </a>
      <a href="/awareness/about">
        <button>Go to About Page</button>
      </a>
    </div>
  );
};

export default Page;
