import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ICollection, IImage } from '@/models/Collection.model'; // Import IImage
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Lock, Users, Heart } from 'lucide-react'; // Import Heart
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar
import { getInitials } from '@/components/Header'; // Import helper
import { Button } from '@/components/ui/button'; // Import Button
import useAuthStore from '@/store/authStore'; // Import auth store
import { toast } from 'sonner'; // Import toast

// This is the shape of a collection with the 'user' field populated
type PopulatedCollection = Omit<ICollection, 'user'> & {
  user: {
    _id: string;
    displayName: string;
    profilePhoto: string;
  }
}

const CollectionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuthStore(); // Get the logged-in user
  const [collection, setCollection] = useState<PopulatedCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- New state for liking ---
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  useEffect(() => {
    const fetchCollection = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get<PopulatedCollection>(`/api/collections/${id}`);
        setCollection(res.data);

        // --- Set initial like state ---
        setLikeCount(res.data.likes.length);
        if (currentUser) {
          setIsLiked(res.data.likes.includes(currentUser._id));
        }

      } catch (err: any) {
        console.error('Failed to fetch collection', err);
        if (err.response?.status === 404) {
          setError('Collection not found.');
        } else if (err.response?.status === 403) {
          setError('This collection is private. You do not have permission to view it.');
        } else {
          setError('Failed to load collection.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollection();
  }, [id, currentUser]); // Re-fetch if user changes

  // --- Handle Like/Unlike ---
  const handleLikeClick = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to like a collection.');
      return;
    }
    setIsLikeLoading(true);
    try {
      // Call the API we built
      const res = await axios.post<{ likes: string[] }>(`/api/collections/${id}/like`);

      // Update the UI
      setLikeCount(res.data.likes.length);
      setIsLiked(res.data.likes.includes(currentUser._id));

    } catch (error) {
      toast.error('Failed to update like.');
      console.error('Like error', error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  // --- Render Loading State ---
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full" />
          ))}
        </div>
      </div>
    );
  }

  // --- Render Error State ---
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-destructive-foreground bg-destructive/90 p-8 rounded-lg mt-10">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-2xl font-semibold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!collection) {
    return <p>Collection not found.</p>;
  }

  // --- Render Success State ---
  return (
    <div className="flex flex-col gap-6">
      {/* --- Header --- */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{collection.title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
          {/* --- Author Info --- */}
          <span className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={collection.user.profilePhoto} />
              <AvatarFallback>{getInitials(collection.user.displayName)}</AvatarFallback>
            </Avatar>
            By {collection.user.displayName}
          </span>
          <span>•</span>
          <span>{collection.images.length} images</span>
          <span>•</span>
          {/* --- Public/Private Badge --- */}
          <Badge variant={collection.isPublic ? "outline" : "secondary"}>
            {collection.isPublic ? (
              <Users className="w-4 h-4 mr-2" />
            ) : (
              <Lock className="w-4 h-4 mr-2" />
            )}
            {collection.isPublic ? 'Public' : 'Private'}
          </Badge>
        </div>
        {collection.description && (
          <p className="text-lg text-muted-foreground mt-2">{collection.description}</p>
        )}
      </div>

      {/* --- THIS IS THE MISSING BUTTON --- */}
      <div className="flex">
        <Button
          variant={isLiked ? "default" : "outline"}
          onClick={handleLikeClick}
          disabled={isLikeLoading}
        >
          <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
          {isLiked ? 'Liked' : 'Like'} ({likeCount})
        </Button>
      </div>

      {/* --- Image Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {collection.images.map((image: IImage) => (
          <div key={image.id} className="overflow-hidden rounded-lg">
            <img
              src={image.url}
              alt={image.alt}
              className="aspect-square w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionDetailPage;