
import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'x9kurr32',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_TOKEN || "skToK1p..." // Placeholder, will run via `sanity exec` which handles auth
});

const packages = [
    {
        _type: 'package',
        planName: 'Career Report',
        price: '₹1,500',
        description: 'A scientific analysis of your psychometric report + future paths you can potentially consider.',
        isCustom: true,
        planId: 'career-report',
        razorpayId: 'pl_Live_CareerReport', // Dummy ID for Pay Now flow
        order: 1
    },
    {
        _type: 'package',
        planName: 'Career Report + Career Counselling',
        price: '₹3,000',
        description: 'Connect with India\'s top career coaches to analyse your psychometric report and shortlist the top three career paths you\'re most likely to enjoy and excel at.',
        isCustom: true,
        planId: 'career-report-counselling',
        razorpayId: 'pl_Live_CareerCounselling',
        order: 2
    },
    {
        _type: 'package',
        planName: 'Knowledge Gateway + Career Helpline Access',
        price: '₹100',
        description: 'Unlock holistic information on your career paths and get direct access to Mentoria\'s experts.',
        isCustom: true,
        planId: 'knowledge-gateway',
        razorpayId: 'pl_Live_KnowledgeGateway',
        order: 3
    }
];

// We can't easily run this via `ts-node` without the token in env.
// But we can output a JSON file and import it via sanity CLI.
