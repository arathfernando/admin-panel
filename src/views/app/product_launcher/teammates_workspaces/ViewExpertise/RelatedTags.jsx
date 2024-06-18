import React from 'react';

const RelatedTags = ({ marketplace }) => {
  return (
    <div>
      <h3 className="h3-md mb-4 text-black">Related tags</h3>
      <div className="d-flex flex-wrap">
        {marketplace?.tags?.[0]?.map?.((data) => (
          <p
            className="fs-12 fw-5 mb-3 mr-2 px-3 py-1 mb-0 br-3"
            key={data.id}
            style={{ background: 'rgba(139, 197, 63, 0.3)', color: '#6F9E32' }}
          >
            {data.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RelatedTags;
