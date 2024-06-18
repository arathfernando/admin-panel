/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
import { Button, Divider, Form, Input, Modal } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import Loading from '../../../../components/util-components/Loading';
import HBsPagination from '../../../../components/util-components/Pagination';
import { searchProjects } from '../../../../redux/actions';

const SearchProject = ({
  open,
  onClose,
  selectedProjects,
  setSelectedProjects,
  onNext,
}) => {
  const {
    data: projects,
    loading,
    page = 1,
    limit = 20,
    count = 0,
  } = useSelector(({ partner }) => partner.searchProjects);

  const dispatch = useDispatch();

  const containerEl = useRef(null);

  const handleSearchProjects = (param = {}) => {
    dispatch(
      searchProjects({
        search: '',
        page,
        limit,
        ...param,
      })
    );
  };

  const handleSelectDeselct = (project) => {
    const targetedProjectindex = selectedProjects?.findIndex?.(
      (data) => data?.id === project?.id
    );
    if (targetedProjectindex >= 0) {
      const newProjects = [...selectedProjects];
      newProjects?.splice(targetedProjectindex, 1);
      setSelectedProjects(newProjects);
    } else {
      setSelectedProjects((state) => [...state, project]);
    }
  };

  useEffect(() => {
    handleSearchProjects();
  }, []);

  useEffect(() => {
    containerEl?.current?.scrollTo?.(0, 0);
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={662}
      footer={null}
      closable={false}
      bodyStyle={{ padding: 0, maxHeight: '100vh' }}
    >
      <div style={{ padding: '33px 36px 8px' }}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="h5-sm text-black">Search for an project</h5>
          <img
            src="/assets/img/icons/close-icon.svg"
            alt=""
            style={{ height: 20 }}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
      </div>
      <Divider className="my-0" style={{ borderTop: '1px solid #C4C4C4' }} />
      <SimpleBar
        scrollableNodeProps={{ ref: containerEl }}
        style={{ padding: '34px 36px', maxHeight: 'calc(100vh - 70px)' }}
      >
        <Form className="custom-form-style">
          <Form.Item>
            <Input
              style={{ height: 36 }}
              className="br-6"
              // placeholder={t("e.g. Hubbers contest 1")}
              onChange={({ target }) =>
                handleSearchProjects({ search: target.value })
              }
            />
          </Form.Item>
        </Form>

        <div className="h6.h6-sm.text-black" style={{ margin: '23px 0px' }}>
          Projects selected ({selectedProjects?.length || 0})
        </div>

        <div
          className="mx-auto mb-4"
          style={{
            maxWidth: 557,
          }}
        >
          <Row
            className="mb-3 position-relativ mx-n2 position-relative"
            style={{ minHeight: 300 }}
          >
            <Loading loading={loading} />
            {projects?.map?.((project) => (
              <Col xs={12} md={6} style={{ padding: '0px 10px 20px' }}>
                <div
                  key={project.id}
                  className="h-100 d-flex flex-column cursor-pointer"
                  style={{
                    filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1)',
                    borderRadius: '5px 5px 2px 2px',
                    border:
                      selectedProjects?.find?.(
                        (data) => data?.id === project.id
                      )?.id && '2px solid #8BC53F',
                  }}
                  onClick={() => handleSelectDeselct(project)}
                >
                  <img
                    alt=""
                    src={project.project_image}
                    style={{
                      aspectRatio: '1.8/1',
                      borderRadius: 5,
                    }}
                    className="w-100"
                  />
                  <div
                    className="flex-grow-1"
                    style={{
                      padding: '10px',
                      background: selectedProjects?.find?.(
                        (data) => data?.id === project.id
                      )?.id
                        ? '#F6FBEF'
                        : 'white',
                    }}
                  >
                    <h5 className="h5-sm " style={{ marginBottom: 6 }}>
                      {project?.project_name}
                    </h5>

                    <Divider className="mb-2 mt-0 py-1" />
                    <div>
                      <h6
                        className="h6-sm text-grey-light"
                        style={{ marginBottom: 6 }}
                      >
                        Organised by :
                      </h6>
                      <h6 className="h6-sm mb-1">
                        {project?.created_by?.general_profile?.first_name}{' '}
                        {project?.created_by?.general_profile?.last_name}
                      </h6>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center">
            <HBsPagination
              total={count || 0}
              current={page}
              hideOnSinglePage
              defaultPageSize={20}
              onChange={() => {
                containerEl?.current?.scrollTo?.(0, 0);
              }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end" style={{ height: 31 }}>
          <Button type="primary btn-text-md px-4" onClick={onNext}>
            Next
          </Button>
        </div>
      </SimpleBar>
    </Modal>
  );
};

export default SearchProject;
