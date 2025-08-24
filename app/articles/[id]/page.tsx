import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleHeader from '@/components/article/article-header';
import ArticleContent from '@/components/article/article-content';
import ArticleAuthor from '@/components/article/article-author';
import RelatedArticles from '@/components/article/related-articles';
import ShareArticle from '@/components/article/share-article';
import ArticleComments from '@/components/article/article-comments';
import TableOfContents from '@/components/article/table-of-contents';
import AdBanner from '@/components/ad-banner';
import ScrollToTop from '@/components/common/scroll-to-top';
import MoreFromAuthor from '@/components/article/more-from-author';
import YouMightLike from '@/components/article/you-might-like';
import { Separator } from '@/components/ui/separator';

// Mock articles data
const articles = [
  {
    id: '1',
    title: 'Understanding Modern Web Development Frameworks',
    excerpt: 'An in-depth look at current web development frameworks and how to choose the right one for your project.',
    content: `<p>Modern web development has evolved significantly over the past decade. With the rise of single-page applications (SPAs) and progressive web apps (PWAs), the way we build for the web has fundamentally changed.</p>
    <h2>The Evolution of Web Frameworks</h2>
    <p>From jQuery to React, Vue, and Angular, web frameworks have come a long way. Each iteration has brought new capabilities and paradigms to web development.</p>
    <h2>Choosing the Right Framework</h2>
    <p>Several factors should influence your choice of framework:</p>
    <ul>
      <li>Project requirements and scale</li>
      <li>Team expertise and learning curve</li>
      <li>Community support and ecosystem</li>
      <li>Performance considerations</li>
    </ul>`,
    publishedAt: '2024-03-20T10:00:00Z',
    readTime: '8 min read',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
    author: {
      name: 'Alex Johnson',
      role: 'Senior Developer',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Alex has been developing web applications for over a decade and loves sharing his knowledge with the community.',
      articles: [
        {
          id: '2',
          title: 'The Future of JavaScript Frameworks',
          excerpt: 'Exploring upcoming trends and innovations in JavaScript frameworks.',
          image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
          category: 'Technology',
          publishedAt: '2024-03-15T10:00:00Z',
          readTime: '6 min'
        },
        {
          id: '3',
          title: 'Building Scalable Web Applications',
          excerpt: 'Best practices for creating maintainable and scalable web apps.',
          image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg',
          category: 'Programming',
          publishedAt: '2024-03-10T10:00:00Z',
          readTime: '10 min'
        },
        {
          id: '4',
          title: 'Modern CSS Techniques',
          excerpt: 'Advanced CSS features and methodologies for modern web development.',
          image: 'https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg',
          category: 'Web Design',
          publishedAt: '2024-03-05T10:00:00Z',
          readTime: '7 min'
        }
      ]
    },
    tags: ['Web Development', 'JavaScript', 'Programming', 'Technology'],
    views: 1240,
    bookmarks: 78
  },
  {
    id: '2',
    title: 'The Future of JavaScript Frameworks',
    excerpt: 'Exploring upcoming trends and innovations in JavaScript frameworks.',
    content: `<p>JavaScript frameworks continue to evolve at a rapid pace. As we look toward the future, several trends are emerging that will shape how we build web applications.</p>
    <h2>Server-Side Rendering Renaissance</h2>
    <p>The pendulum is swinging back toward server-side rendering, but with modern twists that combine the best of both worlds.</p>
    <h2>Edge Computing Integration</h2>
    <p>Frameworks are increasingly integrating with edge computing platforms to deliver faster, more responsive applications.</p>`,
    publishedAt: '2024-03-15T10:00:00Z',
    readTime: '6 min read',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
    author: {
      name: 'Alex Johnson',
      role: 'Senior Developer',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Alex has been developing web applications for over a decade and loves sharing his knowledge with the community.',
      articles: []
    },
    tags: ['JavaScript', 'Frameworks', 'Future Tech', 'Web Development'],
    views: 892,
    bookmarks: 45
  },
  {
    id: '3',
    title: 'Building Scalable Web Applications',
    excerpt: 'Best practices for creating maintainable and scalable web apps.',
    content: `<p>Building applications that can scale effectively requires careful planning and adherence to proven architectural patterns.</p>
    <h2>Architecture Patterns</h2>
    <p>Understanding different architectural patterns is crucial for building scalable applications.</p>
    <h2>Performance Optimization</h2>
    <p>Performance should be considered from the beginning of the development process, not as an afterthought.</p>`,
    publishedAt: '2024-03-10T10:00:00Z',
    readTime: '10 min read',
    category: 'Programming',
    image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg',
    author: {
      name: 'Sarah Chen',
      role: 'Tech Lead',
      avatar: 'https://i.pravatar.cc/150?img=2',
      bio: 'Sarah specializes in building large-scale applications and has extensive experience in system architecture.',
      articles: []
    },
    tags: ['Scalability', 'Architecture', 'Performance', 'Best Practices'],
    views: 1567,
    bookmarks: 123
  },
  {
    id: '4',
    title: 'Modern CSS Techniques',
    excerpt: 'Advanced CSS features and methodologies for modern web development.',
    content: `<p>CSS has evolved tremendously in recent years, offering powerful new features that make styling more efficient and maintainable.</p>
    <h2>CSS Grid and Flexbox</h2>
    <p>Modern layout techniques have revolutionized how we approach web design.</p>
    <h2>Custom Properties and Calc()</h2>
    <p>CSS custom properties provide a native way to create reusable values and dynamic styling.</p>`,
    publishedAt: '2024-03-05T10:00:00Z',
    readTime: '7 min read',
    category: 'Web Design',
    image: 'https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg',
    author: {
      name: 'Mike Rodriguez',
      role: 'UI/UX Designer',
      avatar: 'https://i.pravatar.cc/150?img=3',
      bio: 'Mike is passionate about creating beautiful, accessible user interfaces using the latest CSS techniques.',
      articles: []
    },
    tags: ['CSS', 'Web Design', 'Frontend', 'Styling'],
    views: 743,
    bookmarks: 67
  }
];

function getArticleById(id: string) {
  return articles.find(article => article.id === id);
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = getArticleById(params.id);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    }
  };
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
  ];
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen pb-16">
      <ArticleHeader article={article} />
      
      {/* Add spacing to account for overlapping card */}
      <div className="pt-40">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Table of Contents */}
            <aside className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <TableOfContents activeSection="introduction" />
                <AdBanner type="sidebar" />
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:w-2/4">
              <ArticleContent content={article.content} />
              <Separator className="my-8" />
              <ArticleAuthor author={article.author} />
              <AdBanner type="wide" className="my-8" />
              <ArticleComments articleId={article.id} />
            </main>

            {/* Right Sidebar */}
            <aside className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <ShareArticle article={article} />
                <RelatedArticles currentArticleId={article.id} />
                <AdBanner type="sidebar" />
              </div>
            </aside>
          </div>
        </div>

        {/* Full-width sections */}
        <MoreFromAuthor author={article.author} />
        <AdBanner type="wide" className="container mx-auto px-4 my-12" />
        <YouMightLike />
      </div>

      {/* Mobile scroll to top button */}
      <ScrollToTop className="lg:hidden" />
    </article>
  );
}