import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Blog.css';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Modern Web Applications with React",
      date: "June 15, 2023",
      excerpt: "Exploring the power of React hooks and context API for state management in complex applications.",
      content: (
        <div>
          <p>In my journey as a full-stack developer, React has become my go-to framework for building dynamic user interfaces. The introduction of hooks has revolutionized how we manage state and side effects in functional components.</p>
          <p>Key techniques I've mastered:</p>
          <ul>
            <li>Custom hooks for reusable logic</li>
            <li>Context API for global state management</li>
            <li>Performance optimization with React.memo and useMemo</li>
            <li>Server-side rendering with Next.js</li>
          </ul>
          <p>In my recent projects, I've implemented a complex authentication flow using these techniques that reduced code duplication by 40% while improving maintainability.</p>
        </div>
      ),
      tags: ['React', 'Frontend', 'JavaScript']
    },
    {
      id: 2,
      title: "My Full-Stack Development Toolkit",
      date: "May 28, 2023",
      excerpt: "The technologies and tools that power my development workflow in 2023.",
      content: (
        <div>
          <h3>Frontend Stack</h3>
          <ul>
            <li>React.js with TypeScript</li>
            <li>Tailwind CSS for utility-first styling</li>
            <li>Redux Toolkit for state management</li>
            <li>Axios for HTTP requests</li>
          </ul>
          
          <h3>Backend Stack</h3>
          <ul>
            <li>Node.js with Express</li>
            <li>MongoDB (with Mongoose) for databases</li>
            <li>Firebase for authentication</li>
            <li>Docker for containerization</li>
          </ul>
          
          <h3>Dev Tools</h3>
          <ul>
            <li>VS Code with ESLint/Prettier</li>
            <li>Git/GitHub for version control</li>
            <li>Postman for API testing</li>
            <li>Jira for project management</li>
          </ul>
        </div>
      ),
      tags: ['Fullstack', 'Tools', 'Workflow']
    },
    {
      id: 3,
      title: "Building My Portfolio: Lessons Learned",
      date: "May 10, 2023",
      excerpt: "Reflections on designing and developing my personal portfolio website.",
      content: (
        <div>
          <p>Creating my portfolio was more than just showcasing projects - it was an opportunity to implement cutting-edge web technologies while maintaining excellent performance.</p>
          
          <h3>Key Decisions:</h3>
          <p><strong>Minimalist Design:</strong> Focused on content-first approach with clean typography and ample white space.</p>
          <p><strong>Performance Optimization:</strong> Achieved perfect Lighthouse scores through:</p>
          <ul>
            <li>Code splitting</li>
            <li>Lazy loading images</li>
            <li>Efficient CSS with Tailwind</li>
            <li>Server-side rendering</li>
          </ul>
          
          <h3>Technical Highlights</h3>
          <p>The interactive project gallery uses a custom React hook to handle smooth animations while maintaining accessibility standards. The contact form implements both client-side validation and server-side verification.</p>
        </div>
      ),
      tags: ['Portfolio', 'Design', 'Performance']
    },
    {
      id: 4,
      title: "My Journey Into Tech",
      date: "April 22, 2023",
      excerpt: "How I transitioned from mechanical engineering to software development.",
      content: (
        <div>
          <p>My path to becoming a full-stack developer was unconventional. With a background in mechanical engineering, I discovered programming through automation tasks and never looked back.</p>
          
          <h3>Key Milestones:</h3>
          <ul>
            <li><strong>2018:</strong> First exposure to Python for data analysis</li>
            <li><strong>2019:</strong> Built first web application (Flask + SQLite)</li>
            <li><strong>2020:</strong> Transitioned to JavaScript/Node.js</li>
            <li><strong>2021:</strong> Completed advanced React courses</li>
            <li><strong>2022:</strong> Launched freelance development services</li>
          </ul>
          
          <p>What excites me most about software development is the constant learning and problem-solving. Every project presents new challenges that push me to grow.</p>
        </div>
      ),
      tags: ['Career', 'Journey', 'Learning']
    }
  ];

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Raunak's Tech Blog</h1>
        <p>Sharing my journey, insights, and lessons learned as a full-stack developer</p>
      </header>
      
      <div className="blog-grid">
        {blogPosts.map(post => (
          <article key={post.id} className="blog-card">
            <div className="blog-card-content">
              <h2>{post.title}</h2>
              <p className="blog-date">{post.date}</p>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
              <Link to={`/blog/${post.id}`} className="blog-read-more">Read More →</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;