import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { sanityClient, urlFor } from "@/lib/sanity";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";

const BLOG_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  title,
  slug,
  mainImage,
  publishedAt,
  "authorName": author->name,
  "categories": categories[]->title,
  body
}`;

export default function BlogSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById("blog-section");
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    const { data: posts, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            return await sanityClient.fetch(BLOG_QUERY);
        }
    });

    if (isLoading) {
        return <div className="py-24 text-center">Loading articles...</div>;
    }

    if (!posts || posts.length === 0) {
        return null; // Don't show section if no posts
    }

    return (
        <section id="blog-section" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="font-heading font-black text-4xl md:text-5xl mb-6 text-slate-900">
                        Latest <span className="text-blue-600">Insights</span> & Articles
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Stay updated with the latest trends in career development and mentorship.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: any, index: number) => (
                        <Card
                            key={post.slug?.current || index}
                            className={`overflow-hidden hover:shadow-xl transition-all duration-500 border-slate-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="aspect-video relative overflow-hidden bg-slate-200">
                                {post.mainImage ? (
                                    <img
                                        src={urlFor(post.mainImage).width(800).height(450).url()}
                                        alt={post.title}
                                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-2">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : "Recent"}
                                    </span>
                                    {post.authorName && (
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {post.authorName}
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-heading font-bold text-xl text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors">
                                    <a href={`/blog/${post.slug?.current}`}>{post.title}</a>
                                </h3>
                            </CardHeader>

                            <CardContent>
                                <p className="text-slate-600 line-clamp-3 text-sm">
                                    {post.body && post.body[0]?.children[0]?.text}
                                </p>
                            </CardContent>

                            <CardFooter className="pt-0">
                                <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold group" asChild>
                                    <a href={`/blog/${post.slug?.current}`}>
                                        Read Article <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button size="lg" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold" asChild>
                        <a href="/blog">View All Articles</a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
