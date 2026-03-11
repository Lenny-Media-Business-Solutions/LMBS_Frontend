import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminApi';
import { PortfolioItem as PortfolioItemType } from '../types';
import { AlertCircle, Loader2, Maximize, ExternalLink } from 'lucide-react';
import MediaLightbox from '../components/MediaLightbox';
import { optimizeCloudinaryUrl } from '../services/cloudinary';


// Internal component to handle individual image loading states
const PortfolioItemCard: React.FC<{ item: PortfolioItemType; onClick: (item: PortfolioItemType) => void }> = ({ item, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideo = item.image?.toLowerCase().match(/\.(mp4|webm|ogg|m4v)$/) || 
                  item.category?.toLowerCase() === 'videography' ||
                  item.image?.includes('/video/upload/');


  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-navy-800 h-80"
      onClick={() => onClick(item)}
    >
      {/* Skeleton Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-navy-800 animate-pulse z-0" />
      )}

      {isVideo ? (
        <video
          src={optimizeCloudinaryUrl(item.image)}
          className={`w-full h-full object-contain transition-all duration-700 ease-in-out group-hover:scale-105 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
          onLoadedData={() => setIsLoaded(true)}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-contain transition-all duration-700 ease-in-out group-hover:scale-105 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
        <div className="absolute top-6 right-6 flex flex-col gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
          <div className="bg-gold-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200">
            <Maximize size={24} />
          </div>
          {item.website_url && (
            <a
              href={item.website_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-navy-900 p-3 rounded-full shadow-lg hover:scale-110 hover:bg-gold-400 hover:text-white transition-all duration-200"
              title="Visit Website"
            >
              <ExternalLink size={24} />
            </a>
          )}
        </div>
        <span className="text-gold-400 text-sm font-bold uppercase tracking-wider mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.category}</span>
        <h3 className="text-white text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState<PortfolioItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItemType | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await adminService.getPortfolioItems();
        // Backend returns { count, next, previous, results: [...] } or just [...]
        const results = Array.isArray(data) ? data : (data.results || []);
        setItems(results);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch portfolio items:', err);
        setError('Failed to load portfolio items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const categories = ["All", "Websites", "Photography", "Branding", "Videography"];

  const filteredItems = filter === 'All'
    ? items
    : filter === 'Photography'
      ? items.filter(item =>
        item.category.toLowerCase().includes('photography') ||
        item.category.toLowerCase().includes('corporate') ||
        item.category.toLowerCase().includes('product')
      )
      : items.filter(item => item.category.toLowerCase() === filter.toLowerCase());

  // Function to render a group of items with a button-style header
  const renderGroup = (title: string, groupItems: PortfolioItemType[]) => {
    if (groupItems.length === 0) return null;
    return (
      <div className="mb-16">
        <div className="flex justify-center mb-8">
          <div className="bg-navy-900 text-gold-400 px-10 py-3 rounded-full font-bold text-lg shadow-xl uppercase tracking-widest border border-gold-500/30">
            {title}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groupItems.map((item) => (
            <PortfolioItemCard
              key={item.id}
              item={item}
              onClick={setSelectedItem}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20">
      <div className="bg-navy-900 py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Work</h1>
          <p className="text-xl text-gray-300">A selection of our recent projects.</p>
        </div>
      </div>

      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${filter === cat
                  ? 'bg-gold-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-navy-900">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p className="text-xl font-medium">Loading our work...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-red-500 text-center max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p className="text-xl font-medium mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-navy-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-navy-800 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No projects in our portfolio yet. Stay tuned!</p>
            </div>
          ) : (
            <>
              {filter === 'Photography' ? (
                <>
                  {renderGroup("Corporate", items.filter(i => i.category.toLowerCase().includes("corporate")))}
                  {renderGroup("Product", items.filter(i => i.category.toLowerCase().includes("product")))}

                  {/* Fallback for general photography items not in subcategories */}
                  {renderGroup("General", items.filter(i =>
                    i.category.toLowerCase().includes("photography") &&
                    !i.category.toLowerCase().includes("corporate") &&
                    !i.category.toLowerCase().includes("product")
                  ))}
                </>
              ) : (
                <>
                  {/* Standard Grid for other categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                      <PortfolioItemCard
                        key={item.id}
                        item={item}
                        onClick={setSelectedItem}
                      />
                    ))}
                  </div>

                  {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                      No projects found in this category.
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      <MediaLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default Portfolio;