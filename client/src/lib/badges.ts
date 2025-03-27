import CivicEngagement from '@/assets/BadgeSVGs/Property 1=Civic Engagement and Responsibility 1.svg';
import CollaborationEngagement from '@/assets/BadgeSVGs/Property 1=Collaboration and Engagement 1.svg';
import EconomicStability from '@/assets/BadgeSVGs/Property 1=Economic Stability 1.svg';
import EducationEmpowerment from '@/assets/BadgeSVGs/Property 1=Education and Empowerment 1.svg';
import HealthWelbeeing from '@/assets/BadgeSVGs/Property 1=Health and Well-being 1.svg';
import InclusitivityDiversity from '@/assets/BadgeSVGs/Property 1=Inclusivity and Diversity 1.svg';
import SocialConnectionSupport from '@/assets/BadgeSVGs/Property 1=Social Connection and Support 1.svg';
import SustainabilityEnvironment from '@/assets/BadgeSVGs/Property 1=Sustainability and Environmental Responsibility 1.svg';
import TrustTransparency from '@/assets/BadgeSVGs/Property 1=Trust and Transparency 1.svg';

export enum ProjectCategory {
  HEALTH_WELLBEING,
  SUSTAINABILITY_ENVIRONMENT,
  SOCIAL_CONNECTION_SUPPORT,
  EDUCATION_EMPOWERMENT,
  ECONOMIC_STABILITY,
  TRUST_TRANSPARENCY,
  COLLABORATION_ENGAGEMENT,
  CIVIC_ENGAGEMENT_RESPONSIBILITY,
  INCLUSIVITY_DIVERSITY,
}

export const badges = [
  {
    name: 'Civic Engagement and Responsibility',
    image: CivicEngagement,
    description:
      'This badge is awarded to individuals who have demonstrated a commitment to civic engagement and responsibility. Recipients of this badge have shown a willingness to participate in community activities and take responsibility for their actions.',
  },

  {
    name: 'Collaboration and Engagement',
    image: CollaborationEngagement,
    description:
      'This badge is awarded to individuals who have demonstrated a commitment to collaboration and engagement. Recipients of this badge have shown a willingness to work with others and engage in meaningful conversations.',
  },

  {
    name: 'Economic Stability',
    image: EconomicStability,
    description:
      'This badge is awarded to individuals who have demonstrated a commitment to economic stability. Recipients of this badge have shown a willingness to save money, invest wisely, and make informed financial decisions.',
  },

  {
    name: 'Education and Empowerment',
    image: EducationEmpowerment,
    description:
      'This badge is awarded to individuals who have demonstrated a commitment to education and empowerment. Recipients of this badge have shown a willingness to learn new things, share their knowledge with others, and empower themselves and others.',
  },

  {
    name: 'Health and Well-being',
    image: HealthWelbeeing,
    description:
      'This badge is awarded to individuals who have demonstrated a commitment to health and well-being. Recipients of this badge have shown a willingness to take care of their physical and mental health, make healthy choices, and support others in their health journeys.',
  },

  {
    name: 'Inclusivity and Diversity',
    image: InclusitivityDiversity,
    description:
      'This badge is awarded to individuals who have demonstrated a commitment to inclusivity and diversity. Recipients of this badge have shown a willingness to create inclusive spaces, celebrate diversity, and advocate for social justice.',
  },

  {
    name: 'Social Connection and Support',
    image: SocialConnectionSupport,
    description:
      'This badge is awarded to individuals who have demonstrated a commitment to social connection and support. Recipients of this badge have shown a willingness to build relationships, offer support to others, and create a sense of community.',
  },

  {
    name: 'Sustainability and Environmental Responsibility',
    image: SustainabilityEnvironment,
    description:
      'This badge is awarded to individuals who have demonstrated a commitment to sustainability and environmental responsibility. Recipients of this badge have shown a willingness to reduce their environmental impact, protect natural resources, and promote sustainable living.',
  },

  {
    name: 'Trust and Transparency',
    image: TrustTransparency,
    description:
      'This badge is awarded to individuals who have demonstrated a commitment to trust and transparency. Recipients of this badge have shown a willingness to be honest, open, and accountable in their interactions with others.',
  },
];

export const imageMap: Record<string, string> = {
  COLLABORATION_ENGAGEMENT: CollaborationEngagement,
  CIVIC_ENGAGEMENT_RESPONSIBILITY: CivicEngagement,
  ECONOMIC_STABILITY: EconomicStability,
  EDUCATION_EMPOWERMENT: EducationEmpowerment,
  HEALTH_WELLBEING: HealthWelbeeing,
  INCLUSIVITY_DIVERSITY: InclusitivityDiversity,
  SOCIAL_CONNECTION_SUPPORT: SocialConnectionSupport,
  SUSTAINABILITY_ENVIRONMENT: SustainabilityEnvironment,
  TRUST_TRANSPARENCY: TrustTransparency,
};
