/**
 * Sanity.io Studio Schema Definition for Sawariya Diagnostic Lab
 * Deployable to Sanity Studio or Contentful Content Types
 */

export const sanitySchemaDefinition = `
// schemas/medicalTest.ts
export default {
  name: 'medicalTest',
  title: 'Diagnostic Test',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Test Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug / URL ID',
      type: 'slug',
      options: { source: 'name', maxLength: 96 }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Blood Routine', value: 'blood' },
          { title: 'Hormones & Endocrine', value: 'hormone' },
          { title: 'Specialized & Immunology', value: 'specialized' }
        ]
      }
    },
    {
      name: 'price',
      title: 'Discounted Price (INR)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'originalPrice',
      title: 'MRP / Original Price (INR)',
      type: 'number'
    },
    {
      name: 'turnaroundTime',
      title: 'Turnaround Time',
      type: 'string',
      description: 'e.g. 4-6 hours, 24 hours'
    },
    {
      name: 'description',
      title: 'Clinical Description',
      type: 'text'
    },
    {
      name: 'parameters',
      title: 'Test Parameters Measured',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'fastingRequired',
      title: 'Fasting Required',
      type: 'string',
      description: 'e.g. 8-10 Hours Fasting or Not Required'
    },
    {
      name: 'homeCollection',
      title: 'Available for Home Visit',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'popular',
      title: 'Feature as Popular',
      type: 'boolean',
      initialValue: false
    }
  ]
};

// schemas/healthPackage.ts
export const healthPackageSchema = {
  name: 'healthPackage',
  title: 'Health Package Profile',
  type: 'document',
  fields: [
    { name: 'name', title: 'Package Name', type: 'string' },
    { name: 'price', title: 'Offer Price (INR)', type: 'number' },
    { name: 'originalPrice', title: 'Original Price (INR)', type: 'number' },
    { name: 'description', title: 'Target Audience / Benefits', type: 'text' },
    { name: 'testsIncluded', title: 'Tests Included', type: 'array', of: [{ type: 'string' }] },
    { name: 'recommended', title: 'Most Popular Choice Badge', type: 'boolean' }
  ]
};
`;
