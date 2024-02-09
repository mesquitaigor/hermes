export default interface PopupChildComponent {
  popupDefinitions: PopupChildDefinitions;
}

export interface PopupChildDefinitions {
  show: boolean;
  style?: {
    width?: string;
    height?: string;
  };
}
