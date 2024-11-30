import { Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const LanguageAndRegion = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeFormat, setTimeFormat] = useState("12"); // default to 12-hour format
  const [dateFormat, setDateFormat] = useState("dd-mm-yyyy");
  const [firstDay, setFirstDay] = useState("Monday");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const twelveHours = () => {
    return currentTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  const twentyFourHours = () => {
    return currentTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  };
  const formatDate = () => {
    if (dateFormat === "dd-mm-yyyy") {
      return currentTime.toLocaleDateString("en-GB");
    } else if (dateFormat === "mm-dd-yyyy") {
      return currentTime.toLocaleDateString("en-US");
    }
  };
  const handleDateFormatChange = (event) => {
    setDateFormat(event.target.value);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div className="w-100 fs_14" style={{ padding: "24px" }}>
      <p className="" style={{ fontSize: "32px", fontWeight: "500" }}>
        Language & region
      </p>
      <p className="mb-2 fontSize16">Language</p>
      <Space wrap>
        <Select
          defaultValue="English"
          style={{
            width: 300,
            height: 40,
            zIndex: 99999,
          }}
          onChange={handleChange}
          options={[
            { value: "Español", label: "Español" },
            { value: "Français", label: "Français" },
            { value: "Deutsch", label: "Deutsch" },
            { value: "Português", label: "Português" },
            { value: "English", label: "English" },
            { value: "日本語", label: "日本語" },
            { value: "Nederlands", label: "Nederlands" },
            { value: "Italiano", label: "Italiano" },
            { value: "한국어", label: "한국어" },
            { value: "Svenska", label: "Svenska" },
            { value: "Türkçe", label: "Türkçe" },
            { value: "繁體中文", label: "繁體中文" },
            { value: "Polski", label: "Polski" },
          ]}
        />
      </Space>
      <p className="mt-4 mb-2 fontSize16">Timezone</p>
      <Space wrap>
        <Select
          defaultValue="(GMT+05:00) Islamabad"
          showSearch
          optionFilterProp="label"
          onSearch={onSearch}
          style={{
            width: 300,
            height: 40,
            zIndex: 99999,
          }}
          onChange={handleChange}
          options={[
            { value: "(GMT-12:00) IDLW", label: "(GMT-12:00) IDLW" },
            { value: "(GMT-11:00) UTC-11", label: "(GMT-11:00) UTC-11" },
            { value: "(GMT-10:00) Hawaii", label: "(GMT-10:00) Hawaii" },
            { value: "(GMT-09:00) Alaska", label: "(GMT-09:00) Alaska" },
            { value: "(GMT-08:00) Pacific", label: "(GMT-08:00) Pacific" },
            { value: "(GMT-07:00) Arizona", label: "(GMT-07:00) Arizona" },
            {
              value: "(GMT-07:00) Chihuahua",
              label: "(GMT-07:00) Chihuahua",
            },
            { value: "(GMT-07:00) Mountain", label: "(GMT-07:00) Mountain" },
            { value: "(GMT-06:00) Central", label: "(GMT-06:00) Central" },
            {
              value: "(GMT-06:00) Guadalajara",
              label: "(GMT-06:00) Guadalajara",
            },
            {
              value: "(GMT-06:00) Saskatchewan",
              label: "(GMT-06:00) Saskatchewan",
            },
            { value: "(GMT-05:00) Bogota", label: "(GMT-05:00) Bogota" },
            { value: "(GMT-05:00) Chetumal", label: "(GMT-05:00) Chetumal" },
            { value: "(GMT-05:00) Eastern", label: "(GMT-05:00) Eastern" },
            { value: "(GMT-05:00) Indiana", label: "(GMT-05:00) Indiana" },
            { value: "(GMT-04:00) Asuncion", label: "(GMT-04:00) Asuncion" },
            { value: "(GMT-04:00) Atlantic", label: "(GMT-04:00) Atlantic" },
            { value: "(GMT-04:00) Caracas", label: "(GMT-04:00) Caracas" },
            { value: "(GMT-04:00) Cuiaba", label: "(GMT-04:00) Cuiaba" },
            {
              value: "(GMT-04:00) Georgetown",
              label: "(GMT-04:00) Georgetown",
            },
            { value: "(GMT-04:00) Santiago", label: "(GMT-04:00) Santiago" },
            {
              value: "(GMT-03:30) Newfoundland",
              label: "(GMT-03:30) Newfoundland",
            },
            { value: "(GMT-03:00) Brasilia", label: "(GMT-03:00) Brasilia" },
            { value: "(GMT-03:00) Cayenne", label: "(GMT-03:00) Cayenne" },
            {
              value: "(GMT-03:00) Buenos Aires",
              label: "(GMT-03:00) Buenos Aires",
            },
            {
              value: "(GMT-03:00) Greenland",
              label: "(GMT-03:00) Greenland",
            },
            {
              value: "(GMT-03:00) Montevideo",
              label: "(GMT-03:00) Montevideo",
            },
            { value: "(GMT-03:00) Salvador", label: "(GMT-03:00) Salvador" },
            { value: "(GMT-02:00) UTC-02", label: "(GMT-02:00) UTC-02" },
            { value: "(GMT-01:00) Azores", label: "(GMT-01:00) Azores" },
            {
              value: "(GMT-01:00) Cabo Verde",
              label: "(GMT-01:00) Cabo Verde",
            },
            { value: "(GMT+00:00) UTC", label: "(GMT+00:00) UTC" },
            {
              value: "(GMT+00:00) Casablanca",
              label: "(GMT+00:00) Casablanca",
            },
            { value: "(GMT+00:00) Dublin", label: "(GMT+00:00) Dublin" },
            { value: "(GMT+00:00) Monrovia", label: "(GMT+00:00) Monrovia" },
            {
              value: "(GMT+01:00) Amsterdam",
              label: "(GMT+01:00) Amsterdam",
            },
            { value: "(GMT+01:00) Belgrade", label: "(GMT+01:00) Belgrade" },
            { value: "(GMT+01:00) Berlin", label: "(GMT+01:00) Berlin" },
            {
              value: "(GMT+01:00) Bratislava",
              label: "(GMT+01:00) Bratislava",
            },
            { value: "(GMT+01:00) Brussels", label: "(GMT+01:00) Brussels" },
            { value: "(GMT+01:00) Budapest", label: "(GMT+01:00) Budapest" },
            {
              value: "(GMT+01:00) Copenhagen",
              label: "(GMT+01:00) Copenhagen",
            },
            {
              value: "(GMT+01:00) Ljubljana",
              label: "(GMT+01:00) Ljubljana",
            },
            { value: "(GMT+01:00) Madrid", label: "(GMT+01:00) Madrid" },
            { value: "(GMT+01:00) Paris", label: "(GMT+01:00) Paris" },
            { value: "(GMT+01:00) Prague", label: "(GMT+01:00) Prague" },
            { value: "(GMT+01:00) Rome", label: "(GMT+01:00) Rome" },
            { value: "(GMT+01:00) Sarajevo", label: "(GMT+01:00) Sarajevo" },
            { value: "(GMT+01:00) Skopje", label: "(GMT+01:00) Skopje" },
            { value: "(GMT+01:00) Vienna", label: "(GMT+01:00) Vienna" },
            { value: "(GMT+01:00) Warsaw", label: "(GMT+01:00) Warsaw" },
            { value: "(GMT+01:00) Zagreb", label: "(GMT+01:00) Zagreb" },
            { value: "(GMT+02:00) Athens", label: "(GMT+02:00) Athens" },
            {
              value: "(GMT+02:00) Bucharest",
              label: "(GMT+02:00) Bucharest",
            },
            { value: "(GMT+02:00) Cairo", label: "(GMT+02:00) Cairo" },
            { value: "(GMT+02:00) Harare", label: "(GMT+02:00) Harare" },
            { value: "(GMT+02:00) Istanbul", label: "(GMT+02:00) Istanbul" },
            {
              value: "(GMT+02:00) Jerusalem",
              label: "(GMT+02:00) Jerusalem",
            },
            { value: "(GMT+02:00) Kyiv", label: "(GMT+02:00) Kyiv" },
            { value: "(GMT+02:00) Sofia", label: "(GMT+02:00) Sofia" },
            { value: "(GMT+02:00) Tallinn", label: "(GMT+02:00) Tallinn" },
            { value: "(GMT+03:00) Baghdad", label: "(GMT+03:00) Baghdad" },
            { value: "(GMT+03:00) Kuwait", label: "(GMT+03:00) Kuwait" },
            { value: "(GMT+03:00) Minsk", label: "(GMT+03:00) Minsk" },
            { value: "(GMT+03:00) Moscow", label: "(GMT+03:00) Moscow" },
            { value: "(GMT+03:00) Nairobi", label: "(GMT+03:00) Nairobi" },
            { value: "(GMT+03:00) Riyadh", label: "(GMT+03:00) Riyadh" },
            {
              value: "(GMT+03:00) St. Petersburg",
              label: "(GMT+03:00) St. Petersburg",
            },
            {
              value: "(GMT+04:00) Abu Dhabi",
              label: "(GMT+04:00) Abu Dhabi",
            },
            { value: "(GMT+04:00) Baku", label: "(GMT+04:00) Baku" },
            { value: "(GMT+04:00) Muscat", label: "(GMT+04:00) Muscat" },
            { value: "(GMT+04:00) Tbilisi", label: "(GMT+04:00) Tbilisi" },
            { value: "(GMT+04:30) Kabul", label: "(GMT+04:30) Kabul" },
            {
              value: "(GMT+05:00) Islamabad",
              label: "(GMT+05:00) Islamabad",
            },
            { value: "(GMT+05:00) Karachi", label: "(GMT+05:00) Karachi" },
            { value: "(GMT+05:00) Tashkent", label: "(GMT+05:00) Tashkent" },
            { value: "(GMT+05:30) Chennai", label: "(GMT+05:30) Chennai" },
            { value: "(GMT+05:30) Kolkata", label: "(GMT+05:30) Kolkata" },
            { value: "(GMT+05:30) Mumbai", label: "(GMT+05:30) Mumbai" },
            {
              value: "(GMT+05:30) New Delhi",
              label: "(GMT+05:30) New Delhi",
            },
            { value: "(GMT+06:00) Almaty", label: "(GMT+06:00) Almaty" },
            { value: "(GMT+06:00) Astana", label: "(GMT+06:00) Astana" },
            { value: "(GMT+06:00) Dhaka", label: "(GMT+06:00) Dhaka" },
            { value: "(GMT+06:30) Yangon", label: "(GMT+06:30) Yangon" },
            { value: "(GMT+07:00) Bangkok", label: "(GMT+07:00) Bangkok" },
            { value: "(GMT+07:00) Hanoi", label: "(GMT+07:00) Hanoi" },
            { value: "(GMT+07:00) Jakarta", label: "(GMT+07:00) Jakarta" },
            {
              value: "(GMT+07:00) Krasnoyarsk",
              label: "(GMT+07:00) Krasnoyarsk",
            },
            { value: "(GMT+08:00) Beijing", label: "(GMT+08:00) Beijing" },
            {
              value: "(GMT+08:00) Chongqing",
              label: "(GMT+08:00) Chongqing",
            },
            {
              value: "(GMT+08:00) Hong Kong",
              label: "(GMT+08:00) Hong Kong",
            },
            {
              value: "(GMT+08:00) Kuala Lumpur",
              label: "(GMT+08:00) Kuala Lumpur",
            },
            { value: "(GMT+08:00) Perth", label: "(GMT+08:00) Perth" },
            { value: "(GMT+08:00) Shanghai", label: "(GMT+08:00) Shanghai" },
            {
              value: "(GMT+08:00) Singapore",
              label: "(GMT+08:00) Singapore",
            },
            { value: "(GMT+08:00) Taipei", label: "(GMT+08:00) Taipei" },
            {
              value: "(GMT+08:00) Ulaanbaatar",
              label: "(GMT+08:00) Ulaanbaatar",
            },
            { value: "(GMT+09:00) Irkutsk", label: "(GMT+09:00) Irkutsk" },
            { value: "(GMT+09:00) Osaka", label: "(GMT+09:00) Osaka" },
            { value: "(GMT+09:00) Sapporo", label: "(GMT+09:00) Sapporo" },
            { value: "(GMT+09:00) Seoul", label: "(GMT+09:00) Seoul" },
            { value: "(GMT+09:00) Tokyo", label: "(GMT+09:00) Tokyo" },
            { value: "(GMT+09:30) Darwin", label: "(GMT+09:30) Darwin" },
            { value: "(GMT+10:00) Brisbane", label: "(GMT+10:00) Brisbane" },
            { value: "(GMT+10:00) Canberra", label: "(GMT+10:00) Canberra" },
            { value: "(GMT+10:00) Guam", label: "(GMT+10:00) Guam" },
            { value: "(GMT+10:00) Hobart", label: "(GMT+10:00) Hobart" },
            {
              value: "(GMT+10:00) Melbourne",
              label: "(GMT+10:00) Melbourne",
            },
            {
              value: "(GMT+10:00) Port Moresby",
              label: "(GMT+10:00) Port Moresby",
            },
            { value: "(GMT+10:00) Sydney", label: "(GMT+10:00) Sydney" },
            { value: "(GMT+11:00) Magadan", label: "(GMT+11:00) Magadan" },
            {
              value: "(GMT+11:00) Solomon Islands",
              label: "(GMT+11:00) Solomon Islands",
            },
            {
              value: "(GMT+11:00) Vladivostok",
              label: "(GMT+11:00) Vladivostok",
            },
            { value: "(GMT+12:00) Auckland", label: "(GMT+12:00) Auckland" },
            { value: "(GMT+12:00) Fiji", label: "(GMT+12:00) Fiji" },
            {
              value: "(GMT+12:00) Marshall Islands",
              label: "(GMT+12:00) Marshall Islands",
            },
            {
              value: "(GMT+12:00) Wellington",
              label: "(GMT+12:00) Wellington",
            },
            {
              value: "(GMT+13:00) Nuku'alofa",
              label: "(GMT+13:00) Nuku'alofa",
            },
            { value: "(GMT+14:00) Apia", label: "(GMT+14:00) Apia" },
          ]}
        />
      </Space>
      <p className="mt-4 mb-2 fontSize16">Timezone</p>
      <Form.Check
        className="cursor_pointer text-nowrap"
        type="radio"
        label={`12 Hours ${twelveHours()}`}
        name="timezone"
        value="12"
        checked={timeFormat === "12"}
        onChange={() => setTimeFormat("12")}
      />
      <Form.Check
        className="cursor_pointer text-nowrap"
        type="radio"
        label={`24 Hours ${twentyFourHours()}`}
        name="timezone"
        value="24"
        checked={timeFormat === "24"}
        onChange={() => setTimeFormat("24")}
      />

      <p className="mt-4 mb-2 fontSize16">Date format</p>
      <Form.Check
        className="cursor_pointer text-nowrap"
        type="radio"
        label={currentTime.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        name="dateformat"
        value="mm-dd-yyyy"
        checked={dateFormat === "mm-dd-yyyy"}
        onChange={handleDateFormatChange}
      />
      <Form.Check
        className="cursor_pointer text-nowrap"
        type="radio"
        label={currentTime.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        name="dateformat"
        value="dd-mm-yyyy"
        checked={dateFormat === "dd-mm-yyyy"}
        onChange={handleDateFormatChange}
      />
      <p className="mt-4 mb-2 fontSize16">
        First day displayed on your calendars
      </p>

      {days.map((option, index) => (
        <Form.Check
          key={index}
          className="cursor_pointer text-nowrap"
          type="radio"
          label={option}
          name="firstDay"
          checked={firstDay === option}
          onChange={() => setFirstDay(option)}
        />
      ))}
    </div>
  );
};

export default LanguageAndRegion;
