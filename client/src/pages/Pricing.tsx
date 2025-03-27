import { Check, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function PricingTiers() {
  const tiers = [
    {
      name: 'Basic',
      description: 'Small Grid Placement',
      price: 99,
      features: [
        'Single grid cell display (1x1)',
        'Basic profile information',
        'Monthly analytics report',
        'Up to 3 team members',
        'Standard support',
      ],
      cta: 'Subscribe Now',
      popular: false,
      gridSize: '1x1',
      maxImpressions: 'Up to 5,000',
      revenue: '+5% of generated leads',
    },
    {
      name: 'Professional',
      description: 'Medium Grid Placement',
      price: 249,
      features: [
        'Double-width grid cell (2x1)',
        'Enhanced profile with media',
        'Weekly analytics report',
        'Up to 8 team members',
        'Priority support',
        'Custom branding options',
        'Everything in Basic plan',
      ],
      cta: 'Subscribe Now',
      popular: true,
      gridSize: '2x1',
      maxImpressions: 'Up to 20,000',
      revenue: '+3% of generated leads',
    },
    {
      name: 'Enterprise',
      description: 'Premium Grid Placement',
      price: 499,
      features: [
        'Large grid cell placement (2x2)',
        'Featured positioning',
        'Daily analytics report',
        'Unlimited team members',
        '24/7 dedicated support',
        'Custom integration options',
        'Priority in search results',
        'Everything in Professional plan',
      ],
      cta: 'Subscribe Now',
      popular: false,
      gridSize: '2x2',
      maxImpressions: 'Up to 100,000',
      revenue: '+1% of generated leads',
    },
  ];

  return (
    <div className="py-12 px-4 mb-[4rem]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Elevate Your Presence</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Select the perfect plan to showcase your presence in our community xLab grid. Larger placements offer more visibility and engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col ${tier.popular ? 'border-2 border-blue-500 shadow-lg relative' : 'border border-gray-200'}`}
          >
            {tier.popular && (
              <div className="absolute top-0 left-0 right-0 bg-blue-100 text-blue-700 text-center py-1 font-medium text-sm">Recommended</div>
            )}

            <CardHeader className={`${tier.popular ? 'pt-8' : 'pt-6'} pb-6 text-center`}>
              <h3 className="text-xl font-bold flex items-center justify-center">
                {tier.name}
                {tier.name === 'Professional' && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">Pro</span>}
                {tier.name === 'Enterprise' && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full flex items-center">
                    <Crown className="h-3 w-3 mr-0.5" /> Premium
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{tier.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">{tier.revenue}</div>
            </CardHeader>

            <CardContent className="flex-grow">
              <div className="bg-amber-50 p-3 mb-4 text-center">
                <p className="font-medium">Grid Size: {tier.gridSize}</p>
                <p className="text-sm text-gray-600">{tier.maxImpressions}</p>
              </div>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-6 pb-8">
              <Button className={`w-full py-6 ${tier.popular ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : ''}`}>{tier.cta}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          Need a custom solution?{' '}
          <a href="#" className="text-blue-600 font-medium">
            Contact us
          </a>{' '}
          for enterprise pricing.
        </p>
      </div>
    </div>
  );
}
