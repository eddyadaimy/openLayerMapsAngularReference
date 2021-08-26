import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import * as OLSrc from 'ol/source';
import Overlay from 'ol/Overlay';
import * as format from 'ol/format';
import * as OlControls from 'ol/control';
import * as olInteraction from 'ol/interaction'
import * as olLayers from 'ol/layer';
import BingMaps from 'ol/source/BingMaps';
import { AppService } from './app.services';
import { Fill, Stroke, Circle, Style, RegularShape } from 'ol/style';
import { style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appService: AppService) {

  }
  title = 'ol-angular';
  map: any;
  xFeaturesStyle: any;
  src: any;
  // controls
  fullscreen = new OlControls.FullScreen();
  mousePositionControl = new OlControls.MousePosition();
  attributionControl = new OlControls.Attribution({
    collapsible: true
  })
  overViewMapControl = new OlControls.OverviewMap(
    {
      collapsed: false,
      layers: [
        new olLayers.Tile({
          source: new OLSrc.OSM(),
        })
      ],
    }
  );



  ngOnInit() {

    this.appService.getVectorData().subscribe((x) => {
      var trimX = (x.slice(18)).slice(0, -1);
      this.src = JSON.parse(trimX).features;
     

    });
    this.map = new Map({
      target: 'ol_map', // id in div so map can be shown
      keyboardEventTarget: document,
      controls: OlControls.defaults().extend([
        this.fullscreen,
        this.mousePositionControl,
        this.overViewMapControl
      ]),
      // layers: [

      //   //******1st Map******
      //   new olLayers.Tile({
      //     source: new OLSrc.OSM(),
      //     //zIndex: 0,
      //     visible: false,
      //   }),

      //   // new olLayers.Tile({
      //   //   source: new OSM({
      //   //     url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      //   //   }),
      //   //   zIndex: 1,
      //   //   //visible:true
      //   // })

      //   //******2nd Map*******
      //   new olLayers.Tile({
      //     source: new BingMaps({
      //       key: "AqGghrPGJZqthrr_peSufBTCliBz2kUlaigqI-axKdVYCoay92opPx3-aIm6Pv2D",
      //       imagerySet: "AerialWithLabels"
      //     }),

      //     //opacity: 1,
      //     //zIndex: 0,
      //     visible: false,
      //   }),

      //   // Stamen basemap layer
      //   //*****3rd MAp*******
      //   new olLayers.Tile({
      //     source: new OLSrc.XYZ({
      //       url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
      //       attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
      //     }),
      //     visible: false,
      //     // title: 'StamenTerrainWithLabels'
      //   })

      // ],
      view: new View({
        center: [-13630922.047019845, 4533672.718927355
        ],
        zoom: 15
      })
    });

    const bingMaps = new olLayers.Tile({
      source: new BingMaps({
        key: "AqGghrPGJZqthrr_peSufBTCliBz2kUlaigqI-axKdVYCoay92opPx3-aIm6Pv2D",
        imagerySet: 'CanvasGray'  // Road, CanvasDark, CanvasGray
      }),
      visible: true,
      //title: 'BingMaps',
    })

    // //1st map layer
    // const test1GrpLayer = 
    //     new olLayers.Tile({
    //       source: new BingMaps({
    //         key: "AqGghrPGJZqthrr_peSufBTCliBz2kUlaigqI-axKdVYCoay92opPx3-aIm6Pv2D",
    //         imagerySet: "AerialWithLabels"
    //       }),
    //       //opacity: 1,
    //       //zIndex: 0,
    //       visible: false,
    //     })
    //this.map.addLayer(test1GrpLayer)


    //2nd map 
    const stamen =
      new olLayers.Tile({
        source: new OLSrc.XYZ({
          url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
          attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible: false,
        //title: 'stamen',
      })

    //3rd map
    // Base Vector Layers
    // Vector Tile Layer OpenstreetMap
    const openstreetMapVectorTile = new olLayers.VectorTile({
      source: new OLSrc.VectorTile({
        url: 'https://api.maptiler.com/tiles/v3-openmaptiles/{z}/{x}/{y}.pbf?key=4sqPKDMHd4fZVhYCB1jz',
        format: new format.MVT(),
        attributions: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      }),
      visible: false,
      //title: 'VectorTileLayerOpenstreetMap'
    })

    const fillX = new Fill({
      color: [255, 0, 0, 0.1]
    });

    const strokeX = new Stroke({
      color: [0, 0, 255, 0.7],
    })

    const lineStringStyle = new Style({
      stroke: new Stroke({
        color: [102, 255, 102],
        lineCap: "square",
        width: 4,
      })
    })

    const blueCountriesStyle = new Style({
      fill: new Fill({
        color: [255, 0, 0, 0.5]
      }),
      stroke: new Stroke({
        color: [0, 0, 255, 0.7],
        width: 2
      })
    })

    const pointStyle = new Style({
      // fill: new Fill({
      //   color: [245, 49, 5, 1]
      // }),
      // stroke: new Stroke({
      //   color: [255, 255, 0, 1],
      //   width: 2,
      // }),
      image: new RegularShape({
        fill: new Fill({
          color: [51, 204, 255, 0.6]
        }),
        stroke: new Stroke({
          color: [255, 30, 31, 1],
          width: 1.2,
        }),
        points: 4,
        radius1: 10,
        radius2: 10,
        //rotation: 1
      })
    })

    const xFeaturesStyle = function (feature: any) {
      let geometryType = feature.getGeometry().getType();
      let incomeProperty = feature.get('id');
      if (geometryType === 'LineString') {
        feature.setStyle([lineStringStyle])
      }
      if (geometryType === 'Point') {
        feature.setStyle([pointStyle])
      }
    }

    // Vector Layers
    // Central EU Countries GeoJSON VectorImage Layer
    const GeoJSON = new olLayers.VectorImage({
      source: new OLSrc.Vector({
        //loader:this.x,
        //features:this.src,
        url: '../assets/geo/map.geojson',
        format: new format.GeoJSON()
      }),
      visible: true,
      style: xFeaturesStyle
      // new Style({
      // fill : fillX,
      // stroke: strokeX
      // }),
    })

    // Central EU Countries KML
    // const EUCountriesKML = new olLayers.Vector({
    //   source: new OLSrc.Vector({
    //     url: './data/vector_data/Central_EU_countries_KML.kml',
    //     format: new format.KML()
    //   }),
    //   visible: false,
    // })

     //Layer Groups
     const layerGroup = new olLayers.Group({
       layers: [
         bingMaps, stamen, openstreetMapVectorTile, GeoJSON
       ]
     })
     this.map.addLayer(layerGroup) // to display the layer in map


    // Layer Switcher Logic for BaseLayers
    //   const baseLayerElements = document.querySelectorAll('.sideBar > input[type=radio]')
    //   for (let baseLayerElement of baseLayerElements){
    // console.log('-->',baseLayerElement)
    //   }


    // const popupContainerelement = (document.getElementById('popup-coordinates') as HTMLFormElement);
    // const popup = new Overlay({
    //   element: popupContainerelement,
    //   positioning: 'top-right'
    // })
    // //Drag
    // const drawInteraction = new olInteraction.Draw({
    //   type: 'Polygon',
    //   freehand: true
    // })
    // this.map.addInteraction(drawInteraction);
    // drawInteraction.on('drawend', function (e) {
    //   let parser = new GeoJSON;
    //   let drawnFeature = parser.writeFeatures([e.feature]);
    //   console.log(drawnFeature) // display coordoinate
    // })
    //   this.map.addOverLay(popup)// to add the overlay on to the map
    //   this.map.on('click', function(e:any) {
    //   console.log('clicked : ', e)
    //   const clickedCoordinate = e.coordinate;
    //   // popup.setPosition([0]);
    //   // popup.setPosition(clickedCoordinate);
    //   // popupContainerelement.innerHTML = clickedCoordinate;
    // })

    // 90 degree --> pi/2 = 3.14/2
  }
}
