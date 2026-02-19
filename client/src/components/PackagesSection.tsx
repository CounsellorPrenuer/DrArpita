import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, X, Sparkles, Zap, Crown, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";

type TabKey = "8-9" | "10-12" | "college" | "working";

interface Feature {
  text: string;
  included: boolean;
}

interface Package {
  planName: string;
  price: string;
  features: Feature[];
  isPopular?: boolean;
  razorpayId: string;
}

// RazorpayButton removed in favor of Standard Checkout via Worker




export default function PackagesSection() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("8-9 Students");
  const [isVisible, setIsVisible] = useState(false);

  // Unified State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "", message: "", coupon: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: string; id: string } | null>(null);

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    if (selectedPackage.id) {
      // Standard Package -> Razorpay Payment Flow via Worker
      setIsProcessing(true);
      try {
        const priceInPaise = parseInt(selectedPackage.price.replace(/[^0-9]/g, "")) * 100;

        // Worker URL - updated with user provided subdomain
        const res = await fetch("https://dr-arpita-payments.garyphadale.workers.dev/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: priceInPaise,
            currency: "INR",
            receipt: `order_${Date.now()}`,
            couponCode: bookingForm.coupon
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to create order");
        }
        const orderData = await res.json();

        const options = {
          key: orderData.key_id,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Dr. Arpita",
          description: selectedPackage.name,
          order_id: orderData.id,
          handler: function (response: any) {
            toast({
              title: "Payment Successful",
              description: `Payment ID: ${response.razorpay_payment_id}`,
            });
            setIsBookingModalOpen(false);
            setBookingForm({ name: "", email: "", phone: "", message: "", coupon: "" });
          },
          prefill: {
            name: bookingForm.name,
            email: bookingForm.email,
            contact: bookingForm.phone
          },
          notes: {
            plan: selectedPackage.name,
            coupon: bookingForm.coupon
          },
          theme: {
            color: "#3b82f6"
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();

      } catch (err: any) {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Payment Initialization Failed",
          description: err.message || "Could not start payment. Please try again."
        });
      } finally {
        setIsProcessing(false);
      }

    } else {
      // Custom Package -> Mailto Flow
      const subject = encodeURIComponent(`Booking Request: ${selectedPackage.name}`);
      const bodyText = `Package: ${selectedPackage.name}
Price: ${selectedPackage.price}

Name: ${bookingForm.name}
Email: ${bookingForm.email}
Phone: ${bookingForm.phone}
Coupon Code: ${bookingForm.coupon || "N/A"}
Message: ${bookingForm.message}

Please confirm my booking and provide payment instructions.`;

      const body = encodeURIComponent(bodyText);

      window.location.href = `mailto:royjohnson@careerplans.pro?subject=${subject}&body=${body}`;

      toast({
        title: "Opening Email Client",
        description: "Please complete your booking in your email app.",
      });

      setIsBookingModalOpen(false);
      setBookingForm({ name: "", email: "", phone: "", message: "", coupon: "" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#pricing');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const { data: packages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const result = await sanityClient.fetch(`
        *[_type == "package"] | order(order asc) {
          planName,
          price,
          category,
          features,
          isPopular,
          razorpayId,
          isCustom,
          description,
          planId
        }
      `);
      return result;
    }
  });

  const standardPackages = packages?.filter((p: any) => !p.isCustom) || [];
  const customPackages = packages?.filter((p: any) => p.isCustom) || [];

  const tabs = [
    { key: "8-9 Students", label: "8-9 Students", gradient: "from-blue-500 to-cyan-500" },
    { key: "10-12 Students", label: "10-12 Students", gradient: "from-emerald-500 to-teal-500" },
    { key: "Graduates", label: "Graduates", gradient: "from-violet-500 to-purple-500" },
    { key: "Working Professionals", label: "Working Professionals", gradient: "from-orange-500 to-amber-500" },
  ];

  const currentPackages = standardPackages.filter((p: any) => p.category === activeTab);
  const currentGradient = tabs.find(t => t.key === activeTab)?.gradient || "from-blue-500 to-cyan-500";

  const handleEnrollClick = (planName: string, price: string, razorpayId: string = "") => {
    // Both flows now open the modal first to collect info
    setSelectedPackage({ name: planName, price, id: razorpayId });
    setIsBookingModalOpen(true);
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_300px,#3b82f610,transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Helper Function to render header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-heading font-black text-4xl md:text-5xl mb-6 text-white" data-testid="text-custom-title">
            Want To <span className="text-blue-500">Customise</span> Your Mentorship Plan?
          </h2>
          <p className="text-xl text-slate-400 max-w-4xl mx-auto font-medium mb-12">
            If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:
          </p>

          {/* Custom Packages Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 shadow-2xl mb-24">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800">
                  <th className="p-4 text-slate-300 font-bold uppercase text-sm">Plan ID</th>
                  <th className="p-4 text-slate-300 font-bold uppercase text-sm">Title</th>
                  <th className="p-4 text-slate-300 font-bold uppercase text-sm w-32">Price</th>
                  <th className="p-4 text-slate-300 font-bold uppercase text-sm">Description</th>
                  <th className="p-4 text-slate-300 font-bold uppercase text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="bg-slate-900/50 divide-y divide-slate-800">
                {customPackages.map((pkg: any) => (
                  <tr key={pkg.planId} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-slate-400 font-mono text-xs">{pkg.planId}</td>
                    <td className="p-4 text-white font-bold">{pkg.planName}</td>
                    <td className="p-4 text-blue-400 font-bold whitespace-nowrap">{pkg.price}</td>
                    <td className="p-4 text-slate-400 text-sm">{pkg.description}</td>
                    <td className="p-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap" onClick={() => handleEnrollClick(pkg.planName, pkg.price, pkg.razorpayId)}>
                        Buy Now
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full h-px bg-slate-800 mb-20"></div>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full border border-blue-500/30 backdrop-blur-xl mb-8">
            <Crown className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-blue-300">Comprehensive Solutions</span>
          </div>

          <h2 className="font-heading font-black text-5xl md:text-6xl mb-6 text-white" data-testid="text-packages-title">
            Standard Mentoria <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">Packages</span> 🎓
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
            These are the main comprehensive packages.
          </p>
        </div>

        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab, index) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-bold text-base px-8 py-6 transition-all duration-500 border-0 ${activeTab === tab.key
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl shadow-blue-500/50 scale-110`
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:scale-105'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                data-testid={`tab-${tab.key}`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {currentPackages.map((pkg: any, index: number) => (
            <Card
              key={`${activeTab}-${index}`}
              className={`p-10 group hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden ${pkg.planName.includes("Plus+")
                ? `bg-gradient-to-br ${currentGradient} shadow-2xl shadow-blue-500/50`
                : 'bg-slate-800/50 backdrop-blur-xl'
                }`}
              data-testid={`card-package-${activeTab}-${index}`}
            >
              {pkg.planName.includes("Plus+") && (
                <>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full" />
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 border-0 font-black text-sm px-6 py-2 shadow-2xl z-10" data-testid={`badge-popular-${index}`}>
                    <Crown className="h-4 w-4 mr-1 inline" />
                    MOST POPULAR
                  </Badge>
                </>
              )}

              <div className="mb-8 relative z-10">
                <div className={`text-sm font-bold ${pkg.planName.includes("Plus+") ? 'text-white/80' : 'text-blue-400'} mb-3 uppercase tracking-wider flex items-center gap-2`}>
                  <Sparkles className="h-4 w-4" />
                  {pkg.planName.includes("Plus+") ? "Premium" : "Standard"}
                </div>
                <h3 className={`font-heading font-black text-4xl ${pkg.planName.includes("Plus+") ? 'text-white' : 'text-white'} mb-4`} data-testid={`text-package-name-${index}`}>
                  {pkg.planName}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-6xl font-heading font-black ${pkg.planName.includes("Plus+") ? 'text-white' : 'text-white'}`} data-testid={`text-package-price-${index}`}>
                    {pkg.price}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features && pkg.features.map((feature: any, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-start gap-3" data-testid={`feature-${index}-${featureIndex}`}>
                    <div className={`flex-shrink-0 mt-0.5 p-1.5 rounded-full ${feature.included ? 'bg-emerald-500/20' : 'bg-slate-700'}`}>
                      {feature.included ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <X className="h-4 w-4 text-slate-500" />
                      )}
                    </div>
                    <span className={`text-sm leading-relaxed font-medium ${feature.included ? (pkg.planName.includes("Plus+") ? "text-white" : "text-white") : "text-slate-500"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className={`w-full font-black text-lg py-7 transition-all duration-300 border-0 ${pkg.planName.includes("Plus+")
                  ? 'bg-white text-slate-900 hover:bg-white/90 shadow-2xl hover:shadow-white/50 hover:scale-105'
                  : `bg-gradient-to-r ${currentGradient} text-white hover:scale-105 shadow-2xl shadow-blue-500/50`
                  }`}
                onClick={() => handleEnrollClick(pkg.planName, pkg.price, pkg.razorpayId)}
                data-testid={`button-buy-${index}`}
              >
                BUY NOW →
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 mt-12 bg-slate-800/30 backdrop-blur-sm rounded-full px-8 py-4 inline-block mx-auto w-full max-w-2xl border border-slate-700">
          🔒 All prices in INR. Secure payment by Razorpay.
        </p>
      </div>

      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-md bg-white text-slate-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900">
              <CreditCard className="h-5 w-5 text-blue-600" />
              {selectedPackage?.id ? "Secure Payment Details" : "Book Custom Plan"}
            </DialogTitle>
            <DialogDescription>
              {selectedPackage && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-slate-900">{selectedPackage.name}</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">{selectedPackage.price}</p>
                  <p className="text-sm text-slate-600 mt-2">
                    {selectedPackage.id
                      ? "Enter details & coupon to proceed to payment."
                      : "Fill your details to proceed with booking via email."}
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">Name</label>
              <input
                id="name"
                required
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                required
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone</label>
              <input
                id="phone"
                type="tel"
                required
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="coupon" className="text-sm font-medium text-slate-700">Coupon Code (Optional)</label>
              <input
                id="coupon"
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                value={bookingForm.coupon}
                onChange={(e) => setBookingForm({ ...bookingForm, coupon: e.target.value })}
                placeholder="PROMO2024"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-700">Additional Message (Optional)</label>
              <textarea
                id="message"
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                value={bookingForm.message}
                onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold" disabled={isProcessing}>
              {isProcessing ? "Processing..." : (selectedPackage?.id ? "Proceed to Payment" : "Send Booking Request")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
