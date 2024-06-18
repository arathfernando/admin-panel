/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import { Form, Select } from 'antd';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCountChart } from '../../../../redux/actions';

const initialChartState = {
  series: [
    {
      name: 'Share price',
      data: [],
    },
  ],
  options: {
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 400,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.6,
        stops: [0, 90, 100],
      },
    },

    // theme color
    colors: ['#8BC53F', '#FFFFFF'],
    stroke: {
      width: 1,
    },
  },
};

const NewRegisteredUsersChart = () => {
  const { data: userCountChart = [] } = useSelector(
    ({ kpi }) => kpi.userCountChart
  );
  const [series, setSeries] = useState(initialChartState.series);
  const [options, setOptions] = useState(initialChartState.options);

  // date range
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  console.log('userCountChart', userCountChart);

  const timeDistance = useMemo(() => {
    const maxdate = moment(maxDate);
    const mindate = moment(minDate);
    const dateDistance = maxdate.diff(mindate, 'days');
    const monthDistance = maxdate.diff(mindate, 'months');
    const yearsDistance = maxdate.diff(mindate, 'years');
    return {
      dateDistance,
      monthDistance,
      yearsDistance,
    };
  }, [minDate, maxDate]);

  useEffect(() => {
    dispatch(getUserCountChart());
  }, []);

  // set data in chart
  useEffect(() => {
    // se sire rice data to chart
    setSeries([
      {
        name: 'Users',
        data:
          userCountChart.map?.((data) => [
            new Date(data?.date).getTime(),
            data?.user_count || 0,
          ]) || [],
      },
    ]);

    const minDate = userCountChart[0]?.date;
    const maxDate = userCountChart[userCountChart?.length - 1]?.date;

    setMinDate(minDate);
    setMaxDate(maxDate);

    setTimeout(() => {
      ReactApexChart.exec(
        'area-datetime',
        'zoomX',
        new Date(minDate).getTime(),
        new Date(maxDate).getTime()
      );
    }, 0);
  }, [userCountChart]);

  const updateDataByDateRange = (rangeKey) => {
    switch (rangeKey) {
      case '1d':
        setOptions((option) => ({
          ...option,
          xaxis: {
            ...option.xaxis,
            min: new Date(moment(maxDate).subtract(1, 'days')).getTime(),
          },
        }));
        break;
      case '1w':
        setOptions((option) => ({
          ...option,
          xaxis: {
            ...option.xaxis,
            min: new Date(
              moment(maxDate).subtract(7, 'days').format('DD MMM YYYY')
            ).getTime(),
          },
        }));
        break;
      case '1m':
        setOptions((option) => ({
          ...option,
          xaxis: {
            ...option.xaxis,
            min: new Date(
              moment(maxDate).subtract(1, 'months').format('DD MMM YYYY')
            ).getTime(),
          },
        }));
        break;
      case '3m':
        setOptions((option) => ({
          ...option,
          xaxis: {
            ...option.xaxis,
            min: new Date(
              moment(maxDate).subtract(3, 'months').format('DD MMM YYYY')
            ).getTime(),
          },
        }));
        break;
      case '6m':
        setOptions((option) => ({
          ...option,
          xaxis: {
            ...option.xaxis,
            min: new Date(
              moment(maxDate).subtract(6, 'months').format('DD MMM YYYY')
            ).getTime(),
          },
        }));
        break;
      case '1y':
        setOptions((option) => ({
          ...option,
          xaxis: {
            ...option.xaxis,
            min: new Date(
              moment(maxDate).subtract(1, 'years').format('DD MMM YYYY')
            ).getTime(),
          },
        }));
        break;
      case 'All':
        setOptions((option) => ({
          ...option,
          xaxis: {
            ...option.xaxis,
            min: new Date(minDate).getTime(),
          },
        }));
        break;
      default:
    }
  };

  return (
    <div className="my-2">
      <div className="d-flex w-100 justify-content-end">
        <Form
          form={form}
          className="custom-form-style"
          disabled
          layout="vertical"
        >
          <Form.Item style={{ marginBottom: 18, minWidth: 120 }}>
            <Select
              options={[
                {
                  key: '1d',
                  label: 'Today',
                  disabled: timeDistance.dateDistance < 1,
                },
                {
                  key: '1w',
                  label: 'Last 7 days',
                  disabled: timeDistance.dateDistance < 7,
                },
                {
                  key: '1m',
                  label: 'Last 1 months',
                  disabled: timeDistance.monthDistance < 1,
                },
                {
                  key: '3m',
                  label: 'Last 3 months',
                  disabled: timeDistance.monthDistance < 3,
                },
                {
                  key: '6m',
                  label: 'Last 6 months',
                  disabled: timeDistance.monthDistance < 6,
                },
                {
                  key: '1y',
                  label: 'Last 1 year',
                  disabled: timeDistance.yearsDistance < 1,
                },
                {
                  key: 'All',
                  label: 'All',
                  disabled: !minDate && !maxDate,
                },
              ].map((data) => ({
                ...data,
                value: data.key,
                label: data.label,
              }))}
              disabled={false}
              onChange={(key) => updateDataByDateRange(key)}
              defaultValue="All"
            />
          </Form.Item>
        </Form>
      </div>
      <div id="chart">
        <div id="chart-timeline">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default NewRegisteredUsersChart;
