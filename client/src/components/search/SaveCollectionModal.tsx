import { useState } from 'react';
import axios from 'axios';
import useSearchStore from '@/store/searchStore';
import { UnsplashImage } from '@/store/searchStore';

// Import Shadcn Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner'; // Impressive toast notifications!

interface SaveCollectionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SaveCollectionModal = ({ isOpen, onOpenChange }: SaveCollectionModalProps) => {
  const { selectedImages, clearSelection } = useSearchStore();

  // Local state for the form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || selectedImages.size === 0) {
      toast.error('Title and at least one image are required.');
      return;
    }

    setIsSaving(true);

    // 1. Format the images for our backend API
    const imagesToSave = [...selectedImages].map((img: UnsplashImage) => ({
      id: img.id,
      url: img.urls.regular, // Save the high-quality URL
      alt: img.alt_description,
    }));

    try {
      // 2. Call the backend API (created in Part 7)
      await axios.post('/api/collections', {
        title,
        description,
        images: imagesToSave,
        isPublic,
      });

      // 3. Success!
      toast.success('Collection saved successfully!');
      clearSelection();
      onOpenChange(false); // Close the modal
      // Reset form
      setTitle('');
      setDescription('');
      setIsPublic(false);

    } catch (error) {
      console.error('Failed to save collection:', error);
      toast.error('Failed to save collection. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save New Collection</DialogTitle>
          <DialogDescription>
            Save {selectedImages.size} selected images as a new collection.
          </DialogDescription>
        </DialogHeader>

        {/* --- Thumbnail Previews --- */}
        <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-32 pr-2">
          {[...selectedImages].map((img) => (
            <img
              key={img.id}
              src={img.urls.small}
              alt={img.alt_description}
              className="rounded-md aspect-square object-cover"
            />
          ))}
        </div>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 'Awesome Desktops'"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., 'Inspiration for my new setup'"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              id="is-public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <Label htmlFor="is-public">Make this collection public?</Label>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                'Save Collection'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};