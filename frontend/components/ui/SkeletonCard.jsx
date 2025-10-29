import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import CSS

export default function SkeletonCard() {
  return (
    <div className="border rounded-lg overflow-hidden shadow bg-white"> {/* Removed shadow-lg */}
      <Skeleton height={160} style={{ display: 'block' }}/> {/* Image placeholder */}
      <div className="p-2 md:p-4">
        <Skeleton count={1} height={18} style={{ marginBottom: '8px' }}/> {/* Title */}
        <Skeleton width="50%" height={20} /> {/* Price */}
        <Skeleton width="30%" height={12} style={{ marginTop: '8px' }}/> {/* Sold count */}
      </div>
    </div>
  );
}