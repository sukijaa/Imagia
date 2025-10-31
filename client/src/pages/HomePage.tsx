import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import useSearchStore from '@/store/searchStore';

// Import Shadcn Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, X, Save } from 'lucide-react'; // <-- Import Save icon

// Import our custom components
import ImageCard from '@/components/search/ImageCard';
import { SaveCollectionModal } from '@/components/search/SaveCollectionModal'; // <-- 1. Import the modal

interface TopSearch {
  term: string;
  count: number;
}

const HomePage = () => {
  // --- Local State ---
  const [topSearches, setTopSearches] = useState<TopSearch[]>([]);
  const [inputTerm, setInputTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- 2. Add modal state

  // --- Zustand Store ---
  const {
    results,
    isLoading,
    error,
    searchTerm,
    searchImages,
    selectedImages,
    clearSelection,
  } = useSearchStore();

  // --- Fetch Top Searches on Mount ---
  useEffect(() => {
    // ... (This function is unchanged)
    const fetchTopSearches = async () => {
      try {
        const res = await axios.get<TopSearch[]>('/api/search/top');
        setTopSearches(res.data);
      } catch (err) {
        console.error('Failed to fetch top searches', err);
      }
    };
    fetchTopSearches();
  }, []);

  // --- Handlers ---
  const handleSearchSubmit = (e: FormEvent) => {
    // ... (This function is unchanged)
    e.preventDefault();
    if (inputTerm.trim()) {
      searchImages(inputTerm.trim());
    }
  };

  const handleTopSearchClick = (term: string) => {
    // ... (This function is unchanged)
    setInputTerm(term);
    searchImages(term);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* --- 1. Search Bar --- */}
      {/* ... (This section is unchanged) ... */}
      <form onSubmit={handleSearchSubmit} className="flex w-full max-w-2xl mx-auto items-center space-x-2">
        <Input
          type="text"
          placeholder="Search for high-resolution images..."
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {/* --- 2. Top Searches Banner --- */}
      {/* ... (This section is unchanged) ... */}
      {topSearches.length > 0 && (
        <div className="flex justify-center flex-wrap gap-2">
          <span className="text-sm font-medium mr-2">Top Searches:</span>
          {topSearches.map((search) => (
            <Badge
              key={search.term}
              variant="secondary"
              onClick={() => handleTopSearchClick(search.term)}
              className="cursor-pointer hover:bg-accent"
            >
              {search.term}
            </Badge>
          ))}
        </div>
      )}

      {/* --- 3. Results Section --- */}
      <div className="flex-1">
        {/* 3a. Multi-Select Counter (UPDATED) */}
        {selectedImages.size > 0 && (
          <div className="sticky top-16 z-10 bg-background/90 backdrop-blur-sm py-4 mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Selected: {selectedImages.size} images
            </h3>
            {/* --- 3. Add Save Button & Clear Button --- */}
            <div className='flex gap-2'>
              <Button variant="outline" size="sm" onClick={clearSelection}>
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button size="sm" onClick={() => setIsModalOpen(true)}>
                <Save className="h-4 w-4 mr-2" />
                Save as Collection
              </Button>
            </div>
          </div>
        )}

        {/* ... (Rest of the file is unchanged: Loading, Error, Results, Empty) ... */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        )}
        {error && <p className="text-center text-destructive">{error}</p>}
        {results && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              Results for "{searchTerm}"
              <span className="text-muted-foreground text-lg ml-2">
                ({results.length} images)
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          </div>
        )}
        {!isLoading && !results && !error && (
          <p className="text-center text-muted-foreground">
            Get started by searching for a term or clicking a top search.
          </p>
        )}
      </div>

      {/* --- 4. Render the Modal --- */}
      <SaveCollectionModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default HomePage;