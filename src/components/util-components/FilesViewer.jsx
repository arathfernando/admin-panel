import { Button } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import FilePreviewer from 'react-file-viewer';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, Pagination]);

const UnsupportedComponent = ({ filePath }) => {
  return (
    <div
      className="d-flex flex-column m-auto justify-content-center align-items-center"
      style={{ gap: 18 }}
    >
      <h5 className="fs-16 fw-6 my-0">Preview unavailable.</h5>
      {filePath && (
        <Button
          type="text px-5 br-4 d-flex align-items-center justify-content-center hb-text-primary"
          style={{ border: '2px solid', gap: 12 }}
          size="large"
          icon={<img alt="download" src="/assets/img/icons/download-2.svg" />}
          onClick={() => window.location.assign(filePath)}
        >
          Download file
        </Button>
      )}
    </div>
  );
};

export const FileViewer = ({ filePath, className }) => {
  const fileType = useMemo(() => {
    const fileExtension = filePath?.match?.(/\.([^.]+)$/)?.[1]?.toLowerCase?.();
    return fileExtension === 'webp' ? 'png' : fileExtension || 'png';
  }, [filePath]);

  const [render, setRender] = useState(false);

  const ref = useRef();

  const onError = (e) => {
    console.log(e, 'error in file-viewer');
  };

  useEffect(() => {
    setRender(true);
  }, []);

  if (!render) {
    return null;
  }

  return (
    <div className={`file-viewer${className ? ` ${className}` : ''}`}>
      <FilePreviewer
        ref={ref}
        id={Math.random()}
        fileType={fileType}
        filePath={filePath}
        onError={onError}
        key={filePath}
        unsupportedComponent={() => (
          <UnsupportedComponent filePath={filePath} />
        )}
      />
    </div>
  );
};

const FilesViewer = ({ filesPath = [] }) => {
  return (
    <div className="files-viewer">
      <Swiper spaceBetween={0} slidesPerView={1} pagination navigation>
        {filesPath.map((filePath, key) => (
          <SwiperSlide key={`${key}-${filePath}`}>
            <FileViewer filePath={filePath} key={`${key}-${filePath}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FilesViewer;
