"use client";

import { useState } from "react";
import Select from "../SelectDateField/SelectDateField";

export default function DateField() {
  const [isFocus, setIsFocus] = useState(false);
  const [isActive, setIsAvtive] = useState(false);

  return (
    <div>
      <div
        className={`pointer-events-none text-[0.8em] mb-1.5 ${
          isActive ? "text-text/80" : "text-gray-2"
        }`}
      >
        Дата рождения
      </div>
      <div className="relative flex justify-between items-end">
        <div className="flex items-center h-[32px] border-b-[2px] border-gray">
          <Select
            options={monthsOptions}
            defaultValue="Месяц"
            setFieldFocus={setIsAvtive}
          />
        </div>
        <div className="w-px h-[14px] mb-[10px] bg-gray-4"></div>
        <div className="flex items-center h-[32px] border-b-[2px] border-gray">
          <Select
            options={daysOptions}
            defaultValue="День"
            setFieldFocus={setIsAvtive}
          />
        </div>
        <div className="w-px h-[14px] mb-[10px] bg-gray-4"></div>
        <div className="flex items-center h-[32px] border-b-[2px] border-gray">
          <Select
            options={yearsOptions}
            defaultValue="Год"
            setFieldFocus={setIsAvtive}
          />
        </div>
        <div className="absolute flex w-full h-[2px] justify-center">
          <div
            className={`bg-brand-2 h-[2px] transition-all duration-300 ease-out z-10 ${
              isActive
                ? "opacity-100 w-full pointer-events-auto"
                : "opacity-0 w-0 pointer-events-none"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}

const monthsOptions = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const daysOptions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

const yearsOptions = [
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
  "1999",
  "1998",
  "1997",
  "1996",
  "1995",
  "1994",
  "1993",
  "1992",
  "1991",
  "1990",
  "1989",
  "1988",
  "1987",
  "1986",
  "1985",
  "1984",
  "1983",
  "1982",
  "1981",
  "1980",
  "1979",
  "1978",
  "1977",
  "1976",
  "1975",
  "1974",
  "1973",
  "1972",
  "1971",
  "1970",
  "1969",
  "1968",
  "1967",
  "1966",
  "1965",
  "1964",
  "1963",
  "1962",
  "1961",
  "1960",
  "1959",
  "1958",
  "1957",
  "1956",
  "1955",
  "1954",
  "1953",
  "1952",
  "1951",
  "1950",
  "1949",
  "1948",
];
