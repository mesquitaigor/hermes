import Popup from 'src/app/shared/controllers/popup/resources/models/Popup';

export default interface PopupBehaviorNext {
  popup?: Popup<unknown, unknown>;
  action: 'present' | 'fix' | 'dismiss';
}
