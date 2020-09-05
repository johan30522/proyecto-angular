import { environment } from './../../environments/environment';
export const CONFIG = {
  apiPath: environment.api,
  apiPathAuth: environment.apiAuth,
  apiUploadFile:environment.apiUpload,
  dateTimeFormats: {
    shortDate: 'MM/DD/YY',
    dateTime: 'MM/DD/YYYY hh:mm ss'
  },
  timeoutRequest: 6000,
  storagePrefix: 'cenfo'
}
