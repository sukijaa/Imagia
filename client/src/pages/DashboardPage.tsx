import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // <-- 1. Import motion

// Import Shadcn Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { History, LayoutGrid, AlertCircle, Lock, Users, Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// --- Interface Definitions ---
interface HistoryItem {
  _id: string;
  term: string;
  timestamp: string;
}

interface MyCollection {
  _id: string;
  title: string;
  isPublic: boolean;
  images: { id: string; url: string; alt: string }[];
  createdAt: string;
}

// --- Main Dashboard Page Component ---
const DashboardPage = () => {
  // ... (This component is unchanged) ...
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">My Dashboard</h1>

      <Tabs defaultValue="collections" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="history">
            <History className="w-4 h-4 mr-2" />
            Search History
          </TabsTrigger>
          <TabsTrigger value="collections">
            <LayoutGrid className="w-4 h-4 mr-2" />
            My Collections
          </TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <SearchHistoryTab />
        </TabsContent>
        <TabsContent value="collections">
          <MyCollectionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// --- Search History Component (Unchanged) ---
const SearchHistoryTab = () => {
  // ... (This component is unchanged) ...
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get<HistoryItem[]>('/api/history');
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to fetch history', err);
        setError('Failed to load your search history.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-destructive-foreground bg-destructive/90 p-8 rounded-lg">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-2xl font-semibold">Oops!</h2>
        <p>{error}</p>
      </div>
    );
  }
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>No History Yet</CardTitle>
          <CardDescription>
            Your past searches will appear here.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      {history.map((item) => (
        <Card key={item._id}>
          <CardHeader>
            <CardTitle className="capitalize">{item.term}</CardTitle>
            <CardDescription>
              Searched {formatDistanceToNow(new Date(item.timestamp))} ago
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

// --- My Collections Component (THIS IS THE FIX) ---
const MyCollectionsTab = () => {
  const [collections, setCollections] = useState<MyCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get<MyCollection[]>('/api/collections');
        setCollections(res.data);
      } catch (err) {
        console.error('Failed to fetch collections', err);
        setError('Failed to load your collections.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollections();
  }, []);

  // --- THIS IS THE FIXED LOADING BLOCK ---
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }
  // --- END OF FIXED LOADING BLOCK ---

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-destructive-foreground bg-destructive/90 p-8 rounded-lg">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-2xl font-semibold">Oops!</h2>
        <p>{error}</p>
      </div>
    );
  }
  if (collections.length === 0) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>No Collections Yet</CardTitle>
          <CardDescription>
            Go to the home page, select some images, and save them!
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // --- Render Collection Cards (WITH ANIMATION) ---
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {collections.map((collection, index) => ( // <-- Added 'index'
        // --- 2. Add animation wrapper ---
        <motion.div
          key={collection._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link to={`/collection/${collection._id}`}>
            <Card className="overflow-hidden group transition-all hover:shadow-lg">
              {/* --- Card Image Preview --- */}
              <div className="relative w-full h-32 bg-muted">
                {collection.images[0] ? (
                  <img
                    src={collection.images[0].url}
                    alt={collection.images[0].alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              {/* --- Card Content --- */}
              <CardHeader>
                <CardTitle className="truncate group-hover:text-primary">
                  {collection.title}
                </CardTitle>
                <CardDescription className="flex justify-between items-center pt-2">
                  <span>{collection.images.length} images</span>
                  <Badge variant={collection.isPublic ? "outline" : "secondary"}>
                    {collection.isPublic ? (
                      <Users className="w-3 h-3 mr-1.5" />
                    ) : (
                      <Lock className="w-3 h-3 mr-1.5" />
                    )}
                    {collection.isPublic ? 'Public' : 'Private'}
                  </Badge>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardPage;