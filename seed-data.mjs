import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'x9kurr32',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: 'skTgk3celCEbwL1dFFINLCg2qZIJKzzyDBfT5oU9x2eT2EJ7SfJ0d6k3DSHOQVj5BkQp1auMVQJ1W1qUa2iFSwamHP27Jdb7vPJVUpelAOngVORB6j0HU07hsm4ohMR89usORzMPm9tSUBunCbxVuPpEKuU2Cgeep2qrJpWlBm00BWMxwK4W'
});

// ─── Custom Packages ───
const customPackages = [
    {
        _id: 'pkg-career-report',
        _type: 'package',
        planName: 'Career Report',
        price: '₹ 1,500',
        description: 'A scientific analysis of your psychometric report and future paths you can potentially consider.',
        isCustom: true,
        planId: 'career-report',
        razorpayId: 'career-report',
        order: 1
    },
    {
        _id: 'pkg-career-report-counselling',
        _type: 'package',
        planName: 'Career Report + Career Counselling',
        price: '₹ 3,000',
        description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at.",
        isCustom: true,
        planId: 'career-report-counselling',
        razorpayId: 'career-report-counselling',
        order: 2
    },
    {
        _id: 'pkg-knowledge-gateway',
        _type: 'package',
        planName: 'Knowledge Gateway + Career Helpline Access',
        price: '₹ 100',
        description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline.",
        isCustom: true,
        planId: 'knowledge-gateway',
        razorpayId: 'knowledge-gateway',
        order: 3
    }
];

// ─── Standard Packages (8-9 Students) ───
const standard89 = [
    {
        _id: 'pkg-8-9-mentoria',
        _type: 'package',
        planName: 'Mentoria',
        price: '₹ 5,500',
        category: '8-9 Students',
        isCustom: false,
        razorpayId: 'mentoria-8-9',
        order: 10,
        features: [
            { text: 'Career Report with 3 ideal career paths', included: true, _key: 'f1' },
            { text: '1 Career Counselling session', included: true, _key: 'f2' },
            { text: 'Lifetime access to Knowledge Gateway', included: true, _key: 'f3' },
            { text: 'Invites to live webinars by industry experts', included: true, _key: 'f4' },
            { text: 'Customised experts after each session with education pathways', included: false, _key: 'f5' },
            { text: 'Guidance on studying abroad', included: false, _key: 'f6' }
        ]
    },
    {
        _id: 'pkg-8-9-mentoria-plus',
        _type: 'package',
        planName: 'Mentoria Plus+',
        price: '₹ 8,500',
        category: '8-9 Students',
        isCustom: false,
        isPopular: true,
        razorpayId: 'mentoria-plus-8-9',
        order: 11,
        features: [
            { text: 'Career Report with 3 ideal career paths', included: true, _key: 'f1' },
            { text: '1 Career Counselling session', included: true, _key: 'f2' },
            { text: 'Lifetime access to Knowledge Gateway', included: true, _key: 'f3' },
            { text: 'Invites to live webinars by industry experts', included: true, _key: 'f4' },
            { text: 'Customised experts after each session with education pathways', included: true, _key: 'f5' },
            { text: 'Guidance on studying abroad', included: true, _key: 'f6' }
        ]
    }
];

// ─── Standard Packages (10-12 Students) ───
const standard1012 = [
    {
        _id: 'pkg-10-12-mentoria',
        _type: 'package',
        planName: 'Mentoria',
        price: '₹ 5,500',
        category: '10-12 Students',
        isCustom: false,
        razorpayId: 'mentoria-10-12',
        order: 20,
        features: [
            { text: 'Career Report with 3 ideal career paths', included: true, _key: 'f1' },
            { text: '1 Career Counselling session', included: true, _key: 'f2' },
            { text: 'Lifetime access to Knowledge Gateway', included: true, _key: 'f3' },
            { text: 'Invites to live webinars by industry experts', included: true, _key: 'f4' },
            { text: 'College shortlisting with admission guidance', included: false, _key: 'f5' },
            { text: 'Guidance on studying abroad', included: false, _key: 'f6' }
        ]
    },
    {
        _id: 'pkg-10-12-mentoria-plus',
        _type: 'package',
        planName: 'Mentoria Plus+',
        price: '₹ 8,500',
        category: '10-12 Students',
        isCustom: false,
        isPopular: true,
        razorpayId: 'mentoria-plus-10-12',
        order: 21,
        features: [
            { text: 'Career Report with 3 ideal career paths', included: true, _key: 'f1' },
            { text: '1 Career Counselling session', included: true, _key: 'f2' },
            { text: 'Lifetime access to Knowledge Gateway', included: true, _key: 'f3' },
            { text: 'Invites to live webinars by industry experts', included: true, _key: 'f4' },
            { text: 'College shortlisting with admission guidance', included: true, _key: 'f5' },
            { text: 'Guidance on studying abroad', included: true, _key: 'f6' }
        ]
    }
];

// ─── Standard Packages (Graduates) ───
const standardGrads = [
    {
        _id: 'pkg-grad-mentoria',
        _type: 'package',
        planName: 'Mentoria',
        price: '₹ 5,500',
        category: 'Graduates',
        isCustom: false,
        razorpayId: 'mentoria-grad',
        order: 30,
        features: [
            { text: 'Career Report with 3 ideal career paths', included: true, _key: 'f1' },
            { text: '1 Career Counselling session', included: true, _key: 'f2' },
            { text: 'Lifetime access to Knowledge Gateway', included: true, _key: 'f3' },
            { text: 'Invites to live webinars by industry experts', included: true, _key: 'f4' },
            { text: 'Higher education planning with top institution shortlisting', included: false, _key: 'f5' },
            { text: 'Resume building and interview preparation', included: false, _key: 'f6' }
        ]
    },
    {
        _id: 'pkg-grad-mentoria-plus',
        _type: 'package',
        planName: 'Mentoria Plus+',
        price: '₹ 8,500',
        category: 'Graduates',
        isCustom: false,
        isPopular: true,
        razorpayId: 'mentoria-plus-grad',
        order: 31,
        features: [
            { text: 'Career Report with 3 ideal career paths', included: true, _key: 'f1' },
            { text: '1 Career Counselling session', included: true, _key: 'f2' },
            { text: 'Lifetime access to Knowledge Gateway', included: true, _key: 'f3' },
            { text: 'Invites to live webinars by industry experts', included: true, _key: 'f4' },
            { text: 'Higher education planning with top institution shortlisting', included: true, _key: 'f5' },
            { text: 'Resume building and interview preparation', included: true, _key: 'f6' }
        ]
    }
];

// ─── Standard Packages (Working Professionals) ───
const standardWorking = [
    {
        _id: 'pkg-wp-mentoria',
        _type: 'package',
        planName: 'Mentoria',
        price: '₹ 5,500',
        category: 'Working Professionals',
        isCustom: false,
        razorpayId: 'mentoria-wp',
        order: 40,
        features: [
            { text: 'Career Report with 3 ideal career paths', included: true, _key: 'f1' },
            { text: '1 Career Counselling session', included: true, _key: 'f2' },
            { text: 'Lifetime access to Knowledge Gateway', included: true, _key: 'f3' },
            { text: 'Invites to live webinars by industry experts', included: true, _key: 'f4' },
            { text: 'Career transition roadmap with industry mentors', included: false, _key: 'f5' },
            { text: 'Executive coaching and leadership development', included: false, _key: 'f6' }
        ]
    },
    {
        _id: 'pkg-wp-mentoria-plus',
        _type: 'package',
        planName: 'Mentoria Plus+',
        price: '₹ 8,500',
        category: 'Working Professionals',
        isCustom: false,
        isPopular: true,
        razorpayId: 'mentoria-plus-wp',
        order: 41,
        features: [
            { text: 'Career Report with 3 ideal career paths', included: true, _key: 'f1' },
            { text: '1 Career Counselling session', included: true, _key: 'f2' },
            { text: 'Lifetime access to Knowledge Gateway', included: true, _key: 'f3' },
            { text: 'Invites to live webinars by industry experts', included: true, _key: 'f4' },
            { text: 'Career transition roadmap with industry mentors', included: true, _key: 'f5' },
            { text: 'Executive coaching and leadership development', included: true, _key: 'f6' }
        ]
    }
];

// ─── Sample Blog Post ───
const samplePost = {
    _id: 'post-sample-career-potential',
    _type: 'post',
    title: 'Unlocking Your Career Potential: A Guide for 2024',
    slug: { _type: 'slug', current: 'unlocking-career-potential-2024' },
    publishedAt: '2024-02-20T10:00:00Z',
    body: [
        {
            _type: 'block',
            _key: 'b1',
            children: [
                {
                    _type: 'span',
                    _key: 's1',
                    text: "In today's rapidly evolving job market, understanding your core strengths is more important than ever. Whether you are a student choosing a stream or a professional looking for a pivot, career clarity is the key to success."
                }
            ],
            markDefs: [],
            style: 'normal'
        },
        {
            _type: 'block',
            _key: 'b2',
            children: [
                {
                    _type: 'span',
                    _key: 's2',
                    text: "At Dr. Arpita's Career Clinic, we believe that every individual has a unique path. Through psychometric testing and personalized counseling, we help you discover that path. Our comprehensive Career Report analyses your aptitude, interests, and personality to shortlist the top 3 career paths where you're most likely to thrive."
                }
            ],
            markDefs: [],
            style: 'normal'
        },
        {
            _type: 'block',
            _key: 'b3',
            children: [
                {
                    _type: 'span',
                    _key: 's3',
                    text: "Don't leave your career to chance. Take the first step today and unlock your true potential with Mentoria's expert guidance."
                }
            ],
            markDefs: [],
            style: 'normal'
        }
    ]
};

const allDocs = [
    ...customPackages,
    ...standard89,
    ...standard1012,
    ...standardGrads,
    ...standardWorking,
    samplePost
];

async function seed() {
    console.log(`Seeding ${allDocs.length} documents...`);

    // Delete existing packages first to avoid duplicates
    const existingPkgs = await client.fetch('*[_type == "package"]._id');
    console.log(`Deleting ${existingPkgs.length} existing packages...`);
    for (const id of existingPkgs) {
        await client.delete(id);
    }

    // Create all documents
    for (const doc of allDocs) {
        try {
            await client.createOrReplace(doc);
            console.log(`✓ Created: ${doc.planName || doc.title}`);
        } catch (err) {
            console.error(`✗ Failed: ${doc.planName || doc.title}`, err.message);
        }
    }

    console.log('\nDone! All data seeded.');
}

seed().catch(console.error);
