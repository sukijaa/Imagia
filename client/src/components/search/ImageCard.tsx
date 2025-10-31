import { UnsplashImage } from '@/store/searchStore';
import useSearchStore from '@/store/searchStore';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';

interface ImageCardProps {
  image: UnsplashImage;
}

const ImageCard = ({ image }: ImageCardProps) => {
  const { selectedImages, toggleImageSelection } = useSearchStore();

  // Check if this card's image is in the Set by comparing IDs
  const isSelected = [...selectedImages].some(img => img.id === image.id);

  return (
    // --- Animation Wrapper ---
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* --- Card Component --- */}
      <Card 
        className="relative overflow-hidden transition-all group border-2"
        // This data attribute applies the blue ring style
        data-state={isSelected ? 'checked' : 'unchecked'}
      >
        {/* This invisible div handles the click for the whole card */}
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={() => toggleImageSelection(image)}
        />

        {/* The checkbox, visible on hover/focus or when checked */}
        <div className="absolute top-2 right-2 z-20">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleImageSelection(image)} 
            className="bg-white/50 group-hover:opacity-100 opacity-0 data-[state=checked]:opacity-100 transition-opacity"
          />
        </div>

        {/* The Image itself */}
        <CardContent className="p-0">
          <img
            src={image.urls.small}
            alt={image.alt_description}
            className="aspect-square w-full h-full object-cover"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ImageCard;