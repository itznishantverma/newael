"use client";

import { useState, useEffect } from "react";
import ArticleHeader from "./article-header";
import TableOfContents from "./table-of-contents";
import ArticleContent from "./article-content";
import ShareArticle from "./share-article";
import RelatedArticles from "./related-articles";
import ArticleComments from "./article-comments";
import Newsletter from "./newsletter";
import MoreFromAuthor from "./more-from-author";
import YouMightLike from "./you-might-like";
import AdBanner from "../common/ad-banner";
import ScrollToTop from "../common/scroll-to-top";

export default function ArticlePage({ article }: { article: any }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      // Calculate reading progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setReadingProgress(progress);

      // Update active section
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <article className="min-h-screen pb-16">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
      />

      <ArticleHeader article={article} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Table of Contents */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24">
              <AdBanner className="mb-6" type="sidebar" />
              <TableOfContents activeSection={activeSection} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-2/4">
            <ArticleContent content={article.content} />
            <ShareArticle article={article} className="my-8" />
            <ArticleComments articleId={article.id} />
          </main>

          {/* Right Sidebar */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <AdBanner type="sidebar" />
              <Newsletter />
              <RelatedArticles currentArticleId={article.id} />
            </div>
          </aside>
        </div>
      </div>

      {/* Full-width sections */}
      <AdBanner type="wide" className="container mx-auto px-4 my-12" />
      <MoreFromAuthor author={article.author} />
      <AdBanner type="wide" className="container mx-auto px-4 my-12" />
      <YouMightLike />

      {/* Mobile floating buttons */}
      <ScrollToTop className="lg:hidden" />
    </article>
  );
}