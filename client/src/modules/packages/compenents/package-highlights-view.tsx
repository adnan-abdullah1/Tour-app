export default function PackageHighlight() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Side */}
      <div className="lg:col-span-2 space-y-6">
        {/* Property Highlights */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Property highlights</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-blue-600 mb-1">🏙️</div>
              <p className="text-sm font-medium">In London City Centre</p>
            </div>
            <div>
              <div className="text-blue-600 mb-1">✈️</div>
              <p className="text-sm font-medium">Airport transfer</p>
            </div>
            <div>
              <div className="text-blue-600 mb-1">🛎️</div>
              <p className="text-sm font-medium">Front desk [24-hour]</p>
            </div>
            <div>
              <div className="text-blue-600 mb-1">📺</div>
              <p className="text-sm font-medium">Premium TV channels</p>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-sm text-gray-700 mb-2">
            You can directly book the best price if your travel dates are available,
            all discounts are already included. In the following house description
            you will find all information about our listing.
          </p>
          <p className="text-sm text-gray-700">
            2-room terraced house on 2 levels. Comfortable and cosy furnishings: 1
            room with 1 french bed and radio. Shower, sep. WC. Upper floor: (steep
            stair) living/dining room with 1 sofabed (110 cm, length 180 cm), TV.
            Exit to the balcony. Small kitchen (2 hot plates, oven,
          </p>
          <button className="text-sm text-blue-600 mt-2 underline">Show More</button>
        </div>
      </div>

      {/* Right Card */}
      <div className="border rounded-lg shadow-md p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-semibold">US$72 <span className="text-sm font-normal">nights</span></p>
          </div>
          <div className="bg-blue-600 text-white text-sm px-2 py-1 rounded-md font-medium">
            4.7
          </div>
        </div>
        <p className="text-sm text-gray-500">Exceptional<br />3014 reviews</p>

        {/* Date Range */}
        <div className="border rounded-md p-3 text-sm">
          <p className="text-gray-500">Check in - Check out</p>
          <p className="font-medium">April 15 2025 ~ May 14 2025</p>
        </div>

        {/* Guest Info */}
        <div className="border rounded-md p-3 text-sm">
          <p className="text-gray-500">Guest</p>
          <p className="font-medium">2 adults - 1 children - 1 room</p>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
          Check availability
        </button>
      </div>
    </div>

  );
}
