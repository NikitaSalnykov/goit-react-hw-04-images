import { useRef, useEffect, useState } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getImages } from 'services/pixabayAPI';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [largeImgObj, setLargeImgObj] = useState({});
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundText, setNotFoundText] = useState(false);
  const prevValueRef = useRef('');
  const prevPageRef = useRef(1);

  useEffect(() => {
    prevValueRef.current = value;
    prevPageRef.current = page;

    if (prevValueRef.current !== value) {
      setIsLoading(true);
      setLoadMore(false);
      setGallery([]);
      setNotFoundText(false);
      setPage(1);
    }

    const fetchData = async () => {
      const resp = await getImages(value, page).then(resp => resp.data);
      setGallery(resp.hits);

      if (resp.totalHits > page * 12) {
        setIsLoading(false);
        setLoadMore(true);
      } else if (resp.totalHits === 0) {
        setIsLoading(false);
        notFoundText(true);
      } else {
        setIsLoading(false);
        setIsLoading(false);
      }

      if (prevPageRef.current !== page) {
        setGallery(resp.hits);
      }
    };

    fetchData();
  }, [value, page]);

  const showModal = largeImgObj => {
    setModalActive(true);
    setLargeImgObj(largeImgObj);
  };

  const closeModal = () => setModalActive(true);

  const handleSubmit = async value => setValue(value);

  const handleLoadMore = async () => {
    prevPageRef.current = page;
    setPage(prevPageRef.current + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {notFoundText ? (
        <p>No results found for '{value}'</p>
      ) : (
        <ImageGallery gallery={gallery} showModal={showModal} />
      )}
      {loadMore && <Button onClick={handleLoadMore} children="Load more" />}
      {modalActive && (
        <Modal largeImgObj={largeImgObj} closeModal={closeModal} />
      )}
    </AppContainer>
  );
};
