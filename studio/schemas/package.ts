
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'package',
    title: 'Pricing Package',
    type: 'document',
    fields: [
        defineField({
            name: 'planName',
            title: 'Plan Name',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: '8-9 Students', value: '8-9 Students' },
                    { title: '10-12 Students', value: '10-12 Students' },
                    { title: 'Graduates', value: 'Graduates' },
                    { title: 'Working Professionals', value: 'Working Professionals' },
                ],
            },
            hidden: ({ document }) => document?.isCustom === true
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number'
        }),
        defineField({
            name: 'isPopular',
            title: 'Is Popular/Premium?',
            type: 'boolean'
        }),
        defineField({
            name: 'isCustom',
            title: 'Is Custom Package?',
            type: 'boolean',
            initialValue: false
        }),
        // Standard Package Fields
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'text', type: 'string', title: 'Feature Text' },
                    { name: 'included', type: 'boolean', title: 'Included', initialValue: true }
                ]
            }],
            hidden: ({ document }) => document?.isCustom === true
        }),
        defineField({
            name: 'razorpayId',
            title: 'Razorpay Button ID',
            type: 'string',
            hidden: ({ document }) => document?.isCustom === true
        }),
        // Custom Package Fields
        defineField({
            name: 'planId',
            title: 'Plan ID (Slug)',
            type: 'string',
            hidden: ({ document }) => document?.isCustom !== true
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            hidden: ({ document }) => document?.isCustom !== true
        })
    ],
})
