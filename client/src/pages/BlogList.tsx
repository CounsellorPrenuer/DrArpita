
import { useQuery } from "@tanstack/react-query";
import { sanityClient, urlFor } from "@/lib/sanity";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
    title: string;
    slug: { current: string };
    mainImage: any;
    publishedAt: string;
    excerpt: string;
    author: { name: string };
}

export default function BlogList() {
    const { data: posts, isLoading } = useQuery({
        queryKey: ["blog-posts"],
        queryFn: async () => {
            return await sanityClient.fetch(`
        *[_type == "post"] | order(publishedAt desc) {
          title,
          slug,
          mainImage,
          publishedAt,
          excerpt,
          author->{name}
        }
      `);
        },
    });

    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-6">
                        Latest <span className="text-blue-500">Insights</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Discover articles on career development, leadership, and personal growth.
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-white text-center">Loading articles...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts?.map((post: BlogPost) => (
                            <Card key={post.slug.current} className="bg-slate-900 border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group">
                                {post.mainImage && (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={urlFor(post.mainImage).width(800).url()}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(post.publishedAt).toLocaleDateString()}
                                        </span>
                                        {post.author && (
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {post.author.name}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="font-heading font-bold text-xl text-white mb-3 line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <Link href={`/blog/${post.slug.current}`}>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                            Read More <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
