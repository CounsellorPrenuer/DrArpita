
import { createClient } from "@sanity/client";

const client = createClient({
    projectId: "x9kurr32",
    dataset: "production",
    apiVersion: "2024-02-19",
    token: "skIMkU10vgLaPFLRB5AGyDeKzx2fMouEVry4uT4X9Y0DwsX9TUNHJhZeVZGlL7nmArhI7N7FmtOdslqualJKvRPxJYYz4xOjUp4OfmoS428uI7xbKHC1FYPUENXqsw5LHKWl1dUZYltfMGWiZT2imgELztWrBmickjKmIH7spEh3HInFUBrR",
    useCdn: false,
});

const standardPackages = [
    // 8-9 Students
    {
        _type: "package",
        category: "8-9 Students",
        planName: "Discover",
        price: "₹ 5,500",
        razorpayId: "pl_RwDuOx96VYrsyN",
        features: [
            { text: "Psychometric assessment", included: true },
            { text: "1 career counselling session", included: true },
            { text: "Lifetime Knowledge Gateway access", included: true },
            { text: "Live webinar invites", included: true },
        ],
        order: 1
    },
    {
        _type: "package",
        category: "8-9 Students",
        planName: "Discover Plus+",
        price: "₹ 15,000",
        razorpayId: "pl_RwDq8XpK76OhB3",
        features: [
            { text: "Psychometric assessments", included: true },
            { text: "8 career counselling sessions (1/year)", included: true },
            { text: "Custom reports & study abroad guidance", included: true },
            { text: "CV building", included: true },
        ],
        order: 2
    },
    // 10-12 Students
    {
        _type: "package",
        category: "10-12 Students",
        planName: "Achieve Online",
        price: "₹ 5,999",
        razorpayId: "pl_RwDxvLPQP7j4rG",
        features: [
            { text: "Psychometric assessment", included: true },
            { text: "1 career counselling session", included: true },
            { text: "Lifetime Knowledge Gateway access", included: true },
            { text: "Pre-recorded webinars", included: true },
        ],
        order: 3
    },
    {
        _type: "package",
        category: "10-12 Students",
        planName: "Achieve Plus+",
        price: "₹ 10,599",
        razorpayId: "pl_RwDzfVkQYEdAIf",
        features: [
            { text: "Psychometric assessment", included: true },
            { text: "4 career counselling sessions", included: true },
            { text: "Custom reports & study abroad guidance", included: true },
            { text: "CV reviews", included: true },
        ],
        order: 4
    },
    // Graduates
    {
        _type: "package",
        category: "Graduates",
        planName: "Ascend Online",
        price: "₹ 6,499",
        razorpayId: "pl_RwE1evNHrHWJDW",
        features: [
            { text: "Psychometric assessment", included: true },
            { text: "1 career counselling session", included: true },
            { text: "Lifetime Knowledge Gateway access", included: true },
            { text: "Pre-recorded webinars", included: true },
        ],
        order: 5
    },
    {
        _type: "package",
        category: "Graduates",
        planName: "Ascend Plus+",
        price: "₹ 10,599",
        razorpayId: "pl_RwE3WEILWB9WeJ",
        features: [
            { text: "Psychometric assessment", included: true },
            { text: "3 career counselling sessions", included: true },
            { text: "Certificate/online course info", included: true },
            { text: "CV reviews for jobs", included: true },
        ],
        order: 6
    },
    // Working Professionals
    {
        _type: "package",
        category: "Working Professionals",
        planName: "Ascend Online",
        price: "₹ 6,499",
        razorpayId: "pl_RwE1evNHrHWJDW",
        features: [
            { text: "Psychometric assessment", included: true },
            { text: "1 career counselling session", included: true },
            { text: "Lifetime Knowledge Gateway access", included: true },
            { text: "Pre-recorded webinars", included: true },
        ],
        order: 7
    },
    {
        _type: "package",
        category: "Working Professionals",
        planName: "Ascend Plus+",
        price: "₹ 10,599",
        razorpayId: "pl_RwE3WEILWB9WeJ",
        features: [
            { text: "Psychometric assessment", included: true },
            { text: "3 career counselling sessions", included: true },
            { text: "Certificate/online course info", included: true },
            { text: "CV reviews for jobs", included: true },
        ],
        order: 8
    },
];

const customPackages = [
    {
        _type: "package",
        isCustom: true,
        planId: "career-report",
        planName: "Career Report",
        price: "₹ 1,500",
        description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider.",
        order: 1
    },
    {
        _type: "package",
        isCustom: true,
        planId: "career-report-counselling",
        planName: "Career Report + Career Counselling",
        price: "₹ 3,000",
        description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at.",
        order: 2
    },
    {
        _type: "package",
        isCustom: true,
        planId: "knowledge-gateway",
        planName: "Knowledge Gateway + Career Helpline Access",
        price: "₹ 100",
        description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love.",
        order: 3
    },
    {
        _type: "package",
        isCustom: true,
        planId: "one-to-one-session",
        planName: "One-to-One Session with a Career Expert",
        price: "₹ 3,500",
        description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field.",
        order: 4
    },
    {
        _type: "package",
        isCustom: true,
        planId: "college-admission-planning",
        planName: "College Admission Planning",
        price: "₹ 3,000",
        description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner.",
        order: 5
    },
    {
        _type: "package",
        isCustom: true,
        planId: "exam-stress-management",
        planName: "Exam Stress Management",
        price: "₹ 1,000",
        description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind.",
        order: 6
    },
    {
        _type: "package",
        isCustom: true,
        planId: "cap-100",
        planName: "College Admissions Planner - 100 (CAP-100)",
        price: "₹ 199",
        description: "₹199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!",
        order: 7
    },
];

async function seed() {
    console.log("Seeding data with Razorpay IDs...");

    // Delete existing packages first to avoid duplicates
    try {
        const existing = await client.fetch('*[_type == "package"]{_id}');
        if (existing.length > 0) {
            const transaction = client.transaction();
            existing.forEach((doc: any) => transaction.delete(doc._id));
            await transaction.commit();
            console.log(`Deleted ${existing.length} existing packages`);
        }
    } catch (err: any) {
        console.error("Error clearing existing packages:", err.message);
    }

    // Seed Standard Packages
    const transaction = client.transaction();
    standardPackages.forEach((pkg) => transaction.create(pkg));
    customPackages.forEach((pkg) => transaction.create(pkg));

    try {
        await transaction.commit();
        console.log(`Created ${standardPackages.length + customPackages.length} packages`);
    } catch (err: any) {
        console.error("Failed to creat packages:", err.message);
    }

    console.log("Seeding complete!");
}

seed();
