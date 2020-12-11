import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography,
  makeStyles,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { getCompanyGeoJSON, getValidLink } from 'src/utils/company';

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  chips: {
    display: 'flex',
    marginTop: theme.spacing(1),
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function Header({ companies, totalCount, className, ...rest }) {
  const classes = useStyles();
  const [showMap, setShowMap] = useState(false);
  useEffect(() => {
    if (showMap && companies) {
      const geoJSON = getCompanyGeoJSON(companies);

      console.log(geoJSON.features[0].geometry.coordinates[0], geoJSON.features[0].geometry.coordinates[1])
      mapboxgl.accessToken = 'pk.eyJ1IjoiYmx1ZXNoYXJrMDgxMSIsImEiOiJja2MzcjVqemcwMG4xMnFud3pibWMydWwzIn0.AKLPvi2YMus6DTTcqoKNfw';
      var map = new mapboxgl.Map({
        container: 'company-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [geoJSON.features[0].geometry.coordinates[0], geoJSON.features[0].geometry.coordinates[1]],
        zoom: 4
      });
      map.addControl(new mapboxgl.NavigationControl());
      // var marker = new mapboxgl.Marker()
      //             .setLngLat([12.550343, 55.665957])
      //             .addTo(map);
      // new mapboxgl.Marker()
      // .setLngLat([12.550343, 55.675957])
      // .addTo(map);

      map.on('load', function () {
        // Add a new source from our GeoJSON data and
        // set the 'cluster' option to true. GL-JS will
        // add the point_count property to your source data.
        map.addSource('companies', {
          type: 'geojson',
          // Point to GeoJSON data. This example visualizes all M1.0+ companies
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          data: getCompanyGeoJSON(companies),
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'companies',
          filter: ['has', 'point_count'],
          paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
        });

        map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'companies',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        });

        map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'companies',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#b00',
            'circle-radius': 6,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });

        // inspect a cluster on click
        map.on('click', 'clusters', function (e) {
          var features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          });
          var clusterId = features[0].properties.cluster_id;
          map.getSource('companies').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
              if (err) return;

              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
              });
            }
          );
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on('click', 'unclustered-point', function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var { company_name, company_id, website, industry } = e.features[0].properties;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `
              Name: ${company_name} <br/>
              ${(industry && industry !== 'null') ? `Industry: ${industry} <br/>` : ''}
              ${(website && website !== 'null') ? `Website: <a target="_blank" href="${getValidLink(website)}">${website}</a> <br/>` : ''}
              <a href=${`/app/companies/company-detail/${company_id}`}>View Detail<a/>
              `
            )
            .addTo(map);
        });

        map.on('mouseenter', 'clusters', function () {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function () {
          map.getCanvas().style.cursor = '';
        });
      });
    }
  }, [showMap, companies])
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item xs={12}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Companies
          </Typography>
          <Link
            variant="body1"
            color="inherit"
            to="/app/companies/search/old"
            component={RouterLink}
          >
            Search Form
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Search Results
          </Typography>
        </Breadcrumbs>
        <Grid container>
          <Grid item xs={12} lg={9}>
          </Grid>
          <Grid item xs={12} lg={3} style={{ textAlign: "right" }}>
            <Button color="primary" onClick={() => setShowMap(!showMap)}>{showMap ? 'Hide Map' : 'Show Map'}</Button>
          </Grid>
          {showMap &&
            <Grid item xs={12} id="company-map" style={{ height: "600px", marginTop: "1rem" }}>

            </Grid>
          }
        </Grid>
        
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  companies: PropTypes.array,
  totalCount: PropTypes.number,
};

export default Header;
