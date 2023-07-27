import { useEffect, useContext } from 'react';
import { Context } from 'components/App';
import { ModalContainer, ModalLoader, Overlay } from './Modal.style';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export const Modal = ({ largeImgObj }) => {
  const context = useContext(Context);

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);

    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  }, []);

  const handleCloseModal = e => {
    if (e.key === 'Escape' || e.currentTarget === e.target) {
      context.close();
    }
  };

  return (
    <Overlay onClick={handleCloseModal}>
      <ModalContainer>
        <img
          src={
            largeImgObj.largeImageURL ||
            'https://cid.center/wp-content/uploads/2020/11/placeholder.png'
          }
          alt={largeImgObj.tags}
        />
        <ModalLoader format={largeImgObj.largeImageURL}>
          <Loader />
        </ModalLoader>
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImgObj: PropTypes.object.isRequired,
};
