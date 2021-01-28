export interface IDictionary {
  [key: string]: any;
}

export interface IDictionaryWithType<T> {
  [key: string]: T;
}

export interface IRemoteConfig {
  endpoint?: string;
  accessToken?: string;
  googleApiKey: string;
  adminUsername: string;
  adminPassword: string;
  [key: string]: any;
}

export interface IBase64FileInfo {
  base64_encoded_data: string;
  type: string;
  name: string;
}

export interface IDataList<T> {
  byId: {
    [key: string]: T
  };
  ids: Array<string>;
}

export interface IActionParams {
  sectionId?: string;
  isAppend?: boolean;
  canLoadMore?: boolean;
  [key: string]: any;
}

export interface IAction<T> {
  type: string;
  payload?: T;
  error?: any;
  params?: IActionParams;

  [key: string]: any;
}

export interface IState<T> {
  isPriceLoading: boolean;
  isHotelLoading: boolean;
  isGetAllHotelLoading: boolean;
  isFetching: boolean;
  status: string;
  data?: T;
  params?: any;
  errorMessage?: string;
  actionType: string;
  success: boolean;
  canLoadMore?: boolean | T;
  isSignupOpen?: boolean;
  isLoginOpen?: boolean;
  isShowCancelReservation?: boolean
}

export interface IStateForList<T> extends IState<IDataList<T>> {
  data?: IDataList<T>;
}

export interface SectionListData<T> {
  [key: string]: IDataList<T>;
}

export interface IStateSectionList<T> extends IState<T> {
  data?: T;
  canLoadMore?: T;
}
