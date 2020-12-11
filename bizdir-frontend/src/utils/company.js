/* eslint-disable no-restricted-properties */

export const cleanSearchResults = (companies, categoryList, sourceList) => {
    let cleanedCompanies = [];
    companies.data.forEach(company => {
        let newCompany = { ...company, bus_created_at: company.created_at, ...company.last_price };
        newCompany.category = categoryList.find(item => item.id === newCompany.category_id).title;
        newCompany.source = sourceList.find(item => item.id === newCompany.source_id).title;
        cleanedCompanies.push(newCompany);
    });
    console.log('cleaned', cleanedCompanies);
    return cleanedCompanies;
};

export const getContactsFromCompanies = (companies) => {
    let contacts = [];
    companies.forEach(company => {
        const company_contacts = JSON.parse(company.contacts);
        company_contacts.forEach(contact => {
            let tmp_contact = { ...contact };
            tmp_contact.company_id = company.company_id;
            tmp_contact.company_name = company.company_name;
            contacts.push(tmp_contact); 
        })
    });
    return contacts;
}
export const getValidLink = (website) => {
    if (website && !website.includes('http://') && !website.includes('https://')) {
        return `http://${website}`;
    }
    return website;
}

export const getMapLink = (lat, lng) => {
    if (lat && lng && parseFloat(lat) > 0 && parseFloat(lng) > 0) {
        return `http://www.google.com/maps/place/${parseFloat(lat)},${Math.abs(parseFloat(lng))}`
    }
    return false;
}

export const parseContacts = (contacts) => {
    return JSON.parse(contacts);
}

export const getCopyOfCompany = (company) => {
    let cloned = { ...company };
    delete cloned['contacts'];
    delete cloned['company_id'];
    return JSON.stringify(cloned);
}

export const getCopyOfContacts = (company) => {
    return JSON.stringify(company.contacts);
}
export const convertCompanyToGeoRow = (company) => {
    return { "type": "Feature", "properties": { "company_name": company.company_name, "company_id": company.company_id, 'industry': company.industry, 'website': company.website}, "geometry": { "type": "Point", "coordinates": [ company.longitude, company.latitude, 0.0 ] } }
}
export const getCompanyGeoJSON = (companies) => {
    const geoJSON = {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": companies?.map(company => convertCompanyToGeoRow(company))
    };
    return geoJSON;
}

