/* eslint-disable camelcase */
import { Button, Drawer, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageCrop from '../../../../components/UploadImage';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import { submitMarketplaceGallery } from '../../../../redux/actions';

const Gallery = ({
  onPrevious,
  onNext,
  open,
  ExpertiseHeader,
  gallery_images,
}) => {
  const { status } = useSelector(
    ({ marketplace }) => marketplace.marketplaceGalleryAction
  );

  const [gelleryId, setGelleryId] = useState();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { marketplaceId } = useParams();

  useEffect(() => {
    form.setFieldsValue({
      ...gallery_images?.[0],
      image: gallery_images?.[0]?.image_url,
    });
  }, [form, gallery_images]);

  const onFinish = ({ ...values }) => {
    const payload = {
      ...values,
    };
    dispatch(
      submitMarketplaceGallery({
        ...payload,
        id: gallery_images?.[0]?.id || gelleryId,
        gig_id: marketplaceId,
        onSuccess: (res) => {
          setGelleryId(res?.[0]?.id);
          onNext();
        },
      })
    );
  };
  return (
    <Drawer
      open={open}
      footer={null}
      closable={false}
      width={710}
      zIndex={999}
      contentWrapperStyle={{ maxWidth: '100vw' }}
      bodyStyle={{
        height: '100vh',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
      className="custom_styles"
    >
      <ExpertiseHeader />
      <div className="px-5 mx-1 flex-grow-1 d-flex flex-column">
        <h3 className="h3-lg mb-4">Gallery</h3>

        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="custom-form-style flex-grow-1 d-flex flex-column"
        >
          <div className="p-2 border rounded-2" style={{ marginBottom: 38 }}>
            <Form.Item
              name="image"
              noStyle
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <ImageCrop
                aspect={2.5}
                className="w-100"
                style={{ aspectRatio: '2.5/1' }}
              >
                <img
                  src="/assets/img/icons/add-image.svg"
                  className="my-auto mx-1 mb-sm-2"
                  alt="icon"
                />
                <h6 className="fs-16 fw-6 mb-1">
                  <u>Add image</u>
                </h6>
              </ImageCrop>
            </Form.Item>
          </div>

          <Form.Item
            name="image_title"
            label={<span className="hb-text-secondary">Image title</span>}
          >
            <Input placeholder="e.g. Project 1" />
          </Form.Item>

          <Form.Item
            name="image_description"
            label={<span className="hb-text-secondary">Image description</span>}
          >
            <CKEditor5 placeholder="Description of your expertise" rows={4} />
          </Form.Item>

          <div
            className="d-flex mt-auto py-4 justify-content-end"
            style={{ columnGap: 17 }}
          >
            <div>
              <Button
                type="ghost px-4 br-5"
                size="large"
                style={{ borderWidth: 2 }}
                onClick={onPrevious}
              >
                <div className="fs-13 fw-5">Previous step</div>
              </Button>
            </div>

            <Button
              type="primary ml2 px-4"
              size="large"
              onClick={() => form.submit()}
              loading={status === 'submitting'}
            >
              <span className="fs-13 fw-5">Submit</span>
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default Gallery;
