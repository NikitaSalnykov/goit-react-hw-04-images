import React, { useRef, useEffect, useState } from 'react';
import { AppContainer } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getImages } from 'services/pixabayAPI';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const Context = React.createContext();

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
    if (!value) {
      setGallery([]);
      setLoadMore(false);
      return;
    }

    if (prevValueRef.current !== value) {
      setIsLoading(true);
      setLoadMore(false);
      setGallery([]);
      setNotFoundText(false);
      setPage(1);
    }

    prevValueRef.current = value;
    prevPageRef.current = page;

    const fetchData = async () => {
      const resp = await getImages(value, page).then(resp => resp.data);
      setGallery(resp.hits);

      if (resp.totalHits > page * 12) {
        setLoadMore(true);
        setIsLoading(false);
      } else if (resp.totalHits === 0) {
        setNotFoundText(true);
        setLoadMore(false);
        setIsLoading(false);
      } else {
        setLoadMore(false);
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

  const closeModal = () => setModalActive(false);

  const handleSubmit = async value => setValue(value);

  const handleLoadMore = async () => {
    prevPageRef.current = page;
    setPage(prevPageRef.current + 1);
  };

  return (
    <Context.Provider value={{ open: showModal, close: closeModal }}>
      <AppContainer>
        <Searchbar onSubmit={handleSubmit} />
        {isLoading && <Loader />}
        {notFoundText ? (
          <p>No results found for '{value}'</p>
        ) : (
          <ImageGallery gallery={gallery} />
        )}
        {loadMore && <Button onClick={handleLoadMore} children="Load more" />}
        {modalActive && <Modal largeImgObj={largeImgObj} />}
      </AppContainer>
    </Context.Provider>
  );
};
