export namespace IPopupComponent {
  export interface PopupRenderItem {
    contentStyle: ContentStyle;
    boxStyle: BoxStyle;
    show: boolean;
    uuid: string;
  }
  export interface ContentStyle {
    top: string;
    left: string;
    height: string;
    width: string;
  }
  export interface BoxStyle {
    left: string;
    right: string;
    top: string;
    bottom: string;
    height: string;
    width: string;
  }

  export interface PopupChildDefinitions {
    dismiss?: () => void
    style?: {
      width?: string;
      height?: string;
    };
  }

  export interface PopupChildComponent {
    popupDefinitions: PopupChildDefinitions;
  }
}
