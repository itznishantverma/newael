import HeroSection from "@/components/hero-section";
import LatestPosts from "@/components/latest-posts";
import TrendingSection from "@/components/trending-section";
import EditorsPicks from "@/components/editors-picks";
import AdBanner from "@/components/ad-banner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AdBanner className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" type="wide" />
      <LatestPosts />
      <TrendingSection />
      <AdBanner className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" type="wide" />
      <EditorsPicks />
    </div>
  );
}