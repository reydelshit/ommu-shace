import { Check, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function PricingTiers() {
  const tiers = [
    {
      name: 'Free',
      description: 'Small Grid Placement',
      price: 0, // Free Tier
      duration: '1 week',
      features: ['Single grid cell display (1x1)', 'Basic profile information', 'Standard support', 'Up to 5,000 impressions'],
      cta: 'Subscribe Now',
      popular: false,
      gridSize: '1x1',
    },
    {
      name: 'Basic',
      description: 'Small Grid Placement',
      price: 50, // Adjusted price
      duration: '1 month',
      features: ['Single grid cell display (1x1)', 'Basic profile information', 'Standard support', 'Up to 8,000 impressions'],
      cta: 'Subscribe Now',
      popular: false,
      gridSize: '1x1',
    },
    {
      name: 'Professional',
      description: 'Medium Grid Placement',
      price: 150, // Adjusted price
      duration: '2 months',
      features: [
        'Double-width grid cell (2x1)',
        'Enhanced profile with media',
        'Priority support',
        'Custom branding options',
        'Everything in Basic plan',
        'Up to 20,000 impressions',
      ],
      cta: 'Subscribe Now',
      popular: true,
      gridSize: '2x1',
    },
    {
      name: 'Enterprise',
      description: 'Premium Grid Placement',
      price: 250, // Adjusted price
      duration: '1 year',
      features: [
        'Large grid cell placement (2x2)',
        'Featured positioning',
        '24/7 dedicated support',
        'Custom integration options',
        'Priority in search results',
        'Everything in Professional plan',
        'Up to 100,000 impressions',
      ],
      cta: 'Subscribe Now',
      popular: false,
      gridSize: '2x2',
    },
  ];

  return (
    <div className="py-12 px-4 mb-[4rem]">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center font-boldonse">Elevate Your Presence</h2>

        <p className="text-gray-500 max-w-2xl mx-auto italic">
          Select the perfect plan to showcase your presence in our community xLab grid. Larger placements offer more visibility and engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col ${tier.popular ? 'border-2 border-blue-500 shadow-lg relative' : 'border border-gray-200 '} overflow-hidden`}
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
                <span className="text-4xl font-bold">₱{tier.price}</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
            </CardHeader>

            <CardContent className="flex-grow">
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
