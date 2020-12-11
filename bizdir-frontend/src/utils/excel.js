import React from 'react';
import ReactExport from "react-export-excel";
import moment from 'moment';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const CompanySheet = ({ data }) => (
  <ExcelSheet data={data} name="Employees">
    <ExcelColumn label="Name" value="name" />
    <ExcelColumn label="Wallet Money" value="amount" />
    <ExcelColumn label="Gender" value="sex" />
  </ExcelSheet>
);

export const ContactSheet = ({ data }) => (
  <ExcelSheet data={data} name="Leaves">
    <ExcelColumn label="Name" value="name" />
    <ExcelColumn label="Total Leaves" value="total" />
    <ExcelColumn label="Remaining Leaves" value="remaining" />
  </ExcelSheet>
);

export const CompanyExcel = ({ companies, contacts, element, filename = 'Download' }) => (
  <ExcelFile element={element} filename={filename}>
    <ExcelSheet data={companies} name="Companies">
      <ExcelColumn label="Company ID" value="company_id" />
      <ExcelColumn label="Company Name" value="company_name" />
      <ExcelColumn label="Address" value="address" />
      <ExcelColumn label="City" value="city" />
      <ExcelColumn label="County" value="county" />
      <ExcelColumn label="State" value="state" />
      <ExcelColumn label="Zipcode" value="zip" />
      <ExcelColumn label="Latitude" value="latitude" />
      <ExcelColumn label="Longitude" value="longitude" />
      <ExcelColumn label="Phone" value="phone" />
      <ExcelColumn label="Fax" value="fax_number" />
      <ExcelColumn label="Website" value="website" />
      <ExcelColumn label="Total Employees" value="total_employees" />
      <ExcelColumn label="Employee Range" value="employee_range" />
      <ExcelColumn label="Sales Volume" value="sales_volume" />
      <ExcelColumn label="Sales Volume Range" value="sales_volume_range" />
      <ExcelColumn label="SIC" value="code" />
      <ExcelColumn label="SIC Description" value="description" />
      <ExcelColumn label="Industry" value="industry" />
      <ExcelColumn label="NAICS" value="naics_number" />
    </ExcelSheet>
    <ExcelSheet data={contacts} name="Contacts">
      <ExcelColumn label="Company ID" value="company_id" />
      <ExcelColumn label="Company Name" value="company_name" />
      <ExcelColumn label="First Name" value="first_name" />
      <ExcelColumn label="Last Name" value="last_name" />
      <ExcelColumn label="Full Name" value="full_name" />
      <ExcelColumn label="Gender" value="gender" />
      <ExcelColumn label="Title" value="title" />
    </ExcelSheet>
  </ExcelFile>
);

export const SicCodeExcel = ({ sic_codes, element, filename = 'Download' }) => (
  <ExcelFile element={element} filename={filename}>
    <ExcelSheet data={sic_codes} name="SIC Codes">
      <ExcelColumn label="Code" value="code" />
      <ExcelColumn label="Description" value="description" />
    </ExcelSheet>
  </ExcelFile>
);

export const IndustryListExcel = ({ industries, element, filename = 'Download' }) => (
  <ExcelFile element={element} filename={filename}>
    <ExcelSheet data={industries} name="Industry">
      <ExcelColumn label="ID" value="industry_id" />
      <ExcelColumn label="Industry" value="industry" />
    </ExcelSheet>
  </ExcelFile>
);

export const AccountListExcel = ({ accounts, element, filename = 'Download' }) => (
  <ExcelFile element={element} filename={filename}>
    <ExcelSheet data={accounts} name="Accounts">
      <ExcelColumn label="Email" value="email" />
      <ExcelColumn label="First Name" value="first_name" />
      <ExcelColumn label="Last Name" value="last_name" />
      <ExcelColumn label="Active" value="is_active" />
      <ExcelColumn label="Joined At" value="date_joined" />
      <ExcelColumn label="Token" value="key" />
      <ExcelColumn label="Token Created At" value="created" />
    </ExcelSheet>
  </ExcelFile>
);

export const StateListExcel = ({ states, element, filename = 'Download' }) => (
  <ExcelFile element={element} filename={filename}>
    <ExcelSheet data={states} name="State">
      <ExcelColumn label="State Code" value="code" />
      <ExcelColumn label="State Name" value="name" />
    </ExcelSheet>
  </ExcelFile>
);

export const CountyListExcel = ({ counties, element, filename = 'Download' }) => (
  <ExcelFile element={element} filename={filename}>
    <ExcelSheet data={counties} name="County">
      <ExcelColumn label="County Code" value="code" />
      <ExcelColumn label="County Name" value="name" />
      <ExcelColumn label="State Code" value="state" />
    </ExcelSheet>
  </ExcelFile>
);

export const CityListExcel = ({ cities, element, filename = 'Download' }) => (
  <ExcelFile element={element} filename={filename}>
    <ExcelSheet data={cities} name="City">
      <ExcelColumn label="ID" value="id" />
      <ExcelColumn label="City Name" value="name" />
      <ExcelColumn label="County" value="county" />
      <ExcelColumn label="State Code" value="state" />
      <ExcelColumn label="Latitude" value="latitude" />
      <ExcelColumn label="Longitude" value="longitude" />
    </ExcelSheet>
  </ExcelFile>
);

export const getCompanyListExportFileName = () => `Search_Results_${moment().format('YYYY_MM_DD__HH_mm_ss')}`
export const getCompanyExportFileName = (company) => `${company?.company_id}_${company?.company_name}_${moment().format('YYYY_MM_DD__HH_mm_ss')}`;

export const getListExportFileName = (title) => `${title}_${moment().format('YYYY_MM_DD__HH_mm_ss')}`
