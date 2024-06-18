/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Affix, Divider } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Steper from '../../../../../components/util-components/Steper';
import EventGeneral from './General';
import EventLectures from './Lectures';
import EventSpeakerAndTiming from './SpeakerAndTiming';

const items = [
  {
    title: 'General',
    key: 'General',
  },
  {
    title: 'Speakers & Schedule',
    key: 'Speakers',
  },
  {
    title: 'Lecture',
    key: 'Lecture',
  },
];

const EventCreate = ({ open, onClose, data }) => {
  const [currentTabKey, setCurrentTabKey] = useState('');

  const [event, setEvent] = useState();
  const [timing, setTiming] = useState();
  const [speakers, setSpeakers] = useState();

  const eventData = useMemo(
    () => ({
      ...data,
      id: event?.id || data?.id,
      event_timing: timing || data?.event_timing,
      event_speakers: speakers || data?.event_speakers,
    }),
    [data, event, timing, speakers]
  );

  useEffect(() => {
    if (open) {
      setCurrentTabKey('General');
    } else {
      setCurrentTabKey('');
    }
  }, [open]);

  const EventHeader = useCallback(
    () => (
      <Affix offsetTop={0.1} style={{ background: 'white' }}>
        <div
          className="d-flex align-items-center justify-content-between px-3 px-md-5 mx-1 pt-4 pt-3"
          style={{ gap: 10, paddingBottom: 14, background: 'white' }}
        >
          <h5 className="h5-sm text-black mb-0">Create an event</h5>
          <img
            src="/assets/img/icons/modal-close.svg"
            alt=""
            style={{ height: 20 }}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <Divider className="my-0" style={{ borderTop: '1px solid #C4C4C4' }} />
      </Affix>
    ),
    []
  );

  const EventSteper = useCallback(
    () => (
      <div className="px-4">
        <Steper
          className="mt-4 mt-lg-5"
          items={items}
          currentKey={currentTabKey}
        />
      </div>
    ),
    [currentTabKey]
  );

  return (
    <>
      <EventGeneral
        setEvent={setEvent}
        data={eventData}
        open={currentTabKey === 'General'}
        EventSteper={EventSteper}
        EventHeader={EventHeader}
        onNext={() => setCurrentTabKey('Speakers')}
      />
      <EventSpeakerAndTiming
        setSpeakers={setSpeakers}
        setTiming={setTiming}
        data={eventData}
        open={currentTabKey === 'Speakers'}
        EventSteper={EventSteper}
        EventHeader={EventHeader}
        onNext={() => setCurrentTabKey('Lecture')}
        onBack={() => setCurrentTabKey('General')}
      />
      <EventLectures
        data={eventData}
        open={currentTabKey === 'Lecture'}
        EventSteper={EventSteper}
        EventHeader={EventHeader}
        onBack={() => setCurrentTabKey('Speakers')}
        onCreate={onClose}
      />
    </>
  );
};

export default EventCreate;
