import { useContext } from 'react';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import { HiSearchCircle } from 'react-icons/hi';
import { Context } from 'components/App';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ img, largeImageURL, tags }) => {
  const context = useContext(Context);
  const cutTags = tags.length > 25 ? tags.slice(0, 25) + '...' : tags;
  return (
    <GalleryItem>
      <GalleryItemImg
        src={
          img || 'https://cid.center/wp-content/uploads/2020/11/placeholder.png'
        }
        alt={tags}
        onClick={() => context.open({ largeImageURL, tags })}
      />
      <p>
        <HiSearchCircle />
        {cutTags}
      </p>
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
