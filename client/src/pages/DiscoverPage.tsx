import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Heart, ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/components/Header'; // <-- This will now work

// This is the shape of the data from our /api/discover
interface DiscoverCollection {
  _id: string;
  title: string;
  images: { id: string; url: string; alt: string }[];
  isPublic: boolean;
  likes: string[]; // Array of user IDs
  createdAt: string;
  user: {
    _id: string;
    displayName: string;
    profilePhoto: string;
  };
}

const DiscoverPage = () => {
  const [collections, setCollections] = useState<DiscoverCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscover = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get<DiscoverCollection[]>('/api/discover');
        setCollections(res.data);
      } catch (err) {
        console.error('Failed to fetch discover feed', err);
        setError('Failed to load the discover feed.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiscover();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-destructive-foreground bg-destructive/90 p-8 rounded-lg mt-10">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-2xl font-semibold">Oops!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">Discover</h1>
      <p className="text-lg text-muted-foreground">
        Check out public collections curated by other users.
      </p>

      {collections.length === 0 ? (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>It's quiet in here...</CardTitle>
            <CardDescription>
              No public collections have been made yet.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <DiscoverCard key={collection._id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Discover Card Component ---
// A separate card to keep the page clean
const DiscoverCard = ({ collection }: { collection: DiscoverCollection }) => {
  return (
    <Card className="flex flex-col justify-between overflow-hidden group transition-all hover:shadow-lg">
      <Link to={`/collection/${collection._id}`}>
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
      </Link>
      <CardHeader>
        <CardTitle className="truncate group-hover:text-primary">
          <Link to={`/collection/${collection._id}`}>{collection.title}</Link>
        </CardTitle>
        <CardDescription className="flex justify-between items-center pt-2">
          <span className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={collection.user.profilePhoto} />
              <AvatarFallback>{getInitials(collection.user.displayName)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{collection.user.displayName}</span>
          </span>
          <Badge variant="outline" className="py-1">
            <Heart className="w-3 h-3 mr-1.5" />
            {collection.likes.length}
          </Badge>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default DiscoverPage;