export const mockPackages = [
  {
    name: 'Private Ho Chi Minh City Shopping Tour',
    title: 'Explore the vibrant shopping districts',
    location: 'Ho Chi Minh City, Vietnam',
    description:
      'A private tour to explore the best shopping districts in Ho Chi Minh City.',
    rating: 4.5,
    duration: '2 days',
    startDate: new Date('2023-09-01T00:00:00Z'),
    endDate: new Date('2023-09-02T00:00:00Z'),
    startDay: 'Friday',
    endDay: 'Saturday',
    price: 120.0,
    callNumber: '+84 123 456 789',
    email: 'info@ho-chi-minh-tour.com',
    redirectionUrl: 'https://example.com/tour/ho-chi-minh-shopping',
    inclusions: ['Transportation', 'Tour Guide', 'Bottled Water'],
    exclusions: ['Meals', 'Personal Expenses'],
    highlights: {
      title: 'Tour Highlights',
      content: [
        'Visit the best shopping districts in Ho Chi Minh City.',
        'Enjoy a guided tour with a professional tour guide.',
      ],
    },
    tourItinerary: {
      title: 'Itinerary',
      content: [
        'Day 1: Arrival and City Tour - Visit the main attractions and shopping districts.',
        'Day 2: Shopping and Departure - Spend the day shopping and return to your hotel.',
      ],
    },
    policy: {
      title: 'Cancellation Policy',
      content: [
        'Free cancellation up to 24 hours before the tour.',
        'No refund for cancellations made within 24 hours of the tour.',
      ],
    },
    imageUrls: [
      'https://example.com/images/tour1.jpg',
      'https://example.com/images/tour2.jpg',
    ],
    daysPlan: [
      {
        day: 1,
        plan: 'Arrival and City Tour',
        description: 'Visit the main attractions and shopping districts.',
      },
      {
        day: 2,
        plan: 'Shopping and Departure',
        description: 'Spend the day shopping and return to your hotel.',
      },
    ],
    status: 'active',
  },
  {
    name: 'Cultural Tour of Hanoi',
    title: 'Discover the rich culture and history of Hanoi',
    location: 'Hanoi, Vietnam',
    description:
      'A cultural tour to explore the history and traditions of Hanoi.',
    rating: 4.8,
    duration: '3 days',
    startDate: new Date('2023-10-01T00:00:00Z'),
    endDate: new Date('2023-10-03T00:00:00Z'),
    startDay: 'Sunday',
    endDay: 'Tuesday',
    price: 150.0,
    callNumber: '+84 987 654 321',
    email: 'info@hanoi-tour.com',
    redirectionUrl: 'https://example.com/tour/hanoi-cultural',
    inclusions: ['Transportation', 'Tour Guide', 'Entrance Fees'],
    exclusions: ['Meals', 'Personal Expenses'],
    highlights: {
      title: 'Tour Highlights',
      content: [
        'Experience the rich culture of Hanoi.',
        'Visit historical landmarks and museums.',
      ],
    },
    tourItinerary: {
      title: 'Itinerary',
      content: [
        'Day 1: Arrival and City Tour - Explore the Old Quarter and visit historical sites.',
        'Day 2: Cultural Experiences - Participate in traditional activities and workshops.',
        'Day 3: Departure - Enjoy a relaxing morning before departure.',
      ],
    },
    policy: {
      title: 'Cancellation Policy',
      content: [
        'Free cancellation up to 48 hours before the tour.',
        'No refund for cancellations made within 48 hours of the tour.',
      ],
    },
    imageUrls: [
      'https://example.com/images/hanoi1.jpg',
      'https://example.com/images/hanoi2.jpg',
    ],
    daysPlan: [
      {
        day: 1,
        plan: 'Arrival and City Tour',
        description: 'Explore the Old Quarter and visit historical sites.',
      },
      {
        day: 2,
        plan: 'Cultural Experiences',
        description: 'Participate in traditional activities and workshops.',
      },
      {
        day: 3,
        plan: 'Departure',
        description: 'Enjoy a relaxing morning before departure.',
      },
    ],
    status: 'active',
  },
];
