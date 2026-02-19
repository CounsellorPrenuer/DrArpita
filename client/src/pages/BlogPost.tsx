
import { useQuery } from "@tanstack/react-query";
import { sanityClient, urlFor } from "@/lib/sanity";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PortableText } from "@portabletext/react";

export default function BlogPost() {
    const [match, params] = useRoute("/blog/:slug");
    const slug = params?.slug;

    const { data: post, isLoading } = useQuery({
        queryKey: ["blog-post", slug],
        enabled: !!slug,
        queryFn: async () => {
            return await sanityClient.fetch(`
        *[_type == "post" && slug.current == $slug][0] {
          title,
          mainImage,
          publishedAt,
          body,
          author->{name}
        }
      `, { slug });
        },
    });

    if (isLoading) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading...</div>;
    if (!post) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Post not found</div>;

    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />
            <article className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <Link href="/blog">
                    <Button variant="ghost" className="text-slate-400 hover:text-white mb-8 pl-0">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
                    </Button>
                </Link>

                <h1 className="font-heading font-black text-4xl md:text-5xl text-white mb-6">
                    {post.title}
                </h1>

                <div className="flex items-center gap-6 text-sm text-slate-400 mb-8 border-b border-slate-800 pb-8">
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    {post.author && (
                        <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author.name}
                        </span>
                    )}
                </div>

                {post.mainImage && (
                    <div className="rounded-xl overflow-hidden mb-10">
                        <img
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            className="w-full object-cover max-h-[500px]"
                        />
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                    <PortableText value={post.body} />
                </div>
            </article>
            <Footer />
        </div>
    );
}
