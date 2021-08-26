import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { 
  }
  /** GET Vector Data */
  getVectorData(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<any>('https://alphaweb.uvara.cloud/geoserver/2512/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=2512:P-CATV-BOX,2512:P-COMM-COND-CONT,2512:P-COMM-COND,2512:V-COMM-COND,2512:P-COMM-MHOL,2512:P-COMM-PEDE,2512:P-COMM-BOX,2512:V-COMM-BOX,2512:V-COMM-SIGN,2512:V-ELEC-CBNT,2512:V-ELEC-COND-CONT,2512:V-ELEC-COND-STUB,2512:P-ELEC-COND,2512:V-ELEC-COND,2512:V-ELEC-METR,2512:P-ELEC-OVHD,2512:V-ELEC-PANL,2512:P-ELEC-POLE,2512:V-ELEC-POLE,2512:P-ELEC-BOX,2512:V-ELEC-BOX,2512:P-ELEC-SWIT-BORD,2512:P-ELEC-XFRM,2512:V-ELEC-XFRM,2512:P-HYDR-STND,2512:V-HYDR-STND,2512:P-FIRE-WATR-BFP,2512:V-FIRE-WATR-BFP,2512:V-FIRE-WATR-BOX,2512:V-FIRE-WATR-FDC,2512:V-FIRE-WATR-PIPE,2512:V-FIRE-WATR-PIV,2512:V-FUEL-PUMP,2512:V-FUEL-TANK,2512:V-NGAS-FLTR,2512:P-NGAS-METR,2512:V-NGAS-METR,2512:P-NGAS-PIPE-CONT,2512:P-NGAS-PIPE,2512:V-NGAS-PIPE,2512:P-NGAS-REGU,2512:V-NGAS-REGU,2512:V-NGAS-STRC,2512:P-NGAS-VALV,2512:V-NGAS-VALV,2512:V-IRRI-BFP,2512:V-IRRI-BOOS-PUMP,2512:V-IRRI-BOX,2512:V-IRRI-CTRL-BOX,2512:V-IRRI-HBIB&outputFormat=text/javascript&format_options=callback:loadSingleRequest&srsname=EPSG:3857&_=1629872927758',{  headers, responseType: 'text' as 'json'  });
  }
}