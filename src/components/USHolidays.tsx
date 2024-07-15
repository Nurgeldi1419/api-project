import React, { useState } from "react";
import { apiLink } from "../api_links";

interface apiProps {
  name: string;
  date: string;
  countryCode: string;
}

const USHolidays = () => {
  const [apiData, setApiData] = useState<apiProps>();

  React.useEffect(() => {
    fetcDataApi();
  }, []);

  //! fetch the date from API
  const fetcDataApi = async () => {
    try {
      const response = await fetch(apiLink);
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }

    //! change the date format
  };

  function changeFormatDate(dateString: string | number | Date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    } as Intl.DateTimeFormatOptions;

    const date = new Date(dateString);
    return date.toLocaleDateString("en-Uk", options);
  }

  return (
    <section className="w-1/2 mx-auto">
      <h2>
        Public holidays{" "}
        {apiData && apiData.length > 0 && apiData[0].countryCode}
      </h2>
      <table className="border-collapse border border-slate-500 table-auto w-full">
        <thead>
          <tr>
            <th className="border border-slate-600 font-bold px-8 bg-gray-700">
              Date
            </th>
            <th className="border border-slate-600 font-bold bg-gray-700">
              Holiday type
            </th>
          </tr>
        </thead>
        <tbody>
          {apiData &&
            apiData.map((info, index) => (
              <tr key={index}>
                {" "}
                <td className="border border-slate-700 px-8 font-light">
                  {changeFormatDate(info.date)}
                </td>
                <td className="border border-slate-700 px-8 font-light">
                  {info.name}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default USHolidays;
